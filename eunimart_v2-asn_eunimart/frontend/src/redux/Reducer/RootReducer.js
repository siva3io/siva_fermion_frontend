import { combineReducers } from "redux";
import CountriesReducer from "./CountriesReducer";
import CreateAsnReducer from "./CreateAsnReducer";
import EstimatedCostReducer from "./EstimatedCostReducer";
import FetchAsnDataByIdReducer from "./FetchAsnDataByIdReducer";
import fetchAsnDataReducer from "./FetchAsnDataReducer";
import FetchGrnReducer from "./FetchGrnReducer";
import fetchProductDataReducer from "./FetchProductListReducer";
import FetchScrapReducer from "./FetchScrapReducer";
import GetSalesReturnsReducerList from "./GetSalesReturnsReducerList";
import fetchPackageTypeReducer from "./PackageTypeDropDownReducer";
import fetchSearchSourceDocumentTypeReducer from "./SearchSourceDocumentReducer";
import fetchSourceDocumentTypeReducer from "./SourceDocumentTypeReducer";
import StatesReducer from "./StatesReducer";
import fetchUOMDropdownReducer from "./UOMDropdownReducer";
import FetchAsnDeleteReducer from "./FetchAsnDeleteReducer";
import EditAsnReducer from "./EditAsnReducer";
import FetchSOByIdReducer from "./FetchSOByIdReducer";
import FetchPOByIdReducer from "./FetchPOByIdReducer";
import FetchPRByIdReducer from "./FetchPRByIdReducer";
import FetchISTByIdReducer from "./FetchISTByIdReducer";
import fetchLocationDataReducer from "./locationsReducer";
import AccessMngReducer from "./AccessMngReducer";
import FetchInventoryReducer from "./FetchInventoryReducer ";
import ProductLineDeleteReducer from "./ProductDeleteReducer";

const rootreducer = combineReducers({
  fetchAsnData: fetchAsnDataReducer,
  asnDeleteData: FetchAsnDeleteReducer,
  fetchAsnDataById: FetchAsnDataByIdReducer,
  fetchGrn: FetchGrnReducer,
  getSalesReturnsList: GetSalesReturnsReducerList,
  fetchScrap: FetchScrapReducer,
  fetchSourceDocumentData: fetchSourceDocumentTypeReducer,
  SearchSourceDocumentData: fetchSearchSourceDocumentTypeReducer,
  fetchProductsData: fetchProductDataReducer,
  fetchUOMDropdown: fetchUOMDropdownReducer,
  fetchPackageTypeDropDown: fetchPackageTypeReducer,
  States2: StatesReducer,
  Countries: CountriesReducer,
  estimatedcost: EstimatedCostReducer,
  createAsn: CreateAsnReducer,
  editAsn: EditAsnReducer,
  FetchSOById: FetchSOByIdReducer,
  FetchPOById: FetchPOByIdReducer,
  FetchPRById: FetchPRByIdReducer,
  FetchISTById: FetchISTByIdReducer,
  fetchlocationsnData: fetchLocationDataReducer,
  fetchAccessToken: AccessMngReducer,
  FetchInventory: FetchInventoryReducer,
  deleteProductline: ProductLineDeleteReducer,
});

export default rootreducer;
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
