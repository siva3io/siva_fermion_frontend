import React, { useEffect, useState } from "react";
import { lazy, Suspense } from "react";
import ErrorBoundary from "../../ErrorBoundary";
import LocationDetails from "./LocationDetails";
const RemoteViewBox = React.lazy(() => import("Remote/ViewBox"));

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const ISTDetails = ({ istData }) => {
  console.log(istData, "istDataaaaaaa");
  const datePipe = (dateString) => {
    let date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const [staticFields, setStaticFields] = useState([
    {
      label: "IST Number",
      type: "input",
      text: istData?.ist_number ? istData?.ist_number : "--",
      // text: istData.ist_number,
    },
    {
      label: "Date to Deliver on",
      type: "input",
      text: istData?.scheduled_delivery_date
        ? datePipe(istData?.scheduled_delivery_date)
        : "--",
    },
    {
      label: "Reason",
      type: "input",
      text: istData?.reason?.display_name
        ? istData?.reason?.display_name
        : "--",
    },
    {
      label: "Receipt routing options",
      type: "input",
      text: istData?.receipt_routing?.display_name
        ? istData?.receipt_routing?.display_name
        : "--",
    },
    {
      label: "Source Location",
      type: "input",
      text: istData?.source_warehouse?.name
        ? istData?.source_warehouse?.name
        : "--",
    },
    {
      label: "Destination Location",
      type: "input",
      text: istData?.destination_warehouse?.name
        ? istData?.destination_warehouse?.name
        : "--",
    },
    {
      label: "Source Document Type",
      type: "input",
      text: istData?.source_document?.display_name
        ? istData?.source_document?.display_name
        : "--",
    },
    {
      label: "Select Source Document",
      type: "input",
      text: istData?.source_documents?.data
        ? istData?.source_documents?.data
        : "--",
    },
  ]);

  return (
    <>
      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <RemoteViewBox view_data={staticFields} header={"IST Details"} />
        </RemoteWrapper>
      </Suspense>

      {istData && <LocationDetails istData={istData} />}
    </>
  );
};

export default ISTDetails;

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
