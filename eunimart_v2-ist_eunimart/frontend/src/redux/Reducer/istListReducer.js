import * as types from "../Action/actionType";

const initialState = {
  istdata: [],
  istdata_meta: {},
  istdataById: {},
  Countrydata: [],
  Statedata: [],
  istdeletedata: [],
  istdeletedata_meta: {},
  access: [],
  loading: false,

  grnData: [],
  grnData_meta: {},
  asnData: [],
  asnData_meta: {},
  salesOrdersData: [],
  salesOrdersData_meta: {},
  deliveryOrdersData: [],
  deliveryOrdersData_meta: {},
  purchaseOrdersData: [],
  purchaseOrdersData_meta: {},
};

const istdataReducers = (state = initialState, action) => {
  console.log("action.payload", action.payload);
  switch (action.type) {
    case types.IST_LIST:
      return {
        ...state,
        istdata: action.payload.data,
        istdata_meta: action.payload.meta,
        loading: false,
      };
    case types.STATE_LIST:
      return {
        ...state,
        Statedata: action.payload.data,
        loading: false,
      };
    case types.IST_DATA_BY_ID:
      return {
        ...state,
        istdataById: action.payload.data,
        loading: false,
      };
    case types.COUNTRY_LIST:
      return {
        ...state,
        Countrydata: action.payload.data,
        loading: false,
      };
    case types.IST_DELETE_LIST:
      return {
        ...state,
        istdeletedata: action.payload.data,
        istdeletedata_meta: action.payload.meta,
        loading: false,
      };
    case types.ACCESS_MANAGEMENT:
      return {
        ...state,
        access: action.payload.data,
        loading: false,
      };
    case types.GRN_DATA_LIST:
      return {
        ...state,
        grnData: action.payload.data,
        grnData_meta: action.payload.meta,
        loading: false,
      };
    case types.ASN_DATA_LIST:
      return {
        ...state,
        asnData: action.payload.data,
        asnData_meta: action.payload.meta,
        loading: false,
      };
    case types.SALES_ORDERS_DATA_LIST:
      return {
        ...state,
        salesOrdersData: action.payload.data,
        salesOrdersData_meta: action.payload.meta,
        loading: false,
      };
    case types.DELIVERY_ORDERS_DATA_LIST:
      return {
        ...state,
        deliveryOrdersData: action.payload.data,
        deliveryOrdersData_meta: action.payload.meta,
        loading: false,
      };
    case types.PURCHASE_ORDERS_DATA_LIST:
      return {
        ...state,
        purchaseOrdersData: action.payload.data,
        purchaseOrdersData_meta: action.payload.meta,
        loading: false,
      };
    default:
      return state;
  }
};
export default istdataReducers;

/*			
Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)			
All rights reserved.			
This program is free software: you can redistribute it and/or modify			
it under the terms of the GNU General Public License as published by			
the Free Software Foundation, either version 3 of the License, or			
(at your option) any later version.			
This program is distributed in the hope that it will be useful,			
but WITHOUT ANY WARRANTY; without even the implied warranty of			
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the			
GNU General Public License for more details.			
You should have received a copy of the GNU General Public License			
along with this program. If not, see <http://www.gnu.org/licenses/>.			
*/
