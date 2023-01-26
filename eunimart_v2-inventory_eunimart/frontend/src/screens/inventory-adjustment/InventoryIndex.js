import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadIventoryData,
  deleteInventory,
} from "../../redux/actions/FetchInventoryAdj";
import RemoteDynamicTable from "Remote/DynamicTable";
import "../../index.css";
import { useHistory } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorBoundary from "../../ErrorBoundary";
import { viewInvAdjAccessManagement } from "../../redux/actions/action";

const InventoryIndex = () => {
  const { invadjaccess } = useSelector(state => state.data);

  let dispatch = useDispatch();
  const history = useHistory();

  const RemoteWrapper = ({ children }) => (
    <div>
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  );

  const [params, setParams] = useState({ limit: 10, offset: 0 });

  const [pages, setPages] = useState(
    params && Number(params.offset) ? Number(params.offset) : 0
  ); //pagination variables

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

  const RemoteModalViewV2 = React.lazy(() => import("Remote/ModalViewV2"));

  const [inventoryId, setinventoryId] = useState(0);

  const [deleteModalOpen, setdeleteModalOpen] = useState(false);

  const headCells = [
    {
      key: "adjustment_date",
      numeric: false,
      label: "Adjustment Date",
      type: "date",
    },
    {
      key: "reason.display_name",
      numeric: false,
      label: "Adjustment Reason",
      type: "text",
      count: 2,
    },
    {
      key: "adjustment_type.display_name",
      numeric: false,
      label: "Adjustment Type",
      type: "text",
      count: 2,
    },
    {
      key: "reference_number",
      numeric: false,
      label: "Reference",
      type: "text",
    },
    {
      key: "warehouse.name",
      numeric: false,
      label: "Warehouse Name",
      type: "text",
      count: 2,
    },
    {
      key: "performedby",
      numeric: false,
      label: "Performed By",
      type: "text",
      count: true,
    },
    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action",
    },
  ];

  useEffect(() => {
    setCustomOptions([
      {
        label: "Edit",
        func: product_id => handleEditProduct(product_id),
        flag: invadjaccess
          ?.find(row => row === row)
          ?.view_actions_json?.find(o => o.lookup_code === "UPDATE")?.ctrl_flag,
      },
      {
        label: "Delete",
        func: product_id => handleDeleteInventory(product_id),
        flag: invadjaccess
          ?.find(row => row === row)
          ?.view_actions_json?.find(o => o.lookup_code === "DELETE")?.ctrl_flag,
      },
    ]);
  }, [invadjaccess]);

  const [customOptions, setCustomOptions] = useState([
    {
      label: "Edit",
      func: product_id => handleEditProduct(product_id),
      flag: invadjaccess
        ?.find(row => row === row)
        ?.view_actions_json?.find(o => o.lookup_code === "UPDATE")?.ctrl_flag,
    },
    {
      label: "Delete",
      func: product_id => handleDeleteInventory(product_id),
      flag: invadjaccess
        ?.find(row => row === row)
        ?.view_actions_json?.find(o => o.lookup_code === "DELETE")?.ctrl_flag,
    },
    // {
    //   label: "Clone",
    //   //func: (product_id) => handleFavouriteModalOpen(product_id),
    // },
    // {
    //   label: "Update Reason",
    //   //func: (product_id) => handleArchiveModalOpen(product_id),
    // },
  ]);

  const handleEditProduct = id => {
    history.push("/inventoryAdjustment/edit/" + id);
  };

  const handleDeleteInventory = id => {
    setinventoryId(id);
    setdeleteModalOpen(true);
  };

  const handleDeleteProduct = value => {
    dispatch(deleteInventory(inventoryId));
    setTimeout(() => {
      dispatch(loadIventoryData(params));
    }, 300);
    setdeleteModalOpen(false);
  };

  const handleDeleteModalClose = value => {
    setdeleteModalOpen(false);
  };

  const { inventorydata, inventorydata_meta } = useSelector(
    state => state.inventorydata
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
    dispatch(viewInvAdjAccessManagement());
  }, []);

  useEffect(() => {
    dispatch(loadIventoryData(params, "s2", "pagination"));
  }, [params]);

  const sortOptions = [
    {
      label: "Sort by Iventory Name",
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
  ];

  const [filterOptions, setFilterOptions] = useState([
    {
      label: "Iventory Name",
      collapseState: false,
      value: "iventory_name",
    },
    {
      label: "Clear All",
      collapseState: false,
      value: "code",
    },
  ]);

  const [searchType, setSearchType] = useState("uom_name");

  const searchOptions = [{ label: "Iventory Name : ", value: "iventory_name" }];

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

  const handleButtonClick = value => {
    history.push("/inventoryAdjustment/create");
  };

  const RemoteDynamicAppBar = React.lazy(() => import("Remote/DynamicAppBar"));

  return (
    inventorydata.length > 0 && (
      <div>
        {deleteModalOpen && (
          <Suspense fallback={<div>Loading... </div>}>
            <RemoteWrapper>
              <RemoteModalViewV2
                handleDeleteProduct={handleDeleteProduct}
                handleModalClose={handleDeleteModalClose}
                modalOpen={deleteModalOpen}
                primary={
                  "Selected Inventory Adjustment will be deleted permanentely. Are you sure you want to do this?"
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

        <Suspense fallback={<div>Loading...</div>}>
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
                  flag: invadjaccess
                    ?.find(row => row === row)
                    ?.view_actions_json?.find(o => o.lookup_code === "CREATE")
                    ?.ctrl_flag,
                },
              ]}
            />
          </RemoteWrapper>
        </Suspense>

        {inventorydata.length > 0 &&
          invadjaccess &&
          invadjaccess[0]?.module_ctrl_flag && (
            <div>
              <RemoteDynamicTable
                table_data={inventorydata}
                headCells={headCells}
                info={inventorydata_meta.info}
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
    )
  );
};
export default InventoryIndex;
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
