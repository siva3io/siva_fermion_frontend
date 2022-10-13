import React, { useEffect, useState, Suspense } from "react";
import ReactDOM from "react-dom";
import { Box } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadLocationsData, deleteLocations, viewAccessManagement } from "../redux/Actions/action";
import RemoteDynamicTable from "Remote/DynamicTable";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import ErrorBoundary from "../ErrorBoundary";

import "../index.css";
export default function LocationsIndex() {

  const dispatch = useDispatch();
  const { access } = useSelector(
    (state) => state.data
  );
  const history = useHistory();
  const [params, setParams] = useState({ limit: 10, offset: 1, filters: null, sort: null });
  const [dynamicAppBar, setDynamicAppBar] = useState([]);
  const [selectedId, setId] = useState(0);
  const [searchType, setSearchType] = useState("name");


  const handleChangeDyanmicAppBar = (value) => {
    setDynamicAppBar(value);
  };


  useEffect(() => {
    dispatch(viewAccessManagement())
    dispatch(loadLocationsData(params));
  }, []);
  useEffect(() => {
    dispatch(loadLocationsData(params));
  }, [params]);
  function handleViewProduct(id) {
    history.push(`/location/${id}`)
  }
  function handleEditProduct(id) {
    history.push(`/locations/edit/${id}`)
  }
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleButtonClick = (value) => {
    history.push("/locations/add");
  }

  const filterSearchItems = (searchValue, searchType) => {
    if (searchValue.length === 0) {
      dispatch(loadLocationsData({ "": "" }, "filters"));
    } else {
      dispatch(
        dispatch(loadLocationsData({ limit: params.limit, offset: params.offset, filters: JSON.stringify([[searchType, "ilike", searchValue]]) }))
      );
    }
  };

  const searchItems = (searchValue) => {
    if (searchValue.length === 0) {
      dispatch(loadLocationsData({ "": "" }, "search"));
    } else {
      dispatch(
        dispatch(loadLocationsData({ limit: params.limit, offset: params.offset, filters: JSON.stringify([[searchType, "ilike", searchValue]]) }))
      );
    }
  };


  const sortOptions = [
    {
      label: "Location ID",
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
        dispatch(loadLocationsData({ limit: params.limit, offset: params.offset, filters: params.filters, sort: JSON.stringify([["location_id", value]]) }))
      },
    },
    {
      label: "Location Name",
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
        dispatch(loadLocationsData({ limit: params.limit, offset: params.offset, filters: params.filters, sort: JSON.stringify(["name", value]) }))
      },
    }
  ];

  const searchOptions = [
    { label: "Search  by Location ID : ", value: "location_id" },
    { label: "Search by Location Name : ", value: "name" },
    { label: "Search by Email : ", value: "email" },
    { label: "Search by Phone Number : ", value: "mobile_number" },
  ]

  const [filterOptions, setFilterOptions] = useState(
    [
      {
        label: "Filter by Location Name",
        collapseState: false,
        value: "name",
      },
      {
        label: "Filter by Phone Number",
        collapseState: false,
        value: "mobile_number",
      },
      {
        label: "Filter by Email",
        collapseState: false,
        value: "email",
      },
    ]

  );




  useEffect(() => {
    setCustomOptions(
      [{
        label: "View Location Details",
        func: (id) => handleViewProduct(id),
        flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag
      },
      {
        label: "Edit Location Details",
        func: (id) => handleEditProduct(id),
        flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "UPDATE")?.ctrl_flag
      },
      {
        label: "Delete Location",
        func: (product_id) => handleDeleteLocation(product_id),
        flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "DELETE")?.ctrl_flag
      }]
    )
  }, [access])



  const [customOptions, setCustomOptions] = useState([
    {
      label: "View Location Details",
      func: (id) => handleViewProduct(id),
      flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag
    },
    {
      label: "Edit Location Details",
      func: (id) => handleEditProduct(id),
      flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "UPDATE")?.ctrl_flag
    },
    {
      label: "Delete Location",
      func: (product_id) => handleDeleteLocation(product_id),
      flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "DELETE")?.ctrl_flag
    },
  ]);


  const headCells = [
    {
      key: "name",
      numeric: true,
      label: "Location Name",
      type: "text"
    },
    {
      key: "location_id",
      numeric: true,
      label: "Location ID",
      type: "text"
    },
    {
      key: "mobile_number",
      numeric: true,
      label: "Location Contact",
      type: "text"
    },
    {
      key: "email",
      numeric: true,
      label: "Location Email",
      type: "text"
    },
    {
      key: "LocationType.display_name",
      count: 2,
      numeric: true,
      label: "Location Type",
      type: "text"
    },
    {
      key: "address.land_mark",
      count: 2,
      numeric: true,
      label: "Location Address",
      type: "text"
    },
    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action"
    }
  ];

  const { locationData, locationData_meta } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(loadLocationsData(params));
  }, []);

  useEffect(() => {
    dispatch(loadLocationsData(params));
  }, [params])

  const RemoteModalViewV2 = React.lazy(() => import("Remote/ModalViewV2"));

  const [locationsId, setlocationsId] = useState(0);

  const [deleteModalOpen, setdeleteModalOpen] = useState(false);

  const RemoteWrapper = ({ children }) => (
    <div>
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  );

  const handleDeleteLocation = (id) => {
    setlocationsId(id)
    setdeleteModalOpen(true)
  }

  const handleDeleteProduct = (value) => {
    dispatch(deleteLocations(locationsId));
    setTimeout(() => {
      dispatch(loadLocationsData(params));
    }, 300);
    setdeleteModalOpen(false);
  }

  const handleDeleteModalClose = (value) => {
    setdeleteModalOpen(false)
  }

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
            buttons={[{ name: "Create", handleButtonClick: handleButtonClick, flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "CREATE")?.ctrl_flag }]}
          />
        </Suspense>


        {
          locationData && locationData.length > 0 && access && access[0]?.module_ctrl_flag && (
            <div>
              <RemoteDynamicTable
                table_data={locationData}
                headCells={headCells}
                info={locationData_meta.info}
                customOptions={customOptions}
                setCustomOptions={setCustomOptions}
                setParams={setParams}
                handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                setId={setId}
                enablepagination={true}
              />
            </div>
          )
        }
      </Box>


      {deleteModalOpen && (
        <Suspense fallback={<div>Loading... </div>}>
          <RemoteWrapper>
            <RemoteModalViewV2
              handleDeleteProduct={handleDeleteProduct}
              handleModalClose={handleDeleteModalClose}
              modalOpen={deleteModalOpen}
              primary={
                "Selected Location will be deleted permanentely. Are you sure you want to do this?"
              }
              secondary={""}
              disclaimer={"Note: This will get deleted permanantly from the list"}
              actionBtns={["Cancel", "Delete"]}
            />
          </RemoteWrapper></Suspense>
      )}
    </>
  );
};



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