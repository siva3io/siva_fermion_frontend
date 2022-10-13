import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../../baseurl";

const getProductData = (data) => ({
  type: types.PURCHASE_ORDERS_LIST,
  payload: data,
});

export const loadProductOrdersData = (params1) => {
  console.log("called")
  var params = {
    per_page: params1?.per_page ? params1?.per_page : params1?.limit,
    page_no: params1?.page_no ? params1?.page_no : params1?.offset,
    filters: params1?.filters,
    sort: params1?.sort
  };
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/purchase_orders`, { params, headers })
      .then((resp) => {
        dispatch(getProductData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};


// ________________________________________________________
const getProductDataById = (data) => ({
  type: types.PURCHASE_ORDERS_LIST_BY_ID,
  payload: data,
});

export const loadProductOrdersDataByID = (id) => {

  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    if (id !== undefined && id !== null) {
      axios
        .get(`${BASE_API_SOURCE.url}api/v1/purchase_orders/${id}`, { headers })
        .then((resp) => {
          dispatch(getProductDataById(resp.data));
        })
        .catch((error) => console.log(error));
    }
  };
};



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

    axios.get(`${BASE_API_SOURCE.url}api/v1/core/states/` + Id, { headers })
      .then((resp) => {
        dispatch(getStateDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get State Data By Id

// ?____________________

const getSave_Purchase_Order_Data = (data) => ({
  type: types.SAVE_PURCHASE_ORDER,
  payload: data,
});

export const Save_Purchase_Order_Data = (data) => {
  return function (dispatch) {

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.post(`${BASE_API_SOURCE.url}api/v1/purchase_orders/create`, JSON.stringify(data), { headers })
      .then((resp) => {
        //console.log("/api/v1/sales_orders/create", resp)
        dispatch(getSave_Purchase_Order_Data(resp.data));
      })
      .catch((error) => console.log(error));
  };
};




const getEdit_Purchase_Order_Data = (data) => ({
  type: types.EDIT_PURCHASE_ORDER,
  payload: data,
});
export const Edit_Purchase_Order_Data = (data, id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios.post(`${BASE_API_SOURCE.url}api/v1/purchase_orders/${id}/update`, JSON.stringify(data), { headers })
      .then((resp) => {
        dispatch(getEdit_Purchase_Order_Data(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

//#endregion Get 

// ___________________________________________
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
      sort: param.sort
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




const getLocationData = (data) => ({
  type: types.LOCATION_LIST,
  payload: data,
});

export const loadLocationsData = (params1) => {
  var params = {
    per_page: params1?.per_page ? params1?.per_page : params1?.limit,
    page_no: params1?.page_no ? params1?.page_no : params1?.offset,
    filters: params1?.filters,
    sort: params1?.sort
  };
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/locations/dropdown`, { params, headers })
      .then((resp) => {
        dispatch(getLocationData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

// _________________________________________________


//#region Get rate_calculator Estimated Cost list
const getrate_calculator_Data = (data) => ({
  type: types.RATE_CALCULATOR_LIST,
  payload: data,
});

export const load_rate_calculator_data = (data) => {
  return function (dispatch) {

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.post(`${BASE_API_SOURCE.url}ipaas/shipping/rate_calculator`, JSON.stringify(data), { headers })
      .then((resp) => {
        dispatch(getrate_calculator_Data(resp.data));
      })
      .catch((error) => {
        console.log(error)
      });
  };
};
//#endregion Get rate_calculator Estimated Cost list


// ______________________________________________________

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

    axios.get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/` + type, { headers })
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

    axios.get(`${BASE_API_SOURCE.url}api/v1/vendors/dropdown`, { headers })
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
  console.log("redux id", Id)
  return function (dispatch) {

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/vendors/` + Id, { headers })
      .then((resp) => {
        dispatch(getvendorsDataById(resp.data));
        console.log(resp.data.data, "response")
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get vendors Data By Id




const getOrganisationData = (data) => ({
  type: types.CONTACTS_DETAILS,
  payload: data,
});

export const loadOgranisationdata = () => {
  return function (dispatch) {

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios.get(`${BASE_API_SOURCE.url}api/v1/contacts/dropdown?filters=[["contact_type_id","=","58"]]`, { headers })
      .then((resp) => {
        dispatch(getOrganisationData(resp.data));
        console.log(resp.data.data, "response")
      })
      .catch((error) => console.log(error));
  };
};




const getOrganisationDataId = (data) => ({
  type: types.CONTACTS_DETAILS_ID,
  payload: data,
});

export const loadOgranisationdataid = (id) => {
  return function (dispatch) {

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios.get(`${BASE_API_SOURCE.url}api/v1/contacts/${id}`, { headers })
      .then((resp) => {
        dispatch(getOrganisationDataId(resp.data));
        console.log(resp.data.data, "response")
      })
      .catch((error) => console.log(error));
  };
};

// ____________________________________

const getdeleteData = (data) => ({
  type: types.DELETE_PO_REQUEST,
  payload: data,
})

const getSourceDocTypesData = (data) => ({
  type: types.SOURCE_DOC_TYPE_REQUEST,
  payload: data,
})


export const deletePo = (id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .delete(`${BASE_API_SOURCE.url}api/v1/purchase_orders/${id}/delete`, { headers })
      .then((resp) => {
        dispatch(getdeleteData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};


export const loadSourceDocTypes = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/purchase_orders_source_document_types`, { headers })
      .then((resp) => {
        dispatch(getSourceDocTypesData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};



const getASNData = (data) => ({
  type: types.ASN_LIST,
  payload: data,
});


export const loadASNData = (param) => {
  return function (dispatch) {
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      filters: param.filters,
      sort: param.sort
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios.get(`${BASE_API_SOURCE.url}api/v1/asn/dropdown`, { params, headers })
      .then((resp) => {
        dispatch(getASNData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

const getASNDataById = (data) => ({
  type: types.ASN_VIEW,
  payload: data,
});
export const loadASNDataById = (Id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios.get(`${BASE_API_SOURCE.url}api/v1/asn/` + Id, { headers })
      .then((resp) => {
        dispatch(getASNDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};






const getloadGrnData = (data) => ({
  type: types.GRN_LIST,
  payload: data,
});
export const loadGrnData = (param) => {
  return function (dispatch) {
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      filters: param.filters,
      sort: param.sort
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios.get(`${BASE_API_SOURCE.url}api/v1/grn/dropdown`, { params, headers })
      .then((resp) => {
        dispatch(getloadGrnData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get ASN Order List
//#region Get ASN Order Data By Id
const getloadGrnDataById = (data) => ({
  type: types.GRN_VIEW,
  payload: data,
});

export const loadGrnDataById = (Id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios.get(`${BASE_API_SOURCE.url}api/v1/grn/` + Id, { headers })
      .then((resp) => {
        dispatch(getloadGrnDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};










const getloadSalesOrdersData = (data) => ({
  type: types.SALES_ORDERS_LIST,
  payload: data,
});
export const loadSalesOrdersData = (param) => {
  return function (dispatch) {
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      filters: param.filters,
      sort: param.sort
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios.get(`${BASE_API_SOURCE.url}api/v1/sales_orders/dropdown`, { params, headers })
      .then((resp) => {
        dispatch(getloadSalesOrdersData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get ASN Order List
//#region Get ASN Order Data By Id
const getloadSalesOrdersDataById = (data) => ({
  type: types.SALES_ORDERS_VIEW,
  payload: data,
});

export const loadSalesOrdersDataById = (Id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios.get(`${BASE_API_SOURCE.url}api/v1/sales_orders/` + Id, { headers })
      .then((resp) => {
        dispatch(getloadSalesOrdersDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};



const getloadDeliveryOrderData = (data) => ({
  type: types.DELIVERY_ORDERS_LIST,
  payload: data,
});
export const loadDeliveryOrderData = (param) => {
  return function (dispatch) {
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      filters: param.filters,
      sort: param.sort
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios.get(`${BASE_API_SOURCE.url}api/v1/delivery_orders/dropdown`, { params, headers })
      .then((resp) => {
        dispatch(getloadDeliveryOrderData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get ASN Order List
//#region Get ASN Order Data By Id
const getloadDeliveryOrderDataById = (data) => ({
  type: types.DELIVERY_ORDERS_VIEW,
  payload: data,
});

export const loadDeliveryOrderDataById = (Id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios.get(`${BASE_API_SOURCE.url}api/v1/delivery_orders/` + Id, { headers })
      .then((resp) => {
        dispatch(getloadDeliveryOrderDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};





const getloadScrapOrderData = (data) => ({
  type: types.SCRAP_ORDERS_LIST,
  payload: data,
});
export const loadScrapOrderData = (param) => {
  return function (dispatch) {
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      filters: param.filters,
      sort: param.sort
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios.get(`${BASE_API_SOURCE.url}api/v1/scrap_orders/dropdown`, { params, headers })
      .then((resp) => {
        dispatch(getloadScrapOrderData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get ASN Order List
//#region Get ASN Order Data By Id
const getloadScrapOrdersDataById = (data) => ({
  type: types.SCRAP_ORDERS_VIEW,
  payload: data,
});

export const loadScrapOrdersDataById = (Id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios.get(`${BASE_API_SOURCE.url}api/v1/scrap_orders/` + Id, { headers })
      .then((resp) => {
        dispatch(getloadScrapOrdersDataById(resp.data));
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
      // .get(`${BASE_API_SOURCE.url}api/v1/template/2?filters=[["display_name","=","PURCHASE_ORDERS"]]`, { headers })
      .get(`${BASE_API_SOURCE.url}api/v1/template/${localStorage.getItem("access_template_id")}?filters=[["display_name","=","PURCHASE_ORDERS"]]`, { headers })
      .then((resp) => {
        console.log("sample",resp.data)
        dispatch(accessManagement(resp.data));
      })
      .catch((error) => console.log(error));
  };
};



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
      .delete(`${BASE_API_SOURCE.url}api/v1/purchase_orders/order_lines/${id}/delete?product_id=${plid}`, { headers })
      .then((resp) => { 
        dispatch(getdeleteProductData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

// ______________________________________________________________________________
// ______________________________________________________________________________
// ______________________________________________________________________________
// ______________________________________________________________________________
// ______________________________________________________________________________
// ______________________________________________________________________________
// ______________________________________________________________________________
// ______________________________________________________________________________
// ______________ Tab_Filters____________________________________________________


const getPurchaseReturnData = (data) => ({
  type: types.PURCHASE_RETURNS_LIST,
  payload: data,
});

export const loadPurchaseReturnsData = (id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/purchase_orders/${id}/filter_module/purchase_returns`, { headers })
      .then((resp) => {
        dispatch(getPurchaseReturnData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};




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
      .get(`${BASE_API_SOURCE.url}api/v1/purchase_orders/${id}/filter_module/debit_note`, { headers })
      .then((resp) => { 
        dispatch(debitdataView(resp.data));
      })
      .catch((error) => console.log(error));
  };
};





const asnData = (data) => ({
  type: types.ASN_LIST_TAB,
  payload: data,
});

export const loadAsnData = (id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/purchase_orders/${id}/filter_module/asn`, { headers })
      .then((resp) => { 
        dispatch(asnData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};




const getPurchaseInvoice = (data) => ({
  type: types.PURCHASE_INVOICE_LIST_TAB,
  payload: data,
});

export const loadPurchaseInvoiceData = (id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/purchase_orders/${id}/filter_module/purchase_invoice`, { headers })
      .then((resp) => { 
        dispatch(getPurchaseInvoice(resp.data));
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