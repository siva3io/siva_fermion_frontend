import React, { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import RemoteDynamicTable from "Remote/DynamicTable";

// import "../index.css";
import { loadDebitNoteData} from "../../redux/Actions/action";
const DebitNoteIndex = ({id}) => {
  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (product_id) => handleView(product_id),
      flag:1
    },
  ]);
  const handleView = (id) => {
    // navigate.push("/debitNote/view/" + id);
  }
  const headCells = [
    {
      key: "created_date",
      numeric: true,
      label: "DN Date",
      type: "text"
    },
    {
      key: "debit_note_id",
      numeric: true,
      label: "Debit Note ID",
      type: "text"
    },
    {
      key: "reference_id",
      numeric: true,
      label: "Reference ID",
      type: "text"
    },
    {
      key: "purchase_invoice_id",
      numeric: true,
      label: "Invoice ID",
      type: "text"
    },
    {
      key: "name",
      numeric: true,
      label: "Customer Name",
      type: "text"
    },
    {
      key: "status_id",
      numeric: true,
      label: "Status",
      type: "text"
    },
    {
      key: "total_amount",
      numeric: true,
      label: "Payment Amount",
      type: "text"
    },
    {
      key: "balance_due",
      numeric: true,
      label: "Balance Due",
      type: "text"
    },
    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action"
    },
  ];
  let dispatch = useDispatch();
  const { debitnotedata } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(loadDebitNoteData(id));
  }, []);


  return (
    <Box sx={{ background: "#F9F9F9" }}>
      {debitnotedata.length > 0 && (
        <div>
          <RemoteDynamicTable
            table_data={debitnotedata}
            headCells={headCells}
            customOptions={customOptions}
            setCustomOptions={setCustomOptions}
            enablepagination={false}
          />
        </div>
      )}
    </Box>
  );
};
export default DebitNoteIndex;









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