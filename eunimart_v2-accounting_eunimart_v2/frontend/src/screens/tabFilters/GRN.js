import React, { useState, useEffect } from "react";
import "./Grn.css";
import { lazy, Suspense } from "react";
import { useHistory } from "react-router-dom";
const RemoteDynamicTable = React.lazy(() => import("Remote/DynamicTable"));

const GRN = (grnData) => {
  // const grnData = useSelector((state) => state.fetchGrnData?.grn);

  const headCells = [
    {
      key: "created_date",
      numeric: true,
      type: "date",
      label: "GRN Date",
    },
    {
      key: "grn_number",
      numeric: true,
      type: "text",
      label: "GRN Number",
    },

    {
      key: "document_type.display_name",
      count: 2,
      numeric: true,
      type: "text",
      label: "Document Type",
    },
    {
      key: "reference_number",
      numeric: true,
      type: "text",
      label: "Reference Number",
    },

    {
      key: "warehouse.name",
      count: 2,
      numeric: true,
      type: "text",
      label: "Warehouse Name",
    },

    {
      key: "status.display_name",
      count: 2,
      numeric: true,
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

  const navigate = useHistory();
  const handleView = (id) => {
    navigate.push(`/grn/viewGrn/${id}`);
  };

  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (idchange) => handleView(idchange),
    },
  ]);

  return (
    <Box sx={{ background: "#F9F9F9" }}>
      {grnData && (
        <Box sx={{ p: 2 }}>
          <Suspense fallback={<div>Loading... </div>}>
            <RemoteDynamicTable
              table_data={grnData?.data}
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

export default GRN;

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
