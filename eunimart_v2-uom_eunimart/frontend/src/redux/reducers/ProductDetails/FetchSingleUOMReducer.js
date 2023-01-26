import * as types from "../../Action/ActionType";
import { combineReducers } from "redux";

const particularUOMReducerInitialState = {
  loading: false,
  UOMData: [],
  error: "",
};

const ParticularUOMReducer = (
  state = particularUOMReducerInitialState,
  action
) => {
  switch (action.type) {
    case types.FETCH_UOM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_UOM_SUCCESS:
      return {
        // ...state,
        loading: false,
        UOMData: action.payload,
        error: "",
      };
    case types.FETCH_UOM_FAILURE:
      return {
        loading: false,
        UOMData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const particularUOMClassReducerInitialState = {
  loading: false,
  UOMClassData: [],
  error: "",
};

const ParticularUOMClassReducer = (
  state = particularUOMClassReducerInitialState,
  action
) => {
  switch (action.type) {
    case types.FETCH_UOMCLASS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_UOMCLASS_SUCCESS:
      return {
        // ...state,
        loading: false,
        UOMClassData: action.payload,
        error: "",
      };
    case types.FETCH_UOMCLASS_FAILURE:
      return {
        loading: false,
        UOMClassData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const FetchSingleUOMReducer = combineReducers({
  uomData: ParticularUOMReducer,
  uomClassData: ParticularUOMClassReducer,
});
export default FetchSingleUOMReducer;


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