import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadSalesInvoiceData } from "../../redux/FilterTabActions/SalesInvoiceAction";
import { Suspense } from "react";
import ErrorBoundary from "../../ErrorBoundary";
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

const SalesInvoiceTab = ({ id }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [setId] = useState(0);
  const [params, setParams] = useState({ per_page: 10, page_no: 1 });
  console.log("SalesInvoiceId", id);

  useEffect(() => {
    dispatch(loadSalesInvoiceData(params, id));
  }, [params]);

  const { SalesInvoicedata, SalesInvoiceData_meta } = useSelector(
    (state) => state?.filterData
  );
  console.log(SalesInvoicedata, "SalesInvoicedata");

  const headCells = [
    {
      key: "created_date",
      label: "Invoice Date",
      type: "date",
    },
    {
      key: "sales_invoice_number",
      label: "Invoice ID",
      type: "text",
    },
    {
      key: "reference_number",
      label: "Reference ID",
      type: "text",
    },
    {
      key: "customer.name",
      count: 2,
      label: "Customer Name",
      type: "text",
    },
    {
      key: "channel.name",
      count: 2,
      label: "Channel Name",
      type: "text",
    },
    {
      key: "payment_type.display_name",
      count: 2,
      label: "Payment Type",
      type: "text",
    },
    {
      key: "status.display_name",
      count: 2,
      label: "Status",
      type: "text",
    },
    {
      key: "is_invoiced",
      label: "Invoiced",
      type: "text",
    },
    {
      key: "is_payment_received",
      label: "Payment Received",
      type: "text",
    },
    {
      key: "payment_terms.display_name",
      count: 2,
      label: "Payment terms",
      type: "text",
    },
    {
      key: "balance_due_amount",
      label: "Balance due",
      type: "text",
    },
    {
      key: "expected_shipment_date",
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
    history.push(`/salesInvoice/salesInvoiceView/${id}`);
  };

  return (
    <>
      <br />
      <>
        {SalesInvoicedata && (
          <Suspense fallback={<div>Loading... </div>}>
            <RemoteWrapper>
              <RemoteDynamicTable
                table_data={SalesInvoicedata}
                headCells={headCells}
                customOptions={customOptions}
                setCustomOptions={setCustomOptions}
                info={SalesInvoiceData_meta?.info}
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
            detail={SalesInvoicedata}
          />
        </CardContent>
      </Paper> */}
    </>
  );
};

export default SalesInvoiceTab;

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
