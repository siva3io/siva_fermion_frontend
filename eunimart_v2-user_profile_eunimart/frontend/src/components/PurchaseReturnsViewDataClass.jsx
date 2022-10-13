import React, { useState, useEffect } from "react";
import ErrorBoundary from "../ErrorBoundary";
import { lazy, Suspense } from "react";
const RemoteViewBox = React.lazy(() => import("Remote/ViewBox"));
const RemoteLocationCard = React.lazy(() => import("Remote/LocationCards"));
const RemoteButton = React.lazy(() => import("Remote/BasicButton"));
import LocationCard  from '../UI/LocationCard/LocationCard';
import RemoteViewBox_Table from "Remote/ViewBox_Table";
import "../App.css";
import "./purchaseReturnsViewClass.css";
import { Box , Button, Typography} from "@mui/material";

const RemoteWrapper = ({ children }) => (
    <div>
        <ErrorBoundary>{children}</ErrorBoundary>
    </div>
);

function PurchaseReturnsViewDataClass({
    purchaseReturnsViewData
}) {
    const [variant, setVariant] = useState(purchaseReturnsViewData ? purchaseReturnsViewData : []);
    const [variantPurchaseReturns, setvariantPurchaseReturns] = useState(variant.purchase_return_lines ? variant.purchase_return_lines : []);
    const[variantAdditionalInfo] = useState(variant.additional_information ? variant.additional_information : []);
    const[prPaymentDetails2] = useState(variant.pr_payment_details ? variant.pr_payment_details : []);
    const [variantVendorDetails, setvariantVendorDetails] = useState(variant.vendor_details && variant.vendor_details.vendor_locations? variant.vendor_details.vendor_locations : []);
    const [pages, setPages] = useState(
        params && Number(params.offset) ? Number(params.offset) : 0
    ); //pagination variables
    console.log('variant123',variant)
console.log('skghdsgfj',variantPurchaseReturns)
    const [params, setParams] = useState({ limit: 10, offset: 0 });
    const [selectedId, setId] = useState(0);

    
    const [purchasereturnsdetails, setpurchasereturnsdetails] = useState([
        {
            label: "Purcase Return ID",
            text: variant &&
                variant.purchase_return_number,
            type: "input"
        },
        {
            label: "Link Document Type",
            text: variant &&
                variant.source_document.display_name,
            type: "input"
        },
        {
            label: "Link Document Id",
            text: variant &&
                variant.source_documents.purchase_order_number ? variant.source_documents.purchase_order_number : variant.source_documents.sales_order_number,
            type: "input"
        },
        {
            label: "Reference ID",
            text: variant && variant.reference_number,
            type: "input"
        },
        {
            label: "Expected Delivery",
            text: variant && variant.expected_delivery_date,
            type: "input"
        },
        {
            label: "PR Currency",
            text: variant && variant?.currency?.name,
            type: "input"
        },
    ]);
    const [additionalInformation, setadditionalInformation] = useState([
        {
            label: "Notes",
            text: variantAdditionalInfo && variantAdditionalInfo.notes,
            type: "input"
        },
        {
            label: "Terms and Conditions",
            text: variantAdditionalInfo && variantAdditionalInfo.terms_and_conditions,
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
            label: "Select Payment Terms",
            text: variant &&
                variant.payment_terms && variant.payment_terms?.display_name,
            type: "input"
        },
        {
            label: "Payment Due Date",
            text: variant && variant?.payment_due_date,
            type: "input"
        },
        {
            label: "PO Currency",
            text: variant && variant.currency?.name,
            type: "input"
        },
        
    ]);
    const [paymentDetails2, setpaymentDetails2] = useState([
        {
            label: "Sub Total",
            text: prPaymentDetails2 && prPaymentDetails2.sub_total,
            type: "input"
        },
        {
            label: "Tax",
            text: prPaymentDetails2 && prPaymentDetails2.tax,
            type: "input"
        },
        {
            label: "Shipping Charges",
            text: prPaymentDetails2 && prPaymentDetails2.shipping_charges,
            type: "input"
        },
       
        {
            label: "Customer Credits",
            text: prPaymentDetails2 && prPaymentDetails2.vendor_Credits,
            type: "input"
        },
        {
            label: "Adjustments",
            text: prPaymentDetails2 && prPaymentDetails2.adjustments,
            type: "input"
        },
    ]);
    const headCells = [
        {
            key: "sku_id",
            label: "Product SKU",
            type: "text",
        },
        {
            key: "product_name",
            label: "Product Name",
            type: "text",
        },
        {
            key: "rate",
            label: "Price",
            type: "text",
        },
        {
            key: "quantity_returned",
            label: "Quantity",
            type: "text",
        },
        {
            key: "discount",
            label: "Discount",
            type: "text",
        },
       { key: "tax",
            label: "Tax %",
            type: "text",
        },
        {
            key: "amount",
            label: "Amount",
            type: "text",
        },
    ];
    return (
        
        <>
            <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                    <RemoteViewBox
                        view_data={purchasereturnsdetails}
                        header={"Purchase Returns Details"}
                    />
                </RemoteWrapper>
            </Suspense>
            <Suspense fallback={<div>Loading... </div>}>
            <RemoteWrapper>
                <Box sx={{background: "#ffffff",borderRadius: "8px",padding:"8px"}}>
      <h2>Vendor Delivery Address</h2>
    
        <Box sx={{display:"flex",justifyContent:"space-around"}}>

        <LocationCard
            head={"Delivery Location"}
           
            pickUp_address={`${variantVendorDetails?.vendor_billing_address?.address_line_1} ${variantVendorDetails?.vendor_billing_address?.address_line_2} ${variantVendorDetails?.vendor_billing_address?.address_line_3} `}
            location_name={variantVendorDetails?.vendor_billing_address?.location_name}
            contact={variantVendorDetails?.vendor_billing_address?.contact_person_name}
            
          />
          <LocationCard
            head={"Billing Location"}
            pickUp_address={`${variantVendorDetails?.vendor_billing_address?.address_line_1} ${variantVendorDetails?.vendor_billing_address?.address_line_2} ${variantVendorDetails?.vendor_billing_address?.address_line_3} `}
            location_name={variantVendorDetails?.vendor_billing_address?.location_name}
            contact={variantVendorDetails?.vendor_billing_address?.contact_person_name}
          />
        </Box>
          
    </Box>
                </RemoteWrapper>
            </Suspense>
            <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
            

                    {variantPurchaseReturns &&
      <RemoteViewBox_Table headCells={headCells} table_data={variantPurchaseReturns.map(item=>{
          return {
            sku_id: (item && item.product_details && item.product_details.sku_id ? item.product_details.sku_id : "--"),
            product_name: (item && item.product_details && item.product_details.product_name ? item.product_details.product_name : "--"),
            description:(item && item.product_details && item.product_details.description ? JSON.stringify(item.product_details.description) : "--"),
            rate: (item && item.rate ? item.rate : 0),
            quantity_returned: (item && item.quantity_returned ? item.quantity_returned : 0),
            discount: (item && item.discount ? item.discount : 0),
            tax: (item && item.tax ? item.tax : 0),
            amount: (item && item.amount ? item.amount : 0),
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
                    <RemoteViewBox
                        view_data={paymentDetails}
                        header={"Payment Details"}
                    />
                </RemoteWrapper>
            </Suspense>
            <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                <div className="locationDetailsMain">
                <div className="staticFormCardTitle">{'Payment Details'}</div>
                <div className="product-staticFormCardForm"> 
                        {paymentDetails2.map((field) => {
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
                                <h3>{variant.amount ? variant.amount : '--'}</h3>
                            </Box>
                        </div>
                        </div>
                </div>
                </RemoteWrapper>
            </Suspense>
      </>
    )

}
export default PurchaseReturnsViewDataClass;

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