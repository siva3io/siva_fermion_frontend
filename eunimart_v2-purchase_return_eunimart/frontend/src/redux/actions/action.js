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
  .get(`${BASE_API_SOURCE.url}api/v1/purchase_returns/dropdown`, { params, headers })
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
      .get(`${BASE_API_SOURCE.url}api/v1/products/variant/dropdown`, { headers })
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

    axios.get(`${BASE_API_SOURCE.url}api/v1/uom/dropdown`, { headers })
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

    axios.get(`${BASE_API_SOURCE.url}api/v1/vendors/dropdown`, { headers })
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
      .get(`${BASE_API_SOURCE.url}api/v1/purchase_orders/dropdown`, { headers })
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

    axios.get(`${BASE_API_SOURCE.url}api/v1/sales_orders/dropdown`, { params, headers })
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
      .get(`${BASE_API_SOURCE.url}api/v1/sales_returns/dropdown`, { params, headers })
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


const debitdataView = (data) => ({
  type: types.DEBIT_LIST,
  payload: data,
});

export const loadDebitNoteData = (id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/purchase_returns/${id}/filter_module/debit_note`, { headers })
      .then((resp) => { 
        dispatch(debitdataView(resp.data));
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



// _____________________________________


const getdeleteProductData = (data) => ({
  type: types.DELETE_PRODUCT_LINE,
  payload: data,
})


export const deleteProductLine = (id,plid) => {
  console.log("asdfg")

  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .delete(`${BASE_API_SOURCE.url}api/v1/purchase_returns/return_lines/${id}/delete?product_id=${plid}`, { headers })
      .then((resp) => { 
        dispatch(getdeleteProductData(resp.data));
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