import * as types from "./actionType";

const initialState = {
    salesdata:[],
    salesdata_meta:{},
    Currencydata:[],
    Countrydata:[],
    Statedata:[],
    Lookupdata:[],
    generalSettings:[],
    invoice_details:[],
    fileCodes:[],
    file_preference:[],
    SalesMsg:{},
    contactsdata:[],
    businessTypes:[],
    authData:[],
    contactsdata_meta:{},
    loading:false
}

const SalesdataReducers =(state = initialState, action)=>{
    //console.log("action.payload", action.payload)
    switch(action.type)
    {
        case types.SALES_LIST: return{
            ...state,
            salesdata:action.payload.data,
            salesdata_meta:action.payload.meta,
            loading:false
        }
        case types.SALES_VIEW: return{
            ...state,
            salesdata:action.payload.data, 
            loading:false
        }
        case types.AUTH_ME: return{
            ...state,
            authData:action.payload.data,
            loading:false
          }
        case types.CURRENCY_TYPE: return{
            ...state,
            Currencydata:action.payload.data, 
            loading:false
        }
        case types.COUNTRY_LIST: return{
            ...state,
            Countrydata:action.payload.data, 
            loading:false
        }
        case types.STATE_LIST: return{
            ...state,
            Statedata:action.payload.data, 
            loading:false
        }
        case types.PAYMENT_TERMS_LIST: return{
            ...state,
            Lookupdata:action.payload.data, 
            loading:false
        }
        case types.GENERAL_SETTINGS: return{
            ...state,
            generalSettings:action.payload.data, 
            loading:false
        }
        case types.INVOICE_DETAILS: return{
            ...state,
            invoice_details:action.payload.data, 
            loading:false
        }
        case types.BUSINES_TYPES: return{
            ...state,
            businessTypes:action.payload.data, 
            loading:false
        }

        case types.FILE_CODES: return{
            ...state,
            fileCodes:action.payload.data,
            loading:false
        }
        case types.FILE_PREFERENCE: return{
            ...state,
            file_preference:action.payload.data,
            loading:false
        }
        case types.SAVE_SALES_ORDER: return{
            ...state,
            SalesMsg:action.payload.meta,
            loading:false
        }
        case types.CONTACTS_LIST: return{
            ...state,
            contactsdata:action.payload.data,
            contactsdata_meta:action.payload.meta,
            loading:false
        }
        default:return state;
    }
};
export default SalesdataReducers;


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