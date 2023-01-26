import * as types from "./actionType";
import axios from "axios";
import { BASE_URL, TOKEN } from "../../Services/api";

//#region Get GRN Order List
const getGrnData = data => ({
  type: types.GRN_LIST,
  payload: data,
});

export const loadGrnData = params1 => {
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
      Authorization: `${TOKEN}`,
    };

    axios
      .get(`${BASE_URL}/api/v1/grn/dropdown`, {
        params,
        headers,
      })
      .then(resp => {
        console.log("qwertyuiop");
        dispatch(getGrnData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

const getGrnDataById = data => ({
  type: types.GRN_DATA_BY_ID,
  payload: data,
});

export const loadGrnDataById = Id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${TOKEN}`,
    };

    axios
      .get(`${BASE_URL}/api/v1/grn/` + Id, { headers })
      .then(resp => {
        dispatch(getGrnDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get IST Order List

//#region Get ASN Order List
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
      Authorization: `${TOKEN}`,
    };

    axios
      .get(`${BASE_URL}/api/v1/asn/dropdown`, { params, headers })
      .then(resp => {
        dispatch(getASNData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get ASN Order List

//#region Get ASN Order Data By Id
const getASNDataById = data => ({
  type: types.ASN_VIEW,
  payload: data,
});

export const loadASNDataById = Id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${TOKEN}`,
    };

    axios
      .get(`${BASE_URL}/api/v1/asn/` + Id, { headers })
      .then(resp => {
        dispatch(getASNDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get ASN Order Data By Id

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
      Authorization: `${TOKEN}`,
    };

    axios
      .get(`${BASE_URL}/api/v1/sales_orders/dropdown`, { params, headers })
      .then(resp => {
        dispatch(getSalesData(resp.data));
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
      Authorization: `${TOKEN}`,
    };

    axios
      .get(`${BASE_URL}/api/v1/sales_orders/` + Id, { headers })
      .then(resp => {
        dispatch(getSalesDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Sales Order Data By Id

//#region Get Delivery Order List
const getDeliveryData = data => ({
  type: types.DELIVERY_LIST,
  payload: data,
});

export const loadDeliveryData = param => {
  return function (dispatch) {
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      filters: param.filters,
      sort: param.sort,
    };

    var headers = {
      "Content-type": "application/json",
      Authorization: `${TOKEN}`,
    };

    axios
      .get(`${BASE_URL}/api/v1/delivery_orders/dropdown`, { params, headers })
      .then(resp => {
        dispatch(getDeliveryData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Delivery Order List

//#region Get Delivery Order Data By Id
const getDeliveryDataById = data => ({
  type: types.DELIVERY_VIEW,
  payload: data,
});

export const loadDeliveryDataById = Id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${TOKEN}`,
    };

    axios
      .get(`${BASE_URL}/api/v1/delivery_orders/` + Id, { headers })
      .then(resp => {
        dispatch(getDeliveryDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Delivery Order Data By Id

//#region Get Delivery Order List
const getProductData = data => ({
  type: types.PURCHASE_ORDERS_LIST,
  payload: data,
});

export const loadProductOrdersData = params1 => {
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
      Authorization: `${TOKEN}`,
    };

    axios
      .get(`${BASE_URL}/api/v1/purchase_orders/dropdown`, { params, headers })
      .then(resp => {
        dispatch(getProductData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

// id
const getProductDataById = data => ({
  type: types.PURCHASE_ORDERS_LIST_BY_ID,
  payload: data,
});

export const loadProductOrdersDataByID = id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${TOKEN}`,
    };

    if (id !== undefined && id !== null) {
      axios
        .get(`${BASE_URL}/api/v1/purchase_orders/${id}`, { headers })
        .then(resp => {
          dispatch(getProductDataById(resp.data));
        })
        .catch(error => console.log(error));
    }
  };
};
//#endregion Get Purchase Order Data By Id

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
      Authorization: `${TOKEN}`,
    };
    axios
      .delete(
        `${BASE_URL}/api/v1/internal_transfers/order_lines/${id}/delete?product_id=${plid}`,
        { headers }
      )
      .then(resp => {
        dispatch(getdeleteProductData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion of Delete Product lines

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
