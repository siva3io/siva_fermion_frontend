import * as types from "../../../redux/Action/SalesReturns/ActionTypes";
import axios from "axios";
import { ViewSalesRetunsConfig } from "../../../services/ViewSalesRetunsConfig";

  export const getViewSalesRetunsRequest = () => {
    return {
      type: types.GET_VIEW_SALES_RETUNS_REQUEST, 
    };
  };
  
  export const getViewSalesRetunsSuccess = (ViewSalesRetuns) => {
    return {
      type: types.GET_VIEW_SALES_RETUNS_SUCCESS,
      payload: ViewSalesRetuns,
    };
  };
  
  export const getViewSalesRetunsFailure=(error)=>{
    return{
      type: types.GET_VIEW_SALES_RETUNS_FAILURE,
      payload: error,
    }
  };
  export const getViewSalesReturns= (id) => {
    // console.log(params, "===============") 
    return (dispatch) => {
      dispatch(getViewSalesRetunsRequest);
      axios(ViewSalesRetunsConfig(id))
        .then((response) => {
          console.log(response, "getViewSalesRetunsRequest");
          const ViewSalesRetuns = response.data.data ? response.data.data : [];
          console.log(ViewSalesRetuns, "ViewSalesRetuns");
          dispatch(getViewSalesRetunsSuccess(ViewSalesRetuns));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(getViewSalesRetunsFailure(errorMsg)); 
        });
    };
  };

  /*
 Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)
 All rights reserved.
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License v3.0 as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License v3.0 for more details.
 You should have received a copy of the GNU Lesser General Public License v3.0
 along with this program.  If not, see <https://www.gnu.org/licenses/lgpl-3.0.html/>.
*/