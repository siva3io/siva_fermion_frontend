import React, { useState, useEffect, Suspense } from "react";
import RemoteViewBox from "Remote/ViewBox";
import LocationCard from "../../components/locationCard";
import RemoteViewBox_Table from "Remote/ViewBox_Table";

function DebitNoteDetails({ data, edit }) {
  const datePipe = dateString => {
    let date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  var cdate = datePipe(data && data.created_date);

  const Debit_Note_Data = [
    {
      label: "Debit Note ID",
      text: data?.debit_note_id,
      type: "input",
    },
    {
      label: "Reference ID",
      text: data?.reference_id,
      type: "input",
    },
    {
      label: "Vendor Name",
      text: data?.first_name,
      type: "input",
    },
    {
      label: "Purchase Invoice ID",
      text: data?.purchase_invoice_id,
      type: "input",
    },
    {
      label: "Debit Note Date",
      text: datePipe(data?.CreatedBy?.created_date),
      type: "input",
    }, //data.CreatedBy.created_date
    {
      label: "Currency",
      text: data?.currency_id,
      type: "input",
    },
    {
      label: "Reason",
      text: data?.reason?.display_name,
      type: "input",
    }, //data.reason.display_name
  ];

  //vendor delivery address cards

  //#region Order Line Item
  const headCells = [
    {
      key: "sku_id",
      numeric: true,
      label: "Product SKU",
      type: "text",
    },
    {
      key: "display_name",
      numeric: true,
      label: "Product Name",
      type: "text",
    },
    {
      key: "description",
      numeric: true,
      label: "Description",
      type: "text",
    },
    { key: "price", numeric: true, label: "Price", type: "date" },
    {
      key: "quantity",
      numeric: true,
      label: "Quantity",
      type: "text",
    },
    {
      key: "discount",
      numeric: true,
      label: "Discount",
      type: "text",
    },
    {
      key: "tax",
      numeric: true,
      label: "Tax %",
      type: "text",
    },
    {
      key: "amount",
      numeric: true,
      label: "Amount",
      type: "text",
    },
  ];

  const Additional_Information = [
    {
      label: "Notes",
      text: "notes",
      type: "input",
    },
    {
      label: " ",
      text: " ",
      type: "input",
    },
    {
      label: "Terms and Conditions",
      text: "terms_and_conditions",
      type: "input",
    },
    {
      label: " ",
      text: " ",
      type: "input",
    },
    {
      label: "Attachments",
      text: " ",
      type: "input",
    },
  ];
  const Payment_Details = [
    {
      label: "Sub Total",
      text: "notes",
      type: "input",
    },
    {
      label: "Tax",
      text: " ", //data.tax
      type: "input",
    },
    {
      label: "Shipping Charges",
      text: "terms_and_conditions",
      type: "input",
    },
    {
      label: "Customer Credits",
      text: " ",
      type: "input",
    },
    {
      label: "Adjustments",
      text: " ",
      type: "input",
    },
    {
      label: "",
      text: " ",
      type: "input",
    },
    {
      label: "Total Amount",
      text: " ",
      type: "input",
    },
  ];
  //data.billing_address.address_details[0].location_name

  return (
    <>
      <RemoteViewBox
        view_data={Debit_Note_Data}
        header={"Debit Note Details"}
      />

      <div className="main-sec">
        <Suspense fallback={<div>Loading... </div>}>
          <div className="address">
            <div className="staticFormCard">
              <div className="staticFormCardTitle">Location Details</div>
              <div className="adressSec">
                <div className="adressSec1">
                  <LocationCard
                    head={"Delivery Location"}
                    location_name={""}
                    pickUp_address={""}
                    contact={""}
                  />
                </div>
                <div className="adressSec2">
                  <LocationCard
                    head={"Scrap Location"}
                    pickUp_address={data?.scrap_location_details?.address_line}
                    location_name={data?.scrap_location_details?.city}
                    contact={data?.scrap_location_details?.receiver_name}
                  />
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      </div>
      {data && data?.debit_note_line_items && (
        <RemoteViewBox_Table
          headCells={headCells}
          table_data={data?.debit_note_line_items.map(item => {
            return {
              sku_id: item?.product_variant?.sku_id
                ? item?.product_variant?.sku_id
                : "--",
              display_name: item?.product_template?.inventory_tracking
                ?.LookupType?.display_name
                ? item?.product_template?.inventory_tracking?.LookupType
                    ?.display_name
                : "--",
              description: item?.product_template?.brand?.description
                ? item?.product_template?.brand?.description
                : "--",
              price: item?.price ? item?.price : "--",
              quantity: item.quantity ? item.quantity : "--",
              discount: item.discount ? item.discount : "--",
              tax: item?.product_template?.product_pricing_details?.tax
                ? item?.product_template?.product_pricing_details?.tax
                : "--",
              amount: item?.amount ? item?.amount : "--",
            };
          })}
          header={"Product Details"}
        />
      )}
      <RemoteViewBox
        view_data={Additional_Information}
        header={"Additional Information"}
      />
      <RemoteViewBox view_data={Payment_Details} header={"Payment Details"} />
    </>
  );
}

export default DebitNoteDetails;

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
