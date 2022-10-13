import GLOBAL_API_SOURCE from "../GlobalApi";
let data = {
  jsonrpc: "2.0",
  params: {
    domain: [],
    search_query: "",
  },
};
let base_URL = GLOBAL_API_SOURCE.url;
export const searchConfig = (params) => {
  if (params && !params["filter_params"]) {
    data["params"]["search_query"] = params;
  } else if (params && params["filter_params"] !== "create_date") {
    // console.log("Status  If >>> ", data["params"]["domain"]);

    data["params"]["domain"] = data["params"]["domain"].filter(
      (ele) => !ele.includes("=") || !ele.includes(params["filter_params"])
    );
    data["params"]["domain"].push([
      params["filter_params"],
      "=",
      params["param_value"],
    ]);
  } else if (params && params["filter_params"] === "create_date") {
    // console.log("Date If >>> ", data["params"]["domain"]);
    data["params"]["domain"] = data["params"]["domain"].filter(
      (ele) => !ele.includes(">=")
    );
    data["params"]["domain"] = data["params"]["domain"].filter(
      (ele) => !ele.includes("<=")
    );
    data["params"]["domain"].push(
      [
        params["filter_params"],
        ">=",
        params["param_value"]["selectedStartDate"],
      ],
      [params["filter_params"], "<=", params["param_value"]["selectedEndDate"]]
    );
  } else {
    data["params"]["search_query"] = null;
    data["params"]["domain"] = [];
  }
  return {
    method: "post",
    url: `${base_URL}api/v1/grn`,

    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
};
export const config = (id) => {

  return {
    method: "get",
    url: `${base_URL}api/v1/asn/${id}/filter_module/grn`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};


export const Inventoryconfig = (id) => {

  return {
    method: "get",
    url: `${base_URL}api/v1/asn/${id}/filter_module/inventory_adjustments`,
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

