import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { lazy, Suspense } from "react";
import ErrorBoundary from "../../../ErrorBoundary";
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

const AsnProductDetails = ({ asnProducts }) => {
  console.log(asnProducts, "asnProducts");
  const dispatch = useDispatch();

  const products = asnProducts
    ? asnProducts[0]
      ? asnProducts[0].product
      : []
    : [];
  console.log(products, "products");

  const headCells = [
    {
      key: "sku_code",
      type: "text",
      label: "Product SKU",
    },
    {
      key: "product_name",

      type: "text",

      label: "Product",
    },

    {
      key: "product_type",

      type: "text",

      label: "Package Type",
    },

    {
      key: "uom",

      type: "text",
      label: "Unit of Measure",
    },
    {
      key: "Package_length",
      type: "text",
      label: "Package Dimension",
    },
    {
      key: "package_weight",

      type: "text",
      label: "Package weight",
    },
    {
      key: "no_of_boxes",
      type: "text",
      label: "No. of Boxes",
    },
  ];

  return (
    <div>
      {asnProducts && (
        <RemoteViewBox_Table
          headCells={headCells}
          table_data={asnProducts.map(item => {
            return {
              sku_code:
                item && item.product_variant && item.product_variant.sku_id
                  ? item.product_variant.sku_id
                  : "--",
              product_name:
                item &&
                item.product_variant &&
                item.product_variant.product_name
                  ? item.product_variant.product_name
                  : "--",
              product_type:
                item && item.package_type && item.package_type.display_name
                  ? item.package_type.display_name
                  : "--",
              // uom:(item && item.uom&&item.uom.uom_class_code && item.uom.uom_class_code.uom_class_name?item.uom.uom_class_code.uom_class_name:"--"),
              uom: item && item.uom && item.uom.name ? item.uom.name : "--",
              Package_length:
                item && item.package_length ? item.package_length : "--",
              package_weight:
                item && item.package_weight ? item.package_weight : "--",
              no_of_boxes: item && item.no_of_boxes ? item.no_of_boxes : "--",
            };
          })}
          header={"Order Line Item"}
        />
      )}
    </div>
  );
};

export default AsnProductDetails;

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
