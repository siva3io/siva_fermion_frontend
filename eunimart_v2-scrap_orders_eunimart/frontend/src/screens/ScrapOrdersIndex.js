import React, { useEffect, useState, Suspense } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";
import ErrorBoundary from "../ErrorBoundary";
import { loadScrapOrdersData,deleteScrapOrdersData , viewAccessManagement,} from "../redux/Actions/action";
import RemoteDynamicTable from "Remote/DynamicTable";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import "../index.css";
import TableFilter from "./TableFilter";


const RemoteWrapper = ({ children }) => (
  <div>
      <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const ScrapOrdersIndex = () => { 
  let dispatch = useDispatch();
  const { scrapordersdata, scrapordersdata_meta ,access} = useSelector((state) => state.data);  
  useEffect(() => {
    dispatch(viewAccessManagement())
    dispatch(loadScrapOrdersData(params));
  }, []);
  useEffect(()=>{
    dispatch(loadScrapOrdersData(params));},[params])
  const RemoteModalViewV2 = React.lazy(() => import("Remote/ModalViewV2"));
  const [params, setParams] = useState({
    limit: 10,
    offset: 1,
    filters: null,
    sort: null,
  });
  const [dynamicAppBar, setDynamicAppBar] = useState([]); //state to manage dynamic appbar
  const [selectedId, setId] = useState(0);
  const [searchType, setSearchType] = useState("scrap_date");
  const navigate = useHistory();
  const [scrapOrderId, setScrapOrderId] = useState(0);
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const handleChangeDyanmicAppBar = (value) => { 
    setDynamicAppBar(value);
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleButtonClick = () =>{
    navigate.push("/scrapOrders/create"); 
  }
  const handleDeleteProduct = (value) => {
    console.log("enter")
    dispatch(deleteScrapOrdersData(scrapOrderId));
    setTimeout(() => {
      dispatch(loadScrapOrdersData(params));
    }, 300);
    setdeleteModalOpen(false);
  };

  const handleDeleteModalClose = (value) => {
    console.log("enter close")
    setdeleteModalOpen(false)
  };


  const handleDeleteModalOpen = (value) => {
    setScrapOrderId(value);
    setdeleteModalOpen(true)
  };
  const sortOptions = [
    {
      label: "Scrap Date",
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
        dispatch(loadScrapOrdersData({ limit: params.limit, offset: params.offset, filters:params.filters, sort:JSON.stringify([["scrap_date",value]]) }))
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
        dispatch(loadScrapOrdersData({ limit: params.limit, offset: params.offset, filters:params.filters, sort:JSON.stringify([["reference_number",value]]) }))
      },
    },
    {
      label: "Scrap ID Number",
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
        dispatch(loadScrapOrdersData({ limit: params.limit, offset: params.offset, filters:params.filters, sort:JSON.stringify([["scrap_order_no",value]]) }))
      },
    },
    {
      label: "Clear All",
      endIcon: null,
      func: (value) => {
        dispatch(loadScrapOrdersData({ "": "" }));
      },
    },
  ];

  const searchOptions = [
    { label: "Scrap Date : ", value: "scrap_date" },
    { label: "Scrap ID Number : ", value: "scrap_order_no" },
    { label: "Reference Number : ", value: "reference_id" },
  ]

  const [filterOptions, setFilterOptions] = useState(
    [
      {
        label: "Scrap Date",
        collapseState: false,
        value: "scrap_date",
      },
      {
        label: "Scrap ID Number",
        collapseState: false,
        value: "scrap_order_no",
      },
      {
        label: "Reference Number",
        collapseState: false,
        value: "reference_id",
      },
    ]

  );

  const filterSearchItems = (searchValue, searchType) => {
    if (searchValue.length === 0) { 
        dispatch(loadScrapOrdersData({ "": "" }, "filters")); 
    } else {
      dispatch( 
        dispatch(loadScrapOrdersData({ limit: params.limit, offset: params.offset, filters:JSON.stringify([[searchType,"ilike",searchValue]]) }))
      );
    }
  };

  const searchItems = (searchValue) => {
    if (searchValue.length === 0) { 
      dispatch(loadScrapOrdersData({ "": "" }, "search"));
    } else {
      dispatch( 
        dispatch(loadScrapOrdersData({ limit: params.limit, offset: params.offset, filters:JSON.stringify([[searchType,"ilike",searchValue]]) }))
      );
    }
  }; 


  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (product_id) => handleView(product_id),
      flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "READ" )?.ctrl_flag
    },
    {
      label: "Edit",
      func: (product_id) => handleEdit(product_id),
      flag:1,
    },
    {
      label: "Delete",
      func: (product_id) => handleDeleteModalOpen(product_id),
      flag:1
    },
    
  ]);
  useEffect(()=>{
    setCustomOptions(
      [{
        label: "View",
        func: (product_id) => handleView(product_id),
        flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "READ" )?.ctrl_flag
      },
      {
        label: "Edit",
        func: (product_id) => handleEdit(product_id),
        flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "UPDATE" )?.ctrl_flag

      },
      {
        label: "Delete",
        func: (product_id) => handleDeleteModalOpen(product_id),
        flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "DELETE" )?.ctrl_flag

      }]
    )
  },[access])
  
  const handleView = (id) => {
    navigate.push("/scrapOrders/view/"+id); 
  }
  const handleEdit = (id) => {
    console.log("handleEdit", id)
    navigate.push("/scrapOrders/edit/"+id); 
  }  
  const headCells = [
    {
      key: "schedule_scrap_date",
      numeric: true,
      label: "Scrap Order Date",
      type: "date"
    },
    {
      key: "scrap_order_no",
      //count: 2,
      numeric: true,
      label: "Scrap ID Number",
      type: "text"
    },
    {
      key: "reference_id",
      //count: 2,
      numeric: true,
      label: "Reference Number",
      type: "text"
    },
    {
      key: "scrap_source_location.name",
      // count: 2,
      numeric: true,
      label: "Source Location",
      type: "text"
    },
    {
      key: "scrap_location.name",
      // count: 2,
      numeric: true,
      label: "Scrap Location",
      type: "text"
    },
    {
      key: "no_of_items",
      //count: 2,
      numeric: true,
      label: "No. of Items",
      type: "text"
    },
    {
      key: "total_quantity",
      //count: 2,
      numeric: true,
      label: "Total Quantity",
      type: "text"
    },
    {
      key: "scraping_status",
      //count: 2,
      numeric: true,
      label: "Scrapping Status",
      type: "text"
    },
    {
      key: "grn_status",
      count: 2,
      numeric: true,
      label: "GRN Status",
      type: "text"
    },
    {
      key: "shipping_details['shipping_preferance']",
      count: 2,
      numeric: true,
      label: "Shipping Mode",
      type: "text"
    },
    {
      key: "pickup_date_time['pickup_date']",
      count: 2,
      numeric: true,
      label: "Exp.shipping Date",
      type: "date"
    },
  
    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action"
    },
  ];
 

    return (
      <Box sx={{ background: "#F9F9F9" }}>
           {
        deleteModalOpen && (
          <>
          <Suspense fallback={<div>Loading... </div>}>
            <RemoteWrapper>
              <RemoteModalViewV2
                handleDeleteProduct={handleDeleteProduct}
                handleModalClose={handleDeleteModalClose}
                modalOpen={deleteModalOpen}
                primary={
                  "Selecte Product will be deleted permanentely. Are you sure you want to do this?"
                }
                secondary={""}
                disclaimer={"Note: This will get deleted permanantly from the list"}
                actionBtns={["Cancel", "Delete"]}
              />
            </RemoteWrapper></Suspense>
            </>
        )
      }

    <Box sx={{ background: "#F9F9F9" }}>
    {
          scrapordersdata.length > 0 && access && access[0]?.module_ctrl_flag && access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "LIST" )?.ctrl_flag ===1 && (

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
          buttons={[{name:"Create",handleButtonClick:handleButtonClick,flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "CREATE" )?.ctrl_flag}]}
          // handleButtonClick={handleButtonClick}
        />
       </Suspense>
)}
   
   {scrapordersdata.length > 0 && access && access[0]?.module_ctrl_flag && access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "LIST" )?.ctrl_flag ===1 && (
    
      <div>
        <RemoteDynamicTable
          table_data={scrapordersdata}    
          headCells={headCells}
          info={scrapordersdata_meta.info}
          customOptions={customOptions}
          setCustomOptions={setCustomOptions}
          setParams={setParams}
          handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
          setId={setId} 
          enablepagination={true}
        />
      </div>
    )}
    </Box>
    </Box>
  );
};
export default ScrapOrdersIndex;






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
along with this program. If not, see http://www.gnu.org/licenses/.
*/
