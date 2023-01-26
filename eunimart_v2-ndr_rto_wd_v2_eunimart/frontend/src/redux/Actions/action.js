import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../../baseurl";

const getNDRData = (data) => ({
  type: types.NDR_LIST,
  payload: data,
});

const getNDRByIdData = (data) => ({
  type: types.NDR_BY_ID,
  payload: data,
});

const getRTOData = (data) => ({
  type: types.RTO_LIST,
  payload: data,
});

const getRTOByIdData = (data) => ({
  type: types.RTO_BY_ID,
  payload: data,
});

const getWDData = (data) => ({
  type: types.WD_LIST,
  payload: data,
});

const getWDByIdData = (data) => ({
  type: types.WD_BY_ID,
  payload: data,
});

export const loadNDRData = (params1) => {
  return function (dispatch) {
    var params = {
      per_page: params1?.per_page ? params1?.per_page : params1?.limit,
      page_no: params1?.page_no ? params1?.page_no : params1?.offset,
      filters: params1?.filters,
      sort: params1?.sort
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/shipping_orders_ndr/dropdown`, { params, headers })
      .then((resp) => {
        dispatch(getNDRData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

//-----------------------------------------
//------------------------------------------
export const loadRTOData = (params1) => {
  return function (dispatch) {
    var params = {
      per_page: params1?.per_page ? params1?.per_page : params1?.limit,
      page_no: params1?.page_no ? params1?.page_no : params1?.offset,
      filters: params1?.filters,
      sort: params1?.sort
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/shipping_orders_rto/dropdown`, { params, headers })
      .then((resp) => {
        dispatch(getRTOData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

//----------------------------------------------
//--------------------------------------------
export const loadWDData = (params1) => {
  return function (dispatch) {
    var params = {
      per_page: params1?.per_page ? params1?.per_page : params1?.limit,
      page_no: params1?.page_no ? params1?.page_no : params1?.offset,
      filters: params1?.filters,
      sort: params1?.sort
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/shipping_orders_wd/dropdown`, { params, headers })
      .then((resp) => {
        dispatch(getWDData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

//--------------------------------------------------------------

export const loadNDRDataById = (Id) => {
  return function (dispatch) {

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    if (Id !== undefined && Id !== null) {
      axios.get(`${BASE_API_SOURCE.url}api/v1/shipping_orders_ndr/${Id}`, { headers })
        .then((resp) => {
          dispatch(getNDRByIdData(resp.data));
        })
        .catch((error) => console.log(error));
    }
  };
};

//---------------------------------------------------------------------------

export const loadRTODataById = (Id) => {
  return function (dispatch) {

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    if (Id !== undefined && Id !== null) {
      axios.get(`${BASE_API_SOURCE.url}api/v1/shipping_orders_rto/${Id}`, { headers })
        .then((resp) => {
          dispatch(getRTOByIdData(resp.data));
        })
        .catch((error) => console.log(error));
    }
  };
};

//------------------------------------------------------------------------------

export const loadWDDataById = (Id) => {
  return function (dispatch) {

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    if (Id !== undefined && Id !== null) {
      axios.get(`${BASE_API_SOURCE.url}api/v1/shipping_orders_wd/${Id}`, { headers })
        .then((resp) => {
          dispatch(getWDByIdData(resp.data));
        })
        .catch((error) => console.log(error));
    }
  };
};

const getNDRDataById = (data) => ({
  type: types.NDR_VIEW,
  payload: data,
});

const getRTODataById = (data) => ({
  type: types.RTO_VIEW,
  payload: data,
});

const getWDDataById = (data) => ({
  type: types.WD_VIEW,
  payload: data,
});



const accessManagementNDR = (data) => ({
  type: types.ACCESS_MANAGEMENT_NDR,
  payload: data,
});

export const viewAccessManagementNDR = () => {
  console.log("asdfg")
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/template/2?filters=[["display_name","=","NDR"]]`, { headers })
      // .get(`${BASE_API_SOURCE.url}api/v1/template/${localStorage.getItem("access_template_id")}?filters=[["display_name","=","NDR"]]`, { headers })
      .then((resp) => {
        console.log("sample", resp.data)
        dispatch(accessManagementNDR(resp.data));
      })
      .catch((error) => console.log(error));
  };
};



const accessManagementRDO = (data) => ({
  type: types.ACCESS_MANAGEMENT_RDO,
  payload: data,
});

export const viewAccessManagementRDO = () => {
  console.log("asdfg")
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/template/2?filters=[["display_name","=","RTO"]]`, { headers })
      // .get(`${BASE_API_SOURCE.url}api/v1/template/${localStorage.getItem("access_template_id")}?filters=[["display_name","=","RTO"]]`, { headers })
      .then((resp) => {
        console.log("sample", resp.data)
        dispatch(accessManagementRDO(resp.data));
      })
      .catch((error) => console.log(error));
  };
};



const accessManagementWD = (data) => ({
  type: types.ACCESS_MANAGEMENT_WD,
  payload: data,
});

export const viewAccessManagementWD = () => {
  console.log("asdfg")
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      // .get(`${BASE_API_SOURCE.url}api/v1/template/2?filters=[["display_name","=","WD"]]`, { headers })
      .get(`${BASE_API_SOURCE.url}api/v1/template/${localStorage.getItem("access_template_id")}?filters=[["display_name","=","WD"]]`, { headers })
      .then((resp) => {
        console.log("sample", resp.data)
        dispatch(accessManagementWD(resp.data));
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