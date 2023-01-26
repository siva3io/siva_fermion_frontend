import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadDeliveryOrdersData } from "../redux/Action/istListAction";
import { Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary";
const RemoteDynamicTable = React.lazy(() => import("Remote/DynamicTable"));

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const DeliveryOrdersTab = ({ id }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [setId] = useState(0);
  const [params, setParams] = useState({ per_page: 10, page_no: 1 });
  console.log("DeliveryOrdersViewData", id);

  useEffect(() => {
    dispatch(loadDeliveryOrdersData(params, id));
  }, [params]);

  // const DeliveryOrdersData = useSelector(
  //   (state) => state.fetchDeliveryOrders?.deliveryOrders
  // );
  const { deliveryOrdersData, deliveryOrdersData_meta } = useSelector(
    state => state?.data
  );
  console.log(deliveryOrdersData, "DeliveryOrdersData");

  const headCells = [
    {
      key: "created_date",
      label: "DO Date",
      type: "date",
    },
    {
      key: "delivery_order_details.delivery_order_number",
      label: "DO Number",
      type: "text",
    },
    {
      key: "delivery_order_details.reference_id",
      label: "Reference Number",
      type: "text",
    },
    {
      key: "tracking_number",
      label: "Tracking Number",
      type: "text",
    },
    {
      key: "customer_name",
      label: "Customer Name",
      type: "text",
    },
    {
      key: "channel_name",
      label: "Channel Name",
      type: "text",
    },
    {
      key: "payment_type.display_name",
      label: "Payment Type",
      type: "text",
    },
    {
      key: "status.display_name",
      label: "Status",
      type: "text",
    },
    {
      key: "channel_name",
      label: "Shipping Type",
      type: "text",
    },
    {
      key: "shipping_carrier.display_name",
      label: "Carrier",
      type: "text",
    },
    {
      key: "shipping_details.estimated_cost.cost",
      label: "Amount",
      type: "text",
    },
    {
      key: "delivery_order_details.sales_order.payment_terms.display_name",
      label: "Payment Terms",
      type: "text",
    },
    {
      key: "shipping_details.estimated_cost.shipping_partners",
      label: "Shipping Label",
      type: "text",
    },
    {
      key: "shipping_details.estimated_cost.order_delivery_time",
      label: "Exp. Shipping",
      type: "text",
    },
    {
      key: "action",
      label: "Action",
      type: "action",
    },
  ];

  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: product_id => handleView(product_id),
    },
    // {
    //   label: "Edit",
    //   // func: (product_id) => handleViewProduct(product_id),
    // },
    // {
    //   label: "Delete",
    // },
  ]);

  //Navigates to View page
  const handleView = id => {
    history.push(`/deliveryOrders/viewDeliveryOrders/${id}`);
  };

  return (
    <>
      <br />
      <>
        {deliveryOrdersData && (
          <Suspense fallback={<div>Loading... </div>}>
            <RemoteWrapper>
              <RemoteDynamicTable
                table_data={deliveryOrdersData}
                headCells={headCells}
                customOptions={customOptions}
                setCustomOptions={setCustomOptions}
                info={deliveryOrdersData_meta?.info}
                setParams={setParams}
                setId={setId}
                enablepagination={false}
                checkDisable={false}
              />
            </RemoteWrapper>
          </Suspense>
        )}
      </>

      {/*    
      <Paper
        sx={{
          borderRadius: "8px",
        
        }}
      >
     
        <CardContent>
          <Table1
            tableFor="grn1"
            heading={GRN_DUMMY_DATA_RETURNS_HEADING}
            detail={DeliveryOrdersData}
          />
        </CardContent>
      </Paper> */}
    </>
  );
};

export default DeliveryOrdersTab;

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
