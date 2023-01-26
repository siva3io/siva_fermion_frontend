import { combineReducers } from "redux";
import CountriesReducer from "./CountriesReducer";
import FetchAddress from "./FetchAddressReducer";
import DebitNotedataIdReducers from "./getDebitNoteByIdReducer";
import SalesdataReducers from "./reducer";
import StatesReducer from "./StatesReducer";
import UpdateSalesDataReducer from "./UpdateSalesDataReducer";
import fetchSourceDocumentTypeReducer from "./SourceDocumentTypeReducer";
import fetchSearchSourceDocumentTypeReducer from "./SearchSourceDocumentReducer";
import DataReducers from "./reducerTabs";
import creditFilterReducers from "./filterTabReducer";

const rootReducer = combineReducers({
  data: SalesdataReducers,
  UpdateSalesData: UpdateSalesDataReducer,
  States2: StatesReducer,
  Countries: CountriesReducer,
  fetchAddress: FetchAddress,
  dataById: DebitNotedataIdReducers,
  fetchSourceDocumentData: fetchSourceDocumentTypeReducer,
  SearchSourceDocumentData: fetchSearchSourceDocumentTypeReducer,
  tabData: DataReducers,
  filterData: creditFilterReducers,
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
