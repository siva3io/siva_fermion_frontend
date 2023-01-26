import { Card, CardContent, Chip, Paper, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
// import { fetchGrnbyId } from "../../../redux/Action/FetchGrnByIdAction";
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));
import { lazy, Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary";

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const DisplayGrnDetails = grnData1 => {
  // const grnData = useSelector((state) => state.fetchGrnById.grn);
  const grnData = grnData1?.grnData;
  // console.log(grnData, "grnData111");

  // const grnData = useSelector(
  //   (state) => state.fetchGrnById?.grn
  // );

  useEffect(() => {
    console.log("grnData--", grnData);
  }, [grnData]);

  const [staticFields, setStaticFields] = useState([
    {
      label: "GRN Number",
      type: "input",
      text: grnData?.grn_number ? grnData?.grn_number : "--",
    },
    {
      label: "Source Document Type",
      type: "input",
      text: grnData?.grn_number ? grnData?.document_type?.display_name : "--",
    },
    {
      label: "Reference Number",
      type: "input",
      text: grnData?.grn_number ? grnData?.reference_number : "--",
    },
  ]);

  console.log("staticFields", staticFields, setStaticFields);

  return (
    <div className="locationDetailsMain">
      <div className="locationDetailForm">
        <div className="staticFormCard">
          <div className="staticFormCardTitle">GRN Details</div>
          <div className="product-staticFormCardForm">
            {staticFields.map(field => {
              const val = field.label;
              const typ = field.type;
              return typ === "input" ? (
                <Suspense fallback={<div>Loading... </div>}>
                  <RemoteWrapper>
                    <RemoteViewTextField
                      card
                      label={field.label}
                      text={field.text}
                      disabled_y={true}
                    />
                  </RemoteWrapper>
                </Suspense>
              ) : (
                <></>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayGrnDetails;

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
