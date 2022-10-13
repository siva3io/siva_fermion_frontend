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
  const [variant, setVariant] = useState(uomData ? [uomData.data] : []);

  const [staticFields, setStaticFields] = useState([
    {
      label: "Item Type",
      text: variant[0] &&
        variant[0].item_type &&
        variant[0].item_type.display_name,
      type: "input"
    },
    {
      label: "Unit Code",
      text: variant[0] && variant[0].code,
      type: "input"
    },
    {
      label: "Unit Name",
      text: variant[0] && variant[0].name,
      type: "input"
    },
    {
      label: "Unit Description",
      text: variant[0] && variant[0].description,
      type: "input"
    },
    {
      label: "Class Code",
      text: variant[0] &&
        variant[0].uom_class_code &&
        variant[0].uom_class_code.name,
      type: "input"
    },
    {
      label: "UOM Class Name",
      text: variant[0] && variant[0].uom_class_name,
      type: "input"
    },
    {
      label: "Base UOM Name",
      text: variant[0] && variant[0].base_uom,
      type: "input"
    },
    {
      label: "Conversion Type",
      text: variant[0] &&
        variant[0].conversion_type &&
        variant[0].conversion_type.display_name,
      type: "input"
    },
    {
      label: "Conversion Factor",
      text: variant[0] && variant[0].conversion_factor,
      type: "input"
    },
  ]);

  //render functions
  return (
    <>
      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <RemoteViewBox
            view_data={staticFields}
            header={"Unit Of Measurement Details"}
          />
        </RemoteWrapper>
      </Suspense>
    </>
  );
}



export default UOMDetails;


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