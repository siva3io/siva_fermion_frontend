import React from 'react';
import RemoteViewBox from "Remote/ViewBox";
import RemoteViewBox_Table from "Remote/ViewBox_Table";
import LocationCard from "../../components/locationCard"

import { Box } from '@mui/system';
import PaymentBox from '../../components/PaymentBox';

export default function PoDeatails({data}) {

    const datePipe = (dateString) => {
        let date = new Date(dateString);
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    };

    const orderDetails=[
        {
          label:"Purchase Order Number*",
          text:data?.purchase_order_number,
          type:"input"
        },
        {
          label:"Reference Number",
          text:data?.reference_number,
          type:"input"
        },
        {
          label:"Purchase Order Date*",
          text:datePipe(data?.created_date),
          type:"input"
        },
        {
          label:"PO Currency*",
          text:data?.currency?.currency_code,
          type:"input"
        },
        
        {
          label:"Expected Shipping Date",
          text:datePipe(data?.expected_delivery_date),
          type:"input"
        },
        {
          label:"Price List",
          text:data?.priceList?.price_list_name,
          type:"input"
        }
      ];
      const vendor_details =[
        {
            label:"Vendor Name",
            text:data?.vendor_details?.vendor_contact,
            type:"input"
          },
          {
            label:"Vendor Code",
            text:data?.priceList?.price_list_name,
            type:"input"
          },
          {
            label:"Registered Address",
            text:`${data?.vendor_details?.vendor_locations?.vendor_billing_address?.address_line_1} ${data?.vendor_details?.vendor_locations?.vendor_billing_address?.address_line_2}  ${data?.vendor_details?.vendor_locations?.vendor_billing_address?.address_line_3} `,
            type:"input"
          },
          {
            label:"Compnay GST",
            text:data?.vendor_details?.vendor_locations?.vendor_billing_address?.gst_in_number,
            type:"input"
          },
          {
            label:"Company Mobile",
            text:data?.vendor_details?.vendor_locations?.vendor_billing_address?.contact_person_number,
            type:"input"
          },
        //   {
        //     label:"Company Email",
        //     text:data?.purchase_order_lines.map((o)=>{return (o?.UpdatedBy?.Company?.email)}),
        //     type:"input"
        //   }
      ]


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
  return (
    <>
    <RemoteViewBox view_data={orderDetails} header={"Order Details"}/>
    <RemoteViewBox view_data={vendor_details} header={"Vendor Details"}/>
    <Box sx={{background: "#ffffff",borderRadius: "8px",padding:"8px"}}>
      <h2>Shipping Address</h2>
        <Box sx={{display:"flex",justifyContent:"space-around"}}>

        <LocationCard
            head={"Billing Address Details"}
            pickUp_address={`${data?.billing_address?.address_line_1} ${data?.delivery_address?.address_line_2} ${data?.delivery_address?.address_line_3} `}
            location_name={data?.billing_address?.location_name}
            contact={data?.billing_address?.contact_person_name}
          />
          <LocationCard
            head={"Shipping Address Details"}
            pickUp_address={`${data?.delivery_address?.address_line_1} ${data?.delivery_address?.address_line_2} ${data?.delivery_address?.address_line_3} `}
            location_name={data?.delivery_address?.location_name}
            contact={data?.delivery_address?.contact_person_name}
          />
        </Box>
          
    </Box>

    {data && data.purchase_order_lines &&
      <RemoteViewBox_Table headCells={headCells} table_data={data.purchase_order_lines.map(item=>{
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


    <Box sx={{background: "#ffffff",borderRadius: "8px",padding:"8px"}}>
    <h2>Payment Details</h2>
    <Box sx={{display:"flex",justifyContent:"space-evenly"}}>
    <Box sx={{background: "#eeeeee",borderRadius: "8px",padding:"8px",width:"40vw",dispaly:"flex",justifyContent:"space-between",height:"4rem"}}>
      <h3 style={{display:"inline-block"}}>Available Vendor Credits</h3>
      <h4 style={{display:"inline-block",marginLeft:"10vw"}}>{ parseFloat(data?.po_payment_details?.available_vendor_credits)} INR</h4>
    </Box>
    <PaymentBox  vendorCredits={data?.po_payment_details?.available_vendor_credits} shippingCharges={data?.po_payment_details?.shipping_charges} subtotal={data?.po_payment_details?.sub_total} tax={data?.po_payment_details?.tax} toatalPay={data?.po_payment_details?.total_amount} />
    </Box>
    </Box>
    </>
  )
}









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