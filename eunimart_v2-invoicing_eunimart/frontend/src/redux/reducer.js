import * as types from "./actionType";

const initialState = {
  PurchaseInvoicedata: [],
  PurchaseInvoicedata_meta: {},
  Currencydata: [],
  Countrydata: [],
  Statedata: [],
  productVariantData: [],
  uomData: [],
  Lookupdata: [],
  Deletedata: [],
  Vendorsdata: [],
  SourceDocumentTypesData: [],
  SISourceDocumentTypesData: [],
  PurchaseOrderdata: [],
  PurchaseOrderViewdata: [],
  CreditNotedata: [],
  CreditNoteViewdata: [],
  CreditViewdata: [],
  DebitNotedata: [],
  DebitNoteViewdata: [],
  DebitViewdata: [],
  salesInvoicedata: [],
  salesInvoicedata_meta: {},
  salesInvoiceViewdata: [],
  salesInvoiceViewdata_meta: {},
  linkSalesOrder: [],
  productData: [],
  singleSalesInvoicedata: [],
  singleSalesInvoicedata_meta: {},
  salesOderData: [],
  SalesInvMsg: {},
  SalesOrderLIstdata: [],
  SalesOrderViewdata: [],
  siAccess: [],
  piAccess: [],
  loading: false,
};

const DataReducers = (state = initialState, action) => {
  //console.log("action.payload", action.payload)
  switch (action.type) {
    case types.PURCHASE_INVOICE_LIST:
      return {
        ...state,
        PurchaseInvoicedata: action.payload.data,
        PurchaseInvoicedata_meta: action.payload.meta,
        loading: false,
      };
    case types.PURCHASE_INVOICE_VIEW:
      return {
        ...state,
        PurchaseInvoicedata: action.payload.data,
        loading: false,
      };
    case types.CURRENCY_TYPE:
      return {
        ...state,
        Currencydata: action.payload.data,
        loading: false,
      };
    case types.COUNTRY_LIST:
      return {
        ...state,
        Countrydata: action.payload.data,
        loading: false,
      };
    case types.STATE_LIST:
      return {
        ...state,
        Statedata: action.payload.data,
        loading: false,
      };
    case types.PRODUCT_VARIANT_LIST:
      return {
        ...state,
        productVariantData: action.payload.data,
        loading: false,
      };
    case types.UOM_LIST:
      return {
        ...state,
        uomData: action.payload.data,
        loading: false,
      };
    case types.PAYMENT_TERMS_LIST:
      return {
        ...state,
        Lookupdata: action.payload.data,
        loading: false,
      };
    case types.DELETE_DATA:
      return {
        ...state,
        Deletedata: action.payload.data,
        loading: false,
      };
    case types.VENDORS_LIST:
      return {
        ...state,
        Vendorsdata: action.payload.data,
        loading: false,
      };
    case types.SOURCE_DOCUMENT_LIST:
      return {
        ...state,
        SourceDocumentTypesData: action.payload.data,
        loading: false,
      };
    case types.PURCHASE_ORDER_LIST:
      return {
        ...state,
        PurchaseOrderdata: action.payload.data,
        loading: false,
      };
    case types.PURCHASE_ORDER_VIEW:
      return {
        ...state,
        PurchaseOrderViewdata: action.payload.data,
        loading: false,
      };
    case types.CREDIT_NOTE_LIST:
      return {
        ...state,
        CreditNotedata: action.payload.data,
        loading: false,
      };
    case types.CREDIT_NOTE_VIEW:
      return {
        ...state,
        CreditNoteViewdata: action.payload.data,
        CreditViewdata: action.payload.data,
        loading: false,
      };
    case types.DEBIT_NOTE_LIST:
      return {
        ...state,
        DebitNotedata: action.payload.data,
        loading: false,
      };
    case types.DEBIT_NOTE_VIEW:
      return {
        ...state,
        DebitNoteViewdata: action.payload.data,
        DebitViewdata: action.payload.data,
        loading: false,
      };
    case types.SALES_INVOICE_LIST:
      return {
        ...state,
        salesInvoicedata: action.payload.data,
        salesInvoicedata_meta: action.payload.meta,
        loading: false,
      };
    case types.SALES_INVOICE_LIST_VIEW:
      return {
        ...state,
        salesInvoiceViewdata: action.payload.data,
        salesInvoiceViewdata_meta: action.payload.meta,
        loading: false,
      };
    case types.LINK_SALES_ORDER:
      return {
        ...state,
        linkSalesOrder: action.payload.data,
        loading: false,
      };
    case types.PRODUCTS_LIST:
      return {
        ...state,
        productData: action.payload.data,
        loading: false,
      };
    case types.SINGLE_SALES_INVOICE_DATA:
      return {
        ...state,
        singleSalesInvoicedata: action.payload.data,
        singleSalesInvoicedata_meta: action.payload.meta,
        loading: false,
      };
    case types.SALES_ORDER_LIST:
      return {
        ...state,
        salesOderData: action.payload.data,
        loading: false,
      };
    case types.SAVE_SALES_INVOICE:
      return {
        ...state,
        SalesInvMsg: action.payload.meta,
        loading: false,
      };
    case types.SALES_ORDERS_LIST:
      return {
        ...state,
        SalesOrderLIstdata: action.payload.data,
        loading: false,
      };
    case types.SI_SOURCE_DOCUMENT_LIST:
      return {
        ...state,
        SISourceDocumentTypesData: action.payload.data,
        loading: false,
      };
    case types.SALES_ORDER_VIEW:
      return {
        ...state,
        SalesOrderViewdata: action.payload.data,
        loading: false,
      };
    case types.SI_ACCESS_MANAGEMENT:
      return {
        ...state,
        siAccess: action.payload.data,
        loading: false,
      };
    case types.PI_ACCESS_MANAGEMENT:
      return {
        ...state,
        piAccess: action.payload.data,
        loading: false,
      };
    default:
      return state;
  }
};
export default DataReducers;

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
