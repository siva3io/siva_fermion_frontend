import GLOBAL_API_SOURCE from "../GlobalApi";

let data = {
  jsonrpc: "2.0",
};
let base_URL = GLOBAL_API_SOURCE.url;

export const config = (s1, s2, s3) => {
  let url = `https://dev-api.eunimart.com/api/v1/asn`;
  console.log("Search Value", s1, s2, s3);

  if (s3 === "pagination") {
    url = `${url}?per_page=${s1.limit}&page_no=${s1.offset}`;
  }

  if (s3 === "sorting") {
    if (s1 === "created_date") {
      url = `${url}?sort=[["created_date"," ${s2}"]]`;
    }
    if (s1 === "ASN_Number") {
      url = `${url}?sort=[["asn_number"," ${s2}"]]`;
    }
    if (s1 === "reference_number") {
      url = `${url}?sort=[["reference_number"," ${s2}"]]`;
    }
  }

  if (s3 === "filters") {
    if (s1 === "status_id") {
      url = `${url}?filters=[["status_id","=",${s2}]]`;
    }
    if (s1 === "search") {
      url = `${url}?filters=[["asn_number","ilike","${s2}"]]`;
    }
    if (s1 === "shipping_mode_id") {
      url = `${url}?filters=[["shipping_mode_id","=","${s2}"]]`;
    }
    if (s1 === "link_purchase_order_id") {
      url = `${url}?filters=[["link_purchase_order_id","=","${s2}"]]`;
    }

    if (s1 === "total_quantity") {
      url = `${url}?filters=[["total_quantity","=","${s2}"]]`;
    }

    if (s1 === "status") {
      url = `${url}?filters=[["status","ilike","${s2}"]]`;
    }
    if (s1 === "created_date") {
      url = `${url}?filters=[["created_date","=","${s2}"]]`;
    }
  }

  return {
    method: "get",
    url: url,

    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
};

export const searchConfig = params => {
  console.log(params, "data");

  // }

  return {
    method: "get",
    url: `https://dev-api.eunimart.com/api/v1/asn?asn_number=${params}`,

    headers: {
      "Content-Type": "application/json",
    },
    //  data: data,
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
