
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchGrn } from "../../../../redux/Action/FetchGrn";
import { Suspense } from "react";
import ErrorBoundary from "../../../../ErrorBoundary";
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


const GRNTab = (id) => {
  const dispatch = useDispatch();
  console.log(id,"idqq")
  

  useEffect(() => {
    dispatch(fetchGrn(id?.id))}, []);


  const GRNData = useSelector((state) => state.fetchGrn?.grn);
  console.log(GRNData,"uu1grn");

  const headCells = [
    {
      key: "created_date",
      numeric: true,
      type: "date",
      label: "GRN Date",
    },
    {
      key: "grn_number",
      numeric: true,
      type: "text",
      label: "GRN Number",
    },

    {
      key: "document_type.display_name",
      count: 2,
      numeric: true,
      type: "text",
      label: "Document Type",
    },
    {
      key: "reference_number",
      numeric: true,
      type: "text",
      label: "Reference Number",
    },

    {
      key: "warehouse.name",
      count: 2,
      numeric: true,
      type: "text",
      label: "Warehouse Name",
    },

    {
      key: "status.display_name",
      count: 2,
      numeric: true,
      type: "text",
      label: "Status",
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

export default GRNTab;

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