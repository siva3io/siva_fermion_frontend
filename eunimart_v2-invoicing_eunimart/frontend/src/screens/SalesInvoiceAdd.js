import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";  
import { useHistory } from "react-router-dom";
import AddForm from "Remote/AddForm";
import AddFormFooter_Button from "Remote/AddFormFooter_Button";
import AddForm_Table from 'Remote/AddForm_Table';
import { lazy, Suspense } from "react";
import ErrorBoundary from "../../ErrorBoundary"
import AddFormFooter from "Remote/AddFormFooter";
import { Link,Box, Typography, Button, FormGroup,MenuItem,Menu, Grid,FormLabel} from "@mui/material";
// import { loadCurrencyData,loadLinkSalesOrder,loadCountryData, loadPaymentTermsData,loadStateDataById ,loadUOMData,loadProductsListData,
//   Update_Sales_Invoice_Data,loadSingleSalesInvoiceData,loadSalesOrderData,Save_Sales_Invoice_Data,loadDebitNoteOrderData,loadCreditNoteOrderData,
//   loadSalesOrdersDataList,loadSOURCE_DOCUMENTData, loadDebitNoteDataById,loadCreditNoteDataById, loadSalesOrderDataById} from "../redux/action";
import { loadCurrencyData,loadLinkSalesOrder,loadCountryData,loadPaymentTermsData,loadStateDataById,loadUOMData,loadProductsListData,
  Update_Sales_Invoice_Data,loadSingleSalesInvoiceData,loadSalesOrderData,Save_Sales_Invoice_Data,loadDebitNoteOrderData,loadCreditNoteOrderData,
  loadSalesOrdersDataList,loadSISOURCE_DOCUMENTData,loadDebitNoteOrderDataById,loadCreditNoteOrderDataById,loadSalesOrderDataById} from "../redux/action";
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
import moment from 'moment'

const RemoteWrapper = ({ children }) => (
    <div>
        <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  );
  
const SalesInvoiceAdd = (props) => {
  const navigate = useHistory();
    let dispatch = useDispatch();
    
  const[selectedProductData, setSelectedProductData]=useState([{Quantity:0, selling_price:0, discount:0, product_pricing_details:{tax_options:0}}]);
  
  const [params, setParams] = useState({});
  const[mainData, setMainData]=useState({});
  const[linkSIData, setlinkSIData]=useState([]);
  const [Country, setCountry] = useState();
  const onAddNewRaw = () =>{
    setSelectedProductData([...selectedProductData,{Quantity:0, selling_price:0, discount:0, product_pricing_details:{tax_options:0}}]);
  }
  const { productData,Currencydata,linkSalesOrder,uomData,Countrydata,salesOderData,Statedata,SalesInvMsg,Lookupdata,
    singleSalesInvoicedata,SISourceDocumentTypesData, DebitNotedata, CreditNotedata,SalesOrderLIstdata,DebitViewdata,CreditViewdata,
    SalesOrderViewdata} = useSelector((state) => state.data);  
   
  useEffect(() => {
    dispatch(loadCurrencyData());
    dispatch(loadLinkSalesOrder());
    dispatch(loadCountryData());
    dispatch(loadPaymentTermsData("payment_terms")); 

    dispatch(loadProductsListData());
   
    dispatch(loadUOMData());
    
    
    dispatch(loadSalesOrderData(params));
    dispatch(loadSISOURCE_DOCUMENTData());
    // dispatch(loadStateDataById());
  
    if(props && props.id){
      const{id}=props;
      dispatch(loadSingleSalesInvoiceData(id));
    }
  }, []);
  
  useEffect(()=>{  
    if(props && props.id && singleSalesInvoicedata){
      var newMainData=[];
      var newSalesInvoiceDetailsFields = SalesInvoiceDetailsFields
      .map(o=> {
        if(o.key=="invoice_id") o.value= singleSalesInvoicedata?.id; 
        if(o.key=="reference_number") o.value=singleSalesInvoicedata?.reference_number; 
        if(o.key=="invoice_date") o.value=moment(singleSalesInvoicedata?.created_date).format("YYYY-MM-DD"); 
        if(o.key=="expected_shipment_date") o.value=moment(singleSalesInvoicedata?.expected_shipment_date).format("YYYY-MM-DD"); 
        if(o.key=="invoice_currency") o.value={id:singleSalesInvoicedata?.currency?.id, label:singleSalesInvoicedata?.currency?.name}; 
        if(o.key=="link_sales_order") o.value={id:singleSalesInvoicedata.link_sales_orders?.[0]?.id, label:singleSalesInvoicedata?.link_sales_orders?.[0]?.sales_order_number}; 
        if (o.key == "Link_Source_Document_Type") o.value = { id: singleSalesInvoicedata?.source_document_type?.id, label: singleSalesInvoicedata?.source_document_type?.display_name ,lookup_code: singleSalesInvoicedata?.source_document_type?.lookup_code};
        if (o.key == "Link_Source_Document") {
          o.value  = singleSalesInvoicedata && singleSalesInvoicedata .source_document_type?.lookup_code == 'SALES_ORDERS' ? {id: singleSalesInvoicedata?.source_documents?.id , label: singleSalesInvoicedata?.source_documents?.sales_order_number , data:singleSalesInvoicedata?.source_documents} 
          : o.value  = singleSalesInvoicedata && singleSalesInvoicedata .source_document_type?.lookup_code == 'CREDIT_NOTE' ? {id: singleSalesInvoicedata?.source_documents?.id , label: singleSalesInvoicedata?.source_documents?.credit_note_id , data:singleSalesInvoicedata?.source_documents} 
          :o.value  = singleSalesInvoicedata && singleSalesInvoicedata .source_document_type?.lookup_code == 'DEBIT_NOTE' ? {id: singleSalesInvoicedata?.source_documents?.id , label: singleSalesInvoicedata?.source_documents?.debit_note_id , data:singleSalesInvoicedata?.source_documents} 
          :null
          
        }
        return o;})
      setSalesInvoiceDetailsFields(newSalesInvoiceDetailsFields);

      var newSalesDeliveryDetails = SalesDeliveryDetails
      .map(o=> {
        if(o.key=="delivery_customer_name") o.value=singleSalesInvoicedata?.delivery_address?.[0]?.customer_name; 
        if(o.key=="delivery_mobile_number") o.value=singleSalesInvoicedata?.delivery_address?.[0]?.mobile_number; 
        if(o.key=="delivery_email") o.value=singleSalesInvoicedata?.delivery_address?.[0]?.email; 
        if(o.key=="delivery_address_line") o.value=singleSalesInvoicedata?.delivery_address?.[0]?.Address; 
        if(o.key=="delivery_address_line2") o.value=singleSalesInvoicedata?.delivery_address?.[0]?.address_line_2; 
        if(o.key=="delivery_address_line3") o.value=singleSalesInvoicedata?.delivery_address?.[0]?.address_line_3; 
        if(o.key=="delivery_zip") o.value=singleSalesInvoicedata?.delivery_address?.[0]?.zipcode; 
        if(o.key=="delivery_district") o.value=singleSalesInvoicedata?.delivery_address?.[0]?.district; 
        if(o.key=="delivery_state_id") o.value=singleSalesInvoicedata?.delivery_address?.[0]?.state; 
        if(o.key=="delivery_country_id") o.value=singleSalesInvoicedata?.delivery_address?.[0]?.country; 
        return o;})
        setSalesDeliveryDetails(newSalesDeliveryDetails);

        var newSalesBillingDetails = SalesBillingDetails
        .map(o=> {
          if(o.key=="billing_customer_name") o.value=singleSalesInvoicedata?.delivery_address?.[0]?.customer_name; 
          if(o.key=="billing_mobile_number") o.value=singleSalesInvoicedata?.delivery_address?.[0]?.mobile_number; 
          if(o.key=="billing_email") o.value=singleSalesInvoicedata?.delivery_address?.[0]?.email; 
          if(o.key=="billing_address_line") o.value=singleSalesInvoicedata?.delivery_address?.[0]?.Address; 
          if(o.key=="billingy_address_line2") o.value=singleSalesInvoicedata?.delivery_address?.[0]?.address_line_2; 
          if(o.key=="billing_address_line3") o.value=singleSalesInvoicedata?.delivery_address?.[0]?.address_line_3; 
          if(o.key=="billing_zip") o.value=singleSalesInvoicedata?.delivery_address?.[0]?.zipcode; 
          if(o.key=="billing_district") o.value=singleSalesInvoicedata?.delivery_address?.[0]?.district; 
          if(o.key=="billing_state_id") o.value=singleSalesInvoicedata?.delivery_address?.[0]?.state; 
          if(o.key=="billing_country_id") o.value=singleSalesInvoicedata?.delivery_address?.[0]?.country; 
          return o;})
          setSalesBillingDetails(newSalesBillingDetails);

          var newPaymentTermsFields = PaymentTermsFields
          .map(o=> {
            if(o.key=="PaymentTerms_Payment_Due_Date") o.value=moment(singleSalesInvoicedata?.payment_due_date).format("YYYY-MM-DD"); 
            if(o.key=="PaymentTerms_PaymentTerms") o.value= {id: singleSalesInvoicedata?.payment_terms?.ID , label: singleSalesInvoicedata?.payment_terms?.display_name } 
            return o;})
          setPaymentTermsFields(newPaymentTermsFields);

          var newselectedProductData=[];
          if(singleSalesInvoicedata.sales_invoice_lines)
          newselectedProductData=singleSalesInvoicedata.sales_invoice_lines.map(o=>{return{
            id:o?.product_id,
            sku_id:{id:o?.product_id, label:o?.product_variant?.parent_sku_id}, 
            product_name : o?.product_variant?.product_name,       
            warehouse_id: o?.warehouse_id,
            inventory_id:o?.inventory_id,
            serial_number: o?.product_variant?.serial_number,
            description:o?.description,
            uom: {name:{id:o.uom_id, label:o.uom.name}},
            selling_price: parseFloat(o.price),
            Quantity : parseInt(o.quantity),
            discount: parseFloat(o.discount),
            // tax: parseFloat(o.tax), 
            product_pricing_details:{tax_options:parseFloat(o.tax)},
            Payment_Terms: o?.payment_terms_id,
            Amount: o.total_amount,
          }});
          setSelectedProductData(newselectedProductData);

          var newAdditionalInformationFields=AdditionalInformationFields;
          newAdditionalInformationFields.find(o=>o.key=="Additional_Information_Note").value=singleSalesInvoicedata?.internal_notes;
          newAdditionalInformationFields.find(o=>o.key=="Additional_Information_Terms_Conditions").value=singleSalesInvoicedata.terms_and_conditions;
          setAdditionalInformationFields(newAdditionalInformationFields)

          if(singleSalesInvoicedata)
          setPaymentDetailsFields({...paymentDetailsFields, subTotal:singleSalesInvoicedata.sub_total_amount, adjustment_amount:singleSalesInvoicedata.adjustment_amount, tax:singleSalesInvoicedata.tax, "shippingCharge":parseFloat(singleSalesInvoicedata?.shipping_charge), "vender_credits":singleSalesInvoicedata.vender_credits, total:singleSalesInvoicedata.total_amount})
  

      newMainData=[ 
        ...newSalesInvoiceDetailsFields,
        ...newSalesDeliveryDetails,
        ...newSalesBillingDetails,
        ...newPaymentTermsFields,
        ...newselectedProductData,
        ...newAdditionalInformationFields,
       
      ];
      var keyValuePairMainData= {};
      setlinkSIData(keyValuePairMainData)
     
      newMainData.map(o=>{
        if(o.key == "invoice_date" || o.key == "expected_shipment_date" || o.key == "PaymentTerms_Payment_Due_Date"){
          var value1= new Date(o.value)
          keyValuePairMainData[o.key]= (value1).toISOString();
           }
           else if(o.key!=null){
            if(o.key == 'link_sales_order'){
              var newlinkData = [{id: o.value?.id, sales_order_number:o.value?.label}]
        setlinkSIData(newlinkData)
            }
              keyValuePairMainData[o.key]=o.value;
         
            
             }
        
      });
      
      setMainData(keyValuePairMainData);

    }},[singleSalesInvoicedata]);

    useEffect(()=>{    
      if(SalesOrderViewdata && mainData && mainData.Link_Source_Document_Type && mainData.Link_Source_Document_Type.lookup_code == "SALES_ORDERS")
      {
        var newMainData=[];
        var newSalesInvoiceDetailsFields = SalesInvoiceDetailsFields
        .map(o=> {       
          if(o.key=="reference_number") o.value=SalesOrderViewdata?.reference_number; 
          if(o.key=="expected_shipment_date") o.value=moment(SalesOrderViewdata?.expected_shipping_date).format("YYYY-MM-DD"); 
          if(o.key=="link_sales_order") o.value={id:SalesOrderViewdata?.id, label:SalesOrderViewdata?.sales_order_number}; 
        
          return o;})
        setSalesInvoiceDetailsFields(newSalesInvoiceDetailsFields);
  
        var newSalesDeliveryDetails = SalesDeliveryDetails
      .map(o=> {
        if(o.key=="delivery_customer_name") o.value=SalesOrderViewdata?.customer_billing_address?.contact_person_name; 
        if(o.key=="delivery_mobile_number") o.value=SalesOrderViewdata?.customer_billing_address?.contact_person_number; 
        if(o.key=="delivery_email") o.value=SalesOrderViewdata?.customer_billing_address?.email; 
        if(o.key=="delivery_address_line") o.value=SalesOrderViewdata?.customer_billing_address?.address_line_1; 
        if(o.key=="delivery_address_line2") o.value=SalesOrderViewdata?.customer_billing_address?.address_line_2; 
        if(o.key=="delivery_address_line3") o.value=SalesOrderViewdata?.customer_billing_address?.address_line_3; 
        if(o.key=="delivery_zip") o.value=SalesOrderViewdata?.customer_billing_address?.pin_code; 
        if(o.key=="delivery_district") o.value=SalesOrderViewdata?.customer_billing_address?.[0]?.district; 
        if(o.key=="delivery_state_id") o.value=SalesOrderViewdata?.customer_billing_address?.[0]?.state; 
        if(o.key=="delivery_country_id") o.value=SalesOrderViewdata?.customer_billing_address?.[0]?.country; 
        return o;})
        setSalesDeliveryDetails(newSalesDeliveryDetails);
          
        var newSalesBillingDetails = SalesBillingDetails
        .map(o=> {
          if(o.key=="billing_customer_name") o.value=SalesOrderViewdata?.customer_billing_address?.contact_person_name; 
          if(o.key=="billing_mobile_number") o.value=SalesOrderViewdata?.customer_billing_address?.contact_person_number;  
          if(o.key=="billing_email") o.value=SalesOrderViewdata?.customer_billing_address?.email; 
          if(o.key=="billing_address_line") o.value=SalesOrderViewdata?.customer_billing_address?.address_line_1; 
          if(o.key=="billing_address_line2")  o.value=SalesOrderViewdata?.customer_billing_address?.address_line_2; 
          if(o.key=="billing_address_line3")  o.value=SalesOrderViewdata?.customer_billing_address?.address_line_3; 
          if(o.key=="billing_zip") o.value=SalesOrderViewdata?.customer_billing_address?.pin_code; 
          if(o.key=="billing_district") o.value=SalesOrderViewdata?.customer_billing_address?.[0]?.district; 
          if(o.key=="billing_state_id") o.value=SalesOrderViewdata?.customer_billing_address?.[0]?.state; 
          if(o.key=="billing_country_id") o.value=SalesOrderViewdata?.customer_billing_address?.[0]?.country; 
          return o;})
          setSalesBillingDetails(newSalesBillingDetails);
  
        var newPaymentTermsFields = PaymentTermsFields
        .map(o=> {
          if(o.key=="PaymentTerms_Payment_Due_Date") o.value=moment(SalesOrderViewdata?.payment_due_date).format("YYYY-MM-DD"); 
          if(o.key=="PaymentTerms_PaymentTerms") o.value=SalesOrderViewdata?.payment_terms?{id:SalesOrderViewdata?.payment_terms.ID, label:SalesOrderViewdata?.payment_terms?.display_name }:null; 
          return o;})
        setPaymentTermsFields(newPaymentTermsFields);
        
        var nweselectedProductData=[];
        if(SalesOrderViewdata.sales_order_lines)
        nweselectedProductData=SalesOrderViewdata.sales_order_lines.map(o=>{return{
          id:o?.product_id,
          sku_id:{id:o?.product_id, label:o.product_details.parent_sku_id},
          product_template_id:o.product_template_id,
          product_name:o.product_details.product_name,
          warehouse_id: o?.warehouse_id,
          inventory_id:o?.inventory_id,
          serial_number: o?.serial_number,
            description:o?.description,
            uom: {name:{id:o.uom_id, label:o.uom.name}},
            selling_price: parseFloat(o.price),
            Quantity : parseInt(o.quantity),
            discount: parseFloat(o.discount),
            product_pricing_details:{tax_options:parseFloat(o.tax)},
            Payment_Terms: o?.payment_terms_id,
            Amount: o.total_amount,
        }});
        console.log('LINE_ITEM',nweselectedProductData)
        setSelectedProductData(nweselectedProductData);
  
        var newAdditionalInformationFields=AdditionalInformationFields;
          newAdditionalInformationFields.find(o=>o.key=="Additional_Information_Note").value=SalesOrderViewdata?.additional_information?.notes;
          newAdditionalInformationFields.find(o=>o.key=="Additional_Information_Terms_Conditions").value=SalesOrderViewdata?.additional_information?.terms_and_conditions;
          setAdditionalInformationFields(newAdditionalInformationFields)
          
          if(singleSalesInvoicedata)
          setPaymentDetailsFields({...paymentDetailsFields, subTotal:SalesOrderViewdata.sub_total, adjustment_amount:SalesOrderViewdata.adjustment_amount, tax:SalesOrderViewdata.tax, "shippingCharge":parseFloat(SalesOrderViewdata?.shipping_charge), "vender_credits":SalesOrderViewdata.vender_credits, total:SalesOrderViewdata.total_amount})
        
          newMainData=[ 
            ...newSalesInvoiceDetailsFields,
            ...newSalesDeliveryDetails,
             ...newSalesBillingDetails,
             ...newPaymentTermsFields, 
             ...nweselectedProductData,  
             ...newAdditionalInformationFields
          ];
          var keyValuePairMainData= {};
          setlinkSIData(keyValuePairMainData)
        
          newMainData.map(o=>{
            
            if(o.key == "expected_shipment_date" || o.key == "PaymentTerms_Payment_Due_Date"){
              var value1= new Date(o.value)
              keyValuePairMainData[o.key]= (value1).toISOString();
               }
               else if(o.key!=null){
                if(o.key == 'link_sales_order'){
                  var newlinkData = [{id: o.value?.id, sales_order_number:o.value?.label}]
            setlinkSIData(newlinkData)
                }
                  // keyValuePairMainData[o.key]=o.value && o.value.id ? o.value.id : o.value;
                  keyValuePairMainData[o.key]=o.value;
             
                
                 }
          
        });
        setMainData(keyValuePairMainData);
      }
    },[SalesOrderViewdata]);

    useEffect(()=>{    
      if(CreditViewdata && mainData && mainData.Link_Source_Document_Type && mainData.Link_Source_Document_Type.lookup_code == "CREDIT_NOTE")
      {
        var newMainData=[];
        var newSalesInvoiceDetailsFields = SalesInvoiceDetailsFields
        .map(o=> {       
          if(o.key=="invoice_currency") o.value={id:CreditViewdata?.currency?.id, label:CreditViewdata?.currency?.name}; 
          if(o.key=="reference_number") o.value=CreditViewdata?.reference_id; 
        
          return o;})
        setSalesInvoiceDetailsFields(newSalesInvoiceDetailsFields);

        var newSalesDeliveryDetails = SalesDeliveryDetails
      .map(o=> {
        if(o.key=="delivery_customer_name") o.value=CreditViewdata?.customer?.address_details?.[0]?.contact_person_name; 
        if(o.key=="delivery_mobile_number") o.value=CreditViewdata?.customer?.address_details?.[0]?.contact_person_number; 
        if(o.key=="delivery_email") o.value=CreditViewdata?.customer?.address_details?.[0]?.email; 
        if(o.key=="delivery_address_line") o.value=CreditViewdata?.customer?.address_details?.[0]?.address_line_1; 
        if(o.key=="delivery_address_line2") o.value=CreditViewdata?.customer?.address_details?.[0]?.address_line_2; 
        if(o.key=="delivery_address_line3") o.value=CreditViewdata?.customer?.address_details?.[0]?.address_line_3; 
        if(o.key=="delivery_zip") o.value=CreditViewdata?.customer?.address_details?.[0]?.pin_code; 
        if(o.key=="delivery_district") o.value=CreditViewdata?.customer?.address_details?.[0]?.city; 
        if(o.key=="delivery_state_id") o.value=CreditViewdata && CreditViewdata.customer && CreditViewdata.customer.address_details[0] && CreditViewdata.customer.address_details[0].state  
        ? { id:CreditViewdata?.customer?.address_details[0]?.state?.id , label: CreditViewdata?.customer?.address_details[0]?.state?.name} : ''; 
        if(o.key=="delivery_country_id") o.value=CreditViewdata && CreditViewdata.customer && CreditViewdata.customer.address_details[0] && CreditViewdata.customer.address_details[0].country  
        ? { id:CreditViewdata?.customer?.address_details[0]?.country?.id , label: CreditViewdata?.customer?.address_details[0]?.country?.name} : ''; 
         return o;})
        setSalesDeliveryDetails(newSalesDeliveryDetails);

        var newSalesBillingDetails = SalesBillingDetails
        .map(o=> {
          if(o.key=="billing_customer_name") o.value=CreditViewdata?.customer?.address_details?.[0]?.contact_person_name; 
          if(o.key=="billing_mobile_number") o.value=CreditViewdata?.customer?.address_details?.[0]?.contact_person_number; 
          if(o.key=="billing_email") o.value=CreditViewdata?.customer?.address_details?.[0]?.email; 
          if(o.key=="billing_address_line") o.value=CreditViewdata?.customer?.address_details?.[0]?.address_line_1; 
          if(o.key=="billing_address_line2") o.value=CreditViewdata?.customer?.address_details?.[0]?.address_line_2; 
          if(o.key=="billing_address_line3") o.value=CreditViewdata?.customer?.address_details?.[0]?.address_line_3; 
          if(o.key=="billing_zip") o.value=CreditViewdata?.customer?.address_details?.[0]?.pin_code; 
          if(o.key=="billing_district") o.value=CreditViewdata?.customer?.address_details?.[0]?.city; 
          if(o.key=="billing_state_id") o.value=CreditViewdata && CreditViewdata.customer && CreditViewdata.customer.address_details[0] && CreditViewdata.customer.address_details[0].state  
          ? { id:CreditViewdata?.customer?.address_details[0]?.state?.id , label: CreditViewdata?.customer?.address_details[0]?.state?.name} : ''; 
          if(o.key=="billing_country_id") o.value=CreditViewdata && CreditViewdata.customer && CreditViewdata.customer.address_details[0] && CreditViewdata.customer.address_details[0].country  
          ? { id:CreditViewdata?.customer?.address_details[0]?.country?.id , label: CreditViewdata?.customer?.address_details[0]?.country?.name} : ''; 
           return o;})
           setSalesBillingDetails(newSalesBillingDetails);
          
     
  
        var newPaymentTermsFields = PaymentTermsFields
        .map(o=> {
          if(o.key=="PaymentTerms_Payment_Due_Date") o.value=moment(CreditViewdata?.purchase_invoice?.payment_due_date).format("YYYY-MM-DD"); 
          if(o.key=="PaymentTerms_PaymentTerms") o.value=CreditViewdata?.payment_terms?{id:CreditViewdata?.purchase_invoice?.payment_terms.ID, label:CreditViewdata?.purchase_invoice?.payment_terms?.display_name }:null; 
          return o;})
        setPaymentTermsFields(newPaymentTermsFields);
        
        var nweselectedProductData=[];
        if(CreditViewdata.credit_note_line_items)
        nweselectedProductData=CreditViewdata.credit_note_line_items.map(o=>{return{
          id:o.id,
          sku_id:{id:o?.id, label:o.product_variant.sku_code},
          product_template_id:o.product_template_id,
          product_name:o.product_variant.product_name,
          warehouse_id: o?.warehouse_id,
          inventory_id:o?.inventory_id,
          serial_number: o?.product_variant?.serial_number,
            description:o?.product_variant?.description,
            uom: {name:{id:o.uom_id, label:o.uom.name}},
            selling_price: parseFloat(o.price),
            Quantity : parseInt(o?.quantity),
            discount: parseFloat(o?.discount),
            product_pricing_details:{tax_options:parseFloat(o?.tax)},
            Payment_Terms: o?.payment_terms_id,
            Amount: o?.amount,
        }});
        setSelectedProductData(nweselectedProductData);
  
        var newAdditionalInformationFields=AdditionalInformationFields;
          newAdditionalInformationFields.find(o=>o.key=="Additional_Information_Note").value=CreditViewdata?.customer?.additional_information?.notes;
          newAdditionalInformationFields.find(o=>o.key=="Additional_Information_Terms_Conditions").value=CreditViewdata?.customer?.additional_information?.terms_and_conditions;
          setAdditionalInformationFields(newAdditionalInformationFields)
          
          if(singleSalesInvoicedata)
          setPaymentDetailsFields({...paymentDetailsFields, subTotal:CreditViewdata.sub_total, adjustment_amount:CreditViewdata.adjustment_amount, tax:CreditViewdata.tax, "shippingCharge":parseFloat(CreditViewdata?.shipping_charge), "vender_credits":CreditViewdata.vender_credits, total:CreditViewdata.total_amount})
        

          newMainData=[ 
            ...newSalesInvoiceDetailsFields,
            ...newSalesDeliveryDetails,
             ...newSalesBillingDetails,
             ...newPaymentTermsFields, 
             ...nweselectedProductData,  
             ...newAdditionalInformationFields
          ];
          var keyValuePairMainData= {};
          setlinkSIData(keyValuePairMainData)
         
          newMainData.map(o=>{
            
            if( o.key == "PaymentTerms_Payment_Due_Date"){
              var value1= new Date(o.value)
              keyValuePairMainData[o.key]= (value1).toISOString();
               }
               else if(o.key!=null){
                if(o.key == 'link_sales_order'){
                  var newlinkData = [{id: o.value?.id, sales_order_number:o.value?.label}]
            setlinkSIData(newlinkData)
                }
                  keyValuePairMainData[o.key]=o.value;
             
                
                 }
          
        });
        setMainData(keyValuePairMainData);
      }
    },[CreditViewdata])

    useEffect(()=>{    
    
      if(DebitViewdata && mainData && mainData.Link_Source_Document_Type && mainData.Link_Source_Document_Type.lookup_code == "DEBIT_NOTE")
      {
        console.log('EYTDHVFRY',DebitViewdata)
        var newMainData=[];
        var newSalesInvoiceDetailsFields = SalesInvoiceDetailsFields
        .map(o=> {       
          if(o.key=="invoice_currency") o.value={id:DebitViewdata?.currency?.id, label:DebitViewdata?.currency?.name}; 
          if(o.key=="reference_number") o.value=DebitViewdata?.reference_id; 
        
          return o;})
        setSalesInvoiceDetailsFields(newSalesInvoiceDetailsFields);

        var newSalesDeliveryDetails = SalesDeliveryDetails
      .map(o=> {
        if(o.key=="delivery_customer_name") o.value=DebitViewdata?.delivery_address?.address_details?.[0]?.contact_person_name; 
        if(o.key=="delivery_mobile_number") o.value=DebitViewdata?.delivery_address?.address_details?.[0]?.contact_person_number; 
        if(o.key=="delivery_email") o.value=DebitViewdata?.delivery_address?.address_details?.[0]?.email; 
        if(o.key=="delivery_address_line") o.value=DebitViewdata?.delivery_address?.address_details?.[0]?.address_line_1; 
        if(o.key=="delivery_address_line2") o.value=DebitViewdata?.delivery_address?.address_details?.[0]?.address_line_2; 
        if(o.key=="delivery_address_line3") o.value=DebitViewdata?.delivery_address?.address_details?.[0]?.address_line_3; 
        if(o.key=="delivery_zip") o.value=DebitViewdata?.delivery_address?.address_details?.[0]?.pin_code; 
        if(o.key=="delivery_district") o.value=DebitViewdata?.delivery_address?.address_details?.[0]?.city; 
        if(o.key=="delivery_state_id") o.value=DebitViewdata && DebitViewdata.delivery_address && DebitViewdata.delivery_address.address_details && DebitViewdata.delivery_address.address_details[0] && DebitViewdata.delivery_address.address_details[0].state  
        ? { id:DebitViewdata?.delivery_address?.address_details[0]?.state?.id , label: DebitViewdata?.delivery_address?.address_details && DebitViewdata.delivery_address?.address_details[0]?.state?.name} : ''; 
        if(o.key=="delivery_country_id") o.value=DebitViewdata && DebitViewdata.delivery_address && DebitViewdata.delivery_address.address_details && DebitViewdata.delivery_address?.address_details[0] && DebitViewdata.delivery_address.address_details[0].country  
        ? { id:DebitViewdata?.delivery_address?.address_details[0]?.country?.id , label: DebitViewdata?.delivery_address?.address_details[0]?.country?.name} : ''; 
         return o;})
        setSalesDeliveryDetails(newSalesDeliveryDetails);

        var newSalesBillingDetails = SalesBillingDetails
        .map(o=> {
 
          if(o.key=="billing_customer_name") o.value=DebitViewdata?.billing_address?.address_details?.[0]?.contact_person_name; 
          if(o.key=="billing_mobile_number") o.value=DebitViewdata?.billing_address?.address_details?.[0]?.contact_person_number; 
          if(o.key=="billing_email") o.value=DebitViewdata?.billing_address?.address_details?.[0]?.email; 
          if(o.key=="billing_address_line") o.value=DebitViewdata?.billing_address?.address_details?.[0]?.address_line_1; 
          if(o.key=="billing_address_line2") o.value=DebitViewdata?.billing_address?.address_details?.[0]?.address_line_2; 
          if(o.key=="billing_address_line3") o.value=DebitViewdata?.billing_address?.address_details?.[0]?.address_line_3; 
          if(o.key=="billing_zip") o.value=DebitViewdata?.billing_address?.address_details?.[0]?.pin_code; 
          if(o.key=="billing_district") o.value=DebitViewdata?.billing_address?.address_details?.[0]?.city; 
            if(o.key=="billing_state_id") o.value=DebitViewdata && DebitViewdata.billing_address && DebitViewdata.billing_address.address_details && DebitViewdata.billing_address.address_details[0] && DebitViewdata.billing_address.address_details[0].state  
            ? { id:DebitViewdata?.billing_address?.address_details[0]?.state?.id , label: DebitViewdata?.billing_address?.address_details && DebitViewdata.billing_address?.address_details[0]?.state?.name} : ''; 
            if(o.key=="billing_country_id") o.value=DebitViewdata && DebitViewdata.billing_address && DebitViewdata.billing_address.address_details && DebitViewdata.billing_address?.address_details[0] && DebitViewdata.billing_address.address_details[0].country  
            ? { id:DebitViewdata?.billing_address?.address_details[0]?.country?.id , label: DebitViewdata?.billing_address?.address_details[0]?.country?.name} : ''; 
             return o;})
           setSalesBillingDetails(newSalesBillingDetails);
          
     
  
        var newPaymentTermsFields = PaymentTermsFields
        .map(o=> {
          if(o.key=="PaymentTerms_Payment_Due_Date") o.value=moment(DebitViewdata?.purchase_invoice?.payment_due_date).format("YYYY-MM-DD"); 
          if(o.key=="PaymentTerms_PaymentTerms") o.value=DebitViewdata?.payment_terms?{id:DebitViewdata?.purchase_invoice?.payment_terms.ID, label:DebitViewdata?.purchase_invoice?.payment_terms?.display_name }:null; 
          return o;})
        setPaymentTermsFields(newPaymentTermsFields);
        
        if(singleSalesInvoicedata)
          setPaymentDetailsFields({...paymentDetailsFields, subTotal:DebitViewdata.sub_total, adjustment_amount:DebitViewdata.adjustment_amount, tax:DebitViewdata.tax, "shippingCharge":parseFloat(DebitViewdata?.shipping_charge), "vender_credits":DebitViewdata.vender_credits, total:DebitViewdata.total_amount})
        
          var nweselectedProductData=[];
        if(DebitViewdata.debit_note_line_items)
        nweselectedProductData=DebitViewdata.debit_note_line_items.map(o=>{return{
          id:o.id,
          sku_id:{id:o?.id, label:o.product_variant.sku_code},
          product_template_id:o.product_template_id,
          product_name:o.product_variant.product_name,
          warehouse_id: o?.warehouse_id,
          inventory_id:o?.inventory_id,
          serial_number: o?.product_variant?.serial_number,
            description:o?.product_variant?.description,
            uom: {name:{id:o.uom_id, label:o.uom.name}},
            selling_price: parseFloat(o.price),
            Quantity : parseInt(o?.quantity),
            discount: parseFloat(o?.discount),
            product_pricing_details:{tax_options:parseFloat(o?.tax)},
            Payment_Terms: o?.payment_terms_id,
            Amount: o?.amount,
        }});
        setSelectedProductData(nweselectedProductData);
  
        var newAdditionalInformationFields=AdditionalInformationFields;
          newAdditionalInformationFields.find(o=>o.key=="Additional_Information_Note").value=DebitViewdata?.internal_notes;
          newAdditionalInformationFields.find(o=>o.key=="Additional_Information_Terms_Conditions").value=DebitViewdata?.terms_and_conditions;
          setAdditionalInformationFields(newAdditionalInformationFields)
          
          newMainData=[ 
            ...newSalesInvoiceDetailsFields,
            ...newSalesDeliveryDetails,
             ...newSalesBillingDetails,
             ...newPaymentTermsFields, 
             ...nweselectedProductData,  
             ...newAdditionalInformationFields
          ];
          var keyValuePairMainData= {};
          setlinkSIData(keyValuePairMainData)
         
          newMainData.map(o=>{
            
            if( o.key == "PaymentTerms_Payment_Due_Date"){
              var value1= new Date(o.value)
              keyValuePairMainData[o.key]= (value1).toISOString();
               }
               else if(o.key!=null){
                if(o.key == 'link_sales_order'){
                  var newlinkData = [{id: o.value?.id, sales_order_number:o.value?.label}]
            setlinkSIData(newlinkData)
                }
                  keyValuePairMainData[o.key]=o.value;
             
                
                 }
          
        });
        setMainData(keyValuePairMainData);
      }
    },[DebitViewdata])


  const [SalesInvoiceDetailsFields, setSalesInvoiceDetailsFields] = useState([
    {
      label: "Invoice ID",
      type: "input", 
      key: "invoice_id", 
    },
    {
      label: "Auto Generate Invoice Number",
      type: "checkbox", 
      key: "auto_generate_invoice_number",
      isChecked:false, 
    },
    {
      label: "Reference ID",
      type: "input", 
      key: "reference_number", 
    },
    {
        label: "Auto Generate Refernce ID",
        type: "checkbox", 
        key: "auto_generate_reference_number",
        isChecked:false, 
      },
    {
      label: "Invoice Date",
      type: "date", 
      key: "invoice_date", 
    },
    {
      label: "Expected Shipment Date",
      type: "date", 
      key: "expected_shipment_date", 
    },
    {
        label: "Invoice Currency",
        type: "select", 
        key: "invoice_currency", 
      },
      {
        label: "Link Sales Order",
        type: "select", 
        key: "link_sales_order", 
      },
      {
        label: "Source Document Type",
        type: "select",
        key: "Link_Source_Document_Type",
     
      },
      {
        label: "Select Source Document",
        type: "select",
        key: "Link_Source_Document",
    
      },
  ]);
  const [SalesDeliveryDetails, setSalesDeliveryDetails] = useState([
    {
      label: "Customer Name",
      type: "input", 
      key: "delivery_customer_name", 
    },
    {
      label: "Mobile Number",
      type: "input", 
      key: "delivery_mobile_number", 
    },
    {
      label: "Email",
      type: "input", 
      key: "delivery_email", 
    },
    {
      label: "Address Line 1",
      type: "input", 
      key: "delivery_address_line", 
    },
    {
      label: "Address Line 2",
      type: "input", 
      key: "delivery_address_line2", 
    },
    {
      label: "Address Line 3",
      type: "input", 
      key: "delivery_address_line3",  
    },
    {
      label: "Zipcode",
      type: "input", 
      key: "delivery_zip", 
    },
    {
      label: "City/District",
      type: "input", 
      key: "delivery_district", 
    }, 
    {
      label: "State",
      type: "select", 
      key: "delivery_state_id",  
    },
    {
      label: "Country",
      type: "select", 
      key: "delivery_country_id",  
    },
  ]);
  const [SalesBillingDetails, setSalesBillingDetails] = useState([
    {
      label: "Customer Name",
      type: "input", 
      key: "billing_customer_name", 
    },
    {
      label: "Mobile Number",
      type: "input", 
      key: "billing_mobile_number", 
    },
    {
      label: "Email",
      type: "input", 
      key: "billing_email", 
    },
    {
      label: "Address Line 1",
      type: "input", 
      key: "billing_address_line", 
    },
    {
      label: "Address Line 2",
      type: "input", 
      key: "billing_address_line2", 
    },
    {
      label: "Address Line 3",
      type: "input", 
      key: "billing_address_line3",  
    },
    {
      label: "Zipcode",
      type: "input", 
      key: "billing_zip", 
    },
    {
      label: "City/District",
      type: "input", 
      key: "billing_district", 
    }, 
    {
      label: "State",
      type: "select", 
      key: "billing_state_id",  
    },
    {
      label: "Country",
      type: "select", 
      key: "billing_country_id",  
    },
    {
      label: "Available Customer Credit",
      type: "label_price", 
      key: "available_customer_credits", 
      value:"0"
    }, 
  ]);
  const [PaymentTermsFields, setPaymentTermsFields] = useState([
    {
      label: "Payment Due Date",
      type: "date", 
      key: "PaymentTerms_Payment_Due_Date", 
    },     
    {
      label: "Payment Terms",
      type: "select", 
      key: "PaymentTerms_PaymentTerms", 
      data:[],
      defaultVal: {},
    },
  ]);
  const headCells = [
    {
      key: "sku_id", 
      label: "Product SKU",
      type: "select",
      data:productData.map(o=>{return{id:o.id, label:o.parent_sku_id}})
    },
    {
      key: "product_name",  
      label: "Product Name",
      type: "text"
    }, 
    {
      key: "warehouse_id",  
      label: "Warehouse",
      type: "text"
    }, 
    {
      key: "inventory_id",  
      label: "Inventory ID",
      type: "text"
    },  
    {
      key: "serial_number",
      label: "Serial Number Return",
      type: "text"
    }, 
    {
      key: "description.data",  
      label: "Description",
      type: "text"
    },  
    {
        key: "uom.name", 
        label: "Unit Of Measurement",
        type: "select",
        data:uomData.map(o=>{return{id:o.id, label:o.name}})
      }, 
      {
        key: "selling_price", 
        label: "Price",
        type: "number"
      },
      {
        key: "Quantity",
        label: "Quantity",
        type: "number"
      },   
      {
        key: "discount", 
        label: "Discount",
        type: "text"
      },   
      {
        key: "product_pricing_details.tax_options", 
        label: "Tax",
        type: "number"
      }, 
    {
        key: "Payment_Terms", 
        label: "Payment Terms",
        type: "text"
      }, 
    {
      key: "Amount", 
      label: "Amount",
      type: "label"
    },
    {
      key: "Action", 
      label: "Action",
      type: "view",
      renderView: (item) => (
        <div>
          <DeleteIcon onClick={()=> setSelectedProductData(selectedProductData.filter(o=>o.id!=item.id))}/>
        </div>
      )
    } 
  ]; 
  const [AdditionalInformationFields, setAdditionalInformationFields] = useState([
    {
      label: "Note",
      type: "textarea", 
      key: "Additional_Information_Note", 
      row:2
    },     
    {
      label: "Terms and Conditions",
      type: "textarea", 
      key: "Additional_Information_Terms_Conditions", 
      row:2 
    },
  ]);
  const [paymentDetailsFields, setPaymentDetailsFields] = useState({subTotal:0, tax:0, shippingCharge:0, adjustment_text:"", Final_Adjustment:"", adjustment_amount:0, vender_credits:0, total:0});

  const[CheckboxShowForCopyField_value, setCheckboxShowForCopyField_value]=useState(false);

  const setDataByKeyAndValue = (key, value, index=null) => {
    
    // console.log("key", key, "value", value);
     
    if(index!=null){
      try{
      var newSelectedProductData=selectedProductData;
      
      if(key==='sku_id'){
        console.log("sku_id")
        var selectVarient=productData.find(o=>o.id==value.id);
        newSelectedProductData[index]=selectVarient;
        newSelectedProductData[index][key]=value.label;
      }
      else if(key==='uom.name'){
        console.log("uom.name")
        var selectVarient=uomData.find(o=>o.id==value.id);
        newSelectedProductData[index].uom={name:value.label, id:value.id};
      }
      else{
        if(key == 'description.data'){
          newSelectedProductData[index][key.split(".")[0]]=value; 
        }
        else{
          if(key.toString().includes('.')) newSelectedProductData[index][key.split(".")[0]][key.split(".")[1]]=value; 
          else newSelectedProductData[index][key]=value;
        }
      }
      var Quantity=0;
      var selling_price=0;
      var discount=0;
      if(newSelectedProductData[index].Quantity) Quantity=parseInt(newSelectedProductData[index].Quantity);
      if(newSelectedProductData[index].selling_price)selling_price=parseFloat(newSelectedProductData[index].selling_price);
      if(newSelectedProductData[index].discount)discount=parseFloat(newSelectedProductData[index].discount);
      var grossTotal = (Quantity*selling_price)-discount;
      var tax=0;
      if(newSelectedProductData[index].product_pricing_details && newSelectedProductData[index].product_pricing_details.tax_options && parseFloat(newSelectedProductData[index].product_pricing_details.tax_options)>0){
        var taxRate=parseFloat(newSelectedProductData[index].product_pricing_details.tax_options);
        tax=(grossTotal*taxRate)/100
      }
      else tax = 0;
  
      var amount=grossTotal+tax;
      newSelectedProductData[index].Amount=amount;
      setSelectedProductData(newSelectedProductData);
      }
      catch(e){console.error("err1", e)}
    }
    
    
    try{
    var newSSalesInvoiceDetailsFields = SalesInvoiceDetailsFields
    .map(o=> {
      if(o.key==key) o.value=value; 
      return o;})
    setSalesInvoiceDetailsFields(newSSalesInvoiceDetailsFields);
  }
  catch(e){console.error("err2", e)}

  try{
    var newSalesDeliveryDetails = SalesDeliveryDetails
    .map(o=> {
      if(o.key==key) o.value=value; 
      return o;})
      setSalesDeliveryDetails(SalesDeliveryDetails);
  }
  catch(e){console.error("err3", e)}

  try{
    var newSalesBillingDetails = SalesBillingDetails
    .map(o=> {
      if(o.key==key) o.value=value; 
      return o;})
    setSalesBillingDetails(newSalesBillingDetails);
  }
  catch(e){console.error("err4", e)}


  try{
    var newPaymentTermsFields = PaymentTermsFields
    .map(o=> {
      if(o.key==key) o.value=value; 
      return o;})
    setPaymentTermsFields(newPaymentTermsFields);
  }
  catch(e){console.error("err5", e)} 
    
     try{
    var newAdditionalInformationFields = AdditionalInformationFields
    .map(o=> {
      if(o.key==key) o.value=value; 
      return o;})
    setAdditionalInformationFields(newAdditionalInformationFields) 
  }
  catch(e){console.error("err1", e)} 

  try{
    if(key=="Final_Enter_Amount"){
      var nvalue=0;
      if(value) nvalue=parseFloat(value)

      var newpaymentDetailsFields=paymentDetailsFields;
      newpaymentDetailsFields.adjustment_amount=nvalue;
      setPaymentDetailsFields(newpaymentDetailsFields);
    
   }
  }
  catch(e){console.error("err1", e)}
 }

  const handelInputChange = (key, value, index=null) => {
    // console.log("key", key, "value", value, "index", index);
    setDataByKeyAndValue(key, value, index);
  
    if(index==null){
      var newMainData=mainData;
            if(key == "invoice_date" || key == "expected_shipment_date" || key == "PaymentTerms_Payment_Due_Date"){
                var value1= new Date(value)
                newMainData[key]= (value1).toISOString();
                 }
                 else{
                    var newMainData=mainData;
                    newMainData[key]=value;
                 }
           setMainData(newMainData);
  }
  
    calulate_total();
   };

   function calulate_total()
   {
     if(selectedProductData && mainData){
     var tax=0;
     if(selectedProductData)tax=selectedProductData[0].product_pricing_details?.tax_options;
     var val1=selectedProductData.map(o=>o.Amount).reduce((previousValue, currentValue)=> {return previousValue+currentValue}); 
     var val2=0
     var subTotal=val1+val2; 
     var newtotal=0;
    
     if(paymentDetailsFields.Final_Adjustment=="+"){
       newtotal=paymentDetailsFields.adjustment_amount+subTotal;
     }
     else{
       newtotal=paymentDetailsFields.adjustment_amount-subTotal;
     }
     
       setPaymentDetailsFields({...paymentDetailsFields, shippingCharge:val2, subTotal:subTotal.toFixed(2), tax:tax, total:newtotal.toFixed(2)});
     }
   }

  const handelSelectonChange = (key, value) => {  
    if(key == "billing_country_id" || key == "delivery_country_id")
    {
      setCountry(value.id);
      dispatch(loadStateDataById(value.id));
    }

    if (key == "Link_Source_Document_Type") {
      if (value.lookup_code == "DEBIT_NOTE") {
        dispatch(loadDebitNoteOrderData({ limit: 100, offset: 1, filters: null, sort: null }));
      }
      if (value.lookup_code == "CREDIT_NOTE") {
        dispatch(loadCreditNoteOrderData({ limit: 100, offset: 1, filters: null, sort: null }));
      }
      if (value.lookup_code == "SALES_ORDERS") {
        dispatch(loadSalesOrdersDataList({ limit: 100, offset: 1, filters: null, sort: null }));
      }
    }

    if (key == "Link_Source_Document") {
      if (mainData.Link_Source_Document_Type.lookup_code == "DEBIT_NOTE") {
        dispatch(loadDebitNoteOrderDataById(value.id));
      }
      if (mainData.Link_Source_Document_Type.lookup_code == "CREDIT_NOTE") {
        dispatch(loadCreditNoteOrderDataById(value.id));
      }
      if (mainData.Link_Source_Document_Type.lookup_code == "SALES_ORDERS") {
        dispatch(loadSalesOrderDataById(value.id));
      }
    }
    switch(key){
      case"billing_country_id":
      case"billing_state_id":{
        setSalesBillingDetails(SalesBillingDetails.map(o=>{if(o.key==key) return{...o, value:value}; return o}));
        break;
      }
      case"delivery_country_id":
      case"delivery_state_id":{
        setSalesDeliveryDetails(SalesDeliveryDetails.map(o=>{if(o.key==key) return{...o, value:value}; return o}));
        break;
      }
      case"invoice_currency":{
        setSalesInvoiceDetailsFields(SalesInvoiceDetailsFields.map(o=>{if (o.key==key) return{...o, value:value}; return o}));
        
        break;
      }
      case"Link_Source_Document":{
        setSalesInvoiceDetailsFields(SalesInvoiceDetailsFields.map(o => {if (o.key == key) return {...o, value: value }; return o }));
        break;
      }
      case"Link_Source_Document_Type":{
        setSalesInvoiceDetailsFields(SalesInvoiceDetailsFields.map(o => {if(o.key == key) return {...o, value: value }; return o }));
        break;
      }
      case"link_sales_order":{
        setSalesInvoiceDetailsFields(SalesInvoiceDetailsFields.map(o=>{if(o.key==key) return{...o, value:value}; return o}));
        var newlinkData = [{id: value.id, sales_order_number:value.label}]
        setlinkSIData(newlinkData)
        break;
      }
      case"PaymentTerms_PaymentTerms":{
        setPaymentTermsFields(PaymentTermsFields.map(o=>{if(o.key==key) return{...o, value:value}; return o}));
        break;
      }
    }

    var newMainData=mainData;
    
    newMainData[key] = ( key == "delivery_country_id" || key == "delivery_state_id" || key == "billing_country_id" || key == "billing_state_id") ? value.label : value;
    setMainData(newMainData);
    
    }
    const handelCheckBoxonChange = (field) => { 
  
      if(field.key == "auto_generate_invoice_number")
      {
        var neworder=SalesInvoiceDetailsFields.map(o=>{if(o.key=='invoice_id') o.disabled=!field.isChecked; return o;})
        setSalesInvoiceDetailsFields(neworder)
      }
  
      if(field.key == "auto_generate_reference_number")
      {
        var neworder=SalesInvoiceDetailsFields.map(o=>{if(o.key=='reference_number') o.disabled=!field.isChecked; return o;})
        setSalesInvoiceDetailsFields(neworder)
      }
      
      var newState = SalesInvoiceDetailsFields.map(o=>{if(o.key==field.key) {o.isChecked=!o.isChecked;} return o})
      setSalesInvoiceDetailsFields(newState)
     
    };
  const setRadioType = (prop, value) => {  };
  const handelCheckboxShowForCopyField_valueChange =(field) =>{ 
    setCheckboxShowForCopyField_value(!CheckboxShowForCopyField_value);
  }


  const handleButtonClick = (key) =>{ 
console.log('mainData',mainData)
console.log('selectedProductData',selectedProductData)
    if(key=="Cancel"){
      navigate.push("/salesInvoice"); 
      return;
    }   
var body ={
  
  "auto_generate_invoice_number": true,
  "auto_generate_reference_number": true,
  "expected_shipment_date": mainData.expected_shipment_date,
  "currency_id": mainData.invoice_currency && mainData.invoice_currency.id ? mainData.invoice_currency.id : mainData.invoice_currency,
  "sales_order_ids": [mainData.link_sales_order?.id],
  "link_sales_orders" :linkSIData,
  "customer_id": 1,
  "channel_id": 1,
  "payment_type_id": 37,
  "is_invoiced": true,
  "is_payment_received": true,
  "balance_due_amount": 112.02,
  "payment_terms_id": mainData.PaymentTerms_PaymentTerms && mainData.PaymentTerms_PaymentTerms.id ? mainData.PaymentTerms_PaymentTerms.id : mainData.PaymentTerms_PaymentTerms,
  "available_customer_credits": 321.12,
  "payment_due_date": mainData.PaymentTerms_Payment_Due_Date,
  "source_document_type_id":mainData?.Link_Source_Document_Type?.id,
  "source_documents":mainData?.Link_Source_Document?.data,

  "sales_invoice_lines":selectedProductData.map(o=>{return{
    "product_id": o?.id,
    "sku_id":o?.sku_id && o.sku_id.id ? o.sku_id.id : o.sku_id,
    "product_name":o?.product_name,
    "product_variant_id": o.product_template_id ? o.product_template_id : 1,
    "description": o.description &&  o.description.data ? o.description.data : o.description,
    "warehouse_id": o?.warehouse_id ? Number(o?.warehouse_id) : 1,
  "inventory_id": o?.inventory_id ? Number(o?.inventory_id) : 1,
  "uom_id": o.uom && o.uom.name && o.uom.name.id ?o.uom.name.id : o.uom.id,
  "discount": o.discount ? parseFloat(o.discount): 0.00,
  "discount_type_id": 332,
  "tax": o.product_pricing_details.tax_options ? parseFloat(o.product_pricing_details.tax_options) : 1.00,
  "quantity": o.Quantity ? (parseInt(o.Quantity)) : 0,
  "price": parseFloat(o.selling_price ? o.selling_price : 0),
  "tax_type_id": 334,
  "amount": parseFloat(o.Amount),
  "payment_terms_id": o.payment_terms_id ?  o.payment_terms_id : 47,
    "total_amount": o.total_amount ? parseFloat(total_amount) : 213.21,
        }}), 

        "internal_notes": mainData.Additional_Information_Note,
        "external_notes": mainData.Additional_Information_Note,
        "terms_and_conditions": mainData.Additional_Information_Terms_Conditions,
        "attachment_files": [{}],
        "use_credits_for_payment": true,
        "shipping_amount": 322.22,
        "tax_amount": mainData.tax_amount ? parseFloat(mainData.tax_amount) : 1.1,
        "sub_total_amount": parseFloat(paymentDetailsFields.subTotal),
        "shipping_amount": parseFloat(paymentDetailsFields.shippingCharge ? aymentDetailsFields.shippingCharge : 10),
        // "tax_amount": parseFloat(paymentDetailsFields.tax),
        
        "adjustments": 10.1,
        "adjustment_amount": paymentDetailsFields.adjustment_amount ? paymentDetailsFields?.adjustment_amount : 1,
        "customer_credits_amount": 320.1,
        "total_amount": mainData.total ? parseFloat(mainData.total) : 123.21,
        "billing_address": [{
          "Address": mainData.billing_address_line,
          "address_line_2": mainData.billing_address_line2,
          "address_line_3": mainData.billing_address_line3,
          "phone": mainData.billing_mobile_number,
          "state": mainData.billing_state_id,
          "country": mainData.billing_country_id,
          "zipcode": mainData.billing_zip,
          "customer_name" : mainData.billing_customer_name,
            "district": mainData.billing_district,
            "mobile_number": mainData.billing_mobile_number,
            "email" : mainData.billing_email
      }],
      "delivery_address": [{
        "Address": mainData.delivery_address_line,
        "address_line_2": mainData.delivery_address_line2,
        "address_line_3": mainData.delivery_address_line3,
        "phone": mainData.delivery_mobile_number,
        "state": mainData.delivery_state_id,
        "country": mainData.delivery_country_id,
        "zipcode": mainData.delivery_zip,
        "district": mainData.delivery_district,
        "customer_name" : mainData.delivery_customer_name,
        "mobile_number": mainData.delivery_mobile_number,
        "email" : mainData.delivery_email
      }],
      "shipping_address": [{
    
        "Address": mainData.billing_address_line,
        "address_line_2": mainData.billing_address_line2,
            "address_line_3": mainData.billing_address_line3,
            "phone": mainData.billing_mobile_number,
            "state": mainData.billing_state_id,
            "country": mainData.billing_country_id,
            "zipcode": mainData.billing_zip,
            "customer_name" : mainData.billing_customer_name,
            "district": mainData.billing_district,
            "mobile_number": mainData.billing_mobile_number,
            "email" : mainData.billing_email
    }]
  
}
if(props && props.id){
  dispatch(Update_Sales_Invoice_Data(props.id, body, function(resp){ 
    console.log('update',resp)
    toast(resp)
  }));
}
else{
  dispatch(Save_Sales_Invoice_Data(body, function(resp){ 
    console.log('create',resp)
    toast(resp);
    
  }));
}

      }
    return (
        <>
 <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                    
                  <AddForm header={"Sales Invoice Details"} data={SalesInvoiceDetailsFields.map(field=> {
                     switch (field.key) {
                        case 'invoice_currency':{
                          field.data= Currencydata.map(o=> {return {id: o.id, label:o.name}});break;  }
                        case 'link_sales_order':{
                          field.data= salesOderData.map(o=> {return {id: o.id, label:o.sales_order_number}});break;}         
                        case 'Link_Source_Document_Type': {
                          field.data = SISourceDocumentTypesData.map(o => { return { id: o.id, label: o.display_name, lookup_code: o.lookup_code } }); break;
                        }
                        case 'Link_Source_Document': {
                          field.data =
                            ((mainData && mainData.Link_Source_Document_Type && mainData.Link_Source_Document_Type.lookup_code == "DEBIT_NOTE") ?
                            DebitNotedata.map(o => {return { id: o.id, label: o.debit_note_id , data: o} })
                            : (mainData && mainData.Link_Source_Document_Type && mainData.Link_Source_Document_Type.lookup_code == "CREDIT_NOTE") ?
                            CreditNotedata.map(o => {return { id: o.id, label: o.credit_note_id ,data: o} })
                             : (mainData && mainData.Link_Source_Document_Type && mainData.Link_Source_Document_Type.lookup_code == "SALES_ORDERS") ?
                             SalesOrderLIstdata.map(o => {return { id: o.id, label: o.sales_order_number ,data: o} })
                              : null
                            ); break;
                        }
                      }
        return field;
       })} handelInputChange={handelInputChange} handelSelectonChange ={handelSelectonChange} handelCheckBoxonChange ={handelCheckBoxonChange} setRadioType={setRadioType}   />
    </RemoteWrapper>
            </Suspense>

            <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
  <AddForm header={"Customer Delivery Address"} data={SalesDeliveryDetails
       .map(field=> {
        switch (field.key) {
          case 'delivery_country_id':{
            field.data= Countrydata.map(o=> {return {id: o.id, label:o.name}}); break;}
          case 'delivery_state_id':{
            field.data= Statedata.map(o=> {return {id: o.id, label:o.name}}); break;}
           }
        return field;
       })
       } handelInputChange={handelInputChange} handelSelectonChange ={handelSelectonChange} handelCheckBoxonChange ={handelCheckBoxonChange} setRadioType={setRadioType}   />
 </RemoteWrapper>
            </Suspense>

            <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
  <AddForm header={"Customer Billing Address"} data={SalesBillingDetails
       .map(field=> {
        switch (field.key) {
          case 'billing_country_id':{
            field.data= Countrydata.map(o=> {return {id: o.id, label:o.name}});break;}
            case 'billing_state_id':{
              field.data= Statedata.map(o=> {return {id: o.id, label:o.name}})  ;break;}      
          }
        return field;
       })
       } handelInputChange={handelInputChange} handelSelectonChange ={handelSelectonChange} handelCheckBoxonChange ={handelCheckBoxonChange} setRadioType={setRadioType}  Islabel_priceSpace={true} />
 </RemoteWrapper>
            </Suspense>
            <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
            <AddForm header={"Payment Terms"} data={PaymentTermsFields
         .map(field=> {
          switch (field.key) {
            case 'PaymentTerms_PaymentTerms':{
              field.data= Lookupdata.map(o=> {return {id: o.id, label:o.display_name}}); break;} 
             }
          return field;
         })
        } handelInputChange={handelInputChange} handelSelectonChange ={handelSelectonChange} handelCheckBoxonChange ={handelCheckBoxonChange} setRadioType={setRadioType} IsCheckboxShowForCopyField={true} CheckboxShowForCopyField_text={"set common payment term for the entire order"}  CheckboxShowForCopyField_value={false} handelCheckboxShowForCopyField_valueChange ={handelCheckboxShowForCopyField_valueChange}  />
   </RemoteWrapper>
            </Suspense>
            <Suspense fallback={<div>Loading... </div>}>
            <RemoteWrapper>
            <AddForm_Table headCells={headCells} table_data={selectedProductData} handelInputChange={handelInputChange} header={"Add Products"} renderFooter={()=>(<center style={{marginTop:10}}><Link onClick={onAddNewRaw} underline="none">+ Add Product Line</Link></center>)}/>
  
  </RemoteWrapper>
            </Suspense> 
            <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
            <AddForm header={"Additional Information"} data={AdditionalInformationFields 
        } handelInputChange={handelInputChange} handelSelectonChange ={handelSelectonChange} handelCheckBoxonChange ={handelCheckBoxonChange} setRadioType={setRadioType} IsCheckboxShowForCopyField={false} handelCheckboxShowForCopyField_valueChange ={handelCheckboxShowForCopyField_valueChange}  />
    </RemoteWrapper>
            </Suspense>
            <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                <AddFormFooter header={"Payment Details"} subtotal={paymentDetailsFields.subTotal} tax={paymentDetailsFields.tax} shippingcharges={paymentDetailsFields.shippingCharge} Final_Adjustment={paymentDetailsFields.Final_Adjustment} Final_Enter_Amount={paymentDetailsFields.adjustment_amount} handelSelectonChange={handelSelectonChange} handelInputChange={handelInputChange} vender_credits={paymentDetailsFields.vender_credits} total={paymentDetailsFields.total}/>
             </RemoteWrapper>
            </Suspense>
    <AddFormFooter_Button handleButtonClick={handleButtonClick}/>
    <ToastContainer />
</>
    )
}
export default SalesInvoiceAdd;




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
