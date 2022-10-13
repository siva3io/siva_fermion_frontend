import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadGRNData } from "../redux/Action/istListAction";
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

const GRNTab = ({ id }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  console.log("ISTDataId", id);
  const [selectedId, setId] = useState(0);
  const [params, setParams] = useState({ per_page: 10, page_no: 1 });

  useEffect(() => {
    dispatch(loadGRNData(params, id));
  }, [params]);

  // const { GRNData, GRNData_meta } = useSelector((state) => state.fetchGrn);
  const { grnData, grnData_meta } = useSelector((state) => state.data);
  console.log(grnData, "uu1grn");

  const headCells = [
    {
      key: "created_date",
      type: "date",
      label: "GRN Date",
    },
    {
      key: "grn_number",
      type: "text",
      label: "GRN Number",
    },

    {
      key: "document_type.display_name",
      count: 2,
      type: "text",
      label: "Document Type",
    },
    {
      key: "reference_number",
      type: "text",
      label: "Reference Number",
    },

    {
      key: "warehouse.name",
      count: 2,
      type: "text",
      label: "Warehouse Name",
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
    // {
    //   label: "Edit",
    //   // func: (product_id) => handleViewProduct(product_id),
    // },
    // {
    //   label: "Delete",
    // },
  ]);

  //Navigates to View page
  const handleView = (id) => {
    history.push(`/grn/viewGrn/${id}`);
  };

  return (
    <>
      <br />
      <>
        {grnData && (
          <Suspense fallback={<div>Loading... </div>}>
            <RemoteWrapper>
              <RemoteDynamicTable
                table_data={grnData}
                headCells={headCells}
                customOptions={customOptions}
                setCustomOptions={setCustomOptions}
                info={grnData_meta?.info}
                setParams={setParams}
                setId={setId}
                enablepagination={false}
                checkDisable={false}
              />
            </RemoteWrapper>
          </Suspense>
        )}
      </>
    </>
  );
};

export default GRNTab;

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
