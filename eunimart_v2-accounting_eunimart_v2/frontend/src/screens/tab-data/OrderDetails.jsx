import React, { useState, useEffect } from "react";
import RemoteViewBox from "Remote/ViewBox";
import RemoteViewBox_Table from "Remote/ViewBox_Table";

function OrderDetails({ data, edit }) {
  console.log("data", data);
  //console.log("OrderDetails data 33", data)

  const datePipe = dateString => {
    let date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  var cdate = datePipe(data && data.created_date);

  const credit_note_details = [
    {
      label: "Vendor Name",
      text: data && data.customer && data.customer.first_name,
      type: "input",
    },
    {
      label: "Credit Note Date",
      text: cdate,
      type: "input",
    },
    {
      label: "Reference ID",
      text: data && data.reference_id,
      type: "input",
    },
    {
      label: "Purchase Invoice ID",
      text:
        data &&
        data.purchase_invoice &&
        data.purchase_invoice.purchase_invoice_number,
      type: "input",
    },
    {
      label: "Currency",
      text: data && data.currency && data.currency.name,
      type: "input",
    },
    {
      label: "Reason",
      text: data && data.reason && data.reason.display_name,
      type: "input",
    },
    {
      label: "Source Document Type",
      text: data && data.source_document && data.source_document.display_name,
      type: "input",
    },
    {
      label: "Select Source Document",
      text: data && data.source_documents && data.source_documents.label,
      type: "input",
    },
  ];
  //#endregion Sales Order Details

  //#endregion Customer Shipping Address
  const Customer_Shipping_Address = [
    {
      label: "Customer Name",
      text: data && data.shipping_address_id && data.shipping_address_id.name,
      type: "input",
    },
    {
      label: "Phone number",
      text:
        data &&
        data.shipping_address_id &&
        data.shipping_address_id.primary_phone,
      type: "input",
    },
    {
      label: "Email Address",
      text:
        data &&
        data.shipping_address_id &&
        data.shipping_address_id.primary_email,
      type: "input",
    },
    {
      label: "Address line 1",
      text:
        data &&
        data.shipping_address_id &&
        data.shipping_address_id.address_line_1,
      type: "input",
    },
    {
      label: "Address line 2",
      text:
        data &&
        data.shipping_address_id &&
        data.shipping_address_id.address_line_2,
      type: "input",
    },
    {
      label: "Address line 3",
      text:
        data &&
        data.shipping_address_id &&
        data.shipping_address_id.address_line_3,
      type: "input",
    },
    {
      label: "Zip Code",
      text:
        data && data.shipping_address_id && data.shipping_address_id.pin_code,
      type: "input",
    },
    {
      label: "City",
      text: data && data.shipping_address_id && data.shipping_address_id.city,
      type: "input",
    },
    // {
    //   label: "State",
    //   text:
    //     data &&
    //     data.shipping_address_id &&
    //     data.shipping_address_id.state &&
    //     data.shipping_address_id.state.name,
    //   type: "input",
    // },
    // {
    //   label: "Country",
    //   text:
    //     data &&
    //     data.shipping_address_id &&
    //     data.shipping_address_id.country &&
    //     data.shipping_address_id.country.name,
    //   type: "input",
    // },
  ];
  //#endregion Customer Shipping Address

  //#endregion Customer Billing Address
  const Customer_Billing_Address = [
    {
      label: "Customer Name",
      text: data && data.billing_address_id && data.billing_address_id.name,
      type: "input",
    },
    {
      label: "Phone number",
      text:
        data &&
        data.billing_address_id &&
        data.billing_address_id.primary_phone,
      type: "input",
    },
    {
      label: "Email Address",
      text:
        data &&
        data.billing_address_id &&
        data.billing_address_id.primary_email,
      type: "input",
    },
    {
      label: "Address line 1",
      text:
        data &&
        data.billing_address_id &&
        data.billing_address_id.address_line_1,
      type: "input",
    },
    {
      label: "Address line 2",
      text:
        data &&
        data.billing_address_id &&
        data.billing_address_id.address_line_2,
      type: "input",
    },
    {
      label: "Address line 3",
      text:
        data &&
        data.billing_address_id &&
        data.billing_address_id.address_line_3,
      type: "input",
    },
    {
      label: "Zip Code",
      text: data && data.billing_address_id && data.billing_address_id.pin_code,
      type: "input",
    },
    {
      label: "City",
      text: data && data.billing_address_id && data.billing_address_id.city,
      type: "input",
    },
    // {
    //   label: "State",
    //   text:
    //     data &&
    //     data.billing_address_id &&
    //     data.billing_address_id.state &&
    //     data.billing_address_id.state.name,
    //   type: "input",
    // },
    // {
    //   label: "Country",
    //   text:
    //     data &&
    //     data.billing_address_id &&
    //     data.billing_address_id.country &&
    //     data.billing_address_id.country.name,
    //   type: "input",
    // },
  ];
  //#endregion Customer Billing Address
  var payment_due_cdate = datePipe(data && data.payment_due_date);

  const Payment_Terms = [
    {
      label: "Payment Terms",
      text: data && data.internal_notes,
      type: "input",
    },
    {
      label: "Payment Due Date",
      text: data && data.terms_and_conditions,
      type: "input",
    },
  ];
  //#endregion Payment Terms

  //#region Order Line Item
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
      key: "Description",
      label: "Description",
      type: "text",
    },
    {
      key: "Quantity",
      label: "Quantity",
      type: "text",
    },
    {
      key: "uom_id",
      label: "Unit Of Measurement",
      type: "text",
    },
    {
      key: "Price",
      numeric: true,
      label: "Price",
      type: "text",
    },

    {
      key: "Discount",
      numeric: true,
      label: "Discount",
      type: "text",
    },
    {
      key: "Tax",
      numeric: true,
      label: "Tax",
      type: "text",
    },
    {
      key: "Amount",
      numeric: true,
      label: "Amount",
      type: "text",
    },
  ];
  //#endregion Order Line Item

  //#region Additional Information
  const additional_information = [
    {
      label: "Notes",
      text: data && data && data.internal_notes,
      type: "input",
    },
    {
      label: "Terms And Conditions",
      text: data && data.terms_and_conditions,
      type: "input",
    },
  ];
  //#endregion Additional Information

  //#region Amount Details
  const Amount_Details = [
    {
      label: "Sub Total",
      text: data && data.sub_total,
      type: "input",
    },
    {
      label: "Tax",
      text: data && data.tax,
      type: "input",
    },
    {
      label: "Shipping Charge",
      text: data && data.shipping_charges,
      type: "input",
    },
    {
      label: "Customer Credits",
      text: data && data.customer_credits,
      type: "input",
    },
    {
      label: "Adjustments",
      text: data && data.adjustments,
      type: "input",
    },
    {
      label: "Total Amount",
      text: data && data.total_amount,
      type: "input",
    },
  ];
  //#endregion Amount Details

  return (
    <>
      <RemoteViewBox
        view_data={credit_note_details}
        header={"Credit Note Details"}
      />

      <RemoteViewBox
        view_data={Customer_Shipping_Address}
        header={"Customer Shipping Address"}
      />

      <RemoteViewBox
        view_data={Customer_Billing_Address}
        header={"Customer Billing Address"}
      />

      {data && data.credit_note_line_items && (
        <RemoteViewBox_Table
          headCells={headCells}
          table_data={data.credit_note_line_items.map(item => {
            return {
              sku_id:
                item && item.sku_id && item.sku_id.label
                  ? item.sku_id.label
                  : "--",
              product_name:
                item && item.product_name ? item.product_name : "--",
              Description:
                item &&
                item.product_template &&
                item.product_template.description
                  ? JSON.stringify(item.product_template.description)
                  : "--",
              // Description: "--",
              uom_id:
                item && item.uom && item.uom?.name ? item.uom?.name : "--",
              Price: item && item.price ? item.price : "--",
              Quantity: item && item.quantity ? item.quantity : "--",
              Discount: item && item.discount ? item.discount : "--",
              Tax: item && item.tax ? item.tax : "--",
              Amount: item && item.amount ? item.amount : "--",
            };
          })}
          header={"Order Line Item"}
        />
      )}

      <RemoteViewBox
        view_data={additional_information}
        header={"Additional Information"}
      />

      <RemoteViewBox view_data={Amount_Details} header={"Amount Details"} />
    </>
  );
}

export default OrderDetails;

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
