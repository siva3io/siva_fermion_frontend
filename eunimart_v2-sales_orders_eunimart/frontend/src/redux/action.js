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
const getVendorsData = (data) => ({
  type: types.VENDORS_LIST,
  payload: data,
});

export const loadVendorsData = () => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/vendors`, { headers })
      .then((resp) => { 
        dispatch(getVendorsData(resp.data));       
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get vendors list


//#region Get vendors Data By Id
const getvendorsDataById = (data) => ({
  type: types.VENDORS_DETAILS,
  payload: data,
});

export const loadvendorsDataById = (Id) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/vendors/`+Id, { headers })
      .then((resp) => { 
        dispatch(getvendorsDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get vendors Data By Id


//#region Get uom list
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

    axios.get(`${BASE_API_SOURCE.url}api/v1/uom`, { headers })
      .then((resp) => { 
        dispatch(getUOMData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get uom list

//#region Get uom list
const getProductVariantData = (data) => ({
  type: types.PRODUCT_VARIANT_LIST,
  payload: data,
});

export const loadProductVariantData = (param) => { 
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

    axios.get(`${BASE_API_SOURCE.url}api/v1/products/variant`, { params, headers })
      .then((resp) => { 
        dispatch(getProductVariantData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get uom list



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

    axios.post(`${BASE_API_SOURCE.url}api/v1/sales_orders/create`, JSON.stringify(data), { headers })
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



//#region Get Access Management List
const getAccessManagementData = (data) => ({
  type: types.ACCESS_MANAGEMENT_LIST,
  payload: data,
});

export const loadAccessManagementData = (param) => {  
  return function (dispatch) { 
    var params = {  
      filters: JSON.stringify([["display_name","=","SALES_ORDERS"]])
    };   

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

     axios.get(`${BASE_API_SOURCE.url}api/v1/template/` + (location.hostname === "localhost" ? 4 : localStorage.getItem('access_template_id')), { params, headers })
      .then((resp) => { 
        dispatch(getAccessManagementData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Access Management List


//#region Get Delivery Order List
const getDeliveryData = (data) => ({
  type: types.DELIVERY_ORDERS_LIST,
  payload: data,
});

export const loadDeliveryData = (param) => { 
  return function (dispatch) { 
    var params = {
      id: param.Id,
      per_page: param.limit,
      page_no: param.offset,
      filters:param.filters,
      sort:param.sort
    };   

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/sales_orders/` + params.id + `/filter_module/delivery_orders`, { params, headers })
      .then((resp) => { 
        dispatch(getDeliveryData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Delivery Order List


//#region Get Purchase Order List
const getPurchaseData = (data) => ({
  type: types.PURCHASE_ORDERS_LIST,
  payload: data,
});

export const loadPurchaseData = (param) => { 
  return function (dispatch) { 
    var params = {
      id: param.Id,
      per_page: param.limit,
      page_no: param.offset,
      filters:param.filters,
      sort:param.sort
    };   

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/sales_orders/` + params.id + `/filter_module/purchase_orders`, { params, headers })
      .then((resp) => { 
        dispatch(getPurchaseData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Purchase Order List



//#region Get Sales Invoice List
const getSalesInvoiceData = (data) => ({
  type: types.SALES_INVOICE_LIST,
  payload: data,
});

export const loadSalesInvoiceData = (param) => { 
  return function (dispatch) { 
    var params = {
      id: param.Id,
      per_page: param.limit,
      page_no: param.offset,
      filters:param.filters,
      sort:param.sort
    };   

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/sales_orders/` + params.id + `/filter_module/sales_invoice`, { params, headers })
      .then((resp) => { 
        dispatch(getSalesInvoiceData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Sales Invoice List



//#region Get Sales Returns List
const getSalesReturnsData = (data) => ({
  type: types.SALES_RETURNS_LIST,
  payload: data,
});

export const loadSalesReturnsData = (param) => { 
  return function (dispatch) { 
    var params = {
      id: param.Id,
      per_page: param.limit,
      page_no: param.offset,
      filters:param.filters,
      sort:param.sort
    };   

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/sales_orders/` + params.id + `/filter_module/sales_returns`, { params, headers })
      .then((resp) => { 
        dispatch(getSalesReturnsData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Sales Returns List



//#region Get Credit Note List
const getCredit_NoteData = (data) => ({
  type: types.CREDIT_NOTE_LIST,
  payload: data,
});

export const loadCredit_NoteData = (param) => { 
  return function (dispatch) { 
    var params = {
      id: param.Id,
      per_page: param.limit,
      page_no: param.offset,
      filters:param.filters,
      sort:param.sort
    };   

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/sales_orders/` + params.id + `/filter_module/credit_note`, { params, headers })
      .then((resp) => { 
        dispatch(getCredit_NoteData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Credit Note List

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