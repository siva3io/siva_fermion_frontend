
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchGrn } from "../../../../redux/Action/FetchGrn";
import { Suspense } from "react";
import ErrorBoundary from "../../../../ErrorBoundary";
import { getSalesReturnsList } from "../../../../redux/Action/GetSalesReturnsList";
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


const SalesReturnsTab = () => {
  const dispatch = useDispatch();

  const products = useSelector(
    (state) => state.getSalesReturnsList.salesReturns
  );
  useEffect(() => dispatch(getSalesReturnsList()), []);
  

  useEffect(() => {
    dispatch(fetchGrn())}, []);


 

  const headCells = [
    {
      key: "sales_return_number",
      numeric: true,
      type: "text",
      label: "Sales Return No.",
    },

    {
      key: "reference_number",
      numeric: false,
      type: "text",
      label: "Reference ID",
    },
    {
      key: "tracking_number",
      numeric: true,
      type: "text",
      label: "Tracking ID",
    },

    {
      key: "sr_date",
      numeric: true,
      type: "text",
      label: "Return Date",
    },
    {
      key: "customer_name",
      numeric: true,
      type: "text",
      label: "Customer Name",
    },
    {
      key: "channel_name",
      numeric: true,
      type: "text",
      label: "Channel Name",
    },
    {
      key: "shipping_mode.display_name",
      numeric: true,
      count: 2,
      type: "text",
      label: "Shipping Mode",
    },
    {
      key: "amount",
      numeric: true,
      type: "text",
      label: "Amount",
    },
    {
      key: "reason.display_name",
      numeric: true,
      count: 2,
      type: "text",
      label: "Reason",
    },
    {
      key: "shipping_carrier.partner_name",
      numeric: true,
      count: 2,
      type: "text",
      label: "Shipping Carrier",
    },
    {
      key: "status.display_name",
      numeric: true,
      count: 2,
      type: "text",
      label: "Status",
    },
    {
      key: "credit_issued.display_name",
      numeric: true,
      count: 2,
      type: "text",
      label: "Credit Issued",
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
       {products?.data && products?.data && products?.data.length > 0 && (
        <Suspense fallback={<div>Loading... </div>}>
          <RemoteWrapper>
            <RemoteDynamicTable
              table_data={products?.data}
              headCells={headCells}
              customOptions={customOptions}
              setCustomOptions={setCustomOptions}
              info={products?.meta?.info}
            //   setParams={setParams}
            //   handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
            //   setId={setId}
              enablepagination={false}
              checkDisable={false}
              
            />
          </RemoteWrapper>
        </Suspense>
      )}
        </>


    </>
  );
};

export default SalesReturnsTab;

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
