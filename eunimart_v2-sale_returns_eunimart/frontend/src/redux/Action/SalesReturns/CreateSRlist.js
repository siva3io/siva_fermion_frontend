import * as types from "../../../redux/Action/SalesReturns/ActionTypes";
import axios from "axios";
import { CreateSRConfig } from "../../../services/CreateSRConfig";
import { toast } from "react-toastify";

  export const createSalesRetunsListRequest = () => {
    return {
      type: types.CREATE_SALES_RETURNS_REQUEST, 
    };
  };
  
  export const createSalesRetunsListSuccess = (SRlist) => {
    return {
      type: types.CREATE_SALES_RETURNS_SUCCESS,
      payload: SRlist,
    };
  };
  
  export const createSalesRetunsListFailure=(error)=>{
    return{
      type: types.CREATE_SALES_RETURNS_FAILURE,
      payload: error,
    }
  };
  export const createSalesReturnsList = (payload) => {
    // console.log(params, "===============")
    return (dispatch) => {
      dispatch(createSalesRetunsListRequest);
      axios(CreateSRConfig(payload))
        .then((response) => {
          const SRlist = response.data.data ? response.data.data : [];
          console.log(SRlist, "SRlist");
          dispatch(createSalesRetunsListSuccess(SRlist));
          toast.success(response.data.meta.message, {
            toastId: "Create Success",
            autoClose: 1500,
          });
        })
        .catch((error) => {
          toast.error("Sales Returns didnt get created !", {
            toastId: "Create Fail",
            autoClose: 1500,
          });
          const errorMsg = error.message;
          dispatch(createSalesRetunsListFailure(errorMsg));
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