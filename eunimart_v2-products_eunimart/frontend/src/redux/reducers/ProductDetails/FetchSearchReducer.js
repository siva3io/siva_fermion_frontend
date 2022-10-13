import * as types from "../../Action/ActionType";
import { combineReducers } from "redux";

const currencyReducerInitialState = {
  loading: false,
  Currency: [],
  error: "",
};

const CurrencyReducer = (state = currencyReducerInitialState, action) => {
  switch (action.type) {
    case types.FETCH_CURRENCY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_CURRENCY_SUCCESS:
      return {
        // ...state,
        loading: false,
        Currency: action.payload,
        error: "",
      };
    case types.FETCH_CURRENCY_FAILURE:
      return {
        loading: false,
        Currency: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const FetchSearchReducer = combineReducers({
  currency: CurrencyReducer,
});
export default FetchSearchReducer;





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