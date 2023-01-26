import ProductDetailsReducer from "./Products/ProductDetailsReducer";
import FetchProductReducer from "./Products/FetchProductReducer";
import productViewReducer from "./Products/productViewReducer";
import activeTabReducer from "./ProductDetails/activeTabReducer";
import AddProductDetailsReducer from "./AddProduct/AddProductDetailsReducer";
import { combineReducers } from "redux";
import CreateVariantReducer from "./AddProduct/CreateVariantReducer";
import VPReducer from "./AddProduct/VPReducer";
import FetchSingleProductReducer from "./ProductDetails/FetchSingleProductReducer";
import FetchSearchReducer from "./ProductDetails/FetchSearchReducer";
import AvailableMarketplaceReducer from "./AvilableMarketplacesReducer";

import EditResponseReducer from "./ProductDetails/EditResponseReducer";
//bundle
import BundleReducer from "./Bundle/FetchBundlesReducer";

import ViewBundleReducer from "./Bundle/ViewBundleReducer";
import AccessManagementReducer from "./AccessManagementReducer";
import ProductsCombinedReducers from "./CombinedReducers";

const rootReducer = combineReducers({
  //view>>serach box
  enterProduct: ProductDetailsReducer,
  //listview, gridview
  fetchProducts: FetchProductReducer,
  //add products
  fetchAddProductDetails: AddProductDetailsReducer,
  fetchCreateVariant: CreateVariantReducer,
  fetchVPDetails: VPReducer,
  //
  //productView
  fetchSingleProduct: FetchSingleProductReducer,
  fetchSearchReducer: FetchSearchReducer,
  //
  productView: productViewReducer,
  activeTab: activeTabReducer,
  editResponse: EditResponseReducer,

  getavailableMarketplaces:AvailableMarketplaceReducer,


  //bundle
  fetchBundles: BundleReducer,
  viewBundle: ViewBundleReducer,
  // enterContact: ContactDetailsReducer,
  // fetchContact: FetchContactReducer,
  // fetchCountry: FetchCountryReducer,
  // getContactId: GetContactIdReducer,
  // fetchContactById: FetchContactbyIdReducer,
  // fetchState: FetchStateReducer,

  access: AccessManagementReducer,
  data:ProductsCombinedReducers
});
export default rootReducer;

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