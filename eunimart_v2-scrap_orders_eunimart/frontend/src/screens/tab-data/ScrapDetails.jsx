import React, { useState, useEffect, Suspense } from "react";
import RemoteViewBox from "Remote/ViewBox";
import RemoteViewBox_Table from "Remote/ViewBox_Table";

function ScrapDetails({data, edit }) { 
    
    const datePipe = (dateString) => {
      let date = new Date(dateString);
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    };
console.log('%$%^$^',data)

    const Scrap_Order_Details = [
        {
            label: "Scrap Order Number",
            text: data?.scrap_order_no,
            type: "input"
        },
        {
            label: "Scrapping Reason",
            text: data?.scrap_reason?.display_name,
            type: "input"
        },  
        {
            label: "Schedule Scrap Date",
            text: datePipe(data?.schedule_scrap_date),
            type: "input"
        },  
        
    ]
    var payment_due_cdate = datePipe(data && data.payment_due_date);

     const headCells = [
      {
        key: "product_name", 
        label: "Product",
        type: "text"
      },
      {
        key: "sku_id",  
        label: "Product SKU",
        type: "text"
      },  
      {
        key: "description",  
        label: "Description",
        type: "text"
      },  
      {
        key: "lot_no", 
        numeric: true,
        label: "LOT NUmber",
        type: "text"
      },  
      {
        key: "unit_of_measure",  
        label: "Unit Of Measure",
        type: "text"
      },  
      {
        key: "Scraped_item_quantity",  
        label: "Scraped Item Quantity",
        type: "text"
      },  
      {
        key: "price", 
        numeric: true,
        label: "Price",
        type: "text"
      },  
 
    ];        
         
     const shipping_details =[
      {
        label: "Shipping Preferance",
        text: data?.shipping_details?.shipping_preferance,
        type: "input"
      },    
    ]
    
      const Package_Details =[
        {
          label: "Package Length",
          text: data?.shipping_details?.package_details?.package_length,
          type: "input"
        },
        {
          label: "Package Breadth",
          text: data?.shipping_details?.package_details?.package_width,
          type: "input"
        },  
        {
          label: "Package Height",
          text: data?.shipping_details?.package_details?.package_height,
          type: "input"
        },
        {
          label: "Volumetric Dimensions",
          text: data?.shipping_details?.package_details?.vol_weight,
          type: "input"
        },  
        {
          label: "Package Weight",
          text: data?.shipping_details?.package_details?.package_weight,
          type: "input"
        },   
      ]

     const headCells1 = [
      {
        key: "shipping_partners", 
        label: "Shipping Partners",
        type: "text"
      },
      {
        key: "charges",  
        label: "charges",
        type: "text"
      },  
      {
        key: "order_delivery_time",  
        label: "Order Delivery time",
        type: "text"
      },  
 
    ];   
    const LocationDetails =[
      {
        label: "Dispatch Location", 
        type: "card",
        value: [
          {
            label: "Location Name",
            type: "label",   
            value: data && data.scrap_location_details && data.scrap_location_details.location_name,           
          }, 
          {
            label: "Pickup Address",
            type: "label",   
            value: 
              data && data.scrap_location_details && data.scrap_location_details.address_line + " " + data.scrap_location_details.address_line2 + " " + data.scrap_location_details.address_line3,          
          }, 
          {
            label: "Location Incharge",
            type: "label",   
            value: data && data.scrap_location_details && data.scrap_location_details.location_incharge,  
          }
        ],
      }, 
      {
        label: "Scrap Location", 
        type: "card",
        value: [
          {
            label: "Location Name",
            type: "label",   
            value: data && data.scrap_location_details && data.scrap_location_details.location_name,           
          }, 
          {
            label: "Pickup Address",
            type: "label",   
            value: 
              data && data.scrap_location_details && data.scrap_location_details.address_line + " " + data.scrap_location_details.address_line2 + " " + data.scrap_location_details.address_line3,          
          }, 
          {
            label: "Location Incharge",
            type: "label",   
            value: data && data.scrap_location_details && data.scrap_location_details.location_incharge,  
          }
        ],
      }, 
    ]

     const Eunimart_Wallet =[
      {
        label: "With Eunimart Shipping, your shipping cost will automatically be deducted from your wallet once you process the order.",
        text: "  ",
        type: "input"
      },
      {
        label: "Current Balance",
        text: "--",
        type: "input"
      },     
    ]

     const Schedule_pickup_date_time =[
      {
        label: "Set pickup date",
        text: datePipe(data?.pickup_date_time?.pickup_date),
        type: "input"
      },
      {
        label: "Set pickup time",
        text: `${data?.pickup_date_time?.pickup_from_time} - ${data?.pickup_date_time?.pickup_to_time}`,
        type: "input"
      },     
    ]




  return (     
    <>
    <RemoteViewBox view_data={Scrap_Order_Details} header={"Scrap Order Details"}/>
     
    {data && data.order_lines &&
      <RemoteViewBox_Table headCells={headCells} table_data={data.order_lines.map(item=>{
          return {
             product_name: (item.product_Details.product_name ? item.product_Details.product_name : "--"),
             sku_id: (item.product_Details.sku_id ? item.product_Details.sku_id : "--"),
             description: (item.product_Details.description ? item.product_Details.product_name : "--"),
             lot_no: (item.lot_number ? item.lot_number : "--"),
             unit_of_measure: (item.uom && item.uom.name ? item.uom.name : "--"),
             Scraped_item_quantity: (item.scrap_item_quantity ? item.scrap_item_quantity : "--"),
             price: (item.price ? item.price : "--"),
             

          }
        })} header={"Product Details"}/>
    }


<RemoteViewBox view_data={LocationDetails} header={"Location Details"}/> 

    <RemoteViewBox view_data={shipping_details} header={"Shipping Details"}/>

    <RemoteViewBox view_data={Package_Details} header={"Package Details"}/>

    {data && data.shipping_details && data.shipping_details.estimated_cost &&
    (
      <RemoteViewBox_Table headCells={headCells1} table_data={data.shipping_details.estimated_cost.map(item=>{
        return {
          shipping_partners: (item.shipping_partners ? item.shipping_partners : "--"),
          charges: (item.cost ? item.cost : "--"),
          order_delivery_time: (item.order_delivery_time ? item.order_delivery_time : "--"),
          
        }
      })} header={"Estimated Cost"}/>
      )
    }
    <RemoteViewBox view_data={Eunimart_Wallet} header={"Eunimart Wallet"}/>
    <RemoteViewBox view_data={Schedule_pickup_date_time} header={"Schedule Pickup Date time"}/>

    </>
  )
}

export default ScrapDetails















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
along with this program. If not, see http://www.gnu.org/licenses/.
*/