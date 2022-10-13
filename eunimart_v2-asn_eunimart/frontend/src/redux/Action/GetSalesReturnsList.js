import * as types from "./ActionType";
import axios from "axios";
import { SalesRetunsListConfig } from "../../services/SalesRetunsListConfig"

  export const getSalesRetunsListRequest = () => {
    return {
      type: types.GET_SALES_RETUNS_LIST_REQUEST, 
    };
  };
  
  export const getSalesRetunsListSuccess = (SalesRetunsList) => {
    return {
      type: types.GET_SALES_RETUNS_LIST_SUCCESS,
      payload: SalesRetunsList,
    };
  };
  
  export const getSalesRetunsListFailure=(error)=>{
    return{
      type: types.GET_SALES_RETUNS_LIST_FAILURE,
      payload: error,
    }
  };
  export const getSalesReturnsList = (params) => {
    console.log(params, "===============")
    return (dispatch) => {
      dispatch(getSalesRetunsListRequest);
      axios(SalesRetunsListConfig(params))
        .then((response) => {
          console.log(response, "getSalesRetunsListRequest");
          const SalesRetunsList = response.data? response.data: [];
          console.log(SalesRetunsList, "SalesRetunsList");
          dispatch(getSalesRetunsListSuccess(SalesRetunsList));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(getSalesRetunsListFailure(errorMsg));
        });
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