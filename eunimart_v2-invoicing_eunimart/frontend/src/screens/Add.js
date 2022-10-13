import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";  
import { useHistory } from "react-router-dom";
import { Link } from "@mui/material";
import { loadCurrencyData, loadCountryData, loadStateDataById, loadPaymentTermsData,    
     loadProductVariantData, loadUOMData, loadVendorsData, Save_Purchase_Invoice, loadPurchaseInvoiceDataById, Update_Purchase_Invoice_Orders,
     loadSOURCE_DOCUMENTData, loadPurchaseOrderData, loadPurchaseOrderDataById, loadCreditNoteOrderData, loadCreditNoteOrderDataById,
     loadDebitNoteOrderData, loadDebitNoteOrderDataById
 } from "../redux/action";
import RemoteViewBox_Table from "Remote/ViewBox_Table";
import AddForm from "Remote/AddForm";
import AddFormFooter from "Remote/AddFormFooter";
import AddFormFooter_Button from "Remote/AddFormFooter_Button";
import AddForm_Table from 'Remote/AddForm_Table';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import moment from 'moment'

function Add(props) {
  const navigate = useHistory();
  let dispatch = useDispatch();
  const { Currencydata, Countrydata, Statedata
    , Lookupdata, Vendorsdata, productVariantData, uomData, PurchaseInvoicedata, SourceDocumentTypesData,
    PurchaseOrderdata, PurchaseOrderViewdata, CreditNotedata, CreditNoteViewdata, DebitNotedata, DebitNoteViewdata } = useSelector((state) => state.data);    
  useEffect(() => { 
    dispatch(loadCurrencyData());
    dispatch(loadCountryData()); 
    dispatch(loadVendorsData()); 
    dispatch(loadSOURCE_DOCUMENTData());
    dispatch(loadPaymentTermsData("payment_terms"));  
    dispatch(loadProductVariantData({limit: 10, offset: 1, filters:null, sort:null}));
    dispatch(loadUOMData());
    if(props && props.id){
      const{id}=props;
      dispatch(loadPurchaseInvoiceDataById(id));
    }
  }, []); 

  useEffect(()=>{
    if(props && props.id && PurchaseInvoicedata){      
      var newMainData=[];

      var newSalesOrderDetailsFields = SalesOrderDetailsFields
      .map(o=> {
        if(o.key=="purchase_invoice_number") o.value=PurchaseInvoicedata?.purchase_invoice_number; 
        if(o.key=="reference_number") o.value=PurchaseInvoicedata?.reference_number; 
        if(o.key=="Delivery_Order_Date") o.value=moment(PurchaseInvoicedata?.purchase_invoice_date).format("YYYY-MM-DD");
        if(o.key=="Expected_Delivery_Date") o.value=moment(PurchaseInvoicedata?.expected_delivery_date).format("YYYY-MM-DD"); 
        if(o.key=="currency_id") o.value=PurchaseInvoicedata?.currency?{id:PurchaseInvoicedata?.currency?.id, label:PurchaseInvoicedata?.currency?.name }:null; 
        if(o.key=="Link_Source_Document_Type") o.value={id:PurchaseInvoicedata?.link_source_document_id?.id, label:PurchaseInvoicedata?.link_source_document_id?.display_name}; 
        if(o.key=="Link_Source_Document") o.value={id:PurchaseInvoicedata?.link_source_document?.id, label:PurchaseInvoicedata?.link_source_document?.label}; 
        return o;})
      setSalesOrderDetailsFields(newSalesOrderDetailsFields);

      var newCustomerShippingAddressFields = CustomerShippingAddressFields
      .map(o=> {
        if(o.key=="ShippingAddress_Receiver_Name") o.value = PurchaseInvoicedata?.delivery_address?.customer_shipping_address?.receiver_name; 
        if(o.key=="ShippingAddress_Mobile_Number") o.value = PurchaseInvoicedata?.delivery_address?.customer_shipping_address?.mobile_number; 
        if(o.key=="ShippingAddress_Email") o.value = PurchaseInvoicedata?.delivery_address?.customer_shipping_address?.email; 
        if(o.key=="ShippingAddress_address_line_1") o.value = PurchaseInvoicedata?.delivery_address?.customer_shipping_address?.address_line_1; 
        if(o.key=="ShippingAddress_address_line_2") o.value = PurchaseInvoicedata?.delivery_address?.customer_shipping_address?.address_line_2; 
        if(o.key=="ShippingAddress_address_line_3") o.value = PurchaseInvoicedata?.delivery_address?.customer_shipping_address?.address_line_3; 
        if(o.key=="ShippingAddress_Country") o.value = PurchaseInvoicedata?.delivery_address?.customer_shipping_address?.country; 
        if(o.key=="ShippingAddress_State") o.value = PurchaseInvoicedata?.delivery_address?.customer_shipping_address?.state; 
        if(o.key=="ShippingAddress_District") o.value = PurchaseInvoicedata?.delivery_address?.customer_shipping_address?.city; 
        if(o.key=="ShippingAddress_Zipcode") o.value = PurchaseInvoicedata?.delivery_address?.customer_shipping_address?.pincode;
        return o;})
      setCustomerShippingAddressFields(newCustomerShippingAddressFields);

      var newCustomerBillingAddressFields = CustomerBillingAddressFields
      .map(o=> {
        if(o.key=="BillingAddress_Receiver_Name") o.value = PurchaseInvoicedata?.delivery_address?.customer_billing_address?.receiver_name;
        if(o.key=="BillingAddress_Mobile_Number") o.value = PurchaseInvoicedata?.delivery_address?.customer_billing_address?.mobile_number; 
        if(o.key=="BillingAddress_Email") o.value = PurchaseInvoicedata?.delivery_address?.customer_billing_address?.email; 
        if(o.key=="BillingAddress_address_line_1") o.value = PurchaseInvoicedata?.delivery_address?.customer_billing_address?.address_line_1; 
        if(o.key=="BillingAddress_address_line_2") o.value = PurchaseInvoicedata?.delivery_address?.customer_billing_address?.address_line_2; 
        if(o.key=="BillingAddress_address_line_3") o.value = PurchaseInvoicedata?.delivery_address?.customer_billing_address?.address_line_3; 
        if(o.key=="BillingAddress_Country") o.value = PurchaseInvoicedata?.delivery_address?.customer_billing_address?.country; 
        if(o.key=="BillingAddress_State") o.value = PurchaseInvoicedata?.delivery_address?.customer_billing_address?.state; 
        if(o.key=="BillingAddress_District") o.value = PurchaseInvoicedata?.delivery_address?.customer_billing_address?.city; 
        if(o.key=="BillingAddress_Zipcode") o.value = PurchaseInvoicedata?.delivery_address?.customer_billing_address?.pincode; 
        return o;})
      setCustomerBillingAddressFields(newCustomerBillingAddressFields);

      var newVendorDetailsFields = VendorDetailsFields;
      newVendorDetailsFields.find(o=> o.key=="Vendor_Contact").value = PurchaseInvoicedata.vendor_details?.vendor_contact; 
      newVendorDetailsFields.find(o=> o.key=="Vendor_Details_card").value.map(o=>{
        if(o.key=="Vendor_Shipping_Location") o.value = PurchaseInvoicedata?.vendor_details?.vendor_shipping_address?.land_mark;
        if(o.key=="Vendor_Shipping_Registered_Address") o.value = PurchaseInvoicedata?.vendor_details?.vendor_shipping_address?.address_line_1;
        if(o.key=="Vendor_Shipping_Location_Incharge") o.value = PurchaseInvoicedata?.vendor_details?.vendor_shipping_address?.contact_person_name;
      })
      newVendorDetailsFields.find(o=> o.key=="Vendor_Billing_Details_card").value.map(o=>{
        if(o.key=="Vendor_Billing_Location") o.value = PurchaseInvoicedata?.vendor_details?.vendor_billing_address?.land_mark;
        if(o.key=="Vendor_Billing_Registered_Address") o.value = PurchaseInvoicedata?.vendor_details?.vendor_billing_address?.address_line_1;
        if(o.key=="Vendor_Billing_Location_Incharge") o.value = PurchaseInvoicedata?.vendor_details?.vendor_billing_address?.contact_person_name;
      }) 
      setVendorDetailsFields(newVendorDetailsFields);

      var newPaymentTermsFields = PaymentTermsFields
      .map(o=> {
        if(o.key=="PaymentTerms_Payment_Due_Date") o.value=moment(PurchaseInvoicedata?.payment_due_date).format("YYYY-MM-DD");  
        if(o.key=="PaymentTerms_PaymentTerms") o.value=PurchaseInvoicedata?.payment_terms?{id:PurchaseInvoicedata?.payment_terms?.id, label:PurchaseInvoicedata?.payment_terms?.display_name }:null; 
        return o;})
      setPaymentTermsFields(newPaymentTermsFields);
      
      var nweselectedProductData=[];
      if(PurchaseInvoicedata?.purchase_invoice_lines)
      nweselectedProductData=PurchaseInvoicedata?.purchase_invoice_lines.map(o=>{return{
        id:o.product_id,
        sku_id:{id:o.product_id, label:o.product_details.sku_id},
        product_template_id:o.product_template_id,
        product_name:o.product_details.product_name,
        // "warehouse_id": 1,
        // "inventory_id": 1,
        uom: {name:{id:o?.uom?.id, label:o?.uom?.name}},
        serial_number: o.serial_number,
        "Quantity": parseInt(o.quantity),
        "selling_price": parseFloat(o.price),
        "discount": parseFloat(o.discount),
        product_pricing_details:{tax_options:o.tax},
        "Amount": o.amount,
        //"Payment_Terms":o.product_details.Payment_Terms
      }});
      setSelectedProductData(nweselectedProductData); 

      var newAdditionalInformationFields=AdditionalInformationFields;
      newAdditionalInformationFields.find(o=>o.key=="Additional_Information_Note").value = PurchaseInvoicedata.additional_information?.notes;
      newAdditionalInformationFields.find(o=>o.key=="Additional_Information_Terms_Conditions").value = PurchaseInvoicedata.additional_information?.terms_and_conditions;
      setAdditionalInformationFields(newAdditionalInformationFields)

      if(PurchaseInvoicedata && PurchaseInvoicedata.payment_details)
        setPaymentDetailsFields({...paymentDetailsFields, subTotal:PurchaseInvoicedata.payment_details.sub_total, adjustment_amount:PurchaseInvoicedata.payment_details.adjustment_amount, tax:PurchaseInvoicedata.purchase_invoice_lines[0].tax, "shippingCharge":parseFloat(PurchaseInvoicedata.payment_details?.shipping_charge??0), "vender_credits":PurchaseInvoicedata.payment_details.vender_credits, total:PurchaseInvoicedata.payment_details.total_amount})

        newMainData=[ 
          ...newSalesOrderDetailsFields,
          ...newCustomerShippingAddressFields,
          ...newCustomerBillingAddressFields,
          ...newVendorDetailsFields,
          ...newPaymentTermsFields, 
           ...newAdditionalInformationFields
        ];
       var keyValuePairMainData={"newEstimated_Cost":0, "Estimated_Cost_Select":PurchaseInvoicedata.shipping_carrier_id};

       newMainData.map(o=>{
        if(o.key=="Schedule_Pickup_time"){
          o.value.map(p=> {keyValuePairMainData[p.key]=p.value;})
        }
        else if(o.key!=null){
          keyValuePairMainData[o.key]=o.value;
        }
      });
      setMainData(keyValuePairMainData); 
    } 
  },[PurchaseInvoicedata])

  const[selectedProductData, setSelectedProductData]=useState([{Quantity:0, selling_price:0, discount:0, product_pricing_details:{tax_options:0}}]);
  
  const [SalesOrderDetailsFields, setSalesOrderDetailsFields] = useState([
    {
      label: "Invoice ID",
      type: "input", 
      key: "purchase_invoice_number", 
    },
    {
      label: "Auto Generate Invoice ID",
      type: "checkbox", 
      key: "Auto_delivery_order_number",
      isChecked:false, 
    },
    {
      label: "Reference ID",
      type: "input", 
      key: "reference_number", 
    },
    {
      label: "Auto Generate Reference ID",
      type: "checkbox", 
      key: "Auto_reference_number",
      isChecked:false,   
    },       
    {
      label: "Source Document Type",
      type: "select", 
      key: "Link_Source_Document_Type",  
      defaultVal: {}, 
    },
    {
      label: "Select Source Document",
      type: "select", 
      key: "Link_Source_Document",  
      defaultVal: {}, 
    },  
    {
      label: "Invoice Date",
      type: "date", 
      key: "Delivery_Order_Date", 
    },
    {
      label: "Expected Delivery Date",
      type: "date", 
      key: "Expected_Delivery_Date", 
    }, 
    {
      label: "Invoice Currency",
      type: "select", 
      key: "currency_id",  
      defaultVal: {}, 
    }, 
  ]);

  const [CustomerShippingAddressFields, setCustomerShippingAddressFields] = useState([
    {
      label: "Receiver Name",
      type: "input", 
      key: "ShippingAddress_Receiver_Name", 
    },
    {
      label: "Mobile Number",
      type: "input", 
      key: "ShippingAddress_Mobile_Number", 
    },
    {
      label: "Email",
      type: "input", 
      key: "ShippingAddress_Email", 
    },
    {
      label: "Address Line 1",
      type: "input", 
      key: "ShippingAddress_address_line_1", 
    },
    {
      label: "Address Line 2",
      type: "input", 
      key: "ShippingAddress_address_line_2", 
    },
    {
      label: "Address Line 3",
      type: "input", 
      key: "ShippingAddress_address_line_3", 
    },
    {
      label: "Country",
      type: "select", 
      key: "ShippingAddress_Country",  
    },
    {
      label: "State",
      type: "select", 
      key: "ShippingAddress_State",  
    },
    {
      label: "City/District",
      type: "input", 
      key: "ShippingAddress_District", 
    }, 
    {
      label: "Zipcode",
      type: "input", 
      key: "ShippingAddress_Zipcode", 
    },
  ]);

  const [CustomerBillingAddressFields, setCustomerBillingAddressFields] = useState([
    {
      label: "Receiver Name",
      type: "input", 
      key: "BillingAddress_Receiver_Name"
    },
    {
      label: "Mobile Number",
      type: "input", 
      key: "BillingAddress_Mobile_Number", 
    },
    {
      label: "Email",
      type: "input", 
      key: "BillingAddress_Email", 
    },
    {
      label: "Address Line 1",
      type: "input", 
      key: "BillingAddress_address_line_1", 
    },
    {
      label: "Address Line 2",
      type: "input", 
      key: "BillingAddress_address_line_2", 
    },
    {
      label: "Address Line 3",
      type: "input", 
      key: "BillingAddress_address_line_3", 
    },
    {
      label: "Country",
      type: "select", 
      key: "BillingAddress_Country",  
      defaultVal: {},
    },
    {
      label: "State",
      type: "select", 
      key: "BillingAddress_State",  
      defaultVal: {},
    },
    {
      label: "City/District",
      type: "input", 
      key: "BillingAddress_District", 
    },
    {
      label: "Zipcode",
      type: "input", 
      key: "BillingAddress_Zipcode", 
    },
  ]);
  
  const [VendorDetailsFields, setVendorDetailsFields] = useState([       
    {
      label: "Vendor Contact",
      type: "select", 
      key: "Vendor_Contact",      
    }, 
    {
      label: "Vendor Shipping Address",
      type: "card", 
      key: "Vendor_Details_card",
      IsSpaceRequired:true,
      value: [
        {
          label: "Location Name",
          type: "label",  
          key: "Vendor_Shipping_Location", 
          value:""
        }, 
        {
          label: "Registered Address",
          type: "label",  
          key: "Vendor_Shipping_Registered_Address", 
          value:""
        }, 
        {
          label: "Location Incharge",
          type: "label",  
          key: "Vendor_Shipping_Location_Incharge", 
          value:""
        }, 
      ],
    },
    {
      label: "Vendor Billing Address",
      type: "card", 
      key: "Vendor_Billing_Details_card",
      IsSpaceRequired:false,
      value: [
        {
          label: "Location Name",
          type: "label",  
          key: "Vendor_Billing_Location", 
          value:""
        }, 
        {
          label: "Registered Address",
          type: "label",  
          key: "Vendor_Billing_Registered_Address", 
          value:""
        }, 
        {
          label: "Location Incharge",
          type: "label",  
          key: "Vendor_Billing_Location_Incharge", 
          value:""
        }, 
      ],
    },
    {
      label: "Available Vendor Credit",
      type: "label_price", 
      key: "Vendor_Delivery_Charges", 
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
      // data: ["USD", "INR"], 
      data:[],
      defaultVal: {},
    },
  ]);
  
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

  const [paymentDetailsFields, setPaymentDetailsFields] = useState({subTotal:0, tax:0, shippingCharge:0, adjustment_text:"", Final_Adjustment:"+", adjustment_amount:0, totalBeforeAdjustment:0, total:0});

  const[mainData, setMainData]=useState({});

  const onAddNewRaw = () =>{
    setSelectedProductData([...selectedProductData,{Quantity:0, selling_price:0, discount:0, product_pricing_details:{tax_options:0}}]);
  }

  const headCells = [
    {
      key: "sku_id", 
      label: "Product SKU",
      type: "select",
      data: useSelector((state) => state.data.productVariantData.map(o=>{return{id:o.id, label:o.sku_id}}))
    },
    {
      key: "product_name",  
      label: "Product Name",
      type: "text"
    },      
    {
      key: "description.data",  
      label: "Description",
      type: "text"
    },  
    {
      key: "Location", 
      label: "Location",
      type: "text"
    },  
    {
      key: "inventory_tracking_id",
      label: "Inventory ID",
      type: "text"
    },  
    {
      key: "hsn_code", 
      label: "Serial Number",
      type: "text"
    },  
    {
      key: "uom.name", 
      label: "Unit Of Measurement",
      type: "select",
      data:useSelector((state) => state.data.uomData.map(o=>{return{id:o.id, label:o.name}}))
    },  
    {
      key: "Quantity", 
      label: "Quantity",
      type: "number"
    },
    {
      key: "selling_price", 
      label: "Price",
      type: "number"
    },
    {
      key: "discount", 
      label: "Discount",
      type: "number"
    },
    {
      key: "product_pricing_details.tax_options", 
      label: "Tax",
      type: "number"
    },
    {
      key: "Amount", 
      label: "Amount",
      type: "label"
    },
    {
      key: "Payment_Terms", 
      label: "Payment Terms",
      type: "text"
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
   
  const setDataByKeyAndValue = (key, value, index=null) => {
    
    console.log("key", key, "value", value);
     
    if(index!=null){
      var newSelectedProductData=JSON.parse(JSON.stringify(selectedProductData));
      
      if(key==='sku_id'){
        console.log("sku_id")
        var selectVarient=productVariantData.find(o=>o.id==value.id);
        newSelectedProductData[index]=selectVarient;
        newSelectedProductData[index][key]=value.label;
      }
      else if(key==='uom.name'){
        console.log("uom.name")
        var selectVarient=uomData.find(o=>o.id==value.id);
        newSelectedProductData[index].uom={name:value.label, id:value.id};
      }
      else{
        console.log(key)
        if(key.toString().includes('.')) newSelectedProductData[index][key.split(".")[0]][key.split(".")[1]]=value;
        else newSelectedProductData[index][key]=value;
      }
      var Quantity=0;
      var selling_price=0;
      var discount=0;
      if(newSelectedProductData[index].Quantity) Quantity=parseInt(newSelectedProductData[index].Quantity);
      if(newSelectedProductData[index].selling_price)selling_price=parseFloat(newSelectedProductData[index].selling_price);
      if(newSelectedProductData[index].discount)discount=parseFloat(newSelectedProductData[index].discount);

      //calculation
      var grossTotal = (Quantity*selling_price)-discount;
      var tax=0;
      if(newSelectedProductData[index].product_pricing_details && newSelectedProductData[index].product_pricing_details.tax_options && parseFloat(newSelectedProductData[index].product_pricing_details.tax_options)>0){
        var taxRate=parseFloat(newSelectedProductData[index].product_pricing_details.tax_options);
        tax=(grossTotal*taxRate)/100
      }
      else tax = 0;

      var amount=grossTotal+tax;
      newSelectedProductData[index].Amount=amount;
      //console.log("Total", newSelectedProductData.map(o=>o.Amount).reduce((accumulator, currentValue) => accumulator + currentValue, 0));
      setSelectedProductData(newSelectedProductData);
    
      var newpaymentDetailsFields=paymentDetailsFields;
      newpaymentDetailsFields.subTotal=grossTotal;
      newpaymentDetailsFields.tax=newSelectedProductData[0]?.product_pricing_details?.tax_options??0;
      setPaymentDetailsFields(newpaymentDetailsFields); 
      calulate_total();
    }
    
    try{
    var newSalesOrderDetailsFields = SalesOrderDetailsFields
    .map(o=> {
      if(o.key==key) o.value=value; 
      return o;})
    setSalesOrderDetailsFields(newSalesOrderDetailsFields);
  }
  catch(e){console.error("err2", e)}

  try{
    var newCustomerShippingAddressFields = CustomerShippingAddressFields
    .map(o=> {
      if(o.key==key) o.value=value; 
      return o;})
    setCustomerShippingAddressFields(newCustomerShippingAddressFields);
  }
  catch(e){console.error("err3", e)}

  try{
    var newCustomerBillingAddressFields = CustomerBillingAddressFields
    .map(o=> {
      if(o.key==key) o.value=value; 
      return o;})
    setCustomerBillingAddressFields(newCustomerBillingAddressFields);
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
    var newPackageDetailsFields = PackageDetailsFields
    .map(o=> {
      if(o.key==key) o.value=value; 
      return o;})
      setPackageDetailsFields(newPackageDetailsFields) 
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
  if(key == "Schedule_Pickup_date"){
    var newSchedule_Pickup_date_and_time=Schedule_Pickup_date_and_time.map(o=> {if(o.key=="Schedule_Pickup_date") o.value=value; return o;});        
    setSchedule_Pickup_date_and_time(newSchedule_Pickup_date_and_time) 
  }
  if(key == "Schedule_Pickup_time_from" || key == "Schedule_Pickup_time_to")
  {
    var newSchedule_Pickup_date_and_time=Schedule_Pickup_date_and_time.map(o=> {if(o.key=="Schedule_Pickup_time") o.value.map(p=> {if(p.key==key) p.value=new Date(value); return p;}); return o;});        
    setSchedule_Pickup_date_and_time(newSchedule_Pickup_date_and_time)    
  } 
 }

  const handelInputChange = (key, value, index=null) => {
    console.log("key", key, "value", value, "index", index)
    setDataByKeyAndValue(key, value, index);

    if(index==null){
      var newMainData=mainData;
      newMainData[key]=value;
      setMainData(newMainData);
    }
   
    calulate_total(); 
  };  

  function calulate_total()
  {
    if(selectedProductData){
    var subTotal=selectedProductData.map(o=>o.Amount).reduce((previousValue, currentValue)=> {return previousValue+currentValue});         
    //console.log("subTotal",subTotal)
    var newtotal=0;
   
    if(paymentDetailsFields.Final_Adjustment=="+"){
      newtotal= parseFloat(paymentDetailsFields.adjustment_amount)+subTotal;
    }
    else{
      newtotal=parseFloat(paymentDetailsFields.adjustment_amount)-subTotal;
    } 
      //console.log("newtotal",newtotal)
      setPaymentDetailsFields({...paymentDetailsFields, shippingCharge:0, total:newtotal});
    }
  }

  const handleButtonClick = (key) =>{  
    console.log("key", key)   
 
    if(key=="Cancel"){
      navigate.push("/PurchaseInvoice"); 
      return;
    }   
    
    var Vendor_Details_card = VendorDetailsFields.find(o=> o.key=='Vendor_Details_card').data; 
    var VendorAddressDetais = Vendor_Details_card && Vendor_Details_card.primary_contact && Vendor_Details_card.primary_contact.address_details[0];
    
    var body ={
      "reference_number": mainData.reference_number,
      "status_id":315,  
      "link_source_document_type":parseInt(mainData?.Link_Source_Document_Type?.id),
      "link_source_document":{
        "id":mainData?.Link_Source_Document?.id,
        "label":mainData?.Link_Source_Document?.label,
      },
      "payment_due_date":"2022-05-12T22:19:32.8080397+05:30",
      "purchase_invoice_date": new Date(mainData.Delivery_Order_Date),
      "vendor_details":{
            "vendor_contact": mainData?.Vendor_Contact,
            "vendor_delivery_charges": 3333,
                "vendor_shipping_address": {
                    "pin_code": VendorAddressDetais && VendorAddressDetais.pin_code,
                    "land_mark": VendorAddressDetais && VendorAddressDetais.land_mark,
                    "gst_in_number": VendorAddressDetais && VendorAddressDetais.gst_in_number,
                    "location_name": VendorAddressDetais && VendorAddressDetais.location_name,
                    "address_line_1": VendorAddressDetais && VendorAddressDetais.address_line_1,
                    "address_line_2": VendorAddressDetais && VendorAddressDetais.address_line_2,
                    "address_line_3": VendorAddressDetais && VendorAddressDetais.address_line_3,
                    "contact_person_name": VendorAddressDetais && VendorAddressDetais.contact_person_name,
                    "contact_person_number": VendorAddressDetais && VendorAddressDetais.contact_person_number,
                },
                "vendor_billing_address": {
                    "pin_code": VendorAddressDetais && VendorAddressDetais.pin_code,
                    "land_mark":  VendorAddressDetais && VendorAddressDetais.land_mark,
                    "gst_in_number": VendorAddressDetais && VendorAddressDetais.gst_in_number,
                    "location_name": VendorAddressDetais && VendorAddressDetais.location_name,
                    "address_line_1": VendorAddressDetais && VendorAddressDetais.address_line_1,
                    "address_line_2": VendorAddressDetais && VendorAddressDetais.address_line_2,
                    "address_line_3": VendorAddressDetais && VendorAddressDetais.address_line_3,
                    "contact_person_name": VendorAddressDetais && VendorAddressDetais.contact_person_name,
                    "contact_person_number": VendorAddressDetais && VendorAddressDetais.contact_person_number,
            },
            "vendor_credits": 0
      },
       "paid_id":117,
       "payment_terms_id":45,
       "payment_amount":100,
       "balance_due":100,
       "currency_id":mainData.currency_id?.id,
       "delivery_address":{
           "deliver_to":"customer shipping address",
           "customer_shipping_address":{
               "receiver_name":mainData.ShippingAddress_Receiver_Name,
               "mobile_number":  mainData.ShippingAddress_Mobile_Number,
               "email": mainData.ShippingAddress_Email,
               "address_line_1": mainData.ShippingAddress_address_line_1,
               "address_line_2": mainData.ShippingAddress_address_line_2,
               "address_line_3": mainData.ShippingAddress_address_line_3,
               "country": mainData.ShippingAddress_Country?.label,
               "state": mainData.ShippingAddress_State?.label,
               "city": mainData.ShippingAddress_District,
               "pincode": mainData.ShippingAddress_Zipcode
               
           },
            "customer_billing_address":{
               "receiver_name":mainData.BillingAddress_Receiver_Name,
               "mobile_number":  mainData.BillingAddress_Mobile_Number,
               "email": mainData.BillingAddress_Email,
               "address_line_1": mainData.BillingAddress_address_line_1,
               "address_line_2": mainData.BillingAddress_address_line_2,
               "address_line_3": mainData.BillingAddress_address_line_3,
               "country": mainData.BillingAddress_Country?.label,
               "state": mainData.BillingAddress_State?.label,
               "city": mainData.BillingAddress_District,
               "pincode": mainData.BillingAddress_Zipcode,
           }
       },
       "additional_information": {
        "notes": mainData.Additional_Information_Note,
        "terms_and_conditions": mainData.Additional_Information_Terms_Conditions,
        // "attachments": {
        //     "id":1,
        //     "path":"url"
        // }
      },
      "payment_details": {
        "available_vendor_credits": 0,
        "use_credits_for_payment": false,
        "sub_total": paymentDetailsFields.subTotal,
        "tax": parseFloat(paymentDetailsFields.tax),
        "shipping_charges": parseFloat(paymentDetailsFields.shippingCharge),
        "adjustment_amount":  parseFloat(paymentDetailsFields.adjustment_amount),
        "total_amount":paymentDetailsFields.total
      },
      "expected_delivery_date": new Date(mainData.Expected_Delivery_Date),
      "due_date": "2022-05-12T22:19:32.8080397+05:30",
      "po_ids":{
          "id":10,
          "number":mainData.purchase_invoice_number
      },
      purchase_invoice_lines:selectedProductData.map(o=>{return{
        "product_id": o.id,
        "product_template_id": o.product_template_id,
        "warehouse_id": 5,
        "inventory_id":1,
        //"inventory_id": o.inventory_id,         
        "serial_number": o.serial_number,
        "uom_id": (o.uom && o.uom.id ? o.uom.id : 1),
        "quantity": parseInt(o.Quantity),
        "price": parseFloat(o.selling_price),
        "discount": parseFloat(o.discount),
        "tax": parseFloat(o.product_pricing_details?.tax_options),
        "amount": o.Amount,
        "payment_terms_id":5 
      }}), 
    }
    //console.log("body", body)
   

    if(props && props.id){
      body["id"]=parseInt(props.id);
      dispatch(Update_Purchase_Invoice_Orders(props.id, body, function(resp){ 
        toast(resp)
      }));
    }
    else{
      dispatch(Save_Purchase_Invoice(body, function(resp){ 
        toast(resp)
      }));
    }

  };

  const [Country, setCountry] = useState();

  const handelSelectonChange = (key, value) => {    
    console.log("key", key) 
    console.log("value", value); 
    if(key == "Link_Source_Document_Type")
    {   
      if(value.lookup_code == "PURCHASE_ORDERS")
      {
       dispatch(loadPurchaseOrderData({limit: 100, offset: 1, filters:null, sort:null}));
      } 
      if(value.lookup_code == "CREDIT_NOTE")
      {
       dispatch(loadCreditNoteOrderData({limit: 100, offset: 1, filters:null, sort:null}));
      } 
      if(value.lookup_code == "DEBIT_NOTE")
      {
       dispatch(loadDebitNoteOrderData({limit: 100, offset: 1, filters:null, sort:null}));
      } 
    }
    if(key == "Link_Source_Document")
    {
      if(mainData.Link_Source_Document_Type.lookup_code == "PURCHASE_ORDERS")
      {  
        dispatch(loadPurchaseOrderDataById(value.id)); 
      } 
      if(mainData.Link_Source_Document_Type.lookup_code == "CREDIT_NOTE")
      {  
        dispatch(loadCreditNoteOrderDataById(value.id)); 
      } 
      if(mainData.Link_Source_Document_Type.lookup_code == "DEBIT_NOTE")
      {  
        dispatch(loadDebitNoteOrderDataById(value.id)); 
      } 
    }

    if(key == "ShippingAddress_Country" || key == "BillingAddress_Country")
    {
      setCountry(value.id);
      dispatch(loadStateDataById(value.id));
    }
    if(key == "Vendor_Contact")
    { 
      var singleVendorsdata=Vendorsdata.find(o=>o.id==value.id);
      var Vendor_Details_card=VendorDetailsFields.find(o=> o.key=='Vendor_Details_card');
      
      Vendor_Details_card.value=[{
        label: "Location Name",
        type: "label",  
        key: "Vendor_Shipping_Location", 
        value:(singleVendorsdata && singleVendorsdata.contact && singleVendorsdata.contact.address_details[0] && singleVendorsdata.contact.address_details[0].location_name)
      }, 
      {
        label: "Registered Address",
        type: "label",  
        key: "Vendor_Shipping_Registered_Address", 
        value:
        (singleVendorsdata && singleVendorsdata.contact && singleVendorsdata.contact.address_details && singleVendorsdata.contact.address_details[0].address_line_1) + " " +
        (singleVendorsdata && singleVendorsdata.contact && singleVendorsdata.contact.address_details && singleVendorsdata.contact.address_details[0].address_line_2) + " " +
        (singleVendorsdata && singleVendorsdata.contact && singleVendorsdata.contact.address_details && singleVendorsdata.contact.address_details[0].address_line_3) + " " +
        (singleVendorsdata && singleVendorsdata.contact && singleVendorsdata.contact.address_details && singleVendorsdata.contact.address_details[0].land_mark) + " " +
        (singleVendorsdata && singleVendorsdata.contact && singleVendorsdata.contact.address_details && singleVendorsdata.contact.address_details[0].pin_code) 
      }, 
      {
        label: "Location Incharge",
        type: "label",  
        key: "Vendor_Shipping_Location_Incharge", 
        value:(singleVendorsdata && singleVendorsdata.name)
      }];
      Vendor_Details_card.data=singleVendorsdata;
      var sData=VendorDetailsFields.map(o=>{if(o.key=='Vendor_Details_card') o.value=Vendor_Details_card.value; return o;} )
      setVendorDetailsFields(sData);  

      //2nd

      var singleVendorsdata=Vendorsdata.find(o=>o.id==value.id);
      var Vendor_Details_card=VendorDetailsFields.find(o=> o.key=='Vendor_Billing_Details_card');
      
      Vendor_Details_card.value=[{
        label: "Location Name",
        type: "label",  
        key: "Vendor_Billing_Location", 
        value:(singleVendorsdata && singleVendorsdata.contact && singleVendorsdata.contact.address_details[0] && singleVendorsdata.contact.address_details[0].location_name)
      }, 
      {
        label: "Registered Address",
        type: "label",  
        key: "Vendor_Billing_Registered_Address", 
        value:
        (singleVendorsdata && singleVendorsdata.contact && singleVendorsdata.contact.address_details && singleVendorsdata.contact.address_details[0].address_line_1) + " " +
        (singleVendorsdata && singleVendorsdata.contact && singleVendorsdata.contact.address_details && singleVendorsdata.contact.address_details[0].address_line_2) + " " +
        (singleVendorsdata && singleVendorsdata.contact && singleVendorsdata.contact.address_details && singleVendorsdata.contact.address_details[0].address_line_3) + " " +
        (singleVendorsdata && singleVendorsdata.contact && singleVendorsdata.contact.address_details && singleVendorsdata.contact.address_details[0].land_mark) + " " +
        (singleVendorsdata && singleVendorsdata.contact && singleVendorsdata.contact.address_details && singleVendorsdata.contact.address_details[0].pin_code) 
      }, 
      {
        label: "Location Incharge",
        type: "label",  
        key: "Vendor_Billing_Location_Incharge", 
        value:(singleVendorsdata && singleVendorsdata.name)
      }];
      Vendor_Details_card.data=singleVendorsdata;
      var sData=VendorDetailsFields.map(o=>{if(o.key=='Vendor_Details_card') o.value=Vendor_Details_card.value; return o;} )
      setVendorDetailsFields(sData);  
    }    

    switch(key){
      case"ShippingAddress_Country":
      case"ShippingAddress_State":{
        setCustomerShippingAddressFields(CustomerShippingAddressFields.map(o=>{if(o.key==key) return{...o, value:value}; return o}));
        break;
      }
      case"BillingAddress_Country":
      case"BillingAddress_State":{
        setCustomerBillingAddressFields(CustomerBillingAddressFields.map(o=>{if(o.key==key) return{...o, value:value}; return o}));
        break;
      }
    
      case"currency_id":{
        setSalesOrderDetailsFields(SalesOrderDetailsFields.map(o=>{if(o.key==key) return{...o, value:value}; return o}));
        break;
      }
       
      case"Link_Source_Document_Type":{
        setSalesOrderDetailsFields(SalesOrderDetailsFields.map(o=>{if(o.key==key) return{...o, value:value}; return o}));
        break;
      }

      case"Link_Source_Document":{
        setSalesOrderDetailsFields(SalesOrderDetailsFields.map(o=>{if(o.key==key) return{...o, value:value}; return o}));
        break;
      }

      case"PaymentTerms_PaymentTerms":{
        setPaymentTermsFields(PaymentTermsFields.map(o=>{if(o.key==key) return{...o, value:value}; return o}));
        break;
      }

      case"Vendor_Contact":{
        setVendorDetailsFields(VendorDetailsFields.map(o=>{if(o.key==key) return{...o, value:value}; return o}));
        break;
      }
    }

    if(key=="Final_Adjustment"){
      setPaymentDetailsFields({...paymentDetailsFields, Final_Adjustment:value});
    }
    var newMainData=mainData;
    newMainData[key]=value;
    setMainData(newMainData);  
  };

  const handelRadionButtononChange = (prop, value) => { 
    console.log("prop, value", prop, value)    
  }; 
   
  const handelCheckBoxonChange = (field) => { 
    console.log("onCheckboxChanges", field);

    if(field.key == "Auto_delivery_order_number")
    {
      var neworder=SalesOrderDetailsFields.map(o=>{if(o.key=='delivery_order_number') o.disabled=!field.isChecked; return o;})
      setSalesOrderDetailsFields(neworder)
    }

    if(field.key == "Auto_reference_number")
    {
      var neworder=SalesOrderDetailsFields.map(o=>{if(o.key=='reference_number') o.disabled=!field.isChecked; return o;})
      setSalesOrderDetailsFields(neworder)
    }

    var newState = SalesOrderDetailsFields.map(o=>{if(o.key==field.key) {o.isChecked=!o.isChecked;} return o})
    setSalesOrderDetailsFields(newState) 
  };
 
  const[CheckboxShowForCopyField_value, setCheckboxShowForCopyField_value]=useState(false);
  const handelCheckboxShowForCopyField_valueChange =(field) =>{
    //console.log("onCheckboxChanges", field);
    setCheckboxShowForCopyField_value(!CheckboxShowForCopyField_value);
    
    var newCustomerBillingAddressFields=CustomerBillingAddressFields.map(o=> {
      return{
      ...o,
      value:mainData[o.key.replace("Billing", "Shipping")]
    }});

    var newMainData=mainData;
    newCustomerBillingAddressFields.map(o=> newMainData[o.key]=o.value);
    setMainData(newMainData);

    setCustomerBillingAddressFields(newCustomerBillingAddressFields);
    //CustomerShippingAddressFields
  }
  const setRadioType = (prop, value) => { 
  };

  //Purchase Order 
  useEffect(()=>{    
    if(PurchaseOrderViewdata && mainData && mainData.Link_Source_Document_Type && mainData.Link_Source_Document_Type.lookup_code == "PURCHASE_ORDERS")
    {
      var newMainData=[];

      var newSalesOrderDetailsFields = SalesOrderDetailsFields
      .map(o=> {       
        if(o.key=="currency_id") o.value={id:PurchaseOrderViewdata?.currency?.id, label:PurchaseOrderViewdata?.currency?.currency_code}; 
        if(o.key=="reference_number") o.value=PurchaseOrderViewdata?.reference_number; 
        if(o.key=="Expected_Delivery_Date") o.value=moment(PurchaseOrderViewdata?.expected_delivery_date).format("YYYY-MM-DD");
        return o;})
      setSalesOrderDetailsFields(newSalesOrderDetailsFields);

      var newCustomerShippingAddressFields = CustomerShippingAddressFields
      .map(o=> {
        if(o.key=="ShippingAddress_Receiver_Name") o.value = PurchaseOrderViewdata?.delivery_address?.contact_person_name; 
        if(o.key=="ShippingAddress_Mobile_Number") o.value = PurchaseOrderViewdata?.delivery_address?.contact_person_number; 
        if(o.key=="ShippingAddress_Email") o.value = PurchaseOrderViewdata?.delivery_address?.email; 
        if(o.key=="ShippingAddress_address_line_1") o.value= PurchaseOrderViewdata?.delivery_address?.address_line_1; 
        if(o.key=="ShippingAddress_address_line_2") o.value= PurchaseOrderViewdata?.delivery_address?.address_line_2; 
        if(o.key=="ShippingAddress_address_line_3") o.value= PurchaseOrderViewdata?.delivery_address?.address_line_3; 
        if(o.key=="ShippingAddress_Country") o.value= PurchaseOrderViewdata?.delivery_address?.country; 
        if(o.key=="ShippingAddress_State") o.value= PurchaseOrderViewdata?.delivery_address?.state; 
        if(o.key=="ShippingAddress_District") o.value= PurchaseOrderViewdata?.delivery_address?.city; 
        if(o.key=="ShippingAddress_Zipcode") o.value= PurchaseOrderViewdata?.delivery_address?.pin_code;
        return o;})
        setCustomerShippingAddressFields(newCustomerShippingAddressFields); 

        
      var newCustomerBillingAddressFields = CustomerBillingAddressFields
      .map(o=> {
        if(o.key=="BillingAddress_Receiver_Name") o.value = PurchaseOrderViewdata?.billing_address?.contact_person_name; 
        if(o.key=="BillingAddress_Mobile_Number") o.value = PurchaseOrderViewdata?.billing_address?.contact_person_number; 
        if(o.key=="BillingAddress_Email") o.value = PurchaseOrderViewdata?.billing_address?.email; 
        if(o.key=="BillingAddress_address_line_1") o.value = PurchaseOrderViewdata?.billing_address?.address_line_1; 
        if(o.key=="BillingAddress_address_line_2") o.value = PurchaseOrderViewdata?.billing_address?.address_line_2; 
        if(o.key=="BillingAddress_address_line_3") o.value = PurchaseOrderViewdata?.billing_address?.address_line_3; 
        if(o.key=="BillingAddress_Country") o.value = PurchaseOrderViewdata?.billing_address?.country; 
        if(o.key=="BillingAddress_State") o.value = PurchaseOrderViewdata?.billing_address?.state; 
        if(o.key=="BillingAddress_District") o.value =  PurchaseOrderViewdata?.billing_address?.city; 
        if(o.key=="BillingAddress_Zipcode") o.value = PurchaseOrderViewdata?.billing_address?.pin_code; 
        return o;})
      setCustomerBillingAddressFields(newCustomerBillingAddressFields);

      var newPaymentTermsFields = PaymentTermsFields
      .map(o=> {
        if(o.key=="PaymentTerms_Payment_Due_Date") o.value = moment(PurchaseOrderViewdata?.payment_due_date).format("YYYY-MM-DD"); 
        if(o.key=="PaymentTerms_PaymentTerms") o.value = PurchaseOrderViewdata?.payment_terms?{id:PurchaseOrderViewdata?.payment_terms.id, label:PurchaseOrderViewdata?.payment_terms?.display_name}:null; 
        return o;})
      setPaymentTermsFields(newPaymentTermsFields);
      
      var nweselectedProductData=[];
      if(PurchaseOrderViewdata.purchase_order_lines)
      nweselectedProductData = PurchaseOrderViewdata.purchase_order_lines.map(o=>{return{
        id:o?.product_id,
        sku_id:{id:o?.product_id, label:o?.product_details?.sku_id},
        //sku_id:o.product_details.sku_id,
        product_template_id:o?.product_template_id,
        product_name:o?.product_details?.product_name,
        // "warehouse_id": 1,
        // "inventory_id": 1,
        uom: {name:{id:o?.uom?.id, label:o?.uom?.name}},
        serial_number: o?.serial_number,
        "Quantity": parseInt(o.quantity),
        "selling_price": parseFloat(o.price),
        "discount": parseFloat(o.discount),
        product_pricing_details:{tax_options:o.tax},
        "Amount": o.amount,
        //"Payment_Terms":o.product_details.Payment_Terms
      }});
      setSelectedProductData(nweselectedProductData);

      var newVendorDetailsFields = VendorDetailsFields;
      newVendorDetailsFields.find(o=> o.key=="Vendor_Contact").value = PurchaseOrderViewdata.vendor_details?.vendor_contact; 
      newVendorDetailsFields.find(o=> o.key=="Vendor_Details_card").value.map(o=>{
        if(o.key=="Vendor_Shipping_Location") o.value = PurchaseOrderViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.land_mark;
        if(o.key=="Vendor_Shipping_Registered_Address") o.value = PurchaseOrderViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.address_line_1;
        if(o.key=="Vendor_Shipping_Location_Incharge") o.value = PurchaseOrderViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.contact_person_name;
      })
      newVendorDetailsFields.find(o=> o.key=="Vendor_Billing_Details_card").value.map(o=>{
        if(o.key=="Vendor_Billing_Location") o.value = PurchaseOrderViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.land_mark;
        if(o.key=="Vendor_Billing_Registered_Address") o.value = PurchaseOrderViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.address_line_1;
        if(o.key=="Vendor_Billing_Location_Incharge") o.value = PurchaseOrderViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.contact_person_name;
      }) 
      setVendorDetailsFields(newVendorDetailsFields);

      var newAdditionalInformationFields=AdditionalInformationFields;
      newAdditionalInformationFields.find(o=>o.key=="Additional_Information_Note").value = PurchaseOrderViewdata?.additional_information?.notes;
      newAdditionalInformationFields.find(o=>o.key=="Additional_Information_Terms_Conditions").value = PurchaseOrderViewdata?.additional_information?.terms_and_conditions;
      setAdditionalInformationFields(newAdditionalInformationFields)

      if(PurchaseOrderViewdata && PurchaseOrderViewdata?.po_payment_details)
      setPaymentDetailsFields({...paymentDetailsFields, subTotal:PurchaseOrderViewdata?.po_payment_details?.sub_total, adjustment_amount:PurchaseOrderViewdata?.po_payment_details?.adjustment_amount, tax:PurchaseOrderViewdata?.po_payment_details?.tax, "shippingCharge":parseFloat(PurchaseOrderViewdata?.po_payment_details?.shipping_charge??0), "vender_credits":PurchaseOrderViewdata?.po_payment_details?.available_vendor_credits, total:PurchaseOrderViewdata?.po_payment_details?.total_amount})

        
        newMainData=[ 
          ...newSalesOrderDetailsFields,
          ...newCustomerShippingAddressFields,
           ...newCustomerBillingAddressFields,
           ...newPaymentTermsFields, 
           ...nweselectedProductData,  
           ...newAdditionalInformationFields,
           ...newVendorDetailsFields
        ];
      var keyValuePairMainData={"newEstimated_Cost":0, "Estimated_Cost_Select":PurchaseOrderViewdata.shipping_carrier_id};

      newMainData.map(o=>{
        if(o.key=="Schedule_Pickup_time"){
          o.value.map(p=> {keyValuePairMainData[p.key]=p.value;})
        }
        else if(o.key!=null){
          keyValuePairMainData[o.key]=o.value;
        }
      });
      setMainData(keyValuePairMainData);
    }
  },[PurchaseOrderViewdata])

  //Credit Note 
  useEffect(()=>{    
    if(CreditNoteViewdata && mainData && mainData.Link_Source_Document_Type && mainData.Link_Source_Document_Type.lookup_code == "CREDIT_NOTE")
    {
      var newMainData=[];

      var newSalesOrderDetailsFields = SalesOrderDetailsFields
      .map(o=> {       
        if(o.key=="currency_id") o.value={id:CreditNoteViewdata?.currency?.id, label:CreditNoteViewdata?.currency?.currency_code}; 
        if(o.key=="reference_number") o.value=CreditNoteViewdata?.reference_id;  
        return o;})
      setSalesOrderDetailsFields(newSalesOrderDetailsFields);

      var Customer_ShippingAddress = CreditNoteViewdata?.customer?.address_details.filter(o=> o.address_type == "shipping");      
      var newCustomerShippingAddressFields = CustomerShippingAddressFields
      .map(o=> {
        if(o.key=="ShippingAddress_Receiver_Name") o.value = Customer_ShippingAddress[0]?.contact_person_name; 
        if(o.key=="ShippingAddress_Mobile_Number") o.value = Customer_ShippingAddress[0]?.contact_person_number; 
        if(o.key=="ShippingAddress_Email") o.value = Customer_ShippingAddress[0]?.email; 
        if(o.key=="ShippingAddress_address_line_1") o.value= Customer_ShippingAddress[0]?.address_line_1; 
        if(o.key=="ShippingAddress_address_line_2") o.value= Customer_ShippingAddress[0]?.address_line_2; 
        if(o.key=="ShippingAddress_address_line_3") o.value= Customer_ShippingAddress[0]?.address_line_3; 
        if(o.key=="ShippingAddress_Country") o.value= {id:Customer_ShippingAddress[0]?.country?.id, label:Customer_ShippingAddress[0]?.country?.name}; 
        if(o.key=="ShippingAddress_State") o.value=  {id:Customer_ShippingAddress[0]?.state?.id, label:Customer_ShippingAddress[0]?.state?.name};
        if(o.key=="ShippingAddress_District") o.value= Customer_ShippingAddress[0]?.city; 
        if(o.key=="ShippingAddress_Zipcode") o.value= Customer_ShippingAddress[0]?.pin_code;
        return o;})
        setCustomerShippingAddressFields(newCustomerShippingAddressFields); 

      var Customer_BillingAddress = CreditNoteViewdata?.customer?.address_details.filter(o=> o.address_type == "billing");        
      var newCustomerBillingAddressFields = CustomerBillingAddressFields
      .map(o=> {
        if(o.key=="BillingAddress_Receiver_Name") o.value = Customer_BillingAddress[0]?.contact_person_name; 
        if(o.key=="BillingAddress_Mobile_Number") o.value = Customer_BillingAddress[0]?.contact_person_number; 
        if(o.key=="BillingAddress_Email") o.value = Customer_BillingAddress[0]?.email; 
        if(o.key=="BillingAddress_address_line_1") o.value = Customer_BillingAddress[0]?.address_line_1; 
        if(o.key=="BillingAddress_address_line_2") o.value = Customer_BillingAddress[0]?.address_line_2; 
        if(o.key=="BillingAddress_address_line_3") o.value = Customer_BillingAddress[0]?.address_line_3; 
        if(o.key=="BillingAddress_Country") o.value = {id:Customer_BillingAddress[0]?.country?.id, label:Customer_BillingAddress[0]?.country?.name}; 
        if(o.key=="BillingAddress_State") o.value = {id:Customer_BillingAddress[0]?.state?.id, label:Customer_BillingAddress[0]?.state?.name}; 
        if(o.key=="BillingAddress_District") o.value =  Customer_BillingAddress[0]?.city; 
        if(o.key=="BillingAddress_Zipcode") o.value = Customer_BillingAddress[0]?.pin_code; 
        return o;})
      setCustomerBillingAddressFields(newCustomerBillingAddressFields);
 
      
      var nweselectedProductData=[];
      if(CreditNoteViewdata.credit_note_line_items)
      nweselectedProductData = CreditNoteViewdata.credit_note_line_items.map(o=>{return{
        id:o?.product_variant_id,
        sku_id:{id:o?.product_variant_id, label:o?.product_variant?.sku_id},
        //sku_id:o.product_details.sku_id,
        product_template_id:o?.product_template_id,
        product_name:o?.product_variant?.product_name,
        // "warehouse_id": 1,
        // "inventory_id": 1,
        uom: {name:{id:o?.uom?.id, label:o?.uom?.name}}, 
        "Quantity": parseInt(o.quantity),
        "selling_price": parseFloat(o.price),
        "discount": parseFloat(o.discount),
        product_pricing_details:{tax_options:o.tax},
        "Amount": o.amount,
        //"Payment_Terms":o.product_details.Payment_Terms
      }});
      setSelectedProductData(nweselectedProductData);
  
      var newAdditionalInformationFields=AdditionalInformationFields;
      newAdditionalInformationFields.find(o=>o.key=="Additional_Information_Note").value = CreditNoteViewdata?.internal_notes;
      newAdditionalInformationFields.find(o=>o.key=="Additional_Information_Terms_Conditions").value = CreditNoteViewdata?.terms_and_conditions;
      setAdditionalInformationFields(newAdditionalInformationFields)
  
      if(CreditNoteViewdata)
      setPaymentDetailsFields({...paymentDetailsFields, subTotal:CreditNoteViewdata?.sub_total, adjustment_amount:CreditNoteViewdata?.adjustments, tax:CreditNoteViewdata?.tax, "shippingCharge":parseFloat(CreditNoteViewdata?.shipping_charge??0), "vender_credits":CreditNoteViewdata?.customer_credits, total:CreditNoteViewdata?.total_amount})

        
        newMainData=[ 
          ...newSalesOrderDetailsFields,
          ...newCustomerShippingAddressFields,
           ...newCustomerBillingAddressFields, 
           ...nweselectedProductData,  
           ...newAdditionalInformationFields
        ];
      var keyValuePairMainData={"newEstimated_Cost":0, "Estimated_Cost_Select":PurchaseOrderViewdata.shipping_carrier_id};

      newMainData.map(o=>{
        if(o.key=="Schedule_Pickup_time"){
          o.value.map(p=> {keyValuePairMainData[p.key]=p.value;})
        }
        else if(o.key!=null){
          keyValuePairMainData[o.key]=o.value;
        }
      });
      setMainData(keyValuePairMainData);
    }
  },[CreditNoteViewdata])

 //Debit Note 
 useEffect(()=>{    
  if(DebitNoteViewdata && mainData && mainData.Link_Source_Document_Type && mainData.Link_Source_Document_Type.lookup_code == "DEBIT_NOTE")
  {
    var newMainData=[];

    var newSalesOrderDetailsFields = SalesOrderDetailsFields
    .map(o=> {       
      if(o.key=="currency_id") o.value={id:DebitNoteViewdata?.currency?.id, label:DebitNoteViewdata?.currency?.currency_code}; 
      if(o.key=="reference_number") o.value=DebitNoteViewdata?.reference_id;  
      return o;})
    setSalesOrderDetailsFields(newSalesOrderDetailsFields);
  
    
    var nweselectedProductData=[];
    if(DebitNoteViewdata.debit_note_line_items)
    nweselectedProductData = DebitNoteViewdata.debit_note_line_items.map(o=>{return{
      id:o?.product_variant_id,
      sku_id:{id:o?.product_variant_id, label:o?.product_variant?.sku_id},
      //sku_id:o.product_details.sku_id,
      product_template_id:o?.product_template_id,
      product_name:o?.product_variant?.product_name,
      // "warehouse_id": 1,
      // "inventory_id": 1,
      uom: {name:{id:o?.uom?.id, label:o?.uom?.name}}, 
      "Quantity": parseInt(o.quantity),
      "selling_price": parseFloat(o.price),
      "discount": parseFloat(o.discount),
      product_pricing_details:{tax_options:o.tax},
      "Amount": o.amount,
      //"Payment_Terms":o.product_details.Payment_Terms
    }});
    setSelectedProductData(nweselectedProductData);

    var newAdditionalInformationFields=AdditionalInformationFields;
    newAdditionalInformationFields.find(o=>o.key=="Additional_Information_Note").value = DebitNoteViewdata?.internal_notes;
    newAdditionalInformationFields.find(o=>o.key=="Additional_Information_Terms_Conditions").value = DebitNoteViewdata?.terms_and_conditions;
    setAdditionalInformationFields(newAdditionalInformationFields)

    if(DebitNoteViewdata)
    setPaymentDetailsFields({...paymentDetailsFields, subTotal:DebitNoteViewdata?.sub_total, adjustment_amount:DebitNoteViewdata?.adjustments, tax:DebitNoteViewdata?.tax, "shippingCharge":parseFloat(DebitNoteViewdata?.shipping_charge??0), "vender_credits":DebitNoteViewdata?.customer_credits, total:DebitNoteViewdata?.total_amount})

      
      newMainData=[ 
        ...newSalesOrderDetailsFields, 
         ...nweselectedProductData,  
         ...newAdditionalInformationFields, 
      ];
    var keyValuePairMainData={"newEstimated_Cost":0, "Estimated_Cost_Select":PurchaseOrderViewdata.shipping_carrier_id};

    newMainData.map(o=>{
      if(o.key=="Schedule_Pickup_time"){
        o.value.map(p=> {keyValuePairMainData[p.key]=p.value;})
      }
      else if(o.key!=null){
        keyValuePairMainData[o.key]=o.value;
      }
    });
    setMainData(keyValuePairMainData);
  }
},[DebitNoteViewdata])

  return (
    <>
       {/* //Enter Purchase Invoice Details */}       
       <AddForm header={"Enter Purchase Invoice Details"} data={SalesOrderDetailsFields
       .map(field=> {  //console.log("field.key", field.key)
        switch (field.key) {        
          case 'currency_id':{
            field.data= Currencydata.map(o=> {return {id: o.id, label:o.name}}); break;}   
            case 'Link_Source_Document_Type':{
              field.data= SourceDocumentTypesData.map(o=> {return {id: o.id, label:o.display_name, lookup_code:o.lookup_code}}); break;}  
              case 'Link_Source_Document':{
                field.data= 
                ((mainData && mainData.Link_Source_Document_Type && mainData.Link_Source_Document_Type.lookup_code == "PURCHASE_ORDERS") ?
                PurchaseOrderdata.map(o=> {return {id: o.id, label:o.purchase_order_number}})
                :

                ((mainData && mainData.Link_Source_Document_Type && mainData.Link_Source_Document_Type.lookup_code == "CREDIT_NOTE") ?
                CreditNotedata.map(o=> {return {id: o.id, label:o.credit_note_id}})
                :

                ((mainData && mainData.Link_Source_Document_Type && mainData.Link_Source_Document_Type.lookup_code == "DEBIT_NOTE") ?
                DebitNotedata.map(o=> {return {id: o.id, label:o.debit_note_id}})
                :
                null

                ))); break;}   
          }
        return field;
       })
       } handelInputChange={handelInputChange} handelSelectonChange ={handelSelectonChange} handelCheckBoxonChange ={handelCheckBoxonChange} handelRadionButtononChange={handelRadionButtononChange}   />
 
       {/* //Customer Shipping Address */}
       <AddForm header={"Customer Shipping Address"} data={CustomerShippingAddressFields
       .map(field=> {
        switch (field.key) {
          case 'ShippingAddress_Country':{
            field.data= Countrydata.map(o=> {return {id: o.id, label:o.name}}); break;}
          case 'ShippingAddress_State':{
            field.data= Statedata.map(o=> {return {id: o.id, label:o.name}}); break;}
           }
        return field;
       })
       } handelInputChange={handelInputChange} handelSelectonChange ={handelSelectonChange} handelCheckBoxonChange ={handelCheckBoxonChange} handelRadionButtononChange={handelRadionButtononChange}   />
  
       {/* //Customer Billing Address */}
       <AddForm header={"Customer Billing Address"} data={CustomerBillingAddressFields
      .map(field=> {
        switch (field.key) {
          case 'BillingAddress_Country':{
            field.data= Countrydata.map(o=> {return {id: o.id, label:o.name}}); break;}
          case 'BillingAddress_State':{
            field.data= Statedata.map(o=> {return {id: o.id, label:o.name}}); break;}
           }
        return field;
       })
       } handelInputChange={handelInputChange} handelSelectonChange = {handelSelectonChange} handelCheckBoxonChange ={handelCheckBoxonChange} handelRadionButtononChange={handelRadionButtononChange} IsCheckboxShowForCopyField={true} CheckboxShowForCopyField_text={"same as shipping address"}  CheckboxShowForCopyField_value={CheckboxShowForCopyField_value} handelCheckboxShowForCopyField_valueChange ={handelCheckboxShowForCopyField_valueChange}  />
  
       {/* //Vendor Details */}
       <AddForm header={"Vendor Details"} data={VendorDetailsFields
          .map(field=> {
            switch (field.key) {
              case 'Vendor_Contact':{
                field.data= Vendorsdata.map(o=> {return {id: o.id, label:o.name}}); break;}  
               }
            return field;
           })
        } handelInputChange={handelInputChange} handelSelectonChange ={handelSelectonChange} handelCheckBoxonChange ={handelCheckBoxonChange} setRadioType={setRadioType} IsCheckboxShowForCopyField={true} CheckboxShowForCopyField_text={"Is Dropshipping Order"}  CheckboxShowForCopyField_value={false} handelCheckboxShowForCopyField_valueChange ={handelCheckboxShowForCopyField_valueChange} Islabel_priceSpace={false}  />
   
  
        {/* //Payment Terms */}
        <AddForm header={"Payment Terms"} data={PaymentTermsFields
         .map(field=> {
          switch (field.key) {
            case 'PaymentTerms_PaymentTerms':{
              field.data= Lookupdata.map(o=> {return {id: o.id, label:o.display_name}}); break;} 
             }
          return field;
         })
        } handelInputChange={handelInputChange} handelSelectonChange ={handelSelectonChange} handelCheckBoxonChange ={handelCheckBoxonChange} handelRadionButtononChange={handelRadionButtononChange} IsCheckboxShowForCopyField={true} CheckboxShowForCopyField_text={"set common payment term for the entire order"}  CheckboxShowForCopyField_value={false} handelCheckboxShowForCopyField_valueChange ={handelCheckboxShowForCopyField_valueChange}  />
   

        {/* //Product Details */}      
         {/* <RemoteViewBox_Table headCells={headCells} table_data={{}} header={"Add Products"}/>             */}
         <AddForm_Table headCells={headCells} table_data={selectedProductData} handelInputChange={handelInputChange} header={"Add Products"} renderFooter={()=>(<center style={{marginTop:10}}><Link onClick={onAddNewRaw} underline="none">+ Add Product Line</Link></center>)}/>
 

        {/* //Additional Information */}
        <AddForm header={"Additional Information"} data={AdditionalInformationFields 
            } handelInputChange={handelInputChange} handelSelectonChange ={handelSelectonChange} handelCheckBoxonChange ={handelCheckBoxonChange} handelRadionButtononChange={handelRadionButtononChange} IsCheckboxShowForCopyField={false} handelCheckboxShowForCopyField_valueChange ={handelCheckboxShowForCopyField_valueChange}  />
    
        <AddFormFooter header={"Payment Details"} subtotal={paymentDetailsFields.subTotal} tax={paymentDetailsFields.tax} shippingcharges={paymentDetailsFields.shippingCharge} handelSelectonChange={handelSelectonChange} handelInputChange={handelInputChange} total={paymentDetailsFields.total}/>
            
        <AddFormFooter_Button handleButtonClick={handleButtonClick}/>
        
        <ToastContainer />
    </>
  )
}

export default Add













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
along with this program. If not, see http://www.gnu.org/licenses/.
*/