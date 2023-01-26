import * as types from "../actions/actionType";

const initialState = {
  cyclecountdata: [],
  cyclecountdata_meta: {},
  GRNdata: [],
  GRNViewdata: [],
  ASNdata: [],
  ASNViewdata: [],
  ShippingOrdersData: [],
  ShippingOrdersViewData: [],
  PickListSourceDocumentTypesData: [],
  SourceDocumentTypesData: [],
  picklistaccess: [],
  invadjaccess: [],
  cyclecountaccess: [],
  deletedLine: [],
  loading: false,
};

const CycleCountdataReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.CYCLE_COUNT_LIST:
      return {
        ...state,
        cyclecountdata: action.payload.data,
        cyclecountdata_meta: action.payload.meta,
        loading: false,
      };
    case types.SOURCE_DOCUMENT_LIST:
      return {
        ...state,
        SourceDocumentTypesData: action.payload.data,
        loading: false,
      };
    case types.ASN_LIST:
      return {
        ...state,
        ASNdata: action.payload.data,
        loading: false,
      };
    case types.GRN_LIST:
      return {
        ...state,
        GRNdata: action.payload.data,
        loading: false,
      };
    case types.ASN_VIEW:
      return {
        ...state,
        ASNViewdata: action.payload.data,
        loading: false,
      };
    case types.GRN_VIEW:
      return {
        ...state,
        GRNViewdata: action.payload.data,
        loading: false,
      };
    case types.PICK_LIST_SOURCE_DOCUMENT_LIST:
      return {
        ...state,
        PickListSourceDocumentTypesData: action.payload.data,
        loading: false,
      };
    case types.SHIPPING_LIST:
      return {
        ...state,
        ShippingOrdersData: action.payload.data,
        loading: false,
      };
    case types.SHIPPING_VIEW:
      return {
        ...state,
        ShippingOrdersViewData: action.payload.data,
        loading: false,
      };
    case types.PICKLIST_ACCESS_MANAGEMENT:
      return {
        ...state,
        picklistaccess: action.payload.data,
        loading: false,
      };
    case types.INV_ADJ_ACCESS_MANAGEMENT:
      return {
        ...state,
        invadjaccess: action.payload.data,
        loading: false,
      };
    case types.CYCLE_COUNT_ACCESS_MANAGEMENT:
      return {
        ...state,
        cyclecountaccess: action.payload.data,
        loading: false,
      };
    case types.DELETE_PRODUCT_LINE:
      return {
        ...state,
        deletedLine: action.payload.data,
        loading: false,
      };

    default:
      return state;
  }
};
export default CycleCountdataReducers;

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
