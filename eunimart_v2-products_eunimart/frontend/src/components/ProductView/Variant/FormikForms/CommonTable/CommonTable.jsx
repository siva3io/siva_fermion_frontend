import React, { useState } from "react";
import "./CommonTable.css";
//mui
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";

function CommonTable(props) {
  const headings = props.heading;
  const detail = props.detail;
  const [toggle, setToggle] = useState(-1);
  const [pages, setPages] = useState(5);
  const [allChecked, setAllchecked] = useState(false);
  const [users, setUsers] = useState(false);
  const [newToggle, setNewtoggle] = useState(0);

  const handleChange = (e) => {
    if (e.target.id === e.target.name) {
      setNewtoggle(e.target.name);
      setUsers((prev) => !prev);
    }
  };

  const [toggleOption, setToggleoption] = useState(1);

  const toggleContactOption = (index) => {
    setToggleoption(index);
  };

  const [createFromBtnOpen, setCreateFromBtnOpen] = useState(false);

  const createFromBtnOpenHandler = () => {
    setCreateFromBtnOpen((prevValue) => !prevValue);
  };
  const datePipe = (dateString) => {
    let date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };
  return (
    <>
      <Box className="pTTableMain">
        <Table className="pTcommonTable">
          <TableHead>
            <TableRow className="pTheader">
              <TableCell className="pTtableHeading pcheckBox">
                <Typography className="pTTablecontainer checbox ">
                  <Checkbox
                    color="primary"
                    type="checkbox"
                    checked={allChecked}
                    onChange={(e) => {
                      setAllchecked(e.target.checked);
                      setUsers(e.target.checked);
                    }}
                    inputProps={{
                      "aria-label": "select all desserts",
                    }}
                  />
                </Typography>
              </TableCell>
              {headings.map((curElem, i) => {
                return (
                  <TableCell key={i} className="pTtableHeading">
                    {curElem}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          {detail && detail.length > 0 && (
            <TableBody className="pTtbody">
              {detail.map((items, i) => {
                return (
                  <>
                    {i < pages && (
                      <>
                        <TableRow
                          key={i}
                          className={toggle === i ? "pTtrSelected" : "tr"}
                          onClick={() => setToggle(i)}
                        >
                          <TableCell className="pTTableTd pcheckBox">
                            {props.salesOrderTable_orderDetails ||
                            props.salesOrderTable_selectVendor ? (
                              <i className="material-icons remove_circle_icon_table">
                                remove_circle_outline
                              </i>
                            ) : (
                              <Typography className="pTTablecontainer">
                                <Checkbox
                                  type="checkbox"
                                  id={i + 1}
                                  // name={obj["id"]}
                                  // checked={newToggle == i + 1 ? users : false}
                                  onChange={handleChange}
                                  inputProps={{
                                    "aria-label": "select all desserts",
                                  }}
                                  color="primary"
                                />
                                <span></span>
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell className="pTTableTd">
                            {/* <Box className="pnameField"> */}
                            <Typography>
                              {items["name"]
                                ? items["name"]["name"]
                                  ? items["name"]["name"]
                                  : "--"
                                : "--"}
                            </Typography>
                          </TableCell>

                          <TableCell className="pTTableTd">
                            <Typography>
                              {items["product_name"]
                                ? items["product_name"]
                                : "--"}
                            </Typography>
                          </TableCell>
                          <TableCell className="pTTableTd">
                            <Typography>
                              {items["vendor_sku_id"]
                                ? items["vendor_sku_id"]
                                : "--"}
                            </Typography>
                          </TableCell>
                          <TableCell className="pTTableTd">
                            <Typography>
                              {items["min_qty"] ? items["min_qty"] : "--"}
                            </Typography>
                          </TableCell>

                          <TableCell className="pTTableTd">
                            <Typography>
                              {items["price"] ? items["price"] : "--"}
                            </Typography>
                          </TableCell>
                          <TableCell className="pTTableTd">
                            <Typography>
                              {items["shipping_type"]
                                ? items["shipping_type"]
                                : "--"}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </>
                    )}
                  </>
                );
              })}
            </TableBody>
          )}
        </Table>
        {detail && detail.length === 0 && (
          <Box className="nodata_text_innnerTable">
            <h3>Data Not Found</h3>
          </Box>
        )}
      </Box>

      {/* </Box> */}
    </>
  );
}

export default CommonTable;

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