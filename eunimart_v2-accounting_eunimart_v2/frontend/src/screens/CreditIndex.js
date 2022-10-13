import React, { useEffect, useState, Suspense } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import {
  loadSalesData,
  deleteSalesData,
  viewAccessManagement,
} from "../redux/action";
import ErrorBoundary from "../ErrorBoundary";
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

const CreditIndex = () => {
  const RemoteModalViewV2 = React.lazy(() => import("Remote/ModalViewV2"));
  const navigate = useHistory();
  let dispatch = useDispatch();
  const [dynamicAppBar, setDynamicAppBar] = useState([]);
  const [params, setParams] = useState({
    limit: 10,
    offset: 1,
    filters: null,
    sort: null,
  });
  const { salesdata, salesdata_meta } = useSelector((state) => state.data);
  const access = useSelector((state) => state.tabData.access);
  const [searchType, setSearchType] = useState("sales_order_number");
  const [salesId, setSalesId] = useState(0);
  const [selectedId, setId] = useState(0);
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const TableData = [
    {
      key: "created_date",
      numeric: false,
      label: "Credit Note Date",
      type: "date",
    },
    {
      key: "credit_note_id",
      numeric: false,
      label: "Credit Note ID",
      type: "text",
    },
    {
      key: "reference_id",
      numeric: false,
      label: "Reference ID",
      type: "text",
    },
    {
      key: "purchase_invoice.purchase_invoice_number",
      count: 2,
      numeric: false,
      label: "Invoice ID",
      type: "text",
    },
    {
      key: "customer.first_name",
      count: 2,
      numeric: false,
      label: "Customer Name",
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
      key: "total_amount",
      label: "Payment Amount",
      type: "text",
    },
    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action",
    },
  ];

  const handleChangeDyanmicAppBar = (value) => {
    setDynamicAppBar(value);
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const sortOptions = [
    {
      label: "Sort by Credit note Date",
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
          loadSalesData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["created_date", value]]),
          })
        );
      },
    },
    {
      label: "Sort by Credit Note ID",
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
          loadSalesData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["credit_note_id", value]]),
          })
        );
      },
    },
    {
      label: "Sort by Reference ID",
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
          loadSalesData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["reference_id", value]]),
          })
        );
      },
    },
    {
      label: "Sort by Invoice ID",
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
          loadSalesData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["purchase_invoice_id", value]]),
          })
        );
      },
    },
    {
      label: "Sort by Customer name",
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
          loadSalesData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["name", value]]),
          })
        );
      },
    },
    {
      label: "Clear All",
      endIcon: null,
      func: (value) => {
        dispatch(loadSalesData({ "": "" }));
      },
    },
  ];

  const searchOptions = [
    { label: "Filter by Credit Note ID : ", value: "credit_note_id" },
    { label: "Filter by Reference ID : ", value: "reference_id" },
    { label: "Filter by Amount : ", value: "total_amount" },
  ];

  const [filterOptions, setFilterOptions] = useState([
    {
      label: "Filter by Credit Note ID",
      collapseState: false,
      value: "credit_note_id",
    },
    {
      label: "Filter by Reference ID",
      collapseState: false,
      value: "reference_id",
    },
    {
      label: "Filter by Invoice ID",
      collapseState: false,
      value: "purchase_invoice_id",
    },
    {
      label: "Filter by Customer name",
      collapseState: false,
      value: "name",
    },
    {
      label: "Filter by Amount",
      collapseState: false,
      value: "total_amount",
    },
  ]);
  useEffect(() => {
    setCustomOptions([
      {
        label: "View",
        func: (sales_id) => handleView(sales_id),
        flag: access
          ?.find((row) => row === row)
          ?.view_actions_json?.find((o) => o.lookup_code === "READ")?.ctrl_flag,
      },
      {
        label: "Edit",
        func: (sales_id) => handleEdit(sales_id),
        flag: access
          ?.find((row) => row === row)
          ?.view_actions_json?.find((o) => o.lookup_code === "UPDATE")
          ?.ctrl_flag,
      },
      {
        label: "Delete",
        func: (sales_id) => handleDeleteModalOpen(sales_id),
        flag: access
          ?.find((row) => row === row)
          ?.view_actions_json?.find((o) => o.lookup_code === "DELETE")
          ?.ctrl_flag,
      },
    ]);
  }, [access]);

  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: (sales_id) => handleView(sales_id),
    },
    {
      label: "Edit",
      func: (sales_id) => handleEdit(sales_id),
    },
    {
      label: "Delete",
      func: (sales_id) => handleDeleteModalOpen(sales_id),
    },
  ]);

  useEffect(() => {
    dispatch(loadSalesData(params, "s2", "pagination"));
  }, [params]);

  const handleView = (id) => {
    navigate.push("/creditNote/view/" + id);
  };

  const handleEdit = (id) => {
    console.log("handleEditProductTemplate", id);
    navigate.push("/creditNote/edit/" + id);
  };

  const handleDeleteProduct = (value) => {
    console.log("enter");
    dispatch(deleteSalesData(salesId));
    setTimeout(() => {
      dispatch(loadSalesData(params));
    }, 300);
    setdeleteModalOpen(false);
  };

  const handleDeleteModalClose = (value) => {
    console.log("enter close");
    setdeleteModalOpen(false);
  };

  const handleDeleteModalOpen = (value) => {
    setSalesId(value);
    setdeleteModalOpen(true);
  };

  const handleButtonClick = (value) => {
    navigate.push("/creditNote/add");
  };

  const filterSearchItems = (searchValue, searchType) => {
    if (searchValue.length === 0) {
      dispatch(loadSalesData({ "": "" }, "filters"));
    } else {
      dispatch(
        dispatch(
          loadSalesData({
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
      dispatch(loadSalesData({ "": "" }, "search"));
    } else {
      dispatch(
        dispatch(
          loadSalesData({
            limit: params.limit,
            offset: params.offset,
            filters: JSON.stringify([[searchType, "ilike", searchValue]]),
          })
        )
      );
    }
  };

  // useEffect(() => {
  //   dispatch(loadSalesData(params));
  // }, [params]);

  useEffect(() => {
    dispatch(viewAccessManagement());
  }, []);

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
            // handleButtonClick={handleButtonClick}
            buttons={[
              {
                name: "Create",
                handleButtonClick: handleButtonClick,
                flag: access
                  ?.find((row) => row === row)
                  ?.view_actions_json?.find((o) => o.lookup_code === "CREATE")
                  ?.ctrl_flag,
              },
            ]}
          />
        </Suspense>

        {salesdata &&
          salesdata.length > 0 &&
          access &&
          access[0]?.module_ctrl_flag && (
            <div>
              <RemoteDynamicTable
                table_data={salesdata}
                headCells={TableData}
                customOptions={customOptions}
                setCustomOptions={setCustomOptions}
                info={salesdata_meta.info}
                setParams={setParams}
                handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                setId={setId}
                enablepagination={true}
              />
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
export default CreditIndex;

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
