import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../../baseurl";

const getIstData = (data) => ({
  type: types.IST_LIST,
  payload: data,
});

export const loadIstData = (params1) => {
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
      .get(`${BASE_API_SOURCE.url}api/v1/internal_transfers/dropdown`, {
        params,
        headers,
      })
      .then((resp) => {
        console.log("qwertyuiop");
        dispatch(getIstData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

const getIstDataById = (data) => ({
  type: types.IST_DATA_BY_ID,
  payload: data,
});

export const loadIstDataById = (Id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/internal_transfers/` + Id, { headers })
      .then((resp) => {
        dispatch(getIstDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

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

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/countries`, { headers })
      .then((resp) => {
        dispatch(getCountryData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

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

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/states/` + Id, { headers })
      .then((resp) => {
        dispatch(getStateDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const estimatedcost = () => async (dispatch) => {
  //   console.log(params,"params")
  try {
    const response = await axios.get(
      `${BASE_API_SOURCE.url}/api/v1/shipping_partners/rate_calc`
    );
    console.log("jiji", response.data);
    dispatch({
      type: types.ESTIMATED_COST_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.ESTIMATED_COST_FAILURE,
      payload: error,
    });
  }
};

const getdeleteData = (data) => ({
  type: types.IST_DELETE_LIST,
  payload: data,
});

export const deleteIst = (id) => {
  console.log("ididididid", id);
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .delete(`${BASE_API_SOURCE.url}api/v1/internal_transfers/${id}/delete`, {
        headers,
      })
      .then((resp) => {
        dispatch(getdeleteData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

// Access Mangement

const accessManagement = (data) => ({
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
        )}?filters=[["display_name","=","ORDER"]]`,
      // .get(
      //   `${BASE_API_SOURCE.url}api/v1/template/2?filters=[["display_name","=","ORDER"]]`,
        { headers }
      )
      .then((resp) => {
        console.log("sample", resp.data);
        dispatch(accessManagement(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

// -------GRN--------------

export const getGRNData = (data) => ({
  type: types.GRN_DATA_LIST,
  payload: data,
});

export const loadGRNData = (params1, id) => {
  return function (dispatch) {
    const params = {
      per_page: params1?.per_page ? params1?.per_page : params1?.limit,
      page_no: params1?.page_no ? params1?.page_no : params1?.offset,
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/internal_transfers/${id}/filter_module/grn`,
        { headers }
      )
      .then((resp) => {
        dispatch(getGRNData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

// --------ASN---------

export const getASNData = (data) => ({
  type: types.ASN_DATA_LIST,
  payload: data,
});

export const loadASNData = (params1, id) => {
  return function (dispatch) {
    const params = {
      per_page: params1?.per_page ? params1?.per_page : params1?.limit,
      page_no: params1?.page_no ? params1?.page_no : params1?.offset,
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/internal_transfers/${id}/filter_module/asn`,
        { params, headers }
      )
      .then((resp) => {
        dispatch(getASNData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

// --------SALES ORDERS---------

export const getSalesOrdersData = (data) => ({
  type: types.SALES_ORDERS_DATA_LIST,
  payload: data,
});

export const loadSalesOrdersData = (params1, id) => {
  return function (dispatch) {
    const params = {
      per_page: params1?.per_page ? params1?.per_page : params1?.limit,
      page_no: params1?.page_no ? params1?.page_no : params1?.offset,
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/internal_transfers/${id}/filter_module/salesorders`,
        { params, headers }
      )
      .then((resp) => {
        dispatch(getSalesOrdersData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

// -------DELIVERY ORDERS----------

export const getDeliveryOrdersData = (data) => ({
  type: types.DELIVERY_ORDERS_DATA_LIST,
  payload: data,
});

export const loadDeliveryOrdersData = (params1, id) => {
  return function (dispatch) {
    const params = {
      per_page: params1?.per_page ? params1?.per_page : params1?.limit,
      page_no: params1?.page_no ? params1?.page_no : params1?.offset,
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/internal_transfers/${id}/filter_module/deliveryorders`,
        { params, headers }
      )
      .then((resp) => {
        dispatch(getDeliveryOrdersData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

// -------PURCHASE ORDERS----------

export const getPurchaseOrdersData = (data) => ({
  type: types.PURCHASE_ORDERS_DATA_LIST,
  payload: data,
});

export const loadPurchaseOrdersData = (params1, id) => {
  return function (dispatch) {
    const params = {
      per_page: params1?.per_page ? params1?.per_page : params1?.limit,
      page_no: params1?.page_no ? params1?.page_no : params1?.offset,
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/internal_transfers/${id}/filter_module/purchaseorders`,
        { params, headers }
      )
      .then((resp) => {
        dispatch(getPurchaseOrdersData(resp.data));
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
