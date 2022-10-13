import { Box } from "@mui/system";
import React, { useState, useEffect, Suspense } from "react";
import RemoteViewBox from "Remote/ViewBox";
import RemoteViewBox_Table from "Remote/ViewBox_Table";
import {loadProductVariantData} from "../../redux/Actions/action"
import { useDispatch, useSelector } from "react-redux";

function Transfer({ data, edit }) {
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
      text: "Transfer Price List",
      type: "input",
    },
    {
      label: "Local currency",
      text: `${data?.currency?.currency_symbol} ${data?.currency?.currency_code}`,
      type: "input",
    }
  ];

  const contract_details = [
    {
      label: "Contract Sender name",
      type: "input",
      text: data?.transfer_price_list?.contract_details?.sender_name,
    },
    {
      label: "Contract Receiver name",
      type: "input",
      text: data?.transfer_price_list?.contract_details?.receiver_name,
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
      label: "Variant Name*",
      key: "varient_name",
      numeric: true,
      type: "text",
    },
    {
      label: "Quantity*",
      key: "qty",
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
      label: "Price/Qty",
      key: "price_per_quantity",
      numeric: true,
      type: "text",
    },
    {
      label: "Product Rate",
      key: "product_rate",
      numeric: true,
      type: "text",
    },
  ];

  const other_details = [
    {
      label: "Location From Address",
      type: "input",
      text: data?.transfer_price_list?.transfer_list_other_details?.location_from_address?.name,
    },
    {
      label: "Location To Address",
      type: "input",
      text: data?.transfer_price_list?.transfer_list_other_details?.location_to_address?.name,
    },
    {
      label: "Sales Period",
      type: "input",
      text: data?.transfer_price_list?.transfer_list_other_details?.sales_period,
    },
    {
      label: "Expected Delivery Time",
      type: "input",
      text: data?.transfer_price_list?.transfer_list_other_details?.expected_delivery_time,
    },
    {
      label: "Credit Period",
      type: "input",
      text: data?.transfer_price_list?.transfer_list_other_details?.credit_period,
    },
    {
      label: "Lead Time",
      type: "input",
      text: data?.transfer_price_list?.transfer_list_other_details?.lead_time,
    },
    {
      label: "Shipping Cost",
      type: "input",
      text: data?.transfer_price_list?.transfer_list_other_details?.shipping_cost  ,
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
        data?.transfer_price_list && (
          <Box>
            <RemoteViewBox
              view_data={contract_details}
              header={"Contract Details"}
            />
            {
              data && data?.transfer_price_list && data?.transfer_price_list?.transfer_line_items &&
              (
                <RemoteViewBox_Table
                  headCells={headCells}
                  table_data={data?.transfer_price_list?.transfer_line_items.map((item) => {
                    var x = productVariantData[productVariantData.findIndex( row => row.id == item.product_id )]
                    return {
                      sku_id: x?.sku_id ? x?.sku_id : "--",
                      product_name: x?.product_name,
                      varient_name: item?.product_details?.product_name ? item?.product_details?.product_name : "--",
                      qty: item?.price_quantity ? item?.price_quantity : "--",
                      price: item?.price ? item?.price : "--",
                      price_per_quantity: item?.price_quantity ? item?.price_quantity : "--",
                      product_rate: item?.product_rate ? item?.product_rate : "--",
                    };
                  })}
                  header={"Pricing Details"}
                />
              )
            }
          </Box>
        )

      }

      {
        data?.transfer_price_list && (

          <RemoteViewBox
            view_data={other_details}
            header={"Other Details"}
          />
          )
          }

    </>
  );
}
export default Transfer

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