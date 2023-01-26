import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../baseurl";

//#region Get Sales Order List
const getSalesData = data => ({
  type: types.SALES_LIST,
  payload: data,
});

export const loadSalesData = param => {
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
      .get(`${BASE_API_SOURCE.url}api/v1/creditnote/dropdown`, {
        params,
        headers,
      })
      .then(resp => {
        dispatch(getSalesData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

const getContactsData = data => ({
  type: types.CONTACTS_LIST,
  payload: data,
});

export const loadContacsData = param => {
  return function (dispatch) {
    var params = {
      per_page: 100,
      page_no: 1,
    };

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/contacts/dropdown`, {
        params,
        headers,
      })
      .then(resp => {
        dispatch(getContactsData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

const getInvoiceData = data => ({
  type: types.PURCHASE_INVOICE,
  payload: data,
});

export const loadInvoiceData = param => {
  return function (dispatch) {
    var params = {
      per_page: 100,
      page_no: 1,
    };

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}/api/v1/purchase_invoice/dropdown`, {
        params,
        headers,
      })
      .then(resp => {
        dispatch(getInvoiceData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

//#endregion Get Sales Order List

//#region Get Sales Order Data By Id
const getSalesDataById = data => ({
  type: types.SALES_VIEW,
  payload: data,
});

export const loadSalesDataById = Id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/creditnote/` + Id, { headers })
      .then(resp => {
        dispatch(getSalesDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Sales Order Data By Id

//#region Get Currency list
const getCurrencyData = data => ({
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
      .then(resp => {
        dispatch(getCurrencyData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Currency list

//#region Get Reasons list
const getReasonsData = data => ({
  type: types.LOOKUP_CODE_REASONS,
  payload: data,
});

export const loadReasonsData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/core/lookup_codes/DEBIT_NOTE_REASONS`,
        {
          headers,
        }
      )
      .then(resp => {
        dispatch(getReasonsData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Reasons list

//#region Get Country list
const getCountryData = data => ({
  type: types.COUNTRY_LIST,
  payload: data,
});

export const loadCountryData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/countries`, { headers })
      .then(resp => {
        dispatch(getCountryData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Currency list

//#region Get State Data By Id
const getStateDataById = data => ({
  type: types.STATE_LIST,
  payload: data,
});

export const loadStateDataById = Id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/states/` + Id, { headers })
      .then(resp => {
        dispatch(getStateDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get State Data By Id

//#region Get Payment Terms list
const getPaymentTermsData = data => ({
  type: types.PAYMENT_TERMS_LIST,
  payload: data,
});

export const loadPaymentTermsData = type => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/` + type, {
        headers,
      })
      .then(resp => {
        dispatch(getPaymentTermsData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Payment Terms list

//#region Get vendors list
const getVendorsData = data => ({
  type: types.VENDORS_LIST,
  payload: data,
});

export const loadVendorsData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/vendors/dropdown`, { headers })
      .then(resp => {
        dispatch(getVendorsData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get vendors list

//#region Get vendors Data By Id
const getvendorsDataById = data => ({
  type: types.VENDORS_DETAILS,
  payload: data,
});

export const loadvendorsDataById = Id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/vendors/` + Id, { headers })
      .then(resp => {
        dispatch(getvendorsDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get vendors Data By Id

//#region Get uom list
const getUOMData = data => ({
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
      .then(resp => {
        dispatch(getUOMData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get uom list

//#region Get uom list
const getProductVariantData = data => ({
  type: types.PRODUCT_VARIANT_LIST,
  payload: data,
});

export const loadProductVariantData = param => {
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
      .get(`${BASE_API_SOURCE.url}api/v1/products/variant/dropdown`, {
        params,
        headers,
      })
      .then(resp => {
        dispatch(getProductVariantData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get uom list

//#region Get uom list
const getSave_Sales_Order_Data = data => ({
  type: types.SAVE_SALES_ORDER,
  payload: data,
});

export const Save_Sales_Order_Data = (data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.url}api/v1/creditnote/create`,
        JSON.stringify(data),
        { headers }
      )
      .then(resp => {
        //dispatch(getSave_Sales_Order_Data(resp.data));
        const result = {
          status: resp.status + "-" + resp.statusText,
          headers: resp.headers,
          data: resp.data.meta.message,
        };
        callback(result.data);
      })
      .catch(error => {
        callback(error.response?.data.meta.message || error);
      });
  };
};
//#endregion Get uom list

const getDebitNoteData = data => ({
  type: types.DEBIT_NOTE_LIST,
  payload: data,
});

export const loadDebitNoteData = params1 => {
  return function (dispatch) {
    var params = {
      per_page: params1?.per_page ? params1?.per_page : params1?.limit,
      page_no: params1?.page_no ? params1?.page_no : params1?.offset,
      filters: params1?.filters,
      sort: params1?.sort,
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/debitnote/dropdown`, {
        params,
        headers,
      })
      .then(resp => {
        dispatch(getDebitNoteData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

const getDebitNoteDataById = data => ({
  type: types.DEBIT_NOTE_VIEW,
  payload: data,
});

const createDebitnotes = data => ({
  type: types.CREATE_DEBIT_NOTE_REQUEST,
  payload: data,
});

const getPurchaseInvoiceData = data => ({
  type: types.PURCHASE_INVOICE_REQUEST,
  payload: data,
});

const getProductsData = data => ({
  type: types.PRODUCTS_REQUEST,
  payload: data,
});

export const loadProductsData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/products/dropdown`, { headers })
      .then(resp => {
        dispatch(getProductsData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const createDebitnote = data => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .post(`${BASE_API_SOURCE.url}api/v1/debitnote/create`, data, {
        headers: headers,
      })
      .then(resp => {
        dispatch(createDebitnotes(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const loadPurchaseInvoiceData = param => {
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
      .get(`${BASE_API_SOURCE.url}api/v1/purchase_invoice/dropdown`, {
        params,
        headers,
      })
      .then(resp => {
        dispatch(getPurchaseInvoiceData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const Update_Debit_Note_Data = (id, data, callback) => {
  return function (dispatch) {
    var headers = {
      "content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .post(
        `${BASE_API_SOURCE.url}api/v1/debitnote/${id}/update`,
        JSON.stringify(data),
        { headers }
      )
      .then(resp => {
        const result = {
          status: resp.status + "-" + resp.statusText,
          headers: resp.headers,
          data: resp.data.meta.message,
        };
        callback(result.data);
      })
      .catch(error => {
        callback(error.response?.data.meta.message || error);
      });
  };
};

// delete function action
export const loadDeleteDataById = (deleteId, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .delete(`${BASE_API_SOURCE.url}api/v1/debitnote/${deleteId}/delete`, {
        headers,
      })
      .then(resp => {
        //dispatch(getDeleteDataById(resp.data));
        const result = {
          status: resp.status + "-" + resp.statusText,
          headers: resp.headers,
          data: resp.data.meta.message,
        };
        callback(result.data);
      })
      .catch(error => {
        callback(error.response?.data.meta.message || error);
      });
  };
};

// loading sourcedocumentdata by id
//#region Get source document types list
const getSOURCE_DOCUMENTData = data => ({
  type: types.SOURCE_DOCUMENT_LIST,
  payload: data,
});

export const loadSOURCE_DOCUMENTData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    // axios.get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/source_document_types`, { headers })
    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/core/lookup_codes/DEBIT_NOTE_SOURCE_DOCUMENT_TYPES`,
        { headers }
      )
      .then(resp => {
        dispatch(getSOURCE_DOCUMENTData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get source document types list

// #region Get ASN order list
const getASNData = data => ({
  type: types.ASN_LIST,
  payload: data,
});

export const loadASNData = param => {
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
      .get(`${BASE_API_SOURCE.url}api/v1/asn/dropdown`, { params, headers })
      .then(resp => {
        dispatch(getASNData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
// #end region Get ASN order list

// #region Get sales order list
const getSOData = data => ({
  type: types.SALES_ORDER_LIST,
  payload: data,
});

export const loadSOData = param => {
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
      .get(`${BASE_API_SOURCE.url}api/v1/sales_orders/dropdown`, {
        params,
        headers,
      })
      .then(resp => {
        dispatch(getSOData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
// #end region Get sales order list

// region for Get GRN order list
const getGRNData = data => ({
  type: types.GRN_LIST,
  payload: data,
});

export const loadGRNData = param => {
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
      .get(`${BASE_API_SOURCE.url}api/v1/grn/dropdown`, { params, headers })
      .then(resp => {
        dispatch(getGRNData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
// end region for Get GRN order list

// region for GET IST order list
const getISTData = data => ({
  type: types.IST_LIST,
  payload: data,
});

export const loadISTData = param => {
  return function (dispatch) {
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      sort: param.sort,
      filters: param.filters,
    };

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/internal_transfers/dropdown`, {
        params,
        headers,
      })
      .then(resp => {
        dispatch(getISTData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
// end region for GET IST order list

// region for Get scrap order list

const getScrapOrderData = data => ({
  type: types.SCRAP_ORDER_LIST,
  payload: data,
});

export const loadScrapOrderData = param => {
  return function (dispatch) {
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      sort: param.sort,
      filters: param.filter,
    };

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/scrap_orders/dropdown`, {
        params,
        headers,
      })
      .then(resp => {
        dispatch(getScrapOrderData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

// end region for Get scrap order list

// region for Get Delivery order list

const getDeliveryOrderData = data => ({
  type: types.DELIVERY_ORDER_LIST,
  payload: data,
});

export const loadDeliveryOrderData = param => {
  return function (dispatch) {
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      sort: param.sort,
      filters: param.filters,
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/delivery_orders/dropdown`, {
        params,
        headers,
      })
      .then(resp => {
        dispatch(getDeliveryOrderData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

// end region for Get Delivery order list

// region for purchase returns order list

const getPurchaseReturnsData = data => ({
  type: types.PURCHASE_RETURNS_LIST,
  payload: data,
});

export const loadPurchaseReturnsData = param => {
  return function (dispatch) {
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      sort: param.sort,
      filters: param.filters,
    };

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/purchase_returns/dropdown`, {
        params,
        headers,
      })
      .then(resp => {
        dispatch(getPurchaseReturnsData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

// end region for purchase returns order list

const getSalesReturnsData = data => ({
  type: types.SALES_RETURNS_LIST,
  payload: data,
});

export const loadSalesReturnsData = param => {
  return function (dispatch) {
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      sort: param.sort,
      filters: param.filters,
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/sales_returns/dropdown`, {
        params,
        headers,
      })
      .then(resp => {
        dispatch(getSalesReturnsData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

// region for sales returns order list

// region for purchase order list
const getPurchaseOrders = data => ({
  type: types.PURCHASE_ORDERS_LIST,
  payload: data,
});

export const loadPurchaseOrdersData = param => {
  return function (dispatch) {
    const params = {
      per_page: param.limit,
      page_no: param.offset,
      sort: param.sort,
      filters: param.filters,
    };

    const headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/purchase_orders/dropdown`, {
        headers,
        params,
      })
      .then(resp => {
        dispatch(getPurchaseOrders(resp.data));
      })
      .catch(error => console.log(error));
  };
};
// end region for purchase order list

// region for purchase invoice list
const getPurchaseInvoice = data => ({
  type: types.PURCHASE_INVOICE_LIST,
  payload: data,
});

export const loadPurchaseInvoiceDatatab = (param, id) => {
  return function (dispatch) {
    const params = {
      per_page: param.limit,
      page_no: param.offset,
      sort: param.sort,
      filters: param.filters,
    };

    const headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/debitnote/${id}/filter_module/purchase_invoice`,
        {
          headers,
          params,
        }
      )
      .then(resp => {
        dispatch(getPurchaseInvoice(resp.data));
      })
      .catch(error => console.log(error));
  };
};
// end region for purchase invoice list

// region for sales order list by Id

const getASNDataById = data => ({
  type: types.ASN_VIEW,
  payload: data,
});

export const loadASNDataById = id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/asn/${id}`, { headers })
      .then(resp => {
        dispatch(getASNDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
// end region for sales order list by Id

// region for sales orders data by ID
const getSODataById = data => ({
  type: types.SALES_ORDERS_VIEW,
  payload: data,
});

export const loadSalesOrdersDataById = id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/sales_orders/${id}`, { headers })
      .then(resp => {
        dispatch(getSODataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
// end region for sales orders data by ID

// region for grn data by ID

const getGRNDataByID = data => ({
  type: types.GRN_VIEW,
  payload: data,
});

export const loadGRNDataById = id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/grn/${id}`, { headers })
      .then(resp => {
        dispatch(getGRNDataByID(resp.data));
      })
      .catch(error => console.log(error));
  };
};
// end region for grn data by ID

// region for IST data by ID
const getISTDataById = data => ({
  type: types.IST_VIEW,
  payload: data,
});

export const loadISTDataById = id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/internal_transfers/${id}`, { headers })
      .then(resp => {
        dispatch(getISTDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
// end region for IST data by ID

// region for scrap order data by ID
const getScrapOrderDataById = data => ({
  type: types.SCRAP_ORDER_VIEW,
  payload: data,
});

export const loadScrapOrderDataById = id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/scrap_orders/${id}`, { headers })
      .then(resp => {
        dispatch(getScrapOrderDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
// end region for scrap order data by ID

// region for delivery order data by ID

const getDeliveryOrderDataById = data => ({
  type: types.DELIVERY_ORDER_VIEW,
  payload: data,
});

export const loadDeliveryOrderDataById = id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/delivery_orders/${id}`, { headers })
      .then(resp => {
        dispatch(getDeliveryOrderDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
// end region for delivery order daata by ID

// region for purchase returns data by id
const getPurchaseReturnsDataById = data => ({
  type: types.PURCHASE_RETURNS_VIEW,
  payload: data,
});

export const loadPurchaseReturnsDataById = id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/purchase_returns/${id}`, { headers })
      .then(resp => {
        dispatch(getPurchaseReturnsDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
// end region for purchase returns data by id

// region for sales returns data by id
const getSalesReturnsDataById = data => ({
  type: types.SALES_RETURNS_VIEW,
  payload: data,
});

export const loadSalesReturnsDataById = id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/sales_returns/${id}`, { headers })
      .then(resp => {
        dispatch(getSalesReturnsDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
// end region for purchase returns data by id

// region for purchase orders data by id
const getPurchaseOrdersDataById = data => ({
  type: types.PURCHASE_ORDERS_VIEW,
  payload: data,
});

export const loadPurchaseOrdersDataById = id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/purchase_orders/${id}`, { headers })
      .then(resp => {
        dispatch(getPurchaseOrdersDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
// end region for purchase returns data by id

// region for purchase invoice data by id
const getPurchaseInvoiceDataById = data => ({
  type: types.PURCHASE_INVOICE_VIEW,
  payload: data,
});

export const loadPurchaseInvoiceDataById = id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/purchase_invoice/${id}`, { headers })
      .then(resp => {
        dispatch(getPurchaseInvoiceDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
// end region for purchase invoice data by id

const getProductsDataById = data => ({
  type: types.PRODUCTS_REQUEST_ID,
  payload: data,
});

export const loadProductsDataById = id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/products/${id}`, { headers })
      .then(resp => {
        dispatch(getProductsDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#region Get Sales Order List
//#endregion Get vendors list

//#region Get vendors Data By Id
//#endregion Get vendors Data By Id

//#region Get uom list

//#endregion Get uom list

//#region Get uom list

//#endregion Get uom list

const getdeleteData = data => ({
  type: types.SALES_DELETE_LIST,
  payload: data,
});

export const deleteSalesData = id => {
  console.log("ididididid", id);
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .delete(`${BASE_API_SOURCE.url}/api/v1/creditnote/${id}/delete`, {
        headers,
      })
      .then(resp => {
        dispatch(getdeleteData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

// Delete Product Lines
const getdeleteProductData = data => ({
  type: types.DELETE_PRODUCT_LINE,
  payload: data,
});

export const deleteProductLine = (id, plid) => {
  console.log("ididididid", id);
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .delete(
        `${BASE_API_SOURCE.url}/api/v1/creditnote/order_lines/${id}/delete?product_id=${plid}`,
        { headers }
      )
      .then(resp => {
        dispatch(getdeleteProductData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion of Delete Product lines

//Access Management
const accessManagement = data => ({
  type: types.ACCESS_MANAGEMENT,
  payload: data,
});

export const viewAccessManagement = () => {
  console.log("asdfg");
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/template/${localStorage.getItem(
          "access_template_id"
        )}?filters=[["display_name","=","ACCOUNTING"]]`,
        // .get(
        //   `${BASE_API_SOURCE.url}api/v1/template/2?filters=[["display_name","=","ACCOUNTING"]]`,
        { headers }
      )
      .then(resp => {
        console.log("sample", resp.data);
        dispatch(accessManagement(resp.data));
      })
      .catch(error => console.log(error));
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
