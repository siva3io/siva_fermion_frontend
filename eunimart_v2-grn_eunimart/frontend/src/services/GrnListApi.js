import GLOBAL_API_SOURCE from "../GlobalApi";
import { BASE_URL } from "./api";

var data = {
  jsonrpc: "2.0",
  // params: { domain: [] },
};
let base_URL = GLOBAL_API_SOURCE.url;

export const searchConfig = (params) => {
  console.log(params, "data");

  // }

  return {
    method: "get",
    url: `${BASE_URL}api/v1/grn?grn_number=${params}`,

    headers: {
      "Content-Type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    },
    //  data: data,
  };
};

export const config = (s1, s2, s3) => {
  let url = `${BASE_URL}api/v1/grn`;
  console.log("SearchValue", s1, "s1", "s2", s2, "s3", s3);
  if (s3 === "pagination") {
    url = `${url}?per_page=${s1.limit}&page_no=${s1.offset}`;
  }

  if (s3 === "sorting") {
    if (s1 === "created_date") {
      url = `${url}?sort=[["created_date"," ${s2}"]]`;
    }
    if (s1 === "GRN_Number") {
      url = `${url}?sort=[["grn_number"," ${s2}"]]`;
    }
    if (s1 === "reference_number") {
      url = `${url}?sort=[["reference_number"," ${s2}"]]`;
    }
  }

  if (s3 === "filters") {
    if (s1 === "grn_status") {
      url = `${url}?filters=[["grn_status","ilike",${s2}]]`;
    }
    if (s1 === "search") {
      url = `${url}?filters=[["grn_number","ilike","${s2}"]]`;
    }
    if (s1 === "reference_number") {
      url = `${url}?filters=[["reference_number","ilike","${s2}"]]`;
    }
    if (s1 === "warehouse_name") {
      url = `${url}?filters=[["warehouse_name","ilike","${s2}"]]`;
    }

    if (s1 === "status") {
      url = `${url}?filters=[["status","ilike","${s2}"]]`;
    }
  }

  /*   if (searchValue.hasOwnProperty("limit")) {
    url = `${url}?per_page=${searchValue.limit}&page_no=${searchValue.offset}`;
  }


  if (searchValue.hasOwnProperty("GRN_Number")) {
    url = `${url}?sort=[["grn_number","${searchValue.GRN_Number}"]]`;
  } */

  /*   if (searchValue.hasOwnProperty("reference_number")) {
    url = `${url}?sort=[["reference_number"," ${searchValue.reference_number}"]]`;
  } */

  /*   if (searchValue.hasOwnProperty("search")) {
    url = `${url}?filters=[["grn_number","ilike","${searchValue.search}"]]`;
  } */

  return {
    method: "get",
    url: url,

    headers: {
      "Content-Type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
    },
    //  data: data,
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
