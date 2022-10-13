import * as types from "../../Action/Bundle/ActionType";
import { combineReducers } from "redux";

const initialState = {
  loading: false,
  Bundles: [],
  error: "",
};

const FetchProductBundleReducer = (state = initialState, action) => {
  switch (action.type) {
    //list products related
    case types.FETCH_BUNDLE_REQUEST:
      return {
        loading: true,
        Bundles: [],
        error: "",
      };
    case types.FETCH_BUNDLE_SUCCESS:
      return {
        loading: false,
        Bundles: action.payload,
        error: "",
      };
    case types.FETCH_BUNDLE_FAILURE:
      return {
        loading: false,
        Bundles: [],
        error: action.payload,
      };

    // list search products related
    case types.FETCH_SEARCH_REQUEST:
      return {
        loading: true,
        Bundles: [],
        error: "",
      };
    case types.FETCH_SEARCH_SUCCESS:
      return {
        // ...state,
        loading: false,
        Bundles: action.payload,
        error: "",
      };
    case types.FETCH_SEARCH_FAILURE:
      return {
        loading: false,
        Bundles: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const statusInitialState = {
  loading: false,
  Status: [],
  error: "",
};

const FetchBundleStatusReducer = (state = statusInitialState, action) => {
  switch (action.type) {
    //list products related
    case types.FETCH_STATUS_REQUEST:
      return {
        loading: true,
        Status: [],
        error: "",
      };
    case types.FETCH_STATUS_SUCCESS:
      return {
        loading: false,
        Status: action.payload,
        error: "",
      };
    case types.FETCH_STATUS_FAILURE:
      return {
        loading: false,
        Status: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

const BundleReducer = combineReducers({
  bundles: FetchProductBundleReducer,
  status: FetchBundleStatusReducer,
});
export default BundleReducer;






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