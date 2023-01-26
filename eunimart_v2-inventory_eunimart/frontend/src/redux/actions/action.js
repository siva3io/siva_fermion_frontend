import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../../baseurl";

const getCycleCountData = data => ({
  type: types.CYCLE_COUNT_LIST,
  payload: data,
});

export const loadCycleCountData = params1 => {
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
      .get(`${BASE_API_SOURCE.url}api/v1/cycle_count`, { params, headers })
      .then(resp => {
        dispatch(getCycleCountData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
export const deletecycleCountbyId = id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .delete(`${BASE_API_SOURCE.url}api/v1/cycle_count/${id}/delete`, {
        headers,
      })
      .then(resp => {
        dispatch(getdeleteData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

// const getCycleCountDataById = (data) => ({
//   type: types.CYCLE_COUNT_VIEW,
//   payload: data,
// });

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
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/asn/dropdown`, { headers })
      .then(resp => {
        dispatch(getASNData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get ASN Order List

//#region Get GRN Order List
const getGRNData = data => ({
  type: types.GRN_LIST,
  payload: data,
});

export const loadGRNData = params1 => {
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
      .then(resp => {
        // console.log("qwertyuiop");
        dispatch(getGRNData(resp.data));
      })
      .catch(error => console.log(error));
  };
};

//#region Get ASN Order Data By Id
const getGRNDataById = data => ({
  type: types.GRN_VIEW,
  payload: data,
});

export const loadGRNDataById = Id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/grn/` + Id, { headers })
      .then(resp => {
        dispatch(getGRNDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get ASN Order Data By Id

//#region Get ASN Order Data By Id
const getASNDataById = data => ({
  type: types.ASN_VIEW,
  payload: data,
});

export const loadASNDataById = Id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/asn/` + Id, { headers })
      .then(resp => {
        dispatch(getASNDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get ASN Order Data By Id

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

    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/core/lookup_codes/INVENTORY_ADJUSTMENTS_SOURCE_DOCUMENT_TYPES`,
        { headers }
      )
      .then(resp => {
        dispatch(getSOURCE_DOCUMENTData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get source document types list

//#region Get pickList source document types list
const getpickListSOURCE_DOCUMENTData = data => ({
  type: types.PICK_LIST_SOURCE_DOCUMENT_LIST,
  payload: data,
});

export const loadpickListSOURCE_DOCUMENTData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/core/lookup_codes/PICK_LIST_SOURCE_DOCUMENT_TYPES`,
        { headers }
      )
      .then(resp => {
        dispatch(getpickListSOURCE_DOCUMENTData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get source document types list

//#region Get pickList source document types list
const getShippingOrdersData = data => ({
  type: types.SHIPPING_LIST,
  payload: data,
});

export const loadShippingOrdersData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/shipping_orders/dropdown`, { headers })
      .then(resp => {
        dispatch(getShippingOrdersData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get source document types list

//#region Get ASN Order Data By Id
const getShippingOrderDataById = data => ({
  type: types.SHIPPING_VIEW,
  payload: data,
});

export const loadShippingOrderDataById = Id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/shipping_orders/` + Id, { headers })
      .then(resp => {
        dispatch(getShippingOrderDataById(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion Get ASN Order Data By Id

const picklistAccessManagement = data => ({
  type: types.PICKLIST_ACCESS_MANAGEMENT,
  payload: data,
});
export const viewPicklistAccessManagement = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/template/${localStorage.getItem(
          "access_template_id"
        )}?filters=[["display_name","=","PICK_LIST"]]`,
        { headers }
      )
      // .get(
      //   `${BASE_API_SOURCE.url}api/v1/template/2?filters=[["display_name","=","PICK_LIST"]]`,
      //   { headers }
      // )
      .then(resp => {
        dispatch(picklistAccessManagement(resp.data));
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
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .delete(
        `${BASE_API_SOURCE.url}/api/v1/inventory_adjustments/${id}/delete_products?product_id=${plid}`,
        { headers }
      )
      .then(resp => {
        dispatch(getdeleteProductData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion of Delete Product lines

// Delete Product Lines
const getdeletePicklistProductData = data => ({
  type: types.DELETE_PRODUCT_LINE,
  payload: data,
});

export const deletePicklistProductData = (id, plid) => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .delete(
        `${BASE_API_SOURCE.url}/api/v1/pick_list/${id}/delete_products?product_id=${plid}`,
        { headers }
      )
      .then(resp => {
        dispatch(getdeletePicklistProductData(resp.data));
      })
      .catch(error => console.log(error));
  };
};
//#endregion of Delete Product lines

const invAdjAccessManagement = data => ({
  type: types.INV_ADJ_ACCESS_MANAGEMENT,
  payload: data,
});
export const viewInvAdjAccessManagement = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      // .get(
      //   `${BASE_API_SOURCE.url}api/v1/template/1?filters=[["display_name","=","INVENTORY_ADJUSTMENT"]]`,
      //   { headers }
      // )
      .get(
        `${BASE_API_SOURCE.url}api/v1/template/${localStorage.getItem(
          "access_template_id"
        )}?filters=[["display_name","=","INVENTORY_ADJUSTMENT"]]`,
        { headers }
      )
      .then(resp => {
        dispatch(invAdjAccessManagement(resp.data));
      })
      .catch(error => console.log(error));
  };
};

const cycleCountAccessManagement = data => ({
  type: types.CYCLE_COUNT_ACCESS_MANAGEMENT,
  payload: data,
});
export const viewCycleCountAccessManagement = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    axios
      .get(
        `${BASE_API_SOURCE.url}api/v1/template/${localStorage.getItem(
          "access_template_id"
        )}?filters=[["display_name","=","CYCLE_COUNT"]]`,
        { headers }
      )
      .then(resp => {
        dispatch(cycleCountAccessManagement(resp.data));
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
