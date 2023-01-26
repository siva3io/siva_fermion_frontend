import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../../baseurl";

const getScrapOrdersData = (data) => ({
  type: types.SCRAP_ORDERS_LIST,
  payload: data,
});
const getdeleteData = (data) => ({
  type: types.SCRAP_ORDERS_LIST,
  payload: data,
});
export const loadScrapOrdersData = (params1) => {

  return function (dispatch) {
    var params = {
      per_page:params1?.per_page ? params1?.per_page : params1?.limit ,
      page_no:params1?.page_no ? params1?.page_no: params1?.offset ,
      filters:params1?.filters,
      sort:params1?.sort
    };
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/scrap_orders`, { params, headers })
      .then((resp) => { 
        dispatch(getScrapOrdersData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

 const getproductList = (data) => ({
  type: types.PRODUCTS_LIST,
  payload: data,
});

export const loadProductsListData = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    var params = {
      per_page: 100,
      page_no: 1,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/products/variant/dropdown`, { params, headers })
      .then((resp) => { 
        console.log("resprespresp",resp.data)
        dispatch(getproductList(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
const getestimatedcost = (data) => ({
    type: types.ESTIMATED_COST,
    payload: data,
  });
  
  export const estimatedcost = (data) => { 
    return function (dispatch) {    
      
      var headers = {
        "Content-type": "application/json",
        Authorization: `${BASE_API_SOURCE.token}`,
      };
  
      axios.post(`${BASE_API_SOURCE.url}ipaas/shipping/rate_calculator`, JSON.stringify(data), { headers })
        .then((resp) => {         
          dispatch(getestimatedcost(resp.data));  
        })
        .catch((error) => {
         console.log(error)
        });
    };
  };
     const getpricingList = (data) => ({
        type: types.PRICING_LIST,
        payload: data,
      });
      
    export  const loadPricingListData = (params) => {
        return function (dispatch) {
          var headers = {
            "Content-type": "application/json",
            Authorization: `${BASE_API_SOURCE.token}`,
          };
      
          axios
            .get((params? `${BASE_API_SOURCE.url}api/v1/pricing/pricing=${params}`:`${base_URL}api/v1/pricing`), { headers: headers })
            .then((resp) => { 
              console.log("resprespresp",resp.data)
              dispatch(getpricingList(resp.data));
            })
            .catch((error) => console.log(error));
        };
      };

const getscrapReasons = (data) => ({
  type: types.SCRAP_REASONS,
  payload: data,
});

export const loadScrapReasons = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/scrapping_reason`, { headers })
      .then((resp) => { 
        console.log("resprespresp",resp.data)
        dispatch(getscrapReasons(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
const getShippingPartners = (data) => ({
  type: types.SHIPPING_PARTNERS_LIST,
  payload: data,
});

export const loadShippingPartners = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    var params = {
      per_page: 100,
      page_no: 1,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/shipping_partners/dropdown`, { params, headers })
      .then((resp) => { 
        dispatch(getShippingPartners(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
const getLocations = (data) => ({
  type: types.LOCATIONS_LIST,
  payload: data,
});

export const loadgetLocations = () => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
 var params = {
      per_page: 100,
      page_no: 1,
    };
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/locations/dropdown`, { params, headers })
      .then((resp) => { 
        dispatch(getLocations(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
const getcountries = (data) => ({
    type: types.COUNTRIES,
    payload: data,
  });
  
  export const loadSCountries = () => {
    return function (dispatch) {
      var headers = {
        "Content-type": "application/json",
        Authorization: `${BASE_API_SOURCE.token}`,
      };
  
      axios
        .get(`${BASE_API_SOURCE.url}api/v1/core/countries`, { headers })
        .then((resp) => { 
          console.log("resprespresp",resp.data)
          dispatch(getcountries(resp.data));
        })
        .catch((error) => console.log(error));
    };
  };
  const getstates = (data) => ({
    type: types.STATES,
    payload: data,
  });
  
  export const loadStates = (Id) => {
    return function (dispatch) {
      var headers = {
        "Content-type": "application/json",
        Authorization: `${BASE_API_SOURCE.token}`,
      };
  
      axios
        .get(`${BASE_API_SOURCE.url}api/v1/core/states/`+Id, { headers })
        .then((resp) => { 
          console.log("resprespresp",resp.data)
          dispatch(getstates(resp.data));
        })
        .catch((error) => console.log(error));
    };
  };
  const getSave_Scrap_Order_Data = (data) => ({
    type: types.SAVE_SCRAP_ORDER,
    payload: data,
  });
  
  export const Save_Scrap_Order_Data = (data, callback) => { 
    return function (dispatch) {     
  
      var headers = {
        "Content-type": "application/json",
        Authorization: `${BASE_API_SOURCE.token}`,
      };
  
      axios.post(`${BASE_API_SOURCE.url}api/v1/scrap_orders/create`, JSON.stringify(data), { headers })
        .then((resp) => {         
         
          const result = {
            status: resp.status + "-" + resp.statusText,
            headers: resp.headers,
            data: resp.data.meta.message,
          }; 
          callback(result.data) 
        })
        .catch((error) => {
          callback(error.response?.data.meta.message || error) 
        });
    };
  };
  const getUpdate_Order_Data = (data) => ({
    type: types.UPDATE_ORDER,
    payload: data,
  });
  
  export const Update_Scrap_Order_Data = (id, data, callback) => { 
    return function (dispatch) {     
  
      var headers = {
        "Content-type": "application/json",
        Authorization: `${BASE_API_SOURCE.token}`,
      };
  
      axios.post(`${BASE_API_SOURCE.url}api/v1/scrap_orders/${id}/update`, JSON.stringify(data), { headers })
        .then((resp) => {         
          //dispatch(getUpdate_Order_Data(resp.data));  
          const result = {
            status: resp.status + "-" + resp.statusText,
            headers: resp.headers,
            data: resp.data.meta.message,
          }; 
          callback(result.data) 
        })
        .catch((error) => {
          callback(error.response?.data.meta.message || error) 
        });
    };
  };
  const getUOMData = (data) => ({
    type: types.UOM_LIST,
    payload: data,
  });
  
  export const loadUOMData = () => { 
    return function (dispatch) {     
  
      var headers = {
        "Content-type": "application/json",
        Authorization: `${BASE_API_SOURCE.token}`,
      };
      var params = {
        per_page: 100,
        page_no: 1,
      };
      axios.get(`${BASE_API_SOURCE.url}api/v1/uom/dropdown`, { params, headers })
        .then((resp) => { 
          dispatch(getUOMData(resp.data));
        })
        .catch((error) => console.log(error));
    };
  };
  const getrate_calculator_Data = (data) => ({
    type: types.RATE_CALCULATOR_LIST,
    payload: data,
  });
  
  export const load_rate_calculator_data = (data) => { 
    return function (dispatch) {    
      
      var headers = {
        "Content-type": "application/json",
        Authorization: `${BASE_API_SOURCE.token}`,
      };
  
      axios.post(`${BASE_API_SOURCE.url}ipaas/shipping/rate_calculator`, JSON.stringify(data), { headers })
        .then((resp) => {         
          dispatch(getrate_calculator_Data(resp.data));  
        })
        .catch((error) => {
         console.log(error)
        });
    };
  };
  
  const getScrapOrdersDataById = (data) => ({
    type: types.SCRAP_ORDERS_VIEW,
    payload: data,
  });
  const getScrapOrdersByIdData = (data) => ({
    type: types.SCRAP_ORDERS_BY_ID,
    payload: data,
  });
  
    export const loadScrapOrdersDataById = (Id) => { 
      return function (dispatch) {     
    
        var headers = {
          "Content-type": "application/json",
          Authorization: `${BASE_API_SOURCE.token}`,
        };
    
        axios.get(`${BASE_API_SOURCE.url}api/v1/scrap_orders/`+Id, { headers })
          .then((resp) => { 
            dispatch(getScrapOrdersByIdData(resp.data));
          })
          .catch((error) => console.log(error));
      };
    };
    export const deleteScrapOrdersData= (id) => {
      return function (dispatch) {
        var headers = {
          "Content-type": "application/json",
          Authorization: `${BASE_API_SOURCE.token}`,
        };
        axios
          .delete(`${BASE_API_SOURCE.url}api/v1/scrap_orders/${id}/delete`, { headers })
          .then((resp) => { 
            dispatch(getdeleteData(resp.data));
          })
          .catch((error) => console.log(error));
      };
    };
    //#region Get source document types list
const getSOURCE_DOCUMENTData = (data) => ({
  type: types.SOURCE_DOCUMENT_LIST,
  payload: data,
});

export const loadSOURCE_DOCUMENTData = () => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/scrap_orders_source_document_types`, { headers })
      .then((resp) => { 
        dispatch(getSOURCE_DOCUMENTData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get source document types list

//#region Get GRN Order List
const getGRNData = (data) => ({
  type: types.GRN_LIST,
  payload: data,
});

export const loadGrnData = (param) => { 
  return function (dispatch) { 
    var params = {
      per_page: 100,
      page_no: param.offset,
      filters:param.filters,
      sort:param.sort
    };   

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/grn/dropdown`, { params, headers })
      .then((resp) => { 
        dispatch(getGRNData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get GRN Order List

//#region Get GRN Order Data By Id
const getGRNDataById = (data) => ({
  type: types.GRN_VIEW,
  payload: data,
});

export const loadGrnDataById = (Id) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/grn/`+Id, { headers })
    // axios.get(`${BASE_API_SOURCE.url}api/v1/grn/16`,  { headers })
      .then((resp) => { 
        dispatch(getGRNDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get GRN Order Data By Id
const getShippingOrdersViewData = (data) => ({
  type: types.SHIPPINGORDERS_VIEW,
  payload: data,
});

export const getShippingById = (id) => {
  console.log(id,"wrking")
  return function (dispatch) {

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    if(id !== undefined && id !== null) 
    {
    axios
      .get(`${BASE_API_SOURCE.url}api/v1/shipping_orders/${id}`, { headers })
      .then((resp) => { 
        dispatch(getShippingOrdersViewData(resp.data));
      })
      .catch((error) => console.log(error));
    }
  };
};

// __________________________________________

const accessManagement = (data) => ({
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
    // .get(`${BASE_API_SOURCE.url}api/v1/template/2?filters=[["display_name","=","SCRAP_ORDERS"]]`, { headers })
    .get(`${BASE_API_SOURCE.url}api/v1/template/${localStorage.getItem("access_template_id")}?filters=[["display_name","=","SCRAP_ORDERS"]]`, { headers })
      .then((resp) => {
        console.log("sample",resp.data)
        dispatch(accessManagement(resp.data));
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