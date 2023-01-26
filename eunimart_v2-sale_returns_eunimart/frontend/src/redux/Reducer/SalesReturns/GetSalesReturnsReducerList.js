import * as types from "../../../redux/Action/SalesReturns/ActionTypes";

const initialState = {
  loading: false,
  salesReturns: [],
  error: "",
};

  const GetSalesReturnsReducerList = (state = initialState, { type, payload }) => {
  
    switch (type) {
      case types.GET_SALES_RETUNS_LIST_REQUEST:
        return { 
          ...state,
          loading: true,
        };
      case types.GET_SALES_RETUNS_LIST_SUCCESS:
        return {
          loading: false,
          salesReturns: payload,
          error: "",
        };
      case types.GET_SALES_RETUNS_LIST_FAILURE:
        return {
          loading: false,
          salesReturns: [],
          error: payload,
        };
      default:
        return state;
    }
  };
  
  export default GetSalesReturnsReducerList;
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