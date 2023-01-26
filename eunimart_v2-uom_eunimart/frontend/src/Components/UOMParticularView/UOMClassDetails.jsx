import React, { useState, useEffect } from "react";
import ErrorBoundary from "../../ErrorBoundary";
import { lazy, Suspense } from "react";
const RemoteViewBox = React.lazy(() => import("Remote/ViewBox"));

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

function UOMDetails({ uomData, edit }) {
  //local variables
  const [variant, setVariant] = useState(uomData ? [uomData.data] : []);
  const [staticFields, setStaticFields] = useState([
    {
      label: "Item Type",
      text: variant[0] &&
      variant[0].uom_class_code &&
      variant[0].uom_class_code.code,
      type: "input"
    },
    {
      label: "Unit Code",
      text: variant[0] &&
      variant[0].uom_class_code &&
      variant[0].uom_class_code.name,
      type: "input"
    },
    {
      label: "Unit Name",
      text: variant[0] &&
      variant[0].uom_class_code &&
      variant[0].uom_class_code.description,
      type: "input"
    },
    {
      label: "Unit Description",
      text:  variant[0] &&
      variant[0].uom_class_code &&
      variant[0].uom_class_code.base_uom &&
      variant[0].uom_class_code.base_uom,
      type: "input"
    },
   
  ]);

  return (
    <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <RemoteViewBox
            view_data={staticFields}
            header={"Unit Of Measurement Class Details"}
          />
        </RemoteWrapper>
      </Suspense>
  );
}

export default UOMDetails;


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