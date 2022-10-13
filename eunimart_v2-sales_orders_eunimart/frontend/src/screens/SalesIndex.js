import React, { useEffect, useState, Suspense } from "react"; 
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { loadSalesData, loadDeleteDataById, loadAccessManagementData } from "../redux/action";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import RemoteDynamicTable from "Remote/DynamicTable";
import RemoteModalViewV2 from "Remote/ModalViewV2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SalesIndex = () => {  
  const navigate = useHistory();
  const [dynamicAppBar, setDynamicAppBar] = useState([]);
  const [params, setParams] = useState({ limit: 10, offset: 1, filters:null, sort:null});  
  const [searchType, setSearchType] = useState("sales_order_number");
  const [selectedId, setId] = useState(0);  
  const [deleteId, setdeleteId] = useState(0);
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  
  let dispatch = useDispatch();
  const { salesdata, salesdata_meta, ACCESSdata } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(loadAccessManagementData());
    dispatch(loadSalesData(params));
  }, [params]);

  
  const TableData = [
    {
      key: "created_date",
      numeric: false,
      label: "Sales Order Date",
      type: "date",
    },
    {
      key: "sales_order_number",
      numeric: false,
      label: "Sales Order#",
      type: "text",
    },
    {
      key: "reference_number",
      numeric: false,
      label: "Reference Number",
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
      count: true,
    },
    {
      key: "status.display_name",
      numeric: false,
      label: "Status",
      type: "text",
      count: true,
    },
    {
      key: "invoiced.display_name",
      numeric: false,
      label: "Invoiced",
      type: "text",
      count: true,
    },
    {
      key: "payment_received.display_name",
      numeric: false,
      label: "Payment Received",
      type: "text",
      count: true,
    },
    {
      key: "payment_amount",
      numeric: false,
      label: "Payment Amount",
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
      key: "expected_shipping_date",
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

  const handleChangeDyanmicAppBar = (value) => {
    setDynamicAppBar(value);
  }; 

  const sortOptions = [
    {
      label: "Sales Order",
      subItems: [
        {
          label: "A to Z",
          key: "asc",
        },
        {
          label: "Z to A",
          key: "desc",
        },
      ],
      func: (value) => {
        dispatch(loadSalesData({ limit: params.limit, offset: params.offset, filters:params.filters, sort:JSON.stringify([["sales_order_number",value]]) }))
      },
    },
    {
      label: "Reference Number",
      subItems: [
        {
          label: "A to Z",
          key: "asc",
        },
        {
          label: "Z to A",
          key: "desc",
        },
      ],
      func: (value) => {        
        dispatch(loadSalesData({ limit: params.limit, offset: params.offset, filters:params.filters, sort:JSON.stringify([["reference_number",value]]) }))
      },
    },
    {
      label: "Customer Name",
      subItems: [
        {
          label: "A to Z",
          key: "asc",
        },
        {
          label: "Z to A",
          key: "desc",
        },
      ],
      func: (value) => {
        dispatch(loadSalesData({ limit: params.limit, offset: params.offset, filters:params.filters, sort:JSON.stringify([["customer_name",value]]) }))
      },
    },
    {
      label: "Channel Name",
      subItems: [
        {
          label: "Ascending",
          key: "asc",
        },
        {
          label: "Descending",
          key: "desc",
        },
      ],
      func: (value) => {
        dispatch(loadSalesData({ limit: params.limit, offset: params.offset, filters:params.filters, sort:JSON.stringify([["channel_name",value]]) }))
      },
    },
    {
      label: "Clear All",
      endIcon: null,
      func: (value) => {
        dispatch(loadSalesData({ "": "" }));
      },
    },
  ];

  const searchOptions = [
    { label: "Sales Order : ", value: "sales_order_number" },
    { label: "Reference Number : ", value: "reference_number" },
    { label: "Customer Name : ", value: "customer_name" },
    { label: "Channel Name : ", value: "channel_name" },
  ]

  const [filterOptions, setFilterOptions] = useState(
    [
      {
        label: "Sales Order",
        collapseState: false,
        value: "sales_order_number",
      },
      {
        label: "Reference Number",
        collapseState: false,
        value: "reference_number",
      },
      {
        label: "Customer Name",
        collapseState: false,
        value: "customer_name",
      },
      {
        label: "Channel Name",
        collapseState: false,
        value: "channel_name",
      },
    ]

  );

  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (sales_id) => handleView(sales_id),
    },
    {
      label: "Edit",
      func: (sales_id) => handleEdit(sales_id),
    },
    {
      label: "Delete",
      func: (sales_id) => handleDeleteModalOpen(sales_id),
    },
  ]);
  useEffect(()=>{
    setCustomOptions(
      [{
        label: "View",
        func: (sales_id) => handleView(sales_id),
        flag: ACCESSdata?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "READ" )?.ctrl_flag
      },
      {
        label: "Edit",
        func: (sales_id) => handleEdit(sales_id),
        flag: ACCESSdata?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "UPDATE" )?.ctrl_flag
      },
      {
        label: "Delete",
        func: (sales_id) => handleDeleteModalOpen(sales_id),
        flag: ACCESSdata?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "DELETE" )?.ctrl_flag
      }]
    )
  },[ACCESSdata])

  const handleView = (id) => {
    navigate.push("/sales/view/"+id); 
  }
  // const handleDelete = (id) => {
  //   console.log("handleDelete", id)
  // }
  const handleEdit = (id) => {
    console.log("handleEdit", id)
    navigate.push("/sales/edit/"+id); 
  }  
  const handleButtonClick = (value) =>{
    navigate.push("/sales/add"); 
  }
  
  const filterSearchItems = (searchValue, searchType) => {
    if (searchValue.length === 0) { 
        dispatch(loadSalesData({ "": "" }, "filters")); 
    } else {
      dispatch( 
        dispatch(loadSalesData({ limit: params.limit, offset: params.offset, filters:JSON.stringify([[searchType,"ilike",searchValue]]) }))
      );
    }
  };

  const searchItems = (searchValue) => {
    if (searchValue.length === 0) { 
      dispatch(loadSalesData({ "": "" }, "search"));
    } else {
      dispatch( 
        dispatch(loadSalesData({ limit: params.limit, offset: params.offset, filters:JSON.stringify([[searchType,"ilike",searchValue]]) }))
      );
    }
  };  

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  
  const handleDeleteModalClose = (value) => {
    console.log("enter close")
    setdeleteModalOpen(false)
  };

  const handleDeleteModalOpen = (value) => {
    setdeleteId(value);
    setdeleteModalOpen(true)
  }; 
  
  const handleDelete = () => {   
    dispatch(loadDeleteDataById(deleteId, function(resp){ 
      toast(resp)
    }));

    setTimeout(() => {
       dispatch(loadSalesData(params));
    }, 300);
    setdeleteModalOpen(false);
  }

  return (  
    <Box sx={{ background: "#F9F9F9" }}>
    <RemoteModalViewV2
      handleDeleteProduct={handleDelete}
      handleModalClose={handleDeleteModalClose}
      modalOpen={deleteModalOpen}
      primary={
        "Are you sure you want to do this?"
      }
      secondary={""}
      disclaimer={"Note: This will get deleted permanantly from the list"}
      actionBtns={["Cancel", "Delete"]}
    />

{ salesdata && salesdata_meta.info && ACCESSdata && ACCESSdata[0]?.module_ctrl_flag && ACCESSdata?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "LIST" )?.ctrl_flag ===1 && (
   <Box sx={{ p: 2 }}>
   <Suspense fallback={<div>Loading... </div>}>      
        <RemoteDynamicAppBar
          handleModalOpen={handleModalOpen}
          dynamicAppBar={dynamicAppBar}
          sortOptions={sortOptions}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          filterSearchItems={filterSearchItems}
          searchItems={searchItems}
          searchOptions={searchOptions}
          searchType={searchType}
          setSearchType={setSearchType}
          handleButtonClick={handleButtonClick}
          buttons={[{name:"Create",handleButtonClick:handleButtonClick,flag:ACCESSdata?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "CREATE" )?.ctrl_flag}]}
        />
       </Suspense>

     
      
        <Suspense fallback={<div>Loading... </div>}>         
          <RemoteDynamicTable
            table_data={salesdata}
            headCells={TableData}
            customOptions={customOptions}
            setCustomOptions={setCustomOptions}
            info={salesdata_meta.info}
            setParams={setParams}
            handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
            setId={setId}
            enablepagination={true}
          /> 
          </Suspense>

          <ToastContainer />
      </Box>
    )}
  </Box>     
  );
};
export default SalesIndex;


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