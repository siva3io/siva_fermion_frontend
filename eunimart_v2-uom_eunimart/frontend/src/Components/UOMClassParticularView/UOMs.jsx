import React from "react";
//redux
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
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

const headCells = [
  {
    id: "UOMCode",
    numeric: false,
    disablePadding: true,
    label: "UOM Code",
  },
  {
    id: "UOMName",
    numeric: true,
    disablePadding: false,
    label: "UOM Name",
  },
  {
    id: "UOMDescripton",
    numeric: true,
    disablePadding: false,
    label: "UOM Description",
  },

  {
    id: "BaseUOM",
    numeric: true,
    disablePadding: false,
    label: "Base UOM",
  },
  {
    id: "ConversioType",
    numeric: true,
    disablePadding: false,
    label: "Conversion Type",
  },
  {
    id: "ConversionFactor",
    numeric: true,
    disablePadding: false,
    label: "Conversion Factor",
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
    <TableHead sx={{ background: "#E7F0FD" }}>
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
            sx={{ color: "#001661", padding: "0px" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
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

function UOMs({ products_data, info, setParams }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(info.page_no - 1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products_data.map((n) => n.name);
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
    setParams({
      limit: Number(info.per_page),
      offset: Number(newPage + 1),
    });
  };

  const handleChangeRowsPerPage = (event) => {
    // setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setParams({
      limit: Number(parseInt(event.target.value, 10)),
      offset: 1,
    });
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

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
            fontWeight: "600",
          },
        },
      },
    },
  });

  return (
    <Box
      sx={{
        background: "#fff",
        p: 2,
        mt: 1,
        borderRadius: "8px",
      }}
    >
      <ThemeProvider theme={theme}>
        <Box sx={{ p: 1.5 }}>
          <Paper>
            <TableContainer>
              <Table aria-labelledby="tableTitle" size={"medium"}>
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
                              sx={{ color: "#001661", padding: "0px" }}
                            />
                          </TableCell>
                          <TableCell
                            align="center"
                            onClick={(event) => {
                              handleClick(event, row.name);
                            }}
                          >
                            {row?.code}
                          </TableCell>
                          <TableCell
                            align="center"
                            onClick={(event) => {
                              handleClick(event, row.name);
                            }}
                          >
                            {row["name"]
                              ? row["name"].length > 20
                                ? `${row["name"].substring(0, 20)}...`
                                : row["name"]
                              : "--"}
                          </TableCell>
                          <TableCell
                            align="center"
                            onClick={(event) => {
                              handleClick(event, row.name);
                            }}
                          >
                            {row["description"]
                              ? row["description"].length > 25
                                ? `${row["description"].substring(0, 25)}...`
                                : row["description"]
                              : "--"}
                          </TableCell>

                          <TableCell
                            align="center"
                            onClick={(event) => {
                              handleClick(event, row.name);
                            }}
                          >
                            {row?.base_uom}
                          </TableCell>
                          <TableCell
                            align="center"
                            onClick={(event) => {
                              handleClick(event, row.name);
                            }}
                          >
                            {row["conversion_type"]
                              ? row["conversion_type"].display_name
                              : "--"}
                          </TableCell>
                          <TableCell
                            align="center"
                            onClick={(event) => {
                              handleClick(event, row.name);
                            }}
                          >
                            {row["conversion_factor"]
                              ? row["conversion_factor"]
                              : "--"}
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
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default UOMs;

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