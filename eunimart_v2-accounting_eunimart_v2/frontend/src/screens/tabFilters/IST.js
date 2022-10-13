import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadIstData, deleteIst } from "../redux/Action/istListAction";
import "../index.css";
import { lazy, Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary";
import { useHistory } from "react-router-dom";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import RemoteDynamicTable from "Remote/DynamicTable";

const IstIndex = () => {
  const RemoteModalViewV2 = React.lazy(() => import("Remote/ModalViewV2"));
  const dispatch = useDispatch();
  const history = useHistory();
  const [istId, setistId] = useState(0);
  const [params, setParams] = useState({ limit: 10, offset: 1 });
  const [selectedId, setId] = useState(0);
  const [dynamicAppBar, setDynamicAppBar] = useState([]);
  const [searchType, setSearchType] = useState("uom_name");
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);

  //   const { istdata, istdata_meta } = useSelector((state) => state.data);
  //   useEffect(() => {
  //     dispatch(loadIstData(params));
  //   }, []);

  const headCells = [
    {
      key: "created_date",
      numeric: false,
      label: "IST Date",
      type: "date",
    },
    {
      key: "ist_number",
      numeric: false,
      label: "IST",
      type: "text",
    },
    {
      key: "reference_number",
      numeric: false,
      label: "Ref. Number",
      type: "text",
    },
    {
      key: "source_warehouse.address.address_line_1",
      numeric: false,
      count: 3,
      label: "Source Location",
      type: "text",
    },
    {
      key: "destination_warehouse.address.address_line_1",
      count: 3,
      numeric: false,
      label: "Destination Location",
      type: "text",
    },
    {
      key: "no_of_items",
      numeric: false,
      label: "Number of Items",
      type: "text",
    },
    {
      key: "total_quantity",
      numeric: false,
      label: "Total Quantity",
      type: "text",
    },
    {
      key: "status_id",
      numeric: false,
      label: "Status",
      type: "text",
    },
    {
      key: "shipping_mode_id",
      numeric: false,
      label: "Shipping Mode",
      type: "text",
    },
    {
      key: "grn_id",
      numeric: false,
      label: "GRN Status",
      type: "text",
    },
    {
      key: "scheduled_delivery_date",
      numeric: false,
      label: "Delivery Date",
      type: "date",
    },
    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action",
    },
  ];

  const handleViewProduct = (id) => {
    history.push(`/ist/View/${id}`);
  };

  const [customOptions, setCustomOptions] = useState([
    {
      label: "View Order",
      func: (product_id) => handleViewProduct(product_id),
    },
  ]);

  return (
    <>
      <Box className="viewProductTable">
        <Suspense fallback={<div>Loading... </div>}>
          <RemoteWrapper>
            <RemoteDynamicAppBar
              dynamicAppBar={dynamicAppBar}
              sortOptions={sortOptions}
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
              filterSearchItems={filterSearchItems}
              searchItems={searchItems}
              searchOptions={searchOptions}
              searchType={searchType}
              setSearchType={setSearchType}
              handleButtonClick={handleButtonClick}
            />
          </RemoteWrapper>
        </Suspense>
        <>
          {istdata.length > 0 && (
            <div>
              {deleteModalOpen && (
                <Suspense fallback={<div>Loading... </div>}>
                  <RemoteWrapper>
                    <RemoteModalViewV2
                      handleDeleteProduct={handleDeleteProduct}
                      handleModalClose={handleDeleteModalClose}
                      modalOpen={deleteModalOpen}
                      primary={
                        "Selected order will be deleted permanentely. Are you sure you want to do this?"
                      }
                      secondary={""}
                      disclaimer={
                        "Note: This will get deleted permanantly from the list"
                      }
                      actionBtns={["Cancel", "Delete"]}
                    />
                  </RemoteWrapper>
                </Suspense>
              )}

              <RemoteDynamicTable
                table_data={istdata}
                headCells={headCells}
                info={istdata_meta.info}
                customOptions={customOptions}
                setCustomOptions={setCustomOptions}
                setParams={setParams}
                handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                setId={setId}
                enablepagination={false}
              />
            </div>
          )}
        </>
      </Box>
    </>
  );
};

export default IstIndex;

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
