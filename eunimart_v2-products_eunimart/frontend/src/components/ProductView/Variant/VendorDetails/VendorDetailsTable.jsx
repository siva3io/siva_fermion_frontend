import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import { getVendorPriceList } from "../../../../redux/Action/FetchVPDetails";
import {
  Button,
  Checkbox,
  Table,
  Box,
  TableBody,
  Paper,
  TableSortLabel,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
} from "@mui/material";
import ModalViewV2 from "../../../../shared/widgets/Modal/ModalViewV2";
import PriceListTable from "./PriceListTable";
import VendorPriceListTable from "./VendorPricelistTable";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function EnhancedTableHead({ headCells, ...props }) {
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
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "left" : "left"}
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

export default function VendorDetailsTable({
  data,
  query,
  vendorsApi,
  setVendor,
  setSaveEnable,
}) {
  const dispatch = useDispatch();
  const headCells = [
    {
      id: "vendorName",
      numeric: false,
      disablePadding: true,
      label: "Vendor Name",
    },
    {
      id: "product",
      numeric: false,
      disablePadding: true,
      label: "Product",
    },

    {
      id: "vendorLeadTime",
      numeric: true,
      disablePadding: false,
      label: "Vendor Lead Time",
    },

    {
      id: "costPrice",
      numeric: true,
      disablePadding: false,
      label: "Cost Price",
    },
    {
      id: "vendorCreditPeriod",
      numeric: true,
      disablePadding: false,
      label: "Vendor Credit Period",
    },
    // {
    //   id: "addTax",
    //   numeric: true,
    //   disablePadding: false,
    //   label: "Add Tax",
    // },
    // {
    //   id: "units",
    //   numeric: true,
    //   disablePadding: false,
    //   label: "Units",
    // },
    // {
    //   id: "shippingIncludedinSP",
    //   numeric: true,
    //   disablePadding: false,
    //   label: "Shipping Included in SP",
    // },
    // {
    //   id: "taxIncludedInSP",
    //   numeric: true,
    //   disablePadding: false,
    //   label: "Tax Included in SP",
    // },
    // {
    //   id: "policyBill",
    //   numeric: true,
    //   disablePadding: false,
    //   label: "Policy Bill",
    // },
  ];

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [addPriceListModal, setAddPriceListModal] = useState(false);
  const [addVendorPriceListModal, setAddVendorPriceListModal] = useState(false);
  const pricelist = useSelector(
    (state) => state.fetchVPDetails.vendorPriceList.VendorPriceList
  );
  //copy
  const [vendorListPopulateData, setVendorListPopulateData] = useState({
    vendorName: "",
    vendorSKU: "",
    minQty: "",
    vendorId: "",
  });

  const [priceParams, setPriceParams] = useState({ limit: 10, offset: 1 });
  const [pricelistPopulateData, setPricelistPopulateData] = useState([]);
  //
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
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

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleVendorTable = (pricelistData) => {
    setPricelistPopulateData(pricelistData); //prepopulating purpose
    let tempVendorListArrGenerator = pricelistData.map((elem, index) => {
      let boolVal = true;
      for (let i = 0; i < data.price_list_details.length; i++) {
        if (elem.name === data.price_list_details[i].name) {
          return false;
        }
      }
      if (boolVal) {
        return elem;
      }
    });
    tempVendorListArrGenerator = tempVendorListArrGenerator.filter((elem) => {
      return typeof elem === "object";
    });
    let tempVendorListArrGenerator1 = data.price_list_details;
    let combinedArr = [
      ...tempVendorListArrGenerator1,
      ...tempVendorListArrGenerator,
    ];
    let tempVendor = { ...data };
    tempVendor.price_list_details = combinedArr;
    setVendor(tempVendor);
    setSaveEnable(true);
  };

  const handlePriceListModalClose = (value) => {
    if (value === false) {
      setAddVendorPriceListModal(false);
    } else {
      setAddVendorPriceListModal(false);
    }
  };

  const handleVendorList = () => {
    if (vendorListPopulateData.vendorName !== "") {
      handleModalClose();
      handleVendorPriceList();
    }
  };

  const handleModalClose = () => {
    setAddPriceListModal(false);
  };

  const handlePriceList = () => {
    setAddPriceListModal((prev) => !prev);
  };
  const handleVendorPriceList = () => {
    setAddVendorPriceListModal((prev) => !prev);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  //useEffect functions
  useEffect(() => {
    if (vendorListPopulateData && vendorListPopulateData.vendorId !== "") {
      setTimeout(() => {
        dispatch(
          getVendorPriceList(vendorListPopulateData.vendorId, priceParams)
        );
      }, 500);
    }
  }, [vendorListPopulateData]);

  useEffect(() => {}, [vendorsApi]);

  //render function
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
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
              rowCount={data && data.length}
              headCells={headCells}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 data.slice().sort(getComparator(order, orderBy)) */}
              {/* {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
              {data.price_list_details &&
                data.price_list_details.map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell> */}
                      <TableCell align="left">
                        {row.name ? row.name : "--"}
                      </TableCell>
                      <TableCell align="left">
                        {data.product_name ? data.product_name : "--"}
                      </TableCell>
                      <TableCell align="left">
                        {row.supply_lead_time
                          ? row.supply_lead_time.lead_time
                            ? row.supply_lead_time.lead_time
                            : "--"
                          : "--"}
                      </TableCell>

                      <TableCell align="left">{row.price}</TableCell>
                      <TableCell align="left">
                        {row.credit_period
                          ? row.credit_period.credit_period
                            ? row.credit_period.credit_period
                            : "--"
                          : "--"}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data && data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
        {query === false && (
          <Button sx={{ ml: "40%" }} onClick={handlePriceList}>
            +Add Another Vendor
          </Button>
        )}
      </Paper>
      {addPriceListModal && (
        <ModalViewV2
          modalTitle={"Vendor List"}
          handleModalClose={handleModalClose}
          handleDeleteProduct={handleVendorList}
          modalOpen={addPriceListModal}
          actionBtns={["Cancel", "Confirm"]}
          modalContentStyleHeight={"auto"}
          modalContentStyleWidth={"100%"}
          styleLeft={"calc(50% - 840px/2)"}
          styleHeight={"auto"}
          mainWidth={"auto"}
          modalContentStylePadding={"20px"}
        >
          <Box>
            <Box>
              <PriceListTable
                vendorsApi={vendorsApi && vendorsApi.data}
                vendorListPopulateData={vendorListPopulateData}
                setVendorListPopulateData={setVendorListPopulateData}
              />
            </Box>
          </Box>
        </ModalViewV2>
      )}
      {addVendorPriceListModal && (
        <ModalViewV2
          modalTitle={"Vendor List"}
          handleModalClose={() => handlePriceListModalClose(false)}
          handleDeleteProduct={() => handlePriceListModalClose(true)}
          modalOpen={addVendorPriceListModal}
          actionBtns={["Cancel", "Confirm"]}
          modalContentStyleHeight={"auto"}
          modalContentStyleWidth={"100%"}
          styleLeft={"calc(50% - 800px/2)"}
          styleHeight={"auto"}
          // mainWidth={"700px"}
          modalContentStylePadding={"20px"}
        >
          <Box>
            <VendorPriceListTable
              pricelist={pricelist}
              setParams={setPriceParams}
              vendorListPopulateData={vendorListPopulateData}
              setVendorListPopulateData={setVendorListPopulateData}
              handleVendorTable={handleVendorTable}
              pricelistPopulateData={pricelistPopulateData}
            />
          </Box>
        </ModalViewV2>
      )}
    </Box>
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