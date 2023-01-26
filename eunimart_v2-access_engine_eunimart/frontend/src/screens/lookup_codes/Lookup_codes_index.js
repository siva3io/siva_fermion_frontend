import React, { useEffect, useState, Suspense } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { loadlookup_CodesData } from "../../redux/action";
import RemoteDynamicAppBar from "Remote/DynamicAppBar";
import RemoteDynamicTable from "Remote/DynamicTable";

const lookup_types_index = props => {
  const navigate = useHistory();
  let dispatch = useDispatch();
  const { lookup_codesdata, lookup_codes_meta } = useSelector(
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
    dispatch(loadlookup_CodesData(params));
  }, [params]);

  const TableData = [
    {
      key: "id",
      label: "Id",
      type: "text",
    },
    {
      key: "lookup_code",
      label: "Lookup Code",
      type: "text",
    },
    {
      key: "display_name",
      label: "Display Name",
      type: "text",
    },
    {
      key: "lookup_type",
      label: "Lookup Type",
      type: "text",
    },
    // {
    //   key: "action",
    //   numeric: true,
    //   label: "Action",
    //   type: "action",
    // },
  ];

  const sortOptions = [
    {
      label: "Lookup Code",
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
        dispatch(
          loadlookup_CodesData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["lookup_code", value]]),
          })
        );
      },
    },
    {
      label: "Display Name",
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
        dispatch(
          loadlookup_CodesData({
            limit: params.limit,
            offset: params.offset,
            filters: params.filters,
            sort: JSON.stringify([["display_name", value]]),
          })
        );
      },
    },
    //   {
    //     label: "Lookup Type",
    //     subItems: [
    //       {
    //         label: "A to Z",
    //         key: "asc",
    //       },
    //       {
    //         label: "Z to A",
    //         key: "desc",
    //       },
    //     ],
    //     func: (value) => {
    //       dispatch(loadlookup_CodesData({ limit: params.limit, offset: params.offset, filters:params.filters, sort:JSON.stringify([["lookup_type",value]]) }))
    //     },
    //   },
  ];

  const [filterOptions, setFilterOptions] = useState([
    {
      label: "Lookup Code",
      collapseState: false,
      value: "lookup_code",
    },
    {
      label: "Display Name",
      collapseState: false,
      value: "display_name",
    },
    // {
    //     label: "Lookup Type",
    //     collapseState: false,
    //     value: "lookup_type",
    // },
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

  const filterSearchItems = (searchValue, searchType) => {
    if (searchValue.length === 0) {
      dispatch(loadlookup_CodesData({ "": "" }, "filters"));
    } else {
      dispatch(
        dispatch(
          loadlookup_CodesData({
            limit: params.limit,
            offset: params.offset,
            filters: JSON.stringify([[searchType, "ilike", searchValue]]),
          })
        )
      );
    }
  };

  const searchItems = searchValue => {
    if (searchValue.length === 0) {
      dispatch(loadlookup_CodesData({ "": "" }, "search"));
    } else {
      dispatch(
        dispatch(
          loadlookup_CodesData({
            limit: params.limit,
            offset: params.offset,
            filters: JSON.stringify([[searchType, "ilike", searchValue]]),
          })
        )
      );
    }
  };

  const searchOptions = [
    { label: "Lookup Code:", value: "lookup_code" },
    { label: "Display Name:", value: "display_name" },
    //{ label: "Lookup Type:", value: "lookup_type" },
  ];

  const handleView = id => {
    //navigate.push("/access-templates/edit/" + id);
  };

  const handleDelete = id => {
    console.log("handleDelete", id);
  };

  const handleEdit = id => {
    // navigate.push("/access-templates/edit/" + id);
  };

  const handleButtonClick = value => {
    // navigate.push("/access-templates/add");
  };

  const handleModalOpen = () => {
    //setModalOpen(true);
  };
  const handleChangeDyanmicAppBar = value => {
    setDynamicAppBar(value);
  };

  return (
    <Box sx={{ background: "#F9F9F9" }}>
      {lookup_codesdata && lookup_codes_meta.info && (
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
              //buttons={[{name:"Create",handleButtonClick:handleButtonClick,flag:ACCESSdata?.find(row=>row === row)?.view_actions_json?.find(o=>o.lookup_code === "CREATE" )?.ctrl_flag}]}
            />
          </Suspense>

          <Box sx={{ p: 2 }}>
            <Suspense fallback={<div>Loading... </div>}>
              <RemoteDynamicTable
                table_data={lookup_codesdata}
                headCells={TableData}
                customOptions={customOptions}
                setCustomOptions={setCustomOptions}
                info={lookup_codes_meta.info}
                setParams={setParams}
                handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                setId={setId}
                enablepagination={true}
                IsCheckBoxShow={false}
              />
            </Suspense>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default lookup_types_index;

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
