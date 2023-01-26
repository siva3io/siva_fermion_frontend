import * as types from "../Action/ActionType";

const initialState = {
    salesPriceListData: [],
    purchasePriceListData: [],
    purchaseReturnsData: [],
    salesReturnsData: [],
    salesHistoryData: [],
    productBundleData: [],

}

const ProductsCombinedReducers = (state = initialState, action) => {
    console.log("action.payload", action.payload)
    switch (action.type) {

        case types.PRICING_VIEW_DATA: return {
            ...state,
            salesPriceListData: action?.payload?.data?.sales_price_list,
            purchasePriceListData: action?.payload?.data?.purchase_price_list,
            loading: false
        }
        case types.PURCHASE_RETURNS_DATA: return {
            ...state,
            purchaseReturnsData: action?.payload?.data,
            loading: false
        }
        case types.SALES_RETURNS_DATA: return {
            ...state,
            salesReturnsData: action?.payload?.data,
            loading: false
        }
        case types.SALES_HISTORY_DATA: return {
            ...state,
            salesHistoryData: action?.payload?.data,
            loading: false
        }
        case types.PRODUCT_BUNDLE_VIEW_DATA: return {
            ...state,
            productBundleData: action?.payload?.data,
            loading: false
        }




        default: return state;
    }
};
export default ProductsCombinedReducers;

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