import { combineReducers } from "redux";
import istdataReducers from "./istListReducer";
import istViewdataReducers from "./istViewbyId";
import CountriesReducer from "./ContriesReducer";
import EstimatedCostReducer from "./EstimatedCostReducer";
import StatesReducer from "./StatesReducer";
import fetchProductDataReducer from "./FetchProductListReducer";
import SavsIstDataReducer from "./SaveIstDataReducer";
import UpdateIstDataReducer from "./UpdateIstDataReducer";
import fetchSearchSourceDocumentTypeReducer from "./SearchSourceDocumentReducer";
import fetchSourceDocumentTypeReducer from "./SourceDocumentTypeReducer.";
import fetchUOMDropdownReducer from "./UOMDropdownReducer";
import fetchLookupsDropdownReducer from "./LookupsDropdownReducer";
import fetchLocationsDropdownReducer from "./LocationDropdownReducer";
import fetchLookupsRoutingReducer from "./LookupsRoutingReducer";
import FetchGrnReducer from "./FetchGrnReducer";
import FetchAsnReducer from "./FetchAsnReducer";
import FetchSalesOrdersReducer from "./FetchSalesOrdersReducer";
import DataReducers from "./reducerTabs";

const rootReducer = combineReducers({
  data: istdataReducers,
  viewData: istViewdataReducers,
  States2: StatesReducer,
  Countries: CountriesReducer,
  estimatedcost: EstimatedCostReducer,
  fetchProductsData: fetchProductDataReducer,
  fetchUOMDropdown: fetchUOMDropdownReducer,
  fetchLookupsDropdown: fetchLookupsDropdownReducer,
  fetchLookupsRouting: fetchLookupsRoutingReducer,
  fetchLocationsDropdown: fetchLocationsDropdownReducer,
  SearchSourceDocumentData: fetchSearchSourceDocumentTypeReducer,
  fetchSourceDocumentData: fetchSourceDocumentTypeReducer,
  SaveIstData: SavsIstDataReducer,
  UpdateIstDate: UpdateIstDataReducer,
  fetchGrn: FetchGrnReducer,
  fetchAsn: FetchAsnReducer,
  fetchSalesOrders: FetchSalesOrdersReducer,
  tabData: DataReducers,
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
