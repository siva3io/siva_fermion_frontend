import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//mui
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import {
  Avatar,
  Card,
  FormControl,
  FormControlLabel,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import useStyles from "./styles";

const headCells = [
  {
    id: "contactName",
    numeric: true,
    disablePadding: true,
    label: "Contact Name",
  },
  {
    id: "companyName",
    numeric: true,
    disablePadding: false,
    label: "Company Name",
  },
  {
    id: "phNo",
    numeric: true,
    disablePadding: false,
    label: "PH. no.",
  },
  {
    id: "emailId",
    numeric: true,
    disablePadding: false,
    label: "Email ID",
  },
  {
    id: "businessType",
    numeric: true,
    disablePadding: false,
    label: "Business Type",
  },
  {
    id: "select",
    numeric: true,
    disablePadding: false,
    label: "Select",
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
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            // size="small"
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              size="small"
              align={"center"}
              sx={{ textAlign: "center", alignItems: "center" }}
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

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    ></Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function ContactList({
  selected,
  setSelected,
  deleteContact,
  optionSelected,
  detail,
  params,
  setParams,
  heading,
  setSelectedValue,
  selectedValue,
}) {
  console.log(detail, "detailsInConTactListIn ASN");

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selectArchive, setSelectArchive] = React.useState();
  const [selectFavourite, setSelectFavourite] = React.useState();
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [productId, setProductId] = useState(0);
  const [allContactData, setAllContactData] = useState();

  const contactsData = useSelector((state) => state.allContacts?.contacts);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = contactsData.map((n) => n.id);

      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    // console.log("EVENT", event, "NAME", name);

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
    setParams({
      per_page: Number(rowsPerPage),
      // page_no: Number(newPage * rowsPerPage),
      page_no: Number(newPage + 1),
    });
  };

  const handleChangeRowsPerPage = (event, newPage) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setParams({
      per_page: Number(parseInt(event.target.value, 10)),
      page_no: 0,
    });
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - contactsData.length) : 0;

  const datePipe = (dateString) => {
    let date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedContactId, setSelectedContactId] = useState();

  useEffect(() => {
    setAllContactData(contactsData);
  }, [contactsData]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <Box className={classes.tableBox} sx={{ width: "100%" }}>
      <Paper className={classes.tablePaper}>
        <TableContainer>
          <Table
            className={classes.tableInsideContainer}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              // rowCount={contactsData && contactsData.length}
            />
            <TableBody>
              {detail &&
                detail?.length > 0 &&
                detail?.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <>
                      <TableRow hover>
                        <TableCell size="small" align="center">
                          {row?.name
                            ? row?.name.charAt(0).toUpperCase() +
                              (row?.name.slice(1).length > 12
                                ? row?.name
                                    .slice(1)
                                    // .split(" ")[0]
                                    .substring(0, 12) + "..."
                                : row?.name.slice(1))
                            : "--"}
                        </TableCell>
                        <TableCell size="small" align="center">
                          {row?.company_name ? row.company_name : "--"}
                        </TableCell>
                        <TableCell size="small" align="center">
                          {row?.primary_phone ? row.primary_phone : "--"}
                        </TableCell>
                        <TableCell size="small" align="center">
                          {row?.primary_email ? row.primary_email : "--"}
                        </TableCell>
                        <TableCell size="small" align="center">
                          {row?.contact_type?.display_name
                            ? row.contact_type?.display_name
                            : "--"}
                        </TableCell>
                        <TableCell align="center" size="small">
                          <FormControl>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="radio-buttons-group"
                            >
                              <FormControlLabel
                                control={
                                  <Radio
                                    value={row.id}
                                    checked={selectedValue == row.id}
                                    onChange={handleChange}
                                  />
                                }
                              />
                            </RadioGroup>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
            </TableBody>

            {!detail?.length > 0 && (
              <Box
                style={{
                  width: "max-content",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "auto",
                }}
                className="nodata_text"
              >
                No data found
              </Box>
            )}
          </Table>
        </TableContainer>

        <TablePagination
          className="footer"
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={100}
          page={page}
          // page={params.offset}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          // rowsPerPage={params.limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
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
