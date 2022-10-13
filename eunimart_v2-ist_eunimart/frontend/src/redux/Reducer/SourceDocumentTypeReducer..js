import * as types from "../Action/actionType";

const initialState = {
  loading: true,
  SourceDocument: [],
};

const fetchSourceDocumentTypeReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.FETCH_SOURCE_DOCUMENT_DATA_SUCCESS:
      //console.log("GRN", payload);
      return {
        ...state,
        loading: false,
        SourceDocument: payload,
      };
    case types.FETCH_SOURCE_DOCUMENT_DATA_FAILURE:
      return {
        ...state,
        loading: true,
      };
    // case types.FETCH_GRN_SEARCH_DATA_SUCCESS:

    //   return {
    //     ...state,
    //     loading: false,
    //     grn: payload,
    //   };
    // case types.FETCH_GRN_SEARCH_DATA_FAIL:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    default:
      return { ...state };
  }
};

export default fetchSourceDocumentTypeReducer;

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
