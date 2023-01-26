import React, { useEffect, useState, Suspense } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";
import { loadWDData, viewAccessManagementWD } from "../redux/Actions/action";
import RemoteDynamicTable from "Remote/DynamicTable";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import "../index.css";
const WDIndex = () => {
  const { wddata, wddata_meta, accessWd } = useSelector((state) => state.data);
  const [params, setParams] = useState({ limit: 10, offset: 1, filters: null, sort: null });
  const [dynamicAppBar, setDynamicAppBar] = useState([]);
  const [searchType, setSearchType] = useState("shipping_order_id");
  const [selectedId, setId] = useState(0);
  const navigate = useHistory();


  const handleChangeDyanmicAppBar = (value) => {
    setDynamicAppBar(value);
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const sortOptions = [
    {
      label: "Shipping ID",
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
        dispatch(loadWDData({ limit: params.limit, offset: params.offset, filters: params.filters, sort: JSON.stringify([["shipping_order_id", value]]) }))
      },
    },
    {
      label: "Reference ID",
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
        dispatch(loadWDData({ limit: params.limit, offset: params.offset, filters: params.filters, sort: JSON.stringify([["shipping_order.reference_number", value]]) }))
      },
    },
    {
      label: "Transaction ID",
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
        dispatch(loadWDData({ limit: params.limit, offset: params.offset, filters: params.filters, sort: JSON.stringify([["transaction_id", value]]) }))
      },
    },
    {
      label: "AWB No",
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
        dispatch(loadWDData({ limit: params.limit, offset: params.offset, filters: params.filters, sort: JSON.stringify([["shipping_order.awb_number", value]]) }))
      },
    },
    {
      label: "Clear All",
      endIcon: null,
      func: (value) => {
        dispatch(loadWDData({ "": "" }));
      },
    },
  ];

  const searchOptions = [
    { label: "Shipping ID : ", value: "shipping_order_id" },
    { label: "Reference ID : ", value: "shipping_order.reference_number" },
    { label: "Transaction ID : ", value: "transaction_id" },
    { label: "AWB No : ", value: "shipping_order.awb_number" },
  ]

  const [filterOptions, setFilterOptions] = useState(
    [
      {
        label: "Shipping ID",
        collapseState: false,
        value: "shipping_order_id",
      },
      {
        label: "Reference ID",
        collapseState: false,
        value: "shipping_order.reference_number",
      },
      {
        label: "Transaction ID",
        collapseState: false,
        value: "transaction_id",
      },
      {
        label: "AWB No",
        collapseState: false,
        value: "shipping_order.awb_number",
      },
    ]

  );

  const filterSearchItems = (searchValue, searchType) => {
    if (searchValue.length === 0) {
      dispatch(loadWDData({ "": "" }, "filters"));
    } else {
      dispatch(
        dispatch(loadWDData({ limit: params.limit, offset: params.offset, filters: JSON.stringify([[searchType, "ilike", searchValue]]) }))
      );
    }
  };

  const searchItems = (searchValue) => {
    if (searchValue.length === 0) {
      dispatch(loadWDData({ "": "" }, "search"));
    } else {
      dispatch(
        dispatch(loadWDData({ limit: params.limit, offset: params.offset, filters: JSON.stringify([[searchType, "ilike", searchValue]]) }))
      );
    }
  };
  useEffect(() => {

    console.log(accessWd, "accessWd")
    setCustomOptions([{
      label: "View",
      func: (product_id) => handleView(product_id),
      flag: accessWd?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag
    }])
  }, [accessWd])
  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (product_id) => handleView(product_id),
      flag: accessWd?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag
    },
  ]);

  const handleView = (id) => {
    navigate.push("/wd/view/" + id);
  }

  const headCells = [
    {
      key: "shipping_order_id",
      numeric: true,
      label: "Shipping ID",
      type: "text"
    },
    {
      key: "shipping_order.reference_number",
      count: 2,
      numeric: true,
      label: "Reference ID",
      type: "text"
    },
    {
      key: "transaction_id",
      numeric: true,
      label: "Transaction ID",
      type: "text"
    },
    {
      key: "shipping_order.awb_number",
      count: 2,
      numeric: true,
      label: "AWB No",
      type: "text"
    },
    {
      key: "courier_partner_file_id.courier_partner_file",
      count: 2,
      numeric: true,
      label: "Courier Partner Proof",
      type: "text"
    },
    {
      key: "created_date",
      numeric: true,
      label: "Raised date",
      type: "date"
    },
    {
      key: "initial_weight_type_id",
      numeric: true,
      label: "Initial Weight Type",
      type: "text"
    },
    {
      key: "initial_weight_taken",
      numeric: true,
      label: "Intial Weight Taken",
      type: "text"
    },
    {
      key: "final_weight_type_id",
      numeric: true,
      label: "Final Weight Type",
      type: "text"
    },
    {
      key: "final_weight_taken",
      numeric: true,
      label: "Final Weight Taken",
      type: "text"
    },
    {
      key: "shipping_order.order.so_payment_details.total_amount",
      count: 4,
      numeric: true,
      label: "Intial Amount",
      type: "text"
    },
    {
      key: "final_amount",
      numeric: true,
      label: "Final Amount",
      type: "date"
    },
    {
      key: "discrepancy_amount",
      numeric: true,
      label: "Discrepancy Amount",
      type: "text"
    },

    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action"
    },
  ];
  let dispatch = useDispatch();
  console.log("_", params);
  useEffect(() => {
    dispatch(viewAccessManagementWD())
    dispatch(loadWDData(params));
  }, []);
  console.log("wddata", wddata);
  useEffect(() => {
    dispatch(loadWDData(params));
  }, [params])

  return (

    <Box sx={{ background: "#F9F9F9" }}>
      {wddata?.length > 0 && accessWd && accessWd[0]?.module_ctrl_flag && accessWd?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "LIST")?.ctrl_flag === 1 && (

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
          />
        </Suspense>)}
      {wddata?.length > 0 && accessWd && accessWd[0]?.module_ctrl_flag && accessWd?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "LIST")?.ctrl_flag === 1 && (
        <div>
          <RemoteDynamicTable
            table_data={wddata}
            headCells={headCells}
            info={wddata_meta.info}
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
  );
};
export default WDIndex;


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