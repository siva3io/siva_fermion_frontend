import GLOBAL_API_SOURCE from "../GlobalApi";
var axios = require("axios");
var data = {
  jsonrpc: "2.0",
};
let base_URL = GLOBAL_API_SOURCE.url;

export const itemTypeConfig = {
  method: "get",
  url: `${base_URL}/api/v1/core/lookup_codes/uom_item_type`,

  headers: {
    "Content-Type": "application/json",
    "Authorization": `${GLOBAL_API_SOURCE.token}`,
  },
  // data: data,
};

export const classCodeConfig = {
  method: "get",
  url: `${base_URL}/api/v1/uom/class/dropdown`,

  headers: {
    "Content-Type": "application/json",
    "Authorization": `${GLOBAL_API_SOURCE.token}`,
  },
  // data: data,
};

export const conversionConfig = {
  method: "get",
  url: `${base_URL}/api/v1/core/lookup_codes/uom_conversion_type`,

  headers: {
    "Content-Type": "application/json",
    "Authorization": `${GLOBAL_API_SOURCE.token}`,
  },
  // data: data,
};

export const classBaseConfig = (params) => {
  return {
    method: "get",
    url: `${base_URL}/api/v1/uom/class/${params}`,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    // data: data,
  };
};

export const createUOMConfig = (obj) => {
  var data = JSON.stringify(obj);
  return {
    method: "post",
    url: `${base_URL}/api/v1/uom/create`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const createUOMClassConfig = (obj) => {
  var data = JSON.stringify(obj);
  return {
    method: "post",
    url: `${base_URL}/api/v1/uom/class/create`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const brandCreateConfig = (brandName) => {
  data.params = { name: brandName };
  return {
    method: "post",
    url: `${base_URL}/api/v1/product-brand/search/create`,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const routesConfig = {
  method: "get",
  url: `${base_URL}/api/v1/stock-route/search/`,

  headers: {
    "Content-Type": "application/json",
    "Authorization": `${GLOBAL_API_SOURCE.token}`,
  },
  data: data,
};

export const parentCategoryConfig = {
  method: "get",
  url: `${base_URL}/api/v1/product-category/search/`,
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
  var data = JSON.stringify({
    jsonrpc: "2.0",
    params: obj,
  });
  return {
    method: "post",
    url: `${base_URL}/api/v1/product/create`,
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
    method: "post",
    url: `${base_URL}/api/v1/product-template/delete/${prod_id}`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
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
    url: `${base_URL}/api/v1/product-template/favorite`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
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