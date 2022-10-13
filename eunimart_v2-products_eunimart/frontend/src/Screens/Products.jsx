import React, { useEffect } from "react";
import "./Products.css";
import DynamicAppBar from "../shared/widgets/DynamicAppBar/DynamicAppBar";
import { Link } from "react-router-dom";
import ModalViewV2 from "../shared/widgets/Modal/ModalViewV2";
import MatRadio from "../shared/widgets/MatRadio";
//MUI
import ProductCard from "../shared/widgets/ProductCard";
import ProductsTable from "../shared/widgets/ProductsTable";
import {
  Box,
  Typography,
  Divider,
  Button,
  TextField,
  MenuItem,
  Autocomplete,
  Switch,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
//redux action import
import { useSelector, useDispatch } from "react-redux";

import { fetchProduct } from "../redux/Action/FetchProductAction";
import {
  getProductTypeDetails,
  getParentCategoryDetails,
} from "../redux/Action/FetchProductDetailsAction";
import { useState } from "react";
import ProductsTable1 from "../shared/widgets/ProductsTable1";
import { getproductData } from "../redux/Action/FetchProductDataAction";
import {
  postDeleteProduct,
  postfavouriteProduct,
  postArchiveProduct,
} from "../redux/Action/MiscAction";
// import { useHistory } from 'react-router-dom';
import ModalView from "../shared/widgets/Modal/ModalView";
import { fetchSearchProduct } from "../redux/Action/SearchOutput";
import { useNavigate } from "react-router-dom";

import { lazy, Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary";
import { fetchAccessManagement } from "../redux/Action/FetchAccessManagement";
const RemoteDynamicTable = React.lazy(() => import("Remote/DynamicTable"));
const RemoteDynamicAppBar = React.lazy(() => import("Remote/DynamicAppBar"));


const RemoteWrapper = ({ children }) => (
  <div
    style={{
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);


function Products() {
  const dispatch = useDispatch();
  const history = useNavigate();
  /*redux variables*/
  // const view = useSelector((state) => state.productView.productView);
  const view = "listView";

  const products = useSelector((state) => state.fetchProducts.products);
  const [selectedId, setId] = useState(0);
  const [variantId, setVariantId] = useState(0);


  const parentCategory = useSelector(
    (state) => state.fetchAddProductDetails.parentCategory.ParentCategory
  );

  const access = useSelector(
    (state) => state.access.access
  );

  const productType = useSelector(
    (state) => state.fetchAddProductDetails.productType.ProductType
  );

  useEffect(() => {
    let temp = [...filterOptions];
    if (parentCategory.data) {
      temp[0].subMenu = parentCategory.data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
    }
    setFilterOptions(temp);
  }, [parentCategory]);

  useEffect(() => {
    let temp = [...filterOptions];
    if (productType.data) {
      temp[1].subMenu = productType.data.map((item) => {
        return {
          label: item.display_name,
          value: item.id,
        };
      });
    }
    setFilterOptions(temp);
  }, [productType]);

  /*local variables*/
  const [dynamicAppBar, setDynamicAppBar] = useState([]); //state to manage dynamic appbar
  const [params, setParams] = useState({ limit: 10, offset: 1 });

  //Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [channelStatusModalOpen, setChannelStatusModalOpen] = useState(false);
  const [printQRBarCodeModalOpen, setPrintQRBarCoreModalOpen] = useState();
  const [searchType, setSearchType] = useState("product_name");

  const [advancedSort, setAdvancedSort] = useState([
    {
      sortBy: "Product ID",
      options: [
        { label: "Ascending", type: "radio", value: "ascending" },
        { label: "Descending", type: "radio", value: "descending" },
      ],
    },
  ]);
  /*  const sortOptions = [
     {
       sortBy: "Product ID",
       options: [
         { label: "Ascending", type: "radio", value: "ascending" },
         { label: "Descending", type: "radio", value: "descending" },
       ],
     },
     {
       sortBy: "Created Date",
       options: [
         { label: "Latest", type: "radio", value: "latest" },
         { label: "Oldest", type: "radio", value: "oldest" },
       ],
     },
     {
       sortBy: "Reference Number",
       options: [
         { label: "High to low", type: "radio", value: "hight to low" },
         { label: "Low to high", type: "radio", value: "low to high" },
       ],
     },
     {
       sortBy: "Channel Name",
       options: [
         { label: "Marketplace", type: "radio", value: "marketplace" },
         { label: "Webstore", type: "radio", value: "webstore" },
         { label: "Retail Stores", type: "radio", value: "retail" },
       ],
     },
     {
       sortBy: "Vendor Name",
       options: [
         { label: "A to Z", type: "radio", value: "atoz" },
         { label: "Z to A", type: "radio", value: "ztoa" },
       ],
     },
     {
       sortBy: "Price",
       options: [
         { label: "High to low", type: "radio", value: "htol" },
         { label: "Low to high", type: "radio", value: "ltoh" },
       ],
     },
   ]; */

  /*Use Effect functions*/


  const sortOptions = [

    {
      label: "Product ID",
      subItems: [
        {
          label: "Ascending",
          key: "asc",
        },
        {
          label: "Descending",
          key: "desc",
        },
      ],
      func: (value) => {
        dispatch(fetchSearchProduct({ sku_id: value }, "sort"));
        handleSortMenuClose();
      },
    },
    {
      label: "Created Date",

      subItems: [
        {
          label: "Latest",
          key: "asc",
        },
        {
          label: "Oldest",
          key: "desc",
        },
      ],
      func: (value) => {
        dispatch(fetchSearchProduct({ created_date: value }, "sort"));
        handleSortMenuClose();
      },
    },
    {
      label: "Clear All",
      func: (value) => {
        dispatch(fetchSearchProduct({ "": "" }, "sort"));
        handleSortMenuClose();
      },
    },
    // {
    //   label: "Reference Number",
    //   endIcon: <KeyboardArrowRightIcon />,
    //   disabled: true,
    //   subItems: [
    //     {
    //       label: "High to low",
    //       key: "asc",
    //     },
    //     {
    //       label: "Low to high",
    //       key: "desc",
    //     },
    //   ],
    //   func: (value) => {
    //     dispatch(fetchSearchProduct({ "": "" }, "search"));
    //     handleSortMenuClose();
    //   },
    // },
    // {
    //   label: "Channel Name",
    //   endIcon: <KeyboardArrowRightIcon />,
    //   disabled: true,
    //   subItems: [
    //     {
    //       label: "Marketplace",
    //     },
    //     {
    //       label: "Webstore",
    //     },
    //     {
    //       label: "Retail Stores",
    //     },
    //   ],
    //   func: (value) => {
    //     dispatch(fetchSearchProduct({ "": "" }, "search"));
    //     handleSortMenuClose();
    //   },
    // },
    // {
    //   label: "Vendor Name",
    //   endIcon: <KeyboardArrowRightIcon />,
    //   disabled: true,
    //   subItems: [
    //     {
    //       label: "A to Z",
    //       key: "asc",
    //     },
    //     {
    //       label: "Z to A",
    //       key: "desc",
    //     },
    //   ],
    //   func: (value) => {
    //     dispatch(fetchSearchProduct({ "": "" }, "search"));
    //     handleSortMenuClose();
    //   },
    // },
    // {
    //   label: "Price",
    //   endIcon: <KeyboardArrowRightIcon />,
    //   disabled: true,
    //   subItems: [
    //     {
    //       label: "High to low",
    //       key: "asc",
    //     },
    //     {
    //       label: "Low to high",
    //       key: "desc",
    //     },
    //   ],
    //   func: (value) => {
    //     dispatch(fetchSearchProduct({ "": "" }, "search"));
    //     handleSortMenuClose();
    //   },
    // },
    // {
    //   label: "Advance Sort",
    //   endIcon: null,
    //   func: handleModalOpen,
    //   disabled: false,
    // },
  ];



  const [filterOptions, setFilterOptions] = useState([
    {
      label: "Filter by Category",
      collapseState: false,
      func: (id) => {
        filterFunc(id, "category");
      },
      subMenu: [],
      value: "category",
      type: "dropdown"
    },
    {
      label: "Filter by Product Type",
      collapseState: false,
      func: (id) => {
        filterFunc(id, "productType");
      },
      subMenu: [],
      value: "productType",
      type: "dropdown"
    },
    {
      label: "Filter by Archive",
      collapseState: false,
      subMenu: [
        {
          label: "Yes",
          icon: null,
          endIcon: null,
          value: true,
        },
        {
          label: "No",
          icon: null,
          endIcon: null,
          value: false,
        },
      ],
      value: "archive",
      type: "dropdown",
      func: (value) => {
        filterFunc(value, "archive");
      },
    },
  ]);

  const filterFunc = (id, name) => {
    if (name === "category") {
      dispatch(
        fetchSearchProduct(
          {
            category: id,
          },
          "filters"
        )
      );
    }
    if (name === "productType") {
      dispatch(
        fetchSearchProduct(
          {
            product_type: id,
          },
          "filters"
        )
      );
    }
    if (name === "archive") {
      dispatch(
        fetchSearchProduct(
          {
            isActive: id,
          },
          "filters"
        )
      );
    }
  };

  const searchOptions = [
    { label: "Product Name : ", value: "product_name" },
    { label: "SKUID : ", value: "skuId" },
  ]

  useEffect(() => {
    dispatch(fetchAccessManagement())
    dispatch(getParentCategoryDetails());
    dispatch(getProductTypeDetails());
    dispatch(fetchProduct(params));
    console.log("params use effect");
  }, [params]);

  const searchItems = (searchValue) => {

    if (searchValue.length === 0) {
      dispatch(fetchSearchProduct({ "": "" }, "search"));
    } else {
      dispatch(fetchSearchProduct({ [searchType]: searchValue }, "search"));
    }


  };


  const filterSearchItems = (searchValue, searchTyp) => {

  };

  useEffect(() => {


    if (dynamicAppBar.length > 1) {
      setCustomOptions([
        {
          label: "Create Bundle",
          func: (product_id) => handleBundleProducts(newSelected),
        },
      ]);
    }
    if (dynamicAppBar.length === 1) {
      setCustomOptions([
        {
          label: "View Product",
          func: (product_id) => handleViewProduct(product_id),
        },

        {
          label: "Mark as Favourite",
          func: (product_id) => handleFavouriteModalOpen(product_id),
        },
        {
          label: "Edit Product Template",
          func: (product_id) => handleEditProductTemplate(product_id),
        },
        {
          label: "Archive Product",
          func: (product_id) => handleArchiveModalOpen(product_id),
        },
        {
          label: "Delete Product",
          func: (product_id) => handleModalOpen(product_id),
        },
      ]);
    }


    console.log("params use effect dynamicAppBar", dynamicAppBar);
  }, [dynamicAppBar]);


  useEffect(() => { }, [products]);

  /*local functions*/
  const handleChangeDyanmicAppBar = (value) => {
    console.log("dynamic", dynamicAppBar)
    setDynamicAppBar(value);
  };
  const handleModalOpen = (product_id) => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleChannelStatusModalOpen = (product_id) => {
    setChannelStatusModalOpen(true);
  };

  const handleChannelStatusModalClose = () => {
    setChannelStatusModalOpen(false);
  };

  const handlePrintQRBarCodeModalOpen = (product_id) => {
    setPrintQRBarCoreModalOpen(true);
  };

  const handlePrintQRBarCodeModalClose = () => {
    setPrintQRBarCoreModalOpen(false);
  };

  const handleAddColumnClick = () => {
    setAdvancedSort([
      ...advancedSort,
      {
        sortBy: "Product ID",
        options: [
          { label: "Ascending", type: "radio", value: "ascending" },
          { label: "Descending", type: "radio", value: "descending" },
        ],
      },
    ]);
  };

  const setRadioType = (prop, value) => { };

  const [dynamicStatus, setDynamicStatus] = useState({});
  const [dyanamicStatusIndex, setDyanamicStatusIndex] = useState(null);
  const [channelStatus, setChannelStatus] = useState([
    {
      label: "Marketplace",
      sub: [
        {
          id: "myntra",
          image:
            "https://images.livemint.com/img/2021/12/06/1600x900/WhatsApp_Image_2020-05-22_at_11.41.40_1590127957394_1590127957628_1638785122012.jpeg",
          enable: true,
        },
        {
          id: "flipkart",
          image:
            "https://m.economictimes.com/thumb/height-450,width-600,imgsize-20654,msid-78315062/unnamed-7.jpg",
          enable: false,
        },
        {
          id: "flipkart",
          image:
            "https://m.economictimes.com/thumb/height-450,width-600,imgsize-20654,msid-78315062/unnamed-7.jpg",
          enable: false,
        },
      ],
    },
    {
      label: "Webstores",
      sub: [
        {
          id: "myntra",
          image:
            "https://images.livemint.com/img/2021/12/06/1600x900/WhatsApp_Image_2020-05-22_at_11.41.40_1590127957394_1590127957628_1638785122012.jpeg",
          enable: true,
        },
        {
          id: "flipkart",
          image:
            "https://m.economictimes.com/thumb/height-450,width-600,imgsize-20654,msid-78315062/unnamed-7.jpg",
          enable: false,
        },
        {
          id: "flipkart",
          image:
            "https://m.economictimes.com/thumb/height-450,width-600,imgsize-20654,msid-78315062/unnamed-7.jpg",
          enable: false,
        },
      ],
    },
    {
      label: "Retail Stores",
      sub: [
        {
          id: "myntra",
          image:
            "https://mechomotive.com/wp-content/uploads/2021/10/Lenskart.png",
          enable: true,
        },
        {
          id: "titan",
          image:
            "https://www.icicibank.com/managed-assets/images/online-services/shopping-vouchers/titan-eye-voucher.jpg",
          enable: false,
        },
        {
          id: "mota",
          image: "https://www.motachashma.com/images/ogmotachashmalogo.png",
          enable: false,
        },
      ],
    },
    {
      label: "Warehouses",
      sub: [
        {
          id: "Warehouse 1",
          label: "Warehouse 1",
          enable: true,
        },
        {
          id: "Warehouse 2",
          label: "Warehouse 2",
          enable: false,
        },
        {
          id: "Warehouse 3",
          label: "Warehouse 3",
          enable: false,
        },
      ],
    },
  ]);

  const handleChannelStatus = () => {
    setChannelStatusModalOpen(false);
  };

  const handlePRintQRBarCode = () => {
    setPrintQRBarCoreModalOpen(false);
  };
  useEffect(() => { }, [selectedId]);
  useEffect(() => {
    if (view === "gridView") {
      dispatch(fetchProduct({ limit: 10, offset: 1 }));
    }
  }, [view]);


  const headCells = [
    {
      key: "product_name",
      numeric: true,
      label: "Product Name",
      type: "text"
    },
    {
      key: "sku_id",
      numeric: true,
      label: "SKU ID",
      type: "text"
    },
    {
      key: "category.name",
      count: 2,
      numeric: true,
      label: "Category",
      type: "text"
    },
    {
      key: "leaf_category.name",
      count: 2,
      numeric: true,
      label: "Sub-Category",
      type: "text"
    },
    {
      key: "created_date",
      numeric: true,
      label: "Created Date",
      type: "date"
    },
    {
      key: "product_pricing_details.mrp",
      count: 2,
      numeric: true,
      label: "MRP",
      type: "text"
    },
    {
      key: "product_pricing_details.sales_price",
      count: 2,
      numeric: true,
      label: "Sales Price",
      type: "text"
    },
    {
      key: "validation_info",
      numeric: true,
      label: "Validation Info",
      type: "text"
    },

    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action"
    },
  ];


  useEffect(() => {
    setCustomOptions(
      [{
        label: "View Product",
        func: (product_id) => handleViewProduct(product_id),
        flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag
      },
      {
        label: "Edit Product Template",
        func: (product_id) => handleEditProductTemplate(product_id),
        flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "UPDATE")?.ctrl_flag

      },
      {
        label: "Edit Product Variant",
        func: (product_id) => handleEditProductVariant(product_id),
        flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "UPDATE")?.ctrl_flag

      },
      {
        label: "Delete Product",
        func: (product_id) => handleDeleteModalOpen(product_id),
        flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "DELETE")?.ctrl_flag

      }]
    )
  }, [access])


  const [customOptions, setCustomOptions] = useState([
    {
      label: "View Product",
      func: (product_id) => handleViewProduct(product_id),
      flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag
    },
    {
      label: "Edit Product Template",
      func: (product_id) => handleEditProductTemplate(product_id),
      flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "UPDATE")?.ctrl_flag

    },
    {
      label: "Edit Product Variant",
      func: (product_id) => handleEditProductVariant(product_id),
      flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "UPDATE")?.ctrl_flag

    },
    {
      label: "Delete Product",
      func: (product_id) => handleDeleteModalOpen(product_id),
      flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "DELETE")?.ctrl_flag

    }
  ]);

  //Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); //delete
  const [favouriteModalOpen, setFavouriteModalOpen] = useState(false); //favourite
  const [archiveModalOpen, setArchiveModalOpen] = useState(false); //archive
  const [downloadModalOpen, setDownloadModalOpen] = useState(false); //download

  //delete
  const handleDeleteModalOpen = (product_id) => {
    setVariantId(product_id);
    setDeleteModalOpen(true);
  };
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  //favourites
  const handleFavouriteModalOpen = (product_id) => {
    setVariantId(product_id);
    setFavouriteModalOpen(true);
  };
  const handleFavouriteModalClose = () => {
    setFavouriteModalOpen(false);
  };

  //archive
  const handleArchiveModalOpen = (product_id) => {
    setVariantId(product_id);
    setArchiveModalOpen(true);
  };
  const handleArchiveModalClose = () => {
    setArchiveModalOpen(false);
  };




  //customActions
  const handleViewProduct = (product_id) => {
    history(`/products/productView/${product_id}`);
  };

  const handleDeleteProduct = () => {
    dispatch(postDeleteProduct(variantId));
    setTimeout(() => {
      dispatch(fetchSearchProduct({ "": "" }, "delete"));
    }, 300);
    setDeleteModalOpen(false);
  };

  const handleFavouriteProduct = () => {
    dispatch(postfavouriteProduct(variantId));
    setTimeout(() => {
      dispatch(fetchSearchProduct({ "": "" }, "fav"));
    }, 300);
    setFavouriteModalOpen(false);
  };

  const handleArchiveProduct = () => {
    dispatch(postArchiveProduct(variantId));
    setTimeout(() => {
      dispatch(fetchSearchProduct({ "": "" }, "archive"));
    }, 300);
    setArchiveModalOpen(false);
  };



  const handleEditProductTemplate = (id) => {
    dispatch(getproductData(id));
    setTimeout(() => {
      history(`/products/editProductTemplate/${id}`);
    }, 500);
  };

  const handleEditProductVariant = (id) => {
    setTimeout(() => {
      history(`/products/editProductVariant/${id}`);
    }, 200);
  };

  const handleBundleProducts = (product_id) => {
    history(`/products/bundles`);
  };

  const handleButtonClick = () => {
    history(`/products/addProduct`);
  }


  return (
    <Box className="productsLayout" sx={{ backgroundColor: "#F9F9F9" }}>

      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <RemoteDynamicAppBar
            dynamicAppBar={dynamicAppBar}
            sortOptions={sortOptions}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            filterSearchItems={filterSearchItems}
            searchItems={searchItems}
            searchOptions={searchOptions}
            searchType={searchType}
            setSearchType={setSearchType}
            // handleButtonClick={handleButtonClick}
            buttons={[{name:"Create",handleButtonClick:handleButtonClick,flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "CREATE" )?.ctrl_flag}]}

          />
        </RemoteWrapper></Suspense>

      {view && view === "gridView" ? (
        <Box>
          {products && products.data && products.data.length > 0 ? (
            <Box className="mdm-productsGrid">
              {products.data.map((product) => {
                return <ProductCard cardData={product} />;
              })}
            </Box>
          ) : (
            <>
              {products && products.data && products.data.length === 0 && (
                <Box className="nodata_text" sx={{ height: "88vh" }}>
                  <h3>No Data Found</h3>
                </Box>
              )}
            </>
          )}
        </Box>
      ) : view && view === "listView" ? (
        <>
          {products && products.data && products.meta.info && access && access[0]?.module_ctrl_flag && access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "LIST" )?.ctrl_flag ===1 &&(
            <Box className="viewProductTable">
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteDynamicTable
                    table_data={products.data}
                    headCells={headCells}
                    customOptions={customOptions}
                    setCustomOptions={setCustomOptions}
                    info={products.meta.info}
                    setParams={setParams}
                    handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                    setId={setId}
                    enablepagination={true}
                  />
                </RemoteWrapper></Suspense>
            </Box>
          )}
        </>
      ) : (
        <Box>
          {products &&
            products.data &&
            products.data.map((product, index) => {
              return (
                <Link
                  to={{
                    pathname: `/products/productView/${product.product_template_id}`,
                    state: { id: product.id },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <ProductCard cardData={product} />
                </Link>
              );
            })}
        </Box>
      )}


      {deleteModalOpen && (
        <ModalView
          handleDeleteProduct={handleDeleteProduct}
          handleModalClose={handleDeleteModalClose}
          modalOpen={deleteModalOpen}
          primary={"You are about to Delete these Products and Variants"}
          secondary={
            "This will Delete variants from the list Are you sure?"
          }
          disclaimer={
            "Note: This includes Products and this will delete all  the variants of the product"
          }
          actionBtns={["Cancel", "Delete"]}
        />
      )}
      {favouriteModalOpen && (
        <ModalView
          handleDeleteProduct={handleFavouriteProduct}
          handleModalClose={handleFavouriteModalClose}
          modalOpen={favouriteModalOpen}
          primary={"You are about to make this product as Favourite"}
          secondary={
            "This will list these products as a favourite Products. Are you sure?"
          }
          disclaimer={""}
          actionBtns={["Cancel", "Confirm"]}
        />
      )}
      {archiveModalOpen && (
        <ModalView
          handleDeleteProduct={handleArchiveProduct}
          handleModalClose={handleArchiveModalClose}
          modalOpen={archiveModalOpen}
          primary={"You are about to Archive this product"}
          secondary={
            "This will remove these products from your product list. Are you sure?"
          }
          disclaimer={
            "Disclaimer: If the selected products are actice or enabled, Products will be changed to Inactive or disabled."
          }
          actionBtns={["Cancel", "Archive"]}
        />
      )}


      {/* Sort Modal */}
      {modalOpen && (
        <ModalViewV2
          modalTitle={"Advanced Sort"}
          handleModalClose={handleModalClose}
          modalOpen={modalOpen}
          actionBtns={["Cancel", "Sort"]}
          modalContentStyleHeight={"300px"}
          modalContentStyleWidth={"95%"}
          styleLeft={"calc(50% - 704px/2)"}
        >
          <Box sx={{ m: 2 }}>
            <Typography variant="h6">Sorting Table headers</Typography>
            <Box>
              {advancedSort.map((sort, index) => {
                return (
                  <Box className="sort-box">
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      className="sort-box-label"
                    >
                      <TextField
                        id="standard-select-currency"
                        select
                        label="Sort By"
                        value={sort.sortBy}
                        onChange={(e) => {
                          let sortOptIndex = 0;
                          sortOptions.map((item, sortindex) => {
                            if (item.sortBy === e.target.value) {
                              sortOptIndex = sortindex;
                            }
                          });
                          const newSort = [...advancedSort];
                          newSort[index].sortBy = e.target.value;

                          newSort[index].options =
                            sortOptions[sortOptIndex].options;
                          setAdvancedSort(newSort);
                        }}
                        SelectProps={{
                          MenuProps: {
                            className: "menu",
                          },
                        }}
                        helperText="  Please select your SortBy  "
                        margin="normal"
                        size="small"
                      >
                        {sortOptions.map((option) => (
                          <MenuItem key={option.sortBy} value={option.sortBy}>
                            {option.sortBy}
                          </MenuItem>
                        ))}
                      </TextField>
                      <Box style={{ marginLeft: "30px" }}>
                        <MatRadio
                          label={sort.sortBy}
                          fields={sort.options}
                          setRadioType={setRadioType}
                        />
                      </Box>
                    </Box>
                    <Box className="sort-box-input"></Box>
                  </Box>
                );
              })}
            </Box>
            <Divider variant="middle" />
            <Button
              variant="outlined"
              onClick={handleAddColumnClick}
              sx={{ my: 3 }}
            >
              Add another column
            </Button>
          </Box>
        </ModalViewV2>
      )}

      {channelStatusModalOpen && (
        <ModalViewV2
          modalTitle={
            dynamicAppBar.length > 1
              ? "Status of Products"
              : "Status of Product"
          }
          handleModalClose={handleChannelStatusModalClose}
          handleDeleteProduct={handleChannelStatus}
          modalOpen={channelStatusModalOpen}
          actionBtns={["Cancel", "Confirm"]}
          modalContentStyleHeight={"300px"}
          modalContentStyleWidth={"95%"}
          styleLeft={"calc(50% - 704px/2)"}
        >
          <Box sx={{ m: 2 }}>
            <Autocomplete
              size="small"
              disablePortal={false}
              id="combo-box-demo"
              options={channelStatus}
              onChange={(event, value) => {
                if (value.label === "Marketplace") {
                  setDyanamicStatusIndex(0);
                }
                if (value.label === "Webstores") {
                  setDyanamicStatusIndex(1);
                }
                if (value.label === "Retail Stores") {
                  setDyanamicStatusIndex(2);
                }
                if (value.label === "Warehouses") {
                  setDyanamicStatusIndex(3);
                }
                setDynamicStatus(value);
              }}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label={`Select Status`} />
              )}
            />
            <Box>
              {dynamicStatus &&
                dynamicStatus.sub &&
                dynamicStatus.sub.map((status, index) => {
                  return (
                    <Box
                      className="status_box"
                      sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      {status.image ? (
                        <img
                          src={status.image}
                          alt={status.image}
                          width="120px"
                          height={"60px"}
                        />
                      ) : (
                        <Typography variant={"h7"}>{status.label}</Typography>
                      )}

                      {dynamicAppBar && dynamicAppBar.length > 1 ? (
                        <Box>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="activate"
                              control={<Radio />}
                              label="Activate all selected products"
                            />
                            <FormControlLabel
                              value="deactivate"
                              control={<Radio />}
                              label="De-activate all selected"
                            />
                          </RadioGroup>
                        </Box>
                      ) : (
                        <Switch
                          checked={status.enable}
                          onChange={() => {
                            const temp = [...channelStatus];
                            temp[dyanamicStatusIndex].sub[index].enable =
                              !temp[dyanamicStatusIndex].sub[index].enable;
                            setChannelStatus(temp);
                          }}
                        />
                      )}
                    </Box>
                  );
                })}
              {dynamicAppBar && dynamicAppBar.length > 1 && (
                <Box>
                  <Typography color="red" fontFamily={"Poppins"}>
                    Note: Few of your products selected are active in some of
                    the marketplace.
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </ModalViewV2>
      )}

      {printQRBarCodeModalOpen && (
        <ModalViewV2
          modalTitle={"Print Bar/QR Code"}
          handleModalClose={handlePrintQRBarCodeModalClose}
          handleDeleteProduct={handlePRintQRBarCode}
          modalOpen={printQRBarCodeModalOpen}
          actionBtns={["Cancel", "Confirm"]}
          modalContentStyleHeight={"500px"}
          modalContentStyleWidth={"95%"}
          modalContentStylePadding={"12px"}
          styleLeft={"calc(50% - 704px/2)"}
          mainWidth={"820px"}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              gridColumnGap: "30px",
              background: "#FFFFFF",
              borderRadius: "8px",
            }}
          >
            <Box className="left">
              <Typography variant="h7">Label Details</Typography>
              <Autocomplete
                size="small"
                disablePortal={false}
                id="combo-box-demo"
                options={[
                  { label: "QR Code", id: 0 },
                  { label: "Bar Code", id: 1 },
                ]}
                // onChange={(event, value) => {

                // }}
                sx={{ width: "100%", mt: 2 }}
                renderInput={(params) => (
                  <TextField {...params} label={`Select Label Type`} />
                )}
              />
              <TextField
                label={`Enter Number of Labels to Print`}
                sx={{ width: "100%", mt: 2 }}
                size="small"
              />
              <Box sx={{ display: "flex", mt: 2 }}>
                <Button
                  variant="contained"
                  sx={{ textTransform: "none", mr: 2 }}
                >
                  Print label
                </Button>
                <Button variant="outlined" sx={{ textTransform: "none" }}>
                  Download PDF
                </Button>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="h7" color="red">
                  Disclaimer: This includes all the variants of the selected
                  products and this prints different QR/Bar code acoording to
                  Variants.
                </Typography>
              </Box>
            </Box>
            <Box className="right">
              <Typography variant="h7">Label Details</Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "16px",
                  position: "static",
                  width: "360px",
                  height: "389px",
                  left: "0px",
                  top: "39px",
                  background: "#FAF8F3",
                  border: "1px solid #000000",
                  boxSizing: "borderBox",
                  borderRadius: "8px",
                  overflow: "scroll",
                }}
              >
                {dynamicAppBar && dynamicAppBar.length > 0 ? (
                  dynamicAppBar.map(() => {
                    return (
                      <Box
                        className="sticker"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          padding: "8px",
                          position: "static",
                          width: "291px",
                          height: "215px",
                          left: "10px",
                          top: "10px",
                          background: "#FFFFFF",
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                          mb: 2,
                        }}
                      >
                        <Box>
                          <Typography>Product Name</Typography>
                          <Typography>P/N : </Typography>
                          <Typography>12344556</Typography>
                          <Typography>MFG. Date:</Typography>
                          <Typography>2016 - 12 - 01</Typography>
                          <Typography>
                            Dummy Data to note some discription or write notes
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })
                ) : (
                  <Box
                    className="sticker"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: "8px",
                      position: "static",
                      width: "291px",
                      height: "215px",
                      left: "10px",
                      top: "10px",
                      background: "#FFFFFF",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography>Product Name</Typography>
                      <Typography>P/N : </Typography>
                      <Typography>12344556</Typography>
                      <Typography>MFG. Date:</Typography>
                      <Typography>2016 - 12 - 01</Typography>
                      <Typography>
                        Dummy Data to note some discription or write notes
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </ModalViewV2>
      )}
    </Box>
  );
}

export default Products;















/*			
Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)			
All rights reserved.			
This program is free software: you can redistribute it and/or modify			
it under the terms of the GNU General Public License as published by			
the Free Software Foundation, either version 3 of the License, or			
(at your option) any later version.			
This program is distributed in the hope that it will be useful,			
but WITHOUT ANY WARRANTY; without even the implied warranty of			
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the			
GNU General Public License for more details.			
You should have received a copy of the GNU General Public License			
along with this program. If not, see <http://www.gnu.org/licenses/>.			
*/