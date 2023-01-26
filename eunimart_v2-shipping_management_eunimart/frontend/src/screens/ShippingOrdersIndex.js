import React, { useEffect, useState, Suspense } from "react"; 
import ReactDOM from "react-dom";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadShippingOrdersData, deleteShippingOrdersbyId, loadAccessManagementData } from "../redux/Action/shippingrdersListAction"; 
import RemoteDynamicTable from "Remote/DynamicTable";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import "../index.css";
import TableFilter from "./TableFilter";
import ErrorBoundary from "../ErrorBoundary";
import { useHistory } from "react-router-dom";
const ShippingOrdersIndex = () => { 
  const RemoteWrapper = ({ children }) => (
    <div>
        <ErrorBoundary>{children}</ErrorBoundary>
    </div>
);
  {console.log("ShippingOrdersView main page")}
  const navigate = useHistory();
  const [params, setParams] = useState({ limit: 10, offset: 1, filters:null, sort:null});  
  const [dynamicAppBar, setDynamicAppBar] = useState([]); //state to manage dynamic appbar
  const [searchType, setSearchType] = useState("shipping_number");
  const [selectedId, setId] = useState(0);
  const RemoteButton = React.lazy(() => import("Remote/BasicButton"));
  const RemoteModalViewV2 = React.lazy(() => import("Remote/ModalViewV2"));


let dispatch = useDispatch();
const { istdata, istdata_meta, ACCESSdata } = useSelector((state) => state.data);  
useEffect(() => {
  dispatch(loadAccessManagementData());
  dispatch(loadShippingOrdersData(params));
}, []);

useEffect(() => {
  dispatch(loadShippingOrdersData(params));
}, [params]);

//RemoteDynamicAppBar
const handleChangeDyanmicAppBar = (value) => {
  setDynamicAppBar(value);
};

  const sortOptions = [
    {
      label: "Shipping Number",
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
        dispatch(loadShippingOrdersData({ limit: params.limit, offset: params.offset, filters:params.filters, sort:JSON.stringify([["shipping_number",value]]) }))
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
        dispatch(loadShippingOrdersData({ limit: params.limit, offset: params.offset, filters:params.filters, sort:JSON.stringify([["reference_number",value]]) }))
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
        dispatch(loadShippingOrdersData({ limit: params.limit, offset: params.offset, filters:params.filters, sort:JSON.stringify([["customer_name",value]]) }))
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
        dispatch(loadShippingOrdersData({ limit: params.limit, offset: params.offset, filters:params.filters, sort:JSON.stringify([["channel_name",value]]) }))
      },
    },
    {
      label: "Clear All",
      endIcon: null,
      func: (value) => {
        dispatch(loadShippingOrdersData({ "": "" }));
      },
    },
  ];

  const searchOptions = [
    { label: "Shipping Number : ", value: "shipping_number" },
    { label: "Reference Number : ", value: "reference_number" },
    { label: "Customer Name : ", value: "customer_name" },
    { label: "Channel Name : ", value: "channel_name" },
  ];
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
  const filterSearchItems = (searchValue, searchType) => {
    if (searchValue.length === 0) { 
        dispatch(loadShippingOrdersData({ "": "" }, "filters")); 
    } else {
      dispatch( 
        dispatch(loadShippingOrdersData({ limit: params.limit, offset: params.offset, filters:JSON.stringify([[searchType,"ilike",searchValue]]) }))
      );
    }
  };

  const searchItems = (searchValue) => {
    if (searchValue.length === 0) { 
      dispatch(loadShippingOrdersData({ "": "" }, "search"));
    } else {
      dispatch( 
        dispatch(loadShippingOrdersData({ limit: params.limit, offset: params.offset, filters:JSON.stringify([[searchType,"ilike",searchValue]]) }))
      );
    }
  };  
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const handleModalOpen = () => { setModalOpen(true); };
     const [ShippingId, setShippingId] = useState(0);

    const handleDeleteProduct = (value) => {
      console.log("enter",ShippingId)
      dispatch(deleteShippingOrdersbyId(ShippingId));
      setTimeout(() => {
          dispatch(loadShippingOrdersData(params));
      }, 300);
      setdeleteModalOpen(false);
  };

  const handleDeleteModalClose = (value) => {
      console.log("enter close")
      setdeleteModalOpen(false)
  };
 
  const handleDeleteModalOpen = (value) => {
    setShippingId(value);
      setdeleteModalOpen(true)
   };

  const handleButtonClick = (value) =>{
    navigate.push("/shippingOrders/add"); 
    console.log("id data Main page one wrkngg");
  }
  const handleEdit = (id) => {
    console.log("handleEdit", id)
    navigate.push("/shippingOrders/edit/"+id); 
  }
  //RemoteDynamicAppBar
  const history = useHistory();
  const handleViewProduct = (id) => {
    history.push(`/shippingOrders/View/${id}`);
  };
  const [customOptions, setCustomOptions] = useState([
    {
      label: "View Shipment",
      func: (product_id) => handleViewProduct(product_id),
    },
    {
      label: "Edit Shipment",
      func: (product_id) => handleEdit(product_id),
    },
    {
      label: "Delete Shipment",
      func: (product_id) => handleDeleteModalOpen(product_id),
    }, 
  ]);

  useEffect(()=>{
    setCustomOptions(
      [{
        label: "View Shipment",
        func: (product_id) => handleViewProduct(product_id),
        flag: ACCESSdata?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "READ" )?.ctrl_flag
      },
      {
        label: "Edit Shipment",
        func: (product_id) => handleEdit(product_id),
        flag: ACCESSdata?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "UPDATE" )?.ctrl_flag
      },
      {
        label: "Delete Shipment",
        func: (product_id) => handleDeleteModalOpen(product_id),
        flag: ACCESSdata?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "DELETE" )?.ctrl_flag
      }]
    )
  },[ACCESSdata])

  const TableData = [
    {
      key: "shipping_number",
      numeric: false,
      label: "Shipping ID",
      type: "text",
    },
    {
      key: "reference_number",
      numeric: false,
      label: "Reference ID",
      type: "text",
    },
    {
      key: "order.channel_name",
      // count:2,
      numeric: false,
      label: "Channel Name",
      type: "text",
    },
    {
      key: "billing_address.city",
      // count:2,
      numeric: false,
      label: "Pickup Address",
      type: "text",
    },
    {
      key: "CreatedBy.created_date",
      // count:2,
      numeric: false,
      label: "Shipping Date",
      type: "date",
    },
    {
      key: "origin_country.name",
      // count:2,
      numeric: false,
      label: "Destination Address",
      type: "text",

    },
    {
      key: "order.customer_billing_address.contact_person_name",
      // count:3,
      numeric: false,
      label: "Customer Details",
      type: "text",
    },
    {
       key: "shipping_order_lines.product_template.product_name",
      // key: shipping_order_lines?.product_template?.product_name?
      // shipping_order_lines?.product_template?.product_name:"--",
      //  count:3,
      numeric: false,
      label: "Product Details",
      type: "text",
    }, 
    {
      key: "shipping_order_lines.product_template.package_dimensions.package_length",
      // count:4,
      numeric: false,
      label: "Dimensions",
      type: "text",
    }, 
    {
      key: "shipping_cost",
      numeric: false,
      label: "Shipping Cost",
      type: "text",
    }, 
    {
      key: "shipping_status.display_name",
      // count:2,
      numeric: false,
      label: "Shipping Status",
      type: "text",
    }, 
    {
      key: "scheduled_delivery_date",
      numeric: false,
      label: "Download Documents",
      type: "text",
    }, 
    {
      key: "billing_details.currency",
      // count:2,
      numeric: false,
      label: "Order Value",
      type: "text",
    }, 
    {
      key: "shipping_payment_type.lookup_code",
      // count:2,
      numeric: false,
      label: "Shipment Type",
      type: "text",
    }, 
    {
      key: "expected_delivery_date",
      // count:2,
      numeric: false,
      label: "Exp. Delivery Date",
      type: "text",
    }, 
    {
      key: "pickup_attempted",
      numeric: false,
      label: "Pickup Attempted",
      type: "text",
    }, 
    {
        key: "action",
        numeric: true,
        label: "Action",
        type: "action"
      },
  ];


  return (
    
    istdata.length > 0 && istdata_meta.info && ACCESSdata && ACCESSdata[0]?.module_ctrl_flag && ACCESSdata?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "LIST" )?.ctrl_flag ===1 && (       
       
      <div>
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

       <Box sx={{ p: 2 }}>
        <Suspense fallback={<div>Loading... </div>}> 
        <RemoteDynamicTable
          table_data={istdata}
          headCells={TableData}
          customOptions={customOptions}
          setCustomOptions={setCustomOptions}
          info={istdata_meta.info}
          setParams={setParams}
          handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
          setId={setId}
          enablepagination={true}
        />
         </Suspense>
      </Box>
      {
      deleteModalOpen && (
                      <Suspense fallback={<div>Loading... </div>}>
                          <RemoteWrapper>
                              <RemoteModalViewV2
                                  handleDeleteProduct={handleDeleteProduct}
                                  handleModalClose={handleDeleteModalClose}
                                  handleDeleteModalOpen={handleDeleteModalOpen}
                                  modalOpen={deleteModalOpen}
                                  primary={
                                      "Selected product will be deleted permanentely. Are you sure you want to do this?"
                                  }
                                  secondary={""}
                                  disclaimer={"Note: This will get deleted permanantly from the list"}
                                  actionBtns={["Cancel", "Delete"]}
                              />
                          </RemoteWrapper></Suspense>
                  )}
      </div>
      
    )
    
  );
};
export default ShippingOrdersIndex;



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