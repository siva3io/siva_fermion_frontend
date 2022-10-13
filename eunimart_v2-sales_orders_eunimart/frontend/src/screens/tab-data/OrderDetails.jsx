import React, { useState, useEffect } from "react";
import RemoteViewBox from "Remote/ViewBox";
import RemoteViewBox_Table from "Remote/ViewBox_Table";

function OrderDetails({data, edit }) { 
    //console.log("OrderDetails data 33", data)   

    const datePipe = (dateString) => {
      let date = new Date(dateString);
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    };

    var cdate = datePipe(data && data.created_date);

    const Sales_Order_Data = [
        {
            label: "Sales Order Date",
            text: cdate,
            type: "input"
        },
        {
            label: "Sales Order Currency",
            text: data && data.currency && data.currency.name,
            type: "input"
        },  
        {
            label: "Sales Order Id",
            text: data && data.sales_order_number,
            type: "input"
        },  
        {
          label: "Reference Number",
          text: data && data.reference_number,
          type: "input"
       }, 
        
    ]
    //#endregion Sales Order Details

    //#endregion Customer Shipping Address
    const Customer_Shipping_Address =[
      {
        label: "Receiver Name",
        text: data && data.customer_shipping_address && data.customer_shipping_address.contact_person_name,
        type: "input"
      },
      {
        label: "Mobile Number",
        text: data && data.customer_shipping_address && data.customer_shipping_address.contact_person_number,
        type: "input"
      },
      {
        label: "Gst In Number",
        text: data && data.customer_shipping_address && data.customer_shipping_address.gst_in_number,
        type: "input"
      },
      {
        label: "Address line 1",
        text: data && data.customer_shipping_address && data.customer_shipping_address.address_line_1,
        type: "input"
      },
      {
        label: "Address line 2",
        text: data && data.customer_shipping_address && data.customer_shipping_address.address_line_2,
        type: "input"
      },
      {
        label: "Address line 3",
        text: data && data.customer_shipping_address && data.customer_shipping_address.address_line_3,
        type: "input"
      },
      {
        label: "Land Mark",
        text: data && data.customer_shipping_address && data.customer_shipping_address.land_mark,
        type: "input"
      },
      {
        label: "Location Name",
        text: data && data.customer_shipping_address && data.customer_shipping_address.location_name,
        type: "input"
      },
      {
        label: "Pin Code",
        text: data && data.customer_shipping_address && data.customer_shipping_address.pin_code,
        type: "input"
      },
    ]
    //#endregion Customer Shipping Address

    //#endregion Customer Billing Address
     const Customer_Billing_Address =[
      {
        label: "Receiver Name",
        text: data && data.customer_billing_address && data.customer_billing_address.contact_person_name,
        type: "input"
      },
      {
        label: "Mobile Number",
        text: data && data.customer_billing_address && data.customer_billing_address.contact_person_number,
        type: "input"
      },
      {
        label: "Gst In Number",
        text: data && data.customer_billing_address && data.customer_billing_address.gst_in_number,
        type: "input"
      },
      {
        label: "Address line 1",
        text: data && data.customer_billing_address && data.customer_billing_address.address_line_1,
        type: "input"
      },
      {
        label: "Address line 2",
        text: data && data.customer_billing_address && data.customer_billing_address.address_line_2,
        type: "input"
      },
      {
        label: "Address line 3",
        text: data && data.customer_billing_address && data.customer_billing_address.address_line_3,
        type: "input"
      },
      {
        label: "Land Mark",
        text: data && data.customer_billing_address && data.customer_billing_address.land_mark,
        type: "input"
      },
      {
        label: "Location Name",
        text: data && data.customer_billing_address && data.customer_billing_address.location_name,
        type: "input"
      },
      {
        label: "Pin Code",
        text: data && data.customer_billing_address && data.customer_billing_address.pin_code,
        type: "input"
      },
    ]
    //#endregion Customer Billing Address 
    var payment_due_cdate = datePipe(data && data.payment_due_date);

     const Payment_Terms =[
      {
        label: "Payment Terms",
        text: data && data.payment_terms && data.payment_terms.display_name,
        type: "input"
      },
      {
        label: "Payment Due Date",
        text: data && payment_due_cdate,
        type: "input"
      },     
    ]
    //#endregion Payment Terms
    
    //#region Order Line Item    
     const headCells = [
      {
        key: "product_name", 
        label: "Product Name",
        type: "text"
      },
      {
        key: "sku_id",  
        label: "Product SKU",
        type: "text"
      },  
      {
        key: "warehouse_name",  
        label: "Warehouse",
        type: "text"
      },  
      {
        key: "inventory_id", 
        numeric: true,
        label: "Inventory ID",
        type: "text"
      },  
      {
        key: "serial_number",  
        label: "Serial No.",
        type: "text"
      },  
      {
        key: "Description",  
        label: "Description",
        type: "text"
      },  
      {
        key: "uom_id", 
        numeric: true,
        label: "UOM",
        type: "text"
      },  
      {
        key: "Price", 
        numeric: true,
        label: "Price",
        type: "text"
      },  
      {
        key: "Quantity", 
        numeric: true,
        label: "Quantity",
        type: "text"
      },  
      {
        key: "Discount", 
        numeric: true,
        label: "Discount",
        type: "text"
      }, 
      {
        key: "Tax", 
        numeric: true,
        label: "Tax %",
        type: "text"
      },
      {
        key: "Amount", 
        numeric: true,
        label: "Amount",
        type: "text"
      }  
    ];        
    //#endregion Order Line Item


     //#region Additional Information      
     const additional_information =[
      {
        label: "Notes",
        text: data && data.additional_information && data.additional_information.notes,
        type: "input"
      },
      {
        label: "Terms And Conditions",
        text: data && data.additional_information && data.additional_information.terms_and_conditions,
        type: "input"
      },     
    ]
     //#endregion Additional Information


      //#region Amount Details
      const Amount_Details =[
        {
          label: "Sub Total",
          text: data && data.so_payment_details && data.so_payment_details.sub_total,
          type: "input"
        },
        {
          label: "Tax",
          text: data && data.so_payment_details && data.so_payment_details.tax,
          type: "input"
        },  
        {
          label: "Shipping Charge",
          text: data && data.so_payment_details && data.so_payment_details.shipping_charges,
          type: "input"
        },
        {
          label: "Customer Credits",
          text: data && data.so_payment_details && data.so_payment_details.available_customer_credits,
          type: "input"
        },  
        {
          label: "Adjustments",
          text: data && data.so_payment_details && data.so_payment_details.adjustment_amount,
          type: "input"
        },  
        {
          label: "Total Amount",
          text: data && data.so_payment_details && data.so_payment_details.total_amount,
          type: "input"
        },     
      ]
     //#endregion Amount Details

 
  return (     
    <>
    <RemoteViewBox view_data={Sales_Order_Data} header={"Sales Order Details"}/>

    <RemoteViewBox view_data={Customer_Shipping_Address} header={"Customer Shipping Address"}/>

    <RemoteViewBox view_data={Customer_Billing_Address} header={"Customer Billing Address"}/>

    <RemoteViewBox view_data={Payment_Terms} header={"Payment Terms"}/>
     
    {data && data.sales_order_lines &&
      <RemoteViewBox_Table headCells={headCells} table_data={data.sales_order_lines.map(item=>{
          return {
            product_name: (item && item.product_details && item.product_details.product_name ? item.product_details.product_name : "--"),
            sku_id: (item && item.product_details && item.product_details.sku_id ? item.product_details.sku_id : "--"),
            warehouse_name: (item && item.warehouse && item.warehouse.name ? item.warehouse.name : "--"),
            inventory_id: (item && item.inventory_id ? item.inventory_id : 0),
            serial_number: (item && item.serial_number ? item.serial_number: "--"),
            //Description:(item && item.product_details && item.product_details.description ? JSON.stringify(item.product_details.description) : "--"),
            Description:"--",
            uom_id: (item && item.uom_id ? item.uom_id: 0),
            Price: (item && item.price ? item.price : 0),
            Quantity: (item && item.quantity ? item.quantity : 0),
            Discount: (item && item.discount ? item.discount : 0),
            Tax: (item && item.tax ? item.tax : 0),
            Amount: (item && item.amount ? item.amount : 0),
          }
        })} header={"Order Line Item"}/>
    }

    <RemoteViewBox view_data={additional_information} header={"Additional Information"}/>

    <RemoteViewBox view_data={Amount_Details} header={"Amount Details"}/>
    </>
  )
}

export default OrderDetails


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