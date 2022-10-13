import React, { useState, useEffect } from "react";
import ErrorBoundary from "../../ErrorBoundary";
import { lazy, Suspense } from "react";
const RemoteViewBox = React.lazy(() => import("Remote/ViewBox"));
const RemoteButton = React.lazy(() => import("Remote/BasicButton"));
import "../App.css";
import "./salesInvoiceClass.css";
import { Box , Button, Typography} from "@mui/material";
import RemoteDynamicTable from "Remote/DynamicTable";
import RemoteViewBox_Table from "Remote/ViewBox_Table";
const RemoteWrapper = ({ children }) => (
    <div>
        <ErrorBoundary>{children}</ErrorBoundary>
    </div>
);

const headCells = [
    {
        key: "sku_code",
        label: "Product SKU ID",
        type: "text",
    },
    {
        key: "product_name",
        label: "Product Name",
        type: "text",
    },
    {
        key: "warehouse_id",
        label: "Warehouse",
        type: "text",
    },
    {
        key: "inventory_id",
        label: "Inventory ID",
        type: "text",
    },
    {
        key: "serial_number",
        label: "Serial NO",
        type: "text",
    },
    {
        key: "description",
        label: "Description",
        type: "text",
    },
    {
        key: "uom",
        label: "UOM",
        type: "text",
    },
    {
        key: "mrp",
        label: "Price",
        type: "text",
    },
    {
        key: "quantity",
        label: "Quantity",
        type: "text",
    },
    {
        key: "discount",
        label: "Discount",
        type: "text",
    },
    {
        key: "tax",
        label: "Tax %",
        type: "text",
    },
    {
        key: "total_amount",
        label: "Amount",
        type: "text",
    },
];

//salesInvoiceData
function SalesInvoiceViewClass({
    salesInvoiceViewData
}) {
    const [variant, setVariant] = useState(salesInvoiceViewData ? salesInvoiceViewData : []);
    const [variantProduct, setVariantProduct] = useState(salesInvoiceViewData ? (salesInvoiceViewData ? salesInvoiceViewData.sales_invoice_lines : []) : []);
    console.log("variantvariant111", salesInvoiceViewData)

    const [pages, setPages] = useState(
        params && Number(params.offset) ? Number(params.offset) : 0
    ); //pagination variables

    const [params, setParams] = useState({ limit: 10, offset: 0 });

    const [selectedId, setId] = useState(0);

    console.log("variantvariantvariant",variant)

    const [salesinvoicedetails, setsalesinvoicedetails] = useState([
        {
            label: "Invoice ID",
            text: variant &&
                variant.id,
            type: "input"
        },
        {
            label: "Reference ID",
            text: variant && variant.reference_number,
            type: "input"
        },
        {
            label: "Invoice Date",
            text: variant &&
                variant.created_date,
            type: "input"
        },
        {
            label: "Expected Shipment Date",
            text: variant && variant.expected_shipment_date,
            type: "input"
        },
        {
            label: "Invoice Currency",
            text: variant && variant.currency && variant.currency.name,
            type: "input"
        },
        {
            label: "Link Sales Orders",
            text: variant && variant.link_sales_orders && variant.link_sales_orders[0] && variant.link_sales_orders[0].sales_order_number,
            type: "input"
        },
    ]);

    const [customerDeliveryDetails, setcustomerDeliveryDetails] = useState([
        {
            label: "Customer Name",
            text: variant && variant.delivery_address && variant.delivery_address[0] && variant.delivery_address[0].customer_name,
            type: "input"
        },
        {
            label: "Mobile Number",
            text: variant && variant.delivery_address && variant.delivery_address[0] && variant.delivery_address[0].mobile_number,
            type: "input"
        },
        {
            label: "Email",
            text: variant && variant.delivery_address && variant.delivery_address[0] && variant.delivery_address[0].email,
            type: "input"
        },
        {
            label: "Address Line 1",
            text: variant && variant.delivery_address && variant.delivery_address[0] && variant.delivery_address[0].Address,
            type: "input"
        },
        {
            label: "Address Line 2",
            text: variant && variant.delivery_address && variant.delivery_address[0] && variant.delivery_address[0].address_line_2,
            type: "input"
        },
        {
            label: "Address Line 3",
            text: variant && variant.delivery_address && variant.delivery_address[0] && variant.delivery_address[0].address_line_3,
            type: "input"
        },
        {
            label: "Zipcode",
            text: variant && variant.delivery_address && variant.delivery_address[0] && variant.delivery_address[0].zipcode,
            type: "input"
        },
        {
            label: "City / District",
            text: variant && variant.delivery_address && variant.delivery_address[0] && variant.delivery_address[0].district,
            type: "input"
        },
         {
            label: "State",
            text: variant && variant.delivery_address && variant.delivery_address[0] && variant.delivery_address[0].state,
            type: "input"
        },
        {
            label: "Country",
            text: variant && variant.delivery_address && variant.delivery_address[0] && variant.delivery_address[0].country,
            type: "input"
        },
    ]);

    const [customerBillingDetails, setcustomerBillingDetails] = useState([
        {
            label: "Customer Name",
            text: variant && variant.billing_address && variant.billing_address[0] && variant.billing_address[0].customer_name,
            type: "input"
        },
        {
            label: "Mobile Number",
            text: variant && variant.billing_address && variant.billing_address[0] && variant.billing_address[0].mobile_number,
            type: "input"
        },
        {
            label: "Email",
            text: variant && variant.billing_address && variant.billing_address[0] && variant.billing_address[0].email,
            type: "input"
        },
        {
            label: "Address Line 1",
            text: variant && variant.billing_address && variant.billing_address[0] && variant.billing_address[0].Address,
            type: "input"
        },
        {
            label: "Address Line 2",
            text: variant && variant.billing_address && variant.billing_address[0] && variant.billing_address[0].address_line_2,
            type: "input"
        },
        {
            label: "Address Line 3",
            text: variant && variant.billing_address && variant.billing_address[0] && variant.billing_address[0].address_line_3,
            type: "input"
        },
        {
            label: "Zipcode",
            text: variant && variant.billing_address && variant.billing_address[0] && variant.billing_address[0].zipcode,
            type: "input"
        },
        {
            label: "City / District",
            text: variant && variant.billing_address && variant.billing_address[0] && variant.billing_address[0].district,
            type: "input"
        },
         {
            label: "State",
            text: variant && variant.billing_address && variant.billing_address[0] && variant.billing_address[0].state,
            type: "input"
        },
        {
            label: "Country",
            text: variant && variant.billing_address && variant.billing_address[0] && variant.billing_address[0].country,
            type: "input"
        },
    ]);

    const [paymentTerms, setpaymentTerms] = useState([
        {
            label: "Payment Terms",
            text: variant && variant.payment_terms && variant.payment_terms.lookup_code,
            type: "input"
        },
        {
            label: "Payment Due Date",
            text: variant && variant.payment_due_date,
            type: "input"
        },
    ]);
    const [additionalInformation, setadditionalInformation] = useState([
        {
            label: "Notes",
            text: variant &&
                variant.internal_notes,
            type: "input"
        },
        {
            label: "Terms and Conditions",
            text: variant && variant.terms_and_conditions,
            type: "input"
        },
        {
            label: "Attachments",
            text: '',
            type: "input"
        },
    ]); 
    const [paymentDetails, setpaymentDetails] = useState([
        {
            label: "Sub Total",
            text: variant &&
                variant.sub_total_amount,
            type: "input"
        },
        {
            label: "Tax",
            text: variant && variant.tax_amount,
            type: "input"
        },
        {
            label: "Shipping Charges",
            text: variantProduct && variantProduct.length > 0 && variantProduct[0].products && variantProduct[0].products.shipping_options && variantProduct[0].products.shipping_options.shipping_cost,
            type: "input"
        },
       
        {
            label: "Customer Credits",
            text: variant && variant.available_customer_credits,
            type: "input"
        },
        {
            label: "Adjustments",
            text: variant && variant.adjustments,
            type: "input"
        },
    ]);
    

    //render functionsa
    return (
        <>

            <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                    <RemoteViewBox
                        view_data={salesinvoicedetails}
                        header={"Sales Invoice Details"}
                    />
                </RemoteWrapper>
            </Suspense>

            <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                    <RemoteViewBox
                        view_data={customerDeliveryDetails}
                        header={"Customer Delivery Address"}
                    />
                </RemoteWrapper>
            </Suspense>
            <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                    <RemoteViewBox
                        view_data={customerBillingDetails}
                        header={"Customer Billing Address"}
                    />
                </RemoteWrapper>
            </Suspense>
            <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                <div className="locationDetailsMain">
                    <div className="staticFormCardTitle">{'Payment Terms'}</div>
                        <div className="product-staticFormCardForm"> 
                            <Box className="labeledTextWrapper">   
                                <p><label>{"Note:"}</label>{"You have set the  common payment term for the entire order"}</p>
                            </Box>
                        {paymentTerms.map((field) => {
                            return  (   
                                <Box className="labeledTextWrapper">   
                                    <Box className="labelWrap_card">
                                        <Typography htmlFor={field.label.toLowerCase().split(" ").join("_")} className="commonlabel_disabled">
                                            {field.label}</Typography>
                                    </Box>
                                    <Typography component="label">{field.text ? field.text : '--'}</Typography>
                                </Box>
                                ) 
                            })}                          
                        </div>
                        <Button variant="contained">Manage Payment</Button>
            </div>
                </RemoteWrapper>
            </Suspense>
            <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                {variantProduct &&
      <RemoteViewBox_Table headCells={headCells} table_data={variantProduct.map(item=>{
          return {

            sku_code: (item && item.product_variant && item.product_variant.sku_id ? item.product_variant.sku_id : "--"),
            product_name: (item && item.product_variant && item.product_variant.product_name ? item.product_variant.product_name : "--"),
            warehouse_id: (item && item.warehouse && item.warehouse.name ? item.warehouse.name : "--"),
            inventory_id: (item && item.inventory && item.inventory.channel_code ? item.inventory.channel_code : "--"),
            description:(item && item.description ? item.description : "--"),
            serial_number: (item && item.inventory && item.inventory.product_details && item.inventory.product_details.serial_number ? item.inventory.product_details.serial_number : '--'),
            uom: (item && item.uom && item.uom.name ? item.uom.name  : '---'),
            mrp: (item && item.price ? item.price : 0),
            quantity: (item && item.quantity ? item.quantity : 0),
            discount: (item && item.discount ? item.discount : 0),
            tax: (item && item.tax ? item.tax : 0),
            total_amount: (item && item.total_amount ? item.total_amount : 0),
          }
        })} header={"Product Details'"}/>
    }
                
                </RemoteWrapper>
            </Suspense>

            <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                <div className="locationDetailsMain">
                    <div className="staticFormCardTitle">{'Additional Information'}</div>
                        <div className="product-staticFormCardInfo"> 
                        {additionalInformation.map((field) => {
                            return  (   
                                 
                                <Box className="labeledTextWrapper">   
                                <Box className="labelWrap_card">
                                    <Typography htmlFor={field.label.toLowerCase().split(" ").join("_")} className="commonlabel_disabled">
                                        {field.label}</Typography>
                                </Box>
                                <Typography component="label">{field.text ? field.text : '--'}</Typography>
                            </Box>
                            
                                ) 
                            })} 
                        </div>
                    </div>
                </RemoteWrapper>
            </Suspense>
            <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                <div className="locationDetailsMain">
                <div className="staticFormCardTitle">{'Payment Details'}</div>
                <div className="product-staticFormCardForm"> 
                        {paymentDetails.map((field) => {
                            return  (   
                                <Box className="labeledTextWrapper">   
                                <Box className="labelWrap_card">
                                    <Typography htmlFor={field.label.toLowerCase().split(" ").join("_")} className="commonlabel_disabled">
                                        {field.label}</Typography>
                                </Box>
                                <Typography component="label">{field.text ? field.text : '--'}</Typography>
                            </Box>
                            
                                ) 
                            })} 
                        </div>
                        <div className = "payment-details-amount">
                        <div className="product-staticFormCardInfo"> 
                        <Box className="labeledTextWrapper amt-shown">   
                                <Box className="labelWrap_card_invice">
                                <h3>{'Total Amount'}</h3>
                                </Box>
                                <h3>{variant.total_amount ? variant.total_amount : '--'}</h3>
                            </Box>
                        </div>
                        </div>
                </div>
                </RemoteWrapper>
            </Suspense>
        </>
    );
}



export default SalesInvoiceViewClass;




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