
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Suspense } from "react";
import { getCreditNoteList } from "../../redux/Action/SalesReturns/GetCreditNoteAction";
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


const CreditNoteTab = (id) => {
  const dispatch = useDispatch();
  console.log(id,"idqq")
  

  useEffect(() => {
    dispatch(getCreditNoteList(id?.id))}, []);


  const GRNData = useSelector((state) => state.getCreditNoteList?.CreditNote);
  console.log(GRNData,"uu1grn");

  const headCells = [
    {
      key: "created_date",
      numeric: false,
      label: "Credit Note Date",
      type: "date",
    },
    {
      key: "credit_note_id",
      numeric: false,
      label: "Credit Note ID",
      type: "text",
    },
    {
      key: "reference_id",
      numeric: false,
      label: "Reference ID",
      type: "text",
    },
    {
      key: "purchase_invoice.purchase_invoice_number",
      count: 2,
      numeric: false,
      label: "Invoice ID",
      type: "text",
    },
    {
      key: "customer.name",
      count: 2,
      numeric: false,
      label: "Customer Name",
      type: "text",
    },
    {
      key: "status.display_name",
      count: 2,
      numeric: false,
      label: "Status",
      type: "text",
    },
    {
      key: "total_amount",
      label: "Payment Amount",
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
      func: (product_id) => handleView(product_id),
    },
    {
      label: "Edit",
      // func: (product_id) => handleViewProduct(product_id),
    },
    {
      label: "Delete",
      
    },

  ]);



  return (
    <>
    <br />
       <>
          {GRNData && GRNData?.data && GRNData.meta && (
            <Suspense fallback={<div>Loading... </div>}>
              <RemoteWrapper>
                <RemoteDynamicTable
                  table_data={GRNData?.data}
                  headCells={headCells}
                  customOptions={customOptions}
                  setCustomOptions={setCustomOptions}
                  info={GRNData?.meta?.info}
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
            detail={GRNData}
          />
        </CardContent>
      </Paper> */}
    </>
  );
};

export default CreditNoteTab;


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
