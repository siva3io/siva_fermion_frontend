import * as types from "../Actions/actionType";

const initialState = {
  scrapordersdata: [],
  scrapordersdata_meta: {},
  data: [],
  productData: [],
  pricingData: [],
  scrapReasons: [],
  EstimatedCostdata: [],
  shippingPartnersList: [],
  SourceDocumentTypesData: [],
  countries: [],
  locationsList: [],
  states: [],
  GRNdata: [],
  Shippingdata:[],
  GRNViewdata:[],
  ScrapMsg: {},
  uomData: [],
  access:[],
  loading: false
}
const ScrapOrdersdataReducers = (state = initialState, action) => {
  console.log("action.payload", action.payload)
  switch (action.type) {
    case types.SCRAP_ORDERS_LIST: return {
      ...state,
      scrapordersdata: action.payload.data,
      scrapordersdata_meta: action.payload.meta,
      loading: false
    }
    case types.ESTIMATED_COST: return {

      ...state,
      data: action.payload.data,
      loading: false
    }
    case types.PRODUCTS_LIST: return {
      ...state,
      productData: action.payload.data,
      loading: false
    }
    case types.PRICING_LIST: return {
      ...state,
      pricingData: action.payload.data,
      loading: false
    }
    case types.SCRAP_REASONS: return {
      ...state,
      scrapReasons: action.payload.data,
      loading: false
    }
    case types.COUNTRIES: return {
      ...state,
      countries: action.payload.data,
      loading: false
    }
    case types.STATES: return {
      ...state,
      states: action.payload.data,
      loading: false
    }
    case types.SAVE_SCRAP_ORDER: return {
      ...state,
      ScrapMsg: action.payload.meta,
      loading: false
    }
    case types.UOM_LIST: return {
      ...state,
      uomData: action.payload.data,
      loading: false

    }
    case types.SHIPPING_PARTNERS_LIST: return {
      ...state,
      shippingPartnersList: action.payload.data,
      loading: false

    }
    case types.LOCATIONS_LIST: return {
      ...state,
      locationsList: action.payload.data,
      loading: false

    }
    case types.SCRAP_ORDERS_BY_ID: return {
      ...state,
      scrapordersdataId: action.payload.data,
      scrapordersdataId_meta: action.payload.meta,
      loading: false
    }
    case types.RATE_CALCULATOR_LIST: return {
      ...state,
      EstimatedCostdata: action.payload.data,
      loading: false
    }
    case types.SOURCE_DOCUMENT_LIST: return {
      ...state,
      SourceDocumentTypesData: action.payload.data,
      loading: false
    }
    case types.GRN_LIST: return {
      ...state,
      GRNdata: action.payload.data,
      loading: false
    }
    case types.GRN_VIEW: return {
      ...state,
      GRNViewdata: action.payload.data,
      loading: false
    }
    case types.SHIPPINGORDERS_VIEW: return{
      ...state,
      Shippingdata:action.payload.data, 
      loading:false
  }
    case types.ACCESS_MANAGEMENT: return{
      ...state,
      access:action.payload.data,
      loading:false
    }
    default: return state;
  }
};
export default ScrapOrdersdataReducers;






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
along with this program. If not, see http://www.gnu.org/licenses/.
*/