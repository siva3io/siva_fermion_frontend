import React, { useState } from "react";
import ModalView from "./Modal/ModalView";
import ListMenu from "./ListMenu";
import { useHistory } from "react-router-dom";
//redux
import { useDispatch } from "react-redux";
import { fetchSearchProduct } from "../../redux/Action/SearchOutput";
import {
  postDeleteProduct,
  postfavouriteProduct,
  postArchiveProduct,
} from "../../redux/Action/MiscAction";
import { getproductData } from "../../redux/Action/FetchProductDataAction";

//mui
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import {
  Chip,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
  Switch,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

const headCells = [
  {
    id: "productName",
    numeric: false,
    disablePadding: true,
    label: "Product Name",
  },

  {
    id: "SKU ID",
    numeric: true,
    disablePadding: false,
    label: "SKU ID",
  },
  {
    id: "category",
    numeric: true,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "sub-category",
    numeric: true,
    disablePadding: false,
    label: "Sub-Category",
  },
  {
    id: "created-date",
    numeric: true,
    disablePadding: false,
    label: "Created Date",
  },
  /* {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  }, */
  {
    id: "mrp",
    numeric: true,
    disablePadding: false,
    label: "MRP",
  },
  {
    id: "sales-price",
    numeric: true,
    disablePadding: false,
    label: "Sales Price",
  },
  /* {
    id: "qty",
    numeric: true,
    disablePadding: false,
    label: "Qty. in Hand",
  },
  {
    id: "last_synced",
    numeric: true,
    disablePadding: false,
    label: "Last Synced",
  },
  {
    id: "channelStatus",
    numeric: true,
    disablePadding: false,
    label: "Channel Status",
  }, */
  {
    id: "validation-info",
    numeric: true,
    disablePadding: false,
    label: "Validation Info",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
            sx={{ color: "#001661", padding: "0px 6px" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel> */}
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function ProductsTable({
  products_data,
  info,
  setParams,
  handleChangeDyanmicAppBar,
  handleChannelStatusModalOpen,
  handlePrintQRBarCodeModalOpen,
  setProductTemplateId,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(info.page_no - 1);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [productId, setProductId] = useState(0);
  const [variantId, setVariantId] = useState(0);
  const [customOptions, setCustomOptions] = useState([
    {
      label: "View Product",
      func: (product_id) => handleViewProduct(product_id),
    },

    // {
    //   label: "Mark as Favourite",
    //   func: (product_id) => handleFavouriteModalOpen(product_id),
    // },
    {
      label: "Edit Product Template",
      func: (product_id) => handleEditProductTemplate(product_id),
    },
    {
      label: "Edit Product Variant",
      func: (product_id) => handleEditProductVariant(product_id),
    },
    // {
    //   label: "Channel Staus",
    //   func: (product_id) => handleChannelStatusModalOpen(product_id),
    // },
    // {
    //   label: "Print QR Code/Bar Code",
    //   func: (product_id) => handlePrintQRBarCodeModalOpen(product_id),
    // },
    // {
    //   label: "Download Product",
    //   func: (product_id) => handleDownloadModalOpen(product_id),
    // },
    // {
    //   label: "Archive Product",
    //   func: (product_id) => handleArchiveModalOpen(product_id),
    // },
    {
      label: "Delete Product",
      func: (product_id) => handleModalOpen(product_id),
    },
  ]);

  //Modal
  const [modalOpen, setModalOpen] = useState(false); //delete
  const [favouriteModalOpen, setFavouriteModalOpen] = useState(false); //favourite
  const [archiveModalOpen, setArchiveModalOpen] = useState(false); //archive
  const [downloadModalOpen, setDownloadModalOpen] = useState(false); //download

  //delete
  const handleModalOpen = (product_id) => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  //favourites
  const handleFavouriteModalOpen = (product_id) => {
    setFavouriteModalOpen(true);
  };

  const handleFavouriteModalClose = () => {
    setFavouriteModalOpen(false);
  };

  //archive
  const handleArchiveModalOpen = (product_id) => {
    setArchiveModalOpen(true);
  };

  const handleArchiveModalClose = () => {
    setArchiveModalOpen(false);
  };

  //download
  const handleDownloadModalOpen = (product_id) => {
    setDownloadModalOpen(true);
  };

  const handleDownloadModalClose = () => {
    setDownloadModalOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products_data.map((n) => n.id);
      handleChangeDyanmicAppBar(newSelecteds);
      setSelected(newSelecteds);
      return;
    }
    handleChangeDyanmicAppBar([]);
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    handleChangeDyanmicAppBar(newSelected);
    if (newSelected.length > 1) {
      setCustomOptions([
        // {
        //   label: "Mark as Favourite",
        //   func: (product_id) => handleFavouriteModalOpen(product_id),
        // },
        {
          label: "Create Bundle",
          func: (product_id) => handleBundleProducts(newSelected),
        },
        // {
        //   label: "Download Product",
        //   func: (product_id) => handleDownloadModalOpen(product_id),
        // },
        // {
        //   label: "Channel Staus",
        //   func: (product_id) => handleChannelStatusModalOpen(product_id),
        // },
        // {
        //   label: "Print QR Code/Bar Code",
        //   func: (product_id) => handlePrintQRBarCodeModalOpen(product_id),
        // },
        // {
        //   label: "Archive Product",
        //   func: (product_id) => handleArchiveModalOpen(product_id),
        // },
        // {
        //   label: "Delete Product",
        //   func: (product_id) => handleModalOpen(product_id),
        // },
      ]);
    }
    if (newSelected.length === 1) {
      setCustomOptions([
        {
          label: "View Product",
          func: (product_id) => handleViewProduct(product_id),
        },

        {
          label: "Mark as Favourite",
          func: (product_id) => handleFavouriteModalOpen(product_id),
        },
        // {
        //   label: "Download Product",
        //   func: (product_id) => handleDownloadModalOpen(product_id),
        // },
        {
          label: "Edit Product Template",
          func: (product_id) => handleEditProductTemplate(product_id),
        },
        // {
        //   label: "Edit Product Variant",
        //   func: (product_id) => handleEditProductVariant(product_id),
        // },
        // {
        //   label: "Channel Staus",
        //   func: (product_id) => handleChannelStatusModalOpen(product_id),
        // },
        // {
        //   label: "Print QR Code/Bar Code",
        //   func: (product_id) => handlePrintQRBarCodeModalOpen(product_id),
        // },
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
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setParams({
      limit: Number(info.per_page),
      offset: Number(newPage + 1),
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setParams({
      limit: Number(parseInt(event.target.value, 10)),
      offset: 0,
    });
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products_data.length) : 0;

  const datePipe = (dateString) => {
    let date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const handleViewProduct = (product_id) => {
    history.push(`/products/productView/${product_id}`);
  };

  const handleDeleteProduct = () => {
    dispatch(postDeleteProduct(variantId));
    setTimeout(() => {
      dispatch(fetchSearchProduct({ "": "" }, "delete"));
    }, 300);
    setModalOpen(false);
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

  const handleBulkDownloadProduct = () => {
    //redux call
  };

  const handleDownloadProductTemplate = () => {
    //redux call
  };

  const handleBulkUploadProduct = () => {
    //redux call
  };

  const handleEditProductTemplate = (id) => {
    dispatch(getproductData(id));
    setTimeout(() => {
      history.push(`/products/editProductTemplate/${id}`);
    }, 500);
  };

  const handleEditProductVariant = (id) => {
    setTimeout(() => {
      history.push(`/products/editProductVariant/${id}`);
    }, 200);
  };

  const handleBundleProducts = (product_id) => {
    history.push(`/products/bundles`);
  };

  //styling
  const theme = createTheme({
    components: {
      // Name of the component
      MuiTableCell: {
        styleOverrides: {
          root: {
            textAlign: "center",
            padding: "8px",
          },
          // Name of the slot
          head: {
            // Some CSS
            // overflow: "unset",
            fontSize: " 14px",
            fontFamily: "Poppins",
            color: "#001661",
            padding: "8px",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            // fontFamily: "Poppins",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            width: "100%!important",
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            width: "100%!important",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: "Poppins",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "#416BFF",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
          },
        },
      },
      MuiTableRow: {
        // styleOverrides: {
        hover: {
          backgroundColor: "green",
        },
        // },
      },
    },
  });

  //render functions
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%" }}>
          <TableContainer sx={{ minHeight: "80vh" }}>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={products_data && products_data.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {
                  //   stableSort(detail, getComparator(order, orderBy))

                  //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  products_data && products_data.length > 0 ? (
                    products_data.map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              onClick={(event) => {
                                setProductTemplateId(row.product_template_id);
                                handleClick(event, row.id);
                              }}
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                              sx={{
                                color: "#001661",
                                padding: "5px!important",
                              }}
                            />
                          </TableCell>

                          <TableCell
                            align="center"
                            onClick={(event) => {
                              handleClick(event, row.product_template_id);
                              history.push(
                                `/products/productView/${row.product_template_id}`
                              );
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "start",
                              }}
                            >
                              <img
                                src={
                                  row["image_options"]
                                    ? row["image_options"][0]?row["image_options"][0].data?row["image_options"][0].data!=""?"data:image/png;base64,"+row["image_options"][0].data
                                      : row["image_options"][0].link : row["image_options"][0].link
                                      : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                                    : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"

                                }
                                height={"28px"}
                                width={"28px"}
                                alt="product_img"
                              ></img>
                              <Box sx={{ ml: 2 }}>
                                {row["product_name"]
                                  ? row["product_name"].length > 20
                                    ? `${row["product_name"].substring(
                                        0,
                                        20
                                      )}...`
                                    : row["product_name"]
                                  : "--"}
                              </Box>
                            </Box>
                          </TableCell>

                          <TableCell
                            align="center"
                            onClick={(event) => {
                              handleClick(event, row.product_template_id);
                              history.push(
                                `/products/productView/${row.product_template_id}`
                              );
                            }}
                          >
                            {row["sku_id"]
                              ? row["sku_id"].length > 20
                                ? `${row["sku_id"].substring(0, 20)}...`
                                : row["sku_id"]
                              : "--"}
                          </TableCell>
                          <TableCell
                            align="center"
                            onClick={(event) => {
                              handleClick(event, row.product_template_id);
                              history.push(
                                `/products/productView/${row.product_template_id}`
                              );
                            }}
                          >
                            {row["category"]
                              ? row["category"].name > 20
                                ? `${row["category"].name.substring(0, 20)}...`
                                : row["category"].name
                              : "--"}
                          </TableCell>
                          <TableCell
                            align="center"
                            onClick={(event) => {
                              handleClick(event, row.product_template_id);
                              history.push(
                                `/products/productView/${row.product_template_id}`
                              );
                            }}
                          >
                            {row["leaf_category"]
                              ? row["leaf_category"].name > 20
                                ? `${row["leaf_category"].name.substring(
                                    0,
                                    20
                                  )}...`
                                : row["leaf_category"].name
                              : "--"}
                          </TableCell>
                          <TableCell
                            align="center"
                            onClick={(event) => {
                              handleClick(event, row.product_template_id);
                              history.push(
                                `/products/productView/${row.product_template_id}`
                              );
                            }}
                          >
                            {row["created_date"]
                              ? datePipe(row["created_date"])
                              : "--"}
                          </TableCell>
                          {/* <TableCell
                            align="center"
                            onClick={(event) => {
                              handleClick(event, row.product_template_id);
                              history.push(
                                `/products/productView/${row.product_template_id}`
                              );
                            }}
                          >
                            {row.description
                              ? row.description?.data
                              : 
                                "--"}
                          </TableCell> */}
                          <TableCell
                            align="center"
                            onClick={(event) => {
                              handleClick(event, row.product_template_id);
                              history.push(
                                `/products/productView/${row.product_template_id}`
                              );
                            }}
                          >
                            {row["product_pricing_details"]
                              ? row["product_pricing_details"].mrp
                              : "--"}
                          </TableCell>
                          <TableCell
                            align="center"
                            onClick={(event) => {
                              handleClick(event, row.product_template_id);
                              history.push(
                                `/products/productView/${row.product_template_id}`
                              );
                            }}
                          >
                            {row["product_pricing_details"]
                              ? row["product_pricing_details"].sales_price
                              : "--"}
                          </TableCell>
                          {/* <TableCell
                            align="center"
                            onClick={(event) => {
                              handleClick(event, row.product_template_id);
                              history.push(
                                `/products/productView/${row.product_template_id}`
                              );
                            }}
                          >
                            {row["qty_available"] ? row["qty_available"] : "--"}
                          </TableCell>
                          <TableCell
                            align="center"
                            onClick={(event) => {
                              handleClick(event, row.product_template_id);
                              history.push(
                                `/products/productView/${row.product_template_id}`
                              );
                            }}
                          >
                            {row["updated_date"]
                              ? datePipe(row["updated_date"])
                              : "--"}
                          </TableCell>
                          <TableCell align="center">
                            
                            <Chip
                              label={
                                row["status"] && row["status"] === true
                                  ? "Active"
                                  : "Inactive"
                              }
                              
                              sx={{
                                background:
                                  row["status"] === true
                                    ? "#CB7195"
                                    : "#CB7195",
                                color: "#FFFFFF",
                              }}
                            />
                          </TableCell> */}
                          <TableCell
                            align="center"
                            onClick={(event) => {
                              handleClick(event, row.product_template_id);
                              history.push(
                                `/products/productView/${row.product_template_id}`
                              );
                            }}
                          >
                            {row["validation_info"]
                              ? row["validation_info"]
                              : "---"}
                          </TableCell>
                          <TableCell align="center">
                            <Box className="action_class">
                              <ListMenu
                                customOptions={customOptions}
                                product_id={
                                  row.product_template_id &&
                                  row.product_template_id
                                }
                                variant_id={row.id}
                                setProductId={setProductId}
                                setVariantId={setVariantId}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <Box className="nodata_text_list">No data found</Box>
                  )
                }
                {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={info.total_rows}
            rowsPerPage={info.per_page}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {modalOpen && (
          <ModalView
            handleDeleteProduct={handleDeleteProduct}
            handleModalClose={handleModalClose}
            modalOpen={modalOpen}
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