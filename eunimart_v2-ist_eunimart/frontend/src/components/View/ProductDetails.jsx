import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { lazy, Suspense } from "react";
import ErrorBoundary from "../../ErrorBoundary";
const RemoteDynamicTable = React.lazy(() => import("Remote/DynamicTable"));
import RemoteViewBox_Table from "Remote/ViewBox_Table";

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const ProductDetails = ({ istData }) => {
  console.log(istData, "istDataProducts");
  const dispatch = useDispatch();

  const products = istData ? (istData[0] ? istData[0].product : []) : [];
  console.log(products, "products");

  const headCells = [
    {
      key: "sku_id",
      label: "Product SKU",
      type: "text",
    },
    {
      key: "product_name",
      label: "Product Name",
      type: "text",
    },
    {
      key: "primary_category_id",
      label: "Inventory_ID",
      type: "text",
    },
    {
      key: "serial_number",
      label: "Lot/Serial Number",
      type: "text",
    },
    {
      key: "name",
      label: "Unit of Measure",
      type: "text",
    },
    {
      key: "source_stock",
      label: "Source Stock",
      type: "text",
    },
    {
      key: "is_scrap",
      label: "Is it Scrap?*",
      type: "text",
    },
    {
      key: "destination_stock",
      label: "Destination Stock*",
      type: "text",
    },
    {
      key: "transfer_quantity",
      label: "Transfer Quantity*",
      type: "text",
    },
  ];

  return (
    <>
      {istData && (
        <RemoteViewBox_Table
          headCells={headCells}
          table_data={istData.map(item => {
            return {
              product_name:
                item &&
                item.product_details &&
                item.product_details.product_name
                  ? item.product_details.product_name
                  : "--",
              sku_id:
                item && item.product_details && item.product_details.sku_id
                  ? item.product_details.sku_id
                  : "--",
              primary_category_id:
                item && item.inventory_id ? item.inventory_id : "--",
              serial_number:
                item && item.serial_number ? item.serial_number : "--",
              // uom:(item && item.uom&&item.uom.uom_class_code && item.uom.uom_class_code.uom_class_name?item.uom.uom_class_code.uom_class_name:"--"),
              name: item && item.uom && item.uom.name ? item.uom.name : "--",
              source_stock:
                item && item.source_stock ? item.source_stock : "--",
              is_scrap: item && item.is_scrap ? item.is_scrap : "--",
              destination_stock:
                item && item.destination_stock ? item.destination_stock : "--",
              transfer_quantity:
                item && item.transfer_quantity ? item.transfer_quantity : "--",
            };
          })}
          header={"Order Line Item"}
        />
      )}
    </>
  );
};

export default ProductDetails;

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
