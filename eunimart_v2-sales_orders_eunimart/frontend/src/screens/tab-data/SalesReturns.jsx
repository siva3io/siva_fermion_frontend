import React, { useEffect, useState, Suspense } from "react"; 
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { loadSalesReturnsData } from "../../redux/action";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import RemoteDynamicTable from "Remote/DynamicTable";
import RemoteModalViewV2 from "Remote/ModalViewV2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SalesReturns({id}) {  
  const navigate = useHistory();
  const [dynamicAppBar, setDynamicAppBar] = useState([]);
  const [params, setParams] = useState({ Id : id??0, limit: 100, offset: 1, filters:null, sort:null});  
  const [selectedId, setId] = useState(0);   
  
  let dispatch = useDispatch();
  const { sales_returnsdata, sales_returnsdata_meta } = useSelector((state) => state.data);
  useEffect(() => { 
    dispatch(loadSalesReturnsData(params));
  }, [params]); 
  
  const TableData = [
     {
        key: "sales_return_number", 
        type: "text",
        label: "Sales Return No.",
      }, 
      {
        key: "reference_number", 
        type: "text",
        label: "Reference ID",
      },
      {
        key: "tracking_number", 
        type: "text",
        label: "Tracking ID",
      }, 
      {
        key: "sr_date", 
        type: "text",
        label: "Return Date",
      },
      {
        key: "customer_name", 
        type: "text",
        label: "Customer Name",
      },
      {
        key: "channel_name", 
        type: "text",
        label: "Channel Name",
      },
      {
        key: "shipping_mode.display_name", 
        type: "text",
        label: "Shipping Mode",
      },
      {
        key: "amount", 
        type: "text",
        label: "Amount",
      },
      {
        key: "reason.display_name", 
        type: "text",
        label: "Reason",
      },
      {
        key: "shipping_carrier.partner_name", 
        type: "text",
        label: "Shipping Carrier",
      },
      {
        key: "status.display_name", 
        type: "text",
        label: "Status",
      },
      {
        key: "credit_issued.display_name", 
        type: "text",
        label: "Credit Issued",
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
    
    { sales_returnsdata && sales_returnsdata_meta.info && (
       <Box sx={{ p: 2 }}> 
      
        <Suspense fallback={<div>Loading... </div>}>         
          <RemoteDynamicTable
            table_data={sales_returnsdata}
            headCells={TableData}
            customOptions={customOptions}
            setCustomOptions={setCustomOptions}
            info={sales_returnsdata_meta.info}
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
export default SalesReturns;


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