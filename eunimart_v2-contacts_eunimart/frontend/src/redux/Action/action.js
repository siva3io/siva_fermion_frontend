import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../../baseurl";

const getContactTypeData = data => ({
  type: types.CONTACT_TYPE,
  payload: data,
});

const getLocationTypeData = data => ({
  type: types.LOCATION_TYPE,
  payload: data,
});

const getSelectPropertyData = data => ({
  type: types.CONTACT_PROPERTY,
  payload: data,
});

const getCountriesData = data => ({
  type: types.COUNTRIES_REQUEST,
  payload: data,
});

const getStatesData = data => ({
  type: types.STATES_REQUEST,
  payload: data,
});

const getContactsData = data => ({
  type: types.CONTACTS_REQUEST,
  payload: data,
});

const getContactsTableData = data => ({
  type: types.CONTACTS_TABLE_REQUEST,
  payload: data,
});

const createContacts = data => ({
  type: types.CREATE_CONTACTS_REQUEST,
  payload: data,
});

const getdeleteData = data => ({
  type: types.DELETE_CONTACTS_REQUEST,
  payload: data,
});

const getContactsDataById = data => ({
  type: types.CONTACTS_SINGLE_REQUEST,
  payload: data,
});

const updateContactdata = data => ({
  type: types.CONTACTS_UPDATE_REQUEST,
  payload: data,
});

export const loadContactType = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/contact_type`, {
        headers,
      })
      .then(resp => {
        dispatch(getContactTypeData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const loadSelectProperty = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/core/lookup_codes/contact_properties`,
        { headers }
      )
      .then(resp => {
        dispatch(getSelectPropertyData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const loadLocationType = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/location_type`, {
        headers,
      })
      .then(resp => {
        dispatch(getLocationTypeData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const loadCountries = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/countries`, { headers })
      .then(resp => {
        dispatch(getCountriesData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const loadStates = id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/states/${id}`, { headers })
      .then(resp => {
        dispatch(getStatesData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const loadTableContact = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/contacts`, { headers })
      .then(resp => {
        dispatch(getContactsTableData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const loadContact = () => {
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

export const createContact = data => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .post(`${BASE_API_SOURCE.url}api/v1/contacts/create`, data, {
        headers: headers,
      })
      .then(resp => {
        dispatch(createContacts(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const deleteContact = data => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .delete(`${BASE_API_SOURCE.url}api/v1/contacts/${data}/delete`, {
        headers,
      })
      .then(resp => {
        dispatch(getdeleteData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const loadContactsDataById = Id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/contacts/` + Id, { headers })
      .then(resp => {
        dispatch(getContactsDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};

export const updateContact = (data, id) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .post(`${BASE_API_SOURCE.url}api/v1/contacts/${id}/update`, data, {
        headers: headers,
      })
      .then(resp => {
        dispatch(updateContactdata(resp.data));
      })
      .catch(error => console.log(error));
  };
};

const accessManagement = data => ({
  type: types.ACCESS_MANAGEMENT,
  payload: data,
});
export const viewAccessManagement = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/template/${localStorage.getItem(
          "access_template_id"
        )}?filters=[["display_name","=","CONTACTS"]]`,
        { headers }
      )
      .then(resp => {
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
