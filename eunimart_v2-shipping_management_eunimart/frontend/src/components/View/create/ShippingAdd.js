import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@mui/material";
import { useHistory } from "react-router-dom";
import ModalView_Table from "Remote/ModalView_Table";
import {
  loadCurrencyData,
  loadCountryData,
  loadStateDataById,
  loadPaymentTermsData,
  loadVendorsData,
  loadvendorsDataById,
  productVariantData,
  loadProductVariantData,
  load_rate_calculator_data,
  loadUOMData,
  Update_Shipping_Order_Data,
  Save_Sales_Order_Data,
  getShippingById, loadContactsData
} from "../../../redux/Action/action";

import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import RemoteViewBox_Table from "Remote/ViewBox_Table";
import AddForm from "Remote/AddForm";
import AddFormFooter from "Remote/AddFormFooter";
import AddFormFooter_Button from "Remote/AddFormFooter_Button";
import AddForm_Table from "Remote/AddForm_Table";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DatePicker from "@mui/lab/DatePicker";
import RemoteViewBox from "Remote/ViewBox_Table";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import moment from "moment";
// import  {getShippingById} from "../../../redux/Action/shippingrdersViewbyId";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function ShippingAdd(props) {
  const navigate = useHistory();
  let dispatch = useDispatch();
  const [params, setParams] = useState({ limit: 10, offset: 1, filters:null, sort:null});  
  const [ContactModalOpen, setContactModalOpen] = useState(false);
  const [ContactData, setContactData] = useState(false);
  const {
    Currencydata,
    Countrydata,
    Statedata,
    Lookupdata,
    Vendorsdata,
    productVariantData,
    EstimatedCostdata,
    Vendorsdata_Details,
    Shippingdata,
    uomData,
    SalesMsg, contactsdata, contactsdata_meta
  } = useSelector((state) => state.data1);

  useEffect(() => {
    console.log("props", props);
    dispatch(loadCurrencyData());
    dispatch(loadCountryData());
    dispatch(loadPaymentTermsData("payment_terms"));
    dispatch(loadVendorsData());
    dispatch(
      loadProductVariantData({
        limit: 10,
        offset: 1,
        filters: null,
        sort: null,
      })
    );
    dispatch(loadUOMData());
    if (props && props.id) {
      const { id } = props;
      dispatch(getShippingById(id));
    }
  }, [dispatch]);
  const minny = useSelector((state) => state?.data1?.productVariantData);
  console.log(minny, "productVariantData");
  const soIDData = useSelector((state) => state?.shippingView);
  // const dataMapping = soIDData.shippingViewData;
  console.log("soIDData in create page ", soIDData);
  // console.log(productVariantData,
  //   "productVariantData Main page one");

  // Newdata On edit
  useEffect(() => {
    if (props && props.id && Shippingdata) {
      console.log("soIDData create page", Shippingdata);
      var newMainData = [];

      // section1PincodeDetails
      var newSalesOrderDetailsFields = SalesOrderDetailsFields.map((o) => {
        if (o.key == "origin_zipcode") {
          o.value = Shippingdata?.origin_zipcode;
          console.log("VUWFmine", o.value);
        }

        if (o.key == "destination_zipcode")
          o.value = Shippingdata?.destination_zipcode;
        return o;
      });
      setSalesOrderDetailsFields(newSalesOrderDetailsFields);
      // section1PincodeDetails

      // section2PackageDetailsFields
      var newPackageDetailsFields = PackageDetailsFields.map((o) => {
        if (o.key == "package_length")
          o.value = Shippingdata?.package_details?.package_length;
        if (o.key == "package_width")
          o.value = Shippingdata?.package_details?.package_width;
        if (o.key == "package_height")
          o.value = Shippingdata?.package_details?.package_height;
        if (o.key == "volumetric_weight")
          o.value = Shippingdata?.package_details?.volumetric_weight;
        if (o.key == "package_weight")
          o.value = Shippingdata?.package_details?.package_weight;
        if (o.key == "no_of_items")
          o.value = Shippingdata?.package_details?.no_of_items;
        return o;
      });
      setPackageDetailsFields(newPackageDetailsFields);
      // section2PackageDetailsFields

      // section3SenderDetailsFields
      var newCustomerSenderDetailsFields = CustomerSenderDetailsFields.map(
        (o) => {
          if (o.key == "sender_address_name")
            o.value = Shippingdata?.sender_address?.name;
          if (o.key == "sender_address_number")
            o.value = Shippingdata?.sender_address?.mobile;
          if (o.key == "sender_address_email")
            o.value = Shippingdata?.sender_address?.email;
          if (o.key == "sender_address_address_line_1")
            o.value = Shippingdata?.sender_address?.addressline1;
          if (o.key == "sender_address_address_line_2")
            o.value = Shippingdata?.sender_address?.addressline2;
          if (o.key == "sender_address_address_line_3")
            o.value = Shippingdata?.sender_address?.addressline3;
          if (o.key == "Sender_address_country")
            o.value = Shippingdata?.sender_address?.country;
          if (o.key == "sender_address_State")
            o.value = Shippingdata?.sender_address?.state;
          if (o.key == "sender_address_District")
            o.value = Shippingdata?.sender_address?.city;
          if (o.key == "sender_address_Zipcode")
            o.value = Shippingdata?.sender_address?.pincode;
          return o;
        }
      );
      setCustomerSenderFields(newCustomerSenderDetailsFields);
      // section3SenderDetailsFields

      // section4ReceiverAddressDetails
      var newCustomerShippingAddressFields = CustomerShippingAddressFields.map(
        (o) => {
          if (o.key == "ShippingAddress_Receiver_Name")
            o.value = Shippingdata?.receiver_address?.name;
          if (o.key == "ShippingAddress_Mobile_Number")
            o.value = Shippingdata?.receiver_address?.mobile;
          if (o.key == "ShippingAddress_Email")
            o.value = Shippingdata?.receiver_address?.email;
          if (o.key == "ShippingAddress_address_line_1")
            o.value = Shippingdata?.receiver_address?.addressline1;
          if (o.key == "ShippingAddress_address_line_2")
            o.value = Shippingdata?.receiver_address?.addressline2;
          if (o.key == "ShippingAddress_address_line_3")
            o.value = Shippingdata?.receiver_address?.addressline3;
          if (o.key == "ShippingAddress_Country")
            o.value = Shippingdata?.receiver_address?.country;
          if (o.key == "ShippingAddress_State")
            o.value = Shippingdata?.receiver_address?.state;
          if (o.key == "ShippingAddress_District")
            o.value = Shippingdata?.receiver_address?.city;
          if (o.key == "ShippingAddress_Zipcode")
            o.value = Shippingdata?.receiver_address?.pincode;
          return o;
        }
      );
      setCustomerShippingAddressFields(newCustomerShippingAddressFields);
      // section4ReceiverAddressDetails

      // section5BillingAddressDetails
      var newCustomerBillingAddressFields = CustomerBillingAddressFields.map(
        (o) => {
          if (o.key == "BillingAddress_Receiver_Name")
            o.value = Shippingdata?.billing_address?.name;
          if (o.key == "BillingAddress_Mobile_Number")
            o.value = Shippingdata?.billing_address?.mobile;
          if (o.key == "BillingAddress_Email")
            o.value = Shippingdata?.billing_address?.email;
          if (o.key == "BillingAddress_address_line_1")
            o.value = Shippingdata?.billing_address?.addressline1;
          if (o.key == "BillingAddress_address_line_2")
            o.value = Shippingdata?.billing_address?.addressline2;
          if (o.key == "BillingAddress_address_line_3")
            o.value = Shippingdata?.billing_address?.addressline3;
          if (o.key == "BillingAddress_Country")
            o.value = Shippingdata?.billing_address?.country;
          if (o.key == "BillingAddress_State")
            o.value = Shippingdata?.billing_address?.state;
          if (o.key == "BillingAddress_District")
            o.value = Shippingdata?.billing_address?.city;
          if (o.key == "BillingAddress_Zipcode")
            o.value = Shippingdata?.billing_address?.pincode;
          return o;
        }
      );
      setCustomerBillingAddressFields(newCustomerBillingAddressFields);
      // section5BillingAddressDetails

      // section6selectedProductData
      var nweselectedProductData=[];
      if(Shippingdata.shipping_order_lines)
      nweselectedProductData=Shippingdata.shipping_order_lines.map(o=>{return{
        id:o.product_id,
        sku_id:{id:o.product_id, label:o.product_variant?.sku_id},
        product_template_id:o.product_template_id,
        // "warehouse_id": 1,
        // "inventory_id": 1,
        uom: {name:{id:o?.product_template?.uom_id, label:o?.product_template?.uom?.name}},
        serial_number: o.serial_number,
        "Quantity": parseInt(o.item_quantity),
        "selling_price": parseFloat(o.unit_price),
        "discount": parseFloat(o.discount),
        product_pricing_details:{tax_options:o.tax_price},
        "Amount": o.amount,
        "Payment_Terms":o.payment_term_id
      }});
      setSelectedProductData(nweselectedProductData);
      // section6selectedProductData

      var newSchedule_Pickup_date_and_time=Schedule_Pickup_date_and_time
      .map(o=> {
        if(o.key=="Schedule_Pickup_date") o.value=moment(Shippingdata?.set_pickup_date).format("YYYY-MM-DD");
        if(o.key=="Schedule_Pickup_time") o.value = o.value.map(p=> {
          if(p.key=="Schedule_Pickup_time_from") p.value=moment(Shippingdata?.set_pickup_from_time);
          if(p.key=="Schedule_Pickup_time_to") p.value=moment(Shippingdata?.set_pickup_to_time);
          return p;})
        return o;})
        setSchedule_Pickup_date_and_time(newSchedule_Pickup_date_and_time);
      // section7DateandTime

      newMainData = [
        ...newSalesOrderDetailsFields,
        ...newPackageDetailsFields,
        ...newCustomerSenderDetailsFields,
        ...newCustomerShippingAddressFields,
        ...newCustomerBillingAddressFields,
        ...nweselectedProductData,
        ...newSchedule_Pickup_date_and_time,
      ];
      var keyValuePairMainData = {};
      newMainData.map((o) => {
        if (o.key && o.key == "Vendor_Details_card") {
          o.value.map((p) => {
            keyValuePairMainData[p.key] = p.value;
          });
        } else if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      console.log("newMainData", newMainData, keyValuePairMainData);
      setMainData(keyValuePairMainData);
    }
  }, [Shippingdata]);

  // Newdata On edit
  const [selectedProductData, setSelectedProductData] = useState([
    {
      Quantity: 0,
      selling_price: 0,
      discount: 0,
      product_pricing_details: { tax_options: 0 },
    },
  ]);

  const [SalesOrderDetailsFields, setSalesOrderDetailsFields] = useState([
    {
      label: "Origin Zipcodes*",
      type: "input",
      key: "origin_zipcode",
    },
    {
      label: "Destination Pincode*",
      type: "input",
      key: "destination_zipcode",
    },
  ]);

  const [CustomerSenderDetailsFields, setCustomerSenderFields] = useState([
    {
      label: "Sender Name",
      type: "input",
      key: "sender_address_name",
    },
    {
      label: "Mobile Number",
      type: "input",
      key: "sender_address_number",
    },
    {
      label: "Email",
      type: "input",
      key: "sender_address_email",
    },
    {
      label: "Address Line 1",
      type: "input",
      key: "sender_address_address_line_1",
    },
    {
      label: "Address Line 2",
      type: "input",
      key: "sender_address_address_line_2",
    },
    {
      label: "Address Line 3",
      type: "input",
      key: "sender_address_address_line_3",
    },
    {
      label: "Country",
      type: "select",
      key: "Sender_address_country",
    },
    {
      label: "State",
      type: "select",
      key: "sender_address_State",
    },
    {
      label: "City/District",
      type: "input",
      key: "sender_address_District",
    },
    {
      label: "Zipcode",
      type: "input",
      key: "sender_address_Zipcode",
    },
  ]);
  const [PackageDetailsFields, setPackageDetailsFields] = useState([
    {
      label: "Package Length*",
      type: "input",
      key: "package_length",
    },
    {
      label: "Package Breadth*",
      type: "input",
      key: "package_width",
    },
    {
      label: "Package Height*",
      type: "input",
      key: "package_height",
    },
    {
      label: "Volumetric Weight*",
      type: "input",
      key: "volumetric_weight",
    },
    {
      label: "Package Weight*",
      type: "input",
      key: "package_weight",
    },
    {
      label: "Product Value*",
      type: "input",
      key: "no_of_items",
    },
  ]);

  const [CustomerShippingAddressFields, setCustomerShippingAddressFields] =
    useState([
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

  const [CustomerBillingAddressFields, setCustomerBillingAddressFields] =
    useState([
      {
        label: "Billing Name",
        type: "input",
        key: "BillingAddress_Receiver_Name",
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
      data: [],
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
          value: "",
        },
        {
          label: "Registered Address",
          type: "label",
          key: "Vendor_Location",
          value: "",
        },
        {
          label: "Location Incharge",
          type: "label",
          key: "Vendor_Location",
          value: "",
        },
      ],
    },
    {
      label: "Available Vendor Credit",
      type: "label_price",
      key: "Vendor_Delivery_Charges",
      value: "0",
    },
  ]);
  const [ShippingDetailsFields, setShippingDetailsFields] = useState([
    {
      label: "Shipment Type",
      type: "radio",
      key: "Shipment_Type",
      sub: [
        { label: "Express", value: 0, checked: true },
        { label: "Surface", value: 1 },
      ],
    },
  ]);
  const [Schedule_Pickup_date_and_time, setSchedule_Pickup_date_and_time] = useState([
    {
      label: "Set pickup date",
      type: "date", 
      key: "Schedule_Pickup_date",  
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
          value:""
        }, 
        {
          label: "to",
          type: "time",  
          key: "Schedule_Pickup_time_to", 
          value:""
        }, 
      ],
    },
     
  ]);

  //#endregion Customer Billing Address
  const datePipe = (dateString) => {
    let date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };
  
  const [paymentDetailsFields, setPaymentDetailsFields] = useState({
    subTotal: 0,
    tax: 0,
    shippingCharge: 0,
    adjustment_text: "",
    adjustment_amount: 0,
    total: 0,
  });
  const [mainData, setMainData] = useState({});

  const onAddNewRaw = () => {
    setSelectedProductData([
      ...selectedProductData,
      {
        Quantity: 0,
        selling_price: 0,
        discount: 0,
        product_pricing_details: { tax_options: 0 },
      },
    ]);
  };
  const headCells = [
    {
      key: "sku_id",
      label: "Product SKU",
      type: "select",
      data: useSelector((state) =>
        state.data1.productVariantData.map((o) => {
          return { id: o.id, label: o.sku_id };
        })
      ),
      required: true,
    },
    {
      key: "product_name",
      label: "Product Name",
      type: "text",
    },
    {
      key: "description.data",
      label: "Description",
      type: "text",
    },
    {
      key: "Location",
      label: "Location",
      type: "text",
    },
    {
      key: "inventory_tracking_id",
      label: "Inventory ID",
      type: "text",
    },
    {
      key: "hsn_code",
      label: "Serial Number",
      type: "text",
    },
    {
      key: "uom.name",
      label: "Unit Of Measurement",
      type: "select",
      data:useSelector((state) => state.data1.uomData.map(o=>{return{id:o.id, label:o.name}}))
    },
    {
      key: "Quantity",
      label: "Quantity",
      type: "number",
    },
    {
      key: "selling_price",
      label: "Price",
      type: "number",
    },
    {
      key: "discount",
      label: "Discount",
      type: "number",
    },
    {
      key: "product_pricing_details.tax_options",
      label: "Tax",
      type: "number",
    },
    {
      key: "Amount",
      label: "Amount",
      type: "label",
    },
    {
      key: "Payment_Terms",
      label: "Payment Terms",
      type: "text",
    },
    {
      key: "Action",
      label: "Action",
      type: "view",
      renderView: (item) => (
        <div>
          <DeleteIcon
            onClick={() =>
              setSelectedProductData(
                selectedProductData.filter((o) => o.id != item.id)
              )
            }
          />
        </div>
      ),
    },
  ];
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
  useEffect(() => {
    if (EstimatedCostdata) {
      var Shipment_Type = ShippingDetailsFields.find(
        (o) => o.key == "Shipment_Type"
      ).sub.find((o) => o.checked).label;

      if (Shipment_Type == "Express" && EstimatedCostdata.express) {
        var newEstimated_Cost = EstimatedCostdata.express.map((data) => {
          var dataRaw = {};
          Estimated_Cost_headCells.map((tableRaw) => {
            if (tableRaw.key == "Estimated_Cost_Shipping_Partners") {
              dataRaw["Estimated_Cost_Shipping_Partners"] = data.name;
            }
            if (tableRaw.key == "Estimated_Cost_Charges") {
              dataRaw["Estimated_Cost_Charges"] = data.charges;
            }
            if (tableRaw.key == "Estimated_Cost_Order_Deliver_Time") {
              dataRaw["Estimated_Cost_Order_Deliver_Time"] =
                data.Order_delivery_time;
            }
            if (tableRaw.key == "Estimated_Cost_Select") {
              dataRaw["Estimated_Cost_Select"] = data.supplier_id;
            }
          });
          return dataRaw;
        });
        setEstimated_Cost(newEstimated_Cost);
      } else if (Shipment_Type == "Surface") {
        var newEstimated_Cost = EstimatedCostdata.express.map((data) => {
          var dataRaw = {};
          Estimated_Cost_headCells.map((tableRaw) => {
            if (tableRaw.key == "Estimated_Cost_Shipping_Partners") {
              dataRaw["Estimated_Cost_Shipping_Partners"] = data.name;
            }
            if (tableRaw.key == "Estimated_Cost_Charges") {
              dataRaw["Estimated_Cost_Charges"] = data.charges;
            }
            if (tableRaw.key == "Estimated_Cost_Order_Deliver_Time") {
              dataRaw["Estimated_Cost_Order_Deliver_Time"] =
                data.Order_delivery_time;
            }
            if (tableRaw.key == "Estimated_Cost_Select") {
              dataRaw["Estimated_Cost_Select"] = data.supplier_id;
            }
          });
          return dataRaw;
        });
        setEstimated_Cost(newEstimated_Cost);
      } else {
        setEstimated_Cost(null);
      }
    }
  }, [EstimatedCostdata]);

  // assigning
  const setDataByKeyAndValue = (key, value, index = null) => {
    console.log("key", key, "value", value);  
    
    if (index != null) {
      try {
        var newSelectedProductData = selectedProductData;

        if (key === "sku_id") {
          console.log("sku_id");
          var selectVarient = productVariantData.find((o) => o.id == value.id);
          newSelectedProductData[index] = selectVarient;
          newSelectedProductData[index][key] = value.label;
        } else if (key === "uom.name") {
          console.log("uom.name");
          var selectVarient = uomData.find((o) => o.id == value.id);
          newSelectedProductData[index].uom = {
            name: value.label,
            id: value.id,
          };
        } else {
          console.log(key);
          if (key.toString().includes("."))
            newSelectedProductData[index][key.split(".")[0]][
              key.split(".")[1]
            ] = value;
          else newSelectedProductData[index][key] = value;
        }
        var Quantity = 0;
        var selling_price = 0;
        var discount = 0;
        if (newSelectedProductData[index].Quantity)
          Quantity = parseInt(newSelectedProductData[index].Quantity);
        if (newSelectedProductData[index].selling_price)
          selling_price = parseFloat(
            newSelectedProductData[index].selling_price
          );
        if (newSelectedProductData[index].discount)
          discount = parseFloat(newSelectedProductData[index].discount);
        var grossTotal = Quantity * selling_price - discount;
        var tax = 0;
        if (
          newSelectedProductData[index].product_pricing_details &&
          newSelectedProductData[index].product_pricing_details.tax_options &&
          parseFloat(
            newSelectedProductData[index].product_pricing_details.tax_options
          ) > 0
        ) {
          var taxRate = parseFloat(
            newSelectedProductData[index].product_pricing_details.tax_options
          );
          tax = (grossTotal * taxRate) / 100;
        } else tax = 0;

        var amount = grossTotal + tax;
        newSelectedProductData[index].Amount = amount;
        //console.log("Total", newSelectedProductData.map(o=>o.Amount).reduce((accumulator, currentValue) => accumulator + currentValue, 0));
        setSelectedProductData(newSelectedProductData);
      } catch (e) {
        console.error("err8", e);
      }
    }

    try {
      var newSalesOrderDetailsFields = SalesOrderDetailsFields.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setSalesOrderDetailsFields(newSalesOrderDetailsFields);
    } catch (e) {
      console.error("err1", e);
    }

    try {
      var newPackageDetailsFields = PackageDetailsFields.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setPackageDetailsFields(newPackageDetailsFields);
    } catch (e) {
      console.error("err2", e);
    }

    try {
      var newCustomerSenderDetailsFields = CustomerSenderDetailsFields.map(
        (o) => {
          if (o.key == key) o.value = value;
          return o;
        }
      );
      setCustomerSenderFields(newCustomerSenderDetailsFields);
    } catch (e) {
      console.error("err3", e);
    }

    try {
      var newCustomerShippingAddressFields = CustomerShippingAddressFields.map(
        (o) => {
          if (o.key == key) o.value = value;
          return o;
        }
      );
      setCustomerShippingAddressFields(newCustomerShippingAddressFields);
    } catch (e) {
      console.error("err4", e);
    }

    try {
      var newCustomerBillingAddressFields = CustomerBillingAddressFields.map(
        (o) => {
          if (o.key == key) o.value = value;
          return o;
        }
      );
      setCustomerBillingAddressFields(newCustomerBillingAddressFields);
    } catch (e) {
      console.error("err5", e);
    }

    try {
      var newselectedProductData = selectedProductData.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setSelectedProductData(newselectedProductData);
    } catch (e) {
      console.error("err6", e);
    }

    try {
      if(key == "Schedule_Pickup_date"){
        var newSchedule_Pickup_date_and_time=Schedule_Pickup_date_and_time.map(o=> {if(o.key=="Schedule_Pickup_date") o.value=value; return o;});        
        setSchedule_Pickup_date_and_time(newSchedule_Pickup_date_and_time) 
      }
      if(key == "Schedule_Pickup_time_from" || key == "Schedule_Pickup_time_to")
      {
        var newSchedule_Pickup_date_and_time=Schedule_Pickup_date_and_time.map(o=> {if(o.key=="Schedule_Pickup_time") o.value.map(p=> {if(p.key==key) p.value=new Date(value); return p;}); return o;});        
        setSchedule_Pickup_date_and_time(newSchedule_Pickup_date_and_time)    
      }
    } catch (e) {
      console.error("err7", e);
    }
  };
  // assigning
  const handelInputChange = (key, value, index = null) => {
    console.log("key", key, "value", value, "index", index); 
 
    setDataByKeyAndValue(key, value, index);    

    if (key == "Vendor_Delivery_Charges") {
      setPaymentDetailsFields({
        ...paymentDetailsFields,
        shippingCharge: value,
      });
    }

    if (index != null) {
      var newSelectedProductData = JSON.parse(
        JSON.stringify(selectedProductData)
      );

      if (key === "sku_id") {
        // console.log("sku_id")
        // var selectVarient=productVariantData.find(o=>o.id==value.id);
        // newSelectedProductData[index]=selectVarient;
        // newSelectedProductData[index][key]=value.label;
      } else if (key === "uom.name") {
        console.log("uom.name");
        var selectVarient = uomData.find((o) => o.id == value.id);
        newSelectedProductData[index].uom = { name: value.label, id: value.id };
      } else {
        console.log(key);
        if (key.toString().includes("."))
          newSelectedProductData[index][key.split(".")[0]][key.split(".")[1]] =
            value;
        else newSelectedProductData[index][key] = value;
      }

      //calculation
      var grossTotal =
        (newSelectedProductData[index].Quantity ?? 0) *
          (newSelectedProductData[index].selling_price ?? 0) -
        (newSelectedProductData[index].discount ?? 0);
      var tax = 0;
      if (
        newSelectedProductData[index].product_pricing_details &&
        newSelectedProductData[index].product_pricing_details.tax_options &&
        newSelectedProductData[index].product_pricing_details.tax_options > 0
      ) {
        tax =
          (grossTotal *
            newSelectedProductData[index]?.product_pricing_details
              ?.tax_options ?? 0) / 100;
      } else tax = 0;
      var amount = grossTotal + tax;
      newSelectedProductData[index].Amount = amount;
      //console.log("Total", newSelectedProductData.map(o=>o.Amount).reduce((accumulator, currentValue) => accumulator + currentValue, 0));
      setSelectedProductData(newSelectedProductData);
      setPaymentDetailsFields({
        ...paymentDetailsFields,
        subTotal: grossTotal,
        tax:
          newSelectedProductData[0]?.product_pricing_details?.tax_options ?? 0,
        total: newSelectedProductData
          .map((o) => o.Amount)
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      });
    } else {
      var newMainData = mainData; 
      newMainData[key] = value; 
      setMainData(newMainData);
    }
  };
  const handelRadionButtononChange = (prop, value) => {
    console.log("prop, value", prop, value);
    if (prop == "Shipment_Type") {
      var OldState = ShippingDetailsFields.map((o) => {
        if (o.key == prop)
          o.sub.map((p) => {
            p.checked = false;
            return p;
          });
        return o;
      });
      setShippingDetailsFields(OldState);

      var newState = ShippingDetailsFields.map((o) => {
        if (o.key == prop)
          o.sub.map((p) => {
            if (p.value == value) p.checked = true;
            return p;
          });
        return o;
      });
      setShippingDetailsFields(newState);

      var newMainData = mainData;
      newMainData["Shipment_Type"] = value == 0 ? "express" : "surface";
      setMainData(newMainData);
    }
  };
  const handelEstimated_Cost_RadionButtononChange = (value) => {
    console.log("value", value);
    // var Estimated_Cost_details = Estimated_Cost.find(o=> o.Estimated_Cost_Select == value);
    // setPaymentDetailsFields({...paymentDetailsFields, shippingCharge:Estimated_Cost_details.Estimated_Cost_Charges});
    var newMainData = mainData;
    newMainData["Estimated_Cost_Select"] = value;
    setMainData(newMainData);
    calulate_total();
  };
  function calulate_total() {
    if (selectedProductData && mainData && Estimated_Cost) {
      var val1 = selectedProductData
        .map((o) => o.Amount)
        .reduce((previousValue, currentValue) => {
          return previousValue + currentValue;
        });
      var id_Estimated_Cost_Select = mainData.Estimated_Cost_Select;
      var val2 = Estimated_Cost.find(
        (o) => o.Estimated_Cost_Select == id_Estimated_Cost_Select
      ).Estimated_Cost_Charges;
      var subTotal = val1 + val2;
      //console.log("subTotal",subTotal)
      var newtotal = 0;

      if (paymentDetailsFields.Final_Adjustment == "+") {
        newtotal = paymentDetailsFields.adjustment_amount + subTotal;
      } else {
        newtotal = paymentDetailsFields.adjustment_amount - subTotal;
      }

      //console.log("newtotal",newtotal)
      setPaymentDetailsFields({
        ...paymentDetailsFields,
        shippingCharge: val2,
        total: newtotal,
      });
    }
  }

  const handleButtonClick = (key) => {
    //console.log("key", key)      

    var Vendor_Details_card = VendorDetailsFields.find(
      (o) => o.key == "Vendor_Details_card"
    ).data;
    console.log("VendorDetailsFields", Vendor_Details_card);
    console.log("mainData", mainData);
    if (key == "Get Quote") {
      var data = {
        origin_pincode: mainData.origin_zipcode,
        destination_pincode: mainData.destination_zipcode,
        package_details: {
          package_height: mainData.package_height,
          package_length: mainData.package_length,
          package_weight: mainData.package_weight,
          package_breadth: mainData.package_width,
          volumetric_weight: mainData.volumetric_weight,
          product_value: mainData.no_of_items
        },
        is_cod: true,
      };

      dispatch(load_rate_calculator_data(data));
      return true;
    }

    if(key == "Search From Contacts")
    {
      dispatch(loadContactsData(params));
      setContactModalOpen(true);
      return;
    }
    if(key == "Confirm")
    {
      // console.log("ContactData", ContactData)
      var Senderdata = [{
        label: "Sender Name",
        type: "input",
        key: "sender_address_name",
        value: ContactData && ContactData.address_details[0] && ContactData.address_details[0].contact_person_name
      },
      {
        label: "Mobile Number",
        type: "input",
        key: "sender_address_number",
        value: ContactData && ContactData.address_details[0] && ContactData.address_details[0].contact_person_number
      },
      {
        label: "Email",
        type: "input",
        key: "sender_address_email",
        value: ContactData && ContactData.primary_email //not available in payload
      },
      {
        label: "Address Line 1",
        type: "input",
        key: "sender_address_address_line_1",
        value: ContactData && ContactData.address_details[0] && ContactData.address_details[0].address_line_1
      },
      {
        label: "Address Line 2",
        type: "input",
        key: "sender_address_address_line_2",
        value: ContactData && ContactData.address_details[0] && ContactData.address_details[0].address_line_2 
      },
      {
        label: "Address Line 3",
        type: "input",
        key: "sender_address_address_line_3",
        value: ContactData && ContactData.address_details[0] && ContactData.address_details[0].address_line_3
      },
      {
        label: "Country",
        type: "select",
        key: "Sender_address_country",  
        value: {id:ContactData && ContactData.address_details[0] && ContactData.address_details[0].country && ContactData.address_details[0].country.id, label:ContactData && ContactData.address_details[0] && ContactData.address_details[0].country && ContactData.address_details[0].country.name}
      },
      {
        label: "State",
        type: "select",
        key: "sender_address_State", 
        value: ContactData && ContactData.address_details[0] && ContactData.address_details[0].country && ContactData.address_details[0].state.name
      },
      {
        label: "City/District",
        type: "input",
        key: "sender_address_District",
        value: ContactData && ContactData.address_details[0] && ContactData.address_details[0].city
      }, 
      {
        label: "Zipcode",
        type: "input",
        key: "sender_address_Zipcode",
        value: ContactData && ContactData.address_details[0] && ContactData.address_details[0].pin_code
      },]
      setCustomerSenderFields(Senderdata);
      var newMainData=mainData;
      Senderdata.map(o=> newMainData[o.key]=o.value);
      setMainData(newMainData);
      setContactModalOpen(false);
      return;
    }

    if (key == "Cancel") {
      navigate.push("/shippingOrders/");
      return;
    } 
    var body = {
      "shipping_number": "",
      "reference_number": "",
      "channel_id": 2,
      "sender_address": {
        "name": mainData?.sender_address_name,
        "mobile": mainData?.sender_address_number.toString(),
        "nickname": "",
        "email": mainData?.sender_address_email,
        "addressline1": mainData?.sender_address_address_line_1,
        "addressline2": mainData?.sender_address_address_line_2,
        "addressline3": mainData?.sender_address_address_line_3,
        "pincode": parseInt(mainData?.sender_address_Zipcode ?? 0),
        "city": mainData?.sender_address_District,
        "state": mainData?.sender_address_State?.label,
        "country": mainData?.Sender_address_country?.label,
      },
      "receiver_address": {
        "name": mainData.ShippingAddress_Receiver_Name,
        "mobile": mainData.ShippingAddress_Mobile_Number.toString(),
        "email": mainData.ShippingAddress_Email,
        "addressline1": mainData.ShippingAddress_address_line_1,
        "addressline2": mainData.ShippingAddress_address_line_2,
        "addressline3": mainData.ShippingAddress_address_line_3,
        "pincode": parseInt(mainData.ShippingAddress_Zipcode ?? 0),
        "city": mainData.ShippingAddress_District,
        "state": mainData?.ShippingAddress_State?.label,
        "country": mainData?.ShippingAddress_Country?.label,
      },
      "billing_address": {
        "name": mainData?.BillingAddress_Receiver_Name,
        "mobile": mainData?.BillingAddress_Mobile_Number.toString(),
        "email": mainData?.BillingAddress_Email,
        "addressline1": mainData?.BillingAddress_address_line_1,
        "addressline2": mainData?.BillingAddress_address_line_2,
        "addressline3": mainData?.BillingAddress_address_line_3,
        "pincode": parseInt(mainData?.BillingAddress_Zipcode ?? 0),
        "city": mainData?.BillingAddress_District,
        "state": mainData?.BillingAddress_State?.label,
        "country": mainData?.BillingAddress_Country?.label, 
      },
      "shipping_date": "2022-05-30T08:54:24.32947Z",
      "partner_id": 1,
      "package_details": {
        "package_height": parseInt(mainData?.package_height),
        "package_length": parseInt(mainData?.package_length),
        "package_weight": parseInt(mainData?.package_weight),
        "package_width": parseInt(mainData?.package_width),
        "volumetric_weight": parseInt(mainData?.volumetric_weight),
        "no_of_items": parseInt(mainData?.no_of_items),
      },
      "is_shipping_address": true,
      "supplier_id": 32,
      "shipping_cost": 878.98,
      "shipping_status_id": 193,
      "shipping_label_id": {
        "name": "shipping_label_docs"
      },
      "shipping_manifest_id": {
        "name": "shipping_manifest_docs"
      },
      "shipping_invoice_id": {
        "name": "shipping_invoice_docs"
      },
      "order_value": 78.23,
      "shipping_payment_type_id": 37,
      "expected_delivery_date": "2022-05-30T08:54:24.32947Z",
      "pickup_attempted": 2,
      "is_marketplace_order": false,
      "order_id": 1,
      "order_date": "2022-05-30T08:54:24.32947Z",
      "eunimart_wallet_amount": 989.89,
      "set_pickup_date": new Date(mainData.Schedule_Pickup_date),
      "set_pickup_from_time": mainData.Schedule_Pickup_time_from,
      "set_pickup_to_time": mainData.Schedule_Pickup_time_to,
      "shipping_partner_id": 1,
      "awb_number": "AWB-6273911",
      "is_cod": false,
      "shipping_type_id": 252,
      "shipping_mode_id": 253,
      "quantity": 50,
      "billing_details": {
        "order_id": "ORD-1234",
        "invoice_number": "INV-0987",
        "currency": "INR",
        "tax_amount": 898.2,
        "invoice_amount": 972.3,
        "gstin": "GST876092",
        "iec_number": "IEC-7969",
        "hsn_code": "HSC-8R98978"
      },
      "destination_country_id": 1,
      "destination_zipcode": parseInt(mainData.destination_zipcode),
      "origin_country_id": 2,
      "origin_zipcode": parseInt(mainData.origin_zipcode),
      "package_direction_id": 246,
      "cod_status": "Not Received",
      "cod_due_amount": 989.98,
      "cod_amount_received": 343.34,
      "cod_date_and_time_of_receiving": "2022-05-30T08:54:24.32947Z",
      shipping_order_lines:selectedProductData.map(o=>{return{
            "product_id": o?.id,
            "product_template_id": o?.product_template_id,
            "warehouse_id": 1,
            "inventory_id": 1,
            "uom_id": o?.uom?.id,
            "serial_number": o?.serial_number,
            "item_quantity": parseInt(o?.Quantity),
            "unit_price": parseFloat(o?.selling_price),
            "discount": parseFloat(o?.discount),
            "tax_price": parseFloat(o?.product_pricing_details?.tax_options),
            "amount": o?.Amount,
            "payment_term_id":parseInt(o?.Payment_Terms)
          }}), 
    }
    console.log("body", body); 
    if (props && props.id) {
      dispatch(
        Update_Shipping_Order_Data(props.id, body, function (resp) {
          toast(resp);
        })
      );
    } else {
      dispatch(
        Save_Sales_Order_Data(body, function (resp) {
          toast(resp);
        })
      );
    }
  };

  const [Country, setCountry] = useState();
  const handelSelectonChange = (key, value) => {
    console.log("key", key);
    console.log("value", value);
    if(key == "id")
    {
      var sdata = contactsdata.find(o=> o.id == value); 
      setContactData(sdata);
    }
    switch (key) {
      case "Sender_address_country": {
        setCustomerSenderFields(
          CustomerSenderDetailsFields.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        CustomerSenderDetailsFields[key] = value.id;
        break;
      }
      case "sender_address_State": {
        setCustomerSenderFields(
          CustomerSenderDetailsFields.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        CustomerSenderDetailsFields[key] = value.id;
        break;
      }
      case "ShippingAddress_Country": {
        setCustomerShippingAddressFields(
          CustomerShippingAddressFields.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        CustomerShippingAddressFields[key] = value.id;
        break;
      }
      case "ShippingAddress_State": {
        setCustomerShippingAddressFields(
          CustomerShippingAddressFields.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        CustomerShippingAddressFields[key] = value.id;
        break;
      }
      case "BillingAddress_Country": {
        setCustomerBillingAddressFields(
          CustomerBillingAddressFields.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        CustomerBillingAddressFields[key] = value.id;
        break;
      }
      case "BillingAddress_State": {
        setCustomerBillingAddressFields(
          CustomerBillingAddressFields.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        CustomerBillingAddressFields[key] = value.id;
        break;
      }
      case "pickup_date": {
        setDateandTime(
          DateandTime.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        DateandTime[key] = value.id;
        break;
      }
      case "pickup_from_time": {
        setDateandTime(
          DateandTime.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        DateandTime[key] = value.id;
        break;
      }
      case "pickup_to_time": {
        setDateandTime(
          DateandTime.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        DateandTime[key] = value.id;
        break;
      }
    }

    if (
      key == "Sender_address_country" ||
      key == "ShippingAddress_Country" ||
      key == "BillingAddress_Country"
    ) {
      setCountry(value.id);
      dispatch(loadStateDataById(value.id));
    }
    if (key == "Vendor_Contact") {
      //dispatch(loadvendorsDataById(value.id));
      // var singleVendorsdata=Vendorsdata.find(o=>o.id==value.id);
      var Vendor_Details_card = VendorDetailsFields.find(
        (o) => o.key == "Vendor_Details_card"
      );

      //var newVendorDetailsFields=VendorDetailsFields.filter(o=>o.key!='Vendor_Details_card');

      Vendor_Details_card.value = [
        {
          label: "Location Name",
          type: "label",
          key: "Vendor_Location",
          // value:(singleVendorsdata && singleVendorsdata.contact && singleVendorsdata.contact.address_details[0] && singleVendorsdata.contact.address_details[0].location_name)
        },
        {
          label: "Registered Address",
          type: "label",
          key: "Vendor_Location",
          // value:
          // (singleVendorsdata && singleVendorsdata.contact && singleVendorsdata.contact.address_details && singleVendorsdata.contact.address_details[0].address_line_1) + " " +
          // (singleVendorsdata && singleVendorsdata.contact && singleVendorsdata.contact.address_details && singleVendorsdata.contact.address_details[0].address_line_2) + " " +
          // (singleVendorsdata && singleVendorsdata.contact && singleVendorsdata.contact.address_details && singleVendorsdata.contact.address_details[0].address_line_3) + " " +
          // (singleVendorsdata && singleVendorsdata.contact && singleVendorsdata.contact.address_details && singleVendorsdata.contact.address_details[0].land_mark) + " " +
          // (singleVendorsdata && singleVendorsdata.contact && singleVendorsdata.contact.address_details && singleVendorsdata.contact.address_details[0].pin_code)
        },
        {
          label: "Location Incharge",
          type: "label",
          key: "Vendor_Location",
          // value:(singleVendorsdata && singleVendorsdata.name)
        },
      ];
      // Vendor_Details_card.data=singleVendorsdata;
      //newVendorDetailsFields.push(Vendor_Details_card);

      var sData = VendorDetailsFields.map((o) => {
        if (o.key == "Vendor_Details_card") o.value = Vendor_Details_card.value;
        return o;
      });
      setVendorDetailsFields(sData);
    }

    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);
  };

  const setRadioType = (prop, value) => {};

  const handelCheckBoxonChange = (field) => {
    console.log("onCheckboxChanges", field);
  };

  const [CheckboxShowForCopyField_value, setCheckboxShowForCopyField_value] =
    useState(false);
  const handelCheckboxShowForCopyField_valueChange = (field) => {     
    console.log("onCheckboxChanges", field);
    setCheckboxShowForCopyField_value(!CheckboxShowForCopyField_value);
    
    var newCustomerShippingAddressFields=CustomerShippingAddressFields.map(o=> {
      return{
      ...o,
      value:mainData[
        o.key.replace("ShippingAddress_Receiver_Name", "sender_address_name")
             .replace("ShippingAddress_Mobile_Number", "sender_address_number")
             .replace("ShippingAddress_Email", "sender_address_email")
             .replace("ShippingAddress_address_line_1", "sender_address_address_line_1")
             .replace("ShippingAddress_address_line_2", "sender_address_address_line_2")
             .replace("ShippingAddress_address_line_3", "sender_address_address_line_3")
             .replace("ShippingAddress_Country", "Sender_address_country")
             .replace("ShippingAddress_State", "sender_address_State")
             .replace("ShippingAddress_District", "sender_address_District")
             .replace("ShippingAddress_Zipcode", "sender_address_Zipcode")
      ]
    }});

    var newMainData=mainData;
    newCustomerShippingAddressFields.map(o=> newMainData[o.key]=o.value);
    setMainData(newMainData);
    console.log("newCustomerBillingAddressFields", newCustomerShippingAddressFields)
    setCustomerShippingAddressFields(newCustomerShippingAddressFields);
  };

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
      {/* <h5>Shipping Estimate</h5>  */}
      <AddForm
        header={"Shipping Details"}
        data={SalesOrderDetailsFields}
        handelInputChange={handelInputChange}
        handelSelectonChange={handelSelectonChange}
        handelCheckBoxonChange={handelCheckBoxonChange}
        setRadioType={setRadioType}
      />
      {/* //Enter Sales Order Details */}
      {/* //Package Details */}
      <AddForm
        header={"Package Details"}
        data={PackageDetailsFields}
        handelInputChange={handelInputChange}
        handelSelectonChange={handelSelectonChange}
        handelCheckBoxonChange={handelCheckBoxonChange}
        handelRadionButtononChange={handelRadionButtononChange}
        IsCheckboxShowForCopyField={false}
        CheckboxShowForCopyField_text={"Create Shipping"}
        CheckboxShowForCopyField_value={false}
        handelCheckboxShowForCopyField_valueChange={
          handelCheckboxShowForCopyField_valueChange
        }
        Islabel_priceSpace={true}
      />
      {/* //Package Details */}
      {/* //Estimated Cost */}
      <RemoteViewBox_Table
        headCells={Estimated_Cost_headCells}
        table_data={Estimated_Cost}
        header={"Estimated Cost"}
        IsBouttonShow={true}
        ButtonName={"Get Quote"}
        handleButtonClick={handleButtonClick}
        handelEstimated_Cost_RadionButtononChange={
          handelEstimated_Cost_RadionButtononChange
        }
      />
      {/* //Estimated Cost */}

      {/* //Sender Details* */}
      <AddForm
        header={"Sender Details*"}
        data={CustomerSenderDetailsFields.map((field) => {
          switch (field.key) {
            case "Sender_address_country": {
              field.data = Countrydata.map((o) => {
                return { id: o.id, label: o.name };
              });
              break;
            }
            case "sender_address_State": {
              field.data = Statedata.map((o) => {
                return { id: o.id, label: o.name };
              });
              break;
            }
          }
          return field;
        })}
        handelInputChange={handelInputChange}
        handelSelectonChange={handelSelectonChange}
        handelCheckBoxonChange={handelCheckBoxonChange}
        setRadioType={setRadioType} IsButtonShow={true} ButtonText={"Search From Contacts"} handleButtonClick={handleButtonClick}
      />
      {/* //Sender Details* */}

      {/* Receiver Address Details*/}
      <AddForm
        header={"Receiver Address Details*"}
        data={CustomerShippingAddressFields.map((field) => {
          switch (field.key) {
            case "ShippingAddress_Country": {
              field.data = Countrydata.map((o) => {
                return { id: o.id, label: o.name };
              });
              break;
            }
            case "ShippingAddress_State": {
              field.data = Statedata.map((o) => {
                return { id: o.id, label: o.name };
              });
              break;
            }
          }
          return field;
        })}
        handelInputChange={handelInputChange}
        handelSelectonChange={handelSelectonChange}
        handelCheckBoxonChange={handelCheckBoxonChange}
        setRadioType={setRadioType}
        IsCheckboxShowForCopyField={true} CheckboxShowForCopyField_text={"same as Sender address"} 
         CheckboxShowForCopyField_value={CheckboxShowForCopyField_value} 
        handelCheckboxShowForCopyField_valueChange ={handelCheckboxShowForCopyField_valueChange} 
      />
      {/* Receiver Address Details */}

      {/* Billing Address Details */}
      {Countrydata && (
        <AddForm
          header={"Billing Address Details"}
          data={CustomerBillingAddressFields?.map((field) => {
            switch (field.key) {
              case "BillingAddress_Country": {
                field.data =
                  Countrydata &&
                  Countrydata.map((o) => {
                    return { id: o.id, label: o.name };
                  });
                break;
              }
              case "BillingAddress_State": {
                field.data = Statedata.map((o) => {
                  return { id: o.id, label: o.name };
                });
                break;
              }
            }
            return field;
          })}
          handelInputChange={handelInputChange}
          handelSelectonChange={handelSelectonChange}
          handelCheckBoxonChange={handelCheckBoxonChange}
          setRadioType={setRadioType}
          //  IsCheckboxShowForCopyField={true}
          //  CheckboxShowForCopyField_text={"same as shipping address"}
          CheckboxShowForCopyField_value={CheckboxShowForCopyField_value}
          handelCheckboxShowForCopyField_valueChange={
            handelCheckboxShowForCopyField_valueChange
          }
        />
      )}
      {/* Billing Address Details */}

      {/* Selected ProductTable */}
      <AddForm_Table
        headCells={headCells}
        table_data={selectedProductData}
        handelInputChange={handelInputChange}
        header={"Add Products"}
        renderFooter={() => (
          <center style={{ marginTop: 10 }}>
            <Link onClick={onAddNewRaw} underline="none">
              + Add Product Line
            </Link>
          </center>
        )}
      />
      {/* Selected ProductTable */}

      {/* Schedule Pickup date and time */}
      <AddForm header={"Schedule Pickup date and time"} data={Schedule_Pickup_date_and_time} handelInputChange={handelInputChange} handelSelectonChange ={handelSelectonChange} handelCheckBoxonChange ={handelCheckBoxonChange} handelRadionButtononChange={handelRadionButtononChange} IsCheckboxShowForCopyField={false} CheckboxShowForCopyField_text={"Create Shipping"}  CheckboxShowForCopyField_value={false} handelCheckboxShowForCopyField_valueChange ={handelCheckboxShowForCopyField_valueChange} Islabel_priceSpace={true}  />
         
      {/* Schedule Pickup date and time */}

      <AddFormFooter_Button handleButtonClick={handleButtonClick} />
      <ToastContainer />
      <span>{/* {JSON.stringify(SalesMsg)} */}</span>

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
  );
}

export default ShippingAdd;
