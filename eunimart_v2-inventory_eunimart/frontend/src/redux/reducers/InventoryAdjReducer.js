import * as types from "../actions/actionType";

const initialState = {
  inventorydata: [],
  inventorydata_meta: {},
  loading: false,
  inventoryAdjData: [],
  inventoryAdjData_meta: {},
  inventoryAdjtype: [],
  inventoryAdjtype_meta: {},
  inventoryReasontype: [],
  inventoryReasontype_meta: {},
  inventorycreate: [],
  productVariantData: [],
  inventorycreate_meta: {},
  inventorydelete: [],
  inventorydelete_meta: {},
};

const InventorydataReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.PRODUCT_VARIANT_LIST:
      return {
        ...state,
        productVariantData: action.payload.data,
        loading: false,
      };
    case types.ADJUSTMENT_VIEW:
      return {
        ...state,
        inventoryAdjData: action.payload.data,
        inventoryAdjData_meta: action.payload.meta,
        loading: false,
      };

    case types.INVENTORY_REQUEST:
      return {
        ...state,
        inventorydata: action.payload.data,
        inventorydata_meta: action.payload.meta,
        loading: false,
      };
    case types.ADJUSTMENT_TYPE_REQUEST:
      return {
        ...state,
        inventoryAdjtype: action.payload.data,
        inventoryAdjtype_meta: action.payload.meta,
        loading: false,
      };
    case types.ADJUSTMENT_REASON_REQUEST:
      return {
        ...state,
        inventoryReasontype: action.payload.data,
        inventoryReasontype_meta: action.payload.meta,
        loading: false,
      };
    case types.CREATE_INVENTORY_REQUEST:
      return {
        ...state,
        inventorycreate: action.payload.data,
        inventorycreate_meta: action.payload.meta,
        loading: false,
      };
    case types.DELETE_INVENTORY_REQUEST:
      return {
        ...state,
        inventorydelete: action.payload.data,
        inventorydelete_meta: action.payload.meta,
        loading: false,
      };
    default:
      return state;
  }
};
export default InventorydataReducers;

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
