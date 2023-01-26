import * as types from "./actionType";

const initialState = {
  templateData: [],
  moduleData: [],
  ACCESSdata: [],
  lookup_typesdata: [],
  lookup_types_meta: {},
  lookup_codesdata: [],
  lookup_codes_meta: {},
  loading: false,
};

const DataReducers = (state = initialState, action) => {
  //console.log("action.payload", action.payload)
  switch (action.type) {
    case types.TEMPLATE_LIST:
      return {
        ...state,
        templateData: action.payload.data,
        templateMeta: action.payload.meta,
        loading: false,
      };
    case types.TEMPLATE_DETAILS:
      return {
        ...state,
        templateData: action.payload.data,
        loading: false,
      };
    case types.MODULE_LIST:
      return {
        ...state,
        moduleData: action.payload.data,
        moduleMeta: action.payload.meta,
        loading: false,
      };
    case types.ACCESS_MANAGEMENT_LIST:
      return {
        ...state,
        ACCESSdata: action.payload.data,
        loading: false,
      };
    case types.LOOKUP_TYPES_LIST:
      return {
        ...state,
        lookup_typesdata: action.payload.data,
        lookup_types_meta: action.payload.meta,
        loading: false,
      };
    case types.LOOKUP_CODES_LIST:
      return {
        ...state,
        lookup_codesdata: action.payload.data,
        lookup_codes_meta: action.payload.meta,
        loading: false,
      };
    default:
      return state;
  }
};
export default DataReducers;

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
