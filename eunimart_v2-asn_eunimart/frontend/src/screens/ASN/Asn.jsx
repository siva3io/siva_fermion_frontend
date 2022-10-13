import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsnData } from "../../redux/Action/FetchAsnDataAction";
import { deleteAsn } from "../../redux/Action/FetchAsnDeleteAction";
import "./Asn.css";
import { Suspense } from "react";
import ErrorBoundary from "../../ErrorBoundary";
import { useNavigate } from "react-router-dom";
import { fetchAccessToken } from "../../redux/Action/AccessMngAction";
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

const Asn = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [params, setParams] = useState({ limit: 10, offset: 0 });
  useEffect(() => {
    dispatch(fetchAccessToken())
  }, []);
  const asnData = useSelector((state) => state.fetchAsnData?.asnData);
  const access = useSelector((state) => state.fetchAccessToken?.accessData?.data);
  const asnData1 = asnData.data;
  const [selectedId, setId] = useState(0);
  const [dynamicAppBar, setDynamicAppBar] = useState([]);
  const [searchType, setSearchType] = useState("uom_name");

  const sortOptions = [
    {
      label: "Create date",
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
        dispatch(fetchAsnData("created_date", value, "sorting"));
      },
    },
    {
      label: "ASN Number",
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
          fetchAsnData("ASN_Number", value, "sorting")
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
        dispatch(fetchAsnData("reference_number", value, "sorting"));
      },
    },

    {
      label: "Clear All",
      endIcon: null,
      func: (value) => {
        dispatch(fetchSearchProduct("", "", "sorting"));
      },
    },
  ];

  const searchOptions = [
    { label: "ASN Number : ", value: "name" },
  ]

  const [filterOptions, setFilterOptions] = useState(
    [
      {
        label: "Filter by Date",
        collapseState: false,
        value: "name",
      },
      {
        label: "Filter by Linked PO",
        collapseState: false,
        value: "uom_class_name",
      },
      {
        label: "Filter by Expiry Date",
        collapseState: false,
        value: "base_uom",
      },
      {
        label: "Filter by No. of items",
        collapseState: false,
        value: "code",
      },
      {
        label: "Filter by Status",
        collapseState: false,
        value: "code",
      },
      {
        label: "Filter by GRN Status",
        collapseState: false,
        value: "code",
      },
      {
        label: "Filter by Shipping Mode",
        collapseState: false,
        value: "code",
      },
      {
        label: "Filter by Shipping Date",
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
      dispatch(fetchAsnData("", "", "filters")
      );
    } else {
      dispatch(
        fetchAsnData("search", searchValue, "filters")
      );
    }
  };




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

  //sends no. of selected checkboxes 
  const handleChangeDyanmicAppBar = (value) => {
    setDynamicAppBar(value);
    console.log(value,dynamicAppBar,"DynamicAppBar")
  };

  //Refreshes list data on page change
  useEffect(() => {
    dispatch(fetchAsnData(params, "s2", "pagination"));
  }, [params]);

  //Navigates to View page
  const handleView = (id) => {
    history(`/asn/viewAsn/${id}`);
  };

  const handleButtonClick = (value) => {
    history("/asn/create");
  }
  const handleEditsn = (id) => {
    history(`/asn/edit/${id}`);
  };
  useEffect(()=>{
    setCustomOptions(
      [
        {
          label: "View",
          func: (product_id) => handleView(product_id),
          flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "READ" )?.ctrl_flag
        },
        {
          label: "Edit",
          func: (product_id) => handleEditsn(product_id),
          flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "UPDATE" )?.ctrl_flag
        },
        {
          label: "Delete",
          func: (product_id) => handleDeleteAsn(product_id),
          flag:1
        },
    ]
    )
  },[access])


  //Action buttons
  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (product_id) => handleView(product_id),
      flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "READ" )?.ctrl_flag
    },
    {
      label: "Edit",
      func: (product_id) => handleEditsn(product_id),
      flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "UPDATE" )?.ctrl_flag
    },
    {
      label: "Delete",
      func: (product_id) => handleDeleteAsn(product_id),
      flag:1
    },
    // {
    //   label: "Clone",

    // },
    // {
    //   label: "Send ASN by Email",

    // },
    // {
    //   label: "Generate ASN PDF",

    // },
    // {
    //   label: "Mark as Active",

    // },
    // {
    //   label: "Create GRN",

    // },
    // {
    //   label: "Create Cross Docking request",

    // },
    // {
    //   label: "Create Scrap Order",

    // },
  ]);


  const RemoteModalViewV2 = React.lazy(() => import("Remote/ModalViewV2"));

  const [asnId, setAsnId] = useState(0);

  const [deleteModalOpen, setdeleteModalOpen] = useState(false);

  const RemoteWrapper = ({ children }) => (
    <div>
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  );

  const handleDeleteAsn = (id) => {
    setAsnId(id)
    setdeleteModalOpen(true)
  }

  const handleDeleteProduct = (value) => {
    dispatch(deleteAsn(asnId));
    setTimeout(() => {
      dispatch(fetchAsnData(params, "s2", "pagination"));
    }, 300);
    setdeleteModalOpen(false);
  }

  const handleDeleteModalClose = (value) => {
    setdeleteModalOpen(false)
  }


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
              // handleButtonClick={handleButtonClick}
              buttons={[{name:"Create",handleButtonClick:handleButtonClick,flag:access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "CREATE" )?.ctrl_flag}]}
            />
          </RemoteWrapper></Suspense>
        <>
          {deleteModalOpen &&  (
            <Suspense fallback={<div>Loading... </div>}>
              <RemoteWrapper>
                <RemoteModalViewV2
                  handleDeleteProduct={handleDeleteProduct}
                  handleModalClose={handleDeleteModalClose}
                  modalOpen={deleteModalOpen}
                  primary={
                    "Selected ASN will be deleted permanentely. Are you sure you want to do this?"
                  }
                  secondary={""}
                  disclaimer={"Note: This will get deleted permanantly from the list"}
                  actionBtns={["Cancel", "Delete"]}
                />
              </RemoteWrapper></Suspense>
          )}
          

          {asnData && asnData?.data && asnData.meta && access && access[0]?.module_ctrl_flag && access?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "LIST" )?.ctrl_flag ===1 &&(
            <Suspense fallback={<div>Loading... </div>}>
              <RemoteWrapper>
                <RemoteDynamicTable
                  table_data={asnData?.data}
                  headCells={headCells}
                  customOptions={customOptions}
                  setCustomOptions={setCustomOptions}
                  info={asnData?.meta?.info}
                  setParams={setParams}
                  handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                  setId={setId}
                  enablepagination={true}
                 
              
                />
              </RemoteWrapper>
            </Suspense>
          )}
        </>
      </Box>
    </>
  );
};

export default Asn;

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
