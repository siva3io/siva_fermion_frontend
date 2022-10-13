import React, { useState, useEffect } from "react";
import RemoteViewBox from "Remote/ViewBox";
import RemoteViewBox_Table from "Remote/ViewBox_Table";

function OrderDetails({data, edit }) { 

    const datePipe = (dateString) => {
      let date = new Date(dateString);
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    };
 

    //#region Purchase_Invoice Details
    const Purchase_Invoice_Data = [
        {
            label: "Invoice ID",
            text: data && data.purchase_invoice_number,
            type: "input"
        },
        {
            label: "Invoice Date",
            text: data && datePipe(data.purchase_invoice_date),
            type: "input"
        },   
        {
          label: "Reference ID",
          text: data && data.reference_number,
          type: "input"
        },       
        {
          label: "Invoice Currency",
          text: data && data.currency && data.currency.name,
          type: "input"
        },
        {
          label: "Vendor Name",
          text: data && data.vendor_details && data.vendor_details.vendor_contact,
          type: "input"
        },
        {
          label: "Expected Delivery Date",
          text: data && datePipe(data.expected_delivery_date),
          type: "input"
        },
    ]
    //#endregion Purchase_Invoice Details


    //#endregion Customer Shipping Address
    const Customer_Shipping_Address =[
      {
        label: "Receiver Name",
        text: data && data.delivery_address && data.delivery_address.customer_shipping_address && data.delivery_address.customer_shipping_address.receiver_name,
        type: "input"
      },
      {
        label: "Mobile Number",
        text: data && data.delivery_address && data.delivery_address.customer_shipping_address && data.delivery_address.customer_shipping_address.mobile_number,
        type: "input"
      },
      {
        label: "Email",
        text: data && data.delivery_address && data.delivery_address.customer_shipping_address && data.delivery_address.customer_shipping_address.email,
        type: "input"
      },
      {
        label: "Address line 1",
        text: data && data.delivery_address && data.delivery_address.customer_shipping_address && data.delivery_address.customer_shipping_address.address_line_1,
        type: "input"
      },
      {
        label: "Address line 2",
        text: data && data.delivery_address && data.delivery_address.customer_shipping_address && data.delivery_address.customer_shipping_address.address_line_2,
        type: "input"
      },
      {
        label: "Address line 3",
        text: data && data.delivery_address && data.delivery_address.customer_shipping_address && data.delivery_address.customer_shipping_address.address_line_3,
        type: "input"
      },
      {
        label: "Country",
        text: data && data.delivery_address && data.delivery_address.customer_shipping_address && data.delivery_address.customer_shipping_address.country,
        type: "input"
      },
      {
        label: "State",
        text: data && data.delivery_address && data.delivery_address.customer_shipping_address && data.delivery_address.customer_shipping_address.state,
        type: "input"
      },
      {
        label: "City",
        text: data && data.delivery_address && data.delivery_address.customer_shipping_address && data.delivery_address.customer_shipping_address.city,
        type: "input"
      },
      {
        label: "Pin Code",
        text: data && data.delivery_address && data.delivery_address.customer_shipping_address && data.delivery_address.customer_shipping_address.pincode,
        type: "input"
      },
    ]
    //#endregion Customer Shipping Address

    //#endregion Customer Billing Address
     const Customer_Billing_Address =[
      {
        label: "Receiver Name",
        text: data && data.delivery_address && data.delivery_address.customer_billing_address && data.delivery_address.customer_billing_address.receiver_name,
        type: "input"
      },
      {
        label: "Mobile Number",
        text: data && data.delivery_address && data.delivery_address.customer_billing_address && data.delivery_address.customer_billing_address.mobile_number,
        type: "input"
      },
      {
        label: "Email",
        text: data && data.delivery_address && data.delivery_address.customer_billing_address && data.delivery_address.customer_billing_address.email,
        type: "input"
      },
      {
        label: "Address line 1",
        text: data && data.delivery_address && data.delivery_address.customer_billing_address && data.delivery_address.customer_billing_address.address_line_1,
        type: "input"
      },
      {
        label: "Address line 2",
        text: data && data.delivery_address && data.delivery_address.customer_billing_address && data.delivery_address.customer_billing_address.address_line_2,
        type: "input"
      },
      {
        label: "Address line 3",
        text: data && data.delivery_address && data.delivery_address.customer_billing_address && data.delivery_address.customer_billing_address.address_line_3,
        type: "input"
      },
      {
        label: "Country",
        text: data && data.delivery_address && data.delivery_address.customer_billing_address && data.delivery_address.customer_billing_address.country,
        type: "input"
      },
      {
        label: "State",
        text: data && data.delivery_address && data.delivery_address.customer_billing_address && data.delivery_address.customer_billing_address.state,
        type: "input"
      },
      {
        label: "City",
        text: data && data.delivery_address && data.delivery_address.customer_billing_address && data.delivery_address.customer_billing_address.city,
        type: "input"
      },
      {
        label: "Pin Code",
        text: data && data.delivery_address && data.delivery_address.customer_billing_address && data.delivery_address.customer_billing_address.pincode,
        type: "input"
      },
    ]
    //#endregion Customer Billing Address 


     //#endregion Delivery Details
     const Delivery_Address =[
      {
        label: "Delivery Address", 
        type: "card",
        value: [
          {
            label: "Location Name",
            type: "label",   
            value: data && data.vendor_details && data.vendor_details.vendor_shipping_address && data.vendor_details.vendor_shipping_address.location_name,           
          }, 
          {
            label: "Registered Address",
            type: "label",   
            value: ((data && data.vendor_details && data.vendor_details.vendor_shipping_address && data.vendor_details.vendor_shipping_address.address_line_1) + " " + 
                   (data && data.vendor_details && data.vendor_details.vendor_shipping_address && data.vendor_details.vendor_shipping_address.address_line_2)  + " " +
                   (data && data.vendor_details && data.vendor_details.vendor_shipping_address && data.vendor_details.vendor_shipping_address.address_line_3)),          
          }, 
          {
            label: "Location Incharge",
            type: "label",   
            value:data && data.vendor_details && data.vendor_details.vendor_shipping_address && data.vendor_details.vendor_shipping_address.contact_person_name
          }, 
        ],
      }, 
      {
        label: "Billing Address", 
        type: "card",
        value: [
          {
            label: "Location Name",
            type: "label",   
            value: data && data.vendor_details && data.vendor_details.vendor_billing_address && data.vendor_details.vendor_billing_address.location_name,           
          }, 
          {
            label: "Registered Address",
            type: "label",   
            value: ((data && data.vendor_details && data.vendor_details.vendor_billing_address && data.vendor_details.vendor_billing_address.address_line_1) + " " + 
                   (data && data.vendor_details && data.vendor_details.vendor_billing_address && data.vendor_details.vendor_billing_address.address_line_2)  + " " +
                   (data && data.vendor_details && data.vendor_details.vendor_billing_address && data.vendor_details.vendor_billing_address.address_line_3)),          
          }, 
          {
            label: "Location Incharge",
            type: "label",   
            value:data && data.vendor_details && data.vendor_details.vendor_billing_address && data.vendor_details.vendor_billing_address.contact_person_name
          }, 
        ],
      }, 
    ]
    //#endregion Delivery Details
 
    
    //#region Product Details 
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
    //#endregion Product Details

 //#region Payment Terms 
      const Payment_Terms =[
      {
        label: "Payment Terms",
        text: data && data.payment_terms && data.payment_terms.display_name,
        type: "input"
      },
      {
        label: "Payment Due Date",
        text: data && datePipe(data && data.payment_due_date),
        type: "input"
      },     
    ]
   //#endregion Payment Terms
  
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
        text: data && data.payment_details && data.payment_details.sub_total,
        type: "input"
      },
      {
        label: "Tax",
        text: data && data.payment_details && data.payment_details.tax,
        type: "input"
      },  
      {
        label: "Shipping Charge",
        text: data && data.payment_details && data.payment_details.shipping_charges,
        type: "input"
      },
      {
        label: "Customer Credits",
        text: data && data.payment_details && data.payment_details.available_vendor_credits,
        type: "input"
      },  
      {
        label: "Adjustments",
        text: data && data.payment_details && data.payment_details.adjustment_amount,
        type: "input"
      },  
      {
        label: "Total Amount",
        text: data && data.payment_details && data.payment_details.total_amount,
        type: "input"
      },     
    ]
    //#endregion Amount Details
    
  return (         
    <>
    <RemoteViewBox view_data={Purchase_Invoice_Data} header={"Purchase Invoice Details"}/>

    <RemoteViewBox view_data={Customer_Shipping_Address} header={"Customer Shipping Address"}/>

    <RemoteViewBox view_data={Customer_Billing_Address} header={"Customer Billing Address"}/>

    <RemoteViewBox view_data={Delivery_Address} header={"Vendor Delivery Details"}/> 

    <RemoteViewBox view_data={Payment_Terms} header={"Payment Terms"}/>
     
    {data && data.purchase_invoice_lines && data.purchase_invoice_lines &&
      <RemoteViewBox_Table headCells={headCells} table_data={data.purchase_invoice_lines.map(item=>{        
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
        })} header={"Product Details"}/>
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
along with this program. If not, see http://www.gnu.org/licenses/.
*/