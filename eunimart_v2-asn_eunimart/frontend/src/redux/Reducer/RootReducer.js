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
  asnDeleteData : FetchAsnDeleteReducer,
  fetchAsnDataById: FetchAsnDataByIdReducer,
  fetchGrn: FetchGrnReducer,
  getSalesReturnsList: GetSalesReturnsReducerList,
  fetchScrap: FetchScrapReducer,
  fetchSourceDocumentData: fetchSourceDocumentTypeReducer,
  SearchSourceDocumentData: fetchSearchSourceDocumentTypeReducer,
  fetchProductsData: fetchProductDataReducer,
  fetchUOMDropdown:fetchUOMDropdownReducer,
  fetchPackageTypeDropDown:fetchPackageTypeReducer,
  States2:StatesReducer,
  Countries:CountriesReducer,
  estimatedcost:EstimatedCostReducer,
  createAsn: CreateAsnReducer,
  editAsn: EditAsnReducer,
  FetchSOById:FetchSOByIdReducer,
  FetchPOById:FetchPOByIdReducer,
  FetchPRById:FetchPRByIdReducer,
  FetchISTById:FetchISTByIdReducer,
  fetchlocationsnData:fetchLocationDataReducer,
  fetchAccessToken:AccessMngReducer,
  FetchInventory:FetchInventoryReducer,
  deleteProductline:ProductLineDeleteReducer


});

export default rootreducer;
