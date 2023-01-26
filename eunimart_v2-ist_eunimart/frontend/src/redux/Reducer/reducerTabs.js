import * as types from "../Action/actionType";

const initialState = {
  ASNdata: [],
  ASNViewdata: [],
  GRNdata: [],
  GRNViewdata: [],
  Salesdata: [],
  SalesViewdata: [],
  Deliverydata: [],
  Deliverydata_meta: {},
  DeliveryViewdata: [],
  purchaseOrdersData: [],
  purchaseOrdersData_meta: {},
  purchaseOrdersDataId: [],
  loading: false,
};

const DataReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.ASN_LIST:
      return {
        ...state,
        ASNdata: action.payload.data,
        loading: false,
      };
    case types.ASN_VIEW:
      return {
        ...state,
        ASNViewdata: action.payload.data,
        loading: false,
      };
    case types.GRN_LIST:
      return {
        ...state,
        GRNdata: action.payload.data,
        loading: false,
      };
    case types.GRN_DATA_BY_ID:
      return {
        ...state,
        GRNViewdata: action.payload.data,
        loading: false,
      };
    case types.SALES_LIST:
      return {
        ...state,
        Salesdata: action.payload.data,
        loading: false,
      };
    case types.SALES_VIEW:
      return {
        ...state,
        SalesViewdata: action.payload.data,
        loading: false,
      };
    case types.DELIVERY_LIST:
      return {
        ...state,
        Deliverydata: action.payload.data,
        Deliverydata_meta: action.payload.meta,
        loading: false,
      };
    case types.DELIVERY_VIEW:
      return {
        ...state,
        DeliveryViewdata: action.payload.data,
        loading: false,
      };
    case types.PURCHASE_ORDERS_LIST:
      return {
        ...state,
        purchaseOrdersData: action.payload.data,
        purchaseOrdersData_meta: action.payload.meta,
        loading: false,
      };
    case types.PURCHASE_ORDERS_LIST_BY_ID:
      return {
        ...state,
        purchaseOrdersDataId: action.payload.data,
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
