import React, { useState } from "react";
import "./ProductDetail.css";
import ProductInput from "../../../Components/ProductInput/ProductInput";
import ProductDropdown from "../../../Components/ProductDropdown/ProductDropdown";
import CommonButton from "../../../Components/CommonButton/CommonButton";
//mui
import { Box } from "@mui/material";

const ProductDetail = () => {
  return (
    <Box className="productdetailsWrapper">
      <Box className="detailsWrap">
        <p>Product Details</p>
        <button className="btnSaveproduct">Save</button>
      </Box>
      <Box className="inputWrap">
        <Box className="firstCol">
          <ProductInput
            texttype="text"
            label="Product Name"
            placeholder="Nike Men’s Round Neck T-shirt"
          />
          <ProductInput
            texttype="text"
            label="SKU ID"
            placeholder="52546216SKU"
          />
          <ProductInput
            texttype="text"
            label="Product Brand"
            placeholder="Nike"
          />
          <ProductDropdown
            texttype="text"
            label="Product Type"
            placeholder=""
          />
          <ProductDropdown
            texttype="text"
            label="Product Category"
            placeholder=""
          />
          <ProductInput texttype="text" label="Colour" placeholder="Black" />
        </Box>
        <Box className="secondCol">
          <ProductInput texttype="text" label="Size" placeholder="XS" />
          <ProductInput
            texttype="text"
            label="Fitting Type"
            placeholder="Usual Size"
          />
          <ProductInput
            texttype="text"
            label="Item Model Number"
            placeholder="A Class"
          />
          <ProductInput
            texttype="text"
            label="Product Treatment"
            placeholder="Can be Sold"
          />
          <ProductInput
            texttype="text"
            label="Keywords"
            placeholder="A Class"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;

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