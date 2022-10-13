import * as types from "../../Action/ActionType";
import { combineReducers } from "redux";

const specificProductReducerInitialState = {
  loading: false,
  ProductData: [],
  error: "",
};

const SpecificProductReducer = (
  state = specificProductReducerInitialState,
  action
) => {
  switch (action.type) {
    case types.FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_PRODUCT_SUCCESS:
      return {
        // ...state,
        loading: false,
        ProductData: action.payload,
        error: "",
      };
    case types.FETCH_PRODUCT_FAILURE:
      return {
        loading: false,
        ProductData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const FetchSingleProductReducer = combineReducers({
  specificProduct: SpecificProductReducer,
});
export default FetchSingleProductReducer;





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