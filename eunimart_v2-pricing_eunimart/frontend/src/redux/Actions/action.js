import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../../baseurl";

const getPricingData = (data) => ({
  type: types.PRICING_LIST,
  payload: data,
});

export const loadPricingData = (params1) => {
  console.log("called");
  var params = {
    per_page: params1?.per_page ? params1?.per_page : params1?.limit,
    page_no: params1?.page_no ? params1?.page_no : params1?.offset,
    filters: params1?.filters,
    sort: params1?.sort,
  };
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/pricing`, { params, headers })
      .then((resp) => {
        dispatch(getPricingData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

//___________________________________________________________

const getPricingDataById = (data) => ({
  type: types.PRICING_VIEW_ID,
  payload: data,
});

export const loadPricingDataById = (Id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/pricing/` + Id, { headers })
      .then((resp) => {
        dispatch(getPricingDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

//------------------------------------------------------//

//#region Get Currency list
const getCurrencyData = (data) => ({
  type: types.CURRENCY_TYPE,
  payload: data,
});

export const loadCurrencyData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/currencies`, { headers })
      .then((resp) => {
        dispatch(getCurrencyData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Currency list

//------------------------------------------------------//

const getUOMData = (data) => ({
  type: types.UOM_LIST,
  payload: data,
});

export const loadUOMData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/uom/dropdown`, { headers })
      .then((resp) => {
        dispatch(getUOMData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get uom list

//------------------------------------------------------//

const getProductVariantData = (data) => ({
  type: types.PRODUCT_VARIANT_LIST,
  payload: data,
});

export const loadProductVariantData = (param) => {
  return function (dispatch) {
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      filters: param.filters,
      sort: param.sort,
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/products/variant/dropdown`, { params, headers })
      .then((resp) => {
        dispatch(getProductVariantData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get getProductVariantData list


//CAtegory Time
const getCategoryTimeData = (data) => ({
  type: types.CATEGORY_TIME_LIST,
  payload: data,
});

export const loadCategoryTimeData = (param) => {
  return function (dispatch) {
  
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/products/category/dropdown`, {  headers })
      .then((resp) => {
        dispatch(getCategoryTimeData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

const getQuantityType = (data) => ({
  type: types.QUANTITY_VALUE_TYPE,
  payload: data,
});

export const loadgetQuantityType = (param) => {
  return function (dispatch) {

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/quantity_value_type`, { headers })
      .then((resp) => {
        dispatch(getQuantityType(resp.data));
      })
      .catch((error) => console.log(error));
  };
};


const getpriceList = (data) => ({
  type: types.PRICE_LIST_POST,
  payload: data,
});

export const postPriceList = (data) => {
  return function (dispatch) {

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(`${BASE_API_SOURCE.url}api/v1/pricing/create`, JSON.stringify(data), {headers })
      .then((resp) => {
        dispatch(getpriceList(resp.data));
      })
      .catch((error) => console.log(error));
  };
};


const vendorsList = (data) => ({
  type: types.VENDORS_LIST,
  payload: data,
});

export const getVendors = (data) => {
  return function (dispatch) {

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/vendors/dropdown`,  {headers })
      .then((resp) => {
        dispatch(vendorsList(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

// _____________________________________________________________________________

const getdeleteData = (data) => ({
  type: types.DELETE_PRICING_REQUEST,
  payload: data,
})


export const deletePricing = (id) => {
  console.log("ididididid",id)
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .delete(`${BASE_API_SOURCE.url}api/v1/pricing/${id}/delete`, { headers })
      .then((resp) => { 
        dispatch(getdeleteData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};



// __________________________________________________________________________--

const getUpdate_Pricing_Data = (data) => ({
  type: types.UPDATE_PRICING_DATA,
  payload: data,
});

export const Update_Pricing_Data = (data,id) => { 
  // console.log(data,"dtaInPayloadddd")
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios.post(`${BASE_API_SOURCE.url}api/v1/pricing/${id}/edit`, JSON.stringify(data), { headers })
      .then((resp) => { 
        dispatch(getUpdate_Pricing_Data(resp.data));
      })
      .catch((error) => console.log(error));
  };
};




// ___________________________________________________________
// ________Locations_________________________________________


const getLocationData = (data) => ({
  type: types.LOCATION_LIST,
  payload: data,
});

export const loadLocationsData = () => {

  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/locations/dropdown`, { headers })
      .then((resp) => { 
        dispatch(getLocationData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};



// _______________________________________________________________________________________
// _________________________delete Product Lines


const getdeleteProductData = (data) => ({
  type: types.DELETE_PRODUCT_LINE,
  payload: data,
})


export const deleteProductLine = (id,plid) => {
  console.log("ididididid",id)
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .delete(`${BASE_API_SOURCE.url}api/v1/pricing/${id}/delete_line_items?product_id=${plid}`, { headers })
      .then((resp) => { 
        dispatch(getdeleteProductData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};


const accessManagement = (data) => ({
  type: types.ACCESS_MANAGEMENT,
  payload: data,
});

export const viewAccessManagement = () => {
  console.log("asdfg")
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios

      // .get(`${BASE_API_SOURCE.url}api/v1/template/1?filters=[["display_name","=","PRICING"]]`, { headers })
      .get(`${BASE_API_SOURCE.url}api/v1/template/${localStorage.getItem("access_template_id")}?filters=[["display_name","=","PRICING"]]`, { headers })
      .then((resp) => {
        console.log("sample",resp.data)
        dispatch(accessManagement(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

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