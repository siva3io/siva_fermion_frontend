import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadSalesOrdersData } from "../redux/Action/istListAction";
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

const SalesOrdersTab = ({ id }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [setId] = useState(0);
  const [params, setParams] = useState({ per_page: 10, page_no: 1 });
  console.log("SalesOrdersViewData", id);

  useEffect(() => {
    dispatch(loadSalesOrdersData(params, id));
  }, [params]);

  // const SalesOrdersData = useSelector(
  //   (state) => state.fetchSalesOrders?.salesOrders
  // );
  const { salesOrdersData, salesOrdersData_meta } = useSelector(
    (state) => state?.data
  );
  console.log(salesOrdersData, "salesOrdersdata");

  const headCells = [
    {
      key: "created_date",
      label: "Sales Order Date",
      type: "date",
    },
    {
      key: "sales_order_number",
      label: "Sales Order#",
      type: "text",
    },
    {
      key: "reference_number",
      label: "Reference Number",
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
      count: true,
    },
    {
      key: "status.display_name",
      label: "Status",
      type: "text",
      count: true,
    },
    {
      key: "invoiced.display_name",
      label: "Invoiced",
      type: "text",
      count: true,
    },
    {
      key: "payment_received.display_name",
      label: "Payment Received",
      type: "text",
      count: true,
    },
    {
      key: "payment_amount",
      label: "Payment Amount",
      type: "text",
      count: false,
    },
    {
      key: "payment_terms.display_name",
      label: "Payment Terms",
      type: "text",
      count: true,
    },
    {
      key: "expected_shipping_date",
      label: "Exp. Shipping Date",
      type: "date",
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
      func: (product_id) => handleView(product_id),
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
  const handleView = (id) => {
    history.push(`/sales/viewSalesOrders/${id}`);
  };

  return (
    <>
      <br />
      <>
        {salesOrdersData && (
          <Suspense fallback={<div>Loading... </div>}>
            <RemoteWrapper>
              <RemoteDynamicTable
                table_data={salesOrdersData}
                headCells={headCells}
                customOptions={customOptions}
                setCustomOptions={setCustomOptions}
                info={salesOrdersData_meta?.info}
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
            detail={SalesOrdersData}
          />
        </CardContent>
      </Paper> */}
    </>
  );
};

export default SalesOrdersTab;

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
