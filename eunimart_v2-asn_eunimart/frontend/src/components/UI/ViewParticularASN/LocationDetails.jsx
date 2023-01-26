import React, { useState } from "react";
import { lazy, Suspense } from "react";
import ErrorBoundary from "../../../ErrorBoundary";
import LocationCards from "../../../Shared/LocationCard/LocationCard";
import "../../../App.css";

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const LocationDetails = asnData => {
  console.log(
    asnData,
    asnData?.asnData.dispatch_location_details?.location_name,
    "asnData"
  );

  return (
    <>
      <div className="asnDetails">
        <div className="asnDetailsHeader">
          <p className="asnDetails_header">Location Details</p>
        </div>

        <div className="shipmentDetails_form">
          <div className="shipmentDetails_form_left">
            <LocationCards
              head={"Dispatch Location"}
              pickUp_address={
                asnData?.asnData?.dispatch_location_details?.address_line_1
                  ? asnData?.asnData?.dispatch_location_details?.address_line_1
                  : "--"
              }
              location_name={
                asnData?.asnData?.dispatch_location_details?.location_name
                  ? asnData?.asnData?.dispatch_location_details?.location_name
                  : "--"
              }
              incharge={
                asnData?.asnData.dispatch_location_details?.location_name
              }
            />
          </div>
          <div className="shipmentDetails_form_right">
            <LocationCards
              head={"Delivery Location"}
              location_name={
                asnData?.asnData?.destination_location_details?.location_name
                  ? asnData?.asnData?.destination_location_details
                      ?.location_name
                  : "--"
              }
              pickUp_address={
                asnData?.asnData?.destination_location_details?.address_line_1
                  ? asnData?.asnData?.destination_location_details
                      ?.address_line_1
                  : "--"
              }
              incharge={
                asnData?.asnData.dispatch_location_details?.location_name
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationDetails;

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
