import React, { useEffect, useState, Suspense } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadProductOrdersData,deletePo, viewAccessManagement } from "../redux/Actions/action"
import { purchaseOrdersReducer } from "../redux/Reducers/reducer";
import RemoteDynamicTable from "Remote/DynamicTable";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import ErrorBoundary from "../ErrorBoundary";

import "../index.css";

export default function purchaseOrdersIndex() {
  const { purchaseOrdersData, purchaseOrdersData_meta,access } = useSelector((state) => state.data);

  const history = useHistory();
  const [params, setParams] = useState({ per_page: 10, page_no: 1 });
  const [dynamicAppBar, setDynamicAppBar] = useState([]); //state to manage dynamic appbar
  const [selectedId, setId] = useState(0);


  const [searchType, setSearchType] = useState("purchase_order_number");



  const handleChangeDyanmicAppBar = (value) => {
    //setDynamicAppBar(value);
  };
  function handleViewProduct(id) {
    history.push(`/purchaseOrders/${id}`)
  }

  const handleEditProduct = (id) => {
    history.push("/purchaseOrders/edit/" + id);
  };

  useEffect(()=>{
    setCustomOptions(
      [
        {
          label: "view ",
          func: (purchase_id) => handleViewProduct(purchase_id),
          flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "READ" )?.ctrl_flag
    
        },
        {
          label: "Edit ",
          func: (purchase_id) => handleEditProduct(purchase_id),
          flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "UPDATE" )?.ctrl_flag
    
        },
        {
          label: "Delete",
          func: (purchase_id) => handleDeletePo(purchase_id),
          flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "DELETE" )?.ctrl_flag
    
        }
      ]
    )
  },[access])

  const [customOptions, setCustomOptions] = useState([
    {
      label: "view ",
      func: (purchase_id) => handleViewProduct(purchase_id),
      flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "READ" )?.ctrl_flag

    },
    {
      label: "Edit ",
      func: (purchase_id) => handleEditProduct(purchase_id),
      flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "UPDATE" )?.ctrl_flag

    },
    {
      label: "Delete",
      func: (purchase_id) => handleDeletePo(purchase_id),
      flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "DELETE" )?.ctrl_flag

    },
    // {
    //   label: "Clone",
    //   // func: (purchase_id) => handleFavouriteModalOpen(purchase_id),
    // },
    // {
    //   label: "Archive",
    //   // func: (purchase_id) => handleEditProductTemplate(purchase_id),
    // },
    // {
    //   label: "Email Purchase Order",
    //   // func: (purchase_id) => handleArchiveModalOpen(purchase_id),
    // },
    // {
    //   label: "Generate PO PDF",
    //   // func: (purchase_id) => handleDeleteModalOpen(purchase_id),
    // },
    // {
    //   label: "print purchase order ",
    //   // func: (purchase_id) => handleViewProduct(purchase_id),
    // },
    // {
    //   label: "Download",
    //   // func: (purchase_id) => handleFavouriteModalOpen(purchase_id),
    // },
    // {
    //   label: "Mark as",
    //   // func: (purchase_id) => handleEditProductTemplate(purchase_id),
    // },
    {
      label: "Delete",
      func: (purchase_id) => handleDeletePo(purchase_id),
    },
    // {
    //   label: "Create",
    //   // func: (purchase_id) => handleDeleteModalOpen(purchase_id),
    // },
  ]);


  const headCells = [
    {
      key: "date_and_time",
      label: "PO Date & Time",
      type: "date"
    },
    {
      key: "purchase_order_number",
      label: "PO Number",
      type: "text"
    },
    {
      key: "reference_number",
      label: "Reference Number",
      type: "text"
    },
    {
      key: "vendor_details.vendor_contact",
      count: 2,
      label: "Vendor Name",
      type: "text"
    },
    {
      key: "status.display_name",
      count: 2,
      label: "Status",
      type: "text"
    },
    {
      key: "billed.display_name",
      count: 2,
      label: "Billed",
      type: "text"
    },
    {
      key: "paid.display_name",
      count: 2,
      label: "Paid",
      type: "text"
    },
    {
      key: "amount",
      label: "Amount",
      type: "text"
    },
    {
      key: "payment_terms.display_name",
      count: 2,
      label: "Payment Terms",
      type: "text"
    },
    {
      key: "expected_delivery_date",
      label: "Expected Shipment",
      type: "text"
    },

    {
      key: "action",
      label: "Action",
      type: "action"
    },
  ];

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewAccessManagement())
    dispatch(loadProductOrdersData(params));
  }, []);

  useEffect(() => {
    dispatch(loadProductOrdersData(params));
  }, [params])

  useEffect(() => {
    console.log("purchaseOrdersData", purchaseOrdersData)
  }, [purchaseOrdersData])
  // _______________________________________________

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleButtonClick = (value) => {
    history.push("/purchaseOrders/add");
  }



  const searchItems = (searchValue) => {
    if (searchValue.length === 0) {
      dispatch(loadProductOrdersData({ "": "" }, "search"));
    } else {
      dispatch(
        dispatch(loadProductOrdersData({ limit: params.limit, offset: params.offset, filters: JSON.stringify([[searchType, "ilike", searchValue]]) }))
      );
    }
  };
  const sortOptions = [
    {
      label: "Purchase Order Number",
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
        dispatch(loadProductOrdersData({ limit: params.limit, offset: params.offset, filters: params.filters, sort: JSON.stringify(["purchase_order_number", value]) }))
      },
    },
    {
      label: "Reference ID",
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
        dispatch(loadProductOrdersData({ limit: params.limit, offset: params.offset, filters: params.filters, sort: JSON.stringify([["reference_number", value]]) }))
      },
    },
    {
      label: "Vendor Name",
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
        dispatch(loadProductOrdersData({ limit: params.limit, offset: params.offset, filters: params.filters, sort: JSON.stringify([["vendor_name", value]]) }))
      },
    },
    // {
    //   label: "Amount",
    //   subItems: [
    //     {
    //       label: "A to Z",
    //       key: "asc",
    //     },
    //     {
    //       label: "Z to A",
    //       key: "desc",
    //     },
    //   ],
    //   func: (value) => {
    //     dispatch(loadProductOrdersData({ limit: params.limit, offset: params.offset, filters:params.filters, sort:JSON.stringify([["payment_amount",value]]) }))
    //   },
    // },
    // {
    //   label: "Advance Sort",
    //   subItems: [
    //     {
    //       label: "A to Z",
    //       key: "asc",
    //     },
    //     {
    //       label: "Z to A",
    //       key: "desc",
    //     },
    //   ],
    //   func: (value) => {
    //     dispatch(loadProductOrdersData({ limit: params.limit, offset: params.offset, filters:params.filters, sort:JSON.stringify([["sales_order_number",value]]) }))
    //   },
    // },
  ];

  const searchOptions = [
    { label: "PO Number : ", value: "purchase_order_number" },
    { label: "Reference ID : ", value: "reference_number" },
    // { label: "Purchase return ID : ", value: "PoIds" }
    { label: "Vendor Name : ", value: "vendor_name" }

  ]

  const [filterOptions, setFilterOptions] = useState(
    [
      // {
      //   label: "PI date",
      //   collapseState: false,
      //   value: "purchase_invoice_date",
      // },
      {
        label: "Purchase Invoice Id",
        collapseState: false,
        value: "purchase_order_number",
      },
      {
        label: "Reference ID",
        collapseState: false,
        value: "reference_number",
      },
      {
        label: "Vendor Name",
        collapseState: false,
        value: "vendor_name",
      },
      // {
      //   label: "Status",
      //   collapseState: false,
      //   value: "status_id",
      // },
      // {
      //   label: "Paid",
      //   collapseState: false,
      //   value: "paid_id",
      // },
      // {
      //   label: "Payment terms",
      //   collapseState: false,
      //   value: "payment_terms_id",
      // },
      // {
      //   label: "Amount",
      //   collapseState: false,
      //   numeric:true,
      //   value: "payment_amount",
      // },
      // {
      //   label: "Balance Due",
      //   collapseState: false,
      //   value: "balance_due",
      // },
      // {
      //   label: "Due date",
      //   collapseState: false,
      //   value: "due_date",
      // },
      // {
      //   label: "Expected Shiping Date",
      //   collapseState: false,
      //   value: "expected_delivery_date",
      // },

    ]

  );


  const filterSearchItems = (searchValue, searchType) => {
    if (searchValue.length === 0) {
      dispatch(loadProductOrdersData({ "": "" }, "filters"));
    } else {
      dispatch(
        dispatch(loadProductOrdersData({ limit: params.limit, offset: params.offset, filters: JSON.stringify([[searchType, "ilike", searchValue]]) }))
      );
    }
  };


  const RemoteModalViewV2 = React.lazy(() => import("Remote/ModalViewV2"));

  const [poId, setpoId] = useState(0);

  const [deleteModalOpen, setdeleteModalOpen] = useState(false);

  const RemoteWrapper = ({ children }) => (
    <div>
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  );

  const handleDeletePo = (id) => {
    setpoId(id)
    setdeleteModalOpen(true)
  }

  const handleDeleteProduct = (value) => {
    dispatch(deletePo(poId));
    setTimeout(() => {
      dispatch(loadProductOrdersData(params));
    }, 300);
    setdeleteModalOpen(false);
  }

  const handleDeleteModalClose = (value) => {
    setdeleteModalOpen(false)
  }

  return (
    <>
      {purchaseOrdersData && purchaseOrdersData.length > 0 && access && access[0]?.module_ctrl_flag && access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "LIST" )?.ctrl_flag ===1 && (

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

      {deleteModalOpen && (
        <Suspense fallback={<div>Loading... </div>}>
          <RemoteWrapper>
            <RemoteModalViewV2
              handleDeleteProduct={handleDeleteProduct}
              handleModalClose={handleDeleteModalClose}
              modalOpen={deleteModalOpen}
              primary={
                "Selected PO will be deleted permanentely. Are you sure you want to do this?"
              }
              secondary={""}
              disclaimer={"Note: This will get deleted permanantly from the list"}
              actionBtns={["Cancel", "Delete"]}
            />
          </RemoteWrapper></Suspense>
      )}

      {purchaseOrdersData && purchaseOrdersData.length > 0 && access && access[0]?.module_ctrl_flag && access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "LIST" )?.ctrl_flag ===1 && (
        <div>
          <RemoteDynamicTable
            table_data={purchaseOrdersData}
            headCells={headCells}
            info={purchaseOrdersData_meta.info}
            customOptions={customOptions}
            setCustomOptions={setCustomOptions}
            setParams={setParams}
            handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
            setId={setId}
            enablepagination={true}
          />
        </div>
      )}
    </>
  )
}









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