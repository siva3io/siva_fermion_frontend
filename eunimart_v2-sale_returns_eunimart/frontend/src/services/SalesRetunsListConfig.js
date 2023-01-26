import GLOBAL_API_SOURCE from "../GlobalApi";

let data = {
  jsonrpc: "2.0",
  params: { 
    domain: [],
    search_query: "",
  },
};
let base_URL = GLOBAL_API_SOURCE.url;

export const SalesRetunsListConfig =(params) => {
  console.log(params,"SalesRetunsListConfig ...........")
  if (params.limit){
  return{
    method: "get",
  url:`${base_URL}/api/v1/sales_returns?per_page=${params.limit}&page_no=${params.offset}`,
  headers: { "Content-Type": "application/json" ,"Authorization": `${GLOBAL_API_SOURCE.token}`}}
  //   data: data,
  }
  else if(params.type=="search"){
    console.log("hloo",params)
    let url = `${base_URL}/api/v1/sales_returns`;

  console.log("Search Value", params.hasOwnProperty("customer_name"));
  if (params.type === "search") {
  if (params.hasOwnProperty("sales_return_number")) {
    console.log("sal===SR")
    // url = `${url}?number=${params.number}`;
    // url = `${url}?filters=[["sales_return_number","ilike","${params.sales_return_number}"]]`;
    return{
      method: "get",
    url:`${url}?filters=[["sales_return_number","ilike","${params.sales_return_number}"]]`,
    headers: { "Content-Type": "application/json","Authorization": `${GLOBAL_API_SOURCE.token}` }

    }
  
  }
  if (params.hasOwnProperty("customer_name")) {
    // url = `${url}?customer_name=${params.customer_name}`;
   
    return{
      method: "get",
      url : `${url}?filters=[["customer_name","ilike","${params.customer_name}"]]`,
      headers: { "Content-Type": "application/json","Authorization": `${GLOBAL_API_SOURCE.token}` }

    }

  }
  if (params.hasOwnProperty("reference_number")) {
    // url = `${url}?customer_name=${params.customer_name}`;
    url = `${url}?filters=[["reference_number","ilike","${params.reference_number}"]]`;

  }
  if (params.hasOwnProperty("sr_date")) {
    // url = `${url}?customer_name=${params.customer_name}`;
    url = `${url}?filters=[["sr_date","ilike","${params.sr_date}"]]`;
    
  }
  if (params.hasOwnProperty("channel_name")) {
    // url = `${url}?customer_name=${params.customer_name}`;
    url = `${url}?filters=[["channel_name","ilike","${params.channel_name}"]]`;
  }
  if (params.hasOwnProperty("reason.lookup_code")) {
    // url = `${url}?customer_name=${params.customer_name}`;
    url = `${url}?filters=[["reason.lookup_code","ilike","${params.reason.lookup_code}"]]`;
  }
  if (params.hasOwnProperty("amount")) {
    // url = `${url}?customer_name=${params.customer_name}`;
    url = `${url}?filters=[["amount","ilike","${params.amount}"]]`;
  }
}
if (params.type === "sort") {
  if (params.hasOwnProperty("reference_number")) {
    url = `${url}?sort=[["reference_number","${params.reference_number}"]]`;
  }
  if (params.hasOwnProperty("updated_by")) {
    url = `${url}?sort=[["updated_by","${params.updated_by}"]]`;
  }
  if (params.hasOwnProperty("customer_name")) {
    url = `${url}?sort=[["customer_name","${params.customer_name}"]]`;
  }
  if (params.hasOwnProperty("amount")) {
    url = `${url}?sort=[["amount","${params.amount}"]]`;
  }
  if (params.hasOwnProperty("created_date")) {
    url = `${url}?sort=[["created_date","${params.created_date}"]]`;
  }
}
    

  }
};



export const CreditNoteListConfig =(id) => {
  return{
    method: "get",
  url:`${base_URL}/api/v1/sales_returns/${id}/filter_module/credit_note`,
  headers: { "Content-Type": "application/json","Authorization": `${GLOBAL_API_SOURCE.token}` }}
  
};

// export const SalesRetunsListConfig = () => {
//   // if () {
//   //   data["params"]["limit"] = params.limit;
//   //   data["params"]["offset"] = params.offset;
//   // }

//   return {
//     method: "get",
//     url: `${base_URL}/api/v1/sales_returns`,

//     headers: {
//       "Content-Type": "application/json",
//     },
//     // data: data,
//   };
// };
export const config = (params) => {
  if (params) {
    data["params"]["limit"] = params.limit;
    data["params"]["offset"] = params.offset;
  }

  return {
    method: "get",
    url: `${base_URL}/api/v1/sales_returns`,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`
    },
    // data: data,
  };
};

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
    method: "get",
    url: `${base_URL}/api/v1/sales_returns`,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`
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