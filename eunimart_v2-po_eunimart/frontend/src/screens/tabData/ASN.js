import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Suspense } from "react";
import ErrorBoundary from "../../ErrorBoundary";
import { useHistory } from "react-router-dom";
import { loadAsnData } from "../../redux/Actions/action";
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

const Asn = ({id}) => {
  const dispatch = useDispatch();
  const history = useHistory();
 useEffect(() => {
    dispatch(loadAsnData(id))
  }, []);
  const asnData = useSelector((state) => state.data);

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

  //Navigates to View page
  const handleView = (id) => {
    // history.push(`/asn/viewAsn/${id}`);
  };
  //Action buttons
  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (product_id) => handleView(product_id),
      flag:1
    }
  ]);
  return (
    <>
      <Box className="viewProductTable">
          {asnData  &&(
            <Suspense fallback={<div>Loading... </div>}>
              <RemoteWrapper>
                <RemoteDynamicTable
                  table_data={asnData}
                  headCells={headCells}
                  customOptions={customOptions}
                  setCustomOptions={setCustomOptions}
                  enablepagination={false}
                />
              </RemoteWrapper>
            </Suspense>
          )}
      </Box>
    </>
  );
};

export default Asn;




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