import React, { useState, useEffect } from "react";
import UOMClassTable from "../../Components/UOMView/UOMClassTable";
import DynamicAppBar from "../../Shared/widgets/DynamicAppBar/DynamicAppBar";
import ModalViewV2 from "../../Shared/widgets/Modal/ModalViewV2";
import ModalView from "../../Shared/widgets/Modal/ModalView";

//mui
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Divider,
  Button,
} from "@mui/material";
import MatRadio from "../../Shared/widgets/MatRadio";

//redux action import
import { useSelector, useDispatch } from "react-redux";
import { fetchUOMClass } from "../../redux/Action/FetchProductAction";
import {
  postDeleteUOMClass,
  // postfavouriteProduct,
} from "../../redux/Action/MiscAction";

function UOMClass() {
  //local variables
  const dispatch = useDispatch();
  const view = useSelector((state) => state.productView.productView);
  const products = useSelector((state) => state.fetchProducts.products);

  const [dynamicAppBar, setDynamicAppBar] = useState([]);
  const [params, setParams] = useState({ limit: 10, offset: 0 });
  const [pages, setPages] = useState(
    params && Number(params.offset) ? Number(params.offset) : 0
  ); //pagination variables
  const [per_page, setPerPage] = useState(10); // offset variable
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [productId, setProductId] = useState(0);

  //Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteModalOpen = (uom_id) => {
    setProductId(uom_id);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteProduct = () => {
    dispatch(postDeleteUOMClass(productId));
    setTimeout(() => {
      dispatch(fetchUOMClass(params));
    }, 300);
    setDeleteModalOpen(false);
  };

  const [advancedSort, setAdvancedSort] = useState([
    {
      sortBy: "Product ID",
      options: [
        { label: "Ascending", type: "radio", value: "ascending" },
        { label: "Descending", type: "radio", value: "descending" },
      ],
    },
  ]);
  const sortOptions = [
    {
      sortBy: "Product ID",
      options: [
        { label: "Ascending", type: "radio", value: "ascending" },
        { label: "Descending", type: "radio", value: "descending" },
      ],
    },
    {
      sortBy: "Created Date",
      options: [
        { label: "Latest", type: "radio", value: "latest" },
        { label: "Oldest", type: "radio", value: "oldest" },
      ],
    },
    {
      sortBy: "Reference Number",
      options: [
        { label: "High to low", type: "radio", value: "hight to low" },
        { label: "Low to high", type: "radio", value: "low to high" },
      ],
    },
    {
      sortBy: "Channel Name",
      options: [
        { label: "Marketplace", type: "radio", value: "marketplace" },
        { label: "Webstore", type: "radio", value: "webstore" },
        { label: "Retail Stores", type: "radio", value: "retail" },
      ],
    },
    {
      sortBy: "Vendor Name",
      options: [
        { label: "A to Z", type: "radio", value: "atoz" },
        { label: "Z to A", type: "radio", value: "ztoa" },
      ],
    },
    {
      sortBy: "Price",
      options: [
        { label: "High to low", type: "radio", value: "htol" },
        { label: "Low to high", type: "radio", value: "ltoh" },
      ],
    },
  ];

  /*local functions*/

  const handleChangeDyanmicAppBar = (value) => {
    setDynamicAppBar(value);
  };
  const handleModalOpen = (product_id) => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleAddColumnClick = () => {
    setAdvancedSort([
      ...advancedSort,
      {
        sortBy: "Product ID",
        options: [
          { label: "Ascending", type: "radio", value: "ascending" },
          { label: "Descending", type: "radio", value: "descending" },
        ],
      },
    ]);
  };

  const setRadioType = (prop, value) => {};

  /*Use Effect functions*/
  useEffect(() => dispatch(fetchUOMClass(params)), [params]);
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

  //render funcions
  return (
    <Box>
      <DynamicAppBar
        handleModalOpen={handleModalOpen}
        handleDeleteModalOpen={handleDeleteModalOpen}
        dynamicAppBar={dynamicAppBar}
        branch={"uomClass"}
      />
      {products &&
        products.data &&
        products.data.length > 0 &&
        products.meta.info && (
          <UOMClassTable
            products_data={products.data}
            info={products.meta.info}
            setParams={setParams}
            handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
            setProductId={setProductId}
            handleDeleteModalOpen={handleDeleteModalOpen}
          />
        )}
      {deleteModalOpen && (
        <ModalView
          handleDeleteProduct={handleDeleteProduct}
          handleModalClose={handleDeleteModalClose}
          modalOpen={deleteModalOpen}
          primary={
            "Selected UOM Class will be deleted permanentely. Are you sure you want to do this?"
          }
          secondary={""}
          disclaimer={"Note: This will get deleted permanantly from the list"}
          actionBtns={["Cancel", "Delete"]}
        />
      )}
      {modalOpen && (
        <ModalViewV2
          modalTitle={"Advanced Sort"}
          handleModalClose={handleModalClose}
          modalOpen={modalOpen}
          actionBtns={["Cancel", "Sort"]}
          modalContentStyleHeight={"300px"}
          modalContentStyleWidth={"95%"}
          styleLeft={"calc(50% - 704px/2)"}
        >
          <Box sx={{ m: 2 }}>
            <Typography variant="h6">Sorting Table headers</Typography>
            <Box>
              {advancedSort.map((sort, index) => {
                return (
                  <Box className="sort-box">
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      className="sort-box-label"
                    >
                      <TextField
                        id="standard-select-currency"
                        select
                        label="Sort By"
                        value={sort.sortBy}
                        onChange={(e) => {
                          let sortOptIndex = 0;
                          sortOptions.map((item, sortindex) => {
                            if (item.sortBy === e.target.value) {
                              sortOptIndex = sortindex;
                            }
                          });
                          const newSort = [...advancedSort];
                          newSort[index].sortBy = e.target.value;

                          newSort[index].options =
                            sortOptions[sortOptIndex].options;
                          setAdvancedSort(newSort);
                        }}
                        SelectProps={{
                          MenuProps: {
                            className: "menu",
                          },
                        }}
                        helperText="  Please select your SortBy  "
                        margin="normal"
                        size="small"
                      >
                        {sortOptions.map((option) => (
                          <MenuItem key={option.sortBy} value={option.sortBy}>
                            {option.sortBy}
                          </MenuItem>
                        ))}

                        {/* <MatRadio
                          label={field.label}
                          fields={field.sub}
                          setRadioType={setRadioType}
                        /> */}
                      </TextField>
                      {/* <Box sx={{ flexGrow: 1 }} /> */}
                      <Box style={{ marginLeft: "30px" }}>
                        <MatRadio
                          label={sort.sortBy}
                          fields={sort.options}
                          setRadioType={setRadioType}
                        />
                      </Box>
                    </Box>
                    <Box className="sort-box-input"></Box>
                  </Box>
                );
              })}
            </Box>
            <Divider variant="middle" />
            <Button
              variant="outlined"
              onClick={handleAddColumnClick}
              sx={{ my: 3 }}
            >
              Add another column
            </Button>
          </Box>
        </ModalViewV2>
      )}
    </Box>
  );
}

export default UOMClass;


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