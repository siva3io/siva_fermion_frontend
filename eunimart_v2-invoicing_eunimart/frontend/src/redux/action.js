import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../baseurl";

//#region Get Pruchase Invoice List
const getPruchaseInvoiceData = (data) => ({
  type: types.PURCHASE_INVOICE_LIST,
  payload: data,
});

export const loadPruchaseInvoiceData = (param) => { 
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

    axios.get(`${BASE_API_SOURCE.url}api/v1/purchase_invoice`, { params, headers })
      .then((resp) => { 
        dispatch(getPruchaseInvoiceData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Pruchase Invoice List
 

//#region Get Purchase Invoice Data By Id
const getPurchaseInvoiceDataById = (data) => ({
  type: types.PURCHASE_INVOICE_VIEW,
  payload: data,
});

export const loadPurchaseInvoiceDataById = (Id) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/purchase_invoice/`+Id, { headers })
      .then((resp) => { 
        dispatch(getPurchaseInvoiceDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Delivery Order Data By Id


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

    axios.get(`${BASE_API_SOURCE.url}api/v1/uom/dropdown`, { headers })
      .then((resp) => { 
        dispatch(getUOMData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get uom list

//#region Get Product Variant list
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

    axios.get(`${BASE_API_SOURCE.url}api/v1/products/variant/dropdown`, { params, headers })
      .then((resp) => { 
        dispatch(getProductVariantData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Product Variant list
 
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
   
//#region Save Purchase Invoice
const getSave_Purchase_Invoice_Data = (data) => ({
  type: types.SAVE_PURCHASE_INVOICE_DATA,
  payload: data,
});

export const Save_Purchase_Invoice = (data, callback) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.post(`${BASE_API_SOURCE.url}api/v1/purchase_invoice/create`, JSON.stringify(data), { headers })
      .then((resp) => {         
        //dispatch(getSave_Purchase_Invoice_Data(resp.data)); 
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
 
//#region Get Delete Data By Id
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

    axios.delete(`${BASE_API_SOURCE.url}api/v1/purchase_invoice/${deleteId}/delete`, { headers })
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
//#endregion Get Delete Data By Id


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

    axios.get(`${BASE_API_SOURCE.url}api/v1/vendors/dropdown`, { headers })
      .then((resp) => { 
        dispatch(getVendorsData(resp.data));       
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get vendors list

//#region Update PR Orders
export const Update_Purchase_Invoice_Orders = (id, data, callback) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.post(`${BASE_API_SOURCE.url}api/v1/purchase_invoice/${id}/update`, JSON.stringify(data), { headers })
      .then((resp) => {         
        //dispatch(getUpdate_Delivery_Orders_Data(resp.data)); 
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
//#endregion Update PR Orders


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

    axios.get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/PURCHASE_INVOICE_SOURCE_DOCUMENT_TYPES`, { headers })
      .then((resp) => { 
        dispatch(getSOURCE_DOCUMENTData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get source document types list



//#region Get Purchase Order List
const getPurchaseOrderData = (data) => ({
  type: types.PURCHASE_ORDER_LIST,
  payload: data,
});

export const loadPurchaseOrderData = (param) => { 
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

    axios.get(`${BASE_API_SOURCE.url}api/v1/purchase_orders/dropdown`, { params, headers })
      .then((resp) => { 
        dispatch(getPurchaseOrderData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Purchase Order List



//#region Get Purchase Order Data By Id
const getPurchaseOrderDataById = (data) => ({
  type: types.PURCHASE_ORDER_VIEW,
  payload: data,
});

export const loadPurchaseOrderDataById = (Id) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/purchase_orders/`+Id, { headers })
      .then((resp) => { 
        dispatch(getPurchaseOrderDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Sales Order Data By Id

 

//#region Get Credit Note Order List
const getCreditNoteOrderData = (data) => ({
  type: types.CREDIT_NOTE_LIST,
  payload: data,
});

export const loadCreditNoteOrderData = (param) => { 
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

    axios.get(`${BASE_API_SOURCE.url}api/v1/creditnote/dropdown`, { params, headers })
      .then((resp) => { 
        dispatch(getCreditNoteOrderData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Credit Note Order List



//#region Get Credit Note Order Data By Id
const getCreditNoteOrderDataById = (data) => ({
  type: types.CREDIT_NOTE_VIEW,
  payload: data,
});

export const loadCreditNoteOrderDataById = (Id) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/creditnote/`+Id, { headers })
      .then((resp) => { 
        dispatch(getCreditNoteOrderDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Credit Note Order Data By Id



//#region Get Debit Note Order List
const getDebitNoteOrderData = (data) => ({
  type: types.DEBIT_NOTE_LIST,
  payload: data,
});

export const loadDebitNoteOrderData = (param) => { 
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

    axios.get(`${BASE_API_SOURCE.url}api/v1/debitnote/dropdown`, { params, headers })
      .then((resp) => { 
        dispatch(getDebitNoteOrderData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Debit Note Order List



//#region Get Debit Note Order Data By Id
const getDebitNoteOrderDataById = (data) => ({
  type: types.DEBIT_NOTE_VIEW,
  payload: data,
});

export const loadDebitNoteOrderDataById = (Id) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/debitnote/`+Id, { headers })
      .then((resp) => { 
        dispatch(getDebitNoteOrderDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Debit Note Order Data By Id




// # sales Invoice _____________________________________________________



const getsalesInvoicedata = (data) => ({
  type: types.SALES_INVOICE_LIST,
  payload: data,
});


export const loadSalesInvoiceData = (params1) => {

  return function (dispatch) {
    var params = {
      per_page: params1?.per_page ? params1?.per_page : params1?.limit ,
      page_no: params1?.page_no ? params1?.page_no: params1?.offset,
      filters:params1?.filters,
      sort:params1?.sort
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/sales_invoice`,{ params, headers })
      .then((resp) => { 
        console.log("resp",resp)
        dispatch(getsalesInvoicedata(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

const getdeleteData = (data) => ({
  type: types.SALES_INVOICE_LIST,
  payload: data,
});

export const deleteSalesInvoiceInvoice= (id) => {
  console.log("ididididid",id)
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .delete(`${BASE_API_SOURCE.url}api/v1/sales_invoice/${id}/delete`, { headers })
      .then((resp) => { 
        dispatch(getdeleteData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
const getsalesInvoicedataView = (data) => ({
  type: types.SALES_INVOICE_LIST_VIEW,
  payload: data,
});

export const loadSalesInvoiceDataView = (s1) => {
    console.log("s1s1",s1)
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/sales_invoice/${s1}`, { headers })
      .then((resp) => { 
        console.log("resprespresp",resp)
        dispatch(getsalesInvoicedataView(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
const getSalesOrder = (data) => ({
  type: types.LINK_SALES_ORDER,
  payload: data,
});


export const loadLinkSalesOrder = (type) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/source_document_types`, { headers })
      .then((resp) => { 
        dispatch(getSalesOrder(resp.data));       
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
const getUpdate_Sales_Invoice_Data = (data) => ({
  type: types.UPDATE_SALES_INVOICE,
  payload: data,
});

export const Update_Sales_Invoice_Data = (id, data, callback) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.put(`${BASE_API_SOURCE.url}api/v1/sales_invoice/${id}/edit`, JSON.stringify(data), { headers })
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
const getsinglesalesInvoicedata = (data) => ({
  type: types.SINGLE_SALES_INVOICE_DATA,
  payload: data,
});

export const loadSingleSalesInvoiceData = (s1) => {
    console.log("s1s1",s1)
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/sales_invoice/${s1}`, { headers })
      .then((resp) => { 
        console.log("resprespresp",resp)
        dispatch(getsinglesalesInvoicedata(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
const getSalesOrderList = (data) => ({
  type: types.SALES_ORDER_LIST,
  payload: data,
});

export const loadSalesOrderData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/sales_orders/dropdown`, { headers })
      .then((resp) => { 
        console.log("resprespresp",resp.data)
        dispatch(getSalesOrderList(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
const getSave_Sales_Invoice_Data = (data) => ({
  type: types.SAVE_SALES_INVOICE,
  payload: data,
});

export const Save_Sales_Invoice_Data = (data, callback) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.post(`${BASE_API_SOURCE.url}api/v1/sales_invoice/create`, JSON.stringify(data), { headers })
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
const getSalesOrdersDataList = (data) => ({
  type: types.SALES_ORDERS_LIST,
  payload: data,
});
export const loadSalesOrdersDataList = (param) => { 
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
        dispatch(getSalesOrdersDataList(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
const getSISOURCE_DOCUMENTData = (data) => ({
  type: types.SI_SOURCE_DOCUMENT_LIST,
  payload: data,
});

export const loadSISOURCE_DOCUMENTData = () => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/sales_invoice_source_document_types`, { headers })
      .then((resp) => { 
        dispatch(getSISOURCE_DOCUMENTData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
const getSalesOrderDataById = (data) => ({
  type: types.SALES_ORDER_VIEW,
  payload: data,
});

export const loadSalesOrderDataById = (Id) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/sales_orders/`+Id, { headers })
      .then((resp) => { 
        dispatch(getSalesOrderDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
// __________________________________________

const SIAccessManagement = (data) => ({
  type: types.SI_ACCESS_MANAGEMENT,
  payload: data,
});

export const viewSIAccessManagement = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
    // .get(`${BASE_API_SOURCE.url}api/v1/template/2?filters=[["display_name","=","SALES_INVOICE"]]`, { headers })
    .get(`${BASE_API_SOURCE.url}api/v1/template/${localStorage.getItem("access_template_id")}?filters=[["display_name","=","SALES_INVOICE"]]`, { headers })
      .then((resp) => {
        console.log("sample1",resp.data)
        dispatch(SIAccessManagement(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

// __________________________________________

const PIAccessManagement = (data) => ({
  type: types.PI_ACCESS_MANAGEMENT,
  payload: data,
});
export const viewPIAccessManagement = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
    // .get(`${BASE_API_SOURCE.url}api/v1/template/2?filters=[["display_name","=","PURCHASE_INVOICE"]]`, { headers })
    .get(`${BASE_API_SOURCE.url}api/v1/template/${localStorage.getItem("access_template_id")}?filters=[["display_name","=","PURCHASE_INVOICE"]]`, { headers })
      .then((resp) => {
        console.log("sample",resp.data)
        dispatch(PIAccessManagement(resp.data));
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
along with this program. If not, see http://www.gnu.org/licenses/.
*/