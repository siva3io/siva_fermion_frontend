import React, { useEffect, useState, Suspense } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { loadTemplateData, loadAccessManagementData } from "../../redux/action";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import RemoteDynamicTable from "Remote/DynamicTable";

const IndexScreen = props => {
  const navigate = useHistory();
  let dispatch = useDispatch();
  const { templateData, templateMeta, ACCESSdata } = useSelector(
    state => state.data
  );

  const [params, setParams] = useState({
    limit: 10,
    offset: 1,
    filters: null,
    sort: null,
  });
  const [dynamicAppBar, setDynamicAppBar] = useState([]);
  const [searchType, setSearchType] = useState("Name");
  const [selectedId, setId] = useState(0);

  useEffect(() => {
    dispatch(loadAccessManagementData());
    dispatch(loadTemplateData());
  }, [params]);

  const TableData = [
    {
      key: "name",
      label: "Name",
      type: "text",
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
      label: "Name",
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
        //dispatch(loadSalesData({ limit: params.limit, offset: params.offset, filters:params.filters, sort:JSON.stringify([["sales_order_number",value]]) }))
      },
    },
  ];

  const [filterOptions, setFilterOptions] = useState([
    {
      label: "Name",
      collapseState: false,
      value: "name",
    },
  ]);

  const [customOptions, setCustomOptions] = useState([
    {
      label: "View",
      func: id => handleView(id),
    },
    {
      label: "Edit",
      func: id => handleEdit(id),
    },
    {
      label: "Delete",
      func: id => handleDeleteModalOpen(id),
    },
  ]);

  useEffect(() => {
    setCustomOptions([
      {
        label: "View",
        func: id => handleView(id),
        flag: ACCESSdata?.find(row => row === row)?.view_actions_json?.find(
          o => o.lookup_code === "READ"
        )?.ctrl_flag,
      },
      {
        label: "Edit",
        func: id => handleEdit(id),
        flag: ACCESSdata?.find(row => row === row)?.view_actions_json?.find(
          o => o.lookup_code === "UPDATE"
        )?.ctrl_flag,
      },
      {
        label: "Delete",
        func: id => handleDeleteModalOpen(id),
        flag: ACCESSdata?.find(row => row === row)?.view_actions_json?.find(
          o => o.lookup_code === "DELETE"
        )?.ctrl_flag,
      },
    ]);
  }, [ACCESSdata]);

  const filterSearchItems = (searchValue, searchType) => {
    if (searchValue.length === 0) {
      //dispatch(loadSalesData({ "": "" }, "filters"));
    } else {
      //dispatch(loadSalesData({ limit: params.limit, offset: params.offset, filters:JSON.stringify([[searchType,"ilike",searchValue]]) }))
    }
  };

  const searchItems = searchValue => {
    if (searchValue.length === 0) {
      //dispatch(loadSalesData({ "": "" }, "search"));
    } else {
      //dispatch(loadSalesData({ limit: params.limit, offset: params.offset, filters:JSON.stringify([[searchType,"ilike",searchValue]]) }))
    }
  };

  const searchOptions = [
    { label: "Name:", value: "name" },
    { label: "Code:", value: "code" },
  ];

  const handleView = id => {
    navigate.push("/access-templates/edit/" + id);
  };

  const handleDelete = id => {
    console.log("handleDelete", id);
  };

  const handleEdit = id => {
    navigate.push("/access-templates/edit/" + id);
  };

  const handleButtonClick = value => {
    navigate.push("/access-templates/add");
  };

  const handleModalOpen = () => {
    //setModalOpen(true);
  };
  const handleChangeDyanmicAppBar = value => {
    setDynamicAppBar(value);
  };

  return (
    <Box sx={{ background: "#F9F9F9" }}>
      {templateData &&
        templateMeta &&
        ACCESSdata &&
        ACCESSdata[0]?.module_ctrl_flag &&
        ACCESSdata?.find(row => row === row)?.view_actions_json?.find(
          o => o.lookup_code === "LIST"
        )?.ctrl_flag === 1 && (
          <Box sx={{ background: "#F9F9F9" }}>
            <Suspense fallback={<div>Loading... </div>}>
              <RemoteDynamicAppBar
                //handleModalOpen={handleModalOpen}
                dynamicAppBar={dynamicAppBar}
                sortOptions={sortOptions}
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
                filterSearchItems={filterSearchItems}
                searchItems={searchItems}
                searchOptions={searchOptions}
                searchType={searchType}
                setSearchType={setSearchType}
                handleButtonClick={handleButtonClick}
                buttons={[
                  {
                    name: "Create",
                    handleButtonClick: handleButtonClick,
                    flag: ACCESSdata?.find(
                      row => row === row
                    )?.view_actions_json?.find(o => o.lookup_code === "CREATE")
                      ?.ctrl_flag,
                  },
                ]}
              />
            </Suspense>

            <Box sx={{ p: 2 }}>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteDynamicTable
                  table_data={templateData}
                  headCells={TableData}
                  customOptions={customOptions}
                  setCustomOptions={setCustomOptions}
                  info={templateMeta.info}
                  setParams={setParams}
                  handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                  setId={setId}
                  enablepagination={true}
                />
              </Suspense>
            </Box>
          </Box>
        )}
    </Box>
  );
};
export default IndexScreen;

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
