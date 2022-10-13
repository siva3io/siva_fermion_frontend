
import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../../baseurl";

//#region Get uom list
const getProductVariantData = (data) => ({
  type: types.PRODUCT_VARIANT_LIST,
  payload: data,
});

export const loadProductVariantData = (param) => { 
  return function (dispatch) {     
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      filters:param.filters,
      sort:param.sort
    }; 
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/products/variant`, { params, headers })
      .then((resp) => { 
        dispatch(getProductVariantData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get uom list



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