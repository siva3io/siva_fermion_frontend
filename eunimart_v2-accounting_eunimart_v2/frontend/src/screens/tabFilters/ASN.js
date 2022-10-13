import { Box } from "@mui/material";
import React, { useState } from "react";
import "./Asn.css";
import { Suspense } from "react";
import { useHistory } from "react-router-dom";
const RemoteDynamicTable = React.lazy(() => import("Remote/DynamicTable"));

const ASN = (asnData) => {
  const navigate = useHistory();
  // const asnData = useSelector((state) => state.fetchAsnData?.asnData);

  const headCells = [
    {
      key: "asn_number",
      numeric: true,
      type: "text",
      seticon: true,
      label: "ASN Number",
    },
    {
      key: "created_date",
      numeric: true,
      type: "date",
      seticon: true,
      label: "Created Date",
    },

    {
      key: "dispatch_location_details.location_name",
      numeric: true,
      count: 2,
      type: "text",
      label: "Drop Location",
    },
    {
      key: "destination_location_details.location_name",
      numeric: true,
      type: "text",
      count: 2,
      label: "Pickup Location",
    },

    {
      key: "status.display_name",
      numeric: true,
      count: 2,
      type: "text",
      label: "Status",
    },

    {
      key: "action",
      numeric: true,
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

  const handleView = (id) => {
    navigate.push("/asn/view/" + id);
  };

  return (
    <Box sx={{ background: "#F9F9F9" }}>
      {asnData && (
        <Box sx={{ p: 2 }}>
          <Suspense fallback={<div>Loading... </div>}>
            <RemoteDynamicTable
              table_data={asnData?.data}
              headCells={headCells}
              customOptions={customOptions}
              setCustomOptions={setCustomOptions}
              enablepagination={false}
            />
          </Suspense>
        </Box>
      )}
    </Box>
  );
};

export default ASN;

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
