import * as types from "../Action/actionType";

const initialState = {
  istViewData: [],
  // istdata_meta:{} ,
  loading: false,
};

const istViewdataReducers = (state = initialState, action) => {
  console.log("action.payload", action.payload);
  switch (action.type) {
    case types.IST_VIEW:
      return {
        ...state,
        istViewData: action.payload.data,
        // istdata_meta:action.payload.meta,
        loading: false,
      };
    default:
      return state;
  }
};
export default istViewdataReducers;

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
