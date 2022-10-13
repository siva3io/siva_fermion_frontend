import GLOBAL_API_SOURCE from "../GlobalApi";

let data = {
  jsonrpc: "2.0",

};
let base_URL = GLOBAL_API_SOURCE.url;

export const config = () => {
 
  let url = `${base_URL}/api/v1/template/${localStorage.getItem("access_template_id")}?filters=[["display_name","=","ASN"]]`;
  // let url = `${base_URL}api/v1/template/2?filters=[["display_name","=","ASN"]]`;

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




