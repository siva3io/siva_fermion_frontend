import React, { useState } from "react";
import "./ShippingDetails.css";
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));
import { lazy, Suspense } from "react";
import ErrorBoundary from "../../../ErrorBoundary";
import LabeledText from "../../../Shared/LabeledText/LabeledText";
const RemoteViewBox = React.lazy(() => import("Remote/ViewBox"));

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const ShippingDetails = ({ data, set, asnData }) => {
  let deliveryOrder1 = [];
  const [staticFields, setStaticFields] = useState([
    {
      label: "Package Length",
      type: "input",
      text: asnData?.shipping_details?.package_details?.package_length
        ? asnData?.shipping_details?.package_details?.package_length
        : "--",
    },
    {
      label: "Package Width",
      type: "input",
      text: asnData?.shipping_details?.package_details?.package_width
        ? asnData?.shipping_details?.package_details?.package_width
        : "--",
    },

    {
      label: "Package Height",
      type: "input",
      text: asnData?.shipping_details?.package_details?.package_height
        ? asnData?.shipping_details?.package_details?.package_height
        : "--",
    },
    {
      label: "Package Weight",
      type: "input",
      text: asnData?.shipping_details?.package_details?.package_weight
        ? asnData?.shipping_details?.package_details?.package_weight
        : "--",
    },

    {
      label: "Vol weight",
      type: "input",
      text: asnData?.shipping_details?.package_details?.vol_weight
        ? asnData?.shipping_details?.package_details?.vol_weight
        : "--",
    },
  ]);

  const [staticFields1, setStaticFields1] = useState([
    {
      label: "Set Pickup Date",
      type: "input",
      text: asnData?.schedule_pickup_date
        ? asnData?.schedule_pickup_date.substring(0, 10)
        : "--",
    },
    {
      label: "Set Pickup Time",
      type: "input",
      text: asnData?.schedule_pickup_from_time
        ? asnData?.schedule_pickup_from_time
        : "--",
    },
  ]);

  return (
    <>
      {/* <div className="asnDetailsHeader">
        <p className="asnDetails_header">Shipping Details</p>
      </div>
      <LabeledText
        card
        label={"Source Warehouse"}
        text={asnData?.warehouse?.name ? asnData?.warehouse?.name : "--"}
      /> */}

      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <RemoteViewBox view_data={staticFields} header={"Package Details"} />
        </RemoteWrapper>
      </Suspense>

      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <RemoteViewBox
            view_data={staticFields1}
            header={"Schedule Pickup Date and Time"}
          />
        </RemoteWrapper>
      </Suspense>
    </>
  );
};

export default ShippingDetails;

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
