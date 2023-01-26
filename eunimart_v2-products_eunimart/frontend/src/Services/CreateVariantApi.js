import GLOBAL_API_SOURCE from "../GlobalApi";
var axios = require("axios");
var data = {
  jsonrpc: "2.0",
};
let base_URL = GLOBAL_API_SOURCE.url;

export const variantAttributeConfig = () => {
  return {
    method: "get",
    url: `${base_URL}/api/v1/products/base_attributes/dropdown`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const createVariantAttributeConfig = (attrName) => {
  data.params = { name: attrName };
  return {
    method: "post",
    url: `${base_URL}/api/v1/product-attribute/search/create`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const propertyAttributeConfig = () => {
  return {
    method: "get",
    url: `${base_URL}/api/v1/products/base_attributes_values/dropdown`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const createPropertyAttributeConfig = (newProperty, attrId) => {
  data.params = { name: newProperty, attr_id: attrId };
  return {
    method: "post",
    url: `${base_URL}/api/v1/product-attribute-value/search/create`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const createVariantTableConfig = (attrArr) => {
  data = attrArr;
  return {
    method: "post",
    url: `${base_URL}/api/v1/products/variant/variant_generation`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const createVariantConfig = (obj) => {
  var data = JSON.stringify({
    jsonrpc: "2.0",
    params: obj,
  });
  return {
    method: "post",
    url: `${base_URL}/api/v1/product/variant/create`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const updateVariantConfig = (obj) => {
  var data = JSON.stringify({
    jsonrpc: "2.0",
    params: obj,
  });
  return {
    method: "post",
    url: `${base_URL}/api/v1/product/variants/create/update`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};



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