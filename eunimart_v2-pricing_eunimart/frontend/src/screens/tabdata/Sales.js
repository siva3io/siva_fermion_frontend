import { Box } from "@mui/system";
import React, { useState, useEffect, Suspense } from "react";
import RemoteViewBox from "Remote/ViewBox";
import RemoteViewBox_Table from "Remote/ViewBox_Table";
import {loadProductVariantData} from "../../redux/Actions/action"
import { useDispatch, useSelector } from "react-redux";

function Sales({ data, edit }) {

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      loadProductVariantData({
        limit: 10,
        offset: 1,
        filters: null,
        sort: null,
      })
    )
  }, []);
  const productVariantData = useSelector((state)=>state.data.productVariantData)
  const datePipe = (dateString) => {
    let date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };
  const price_list_details = [
    {
      label: "Price List Name",
      text: data?.price_list_name,
      type: "input",
    },
    {
      label: "Select Price List Type",
      text: "Sales Price List",
      type: "input",
    },
    {
      label: "Local currency",
      text: `${data?.currency?.currency_symbol} ${data?.currency?.currency_code}`,
      type: "input",
    },
    // {
    //   label: "Foreign exchange price",
    //   type: "input",
    // }
  ];

  const pricing_details = [
    {
      label: "Item rate rule",
      type: "input",
      text: "Markup/Mark down by %age",
    },
    {
      label: "Customer name",
      type: "input",
      text: data?.sales_price_list?.customer_name,
    },
    {
      label: "Select type",
      type: "input",
      text: data?.sales_price_list?.select_type === true ? "Increase" : "Decrease",
    },
    {
      label: "Enter percentage Mark",
      type: "input",
      text: data?.sales_price_list?.percentage,
    },
    {
      label: "Start Date",
      type: "input",
      text: data?.start_date?.split("T")[0],
    },
    {
      label: "End Date",
      type: "input",
      text: data?.end_date?.split("T")[0],
    },
  ];


  const pricing_details_1 = [
    {
      label: "Item rate rule",
      type: "input",
      text: "Enter Manually in all items",
    },
    {
      label: " ",
      type: "input",
      text: " ",
    },
    {
      label: "Start Date",
      type: "input",
      text: data?.start_date,
    },
    {
      label: "End Date",
      type: "input",
      text: data?.end_date,
    },
  ];

  const headCells = [
    {
      label: "Product SKU",
      key: "sku_id",
      numeric: true,
      type: "text",
    },
    {
      label: "Product Name",
      key: "product_name",
      numeric: true,
      type: "text",
    },
    {
      label: "Variant Name*",
      key: "varient_name",
      numeric: true,
      type: "text",
    },
    {
      label: "Category tree",
      key: "category",
      numeric: true,
      type: "text",
    },
    {
      label: "Category Commision",
      key: "commision",
      numeric: true,
      type: "text",
    },
    {
      label: "UoM(Unit of measure)",
      key: "uom",
      numeric: true,
      type: "text",
    },
    {
      label: "Quantity Value Type.*",
      key: "quantity_value_type",
      numeric: true,
      type: "text",
    },
    {
      label: "Quantity Value1",
      key: "quantity_value1",
      numeric: true,
      type: "text",
    },
    {
      label: "Quantity Value2",
      key: "quantity_value2",
      numeric: true,
      type: "text",
    },
    {
      label: "MRP",
      key: "mrp",
      numeric: true,
      type: "text",
    },
    {
      label: "Sale Rate*",
      key: "sale_rate",
      numeric: true,
      type: "text",
    },
    {
      label: "Duties/taxes*",
      key: "tax",
      numeric: true,
      type: "text",
    },
    {
      label: "Price",
      key: "price",
      numeric: true,
      type: "text",
    },
  ];

  const other_details = [
    {
      label: "Shipping Cost",
      type: "input",
      text: data?.sales_price_list?.shipping_cost,
    },
    {
      label: "Description",
      type: "input",
      text: data?.description,
    }
  ];

  console.log(other_details, "other_details")

  return (
    <>
      <RemoteViewBox
        view_data={price_list_details}
        header={"Price List Details"}
      />
      {
        data?.sales_price_list?.enter_manually !== true && (
          <RemoteViewBox
            view_data={pricing_details}
            header={"Price Details"}
          />
        )

      }

      {
        data?.sales_price_list?.enter_manually === true && (
          <RemoteViewBox
            view_data={pricing_details_1}
            header={"Price Details"}
          />
        )

      }

      {
        data?.sales_price_list && (
          <Box>

            {data && data?.sales_price_list && data?.sales_price_list?.sales_line_items && (
              <RemoteViewBox_Table
                headCells={headCells}
                table_data={data?.sales_price_list?.sales_line_items.map((item) => {
                  var x = productVariantData[productVariantData.findIndex( row => row.id == item.product_id )]
                  return {
                    sku_id: x?.sku_id ? x?.sku_id : "--",
                      product_name: x?.product_name,
                    varient_name: item?.product_details?.product_name ? item?.product_details?.product_name : "--",
                    category: item?.product_details?.category?.name,
                    commision: item?.category_commission,
                    uom: item?.uom_details?.name ? item?.uom_details?.name : "--",
                    quantity_value_type: item?.quantity_value_type?.display_name,
                    quantity_value1: item?.quantity_value?.qty1,
                    quantity_value2: item?.quantity_value?.qty2,
                    mrp: item?.mrp,
                    sale_rate: item?.sale_rate,
                    tax: item?.duties,
                    price: item?.price
                  };
                })}
                header={"Product Details"}
              />
            )}
          </Box>
        )

      }


      <RemoteViewBox
        view_data={other_details}
        header={"Other Details"}
      />


      {/* <RemoteViewBox view_data={Payment_Terms_Data} header={"Payment Terms"} /> */}

      {/* <RemoteViewBox
        view_data={additionalInfo}
        header={"Additional Information"}
      /> */}
    </>
  );
}

export default Sales;

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