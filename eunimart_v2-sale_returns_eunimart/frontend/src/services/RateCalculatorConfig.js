import GLOBAL_API_SOURCE from "../GlobalApi";

let data = {
  jsonrpc: "2.0",
  params: {
    domain: [],
    search_query: "",
  },
};
let base_URL = GLOBAL_API_SOURCE.url;

export const RateCalculatorConfig =(payload) => {
 return{ method: "post",
  url: `${base_URL}/ipaas/shipping/rate_calculator`,
  data: payload,
  headers: { "Content-Type": "application/json","Authorization": `${GLOBAL_API_SOURCE.token}` }}
  //   data: data,
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