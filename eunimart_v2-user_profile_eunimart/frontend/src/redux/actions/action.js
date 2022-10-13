import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../../baseurl";



const getpurchaseReturnsdata = (data) => ({
  type: types.PURCHASE_RETURNS_LIST,
  payload: data,
});


export const loadPurchaseReturnsData = (params1) => { console.log('PARAMS',params1)
return function (dispatch) {
  var params = {
    per_page:params1?.per_page ? params1?.per_page : params1?.limit ,
    page_no:params1?.page_no ? params1?.page_no: params1?.offset ,
    filters:params1?.filters,
    sort:params1?.sort
  };
  
  var headers = {
    "Content-type": "application/json",
    Authorization: `${BASE_API_SOURCE.token}`,
  };
  
  axios
  .get(`${BASE_API_SOURCE.url}api/v1/grn/dropdown`, { params, headers })
  .then((resp) => { 
    dispatch(getpurchaseReturnsdata(resp.data));
  })
  .catch((error) => console.log(error));
};
};



const getdeleteData = (data) => ({
  type: types.PURCHASE_RETURNS_DELETE,
  payload: data,
});

export const deletePurchaseReturnsbyId = (id) => {
  console.log("ididididid",id)
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .delete(`${BASE_API_SOURCE.url}api/v1/purchase_returns/${id}/delete`, { headers })
      .then((resp) => { 
        dispatch(getdeleteData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

const getpurchaseReturnsdataView = (data) => ({
  type: types.PURCHASE_RETURNS_LIST_VIEW,
  payload: data,
});

export const loadPurchaseReturnsDataView = (s1) => {
    console.log("s1s1",s1)
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/purchase_returns/${s1}`, { headers })
      .then((resp) => { 
        console.log("resprespresp",resp)
        dispatch(getpurchaseReturnsdataView(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
const getproductList = (data) => ({
  type: types.PRODUCTS_LIST,
  payload: data,
});

export const loadProductsListData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/products/variant`, { headers })
      .then((resp) => { 
        console.log("resprespresp",resp.data)
        dispatch(getproductList(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

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

    axios.get(`${BASE_API_SOURCE.url}api/v1/core/currencies`,{ headers })
      .then((resp) => { 
        dispatch(getCurrencyData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
const getSave_Purchase_Return_Data = (data) => ({
  type: types.Save_Purchase_Return,
  payload: data,
});

export const Save_Purchase_Return_Data = (data, callback) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.post(`${BASE_API_SOURCE.url}api/v1/purchase_returns/create`, JSON.stringify(data), { headers })
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
const getpaymentterms = (data) => ({
  type: types.PAYMENT_TERMS,
  payload: data,
});

export const loadPaymentTerms = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/payment_terms`, { headers })
      .then((resp) => { 
        console.log("resprespresp",resp.data)
        dispatch(getpaymentterms(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
const getUpdate_Purchase_Return_Data = (data) => ({
  type: types.UPDATE_ORDER,
  payload: data,
});

export const Update_Purchase_Return_Data = (id, data, callback) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.post(`${BASE_API_SOURCE.url}api/v1/purchase_returns/${id}/update`, JSON.stringify(data), { headers })
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
const getpurchaseOrders = (data) => ({
  type: types.PURCHASE_ORDERS,
  payload: data,
});

export const loadpurchaseOrders = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/purchase_orders`, { headers })
      .then((resp) => { 
        console.log("resprespresp",resp.data)
        dispatch(getpurchaseOrders(resp.data));
      })
      .catch((error) => console.log(error));
  };
};




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







//#region Get Purchase Order Data By Id
const getPurchaseDataById = (data) => ({
  type: types.PURCHASE_VIEW,
  payload: data,
});

export const loadPurchaseDataById = (Id) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/purchase_orders/`+Id, { headers })
      .then((resp) => { 
        dispatch(getPurchaseDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Sales Order Data By Id

//#region Get source document types list
const getSOURCE_DOCUMENTData = (data) => ({
  type: types.SOURCE_DOCUMENT_LIST,
  payload: data,
});

export const loadSOURCE_DOCUMENTData = () => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/Purchase_Returns_Source_Document_Types`, { headers })
      .then((resp) => { 
        dispatch(getSOURCE_DOCUMENTData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get source document types list




const getSalesReturnsdata = (data) => ({
  type: types.SALES_RETURNS_LIST,
  payload: data,
});


export const loadSalesReturnsData = (params1) => { console.log('PARAMS',params1)
  return function (dispatch) {
    var params = {
      per_page:params1?.per_page ? params1?.per_page : params1?.limit ,
      page_no:params1?.page_no ? params1?.page_no: params1?.offset ,
      filters:params1?.filters,
      sort:params1?.sort
    };

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/sales_returns`, { params, headers })
      .then((resp) => { 
        dispatch(getSalesReturnsdata(resp.data));
      })
      .catch((error) => console.log(error));
  };
};


// __________________________________________

const getSalesReturnsdataView = (data) => ({
  type: types.SALES_RETURNS_LIST_VIEW,
  payload: data,
});

export const loadSalesReturnsDataView = (s1) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/sales_returns/${s1}`, { headers })
      .then((resp) => { 
        dispatch(getSalesReturnsdataView(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

// __________________________________________

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
    // .get(`${BASE_API_SOURCE.url}api/v1/template/2?filters=[["display_name","=","PURCHASE_RETURNS"]]`, { headers })
    .get(`${BASE_API_SOURCE.url}api/v1/template/${localStorage.getItem("access_template_id")}?filters=[["display_name","=","PURCHASE_RETURNS"]]`, { headers })
      .then((resp) => {
        console.log("sample",resp.data)
        dispatch(accessManagement(resp.data));
      })
      .catch((error) => console.log(error));
  };
};


// ___________________________________________________
// ___________________FILTER TABS_____________________
// ___________________________________________________

const getpurchaseInvoice = (data) => ({
  type: types.PURCHASE_INVOICE,
  payload: data,
});

export const loadPruchaseInvoiceData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/purchase_invoice`, { headers })
      .then((resp) => { 
        console.log("resprespresp",resp.data)
        dispatch(getpurchaseInvoice(resp.data));
      })
      .catch((error) => console.log(error));
  };
};




// ________________________________________________________
// ________________________________________________________
// ________________________________________________________
// ________________________________________________________
// ________________________________________________________
// ________________________________________________________
// ________________________________________________________
// ________________________________________________________



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



const authPost = (data) => ({
  type: types.AUTH_ME_UPDATE,
  payload: data,
});

export const loadAuthDataUpdate = (data) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
      // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MjEsIlVzZXJuYW1lIjoiIiwiYWNjZXNzX3RlbXBsYXRlX2lkIjozLCJjb21wYW55X2lkIjoxLCJleHAiOjE2NjQ2OTE2ODksImZpcnN0X25hbWUiOiJLYXVzaWMiLCJsYXN0X25hbWUiOiJNIn0.8IcKB80MNUEmcGtGlt4pbEu-vHHVPBsh3g0rw-m94dU"
    };

    axios
      .post(`${BASE_API_SOURCE.url}auth/update_profile`,JSON.stringify(data),{ headers })
      .then((resp) => { 
        console.log("resprespresp",resp.data)
        dispatch(authPost(resp.data));
      })
      .catch((error) => console.log(error));
  };
};


const timeZone = (data) => ({
  type: types.TIME_ZONE,
  payload: data,
});

export const loadTimeZone = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
      // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MjEsIlVzZXJuYW1lIjoiIiwiYWNjZXNzX3RlbXBsYXRlX2lkIjozLCJjb21wYW55X2lkIjoxLCJleHAiOjE2NjQ2OTE2ODksImZpcnN0X25hbWUiOiJLYXVzaWMiLCJsYXN0X25hbWUiOiJNIn0.8IcKB80MNUEmcGtGlt4pbEu-vHHVPBsh3g0rw-m94dU"
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/TIME_ZONE`, { headers })
      .then((resp) => { 
        console.log("resprespresp",resp.data)
        dispatch(timeZone(resp.data));
      })
      .catch((error) => console.log(error));
  };
};



const dateFormat = (data) => ({
  type: types.DATE_FORMAT,
  payload: data,
});

export const loadDateFormat = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
      // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MjEsIlVzZXJuYW1lIjoiIiwiYWNjZXNzX3RlbXBsYXRlX2lkIjozLCJjb21wYW55X2lkIjoxLCJleHAiOjE2NjQ2OTE2ODksImZpcnN0X25hbWUiOiJLYXVzaWMiLCJsYXN0X25hbWUiOiJNIn0.8IcKB80MNUEmcGtGlt4pbEu-vHHVPBsh3g0rw-m94dU"
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/DATE_FORMAT`, { headers })
      .then((resp) => { 
        console.log("resprespresp",resp.data)
        dispatch(dateFormat(resp.data));
      })
      .catch((error) => console.log(error));
  };
};


const timeFormat = (data) => ({
  type: types.TIME_FORMAT,
  payload: data,
});

export const loadTimeFormat = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
      // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MjEsIlVzZXJuYW1lIjoiIiwiYWNjZXNzX3RlbXBsYXRlX2lkIjozLCJjb21wYW55X2lkIjoxLCJleHAiOjE2NjQ2OTE2ODksImZpcnN0X25hbWUiOiJLYXVzaWMiLCJsYXN0X25hbWUiOiJNIn0.8IcKB80MNUEmcGtGlt4pbEu-vHHVPBsh3g0rw-m94dU"
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/TIME_FORMAT`, { headers })
      .then((resp) => { 
        console.log("resprespresp",resp.data)
        dispatch(timeFormat(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

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