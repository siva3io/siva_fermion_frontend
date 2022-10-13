// var axios = require("axios");
import GLOBAL_API_SOURCE from "../../GlobalApi";

var data = {
  jsonrpc: "2.0",
  params: {
    domain: [],
  },
};
let base_URL = GLOBAL_API_SOURCE.url;

export const searchConfig = (searchValue, type) => {
  let url = `${base_URL}/api/v1/products/bundle`;
  if (type === "sort") {
    if (searchValue.hasOwnProperty("name")) {
      url = `${url}?sort=[["bundle_name","${searchValue.name}"]]`;
    }

    if (searchValue.hasOwnProperty("price")) {
      url = `${url}?sort=[["selling_price","${searchValue.price}"]]`;
    }

    if (searchValue.hasOwnProperty("base_uom")) {
      url = `${url}?sort=[["base_uom","${searchValue.base_uom}"]]`;
    }
    if (searchValue.hasOwnProperty("id")) {
      url = `${url}?sort=[["bundle_id","${searchValue.id}"]]`;
    }
    if (searchValue.hasOwnProperty("created_date")) {
      url = `${url}?sort=[["created_date","${searchValue.created_date}"]]`;
    }
  } else if (type === "filters" || type === "search") {
    //search
    if (searchValue.hasOwnProperty("name")) {
      url = `${url}?filters=[["bundle_name","ilike","${searchValue.name}"]]`;
    }

    if (searchValue.hasOwnProperty("id")) {
      url = `${url}?filters=[["bundle_id","ilike","${searchValue.id}"]]`;
    }

    if (searchValue.hasOwnProperty("category")) {
      url = `${url}?filters=[["category_id","=","${searchValue.category}"]]`;
    }
    if (searchValue.hasOwnProperty("product_type")) {
      url = `${url}?filters=[["variant_type_id","=",${searchValue.product_type}]]`;
    }
    if (searchValue.hasOwnProperty("isActive")) {
      url = `${url}?filters=[["is_active","=",${searchValue.isActive}]]`;
    }
    if (searchValue.hasOwnProperty("selling_price")) {
      url = `${url}?filters=[["selling_price","=",${searchValue.selling_price}]]`;
    }
    if (searchValue.hasOwnProperty("status")) {
      url = `${url}?filters=[["status","=",${searchValue.status}]]`;
    }
  }
  // else if (type === "search") {
  //   //search
  //   if (searchValue.hasOwnProperty("product_name")) {
  //     url = `${url}?search=[["product_name","ilike","${searchValue.product_name}"]]`;
  //   }

  //   if (searchValue.hasOwnProperty("skuId")) {
  //     url = `${url}?search=[["sku_code","ilike","${searchValue.skuId}"]]`;
  //   }
  // }
  else if (type === "custom") {
    if (searchValue.hasOwnProperty("uom_class_id")) {
      url = `${url}?filters=[["uom_class_id","=","${searchValue.uom_class_id}"]]`;
    }
    if (searchValue.hasOwnProperty("params")) {
      url = `${url}&per_page=${searchValue.params.limit}&page_no=${searchValue.params.offset}`;
    }
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

export const deleteConfig = (id) => {
  return {
    method: "delete",
    url: `${base_URL}/api/v1/products/bundle/${id}/delete`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const archiveConfig = (id) => {
  let data = { is_active: false };
  return {
    method: "post",
    url: `${base_URL}/api/v1/products/bundle/${id}/update`,
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