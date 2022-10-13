import React, { useEffect, useState, Suspense } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { Box } from "@mui/material";
import {
  loadPurchaseReturnsData,
  deletePurchaseReturnsbyId,
  viewAccessManagement,
} from "../redux/actions/action";
// import { loadPurchaseReturnsData } from "../redux/actions/action";
import "../index.css";
import RemoteDynamicTable from "Remote/DynamicTable";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import ErrorBoundary from "../ErrorBoundary";
import { lazy } from "react";

const RemoteViewBox = React.lazy(() => import("Remote/ViewBox"));
const RemoteLocationCard = React.lazy(() => import("Remote/LocationCards"));
const RemoteButton = React.lazy(() => import("Remote/BasicButton"));
const RemoteModalViewV2 = React.lazy(() => import("Remote/ModalViewV2"));
import LocationCard from "../UI/LocationCard/LocationCard";
import "../App.css";
// import "./purchaseReturnsViewClass.css";
import { Box, Button, Typography } from "@mui/material";

import ModalViewV2 from "Remote/ModalViewV2";
import { loadPurchaseReturnsDataView } from "../redux/actions/action";

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const Purchasereturnsindex = () => {
  const [params, setParams] = useState({
    limit: 10,
    offset: 1,
    filters: null,
    sort: null,
  });
  const [dynamicAppBar, setDynamicAppBar] = useState([]); //state to manage dynamic appbar
  const [selectedId, setId] = useState(0);
  const [searchType, setSearchType] = useState("vendor_details.vendor_name");
  const navigate = useHistory();
  let dispatch = useDispatch();
  const handleButtonClick = () => {
    navigate.push("/purchaseReturns/create");
  };
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const { purchaseReturnsdata, purchaseReturnsdata_meta ,access} = useSelector(
    (state) => state.data
  );
  useEffect(() => {
    dispatch(viewAccessManagement())
    dispatch(loadPurchaseReturnsData(params));
  }, []);
  useEffect(() => {
    dispatch(loadPurchaseReturnsData(params));
  }, [params]);
  const handleChangeDyanmicAppBar = (value) => {
    setDynamicAppBar(value);
  };
  const handleView = (id) => {
    navigate.push("/purchaseReturns/view/" + id);
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const [PurchaseReturnId, setPurchaseReturnId] = useState(0);
  const handleDeleteProduct = (value) => {
    console.log("enter", PurchaseReturnId);
    dispatch(deletePurchaseReturnsbyId(PurchaseReturnId));
    setTimeout(() => {
      dispatch(loadPurchaseReturnsData(params));
    }, 300);
    setdeleteModalOpen(false);
  };
  const handleDeleteModalClose = (value) => {
    console.log("enter close");
    setdeleteModalOpen(false);
  };
  const handleDeleteModalOpen = (value) => {
    setPurchaseReturnId(value);
    setdeleteModalOpen(true);
  };
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
    // {
    // label: "Clone",
    //func: (product_id) => handleArchiveModalOpen(product_id),
    // },
    // {
    // label: "Send PR by email",
    //func: (product_id) => handleDeleteModalOpen(product_id),
    // },
    // {
    // label: "Generate PR",
    //func: (product_id) => handleFavouriteModalOpen(product_id),
    // },
    // {
    // label: "Print Purchase Return",
    //func: (product_id) => handleEditProductTemplate(product_id),
    // },
    // {
    // label: "Mark As",
    //func: (product_id) => handleArchiveModalOpen(product_id),
    // },
    // {
    // label: "Convert to Debit Note",
    //func: (product_id) => handleDeleteModalOpen(product_id),
    // },
    // {
    // label: "Cancel",
    //func: (product_id) => handleFavouriteModalOpen(product_id),
    // },
  ]);
  const handleEdit = (id) => {
    console.log("handleEdit", id);
    navigate.push("/purchaseReturns/edit/" + id);
  };
  const [headCells,setHeadCells] = useState([
    {
      key: "purchase_return_number",
      numeric: false,
      label: "PR Number",
      type: "text",
    },
    {
      key: "reference_number",
      numeric: false,
      label: "Reference ID",
      type: "text",
    },
    {
      key: "source_documents.purchase_order_number",
      numeric: false,
      label: "Linked Document",
      type: "text",
    },
    {
      key: "vendor_details.vendor_contact",
      numeric: false,
      label: "Vendor Name",
      type: "text",
    },
    {
      key: "debit_note_issued.display_name",
      numeric: false,
      label: "Debit Note Issued",
      type: "text",
    },
    {
      key: "amount",
      numeric: false,
      label: "Amount",
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
      key: "pr_date",
      numeric: false,
      label: "PR Date",
      type: "date",
      count: true,
    },
    {
      key: "expected_delivery_date",
      numeric: false,
      label: "Exp. Shipping Date",
      type: "date",
    },

    {
      key: "status.display_name",
      numeric: false,
      label: "Status",
      type: "text",
      count: true,
    },

    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action",
    },
  ]);
  const sortOptions = [
    {
      label: "PR Number",
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
        dispatch(
          loadPurchaseReturnsData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["purchase_return_number", value]]),
          })
        );
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
        dispatch(
          loadPurchaseReturnsData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["reference_number", value]]),
          })
        );
      },
    },
    {
      label: "vendor_details.vendor_name",
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
        dispatch(
          loadPurchaseReturnsData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["vendor_details.vendor_name", value]]),
          })
        );
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
  const [filterOptions, setFilterOptions] = useState([
    {
      label: "PR Number",
      collapseState: false,
      value: "purchase_return_number",
    },
    {
      label: "Reference No",
      collapseState: false,
      value: "reference_number",
    },
    // {
    //   label: "Vendor Name",
    //   collapseState: false,
    //   value: "vendor_details.vendor_name",
    // },
  ]);
  const filterSearchItems = (searchValue, searchType) => {
    if (searchValue.length === 0) {
      dispatch(loadPurchaseReturnsData({ "": "" }, "filters"));
    } else {
      dispatch(
        dispatch(
          loadPurchaseReturnsData({
            limit: params.limit,
            offset: params.offset,
            filters: JSON.stringify([[searchType, "ilike", searchValue]]),
          })
        )
      );
    }
  };
  const searchItems = (searchValue) => {
    if (searchValue.length === 0) {
      dispatch(loadPurchaseReturnsData({ "": "" }, "search"));
    } else {
      dispatch(
        dispatch(
          loadPurchaseReturnsData({
            limit: params.limit,
            offset: params.offset,
            filters: JSON.stringify([[searchType, "ilike", searchValue]]),
          })
        )
      );
    }
  };
  const searchOptions = [
    { label: "PR Number : ", value: "purchase_return_number" },
    { label: "Reference No : ", value: "reference_number" },
  ];

  const handleDummy =()=>{
    console.log("abcd dummy")
  }

  return (
    <>
      <Box sx={{ background: "#F9F9F9" }}>

        {/* <Suspense fallback={<div>Loading... </div>}>
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
          />
        </Suspense> */}
        {
          purchaseReturnsdata.length > 0 && access && access[0]?.module_ctrl_flag && access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "LIST" )?.ctrl_flag ===1 && (

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

        {purchaseReturnsdata.length > 0 && access && access[0]?.module_ctrl_flag && access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "LIST" )?.ctrl_flag ===1 && (
          <div>
            <RemoteDynamicTable
              table_data={purchaseReturnsdata}
              headCells={headCells}
              info={purchaseReturnsdata_meta.info}
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
      {deleteModalOpen && (
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
              disclaimer={
                "Note: This will get deleted permanantly from the list"
              }
              actionBtns={["Cancel", "Delete"]}
            />
          </RemoteWrapper>
        </Suspense>
      )}
    </>
  );
};
export default Purchasereturnsindex;

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