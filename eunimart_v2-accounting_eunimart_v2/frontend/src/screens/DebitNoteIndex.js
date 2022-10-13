import React, { useEffect, useState, Suspense } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";

import RemoteDynamicTable from "Remote/DynamicTable";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import RemoteModalViewV2 from "Remote/ModalViewV2";

import "../index.css";
import {
  loadDebitNoteData,
  loadDeleteDataById,
  viewAccessManagement,
} from "../redux/action";
const DebitNoteIndex = () => {
  const [params, setParams] = useState({
    limit: 10,
    offset: 1,
    filters: null,
    sort: null,
  });
  const [dynamicAppBar, setDynamicAppBar] = useState([]); //state to manage dynamic appbar
  const [searchType, setSearchType] = useState("debit_note_id");
  const [selectedId, setId] = useState(0);
  const navigate = useHistory();
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
  const [deleteId, setdeleteId] = useState(0);
  const access = useSelector((state) => state.tabData.access);

  const handleChangeDyanmicAppBar = (value) => {
    setDynamicAppBar(value);
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const sortOptions = [
    {
      label: "Debit Note ID",
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
            sort: JSON.stringify([["debit_note_id", value]]),
          })
        );
      },
    },
    // {
    //   label: "Create Date",
    //   subItems: [
    //     {
    //       label: "A to Z",
    //       key: "asc",
    //     },
    //     {
    //       label: "Z to A",
    //       key: "desc",
    //     },
    //   ],
    //   func: (value) => {
    //     dispatch(loadCycleCountData({ limit: params.limit, offset: params.offset, filters:params.filters, sort:JSON.stringify([["create_date",value]]) }))
    //   },
    // },
    // {
    //   label: "Status",
    //   subItems: [
    //     {
    //       label: "A to Z",
    //       key: "asc",
    //     },
    //     {
    //       label: "Z to A",
    //       key: "desc",
    //     },
    //   ],
    //   func: (value) => {
    //     dispatch(loadCycleCountData({ limit: params.limit, offset: params.offset, filters:params.filters, sort:JSON.stringify([["status",value]]) }))
    //   },
    // },
    {
      label: "Clear All",
      endIcon: null,
      func: (value) => {
        dispatch(loadCycleCountData({ "": "" }));
      },
    },
  ];

  const searchOptions = [
    { label: "Debit Note ID : ", value: "debit_note_id" },
    // { label: "Create Date : ", value: "create_date" },
    // { label: "Status : ", value: "status" },
  ];

  const [filterOptions, setFilterOptions] = useState([
    {
      label: "Debit Note ID",
      collapseState: false,
      value: "debit_note_id",
    },
    // {
    //   label: "Create Date",
    //   collapseState: false,
    //   value: "create_date",
    // },
    // {
    //   label: "Status",
    //   collapseState: false,
    //   value: "status",
    // },
  ]);

  const filterSearchItems = (searchValue, searchType) => {
    if (searchValue.length === 0) {
      dispatch(loadDebitNoteData({ "": "" }, "filters"));
    } else {
      dispatch(
        dispatch(
          loadDebitNoteData({
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
      dispatch(loadDebitNoteData({ "": "" }, "search"));
    } else {
      dispatch(
        dispatch(
          loadDebitNoteData({
            limit: params.limit,
            offset: params.offset,
            filters: JSON.stringify([[searchType, "ilike", searchValue]]),
          })
        )
      );
    }
  };

  useEffect(() => {
    console.log("qwrtyjkjghfd", access);
    setCustomOptions([
      {
        label: "View",
        func: (product_id) => handleView(product_id),
        flag: access
          ?.find((row) => row === row)
          ?.view_actions_json?.find((o) => o.lookup_code === "READ")?.ctrl_flag,
      },
      {
        label: "Edit Debit Note ",
        func: (product_id) => handleEdit(product_id),
        flag: access
          ?.find((row) => row === row)
          ?.view_actions_json?.find((o) => o.lookup_code === "UPDATE")
          ?.ctrl_flag,
      },
      {
        label: "Delete Debit Note",
        func: (product_id) => handleDeleteModalOpen(product_id),
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
      func: (product_id) => handleView(product_id),
    },
    {
      label: "Edit Debit Note ",
      func: (product_id) => handleEdit(product_id),
    },
    {
      label: "Delete Debit Note",
      func: (product_id) => handleDeleteModalOpen(product_id),
    },
  ]);
  const handleView = (id) => {
    navigate.push("/debitNote/view/" + id);
  };
  const handleEdit = (id) => {
    navigate.push("/debitNote/edit/" + id);
  };

  const handleDeleteModalOpen = (value) => {
    setdeleteId(value);
    setdeleteModalOpen(true);
  };

  const handleDeleteModalClose = (value) => {
    console.log("enter close");
    setdeleteModalOpen(false);
  };

  const handleDelete = () => {
    dispatch(
      loadDeleteDataById(deleteId, function (resp) {
        toast(resp);
      })
    );

    setTimeout(() => {
      dispatch(loadDebitNoteData(params));
    }, 300);
    setdeleteModalOpen(false);
  };

  const headCells = [
    {
      key: "created_date",
      numeric: true,
      label: "DN Date",
      type: "text",
    },
    {
      key: "debit_note_id",
      numeric: true,
      label: "Debit Note ID",
      type: "text",
    },
    {
      key: "reference_id",
      numeric: true,
      label: "Reference ID",
      type: "text",
    },
    {
      key: "purchase_invoice_id",
      numeric: true,
      label: "Invoice ID",
      type: "text",
    },
    {
      key: "name",
      numeric: true,
      label: "Customer Name",
      type: "text",
    },
    {
      key: "status_id",
      numeric: true,
      label: "Status",
      type: "text",
    },
    {
      key: "total_amount",
      numeric: true,
      label: "Payment Amount",
      type: "text",
    },
    {
      key: "balance_due",
      numeric: true,
      label: "Balance Due",
      type: "text",
    },
    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action",
    },
  ];
  let dispatch = useDispatch();
  const { debitnotedata, debitnotedata_meta } = useSelector(
    (state) => state.data
  );
  useEffect(() => {
    dispatch(viewAccessManagement());
    // dispatch(loadDebitNoteData(params));
  }, []);

  useEffect(() => {
    dispatch(loadDebitNoteData(params));
  }, [params]);

  const handleButtonClick = (value) => {
    navigate.push("/debitNote/create");
  };

  return (
    <Box sx={{ background: "#F9F9F9" }}>
      <RemoteModalViewV2
        handleDeleteProduct={handleDelete}
        handleModalClose={handleDeleteModalClose}
        modalOpen={deleteModalOpen}
        primary={"Are you sure you want to do this?"}
        secondary={""}
        disclaimer={"Note: This will get deleted permanantly from the list"}
        actionBtns={["Cancel", "Delete"]}
      />
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
              flag: access
                ?.find((row) => row === row)
                ?.view_actions_json?.find((o) => o.lookup_code === "CREATE")
                ?.ctrl_flag,
            },
          ]}
          // handleButtonClick={handleButtonClick}
        />
      </Suspense>
      {debitnotedata.length > 0 && access && access[0]?.module_ctrl_flag && (
        <div>
          <RemoteDynamicTable
            table_data={debitnotedata}
            headCells={headCells}
            info={debitnotedata_meta.info}
            customOptions={customOptions}
            setCustomOptions={setCustomOptions}
            setParams={setParams}
            handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
            setId={setId}
            enablepagination={true}
          />
        </div>
      )}
    </Box>
  );
};
export default DebitNoteIndex;

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
