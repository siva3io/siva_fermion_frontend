import axios from "axios";
import { config } from "../../services/ScrapConfig";
import * as types from "./ActionType";
import BASE_API_SOURCE from "../baseurl";
// import { GLOBAL_API_SOURCE as BASE_API_SOURCE } from "../../GlobalApi";
export const getScrapOrdersData = (data) => ({
  type: types.SCRAP_ORDERS_LIST,
  payload: data,
});

export const fetchScrap = () => async (dispatch) => {
  try {
    const response = await axios(config());
    console.log(response, "response");
    dispatch({
      type: types.SCRAP_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.SCRAP_FAILURE,
      payload: error,
    });
  }
};

export const loadScrapOrdersData = (params1, id) => {
  return function (dispatch) {
    const params = {
      per_page: params1?.per_page ? params1?.per_page : params1?.limit,
      page_no: params1?.page_no ? params1?.page_no : params1?.offset,
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(
        `${BASE_API_SOURCE.url}/api/v1/grn/${id}/filter_module/scrap_orders`,
        { params, headers }
      )
      .then((resp) => {
        dispatch(getScrapOrdersData(resp.data));
      })
      .catch((error) => console.log(error));
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
