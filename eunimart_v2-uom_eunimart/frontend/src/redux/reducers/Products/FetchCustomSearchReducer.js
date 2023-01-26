import * as types from "../../Action/ActionType";

const initialState = {
  loading: false,
  UOM: [],
  error: "",
};

const FetchCustomSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    //list search uom related
    case types.FETCH_CUSTOM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_CUSTOM_SUCCESS:
      return {
        // ...state,
        loading: false,
        UOM: action.payload,
        error: "",
      };
    case types.FETCH_CUSTOM_FAILURE:
      return {
        loading: false,
        UOM: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default FetchCustomSearchReducer;


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