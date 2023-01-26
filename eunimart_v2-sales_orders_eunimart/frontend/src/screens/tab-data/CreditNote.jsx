import React, { useEffect, useState, Suspense } from "react"; 
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { loadCredit_NoteData } from "../../redux/action";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import RemoteDynamicTable from "Remote/DynamicTable";
import RemoteModalViewV2 from "Remote/ModalViewV2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreditNote({id}) {  
  const navigate = useHistory();
  const [dynamicAppBar, setDynamicAppBar] = useState([]);
  const [params, setParams] = useState({ Id : id??0, limit: 100, offset: 1, filters:null, sort:null});  
  const [selectedId, setId] = useState(0);   
  
  let dispatch = useDispatch();
  const { credit_notedata, credit_notedata_meta } = useSelector((state) => state.data);
  useEffect(() => { 
    dispatch(loadCredit_NoteData(params));
  }, [params]); 
  
  const TableData = [
    {
      key: "created_date",
      numeric: false,
      label: "Credit Note Date",
      type: "date",
    },
    {
      key: "credit_note_id",
      numeric: false,
      label: "Credit Note ID#",
      type: "text",
    },
    {
      key: "reference_id",
      numeric: false,
      label: "Reference ID",
      type: "text",
    },
    {
      key: "purchase_invoice.purchase_invoice_number",
      numeric: false,
      label: "Invoice ID",
      type: "text",
    },
    {
      key: "customer.first_name",
      numeric: false,
      label: "Customer Name",
      type: "text",
    },
    {
      key: "status.display_name",
      numeric: false,
      label: "Status",
      type: "text",
      count: true,
    },     
    {
      key: "total_amount",
      numeric: false,
      label: "Payment Amount",
      type: "text",
      count: false,
    }, 
    // {
    //   key: "action",
    //   numeric: true,
    //   label: "Action",
    //   type: "action",
    // },
  ]; 

  const handleChangeDyanmicAppBar = (value) => {
    setDynamicAppBar(value);
  };  

  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (sales_id) => handleView(sales_id),
      flag: 1
    }, 
  ]);

  const handleView = (id) => {
    //navigate.push("/sales/view/"+id); 
  }
    
  return (  
    <Box sx={{ background: "#F9F9F9" }}>
    
    { credit_notedata && credit_notedata_meta.info && (
       <Box sx={{ p: 2 }}> 
      
        <Suspense fallback={<div>Loading... </div>}>         
          <RemoteDynamicTable
            table_data={credit_notedata}
            headCells={TableData}
            customOptions={customOptions}
            setCustomOptions={setCustomOptions}
            info={credit_notedata_meta.info}
            setParams={setParams}
            handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
            setId={setId}
            enablepagination={false}
            IsCheckBoxShow={false}
          /> 
          </Suspense>

          <ToastContainer />
       </Box> 
    )}
  </Box>     
  );
};
export default CreditNote;
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