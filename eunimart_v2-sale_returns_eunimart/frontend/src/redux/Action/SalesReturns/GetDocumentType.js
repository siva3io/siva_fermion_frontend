import * as types from "../../../redux/Action/SalesReturns/ActionTypes";
import axios from "axios";
import { searchCurrencyConfig,getDocumentTypeConfig } from "../../../services/CurrencyList";

  export const getDocumentTypeRequest = () => {
    return {
      type: types.GET_DOCUMENT_TYPE_REQUEST, 
    };
  };
  
  export const getDocumentTypeSuccess = (currency) => { 
    return {
      type: types.GET_DOCUMENT_TYPE_SUCCESS,
      payload: currency,
    };
  };
  
  export const getDocumentTypeFailure=(error)=>{
    return{
      type: types.GET_DOCUMENT_TYPE_FAILURE,
      payload: error,
    }
  };
  export const getDocumentType= () => {
    // console.log(params, "===============")
    return (dispatch) => {
      dispatch(getDocumentTypeRequest);
      axios(getDocumentTypeConfig())
        .then((response) => {
        //   console.log(response, "getRetunReasonRequest");
          const currency = response.data.data ? response.data.data : [];
          console.log(currency, "currency");
          dispatch(getDocumentTypeSuccess(currency));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(getDocumentTypeFailure(errorMsg));
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