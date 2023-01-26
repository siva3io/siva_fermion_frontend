import React, { useEffect, useState} from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  loadPurchaseReturnsData,
} from "../../redux/Actions/action";
import RemoteDynamicTable from "Remote/DynamicTable";

import { Box } from "@mui/material";


const Purchasereturnsindex = ({id}) => {
    console.log("in purchase Orders PR")
  const navigate = useHistory();
  let dispatch = useDispatch();
  
  const { purchaseReturnsdata ,access} = useSelector(
    (state) => state.data
  );
  useEffect(() => {
    dispatch(loadPurchaseReturnsData(id));
  }, []);
  const handleView = (id) => {
    navigate.push("/purchaseReturns/view/" + id);
  };
  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (product_id) => handleView(product_id),
      flag:1
    },
  ]);
  const headCells = [
    {
      key: "purchase_return_number",
      numeric: false,
      label: "PR Number",
      type: "text",
    },
    {
      key: "reference_number",
      numeric: false,
      label: "Reference ID",
      type: "text",
    },
    {
      key: "linked_doc",
      numeric: false,
      label: "Linked Document",
      type: "text",
    },
    {
      key: "vendor_details.vendor_name",
      numeric: false,
      label: "Vendor Name",
      type: "text",
    },
    {
      key: "debit_note_issued.display_name",
      numeric: false,
      label: "Debit Note Issued",
      type: "text",
    },
    {
      key: "amount",
      numeric: false,
      label: "Amount",
      type: "text",
      count: false,
    },
    {
      key: "payment_terms.display_name",
      numeric: false,
      label: "Payment Terms",
      type: "text",
      count: true,
    },
    {
      key: "pr_date",
      numeric: false,
      label: "PR Date",
      type: "date",
      count: true,
    },
    {
      key: "expected_shipping_date",
      numeric: false,
      label: "Exp. Shipping Date",
      type: "date",
    },

    {
      key: "status.display_name",
      numeric: false,
      label: "Status",
      type: "text",
      count: true,
    },

    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action",
    },
  ];
  return (
    <>
      <Box sx={{ background: "#F9F9F9" }}>
        {purchaseReturnsdata.length > 0 && access && access[0]?.module_ctrl_flag && access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "LIST" )?.ctrl_flag ===1 && (
          <div>
            <RemoteDynamicTable
              table_data={purchaseReturnsdata}
              headCells={headCells}
              customOptions={customOptions}
              setCustomOptions={setCustomOptions}
              enablepagination={false}
            />
          </div>
        )}
      </Box>
    </>
  );
};
export default Purchasereturnsindex;



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