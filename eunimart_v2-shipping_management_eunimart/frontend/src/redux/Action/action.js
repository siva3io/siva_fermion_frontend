import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../../baseurl";
import { ToastContainer, toast } from 'react-toastify';
//#region Get Sales Order List
const getSalesData = (data) => ({
  type: types.SALES_LIST,
  payload: data,
});

export const loadSalesData = (param) => { 
  return function (dispatch) { 
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      filters:param.filters,
      sort:param.sort
    };   

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/sales_orders`, { params, headers })
      .then((resp) => { 
        dispatch(getSalesData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Sales Order List

//#region Get Sales Order Data By Id
const getSalesDataById = (data) => ({
  type: types.SALES_VIEW,
  payload: data,
});

export const loadSalesDataById = (Id) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/sales_orders/`+Id, { headers })
      .then((resp) => { 
        dispatch(getSalesDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Sales Order Data By Id

//#region Get Currency list
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
//#endregion Get Currency list



//#region Get Country list
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
//#endregion Get Currency list


//#region Get State Data By Id
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

    axios.get(`${BASE_API_SOURCE.url}api/v1/core/states/`+Id, { headers })
      .then((resp) => { 
        dispatch(getStateDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get State Data By Id


//#region Get Payment Terms list
const getPaymentTermsData = (data) => ({
  type: types.PAYMENT_TERMS_LIST,
  payload: data,
});

export const loadPaymentTermsData = (type) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/core/lookup_codes/`+type, { headers })
      .then((resp) => { 
        dispatch(getPaymentTermsData(resp.data));       
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Payment Terms list

//#region Get rate_calculator Estimated Cost list
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
//#endregion Get rate_calculator Estimated Cost list
//#region Get vendors list
const getVendorsData = (data) => ({
  type: types.VENDORS_LIST,
  payload: data,
});

export const loadVendorsData = () => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/vendors/dropdown`, { headers })
      .then((resp) => { 
        dispatch(getVendorsData(resp.data));       
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get vendors list


//#region Get vendors Data By Id
const getvendorsDataById = (data) => ({
  type: types.VENDORS_DETAILS,
  payload: data,
});

export const loadvendorsDataById = (Id) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/vendors/`+Id, { headers })
      .then((resp) => { 
        dispatch(getvendorsDataById(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get vendors Data By Id


//#region Get uom list
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

    axios.get(`${BASE_API_SOURCE.url}api/v1/uom/dropdown`, { headers })
      .then((resp) => { 
        dispatch(getUOMData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get uom list

//#region Get uom list
const getProductVariantData = (data) => ({
  type: types.PRODUCT_VARIANT_LIST,
  payload: data,
});

export const loadProductVariantData = (param) => { 
  return function (dispatch) {     
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      filters:param.filters,
      sort:param.sort
    }; 
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/products/variant/dropdown`, { params, headers })
      .then((resp) => { 
        dispatch(getProductVariantData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get uom list



//#region Get uom list
const getSave_Sales_Order_Data = (data) => ({
  type: types.SAVE_SALES_ORDER,
  payload: data,
});

export const Save_Sales_Order_Data = (data,callback) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.post(`${BASE_API_SOURCE.url}api/v1/shipping_orders/create`, JSON.stringify(data), { headers })
      .then((resp) => { 

        const result = {
          status: resp.status + "-" + resp.statusText,
          headers: resp.headers,
          data: resp.data.meta.message,
        }; 
        callback(result.data) 
        //console.log("/api/v1/sales_orders/create", resp)
        dispatch(getSave_Sales_Order_Data(resp.data));
        if(resp.data.meta.message.success == "true"){
          navigate.push("/shippingOrders/"); 
        }
        // navigate.push("/shippingOrders/"); 
      })
      // .catch((error) => console.log(error));
      .catch((error) => {
        callback(error.response?.data.meta.message || error) 
      });
  };
};
//#endregion Get uom list


//#region Get uom list
const getUpdate_Order_Data = (data) => ({
  type: types.UPDATE_SHIPPING,
  payload: data,
});

export const Update_Shipping_Order_Data = (id, data, callback) => { 
  return function (dispatch) {     

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.post(`${BASE_API_SOURCE.url}api/v1/shipping_orders/${id}/update`, JSON.stringify(data), { headers })
      .then((resp) => {         
        dispatch(getUpdate_Order_Data(resp.data));  
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


const getShippingOrdersViewData = (data) => ({
  type: types.SHIPPINGORDERS_VIEW,
  payload: data,
});

export const getShippingById = (id) => {
  console.log(id,"wrking")
  return function (dispatch) {
    // const params={
    //   per_page:params1?.per_page ? params1?.per_page : params1?.limit ,
    //   page_no:params1?.page_no ? params1?.page_no: params1?.offset   
    // };
    // var params = {
    //   per_page: 10,
    //   page_no: 1,
    // };

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


//#region Get Contacts List
const getContactData = (data) => ({
  type: types.CONTACTS_LIST,
  payload: data,
});

export const loadContactsData = (param) => { 
  return function (dispatch) { 
    var params = {
      per_page: param.limit,
      page_no: param.offset,
      filters:param.filters,
      sort:param.sort
    };   

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios.get(`${BASE_API_SOURCE.url}api/v1/contacts`, { params, headers })
      .then((resp) => { 
        dispatch(getContactData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
//#endregion Get Contacts List




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