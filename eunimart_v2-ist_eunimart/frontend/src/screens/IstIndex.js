import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadIstData,
  deleteIst,
  viewAccessManagement,
} from "../redux/Action/istListAction";
import "../index.css";
import { lazy, Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary";
import { useHistory } from "react-router-dom";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import RemoteDynamicTable from "Remote/DynamicTable";

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

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

  const { istdata, istdata_meta, access } = useSelector(state => state.data);
  useEffect(() => {
    dispatch(viewAccessManagement());
    dispatch(loadIstData(params));
  }, []);

  useEffect(() => {
    dispatch(loadIstData(params));
  }, [params]);

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
      func: value => {
        dispatch(loadIstData("created_date", value, "sorting"));
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
      func: value => {
        dispatch(loadIstData("ASN_Number", value, "sorting"));
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
      func: value => {
        dispatch(loadIstData("reference_number", value, "sorting"));
      },
    },

    {
      label: "Clear All",
      endIcon: null,
      func: value => {
        dispatch(fetchSearchProduct("", "", "sorting"));
      },
    },
  ];

  const searchOptions = [{ label: "ASN Number : ", value: "name" }];

  const [filterOptions, setFilterOptions] = useState([
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
  ]);

  const filterSearchItems = (searchValue, searchTyp) => {
    if (searchValue.length === 0) {
      dispatch(fetchSearchProduct({ "": "" }, "filters"));
    } else {
      dispatch(fetchSearchProduct({ [searchTyp]: searchValue }, "filters"));
    }
  };
  const searchItems = searchValue => {
    if (searchValue.length === 0) {
      dispatch(loadIstData("", "", "filters"));
    } else {
      dispatch(loadIstData("search", searchValue, "filters"));
    }
  };

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
      key: "status.display_name",
      count: 2,
      numeric: false,
      label: "Status",
      type: "text",
    },
    {
      key: "shipping_mode.display_name",
      count: 2,
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

  //sends no. of selected checkboxes
  const handleChangeDyanmicAppBar = value => {
    setDynamicAppBar(value);
  };

  //Refreshes list data on page change
  useEffect(() => {
    dispatch(loadIstData(params, "s2", "pagination"));
  }, [params]);

  //Navigates to View page
  // const handleView = (id) => {
  //   history.push(`/asn/viewAsn/${id}`);
  // };

  const handleButtonClick = value => {
    history.push("/ist/Create");
  };

  const handleViewProduct = id => {
    history.push(`/ist/View/${id}`);
  };

  const handleEditProductTemplate = id => {
    console.log("handleEditProductTemplate", id);
    history.push("/ist/edit/" + id);
  };

  const handleDeleteProduct = value => {
    console.log("enter");
    dispatch(deleteIst(istId));
    setTimeout(() => {
      dispatch(loadIstData(params));
    }, 300);
    setdeleteModalOpen(false);
  };

  const handleDeleteModalClose = value => {
    console.log("enter close");
    setdeleteModalOpen(false);
  };

  const handleDeleteModalOpen = value => {
    setistId(value);
    setdeleteModalOpen(true);
  };

  console.log(access, "access");
  useEffect(() => {
    setCustomOptions([
      {
        label: "View ",
        func: product_id => handleViewProduct(product_id),
        flag: access
          ?.find(row => row === row)
          ?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag,
      },
      {
        label: "Edit",
        func: product_id => handleEditProductTemplate(product_id),
        flag: access
          ?.find(row => row === row)
          ?.view_actions_json?.find(o => o.lookup_code === "UPDATE")?.ctrl_flag,
      },
      {
        label: "Delete",
        func: product_id => handleDeleteModalOpen(product_id),
        flag: access
          ?.find(row => row === row)
          ?.view_actions_json?.find(o => o.lookup_code === "DELETE")?.ctrl_flag,
      },
    ]);
  }, [access]);

  //Action buttons
  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: product_id => handleViewProduct(product_id),
      flag: access
        ?.find(row => row === row)
        ?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag,
    },
    {
      label: "Edit",
      func: product_id => handleEditProductTemplate(product_id),
      flag: 1,
    },
    {
      label: "Delete",
      func: product_id => handleDeleteModalOpen(product_id),
      flag: 1,
    },
    // {
    //   label: "Mark as Favourite",
    //   //func: (product_id) => handleFavouriteModalOpen(product_id),
    // },
    // {
    //   label: "Archive Order",
    //   //func: (product_id) => handleArchiveModalOpen(product_id),
    // },
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
              buttons={[
                {
                  name: "Create",
                  handleButtonClick: handleButtonClick,
                  flag: access
                    ?.find(row => row === row)
                    ?.view_actions_json?.find(o => o.lookup_code === "CREATE")
                    ?.ctrl_flag,
                },
              ]}
            />
          </RemoteWrapper>
        </Suspense>
        <>
          {istdata.length > 0 && access && access[0]?.module_ctrl_flag && (
            <div>
              <RemoteDynamicTable
                table_data={istdata}
                headCells={headCells}
                info={istdata_meta.info}
                customOptions={customOptions}
                setCustomOptions={setCustomOptions}
                setParams={setParams}
                handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                setId={setId}
                enablepagination={true}
              />
            </div>
          )}
        </>
      </Box>
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
    </>
  );
};

export default IstIndex;

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
