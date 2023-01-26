import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../../baseurl";

const getPicklistData = data => ({
  type: types.PICKLIST_REQUEST,
  payload: data,
});

const getContactsData = data => ({
  type: types.CONTACTS_REQUEST,
  payload: data,
});

const getLocationsData = data => ({
  type: types.LOCATIONS_REQUEST,
  payload: data,
});

const getDocTypeData = data => ({
  type: types.DOC_TYPE_REQUEST,
  payload: data,
});

const getInternalTransData = data => ({
  type: types.INTERNAL_TRANSFER_REQUEST,
  payload: data,
});

const getProductsData = data => ({
  type: types.PRODUCTS_REQUEST,
  payload: data,
});

const createPicklistdata = data => ({
  type: types.CREATE_PICKLIST_REQUEST,
  payload: data,
});

const getdeleteData = data => ({
  type: types.DELETE_PICKLIST_REQUEST,
  payload: data,
});

export const loadPicklistData = (s1, s2, s3) => {
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
      .get(`${BASE_API_SOURCE.url}api/v1/pick_list`, { params, headers })
      .then(resp => {
        dispatch(getPicklistData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const loadContacts = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/contacts/dropdown`, { headers })
      .then(resp => {
        dispatch(getContactsData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const loadLocations = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/locations/dropdown`, { headers })
      .then(resp => {
        dispatch(getLocationsData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const loadDocType = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/core/lookup_codes/source_document_types`,
        { headers }
      )
      .then(resp => {
        dispatch(getDocTypeData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const loadInternalTransfers = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/internal_transfers/dropdown`, {
        headers,
      })
      .then(resp => {
        dispatch(getInternalTransData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const loadProductsData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}/api/v1/products/dropdown`, { headers })
      .then(resp => {
        dispatch(getProductsData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const createPicklist = data => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .post(`${BASE_API_SOURCE.url}api/v1/pick_list/create`, data, {
        headers: headers,
      })
      .then(resp => {
        dispatch(createPicklistdata(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const deletePickList = data => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .delete(`${BASE_API_SOURCE.url}api/v1/pick_list/${data}/delete`, {
        headers,
      })
      .then(resp => {
        dispatch(getdeleteData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const UpdatePicklistData = (id, data, callback) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .put(
        `${BASE_API_SOURCE.url}api/v1/pick_list/${id}/edit`,
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
