import React, { useState, useEffect } from "react";

//mui
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Divider,
  Button,
} from "@mui/material";

//redux action import
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../redux/Action/FetchProductAction";
import { fetchSearchProduct } from "../redux/Action/SearchOutput";
import ErrorBoundary from "../ErrorBoundary";
import { useNavigate } from "react-router-dom";
import ModalView from "../Shared/widgets/Modal/ModalView";
import {
  postDeleteUOM
} from "../redux/Action/MiscAction";


//remote imports
import { lazy, Suspense } from "react";
import { getUOMData } from "../redux/Action/FetchUOMAction";
import { fetchAccessManagement } from "../redux/Action/FetchAccessManagement";
const RemoteDynamicAppBar = React.lazy(() => import("Remote/DynamicAppBar"));
const RemoteDynamicTable = React.lazy(() => import("Remote/DynamicTable"));


const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);


function UOM() {

  //local variables
  const dispatch = useDispatch();
  const history = useNavigate();

  let sample = 0;
  const [dynamicAppBar, setDynamicAppBar] = useState([]);
  const [params, setParams] = useState({ limit: 10, offset: 0 });
  const [productId, setProductId] = useState(0);
  const [searchType, setSearchType] = useState("uom_name");
  const [id, setId] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);


  //redux store data
  const products = useSelector((state) => state.fetchProducts.products);
  const access = useSelector(
    (state) => state.access.access
  );

  /*local functions*/
  const handleChangeDyanmicAppBar = (value) => {
    setDynamicAppBar(value);
  };

  /*Use Effect functions*/
  useEffect(() => dispatch(fetchProduct(params)),
    [params]);


  useEffect(() => {
    dispatch(fetchAccessManagement());
    dispatch(fetchProduct(params));
  }, [params]);



  useEffect(() => { }, [products]);

  const sortOptions = [
    {
      label: "UOM Name",
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
        dispatch(fetchSearchProduct({ name: value }, "sort"));
      },
    },
    {
      label: "UOM Class",
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
          fetchSearchProduct({ uom_class_name: value }, "sort")
        );
      },
    },
    {
      label: "Base UOM",
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
        dispatch(fetchSearchProduct({ base_uom: value }, "sort"));
      },
    },
    {
      label: "UOM Code",
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
        dispatch(fetchSearchProduct({ code: value }, "sort"));
      },
    },
    {
      label: "Clear All",
      endIcon: null,
      func: (value) => {
        dispatch(fetchSearchProduct({ "": "" }, "sort"));
      },
    },
  ];

  const searchOptions = [
    { label: "UOM Name : ", value: "name" },
    { label: "UOM Class : ", value: "class_name" },
    { label: "Base UOM : ", value: "base_uom" },
    { label: "UOM Code : ", value: "code" },
  ]

  const headCells = [
    {
      key: "code",
      numeric: true,
      label: "UOM Code",
      type: "text"
    },
    {
      key: "name",
      numeric: true,
      label: "UOM Name",
      type: "text"
    },
    {
      key: "description",
      numeric: true,
      label: "UOM Description",
      type: "text"
    },
    {
      key: "uom_class_name",
      numeric: true,
      label: "UOM Class",
      type: "text"
    },
    {
      key: "base_uom",
      numeric: true,
      label: "Base UOM",
      type: "text"
    },
    {
      key: "conversion_type.display_name",
      count: 2,
      numeric: true,
      label: "Conversion Type",
      type: "text"
    },
    {
      key: "conversion_factor",
      numeric: true,
      label: "Conversion Factor",
      type: "text"
    },
    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action"
    },
  ];



  useEffect(() => {
    setCustomOptions(
      [{
        label: "View",
        func: (product_id) => handleView(product_id),
        flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag
      },
      {
        label: "Edit",
        func: (product_id) => handleEdit(product_id),
        flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "UPDATE")?.ctrl_flag

      },
      {
        label: "Delete",
        func: (product_id) => handleDelete(product_id),
        flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "DELETE")?.ctrl_flag

      }]
    )
  }, [access])


  const [customOptions, setCustomOptions] = useState([
    {
      label: "View Product",
      func: (product_id) => handleView(product_id),
      flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag
    },
    {
      label: "Edit",
      func: (product_id) => handleEdit(product_id),
      flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "UPDATE")?.ctrl_flag
    },
    {
      label: "Delete Product",
      func: (product_id) => handleDelete(product_id),
      flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "DELETE")?.ctrl_flag
    }
  ]);


  const handleDelete = (uom_id) => {
    setProductId(uom_id);
    setDeleteModalOpen(true);
  };

  const handleView = (id) => {
    history(`/uom/View/${id}`);
  }

  const handleEdit = (id) => {

    dispatch(getUOMData(id));
    setTimeout(() => {
      history(`/uom/editUOM/${id}`);
    }, 500);


  }

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
      dispatch(fetchSearchProduct({ "": "" }, "search"));
    } else {
      dispatch(
        fetchSearchProduct({ [searchType]: searchValue }, "search")
      );
    }
  };

  const [filterOptions, setFilterOptions] = useState(
    [
      {
        label: "UOM Name",
        collapseState: false,
        value: "name",
        type: "input"
      },
      {
        label: "UOM Class",
        collapseState: false,
        value: "uom_class_name",
        type: "input"
      },
      {
        label: "Base UOM",
        collapseState: false,
        value: "base_uom",
        type: "input"
      },
      {
        label: "UOM Code",
        collapseState: false,
        value: "code",
        type: "input"
      },
    ]

  );

  const handleButtonClick = () => {
    history(`/uom/createUOM`);
  }

  const handleDeleteProduct = () => {
    dispatch(postDeleteUOM(productId));
    setTimeout(() => {
      dispatch(fetchProduct(params));
    }, 300);
    setDeleteModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  //render funcions
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
            buttons={[{ name: "Create", handleButtonClick: handleButtonClick, flag: access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "CREATE")?.ctrl_flag }]}

          />
        </RemoteWrapper></Suspense>

      {products && products.data && products.meta.info && access && access[0]?.module_ctrl_flag && access?.find(row => row === row)?.view_actions_json?.find(o => o.lookup_code === "LIST")?.ctrl_flag === 1 && (
        <Box sx={{ p: 2 }}>
          <Suspense fallback={<div>Loading... </div>}>
            <RemoteWrapper>
              <RemoteDynamicTable
                table_data={products.data}
                headCells={headCells}
                customOptions={customOptions}
                setCustomOptions={setCustomOptions}
                info={products.meta.info}
                setParams={setParams}
                handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                setId={setId}
                enablepagination={true}
              />
            </RemoteWrapper></Suspense>
        </Box>
      )}

      {deleteModalOpen && (
        <ModalView
          handleDeleteProduct={handleDeleteProduct}
          handleModalClose={handleDeleteModalClose}
          modalOpen={deleteModalOpen}
          primary={
            "Selected UOM will be deleted permanentely. Are you sure you want to do this?"
          }
          secondary={""}
          disclaimer={"Note: This will get deleted permanantly from the list"}
          actionBtns={["Cancel", "Delete"]}
        />
      )}
    </Box>
  );
}

export default UOM;


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