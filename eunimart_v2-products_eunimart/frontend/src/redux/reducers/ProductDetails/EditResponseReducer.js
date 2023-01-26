import * as types from "../../Action/ActionType";
import { combineReducers } from "redux";

const editReducerInitialState = {
  loading: false,
  EditResponse: [],
  error: "",
};

const EditResReducer = (state = editReducerInitialState, action) => {
  switch (action.type) {
    case types.EDIT_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.EDIT_PRODUCT_SUCCESS:
      return {
        // ...state,
        loading: false,
        EditResponse: action.payload,
        error: "",
      };
    case types.EDIT_PRODUCT_FAILURE:
      return {
        loading: false,
        EditResponse: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const EditResponseReducer = combineReducers({
  editResponse: EditResReducer,
});
export default EditResponseReducer;

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