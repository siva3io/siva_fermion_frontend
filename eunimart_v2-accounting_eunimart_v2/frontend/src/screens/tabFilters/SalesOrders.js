import React, { useState, Suspense } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";
import RemoteDynamicTable from "Remote/DynamicTable";

const SalesOrders = ({ salesdata }) => {
  const navigate = useHistory();
  const TableData = [
    {
      key: "created_date",
      numeric: false,
      label: "Sales Order Date",
      type: "date",
    },
    {
      key: "sales_order_number",
      numeric: false,
      label: "Sales Order#",
      type: "text",
    },
    {
      key: "reference_number",
      numeric: false,
      label: "Reference Number",
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
      count: true,
    },
    {
      key: "status.display_name",
      numeric: false,
      label: "Status",
      type: "text",
      count: true,
    },
    {
      key: "invoiced.display_name",
      numeric: false,
      label: "Invoiced",
      type: "text",
      count: true,
    },
    {
      key: "payment_received.display_name",
      numeric: false,
      label: "Payment Received",
      type: "text",
      count: true,
    },
    {
      key: "payment_amount",
      numeric: false,
      label: "Payment Amount",
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
      key: "expected_shipping_date",
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
  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (sales_id) => handleView(sales_id),
    },
  ]);

  const handleView = (id) => {
    navigate.push("/sales/view/" + id);
  };

  return (
    <Box sx={{ background: "#F9F9F9" }}>
      {salesdata && (
        <Box sx={{ p: 2 }}>
          <Suspense fallback={<div>Loading... </div>}>
            <RemoteDynamicTable
              table_data={[salesdata]}
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
export default SalesOrders;

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
