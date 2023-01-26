import GLOBAL_API_SOURCE from "../GlobalApi";

var data = {
  jsonrpc: "2.0",
  // params: { domain: [] },
};
let base_URL = GLOBAL_API_SOURCE.url;

export const config = searchValue => {
  let url = "";
  console.log("Search Valuerrrrrrrrrrrrrr", searchValue);

  if (searchValue.lookup_code == "SALES_ORDERS") {
    url = `${base_URL}api/v1/sales_returns/dropdown`;
  }

  if (searchValue.display_name == "Purchase Returns") {
    url = `${base_URL}/api/v1/purchase_returns/dropdown`;
  }
  if (searchValue?.lookup_code == "PURCHASE_ORDERS") {
    url = `${base_URL}/api/v1/purchase_orders/dropdown`;
  }
  if (searchValue.display_name == "Delivery Orders") {
    url = `${base_URL}/api/v1/delivery_orders/dropdown`;
  }

  if (searchValue.lookup_code == "SALES_ORDERS") {
    url = `${base_URL}/api/v1/sales_orders/dropdown`;
  }
  if (searchValue.lookup_code === "IST") {
    url = `${base_URL}/api/v1/internal_transfers/dropdown`;
  }
  if (searchValue.display_name === "Sales Invoice") {
    url = `${base_URL}/api/v1/sales_invoice/dropdown`;
  }

  return {
    method: "get",
    url: url,

    headers: {
      "Content-Type": "application/json",
      Authorization: `${GLOBAL_API_SOURCE.token}`,
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
