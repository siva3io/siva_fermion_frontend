import * as types from "../../../redux/Action/SalesReturns/ActionTypes";
import axios from "axios";
import { searchCurrencyConfig } from "../../../services/CurrencyList";

  export const getSalesReturnsCurrencyRequest = () => {
    return {
      type: types.GET_SALES_RETUNS_CURRENCY_REQUEST, 
    };
  };
  
  export const getSalesReturnsCurrencySuccess = (currency) => { 
    return {
      type: types.GET_SALES_RETUNS_CURRENCY_SUCCESS,
      payload: currency,
    };
  };
  
  export const getSalesReturnsCurrencyFailure=(error)=>{
    return{
      type: types.GET_SALES_RETUNS_CURRENCY_FAILURE,
      payload: error,
    }
  };
  export const getSalesReturnsCurrency= () => {
    // console.log(params, "===============")
    return (dispatch) => {
      dispatch(getSalesReturnsCurrencyRequest);
      axios(searchCurrencyConfig())
        .then((response) => {
        //   console.log(response, "getRetunReasonRequest");
          const currency = response.data.data ? response.data.data : [];
          console.log(currency, "currency");
          dispatch(getSalesReturnsCurrencySuccess(currency));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(getSalesReturnsCurrencyFailure(errorMsg));
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