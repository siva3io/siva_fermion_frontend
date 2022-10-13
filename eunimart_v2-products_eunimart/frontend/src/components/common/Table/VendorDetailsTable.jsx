import React, { useState } from "react";
import One2ManyCompanyView from "../InformationWidget/One2ManyCompanyView";
import "./VendorDetailsTable.css";
//mui
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import AddIcon from "@material-ui/icons/Add";

function VendorDetailsTable({ data, dataHeader }) {
  const heading = dataHeader;
  const details = data;
  const [toggle, setToggle] = useState(-1);

  return (
    <>
      <Box className="scroll">
        <Table>
          <TableBody className="tbody">
            <TableRow className="header">
              {heading.map((curElem, i) => {
                return (
                  <th key={i} className="tableHeading">
                    {curElem}
                  </th>
                );
              })}
            </TableRow>
            {/* </Box> */}
            {details.map((curElem, i) => {
              return (
                <>
                  <TableRow
                    key={i}
                    className={toggle === i ? "trSelected" : "TableRow"}
                    onClick={() => setToggle(i)}
                  >
                    <TableCell>
                      <One2ManyCompanyView />
                    </TableCell>
                    <TableCell>{curElem.supply_lead_time}</TableCell>
                    <TableCell>{curElem.vendor_credit_period}</TableCell>
                    <TableCell>{curElem.cost_price}</TableCell>
                    <TableCell>
                      <label className="container">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </TableCell>
                    <TableCell>
                      <label className="container">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
            <button className="addVendorBtn">
              <i className="material-icons addVendorBtn_icon">add</i>
              <span className="addVendorBtn_text"></span>
            </button>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              style={{ textTransform: "none", margin: "5px" }}
            >
              Add Another Vendor
            </Button>
          </TableBody>
        </Table>
      </Box>
    </>
  );
}

export default VendorDetailsTable;


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