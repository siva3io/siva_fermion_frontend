import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddForm from "Remote/AddForm";
import AddForm_Table from 'Remote/AddForm_Table';
import AddFormFooter_Button from "Remote/AddFormFooter_Button";
import { fetchSourceDocumentData } from "../../redux/Action/SourceDocumentTypeAction";
import { SearchSourceDocumentData } from "../../redux/Action/SearchSourceDocumentAction";
import { fetchProductsData } from "../../redux/Action/FetchProductListAction";
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, FormControlLabel, FormGroup, Link } from "@mui/material";
import { fetchUOMDropdown } from "../../redux/Action/UOMDropdownAction";
import { fetchPackageTypeDropDown } from "../../redux/Action/PackageTypeDropDownAction";
import { States2 } from "../../redux/Action/StatesAction";
import { Countries } from "../../redux/Action/CountriesAction";
import CreateShippingDetails from "../../components/UI/ViewParticularASN/CreateShippingDetails";
import { createAsn } from "../../redux/Action/CreateAsnAction";
import RemoteViewBox_Table from "Remote/ViewBox_Table";
import { estimatedcost } from "../../redux/Action/EstimatedCostAction";
import moment from 'moment';
import {  useParams,useNavigate } from 'react-router-dom';
import { fetchAsnDataById } from "../../redux/Action/FetchAsnDataByIDAction";
import { EditAsn } from "../../redux/Action/EditAsn";
import { FetchSOById } from "../../redux/Action/FetchSOByIdAction";
import { FetchPRById } from "../../redux/Action/FetchPRByIdAction";
import { FetchPOById } from "../../redux/Action/FetchPOByIdAction";
import { FetchISTById } from "../../redux/Action/FetchISTByIdAction";
import { deleteProductline } from "../../redux/Action/ProductDeleteAction";
// import { deleteProductline } from "../../redux/Action/ProductDeleteAction";

const ASNEdit = () => {


  const dispatch = useDispatch();
  const [inputValue, setInputvalue] = useState({});
  const [mainData, setMainData] = useState({});
  const [selectedProductData, setSelectedProductData] = useState([{ Quantity: 0, selling_price: 0, discount: 0, product_pricing_details: { tax_options: 0 } }]);
  const [paymentDetailsFields, setPaymentDetailsFields] = useState({ subTotal: 0, tax: 0, shippingCharge: 0, adjustment_text: "", adjustment_amount: 0, total: 0 });
  const { id } = useParams();
  useEffect(() => dispatch(fetchAsnDataById(id)), [id]);
  const asnData = useSelector((state) => state.fetchAsnDataById?.asn);
  const SalesViewdata = useSelector((state) => state.FetchSOById?.so);
  const purchase_returnsViewdata = useSelector((state) => state.FetchPRById?.pr);
  const purchase_ordersViewdata = useSelector((state) => state.FetchPOById?.po);
  const ISTViewdata=useSelector((state) => state.FetchISTById?.ist);
  console.log(asnData, "asnDataqq")



  const [CheckboxShowForCopyField_value, setCheckboxShowForCopyField_value] = useState(false);


  useEffect(() => dispatch(fetchProductsData()), []);

  const productVariantData = useSelector(
    (state) => state.fetchProductsData?.products
  );
  console.log(productVariantData, "productVariantData");

  // useEffect(() => dispatch(States2()), []);

  const states1 = useSelector((state) => state.States2?.states1);
  console.log(states1, "states1");
  const onAddNewRaw = () => {
    setSelectedProductData([...selectedProductData, { Quantity: 0, selling_price: 0, discount: 0, product_pricing_details: { tax_options: 0 } }]);
  }

  useEffect(() => dispatch(Countries()), []);
  const Countriesdata = useSelector((state) => state.Countries?.countries);

  var countryoptions = [];
  for (let i in Countriesdata) {
    countryoptions = countryoptions.concat(Countriesdata[i].name);
  }

  useEffect(() => dispatch(fetchUOMDropdown()), []);

  const UOM = useSelector(
    (state) => state.fetchUOMDropdown?.Uom
  );

  console.log(UOM, "UOM");

  //asn edit
  useEffect(() => {
    if (asnData) {
      console.log("asnData", asnData?.dispatch_location_details?.country?.label, "rambarre", asnData);
      var newMainData = [];
      var newASNDetailsFields = ASNDetailsFields.map(o => {
        if (o.key == "ASN_Number") o.value = asnData?.asn_number;
        // if(o.key=="auto_generate_asn_number") o.value=asnData?.asn_number;
        if (o.key == "Source_Document_Type") o.value = { id: asnData?.source_document_type_id, label: asnData?.source_document_type?.display_name }
        if (o.key == "Select_Source_Document") o.value = { id: asnData?.source_document?.id, label: asnData?.source_document?.data }
        if (o.key == "Reference_ID") o.value = asnData?.reference_number
        return o;
      })
      setASNDetailsFields(newASNDetailsFields);

      var newselectedProductData = [];
      if (asnData?.asn_order_lines) {


        newselectedProductData = asnData.asn_order_lines.map(o => {
          return {
            sku_id: { id: o.product_variant?.id, label: o.product_variant?.sku_id },
            product_name: o.product_variant?.product_name,
            // price:
            package_type: { id: o.package_type.id, label: o.package_type.display_name },
            unit_per_box: o.unit_per_box,
            Ordered_Units: o.Ordered_Units,
            uom: { id: o.uom.id, label: o.uom.name },
            package_length: o.package_length,
            package_width: o.package_width,
            package_height: o.package_height,
            package_weight: o.package_weight,
            No_of_Boxes: o.unit_per_box,
            product_template_id:o.product_id

          }
        });
      }
      console.log(newselectedProductData, "newselectedProductData11")
      setSelectedProductData(newselectedProductData);


      var newDispatchLocationFields = DispatchLocationFields
        .map(o => {
          if (o.key == "ShippingAddress_Receiver_Name") o.value = asnData.dispatch_location_details?.contact_person_name;
          if (o.key == "ShippingAddress_Mobile_Number") o.value = asnData.dispatch_location_details?.contact_person_number;
          if (o.key == "ShippingAddress_Email") o.value = asnData.dispatch_location_details?.email;
          if (o.key == "ShippingAddress_address_line_1") o.value = asnData.dispatch_location_details?.address_line_1;
          if (o.key == "ShippingAddress_address_line_2") o.value = asnData.dispatch_location_details?.address_line_2;
          if (o.key == "ShippingAddress_address_line_3") o.value = asnData.dispatch_location_details?.address_line_3;
          if (o.key == "ShippingAddress_Country") o.value = { id: asnData?.dispatch_location_details?.Country?.id, label: asnData?.dispatch_location_details?.Country?.label }
          if (o.key == "ShippingAddress_State") o.value = asnData.dispatch_location_details?.State;
          if (o.key == "ShippingAddress_District") o.value = asnData.dispatch_location_details?.district;
          if (o.key == "ShippingAddress_Zipcode") o.value = asnData.dispatch_location_details?.pin_code;
          return o;
        })
      setDispatchLocationFields(newDispatchLocationFields);

      var newCustomerBillingAddressFields = CustomerBillingAddressFields
        .map(o => {
          if (o.key == "BillingAddress_Receiver_Name") o.value = asnData.destination_location_details?.contact_person_name;
          if (o.key == "BillingAddress_Mobile_Number") o.value = asnData.destination_location_details?.contact_person_number;
          if (o.key == "BillingAddress_Email") o.value = asnData.destination_location_details?.email;
          if (o.key == "BillingAddress_address_line_1") o.value = asnData.destination_location_details?.address_line_1;
          if (o.key == "BillingAddress_address_line_2") o.value = asnData.destination_location_details?.address_line_2;
          if (o.key == "BillingAddress_address_line_3") o.value = asnData.destination_location_details?.address_line_3;
          if (o.key == "BillingAddress_Country") o.value = asnData.destination_location_details?.Country;
          if (o.key == "BillingAddress_State") o.value = asnData.destination_location_details?.State;
          if (o.key == "BillingAddress_District") o.value = asnData.destination_location_details?.district;
          if (o.key == "BillingAddress_Zipcode") o.value = asnData.destination_location_details?.pin_code;
          return o;
        })
      setCustomerBillingAddressFields(newCustomerBillingAddressFields);



      var newDateandTime = DateandTime
        .map(o => {
          if (o.key == "Schedule_Scrap_Date") o.value = moment(asnData.schedule_pickup_date).format("YYYY-MM-DD");
          if (o.key == "Schedule_Pickup_time") o.value = o.value.map(p => {
            if (p.key == "Schedule_Pickup_time_from") p.value = moment(asnData.schedule_pickup_from_time );
            if (p.key == "Schedule_Pickup_time_to") p.value = moment(asnData.schedule_pickup_to_time);
            return p;
          })

          // if (o.key == "Schedule_Scrap_Date") o.value = moment(SRData.pickup_date_and_time?.pickup_date).format("YYYY-MM-DD");
          // if (o.key == "Schedule_Pickup_time") o.value = o.value.map(p => {
          //     if (p.key == "Schedule_Pickup_time_from") p.value = moment(SRData.pickup_date_and_time?.pickup_from_time);
          //     if (p.key == "Schedule_Pickup_time_to") p.value = moment(SRData.pickup_date_and_time?.pickup_to_time);
          //     return p;
          // })




          return o;
        })
      setDateandTime(newDateandTime);


      if (asnData) {

        newMainData = [
          ...newASNDetailsFields,
          ...newDispatchLocationFields,
          ...newCustomerBillingAddressFields,
          ...newDateandTime
        ];
        var keyValuePairMainData = {};

        newMainData.map(o => {
          if (o.key == "Schedule_Pickup_time") {
            o.value.map(p => { keyValuePairMainData[p.key] = p.value; })
          }
          else if (o.key != null) {
            keyValuePairMainData[o.key] = o.value;
          }
        });
        setMainData(keyValuePairMainData);
      }



    }
    console.log(mainData, "mainDataeeee")


  }, [asnData])

    //Sales Order 
    useEffect(() => {
      if (SalesViewdata && mainData && mainData.Select_Source_Document && mainData.Source_Document_Type?.id?.lookup_code == "SALES_ORDERS") {
        var newMainData = [];
  
        var newASNDetailsFields = ASNDetailsFields
          .map(o => {
            if (o.key == "Reference_ID") o.value = SalesViewdata?.reference_number;
            return o;
          })
        setASNDetailsFields(newASNDetailsFields);
  
        var newDispatchLocationFields = DispatchLocationFields
          .map(o => {
            if (o.key == "ShippingAddress_Receiver_Name") o.value = SalesViewdata?.customer_shipping_address?.contact_person_name;
            if (o.key == "ShippingAddress_Mobile_Number") o.value = SalesViewdata?.customer_shipping_address?.contact_person_number;
            if (o.key == "ShippingAddress_Email") o.value = SalesViewdata?.customer_shipping_address?.email;
            if (o.key == "ShippingAddress_address_line_1") o.value = SalesViewdata?.customer_shipping_address?.address_line_1;
            if (o.key == "ShippingAddress_address_line_2") o.value = SalesViewdata?.customer_shipping_address?.address_line_2;
            if (o.key == "ShippingAddress_address_line_3") o.value = SalesViewdata?.customer_shipping_address?.address_line_3;
            if (o.key == "ShippingAddress_Country") o.value = SalesViewdata?.customer_shipping_address?.country;
            if (o.key == "ShippingAddress_State") o.value = SalesViewdata?.customer_shipping_address?.state;
            //if(o.key=="ShippingAddress_District") o.value="??"; 
            if (o.key == "ShippingAddress_Zipcode") o.value = SalesViewdata?.customer_shipping_address?.pin_code;
            return o;
          })
        setDispatchLocationFields(newDispatchLocationFields);
  
  
        var newCustomerBillingAddressFields = CustomerBillingAddressFields
          .map(o => {
            if (o.key == "BillingAddress_Receiver_Name") o.value = SalesViewdata?.customer_billing_address?.contact_person_name;
            if (o.key == "BillingAddress_Mobile_Number") o.value = SalesViewdata?.customer_billing_address?.contact_person_number;
            if (o.key == "BillingAddress_Email") o.value = SalesViewdata?.customer_billing_address?.email;
            if (o.key == "BillingAddress_address_line_1") o.value = SalesViewdata?.customer_billing_address?.address_line_1;
            if (o.key == "BillingAddress_address_line_2") o.value = SalesViewdata?.customer_billing_address?.address_line_2;
            if (o.key == "BillingAddress_address_line_3") o.value = SalesViewdata?.customer_billing_address?.address_line_3;
            if (o.key == "BillingAddress_Country") o.value = SalesViewdata?.customer_billing_address?.country;
            if (o.key == "BillingAddress_State") o.value = SalesViewdata?.customer_billing_address?.state;
            //if(o.key=="BillingAddress_District") o.value="??"; 
            if (o.key == "BillingAddress_Zipcode") o.value = SalesViewdata?.customer_billing_address?.pin_code;
            return o;
          })
        setCustomerBillingAddressFields(newCustomerBillingAddressFields);
  
        // var newPaymentTermsFields = PaymentTermsFields
        // .map(o=> {
        //   if(o.key=="PaymentTerms_Payment_Due_Date") o.value=moment(SalesViewdata?.payment_due_date).format("YYYY-MM-DD"); 
        //   if(o.key=="PaymentTerms_PaymentTerms") o.value=SalesViewdata?.payment_terms?{id:SalesViewdata?.payment_terms.id, label:SalesViewdata?.payment_terms?.display_name }:null; 
        //   return o;})
        // setPaymentTermsFields(newPaymentTermsFields);
  
        var nweselectedProductData = [];
        if (SalesViewdata.sales_order_lines)
          nweselectedProductData = SalesViewdata.sales_order_lines.map(o => {
            return {
              id: o.product_id,
              sku_id: { id: o?.product_id, label: o.product_details.sku_id },
              product_name: o.product_details.product_name,
              uom: { name: { id: o?.uom?.id, label: o?.uom?.name } },
              // serial_number: o.serial_number,
              // "Quantity": parseInt(o.quantity),
              // "selling_price": parseFloat(o.price),
              // "discount": parseFloat(o.discount),
              // product_pricing_details:{tax_options:o.tax},
              // "Amount": o.amount,
  
              // package_type: { id: o.package_type.id, label: o.package_type.display_name },
              // unit_per_box: o.unit_per_box,
              // Ordered_Units: o.Ordered_Units,
              // uom: { id: o.uom.id, label: o.uom.name },
              // package_length: o.package_length,
              // package_width: o.package_width,
              // package_height: o.package_height,
              // package_weight: o.package_weight,
              // No_of_Boxes: o.unit_per_box
            }
          });
        setSelectedProductData(nweselectedProductData);
  
  
        newMainData = [
          ...newDispatchLocationFields,
          ...newCustomerBillingAddressFields,
          ...nweselectedProductData,
          //  ...newPaymentTermsFields, 
          //  ...newAdditionalInformationFields
        ];
        var keyValuePairMainData = {};
  
        newMainData.map(o => {
          if (o.key == "Schedule_Pickup_time") {
            o.value.map(p => { keyValuePairMainData[p.key] = p.value; })
          }
          else if (o.key != null) {
            keyValuePairMainData[o.key] = o.value;
          }
        });
        setMainData(keyValuePairMainData);
      }
    }, [SalesViewdata])
  
    //purchase return
    useEffect(() => {
      if (purchase_returnsViewdata && mainData && mainData.Select_Source_Document && mainData.Source_Document_Type?.id?.display_name == "Purchase Returns") {
        var newMainData = [];
  
        var newASNDetailsFields = ASNDetailsFields
        .map(o=> {        
          if(o.key=="Reference_ID") o.value=purchase_returnsViewdata?.reference_number; 
          // if(o.key=="currency_id") o.value={id:purchase_returnsViewdata?.currency.id,label:purchase_returnsViewdata?.currency?.currency_code};               
          // if(o.key=="Expected_Delivery_Date") o.value=moment(purchase_returnsViewdata?.expected_delivery_date).format("YYYY-MM-DD");
          return o;})
          setASNDetailsFields(newASNDetailsFields);
  
        var newDispatchLocationFields = DispatchLocationFields
          .map(o => {
            if (o.key == "ShippingAddress_Receiver_Name") o.value = purchase_returnsViewdata?.vendor_details?.vendor_locations?.vendor_shipping_address?.contact_person_name;
            if (o.key == "ShippingAddress_Mobile_Number") o.value = purchase_returnsViewdata?.vendor_details?.vendor_locations?.vendor_shipping_address?.contact_person_number;
            if (o.key == "ShippingAddress_Email") o.value = purchase_returnsViewdata?.vendor_details?.vendor_locations?.vendor_shipping_address?.email;
            if (o.key == "ShippingAddress_address_line_1") o.value = purchase_returnsViewdata?.vendor_details?.vendor_locations?.vendor_shipping_address?.address_line_1;
            if (o.key == "ShippingAddress_address_line_2") o.value = purchase_returnsViewdata?.vendor_details?.vendor_locations?.vendor_shipping_address?.address_line_2;
            if (o.key == "ShippingAddress_address_line_3") o.value = purchase_returnsViewdata?.vendor_details?.vendor_locations?.vendor_shipping_address?.address_line_3;
            if (o.key == "ShippingAddress_Country") o.value = purchase_returnsViewdata?.vendor_details?.vendor_locations?.vendor_shipping_address?.country?.name;
            if (o.key == "ShippingAddress_State") o.value = purchase_returnsViewdata?.vendor_details?.vendor_locations?.vendor_shipping_address?.state?.name;
            if (o.key == "ShippingAddress_District") o.value = purchase_returnsViewdata?.vendor_details?.vendor_locations?.vendor_shipping_address?.city;
            if (o.key == "ShippingAddress_Zipcode") o.value = purchase_returnsViewdata?.vendor_details?.vendor_locations?.vendor_shipping_address?.pin_code;
            return o;
          })
        setDispatchLocationFields(newDispatchLocationFields);
  
  
        var newCustomerBillingAddressFields = CustomerBillingAddressFields
          .map(o => {
            if (o.key == "BillingAddress_Receiver_Name") o.value = purchase_returnsViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.contact_person_name;
            if (o.key == "BillingAddress_Mobile_Number") o.value = purchase_returnsViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.contact_person_number;
            if (o.key == "BillingAddress_Email") o.value = purchase_returnsViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.email;
            if (o.key == "BillingAddress_address_line_1") o.value = purchase_returnsViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.address_line_1;
            if (o.key == "BillingAddress_address_line_2") o.value = purchase_returnsViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.address_line_2;
            if (o.key == "BillingAddress_address_line_3") o.value = purchase_returnsViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.address_line_3;
            if (o.key == "BillingAddress_Country") o.value = purchase_returnsViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.country?.name;
            if (o.key == "BillingAddress_State") o.value = purchase_returnsViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.state?.name;
            if (o.key == "BillingAddress_District") o.value = purchase_returnsViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.city;
            if (o.key == "BillingAddress_Zipcode") o.value = purchase_returnsViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.pin_code;
            return o;
          })
        setCustomerBillingAddressFields(newCustomerBillingAddressFields);
  
  
        var nweselectedProductData = [];
        if (purchase_returnsViewdata.purchase_return_lines)
          nweselectedProductData = purchase_returnsViewdata.purchase_return_lines.map(o => {
            return {
              id: o.product_id,
              sku_id: { id: o?.product_details?.id, label: o?.product_details?.sku_id },
              product_name: o?.product_details?.product_name,
              price:o?.product_details?.selling_price,
              uom: { name: { id: o?.uom?.id, label: o?.uom?.name } },
              // serial_number: o.serial_number,
                package_length: o?.product_details?.product_dimensions?.length?o?.product_details?.product_dimensions?.length:"",
              package_width: o?.product_details?.product_dimensions?.breadth?o?.product_details?.product_dimensions?.length:"",
              package_height: o?.product_details?.product_dimensions?.height?o?.product_details?.product_dimensions?.length:"",
              package_weight: o?.product_details?.product_dimensions?.weight,
        // "Quantity": parseInt(o.quantity_purchased),
              // "selling_price": parseFloat(o.rate),
              // "discount": parseFloat(o.discount),
              // product_pricing_details: { tax_options: o.tax },
              // "Amount": o.amount,
  
            }
          });
        setSelectedProductData(nweselectedProductData);
  
  
        var newSchedule_Pickup_date_and_time = DateandTime
          .map(o => {
            if (o.key == "Schedule_Scrap_Date") o.value = moment(purchase_returnsViewdata?.pickup_date_and_time?.pickup_date).format("YYYY-MM-DD");
            if (o.key == "Schedule_Pickup_time") o.value = o.value.map(p => {
              if (p.key == "Schedule_Pickup_time_from") p.value = moment(purchase_returnsViewdata?.pickup_date_and_time?.pickup_from_time);
              if (p.key == "Schedule_Pickup_time_to") p.value = moment(purchase_returnsViewdata?.pickup_date_and_time?.pickup_to_time);
              return p;
            })
            return o;
          })
        setDateandTime(newSchedule_Pickup_date_and_time);
  
  
        newMainData = [
          ...newASNDetailsFields,
          ...newDispatchLocationFields,
          ...newCustomerBillingAddressFields,
           ...nweselectedProductData,   
          ...newSchedule_Pickup_date_and_time,
        ];
        var keyValuePairMainData = { "newEstimated_Cost": 0, "Estimated_Cost_Select": purchase_returnsViewdata.shipping_mode_id };
  
        newMainData.map(o => {
          if (o.key == "Schedule_Pickup_time") {
            o.value.map(p => { keyValuePairMainData[p.key] = p.value; })
          }
          else if (o.key != null) {
            keyValuePairMainData[o.key] = o.value;
          }
        });
        setMainData(keyValuePairMainData);
      }
    }, [purchase_returnsViewdata])
  
      //Purchase Order 
      useEffect(() => {
        if (purchase_ordersViewdata && mainData && mainData.Select_Source_Document && mainData.Source_Document_Type?.id?.lookup_code == "PURCHASE_ORDERS") {
          var newMainData = [];
    
          var newASNDetailsFields = ASNDetailsFields
            .map(o => {
              if (o.key == "Reference_ID") o.value = purchase_ordersViewdata?.reference_number;
              return o;
            })
          setASNDetailsFields(newASNDetailsFields);
    
          var newDispatchLocationFields = DispatchLocationFields
            .map(o => {
              if (o.key == "ShippingAddress_Receiver_Name") o.value = purchase_ordersViewdata?.delivery_address?.contact_person_name;
              if (o.key == "ShippingAddress_Mobile_Number") o.value = purchase_ordersViewdata?.delivery_address?.contact_person_number;
              if (o.key == "ShippingAddress_Email") o.value = purchase_ordersViewdata?.delivery_address?.email;
              if (o.key == "ShippingAddress_address_line_1") o.value = purchase_ordersViewdata?.delivery_address?.address_line_1;
              if (o.key == "ShippingAddress_address_line_2") o.value = purchase_ordersViewdata?.delivery_address?.address_line_2;
              if (o.key == "ShippingAddress_address_line_3") o.value = purchase_ordersViewdata?.delivery_address?.address_line_3;
              if (o.key == "ShippingAddress_Country") o.value = purchase_ordersViewdata?.delivery_address?.country;
              if (o.key == "ShippingAddress_State") o.value = purchase_ordersViewdata?.delivery_address?.state;
              //if(o.key=="ShippingAddress_District") o.value="??"; 
              if (o.key == "ShippingAddress_Zipcode") o.value = purchase_ordersViewdata?.delivery_address?.pin_code;
              return o;
            })
          setDispatchLocationFields(newDispatchLocationFields);
    
    
          var newCustomerBillingAddressFields = CustomerBillingAddressFields
            .map(o => {
              if (o.key == "BillingAddress_Receiver_Name") o.value = purchase_ordersViewdata?.billing_address?.contact_person_name;
              if (o.key == "BillingAddress_Mobile_Number") o.value = purchase_ordersViewdata?.billing_address?.contact_person_number;
              if (o.key == "BillingAddress_Email") o.value = purchase_ordersViewdata?.billing_address?.email;
              if (o.key == "BillingAddress_address_line_1") o.value = purchase_ordersViewdata?.billing_address?.address_line_1;
              if (o.key == "BillingAddress_address_line_2") o.value = purchase_ordersViewdata?.billing_address?.address_line_2;
              if (o.key == "BillingAddress_address_line_3") o.value = purchase_ordersViewdata?.billing_address?.address_line_3;
              if (o.key == "BillingAddress_Country") o.value = purchase_ordersViewdata?.billing_address?.country;
              if (o.key == "BillingAddress_State") o.value = purchase_ordersViewdata?.billing_address?.state;
              //if(o.key=="BillingAddress_District") o.value="??"; 
              if (o.key == "BillingAddress_Zipcode") o.value = purchase_ordersViewdata?.billing_address?.pin_code;
              return o;
            })
          setCustomerBillingAddressFields(newCustomerBillingAddressFields);
    
          var nweselectedProductData = [];
          if (purchase_ordersViewdata.purchase_order_lines)
            nweselectedProductData = purchase_ordersViewdata.purchase_order_lines.map(o => {
              return {
                id: o.product_id,
                sku_id: { id: o?.product_details?.id, label: o.product_details.sku_id },
                product_name: o.product_details.product_name,
                uom: { name: { id: o?.uom?.id, label: o?.uom?.name } },
                price:o?.product_details?.selling_price,
                package_length: o?.product_details?.product_dimensions?.length?o?.product_details?.product_dimensions?.length:"",
                package_width: o?.product_details?.product_dimensions?.breadth?o?.product_details?.product_dimensions?.length:"",
                package_height: o?.product_details?.product_dimensions?.height?o?.product_details?.product_dimensions?.length:"",
                package_weight: o?.product_details?.product_dimensions?.weight,
    
                // package_type: { id: o.package_type.id, label: o.package_type.display_name },
                // unit_per_box: o.unit_per_box,
                // Ordered_Units: o.Ordered_Units,
                // No_of_Boxes: o.unit_per_box
  
              }
            });
          setSelectedProductData(nweselectedProductData);
    
    
          newMainData = [
            ...newASNDetailsFields,
            ...newDispatchLocationFields,
            ...newCustomerBillingAddressFields,
            ...nweselectedProductData,
          ];
          var keyValuePairMainData = {};
    
          newMainData.map(o => {
            if (o.key == "Schedule_Pickup_time") {
              o.value.map(p => { keyValuePairMainData[p.key] = p.value; })
            }
            else if (o.key != null) {
              keyValuePairMainData[o.key] = o.value;
            }
          });
          setMainData(keyValuePairMainData);
        }
      }, [purchase_ordersViewdata])
  
       //IST Order 
     useEffect(()=>{    
      if(ISTViewdata && mainData && mainData.Select_Source_Document && mainData.Source_Document_Type?.id?.lookup_code == "IST")
      {
        var newMainData=[];
  
        var newASNDetailsFields = ASNDetailsFields
        .map(o=> {       
          if(o.key=="Reference_ID") o.value=ISTViewdata?.reference_number; 
          return o;})
        setASNDetailsFields(newASNDetailsFields);
  
        var newDispatchLocationFields = DispatchLocationFields
        .map(o=> {
          if(o.key=="ShippingAddress_Receiver_Name") o.value= ISTViewdata?.destination_warehouse?.name; 
          if(o.key=="ShippingAddress_Mobile_Number") o.value= ISTViewdata?.destination_warehouse?.mobile_number; 
          if(o.key=="ShippingAddress_Email") o.value= ISTViewdata?.destination_warehouse?.email; 
          if(o.key=="ShippingAddress_address_line_1") o.value= ISTViewdata?.destination_warehouse?.address?.address_line_1; 
          if(o.key=="ShippingAddress_address_line_2") o.value= ISTViewdata?.destination_warehouse?.address?.address_line_2; 
          if(o.key=="ShippingAddress_address_line_3") o.value= ISTViewdata?.destination_warehouse?.address?.address_line_3; 
          if(o.key=="ShippingAddress_Country") o.value= ISTViewdata?.destination_warehouse?.address?.country?.name; 
          if(o.key=="ShippingAddress_State") o.value= ISTViewdata?.destination_warehouse?.address?.state.name; 
          //if(o.key=="ShippingAddress_District") o.value="??"; 
          if(o.key=="ShippingAddress_Zipcode") o.value= ISTViewdata?.destination_warehouse?.pin_code;
          return o;})
          setDispatchLocationFields(newDispatchLocationFields); 
  
          
        var newCustomerBillingAddressFields = CustomerBillingAddressFields
        .map(o=> {
          if(o.key=="BillingAddress_Receiver_Name") o.value= ISTViewdata?.destination_warehouse?.name; 
          if(o.key=="BillingAddress_Mobile_Number") o.value= ISTViewdata?.destination_warehouse?.mobile_number; 
          if(o.key=="BillingAddress_Email") o.value= ISTViewdata?.destination_warehouse?.email; 
          if(o.key=="BillingAddress_address_line_1") o.value= ISTViewdata?.destination_warehouse?.address?.address_line_1; 
          if(o.key=="BillingAddress_address_line_2") o.value= ISTViewdata?.destination_warehouse?.address?.address_line_2; 
          if(o.key=="BillingAddress_address_line_3") o.value= ISTViewdata?.destination_warehouse?.address?.address_line_3;
          if(o.key=="BillingAddress_Country") o.value= ISTViewdata?.destination_warehouse?.address?.country?.name; 
          if(o.key=="BillingAddress_State") o.value= ISTViewdata?.destination_warehouse?.address?.state.name; 
          //if(o.key=="BillingAddress_District") o.value="??"; 
          if(o.key=="BillingAddress_Zipcode") o.value= ISTViewdata?.destination_warehouse?.pin_code;
          return o;})
        setCustomerBillingAddressFields(newCustomerBillingAddressFields);
   
        
        var nweselectedProductData=[];
        if(ISTViewdata.internal_transfer_lines)
        nweselectedProductData=ISTViewdata.internal_transfer_lines.map(o=>{return{
          id:o.product_id,
          sku_id:{id:o?.product_details?.id, label:o?.product_details.sku_id},
          product_template_id:o.product_template_id,
          product_name:o.product_details.product_name,
          uom: {name:{id:o?.uom?.id, label:o?.uom?.name}},
          price:o?.product_details?.selling_price,
          package_length: o?.product_details?.product_dimensions?.length?o?.product_details?.product_dimensions?.length:"",
           package_width: o?.product_details?.product_dimensions?.breadth?o?.product_details?.product_dimensions?.length:"",
           package_height: o?.product_details?.product_dimensions?.height?o?.product_details?.product_dimensions?.length:"",
           package_weight: o?.product_details?.product_dimensions?.weight,
    
          // serial_number: o.serial_number,
          // "Quantity": parseInt(o.quantity),
          // "selling_price": parseFloat(o.rate),
          // "discount": parseFloat(o.discount_value),
          // product_pricing_details:{tax_options:o.tax},
          // "Amount": o.amount,
          //"Payment_Terms":o.product_details.Payment_Terms
        }});
        setSelectedProductData(nweselectedProductData);
  
        // var newPackageDetailsFields = PackageDetailsFields
        // .map(o=> {
        //   if(o.key=="Package_Length") o.value=ISTViewdata?.shipping_details?.package_details?.length;
        //   if(o.key=="Package_Width") o.value=ISTViewdata?.shipping_details?.package_details?.breadth;
        //   if(o.key=="Package_Height") o.value=ISTViewdata?.shipping_details?.package_details?.height;
        //   if(o.key=="Vol_Weight") o.value=ISTViewdata?.shipping_details?.package_details?.dimensions;
        //   if(o.key=="Package_Weight") o.value=ISTViewdata?.shipping_details?.package_details?.weight;
        //   return o;})
        // setPackageDetailsFields(newPackageDetailsFields);
  
        // var newEstimated_Cost = ISTViewdata?.shipping_details?.estimated_cost.map(data=>{
        //   return{"Estimated_Cost_Shipping_Partners":data.shipping_partner,
        //   "Estimated_Cost_Charges":data.charges,
        //   "Estimated_Cost_Order_Deliver_Time":data.order_delivery_time,
        //   "Estimated_Cost_Select":ISTViewdata.shipping_mode_id
        //   }; 
        // }); 
  
        /* Estimated Cost Data Not In Array */
        // var estimated_cost_data = ISTViewdata?.shipping_details?.estimated_cost;
        // var newEstimated_Cost = 
        // [{"Estimated_Cost_Shipping_Partners":estimated_cost_data.shipping_partner,
        //   "Estimated_Cost_Charges":estimated_cost_data.charges,
        //   "Estimated_Cost_Order_Deliver_Time":estimated_cost_data.order_delivery_time,
        //   "Estimated_Cost_Select":ISTViewdata.shipping_mode_id 
        // }]; 
        // setEstimated_Cost(newEstimated_Cost);
       
        
        var newDateandTime=DateandTime
        .map(o=> {
          if(o.key=="Schedule_Pickup_date") o.value=moment(ISTViewdata?.pickup_date_and_time?.pickup_date).format("YYYY-MM-DD");
          // if(o.key=="Schedule_Pickup_time") o.value = o.value.map(p=> {
          //   if(p.key=="Schedule_Pickup_time_from") p.value=moment(Deliverydata?.pickup_date_and_time?.pickup_from_time);
          //   if(p.key=="Schedule_Pickup_time_to") p.value=moment(Deliverydata?.pickup_date_and_time?.pickup_to_time);
          //   return p;})
          return o;})
          setDateandTime(newDateandTime);
   
          
          newMainData=[ 
            ...newASNDetailsFields,
            ...newDispatchLocationFields,
             ...newCustomerBillingAddressFields, 
             ...nweselectedProductData,   
             
            //  ...newPackageDetailsFields, 
             ...newDateandTime,
          ];
        var keyValuePairMainData={"newEstimated_Cost":0, "Estimated_Cost_Select":ISTViewdata.shipping_mode_id};
  
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
    },[ISTViewdata])




  const [DateandTime, setDateandTime] = useState([
    {
      label: "Schedule Scrap Date",
      type: "date",
      key: "Schedule_Scrap_Date",
    },
    {
      label: "Set pickup time",
      type: "time_card",
      key: "Schedule_Pickup_time",
      value: [
        {
          label: "",
          type: "time",
          key: "Schedule_Pickup_time_from",
          value: ""
        },
        {
          label: "to",
          type: "time",
          key: "Schedule_Pickup_time_to",
          value: ""
        },
      ],
    },

  ])
  const [ASNDetailsFields, setASNDetailsFields] = useState([
    {
      label: "ASN Number",
      type: "input",
      key: "ASN_Number",
    },
    {
      label: "Auto Generate ASN Number ",
      type: "checkbox",
      key: "auto_generate_asn_number",
      isChecked: false,

    },
    {
      label: "Source Document Type ",
      type: "select",
      key: "Source_Document_Type",
      defaultVal: {},
    },
    {
      label: "Select Source Document",
      type: "select",
      key: "Select_Source_Document",
      defaultVal: {},
    },
    {
      label: "Reference ID",
      type: "input",
      key: "Reference_ID",

    },
    {
      label: "Auto Generate Reference ID",
      type: "checkbox",
      key: "auto_generate_reference_number",
      isChecked: false,
    },

  ]);


  const handelCheckboxShowForCopyField_valueChange = (field) => {
    //console.log("onCheckboxChanges", field);
    setCheckboxShowForCopyField_value(!CheckboxShowForCopyField_value);

    var newCustomerBillingAddressFields = CustomerBillingAddressFields?.map(o => {
      return {
        ...o,
        value: mainData[o.key.replace("Billing", "Shipping")]
      }
    });

    var newMainData = mainData;
    newCustomerBillingAddressFields?.map(o => newMainData[o.key] = o.value);
    setMainData(newMainData);

    setCustomerBillingAddressFields(newCustomerBillingAddressFields);
    //CustomerShippingAddressFields
  }

  const handelInputChange = (key, value, index = null) => {
    console.log("key", key, "value", value, "index", index)
    if (key == "Schedule_Pickup_time_from" || key == "Schedule_Pickup_time_to") {
      var newSchedule_Pickup_date_and_time = DateandTime.map(o => { if (o.key == "Schedule_Pickup_time") o.value.map(p => { if (p.key == key) p.value = new Date(value); return p; }); return o; });
      console.log(newSchedule_Pickup_date_and_time, "newSchedule_Pickup_date_and_time")
      setDateandTime(newSchedule_Pickup_date_and_time)

      var newMainData = mainData;
      if (key == "Schedule_Pickup_time_from")
        newMainData["Schedule_Pickup_time_from_1"] = moment(new Date(value)).format("hh:mm A");
      if (key == "Schedule_Pickup_time_to")
        newMainData["Schedule_Pickup_time_to_1"] = moment(new Date(value)).format("hh:mm A");
      setMainData(newMainData);
    }

    if (index != null) {
      console.log("not null")
      var newSelectedProductData = JSON.parse(JSON.stringify(selectedProductData));

      if (key === 'sku_id') {
        console.log("sku_id")
        var selectVarient = productVariantData.find(o => o?.id == value?.id);
        newSelectedProductData[index] = selectVarient;
        newSelectedProductData[index][key] = value.label;
        newSelectedProductData[index]["price"] = selectVarient?.product_pricing_details?.mrp
      }
      else if (key === 'uom.name') {
        console.log("uom.name")
        var selectVarient = UOM.find(o => o?.id == value?.id);
        newSelectedProductData[index].uom = { name: value.label, id: value?.id };
      }
      else {
        console.log("elseelse")
        if (key.toString().includes('.')) {
          newSelectedProductData[index][key.split(".")[0]][key.split(".")[1]] = value;
        }
        else { 
          console.log("else3")
          newSelectedProductData[index][key] = value; 
        }
      }

      //calculation
      var grossTotal = ((newSelectedProductData[index].Quantity ?? 0) * (newSelectedProductData[index].selling_price ?? 0)) - (newSelectedProductData[index].discount ?? 0);
      var tax = 0;
      if (newSelectedProductData[index].product_pricing_details && newSelectedProductData[index].product_pricing_details.tax_options && newSelectedProductData[index].product_pricing_details.tax_options > 0) {
        tax = (grossTotal * newSelectedProductData[index]?.product_pricing_details?.tax_options ?? 0) / 100
      }
      else tax = 0;
      var amount = grossTotal + tax;
      newSelectedProductData[index].Amount = amount;

      console.log("newSelectedProductData",newSelectedProductData)
      //console.log("Total", newSelectedProductData.map(o=>o.Amount).reduce((accumulator, currentValue) => accumulator + currentValue, 0));
      setSelectedProductData(newSelectedProductData);
      console.log("selectedProductDataselectedProductData", selectedProductData)

      setPaymentDetailsFields({ ...paymentDetailsFields, subTotal: grossTotal, tax: newSelectedProductData[0]?.product_pricing_details?.tax_options ?? 0, total: newSelectedProductData.map(o => o.Amount).reduce((accumulator, currentValue) => accumulator + currentValue, 0) })
    }


    else {
      if (key == "ShippingAddress_address_line_1" || key == "ShippingAddress_address_line_2" || key == "ShippingAddress_address_line_3" || key == "ShippingAddress_Country" || key == "ShippingAddress_State" || key == "ShippingAddress_District" || key == "ShippingAddress_Zipcode" || key == "ShippingAddress_Receiver_Name" || key == "ShippingAddress_Mobile_Number" || key == "ShippingAddress_Email") {
        let tempStaticField = [...DispatchLocationFields];
        let index = tempStaticField.findIndex(function (field) {
          return field.key == key;
        });
        tempStaticField[index]["value"] = value;
        setDispatchLocationFields(tempStaticField)
      }
      else if (key == "BillingAddress_address_line_1" || key == "BillingAddress_address_line_2" || key == "BillingAddress_address_line_3" || key == "BillingAddress_Country" || key == "BillingAddress_State" || key == "BillingAddress_District" || key == "BillingAddress_Zipcode" || key == "BillingAddress_Receiver_Name" || key == "BillingAddress_Mobile_Number" || key == "BillingAddress_Email") {
        let tempStaticField = [...CustomerBillingAddressFields];
        let index = tempStaticField.findIndex(function (field) {
          return field.key == key;
        });
        tempStaticField[index]["value"] = value;
        setCustomerBillingAddressFields(tempStaticField)
      }
      else if (key == "ASN_Number" || key == "Reference_ID") {
        let tempStaticField = [...ASNDetailsFields];
        let index = tempStaticField.findIndex(function (field) {
          return field.key == key;
        });
        tempStaticField[index]["value"] = value;
        setASNDetailsFields(tempStaticField)
      }
      var newMainData = mainData;

      newMainData[key] = value;

      setMainData(newMainData);
      console.log(mainData, "mainData in edit")
    }


  }


  const handelSelectonChange = (key, value) => {
    console.log("handelSelectonChange", key, value)
    const tempValue = { ...inputValue, [key]: value };
    setInputvalue(tempValue);
    console.log(value, inputValue, "iiii");
    ASNDetailsFields, setASNDetailsFields
    if (key == "ShippingAddress_Country" || key == "BillingAddress_Country") {
      // setCountry(value.id);
      dispatch(States2(value.id));
    }
    if (key === "Source_Document_Type") {
      dispatch(SearchSourceDocumentData(value?.id));
    }
    if (key == "Select_Source_Document") {
      console.log(mainData, "Select_Source_Documentmain")
      if (mainData.Source_Document_Type?.id?.lookup_code == "SALES_ORDERS") {
        dispatch(FetchSOById(value?.id));
      }
      else if (mainData.Source_Document_Type?.id?.display_name == "Purchase Returns") {
        dispatch(FetchPRById(value?.id));
        // dispatch(FetchPOById(value?.id)); 
      }
      else if (mainData.Source_Document_Type?.id?.lookup_code == "PURCHASE_ORDERS") {
        dispatch(FetchPOById(value?.id));
      }
      else if (mainData.Source_Document_Type?.id?.lookup_code == "IST") {
        dispatch(FetchISTById(value?.id));
      }
    }
    switch (key) {
      case "ShippingAddress_Country":
      case "ShippingAddress_State": {
        setDispatchLocationFields(DispatchLocationFields?.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;
      }
      case "BillingAddress_Country":
      case "BillingAddress_State": {
        setCustomerBillingAddressFields(CustomerBillingAddressFields?.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;
      }
      case "Source_Document_Type": setASNDetailsFields(ASNDetailsFields?.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;

      case "Select_Source_Document": setASNDetailsFields(ASNDetailsFields?.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;

    }

    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);


  }

  const deleteLineItem=(item)=>{
    console.log("jiji",item)
    dispatch(deleteProductline(id,item?.sku_id?.id));
  }


  const handelCheckBoxonChange = (field) => {
    console.log("onCheckboxChanges", ASNDetailsFields, field);

    if (field.key == "auto_generate_asn_number") {
      var neworder = ASNDetailsFields.map(o => { if (o.key == 'ASN_Number') o.disabled = !field.isChecked; return o; })
      setASNDetailsFields(neworder)
    }

    if (field.key == "auto_generate_reference_number") {
      var neworder = ASNDetailsFields.map(o => { if (o.key == 'Reference_ID') o.disabled = !field.isChecked; return o; })
      setASNDetailsFields(neworder)
    }

    var newState = ASNDetailsFields.map(o => { if (o.key == field.key) { o.isChecked = !o.isChecked; } return o })
    setASNDetailsFields(newState)





  };

  const setRadioType = (prop, value) => {
    console.log("setRadioType", prop, value)
  };



  useEffect(() => dispatch(fetchSourceDocumentData()), []);
  const SourceDocument = useSelector(
    (state) => state.fetchSourceDocumentData?.SourceDocument
  );
  console.log(SourceDocument, "SourceDocument");

  useEffect(() => dispatch(SearchSourceDocumentData()), []);

  const SearchSourceDocument = useSelector(
    (state) => state.SearchSourceDocumentData?.SearchSourceDocument
  );
  console.log(SearchSourceDocument, "SearchSourceDocument");

  useEffect(() => dispatch(fetchPackageTypeDropDown()), []);
  const PackageType = useSelector(
    (state) => state.fetchPackageTypeDropDown?.PackageType
  );
  console.log(PackageType, "PackageType");


 

  const headCells = [
    {
      key: "sku_id",
      label: "Product SKU",
      type: "select",
      data: productVariantData.map(o => { return { id: o?.id, label: o?.sku_id } })
    },
    {
      key: "product_name",
      label: "Product Name",
      type: "text"
    },
    {
      key: "price",
      label: "Price",
      type: "Number"
    },
    {
      key: "package_type",
      label: "Package Type",

      type: "select",
      data: PackageType.map(o => { return { id: o?.id, label: o?.display_name } })
    },
    {
      key: "unit_per_box",
      label: "Unit Per Box",
      type: "Number",

    },

    {
      key: "uom",
      label: "Unit of Measure",
      type: "select",
      data: UOM.map(o => { return { id: o?.id, label: o?.name } })
    },

    {
      key: "package_length",
      label: "Package Length",
      type: "number"
    },
    {
      key: "package_width",
      label: "Package width",
      type: "number"
    },
    {
      key: "package_height",
      label: "Package Height",
      type: "number"
    },
    {
      key: "package_weight",
      label: "Package Weight",
      type: "number"
    },
    {
      key: "No_of_Boxes",
      label: "No. of Boxes",
      type: "number"
    },
    // {
    //   key: "Rejected_Quantities", 
    //   label: "Cross Docking Req.",
    //   type: "text"
    // },

    {
      key: "Action",
      label: "Action",
      type: "view",
      renderView: (item) => (
        <div>
          <DeleteIcon onClick={() => { 
            console.log("itemitem",item);
            deleteLineItem(item);
            setSelectedProductData(selectedProductData.filter(o => o?.sku_id?.id != item?.sku_id?.id))}} />
        </div>
      )
    }
  ];

  const [step1Data, setStep1Data] = useState({

  });


  

  const [DispatchLocationFields, setDispatchLocationFields] = useState([
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
  const history = useNavigate();

  const handleButtonClick = (key) => {

    console.log(mainData, "mainData", selectedProductData)
    console.log(step1Data, "  console.log(step1Data)")

    if (key == "Get Quote") {
      var data = {
        "origin_pincode": mainData.ShippingAddress_Zipcode,
        "destination_pincode": mainData.BillingAddress_Zipcode,
        "package_details": {
          "package_height": mainData.Package_Height,
          "package_length": mainData.Package_Length,
          "package_weight": mainData.Package_Weight,
          "package_breadth": mainData.Package_Width,
          "volumetric_weight": mainData.Vol_Weight,
          // "product_value": paymentDetailsFields.total
        },
        "is_cod": true
      }

      dispatch(estimatedcost(data));
      return true;
    }

    if (key == "Cancel") {
      history("/asn");
      return;
    }
    var Estimated_Cost_details = Estimated_Cost?.find(o => o.Estimated_Cost_Select == mainData.Estimated_Cost_Select);

    const payload = {
   
        // warehouse_id: 1,
        asn_order_lines: selectedProductData?.map(o => {
          return {
            "product_id": Number(o.product_template_id),
            // "product_id": 1,
            // "product_template_id": o.product_template_id,
            "package_type_id": Number(o.package_type?.id),
            "product_variant_id": o.id,
            "unit_per_box": Number(o.unit_per_box),
            "uom_id": Number(o.uom?.id),
            "package_length": Number(o.package_length),
            "package_width": Number(o.package_width),
            "package_height": Number(o.package_height),
            "package_weight": Number(o.package_weight),
            "no_of_boxes": Number(o.No_of_Boxes),
            "cross_docking_req": null,
            "app_id": 1,
          }
        }),
     


      asn_number: mainData?.ASN_Number,
      auto_create_asn_number: ASNDetailsFields[1]?.isChecked ? true : false,
      reference_number: mainData?.Reference_ID,
      auto_generate_reference_number: ASNDetailsFields[5]?.isChecked ? true : false,

      total_quantity: 60, //

      grn_id: 2, //

      shipping_mode_id: 129, //
      // link_purchase_order_id: 7, //
      source_document_type_id: mainData.Source_Document_Type?.id?.id,
      // source_document_id: temp32.toString().slice(-2),
      // source_document_id: mainData.Select_Source_Document?.id,
      source_document_id: mainData.Select_Source_Document?.id,
      source_document:{
        id:mainData.Select_Source_Document?.id,
        data:mainData.Select_Source_Document?.label
      },


      dispatch_location_details:
      {
        pin_code: mainData?.ShippingAddress_Zipcode,
        land_mark: mainData?.ShippingAddress_address_line_3,
        gst_in_number: "22ASDAS00A1Z5",
        email: mainData.ShippingAddress_Email,
        location_name: mainData?.ShippingAddress_Receiver_Name,
        address_line_1: mainData?.ShippingAddress_address_line_1,
        address_line_2: mainData?.ShippingAddress_address_line_2,
        address_line_3: mainData?.ShippingAddress_address_line_3,
        contact_person_name: mainData?.ShippingAddress_Receiver_Name,
        contact_person_number: mainData?.ShippingAddress_Mobile_Number,
        State: mainData?.ShippingAddress_State,
        district: mainData.ShippingAddress_District,
        Country: mainData?.ShippingAddress_Country
      },

      destination_location_details:
      {
        pin_code: mainData?.BillingAddress_Zipcode,
        land_mark: mainData?.BillingAddress_address_line_3,
        gst_in_number: "22ASDAS00A1Z5",
        email: mainData.BillingAddress_Email,
        location_name: mainData?.BillingAddress_Receiver_Name,
        address_line_1: mainData?.BillingAddress_address_line_1,
        address_line_2: mainData?.BillingAddress_address_line_2,
        address_line_3: mainData?.BillingAddress_address_line_3,
        contact_person_name: mainData?.BillingAddress_Receiver_Name,
        contact_person_number: mainData?.BillingAddress_Mobile_Number,
        State: mainData?.BillingAddress_State,
        district: mainData.BillingAddress_District,
        Country: mainData?.BillingAddress_Country
      },

      shipping_details: {
        shipping_preference: mainData?.shipping_preference,
        package_details: {
          package_length: Number(mainData?.Package_Length ? mainData.Package_Length : "") ? Number(mainData?.Package_Length ? mainData.Package_Length : "") : asnData?.shipping_details?.package_details?.package_length ? asnData?.shipping_details?.package_details?.package_length : 0,
          package_height: Number(mainData?.Package_Height ? mainData.Package_Height : "") ? Number(mainData?.Package_Height ? mainData.Package_Height : "") : asnData?.shipping_details?.package_details?.package_height ? asnData?.shipping_details?.package_details?.package_height : 0,
          package_weight: Number(mainData?.Package_Weight ? mainData.Package_Weight : "") ? Number(mainData?.Package_Weight ? mainData.Package_Weight : "") : asnData?.shipping_details?.package_details?.package_weight ? asnData?.shipping_details?.package_details?.package_weight : 0,
          package_width: Number(mainData?.Package_Width ? mainData.Package_Width : "") ? Number(mainData?.Package_Width ? mainData.Package_Width : "") : asnData?.shipping_details?.package_details?.package_width ? asnData?.shipping_details?.package_details?.package_width : 0,
          vol_weight: Number(mainData?.Vol_Weight ? mainData.Vol_Weight : "") ? Number(mainData?.Vol_Weight ? mainData.Vol_Weight : "") : asnData?.shipping_details?.package_details?.vol_weight ? asnData?.shipping_details?.package_details?.vol_weight : 0,
        },

        //   "estimated_cost": {
        //     "shipping_partner": Estimated_Cost_details?.Estimated_Cost_Shipping_Partners,
        //     "charges": Estimated_Cost_details?.Estimated_Cost_Charges,
        //     "order_delivery_time": Estimated_Cost_details?.Estimated_Cost_Order_Deliver_Time
        // },
      },

      // price_list_id: 1,
      // eunimart_wallet_amount: 539.99,
      // schedule_pickup_date: mainData?.Schedule_Scrap_Date + "T18:30:00.000Z",
      schedule_pickup_date: mainData.Schedule_Scrap_Date + "T18:30:00.000Z",
      // schedule_pickup_time:mainData.Schedule_Pickup_time_from_1,
      schedule_pickup_from_time:mainData.Schedule_Pickup_time_from_1,
      schedule_pickup_to_time:mainData.Schedule_Pickup_time_to_1,
      // scrap_order_id: 17,
      // partner_id: 1,
      // app_id: 2,
    };

    console.log("payload", payload);

    // dispatch(createAsn(payload));
    dispatch(EditAsn(id, payload))

    history(`/asn`)

  };
  useEffect(() => dispatch(estimatedcost()), []);
  const EstimatedCostdata = useSelector((state) => state.estimatedcost?.cost);
  console.log(EstimatedCostdata, "EstimatedCostdata");

  const [Estimated_Cost, setEstimated_Cost] = useState({});


  const Estimated_Cost_headCells = [
    {
      key: "Estimated_Cost_Shipping_Partners",
      label: "Shipping Partners",
      type: "text",
    },
    {
      key: "Estimated_Cost_Charges",
      label: "Charges",
      type: "text",
    },
    {
      key: "Estimated_Cost_Order_Deliver_Time",
      label: "Order Deliver Time",
      type: "text",
    },
    {
      key: "Estimated_Cost_Select",
      label: "Select",
      type: "radio",
    },
  ];

  const [ShippingDetailsFields, setShippingDetailsFields] = useState([
    {
      label: "Shipment Type",
      type: "radio",
      key: "Shipment_Type",
      sub: [{ "label": "Express", "value": 0, "checked": true }, { "label": "Surface", "value": 1 }],
    },
  ]);

  useEffect(() => {
    if (EstimatedCostdata?.data) {
      console.log(EstimatedCostdata, "EstimatedCostdata111111", Estimated_Cost, "llll")
      // var Shipment_Type = ShippingDetailsFields?.find(o => o.key == "Shipment_Type").sub?.find(o => o.checked)?.label;
      var Shipment_Type = mainData?.shipping_preference
      console.log(Shipment_Type, "Shipment_Type")

      if (Shipment_Type == "Eunimart" && EstimatedCostdata?.data?.express) {

        var newEstimated_Cost = EstimatedCostdata?.data?.express?.map(data => {
          var dataRaw = {};
          Estimated_Cost_headCells?.map(tableRaw => {
            if (tableRaw.key == "Estimated_Cost_Shipping_Partners") {
              dataRaw["Estimated_Cost_Shipping_Partners"] = data.name;
            }
            if (tableRaw.key == "Estimated_Cost_Charges") {
              dataRaw["Estimated_Cost_Charges"] = data.charges;
            }
            if (tableRaw.key == "Estimated_Cost_Order_Deliver_Time") {
              dataRaw["Estimated_Cost_Order_Deliver_Time"] = data.Order_delivery_time;
            }
            if (tableRaw.key == "Estimated_Cost_Select") {
              dataRaw["Estimated_Cost_Select"] = data.supplier_id;
            }
          });
          return dataRaw;
        });
        setEstimated_Cost(newEstimated_Cost);
        console.log(newEstimated_Cost, "newEstimated_Cost")
      }
      else if (Shipment_Type == "self") {
        var newEstimated_Cost = EstimatedCostdata.express?.map(data => {
          var dataRaw = {};
          Estimated_Cost_headCells?.map(tableRaw => {
            if (tableRaw.key == "Estimated_Cost_Shipping_Partners") {
              dataRaw["Estimated_Cost_Shipping_Partners"] = data.name;
            }
            if (tableRaw.key == "Estimated_Cost_Charges") {
              dataRaw["Estimated_Cost_Charges"] = data.charges;
            }
            if (tableRaw.key == "Estimated_Cost_Order_Deliver_Time") {
              dataRaw["Estimated_Cost_Order_Deliver_Time"] = data.Order_delivery_time;
            }
            if (tableRaw.key == "Estimated_Cost_Select") {
              dataRaw["Estimated_Cost_Select"] = data.supplier_id;
            }
          });
          return dataRaw;
        });
        setEstimated_Cost(newEstimated_Cost);
      }
      else {
        setEstimated_Cost(null);
      }

    }
  }, [EstimatedCostdata])



  const handelEstimated_Cost_RadionButtononChange = (value) => {
    console.log("value", value)
    // var Estimated_Cost_details = Estimated_Cost.find(o=> o.Estimated_Cost_Select == value); 
    // setPaymentDetailsFields({...paymentDetailsFields, shippingCharge:Estimated_Cost_details.Estimated_Cost_Charges});    
    var newMainData = mainData;
    newMainData["Estimated_Cost_Select"] = value;
    setMainData(newMainData);
    calulate_total();
  };
  function calulate_total() {
    if (selectedProductData && mainData && Estimated_Cost) {
      var val1 = selectedProductData?.map(o => o.Amount).reduce((previousValue, currentValue) => { return previousValue + currentValue });
      var id_Estimated_Cost_Select = mainData.Estimated_Cost_Select;
      var val2 = Estimated_Cost?.find(o => o.Estimated_Cost_Select == id_Estimated_Cost_Select).Estimated_Cost_Charges;
      var subTotal = val1 + val2;
      //console.log("subTotal",subTotal)
      var newtotal = 0;

      if (paymentDetailsFields.Final_Adjustment == "+") {
        newtotal = paymentDetailsFields.adjustment_amount + subTotal;
      }
      else {
        newtotal = paymentDetailsFields.adjustment_amount - subTotal;
      }

      //console.log("newtotal",newtotal)
      setPaymentDetailsFields({ ...paymentDetailsFields, shippingCharge: val2, total: newtotal });
    }
  }

  return (
    <>
      {/* //Enter ASN Details */}
      <AddForm header={"ASN Details"} data={ASNDetailsFields.map(field => {
        switch (field.key) {
          case 'Source_Document_Type': {
            field.data = SourceDocument.map(curElem => { return { id: curElem, label: curElem.display_name } }); break;
          }
          case 'Select_Source_Document': {
            field.data =
            ((mainData && mainData.Source_Document_Type && mainData.Source_Document_Type?.id?.lookup_code == "SALES_ORDERS") ?
            SearchSourceDocument?.map(o => { return { id: o.id, label: o.sales_order_number } })
              :

              ((mainData && mainData.Source_Document_Type && mainData.Source_Document_Type?.id?.display_name == "Purchase Returns") ?
              SearchSourceDocument?.map(o => { return { id: o.id, label: o.purchase_return_number } })
                :
                ((mainData && mainData.Source_Document_Type && mainData.Source_Document_Type?.id?.lookup_code == "PURCHASE_ORDERS") ?
                SearchSourceDocument?.map(o => { return { id: o.id, label: o.purchase_order_number } })
                  :
                  ((mainData && mainData.Source_Document_Type && mainData.Source_Document_Type?.id?.lookup_code == "IST") ?
                  SearchSourceDocument?.map(o => { return { id: o?.id, label: o?.ist_number} })
                    :
                    null

                    // field.data = options1.map(curElem => { return { id: curElem?.id, label: curElem?.sales_order_number } }); break;
                  )))); break;
          }
        }
        return field;
      })}
        handelInputChange={handelInputChange} handelSelectonChange={handelSelectonChange} handelCheckBoxonChange={handelCheckBoxonChange} setRadioType={setRadioType} />


      {/* //Product Details */}

      <AddForm_Table headCells={headCells} table_data={selectedProductData} handelInputChange={handelInputChange} header={"Add Products"} renderFooter={() => (<center style={{ marginTop: 10 }}><Link onClick={onAddNewRaw} underline="none">+ Add Product Line</Link></center>)} />

      {/* //Dispatch Location Details */}
      <AddForm header={"Dispatch Location Details"} data={DispatchLocationFields
        .map(field => {
          switch (field.key) {
            case 'ShippingAddress_Country': {
              field.data = Countriesdata.map(o => { return { id: o.id, label: o.name } }); break;
            }
            case 'ShippingAddress_State': {
              field.data = states1.map(o => { return { id: o.id, label: o.name } }); break;
            }
          }
          return field;
        })
      } handelInputChange={handelInputChange} handelSelectonChange={handelSelectonChange} handelCheckBoxonChange={handelCheckBoxonChange} setRadioType={setRadioType} />

      {/* //Delivery Location details */}
      <AddForm header={"Delivery Location details"} data={CustomerBillingAddressFields
        .map(field => {
          switch (field.key) {
            case 'BillingAddress_Country': {
              field.data = Countriesdata.map(o => { return { id: o.id, label: o.name } }); break;
            }
            case 'BillingAddress_State': {
              field.data = states1.map(o => { return { id: o.id, label: o.name } }); break;
            }
          }
          return field;
        })
      } handelInputChange={handelInputChange} handelSelectonChange={handelSelectonChange} handelCheckBoxonChange={handelCheckBoxonChange} setRadioType={setRadioType} IsCheckboxShowForCopyField={true} CheckboxShowForCopyField_text={"same as shipping address"} CheckboxShowForCopyField_value={CheckboxShowForCopyField_value} handelCheckboxShowForCopyField_valueChange={handelCheckboxShowForCopyField_valueChange} />

      <CreateShippingDetails edit={true} step1Data={mainData} setStep1Data={setMainData} />

      {/* //Estimated Cost */}

      {mainData?.shipping_preference == "Eunimart" &&
        <RemoteViewBox_Table headCells={Estimated_Cost_headCells} table_data={Estimated_Cost} header={"Estimated Cost"} IsBouttonShow={true} ButtonName={"Get Quote"} handleButtonClick={handleButtonClick} handelEstimated_Cost_RadionButtononChange={handelEstimated_Cost_RadionButtononChange} />
      }

      <AddForm header={"Schedule Pickup Date and Time"} data={DateandTime.map(field => {

        return field;
      })}

        handelInputChange={handelInputChange} handelSelectonChange={handelSelectonChange} handelCheckBoxonChange={handelCheckBoxonChange} setRadioType={setRadioType} />

      <AddFormFooter_Button handleButtonClick={handleButtonClick} />

    </>
  )



}

export default ASNEdit;


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