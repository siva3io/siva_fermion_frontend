import React, { useEffect, useState, Suspense } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import {
  loadPruchaseInvoiceData,
  loadDeleteDataById,
  viewPIAccessManagement,
} from "../redux/action";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import RemoteDynamicTable from "Remote/DynamicTable";
import RemoteModalViewV2 from "Remote/ModalViewV2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const navigate = useHistory();
  let dispatch = useDispatch();
  const {
    PurchaseInvoicedata,
    PurchaseInvoicedata_meta,
    Deletedata,
    piAccess,
  } = useSelector(state => state.data);
  useEffect(() => {
    dispatch(loadPruchaseInvoiceData(params));
  }, [params]);
  useEffect(() => {
    dispatch(viewPIAccessManagement());
  }, []);
  const [dynamicAppBar, setDynamicAppBar] = useState([]);
  const [params, setParams] = useState({
    limit: 10,
    offset: 1,
    filters: null,
    sort: null,
  });
  const [searchType, setSearchType] = useState("sales_order_number");
  const [selectedId, setId] = useState(0);
  const [deleteId, setdeleteId] = useState(0);
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const TableData = [
    {
      key: "purchase_invoice_date",
      numeric: false,
      label: "PI Date",
      type: "date",
    },
    {
      key: "purchase_invoice_number",
      numeric: false,
      label: "PI Number",
      type: "text",
    },
    {
      key: "reference_number",
      numeric: false,
      label: "Reference Number",
      type: "text",
    },
    {
      key: "vendor_details.vendor_contact.label",
      numeric: false,
      label: "Vendor Name",
      type: "text",
    },
    {
      key: "status.display_name",
      numeric: false,
      label: "Status",
      type: "text",
    },
    {
      key: "paid.display_name",
      numeric: false,
      label: "Paid",
      type: "text",
    },
    {
      key: "payment_terms.display_name",
      numeric: false,
      label: "Payment Terms",
      type: "text",
    },
    {
      key: "payment_amount",
      numeric: false,
      label: "Payment Amount",
      type: "text",
    },
    {
      key: "balance_due",
      numeric: false,
      label: "Balance Due",
      type: "text",
    },
    {
      key: "due_date",
      numeric: false,
      label: "Due Date",
      type: "date",
    },
    {
      key: "expected_delivery_date",
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

  const handleChangeDyanmicAppBar = value => {
    setDynamicAppBar(value);
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const sortOptions = [
    {
      label: "PI Number",
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
          loadPruchaseInvoiceData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["purchase_invoice_number", value]]),
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
      func: value => {
        dispatch(
          loadPruchaseInvoiceData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["reference_number", value]]),
          })
        );
      },
    },
    {
      label: "Clear All",
      endIcon: null,
      func: value => {
        dispatch(loadPruchaseInvoiceData({ "": "" }));
      },
    },
  ];

  const searchOptions = [
    { label: "PI Number : ", value: "purchase_invoice_number" },
    { label: "Reference Number : ", value: "reference_number" },
  ];

  const [filterOptions, setFilterOptions] = useState([
    {
      label: "PI Number",
      collapseState: false,
      value: "purchase_invoice_number",
    },
    {
      label: "Reference Number",
      collapseState: false,
      value: "reference_number",
    },
  ]);

  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: sales_id => handleView(sales_id),
      flag: piAccess
        ?.find(row => row === row)
        ?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag,
    },
    {
      label: "Edit",
      func: sales_id => handleEdit(sales_id),
      flag: 1,
    },
    {
      label: "Delete",
      func: sales_id => handleDeleteModalOpen(sales_id),
      flag: 1,
    },
  ]);
  useEffect(() => {
    setCustomOptions([
      {
        label: "View",
        func: product_id => handleView(product_id),
        flag: piAccess
          ?.find(row => row === row)
          ?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag,
      },
      {
        label: "Edit",
        func: product_id => handleEdit(product_id),
        flag: piAccess
          ?.find(row => row === row)
          ?.view_actions_json?.find(o => o.lookup_code === "UPDATE")?.ctrl_flag,
      },
      {
        label: "Delete",
        func: product_id => handleDeleteModalOpen(product_id),
        flag: piAccess
          ?.find(row => row === row)
          ?.view_actions_json?.find(o => o.lookup_code === "DELETE")?.ctrl_flag,
      },
    ]);
  }, [piAccess]);

  const handleDeleteModalClose = value => {
    console.log("enter close");
    setdeleteModalOpen(false);
  };

  const handleDeleteModalOpen = value => {
    setdeleteId(value);
    setdeleteModalOpen(true);
  };

  const handleView = id => {
    navigate.push("/PurchaseInvoice/view/" + id);
  };

  const handleDelete = () => {
    dispatch(
      loadDeleteDataById(deleteId, function (resp) {
        toast(resp);
      })
    );
    setTimeout(() => {
      dispatch(loadPruchaseInvoiceData(params));
    }, 300);
    setdeleteModalOpen(false);
  };

  const handleEdit = id => {
    navigate.push(`/PurchaseInvoice/edit/${id}`);
  };
  const handleButtonClick = value => {
    navigate.push("/PurchaseInvoice/add");
  };

  const filterSearchItems = (searchValue, searchType) => {
    if (searchValue.length === 0) {
      dispatch(loadPruchaseInvoiceData({ "": "" }, "filters"));
    } else {
      dispatch(
        dispatch(
          loadPruchaseInvoiceData({
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
      dispatch(loadPruchaseInvoiceData({ "": "" }, "search"));
    } else {
      dispatch(
        dispatch(
          loadPruchaseInvoiceData({
            limit: params.limit,
            offset: params.offset,
            filters: JSON.stringify([[searchType, "ilike", searchValue]]),
          })
        )
      );
    }
  };

  return (
    <Box sx={{ background: "#F9F9F9" }}>
      <RemoteModalViewV2
        handleDeleteProduct={handleDelete}
        handleModalClose={handleDeleteModalClose}
        modalOpen={deleteModalOpen}
        primary={"Are you sure you want to do this?"}
        secondary={""}
        disclaimer={"Note: This will get deleted permanantly from the list"}
        actionBtns={["Cancel", "Delete"]}
      />

      {PurchaseInvoicedata.length > 0 &&
        piAccess &&
        piAccess[0]?.module_ctrl_flag &&
        piAccess
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
                  flag: piAccess
                    ?.find(row => row === row)
                    ?.view_actions_json?.find(o => o.lookup_code === "CREATE")
                    ?.ctrl_flag,
                },
              ]}
              // handleButtonClick={handleButtonClick}
            />
          </Suspense>
        )}
      {PurchaseInvoicedata.length > 0 &&
        piAccess &&
        piAccess[0]?.module_ctrl_flag &&
        piAccess
          ?.find(row => row === row)
          ?.view_actions_json?.find(o => o.lookup_code === "LIST")
          ?.ctrl_flag === 1 && (
          <Box sx={{ p: 2 }}>
            <Suspense fallback={<div>Loading... </div>}>
              <RemoteDynamicTable
                table_data={PurchaseInvoicedata}
                headCells={TableData}
                customOptions={customOptions}
                setCustomOptions={setCustomOptions}
                info={PurchaseInvoicedata_meta.info}
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
export default Index;

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
