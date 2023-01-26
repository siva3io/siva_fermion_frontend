// var axios = require("axios");
import GLOBAL_API_SOURCE from "../GlobalApi";

var data = {
  jsonrpc: "2.0",
  params: {
    domain: [],
  },
};
let base_URL = GLOBAL_API_SOURCE.url;

export const config = (params) => {
  return {
    method: "get",
    url: `${base_URL}/api/v1/uom?per_page=${params.limit}&page_no=${params.offset}`,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const uomConfig = (params) => {
  return {
    method: "get",
    url: `${base_URL}/api/v1/uom/class/dropdown?per_page=${params.limit}&page_no=${params.offset}`,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const AccessManagement = (param) => {

  return {
    method: "get",
    // url: `${base_URL}/api/v1/template/1?filters=[["display_name","=","UOM"]]`,
    url: `${base_URL}/api/v1/template/${localStorage.getItem("access_template_id")}?filters=[["display_name","=","UOM"]]`,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
  };
};

export const searchConfig = (searchValue, branch, type) => {
  let url =
    branch === "uom"
      ? `${base_URL}/api/v1/uom`
      : `${base_URL}/api/v1/uom/class`;
  if (type === "sort") {
    if (searchValue.hasOwnProperty("name")) {
      url = `${url}?sort=[["name","${searchValue.name}"]]`;
    }

    if (searchValue.hasOwnProperty("uom_class_name")) {
      url = `${url}?sort=[["uom_class_name","${searchValue.uom_class_name}"]]`;
    }

    if (searchValue.hasOwnProperty("base_uom")) {
      url = `${url}?sort=[["base_uom","${searchValue.base_uom}"]]`;
    }
    if (searchValue.hasOwnProperty("code")) {
      url = `${url}?sort=[["code","${searchValue.code}"]]`;
    }
  } else if (type === "filters" || type === "search") {
    //search
    if (searchValue.hasOwnProperty("name")) {
      url = `${url}?filters=[["name","ilike","${searchValue.name}"]]`;
    }

    if (searchValue.hasOwnProperty("class_name")) {
      url = `${url}?filters=[["uom_class_name","ilike","${searchValue.class_name}"]]`;
    }
    if (searchValue.hasOwnProperty("uom_class_name")) {
      url = `${url}?filters=[["uom_class_name","ilike","${searchValue.uom_class_name}"]]`;
    }

    if (searchValue.hasOwnProperty("base_uom")) {
      url = `${url}?filters=[["base_uom","ilike","${searchValue.base_uom}"]]`;
    }
    if (searchValue.hasOwnProperty("code")) {
      url = `${url}?filters=[["code","ilike","${searchValue.code}"]]`;
    }
  } else if (type === "custom") {
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

//delete
export const deleteUOMConfig = (id) => {
  return {
    method: "delete",
    url: `${base_URL}/api/v1/uom/${id}/delete`,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    // data: data,
  };
};

export const deleteUOMClassConfig = (id) => {
  return {
    method: "delete",
    url: `${base_URL}/api/v1/uom/class/${id}/delete`,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    // data: data,
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