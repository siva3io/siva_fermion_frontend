import * as types from "../../../redux/Action/SalesReturns/ActionTypes";
import axios from "axios";
// import { ViewSalesRetunsConfig } from "../../../services/ViewSalesRetunsConfig";
import { RetunReasonConfig } from "../../../services/RetunReasonConfig"

  export const getRetunReasonRequest = () => {
    return {
      type: types.GET_RETUN_REASON_REQUEST, 
    };
  };
  
  export const getRetunReasonSuccess = (RetunReason) => {
    return {
      type: types.GET_RETUN_REASON_SUCCESS,
      payload: RetunReason,
    };
  };
  
  export const getRetunReasonFailure=(error)=>{
    return{
      type: types.GET_RETUN_REASON_FAILURE,
      payload: error,
    }
  };
  export const getRetunReason= () => {
    // console.log(params, "===============")
    return (dispatch) => {
      dispatch(getRetunReasonRequest);
      axios(RetunReasonConfig())
        .then((response) => {
          console.log(response, "getRetunReasonRequest");
          const RetunReason = response.data.data ? response.data.data : [];
          console.log(RetunReason, "RetunReason");
          dispatch(getRetunReasonSuccess(RetunReason));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(getRetunReasonFailure(errorMsg));
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