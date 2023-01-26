
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Suspense } from "react";
import ErrorBoundary from "../../../../ErrorBoundary";
import { FetchInventory } from "../../../../redux/Action/FetchInventory";
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


const InventoryTab = (id) => {
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(FetchInventory(id?.id))}, []);


  const InventoryData = useSelector((state) => state.FetchInventory?.inventory);
  console.log(InventoryData,"uu1inventory");

  const headCells = [
    {
      key: "adjustment_date",
      numeric: false,
      label: "Adjustment Date",
      type: "text",
    },
    {
      key: "adjustmen t_reason.display_name",
      numeric: false,
      label: "Adjustment Reason",
      type: "text",
      count: 2
    },
    {
      key: "adjustment_type.display_name",
      numeric: false,
      label: "Adjustment Type",
      type: "text",
      count: 2
    },
    {
      key: "reference_number",
      numeric: false,
      label: "Reference",
      type: "text",
    },
    {
      key: "warehouse.name",
      numeric: false,
      label: "Warehouse Name",
      type: "text",
      count: 2
    },
    {
      key: "performedby",
      numeric: false,
      label: "Performed By",
      type: "text",
      count: true,
    },
    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action"
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
          {InventoryData && InventoryData?.data && InventoryData.meta && (
            <Suspense fallback={<div>Loading... </div>}>
              <RemoteWrapper>
                <RemoteDynamicTable
                  table_data={InventoryData?.data}
                  headCells={headCells}
                  customOptions={customOptions}
                  setCustomOptions={setCustomOptions}
                  info={InventoryData?.meta?.info}
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

export default InventoryTab;

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
