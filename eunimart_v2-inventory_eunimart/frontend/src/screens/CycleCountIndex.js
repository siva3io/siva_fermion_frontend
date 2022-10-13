import React, { useEffect, useState, Suspense } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";

import RemoteDynamicTable from "Remote/DynamicTable";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import "../index.css";
import TableFilter from "./TableFilter";
import ErrorBoundary from "../ErrorBoundary";
import {
  loadCycleCountData,
  deletecycleCountbyId,
  viewCycleCountAccessManagement,
} from "../redux/actions/action";

const RemoteModalViewV2 = React.lazy(() => import("Remote/ModalViewV2"));

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const CycleCountIndex = () => {
  const { cyclecountaccess } = useSelector((state) => state.data);

  let dispatch = useDispatch();

  const { cyclecountdata, cyclecountdata_meta } = useSelector(
    (state) => state.data
  );

  useEffect(() => {
    dispatch(loadCycleCountData(params));
    dispatch(viewCycleCountAccessManagement());
  }, []);

  useEffect(() => {
    dispatch(loadCycleCountData(params));
  }, [params]);

  const [deleteModalOpen, setdeleteModalOpen] = useState(false);

  const [cycleCountId, setcycleCountId] = useState();

  const handleDeleteProduct = (value) => {
    dispatch(deletecycleCountbyId(cycleCountId));
    setTimeout(() => {
      dispatch(loadCycleCountData(params));
    }, 300);
    setdeleteModalOpen(false);
  };

  const handleDeleteModalClose = (value) => {
    setdeleteModalOpen(false);
  };

  const handleDeleteModelOpen = (value) => {
    setcycleCountId(value);
    setdeleteModalOpen(true);
  };

  const [params, setParams] = useState({
    limit: 10,
    offset: 1,
    filters: null,
    sort: null,
  });
  const [dynamicAppBar, setDynamicAppBar] = useState([]); //state to manage dynamic appbar
  const [searchType, setSearchType] = useState("cycle_count_number");
  const [selectedId, setId] = useState(0);
  const navigate = useHistory();

  const handleChangeDyanmicAppBar = (value) => {
    setDynamicAppBar(value);
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const sortOptions = [
    {
      label: "Cycle Count Number",
      subItems: [
        {
          label: "A to Z",
          key: "asc",
        },
        {
          label: "Z to A",
          key: "desc",
        },
      ],
      func: (value) => {
        dispatch(
          loadCycleCountData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["cycle_count_number", value]]),
          })
        );
      },
    },
    {
      label: "Create Date",
      subItems: [
        {
          label: "A to Z",
          key: "asc",
        },
        {
          label: "Z to A",
          key: "desc",
        },
      ],
      func: (value) => {
        dispatch(
          loadCycleCountData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["create_date", value]]),
          })
        );
      },
    },
    {
      label: "Status",
      subItems: [
        {
          label: "A to Z",
          key: "asc",
        },
        {
          label: "Z to A",
          key: "desc",
        },
      ],
      func: (value) => {
        dispatch(
          loadCycleCountData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["status", value]]),
          })
        );
      },
    },
    {
      label: "Clear All",
      endIcon: null,
      func: (value) => {
        dispatch(loadCycleCountData({ "": "" }));
      },
    },
  ];

  const searchOptions = [
    { label: "Cycle Count Number : ", value: "cycle_count_number" },
    { label: "Create Date : ", value: "create_date" },
    { label: "Status : ", value: "status" },
  ];

  const [filterOptions, setFilterOptions] = useState([
    {
      label: "Cycle Count Number",
      collapseState: false,
      value: "cycle_count_number",
    },
    {
      label: "Create Date",
      collapseState: false,
      value: "create_date",
    },
    {
      label: "Status",
      collapseState: false,
      value: "status",
    },
  ]);

  const filterSearchItems = (searchValue, searchType) => {
    if (searchValue.length === 0) {
      dispatch(loadCycleCountData({ "": "" }, "filters"));
    } else {
      dispatch(
        dispatch(
          loadCycleCountData({
            limit: params.limit,
            offset: params.offset,
            filters: JSON.stringify([[searchType, "ilike", searchValue]]),
          })
        )
      );
    }
  };

  const searchItems = (searchValue) => {
    if (searchValue.length === 0) {
      dispatch(loadCycleCountData({ "": "" }, "search"));
    } else {
      dispatch(
        dispatch(
          loadCycleCountData({
            limit: params.limit,
            offset: params.offset,
            filters: JSON.stringify([[searchType, "ilike", searchValue]]),
          })
        )
      );
    }
  };

  useEffect(() => {
    setCustomOptions([
      {
        label: "View",
        func: (product_id) => handleView(product_id),
        flag: cyclecountaccess
          ?.find((row) => row === row)
          ?.view_actions_json?.find((o) => o.lookup_code === "READ")?.ctrl_flag,
      },
      {
        label: "Delete",
        func: (product_id) => handleDeleteModelOpen(product_id),
        flag: cyclecountaccess
          ?.find((row) => row === row)
          ?.view_actions_json?.find((o) => o.lookup_code === "DELETE")
          ?.ctrl_flag,
      },
      {
        label: "Edit draft",
        //func: (product_id) => handleEditProductTemplate(product_id),
        flag: cyclecountaccess
          ?.find((row) => row === row)
          ?.view_actions_json?.find((o) => o.lookup_code === "UPDATE")
          ?.ctrl_flag,
      },
    ]);
  }, [cyclecountaccess]);

  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (product_id) => handleView(product_id),
      flag: cyclecountaccess
        ?.find((row) => row === row)
        ?.view_actions_json?.find((o) => o.lookup_code === "READ")?.ctrl_flag,
    },
    {
      label: "Delete",
      func: (product_id) => handleDeleteModelOpen(product_id),
      flag: cyclecountaccess
        ?.find((row) => row === row)
        ?.view_actions_json?.find((o) => o.lookup_code === "DELETE")?.ctrl_flag,
    },
    {
      label: "Edit draft",
      //func: (product_id) => handleEditProductTemplate(product_id),
      flag: cyclecountaccess
        ?.find((row) => row === row)
        ?.view_actions_json?.find((o) => o.lookup_code === "UPDATE")?.ctrl_flag,
    },
    // {
    //   label: "Archive",
    //   //func: (product_id) => handleArchiveModalOpen(product_id),
    // },
    // {
    //   label: "Clone",
    //   //func: (product_id) => handleCloneModalOpen(product_id),
    // },
    // {
    //   label: "Cancel",
    //   //func: (product_id) => handleCancelModalOpen(product_id),
    // },
  ]);
  const handleView = (id) => {
    navigate.push("/cycleCount/view/" + id);
  };
  const headCells = [
    {
      key: "cycle_count_number",
      numeric: true,
      label: "Cycle Count Number",
      type: "text",
    },
    // {
    //   key: "category.name",
    //   count: 2,
    //   numeric: true,
    //   label: "Item/Location",
    //   type: "text",
    // },
    {
      key: "partner.name",
      count: 2,
      numeric: true,
      label: "Assign To",
      type: "text",
    },
    {
      key: "created_date",
      numeric: true,
      label: "Create Date",
      type: "date",
    },
    {
      key: "status.display_name",
      count: 2,
      numeric: true,
      label: "Status",
      type: "text",
    },

    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action",
    },
  ];

  const handleButtonClick = (value) => {};

  return (
    <>
      <Box sx={{ background: "#F9F9F9" }}>
        <Suspense fallback={<div>Loading... </div>}>
          <RemoteDynamicAppBar
            handleModalOpen={handleModalOpen}
            dynamicAppBar={dynamicAppBar}
            sortOptions={sortOptions}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            filterSearchItems={filterSearchItems}
            searchItems={searchItems}
            searchOptions={searchOptions}
            searchType={searchType}
            setSearchType={setSearchType}
            buttons={[
              {
                name: "Create",
                handleButtonClick: handleButtonClick,
                flag: cyclecountaccess
                  ?.find((row) => row === row)
                  ?.view_actions_json?.find((o) => o.lookup_code === "CREATE")
                  ?.ctrl_flag,
              },
            ]}
          />
        </Suspense>

        {cyclecountdata.length > 0 && (
          <div>
            <Suspense fallback={<div>Loading... </div>}>
              <RemoteWrapper>
                {cyclecountdata.length > 0 &&
                  cyclecountaccess &&
                  cyclecountaccess[0]?.module_ctrl_flag && (
                    <div>
                      <RemoteDynamicTable
                        table_data={cyclecountdata}
                        headCells={headCells}
                        info={cyclecountdata_meta.info}
                        customOptions={customOptions}
                        setCustomOptions={setCustomOptions}
                        setParams={setParams}
                        handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                        setId={setId}
                        enablepagination={true}
                      />
                    </div>
                  )}
              </RemoteWrapper>
            </Suspense>
          </div>
        )}
      </Box>

      {deleteModalOpen && (
        <Suspense fallback={<div>Loading... </div>}>
          <RemoteWrapper>
            <RemoteModalViewV2
              handleDeleteProduct={handleDeleteProduct}
              handleModalClose={handleDeleteModalClose}
              modalOpen={deleteModalOpen}
              primary={
                "Selected product will be deleted permanentely. Are you sure you want to do this?"
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
    </>
  );
};
export default CycleCountIndex;

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
