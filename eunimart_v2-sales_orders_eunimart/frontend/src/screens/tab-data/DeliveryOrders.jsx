import React, { useEffect, useState, Suspense } from "react"; 
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { loadDeliveryData } from "../../redux/action";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import RemoteDynamicTable from "Remote/DynamicTable";
import RemoteModalViewV2 from "Remote/ModalViewV2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DeliveryOrders({id}) {  
  const navigate = useHistory();
  const [dynamicAppBar, setDynamicAppBar] = useState([]);
  const [params, setParams] = useState({ Id : id??0, limit: 100, offset: 1, filters:null, sort:null});  
  const [selectedId, setId] = useState(0);   
  
  let dispatch = useDispatch();
  const { delivery_ordersdata, delivery_ordersdata_meta } = useSelector((state) => state.data);
  useEffect(() => { 
    dispatch(loadDeliveryData(params));
  }, [params]); 
  
  const TableData = [
    {
      key: "created_date",
      numeric: false,
      label: "DO Date",
      type: "date",
    },
    {
      key: "delivery_order_details.delivery_order_number",
      numeric: false,
      label: "DO Number",
      type: "text", 
    },
    {
        key: "delivery_order_details.reference_id",
        numeric: false,
        label: "Reference Number",
        type: "text", 
    }, 
    {
        key: "tracking_number",
        numeric: false,
        label: "Tracking Number",
        type: "text",
    },
    {
      key: "customer_name",
      numeric: false,
      label: "Customer Name",
      type: "text",
    },
    {
      key: "channel_name",
      numeric: false,
      label: "Channel Name",
      type: "text",
    },
    {
      key: "payment_type.display_name",
      numeric: false,
      label: "Payment Type",
      type: "text", 
    },
    {
      key: "status.display_name",
      numeric: false,
      label: "Status",
      type: "text", 
    },
    {
      key: "channel_name",
      numeric: false,
      label: "Shipping Type",
      type: "text", 
    },
    {
        key: "shipping_carrier.display_name",
        numeric: false,
        label: "Carrier",
        type: "text", 
      },
    {
      key: "shipping_details.estimated_cost.cost",
      numeric: false,
      label: "Amount",
      type: "text", 
    },   
    {
      key: "delivery_order_details.sales_order.payment_terms.display_name",
      numeric: false,
      label: "Payment Terms",
      type: "text", 
    },    
    {
      key: "shipping_details.estimated_cost.shipping_partners",
      numeric: false,
      label: "Shipping Label",
      type: "text", 
    },  
    {
      key: "shipping_details.estimated_cost.order_delivery_time",
      numeric: false,
      label: "Exp. Shipping",
      type: "text", 
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
    
    { delivery_ordersdata && delivery_ordersdata_meta.info && (
       <Box sx={{ p: 2 }}> 
      
        <Suspense fallback={<div>Loading... </div>}>         
          <RemoteDynamicTable
            table_data={delivery_ordersdata}
            headCells={TableData}
            customOptions={customOptions}
            setCustomOptions={setCustomOptions}
            info={delivery_ordersdata_meta.info}
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
export default DeliveryOrders;
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