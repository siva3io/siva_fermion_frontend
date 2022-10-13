import ProductDetailsReducer from "./Products/ProductDetailsReducer";
import FetchProductReducer from "./Products/FetchProductReducer";
import productViewReducer from "./Products/productViewReducer";
import activeTabReducer from "./ProductDetails/activeTabReducer";
import AddProductDetailsReducer from "./AddProduct/AddProductDetailsReducer";
import { combineReducers } from "redux";
import CreateVariantReducer from "./AddProduct/CreateVariantReducer";
import VPReducer from "./AddProduct/VPReducer";
import FetchSingleUOMReducer from "./ProductDetails/FetchSingleUOMReducer";
import FetchSearchReducer from "./ProductDetails/FetchSearchReducer";
import FetchCustomSearchReducer from "./Products/FetchCustomSearchReducer";
import EditUOMResponseReducer from "./ProductDetails/EditResponseReducer";
import AccessManagementReducer from "./AccessManagementReducer";

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
  fetchSingleUOM: FetchSingleUOMReducer,
  fetchSearchReducer: FetchSearchReducer,
  fetchCustomSearch: FetchCustomSearchReducer,
  //
  productView: productViewReducer,
  activeTab: activeTabReducer,
  uomEditResponse: EditUOMResponseReducer,

  // enterContact: ContactDetailsReducer,
  // fetchContact: FetchContactReducer,
  // fetchCountry: FetchCountryReducer,
  // getContactId: GetContactIdReducer,
  // fetchContactById: FetchContactbyIdReducer,
  // fetchState: FetchStateReducer,
  access: AccessManagementReducer,

});
export default rootReducer;


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