import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense } from "react";
import ErrorBoundary from "../../ErrorBoundary";
import AddForm from "Remote/AddForm";
import { fetchLocationsDropdown } from "../../redux/Action/LocationDropdownAction";
import LocationCards from "../LocationCard";

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const LocationDetails = istData => {
  console.log(istData, istData?.istData.destination_warehouse?.name, "istData");

  return (
    <>
      <div className="istDetails">
        <div className="istDetailsHeader">
          <p className="istDetails_header">Location Details</p>
        </div>

        <div className="shipmentDetails_form">
          <div className="shipmentDetails_form_left">
            <LocationCards
              head={"Dispatch Location"}
              location_name={
                istData?.istData?.source_warehouse?.address?.land_mark
                  ? istData?.istData?.source_warehouse?.address?.land_mark
                  : "--"
              }
              pickUp_address={
                (istData?.istData?.source_warehouse?.address?.address_line_1
                  ? istData?.istData?.source_warehouse?.address?.address_line_1
                  : "--") +
                (istData?.istData?.source_warehouse?.address?.address_line_2
                  ? istData?.istData?.source_warehouse?.address?.address_line_2
                  : "--") +
                (istData?.istData?.source_warehouse?.address?.address_line_3
                  ? istData?.istData?.source_warehouse?.address?.address_line_3
                  : "--") +
                (istData?.istData?.source_warehouse?.address?.pin_code
                  ? istData?.istData?.source_warehouse?.address?.pin_code
                  : "--")
              }
              incharge={istData?.istData?.source_warehouse?.name}
              // incharge={"--"}
            />
          </div>
          <div className="shipmentDetails_form_right">
            <LocationCards
              head={"Delivery Location"}
              location_name={
                istData?.istData?.destination_warehouse?.address?.land_mark
                  ? istData?.istData?.destination_warehouse?.address?.land_mark
                  : "--"
              }
              pickUp_address={
                (istData?.istData?.destination_warehouse?.address
                  ?.address_line_1
                  ? istData?.istData?.destination_warehouse?.address
                      ?.address_line_1
                  : "--") +
                (istData?.istData?.destination_warehouse?.address
                  ?.address_line_2
                  ? istData?.istData?.destination_warehouse?.address
                      ?.address_line_2
                  : "--") +
                (istData?.istData?.destination_warehouse?.address
                  ?.address_line_3
                  ? istData?.istData?.destination_warehouse?.address
                      ?.address_line_3
                  : "--") +
                (istData?.istData?.destination_warehouse?.address?.pin_code
                  ? istData?.istData?.destination_warehouse?.address?.pin_code
                  : "--")
              }
              incharge={istData?.istData?.destination_warehouse?.name}
              // incharge={"--"}
            />
          </div>
        </div>
      </div>

      {/* <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <RemoteLocationCards
            view_data={staticFields}
            header={"ASN Details"}
            
          />
        </RemoteWrapper>
      </Suspense> */}
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
