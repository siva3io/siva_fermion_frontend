import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadPurchaseOrdersData } from "../redux/Action/istListAction";
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

const PurchaseOrdersTab = ({ id }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [setId] = useState(0);
  const [params, setParams] = useState({ per_page: 10, page_no: 1 });
  console.log("PurchaseOrdersViewData", id);

  useEffect(() => {
    dispatch(loadPurchaseOrdersData(params, id));
  }, [params]);

  // const PurchaseOrdersData = useSelector(
  //   (state) => state.fetchPurchaseOrders?.purchaseOrders
  // );
  const { purchaseOrdersData, purchaseOrdersData_meta } = useSelector(
    (state) => state?.data
  );
  console.log(purchaseOrdersData, "PurchaseOrdersData");

  const headCells = [
    {
      key: "date_and_time",
      label: "PO Date & Time",
      type: "date",
    },
    {
      key: "purchase_order_number",
      label: "PO Number",
      type: "text",
    },
    {
      key: "reference_number",
      label: "Reference Number",
      type: "text",
    },
    {
      key: "vendor_details.vendor_contact",
      count: 2,
      label: "Vendor Name",
      type: "text",
    },
    {
      key: "status.display_name",
      count: 2,
      label: "Status",
      type: "text",
    },
    {
      key: "billed.display_name",
      count: 2,
      label: "Billed",
      type: "text",
    },
    {
      key: "paid.display_name",
      count: 2,
      label: "Paid",
      type: "text",
    },
    {
      key: "amount",
      label: "Amount",
      type: "text",
    },
    {
      key: "payment_terms.display_name",
      count: 2,
      label: "Payment Terms",
      type: "text",
    },
    {
      key: "expected_delivery_date",
      label: "Expected Shipment",
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
    history.push(`/purchaseOrders/viewPurchaseOrders/${id}`);
  };

  return (
    <>
      <br />
      <>
        {purchaseOrdersData && (
          <Suspense fallback={<div>Loading... </div>}>
            <RemoteWrapper>
              <RemoteDynamicTable
                table_data={purchaseOrdersData}
                headCells={headCells}
                customOptions={customOptions}
                setCustomOptions={setCustomOptions}
                info={purchaseOrdersData_meta?.info}
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
            detail={PurchaseOrdersData}
          />
        </CardContent>
      </Paper> */}
    </>
  );
};

export default PurchaseOrdersTab;

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
