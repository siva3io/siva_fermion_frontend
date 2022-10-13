import * as types from "../actions/actionType";

const initialState = {
    purchaseReturnsdata:[],
    purchaseReturnsdata_meta:{},
    purchaseReturnsViewdata:[],
    purchaseReturnsViewdata_meta:{} ,
    productData:[],
    uomData:[],
    Vendorsdata:[],
    currency:[],
    selectPaymentTerms:[],
    purchaseOrdersList:[],
    PrMsg:{},
    Salesdata:[],
    SalesViewdata:[],
    purchaseView:[],
    SourceDocumentTypesData:[],
    loading:false,
    salesReturnView:[],
    salesReturnList:[],
    access:[],
    debitnotedata:[]
}

const PurchaseReturnsdataReducers =(state = initialState, action)=>{
    console.log("action.payload", action.payload)
    switch(action.type)
    {
       
        case types.PURCHASE_RETURNS_LIST: return{
            ...state,
            purchaseReturnsdata:action.payload.data,
            purchaseReturnsdata_meta:action.payload.meta,
            loading:false
        }
        case types.PURCHASE_RETURNS_LIST_VIEW: return{
            ...state,
            purchaseReturnsViewdata:action.payload.data,
            purchaseReturnsViewdata_meta:action.payload.meta,
            loading:false
        }
        case types.PRODUCTS_LIST: return {
            ...state,
            productData: action.payload.data,
            loading:false
          }
          case types.VENDORS_LIST: return{
            ...state,
            Vendorsdata:action.payload.data, 
            loading:false
        }
          case types.UOM_LIST: return{
            ...state,
            uomData:action.payload.data,
            loading:false
            
        }
        case types.CURRENCY_TYPE: return{
            ...state,
            currency:action.payload.data,
            loading:false
            
        }
        case types.Save_Purchase_Return: return {
            ...state,
            PrMsg:action.payload.meta,
            loading:false
          }
          case types.PAYMENT_TERMS: return {
            ...state,
            selectPaymentTerms:action.payload.data,
            loading:false
          }
          case types.PURCHASE_ORDERS: return {
            ...state,
            purchaseOrdersList:action.payload.data,
            loading:false
          }
          case types.SALES_LIST: return{
            ...state,
            Salesdata:action.payload.data, 
            loading:false
        }        
        case types.SALES_VIEW: return{
            ...state,
            SalesViewdata:action.payload.data, 
            loading:false
        }
        case types.PURCHASE_VIEW: return{
          ...state,
          purchaseView:action.payload.data, 
          loading:false
      }
      case types.SOURCE_DOCUMENT_LIST: return{
        ...state,
        SourceDocumentTypesData:action.payload.data,
        loading:false
    }
    case types.SALES_RETURNS_LIST_VIEW: return{
      ...state,
      salesReturnView:action.payload.data,
      loading:false
  }
  case types.SALES_RETURNS_LIST: return{
    ...state,
    salesReturnList:action.payload.data,
    loading:false
}

case types.ACCESS_MANAGEMENT: return{
  ...state,
  access:action.payload.data,
  loading:false
}
case types.DEBIT_LIST: return{
  ...state,
  debitnotedata:action.payload.data,
  loading:false
}
        default:return state;
    }
};
export default PurchaseReturnsdataReducers;

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