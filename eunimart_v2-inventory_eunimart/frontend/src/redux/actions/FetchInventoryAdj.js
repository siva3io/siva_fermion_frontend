import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../../baseurl";

const getIventoryData = data => ({
  type: types.INVENTORY_REQUEST,
  payload: data,
});

const getAdjustmentReasonData = data => ({
  type: types.ADJUSTMENT_REASON_REQUEST,
  payload: data,
});

const getAdjustmentTypeData = data => ({
  type: types.ADJUSTMENT_TYPE_REQUEST,
  payload: data,
});

const createInventorydata = data => ({
  type: types.CREATE_INVENTORY_REQUEST,
  payload: data,
});

const getdeleteData = data => ({
  type: types.DELETE_INVENTORY_REQUEST,
  payload: data,
});

export const loadIventoryData = (s1, s2, s3) => {
  return function (dispatch) {
    var params = {
      per_page: s1.limit,
      page_no: s1.offset,
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/inventory_adjustments`, {
        params,
        headers,
      })
      .then(resp => {
        dispatch(getIventoryData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const loadReasonType = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/adjustment_reason`, {
        headers,
      })
      .then(resp => {
        dispatch(getAdjustmentReasonData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const loadAdjustmentType = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/adjustment_type`, {
        headers,
      })
      .then(resp => {
        dispatch(getAdjustmentTypeData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const createInventory = data => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .post(`${BASE_API_SOURCE.url}api/v1/inventory_adjustments/create`, data, {
        headers: headers,
      })
      .then(resp => {
        dispatch(createInventorydata(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const deleteInventory = data => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .delete(
        `${BASE_API_SOURCE.url}api/v1/inventory_adjustments/${data}/delete`,
        { headers }
      )
      .then(resp => {
        dispatch(getdeleteData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

//#region Get Inventory Adjustment Data By Id
const getInventoryAdjDataById = data => ({
  type: types.ADJUSTMENT_VIEW,
  payload: data,
});

export const loadInventoryAdjById = Id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/inventory_adjustments/` + Id, {
        headers,
      })
      .then(resp => {
        dispatch(getInventoryAdjDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Sales Order Data By Id

export const Update_Inventory_Adjustment_Data = (id, data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .put(
        `${BASE_API_SOURCE.url}api/v1/inventory_adjustments/${id}/edit`,
        JSON.stringify(data),
        { headers }
      )
      .then(resp => {
        //dispatch(getUpdate_Order_Data(resp.data));
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
        headers,
      })
      .then(resp => {
        dispatch(getProductVariantData(resp.data));
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
