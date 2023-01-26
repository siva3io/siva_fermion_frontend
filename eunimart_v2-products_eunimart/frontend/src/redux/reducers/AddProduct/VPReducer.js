import * as types from "../../Action/ActionType";
import { combineReducers } from "redux";
const vendorInitialState = {
  loading: false,
  Vendor: [],
  error: "",
};

const VendorReducer = (state = vendorInitialState, action) => {
  switch (action.type) {
    //list products related
    case types.FETCH_VENDOR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_VENDOR_SUCCESS:
      return {
        // ...state,
        loading: false,
        Vendor: action.payload,
        error: "",
      };
    case types.FETCH_VENDOR_FAILURE:
      return {
        loading: false,
        Vendor: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

const shippingPartnerInitialState = {
  loading: false,
  ShippingPartner: [],
  error: "",
};

const ShippingPartnerReducer = (
  state = shippingPartnerInitialState,
  action
) => {
  switch (action.type) {
    //list products related
    case types.FETCH_SHIPPINGPARTNER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_SHIPPINGPARTNER_SUCCESS:
      return {
        // ...state,
        loading: false,
        ShippingPartner: action.payload,
        error: "",
      };
    case types.FETCH_SHIPPINGPARTNER_FAILURE:
      return {
        loading: false,
        ShippingPartner: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

const shippingPartnerViewInitialState = {
  loading: false,
  ShippingPartnerView: [],
  error: "",
};

const ShippingPartnerViewReducer = (
  state = shippingPartnerViewInitialState,
  action
) => {
  switch (action.type) {
    //list products related
    case types.FETCH_SHIPPINGPARTNERVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_SHIPPINGPARTNERVIEW_SUCCESS:
      return {
        // ...state,
        loading: false,
        ShippingPartnerView: action.payload,
        error: "",
      };
    case types.FETCH_SHIPPINGPARTNERVIEW_FAILURE:
      return {
        loading: false,
        ShippingPartnerView: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

const productPackageInitialState = {
  loading: false,
  ProductPackage: [],
  error: "",
};

const ProductPackageReducer = (state = productPackageInitialState, action) => {
  switch (action.type) {
    //list products related
    case types.FETCH_PRODUCTPACKAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_PRODUCTPACKAGE_SUCCESS:
      return {
        // ...state,
        loading: false,
        ProductPackage: action.payload,
        error: "",
      };
    case types.FETCH_PRODUCTPACKAGE_FAILURE:
      return {
        loading: false,
        ProductPackage: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

const vendorPriceListInitialState = {
  loading: false,
  VendorPriceList: [],
  error: "",
};

const VendorPriceListReducer = (
  state = vendorPriceListInitialState,
  action
) => {
  switch (action.type) {
    //list products related
    case types.FETCH_VENDORPRICELIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_VENDORPRICELIST_SUCCESS:
      return {
        // ...state,
        loading: false,
        VendorPriceList: action.payload,
        error: "",
      };
    case types.FETCH_VENDORPRICELIST_FAILURE:
      return {
        loading: false,
        VendorPriceList: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

const createVPInitialState = {
  loading: false,
  CreateVPResponse: [],
  error: "",
};

const CreateVPReducer = (state = createVPInitialState, action) => {
  switch (action.type) {
    case types.CREATE_VP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_VP_SUCCESS:
      return {
        // ...state,
        loading: false,
        CreateVPResponse: action.payload,
        error: "",
      };
    case types.CREATE_PRODUCT_FAILURE:
      return {
        loading: false,
        CreateVPResponse: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const VPReducer = combineReducers({
  vendor: VendorReducer,
  shippingPartner: ShippingPartnerReducer,
  shippingPartnerView: ShippingPartnerViewReducer,
  productPackage: ProductPackageReducer,
  vendorPriceList: VendorPriceListReducer,
  createVPResponse: CreateVPReducer,
});
export default VPReducer;

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