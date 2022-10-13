import * as types from "../../../redux/Action/SalesReturns/ActionTypes";

const initialState = {
  salesReturns: [],
  error: "",
};
const EditSalesReturnsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.EDIT_SALES_RETURNS_SUCCESS:
      const data = {
        data: action.payload,
      };
      return {
        ...state,
        salesReturns: data,
      };
    case types.EDIT_SALES_RETURNS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default EditSalesReturnsReducer;
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
