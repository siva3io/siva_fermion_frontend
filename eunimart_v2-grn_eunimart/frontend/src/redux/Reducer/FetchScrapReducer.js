import * as types from "../Action/ActionType";

const initialState = {
  loading: true,
  scrap: [],
  scrapordersdata: [],
  scrapordersdata_meta: {},
  error: "",
};

const FetchScrapReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SCRAP_SUCCESS:
      return {
        loading: false,
        scrap: action.payload,
        error: "",
      };
    case types.SCRAP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case types.SCRAP_ORDERS_LIST:
      return {
        ...state,
        scrapordersdata: action.payload.data,
        scrapordersdata_meta: action.payload.meta,
        loading: false,
      };
    default:
      return state;
  }
};

export default FetchScrapReducer;

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
