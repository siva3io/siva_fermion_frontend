import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../baseurl";

//#region Get Template Order List
const getTemplateData = data => ({
  type: types.TEMPLATE_LIST,
  payload: data,
});

export const loadTemplateData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/template/list`, { headers })
      .then(resp => {
        dispatch(getTemplateData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Template Order List

//#region Get Template Details
const getTemplateDetailsData = data => ({
  type: types.TEMPLATE_DETAILS,
  payload: data,
});

export const loadTemplateDetailsData = id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/template/${id}`, { headers })
      .then(resp => {
        dispatch(getTemplateDetailsData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Template Order List

//#region Get Template Create

export const loadTemplateCreate = (data, callback) => {
  var headers = {
    "Content-type": "application/json",
    Authorization: `${BASE_API_SOURCE.token}`,
  };
  axios
    .post(
      `${BASE_API_SOURCE.url}api/v1/template/create`,
      JSON.stringify(data),
      { headers }
    )
    .then(resp => {
      callback(resp.data);
    })
    .catch(error => {
      console.log(error);
      callback(error);
    });
};
//#endregion Get Template Order List

//#region Get Template Create

export const loadTemplateUpdate = (id, data, callback) => {
  var headers = {
    "Content-type": "application/json",
    Authorization: `${BASE_API_SOURCE.token}`,
  };
  axios
    .post(
      `${BASE_API_SOURCE.url}api/v1/template/${id}/update`,
      JSON.stringify(data),
      { headers }
    )
    .then(resp => {
      callback(resp.data);
    })
    .catch(error => {
      console.log(error);
      callback(error);
    });
};
//#endregion Get Template Order List

//#region Get Module List
const getModuleData = data => ({
  type: types.MODULE_LIST,
  payload: data,
});

export const loadModuleData = param => {
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
      .get(`${BASE_API_SOURCE.url}/api/v1/module/core_module`, {
        params,
        headers,
      })
      .then(resp => {
        dispatch(getModuleData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Module List

//#region Get Access Management List
const getAccessManagementData = data => ({
  type: types.ACCESS_MANAGEMENT_LIST,
  payload: data,
});

export const loadAccessManagementData = param => {
  return function (dispatch) {
    var params = {
      filters: JSON.stringify([["display_name", "=", "ACCESS_TEMPLATES"]]),
    };

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/template/` +
          (location.hostname === "localhost"
            ? 1
            : localStorage.getItem("access_template_id")),
        { params, headers }
      )
      .then(resp => {
        dispatch(getAccessManagementData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Access Management List

//#region Get Lookup Types List
const getlookup_typesData = data => ({
  type: types.LOOKUP_TYPES_LIST,
  payload: data,
});

export const loadlookup_typesData = param => {
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
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_types/list`, {
        params,
        headers,
      })
      .then(resp => {
        dispatch(getlookup_typesData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Lookup Types List

//#region Get Lookup Codes List
const getlookup_CodesData = data => ({
  type: types.LOOKUP_CODES_LIST,
  payload: data,
});

export const loadlookup_CodesData = param => {
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
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/list`, {
        params,
        headers,
      })
      .then(resp => {
        dispatch(getlookup_CodesData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get Lookup Codes List

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
