import * as types from "./ActionType";
import axios from "axios";
import GLOBAL_API_SOURCE from "../../GlobalApi";
let base_URL = GLOBAL_API_SOURCE.url;


const getPricingData = (data) => ({
    type: types.PRICING_VIEW_DATA,
    payload: data,
});

export const PricingData = (s1) => {
    console.log("s1s1", s1)
    return function (dispatch) {


        axios
            .get(`${base_URL}/api/v1/products/variant/${s1}/filter_module/price_list`,)
            .then((resp) => {
                console.log("resprespresp", resp)
                dispatch(getPricingData(resp.data));
            })
            .catch((error) => console.log(error));
    };
};


const getPurchaseReturns = (data) => ({
    type: types.PURCHASE_RETURNS_DATA,
    payload: data,
});

export const PurchaseReturns = (s1) => {
    console.log("s1s1", s1)
    return function (dispatch) {


        axios
            .get(`${base_URL}/api/v1/purchase_orders/${s1}/history`,)
            .then((resp) => {
                console.log("resprespresp", resp)
                dispatch(getPurchaseReturns(resp.data));
            })
            .catch((error) => console.log(error));
    };
};

const getSalesReturns = (data) => ({
    type: types.SALES_RETURNS_DATA,
    payload: data,
});

export const SalesReturnsData = (s1) => {
    console.log("s1s1", s1)
    return function (dispatch) {


        axios
            .get(`${base_URL}/api/v1/sales_returns/${s1}/history`,)
            .then((resp) => {
                console.log("resprespresp", resp)
                dispatch(getSalesReturns(resp.data));
            })
            .catch((error) => console.log(error));
    };
};

const getSalesHistory = (data) => ({
    type: types.SALES_HISTORY_DATA,
    payload: data,
});

export const SalesHistoryData = (s1) => {
    console.log("s1s1", s1)
    return function (dispatch) {


        axios
            .get(`${base_URL}/api/v1/sales_orders/${s1}/history`,)
            .then((resp) => {
                console.log("resprespresp", resp)
                dispatch(getSalesHistory(resp.data));
            })
            .catch((error) => console.log(error));
    };
};


const getProductViewBundleData = (data) => ({
    type: types.PRODUCT_BUNDLE_VIEW_DATA,
    payload: data,
});

export const ProductBundleData = (s1) => {
    console.log("s1s1", s1)
    return function (dispatch) {


        axios
            .get(`${base_URL}/api/v1/products/variant/${s1}/filter_module/bundles`,)
            .then((resp) => {
                console.log("resprespresp", resp)
                dispatch(getProductViewBundleData(resp.data));
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