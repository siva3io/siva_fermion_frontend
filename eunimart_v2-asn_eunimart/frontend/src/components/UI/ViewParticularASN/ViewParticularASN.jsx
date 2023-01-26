import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));
import { lazy, Suspense } from "react";
import ErrorBoundary from "../../../ErrorBoundary";
import AsnProductDetails from "./AsnProductDetails";
import LocationDetails from "./LocationDetails";
import ShippingDetails from "./ShippingDetails";
const RemoteViewBox = React.lazy(() => import("Remote/ViewBox"));

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const ViewParticularASN = ({ asnData }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const editHandler = () => {
    setEdit(prev => !prev);
  };
  console.log(asnData, "asnData11");

  const asnProducts = asnData.asn_order_lines;

  const [staticFields, setStaticFields] = useState([
    {
      label: "ASN Number",
      type: "input",
      text: asnData?.asn_number ? asnData?.asn_number : "--",
    },
    {
      label: "Source Document Type",
      type: "input",
      text: asnData?.source_document_type?.display_name
        ? asnData.source_document_type?.display_name
        : "--",
    },
    {
      label: "Source Document Type",
      type: "input",
      text: asnData?.source_document?.data
        ? asnData.source_document?.data
        : "--",
    },
    {
      label: "Reference Number",
      type: "input",
      text: asnData?.reference_number ? asnData?.reference_number : "--",
    },
  ]);

  return (
    <>
      <div className="doCreate">
        <Suspense fallback={<div>Loading... </div>}>
          <RemoteWrapper>
            <RemoteViewBox view_data={staticFields} header={"ASN Details"} />
          </RemoteWrapper>
        </Suspense>

        {asnData && <AsnProductDetails asnProducts={asnProducts} />}
        {asnData && <LocationDetails asnData={asnData} />}
        {asnData && <ShippingDetails asnData={asnData} />}
      </div>
    </>
  );
};

export default ViewParticularASN;

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
