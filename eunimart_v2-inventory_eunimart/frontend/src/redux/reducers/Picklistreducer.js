import * as types from "../actions/actionType";

const initialState = {
  picklistdata: [],
  picklistdata_meta: {},
  loading: false,
  internaltransdata: [],
  internaltransdata_meta: {},
  doctypedata: [],
  doctypedata_meta: {},
  contactsdata: [],
  contactsdata_meta: {},
  locationsdata: [],
  locationsdata_meta: {},
  productsdata: [],
  productsdata_meta: {},
  createPicklistdata: [],
  createPicklistdata_meta: {},
  deletePicklistdata: [],
  deletePicklistdata_meta: {},
};

const PicklistdataReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.PICKLIST_REQUEST:
      return {
        ...state,
        picklistdata: action.payload.data,
        picklistdata_meta: action.payload.meta,
        loading: false,
      };
    case types.INTERNAL_TRANSFER_REQUEST:
      return {
        ...state,
        internaltransdata: action.payload.data,
        internaltransdata_meta: action.payload.meta,
        loading: false,
      };
    case types.DOC_TYPE_REQUEST:
      return {
        ...state,
        doctypedata: action.payload.data,
        doctypedata_meta: action.payload.meta,
        loading: false,
      };
    case types.CONTACTS_REQUEST:
      return {
        ...state,
        contactsdata: action.payload.data,
        contactsdata_meta: action.payload.meta,
        loading: false,
      };
    case types.LOCATIONS_REQUEST:
      return {
        ...state,
        locationsdata: action.payload.data,
        locationsdata_meta: action.payload.meta,
        loading: false,
      };
    case types.PRODUCTS_REQUEST:
      return {
        ...state,
        productsdata: action.payload.data,
        productsdata_meta: action.payload.meta,
        loading: false,
      };
    case types.CREATE_PICKLIST_REQUEST:
      return {
        ...state,
        createPicklistdata: action.payload.data,
        createPicklistdata_meta: action.payload.meta,
        loading: false,
      };
    case types.DELETE_PICKLIST_REQUEST:
      return {
        ...state,
        deletePicklistdata: action.payload.data,
        deletePicklistdata_meta: action.payload.meta,
        loading: false,
      };
    default:
      return state;
  }
};
export default PicklistdataReducers;

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
