import * as types from "./actionType";

const initialState = {
  salesdata: [],
  salesdata_meta: {},
  Currencydata: [],
  Reasonsdata: [],
  Countrydata: [],
  Statedata: [],
  Lookupdata: [],
  Vendorsdata: [],
  Vendorsdata_Details: [],
  productVariantData: [],
  uomData: [],
  contactsData: [],
  invoiceData: [],
  SalesMsg: {},
  debitnotedata: [],
  debitnotedata_meta: {},
  productsListData: [],
  productsDataId: {},
  loading: false,
  debitnotecreateData: [],
  purchaseInvoiceData: [],
  SourceDocumentTypesData: [],
  ASNdata: [],
  GRNdata: [],
  ISTdata: [],
  ScrapOrdersData: [],
  DeliveryOrdersData: [],
  PurchaseReturnsData: [],
  SalesReturnsData: [],
  PurchaseOrdersData: [],
  SalesOrdersData: [],
  ASNViewdata: [],
  GRNViewdata: [],
  ISTViewdata: [],
  ScrapOrdersViewData: [],
  DeliveryOrdersViewData: [],
  PurchaseReturnsViewData: [],
  SalesReturnsViewData: [],
  PurchaseOrdersViewData: [],
  SalesOrdersViewData: [],
  loading: false,
  salesdata: [],
  salesdata_meta: {},
  salesdeletedata: [],
  salesdeletedata_meta: {},
  Currencydata: [],
  Countrydata: [],
  Statedata: [],
  Lookupdata: [],
  Vendorsdata: [],
  Vendorsdata_Details: [],
  productVariantData: [],
  uomData: [],
  contactsData: [],
  invoiceData: [],
  SalesMsg: {},
  debitnotedata: [],
  debitnotedata_meta: {},
  productsListData: [],
  loading: false,
  debitnotecreateData: [],
  purchaseInvoiceData: [],
  PurchaseInvoiceData: [],
  PurchaseInvoiceData_meta: {},
  PurchaseInvoiceViewData: [],
  access: [],
};

const SalesdataReducers = (state = initialState, action) => {
  // console.log("action.payload_sdfghj", action)
  switch (action.type) {
    case types.SALES_LIST:
      return {
        ...state,
        salesdata: action.payload.data,
        salesdata_meta: action.payload.meta,
        loading: false,
      };
    case types.SALES_VIEW:
      return {
        ...state,
        salesdata: action.payload.data,
        loading: false,
      };

    case types.DEBIT_NOTE_LIST:
      return {
        ...state,
        debitnotedata: action.payload.data,
        debitnotedata_meta: action.payload.meta,
        loading: false,
      };
    case types.DEBIT_NOTE_VIEW:
      return {
        ...state,
        debitnotedata: action.payload.data,
        loading: false,
      };

    case types.LOOKUP_CODE_REASONS:
      return {
        ...state,
        Reasonsdata: action.payload.data,
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
    case types.PAYMENT_TERMS_LIST:
      return {
        ...state,
        Lookupdata: action.payload.data,
        loading: false,
      };
    case types.VENDORS_LIST:
      return {
        ...state,
        Vendorsdata: action.payload.data,
        loading: false,
      };
    case types.VENDORS_DETAILS:
      return {
        ...state,
        Vendorsdata_Details: action.payload.data,
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
    case types.SAVE_SALES_ORDER:
      return {
        ...state,
        SalesMsg: action.payload.meta,
        loading: false,
      };
    case types.CONTACTS_LIST:
      return {
        ...state,
        contactsData: action.payload.data,
        loading: false,
      };
    case types.PURCHASE_INVOICE_LIST:
      return {
        ...state,
        PurchaseInvoiceData: action.payload.data,
        PurchaseInvoiceData_meta: action.payload.meta,
        loading: false,
      };
    case types.PURCHASE_INVOICE:
      return {
        ...state,
        invoiceData: action.payload.data,
        loading: false,
      };
    case types.PRODUCTS_REQUEST:
      return {
        ...state,
        productsListData: action.payload.data,
        loading: false,
      };
    case types.CREATE_DEBIT_NOTE_REQUEST:
      return {
        ...state,
        debitnotecreateData: action.payload.data,
        loading: false,
      };
    case types.PURCHASE_INVOICE_REQUEST:
      return {
        ...state,
        purchaseInvoiceData: action.payload.data,
        loading: false,
      };
    case types.SALES_DELETE_LIST:
      return {
        ...state,
        salesdeletedata: action.payload.data,
        salesdeletedata_meta: action.payload.meta,
        loading: false,
      };
    case types.SALES_LIST:
      return {
        ...state,
        salesdata: action.payload.data,
        salesdata_meta: action.payload.meta,
        loading: false,
      };
    case types.SALES_VIEW:
      return {
        ...state,
        salesdata: action.payload.data,
        loading: false,
      };

    case types.DEBIT_NOTE_LIST:
      return {
        ...state,
        debitnotedata: action.payload.data,
        debitnotedata_meta: action.payload.meta,
        loading: false,
      };
    case types.DEBIT_NOTE_VIEW:
      return {
        ...state,
        debitnotedata: action.payload.data,
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
    case types.PAYMENT_TERMS_LIST:
      return {
        ...state,
        Lookupdata: action.payload.data,
        loading: false,
      };
    case types.VENDORS_LIST:
      return {
        ...state,
        Vendorsdata: action.payload.data,
        loading: false,
      };
    case types.VENDORS_DETAILS:
      return {
        ...state,
        Vendorsdata_Details: action.payload.data,
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
    case types.SAVE_SALES_ORDER:
      return {
        ...state,
        SalesMsg: action.payload.meta,
        loading: false,
      };
    case types.CONTACTS_LIST:
      return {
        ...state,
        contactsData: action.payload.data,
        loading: false,
      };
    case types.PURCHASE_INVOICE:
      return {
        ...state,
        invoiceData: action.payload.data,
        loading: false,
      };
    case types.PRODUCTS_REQUEST:
      return {
        ...state,
        productsListData: action.payload.data,
        loading: false,
      };
    case types.PRODUCTS_REQUEST_ID:
      return {
        ...state,
        productsDataId: action.payload.data,
        loading: false,
      };
    case types.CREATE_DEBIT_NOTE_REQUEST:
      return {
        ...state,
        debitnotecreateData: action.payload.data,
        loading: false,
      };
    case types.PURCHASE_INVOICE_REQUEST:
      return {
        ...state,
        purchaseInvoiceData: action.payload.data,
        loading: false,
      };
    case types.SOURCE_DOCUMENT_LIST:
      return {
        ...state,
        SourceDocumentTypesData: action.payload.data,
        loading: false,
      };
    case types.ASN_LIST:
      return {
        ...state,
        ASNdata: action.payload.data,
        loading: false,
      };
    case types.GRN_LIST:
      return {
        ...state,
        GRNdata: action.payload.data,
        loading: false,
      };
    case types.IST_LIST:
      return {
        ...state,
        ISTdata: action.payload.data,
        loading: false,
      };
    case types.SCRAP_ORDER_LIST:
      return {
        ...state,
        ScrapOrdersData: action.payload.data,
        loading: false,
      };
    case types.DELIVERY_ORDER_LIST:
      return {
        ...state,
        DeliveryOrdersData: action.payload.data,
        loading: false,
      };
    case types.PURCHASE_RETURNS_LIST:
      return {
        ...state,
        PurchaseReturnsData: action.payload.data,
        loading: false,
      };
    case types.SALES_RETURNS_LIST:
      return {
        ...state,
        SalesReturnsData: action.payload.data,
        loading: false,
      };
    case types.PURCHASE_ORDERS_LIST:
      return {
        ...state,
        PurchaseOrdersData: action.payload.data,
        loading: false,
      };
    case types.SALES_ORDER_LIST:
      return {
        ...state,
        SalesOrdersData: action.payload.data,
        loading: false,
      };
    case types.ASN_LIST:
      return {
        ...state,
        ASNdata: action.payload.data,
        loading: false,
      };
    case types.GRN_LIST:
      return {
        ...state,
        GRNdata: action.payload.data,
        loading: false,
      };
    case types.IST_LIST:
      return {
        ...state,
        ISTdata: action.payload.data,
        loading: false,
      };
    case types.SCRAP_ORDER_LIST:
      return {
        ...state,
        ScrapOrdersData: action.payload.data,
        loading: false,
      };
    case types.DELIVERY_ORDER_LIST:
      return {
        ...state,
        DeliveryOrdersData: action.payload.data,
        loading: false,
      };
    case types.PURCHASE_RETURNS_LIST:
      return {
        ...state,
        PurchaseReturnsData: action.payload.data,
        loading: false,
      };
    case types.SALES_RETURNS_LIST:
      return {
        ...state,
        SalesReturnsData: action.payload.data,
        loading: false,
      };
    case types.PURCHASE_ORDERS_LIST:
      return {
        ...state,
        PurchaseOrdersData: action.payload.data,
        loading: false,
      };
    case types.SALES_ORDER_LIST:
      return {
        ...state,
        SalesOrdersData: action.payload.data,
        loading: false,
      };
    case types.ASN_VIEW:
      return {
        ...state,
        ASNViewdata: action.payload.data,
        loading: false,
      };
    case types.GRN_VIEW:
      return {
        ...state,
        GRNViewdata: action.payload.data,
        loading: false,
      };
    case types.IST_VIEW:
      return {
        ...state,
        ISTViewdata: action.payload.data,
        loading: false,
      };
    case types.SCRAP_ORDER_VIEW:
      return {
        ...state,
        ScrapOrdersViewData: action.payload.data,
        loading: false,
      };
    case types.DELIVERY_ORDER_VIEW:
      return {
        ...state,
        DeliveryOrdersViewData: action.payload.data,
        loading: false,
      };
    case types.PURCHASE_RETURNS_VIEW:
      return {
        ...state,
        PurchaseReturnsViewData: action.payload.data,
        loading: false,
      };
    case types.SALES_RETURNS_VIEW:
      return {
        ...state,
        SalesReturnsViewData: action.payload.data,
        loading: false,
      };
    case types.PURCHASE_ORDERS_VIEW:
      return {
        ...state,
        PurchaseOrdersViewData: action.payload.data,
        loading: false,
      };
    case types.SALES_ORDERS_VIEW:
      return {
        ...state,
        SalesOrdersViewData: action.payload.data,
        loading: false,
      };
    case types.PURCHASE_INVOICE_VIEW:
      return {
        ...state,
        PurchaseInvoiceViewData: action.payload.data,
        loading: false,
      };
    case types.ACCESS_MANAGEMENT:
      return {
        ...state,
        access: action.payload.data,
        loading: false,
      };

    default:
      return state;
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
