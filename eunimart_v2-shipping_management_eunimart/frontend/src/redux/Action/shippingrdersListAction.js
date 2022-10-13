import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../../baseurl";

const getShippingOrdersData = (data) => ({
  type: types.SHIPPINGORDERS_LIST,
  payload: data,
});

export const loadShippingOrdersData = (param) => {
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

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/shipping_orders`, { params, headers })
      .then((resp) => { 
        dispatch(getShippingOrdersData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};



const getdeleteData = (data) => ({
  type: types.SHIPPING_ORDERS_DELETE,
  payload: data,
});
export const deleteShippingOrdersbyId = (id) => {
  //console.log("ididididid",id)
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .delete(`${BASE_API_SOURCE.url}api/v1/shipping_orders/${id}/delete`, { headers })
      .then((resp) => { 
        dispatch(getdeleteData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};



//#region Get Access Management List
const getAccessManagementData = (data) => ({
  type: types.ACCESS_MANAGEMENT_LIST,
  payload: data,
});

export const loadAccessManagementData = (param) => {  
  return function (dispatch) { 
    var params = {  
      filters: JSON.stringify([["display_name","=","SHIPPING_ORDERS"]])
    };   

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

     axios.get(`${BASE_API_SOURCE.url}api/v1/template/` + (location.hostname === "localhost" ? 9 : localStorage.getItem('access_template_id')), { params, headers })
      .then((resp) => { 
        dispatch(getAccessManagementData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Access Management List


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