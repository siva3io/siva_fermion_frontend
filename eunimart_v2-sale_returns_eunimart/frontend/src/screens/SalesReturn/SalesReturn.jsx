import React, { useEffect } from "react";
import { useState } from "react";
import "./SalesReturn.css";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getSalesReturnsList } from "../../redux/Action/SalesReturns/GetSalesReturnsList";
import  viewAccessManagement  from "../../redux/Action/SalesReturns/AccessSR";
import { lazy, Suspense } from "react";
import ErrorBoundary from "../../ErrorBoundary";
import { deleteSalesReturns } from "../../redux/Action/SalesReturns/DeleteSRList";
const RemoteDynamicTable = React.lazy(() => import("Remote/DynamicTable"));
const RemoteDynamicAppBar = React.lazy(() => import("Remote/DynamicAppBar"));
const RemoteModalViewV2 = React.lazy(() => import("Remote/ModalViewV2"));

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

function SalesReturn() {
  const dispatch = useDispatch();
  const access  = useSelector(
    (state) => state.access.access
  );
  const history = useNavigate();

  /*redux variables*/
const products = useSelector(
    (state) => state.getSalesReturnsList.salesReturns
  );
const [selectedId, setId] = useState(0);

  const [params, setParams] = useState({ limit: "10", offset: "0" });
  useEffect(() => dispatch(getSalesReturnsList(params)), [params]);
  const [dynamicAppBar, setDynamicAppBar] = useState([]);
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  console.log(products, "products");
  const [searchType, setSearchType] = useState("uom_name");
  const [SRId, setSRId] = useState(0);
  /*local functions*/

  const handleChangeDyanmicAppBar = (value) => {
    setDynamicAppBar(value);
  };

  const [page, setPage] = React.useState(1);

  useEffect(() => {
    dispatch(viewAccessManagement())
  }, []);

  const headCells = [
    {
      key: "sales_return_number",
      numeric: true,
      type: "text",
      label: "Sales Return No.",
    },

    {
      key: "reference_number",
      numeric: false,
      type: "text",
      label: "Reference ID",
    },
    {
      key: "tracking_number",
      numeric: true,
      type: "text",
      label: "Tracking ID",
    },

    {
      key: "sr_date",
      numeric: true,
      type: "text",
      label: "Return Date",
    },
    {
      key: "customer_name",
      numeric: true,
      type: "text",
      label: "Customer Name",
    },
    {
      key: "channel_name",
      numeric: true,
      type: "text",
      label: "Channel Name",
    },
    {
      key: "shipping_mode.display_name",
      numeric: true,
      count: 2,
      type: "text",
      label: "Shipping Mode",
    },
    {
      key: "amount",
      numeric: true,
      type: "text",
      label: "Amount",
    },
    {
      key: "reason.display_name",
      numeric: true,
      count: 2,
      type: "text",
      label: "Reason",
    },
    {
      key: "shipping_carrier.partner_name",
      numeric: true,
      count: 2,
      type: "text",
      label: "Shipping Carrier",
    },
    {
      key: "status.display_name",
      numeric: true,
      count: 2,
      type: "text",
      label: "Status",
    },
    {
      key: "credit_issued.display_name",
      numeric: true,
      count: 2,
      type: "text",
      label: "Credit Issued",
    },
    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action",
    },
  ];

  const sortOptions = [
    // {
    //   label: "Create date",
    //   subItems: [
    //     {
    //       label: "Latest",
    //       key: "asc",
    //     },
    //     {
    //       label: "Oldest",
    //       key: "desc",
    //     },
    //   ],
    //   func: (value) => {
    //     dispatch(fetchSearchProduct({ name: value }, "sort"));
    //   },
    // },
    // {
    //   label: "ASN Number",
    //   subItems: [
    //     {
    //       label: "Ascending",
    //       key: "asc",
    //     },
    //     {
    //       label: "Descending",
    //       key: "desc",
    //     },
    //   ],
    //   func: (value) => {
    //     dispatch(
    //       fetchSearchProduct({ uom_class_name: value }, "sort")
    //     );
    //   },
    // },
    // {
    //   label: "Reference Number",
    //   subItems: [
    //     {
    //       label: "Ascending",
    //       key: "asc",
    //     },
    //     {
    //       label: "Descending",
    //       key: "desc",
    //     },
    //   ],
    //   func: (value) => {
    //     dispatch(fetchSearchProduct({ base_uom: value }, "sort"));
    //   },
    // },
   
    // {
    //   label: "Clear All",
    //   endIcon: null,
    //   func: (value) => {
    //     dispatch(fetchSearchProduct({ "": "" }, "sort"));
    //   },
    // },
  ];

  const searchOptions = [
    { label: "Sales Return Number : ", value: "name" },
    // { label: "UOM Class : ", value: "class_name" },
    // { label: "Base UOM : ", value: "base_uom" },
    // { label: "UOM Code : ", value: "code" },
  ]

  const [filterOptions, setFilterOptions] = useState(
    [
      // {
      //   label: "Filter by Date",
      //   collapseState: false,
      //   value: "name",
      // },
      // {
      //   label: "Filter by Linked PO",
      //   collapseState: false,
      //   value: "uom_class_name",
      // },
      // {
      //   label: "Filter by Expiry Date",
      //   collapseState: false,
      //   value: "base_uom",
      // },
      // {
      //   label: "Filter by No. of items",
      //   collapseState: false,
      //   value: "code",
      // },
      // {
      //   label: "Filter by Status",
      //   collapseState: false,
      //   value: "code",
      // },
      // {
      //   label: "Filter by GRN Status",
      //   collapseState: false,
      //   value: "code",
      // },
      // {
      //   label: "Filter by Shipping Mode",
      //   collapseState: false,
      //   value: "code",
      // },
      // {
      //   label: "Filter by Shipping Date",
      //   collapseState: false,
      //   value: "code",
      // },

    ]

  );

  const filterSearchItems = (searchValue, searchTyp) => {
    if (searchValue.length === 0) {
      dispatch(fetchSearchProduct({ "": "" }, "filters"));
    } else {
      dispatch(
        fetchSearchProduct({ [searchTyp]: searchValue }, "filters")
      );
    }
  };
  const searchItems = (searchValue) => {
    if (searchValue.length === 0) {
      dispatch(fetchSearchProduct({ "": "" }, "search"));
    } else {
      dispatch(
        fetchSearchProduct({ [searchType]: searchValue }, "search")
      );
    }
  };

  
  const handleButtonClick = (value) =>{
    history("/salesReturns/create"); 
  }

  const handleDeleteSR = (id) => {
    setSRId(id)
    setdeleteModalOpen(true)
  }

  
  const handleDeleteProduct = (value) => {
    dispatch(deleteSalesReturns(SRId));
    setTimeout(() => {
      dispatch(getSalesReturnsList(params));
    }, 300);
    setdeleteModalOpen(false);
  }

  

  const handleDeleteModalClose = (value) => {
    setdeleteModalOpen(false)
  }
  const handleView = (id) => {
    history(`/salesReturns/viewSalesReturns/${id}`);
  };
  const handleEditSR = (id) => {
    history(`/salesReturns/EditSalesRetun/${id}`);
  };


  useEffect(() => {
    console.log("access",access)
    setCustomOptions(
      [{
        label: "View",
        func: (product_id) => handleView(product_id),
        flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag
      },
      {
        label: "Edit",
        func: (product_id) => handleEditSR(product_id),
        flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "UPDATE")?.ctrl_flag
      },
      {
        label: "Delete",
        func: (product_id) => handleDeleteSR(product_id),
        flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "DELETE")?.ctrl_flag
      },]
    )
  }, [access])



  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (product_id) => handleView(product_id),
    },
    {
      label: "Edit",
      func: (product_id) => handleEditSR(product_id),
    },
    {
      label: "Delete",
      func: (product_id) => handleDeleteSR(product_id),
    },
    
  ]);



  useEffect(() => {
    setPage(products?.meta?.info?.page_no - 1);
  }, [products]);

  return (
    <Box
      // className="viewProductTable"
      // style={{ background: "#F5F5F5", marginTop: "60px" }}
    >
         {deleteModalOpen && (
        <Suspense fallback={<div>Loading... </div>}>
          <RemoteWrapper>
            <RemoteModalViewV2
              handleDeleteProduct={handleDeleteProduct}
              handleModalClose={handleDeleteModalClose}
              modalOpen={deleteModalOpen}
              primary={
                "Selected Order will be deleted permanentely. Are you sure you want to do this?"
              }
              secondary={""}
              disclaimer={"Note: This will get deleted permanantly from the list"}
              actionBtns={["Cancel", "Delete"]}
            />
          </RemoteWrapper></Suspense>
      )}
       <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <RemoteDynamicAppBar
            dynamicAppBar={dynamicAppBar}
            sortOptions={sortOptions}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            filterSearchItems={filterSearchItems}
            searchItems={searchItems}
            searchOptions={searchOptions}
            searchType={searchType}
            setSearchType={setSearchType}
            //handleButtonClick={handleButtonClick}
            buttons={[{ name: "Create", handleButtonClick: handleButtonClick, flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "CREATE")?.ctrl_flag }]}
          />
        </RemoteWrapper></Suspense>
      {products && access && access[0]?.module_ctrl_flag && products?.meta && products?.meta?.info && (
        <Suspense fallback={<div>Loading... </div>}>
          <RemoteWrapper>
            <RemoteDynamicTable
              table_data={products?.data}
              headCells={headCells}
              customOptions={customOptions}
              setCustomOptions={setCustomOptions}
              info={products?.meta?.info}
              setParams={setParams}
              handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
              setId={setId}
              enablepagination={true}
              
              
            />
          </RemoteWrapper>
        </Suspense>
      )}
    </Box>
  );
}

export default SalesReturn;

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
