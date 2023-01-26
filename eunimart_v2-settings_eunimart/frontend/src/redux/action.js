import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../baseurl";

//#region Get Sales Order List
const getSalesData = (data) => ({
  type: types.SALES_LIST,
  payload: data,
});

export const loadSalesData = (param) => { 
  return function (dispatch) { 
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      filters:param.filters,
      sort:param.sort
    };   

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/sales_orders`, { params, headers })
      .then((resp) => { 
        dispatch(getSalesData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Sales Order List

//#region Get Sales Order Data By Id
const getSalesDataById = (data) => ({
  type: types.SALES_VIEW,
  payload: data,
});

export const loadSalesDataById = (Id) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/sales_orders/`+Id, { headers })
      .then((resp) => { 
        dispatch(getSalesDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Sales Order Data By Id

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

    axios.get(`${BASE_API_SOURCE.url}api/v1/core/currencies`, { headers })
      .then((resp) => { 
        dispatch(getCurrencyData(resp.data));
       
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Currency list

//#region Get Country list
const getCountryData = (data) => ({
  type: types.COUNTRY_LIST,
  payload: data,
});

export const loadCountryData = () => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/core/countries`, { headers })
      .then((resp) => { 
        dispatch(getCountryData(resp.data));       
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Currency list


//#region Get State Data By Id
const getStateDataById = (data) => ({
  type: types.STATE_LIST,
  payload: data,
});

export const loadStateDataById = (Id) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/core/states/`+Id, { headers })
      .then((resp) => { 
        dispatch(getStateDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get State Data By Id


//#region Get Payment Terms list
const getPaymentTermsData = (data) => ({
  type: types.PAYMENT_TERMS_LIST,
  payload: data,
});

export const loadPaymentTermsData = (type) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/`+type, { headers })
      .then((resp) => { 
        dispatch(getPaymentTermsData(resp.data));       
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Payment Terms list


//#region Get vendors list
const getGeneralSettings = (data) => ({
  type: types.GENERAL_SETTINGS,
  payload: data,
});

export const loadGeneralSettings = () => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/core/company_preferences/1`, { headers })
      .then((resp) => { 
        dispatch(getGeneralSettings(resp.data));       
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get vendors list


//#region Get vendors Data By Id
const getInvoiceData = (data) => ({
  type: types.INVOICE_DETAILS,
  payload: data,
});

export const loadInvoiceData = () => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/invoice_generation`)
      .then((resp) => { 
        dispatch(getInvoiceData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get vendors Data By Id


//#region Get uom list
const getFilePreference = (data) => ({
  type: types.FILE_PREFERENCE,
  payload: data,
});

export const loadFilePrefences = () => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/core/apps/installed?per_page=100&page_no=1&filters=[["category_name","ilike","cloud"], ["app_services","@>","[\\"STORAGE\\"]"]]`, { headers })
      .then((resp) => { 
        dispatch(getFilePreference(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get uom list

//#region Get uom list
const getFilePreferenceCodes = (data) => ({
  type: types.FILE_CODES,
  payload: data,
});

export const loadFilePrefencesCodes = (param) => { 
  return function (dispatch) {     
   
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/file_services`, {  headers })
      .then((resp) => { 
        dispatch(getFilePreferenceCodes(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get uom list


//#region Get uom list
const getBusinessTypes = (data) => ({
  type: types.BUSINES_TYPES,
  payload: data,
});

export const businessTypes = (param) => { 
  return function (dispatch) {     
   
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/type_of_business`, {  headers })
      .then((resp) => { 
        dispatch(getBusinessTypes(resp.data));
      })
      .catch((error) => console.log(error));
  };
};


const auth = (data) => ({
  type: types.AUTH_ME,
  payload: data,
});

export const loadAuthData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
      // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MjEsIlVzZXJuYW1lIjoiIiwiYWNjZXNzX3RlbXBsYXRlX2lkIjozLCJjb21wYW55X2lkIjoxLCJleHAiOjE2NjQ3NzYxNDksImZpcnN0X25hbWUiOiJLYXVzaWMiLCJsYXN0X25hbWUiOiJNIn0.FheqQe0VjHglPFrjp_D0-8wanwUBqs-vVvl5pjUK6Lo"
    };

    axios
      .get(`${BASE_API_SOURCE.url}auth/me`, { headers })
      .then((resp) => { 
        console.log("resprespresp",resp.data)
        dispatch(auth(resp.data));
      })
      .catch((error) => console.log(error));
  };
};


//#region Get uom list
const getSave_Sales_Order_Data = (data) => ({
  type: types.SAVE_SALES_ORDER,
  payload: data,
});

export const Save_Sales_Order_Data = (data, callback) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.post(`${BASE_API_SOURCE.url}api/v1/core/company_preferences/1/update`, JSON.stringify(data), { headers })
      .then((resp) => {         
        //dispatch(getSave_Sales_Order_Data(resp.data)); 
        const result = {
          status: resp.status + "-" + resp.statusText,
          headers: resp.headers,
          data: resp.data.meta.message,
        }; 
        callback(result.data) 
      })
      .catch((error) => {
        callback(error.response?.data.meta.message || error) 
      });
  };
};
//#endregion Get uom list


//#region Get uom list
const getUpdate_Order_Data = (data) => ({
  type: types.UPDATE_ORDER,
  payload: data,
});

export const Update_Sales_Order_Data = (id, data, callback) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.post(`${BASE_API_SOURCE.url}api/v1/sales_orders/${id}/update`, JSON.stringify(data), { headers })
      .then((resp) => {         
        //dispatch(getUpdate_Order_Data(resp.data));  
        const result = {
          status: resp.status + "-" + resp.statusText,
          headers: resp.headers,
          data: resp.data.meta.message,
        }; 
        callback(result.data) 
      })
      .catch((error) => {
        callback(error.response?.data.meta.message || error) 
      });
  };
};
//#endregion Get uom list

//#region Get Contacts List
const getContactData = (data) => ({
  type: types.CONTACTS_LIST,
  payload: data,
});

export const loadContactsData = (param) => { 
  return function (dispatch) { 
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      filters:param.filters,
      sort:param.sort
    };   

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/contacts`, { params, headers })
      .then((resp) => { 
        dispatch(getContactData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Contacts List



//#region Delete Data By Id
const getDeleteDataById = (data) => ({
  type: types.DELETE_DATA,
  payload: data,
});

export const loadDeleteDataById = (deleteId, callback) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.delete(`${BASE_API_SOURCE.url}api/v1/sales_orders/${deleteId}/delete`, { headers })
      .then((resp) => { 
        //dispatch(getDeleteDataById(resp.data));
        const result = {
          status: resp.status + "-" + resp.statusText,
          headers: resp.headers,
          data: resp.data.meta.message,
        }; 
        callback(result.data)
      })
      .catch((error) => {
        callback(error.response?.data.meta.message || error) 
      });
  };
};
//#endregion Delete Data By Id





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