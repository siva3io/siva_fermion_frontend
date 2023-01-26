var axios = require("axios");

const data = JSON.stringify({
  jsonrpc: "2.0",
});

// export const config = {
//   method: 'get',
//   url: 'https://python-odoo.eunimart.com/api/v1/contact/read/71',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   data:data
// };

export const config = {
  method: "get",
  // url: '{{base_URL}}/api/v1/contact/read/50',
  headers: {
    "Content-Type": "application/json",
    "Authorization": `${GLOBAL_API_SOURCE.token}`,
  },
  data: data,
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