import * as types from "../Actions/actionType";

const initialState = {
    locationData: [],
    locationTypes: [],
    locationById: {},
    locationData_meta: {},
    Countrydata: [],
    Statedata: [],
    Shippingpartnersdata: [],
    Currencydata: [],
    loading: false,
    access: [],
    integratedChannels: [],

}

const LocationDataReducers = (state = initialState, action) => {
    console.log("dfcgvhbjnm", action.payload)
    switch (action.type) {
        case types.LOCATION_LIST: return {
            ...state,
            locationData: action.payload.data,
            locationData_meta: action.payload.meta,
            loading: false
        }
        case types.LOCATION_TYPE_LIST: return {
            ...state,
            locationTypes: action.payload.data,
            loading: false
        }
        case types.LOCATION_BY_ID: return {
            ...state,
            locationById: action.payload.data,
            loading: false
        }
        case types.CURRENCY_TYPE: return {
            ...state,
            Currencydata: action.payload.data,
            loading: false
        }
        case types.COUNTRY_LIST: return {
            ...state,
            Countrydata: action.payload.data,
            loading: false
        }
        case types.STATE_LIST: return {
            ...state,
            Statedata: action.payload.data,
            loading: false
        }
        case types.SHIPPING_PARTNERS_LIST:
            console.log("dfahbydhnf", action.payload)
            return {
                ...state,
                Shippingpartnersdata: action.payload.data,
                loading: false
            }
        case types.PARENT_LOCATION: return {
            ...state,
            parentLocation: action.payload.data,
            loading: false
        }
        case types.ACCESS_MANAGEMENT: return {
            ...state,
            access: action.payload.data,
            loading: false
        }
        case types.INTEGRATED_CHANNELS_LIST:
            return {
                ...state,
                integratedChannels: action.payload.data,
                loading: false
            }
        default: return state;
    }
};
export default LocationDataReducers;

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