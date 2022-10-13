import React, { useEffect, useState, Suspense } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadPricingData,deletePricing,viewAccessManagement } from "../redux/Actions/action";
import { PricingDataReducer } from "../redux/Reducers/reducer";
import RemoteDynamicTable from "Remote/DynamicTable";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import { Box } from "@mui/material";
import "../index.css";
import { useHistory } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary";

export default function PricingIndex() {
  const history = useHistory();
  const [params, setParams] = useState({
    limit: 10,
    offset: 1,
    filters: null,
    sort: null,
  });
  const [dynamicAppBar, setDynamicAppBar] = useState([]); //state to manage dynamic appbar
  const [selectedId, setId] = useState(0);
  const [searchType, setSearchType] = useState("price_list_name");
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const navigate = useHistory();
  const [pricingId, setPricingId] = useState(0);
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const RemoteModalViewV2 = React.lazy(() => import("Remote/ModalViewV2"));
  const RemoteWrapper = ({ children }) => (
    <div>
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  );

  const handleDelete = (id) => {
    setPricingId(id)
    setdeleteModalOpen(true)
  }

  const handleDeleteProduct = (value) => {
    dispatch(deletePricing(pricingId));
    setTimeout(() => {
      dispatch(loadPricingData(params));
    }, 300);
    setdeleteModalOpen(false);
  }

  const handleDeleteModalClose = (value) => {
    setdeleteModalOpen(false)
  }
  const handleButtonClick = (value) => {
    navigate.push("/pricing/add");
  };


  const filterSearchItems = (searchValue, searchType) => {
    if (searchValue.length === 0) {
      dispatch(loadPricingData({ "": "" }, "filters"));
    } else {
      dispatch(
        dispatch(
          loadPricingData({
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
      dispatch(loadPricingData({ "": "" }, "search"));
    } else {
      dispatch(
        dispatch(
          loadPricingData({
            limit: params.limit,
            offset: params.offset,
            filters: JSON.stringify([[searchType, "ilike", searchValue]]),
          })
        )
      );
    }
  };

  const handleChangeDyanmicAppBar = (value) => {
    setDynamicAppBar(value);
  };

  const handleViewPricing = (id) => {
    history.push(`/pricing/view/${id}`);
  };
  const handleEdit=(id)=>{
    history.push("/pricing/edit/" + id);
  }
  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (price_list_id) => {console.log(price_list_id);
        handleViewPricing(price_list_id)
      },
      flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "READ" )?.ctrl_flag
    },
    {
      label: "Edit",
      func: (id) => handleEdit(id),
      flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "UPDATE" )?.ctrl_flag

    },
    {
      label: "Delete",
      func: (id) => handleDelete(id),
      flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "DELETE" )?.ctrl_flag


    },
  ]);

  const headCells = [
    {
      key: "price_list_name",
      numeric: true,
      label: "Price List Name",
      type: "text",
    },
    {
      key: "description",
      numeric: true,
      type: "text",
      label: "Description",
    },
    {
      key: "currency.name",
      count: 2,
      numeric: true,
      type: "text",
      label: "Currency",
    },
    {
      key: "price_list_id",
      numeric: true,
      type: "text",
      label: "Price List Type",
    },
    {
      key: "price_list_rule",
      numeric: true,
      type: "text",
      label: "Price List Rule",
    },
    {
      key: "start_date",
      numeric: true,
      type: "date",
      label: "Start Date",
    },
    {
      key: "end_date",
      numeric: true,
      type: "date",
      label: "End Date",
    },
    {
      key: "applicat_name",
      numeric: true,
      type: "text",
      label: "Applicant Name",
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

  const sortOptions = [
    {
      label: "Sort by Price list Name",
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
          loadPricingData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["price_list_name", value]]),
          })
        );
      },
    },
    {
      label: "Description",
      subItems: [
        {
          label: "Ascending",
          key: "asc",
        },
        {
          label: "Descending",
          key: "desc",
        },
      ],
      func: (value) => {
        dispatch(
          loadPricingData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["description", value]]),
          })
        );
      },
    },
    {
      label: "Price List Type",
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
          loadPricingData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["price_list_id", value]]),
          })
        );
      },
    },
  ];

  const searchOptions = [
    { label: "Price List Name : ", value: "price_list_name" },
  ];

  const [filterOptions, setFilterOptions] = useState([
    {
      label: "Price List Name",
      collapseState: false,
      value: "price_list_name",
    },
    {
      label: "Description",
      collapseState: false,
      value: "description",
    },
  ]);

  let dispatch = useDispatch();
  const { pricingData, pricingData_meta,access } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(viewAccessManagement())
    dispatch(loadPricingData(params));
  }, []);

  useEffect(()=>{
    setCustomOptions([
      {
        label: "View",
        func: (price_list_id) => {console.log(price_list_id);
          handleViewPricing(price_list_id)
        },
        flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "READ" )?.ctrl_flag
        
      },
      {
        label: "Edit",
        func: (id) => handleEdit(id),
        flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "UPDATE" )?.ctrl_flag
  
      },
      {
        label: "Delete",
        func: (id) => handleDelete(id),
        flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "DELETE" )?.ctrl_flag
  
  
      },
    ])
  },[access])

  useEffect(() => {
    dispatch(loadPricingData(params));
  }, [params]);
  return (
    <Box sx={{ background: "#F9F9F9" }}>
      {pricingData && pricingData.length > 0 && access && access[0]?.module_ctrl_flag && access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "LIST" )?.ctrl_flag ===1 && (

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
          // handleButtonClick={handleButtonClick}
          buttons={[{name:"Create",handleButtonClick:handleButtonClick,flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "CREATE" )?.ctrl_flag}]}
        />
      </Suspense>
      )}
      
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

      {pricingData && pricingData.length > 0 && access && access[0]?.module_ctrl_flag && access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "LIST" )?.ctrl_flag ===1 && (
        <RemoteDynamicTable
          table_data={pricingData}
          headCells={headCells}
          info={pricingData_meta.info}
          setCustomOptions={setCustomOptions}
          customOptions={customOptions}
          setParams={setParams}
          handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
          setId={setId}
          enablepagination={true}
        />
      )}
    </Box>
  );
}

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