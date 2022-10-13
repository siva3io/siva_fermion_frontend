import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../baseurl";

//#region Get GRN Order List
const getGrnData = (data) => ({
  type: types.GRN_LIST,
  payload: data,
});

export const loadGrnData = (params1) => {
  return function (dispatch) {
    const params = {
      per_page: params1?.per_page ? params1?.per_page : params1?.limit,
      page_no: params1?.page_no ? params1?.page_no : params1?.offset,
    };
    // var params = {
    //   per_page: 10,
    //   page_no: 1,
    // };

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}/api/v1/grn/dropdown`, {
        params,
        headers,
      })
      .then((resp) => {
        console.log("qwertyuiop");
        dispatch(getGrnData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

const getGrnDataById = (data) => ({
  type: types.GRN_DATA_BY_ID,
  payload: data,
});

export const loadGrnDataById = (Id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}/api/v1/grn/` + Id, { headers })
      .then((resp) => {
        dispatch(getGrnDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get IST Order List

//#region Get ASN Order List
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
      sort: param.sort,
    };

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}/api/v1/asn/dropdown`, { params, headers })
      .then((resp) => {
        dispatch(getASNData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get ASN Order List

//#region Get ASN Order Data By Id
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

    axios
      .get(`${BASE_API_SOURCE.url}/api/v1/asn/` + Id, { headers })
      .then((resp) => {
        dispatch(getASNDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get ASN Order Data By Id

//#region Get IST List
const getISTData = (data) => ({
  type: types.IST_LIST,
  payload: data,
});

export const loadISTData = (param) => {
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
      .get(`${BASE_API_SOURCE.url}/api/v1/internal_transfers/dropdown`, {
        params,
        headers,
      })
      .then((resp) => {
        dispatch(getISTData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get IST List

//#region Get IST Data By Id
const getISTDataById = (data) => ({
  type: types.IST_VIEW,
  payload: data,
});

export const loadISTDataById = (Id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}/api/v1/internal_transfers/` + Id, {
        headers,
      })
      .then((resp) => {
        dispatch(getISTDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get IST Data By Id

//#region Get Delivery Order List
const getDeliveryData = (data) => ({
  type: types.DELIVERY_LIST,
  payload: data,
});

export const loadDeliveryData = (param) => {
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
      .get(`${BASE_API_SOURCE.url}/api/v1/delivery_orders/dropdown`, {
        params,
        headers,
      })
      .then((resp) => {
        dispatch(getDeliveryData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Delivery Order List

//#region Get Delivery Order Data By Id
const getDeliveryDataById = (data) => ({
  type: types.DELIVERY_VIEW,
  payload: data,
});

export const loadDeliveryDataById = (Id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}/api/v1/delivery_orders/` + Id, { headers })
      .then((resp) => {
        dispatch(getDeliveryDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Delivery Order Data By Id

//#region Get Delivery Order List
const getProductData = (data) => ({
  type: types.PURCHASE_ORDERS_LIST,
  payload: data,
});

export const loadProductOrdersData = (params1) => {
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
      .get(`${BASE_API_SOURCE.url}/api/v1/purchase_orders/dropdown`, {
        params,
        headers,
      })
      .then((resp) => {
        dispatch(getProductData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

// id
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
        .get(`${BASE_API_SOURCE.url}/api/v1/purchase_orders/${id}`, { headers })
        .then((resp) => {
          dispatch(getProductDataById(resp.data));
        })
        .catch((error) => console.log(error));
    }
  };
};
//#endregion Get Purchase Order Data By Id

//#region Get Scrap Order List
const getScrapOrderData = (data) => ({
  type: types.SCRAP_ORDER_LIST,
  payload: data,
});

export const loadScrapOrderData = (param) => {
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
      .get(`${BASE_API_SOURCE.url}/api/v1/scrap_orders/dropdown`, {
        params,
        headers,
      })
      .then((resp) => {
        dispatch(getScrapOrderData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get ASN Order List

//#region Get ASN Order Data By Id
const getScrapOrderDataById = (data) => ({
  type: types.SCRAP_ORDER_VIEW,
  payload: data,
});

export const loadScrapOrderDataById = (Id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}/api/v1/scrap_orders/` + Id, { headers })
      .then((resp) => {
        dispatch(getScrapOrderDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Scrap Order Data By Id

//#region Get Scrap Order List
const getSalesOrderData = (data) => ({
  type: types.SALES_ORDER_LIST,
  payload: data,
});

export const loadSalesOrderData = (param) => {
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
      .get(`${BASE_API_SOURCE.url}/api/v1/sales_orders/dropdown`, {
        params,
        headers,
      })
      .then((resp) => {
        dispatch(getSalesOrderData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get ASN Order List

//#region Get ASN Order Data By Id
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

    axios
      .get(`${BASE_API_SOURCE.url}/api/v1/sales_orders/` + Id, { headers })
      .then((resp) => {
        dispatch(getSalesOrderDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Scrap Order Data By Id

//#region Get purchase_returns Order List
const getpurchase_returnsData = (data) => ({
  type: types.PURCHASE_RETURNS_LIST,
  payload: data,
});

export const loadpurchase_returnsData = (param) => {
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
      .get(`${BASE_API_SOURCE.url}/api/v1/purchase_returns/dropdown`, {
        params,
        headers,
      })
      .then((resp) => {
        dispatch(getpurchase_returnsData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get purchase_returns Order List

//#region Get purchase_returns Order List
const getpurchase_returnsDataById = (data) => ({
  type: types.PURCHASE_RETURNS_VIEW,
  payload: data,
});

export const loadpurchase_returnsDataById = (Id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}/api/v1/purchase_returns/` + Id, { headers })
      .then((resp) => {
        dispatch(getpurchase_returnsDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get  purchase_returns Order List

//#region Get sales_returns Order List
const getsales_returnsData = (data) => ({
  type: types.SALES_RETURNS_LIST,
  payload: data,
});

export const loadsales_returnsData = (param) => {
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
      .get(`${BASE_API_SOURCE.url}/api/v1/sales_returns/dropdown`, {
        params,
        headers,
      })
      .then((resp) => {
        dispatch(getsales_returnsData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get sales_returns Order List

//#region Get sales_returns Order List
const getsales_returnsDataById = (data) => ({
  type: types.SALES_RETURNS_VIEW,
  payload: data,
});

export const loadsales_returnsDataById = (Id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}/api/v1/sales_returns/` + Id, { headers })
      .then((resp) => {
        dispatch(getsales_returnsDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get  sales_returns Order List

//#region Get Sales Invoice List
const getSalesInvoiceData = (data) => ({
  type: types.SALES_INVOICE_LIST,
  payload: data,
});

export const loadSalesInvoiceData = (param) => {
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
      .get(`${BASE_API_SOURCE.url}/api/v1/sales_invoice/dropdown`, {
        params,
        headers,
      })
      .then((resp) => {
        dispatch(getSalesInvoiceData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get IST List

//#region Get IST Data By Id
const getSalesInvoiceDataById = (data) => ({
  type: types.SALES_INVOICE_VIEW,
  payload: data,
});

export const loadSalesInvoiceDataById = (Id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}/api/v1/sales_invoice/` + Id, {
        headers,
      })
      .then((resp) => {
        dispatch(getSalesInvoiceDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Sales Invoice Data By Id

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
