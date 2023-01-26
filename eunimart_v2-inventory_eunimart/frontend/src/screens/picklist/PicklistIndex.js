import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadPicklistData,
  deletePickList,
} from "../../redux/actions/FetchPicklist";
import { viewPicklistAccessManagement } from "../../redux/actions/action";
import RemoteDynamicTable from "Remote/DynamicTable";
import "../../index.css";
import { useHistory } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorBoundary from "../../ErrorBoundary";

import { Box } from "@mui/material";

const PicklistIndex = () => {
  const { picklistaccess } = useSelector(state => state.data);

  const RemoteModalViewV2 = React.lazy(() => import("Remote/ModalViewV2"));
  const sortOptions = [
    {
      label: "Sort by Picklist ID",
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
        dispatch(fetchSearchProduct({ picklist_id: value }, "sort"));
      },
    },
    {
      label: "Sort by Picklist Date",
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
        dispatch(fetchSearchProduct({ picklist_date: value }, "sort"));
      },
    },
    {
      label: "Sort by Reference ID",
      subItems: [
        {
          label: "Asceding",
          key: "asc",
        },
        {
          label: "Descending",
          key: "desc",
        },
      ],
      func: value => {
        dispatch(fetchSearchProduct({ picklist_refid: value }, "sort"));
      },
    },
    {
      label: "Sort by Source Documents",
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
      func: value => {
        dispatch(fetchSearchProduct({ picklist_doc: value }, "sort"));
      },
    },
    {
      label: "Sort by Assignee",
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
      func: value => {
        dispatch(fetchSearchProduct({ picklist_assignee: value }, "sort"));
      },
    },
    {
      label: "Sort by Warehouse Name",
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
      func: value => {
        dispatch(fetchSearchProduct({ picklist_wname: value }, "sort"));
      },
    },
    {
      label: "Sort by Status",
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
      func: value => {
        dispatch(fetchSearchProduct({ picklist_status: value }, "sort"));
      },
    },
    {
      label: "Clear All",
      endIcon: null,
      func: value => {
        dispatch(fetchSearchProduct({ "": "" }, "sort"));
      },
    },
  ];

  const [filterOptions, setFilterOptions] = useState([
    {
      label: "Filter by Picklist ID",
      collapseState: false,
      value: "picklist_id",
    },
    {
      label: "Filter by Picklist Date",
      collapseState: false,
      value: "picklist_date",
    },
    {
      label: "Filter by Reference ID",
      collapseState: false,
      value: "picklist_refid",
    },
    {
      label: "Filter by Source Documents",
      collapseState: false,
      value: "picklist_doc",
    },
    {
      label: "Filter by Assignee",
      collapseState: false,
      value: "picklist_assignee",
    },
    {
      label: "Filter by Warehouse Name",
      collapseState: false,
      value: "picklist_wname",
    },
    {
      label: "Filter by Status",
      collapseState: false,
      value: "picklist_status",
    },
    {
      label: "Clear All",
      collapseState: false,
      value: "code",
    },
  ]);

  const [searchType, setSearchType] = useState("uom_name");

  const searchOptions = [
    { label: "Picklist ID : ", value: "picklist_id" },
    { label: "Reference Number : ", value: "picklist_refid" },
  ];

  const filterSearchItems = (searchValue, searchTyp) => {
    // if (searchValue.length === 0) {
    //   dispatch(fetchSearchProduct({ "": "" }, "filters"));
    // } else {
    //   dispatch(
    //     fetchSearchProduct({ [searchTyp]: searchValue }, "filters")
    //   );
    // }
  };

  const searchItems = searchValue => {
    // if (searchValue.length === 0) {
    //   dispatch(fetchSearchProduct({ "": "" }, "search"));
    // } else {
    //   dispatch(
    //     fetchSearchProduct({ [searchType]: searchValue }, "search")
    //   );
    // }
  };

  const RemoteDynamicAppBar = React.lazy(() => import("Remote/DynamicAppBar"));

  const RemoteWrapper = ({ children }) => (
    <div>
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  );

  let dispatch = useDispatch();

  const history = useHistory();

  const [params, setParams] = useState({ limit: 10, offset: 0 });

  const [pages, setPages] = useState(
    params && Number(params.offset) ? Number(params.offset) : 0
  ); //pagination variables

  const [picklistId, setpicklistId] = useState(0);
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);

  const [page, setPage] = React.useState(0); //card pagination

  const [per_page, setPerPage] = useState(10); // offset variable

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [dynamicAppBar, setDynamicAppBar] = useState([]); //state to manage dynamic appbar

  const [selectedId, setId] = useState(0);

  const handleChangeDyanmicAppBar = value => {
    //setDynamicAppBar(value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setParams({
      limit: Number(rowsPerPage),
      offset: Number(newPage * rowsPerPage),
    });
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setParams({
      limit: Number(parseInt(event.target.value, 10)),
      offset: 0,
    });
  };

  const handleViewInventory = id => {
    history.push(`/pickList/view/${id}`);
  };

  const handleEditInventory = id => {
    history.push(`/pickList/edit/${id}`);
  };

  useEffect(() => {
    setCustomOptions([
      {
        label: "View",
        func: inventory_id => handleViewInventory(inventory_id),
        flag: picklistaccess
          ?.find(row => row === row)
          ?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag,
      },
      {
        label: "Edit",
        func: inventory_id => handleEditInventory(inventory_id),
        flag: picklistaccess
          ?.find(row => row === row)
          ?.view_actions_json?.find(o => o.lookup_code === "UPDATE")?.ctrl_flag,
      },
      {
        label: "Delete Picklist",
        func: product_id => handleDeleteModalOpen(product_id),
        flag: picklistaccess
          ?.find(row => row === row)
          ?.view_actions_json?.find(o => o.lookup_code === "DELETE")?.ctrl_flag,
      },
    ]);
  }, [picklistaccess]);

  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: inventory_id => handleViewInventory(inventory_id),
      flag: picklistaccess
        ?.find(row => row === row)
        ?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag,
    },
    {
      label: "Edit",
      func: inventory_id => handleEditInventory(inventory_id),
      flag: picklistaccess
        ?.find(row => row === row)
        ?.view_actions_json?.find(o => o.lookup_code === "UPDATE")?.ctrl_flag,
    },
    {
      label: "Delete Picklist",
      func: product_id => handleDeleteModalOpen(product_id),
      flag: picklistaccess
        ?.find(row => row === row)
        ?.view_actions_json?.find(o => o.lookup_code === "DELETE")?.ctrl_flag,
    },
    // {
    //   label: "Process Pick list",
    //   //func: (product_id) => handleViewProduct(product_id),
    // },
    // {
    //   label: "Clone Pick list",
    //   //func: (product_id) => handleFavouriteModalOpen(product_id),
    // },
    // {
    //   label: "Mark as completed",
    //   //func: (product_id) => handleEditProductTemplate(product_id),
    // },
    // {
    //   label: "Mark as on hold",
    //   //func: (product_id) => handleArchiveModalOpen(product_id),
    // },
    // {
    //   label: "Mark as in progress",
    //   //func: (product_id) => handleArchiveModalOpen(product_id),
    // },
    // {
    //   label: "Archive Pick list",
    //   //func: (product_id) => handleArchiveModalOpen(product_id),
    // },
  ]);

  const handleDeleteModalOpen = id => {
    setpicklistId(id);
    setdeleteModalOpen(true);
  };

  const handleDeleteProduct = value => {
    dispatch(deletePickList(picklistId));
    setTimeout(() => {
      dispatch(loadPicklistData(params));
    }, 300);
    setdeleteModalOpen(false);
  };

  const handleDeleteModalClose = value => {
    setdeleteModalOpen(false);
  };

  const headCells = [
    {
      key: "pick_list_number",
      numeric: false,
      label: "Pick List ID",
      type: "text",
    },
    {
      key: "updated_date",
      numeric: false,
      label: "PL Date & Time",
      type: "date",
    },
    {
      key: "reference_number",
      numeric: false,
      label: "Reference ID",
      type: "text",
    },
    {
      key: "source_documents.source_document_id.label",
      numeric: false,
      label: "Source Document ID",
      type: "text",
    },
    {
      key: "assignee_to.first_name",
      numeric: false,
      label: "Assignee Name",
      type: "text",
      count: 2,
    },
    {
      key: "warehouse.name",
      numeric: false,
      label: "Warehouse Name",
      type: "text",
      count: 2,
    },
    {
      key: "item_list",
      numeric: false,
      label: "Item List",
      type: "text",
    },
    {
      key: "status.display_name",
      numeric: false,
      label: "Status",
      type: "text",
      count: 2,
    },
    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action",
    },
  ];

  const { picklistdata, picklistdata_meta } = useSelector(
    state => state.picklistdata
  );

  useEffect(() => {
    if (params) {
      setParams({
        limit: Number(per_page),
        offset: Number(pages * per_page),
      });
    }
  }, [pages]);

  useEffect(() => {
    setPages(0);
    setPerPage(per_page);
    if (params) {
      setParams({
        limit: Number(per_page),
        offset: 0,
      });
    }
  }, [per_page]);

  useEffect(() => {
    dispatch(viewPicklistAccessManagement());
  }, []);

  useEffect(() => {
    dispatch(loadPicklistData(params, "s2", "pagination"));
  }, [params]);

  useEffect(() => {
    if (dynamicAppBar.length > 1) {
      setCustomOptions([
        {
          label: "Create Bundle",
          func: product_id => handleBundleProducts(newSelected),
        },
      ]);
    }
    if (dynamicAppBar.length === 1) {
      setCustomOptions([
        {
          label: "View Product",
          func: product_id => handleViewProduct(product_id),
        },
        {
          label: "Mark as Favourite",
          func: product_id => handleFavouriteModalOpen(product_id),
        },
        {
          label: "Edit Product Template",
          func: product_id => handleEditProductTemplate(product_id),
        },
        {
          label: "Archive Product",
          func: product_id => handleArchiveModalOpen(product_id),
        },
        {
          label: "Delete Product",
          func: product_id => handleModalOpen(product_id),
        },
      ]);
    }
  }, [dynamicAppBar]);

  const handleButtonClick = value => {
    history.push("/pickList/create");
  };

  return (
    <Box sx={{ background: "#F9F9F9" }}>
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
            buttons={[
              {
                name: "Create",
                handleButtonClick: handleButtonClick,
                flag: picklistaccess
                  ?.find(row => row === row)
                  ?.view_actions_json?.find(o => o.lookup_code === "CREATE")
                  ?.ctrl_flag,
              },
            ]}
          />
        </RemoteWrapper>
      </Suspense>

      {picklistdata.length > 0 && (
        <div>
          {deleteModalOpen && (
            <Suspense fallback={<div>Loading... </div>}>
              <RemoteWrapper>
                <RemoteModalViewV2
                  handleDeleteProduct={handleDeleteProduct}
                  handleModalClose={handleDeleteModalClose}
                  modalOpen={deleteModalOpen}
                  primary={
                    "Selected Pick List will be deleted permanentely. Are you sure you want to do this?"
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

          {picklistdata.length > 0 &&
            picklistaccess &&
            picklistaccess[0]?.module_ctrl_flag && (
              <div>
                <RemoteDynamicTable
                  table_data={picklistdata}
                  headCells={headCells}
                  info={picklistdata_meta.info}
                  customOptions={customOptions}
                  setCustomOptions={setCustomOptions}
                  setParams={setParams}
                  handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                  setId={setId}
                  enablepagination={true}
                />
              </div>
            )}
        </div>
      )}
    </Box>
  );
};
export default PicklistIndex;

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
