import * as types from "../Actions/actionType";

const initialState = {
    Vendorsdata:[],
    Lookupdata:[],
    EstimatedCostdata:[],
    purchaseOrdersData_meta:{} ,
    purchaseOrdersDataId:{},
    Currencydata:[],
    Countrydata:[],
    Statedata:[],
    productVariantData:[],
    uomData:[],
    locationData:[],
    loading:false,
    VendorsDetails:{},
    OrganisationDetailsId:{},
    OrganisationDetails:[],
    editpoData:[],
    sourceDocTypeData:[],
    ASNdata:[],
    ASNViewdata:[],
    salesOrdersdata:[],
    salesOrdersViewdata:[],
    grnViewdata:[],
    grndata:[],
    deleiveryOrdersViewdata:[],
    deleiveryOrdersdata:[],
    scrapOrdersViewdata:[],
    scrapOrdersdata:[],
    access:[],
    purchaseReturnsdata:[],
    debitnotedata:[],
    asnData:[],
    PurchaseInvoicedata:[]
}

const purchaseOrdersReducer =(state = initialState, action)=>{
    console.log("action.payload", action.payload)
    switch(action.type)
    {
        case types.PURCHASE_ORDERS_LIST: return{
            ...state,
            purchaseOrdersData:action.payload.data,
            purchaseOrdersData_meta:action.payload.meta,
            loading:false
        }
        case types.PURCHASE_ORDERS_LIST_BY_ID: return{
            ...state,
            purchaseOrdersDataId:action.payload.data,
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
        case types.LOCATION_LIST: return{
            ...state,
            locationData:action.payload.data,
            loading:false
        }
        case types.RATE_CALCULATOR_LIST: return{
            ...state,
            EstimatedCostdata:action.payload.data, 
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
            VendorsDetails:action.payload.data, 
            loading:false
        }
        
        case types.CONTACTS_DETAILS: return{
            ...state,
            OrganisationDetails:action.payload.data, 
            loading:false
        }
        
        case types.CONTACTS_DETAILS_ID: return{
            ...state,
            OrganisationDetailsId:action.payload.data, 
            loading:false
        }
        case types.DELETE_PO_REQUEST: return{
            ...state,
            deletepoData:action.payload.data,
            loading:false
        }

        case types.EDIT_PURCHASE_ORDER: return{
            ...state,
            editpoData:action.payload.data,
            loading:false
        }
        case types.SOURCE_DOC_TYPE_REQUEST: return{
            ...state,
            sourceDocTypeData:action.payload.data,
            loading:false
        }
        case types.ASN_LIST: return{
            ...state,
            ASNdata:action.payload.data,
            loading:false
        }
        case types.ASN_VIEW: return{
            ...state,
            ASNViewdata:action.payload.data, 
            loading:false
        }
        case types.GRN_VIEW: return{
            ...state,
            grnViewdata:action.payload.data, 
            loading:false
        }
        case types.GRN_LIST: return{
            ...state,
            grndata:action.payload.data, 
            loading:false
        }
        case types.SALES_ORDERS_VIEW: return{
            ...state,
            salesOrdersViewdata:action.payload.data, 
            loading:false
        }
        case types.SALES_ORDERS_LIST: return{
            ...state,
            salesOrdersdata:action.payload.data, 
            loading:false
        }
        case types.DELIVERY_ORDERS_LIST: return{
            ...state,
            deleiveryOrdersdata:action.payload.data, 
            loading:false
        }
        case types.DELIVERY_ORDERS_VIEW: return{
            ...state,
            deleiveryOrdersViewdata:action.payload.data, 
            loading:false
        }
        case types.SCRAP_ORDERS_LIST: return{
            ...state,
            scrapOrdersdata:action.payload.data, 
            loading:false
        }
        case types.SCRAP_ORDERS_VIEW: return{
            ...state,
            scrapOrdersViewdata:action.payload.data, 
            loading:false
        }
        case types.ACCESS_MANAGEMENT: return{
            ...state,
            access:action.payload.data, 
            loading:false
        }
        case types.PURCHASE_RETURNS_LIST: return{
            ...state,
            purchaseReturnsdata:action.payload.data, 
            loading:false
        }
        case types.DEBIT_LIST: return{
            ...state,
            debitnotedata:action.payload.data,
            loading:false
          }
          
        case types.ASN_LIST_TAB: return{
            ...state,
            asnData:action.payload.data,
            loading:false
          }
          case types.PURCHASE_INVOICE_LIST_TAB: return{
            ...state,
            PurchaseInvoicedata:action.payload.data,
            loading:false
          }
        default:return state;
    }
};
export default purchaseOrdersReducer;




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