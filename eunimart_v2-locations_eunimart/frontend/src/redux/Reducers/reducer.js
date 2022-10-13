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