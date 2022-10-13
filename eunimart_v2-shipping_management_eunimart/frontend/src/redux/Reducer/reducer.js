import * as types from "../Action/actionType";

const initialState = {
    salesdata:[],
    salesdata_meta:{},
    Currencydata:[],
    Countrydata:[],
    Statedata:[],
    Lookupdata:[],
    Vendorsdata:[],
    Vendorsdata_Details:[],
    productVariantData:[],
    uomData:[],
    SalesMsg:{},
    EstimatedCostdata:[],
    Shippingdata:[],
    contactsdata:[],
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
        case types.VENDORS_LIST: return{
            ...state,
            Vendorsdata:action.payload.data, 
            loading:false
        }
        case types.VENDORS_DETAILS: return{
            ...state,
            Vendorsdata_Details:action.payload.data, 
            loading:false
        }
        case types.PRODUCT_VARIANT_LIST: return{
            ...state,
            productVariantData:action.payload.data,
            loading:false
        }
        case types.UOM_LIST: return{
            ...state,
            uomData:action.payload.data,
            loading:false
        }
        case types.SAVE_SALES_ORDER: return{
            ...state,
            SalesMsg:action.payload.meta,
            loading:false
        }
        case types.RATE_CALCULATOR_LIST: return{
            ...state,
            EstimatedCostdata:action.payload.data, 
            loading:false
        }
        case types.SHIPPINGORDERS_VIEW: return{
            ...state,
            Shippingdata:action.payload.data, 
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