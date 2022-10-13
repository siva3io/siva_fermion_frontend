import React, { useEffect, useState, Suspense } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";
import { loadRTOData, viewAccessManagementRDO } from "../redux/Actions/action";
import RemoteDynamicTable from "Remote/DynamicTable";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import "../index.css";
const RTOIndex = () => {
  const [params, setParams] = useState({ limit: 10, offset: 1, filters: null, sort: null });
  const [dynamicAppBar, setDynamicAppBar] = useState([]);
  const [searchType, setSearchType] = useState("shipping_partner_id");
  const [selectedId, setId] = useState(0);
  const navigate = useHistory();
  const { rtodata, rtodata_meta, accessRto } = useSelector((state) => state.data);


  const handleChangeDyanmicAppBar = (value) => {
    setDynamicAppBar(value);
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const sortOptions = [
    {
      label: "Shipment ID",
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
        dispatch(loadRTOData({ limit: params.limit, offset: params.offset, filters: params.filters, sort: JSON.stringify([["shipping_partner_id", value]]) }))
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
        dispatch(loadRTOData({ limit: params.limit, offset: params.offset, filters: params.filters, sort: JSON.stringify([["shipping_order.order.reference_number", value]]) }))
      },
    },
    {
      label: "AWB Number",
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
        dispatch(loadRTOData({ limit: params.limit, offset: params.offset, filters: params.filters, sort: JSON.stringify([["shipping_order.awb_number", value]]) }))
      },
    },
    {
      label: "Clear All",
      endIcon: null,
      func: (value) => {
        dispatch(loadRTOData({ "": "" }));
      },
    },
  ];

  const searchOptions = [
    { label: "Shipment ID : ", value: "shipping_partner_id" },
    { label: "Reference ID : ", value: "shipping_order.order.reference_number" },
    { label: "AWB Number : ", value: "shipping_order.awb_number" },
  ]

  const [filterOptions, setFilterOptions] = useState(
    [
      {
        label: "Shipment ID",
        collapseState: false,
        value: "shipping_partner_id",
      },
      {
        label: "Reference ID",
        collapseState: false,
        value: "shipping_order.order.reference_number",
      },
      {
        label: "AWB Number",
        collapseState: false,
        value: "shipping_order.awb_number",
      },
    ]

  );

  const filterSearchItems = (searchValue, searchType) => {
    if (searchValue.length === 0) {
      dispatch(loadRTOData({ "": "" }, "filters"));
    } else {
      dispatch(
        dispatch(loadRTOData({ limit: params.limit, offset: params.offset, filters: JSON.stringify([[searchType, "ilike", searchValue]]) }))
      );
    }
  };

  const searchItems = (searchValue) => {
    if (searchValue.length === 0) {
      dispatch(loadRTOData({ "": "" }, "search"));
    } else {
      dispatch(
        dispatch(loadRTOData({ limit: params.limit, offset: params.offset, filters: JSON.stringify([[searchType, "ilike", searchValue]]) }))
      );
    }
  };
  useEffect(() => {
    setCustomOptions([
      {
        label: "View",
        func: (product_id) => handleView(product_id),
        flag: accessRto?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag

      },
    ])
  }, [accessRto])
  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (product_id) => handleView(product_id),
    },
  ]);
  const handleView = (id) => {
    navigate.push("/rto/view/" + id);
  }

  const headCells = [
    {
      key: "shipping_partner_id",
      numeric: true,
      label: "Shipment ID",
      type: "text"
    },
    {
      key: "shipping_order.order.reference_number",
      count: 3,
      numeric: true,
      label: "Reference ID",
      type: "text"
    },
    {
      key: "shipping_order.awb_number",
      count: 2,
      numeric: true,
      label: "AWB Number",
      type: "text"
    },
    {
      key: "shipping_order.order.customer_name",
      count: 2,
      numeric: true,
      label: "Consignee",
      type: "text"
    },
    {
      key: "booking_date",
      numeric: true,
      label: "Booking Date",
      type: "date"
    },
    {
      key: "return_date",
      numeric: true,
      label: "Return Date",
      type: "date"
    },
    {
      key: "rto_cost",
      numeric: true,
      label: "RTO Cost",
      type: "text"
    },
    {
      key: "actual_delivery_date",
      numeric: true,
      label: "PSDD",
      type: "date"
    },
    {
      key: "estimate_delivery_date",
      numeric: true,
      label: "ESDD",
      type: "date"
    },
    {
      key: "shipping_order.order.payment_type_id",
      count: 3,
      numeric: true,
      label: "Payment Type",
      type: "text"
    },
    {
      key: "shipping_order.shipping_partner_id",
      count: 2,
      numeric: true,
      label: "Shipping Partner",
      type: "text"
    },
    {
      key: "quantity",
      numeric: true,
      label: "Quantity",
      type: "date"
    },
    {
      key: "shipping_order.cod_status",
      count: 2,
      numeric: true,
      label: "Tracking Status",
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
    dispatch(viewAccessManagementRDO())
    dispatch(loadRTOData(params));
  }, []);
  console.log("rtodata", rtodata);
  useEffect(() => {
    dispatch(loadRTOData(params));
  }, [params])

  return (
    <Box sx={{ background: "#F9F9F9" }}>
      {rtodata?.length > 0 && accessRto && accessRto[0]?.module_ctrl_flag && accessRto?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "LIST")?.ctrl_flag === 1 && (

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
      {rtodata?.length > 0 && accessRto && accessRto[0]?.module_ctrl_flag && accessRto?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "LIST")?.ctrl_flag === 1 && (
        <div>
          <RemoteDynamicTable
            table_data={rtodata}
            headCells={headCells}
            info={rtodata_meta.info}
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
export default RTOIndex;


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