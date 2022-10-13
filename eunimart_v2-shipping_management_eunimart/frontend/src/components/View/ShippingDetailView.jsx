import {
    Avatar,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    Modal,
    Typography,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import React, { useState } from "react";
  import { lazy, Suspense } from "react";
  import ErrorBoundary from "../../ErrorBoundary";
  import RemoteViewBox from "Remote/ViewBox";
  import RemoteViewBox_Table from "Remote/ViewBox_Table";
  import moment from "moment";
  const RemoteWrapper = ({ children }) => (
    <div
      style={{
        background: "white",
      }}
    >
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  );
  
  
  function ShippingDetailView({ soIDData }) {   
    const [openModal, setOpenModal] = useState(false);
    const [params, setParams] = useState({ limit: 10, offset: 1 });
    const [selectedId, setId] = useState(0);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const datePipe = (dateString) => {
      let date = new Date(dateString);
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    };
    const [pr_EnterPurchaseDetails, setPr_EnterPurchaseDetails] = useState({
      pr_id: "",
      expected_delivery: "",
      link_purchase_order_: "",
      reference_id: "",
      pr_currency: "",
    });
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 1400,
      height: 798,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };
  
    const Shipping_Details_Data = [ 
      {
        label: "Origin Zipcodes",
        type: "input",
        text: soIDData?.origin_zipcode
      }, 
      {
        label: "Destination Zipcodes",
        type: "input",
        text: soIDData?.destination_zipcode
      }, 
    ]; 

    const Package_Details_Data = [ 
      {
        label: "Package Length",
        type: "input",
        text: soIDData?.package_details?.package_length
      }, 
      {
        label: "Package Breadth",
        type: "input",
        text: soIDData?.package_details?.package_width
      }, 
      {
        label: "Package Height",
        type: "input",
        text: soIDData?.package_details?.package_height
      }, 
      {
        label: "Volumetric Weight",
        type: "input",
        text: soIDData?.package_details?.volumetric_weight
      }, 
      {
        label: "Package Weight",
        type: "input",
        text: soIDData?.package_details?.package_height
      }, 
      {
        label: "Product Value",
        type: "input",
        text: soIDData?.package_details?.no_of_items
      }, 
    ]; 

    const Estimated_Cost_headCells = [
      {
        key: "Shipping_Partners", 
        label: "Shipping Partners",
        type: "text" 
      },
      {
        key: "Charges",  
        label: "Charges",
        type: "text"
      }, 
      {
        key: "Order_Deliver_Time",  
        label: "Order Deliver Time",
        type: "text"
      },  
    ];  

    const Sender_Details_Data = [ 
      {
        label: "Sender Name",
        type: "input",
        text: soIDData?.sender_address?.sender_name
      }, 
      {
        label: "Mobile Number",
        type: "input",
        text: soIDData?.sender_address?.mobile_number
      }, 
      {
        label: "Email",
        type: "input",
        text: soIDData?.sender_address?.email
      }, 
      {
        label: "Address Line 1",
        type: "input",
        text: soIDData?.sender_address?.address_line1
      }, 
      {
        label: "Address Line 2",
        type: "input",
        text: soIDData?.sender_address?.address_line2
      }, 
      {
        label: "Address Line 3",
        type: "input",
        text: soIDData?.sender_address?.address_line3
      }, 
      {
        label: "Country",
        type: "input",
        text: soIDData?.sender_address?.country
      }, 
      {
        label: "State",
        type: "input",
        text: soIDData?.sender_address?.state
      }, 
      {
        label: "City",
        type: "input",
        text: soIDData?.sender_address?.city
      }, 
      {
        label: "Zipcode",
        type: "input",
        text: soIDData?.sender_address?.zipcode
      }, 
    ]; 

    const Receiver_Details_Data = [ 
      {
        label: "Receiver Name",
        type: "input",
        text: soIDData?.receiver_address?.receiver_name
      }, 
      {
        label: "Mobile Number",
        type: "input",
        text: soIDData?.receiver_address?.mobile_number
      }, 
      {
        label: "Email",
        type: "input",
        text: soIDData?.receiver_address?.email
      }, 
      {
        label: "Address Line 1",
        type: "input",
        text: soIDData?.receiver_address?.address_line1
      }, 
      {
        label: "Address Line 2",
        type: "input",
        text: soIDData?.receiver_address?.address_line2
      }, 
      {
        label: "Address Line 3",
        type: "input",
        text: soIDData?.receiver_address?.address_line3
      }, 
      {
        label: "Country",
        type: "input",
        text: soIDData?.receiver_address?.country
      }, 
      {
        label: "State",
        type: "input",
        text: soIDData?.receiver_address?.state
      }, 
      {
        label: "City",
        type: "input",
        text: soIDData?.receiver_address?.city
      }, 
      {
        label: "Zipcode",
        type: "input",
        text: soIDData?.receiver_address?.zipcode
      }, 
    ]; 

    const Billing_Details_Data = [ 
      {
        label: "Billing Name",
        type: "input",
        text: soIDData?.billing_address?.receiver_name
      }, 
      {
        label: "Mobile Number",
        type: "input",
        text: soIDData?.billing_address?.mobile_number
      }, 
      {
        label: "Email",
        type: "input",
        text: soIDData?.billing_address?.email
      }, 
      {
        label: "Address Line 1",
        type: "input",
        text: soIDData?.billing_address?.address_line1
      }, 
      {
        label: "Address Line 2",
        type: "input",
        text: soIDData?.billing_address?.address_line2
      }, 
      {
        label: "Address Line 3",
        type: "input",
        text: soIDData?.billing_address?.address_line3
      }, 
      {
        label: "Country",
        type: "input",
        text: soIDData?.billing_address?.country
      }, 
      {
        label: "State",
        type: "input",
        text: soIDData?.billing_address?.state
      }, 
      {
        label: "City",
        type: "input",
        text: soIDData?.billing_address?.city
      }, 
      {
        label: "Zipcode",
        type: "input",
        text: soIDData?.billing_address?.zipcode
      }, 
    ];  

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

    const Schedule_Pickup_Data = [ 
      {
        label: "Pickup Date",
        type: "input",
        text: datePipe(soIDData?.set_pickup_date)
      }, 
      {
        label: "Pickup From Time",
        type: "input",
        text: moment(soIDData?.set_pickup_from_time).format("HH:MM A")
      }, 
      {
        label: "Pickup From To",
        type: "input",
        text: moment(soIDData?.set_pickup_to_time).format("HH:MM A")
      }, 
    ]; 

    return (
      <>
       <RemoteViewBox view_data={Shipping_Details_Data} header={"Shipping Details"}/>
  
       <RemoteViewBox view_data={Package_Details_Data} header={"Package Details"}/>

       <RemoteViewBox_Table headCells={Estimated_Cost_headCells} table_data={
        [{
          "Shipping_Partners": soIDData?.shipping_partner?.partner_name,
          "Charges": soIDData?.shipping_cost,
          "Order_Deliver_Time": datePipe(soIDData?.shipping_date),
        }]
       } header={"Estimated Cost"}/>
       
       <RemoteViewBox view_data={Sender_Details_Data} header={"Sender Details"}/>
       
       <RemoteViewBox view_data={Receiver_Details_Data} header={"Receiver Details"}/>

       <RemoteViewBox view_data={Billing_Details_Data} header={"Billing Details"}/>

      {soIDData.shipping_order_lines &&
       <RemoteViewBox_Table headCells={headCells} table_data={soIDData.shipping_order_lines.map(item=>{
          return {
            product_name: item?.product_variant?.product_name,
            sku_id: item?.product_variant?.sku_id,
            warehouse_name: "",
            inventory_id: "",
            serial_number: item?.product_variant?.serial_number,
            Description:"--",
            uom_id: item?.product_template?.uom?.name,
            Price: item?.unit_price,
            Quantity: item?.item_quantity,
            Discount: item?.discount,
            Tax: item?.tax_price,
            Amount: item?.amount,
          }
        })} header={"Order Line Item"}/>
      }

      <RemoteViewBox view_data={Schedule_Pickup_Data} header={"Schedule Pickup date and time"}/>

      </>
    );
  }
  
  export default ShippingDetailView;
  

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