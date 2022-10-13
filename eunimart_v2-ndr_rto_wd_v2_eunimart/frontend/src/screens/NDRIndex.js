import React, { useEffect, useState, Suspense } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";
import { loadNDRData, viewAccessManagementNDR } from "../redux/Actions/action";
import RemoteDynamicTable from "Remote/DynamicTable";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import "../index.css";
const NDRIndex = () => {
  const { ndrdata, ndrdata_meta, accessNdr } = useSelector((state) => state.data);

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
          label: "Ascending",
          key: "asc",
        },
        {
          label: "Descending",
          key: "desc",
        },
      ],
      func: (value) => {
        dispatch(loadNDRData({ limit: params.limit, offset: params.offset, filters: params.filters, sort: JSON.stringify([["shipping_order_id", value]]) }))
      },
    },
    {
      label: "Clear All",
      endIcon: null,
      func: (value) => {
        dispatch(loadNDRData({ "": "" }));
      },
    },
  ];

  const searchOptions = [
    { label: "Shipping ID : ", value: "shipping_order_id" },
  ]

  const [filterOptions, setFilterOptions] = useState(
    [
      {
        label: "Shipping ID",
        collapseState: false,
        value: "shipping_order_id",
      },
    ]

  );

  const filterSearchItems = (searchValue, searchType) => {
    if (searchValue.length === 0) {
      dispatch(loadNDRData({ "": "" }, "filters"));
    } else {
      dispatch(
        dispatch(loadNDRData({ limit: params.limit, offset: params.offset, filters: JSON.stringify([[searchType, "ilike", searchValue]]) }))
      );
    }
  };

  const searchItems = (searchValue) => {
    if (searchValue.length === 0) {
      console.log('645v73')
      dispatch(loadNDRData({ "": "" }, "search"));
    } else {
      dispatch(loadNDRData({ limit: params.limit, offset: params.offset, filters: JSON.stringify([[searchType, "ilike", searchValue]]) }))
    }
  };

  useEffect(() => {
    setCustomOptions([
      {
        label: "View",
        func: (product_id) => handleView(product_id),
        flag: accessNdr?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag
      }
    ])
  }, [accessNdr])

  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (product_id) => handleView(product_id),
    },
  ]);
  const handleView = (id) => {
    navigate.push("/ndr/view/" + id);
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
      key: "shipping_order.awb_number",
      count: 2,
      numeric: true,
      label: "Transaction ID",
      type: "text"
    },
    {
      key: "shipping_order.billing_address.city",
      count: 3,
      numeric: true,
      label: "Pickup Address",
      type: "text"
    },
    {
      key: "shipping_order.order.customer_shipping_address.location_name",
      count: 3,
      numeric: true,
      label: "Destination Address",
      type: "text"
    },
    {
      key: "shipping_order.order.customer_name",
      count: 3,
      numeric: true,
      label: "Customer Details",
      type: "text"
    },
    {
      key: "shipping_order.shipping_order_lines[0]?.product_variant.product_name",
      count: 3,
      numeric: true,
      label: "Product Details",
      type: "text"
    },
    {
      key: "shipping_order.order.payment_type_id",
      count: 3,
      numeric: true,
      label: "Payment Type",
      type: "text"
    },
    {
      key: "shipping_order.order.channel_name",
      count: 2,
      numeric: true,
      label: "Channel",
      type: "text"
    },
    {
      key: "ndr_lines.failure_reason",
      count: 2,
      numeric: true,
      label: "Failure Reason",
      type: "text"
    },
    {
      key: "shipping_order.order.so_payment_details.total_amount",
      count: 3,
      numeric: true,
      label: "Amount",
      type: "text"
    },
    {
      key: "ndr_lines.last_delivery_attempt_date",
      count: 2,
      numeric: true,
      label: "Last Delivery Attempt",
      type: "date"
    },
    {
      key: "delivery_attempt_left",
      numeric: true,
      label: "Delivery attempts left",
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
    dispatch(viewAccessManagementNDR())
    dispatch(loadNDRData(params));
  }, []);
  console.log("ndrdata", ndrdata);
  useEffect(() => {
    dispatch(loadNDRData(params));
  }, [params])

  return (

    <Box sx={{ background: "#F9F9F9" }}>
      {ndrdata?.length > 0 && accessNdr && accessNdr[0]?.module_ctrl_flag && accessNdr?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "LIST")?.ctrl_flag === 1 && (

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
        </Suspense>
      )}
      {ndrdata?.length > 0 && accessNdr && accessNdr[0]?.module_ctrl_flag && accessNdr?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "LIST")?.ctrl_flag === 1 && (
        <div>
          <RemoteDynamicTable
            table_data={ndrdata}
            headCells={headCells}
            info={ndrdata_meta.info}
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
export default NDRIndex;



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