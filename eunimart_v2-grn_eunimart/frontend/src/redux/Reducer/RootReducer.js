import { combineReducers } from "redux";
import CreateGrnReducer from "./CreateGrnReducer";
import fetchAsnDataReducer from "./FetchAsnDataReducer";
import fetchGrnDataReducer from "./FetchGrnListReducer";
import FetchGrnByIdReducer from "./FetchParticularGrnById";
import fetchProductDataReducer from "./FetchProductListReducer";
import FetchScrapReducer from "./FetchScrapReducer";
import fetchSearchSourceDocumentTypeReducer from "./SearchSourceDocumentReducer";
import fetchSourceDocumentTypeReducer from "./SourceDocumentTypeReducer";
import fetchUOMDropdownReducer from "./UOMDropdownReducer";
import FetchGrnDeleteReducer from "./FetchGrnDeleteReducer";
import getAsnDataByIdReducer from "./ASNDataByIdReducer";
import getPoDataByIdReducer from "./PODataByIdReducer";
import AccessManagementReducer from "./ActionManagementReducer";
import ProductLineDeleteReducer from "./ProductDeleteReducer";

const rootreducer = combineReducers({
  fetchGrnData: fetchGrnDataReducer,
  fetchGrnById: FetchGrnByIdReducer,
  fetchAsnData: fetchAsnDataReducer,
  fetchScrap: FetchScrapReducer,
  fetchSourceDocumentData: fetchSourceDocumentTypeReducer,
  SearchSourceDocumentData: fetchSearchSourceDocumentTypeReducer,
  fetchProductsData: fetchProductDataReducer,
  fetchUOMDropdown: fetchUOMDropdownReducer,
  createGrn: CreateGrnReducer,
  fetchGrnDeleteData: FetchGrnDeleteReducer,
  AsnByIdData: getAsnDataByIdReducer,
  POByIdData: getPoDataByIdReducer,
  access: AccessManagementReducer,
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
