import { Box } from "@mui/system";
import React, { useState, useEffect, Suspense } from "react";
import RemoteViewBox from "Remote/ViewBox";
import RemoteViewBox_Table from "Remote/ViewBox_Table";
  import {loadProductVariantData,getVendors,} from "../../redux/Actions/action"
import { useDispatch, useSelector } from "react-redux";


function Purchase({ data, edit }) {


  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVendors());
    dispatch(
      loadProductVariantData({
        limit: 10,
        offset: 1,
        filters: null,
        sort: null,
      })
    )
  }, []);

  const {productVariantData,vendorsData} = useSelector((state)=>state.data)

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
      text: "Purchase Price List",
      type: "input",
    },
    {
      label: "Local currency",
      text: `${data?.currency?.currency_symbol} ${data?.currency?.currency_code}`,
      type: "input",
    }
  ];


  const vendor_details = [
    {
      label: "Vendor Name",
      type: "input",
      text: vendorsData[vendorsData?.findIndex(o=>o.id==data?.purchase_price_list?.vendor_name_id)]?.name,
    },
    {
      label: " ",
      type: "input",
      text: " ",
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
      label: "Variant Name",
      key: "product_name",
      numeric: true,
      type: "text",
    },
    {
      label: "Minimum Order Quantity",
      key: "min_order_qty",
      numeric: true,
      type: "text",
    },
    {
      label: "Quantity Value Type",
      key: "quantity_value_type",
      numeric: true,
      type: "text",
    },
    {
      label: "Quantity1",
      key: "quantity_value1",
      numeric: true,
      type: "text",
    },
    {
      label: "Quantity2",
      key: "quantity_value2",
      numeric: true,
      type: "text",
    },
    {
      label: "Price",
      key: "price",
      numeric: true,
      type: "text",
    },
    {
      label: "Sales Period",
      key: "sales_period",
      numeric: true,
      type: "text",
    },
    {
      label: "Expected Delivery Lead Time",
      key: "expected_lead_time",
      numeric: true,
      type: "text",
    },

    {
      label: "Credit Period",
      key: "credit_period",
      numeric: true,
      type: "text",
    },
    {
      label: "Lead Time",
      key: "lead_time",
      numeric: true,
      type: "text",
    },
    {
      label: "Price/Qty",
      key: "price_per_quantity",
      numeric: true,
      type: "text",
    },
    {
      label: "Vendor Rate",
      key: "vendor_rate",
      numeric: true,
      type: "text",
    },
  ];

  const other_details = [
    {
      label: "Shipping Cost",
      type: "input",
      text: data?.purchase_price_list?.other_details?.shipping_cost,
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
        data?.purchase_price_list && (
          <Box>
            <RemoteViewBox
              view_data={vendor_details}
              header={"Vendor Details"}
            />
            {
              data && data?.purchase_price_list && data?.purchase_price_list?.purchase_line_items &&
              (
                <RemoteViewBox_Table
                  headCells={headCells}
                  table_data={data?.purchase_price_list?.purchase_line_items.map((item) => {
                    var x = productVariantData[productVariantData.findIndex( row => row.id == item.product_id )]
                    return {
                      sku_id: x?.sku_id ? x?.sku_id : "--",
                      product_name: x?.product_name,
                      varient_name: item?.product_details?.product_name ? item?.product_details?.product_name : "--",
                      min_order_qty: item?.minimum_order_quantity ? item?.minimum_order_quantity : "--",
                      quantity_value_type: item?.quantity_value_type?.display_name ? item?.quantity_value_type?.display_name : "--",
                      quantity_value1: item?.quantity_value?.qty1,
                      quantity_value2: item?.quantity_value?.qty2,
                      price: item?.price ? item?.price : "--",
                      sales_period: item?.sales_period ? item?.sales_period : "--",
                      expected_lead_time: item?.expected_delivery_time ? item?.expected_delivery_time : "--",
                      credit_period: item?.credit_period ? item?.credit_period : "--",
                      lead_time: item?.lead_time ? item?.lead_time : "--",
                      price_per_quantity: item?.price_quantity ? item?.price_quantity : "--",
                      vendor_rate: item?.vendor_rate ? item?.vendor_rate : "--",
                    };
                  })}
                  header={"Pricing Details"}
                />
              )
            }
          </Box>
        )

      }
      <RemoteViewBox
        view_data={other_details}
        header={"Other Details"}
      />

    </>
  );
}
export default Purchase
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