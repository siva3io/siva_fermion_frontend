import * as types from "../Action/actionType";

const initialState = {
  loading: true,
  asn: [],
  error: "",
};

const FetchAsnReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ASN_SUCCESS:
      return {
        loading: false,
        asn: action.payload,
        error: "",
      };
    case types.ASN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case types.ASN_SEARCH:
      return {
        ...state,
        asn: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default FetchAsnReducer;

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
