import * as types from "../Action/ActionType";

const initialState = {
  loading: true,
  inventory: [],
  error: "",
};

const FetchInventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INVENTORY_SUCCESS:
      return {
        loading: false,
        inventory: action.payload,
        error: "",
      };
    case types.INVENTORY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
  
    default:
      return state;
  }
};

export default FetchInventoryReducer;

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