import * as types from "../Actions/actionType";

const initialState = {
  pricingData: [],
  pricingData_meta: {},
  pricingDataId: [],
  Currencydata: [],
  productVariantData: [],
  uomData: [],
  loading: false,
  categoryTimedata: [],
  quantityValueData: [],
  pricePost: {},
  vendorsData: [],
  locationsList:[],
  access:[]

};

const PricingDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PRICING_LIST:
      return {
        ...state,
        pricingData: action.payload.data,
        pricingData_meta: action.payload.meta,
        loading: false,
      };
    case types.PRICING_VIEW_ID:
      return {
        ...state,
        pricingDataId: action.payload.data,
        loading: false,
      };
    case types.UOM_LIST:
      return {
        ...state,
        uomData: action.payload.data,
        loading: false,
      };
    case types.PRODUCT_VARIANT_LIST:
      console.log(action.payload.data,"action.payload.data")
      return {
        ...state,
        productVariantData: action.payload.data,
        loading: false,
      };
    case types.PRICE_LIST_POST:
      return {
        ...state,
        pricePost: action.payload.data,
        loading: false,
      }
    case types.VENDORS_LIST:
      return {
        ...state,
        vendorsData: action.payload.data,
        loading: false,
      }
    case types.CURRENCY_TYPE:
      return {
        ...state,
        Currencydata: action.payload.data,
        loading: false,
      };
    case types.CATEGORY_TIME_LIST:
      return {
        ...state,
        categoryTimedata: action.payload.data,
        loading: false,
      };
    case types.QUANTITY_VALUE_TYPE:
      return {
        ...state,
        quantityValueData: action.payload.data,
        loading: false,
      };
    case types.LOCATION_LIST:
      return {
        ...state,
        locationsList: action.payload.data,
        loading: false,
      };
      case types.ACCESS_MANAGEMENT: return{
        ...state,
        access:action.payload.data,
        loading:false
      }
    default:
      return state;
  }
};
export default PricingDataReducer;

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