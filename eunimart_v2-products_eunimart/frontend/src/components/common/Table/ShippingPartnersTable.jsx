import React, { useState } from "react";
import "./ShippingPartnersTable.css";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function ShippingPartnersTable({ data, dataHeader }) {
  const heading = dataHeader;
  const details = data;
  const [toggle, setToggle] = useState(-1);

  return (
    <>
      <Box className="scroll">
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow className="header">
              {heading.map((curElem, i) => {
                return (
                  <TableCell key={i} className="tableHeadingShipping">
                    {curElem}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          {details && details.length > 0 && (
            <TableBody>
              {details.map((curElem, i) => {
                return (
                  <>
                    <TableRow
                      key={i}
                      className={toggle === i ? "trSelected" : "tr"}
                      onClick={() => setToggle(i)}
                    >
                      <TableCell>
                        {/* <One2ManyCompanyView /> */}
                        {curElem.name.name ? curElem.name.name : "--"}
                      </TableCell>
                      <TableCell>
                        {curElem.pack_lead_time ? curElem.pack_lead_time : "--"}
                      </TableCell>
                      <TableCell>
                        {curElem.shipping_lead_time
                          ? curElem.shipping_lead_time
                          : "--"}
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          )}
        </Table>
        {details && details.length === 0 && (
          <Box className="nodata_text_innnerTable">
            <h3>Data Not Found</h3>
          </Box>
        )}
      </Box>
    </>
  );
}

export default ShippingPartnersTable;

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