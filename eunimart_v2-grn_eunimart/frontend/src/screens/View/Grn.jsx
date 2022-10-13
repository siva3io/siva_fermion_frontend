import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./Grn.css";
import { lazy, Suspense } from "react";
import ErrorBoundary from "../../ErrorBoundary";
import { fetchGrnData } from "../../redux/Action/FetchGrnListAction";
import {deleteGrn} from "../../redux/Action/FetchGrnDeleteAction";
import {  useNavigate } from 'react-router-dom';
import { fetchAccessManagement } from "../../redux/Action/FetchAccessManagement";
const RemoteDynamicTable = React.lazy(() => import("Remote/DynamicTable"));
const RemoteDynamicAppBar = React.lazy(() => import("Remote/DynamicAppBar"));

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const Grn = () => {

  const dispatch = useDispatch();
  const grnData = useSelector((state) => state.fetchGrnData?.grn);
  console.log(grnData, grnData?.meta, grnData?.meta?.info, "grnDatawww");
  const [params, setParams] = useState({ limit: 10, offset: 1 });
  const [selectedId, setId] = useState(0);
  const [dynamicAppBar, setDynamicAppBar] = useState([]);
  const [searchType, setSearchType] = useState("uom_name");


  
const access = useSelector(
    (state) => state.access?.access
  );
  console.log("Access",access)
  const searchOptions = [
    { label: "GRN Number : ", value: "name" },

  ]




  const sortOptions = [
    {
      label: "Created Date",
      subItems: [
        {
          label: "Latest",
          key: "asc",
        },
        {
          label: "Oldest",
          key: "desc",
        },
      ],
      func: (value) => {
        dispatch(fetchGrnData("created_date", value, "sorting"));
      },
    },
    {
      label: "GRN Number",
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
          fetchGrnData("GRN_Number", value, "sorting")
        );
      },
    },
    {
      label: "Reference Number",
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
        dispatch(fetchGrnData("reference_number", value, "sorting"));
      },
    },

    {
      label: "Clear All",
      endIcon: null,
      func: (value) => {
        dispatch(fetchGrnData("", "", "sorting"));
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchAccessManagement());
  }, [params]);

  const [filterOptions, setFilterOptions] = useState(
    [
      {
        label: "Filter By Date",
        collapseState: false,
        value: "name",
      },
      {
        label: "Filter by GRN Status",
        collapseState: false,
        value: "uom_class_name",
      },
      {
        label: "Filter by Reference Number",
        collapseState: false,
        value: "base_uom",
      },
      {
        label: "Filter by Warehouse Name",
        collapseState: false,
        value: "code",
      },
      {
        label: "Filter By Status",
        collapseState: false,
        value: "code",
      },


    ]

  );

  const filterSearchItems = (searchValue, searchTyp) => {
    if (searchValue.length === 0) {
      dispatch(fetchSearchProduct({ "": "" }, "filters"));
    } else {
      dispatch(
        fetchSearchProduct({ [searchTyp]: searchValue }, "filters")
      );
    }
  };

  const searchItems = (searchValue) => {
    if (searchValue.length === 0) {
      dispatch(fetchGrnData({ "": "" }, "filters"));
    } else {
      dispatch(
        fetchGrnData("search", searchValue, "filters")
      );
    }
  };


  const handleChangeDyanmicAppBar = (value) => {
    setDynamicAppBar(value);
  };


  useEffect(() => {
    dispatch(fetchGrnData(params, "s2", "pagination"));

    console.log(grnData, "params use effect", params);
  }, [params]);

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
  const handlePutaway = (id) => {
    setId(id);

    setmodalOpenPutaway((prev) => !prev);
  };

  const history = useNavigate();
  const handleView = (id) => {
    history(`/grn/viewGrn/${id}`)

  }

  const handleEdit = (id) => {
    history(`/grn/editGrn/${id}`)
  }

  const handleButtonClick = (value) => {
    console.log("clicked")
    history("/grn/create");
  }

  useEffect(() => {
    setCustomOptions(
      [  {
        label: "View",
        func: (idchange) => handleView(idchange),
        flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag,
      },
      {
        label: "Edit",
        func: (idchange) => handleEdit(idchange),
        flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "UPDATE")?.ctrl_flag
      },
      {
        label: "Delete",
        func: (product_id) => handleDeleteGrn(product_id),
        flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "DELETE")?.ctrl_flag,
      }]
    )
  }, [access])


  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (idchange) => handleView(idchange),
      flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag,
    },
    {
      label: "Edit",
      func: (idchange) => handleEdit(idchange),
      flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "UPDATE")?.ctrl_flag
    },
    {
      label: "Delete",
      func: (product_id) => handleDeleteGrn(product_id),
      flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "DELETE")?.ctrl_flag,
    },

  ]);

  const RemoteModalViewV2 = React.lazy(() => import("Remote/ModalViewV2"));

  const [grnId, setgrnId] = useState(0);

  const [deleteModalOpen, setdeleteModalOpen] = useState(false);

  const handleDeleteGrn = (id) => {
    setgrnId(id)
    setdeleteModalOpen(true)
  }

  const handleDeleteProduct = (value) => {
    dispatch(deleteGrn(grnId));
    setTimeout(() => {
      dispatch(fetchGrnData(params, "s2", "pagination"));
    }, 300);
    setdeleteModalOpen(false);
  }

  const handleDeleteModalClose = (value) => {
    setdeleteModalOpen(false)
  }
  console.log("ctrlflages",access[0]?.view_actions_json?.find(o=>o.lookup_code === "CREATE" )?.ctrl_flag );
  return (
    <>
    {
        
          grnData?.data?.length > 0 && access && access[0]?.module_ctrl_flag && access[0]?.view_actions_json?.find(o=>o.lookup_code === "LIST" )?.ctrl_flag ===1 && (

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
            // handleButtonClick={handleButtonClick}
            buttons={[{name:"Create",handleButtonClick:handleButtonClick,flag:access[0]?.view_actions_json?.find(o=>o.lookup_code === "CREATE" )?.ctrl_flag}]}
          />
        </RemoteWrapper>
      </Suspense>
          )
          }
      {deleteModalOpen && (
        <Suspense fallback={<div>Loading... </div>}>
          <RemoteWrapper>
            <RemoteModalViewV2
              handleDeleteProduct={handleDeleteProduct}
              handleModalClose={handleDeleteModalClose}
              modalOpen={deleteModalOpen}
              primary={
                "Selected GRN will be deleted permanentely. Are you sure you want to do this?"
              }
              secondary={""}
              disclaimer={"Note: This will get deleted permanantly from the list"}
              actionBtns={["Cancel", "Delete"]}
            />
          </RemoteWrapper></Suspense>
      )}
      
      {grnData && grnData?.data && grnData.meta && 
      grnData?.data?.length > 0 && access && access[0]?.module_ctrl_flag && 
      access[0]?.view_actions_json?.find(o=>o.lookup_code === "LIST" )?.ctrl_flag ===1 &&
      (
        <Suspense fallback={<div>Loading... </div>}>
          <RemoteWrapper>
            <RemoteDynamicTable
              table_data={grnData?.data}
              headCells={headCells}
              customOptions={customOptions}
              setCustomOptions={setCustomOptions}
              info={grnData?.meta?.info}
              setParams={setParams}
              handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
              setId={setId}
              enablepagination={true}
            />
          </RemoteWrapper>
        </Suspense>
      )}
    </>
  );
};

export default Grn;

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