import React, { useEffect, useState, Suspense } from "react"; 
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { loadPurchaseInvoiceData} from "../../redux/Actions/action";
import RemoteDynamicTable from "Remote/DynamicTable";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PurchaseInvoice = ({id}) => {  
  const navigate = useHistory();
  let dispatch = useDispatch();
  const { PurchaseInvoicedata } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(loadPurchaseInvoiceData(id));
  }, []);
 
  const TableData = [
    {
      key: "purchase_invoice_date",
      numeric: false,
      label: "PI Date",
      type: "date",
    },
    {
      key: "purchase_invoice_number",
      numeric: false,
      label: "PI Number",
      type: "text", 
    },
    {
        key: "reference_number",
        numeric: false,
        label: "Reference Number",
        type: "text", 
    }, 
    {
      key: "vendor_details.vendor_contact.label",
      numeric: false,
      label: "Vendor Name",
      type: "text",
    },
    {
      key: "status.display_name",
      numeric: false,
      label: "Status",
      type: "text",
    },
    {
      key: "paid.display_name",
      numeric: false,
      label: "Paid",
      type: "text", 
    },
    {
      key: "payment_terms.display_name",
      numeric: false,
      label: "Payment Terms",
      type: "text", 
    },
    {
      key: "payment_amount",
      numeric: false,
      label: "Payment Amount",
      type: "text", 
    },
    {
        key: "balance_due",
        numeric: false,
        label: "Balance Due",
        type: "text", 
      },
    {
      key: "due_date",
      numeric: false,
      label: "Due Date",
      type: "date", 
    },   
    {
      key: "expected_delivery_date",
      numeric: false,
      label: "Exp. Shipping Date",
      type: "date", 
    },     
    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action",
    },
  ]; 

  
  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (sales_id) => handleView(sales_id),
      flag:1
    }
  ]);


  const handleView = (id) => {
    // navigate.push("/PurchaseInvoice/view/"+id); 
  }


  return (  
    <Box sx={{ background: "#F9F9F9" }}>
      {PurchaseInvoicedata.length > 0 &&  (
      <Box sx={{ p: 2 }}>
        <Suspense fallback={<div>Loading... </div>}>         
          <RemoteDynamicTable
            table_data={PurchaseInvoicedata}
            headCells={TableData}
            customOptions={customOptions}
            setCustomOptions={setCustomOptions}
            enablepagination={false}
          /> 
          </Suspense>
          <ToastContainer />
      </Box>
    )}
  </Box>     
  );
};
export default PurchaseInvoice;




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