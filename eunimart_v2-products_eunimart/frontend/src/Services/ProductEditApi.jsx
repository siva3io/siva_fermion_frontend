import GLOBAL_API_SOURCE from "../GlobalApi";

let base_URL = GLOBAL_API_SOURCE.url;

export const editConfig = (payload, id) => {
  return {
    method: "post",
    url: `${base_URL}/api/v1/products/variant/${id}/update`,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: payload,
  };
};

//image update api

export const editVariantImagesConfig = (payload, var_id) => {
  let data = {
    image_options: [],
  };
  if (payload && var_id) {
    data["image_options"] = payload;
  }

  return {
    method: "post",
    url: `${base_URL}/api/v1/products/variant/${var_id}/update`,

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