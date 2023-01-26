import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";  
import { useHistory } from "react-router-dom";
import { Link } from "@mui/material";
import { loadCurrencyData, loadCountryData, loadStateDataById, loadPaymentTermsData, loadVendorsData, loadvendorsDataById, loadProductVariantData, loadUOMData, Save_Sales_Order_Data, loadSalesDataById, Update_Sales_Order_Data, loadContactsData } from "../redux/action";
import ModalView_Table from "Remote/ModalView_Table";
import AddForm from "Remote/AddForm";
import AddFormFooter from "Remote/AddFormFooter";
import AddFormFooter_Button from "Remote/AddFormFooter_Button";
import AddForm_Table from 'Remote/AddForm_Table';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";

function SalesAdd(props) {
  const navigate = useHistory();
  let dispatch = useDispatch();
  const { Currencydata, Countrydata, Statedata, Lookupdata, Vendorsdata, Vendorsdata_Details, productVariantData, uomData, SalesMsg, salesdata, contactsdata, contactsdata_meta } = useSelector((state) => state.data);    
  const [paymentDetailsFields, setPaymentDetailsFields] = useState({subTotal:0, tax:0, shippingCharge:0, adjustment_text:"", Final_Adjustment:"+", adjustment_amount:0, totalBeforeAdjustment:0, total:0});
  const [params, setParams] = useState({ limit: 10, offset: 1, filters:null, sort:null});  
  const [ContactModalOpen, setContactModalOpen] = useState(false);
  const [ContactData, setContactData] = useState(false);
  useEffect(() => {     
    dispatch(loadCurrencyData());
    dispatch(loadCountryData()); 
    dispatch(loadPaymentTermsData("payment_terms")); 
    dispatch(loadVendorsData()); 
    dispatch(loadProductVariantData({limit: 10, offset: 1, filters:null, sort:null}));
    dispatch(loadUOMData());
    if(props && props.id){
      const{id}=props;
      dispatch(loadSalesDataById(id));
    }
  }, []); 
 

  useEffect(()=>{
    if(props && props.id && salesdata){
      console.log("salesdata", salesdata);
      var newMainData=[];

      var newSalesOrderDetailsFields = SalesOrderDetailsFields
      .map(o=> {
        if(o.key=="sales_order_number") o.value=salesdata?.sales_order_number; 
        if(o.key=="reference_number") o.value=salesdata?.reference_number; 
        if(o.key=="currency_id") o.value={id:salesdata?.currency_id, label:salesdata?.currency?.name}; 
        return o;})
      setSalesOrderDetailsFields(newSalesOrderDetailsFields);
     
      

      var newCustomerShippingAddressFields = CustomerShippingAddressFields
      .map(o=> {
        if(o.key=="ShippingAddress_Receiver_Name") o.value=salesdata.customer_shipping_address?.contact_person_name; 
        if(o.key=="ShippingAddress_Mobile_Number") o.value=salesdata.customer_shipping_address?.contact_person_number; 
        if(o.key=="ShippingAddress_Email") o.value=salesdata.customer_shipping_address?.email; 
        if(o.key=="ShippingAddress_address_line_1") o.value=salesdata.customer_shipping_address?.address_line_1; 
        if(o.key=="ShippingAddress_address_line_2") o.value=salesdata.customer_shipping_address?.address_line_2; 
        if(o.key=="ShippingAddress_address_line_3") o.value=salesdata.customer_shipping_address?.address_line_3; 
        if(o.key=="ShippingAddress_Country") o.value=salesdata.customer_shipping_address?.country; 
        if(o.key=="ShippingAddress_State") o.value=salesdata.customer_shipping_address?.state; 
        if(o.key=="ShippingAddress_District") o.value=""; 
        if(o.key=="ShippingAddress_Zipcode") o.value=salesdata.customer_shipping_address?.pin_code;
        return o;})
      setCustomerShippingAddressFields(newCustomerShippingAddressFields);

      var newCustomerBillingAddressFields = CustomerBillingAddressFields
      .map(o=> {
        if(o.key=="BillingAddress_Receiver_Name") o.value=salesdata.customer_billing_address?.contact_person_name; 
        if(o.key=="BillingAddress_Mobile_Number") o.value=salesdata.customer_billing_address?.contact_person_number; 
        if(o.key=="BillingAddress_Email") o.value=salesdata.customer_billing_address?.email; 
        if(o.key=="BillingAddress_address_line_1") o.value=salesdata.customer_billing_address?.address_line_1; 
        if(o.key=="BillingAddress_address_line_2") o.value=salesdata.customer_billing_address?.address_line_2; 
        if(o.key=="BillingAddress_address_line_3") o.value=salesdata.customer_billing_address?.address_line_3; 
        if(o.key=="BillingAddress_Country") o.value=salesdata.customer_billing_address?.country; 
        if(o.key=="BillingAddress_State") o.value=salesdata.customer_billing_address?.state; 
        if(o.key=="BillingAddress_District") o.value=""; 
        if(o.key=="BillingAddress_Zipcode") o.value=salesdata.customer_billing_address?.pin_code; 
        return o;})
      setCustomerBillingAddressFields(newCustomerBillingAddressFields);

      var newPaymentTermsFields = PaymentTermsFields
      .map(o=> { 
        if(o.key=="PaymentTerms_Payment_Due_Date") o.value= moment(salesdata?.payment_due_date).format("YYYY-MM-DD");
        if(o.key=="PaymentTerms_PaymentTerms") o.value={id:salesdata?.payment_terms?.id, label:salesdata?.payment_terms?.display_name};
        return o;})
      setPaymentTermsFields(newPaymentTermsFields);
      
      var nweselectedProductData=[];
      if(salesdata.sales_order_lines)
      nweselectedProductData=salesdata.sales_order_lines.map(o=>{return{
        sku_id:{id:o.product_id, label:o.product_details?.sku_id},
        product_template_id:o.product_template_id,
        // "warehouse_id": 1,
        // "inventory_id": 1,
        uom: {name:{id:o.uom_id, label:o.uom?.name}},
        serial_number: o.serial_number,
        "Quantity": parseInt(o.quantity),
        "selling_price": parseFloat(o.price),
        "discount": parseFloat(o.discount),
        product_pricing_details:{tax_options:o.tax},
        "Amount": o.amount,
        "Payment_Terms":o.payment_term_id
      }});
      setSelectedProductData(nweselectedProductData);
      
      var newVendorDetailsFields = VendorDetailsFields;
      newVendorDetailsFields.find(o=> o.key=="Vendor_Contact").value=salesdata.vendor_details?.vendor_contact;
      newVendorDetailsFields.filter(o=> o.key=="Vendor_Delivery_Charges").map(o=> {o.value=salesdata.vendor_details?.vendor_delivery_charges; return o;});
      newVendorDetailsFields.find(o=> o.key=="Vendor_Lead_Time").value="";
      newVendorDetailsFields.find(o=> o.key=="Vendor_Details_card").value=
      [
        {
          label: "Location Name",
          type: "label",  
          key: "Vendor_Location", 
          value:salesdata.vendor_details?.vendor_locations?.vendor_shipping_address?.address_line_1
        }, 
        {
          label: "Registered Address",
          type: "label",  
          key: "Vendor_Location", 
          value:salesdata.vendor_details?.vendor_locations?.vendor_shipping_address?.address_line_2
        }, 
        {
          label: "Location Incharge",
          type: "label",  
          key: "Vendor_Location", 
          value:salesdata.vendor_details?.vendor_locations?.vendor_shipping_address?.address_line_3
        },
        {
          label: "Location Incharge",
          type: "label",  
          key: "Vendor_Location", 
          value:salesdata.vendor_details?.vendor_locations?.vendor_shipping_address?.city
        }, 
      ];
      setVendorDetailsFields(newVendorDetailsFields);

      var newAdditionalInformationFields=AdditionalInformationFields;
      newAdditionalInformationFields.find(o=>o.key=="Additional_Information_Note").value=salesdata.additional_information?.notes;
      newAdditionalInformationFields.find(o=>o.key=="Additional_Information_Terms_Conditions").value=salesdata.additional_information?.terms_and_conditions;
      setAdditionalInformationFields(newAdditionalInformationFields)

      if(salesdata && salesdata.so_payment_details)
        setPaymentDetailsFields({...paymentDetailsFields, subTotal:salesdata.so_payment_details.sub_total, adjustment_amount:salesdata.so_payment_details.adjustment_amount, tax:salesdata.so_payment_details.tax, shippingCharge:parseFloat(salesdata.vendor_details?.vendor_delivery_charges), total:salesdata.so_payment_details.total_amount})

        newMainData=[ 
          ...newSalesOrderDetailsFields,
          ...newCustomerShippingAddressFields,
          ...newCustomerBillingAddressFields,
          ...newPaymentTermsFields,
          ...nweselectedProductData,
          ...newVendorDetailsFields,
          ...newAdditionalInformationFields
        ];
       var keyValuePairMainData={};
       newMainData.map(o=>{
        if(o.key && o.key=="Vendor_Details_card"){
          o.value.map(p=> {keyValuePairMainData[p.key]=p.value;})
        }
        else if(o.key!=null){
          keyValuePairMainData[o.key]=o.value;
        }
      });
      console.log("newMainData", newMainData, keyValuePairMainData);
      setMainData(keyValuePairMainData);
    }
    
  },[salesdata])


  const setDataByKeyAndValue = (key, value, index=null) => {
    
      console.log("key", key, "value", value);
       
      if(index!=null){
        try{
        var newSelectedProductData=selectedProductData;
        
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
        }
        catch(e){console.error("err1", e)}
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
      
      // var nweselectedProductData=salesdata.sales_order_lines && salesdata.sales_order_lines.map(o=>{return{
      //   sku_id:{id:o.product_id, label:o.product_id},
      //   product_template_id:o.product_template_id,
      //   // "warehouse_id": 1,
      //   // "inventory_id": 1,
      //   uom: {name:{id:o.uom_id, label:o.uom_id}},
      //   serial_number: o.serial_number,
      //   "Quantity": parseInt(o.quantity),
      //   "selling_price": parseFloat(o.price),
      //   "discount": parseFloat(o.discount),
      //   product_pricing_details:{tax_options:o.tax},
      //   "Amount": o.amount,
      //   "Payment_Terms":o.payment_term_id
      // }});
      // setSelectedProductData(nweselectedProductData);
      
       try{
      var newAdditionalInformationFields = AdditionalInformationFields
      .map(o=> {
        if(o.key==key) o.value=value; 
        return o;})
      setAdditionalInformationFields(newAdditionalInformationFields) 
    }
    catch(e){console.error("err1", e)}


    try{
      //"Vendor_Contact", "Vendor_Delivery_Charges","Vendor_Lead_Time"
      var newVendorDetailsFields=VendorDetailsFields
      .map(o=> {
        if(o.key==key) o.value=value; 
        return o;})
      setVendorDetailsFields(newVendorDetailsFields);
    }
    catch(e){console.error("err1", e)}


    try{
      if(key == "Vendor_Delivery_Charges"){
        var nvalue=0;
        if(value) nvalue=parseFloat(value)
        
        var newpaymentDetailsFields=paymentDetailsFields;
        newpaymentDetailsFields.shippingCharge=nvalue;
        setPaymentDetailsFields(newpaymentDetailsFields);
         
      }

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
  // const testData=()=>{
  //   var newCustomerShippingAddressFields= CustomerShippingAddressFields.map(o=> {if(o.key=="ShippingAddress_Receiver_Name") o.value=salesdata.customer_shipping_address.contact_person_name; return o;})
  //   setCustomerShippingAddressFields(newCustomerShippingAddressFields);
  //   console.log("salesdata", salesdata);
  // }
  const[selectedProductData, setSelectedProductData]=useState([{Quantity:0, selling_price:0, discount:0, product_pricing_details:{tax_options:0}}]);
  
  const [SalesOrderDetailsFields, setSalesOrderDetailsFields] = useState([
    {
      label: "Sales Order ID",
      type: "input", 
      key: "sales_order_number", 
    },
    {
      label: "Auto Generate Sales Order ID",
      type: "checkbox", 
      key: "Auto_sales_order_number",
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
      label: "Sales Order Currency",
      type: "select", 
      key: "currency_id", 
      // data: ["USD", "INR"], 
      defaultVal: {},
    },
    
  ]);

  const [CustomerShippingAddressFields, setCustomerShippingAddressFields] = useState([
    {
      label: "Receiver Name",
      type: "input", 
      key: "ShippingAddress_Receiver_Name"
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

  const [VendorDetailsFields, setVendorDetailsFields] = useState([       
    {
      label: "Vendor Contact",
      type: "select", 
      key: "Vendor_Contact", 
    },
    {
      label: "Vendor Delivery Charges",
      type: "input", 
      key: "Vendor_Delivery_Charges", 
    },  
    {
      label: "Vendor Lead Time",
      type: "input", 
      key: "Vendor_Lead_Time", 
    },  
    {
      label: "Vendor Details",
      type: "card", 
      key: "Vendor_Details_card",
      value: [
        {
          label: "Location Name",
          type: "label",  
          key: "Vendor_Location", 
          value:""
        }, 
        {
          label: "Registered Address",
          type: "label",  
          key: "Vendor_Location", 
          value:""
        }, 
        {
          label: "Location Incharge",
          type: "label",  
          key: "Vendor_Location", 
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

  const[mainData, setMainData]=useState({});

  const onAddNewRaw = () =>{
    setSelectedProductData([...selectedProductData,{Quantity:0, selling_price:0, discount:0, product_pricing_details:{tax_options:0}}]);
  }

  const headCells = [
    {
      key: "sku_id", 
      label: "Product SKU",
      type: "select",
      data: useSelector((state) => state.data.productVariantData.map(o=>{return{id:o.id, label:o.sku_id}})),
      style:{width:200}
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
 

  const handelInputChange = (key, value, index=null) => {
    console.log("key", key, "value", value, "index", index);
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
    //calculation
    if(selectedProductData){
      var taxval = selectedProductData[0].product_pricing_details?.tax_options; 
      setPaymentDetailsFields({...paymentDetailsFields, tax:taxval});    
      var val1=selectedProductData.map(o=>o.Amount).reduce((previousValue, currentValue)=> {return previousValue+currentValue});      
      var subTotal=val1+(paymentDetailsFields.shippingCharge??0);       
      var newtotal=0;
    
      if(paymentDetailsFields.adjustment_amount){
        if(paymentDetailsFields.Final_Adjustment=="+"){
          newtotal=subTotal+paymentDetailsFields.adjustment_amount;
        }
        else{
          newtotal=subTotal-paymentDetailsFields.adjustment_amount;
        }
      }
      else{
        newtotal=subTotal;
      }
      setPaymentDetailsFields({...paymentDetailsFields, tax:taxval, subTotal:subTotal, total:newtotal});
    }
  }
  useEffect(() => {
    dispatch(loadContactsData(params));
  }, [params]);

  const handleButtonClick = (key) =>{  
    console.log("handleButtonClick", key)
    if(key == "Search From Contacts")
    {
      dispatch(loadContactsData(params));
      setContactModalOpen(true);
      return;
    }
    if(key == "Confirm")
    {
      // console.log("ContactData", ContactData)
      var shipingdata = [{
        label: "Receiver Name",
        type: "input", 
        key: "ShippingAddress_Receiver_Name",
        value: ContactData && ContactData.address_details[0] && ContactData.address_details[0].contact_person_name
      },
      {
        label: "Mobile Number",
        type: "input", 
        key: "ShippingAddress_Mobile_Number",
        value: ContactData && ContactData.address_details[0] && ContactData.address_details[0].contact_person_number
      },
      {
        label: "Email",
        type: "input", 
        key: "ShippingAddress_Email",  
        value: ContactData && ContactData.primary_email //not available in payload
      },
      {
        label: "Address Line 1",
        type: "input", 
        key: "ShippingAddress_address_line_1", 
        value: ContactData && ContactData.address_details[0] && ContactData.address_details[0].address_line_1
      },
      {
        label: "Address Line 2",
        type: "input", 
        key: "ShippingAddress_address_line_2", 
        value: ContactData && ContactData.address_details[0] && ContactData.address_details[0].address_line_2 
      },
      {
        label: "Address Line 3",
        type: "input", 
        key: "ShippingAddress_address_line_3", 
        value: ContactData && ContactData.address_details[0] && ContactData.address_details[0].address_line_3
      },
      {
        label: "Country",
        type: "select", 
        key: "ShippingAddress_Country",  
        value: {id:ContactData && ContactData.address_details[0] && ContactData.address_details[0].country && ContactData.address_details[0].country.id, label:ContactData && ContactData.address_details[0] && ContactData.address_details[0].country && ContactData.address_details[0].country.name}
      },
      {
        label: "State",
        type: "select", 
        key: "ShippingAddress_State",  
        value: ContactData && ContactData.address_details[0] && ContactData.address_details[0].country && ContactData.address_details[0].state.name
      },
      {
        label: "City/District",
        type: "input", 
        key: "ShippingAddress_District", 
        value: ContactData && ContactData.address_details[0] && ContactData.address_details[0].city
      }, 
      {
        label: "Zipcode",
        type: "input", 
        key: "ShippingAddress_Zipcode", 
        value: ContactData && ContactData.address_details[0] && ContactData.address_details[0].pin_code
      },]
      setCustomerShippingAddressFields(shipingdata);
      var newMainData=mainData;
      shipingdata.map(o=> newMainData[o.key]=o.value);
      setMainData(newMainData);
      setContactModalOpen(false);
      return;
    }
    if(key=="Cancel"){
      navigate.push("/salesOrders"); 
      return;
    } 
    var Vendor_Details_card = VendorDetailsFields.find(o=> o.key=='Vendor_Details_card').data;    
    var body ={ 
      "id":props && props.id?parseInt(props.id):0,
      "reference_number": mainData.reference_number,
      "so_date": new Date(),
      "currency_id": mainData.currency_id?.id,
      "customer_name": mainData.ShippingAddress_Receiver_Name,
      "channel_name": "Flipkart",
      "payment_type_id": 37,
      "vendor_details": {
          "vendor_contact":mainData.Vendor_Contact?.label,
          "vendor_delivery_charges": mainData.Vendor_Delivery_Charges,
          "vendor_locations": {
              "vendor_shipping_address": Vendor_Details_card && Vendor_Details_card.primary_contact && Vendor_Details_card.primary_contact.address_details ? Vendor_Details_card.primary_contact.address_details[0]:false,
              "vendor_billing_address": Vendor_Details_card && Vendor_Details_card.primary_contact && Vendor_Details_card.primary_contact.address_details ? Vendor_Details_card.primary_contact.address_details[0]:false
          },
          "vendor_credits": 0
      },
      "invoiced_id": 122,
      "payment_received_id": 117,
      "payment_amount": 200,
      "payment_terms_id": mainData?.PaymentTerms_PaymentTerms?.id,
      "payment_due_date": "2022-06-30T22:19:32.8080397+05:30",
      "expected_shipping_date": "2022-06-12T22:19:32.8080397+05:30",
      "customer_shipping_address": {
          "pin_code": mainData.ShippingAddress_Zipcode,
          "land_mark": "",
          "gst_in_number": "",
          "location_name": "",
          "address_line_1": mainData.ShippingAddress_address_line_1,
          "address_line_2": mainData.ShippingAddress_address_line_2,
          "address_line_3": mainData.ShippingAddress_address_line_3,
          "contact_person_name":  mainData.ShippingAddress_Receiver_Name,
          "contact_person_number": mainData.ShippingAddress_Mobile_Number,
          "email": mainData.ShippingAddress_Email,
          "state": mainData.ShippingAddress_State?.label,
          "country": mainData.ShippingAddress_Country?.label,
      },
      "customer_billing_address": {
        "pin_code": mainData.BillingAddress_Zipcode,
        "land_mark": "",
        "gst_in_number": "",
        "location_name": "",
        "address_line_1": mainData.BillingAddress_address_line_1,
        "address_line_2": mainData.BillingAddress_address_line_2,
        "address_line_3": mainData.BillingAddress_address_line_3,
        "contact_person_name":  mainData.BillingAddress_Receiver_Name,
        "contact_person_number": mainData.BillingAddress_Mobile_Number,
        "email": mainData.BillingAddress_Email,
        "state": mainData.BillingAddress_State?.label,
        "country": mainData.BillingAddress_Country?.label,
      },
      "additional_information": {
          "notes":mainData.Additional_Information_Note,
          "terms_and_conditions": mainData.Additional_Information_Terms_Conditions,
          // "attachments": {
          //     "id": 1,
          //     "name": ""
          // }
      }, 
      "so_payment_details": {
          "available_customer_credits": 0,
          "use_credits_for_payment": false,
          "sub_total": paymentDetailsFields.subTotal,
          "tax": parseFloat(paymentDetailsFields.tax),
          "shipping_charges":parseFloat(paymentDetailsFields.shippingCharge),
          "adjustments": paymentDetailsFields.adjustment_amount,
          "total_amount":paymentDetailsFields.total
      },
      sales_order_lines:selectedProductData.map(o=>{return{
        "product_id": o.id,
        "product_template_id": o.product_template_id,
        "warehouse_id": 1,
        "inventory_id": 1,
        "uom_id": o.uom.id,
        "serial_number": o.serial_number,
        "quantity": parseInt(o.Quantity),
        "price": parseFloat(o.selling_price),
        "discount": parseFloat(o.discount),
        "tax": parseFloat(o.product_pricing_details.tax_options),
        "amount": o.Amount,
        "payment_term_id":parseInt(o.Payment_Terms)
      }}),
      
      "status_id": 235 // 235 draft, id 236 new
    }  

    if(props && props.id){
      dispatch(Update_Sales_Order_Data(props.id, body, function(resp){ 
        toast(resp)
      }));
    }
    else{
      dispatch(Save_Sales_Order_Data(body, function(resp){ 
        toast(resp)
      }));
    }

  };

  const [Country, setCountry] = useState();

  const handelSelectonChange = (key, value) => {    
    console.log("key", key) 
    console.log("value", value); 
    if(key == "id")
    {
      var sdata = contactsdata.find(o=> o.id == value); 
      setContactData(sdata);
    }
    
    if(key == "ShippingAddress_Country" || key == "BillingAddress_Country")
    {
      setCountry(value.id);
      dispatch(loadStateDataById(value.id));
    }
    if(key == "Vendor_Contact")
    {
      //dispatch(loadvendorsDataById(value.id));
      var singleVendorsdata=Vendorsdata.find(o=>o.id==value.id);
      var Vendor_Details_card=VendorDetailsFields.find(o=> o.key=='Vendor_Details_card');
      
      //var newVendorDetailsFields=VendorDetailsFields.filter(o=>o.key!='Vendor_Details_card');

      Vendor_Details_card.value=[{
        label: "Location Name",
        type: "label",  
        key: "Vendor_Location", 
        value:(singleVendorsdata && singleVendorsdata.contact && singleVendorsdata.contact.address_details[0] && singleVendorsdata.contact.address_details[0].location_name)
      }, 
      {
        label: "Registered Address",
        type: "label",  
        key: "Vendor_Location", 
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
        key: "Vendor_Location", 
        value:(singleVendorsdata && singleVendorsdata.name)
      }];
      Vendor_Details_card.data=singleVendorsdata;
      //newVendorDetailsFields.push(Vendor_Details_card);
     
      var sData=VendorDetailsFields.map(o=>{
        if(o.key=='Vendor_Details_card') o.value=Vendor_Details_card.value; 
        if(o.key=='Vendor_Contact') o.value=value; 
        return o;} )
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
      case"PaymentTerms_PaymentTerms":{
        setPaymentTermsFields(PaymentTermsFields.map(o=>{if(o.key==key) return{...o, value:value}; return o}));
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

  const setRadioType = (prop, value) => { 
  };

   
  const handelCheckBoxonChange = (field) => { 
    console.log("onCheckboxChanges", field);
    
    if(field.key == "Auto_sales_order_number")
    {
      var neworder=SalesOrderDetailsFields.map(o=>{if(o.key=='sales_order_number') o.disabled=!field.isChecked; return o;})
      setSalesOrderDetailsFields(neworder)
    }

    if(field.key == "Auto_reference_number")
    {
      var neworder=SalesOrderDetailsFields.map(o=>{if(o.key=='reference_number') o.disabled=!field.isChecked; return o;})
      setSalesOrderDetailsFields(neworder)
    }

    var newState = SalesOrderDetailsFields.map(o=>{if(o.key==field.key) {o.isChecked=!o.isChecked;} return o})
    setSalesOrderDetailsFields(newState)

    // var newState = SalesOrderDetailsFields.map(o=>{if(o.key==field.key) {o.isChecked=!o.isChecked;} return o})
    // setSalesOrderDetailsFields(newState)
  };
 
  const[CheckboxShowForCopyField_value, setCheckboxShowForCopyField_value]=useState(false);
  const handelCheckboxShowForCopyField_valueChange =(field) =>{
    console.log("onCheckboxChanges", field);
    setCheckboxShowForCopyField_value(!CheckboxShowForCopyField_value);
    
    var newCustomerBillingAddressFields=CustomerBillingAddressFields.map(o=> {
      return{
      ...o,
      value:mainData[o.key.replace("Billing", "Shipping")]
    }});

    var newMainData=mainData;
    newCustomerBillingAddressFields.map(o=> newMainData[o.key]=o.value);
    setMainData(newMainData);
    console.log("newCustomerBillingAddressFields", newCustomerBillingAddressFields)
    setCustomerBillingAddressFields(newCustomerBillingAddressFields);
    //CustomerShippingAddressFields
  }
 
const Contact_headCells = [
  {
      key: "name", 
      label: "Contact Name",
      type: "text"
  },
  {
      key: "company_name",  
      label: "Company Name",
      type: "text"
  },    
  {
    key: "primary_phone",  
    label: "Contact No.",
    type: "text"
  },  
  {
    key: "primary_email",  
    label: "Email Id",
    type: "text"
  },  
  {
    key: "contact_type.display_name",  
    label: "Contact Type",
    type: "text"
  },  
  {
    key: "id",  
    label: "Select",
    type: "radio"
  },    
];
 
const handleModalClose = (value) => {
  console.log("enter close")
  setContactModalOpen(false)
};
  return (
    <>
       {/* //Enter Sales Order Details */}       
       <AddForm header={"Enter Sales Order Details"} data={SalesOrderDetailsFields.map(field=> {
        switch (field.key) {
          case 'currency_id':
            field.data= Currencydata.map(o=> {return {id: o.id, label:o.name}})         
          }
        return field;
       })} handelInputChange={handelInputChange} handelSelectonChange ={handelSelectonChange} handelCheckBoxonChange ={handelCheckBoxonChange} setRadioType={setRadioType}   />
 
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
       } handelInputChange={handelInputChange} handelSelectonChange ={handelSelectonChange} handelCheckBoxonChange ={handelCheckBoxonChange} setRadioType={setRadioType} IsButtonShow={true} ButtonText={"Search From Contacts"} handleButtonClick={handleButtonClick}  />
 
 
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
       } handelInputChange={handelInputChange} handelSelectonChange = {handelSelectonChange} handelCheckBoxonChange ={handelCheckBoxonChange} setRadioType={setRadioType} IsCheckboxShowForCopyField={true} CheckboxShowForCopyField_text={"same as shipping address"}  CheckboxShowForCopyField_value={CheckboxShowForCopyField_value} handelCheckboxShowForCopyField_valueChange ={handelCheckboxShowForCopyField_valueChange}  />
  
  
        {/* //Payment Terms */}
        <AddForm header={"Payment Terms"} data={PaymentTermsFields
         .map(field=> {
          switch (field.key) {
            case 'PaymentTerms_PaymentTerms':{
              field.data= Lookupdata.map(o=> {return {id: o.id, label:o.display_name}}); break;} 
             }
          return field;
         })
        } handelInputChange={handelInputChange} handelSelectonChange ={handelSelectonChange} handelCheckBoxonChange ={handelCheckBoxonChange} setRadioType={setRadioType} IsCheckboxShowForCopyField={true} CheckboxShowForCopyField_text={"set common payment term for the entire order"}  CheckboxShowForCopyField_value={false} handelCheckboxShowForCopyField_valueChange ={handelCheckboxShowForCopyField_valueChange}  />
   

        {/* //Product Details */}      
         {/* <RemoteViewBox_Table headCells={headCells} table_data={{}} header={"Add Products"}/>             */}
         <AddForm_Table headCells={headCells} table_data={selectedProductData} handelInputChange={handelInputChange} header={"Add Products"} renderFooter={()=>(<center style={{marginTop:10}}><Link onClick={onAddNewRaw} underline="none">+ Add Product Line</Link></center>)}/>

        {/* //Vendor Details */}
        <AddForm header={"Vendor Details"} data={VendorDetailsFields
          .map(field=> {
            switch (field.key) {
              case 'Vendor_Contact':{
                field.data= Vendorsdata.map(o=> {return {id: o.id, label:o.name}}); break;} 
              // case 'Vendor_Details_card.Vendor_Location':{
              //   field.data= Vendorsdata_Details.map(o=> {return {id: o.Details.id, label:o.Details.vendor_details.name}}); break;} 
               }
            return field;
           })
        } handelInputChange={handelInputChange} handelSelectonChange ={handelSelectonChange} handelCheckBoxonChange ={handelCheckBoxonChange} setRadioType={setRadioType} IsCheckboxShowForCopyField={true} CheckboxShowForCopyField_text={"Is Dropshipping Order"}  CheckboxShowForCopyField_value={false} handelCheckboxShowForCopyField_valueChange ={handelCheckboxShowForCopyField_valueChange} Islabel_priceSpace={true}  />
   
     {/* //Additional Information */}
     <AddForm header={"Additional Information"} data={AdditionalInformationFields } 
     handelInputChange={handelInputChange} handelSelectonChange ={handelSelectonChange} handelCheckBoxonChange ={handelCheckBoxonChange} setRadioType={setRadioType} IsCheckboxShowForCopyField={false} handelCheckboxShowForCopyField_valueChange ={handelCheckboxShowForCopyField_valueChange}  />
    
    <AddFormFooter header={"Payment Details"} subtotal={paymentDetailsFields.subTotal} tax={paymentDetailsFields.tax} shippingcharges={paymentDetailsFields.shippingCharge} handelSelectonChange={handelSelectonChange} handelInputChange={handelInputChange} total={paymentDetailsFields.total}/>
         
    <AddFormFooter_Button handleButtonClick={handleButtonClick}/>
    
    <ToastContainer />

    <ModalView_Table   
      modalOpen={ContactModalOpen}
      handleModalClose ={handleModalClose}
      header={"Select Contact"}
      table_data={contactsdata}
      headCells={Contact_headCells}
      customOptions={{}}
      setCustomOptions={{}}
      info={contactsdata_meta.info}
      setParams={setParams}
      handleChangeDyanmicAppBar={{}}
      setId={{}}
      enablepagination={true}
      IsCheckBoxShow={false}
      IsBouttonShow={true}
      ButtonName={"Confirm"}
      handleButtonClick={handleButtonClick}
      handelSelectonChange={handelSelectonChange}
      />
    
    </>
  )
}

export default SalesAdd


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