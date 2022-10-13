import { combineReducers } from "redux";

import GetSalesReturnsReducerList from "../Reducer/SalesReturns/GetSalesReturnsReducerList";
import CountriesReducer from "./SalesReturns/CountriesReducer";
import CreateSrReducer from "./SalesReturns/CreateSrReducer";
import DeleteSalesReturnsReducer from "./SalesReturns/DeleteSalesReturnsReducer";
import fetchDocumentDataReducer from "./SalesReturns/DocumentDataReducer";
import EditSalesReturnsReducer from "./SalesReturns/EditSalesReturnssReducer";
import EstimatedCostReducer from "./SalesReturns/EstimatedCostReducer";
import fetchLocationReducer from "./SalesReturns/FetchLocationReducer";
import fetchProductDataReducer from "./SalesReturns/FetchProductListReducer";
import FetchSalesOrderReducer from "./SalesReturns/FetchSalesOrderReducer";
import GetContactListReducer from "./SalesReturns/GetContactListReducer";
import GetCurrencyReducer from "./SalesReturns/GetCurrencyReducer";
import GetDocumentTypeList from "./SalesReturns/getDocumentReducer";
import GetRetunReasonReducer from "./SalesReturns/GetRetunReasonReducer";
import ReturnTypeReducer from "./SalesReturns/ReturnTypeReducer";
import fetchSearchSourceDocumentTypeReducer from "./SalesReturns/SearchSourceDocumentReducer";
import StatesReducer from "./SalesReturns/StatesReducer";
import fetchUOMDropdownReducer from "./SalesReturns/UOMDropdownReducer";
import ViewSalesRetunsReducer from "./SalesReturns/ViewSalesReturnsReducer";
import AccessReducer from "./SalesReturns/AccessReducer";
import GetCreditNoteReducerList from "./SalesReturns/GetCreditNoteReducer";
const rootreducer = combineReducers({

  getSalesReturnsList: GetSalesReturnsReducerList,
  ViewSR:ViewSalesRetunsReducer,
  fetchUOMDropdown:fetchUOMDropdownReducer,
  fetchProductsData: fetchProductDataReducer,
  States2:StatesReducer,
  Countries:CountriesReducer,
  contactList:GetContactListReducer,
  RetunReasonList:GetRetunReasonReducer,
  SRCurrency:GetCurrencyReducer,
  SalesOrdersList: FetchSalesOrderReducer,
  CreateSalesReturns:CreateSrReducer,
  estimatedcost:EstimatedCostReducer,
  Returntype:ReturnTypeReducer,
  deleteSalesReturns: DeleteSalesReturnsReducer,
  editSalesReturns: EditSalesReturnsReducer,
  fetchLocation: fetchLocationReducer,
  documentType:GetDocumentTypeList,
  SearchSourceDocumentData:fetchSearchSourceDocumentTypeReducer,
  documentData:fetchDocumentDataReducer,
  access: AccessReducer,
  getCreditNoteList:GetCreditNoteReducerList


});

export default rootreducer;
