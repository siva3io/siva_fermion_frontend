import GLOBAL_API_SOURCE from "../GlobalApi";


var data = {
  jsonrpc: "2.0",
  // params: { domain: [] },
};
let base_URL = GLOBAL_API_SOURCE.url;





export const config = (searchValue) => {

  let url1=""
  console.log("Search Valuerrrrrrrrrrrrrr", searchValue);

  // if (searchValue=="Sales Return") {
  //   url1 = `${base_URL}/api/v1/sales_returns`;
  // }
  if (searchValue=="Purchase Returns"){
    url1 = `${base_URL}/api/v1/purchase_returns/dropdown`;
  }
  if (searchValue=="Purchase Orders"){
    url1 = `${base_URL}/api/v1/purchase_orders/dropdown`;
  }
  if (searchValue=="Shipping Orders"){
    url1 = `${base_URL}/api/v1/shipping_orders/dropdown`;
  }
  if (searchValue=="Scrap Orders"){
    url1 = `${base_URL}/api/v1/scrap_orders/dropdown`;
  }
  if (searchValue=="Delivery Orders"){
    url1 = `${base_URL}/api/v1/delivery_orders//dropdown`;
  }

  if (searchValue=="Sales Orders"){
 
    url1 = `${base_URL}/api/v1/sales_orders/dropdown`;

  }
  // if (searchValue==="Purchase Invoice"){
    
  //   url1 = `${base_URL}/api/v1/purchase_invoice`;
  // }
  // if (searchValue==="Sales Invoice"){
    
  //   url1 = `${base_URL}/api/v1/sales_invoice`;
  // }
  

  return {
    method: "get",
    url: url1,
 
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`
    },
    data: data,
  };
};


export const documentConfig = (id,searchValue) => {

  let url=""
  console.log("Search Valuerrrrrrrrrrrrrr", searchValue);

  // if (searchValue=="Sales Return") {
  //   url = `${base_URL}/api/v1/sales_returns/${id}`;
  // }
  if (searchValue=="Purchase Returns"){
    url = `${base_URL}/api/v1/purchase_returns/${id}`;
  }
  if (searchValue=="Purchase Orders"){
    url = `${base_URL}/api/v1/purchase_orders/${id}`;
  }
  if (searchValue=="Delivery Orders"){
    url = `${base_URL}/api/v1/delivery_orders/${id}`;
  }
  if (searchValue=="Shipping Orders"){
    url = `${base_URL}/api/v1/shipping_orders/${id}`;
  }
  if (searchValue=="Scrap Orders"){
    url = `${base_URL}/api/v1/scrap_orders/${id}`;
  }

  if (searchValue=="Sales Orders"){
 
    url = `${base_URL}/api/v1/sales_orders/${id}`;
  }
  // if (searchValue==="Purchase Invoice"){
    
  //   url = `${base_URL}/api/v1/purchase_invoice/${id}`;
  // }
  // if (searchValue==="Sales Invoice"){
    
  //   url = `${base_URL}/api/v1/sales_invoice/${id}`;
  // }
  

  return {
    method: "get",
    url: url,
 
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