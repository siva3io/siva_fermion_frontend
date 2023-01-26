import React, { useEffect, useState, Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSalesInvoiceData,
  deleteSalesInvoiceInvoice,
  viewSIAccessManagement,
} from "../redux/action";
import ErrorBoundary from "../../ErrorBoundary";
import RemoteDynamicTable from "Remote/DynamicTable";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import "../index.css";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);
const SalesInvoiceIndex = () => {
  let dispatch = useDispatch();
  const { salesInvoicedata, siAccess } = useSelector(state => state.data);
  const salesInvoicedata_meta = useSelector(
    state => state.data.salesInvoicedata_meta
  );
  useEffect(() => {
    dispatch(viewSIAccessManagement());
    dispatch(loadSalesInvoiceData(params));
  }, []);
  useEffect(() => {
    dispatch(loadSalesInvoiceData(params));
  }, [dispatch]);
  useEffect(() => {
    dispatch(loadSalesInvoiceData(params));
  }, [params]);

  useEffect(() => {}, [salesInvoicedata_meta]);
  const navigate = useHistory();
  const RemoteModalViewV2 = React.lazy(() => import("Remote/ModalViewV2"));
  const [params, setParams] = useState({
    limit: 10,
    offset: 1,
    filters: null,
    sort: null,
  });
  const [dynamicAppBar, setDynamicAppBar] = useState([]); //state to manage dynamic appbar
  const [selectedId, setId] = useState(0);
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const history = useHistory();
  const [searchType, setSearchType] = useState("id");
  const [salesInvoiceId, setSalesInvoiceId] = useState(0);
  const handleChangeDyanmicAppBar = value => {
    setDynamicAppBar(value);
  };

  console.log("enter");

  const handleViewInventory = id => {
    history.push(`/salesInvoice/view/${id}`);
  };
  const handleEdit = id => {
    console.log("handleEdit", id);
    navigate.push("/salesInvoice/edit/" + id);
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleButtonClick = value => {
    navigate.push("/salesInvoice/create");
  };

  const handleDeleteProduct = value => {
    console.log("enter");
    dispatch(deleteSalesInvoiceInvoice(salesInvoiceId));
    setTimeout(() => {
      dispatch(loadSalesInvoiceData(params));
    }, 300);
    setdeleteModalOpen(false);
  };

  const handleDeleteModalClose = value => {
    console.log("enter close");
    setdeleteModalOpen(false);
  };

  const handleDeleteModalOpen = value => {
    setSalesInvoiceId(value);
    setdeleteModalOpen(true);
  };
  const filterSearchItems = (searchValue, searchType) => {
    if (searchValue.length === 0) {
      dispatch(loadSalesInvoiceData({ "": "" }, "filters"));
    } else {
      dispatch(
        dispatch(
          loadSalesInvoiceData({
            limit: params.limit,
            offset: params.offset,
            filters: JSON.stringify([[searchType, "ilike", searchValue]]),
          })
        )
      );
    }
  };

  const searchItems = searchValue => {
    if (searchValue.length === 0) {
      dispatch(loadSalesInvoiceData({ "": "" }, "search"));
    } else {
      dispatch(
        dispatch(
          loadSalesInvoiceData({
            limit: params.limit,
            offset: params.offset,
            filters: JSON.stringify([[searchType, "ilike", searchValue]]),
          })
        )
      );
    }
  };
  const sortOptions = [
    {
      label: "Invoice Date",
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
      func: value => {
        dispatch(
          loadSalesInvoiceData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["created_date", value]]),
          })
        );
      },
    },
    {
      label: "Invoice ID",
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
      func: value => {
        dispatch(
          loadSalesInvoiceData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify(["id", value]),
          })
        );
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
      func: value => {
        dispatch(
          loadSalesInvoiceData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["reference_number", value]]),
          })
        );
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
      func: value => {
        dispatch(
          loadSalesInvoiceData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["customer_name", value]]),
          })
        );
      },
    },
    {
      label: "Channel Name",
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
      func: value => {
        dispatch(
          loadSalesInvoiceData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["channel.code", value]]),
          })
        );
      },
    },
    {
      label: "Balance due",
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
      func: value => {
        dispatch(
          loadSalesInvoiceData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["payment_amount", value]]),
          })
        );
      },
    },
    {
      label: "Payment Terms",
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
      func: value => {
        dispatch(
          loadSalesInvoiceData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["payment_terms.display_name", value]]),
          })
        );
      },
    },
    {
      label: "Exp. Shipping Date",
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
      func: value => {
        dispatch(
          loadSalesInvoiceData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["expected_shipping_date", value]]),
          })
        );
      },
    },
  ];

  const searchOptions = [
    { label: "Invoice ID : ", value: "id" },
    { label: "Reference ID : ", value: "reference_number" },
    { label: "Customer Name : ", value: "customer_name" },
    { label: "Channel Name : ", value: "channel_name" },
  ];

  const [filterOptions, setFilterOptions] = useState([
    {
      label: "Invoice ID",
      collapseState: false,
      value: "id",
    },
    {
      label: "Reference ID",
      collapseState: false,
      value: "reference_number",
    },
    {
      label: "Customer Name",
      collapseState: false,
      value: "customer_name",
    },
    //
    {
      label: "Channel Name",
      collapseState: false,
      value: "channel_name",
    },
  ]);

  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: product_id => handleViewInventory(product_id),
      flag: siAccess
        ?.find(row => row === row)
        ?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag,
    },
    {
      label: "Edit",
      func: product_id => handleEdit(product_id),
      flag: 1,
    },
    {
      label: "Delete",
      func: product_id => handleDeleteModalOpen(product_id),
      flag: 1,
    },
  ]);
  useEffect(() => {
    setCustomOptions([
      {
        label: "View",
        func: product_id => handleViewInventory(product_id),
        flag: siAccess
          ?.find(row => row === row)
          ?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag,
      },
      {
        label: "Edit",
        func: product_id => handleEdit(product_id),
        flag: siAccess
          ?.find(row => row === row)
          ?.view_actions_json?.find(o => o.lookup_code === "UPDATE")?.ctrl_flag,
      },
      {
        label: "Delete",
        func: product_id => handleDeleteModalOpen(product_id),
        flag: siAccess
          ?.find(row => row === row)
          ?.view_actions_json?.find(o => o.lookup_code === "DELETE")?.ctrl_flag,
      },
    ]);
  }, [siAccess]);

  const headCells = [
    {
      key: "created_date",
      numeric: true,
      label: "Invoice Date",
      type: "date",
    },
    {
      key: "id",
      numeric: true,
      label: "Invoice ID",
      type: "text",
    },
    {
      key: "reference_number",
      numeric: true,
      label: "Reference ID",
      type: "text",
    },
    {
      key: "customer_name",
      numeric: false,
      label: "Customer Name",
      type: "text",
    },
    {
      key: "channel.code",
      numeric: true,
      label: "Channel Name",
      type: "text",
      count: true,
    },
    {
      key: "payment_type['display_name']",
      numeric: true,
      label: "Payment Type",
      type: "text",
      count: true,
    },
    {
      key: "status['display_name']",
      numeric: true,
      label: "Status",
      type: "text",
      count: true,
    },
    {
      key: "invoiced['display_name']",
      numeric: true,
      label: "Invoiced",
      type: "text",
      count: true,
    },
    {
      key: "payment_received['display_name']",
      numeric: true,
      label: "Payment Received",
      type: "text",
      count: true,
    },
    {
      key: "balance_due_amount",
      numeric: false,
      label: "Balance due",
      type: "text",
    },
    {
      key: "payment_terms.display_name",
      numeric: true,
      label: "Payment Terms",
      type: "text",
      count: true,
    },
    {
      key: "expected_shipment_date",
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

  return (
    <Box sx={{ background: "#F9F9F9" }}>
      {deleteModalOpen && (
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
                disclaimer={
                  "Note: This will get deleted permanantly from the list"
                }
                actionBtns={["Cancel", "Delete"]}
              />
            </RemoteWrapper>
          </Suspense>
        </>
      )}
      {salesInvoicedata.length > 0 &&
        siAccess &&
        siAccess[0]?.module_ctrl_flag &&
        siAccess
          ?.find(row => row === row)
          ?.view_actions_json?.find(o => o.lookup_code === "LIST")
          ?.ctrl_flag === 1 && (
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
              buttons={[
                {
                  name: "Create",
                  handleButtonClick: handleButtonClick,
                  flag: siAccess
                    ?.find(row => row === row)
                    ?.view_actions_json?.find(o => o.lookup_code === "CREATE")
                    ?.ctrl_flag,
                },
              ]}
              // handleButtonClick={handleButtonClick}
            />
          </Suspense>
        )}
      {salesInvoicedata.length > 0 &&
        siAccess &&
        siAccess[0]?.module_ctrl_flag &&
        siAccess
          ?.find(row => row === row)
          ?.view_actions_json?.find(o => o.lookup_code === "LIST")
          ?.ctrl_flag === 1 && (
          <Suspense fallback={<div>Loading... </div>}>
            {salesInvoicedata && salesInvoicedata.length > 0 && (
              <div>
                <RemoteDynamicTable
                  table_data={salesInvoicedata}
                  headCells={headCells}
                  info={salesInvoicedata_meta.info}
                  customOptions={customOptions}
                  setCustomOptions={setCustomOptions}
                  setParams={setParams}
                  handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                  setId={setId}
                  enablepagination={true}
                />
              </div>
            )}
          </Suspense>
        )}
    </Box>
  );
};
export default SalesInvoiceIndex;

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
