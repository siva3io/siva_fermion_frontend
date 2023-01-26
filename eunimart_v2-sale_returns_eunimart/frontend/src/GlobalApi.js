const currentLocation = window.location;
const GLOBAL_API_SOURCE = {
  url:  process.env.BACKEND_API_URL,
  token: "Bearer " + localStorage.getItem("token"),
};
switchByHostname();
function switchByHostname() {
//  console.log(process.env.REACT_APP_ENV);
//  console.log(process.env);
//  console.log(process.env.REACT_APP_API_ENDPOINT);
  const hostname = currentLocation.hostname;
  // switch (process.env.REACT_APP_ENV) {
  //   case "prod":
  //     //  prod env
  //     GLOBAL_API_SOURCE.url = process.env.REACT_APP_API_ENDPOINT;
  //     break;

  //   case "dev":
  //     //  prod env
  //     GLOBAL_API_SOURCE.url = process.env.REACT_APP_API_ENDPOINT;
  //     break;

  //   default:
  //     //  default env
  //     GLOBAL_API_SOURCE.url = process.env.REACT_APP_API_ENDPOINT;

  //     break;
  // }
}
export default GLOBAL_API_SOURCE;


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