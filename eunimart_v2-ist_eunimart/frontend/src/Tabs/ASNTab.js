import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadASNData } from "../redux/Action/istListAction";
import { Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary";
const RemoteDynamicTable = React.lazy(() => import("Remote/DynamicTable"));

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const ASNTab = ({ id }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  console.log("ASNViewData", id);
  const [setId] = useState(0);
  const [params, setParams] = useState({ per_page: 10, page_no: 1 });
  useEffect(() => {
    dispatch(loadASNData(params, id));
  }, [params]);

  // const { ASNData, ASNData_meta } = useSelector((state) => state.fetchAsn);
  const { asnData, asnData_meta } = useSelector((state) => state?.data);
  // var ID = 0;
  // while (ID !== ASNViewData?.id) {
  //   ID++;
  //   console.log(ID, "IDssss");
  // }
  console.log("ASNData", asnData);

  const headCells = [
    {
      key: "created_date",
      type: "date",
      label: "ASN Date",
    },
    {
      key: "asn_number",
      type: "text",
      label: "ASN Number",
    },

    {
      key: "dispatch_location_details.location_name",
      count: 2,
      type: "text",
      label: "Drop Location",
    },
    {
      key: "destination_location_details.location_name",
      type: "text",
      count: 2,
      label: "Pickup Location",
    },

    {
      key: "status.display_name",
      count: 2,
      type: "text",
      label: "Status",
    },

    {
      key: "action",
      label: "Action",
      type: "action",
    },
  ];
  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (product_id) => handleView(product_id),
    },
  ]);

  //Navigates to View page
  const handleView = (id) => {
    history.push(`/asn/viewAsn/${id}`);
  };

  return (
    <>
      <br />
      <>
        {asnData && (
          <Suspense fallback={<div>Loading... </div>}>
            <RemoteWrapper>
              <RemoteDynamicTable
                table_data={asnData}
                headCells={headCells}
                customOptions={customOptions}
                setCustomOptions={setCustomOptions}
                info={asnData_meta?.info}
                setParams={setParams}
                setId={setId}
                enablepagination={false}
                checkDisable={false}
              />
            </RemoteWrapper>
          </Suspense>
        )}
      </>

      {/*    
      <Paper
        sx={{
          borderRadius: "8px",
        
        }}
      >
     
        <CardContent>
          <Table1
            tableFor="asn1"
            heading={ASN_DUMMY_DATA_RETURNS_HEADING}
            detail={ASNData}
          />
        </CardContent>
      </Paper> */}
    </>
  );
};

export default ASNTab;

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
