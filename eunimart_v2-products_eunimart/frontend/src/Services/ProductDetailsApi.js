import GLOBAL_API_SOURCE from "../GlobalApi";
var axios = require("axios");
var data = {
  jsonrpc: "2.0",
};
let base_URL = GLOBAL_API_SOURCE.url;

export const brandConfig = (brand_search) => {
  let url = `${base_URL}/api/v1/products/brand/${brand_search}`;
  if (brand_search === "") {
    url = `${base_URL}/api/v1/products/brand/dropdown?per_page=3000`;
  } else {
    url = `${base_URL}/api/v1/products/brand/${brand_search}`;
  }
  return {
    method: "get",
    url: url,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const brandCreateConfig = (brandName) => {
  data = { brand_name: brandName };
  return {
    method: "post",
    url: `${base_URL}/api/v1/products/brand/create`,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const brandDeleteConfig = (brandId) => {
  return {
    method: "delete",
    url: `${base_URL}/api/v1/products/brand/${brandId}/delete`,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
  };
};

export const brandUpdataConfig = (brandName, brandId) => {
  data = { brand_name: brandName };
  return {
    method: "post",
    url: `${base_URL}/api/v1/products/brand/${brandId}/update`,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const conditionConfig = () => {
  let url = `${base_URL}/api/v1/core/lookup_codes/product_condition`;

  return {
    method: "get",
    url: url,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const productTypeConfig = () => {
  let url = `${base_URL}/api/v1/core/lookup_codes/product_type`;

  return {
    method: "get",
    url: url,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const stdProductTypeConfig = () => {
  let url = `${base_URL}/api/v1/core/lookup_codes/standard_product_type`;

  return {
    method: "get",
    url: url,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const procurementConfig = () => {
  let url = `${base_URL}/api/v1/core/lookup_codes/product_procurement_treatment`;

  return {
    method: "get",
    url: url,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    // data: data,
  };
};

export const routesConfig = {
  method: "get",
  url: `${base_URL}/api/v1/core/lookup_codes/stock_treatment`,

  headers: {
    "Content-Type": "application/json",
    "Authorization": `${GLOBAL_API_SOURCE.token}`,
  },
  data: data,
};

export const inventoryConfig = () => {
  return {
    method: "get",
    url: `${base_URL}/api/v1/core/lookup_codes/inventory_tracking`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const baseUOMConfig = () => {
  return {
    method: "get",
    url: `${base_URL}/api/v1/uom/dropdown`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const parentCategoryConfig = {
  method: "get",
  url: `${base_URL}/api/v1/products/category/dropdown`,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `${GLOBAL_API_SOURCE.token}`,
  },
  data: data,
};

export const categoryConfig = (leafCatId) => {
  return {
    method: "get",
    url: `${base_URL}/api/v1/product-category/search/${leafCatId}/`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const createProductConfig = (obj) => {
  var data = JSON.stringify(obj);
  return {
    method: "post",
    url: `${base_URL}/api/v1/products/create`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const updateProductConfig = (obj, id) => {
  var data = JSON.stringify(obj);
  return {
    method: "post",
    url: `${base_URL}/api/v1/products/${id}/update`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const deleteProductConfig = (prod_id) => {
  var data = JSON.stringify({
    jsonrpc: "2.0",
    view: "list",
    limit: 10,
    offset: 0,
    domain: null,
  });
  return {
    method: "delete",
    url: `${base_URL}/api/v1/products/variant/${prod_id}/delete`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    // data: data,
  };
};

export const favouriteProductConfig = (prod_id) => {
  let data = JSON.stringify({
    jsonrpc: "2.0",
    params: {
      product_id: prod_id,
      priority: "1",
    },
  });
  return {
    method: "post",
    url: `${base_URL}/api/v1/products/${prod_id}/favourite`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    // data: data,
  };
};

export const unfavouriteProductConfig = (prod_id) => {
  let data = JSON.stringify({
    jsonrpc: "2.0",
    params: {
      product_id: prod_id,
      priority: "0",
    },
  });
  return {
    method: "post",
    url: `${base_URL}/api/v1/product-template/favorite`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const archiveProductConfig = (prod_id) => {
  let data = {
    is_active: false,
  };
  return {
    method: "post",
    url: `${base_URL}/api/v1/products/variant/${prod_id}/update`,
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