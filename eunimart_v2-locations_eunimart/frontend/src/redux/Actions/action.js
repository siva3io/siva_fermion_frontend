import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../../baseurl";

const getLocationData = (data) => ({
  type: types.LOCATION_LIST,
  payload: data,
});

export const loadLocationsData = (params1) => {
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
      .get(`${BASE_API_SOURCE.url}api/v1/locations`, { params, headers })
      .then((resp) => {
        dispatch(getLocationData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//---------------------------------------------

const getLocationtypeData = (data) => ({
  type: types.LOCATION_TYPE_LIST,
  payload: data,
});


export const loadLocationstypeData = (params1) => {
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
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/location_type`, { params, headers })
      .then((resp) => {
        dispatch(getLocationtypeData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};


// ________________________________________________________




const getLocationByIdData = (data) => ({
  type: types.LOCATION_BY_ID,
  payload: data,
});

export const loadLocationsByIdData = (id) => {
  console.log("IhC", id)
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    if (id !== undefined && id !== null) {

      axios
        .get(`${BASE_API_SOURCE.url}api/v1/locations/${id}`, { headers })
        .then((resp) => {
          dispatch(getLocationByIdData(resp.data));
          console.log(resp.data, "response")
        })
        .catch((error) => console.log(error));
    }
  };

};

// _______________________________________________

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


// _______________________________________________

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

// _______________________________________________



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


const getShippingPartnersDataById = (data) => ({
  type: types.SHIPPING_PARTNERS_LIST,
  payload: data,
});

export const loadShippingPartnersDataById = () => {
  return function (dispatch) {

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/shipping_partners/dropdown`, { headers })
      .then((resp) => {
        dispatch(getShippingPartnersDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

// ______________________________________________________________


const getSave_location_Data = (data) => ({
  type: types.SAVE_LOCATION_DATA,
  payload: data,
});

export const Save_Location_Data = (data) => {
  console.log(data, "dtaInPayload")
  return function (dispatch) {

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.post(`${BASE_API_SOURCE.url}api/v1/locations/create`, JSON.stringify(data), { headers })
      .then((resp) => {
        dispatch(getSave_location_Data(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

const getUpdate_location_Data = (data) => ({
  type: types.UPDATE_LOCATION_DATA,
  payload: data,
});

export const Update_Location_Data = (data, id) => {
  console.log(data, "dtaInPayloadddd")
  return function (dispatch) {

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios.post(`${BASE_API_SOURCE.url}api/v1/locations/${id}/update`, JSON.stringify(data), { headers })
      .then((resp) => {
        dispatch(getUpdate_location_Data(resp.data));
      })
      .catch((error) => console.log(error));
  };
};


const getdeleteData = (data) => ({
  type: types.DELETE_LOCATIONS_REQUEST,
  payload: data,
})


export const deleteLocations = (id) => {
  console.log("ididididid", id)
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .delete(`${BASE_API_SOURCE.url}api/v1/locations/${id}/delete`, { headers })
      .then((resp) => {
        dispatch(getdeleteData(resp.data));
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
      // .get(`${BASE_API_SOURCE.url}api/v1/template/2?filters=[["display_name","=","LOCATIONS"]]`, { headers })
      .get(`${BASE_API_SOURCE.url}api/v1/template/${localStorage.getItem("access_template_id")}?filters=[["display_name","=","LOCATIONS"]]`, { headers })
      .then((resp) => {
        console.log("sample", resp.data)
        dispatch(accessManagement(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

const getIntegratedChannelsDataById = (data) => ({
  type: types.INTEGRATED_CHANNELS_LIST,
  payload: data,
});

export const loadIntegratedChannelsData = () => {
  console.log("loadIntegratedChannelsData")
  return function (dispatch) {

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/marketplace/list/dropdown`, { headers })
      .then((resp) => {
        dispatch(getIntegratedChannelsDataById(resp.data));
      })
      .catch((error) => console.log(error));
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