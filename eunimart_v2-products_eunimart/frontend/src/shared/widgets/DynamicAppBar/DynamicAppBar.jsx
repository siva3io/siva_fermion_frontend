import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ModalView from "../Modal/ModalView";
import { useHistory } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchProduct } from "../../../redux/Action/SearchOutput";
import {
  postDeleteProduct,
  postfavouriteProduct,
  postArchiveProduct,
} from "../../../redux/Action/MiscAction";
import { getproductData } from "../../../redux/Action/FetchProductDataAction";

//mui
import {
  styled,
  alpha,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import {
  AppBar,
  Box,
  NativeSelect,
  Toolbar,
  IconButton,
  InputBase,
  MenuItem,
  Menu,
  Typography,
  Autocomplete,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import ArchiveIcon from "@mui/icons-material/Archive";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import ListIcon from "@mui/icons-material/List";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import Dropdown from "react-multilevel-dropdown";
import ReplayIcon from "@mui/icons-material/Replay";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "0ch",
      "&:focus": {
        width: "20ch",
        color: "#000",
        border: "1px solid #F9F9F9",
      },
    },
  },
}));

export default function DynamicAppBar({
  handleModalOpen,
  handleChannelStatusModalOpen,
  handlePrintQRBarCodeModalOpen,
  dynamicAppBar,
  productTemplateId,
}) {
  const history = useHistory();
  //redux
  const parentCategory = useSelector(
    (state) => state.fetchAddProductDetails.parentCategory.ParentCategory
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

  //search
  const [showSearchBox, setshowSearchBox] = useState(false);
  const [searchType, setSearchType] = useState("product_name");

  //sort
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  //view
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  //filter
  const [filterMenu, setFilterMenu] = React.useState(null);
  const isFilterMenuOpen = Boolean(filterMenu);

  //local functions
  const searchItems = (searchValue) => {
    if (searchValue.length === 0) {
      setSearchInput("");
      dispatch(fetchSearchProduct({ "": "" }, "search"));
    } else {
      setSearchInput(searchValue);
      dispatch(fetchSearchProduct({ [searchType]: searchValue }, "search"));
    }
  }; //this function is use to search products

  const handleBulkFavouriteProduct = () => {
    if (dynamicAppBar.length === 1) {
      dispatch(postfavouriteProduct(dynamicAppBar[0]));
      setTimeout(() => {
        dispatch(fetchSearchProduct({ "": "" }, "fav"));
      }, 300);
      setFavouriteModalOpen(false);
    } else if (dynamicAppBar.length > 1) {
      toast.info("Bulk favourites feature is not added yet!", {
        toastId: "Bulk favourites feature is not added yet!",
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.info("Products not selected to favourites !", {
        toastId: "Products not selected to favourites !",
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleBulkArchiveProduct = () => {
    if (dynamicAppBar.length > 0) {
      dispatch(postArchiveProduct(dynamicAppBar[0]));
      setTimeout(() => {
        dispatch(fetchSearchProduct({ "": "" }, "fav"));
      }, 300);
      setArchiveModalOpen(false);
    } else if (dynamicAppBar.length > 1) {
      toast.info("Bulk favourites feature is not added yet!", {
        toastId: "Bulk favourites feature is not added yet!",
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.info("Products not selected to Archive !", {
        toastId: "Products not selected to Archive !",
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleBulkDeleteProduct = () => {
    if (dynamicAppBar.length === 1) {
      dispatch(postDeleteProduct(dynamicAppBar[0]));
      setTimeout(() => {
        dispatch(fetchSearchProduct({ "": "" }, "delete"));
      }, 300);
      setDeleteModalOpen(false);
    } else if (dynamicAppBar.length > 1) {
      toast.info("Bulk delete feature is not added yet!", {
        toastId: "Bulk delete feature is not added yet!",
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.info("Products not selected to delete !", {
        toastId: "Products not selected to delete !",
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleBulkDownloadProduct = () => {
    if (dynamicAppBar.length > 0) {
      //redux call
    } else {
      toast.info("Products not selected to download !", {
        toastId: "Products not selected to download !",
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleDownloadProductTemplate = () => {
    handleDownloadTemplateModalClose();
    handleUploadModalOpen();
    //redux call
  };

  const handleBulkUploadProduct = () => {
    if (dynamicAppBar.length > 0) {
      //redux call
    } else {
      toast.info("Products not selected to upload !", {
        toastId: "Products not selected to upload !",
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const filterStatus = (status_value) => {
    if (status_value) {
      dispatch(
        fetchSearchProduct({
          filter_params: "status",
          param_value: status_value,
        })
      );
    }
  }; //status filter

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
  }; //status filter

  const handleSortMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setAnchorEl(null);
  }; //sort

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  }; //filter

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  }; //view

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleFilterMenuOpen = (event) => {
    setFilterMenu(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenu(null);
    handleMenuClose();
    handleMobileMenuClose();
  };
  const menuId = "primary-search-account-menu";

  const sortOptions = [
    {
      label: "None",
      endIcon: null,
      func: (value) => {
        dispatch(fetchSearchProduct({ "": "" }, "sort"));
        handleSortMenuClose();
      },
      disabled: false,
    },
    {
      label: "Product ID",
      endIcon: <KeyboardArrowRightIcon />,
      disabled: false,
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
      endIcon: <KeyboardArrowRightIcon />,
      disabled: false,
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

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {sortOptions.map((option) => {
        if (option.subItems) {
          return (
            <Dropdown.Item isDisabled={true}>
              {option.label}
              <Box sx={{ flexGrow: 1 }} />
              <IconButton size="small" color="inherit">
                {option.endIcon}
              </IconButton>
              <Dropdown.Submenu position="left">
                {option.subItems.map((subOption) => (
                  <Dropdown.Item
                    onClick={() => {
                      option.func(subOption.key);
                    }}
                  >
                    {subOption.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Submenu>
            </Dropdown.Item>
          );
        } else {
          return (
            <Dropdown.Item onClick={option.func}>
              {option.label}
              <Box sx={{ flexGrow: 1 }} />
              <IconButton size="small" color="inherit">
                {option.endIcon}
              </IconButton>
            </Dropdown.Item>
          );
        }
      })}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderViewMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          dispatch({ type: "LIST_VIEW", payload: "listView" });
          handleMobileMenuClose();
        }}
      >
        <IconButton size="large" color="inherit">
          <ListIcon />
        </IconButton>
        <p>List View</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch({ type: "GRID_VIEW", payload: "gridView" });
          handleMobileMenuClose();
        }}
      >
        <IconButton size="large" color="inherit">
          <ViewComfyIcon />
        </IconButton>
        <p>Grid View</p>
      </MenuItem>
    </Menu>
  );

  const [filterOptions, setFilterOptions] = useState([
    {
      label: "Filter by Category",
      icon: <FilterAltIcon />,
      endIcon: <KeyboardArrowRightIcon fontSize="small" />,
      collapseState: false,
      func: (id) => {
        filterFunc(id, "category");
      },
      subMenu: [],
    },
    // {
    //   label: "Filter by Sub Category",
    //   icon: <FilterAltIcon />,
    //   endIcon: <KeyboardArrowDownIcon fontSize="medium" />,
    //   collapseState: false,
    // },
    // {
    //   label: "Filter by Attributes",
    //   icon: <FilterAltIcon />,
    //   endIcon: <KeyboardArrowRightIcon fontSize="small" />,
    //   collapseState: false,
    // },
    // {
    //   label: "Filter by Status",
    //   icon: <FilterAltIcon />,
    //   endIcon: <KeyboardArrowRightIcon fontSize="small" />,
    //   collapseState: false,
    //   value: "",
    //   func: filterStatus,
    //   subMenu: [
    //     {
    //       label: "Active",
    //       icon: null,
    //       endIcon: null,
    //       value: "true",
    //     },
    //     {
    //       label: "Inactive",
    //       icon: null,
    //       endIcon: null,
    //       value: "false",
    //     },
    //   ],
    // },
    {
      label: "Filter by Product Type",
      icon: <FilterAltIcon />,
      endIcon: <KeyboardArrowRightIcon fontSize="small" />,
      collapseState: false,
      func: (id) => {
        filterFunc(id, "productType");
      },
      subMenu: [],
    },
    // {
    //   label: "Filter by Channel of Sale",
    //   icon: <FilterAltIcon />,
    //   endIcon: <KeyboardArrowRightIcon fontSize="small" />,
    //   collapseState: false,
    // },
    {
      label: "Filter by Archive",
      icon: <FilterAltIcon />,
      endIcon: <KeyboardArrowRightIcon fontSize="small" />,
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
      func: (value) => {
        filterFunc(value, "archive");
      },
    },
  ]);
  const filterMenuId = "primary-search-account-menu-mobile";
  const renderFilterMenu = (filterOptions) => (
    <Menu
      anchorEl={filterMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={filterMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isFilterMenuOpen}
      onClose={handleFilterMenuClose}
    >
      {filterOptions.map((option, index) => {
        if (option.subMenu) {
          return (
            <Box>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ borderRadius: "0px" }}
                >
                  <IconButton size="large" color="inherit">
                    {option.icon}
                  </IconButton>
                  <Typography>{option.label}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Autocomplete
                    size="small"
                    disablePortal={false}
                    id="combo-box-demo"
                    options={option.subMenu}
                    onChange={(event, value) => {
                      option.func(value && value.value);
                    }}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={`Search ${option.label.substring(0, 15)}...`}
                      />
                    )}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
          );
        } else {
          return (
            <Dropdown.Item onClick={null}>
              <IconButton size="large" color="inherit">
                {option.icon}
              </IconButton>
              <p>{option.label}</p>
            </Dropdown.Item>
          );
        }
      })}
      {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="text" style={{ textTransform: "none" }}>
          Cancel
        </Button>
        <Button variant="contained" style={{ textTransform: "none" }}>
          Apply
        </Button>
      </Box> */}
    </Menu>
  );

  //local variables
  const dispatch = useDispatch();
  const view = useSelector((state) => state.productView.productView); //used to access variables and states
  const [searchInput, setSearchInput] = useState("");

  //Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [favouriteModalOpen, setFavouriteModalOpen] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [donwloadTemplateModalOpen, setDownloadTemplateModalOpen] =
    useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const handleDeleteModalOpen = (product_id) => {
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handleFavouriteModalOpen = (product_id) => {
    if (dynamicAppBar.length > 0) {
      setFavouriteModalOpen(true);
    } else {
      toast.info("Products not selected to Favorite", {
        toastId: "Products not selected to Favorite",
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleFavouriteModalClose = () => {
    setFavouriteModalOpen(false);
  };

  const handleArchiveModalOpen = (product_id) => {
    if (dynamicAppBar.length > 0) {
      setArchiveModalOpen(true);
    } else {
      toast.info("Products not selected to Archive !", {
        toastId: "Products not selected to Archive !",
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleArchiveModalClose = () => {
    setArchiveModalOpen(false);
  };

  const handleDownloadModalOpen = (product_id) => {
    setDownloadModalOpen(true);
  };

  const handleDownloadModalClose = () => {
    setDownloadModalOpen(false);
  };

  const handleDownloadTemplateModalOpen = (product_id) => {
    setDownloadTemplateModalOpen(true);
    handleUploadModalClose();
  };

  const handleDownloadTemplateModalClose = () => {
    setDownloadTemplateModalOpen(false);
    handleUploadModalOpen();
  };

  const handleUploadModalOpen = (product_id) => {
    setUploadModalOpen(true);
  };

  const handleUploadModalClose = () => {
    setUploadModalOpen(false);
  };

  //styling
  const theme = createTheme({
    components: {
      // Name of the component
      MuiPopover: {
        styleOverrides: {
          // Name of the slot
          paper: {
            // Some CSS
            overflow: "unset",
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          // Name of the slot
          list: {
            // Some CSS
            paddingTop: "0px!important",
            paddingBottom: "0px!important",
            boxShadow: "0px 4px 8px rgb(0 0 0 / 10%)!important",
            backgroundColor: "#fff!important",
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          // Name of the slot
          content: {
            // Some CSS
            minHeight: "10px",

            height: " 50px!important",
            position: "relative!important",
            fontSize: "14px!important",
            lineHeight: "1.4!important",
            padding: "8px 12px!important",
            cursor: "pointer!important",
            userSelect: "none!important",
            outline: "none!important",
            transition: "all 160ms ease-out!important",
            whiteSpace: "nowrap!important",
            display: "flex!important",
            alignItems: "center!important",
            color: "#172B4D!important",
            // minHeight: "0px",
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            // width: "100%!important",
            boxShadow: "none!important",
            // borderBottomLeftRadius: "0px!important",
          },
        },
      },
      MuiCollapse: {
        styleOverrides: {
          wrapper: {
            overflow: "auto",
            // height: "100px",
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            padding: "8px",
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            borderBottomLeftRadius: "0px",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          // Name of the slot
          input: {
            // Some CSS
            marginTop: "4px",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            padding: "8px",
            color: "#001661",
            ":hover": {
              backgroundColor: "rgba(239, 242, 254, 0.75)",
            },
          },
        },
      },
    },
  });

  //render function
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, backgroundColor: "#fff" }}>
        {/* <AppBar position="static" color="inherit" enableColorOnDark> */}
        <Toolbar
          sx={{ borderBottom: "1px solid rgb(185,185,185)", height: "60px" }}
        >
          {dynamicAppBar.length === 0 ? (
            <>
              {/* <Link to="/products/addProduct">
                <Button
                  // variant="contained"
                  className="btn_primary"
                  style={{ textTransform: "none", background: "#416BFF" }}
                  // sx={{ background: "#416BFF" }}
                >
                  Create
                </Button>
              </Link> */}
              {/* <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <ReplayIcon
                  onClick={(e) => searchItems("")}
                  sx={{ width: "32px", height: "32px", padding: "4px" }}
                />
              </IconButton> */}
              {/* <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={() => {
                    toast.info("Products not selected to download !", {
                      toastId: "Products not selected to download !",
                      autoClose: 1000,
                      position: toast.POSITION.TOP_RIGHT,
                    });
                  }}
                >
                  <DownloadOutlinedIcon />
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={handleUploadModalOpen}
                >
                  <UploadOutlinedIcon />
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <SyncOutlinedIcon />
                </IconButton> */}
            </>
          ) : dynamicAppBar.length === 1 ? (
            <>
              {/* <Button
                variant="outlined"
                sx={{ color: "#416BFF", borderColor: "#416BFF" }}
                style={{ textTransform: "none" }}
                endIcon={<KeyboardArrowRightIcon fontSize="small" />}
                onClick={() => {
                  dispatch(getproductData(productTemplateId));
                  setTimeout(() => {
                    history.push(
                      `/products/editProductTemplate/${productTemplateId}`
                    );
                  }, 500);
                }}
              >
                Edit
              </Button> */}

              <Box sx={{ marginRight: "4px" }} />

              {/* <Button
                  variant="outlined"
                  style={{ textTransform: "none" }}
                  endIcon={<KeyboardArrowRightIcon fontSize="small" />}
                  onClick={handleChannelStatusModalOpen}
                >
                  Status
                </Button> */}

              {/* <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={handleDeleteModalOpen}
              >
                <DeleteOutlineIcon
                  sx={{ width: "32px", height: "32px", padding: "4px" }}
                />
              </IconButton> */}
              {/* <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={handlePrintQRBarCodeModalOpen}
                >
                  <PrintOutlinedIcon />
                </IconButton> */}
              {/* <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={handleFavouriteModalOpen}
              >
                <StarBorderIcon
                  sx={{ width: "32px", height: "32px", padding: "4px" }}
                />
              </IconButton> */}
              {/* <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={handleDownloadModalOpen}
                >
                  <DownloadOutlinedIcon />
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={handleUploadModalOpen}
                >
                  <UploadOutlinedIcon />
                </IconButton> */}
            </>
          ) : dynamicAppBar.length > 1 ? (
            // <>
            //   <Button
            //     variant="outlined"
            //     style={{ textTransform: "none" }}
            //     endIcon={<KeyboardArrowRightIcon size="small" />}
            //     onClick={handleChannelStatusModalOpen}
            //   >
            //     Status
            //   </Button>

            //   <IconButton
            //     size="large"
            //     aria-label="show 4 new mails"
            //     color="inherit"
            //     onClick={handleDeleteModalOpen}
            //   >
            //     <DeleteOutlineIcon />
            //   </IconButton>
            //   <IconButton
            //     size="large"
            //     aria-label="show 4 new mails"
            //     color="inherit"
            //     onClick={handlePrintQRBarCodeModalOpen}
            //   >
            //     <PrintOutlinedIcon />
            //   </IconButton>
            //   <IconButton
            //     size="large"
            //     aria-label="show 4 new mails"
            //     color="inherit"
            //     onClick={handleFavouriteModalOpen}
            //   >
            //     <StarBorderIcon />
            //   </IconButton>
            //   <IconButton
            //     size="large"
            //     aria-label="show 4 new mails"
            //     color="inherit"
            //     onClick={handleDownloadModalOpen}
            //   >
            //     <DownloadOutlinedIcon />
            //   </IconButton>
            //   <IconButton
            //     size="large"
            //     aria-label="show 4 new mails"
            //     color="inherit"
            //     onClick={handleUploadModalOpen}
            //   >
            //     <UploadOutlinedIcon />
            //   </IconButton>
            // </>
            <Typography>Bulk operations will be updated shortly...</Typography>
          ) : null}

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* <Search
                onClick={() => setEnableSearchOptions(true)}
                onAbort={() => setEnableSearchOptions(false)}
                // onAnimationEnd={() => setEnableSearchOptions(false)}
                onCanPlayThrough={() => setEnableSearchOptions(false)}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => searchItems(e.target.value)}
                />
              </Search> */}

            <Box
              style={{
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Collapse
                orientation="horizontal"
                in={showSearchBox}
                // collapsedSize={40}
              >
                <Autocomplete
                  style={{ overflow: "hidden" }}
                  noOptionsText={""}
                  disableClearable={true}
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  options={[
                    { label: "Product Name : ", value: "product_name" },
                    { label: "SKUID : ", value: "skuId" },
                  ]}
                  // value={inventoryAdjustmentList[tempCount].item_number}
                  onChange={(e, value) => {
                    setSearchType(value ? value.value : "");
                  }}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search"
                      onChange={(event) => {
                        const string = event.target.value.split(":")[1].trim();
                        searchItems(string);
                      }}
                      // onKeyDown={(event) => {
                      //   const string = event.target.value.split(": ")[1];
                      // }}
                    />
                  )}
                />
              </Collapse>

              {!showSearchBox ? (
                <IconButton
                  size="large"
                  color="inherit"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setshowSearchBox(true);
                  }}
                >
                  <SearchIcon
                    sx={{ width: "32px", height: "32px", padding: "4px" }}
                  />
                </IconButton>
              ) : (
                <IconButton
                  size="large"
                  color="inherit"
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                  onClick={() => {
                    setshowSearchBox(false);

                    searchItems("");
                  }}
                >
                  <CloseIcon
                    sx={{ width: "32px", height: "32px", padding: "4px" }}
                  />
                </IconButton>
              )}
            </Box>

            {/* <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={handleArchiveModalOpen}
            >
              <ArchiveIcon
                sx={{ width: "32px", height: "32px", padding: "4px" }}
              />
            </IconButton> */}
            <IconButton
              size="large"
              color="inherit"
              onClick={handleFilterMenuOpen}
            >
              <FilterAltOutlinedIcon
                sx={{ width: "32px", height: "32px", padding: "4px" }}
              />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleSortMenuOpen}
              color="inherit"
            >
              <ImportExportIcon
                sx={{ width: "32px", height: "32px", padding: "4px" }}
              />
            </IconButton>
            {/* <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleFavouriteModalOpen}
              color="inherit"
            >
              <StarBorderIcon
                sx={{ width: "32px", height: "32px", padding: "4px" }}
              />
            </IconButton> */}
            {/* <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              {view === "listView" ? (
                <ListIcon
                  sx={{ width: "32px", height: "32px", padding: "4px" }}
                />
              ) : (
                <ViewComfyIcon
                  sx={{ width: "32px", height: "32px", padding: "4px" }}
                />
              )}
            </IconButton> */}
          </Box>
        </Toolbar>
        {/* </AppBar> */}
        <Box>{renderFilterMenu(filterOptions)}</Box>

        {renderViewMenu}
        {renderMenu}
        {deleteModalOpen && (
          <ModalView
            handleDeleteProduct={handleBulkDeleteProduct}
            handleModalClose={handleDeleteModalClose}
            modalOpen={deleteModalOpen}
            primary={"You are about to Delete these Products and Variants"}
            secondary={
              "This will Delete your variants from the list Are you sure?"
            }
            disclaimer={
              "Note: This includes Products and this will delete all  the variants of the product"
            }
            actionBtns={["Cancel", "Delete"]}
          />
        )}
        {favouriteModalOpen && (
          <ModalView
            handleDeleteProduct={handleBulkFavouriteProduct}
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
            handleDeleteProduct={handleBulkArchiveProduct}
            handleModalClose={handleArchiveModalClose}
            modalOpen={archiveModalOpen}
            primary={"You are about to Archive these product"}
            secondary={
              "This will remove these products from your product list. Are you sure?"
            }
            disclaimer={
              "Disclaimer: If the selected products are actice or enabled, Products will be changed to Inactive or disabled."
            }
            actionBtns={["Cancel", "Archive"]}
          />
        )}
        {downloadModalOpen && (
          <ModalView
            handleDeleteProduct={handleBulkDownloadProduct}
            handleModalClose={handleDownloadModalClose}
            modalOpen={downloadModalOpen}
            primary={"You are about to Download these Products"}
            secondary={
              "This will Download products in spreadsheet format are you sure?"
            }
            disclaimer={
              "Disclaimer: This includes products so all the variants lies to that product are also Export"
            }
            actionBtns={["Cancel", "Download"]}
          />
        )}
        {donwloadTemplateModalOpen && (
          <ModalView
            handleDeleteProduct={handleDownloadProductTemplate}
            handleModalClose={handleDownloadTemplateModalClose}
            modalOpen={donwloadTemplateModalOpen}
            primary={"You are about to Download upload product template."}
            secondary={
              "This will Download products template in excelsheet format are you sure?"
            }
            disclaimer={""}
            actionBtns={["Cancel", "Download"]}
          />
        )}

        {uploadModalOpen && (
          <ModalView
            handleDeleteProduct={handleBulkUploadProduct}
            handleModalClose={handleUploadModalClose}
            modalOpen={uploadModalOpen}
            primary={"Do you want to upload your products?"}
            secondary={"upload"}
            disclaimer={""}
            actionBtns={["Cancel", "Upload"]}
            handleDownloadTemplateModalOpen={handleDownloadTemplateModalOpen}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}



/*
 Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)
 All rights reserved.
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License v3.0 as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License v3.0 for more details.
 You should have received a copy of the GNU Lesser General Public License v3.0
 along with this program.  If not, see <https://www.gnu.org/licenses/lgpl-3.0.html/>.
*/