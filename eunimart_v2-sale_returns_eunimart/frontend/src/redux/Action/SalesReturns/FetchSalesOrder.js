import * as types from "../../../redux/Action/SalesReturns/ActionTypes";
import axios from "axios";
// import { SalesRetunsListConfig } from "../../../services/SalesRetunsListConfig"
import { SalesOrderConfig } from "../../../services/SalesOrderConfig";

  export const fetchSalesRetunsOrderRequest = () => {
    return {
      type: types.FETCH_SALES_ORDER_REQUEST, 
    };
  };
  
  export const fetchSalesRetunsOrderSuccess = (SalesOrder) => {
    return {
      type: types.FETCH_SALES_ORDER_SUCCESS,
      payload: SalesOrder,
    };
  };
  
  export const fetchSalesRetunsOrderFailure=(error)=>{
    return{
      type: types.FETCH_SALES_ORDER_FAILURE,
      payload: error,
    }
  };
  export const fetchSalesOrder = () => {
    // console.log(params, "===============")
    return (dispatch) => {
      dispatch(fetchSalesRetunsOrderRequest);
      axios(SalesOrderConfig())
        .then((response) => {
          const SalesOrder = response.data.data ? response.data.data : [];
          console.log(SalesOrder, "SalesOrder");
          dispatch(fetchSalesRetunsOrderSuccess(SalesOrder));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchSalesRetunsOrderFailure(errorMsg));
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