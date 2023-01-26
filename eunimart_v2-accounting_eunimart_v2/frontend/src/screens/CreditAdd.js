import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "@mui/material";
import {
  loadCurrencyData,
  loadCountryData,
  loadStateDataById,
  loadPaymentTermsData,
  loadVendorsData,
  loadvendorsDataById,
  loadProductVariantData,
  loadUOMData,
  Save_Sales_Order_Data,
  loadContacsData,
  loadInvoiceData,
  deleteProductLine,
} from "../redux/action";
import HeadingBtn from "../Shared/HeadingBtn/HeadingBtn";
import ContactList from "./ContactList";
import { Update_Sales_Order_Data } from "../redux/UpdateSalesData";
import moment from "moment";
import RemoteViewBox_Table from "Remote/ViewBox_Table";
import { loadSalesDataById } from "../redux/action";
import AddForm from "Remote/AddForm";
import AddFormFooter from "Remote/AddFormFooter";
import AddFormFooter_Button from "Remote/AddFormFooter_Button";
import AddForm_Table from "Remote/AddForm_Table";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DispatchLoctionDetails from "./DispatchLocationDetails";
import { FetchAddress } from "../redux/FetchAddressAction";
import { Countries } from "../redux/CountriesAction";
import DispatchDeliveryDetails from "./DispatchDeliveryDetails";
import { fetchSourceDocumentData } from "../redux/SourceDocumentTypeAction";
import { SearchSourceDocumentData } from "../redux/SearchSourceDocumentAction";
import {
  loadASNData,
  loadASNDataById,
  loadISTData,
  loadISTDataById,
  loadDeliveryData,
  loadDeliveryDataById,
  loadProductOrdersData,
  loadProductOrdersDataByID,
  loadGrnData,
  loadGrnDataById,
  loadScrapOrderData,
  loadScrapOrderDataById,
  loadSalesOrderData,
  loadSalesOrderDataById,
  loadpurchase_returnsData,
  loadpurchase_returnsDataById,
  loadsales_returnsData,
  loadsales_returnsDataById,
  loadSalesInvoiceData,
  loadSalesInvoiceDataById,
} from "../redux/actionTabs";

function CreditAdd(props) {
  const navigate = useHistory();
  const [inputValue, setInputvalue] = useState({});
  const [selectedValue, setSelectedValue] = useState();
  let dispatch = useDispatch();
  const {
    ASNdata,
    ASNViewdata,
    Deliverydata,
    DeliveryViewdata,
    purchaseOrdersData,
    purchaseOrdersDataId,
    GRNdata,
    GRNViewdata,
    ISTdata,
    ISTViewdata,
    ScrapOrderdata,
    ScrapOrderViewdata,
    SalesOrderdata,
    SalesOrderViewdata,
    purchase_returnsdata,
    purchase_returnsViewdata,
    sales_returnsdata,
    sales_returnsViewdata,
    SalesInvoicedata,
    SalesInvoiceViewdata,
  } = useSelector(state => state.tabData);
  const {
    Currencydata,
    Countrydata,
    Statedata,
    Lookupdata,
    Vendorsdata,
    Vendorsdata_Details,
    productVariantData,
    uomData,
    SalesMsg,
    contactsData,
    invoiceData,
  } = useSelector(state => state.data);
  const address = useSelector(state => state.fetchAddress?.data);
  useEffect(() => {
    console.log(address, "contactsInEffect ");
  }, [contacts]);
  const [btnOption, setBtnOption] = useState();
  const [contacts, setContats] = useState([]);
  const [selectedOption, setSelectedOption] = useState(false);
  useEffect(() => {
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
    dispatch(loadContacsData());
    dispatch(loadInvoiceData());
  }, []);

  const salesdata = useSelector(state => state.data.salesdata);
  useEffect(() => {
    console.log("props", props);
    if (props && props.id) {
      const { id } = props;
      dispatch(loadSalesDataById(id));
    }
  }, []);
  useEffect(() => dispatch(fetchSourceDocumentData()), []);
  const SourceDocument = useSelector(
    state => state.fetchSourceDocumentData?.SourceDocument
  );
  console.log(SourceDocument, "SourceDocument");

  useEffect(() => dispatch(SearchSourceDocumentData()), []);
  const SearchSourceDocument = useSelector(
    state => state.SearchSourceDocumentData?.searchSourceDocument
  );
  console.log(SearchSourceDocument, "SearchSourceDocument");

  useEffect(() => {
    console.log("on edit load", selectedProductData);
    if (props && props.id && salesdata) {
      console.log("salesData", salesdata);
      var newMainData = [];

      var newSalesOrderDetailsFields = SalesOrderDetailsFields.map(o => {
        if (o.key == "customer_id") o.value = salesdata?.customer?.first_name;
        if (o.key == "credit_note_date")
          o.value = moment(salesdata?.created_date).format("yyyy-MM-DD");
        if (o.key == "credit_note_id") o.value = salesdata?.credit_note_id;
        if (o.key == "currency_id") o.value = salesdata?.currency?.name;
        if (o.key == "purchase_invoice_id")
          o.value = salesdata?.purchase_invoice?.purchase_invoice_number;

        if (o.key == "reference_id") o.value = salesdata?.reference_id;
        if (o.key == "Source_Document_Type")
          o.value = salesdata?.source_document?.display_name;

        if (o.key == "Select_Source_Document")
          o.value = salesdata?.source_documents?.label;
        return o;
      });
      setSalesOrderDetailsFields(newSalesOrderDetailsFields);

      var newdispatch_delivery_details = CustomerShippingAddressFields;
      // var selectedAdd = dispatch_delivery_details?.address_details[0];
      newdispatch_delivery_details.map(o => {
        if (o.key == "shipping_name")
          o.value = salesdata?.shipping_address_id?.name;

        // if (o.key == "primary_email")
        //   o.value = dispatch_delivery_details?.primary_email;
        //   if (o.key == "primary_phone")
        //   o.value = dispatch_delivery_details?.primary_phone;
        if (o.key == "shipping_primary_email")
          o.value = salesdata?.shipping_address_id?.primary_email;
        if (o.key == "shipping_primary_phone")
          o.value = salesdata?.shipping_address_id?.primary_phone;

        if (o.key == "shipping_address_line_1")
          o.value = salesdata?.shipping_address_id?.address_line_1;
        if (o.key == "shipping_address_line_2")
          o.value = salesdata?.shipping_address_id?.address_line_2;
        if (o.key == "shipping_address_line_3")
          o.value = salesdata?.shipping_address_id?.address_line_3;
        if (o.key == "shipping_pin_code")
          o.value = salesdata?.shipping_address_id?.pin_code;
        if (o.key == "shipping_city")
          o.value = salesdata?.shipping_address_id?.city;
      });
      setCustomerShippingAddressFields(newdispatch_delivery_details);

      var newdispatch_location_details = CustomerBillingAddressFields;
      // var selectedAdd = dispatch_delivery_details?.address_details[0];
      newdispatch_location_details.map(o => {
        if (o.key == "billing_name")
          o.value = salesdata?.billing_address_id?.name;

        // if (o.key == "primary_email")
        //   o.value = dispatch_delivery_details?.primary_email;
        //   if (o.key == "primary_phone")
        //   o.value = dispatch_delivery_details?.primary_phone;
        if (o.key == "billing_primary_email")
          o.value = salesdata?.billing_address_id?.primary_email;
        if (o.key == "billing_primary_phone")
          o.value = salesdata?.billing_address_id?.primary_phone;

        if (o.key == "billing_address_line_1")
          o.value = salesdata?.billing_address_id?.address_line_1;
        if (o.key == "billing_address_line_2")
          o.value = salesdata?.billing_address_id?.address_line_2;
        if (o.key == "billing_address_line_3")
          o.value = salesdata?.billing_address_id?.address_line_3;
        if (o.key == "billing_pin_code")
          o.value = salesdata?.billing_address_id?.pin_code;
        if (o.key == "billing_city")
          o.value = salesdata?.billing_address_id?.city;
      });
      setCustomerBillingAddressFields(newdispatch_location_details);

      // var newdispatch_location_details = dispatch_location_details;
      // newdispatch_location_details =
      //   salesdata?.shipping_address?.address_details[0];
      // console.log(newdispatch_location_details, "newdispatch_location_details");
      // set_dispatch_location_details(newdispatch_location_details);

      // var newdispatch_delivery_details = dispatch_delivery_details;
      // newdispatch_delivery_details =
      //   salesdata?.billing_address?.address_details[0];
      // console.log(dispatch_delivery_details, "dispatch_delivery_details");
      // set_dispatch_delivery_details(newdispatch_delivery_details);

      var newselectedProductData = [];
      if (salesdata.credit_note_line_items)
        newselectedProductData = salesdata.credit_note_line_items.map(o => {
          return {
            id: o?.product_template_id,
            sku_id: {
              id: o.product_template_id,
              label: o?.product_template_id?.sku_id
                ? o?.product_template_id?.sku_id
                : "SKUV0001",
            },
            product_template_id: o?.product_template_id,
            product_name: o.product_template_id?.product_name
              ? o.product_template_id?.product_name
              : "Jeans",
            uom_id: {
              id: o?.uom_id,
              label: o?.uom?.name ? o?.uom?.name : "Each",
            },

            description: o?.product_template_id?.description
              ? o?.product_template_id?.description
              : "Data",
            // serial_number: o?.serial_number,
            Quantity: parseInt(o.quantity),
            selling_price: parseFloat(o.price),
            discount: parseFloat(o.discount),
            product_pricing_details: { tax_options: o.tax },
            Amount: o.amount,
          };
        });
      setSelectedProductData(newselectedProductData);

      var newAdditionalInformationFields = AdditionalInformationFields;
      newAdditionalInformationFields.find(
        o => o.key == "Additional_Information_Note"
      ).value = salesdata?.internal_notes;
      newAdditionalInformationFields.find(
        o => o.key == "Additional_Information_Terms_Conditions"
      ).value = salesdata?.terms_and_conditions;
      setAdditionalInformationFields(newAdditionalInformationFields);

      if (salesdata)
        setPaymentDetailsFields({
          ...paymentDetailsFields,
          subTotal: salesdata?.sub_total,
          adjustment_amount: salesdata?.adjustments,
          tax: salesdata?.tax,
          shippingCharge: salesdata?.shipping_charges,
          customer_credits: salesdata?.customer_credits,
          total: salesdata?.total_amount,
        });

      newMainData = [
        ...newSalesOrderDetailsFields,
        ...newdispatch_delivery_details,
        ...newdispatch_location_details,
        ...newAdditionalInformationFields,
        ...newselectedProductData,
      ];
      var keyValuePairMainData = {};

      // var keyValuePairMainData = {
      //   newEstimated_Cost: 0,
      //   Estimated_Cost_Select: istdata.shipping_carrier_id,
      // };

      newMainData.map(o => {
        if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      console.log("newMainData", newMainData, keyValuePairMainData);
      setMainData(keyValuePairMainData);
    }
    console.log(mainData, "mainDataaaaaaa");
  }, [salesdata]);

  const [selectedProductData, setSelectedProductData] = useState([
    // {
    //   Quantity: 0,
    //   selling_price: 0,
    //   discount: 0,
    //   product_pricing_details: { tax_options: 0 },
    // },
  ]);

  const [SalesOrderDetailsFields, setSalesOrderDetailsFields] = useState([
    {
      label: "Customer Name",
      type: "select",
      // type: "input",
      key: "customer_id",
      defaultVal: {},
    },
    {
      label: "Purchase InvoiceId",
      type: "select",
      key: "purchase_invoice_id",
      defaultVal: {},
    },
    {
      label: "Credit Note Date",
      type: "date",
      key: "credit_note_date",
      defaultVal: {},
    },
    {
      label: "Currency",
      type: "select",
      key: "currency_id",
      defaultVal: {},
    },
    {
      label: "Credit Note ID*",
      type: "input",
      key: "credit_note_id",
    },
    {
      label: "Auto Generate Credit Note ID",
      type: "checkbox",
      key: "Auto_credit_note_number",
      isChecked: false,
    },
    {
      label: "Reference ID",
      type: "input",
      key: "reference_id",
    },
    {
      label: "Auto Generate Reference ID",
      type: "checkbox",
      key: "Auto_reference_number",
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
  ]);

  const [CustomerShippingAddressFields, setCustomerShippingAddressFields] =
    useState([
      {
        type: "input",
        label: "Reciever Name",
        // errorMessage: "",
        key: "shipping_name",
        defaultVal: {},
      },
      {
        type: "input",
        label: "Email",
        key: "shipping_primary_email",
        defaultVal: {},
      },
      {
        label: "Mobile Number",
        key: "shipping_primary_phone",
        defaultVal: {},
        type: "input",
      },
      {
        label: "Address line 1",
        key: "shipping_address_line_1",
        defaultVal: {},
        type: "input",
      },
      {
        label: "Address line 2",
        key: "shipping_address_line_2",
        defaultVal: {},
        type: "input",
      },
      {
        label: "Address line 3",
        key: "shipping_address_line_3",
        defaultVal: {},
        type: "input",
      },
      {
        label: "Zipcode",
        key: "shipping_pin_code",
        defaultVal: {},
        type: "input",
      },
      {
        label: "City / District",
        key: "shipping_city",
        defaultVal: {},
        type: "input",
      },
      // {
      //   label: "Country",
      //   key: "shipping_country",
      //   value: dispatch_location_details?.country,
      //   errorMessage: "",
      //   required: true,
      //   type: "select",
      //   data: [],
      //   defaultVal: dispatch_location_details?.country,
      // },
      // {
      //   label: "State",
      //   key: "shipping_state",
      //   errorMessage: "",
      //   required: true,
      //   type: "select",
      //   data: [],
      //   defaultVal: dispatch_location_details?.state,
      // },
    ]);

  const [CustomerBillingAddressFields, setCustomerBillingAddressFields] =
    useState([
      {
        type: "input",
        label: "Reciever Name",
        // errorMessage: "",
        key: "billing_name",
        defaultVal: {},
      },
      {
        type: "input",
        label: "Email",
        key: "billing_primary_email",
        defaultVal: {},
      },
      {
        label: "Mobile Number",
        key: "billing_primary_phone",
        defaultVal: {},
        type: "input",
      },
      {
        label: "Address line 1",
        key: "billing_address_line_1",
        defaultVal: {},
        type: "input",
      },
      {
        label: "Address line 2",
        key: "billing_address_line_2",
        defaultVal: {},
        type: "input",
      },
      {
        label: "Address line 3",
        key: "billing_address_line_3",
        defaultVal: {},
        type: "input",
      },
      {
        label: "Zipcode",
        key: "billing_pin_code",
        defaultVal: {},
        type: "input",
      },
      {
        label: "City / District",
        key: "billing_city",
        defaultVal: {},
        type: "input",
      },
      // {
      //   label: "Country",
      //   key: "billing_country",
      //   errorMessage: "",
      //   type: "select",
      //   data: [],
      //   defaultVal: dispatch_delivery_details?.country,
      // },
      // {
      //   label: "State",
      //   key: "billing_state",
      //   errorMessage: "",
      //   required: true,
      //   type: "select",
      //   data: [],
      //   defaultVal: dispatch_delivery_details?.state,
      // },
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
      data: [],
      defaultVal: {},
    },
  ]);

  const [AdditionalInformationFields, setAdditionalInformationFields] =
    useState([
      {
        label: "Note",
        type: "textarea",
        key: "Additional_Information_Note",
        row: 2,
      },
      {
        label: "Terms and Conditions",
        type: "textarea",
        key: "Additional_Information_Terms_Conditions",
        row: 2,
      },
    ]);

  const [paymentDetailsFields, setPaymentDetailsFields] = useState({
    subTotal: 0,
    tax: 0,
    shippingCharge: 0,
    adjustment_text: "",
    Final_Adjustment: "+",
    adjustment_amount: 0,
    totalBeforeAdjustment: 0,
    customer_credits: 0,
    total: 0,
  });

  const [mainData, setMainData] = useState({});
  // var [deletedProductLine, setDeletedProductLine] = useState();

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
      data: useSelector(state =>
        state.data.productVariantData.map(o => {
          return { id: o.id, label: o.sku_id };
        })
      ),
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
      key: "Quantity",
      label: "Quantity",
      type: "number",
    },
    {
      key: "uom.name",
      label: "Unit Of Measurement",
      type: "select",
      data: useSelector(state =>
        state.data.uomData.map(o => {
          return { id: o.id, label: o.name };
        })
      ),
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
      type: "text",
    },
    {
      key: "Action",
      label: "Action",
      type: "view",
      renderView: item => (
        <div>
          <DeleteIcon
            onClick={() => {
              // setDeletedProductLine([...deletedProductLine, item]);
              // dispatch(deleteProductLine(salesdata?.id, item?.sku_id?.id));
              setSelectedProductData(
                selectedProductData.filter(o => o.id != item.id)
              );
            }}
          />
        </div>
      ),
    },
  ];

  const setDataByKeyAndValue = (key, value, index = null) => {
    var newMainData = mainData;

    newMainData[key] = value;

    setMainData(newMainData);
    console.log("key", key, "value", value);
    if (index != null) {
      try {
        var newSelectedProductData = selectedProductData;

        if (key === "sku_id") {
          console.log("sku_id");
          var selectVarient = productVariantData.find(o => o.id == value.id);
          // newSelectedProductData[index] = selectVarient;
          // newSelectedProductData[index][key] = value.label;
          newSelectedProductData[index]["product_id"] = selectVarient["id"];
          newSelectedProductData[index]["product_name"] =
            selectVarient["product_name"];
          newSelectedProductData[index]["product_template_id"] =
            selectVarient["product_template_id"];
          newSelectedProductData[index]["sku_id"] = selectVarient["sku_id"];
        } else if (key === "uom.name") {
          console.log("uom.name");
          var selectVarient = uomData.find(o => o.id == value.id);
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
        console.error("err1", e);
      }
    }

    try {
      var newSalesOrderDetailsFields = SalesOrderDetailsFields.map(o => {
        if (o.key == key) o.value = value;
        return o;
      });
      setSalesOrderDetailsFields(newSalesOrderDetailsFields);
    } catch (e) {
      console.error("err2", e);
    }

    // try {
    //   var newdispatch_delivery_details = dispatch_delivery_details.map((o) => {
    //     if (o.key == key) o.value = value;
    //     return o;
    //   });
    //   setCustomerShippingAddressFields(newdispatch_delivery_details);
    // } catch (e) {
    //   console.error("err3", e);
    // }

    try {
      var newdispatch_location_details = CustomerBillingAddressFields.map(o => {
        if (o.key == key) o.value = value;
        return o;
      });
      setCustomerBillingAddressFields(newdispatch_location_details);
    } catch (e) {
      console.error("err4", e);
    }

    try {
      var newPaymentTermsFields = PaymentTermsFields.map(o => {
        if (o.key == key) o.value = value;
        return o;
      });
      setPaymentTermsFields(newPaymentTermsFields);
    } catch (e) {
      console.error("err5", e);
    }

    try {
      var newAdditionalInformationFields = AdditionalInformationFields.map(
        o => {
          if (o.key == key) o.value = value;
          return o;
        }
      );
      setAdditionalInformationFields(newAdditionalInformationFields);
    } catch (e) {
      console.error("err1", e);
    }

    // try {
    //   var newCustomerShippingAddressFields = CustomerShippingAddressFields.map(
    //     (o) => {
    //       if (o.key == key) o.value = value;
    //       return o;
    //     }
    //   );
    //   setCustomerShippingAddressFields(newCustomerShippingAddressFields);
    // } catch (e) {
    //   console.error("err9", e);
    // }

    try {
      var newCustomerShippingAddressFields = CustomerShippingAddressFields.map(
        o => {
          if (o.key == key) o.value = value;
          return o;
        }
      );
      setCustomerShippingAddressFields(newCustomerShippingAddressFields);
    } catch (e) {
      console.error("err9", e);
    }

    try {
      if (key == "Final_Enter_Amount") {
        var nvalue = 0;
        if (value) nvalue = parseFloat(value);

        var newpaymentDetailsFields = paymentDetailsFields;
        newpaymentDetailsFields.adjustment_amount = nvalue;
        setPaymentDetailsFields(newpaymentDetailsFields);
      }
    } catch (e) {
      console.error("err1", e);
    }
  };

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
        console.log("sku_id");
        var selectVarient = productVariantData.find(o => o?.id == value?.id);
        console.log("selectVarientInInputChange", selectVarient);
        // newSelectedProductData[index] = selectVarient;
        // newSelectedProductData[index][key] = value.label;
        newSelectedProductData[index]["product_id"] = selectVarient["id"];
        newSelectedProductData[index]["product_name"] =
          selectVarient["product_name"];
        newSelectedProductData[index]["product_template_id"] =
          selectVarient["product_template_id"];
        newSelectedProductData[index]["sku_id"] = selectVarient["sku_id"];
      } else if (key === "uom.name") {
        console.log("uom.name");
        var selectVarient = uomData.find(o => o?.id == value?.id);
        newSelectedProductData[index].uom = { name: value.label, id: value.id };
      } else {
        console.log(key);
        if (key.toString().includes("."))
          newSelectedProductData[index][key.split(".")[0]][key.split(".")[1]] =
            value;
        else newSelectedProductData[index][key] = value;
      }
      var Quantity = 0;
      var selling_price = 0;
      var discount = 0;
      if (newSelectedProductData[index].Quantity)
        Quantity = parseInt(newSelectedProductData[index].Quantity);
      if (newSelectedProductData[index].selling_price)
        selling_price = parseFloat(newSelectedProductData[index].selling_price);
      if (newSelectedProductData[index].discount)
        discount = parseFloat(newSelectedProductData[index].discount);

      //calculation
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

      var total = newSelectedProductData
        .map(o => o.Amount)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      if (paymentDetailsFields.Final_Adjustment == "+") {
        total = total + paymentDetailsFields.adjustment_amount;
      } else {
        total = total - paymentDetailsFields.adjustment_amount;
      }
      setPaymentDetailsFields({
        ...paymentDetailsFields,
        subTotal: grossTotal,
        tax:
          newSelectedProductData[0]?.product_pricing_details?.tax_options ?? 0,
        totalBeforeAdjustment: total,
        total: total,
      });
    } else {
      var newMainData = mainData;

      newMainData[key] = value;

      setMainData(newMainData);
    }

    if (key == "Final_Enter_Amount") {
      var nvalue = 0;
      if (value) nvalue = parseFloat(value);

      var newtotal = 0;
      if (paymentDetailsFields.Final_Adjustment == "+") {
        newtotal = paymentDetailsFields.totalBeforeAdjustment + nvalue;
      } else {
        newtotal = paymentDetailsFields.totalBeforeAdjustment - nvalue;
      }

      setPaymentDetailsFields({
        ...paymentDetailsFields,
        adjustment_amount: nvalue,
        total: newtotal,
      });
    }
  };

  // const [ContactModalOpen, setContactModalOpen] = useState(false);
  // const [ContactData, setContactData] = useState(false);
  // const [params, setParams] = useState({
  //   limit: 10,
  //   offset: 1,
  //   filters: null,
  //   sort: null,
  // });

  // useEffect(() => {
  //   dispatch(loadContacsData(params));
  // }, [params]);

  const handleButtonClick = key => {
    // if (props && props.id) {
    //   deletedProductLine.forEach((e) => {
    //     dispatch(deleteProductLine(salesdata.id, e?.sku_id?.id));
    //   });
    // }
    // if (key == "Search From Contacts") {
    //   dispatch(loadContacsData(params));
    //   setContactModalOpen(true);
    //   return;
    // }
    // if (key == "Confirm") {
    //   // console.log("ContactData", ContactData)
    //   var shipingdata = [
    //     {
    //       label: "Receiver Name",
    //       type: "input",
    //       key: "ShippingAddress_Receiver_Name",
    //       value:
    //         ContactData &&
    //         ContactData.address_details[0] &&
    //         ContactData.address_details[0].contact_person_name,
    //     },
    //     {
    //       label: "Mobile Number",
    //       type: "input",
    //       key: "ShippingAddress_Mobile_Number",
    //       value:
    //         ContactData &&
    //         ContactData.address_details[0] &&
    //         ContactData.address_details[0].contact_person_number,
    //     },
    //     {
    //       label: "Email",
    //       type: "input",
    //       key: "ShippingAddress_Email",
    //       value: ContactData && ContactData.primary_email, //not available in payload
    //     },
    //     {
    //       label: "Address Line 1",
    //       type: "input",
    //       key: "ShippingAddress_address_line_1",
    //       value:
    //         ContactData &&
    //         ContactData.address_details[0] &&
    //         ContactData.address_details[0].address_line_1,
    //     },
    //     {
    //       label: "Address Line 2",
    //       type: "input",
    //       key: "ShippingAddress_address_line_2",
    //       value:
    //         ContactData &&
    //         ContactData.address_details[0] &&
    //         ContactData.address_details[0].address_line_2,
    //     },
    //     {
    //       label: "Address Line 3",
    //       type: "input",
    //       key: "ShippingAddress_address_line_3",
    //       value:
    //         ContactData &&
    //         ContactData.address_details[0] &&
    //         ContactData.address_details[0].address_line_3,
    //     },
    //     {
    //       label: "Country",
    //       type: "select",
    //       key: "ShippingAddress_Country",
    //       value: {
    //         id:
    //           ContactData &&
    //           ContactData.address_details[0] &&
    //           ContactData.address_details[0].country &&
    //           ContactData.address_details[0].country.id,
    //         label:
    //           ContactData &&
    //           ContactData.address_details[0] &&
    //           ContactData.address_details[0].country &&
    //           ContactData.address_details[0].country.name,
    //       },
    //     },
    //     {
    //       label: "State",
    //       type: "select",
    //       key: "ShippingAddress_State",
    //       value:
    //         ContactData &&
    //         ContactData.address_details[0] &&
    //         ContactData.address_details[0].country &&
    //         ContactData.address_details[0].state.name,
    //     },
    //     {
    //       label: "City/District",
    //       type: "input",
    //       key: "ShippingAddress_District",
    //       value:
    //         ContactData &&
    //         ContactData.address_details[0] &&
    //         ContactData.address_details[0].city,
    //     },
    //     {
    //       label: "Zipcode",
    //       type: "input",
    //       key: "ShippingAddress_Zipcode",
    //       value:
    //         ContactData &&
    //         ContactData.address_details[0] &&
    //         ContactData.address_details[0].pin_code,
    //     },
    //   ];
    //   setCustomerShippingAddressFields(shipingdata);
    //   var newMainData = mainData;
    //   shipingdata.map((o) => (newMainData[o.key] = o.value));
    //   setMainData(newMainData);
    //   setContactModalOpen(false);
    //   return;
    // }

    console.log(salesdata?.billing_address?.pin_code, "pincode");
    if (key == "Cancel") {
      navigate.push("/creditNote");
      return;
    }
    console.log(mainData, "mainData");
    console.log("selectedProductData", selectedProductData);
    var body =
      //   credit_note_line_items: selectedProductData.map((o) => {
      //     return {
      //       product_variant_id: o?.id,
      //       product_template_id: o?.product_template_id,
      //       uom_id: o?.uom?.id,
      //       tax: o?.tax,
      //       product_name: o?.product_name,
      //       description: o?.description,
      //       quantity: parseInt(o?.Quantity),
      //       selling_price: o?.selling_price,
      //       discount: parseInt(o?.discount),
      //       product_pricing_details: o?.product_pricing_details?.tax,
      //       amount: parseFloat(o?.Amount),
      //     };
      //   }),

      {
        customer_id: mainData?.customer_id?.id,
        purchase_invoice_id: mainData?.purchase_invoice_id?.id,
        currency_id: Number(mainData?.currency_id?.id),
        credit_note_id: mainData?.credit_note_id,
        reference_id: mainData?.reference_id,

        reason_id: 60,
        status_id: 375,
        billing_address_id: {
          name: mainData?.billing_name,
          primary_email: mainData?.billing_primary_email,
          primary_phone: mainData?.billing_primary_phone,
          address_line_1: mainData?.billing_address_line_1,
          address_line_2: mainData?.billing_address_line_2,
          address_line_3: mainData?.billing_address_line_3,
          pin_code: mainData?.billing_pin_code,
          city: mainData?.billing_city,
          country: mainData?.billing_country,
          state: mainData?.billing_state,
        },
        shipping_address_id: {
          name: mainData?.shipping_name,
          primary_email: mainData?.shipping_primary_email,
          primary_phone: mainData?.shipping_primary_phone,
          address_line_1: mainData?.shipping_address_line_1,
          address_line_2: mainData?.shipping_address_line_2,
          address_line_3: mainData?.shipping_address_line_3,
          pin_code: mainData?.shipping_pin_code,
          city: mainData?.shipping_city,
          country: mainData?.shipping_country,
          state: mainData?.shipping_state,
        },
        internal_notes: mainData?.Additional_Information_Note,
        external_notes: mainData?.Additional_Information_Note,
        terms_and_conditions: mainData?.Additional_Information_Terms_Conditions,
        attachments: {},
        sub_total: paymentDetailsFields?.subTotal,
        tax: parseFloat(paymentDetailsFields?.tax),
        shipping_charges: parseFloat(paymentDetailsFields.shippingCharge),
        adjustments: paymentDetailsFields?.adjustment_amount,
        customer_credits: 100,
        total_amount: paymentDetailsFields?.total,
        // source_documents: {},
        // source_document_type_id: mainData?.Source_Document_Type,
        source_document_type_id:
          mainData?.Source_Document_Type?.id &&
          mainData?.Source_Document_Type?.id?.id
            ? mainData?.Source_Document_Type?.id?.id
            : mainData?.Source_Document_Type?.id,
        source_documents: {
          id: mainData?.Select_Source_Document?.id,
          label: mainData?.Select_Source_Document?.label,
        },
        credit_note_line_items: selectedProductData.map(o => {
          return {
            product_id: o?.product_template_id
              ? parseInt(o?.product_template_id)
              : parseInt(o?.id),
            product_variant_id: o?.product_template_id
              ? parseInt(o?.product_template_id)
              : parseInt(o?.id),
            product_template_id: o?.product_template_id
              ? parseInt(o?.product_template_id)
              : parseInt(o?.id),
            product_name: o?.product_name,
            // description: o?.description?.data,
            quantity: parseInt(o?.Quantity),
            // uom: {
            //   name: { id: o?.uom?.name?.id, label: o?.uom?.name?.label },
            // },
            uom_id: o?.uom?.id ? o?.uom?.id : o?.uom?.name?.id,
            price: parseInt(o?.selling_price),
            discount: parseInt(o?.discount),
            tax: parseFloat(o?.product_pricing_details?.tax_options),
            amount: o?.Amount,
          };
        }),
      };

    console.log("body", body);

    if (props && props.id) {
      body["id"] = parseInt(props.id);
      dispatch(
        Update_Sales_Order_Data(props.id, body, function (resp) {
          toast(resp);
        })
      );
    } else {
      dispatch(
        Save_Sales_Order_Data(body, function (resp) {
          console.log("SalesMsg", resp);
          toast(resp);
        })
      );
      navigate.push("/creditNote");
    }
  };

  const [Country, setCountry] = useState();

  // const searchContactHandler = () => {
  //   setSelectedOption((prev) => !prev);
  //   setBtnOption("selectedContacts");
  // };

  // const handleClosePopUp = (option, row) => {
  //   if (option === "priceList") {
  //     setSelectedOption((prev) => !prev);
  //   }
  //   if (option === "products") {
  //     setSelectedOption((prev) => !prev);
  //   }
  //   if (option === "selectedContacts") {
  //     setSelectedOption((prev) => !prev);
  //   }
  //   if (option === "selectedBillingContacts") {
  //     setSelectedOption((prev) => !prev);
  //   }
  // };

  // const contactShippingHandler = () => {
  //   set_dispatch_location_details(selectedValue);
  //   const selCon = contacts.find((item) => {
  //     return item.id == selectedValue;
  //   });
  //   console.log("selCon", selCon, contacts);
  //   const temp = CustomerShippingAddressFields;
  //   temp.map((fields) => {
  //     const index = temp.findIndex(function (rows) {
  //       return rows.key == fields.key;
  //     });
  //     switch (fields.key) {
  //     }
  //   });
  //   setCustomerShippingAddressFields(temp);
  //   handleClosePopUp("priceList", "");
  // };

  //ASN
  console.log("!!!!!!!!!!!", ASNViewdata);
  useEffect(() => {
    if (
      ASNViewdata &&
      mainData &&
      mainData.Source_Document_Type &&
      mainData.Source_Document_Type.lookup_code == "ASN"
    ) {
      console.log("ASNVie@@@@@@@@@@wdata", ASNViewdata);
      var newMainData = [];

      var newSalesOrderDetailsFields = SalesOrderDetailsFields.map(o => {
        if (o.key == "reference_id") o.value = ASNViewdata?.reference_number;

        return o;
      });
      setSalesOrderDetailsFields(newSalesOrderDetailsFields);

      var newCustomerShippingAddressFields = CustomerShippingAddressFields.map(
        o => {
          if (o.key == "shipping_name")
            o.value =
              ASNViewdata?.dispatch_location_details?.contact_person_name;
          if (o.key == "shipping_primary_phone")
            o.value =
              ASNViewdata?.dispatch_location_details?.contact_person_number;
          if (o.key == "shipping_primary_email")
            o.value = ASNViewdata?.dispatch_location_details?.email;
          if (o.key == "shipping_address_line_1")
            o.value = ASNViewdata?.dispatch_location_details?.address_line_1;
          if (o.key == "shipping_address_line_2")
            o.value = ASNViewdata?.dispatch_location_details?.address_line_2;
          if (o.key == "shipping_address_line_3")
            o.value = ASNViewdata?.dispatch_location_details?.address_line_3;
          if (o.key == "shipping_state")
            o.value = ASNViewdata?.dispatch_location_details?.state;
          if (o.key == "shipping_country")
            o.value = ASNViewdata?.dispatch_location_details?.country;
          if (o.key == "shipping_city")
            o.value = ASNViewdata?.dispatch_location_details?.city;
          //if(o.key=="ShippingAddress_District") o.value="??";
          if (o.key == "shipping_pin_code")
            o.value = ASNViewdata?.dispatch_location_details?.pin_code;
          return o;
        }
      );
      setCustomerShippingAddressFields(newCustomerShippingAddressFields);

      var newCustomerBillingAddressFields = CustomerBillingAddressFields.map(
        o => {
          if (o.key == "billing_name")
            o.value =
              ASNViewdata?.destination_location_details?.contact_person_name;
          if (o.key == "billing_primary_phone")
            o.value =
              ASNViewdata?.destination_location_details?.contact_person_number;
          if (o.key == "billing_primary_email")
            o.value = ASNViewdata?.destination_location_details?.email;
          if (o.key == "billing_address_line_1")
            o.value = ASNViewdata?.destination_location_details?.address_line_1;
          if (o.key == "billing_address_line_2")
            o.value = ASNViewdata?.destination_location_details?.address_line_2;
          if (o.key == "billing_address_line_3")
            o.value = ASNViewdata?.destination_location_details?.address_line_3;
          if (o.key == "billing_country")
            o.value = ASNViewdata?.destination_location_details?.country;
          if (o.key == "billing_state")
            o.value = ASNViewdata?.destination_location_details?.state;
          if (o.key == "billing_city")
            o.value = ASNViewdata?.destination_location_details?.city;
          //if(o.key=="BillingAddress_District") o.value="??";
          if (o.key == "billing_pin_code")
            o.value = ASNViewdata?.destination_location_details?.pin_code;
          return o;
        }
      );
      setCustomerBillingAddressFields(newCustomerBillingAddressFields);

      var nweselectedProductData = [];
      if (ASNViewdata.asn_order_lines)
        nweselectedProductData = ASNViewdata.asn_order_lines.map(o => {
          return {
            id: o.product_id,
            sku_id: { id: o?.product_id, label: o?.product?.sku_code },
            product_template_id: o.product_template_id,
            product_name: o?.product?.product_name,
            // "warehouse_id": 1,
            // "inventory_id": 1,
            // description: o?.description,
            uom: { name: { id: o?.uom?.id, label: o?.uom?.name } },
            serial_number: o.serial_number,
            Quantity: parseInt(o.quantity),
            selling_price: parseFloat(o.rate),
            discount: parseFloat(o.discount_value),
            product_pricing_details: { tax_options: o.tax },
            Amount: o.amount,
            //"Payment_Terms":o.product_details.Payment_Terms
          };
        });
      setSelectedProductData(nweselectedProductData);

      // var newEstimated_Cost = ISTViewdata?.shipping_details?.estimated_cost.map(data=>{
      //   return{"Estimated_Cost_Shipping_Partners":data.shipping_partner,
      //   "Estimated_Cost_Charges":data.charges,
      //   "Estimated_Cost_Order_Deliver_Time":data.order_delivery_time,
      //   "Estimated_Cost_Select":ISTViewdata.shipping_mode_id
      //   };
      // });

      /* Estimated Cost Data Not In Array */
      // var estimated_cost_data = ASNViewdata?.shipping_details?.estimated_cost;
      // var newEstimated_Cost =
      // [{"Estimated_Cost_Shipping_Partners":estimated_cost_data.shipping_partner,
      //   "Estimated_Cost_Charges":estimated_cost_data.charges,
      //   "Estimated_Cost_Order_Deliver_Time":estimated_cost_data.order_delivery_time,
      //   "Estimated_Cost_Select":ISTViewdata.shipping_mode_id
      // }];
      // setEstimated_Cost(newEstimated_Cost);

      // var newSchedule_Pickup_date_and_time = Schedule_Pickup_date_and_time.map(
      //   (o) => {
      //     if (o.key == "Schedule_Pickup_date")
      //       o.value = moment(
      //         ASNViewdata?.pickup_date_and_time?.pickup_date
      //       ).format("YYYY-MM-DD");
      //     if (o.key == "Schedule_Pickup_time")
      //       o.value = o.value.map((p) => {
      //         if (p.key == "Schedule_Pickup_time_from")
      //           p.value = moment(
      //             ASNViewdata?.pickup_date_and_time?.pickup_from_time
      //           );
      //         if (p.key == "Schedule_Pickup_time_to")
      //           p.value = moment(
      //             ASNViewdata?.pickup_date_and_time?.pickup_to_time
      //           );
      //         return p;
      //       });
      //     return o;
      //   }
      // );
      // setSchedule_Pickup_date_and_time(newSchedule_Pickup_date_and_time);

      newMainData = [
        ...newSalesOrderDetailsFields,
        ...newCustomerShippingAddressFields,
        ...newCustomerBillingAddressFields,
        ...nweselectedProductData,

        // ...newPackageDetailsFields,
        // ...newSchedule_Pickup_date_and_time,
      ];
      var keyValuePairMainData = {
        newEstimated_Cost: 0,
        Estimated_Cost_Select: ASNViewdata.shipping_mode_id,
      };

      newMainData.map(o => {
        if (o.key == "Schedule_Pickup_time") {
          o.value.map(p => {
            keyValuePairMainData[p.key] = p.value;
          });
        } else if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      setMainData(keyValuePairMainData);
    }
  }, [ASNViewdata]);

  //IST
  useEffect(() => {
    if (
      ISTViewdata &&
      mainData &&
      mainData.Source_Document_Type &&
      mainData.Source_Document_Type.lookup_code == "IST"
    ) {
      var newMainData = [];

      var newSalesOrderDetailsFields = SalesOrderDetailsFields.map(o => {
        if (o.key == "reference_id") o.value = ISTViewdata?.reference_number;
        return o;
      });
      setSalesOrderDetailsFields(newSalesOrderDetailsFields);

      var newCustomerShippingAddressFields = CustomerShippingAddressFields.map(
        o => {
          if (o.key == "shipping_name")
            o.value = ISTViewdata?.source_warehouse?.name;
          if (o.key == "shipping_primary_phone")
            o.value = ISTViewdata?.source_warehouse?.mobile_number;
          if (o.key == "shipping_primary_email")
            o.value = ISTViewdata?.source_warehouse?.email;
          if (o.key == "shipping_address_line_1")
            o.value = ISTViewdata?.source_warehouse?.address?.address_line_1;
          if (o.key == "shipping_address_line_2")
            o.value = ISTViewdata?.source_warehouse?.address?.address_line_2;
          if (o.key == "shipping_address_line_3")
            o.value = ISTViewdata?.source_warehouse?.address?.address_line_3;
          if (o.key == "shipping_country")
            o.value = ISTViewdata?.source_warehouse?.address?.country?.name;
          if (o.key == "shipping_state")
            o.value = ISTViewdata?.source_warehouse?.address?.state?.name;
          if (o.key == "shipping_city")
            o.value = ISTViewdata?.source_warehouse?.city;
          //if(o.key=="ShippingAddress_District") o.value="??";
          if (o.key == "shipping_pin_code")
            o.value = ISTViewdata?.source_warehouse?.address?.pin_code;
          return o;
        }
      );
      setCustomerShippingAddressFields(newCustomerShippingAddressFields);

      var newCustomerBillingAddressFields = CustomerBillingAddressFields.map(
        o => {
          if (o.key == "billing_name")
            o.value = ISTViewdata?.destination_warehouse?.name;
          if (o.key == "billing_primary_phone")
            o.value = ISTViewdata?.destination_warehouse?.mobile_number;
          if (o.key == "billing_primary_email")
            o.value = ISTViewdata?.destination_warehouse?.email;
          if (o.key == "billing_address_line_1")
            o.value =
              ISTViewdata?.destination_warehouse?.address?.address_line_1;
          if (o.key == "billing_address_line_2")
            o.value =
              ISTViewdata?.destination_warehouse?.address?.address_line_2;
          if (o.key == "billing_address_line_3")
            o.value =
              ISTViewdata?.destination_warehouse?.address?.address_line_3;
          if (o.key == "billing_country")
            o.value =
              ISTViewdata?.destination_warehouse?.address?.country?.name;
          if (o.key == "billing_state")
            o.value = ISTViewdata?.destination_warehouse?.address?.state?.name;
          if (o.key == "billing_city")
            o.value = ISTViewdata?.destination_warehouse?.city;
          //if(o.key=="ShippingAddress_District") o.value="??";
          if (o.key == "billing_pin_code")
            o.value = ISTViewdata?.destination_warehouse?.address?.pin_code;
          return o;
        }
      );
      setCustomerBillingAddressFields(newCustomerBillingAddressFields);

      var nweselectedProductData = [];
      if (ISTViewdata.internal_transfer_lines)
        nweselectedProductData = ISTViewdata.internal_transfer_lines.map(o => {
          return {
            id: o.product_id,
            sku_id: { id: o?.product_id, label: o?.product_details?.sku_id },
            product_template_id: o.product_template_id,
            product_name: o?.product_details?.product_name,
            // "warehouse_id": 1,
            // "inventory_id": 1,
            uom: { name: { id: o?.uom?.id, label: o?.uom?.name } },
            serial_number: o?.product_details?.serial_number,
            Quantity: parseInt(o.quantity),
            selling_price: parseFloat(o.rate),
            discount: parseFloat(o.discount_value),
            product_pricing_details: { tax_options: o.tax },
            Amount: o.amount,
            //"Payment_Terms":o.product_details.Payment_Terms
          };
        });
      setSelectedProductData(nweselectedProductData);

      // var newEstimated_Cost = ISTViewdata?.shipping_details?.estimated_cost.map(data=>{
      //   return{"Estimated_Cost_Shipping_Partners":data.shipping_partner,
      //   "Estimated_Cost_Charges":data.charges,
      //   "Estimated_Cost_Order_Deliver_Time":data.order_delivery_time,
      //   "Estimated_Cost_Select":ISTViewdata.shipping_mode_id
      //   };
      // });

      /* Estimated Cost Data Not In Array */
      // var estimated_cost_data = ASNViewdata?.shipping_details?.estimated_cost;
      // var newEstimated_Cost =
      // [{"Estimated_Cost_Shipping_Partners":estimated_cost_data.shipping_partner,
      //   "Estimated_Cost_Charges":estimated_cost_data.charges,
      //   "Estimated_Cost_Order_Deliver_Time":estimated_cost_data.order_delivery_time,
      //   "Estimated_Cost_Select":ISTViewdata.shipping_mode_id
      // }];
      // setEstimated_Cost(newEstimated_Cost);

      // var newSchedule_Pickup_date_and_time = Schedule_Pickup_date_and_time.map(
      //   (o) => {
      //     if (o.key == "Schedule_Pickup_date")
      //       o.value = moment(
      //         ASNViewdata?.pickup_date_and_time?.pickup_date
      //       ).format("YYYY-MM-DD");
      //     if (o.key == "Schedule_Pickup_time")
      //       o.value = o.value.map((p) => {
      //         if (p.key == "Schedule_Pickup_time_from")
      //           p.value = moment(
      //             ASNViewdata?.pickup_date_and_time?.pickup_from_time
      //           );
      //         if (p.key == "Schedule_Pickup_time_to")
      //           p.value = moment(
      //             ASNViewdata?.pickup_date_and_time?.pickup_to_time
      //           );
      //         return p;
      //       });
      //     return o;
      //   }
      // );
      // setSchedule_Pickup_date_and_time(newSchedule_Pickup_date_and_time);

      newMainData = [
        ...newSalesOrderDetailsFields,
        ...newCustomerShippingAddressFields,
        ...newCustomerBillingAddressFields,
        ...nweselectedProductData,

        // ...newPackageDetailsFields,
        // ...newSchedule_Pickup_date_and_time,
      ];
      var keyValuePairMainData = {
        newEstimated_Cost: 0,
        Estimated_Cost_Select: ISTViewdata.shipping_mode_id,
      };

      newMainData.map(o => {
        if (o.key == "Schedule_Pickup_time") {
          o.value.map(p => {
            keyValuePairMainData[p.key] = p.value;
          });
        } else if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      setMainData(keyValuePairMainData);
    }
  }, [ISTViewdata]);

  //Delivery Order
  useEffect(() => {
    if (
      DeliveryViewdata &&
      mainData &&
      mainData.Source_Document_Type &&
      mainData.Source_Document_Type.lookup_code == "DELIVERY_ORDERS"
    ) {
      var newMainData = [];

      var newSalesOrderDetailsFields = SalesOrderDetailsFields.map(o => {
        if (o.key == "reference_id")
          o.value =
            DeliveryViewdata?.delivery_order_details?.delivery_order_number;
        return o;
      });
      setSalesOrderDetailsFields(newSalesOrderDetailsFields);

      var newCustomerBillingAddressFields = CustomerBillingAddressFields.map(
        o => {
          if (o.key == "billing_name")
            o.value =
              DeliveryViewdata?.billing_address_details?.contact_person_name;
          if (o.key == "billing_primary_phone")
            o.value =
              DeliveryViewdata?.billing_address_details?.contact_person_number;
          if (o.key == "billing_primary_email")
            o.value = DeliveryViewdata?.billing_address_details?.email;
          if (o.key == "billing_address_line_1")
            o.value = DeliveryViewdata?.billing_address_details?.address_line_1;
          if (o.key == "billing_address_line_2")
            o.value = DeliveryViewdata?.billing_address_details?.address_line_2;
          if (o.key == "billing_address_line_3")
            o.value = DeliveryViewdata?.billing_address_details?.address_line_3;
          if (o.key == "billing_country")
            o.value = DeliveryViewdata?.billing_address_details?.country;
          if (o.key == "billing_state")
            o.value = DeliveryViewdata?.billing_address_details?.state;
          if (o.key == "billing_city")
            o.value = DeliveryViewdata?.billing_address_details?.city;
          //if(o.key=="ShippingAddress_District") o.value="??";
          if (o.key == "billing_pin_code")
            o.value = DeliveryViewdata?.billing_address_details?.pin_code;
          return o;
        }
      );
      setCustomerBillingAddressFields(newCustomerBillingAddressFields);

      var newCustomerShippingAddressFields = CustomerShippingAddressFields.map(
        o => {
          if (o.key == "shipping_name")
            o.value =
              DeliveryViewdata?.delivery_address_details?.contact_person_name;
          if (o.key == "shipping_primary_phone")
            o.value =
              DeliveryViewdata?.delivery_address_details?.contact_person_number;
          if (o.key == "shipping_primary_email")
            o.value = DeliveryViewdata?.delivery_address_details?.email;
          if (o.key == "shipping_address_line_1")
            o.value =
              DeliveryViewdata?.delivery_address_details?.address_line_1;
          if (o.key == "shipping_address_line_2")
            o.value =
              DeliveryViewdata?.delivery_address_details?.address_line_2;
          if (o.key == "shipping_address_line_3")
            o.value =
              DeliveryViewdata?.delivery_address_details?.address_line_3;
          if (o.key == "shipping_country")
            o.value = DeliveryViewdata?.delivery_address_details?.country;
          if (o.key == "shipping_state")
            o.value = DeliveryViewdata?.delivery_address_details?.state;
          if (o.key == "shipping_city")
            o.value = DeliveryViewdata?.delivery_address_details?.city;
          //if(o.key=="ShippingAddress_District") o.value="??";
          if (o.key == "shipping_pin_code")
            o.value = DeliveryViewdata?.destination_warehouse?.pin_code;
          return o;
        }
      );
      setCustomerShippingAddressFields(newCustomerShippingAddressFields);

      var nweselectedProductData = [];
      if (DeliveryViewdata.delivery_order_lines)
        nweselectedProductData = DeliveryViewdata.delivery_order_lines.map(
          o => {
            return {
              id: o.product_id,
              sku_id: { id: o?.product_id, label: o?.product_details?.sku_id },
              product_template_id: o.product_template_id,
              product_name: o?.product_details?.product_name,
              // "warehouse_id": 1,
              // "inventory_id": 1,
              // description: o?.description,
              uom: { name: { id: o?.uom?.id, label: o?.uom_details?.name } },
              serial_number: o.serial_number,
              Quantity: parseInt(o.quantity),
              selling_price: parseFloat(o.rate),
              discount: parseFloat(o.discount_value),
              product_pricing_details: { tax_options: o.tax },
              Amount: o.amount,
            };
          }
        );
      setSelectedProductData(nweselectedProductData);

      var newAdditionalInformationFields = AdditionalInformationFields;
      newAdditionalInformationFields.find(
        o => o.key == "Additional_Information_Note"
      ).value = DeliveryViewdata?.additional_information?.notes;
      newAdditionalInformationFields.find(
        o => o.key == "Additional_Information_Terms_Conditions"
      ).value = DeliveryViewdata?.additional_information?.terms_and_condtion;
      setAdditionalInformationFields(newAdditionalInformationFields);

      // var newpaymentDetailsFields = [];
      // if (DeliveryViewdata.payment_details)
      //   newpaymentDetailsFields = DeliveryViewdata.payment_details.find((o) => {
      //     return {
      //       subTotal: o?.sub_total,
      //       tax: o?.tax,
      //       shippingCharge: o?.shipping_charge,
      //       adjustment_text: "",
      //       Final_Adjustment: "+",
      //       adjustment_amount: o?.adjustment_amount,
      //       totalBeforeAdjustment: 0,
      //       customer_credits: o?.vender_credits,
      //       total: o?.total_amount,
      //     };
      //   });
      // setPaymentDetailsFields(newpaymentDetailsFields);

      newMainData = [
        ...newSalesOrderDetailsFields,
        ...nweselectedProductData,
        ...newCustomerBillingAddressFields,
        ...newCustomerShippingAddressFields,
        ...newAdditionalInformationFields,
        // ...newpaymentDetailsFields,
      ];
      var keyValuePairMainData = {
        newEstimated_Cost: 0,
        Estimated_Cost_Select: Deliverydata.shipping_carrier_id,
      };

      newMainData.map(o => {
        if (o.key == "Schedule_Pickup_time") {
          o.value.map(p => {
            keyValuePairMainData[p.key] = p.value;
          });
        } else if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      setMainData(keyValuePairMainData);
    }
  }, [DeliveryViewdata]);

  //Purchase Order
  useEffect(() => {
    if (
      purchaseOrdersDataId &&
      mainData &&
      mainData.Source_Document_Type &&
      mainData.Source_Document_Type.lookup_code == "PURCHASE_ORDERS"
    ) {
      var newMainData = [];

      var newSalesOrderDetailsFields = SalesOrderDetailsFields.map(o => {
        if (o.key == "scheduled_delivery_date")
          o.value = moment(purchaseOrdersDataId?.expected_delivery_date).format(
            "yyyy-MM-DD"
          );
        if (o.key == "reference_id")
          o.value = purchaseOrdersDataId?.reference_number;
        if (o.key == "currency_id")
          o.value = purchaseOrdersDataId?.currency?.name;
        return o;
      });
      setSalesOrderDetailsFields(newSalesOrderDetailsFields);

      var newCustomerShippingAddressFields = CustomerShippingAddressFields.map(
        o => {
          if (o.key == "shipping_name")
            o.value =
              purchaseOrdersDataId?.billing_address?.contact_person_name;
          if (o.key == "shipping_primary_phone")
            o.value =
              purchaseOrdersDataId?.billing_address?.contact_person_number;
          if (o.key == "shipping_primary_email")
            o.value = purchaseOrdersDataId?.billing_address?.email;
          if (o.key == "shipping_address_line_1")
            o.value = purchaseOrdersDataId?.billing_address?.address_line_1;
          if (o.key == "shipping_address_line_2")
            o.value = purchaseOrdersDataId?.billing_address?.address_line_2;
          if (o.key == "shipping_address_line_3")
            o.value = purchaseOrdersDataId?.billing_address?.address_line_3;
          if (o.key == "shipping_country")
            o.value = purchaseOrdersDataId?.billing_address?.country;
          if (o.key == "shipping_state")
            o.value = purchaseOrdersDataId?.billing_address?.state;
          if (o.key == "shipping_city")
            o.value = purchaseOrdersDataId?.billing_address?.city;
          //if(o.key=="ShippingAddress_District") o.value="??";
          if (o.key == "shipping_pin_code")
            o.value = purchaseOrdersDataId?.billing_address?.pin_code;
          return o;
        }
      );
      setCustomerShippingAddressFields(newCustomerShippingAddressFields);

      var newCustomerBillingAddressFields = CustomerBillingAddressFields.map(
        o => {
          if (o.key == "billing_name")
            o.value =
              purchaseOrdersDataId?.delivery_address?.contact_person_name;
          if (o.key == "billing_primary_phone")
            o.value =
              purchaseOrdersDataId?.delivery_address?.contact_person_number;
          if (o.key == "billing_primary_email")
            o.value = purchaseOrdersDataId?.delivery_address?.email;
          if (o.key == "billing_address_line_1")
            o.value = purchaseOrdersDataId?.delivery_address?.address_line_1;
          if (o.key == "billing_address_line_2")
            o.value = purchaseOrdersDataId?.delivery_address?.address_line_2;
          if (o.key == "billing_address_line_3")
            o.value = purchaseOrdersDataId?.delivery_address?.address_line_3;
          if (o.key == "billing_country")
            o.value = purchaseOrdersDataId?.delivery_address?.country;
          if (o.key == "billing_state")
            o.value = purchaseOrdersDataId?.delivery_address?.state;
          if (o.key == "billing_city")
            o.value = purchaseOrdersDataId?.delivery_address?.city;
          //if(o.key=="ShippingAddress_District") o.value="??";
          if (o.key == "billing_pin_code")
            o.value = purchaseOrdersDataId?.delivery_address?.pin_code;
          return o;
        }
      );
      setCustomerBillingAddressFields(newCustomerBillingAddressFields);

      var nweselectedProductData = [];
      if (purchaseOrdersDataId.purchase_order_lines)
        nweselectedProductData = purchaseOrdersDataId.purchase_order_lines.map(
          o => {
            return {
              id: o.product_id,
              sku_id: { id: o?.product_id, label: o?.product_details?.sku_id },
              product_template_id: o.product_template_id,
              product_name: o?.product_details?.product_name,
              // "warehouse_id": 1,
              // "inventory_id": 1,
              // description: o?.description,
              uom: { name: { id: o?.uom?.id, label: o?.uom_details?.name } },
              serial_number: o.serial_number,
              Quantity: parseInt(o.quantity),
              selling_price: parseFloat(o.rate),
              discount: parseFloat(o.discount_value),
              product_pricing_details: { tax_options: o.tax },
              Amount: o.amount,
            };
          }
        );
      setSelectedProductData(nweselectedProductData);

      var newAdditionalInformationFields = AdditionalInformationFields;
      newAdditionalInformationFields.find(
        o => o.key == "Additional_Information_Note"
      ).value = purchaseOrdersDataId?.additional_information?.notes;
      newAdditionalInformationFields.find(
        o => o.key == "Additional_Information_Terms_Conditions"
      ).value =
        purchaseOrdersDataId?.additional_information?.terms_and_conditions;
      setAdditionalInformationFields(newAdditionalInformationFields);

      // var newpaymentDetailsFields = [];
      // if (purchaseOrdersDataId.payment_details)
      //   newpaymentDetailsFields = purchaseOrdersDataId.payment_details.find((o) => {
      //     return {
      //       subTotal: o?.sub_total,
      //       tax: o?.tax,
      //       shippingCharge: o?.shipping_charge,
      //       adjustment_text: "",
      //       Final_Adjustment: "+",
      //       adjustment_amount: o?.adjustment_amount,
      //       totalBeforeAdjustment: 0,
      //       customer_credits: o?.vender_credits,
      //       total: o?.total_amount,
      //     };
      //   });
      // setPaymentDetailsFields(newpaymentDetailsFields);

      newMainData = [
        ...newSalesOrderDetailsFields,
        ...nweselectedProductData,
        ...newCustomerBillingAddressFields,
        ...newCustomerShippingAddressFields,
        ...newAdditionalInformationFields,
        // ...newpaymentDetailsFields,
      ];

      var keyValuePairMainData = {
        newEstimated_Cost: 0,
        Estimated_Cost_Select: purchaseOrdersDataId.shipping_carrier_id,
      };

      newMainData.map(o => {
        if (o.key == "Schedule_Pickup_time") {
          o.value.map(p => {
            keyValuePairMainData[p.key] = p.value;
          });
        } else if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      setMainData(keyValuePairMainData);
    }
  }, [purchaseOrdersDataId]);

  //GRN
  useEffect(() => {
    if (
      GRNViewdata &&
      mainData &&
      mainData.Source_Document_Type &&
      mainData.Source_Document_Type.lookup_code == "GRN"
    ) {
      var newMainData = [];

      var newISTDetailsFields = SalesOrderDetailsFields.map(o => {
        if (o.key == "reference_id") o.value = GRNViewdata?.grn_number;
        return o;
      });
      setSalesOrderDetailsFields(newISTDetailsFields);

      var newCustomerShippingAddressFields = CustomerShippingAddressFields.map(
        o => {
          if (o.key == "shipping_name")
            o.value = GRNViewdata?.source_warehouse?.name;
          if (o.key == "shipping_primary_phone")
            o.value = GRNViewdata?.source_warehouse?.mobile_number;
          if (o.key == "shipping_primary_email")
            o.value = GRNViewdata?.source_warehouse?.email;
          if (o.key == "shipping_address_line_1")
            o.value = GRNViewdata?.source_warehouse?.address?.address_line_1;
          if (o.key == "shipping_address_line_2")
            o.value = GRNViewdata?.source_warehouse?.address?.address_line_2;
          if (o.key == "shipping_address_line_3")
            o.value = GRNViewdata?.source_warehouse?.address?.address_line_3;
          if (o.key == "shipping_country")
            o.value = GRNViewdata?.source_warehouse?.address?.country?.name;
          if (o.key == "shipping_state")
            o.value = GRNViewdata?.source_warehouse?.address?.state?.name;
          if (o.key == "shipping_city")
            o.value = GRNViewdata?.source_warehouse?.city;
          //if(o.key=="ShippingAddress_District") o.value="??";
          if (o.key == "shipping_pin_code")
            o.value = GRNViewdata?.source_warehouse?.address?.pin_code;
          return o;
        }
      );
      setCustomerShippingAddressFields(newCustomerShippingAddressFields);

      var newCustomerBillingAddressFields = CustomerBillingAddressFields.map(
        o => {
          if (o.key == "billing_name") o.value = GRNViewdata?.warehouse?.name;
          if (o.key == "billing_primary_phone")
            o.value = GRNViewdata?.warehouse?.mobile_number;
          if (o.key == "billing_primary_email")
            o.value = GRNViewdata?.warehouse?.email;
          if (o.key == "billing_address_line_1")
            o.value = GRNViewdata?.warehouse?.address?.address_line_1;
          if (o.key == "billing_address_line_2")
            o.value = GRNViewdata?.warehouse?.address?.address_line_2;
          if (o.key == "billing_address_line_3")
            o.value = GRNViewdata?.warehouse?.address?.address_line_3;
          if (o.key == "billing_country")
            o.value = GRNViewdata?.warehouse?.address?.country?.name;
          if (o.key == "billing_state")
            o.value = GRNViewdata?.warehouse?.address?.state?.name;
          if (o.key == "billing_city") o.value = GRNViewdata?.warehouse?.city;
          //if(o.key=="ShippingAddress_District") o.value="??";
          if (o.key == "billing_pin_code")
            o.value = GRNViewdata?.warehouse?.address?.pin_code;
          return o;
        }
      );
      setCustomerBillingAddressFields(newCustomerBillingAddressFields);

      var nweselectedProductData = [];
      if (GRNViewdata.grn_order_lines)
        nweselectedProductData = GRNViewdata.grn_order_lines.map(o => {
          return {
            id: o.product_id,
            sku_id: {
              id: o?.product?.id,
              label: o.product.sku_id,
            },
            // sku_id: { id: 1, label: "1" },
            product_template_id: o?.product_template_id,
            product_name: o?.product?.product_name,
            // inventory_id: o?.inventory_id,
            // source_stock: o?.inventory?.available_stock,
            uomName: { name: { id: o?.uom?.id, label: o?.uom?.name } },
            serial_number: o?.product?.serial_number,
            // description: o?.description,
            // Quantity: parseInt(o.quantity),
            // selling_price: parseFloat(o.rate),
            // discount: parseFloat(o.discount_value),
            // product_pricing_details: { tax_options: o.tax },
            // Amount: o.amount,
          };
        });
      setSelectedProductData(nweselectedProductData);

      newMainData = [
        ...newISTDetailsFields,
        ...newCustomerBillingAddressFields,
        ...newCustomerShippingAddressFields,
        ...nweselectedProductData,
      ];
      var keyValuePairMainData = {
        newEstimated_Cost: 0,
        Estimated_Cost_Select: GRNViewdata.shipping_carrier_id,
      };

      newMainData.map(o => {
        if (o.key == "Schedule_Pickup_time") {
          o.value.map(p => {
            keyValuePairMainData[p.key] = p.value;
          });
        } else if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      setMainData(keyValuePairMainData);
    }
  }, [GRNViewdata]);

  //Scrap Order
  console.log("ScrapOrderViewdata", ScrapOrderViewdata);
  useEffect(() => {
    if (
      ScrapOrderViewdata &&
      mainData &&
      mainData.Source_Document_Type &&
      mainData.Source_Document_Type.lookup_code == "SCRAP_ORDERS"
    ) {
      var newMainData = [];
      console.log("ScrapOrderViewdata inside effect", ScrapOrderViewdata);
      var newSalesOrderDetailsFields = SalesOrderDetailsFields.map(o => {
        if (o.key == "reference_id") o.value = ScrapOrderViewdata?.reference_id;
        return o;
      });
      setSalesOrderDetailsFields(newSalesOrderDetailsFields);

      var newCustomerShippingAddressFields = CustomerShippingAddressFields.map(
        o => {
          if (o.key == "shipping_name")
            o.value = ScrapOrderViewdata?.scrap_source_location?.name;
          if (o.key == "shipping_primary_phone")
            o.value = ScrapOrderViewdata?.scrap_source_location?.mobile_number;
          if (o.key == "shipping_primary_email")
            o.value = ScrapOrderViewdata?.scrap_source_location?.email;
          if (o.key == "shipping_address_line_1")
            o.value =
              ScrapOrderViewdata?.scrap_source_location?.address?.address_line_1;
          if (o.key == "shipping_address_line_2")
            o.value =
              ScrapOrderViewdata?.scrap_source_location?.address?.address_line_2;
          if (o.key == "shipping_address_line_3")
            o.value =
              ScrapOrderViewdata?.scrap_source_location?.address?.address_line_3;
          if (o.key == "shipping_country")
            o.value = ScrapOrderViewdata?.scrap_source_location?.country?.name;
          if (o.key == "shipping_state")
            o.value = ScrapOrderViewdata?.scrap_source_location?.state?.name;
          if (o.key == "shipping_city")
            o.value = ScrapOrderViewdata?.scrap_source_location?.city;
          //if(o.key=="ShippingAddress_District") o.value="??";
          if (o.key == "shipping_pin_code")
            o.value =
              ScrapOrderViewdata?.scrap_source_location?.address?.pin_code;
          return o;
        }
      );
      setCustomerShippingAddressFields(newCustomerShippingAddressFields);

      var newCustomerBillingAddressFields = CustomerBillingAddressFields.map(
        o => {
          if (o.key == "billing_name")
            o.value = ScrapOrderViewdata?.scrap_location_details?.receiver_name;
          if (o.key == "billing_primary_phone")
            o.value = ScrapOrderViewdata?.scrap_location_details?.mobile_number;
          if (o.key == "billing_primary_email")
            o.value = ScrapOrderViewdata?.scrap_location_details?.email;
          if (o.key == "billing_address_line_1")
            o.value = ScrapOrderViewdata?.scrap_location_details?.address_line;
          if (o.key == "billing_address_line_2")
            o.value = ScrapOrderViewdata?.scrap_location_details?.address_line2;
          if (o.key == "billing_address_line_3")
            o.value = ScrapOrderViewdata?.scrap_location_details?.address_line3;
          if (o.key == "billing_country")
            o.value = ScrapOrderViewdata?.scrap_location_details?.country;
          if (o.key == "billing_state")
            o.value = ScrapOrderViewdata?.scrap_location_details?.state;
          if (o.key == "billing_city")
            o.value = ScrapOrderViewdata?.scrap_location_details?.city;
          //if(o.key=="ShippingAddress_District") o.value="??";
          if (o.key == "billing_pin_code")
            o.value = ScrapOrderViewdata?.scrap_location_details?.zip;
          return o;
        }
      );
      setCustomerBillingAddressFields(newCustomerBillingAddressFields);

      var nweselectedProductData = [];
      if (ScrapOrderViewdata.order_lines)
        nweselectedProductData = ScrapOrderViewdata.order_lines.map(o => {
          return {
            id: o.product_id,
            sku_id: { id: o?.product_id, label: o?.product_Details?.sku_id },
            product_template_id: o.product_template_id,
            product_name: o?.product_Details?.product_name,
            // "warehouse_id": 1,
            // "inventory_id": 1,
            // description: o?.description,
            uom: { name: { id: o?.uom?.id, label: o?.uom?.name } },
            serial_number: o.product_Details?.serial_number,
            Quantity: parseInt(o.total_quantity),
            selling_price: parseFloat(o.rate),
            discount: parseFloat(o.discount_value),
            product_pricing_details: { tax_options: o.tax },
            Amount: o.amount,
          };
        });
      setSelectedProductData(nweselectedProductData);

      // var newAdditionalInformationFields = AdditionalInformationFields;
      // newAdditionalInformationFields.find(
      //   (o) => o.key == "Additional_Information_Note"
      // ).value = ScrapOrderViewdata?.additional_information?.notes;
      // newAdditionalInformationFields.find(
      //   (o) => o.key == "Additional_Information_Terms_Conditions"
      // ).value = ScrapOrderViewdata?.additional_information?.terms_and_condtion;
      // setAdditionalInformationFields(newAdditionalInformationFields);

      // var newpaymentDetailsFields = [];
      // if (DeliveryViewdata.payment_details)
      //   newpaymentDetailsFields = DeliveryViewdata.payment_details.find((o) => {
      //     return {
      //       subTotal: o?.sub_total,
      //       tax: o?.tax,
      //       shippingCharge: o?.shipping_charge,
      //       adjustment_text: "",
      //       Final_Adjustment: "+",
      //       adjustment_amount: o?.adjustment_amount,
      //       totalBeforeAdjustment: 0,
      //       customer_credits: o?.vender_credits,
      //       total: o?.total_amount,
      //     };
      //   });
      // setPaymentDetailsFields(newpaymentDetailsFields);

      newMainData = [
        ...newSalesOrderDetailsFields,
        ...nweselectedProductData,
        ...newCustomerBillingAddressFields,
        ...newCustomerShippingAddressFields,
        // ...newAdditionalInformationFields,
        // ...newpaymentDetailsFields,
      ];
      var keyValuePairMainData = {
        newEstimated_Cost: 0,
        Estimated_Cost_Select: ScrapOrderViewdata.shipping_carrier_id,
      };

      newMainData.map(o => {
        if (o.key == "Schedule_Pickup_time") {
          o.value.map(p => {
            keyValuePairMainData[p.key] = p.value;
          });
        } else if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      setMainData(keyValuePairMainData);
    }
  }, [ScrapOrderViewdata]);

  //Sales Invoice
  console.log("SalesInvoiceViewdata", SalesInvoiceViewdata);
  useEffect(() => {
    if (
      SalesInvoiceViewdata &&
      mainData &&
      mainData.Source_Document_Type &&
      mainData.Source_Document_Type.lookup_code == "SALES_INVOICE"
    ) {
      var newMainData = [];
      console.log("SalesInvoiceViewdata inside effect", SalesInvoiceViewdata);
      var newSalesOrderDetailsFields = SalesOrderDetailsFields.map(o => {
        if (o.key == "reference_id")
          o.value = SalesInvoiceViewdata?.reference_number;
        if (o.key == "currency_id")
          o.value = SalesInvoiceViewdata?.currency?.name;
        return o;
      });
      setSalesOrderDetailsFields(newSalesOrderDetailsFields);

      var newCustomerShippingAddressFields = CustomerShippingAddressFields.map(
        o => {
          // if (o.key == "shipping_name")
          //   o.value = SalesInvoiceViewdata?.delivery_address?.name;
          if (o.key == "shipping_primary_phone")
            o.value = SalesInvoiceViewdata?.delivery_address?.phone;
          // if (o.key == "shipping_primary_email")
          //   o.value = SalesInvoiceViewdata?.delivery_address?.email;
          if (o.key == "shipping_address_line_1")
            o.value = SalesInvoiceViewdata?.delivery_address?.Address;
          // if (o.key == "shipping_address_line_2")
          //   o.value =
          //     SalesInvoiceViewdata?.delivery_address?.address?.address_line_2;
          // if (o.key == "shipping_address_line_3")
          //   o.value =
          //     SalesInvoiceViewdata?.delivery_address?.address?.address_line_3;
          if (o.key == "shipping_country")
            o.value = SalesInvoiceViewdata?.delivery_address?.country;
          if (o.key == "shipping_state")
            o.value = SalesInvoiceViewdata?.delivery_address?.state;
          // if (o.key == "shipping_city")
          //   o.value = SalesInvoiceViewdata?.delivery_address?.city;
          //if(o.key=="ShippingAddress_District") o.value="??";
          if (o.key == "shipping_pin_code")
            o.value = SalesInvoiceViewdata?.delivery_address?.zipcode;
          return o;
        }
      );
      setCustomerShippingAddressFields(newCustomerShippingAddressFields);

      var newCustomerBillingAddressFields = CustomerBillingAddressFields.map(
        o => {
          // if (o.key == "billing_name")
          //   o.value =
          //     SalesInvoiceViewdata?.billing_address?.receiver_name;
          if (o.key == "billing_primary_phone")
            o.value = SalesInvoiceViewdata?.billing_address?.phone;
          // if (o.key == "billing_primary_email")
          //   o.value = SalesInvoiceViewdata?.billing_address?.email;
          if (o.key == "billing_address_line_1")
            o.value = SalesInvoiceViewdata?.billing_address?.Address;
          // if (o.key == "billing_address_line_2")
          //   o.value =
          //     SalesInvoiceViewdata?.billing_address?.address_line2;
          // if (o.key == "billing_address_line_3")
          //   o.value =
          //     SalesInvoiceViewdata?.billing_address?.address_line3;
          if (o.key == "billing_country")
            o.value = SalesInvoiceViewdata?.billing_address?.country;
          if (o.key == "billing_state")
            o.value = SalesInvoiceViewdata?.billing_address?.state;
          // if (o.key == "billing_city")
          //   o.value = SalesInvoiceViewdata?.billing_address?.city;
          //if(o.key=="ShippingAddress_District") o.value="??";
          if (o.key == "billing_pin_code")
            o.value = SalesInvoiceViewdata?.billing_address?.zipcode;
          return o;
        }
      );
      setCustomerBillingAddressFields(newCustomerBillingAddressFields);

      var nweselectedProductData = [];
      if (SalesInvoiceViewdata.sales_invoice_lines)
        nweselectedProductData = SalesInvoiceViewdata.sales_invoice_lines.map(
          o => {
            return {
              id: o.product_id,
              sku_id: { id: o?.product_id, label: o?.product_Details?.sku_id },
              product_template_id: o.product_template_id,
              product_name: o?.product_Details?.product_name,
              // "warehouse_id": 1,
              // "inventory_id": 1,
              // description: o?.description,
              uom: { name: { id: o?.uom?.id, label: o?.uom?.name } },
              serial_number: o.product_Details?.serial_number,
              Quantity: parseInt(o.total_quantity),
              selling_price: parseFloat(o.rate),
              discount: parseFloat(o.discount_value),
              product_pricing_details: { tax_options: o.tax_amount },
              Amount: o.total_amount,
            };
          }
        );
      setSelectedProductData(nweselectedProductData);

      var newAdditionalInformationFields = AdditionalInformationFields;
      newAdditionalInformationFields.find(
        o => o.key == "Additional_Information_Note"
      ).value = SalesInvoiceViewdata?.internal_notes;
      newAdditionalInformationFields.find(
        o => o.key == "Additional_Information_Terms_Conditions"
      ).value = SalesInvoiceViewdata?.terms_and_conditions;
      setAdditionalInformationFields(newAdditionalInformationFields);

      // var newpaymentDetailsFields = [];
      // if (DeliveryViewdata.payment_details)
      //   newpaymentDetailsFields = DeliveryViewdata.payment_details.find((o) => {
      //     return {
      //       subTotal: o?.sub_total,
      //       tax: o?.tax,
      //       shippingCharge: o?.shipping_charge,
      //       adjustment_text: "",
      //       Final_Adjustment: "+",
      //       adjustment_amount: o?.adjustment_amount,
      //       totalBeforeAdjustment: 0,
      //       customer_credits: o?.vender_credits,
      //       total: o?.total_amount,
      //     };
      //   });
      // setPaymentDetailsFields(newpaymentDetailsFields);

      newMainData = [
        ...newSalesOrderDetailsFields,
        ...nweselectedProductData,
        ...newCustomerBillingAddressFields,
        ...newCustomerShippingAddressFields,
        ...newAdditionalInformationFields,
        // ...newpaymentDetailsFields,
      ];
      var keyValuePairMainData = {
        newEstimated_Cost: 0,
        Estimated_Cost_Select: SalesInvoiceViewdata.shipping_carrier_id,
      };

      newMainData.map(o => {
        if (o.key == "Schedule_Pickup_time") {
          o.value.map(p => {
            keyValuePairMainData[p.key] = p.value;
          });
        } else if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      setMainData(keyValuePairMainData);
    }
  }, [SalesInvoiceViewdata]);

  //Sales Order
  console.log("SalesOrderViewdata", SalesOrderViewdata);
  useEffect(() => {
    if (
      SalesOrderViewdata &&
      mainData &&
      mainData.Source_Document_Type &&
      mainData.Source_Document_Type.lookup_code == "SALES_ORDERS"
    ) {
      var newMainData = [];
      console.log("ScrapOrderViewdata inside effect", SalesOrderViewdata);
      var newSalesOrderDetailsFields = SalesOrderDetailsFields.map(o => {
        if (o.key == "reference_id")
          o.value = SalesOrderViewdata?.reference_number;
        if (o.key == "currency_id")
          o.value = SalesOrderViewdata?.currency?.name;
        return o;
      });
      setSalesOrderDetailsFields(newSalesOrderDetailsFields);

      var newCustomerShippingAddressFields = CustomerShippingAddressFields.map(
        o => {
          if (o.key == "shipping_name")
            o.value =
              SalesOrderViewdata?.customer_shipping_address?.contact_person_name;
          if (o.key == "shipping_primary_phone")
            o.value =
              SalesOrderViewdata?.customer_shipping_address?.contact_person_number;
          if (o.key == "shipping_primary_email")
            o.value = SalesOrderViewdata?.customer_shipping_address?.email;
          if (o.key == "shipping_address_line_1")
            o.value =
              SalesOrderViewdata?.customer_shipping_address?.address_line_1;
          if (o.key == "shipping_address_line_2")
            o.value =
              SalesOrderViewdata?.customer_shipping_address?.address_line_2;
          if (o.key == "shipping_address_line_3")
            o.value =
              SalesOrderViewdata?.customer_shipping_address?.address_line_3;
          // if (o.key == "shipping_country")
          //   o.value = SalesOrderViewdata?.customer_shipping_address?.country?.name;
          // if (o.key == "shipping_state")
          //   o.value = SalesOrderViewdata?.customer_shipping_address?.state?.name;
          // if (o.key == "shipping_city")
          //   o.value = SalesOrderViewdata?.customer_shipping_address?.city;
          //if(o.key=="ShippingAddress_District") o.value="??";
          if (o.key == "shipping_pin_code")
            o.value = SalesOrderViewdata?.customer_shipping_address?.pin_code;
          return o;
        }
      );
      setCustomerShippingAddressFields(newCustomerShippingAddressFields);

      var newCustomerBillingAddressFields = CustomerBillingAddressFields.map(
        o => {
          if (o.key == "billing_name")
            o.value =
              SalesOrderViewdata?.customer_billing_address?.contact_person_name;
          if (o.key == "billing_primary_phone")
            o.value =
              SalesOrderViewdata?.customer_billing_address?.contact_person_number;
          if (o.key == "billing_primary_email")
            o.value = SalesOrderViewdata?.customer_billing_address?.email;
          if (o.key == "billing_address_line_1")
            o.value =
              SalesOrderViewdata?.customer_billing_address?.address_line;
          if (o.key == "billing_address_line_2")
            o.value =
              SalesOrderViewdata?.customer_billing_address?.address_line2;
          if (o.key == "billing_address_line_3")
            o.value =
              SalesOrderViewdata?.customer_billing_address?.address_line3;
          if (o.key == "billing_country")
            o.value = SalesOrderViewdata?.customer_billing_address?.country;
          if (o.key == "billing_state")
            o.value = SalesOrderViewdata?.customer_billing_address?.state;
          if (o.key == "billing_city")
            o.value = SalesOrderViewdata?.customer_billing_address?.city;
          //if(o.key=="ShippingAddress_District") o.value="??";
          if (o.key == "billing_pin_code")
            o.value = SalesOrderViewdata?.customer_billing_address?.pin_code;
          return o;
        }
      );
      setCustomerBillingAddressFields(newCustomerBillingAddressFields);

      var nweselectedProductData = [];
      if (SalesOrderViewdata.sales_order_lines)
        nweselectedProductData = SalesOrderViewdata.sales_order_lines.map(o => {
          return {
            id: o.product_id,
            sku_id: { id: o?.product_id, label: o?.product_details?.sku_id },
            product_template_id: o.product_template_id,
            product_name: o?.product_details?.product_name,
            // "warehouse_id": 1,
            // "inventory_id": 1,
            // description: o?.description,
            uom: { name: { id: o?.uom?.id, label: o?.uom?.name } },
            serial_number: o?.serial_number,
            Quantity: parseInt(o?.total_quantity),
            selling_price: parseFloat(o.price),
            discount: parseFloat(o.discount),
            product_pricing_details: { tax_options: o.tax },
            Amount: o.amount,
          };
        });
      setSelectedProductData(nweselectedProductData);

      var newAdditionalInformationFields = AdditionalInformationFields;
      newAdditionalInformationFields.find(
        o => o.key == "Additional_Information_Note"
      ).value = SalesOrderViewdata?.additional_information?.notes;
      newAdditionalInformationFields.find(
        o => o.key == "Additional_Information_Terms_Conditions"
      ).value =
        SalesOrderViewdata?.additional_information?.terms_and_conditions;
      setAdditionalInformationFields(newAdditionalInformationFields);

      // var newpaymentDetailsFields = [];
      // if (DeliveryViewdata.payment_details)
      //   newpaymentDetailsFields = DeliveryViewdata.payment_details.find((o) => {
      //     return {
      //       subTotal: o?.sub_total,
      //       tax: o?.tax,
      //       shippingCharge: o?.shipping_charge,
      //       adjustment_text: "",
      //       Final_Adjustment: "+",
      //       adjustment_amount: o?.adjustment_amount,
      //       totalBeforeAdjustment: 0,
      //       customer_credits: o?.vender_credits,
      //       total: o?.total_amount,
      //     };
      //   });
      // setPaymentDetailsFields(newpaymentDetailsFields);

      newMainData = [
        ...newSalesOrderDetailsFields,
        ...nweselectedProductData,
        ...newCustomerBillingAddressFields,
        ...newCustomerShippingAddressFields,
        ...newAdditionalInformationFields,
        // ...newpaymentDetailsFields,
      ];
      var keyValuePairMainData = {
        newEstimated_Cost: 0,
        Estimated_Cost_Select: SalesOrderViewdata.shipping_carrier_id,
      };

      newMainData.map(o => {
        if (o.key == "Schedule_Pickup_time") {
          o.value.map(p => {
            keyValuePairMainData[p.key] = p.value;
          });
        } else if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      setMainData(keyValuePairMainData);
    }
  }, [SalesOrderViewdata]);

  //Purchase Returns
  console.log("purchase_returnsViewdata", purchase_returnsViewdata);
  useEffect(() => {
    if (
      purchase_returnsViewdata &&
      mainData &&
      mainData.Source_Document_Type &&
      mainData.Source_Document_Type.lookup_code == "PURCHASE_RETURNS"
    ) {
      console.log(
        "purchase_returnsViewdata inside eff3ect",
        purchase_returnsViewdata
      );
      var newMainData = [];

      var newSalesOrderDetailsFields = SalesOrderDetailsFields.map(o => {
        if (o.key == "reference_id")
          o.value = purchase_returnsViewdata?.reference_number;
        if (o.key == "currency_id")
          o.value = purchase_returnsViewdata?.currency?.name;
        return o;
      });
      setSalesOrderDetailsFields(newSalesOrderDetailsFields);

      var newCustomerShippingAddressFields = CustomerShippingAddressFields.map(
        o => {
          if (o.key == "shipping_name")
            o.value =
              purchase_returnsViewdata?.customer_shipping_address?.contact_person_name;
          if (o.key == "shipping_primary_phone")
            o.value =
              purchase_returnsViewdata?.customer_shipping_address?.contact_person_number;
          if (o.key == "shipping_primary_email")
            o.value =
              purchase_returnsViewdata?.customer_shipping_address?.email;
          if (o.key == "shipping_address_line_1")
            o.value =
              purchase_returnsViewdata?.customer_shipping_address?.address_line_1;
          if (o.key == "shipping_address_line_2")
            o.value =
              purchase_returnsViewdata?.customer_shipping_address?.address_line_2;
          if (o.key == "shipping_address_line_3")
            o.value =
              purchase_returnsViewdata?.customer_shipping_address?.address_line_3;
          // if (o.key == "shipping_country")
          //   o.value = purchase_returnsViewdata?.customer_shipping_address?.country?.name;
          // if (o.key == "shipping_state")
          //   o.value = purchase_returnsViewdata?.customer_shipping_address?.state?.name;
          // if (o.key == "shipping_city")
          //   o.value = purchase_returnsViewdata?.customer_shipping_address?.city;
          //if(o.key=="ShippingAddress_District") o.value="??";
          if (o.key == "shipping_pin_code")
            o.value =
              purchase_returnsViewdata?.customer_shipping_address?.pin_code;
          return o;
        }
      );
      setCustomerShippingAddressFields(newCustomerShippingAddressFields);

      var newCustomerBillingAddressFields = CustomerBillingAddressFields.map(
        o => {
          if (o.key == "billing_name")
            o.value =
              purchase_returnsViewdata?.customer_billing_address?.contact_person_name;
          if (o.key == "billing_primary_phone")
            o.value =
              purchase_returnsViewdata?.customer_billing_address?.contact_person_number;
          if (o.key == "billing_primary_email")
            o.value = purchase_returnsViewdata?.customer_billing_address?.email;
          if (o.key == "billing_address_line_1")
            o.value =
              purchase_returnsViewdata?.customer_billing_address?.address_line;
          if (o.key == "billing_address_line_2")
            o.value =
              purchase_returnsViewdata?.customer_billing_address?.address_line2;
          if (o.key == "billing_address_line_3")
            o.value =
              purchase_returnsViewdata?.customer_billing_address?.address_line3;
          // if (o.key == "billing_country")
          //   o.value = purchase_returnsViewdata?.customer_billing_address?.country;
          // if (o.key == "billing_state")
          //   o.value = purchase_returnsViewdata?.customer_billing_address?.state;
          // if (o.key == "billing_city")
          //   o.value = purchase_returnsViewdata?.customer_billing_address?.city;
          //if(o.key=="ShippingAddress_District") o.value="??";
          if (o.key == "billing_pin_code")
            o.value =
              purchase_returnsViewdata?.customer_billing_address?.pin_code;
          return o;
        }
      );
      setCustomerBillingAddressFields(newCustomerBillingAddressFields);

      var nweselectedProductData = [];
      if (purchase_returnsViewdata.purchase_return_lines)
        nweselectedProductData =
          purchase_returnsViewdata.purchase_return_lines.map(o => {
            return {
              id: o.product_id,
              sku_id: { id: o?.product_id, label: o?.product_details?.sku_id },
              product_template_id: o.product_template_id,
              product_name: o?.product_details?.product_name,
              // "warehouse_id": 1,
              // "inventory_id": 1,
              // description: o?.description,
              uom: { name: { id: o?.uom?.id, label: o?.uom?.name } },
              serial_number: o?.serial_number,
              Quantity: parseInt(o?.total_quantity),
              selling_price: parseFloat(o.rate),
              discount: parseFloat(o.discount),
              product_pricing_details: { tax_options: o.tax },
              Amount: o.amount,
            };
          });
      setSelectedProductData(nweselectedProductData);

      var newAdditionalInformationFields = AdditionalInformationFields;
      newAdditionalInformationFields.find(
        o => o.key == "Additional_Information_Note"
      ).value = purchase_returnsViewdata?.additional_information?.notes;
      newAdditionalInformationFields.find(
        o => o.key == "Additional_Information_Terms_Conditions"
      ).value =
        purchase_returnsViewdata?.additional_information?.terms_and_conditions;
      setAdditionalInformationFields(newAdditionalInformationFields);

      // var newpaymentDetailsFields = [];
      // if (DeliveryViewdata.payment_details)
      //   newpaymentDetailsFields = DeliveryViewdata.payment_details.find((o) => {
      //     return {
      //       subTotal: o?.sub_total,
      //       tax: o?.tax,
      //       shippingCharge: o?.shipping_charge,
      //       adjustment_text: "",
      //       Final_Adjustment: "+",
      //       adjustment_amount: o?.adjustment_amount,
      //       totalBeforeAdjustment: 0,
      //       customer_credits: o?.vender_credits,
      //       total: o?.total_amount,
      //     };
      //   });
      // setPaymentDetailsFields(newpaymentDetailsFields);

      newMainData = [
        ...newSalesOrderDetailsFields,
        ...nweselectedProductData,
        ...newCustomerBillingAddressFields,
        ...newCustomerShippingAddressFields,
        ...newAdditionalInformationFields,
        // ...newpaymentDetailsFields,
      ];
      var keyValuePairMainData = {
        newEstimated_Cost: 0,
        Estimated_Cost_Select: purchase_returnsViewdata.shipping_carrier_id,
      };

      newMainData.map(o => {
        if (o.key == "Schedule_Pickup_time") {
          o.value.map(p => {
            keyValuePairMainData[p.key] = p.value;
          });
        } else if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      setMainData(keyValuePairMainData);
    }
  }, [purchase_returnsViewdata]);

  //Sales Returns
  console.log("sales_returnsViewdata", sales_returnsViewdata);
  useEffect(() => {
    if (
      sales_returnsViewdata &&
      mainData &&
      mainData.Source_Document_Type &&
      mainData.Source_Document_Type.lookup_code == "SALES_RETURNS"
    ) {
      console.log(
        "sales_returnsViewdata inside eff3ect",
        sales_returnsViewdata
      );
      var newMainData = [];

      var newSalesOrderDetailsFields = SalesOrderDetailsFields.map(o => {
        if (o.key == "reference_id")
          o.value = sales_returnsViewdata?.reference_number;
        if (o.key == "currency_id")
          o.value = sales_returnsViewdata?.currency?.name;
        return o;
      });
      setSalesOrderDetailsFields(newSalesOrderDetailsFields);

      var newCustomerShippingAddressFields = CustomerShippingAddressFields.map(
        o => {
          if (o.key == "shipping_name")
            o.value =
              sales_returnsViewdata?.customer_pickup_address?.customer_name;
          if (o.key == "shipping_primary_phone")
            o.value =
              sales_returnsViewdata?.customer_pickup_address?.primary_phone;
          if (o.key == "shipping_primary_email")
            o.value =
              sales_returnsViewdata?.customer_pickup_address?.primary_email;
          if (o.key == "shipping_address_line_1")
            o.value =
              sales_returnsViewdata?.customer_pickup_address?.address_details1;
          if (o.key == "shipping_address_line_2")
            o.value =
              sales_returnsViewdata?.customer_pickup_address?.address_details2;
          if (o.key == "shipping_address_line_3")
            o.value =
              sales_returnsViewdata?.customer_pickup_address?.address_details3;
          if (o.key == "shipping_country")
            o.value = sales_returnsViewdata?.customer_pickup_address?.country;
          if (o.key == "shipping_state")
            o.value = sales_returnsViewdata?.customer_pickup_address?.state;
          // if (o.key == "shipping_city")
          //   o.value = sales_returnsViewdata?.customer_pickup_address?.city;
          //if(o.key=="ShippingAddress_District") o.value="??";
          if (o.key == "shipping_pin_code")
            o.value = sales_returnsViewdata?.customer_pickup_address?.zipcode;
          return o;
        }
      );
      setCustomerShippingAddressFields(newCustomerShippingAddressFields);

      var newCustomerBillingAddressFields = CustomerBillingAddressFields.map(
        o => {
          if (o.key == "billing_name")
            o.value =
              sales_returnsViewdata?.customer_billing_address?.customer_name;
          if (o.key == "billing_primary_phone")
            o.value =
              sales_returnsViewdata?.customer_billing_address?.primary_phone;
          if (o.key == "billing_primary_email")
            o.value =
              sales_returnsViewdata?.customer_billing_address?.primary_email;
          if (o.key == "billing_address_line_1")
            o.value =
              sales_returnsViewdata?.customer_billing_address?.address_details1;
          if (o.key == "billing_address_line_2")
            o.value =
              sales_returnsViewdata?.customer_billing_address?.address_details2;
          if (o.key == "billing_address_line_3")
            o.value =
              sales_returnsViewdata?.customer_billing_address?.address_details3;
          if (o.key == "billing_country")
            o.value = sales_returnsViewdata?.customer_billing_address?.country;
          if (o.key == "billing_state")
            o.value = sales_returnsViewdata?.customer_billing_address?.state;
          // if (o.key == "billing_city")
          //   o.value = sales_returnsViewdata?.customer_billing_address?.city;
          //if(o.key=="ShippingAddress_District") o.value="??";
          if (o.key == "billing_pin_code")
            o.value = sales_returnsViewdata?.customer_billing_address?.zipcode;
          return o;
        }
      );
      setCustomerBillingAddressFields(newCustomerBillingAddressFields);

      var nweselectedProductData = [];
      if (sales_returnsViewdata.sales_return_lines)
        nweselectedProductData = sales_returnsViewdata.sales_return_lines.map(
          o => {
            return {
              id: o.product_id,
              sku_id: { id: o?.product_id, label: o?.product_details?.sku_id },
              product_template_id: o.product_template_id,
              product_name: o?.product_details?.product_name,
              // "warehouse_id": 1,
              // "inventory_id": 1,
              // description: o?.description,
              uom: { name: { id: o?.uom?.id, label: o?.uom?.name } },
              serial_number: o?.serial_number,
              Quantity: parseInt(o?.total_quantity),
              selling_price: parseFloat(o.rate),
              discount: parseFloat(o.discount),
              product_pricing_details: { tax_options: o.tax },
              Amount: o.amount,
            };
          }
        );
      setSelectedProductData(nweselectedProductData);

      var newAdditionalInformationFields = AdditionalInformationFields;
      newAdditionalInformationFields.find(
        o => o.key == "Additional_Information_Note"
      ).value = sales_returnsViewdata?.additional_information?.notes;
      newAdditionalInformationFields.find(
        o => o.key == "Additional_Information_Terms_Conditions"
      ).value =
        sales_returnsViewdata?.additional_information?.terms_and_conditions;
      setAdditionalInformationFields(newAdditionalInformationFields);

      // var newpaymentDetailsFields = [];
      // if (DeliveryViewdata.payment_details)
      //   newpaymentDetailsFields = DeliveryViewdata.payment_details.find((o) => {
      //     return {
      //       subTotal: o?.sub_total,
      //       tax: o?.tax,
      //       shippingCharge: o?.shipping_charge,
      //       adjustment_text: "",
      //       Final_Adjustment: "+",
      //       adjustment_amount: o?.adjustment_amount,
      //       totalBeforeAdjustment: 0,
      //       customer_credits: o?.vender_credits,
      //       total: o?.total_amount,
      //     };
      //   });
      // setPaymentDetailsFields(newpaymentDetailsFields);

      newMainData = [
        ...newSalesOrderDetailsFields,
        ...nweselectedProductData,
        ...newCustomerBillingAddressFields,
        ...newCustomerShippingAddressFields,
        ...newAdditionalInformationFields,
        // ...newpaymentDetailsFields,
      ];
      var keyValuePairMainData = {
        newEstimated_Cost: 0,
        Estimated_Cost_Select: sales_returnsViewdata.shipping_carrier_id,
      };

      newMainData.map(o => {
        if (o.key == "Schedule_Pickup_time") {
          o.value.map(p => {
            keyValuePairMainData[p.key] = p.value;
          });
        } else if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      setMainData(keyValuePairMainData);
    }
  }, [sales_returnsViewdata]);

  const handelSelectonChange = (key, value) => {
    console.log("key", key);
    console.log("value", value);
    console.log("asndata", ASNViewdata);
    const tempValue = { ...inputValue, [key]: value };
    setInputvalue(tempValue);
    console.log(inputValue, "iiii");
    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);

    if (key === "Source_Document_Type") {
      if (value.lookup_code == "GRN") {
        dispatch(
          loadGrnData({ limit: 100, offset: 1, filters: null, sort: null })
        );
      }
      if (value.lookup_code == "ASN") {
        dispatch(
          loadASNData({ limit: 100, offset: 1, filters: null, sort: null })
        );
      }
      if (value.lookup_code == "SALES_ORDERS") {
        dispatch(
          loadSalesOrderData({
            limit: 100,
            offset: 1,
            filters: null,
            sort: null,
          })
        );
      }
      if (value.lookup_code == "IST") {
        dispatch(
          loadISTData({ limit: 100, offset: 1, filters: null, sort: null })
        );
      }
      if (value.lookup_code == "PURCHASE_RETURNS") {
        console.log("coming");
        dispatch(
          loadpurchase_returnsData({
            limit: 100,
            offset: 1,
            filters: null,
            sort: null,
          })
        );
      }
      if (value.lookup_code == "SALES_RETURNS") {
        dispatch(
          loadsales_returnsData({
            limit: 100,
            offset: 1,
            filters: null,
            sort: null,
          })
        );
      }
      if (value.lookup_code == "SCRAP_ORDERS") {
        dispatch(
          loadScrapOrderData({
            limit: 100,
            offset: 1,
            filters: null,
            sort: null,
          })
        );
      }
      if (value.lookup_code == "SALES_INVOICE") {
        dispatch(
          loadSalesInvoiceData({
            limit: 100,
            offset: 1,
            filters: null,
            sort: null,
          })
        );
      }

      if (value.lookup_code == "DELIVERY_ORDERS") {
        dispatch(
          loadDeliveryData({ limit: 100, offset: 1, filters: null, sort: null })
        );
      }
      if (value.lookup_code == "PURCHASE_ORDERS") {
        dispatch(
          loadProductOrdersData({
            limit: 100,
            offset: 1,
            filters: null,
            sort: null,
          })
        );
      }

      dispatch(SearchSourceDocumentData(value?.id));
    }

    if (key == "Select_Source_Document") {
      // if (mainData.Source_Document_Type.lookup_code == "SALES_ORDERS") {
      //   dispatch(loadSalesDataById(value.id));
      // }
      if (mainData.Source_Document_Type.lookup_code == "GRN") {
        dispatch(loadGrnDataById(value.id));
      }
      if (mainData.Source_Document_Type.lookup_code == "ASN") {
        dispatch(loadASNDataById(value.id));
      }
      if (mainData.Source_Document_Type.lookup_code == "SCRAP_ORDERS") {
        dispatch(loadScrapOrderDataById(value.id));
      }
      if (mainData.Source_Document_Type.lookup_code == "SALES_INVOICE") {
        dispatch(loadSalesInvoiceDataById(value.id));
      }
      if (mainData.Source_Document_Type.lookup_code == "IST") {
        dispatch(loadISTDataById(value.id));
      }
      if (mainData.Source_Document_Type.lookup_code == "DELIVERY_ORDERS") {
        dispatch(loadDeliveryDataById(value.id));
      }
      if (mainData.Source_Document_Type.lookup_code == "PURCHASE_ORDERS") {
        dispatch(loadProductOrdersDataByID(value.id));
      }
      if (mainData.Source_Document_Type.lookup_code == "SALES_ORDERS") {
        dispatch(loadSalesOrderDataById(value.id));
      }
      if (mainData.Source_Document_Type.lookup_code == "PURCHASE_RETURNS") {
        dispatch(loadpurchase_returnsDataById(value.id));
      }
      if (mainData.Source_Document_Type.lookup_code == "SALES_RETURNS") {
        dispatch(loadsales_returnsDataById(value.id));
      }
    }

    if (key == "ShippingAddress_Country" || key == "BillingAddress_Country") {
      setCountry(value.id);
      dispatch(loadStateDataById(value.id));
    }

    switch (key) {
      // case "BillingAddress_Country":
      // case "BillingAddress_State": {
      //   setCustomerBillingAddressFields(
      //     CustomerBillingAddressFields.map((o) => {
      //       if (o.key == key) return { ...o, value: value };
      //       return o;
      //     })
      //   );
      //   break;
      // }
      case "currency_id": {
        setSalesOrderDetailsFields(
          SalesOrderDetailsFields.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
      case "customer_id": {
        setSalesOrderDetailsFields(
          SalesOrderDetailsFields.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
      case "purchase_invoice_id": {
        setSalesOrderDetailsFields(
          SalesOrderDetailsFields.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
      case "PaymentTerms_PaymentTerms": {
        setPaymentTermsFields(
          PaymentTermsFields.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
      case "Source_Document_Type":
        setSalesOrderDetailsFields(
          SalesOrderDetailsFields?.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;

      case "Select_Source_Document":
        setSalesOrderDetailsFields(
          SalesOrderDetailsFields?.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
    }

    if (key == "Final_Adjustment") {
      setPaymentDetailsFields({
        ...paymentDetailsFields,
        Final_Adjustment: value,
      });
    }

    console.log("newMainData", newMainData);
  };

  const setRadioType = (prop, value) => {};

  const handelCheckBoxonChange = field => {
    console.log("onCheckboxChanges", field);

    if (field.key == "Auto_credit_note_number") {
      var neworder = SalesOrderDetailsFields.map(o => {
        if (o.key == "credit_note_id") o.disabled = !field.isChecked;
        return o;
      });
      setSalesOrderDetailsFields(neworder);
    }

    if (field.key == "Auto_reference_number") {
      var neworder = SalesOrderDetailsFields.map(o => {
        if (o.key == "reference_id") o.disabled = !field.isChecked;
        return o;
      });
      setSalesOrderDetailsFields(neworder);
    }

    var newState = SalesOrderDetailsFields.map(o => {
      if (o.key == field.key) {
        o.isChecked = !o.isChecked;
      }
      return o;
    });
    setSalesOrderDetailsFields(newState);
  };

  const [CheckboxShowForCopyField_value, setCheckboxShowForCopyField_value] =
    useState(false);
  const handelCheckboxShowForCopyField_valueChange = field => {
    //console.log("onCheckboxChanges", field);
    setCheckboxShowForCopyField_value(!CheckboxShowForCopyField_value);

    var newCustomerBillingAddressFields = CustomerBillingAddressFields.map(
      o => {
        return {
          ...o,
          value: mainData[o.key.replace("Billing", "Shipping")],
        };
      }
    );

    var newMainData = mainData;
    newCustomerBillingAddressFields.map(o => (newMainData[o.key] = o.value));
    setMainData(newMainData);

    setCustomerBillingAddressFields(newCustomerBillingAddressFields);
    //CustomerShippingAddressFields
  };

  // const btnclick =() =>{
  //   console.log("SalesOrderDetailsFields data", SalesOrderDetailsFields)
  // }

  useEffect(() => {
    dispatch(Countries());
    dispatch(FetchAddress());
  }, []);

  const [dispatch_location_details, set_dispatch_location_details] =
    useState("");

  const [dispatch_delivery_details, set_dispatch_delivery_details] =
    useState("");
  console.log("dgkjsh", ISTdata);
  return (
    <>
      {/* //Enter Sales Order Details */}
      <AddForm
        header={"Credit Note Details"}
        data={SalesOrderDetailsFields.map(field => {
          switch (field.key) {
            case "currency_id":
              field.data = Currencydata.map(o => {
                return { id: o.id, label: o.name };
              });
              break;
            case "customer_id":
              field.data = contactsData.map(o => {
                console.log([o.id, o.first_name], "customer_details");
                return { id: o.id, label: o.first_name };
              });
              break;
            case "purchase_invoice_id":
              field.data = invoiceData.map(o => {
                return { id: o.id, label: o.purchase_invoice_number };
              });
              break;
            case "Source_Document_Type": {
              field.data = SourceDocument.map(curElem => {
                return {
                  id: curElem,
                  label: curElem.display_name,
                  lookup_code: curElem.lookup_code,
                };
              });
              break;
            }
            case "Select_Source_Document": {
              // field.data = options1.map((curElem) => {
              //   return { id: curElem, label: curElem };
              // });
              field.data =
                mainData &&
                mainData.Source_Document_Type &&
                mainData.Source_Document_Type.lookup_code == "DELIVERY_ORDERS"
                  ? Deliverydata.map(o => {
                      return {
                        id: o.id,
                        label: o?.delivery_order_details?.delivery_order_number,
                      };
                    })
                  : mainData &&
                    mainData.Source_Document_Type &&
                    mainData.Source_Document_Type.lookup_code == "ASN"
                  ? ASNdata.map(o => {
                      return { id: o.id, label: o.asn_number };
                    })
                  : mainData &&
                    mainData.Source_Document_Type &&
                    mainData.Source_Document_Type.lookup_code == "IST"
                  ? ISTdata.map(o => {
                      return { id: o.id, label: o.ist_number };
                    })
                  : mainData &&
                    mainData.Source_Document_Type &&
                    mainData.Source_Document_Type.lookup_code ==
                      "PURCHASE_RETURNS"
                  ? purchase_returnsdata.map(o => {
                      return { id: o.id, label: o.purchase_return_number };
                    })
                  : mainData &&
                    mainData.Source_Document_Type &&
                    mainData.Source_Document_Type.lookup_code == "SALES_RETURNS"
                  ? sales_returnsdata.map(o => {
                      return { id: o.id, label: o.sales_return_number };
                    })
                  : mainData &&
                    mainData.Source_Document_Type &&
                    mainData.Source_Document_Type.lookup_code ==
                      "PURCHASE_ORDERS"
                  ? purchaseOrdersData.map(o => {
                      return { id: o.id, label: o.purchase_order_number };
                    })
                  : mainData &&
                    mainData.Source_Document_Type &&
                    mainData.Source_Document_Type.lookup_code == "GRN"
                  ? GRNdata.map(o => {
                      return { id: o.id, label: o.grn_number };
                    })
                  : mainData &&
                    mainData.Source_Document_Type &&
                    mainData.Source_Document_Type.lookup_code == "SCRAP_ORDERS"
                  ? ScrapOrderdata.map(o => {
                      return { id: o.id, label: o.scrap_order_no };
                    })
                  : mainData &&
                    mainData.Source_Document_Type &&
                    mainData.Source_Document_Type.lookup_code == "SALES_INVOICE"
                  ? SalesInvoicedata.map(o => {
                      return { id: o.id, label: o.sales_invoice_number };
                    })
                  : mainData &&
                    mainData.Source_Document_Type &&
                    mainData.Source_Document_Type.lookup_code == "SALES_ORDERS"
                  ? SalesOrderdata.map(o => {
                      return { id: o.id, label: o.sales_order_number };
                    })
                  : null;
              break;
            }
          }
          return field;
        })}
        handelInputChange={handelInputChange}
        handelSelectonChange={handelSelectonChange}
        handelCheckBoxonChange={handelCheckBoxonChange}
        setRadioType={setRadioType}
      />

      {/* <DispatchLoctionDetails
        dispatch_location_details={dispatch_location_details}
        set_dispatch_location_details={set_dispatch_location_details}
      /> */}
      {/* <DispatchDeliveryDetails
        dispatch_delivery_details={dispatch_delivery_details}
        set_dispatch_delivery_details={set_dispatch_delivery_details}
      /> */}

      <AddForm
        header={"Customer Shipping Address"}
        data={CustomerShippingAddressFields.map(field => {
          switch (field.key) {
            case "ShippingAddress_Country": {
              field.data = Countrydata.map(o => {
                return { id: o.id, label: o.name };
              });
              break;
            }
            case "ShippingAddress_State": {
              field.data = Statedata.map(o => {
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
        // IsButtonShow={true}
        // ButtonText={"Search From Contacts"}
        // handleButtonClick={handleButtonClick}
      />

      <AddForm
        header={"Customer Billing Address"}
        data={CustomerBillingAddressFields.map(field => {
          switch (field.key) {
            case "BillingAddress_Country": {
              field.data = Countrydata.map(o => {
                return { id: o.id, label: o.name };
              });
              break;
            }
            case "BillingAddress_State": {
              field.data = Statedata.map(o => {
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
        IsCheckboxShowForCopyField={true}
        CheckboxShowForCopyField_text={"same as shipping address"}
        CheckboxShowForCopyField_value={CheckboxShowForCopyField_value}
        // IsButtonShow={true}
        // ButtonText={"Search From Contacts"}
        // handleButtonClick={handleButtonClick}
        handelCheckboxShowForCopyField_valueChange={
          handelCheckboxShowForCopyField_valueChange
        }
      />

      {/* //Product Details */}
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

      {/* //Additional Information */}
      <AddForm
        header={"Additional Information"}
        data={AdditionalInformationFields}
        handelInputChange={handelInputChange}
        handelSelectonChange={handelSelectonChange}
        handelCheckBoxonChange={handelCheckBoxonChange}
        setRadioType={setRadioType}
        IsCheckboxShowForCopyField={false}
        handelCheckboxShowForCopyField_valueChange={
          handelCheckboxShowForCopyField_valueChange
        }
      />

      <AddFormFooter
        header={"Payment Details"}
        subtotal={paymentDetailsFields.subTotal}
        tax={paymentDetailsFields.tax}
        shippingcharges={paymentDetailsFields.shippingCharge}
        handelSelectonChange={handelSelectonChange}
        handelInputChange={handelInputChange}
        total={paymentDetailsFields.total}
      />

      <AddFormFooter_Button handleButtonClick={handleButtonClick} />

      <ToastContainer />
    </>
  );
}

export default CreditAdd;

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
