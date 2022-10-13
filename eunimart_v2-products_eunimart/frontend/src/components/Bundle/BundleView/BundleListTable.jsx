import React, { useState } from "react";
import ModalView from "../../../shared/widgets/Modal/ModalView";
import ListMenu from "../../../shared/widgets/ListMenu";
import { useHistory } from "react-router-dom";
//redux
import { useDispatch } from "react-redux";
import { getBundleData } from "../../../redux/Action/Bundle/BundleView";
import { fetchBundle } from "../../../redux/Action/Bundle/FetchBundleListAction";
import {
  postDeleteProductBundle,
  postArchiveProductBundle,
} from "../../../redux/Action/Bundle/MisActions";
//mui
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import {
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

const headCells = [
  {
    id: "bundleName",
    numeric: false,
    disablePadding: true,
    label: "Bundle Name",
  },

  {
    id: "bundleId",
    numeric: true,
    disablePadding: false,
    label: "Bundle ID",
  },

  {
    id: "sellingPrice",
    numeric: true,
    disablePadding: false,
    label: "Selling Price",
  },
  {
    id: "instructions",
    numeric: true,
    disablePadding: false,
    label: "Instructions",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
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
            sx={{ padding: "0px" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
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
            </TableSortLabel>
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

export default function BundleListTable({
  products_data,
  info,
  totalRows,
  setParams,
  handleChangeDyanmicAppBar,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [productId, setProductId] = useState(null);

  //Modal
  const [modalOpen, setModalOpen] = useState(false); //delete
  const [favouriteModalOpen, setFavouriteModalOpen] = useState(false); //favourite
  const [archiveModalOpen, setArchiveModalOpen] = useState(false); //archive
  const [downloadModalOpen, setDownloadModalOpen] = useState(false); //download

  //delete
  const handleModalOpen = (bundle_id) => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  //archive
  const handleArchiveModalOpen = (product_id) => {
    setArchiveModalOpen(true);
  };

  const handleArchiveModalClose = () => {
    setArchiveModalOpen(false);
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
        {
          label: "Archive",
          func: (bundle_id) => handleArchiveModalOpen(bundle_id),
        },
        {
          label: "Delete",
          func: (bundle_id) => handleDeleteBundle(bundle_id),
        },
      ]);
    }
    if (newSelected.length === 1) {
      setCustomOptions([
        {
          label: "View",
          func: (bundle_id) => handleViewBundle(bundle_id),
        },
        {
          label: "Edit",
          func: (bundle_id) => handleEditBundle(bundle_id),
        },
        {
          label: "Duplicate",
          func: (bundle_id) => handleDuplicateBundle(bundle_id),
        },
        {
          label: "Archive",
          func: (bundle_id) => handleArchiveModalOpen(bundle_id),
        },
        {
          label: "Delete",
          func: (bundle_id) => handleModalOpen(bundle_id),
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

  const handleViewBundle = (bundle_id) => {
    if (bundle_id) {
      history.push(`/products/bundles/bundleView/${bundle_id}`);
    }
  };

  const handleEditBundle = (bundle_id) => {
    if (bundle_id) {
      dispatch(getBundleData(bundle_id));
      setTimeout(() => {
        history.push(`/products/bundles/editBundle/${bundle_id}`);
      }, 500);
    }
  };

  const handleDuplicateBundle = (bundle_id) => {
    dispatch(getBundleData(bundle_id));
    setTimeout(() => {
      history.push(`/products/bundles/duplicateBundle`);
    }, 500);
  };

  const handleArchiveProduct = () => {
    if (productId) {
      dispatch(postArchiveProductBundle(productId));
      setTimeout(() => {
        dispatch(fetchBundle({ limit: 10, offset: 1 }));
      }, 300);
      setArchiveModalOpen(false);
    }
  };

  const handleDeleteBundle = () => {
    if (productId) {
      dispatch(postDeleteProductBundle(productId));
      setTimeout(() => {
        dispatch(fetchBundle({ limit: 10, offset: 1 }));
      }, 300);
      setModalOpen(false);
    }
  };

  //styling
  const theme = createTheme({
    components: {
      // Name of the component
      MuiTableCell: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            padding: "4px",
          },
        },
      },
      MuiTableSortLabel: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            // fontWeight: "600",
            fontSize: "13px!important",
          },
        },
      },
    },
  });

  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (bundle_id) => handleViewBundle(bundle_id),
    },
    {
      label: "Edit",
      func: (bundle_id) => handleEditBundle(bundle_id),
    },
    {
      label: "Duplicate",
      func: (bundle_id) => handleDuplicateBundle(bundle_id),
    },
    {
      label: "Archive",
      func: (bundle_id) => handleArchiveModalOpen(bundle_id),
    },
    {
      label: "Delete",
      func: (bundle_id) => handleModalOpen(bundle_id),
    },
  ]);

  //render functions
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", padding: "20px" }}>
        <Paper sx={{ width: "100%" }}>
          <TableContainer sx={{ minHeight: "80vh" }}>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={products_data && products_data.length}
              />
              <TableBody>
                {products_data && products_data.length > 0 ? (
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
                            onClick={(event) => handleClick(event, row.id)}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            sx={{ padding: "0px" }}
                          />
                        </TableCell>
                        <TableCell
                          align="left"
                          onClick={(event) => {
                            handleClick(event, row.id);
                            history.push(
                              `/products/bundles/bundleView/${row.id}`
                            );
                          }}
                        >
                          {row["bundle_name"]
                            ? row["bundle_name"].length > 20
                              ? `${row["bundle_name"].substring(0, 20)}...`
                              : row["bundle_name"]
                            : "--"}
                        </TableCell>

                        <TableCell
                          align="left"
                          onClick={(event) => {
                            handleClick(event, row.id);
                            history.push(
                              `/products/bundles/bundleView/${row.id}`
                            );
                          }}
                        >
                          {row.bundle_id ? row.bundle_id : "--"}
                        </TableCell>
                        <TableCell
                          align="left"
                          onClick={(event) => {
                            handleClick(event, row.id);
                            history.push(
                              `/products/bundles/bundleView/${row.id}`
                            );
                          }}
                        >
                          {row["selling_price"] ? row["selling_price"] : "--"}
                        </TableCell>
                        <TableCell
                          align="left"
                          onClick={(event) => {
                            handleClick(event, row.id);
                            history.push(
                              `/products/bundles/bundleView/${row.id}`
                            );
                          }}
                        >
                          {row["instructions"]
                            ? row["instructions"].length > 25
                              ? `${row["instructions"].substring(0, 25)}...`
                              : row["instructions"]
                            : "--"}
                        </TableCell>
                        <TableCell align="left">
                          <Switch
                            defaultChecked={
                              row["status"] && row["status"].is_enabled
                            }
                          />
                        </TableCell>
                        <TableCell align="left">
                          <Box className="action_class">
                            <ListMenu
                              customOptions={customOptions}
                              product_id={row.id}
                              setProductId={setProductId}
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <Box
                    style={{
                      width: "max-content",
                    }}
                  >
                    No data found
                  </Box>
                )}
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
            handleDeleteProduct={handleDeleteBundle}
            handleModalClose={handleModalClose}
            modalOpen={modalOpen}
            primary={"You are about to Delete this Bundle"}
            secondary={
              "This will Delete your this Bundle from the list. Are you sure?"
            }
            actionBtns={["Cancel", "Delete"]}
          />
        )}

        {archiveModalOpen && (
          <ModalView
            handleDeleteProduct={handleArchiveProduct}
            handleModalClose={handleArchiveModalClose}
            modalOpen={archiveModalOpen}
            primary={"You are about to Archive these bundle"}
            secondary={
              "This will remove these bundle from your bundle list. Are you sure?"
            }
            disclaimer={
              "Disclaimer: If the selected Bundle are actice or enabled, Bundle will be changed to Inactive or disabled."
            }
            actionBtns={["Cancel", "Archive"]}
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