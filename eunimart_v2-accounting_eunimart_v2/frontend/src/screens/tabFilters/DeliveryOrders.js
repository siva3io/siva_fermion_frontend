import React, { useState, Suspense } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";
import RemoteDynamicTable from "Remote/DynamicTable";
import "react-toastify/dist/ReactToastify.css";

const DeliveryOrders = (Deliverydata) => {
  const navigate = useHistory();
  const TableData = [
    {
      key: "created_date",
      numeric: false,
      label: "DO Date",
      type: "date",
    },
    {
      key: "delivery_order_details.delivery_order_number",
      numeric: false,
      label: "DO Number",
      type: "text",
    },
    {
      key: "delivery_order_details.reference_id",
      numeric: false,
      label: "Reference Number",
      type: "text",
    },
    {
      key: "tracking_number",
      numeric: false,
      label: "Tracking Number",
      type: "text",
    },
    {
      key: "customer_name",
      numeric: false,
      label: "Customer Name",
      type: "text",
    },
    {
      key: "channel_name",
      numeric: false,
      label: "Channel Name",
      type: "text",
    },
    {
      key: "payment_type.display_name",
      numeric: false,
      label: "Payment Type",
      type: "text",
    },
    {
      key: "status.display_name",
      numeric: false,
      label: "Status",
      type: "text",
    },
    {
      key: "channel_name",
      numeric: false,
      label: "Shipping Type",
      type: "text",
    },
    {
      key: "shipping_carrier.display_name",
      numeric: false,
      label: "Carrier",
      type: "text",
    },
    {
      key: "shipping_details.estimated_cost.cost",
      numeric: false,
      label: "Amount",
      type: "text",
    },
    {
      key: "delivery_order_details.sales_order.payment_terms.display_name",
      numeric: false,
      label: "Payment Terms",
      type: "text",
    },
    {
      key: "shipping_details.estimated_cost.shipping_partners",
      numeric: false,
      label: "Shipping Label",
      type: "text",
    },
    {
      key: "shipping_details.estimated_cost.order_delivery_time",
      numeric: false,
      label: "Exp. Shipping",
      type: "text",
    },
    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action",
    },
  ];

  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (sales_id) => handleView(sales_id),
    },
  ]);

  const handleView = (id) => {
    navigate.push("/deliveryOrders/view/" + id);
  };

  return (
    <Box sx={{ background: "#F9F9F9" }}>
      {Deliverydata && (
        <Box sx={{ p: 2 }}>
          <Suspense fallback={<div>Loading... </div>}>
            <RemoteDynamicTable
              table_data={Deliverydata}
              headCells={TableData}
              customOptions={customOptions}
              setCustomOptions={setCustomOptions}
              enablepagination={false}
            />
          </Suspense>
        </Box>
      )}
    </Box>
  );
};
export default DeliveryOrders;

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
