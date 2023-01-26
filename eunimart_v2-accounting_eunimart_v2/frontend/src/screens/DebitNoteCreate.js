import React, { useEffect, useState, Suspense } from "react";
import AddForm from "Remote/AddForm";
import {
  loadCurrencyData,
  loadReasonsData,
  loadVendorsData,
  loadContacsData,
  loadProductsData,
  loadUOMData,
  createDebitnote,
  loadProductVariantData,
  loadPurchaseInvoiceData,
  Update_Debit_Note_Data,
  loadSOURCE_DOCUMENTData,
  loadASNData,
  loadSOData,
  loadGRNData,
  loadISTData,
  loadScrapOrderData,
  loadDeliveryOrderData,
  loadPurchaseReturnsData,
  loadSalesReturnsData,
  loadPurchaseOrdersData,
  loadASNDataById,
  loadSalesOrdersDataById,
  loadGRNDataById,
  loadISTDataById,
  loadScrapOrderDataById,
  loadDeliveryOrderDataById,
  loadPurchaseReturnsDataById,
  loadSalesReturnsDataById,
  loadPurchaseOrdersDataById,
  loadPurchaseInvoiceDataById,
} from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { debitnotecreateData } from "../App";
import AddFormFooter_Button from "Remote/AddFormFooter_Button";
import HeadingBtn from "../Shared/HeadingBtn/HeadingBtn";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import ModalViewV2 from "../Shared/MuiModal/ModalViewV2";
import ContactList from "./ContactList";
import { Paper, Card, CardContent } from "@mui/material";
import AddForm_Table from "Remote/AddForm_Table";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "@mui/material";
import AddFormFooter from "Remote/AddFormFooter";
import "../index.css";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { loadDebitNoteDataById } from "../redux/getDebitNoteById";
import { toast } from "react-toastify";

const DebitNoteCreate = props => {
  const navigate = useHistory();
  const [selectedOption, setSelectedOption] = useState(false);
  const [btnOption, setBtnOption] = useState();
  const [selected, setSelected] = useState([]);
  const [productsData, setProductsData] = useState(false);
  const address = useSelector(state => state.fetchAddress?.data);
  const [params, setParams] = useState({ per_page: "10", page_no: "1" });
  const [selectedValue, setSelectedValue] = useState();
  const [selectedAddress, setselectedAddress] = useState([]);
  const [contacts, setContacts] = useState([]);

  console.log("addressaddressaddress", address);

  let dispatch = useDispatch();
  const {
    Currencydata,
    Reasonsdata,
    Vendorsdata,
    contactsData,
    productsListData,
    SourceDocumentTypesData,
    uomData,
    productVariantData,
    purchaseInvoiceData,
    SalesOrdersData,
    ASNdata,
    GRNdata,
    ISTdata,
    ScrapOrdersData,
    DeliveryOrdersData,
    PurchaseReturnsData,
    SalesReturnsData,
    PurchaseOrdersData,
    GRNdataPurchaseOrdersData,
    ASNViewdata,
    GRNViewdata,
    ISTViewdata,
    ScrapOrdersViewData,
    DeliveryOrdersViewData,
    PurchaseReturnsViewData,
    SalesReturnsViewData,
    PurchaseOrdersViewData,
    PurchaseInvoiceViewData,
    SalesOrdersViewData,
  } = useSelector(state => state.data);
  const debitnotedata = useSelector(state => state.dataById.debitnotedataId);

  useEffect(() => {
    dispatch(loadCurrencyData());
    dispatch(loadReasonsData());
    dispatch(loadVendorsData());
    dispatch(loadContacsData());
    dispatch(loadProductsData());
    dispatch(loadUOMData());
    dispatch(
      loadProductVariantData({
        limit: 10,
        offset: 1,
        filters: null,
        sort: null,
      })
    );
    dispatch(
      loadPurchaseInvoiceData({
        limit: 10,
        offset: 1,
        filters: null,
        sort: null,
      })
    );
    dispatch(loadSOURCE_DOCUMENTData());
    if (props && props.id) {
      const { id } = props;
      dispatch(loadDebitNoteDataById(id));
    }
  }, []);
  useEffect(() => {
    if (props && props.id && debitnotedata) {
      console.log("debitnotedata", debitnotedata);
      var newMainData = [];

      var newDebitNoteDetails = debitnotedetails.map(o => {
        if (o.key == "vendor_id")
          o.value = {
            label: debitnotedata?.vendor?.name,
            id: debitnotedata?.vendor?.id,
          };
        if (o.key == "purchase_invoice_id")
          o.value = debitnotedata?.purchase_invoice?.purchase_invoice_number;
        if (o.key == "debit_note_date")
          o.value = moment(debitnotedata?.payment_due_date).format(
            "YYYY-MM-DD"
          );
        if (o.key == "currency_id")
          o.value = {
            id: debitnotedata?.currency?.id,
            label: debitnotedata?.currency?.name,
          };
        if (o.key == "reason_id")
          o.value = {
            id: debitnotedata?.reasons?.id,
            label: debitnotedata?.reasons?.display_name,
          };
        if (o.key == "Link_Source_Document_Type")
          o.value = {
            id: debitnotedata?.source_document?.id,
            label: debitnotedata?.source_document?.display_name,
            lookup_code: debitnotedata?.source_document?.lookup_code,
          };
        if (o.key == "Link_Source_Document")
          o.value = {
            id: debitnotedata?.source_documents?.id,
            label: debitnotedata?.source_documents?.grn_number
              ? debitnotedata?.source_documents?.grn_number
              : debitnotedata?.source_documents?.sales_order_number
              ? debitnotedata?.source_documents?.sales_order_number
              : debitnotedata?.source_documents?.asn_number
              ? debitnotedata?.source_documents?.asn_number
              : debitnotedata?.source_documents?.grn_number
              ? debitnotedata?.source_documents?.grn_number
              : debitnotedata?.source_documents?.ist_number
              ? debitnotedata?.source_documents?.ist_number
              : debitnotedata?.source_documents?.scrap_order_no
              ? debitnotedata?.source_documents?.scrap_order_no
              : debitnotedata?.source_documents?.delivery_order_details
                  ?.delivery_order_number
              ? debitnotedata?.source_documents?.delivery_order_details
                  ?.delivery_order_number
              : debitnotedata?.source_documents?.purchase_return_number
              ? debitnotedata?.source_documents?.purchase_return_number
              : debitnotedata?.source_documents?.sales_return_number
              ? debitnotedata?.source_documents?.sales_return_number
              : debitnotedata?.source_documents?.purchase_order_number,
          };
        if (o.key == "debit_note_id") o.value = debitnotedata?.debit_note_id;
        if (o.key == "reference_id") o.value = debitnotedata?.reference_id;
        if (o.key == "reason_id") o.value = debitnotedata?.reason?.lookup_code;
        return o;
      });
      setdebitnotedetails(newDebitNoteDetails);

      var newselectedProductData = [];
      if (debitnotedata.debit_note_line_items)
        newselectedProductData = debitnotedata.debit_note_line_items.map(o => {
          console.log(o, "product lines");
          return {
            sku_id: {
              id: o.product_variant_id,
              label: o?.product_variant_id ? o?.product_variant_id : "SKUV001",
            },
            product_template_id: o.product_template_id,
            product_name: o?.product_template?.product_name
              ? o?.product_template?.product_name
              : "product_name",
            // "warehouse_id": 1,
            // "inventory_id": 1,
            description: { data: o?.data ? o?.data : "data" },
            uom: {
              id: o.uom_id,
              label: o.uom?.uom_class_name ? o.uom?.uom_class_name : "EACH",
            },
            serial_number: o.serial_number,
            Quantity: parseInt(o.quantity),
            selling_price: parseFloat(o.price),
            discount: parseFloat(o.discount),
            product_pricing_details: { tax_options: o.tax },
            Amount: o.amount,
            Payment_Terms: o.payment_term_id,
            tax: o.tax,
          };
        });
      setSelectedProductData(newselectedProductData);

      var newAdditionalInformationFields = AdditionalInformationFields.map(
        o => {
          if (o.key == "Additional_Information_Note")
            o.value = debitnotedata?.external_notes;
          if (o.key == "Additional_Information_Terms_Conditions")
            o.value = debitnotedata?.terms_and_conditions;
          return o;
        }
      );
      setAdditionalInformationFields(newAdditionalInformationFields);

      var newPaymentDetailsFields = {
        subTotal: debitnotedata?.sub_total,
        tax: debitnotedata?.tax,
        shippingCharge: debitnotedata?.shipping_charges,
        adjustment_text: "",
        Final_Adjustment: "+",
        adjustment_amount: 0,
        totalBeforeAdjustment: 0,
        total: debitnotedata?.total_amount,
      };
      setPaymentDetailsFields(newPaymentDetailsFields);

      // vendor delivery address card
      console.log("SEtting", debitnotedata?.delivery_address);
      setselectedAddress(debitnotedata?.delivery_address);
      // delivery_address

      newMainData = [
        ...newDebitNoteDetails,
        ...newAdditionalInformationFields,
        ...newselectedProductData,

        // ...newPaymentDetailsFields,
      ];

      var keyValuePairMainData = {};
      newMainData.map(o => {
        if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      console.log("newMainData", newMainData, keyValuePairMainData);
      setMainData(keyValuePairMainData);
    }
  }, [debitnotedata]);

  //----------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------

  useEffect(() => {
    //if (props && props.id && debitnotedata)
    if (
      mainData &&
      mainData?.Link_Source_Document_Type &&
      mainData?.Link_Source_Document_Type?.lookup_code == "PURCHASE_RETURNS"
    ) {
      console.log("PurchaseReturnsViewData", PurchaseReturnsViewData);
      var newMainData = [];

      var newDebitNoteDetails = debitnotedetails.map(o => {
        if (o.key == "reference_id")
          o.value = PurchaseReturnsViewData?.reference_number;
        return o;
      }); //data.reference_number
      setdebitnotedetails(newDebitNoteDetails);

      var newselectedProductData = [];
      if (PurchaseReturnsViewData?.purchase_return_lines)
        newselectedProductData =
          PurchaseReturnsViewData?.purchase_return_lines.map(o => {
            console.log(o, "product lines");
            return {
              sku_id: {
                id: o?.product_details?.id,
                label: o?.product_details?.sku_id,
              },
              product_template_id: o?.product_details?.product_template_id,
              product_name: o?.product_details?.product_name,
              description: o?.product_details?.description,
              uom: o?.product_details?.product_dimensions?.uom
                ? o?.product_details?.product_dimensions?.uom
                : o?.uom,
              serial_number: o?.product_details?.serial_number,
              //   Quantity: parseInt(o?.quantity),
              selling_price: parseFloat(o?.product_details?.selling_price),
              discount: parseFloat(o?.discount),
              Amount: o?.amount,
              Payment_Terms: {
                id: o.payment_term_id,
                label: o?.payment_terms?.display_name,
              },
              tax: o?.tax,
            };
          }); //data.amount
      setSelectedProductData(newselectedProductData);

      var newAdditionalInformationFields = AdditionalInformationFields.map(
        o => {
          if (o.key == "Additional_Information_Note")
            o.value = PurchaseReturnsViewData?.additional_information?.notes;
          if (o.key == "Additional_Information_Terms_Conditions")
            o.value =
              PurchaseReturnsViewData?.additional_information?.terms_and_conditions;
          return o;
        }
      );
      setAdditionalInformationFields(newAdditionalInformationFields);

      // var newPaymentDetailsFields = {
      //   subTotal: PurchaseReturnsViewData?.so_payment_details?.sub_total,
      //   tax: PurchaseReturnsViewData?.so_payment_details?.tax,
      //   shippingCharge: PurchaseReturnsViewData?.so_payment_details?.shipping_charges,
      //   adjustment_text: "",
      //   Final_Adjustment: "+",
      //   adjustment_amount: 0,
      //   totalBeforeAdjustment: 0,
      //   total: PurchaseReturnsViewData?.so_payment_details?.total_amount,
      // };
      // setPaymentDetailsFields(newPaymentDetailsFields);

      setselectedAddress(
        PurchaseReturnsViewData?.customer_shipping_address?.address_line_3
      );

      newMainData = [
        ...newDebitNoteDetails,
        ...newAdditionalInformationFields,
        ...newselectedProductData,
        //...newPaymentDetailsFields,
      ];

      var keyValuePairMainData = {};
      newMainData.map(o => {
        if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      //console.log("newMainData", newMainData, keyValuePairMainData);
      setMainData(keyValuePairMainData);
    }
  }, [PurchaseReturnsViewData]);

  //-----------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------

  useEffect(() => {
    //if (props && props.id && debitnotedata)
    if (
      mainData &&
      mainData?.Link_Source_Document_Type &&
      mainData?.Link_Source_Document_Type?.lookup_code == "SALES_RETURNS"
    ) {
      console.log("SalesReturnsViewData", SalesReturnsViewData);
      var newMainData = [];

      var newDebitNoteDetails = debitnotedetails.map(o => {
        if (o.key == "reference_id")
          o.value = SalesReturnsViewData?.reference_number;
        if (o.key == "reason_id")
          o.value = {
            id: SalesReturnsViewData?.reason?.id,
            label: SalesReturnsViewData?.reason?.display_name,
          };
        return o;
      }); //data.reason.id
      setdebitnotedetails(newDebitNoteDetails);

      var newselectedProductData = [];
      if (SalesReturnsViewData?.sales_return_lines)
        newselectedProductData = SalesReturnsViewData?.sales_return_lines.map(
          o => {
            console.log(o, "product lines");
            return {
              sku_id: {
                id: o?.product_details?.id,
                label: o?.product_details?.sku_id,
              },
              product_template_id: o?.product_details?.product_template_id,
              product_name: o?.product_details?.product_name,
              description: o?.product_details?.description,
              uom: o?.product_details?.product_dimensions?.uom,
              serial_number: o?.product_details?.serial_number,
              //   Quantity: parseInt(o?.quantity),
              selling_price: parseFloat(o?.product_details?.selling_price),
              discount: parseFloat(o?.discount),
              Amount: o?.amount,
              Payment_Terms: {
                id: o.payment_term_id,
                label: o?.payment_terms?.display_name,
              },
              tax: o?.tax,
            };
          }
        ); //data.amount
      setSelectedProductData(newselectedProductData);

      var newAdditionalInformationFields = AdditionalInformationFields.map(
        o => {
          if (o.key == "Additional_Information_Note")
            o.value = SalesReturnsViewData?.additional_information?.notes;
          if (o.key == "Additional_Information_Terms_Conditions")
            o.value =
              SalesReturnsViewData?.additional_information?.terms_and_conditions;
          return o;
        }
      ); //data.additional_information.notes
      setAdditionalInformationFields(newAdditionalInformationFields);

      // var newPaymentDetailsFields = {
      //   subTotal: SalesReturnsViewData?.so_payment_details?.sub_total,
      //   tax: SalesReturnsViewData?.so_payment_details?.tax,
      //   shippingCharge: SalesReturnsViewData?.so_payment_details?.shipping_charges,
      //   adjustment_text: "",
      //   Final_Adjustment: "+",
      //   adjustment_amount: 0,
      //   totalBeforeAdjustment: 0,
      //   total: SalesReturnsViewData?.so_payment_details?.total_amount,
      // };
      // setPaymentDetailsFields(newPaymentDetailsFields);

      setselectedAddress(
        PurchaseReturnsViewData?.customer_shipping_address?.address_line_3
      );

      newMainData = [
        ...newDebitNoteDetails,
        ...newAdditionalInformationFields,
        ...newselectedProductData,
        //...newPaymentDetailsFields,
      ];

      var keyValuePairMainData = {};
      newMainData.map(o => {
        if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      //console.log("newMainData", newMainData, keyValuePairMainData);
      setMainData(keyValuePairMainData);
    }
  }, [SalesReturnsViewData]);

  //-------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------

  useEffect(() => {
    //if (props && props.id && debitnotedata)
    if (
      mainData &&
      mainData?.Link_Source_Document_Type &&
      mainData?.Link_Source_Document_Type?.lookup_code == "SALES_ORDERS"
    ) {
      console.log("SalesOrdersViewData", SalesOrdersViewData);
      var newMainData = [];

      var newDebitNoteDetails = debitnotedetails.map(o => {
        if (o.key == "reference_id")
          o.value = SalesOrdersViewData?.reference_number;
        return o;
      });
      setdebitnotedetails(newDebitNoteDetails);

      var newselectedProductData = [];
      if (SalesOrdersViewData?.sales_order_lines)
        newselectedProductData = SalesOrdersViewData?.sales_order_lines.map(
          o => {
            console.log(o, "product lines");
            return {
              sku_id: {
                id: o?.inventory?.product_details?.id,
                label: o?.inventory?.product_details?.sku_id,
              },
              product_template_id:
                o?.inventory?.product_details?.product_template_id,
              product_name: o?.inventory?.product_details?.product_name,
              description: o?.inventory?.product_details?.description,
              uom: o?.inventory?.product_details?.product_dimensions?.uom,
              serial_number: o?.inventory?.product_details?.serial_number,
              //   Quantity: parseInt(o?.inventory?.quantity),
              selling_price: parseFloat(
                o?.inventory?.product_details?.selling_price
              ),
              discount: parseFloat(o?.discount),
              Amount: o?.amount,
              Payment_Terms: {
                id: o.payment_term_id,
                label: o?.payment_terms?.display_name,
              },
              tax: o?.tax,
            };
          }
        );
      setSelectedProductData(newselectedProductData);

      var newAdditionalInformationFields = AdditionalInformationFields.map(
        o => {
          if (o.key == "Additional_Information_Note")
            o.value = SalesOrdersViewData?.additional_information?.notes;
          if (o.key == "Additional_Information_Terms_Conditions")
            o.value =
              SalesOrdersViewData?.additional_information?.terms_and_conditions;
          return o;
        }
      );
      setAdditionalInformationFields(newAdditionalInformationFields);

      // var newPaymentDetailsFields = {
      //   subTotal: SalesOrdersData?.so_payment_details?.sub_total,
      //   tax: SalesOrdersData?.so_payment_details?.tax,
      //   shippingCharge: SalesOrdersData?.so_payment_details?.shipping_charges,
      //   adjustment_text: "",
      //   Final_Adjustment: "+",
      //   adjustment_amount: 0,
      //   totalBeforeAdjustment: 0,
      //   total: SalesOrdersData?.so_payment_details?.total_amount,
      // };
      // setPaymentDetailsFields(newPaymentDetailsFields);

      setselectedAddress(
        SalesOrdersViewData?.customer_shipping_address?.address_line_3
      );

      newMainData = [
        ...newDebitNoteDetails,
        ...newAdditionalInformationFields,
        ...newselectedProductData,
        //...newPaymentDetailsFields,
      ];

      var keyValuePairMainData = {};
      newMainData.map(o => {
        if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      //console.log("newMainData", newMainData, keyValuePairMainData);
      setMainData(keyValuePairMainData);
    }
  }, [SalesOrdersViewData]);

  //-------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------

  useEffect(() => {
    if (
      mainData &&
      mainData?.Link_Source_Document_Type &&
      mainData?.Link_Source_Document_Type?.lookup_code == "PURCHASE_ORDERS"
    ) {
      console.log(" PurchaseOrdersViewData", PurchaseOrdersViewData);
      var newMainData = [];

      var newDebitNoteDetails = debitnotedetails.map(o => {
        if (o.key == "reference_id")
          o.value = PurchaseOrdersViewData?.reference_number;
        return o;
      });
      setdebitnotedetails(newDebitNoteDetails);

      var newselectedProductData = [];
      if (PurchaseOrdersViewData?.purchase_order_lines)
        newselectedProductData =
          PurchaseOrdersViewData?.purchase_order_lines.map(o => {
            return {
              sku_id: {
                id: o?.inventory?.product_details?.id,
                label: o?.inventory?.product_details?.sku_id,
              },
              product_template_id:
                o?.inventory?.product_details?.product_template_id,
              product_name: o?.inventory.product_details?.product_name,
              description: o?.inventory?.product_details?.description,
              uom: o?.inventory?.product_details?.product_dimensions?.uom,
              serial_number: o?.inventory?.product_details?.serial_number,
              //  Quantity: parseInt(o?.inventory?.quantity),
              selling_price: parseFloat(
                o?.inventory?.product_details?.selling_price
              ),
              discount: parseFloat(o?.discount),
              Amount: o?.amount,
              Payment_Terms: {
                id: o.payment_term_id,
                label: o?.payment_terms?.display_name,
              },
              tax: o?.tax,
            };
          });
      setSelectedProductData(newselectedProductData);

      var newAdditionalInformationFields = AdditionalInformationFields.map(
        o => {
          if (o.key == "Additional_Information_Note")
            o.value = PurchaseOrdersViewData?.additional_information?.notes;
          if (o.key == "Additional_Information_Terms_Conditions")
            o.value =
              PurchaseOrdersViewData?.additional_information?.terms_and_conditions;
          return o;
        }
      );
      setAdditionalInformationFields(newAdditionalInformationFields);

      // var newPaymentDetailsFields = {
      //   subTotal: PurchaseOrdersData?.po_payment_details?.sub_total,
      //   tax: PurchaseOrdersData?.po_payment_details?.tax,
      //   shippingCharge: PurchaseOrdersData?.po_payment_details?.shipping_charges,
      //   adjustment_text: "",
      //   Final_Adjustment: "+",
      //   adjustment_amount: 0,
      //   totalBeforeAdjustment: 0,
      //   total: PurchaseOrdersData?.po_payment_details?.total_amount,
      // };
      // setPaymentDetailsFields(newPaymentDetailsFields);

      setselectedAddress(
        PurchaseOrdersViewData?.delivery_address?.address_line_3
      );

      newMainData = [
        ...newDebitNoteDetails,
        ...newAdditionalInformationFields,
        ...newselectedProductData,
        //...newPaymentDetailsFields,
      ];

      var keyValuePairMainData = {};
      newMainData.map(o => {
        if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      console.log("newMainData", newMainData, keyValuePairMainData);
      setMainData(keyValuePairMainData);
    }
  }, [PurchaseOrdersViewData]);
  console.log(" PurchaseOrdersViewData", PurchaseOrdersViewData);
  //-------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------
  console.log(" PurchaseInvoiceViewData", PurchaseInvoiceViewData);
  useEffect(() => {
    if (
      mainData &&
      mainData?.Link_Source_Document_Type &&
      mainData?.Link_Source_Document_Type?.lookup_code == "PURCHASE_INVOICE"
    ) {
      console.log(
        " PurchaseInvoiceViewDataInsideEffect",
        PurchaseInvoiceViewData
      );
      var newMainData = [];

      var newDebitNoteDetails = debitnotedetails.map(o => {
        if (o.key == "reference_id")
          o.value = PurchaseInvoiceViewData?.reference_number;
        if (o.key == "currency_id")
          o.value = PurchaseInvoiceViewData?.currency?.name;
        return o;
      });
      setdebitnotedetails(newDebitNoteDetails);

      var newselectedProductData = [];
      if (PurchaseInvoiceViewData?.purchase_invoice_lines)
        newselectedProductData =
          PurchaseInvoiceViewData?.purchase_invoice_lines.map(o => {
            return {
              sku_id: {
                id: o?.id,
                label: o?.product_details?.sku_id,
              },
              product_template_id: o?.product_template_id,
              product_name: o.product_details?.product_name,
              // description: o?.inventory?.product_details?.description,
              uom: o?.uom?.name,
              serial_number: o?.product_details?.serial_number,
              //  Quantity: parseInt(o?.inventory?.quantity),
              selling_price: parseFloat(o?.product_details?.selling_price),
              discount: parseFloat(o?.discount),
              Amount: o?.amount,
              Payment_Terms: {
                id: o.payment_term_id,
                label: o?.payment_terms?.display_name,
              },
              tax: o?.tax,
            };
          });
      setSelectedProductData(newselectedProductData);

      var newAdditionalInformationFields = AdditionalInformationFields.map(
        o => {
          if (o.key == "Additional_Information_Note")
            o.value = PurchaseInvoiceViewData?.additional_information?.notes;
          if (o.key == "Additional_Information_Terms_Conditions")
            o.value =
              PurchaseInvoiceViewData?.additional_information?.terms_and_conditions;
          return o;
        }
      );
      setAdditionalInformationFields(newAdditionalInformationFields);

      // var newPaymentDetailsFields = {
      //   subTotal: PurchaseOrdersData?.po_payment_details?.sub_total,
      //   tax: PurchaseOrdersData?.po_payment_details?.tax,
      //   shippingCharge: PurchaseOrdersData?.po_payment_details?.shipping_charges,
      //   adjustment_text: "",
      //   Final_Adjustment: "+",
      //   adjustment_amount: 0,
      //   totalBeforeAdjustment: 0,
      //   total: PurchaseOrdersData?.po_payment_details?.total_amount,
      // };
      // setPaymentDetailsFields(newPaymentDetailsFields);

      setselectedAddress(
        PurchaseInvoiceViewData?.delivery_address?.address_line_3
      );

      newMainData = [
        ...newDebitNoteDetails,
        ...newAdditionalInformationFields,
        ...newselectedProductData,
        //...newPaymentDetailsFields,
      ];

      var keyValuePairMainData = {};
      newMainData.map(o => {
        if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      console.log("newMainData", newMainData, keyValuePairMainData);
      setMainData(keyValuePairMainData);
    }
  }, [PurchaseInvoiceViewData]);

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------

  useEffect(() => {
    if (
      mainData &&
      mainData?.Link_Source_Document_Type &&
      mainData?.Link_Source_Document_Type?.lookup_code == "DELIVERY_ORDERS"
    ) {
      console.log("DeliveryOrdersViewData", DeliveryOrdersViewData);
      var newMainData = [];

      var newDebitNoteDetails = debitnotedetails.map(o => {
        if (o.key == "reference_id")
          o.value =
            DeliveryOrdersViewData?.delivery_order_details?.reference_id;
        return o;
      });
      setdebitnotedetails(newDebitNoteDetails);

      var newselectedProductData = [];
      if (DeliveryOrdersViewData?.delivery_order_lines)
        newselectedProductData =
          DeliveryOrdersViewData?.delivery_order_lines.map(o => {
            return {
              sku_id: {
                id: o?.product_details?.id,
                label: o?.product_details?.sku_id,
              },
              product_template_id: o?.product_details?.product_template_id,
              product_name: o?.product_details?.product_name,
              description: o?.product_details?.description,
              uom: o?.product_details?.product_dimensions?.uom,
              serial_number: o?.product_details?.serial_number,
              //  Quantity: parseInt(o?.quantity),
              selling_price: parseFloat(o?.product_details?.selling_price),
              discount: parseFloat(o?.discount),
              Amount: o?.amount,
              Payment_Terms: {
                id: o.payment_term_id,
                label: o?.payment_terms?.display_name,
              },
              tax: o?.tax,
            };
          });
      setSelectedProductData(newselectedProductData);

      var newAdditionalInformationFields = AdditionalInformationFields.map(
        o => {
          if (o.key == "Additional_Information_Note")
            o.value = DeliveryOrdersViewData?.additional_information?.notes;
          if (o.key == "Additional_Information_Terms_Conditions")
            o.value =
              DeliveryOrdersViewData?.additional_information?.terms_and_conditions;
          return o;
        }
      );
      setAdditionalInformationFields(newAdditionalInformationFields);

      // var newPaymentDetailsFields = {
      //   subTotal: DeliveryOrdersData?.payment_details?.sub_total,
      //   tax: DeliveryOrdersData?.payment_details?.tax,
      //   shippingCharge: DeliveryOrdersData?.payment_details?.shipping_charges,
      //   adjustment_text: "",
      //   Final_Adjustment: "+",
      //   adjustment_amount: 0,
      //   totalBeforeAdjustment: 0,
      //   total: DeliveryOrdersData?.payment_details?.total_amount,
      // };
      // setPaymentDetailsFields(newPaymentDetailsFields);
      setselectedAddress(
        DeliveryOrdersViewData?.delivery_address_details?.address_line_3
      );

      newMainData = [
        ...newDebitNoteDetails,
        ...newAdditionalInformationFields,
        ...newselectedProductData,
        //...newPaymentDetailsFields,
      ];

      var keyValuePairMainData = {};
      newMainData.map(o => {
        if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      console.log("newMainData", newMainData, keyValuePairMainData);
      setMainData(keyValuePairMainData);
    }
  }, [DeliveryOrdersViewData]);

  //---------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------

  useEffect(() => {
    if (
      mainData &&
      mainData?.Link_Source_Document_Type &&
      mainData?.Link_Source_Document_Type?.lookup_code == "SCRAP_ORDERS"
    ) {
      console.log("ScrapOrdersViewData", ScrapOrdersViewData);
      var newMainData = [];

      var newDebitNoteDetails = debitnotedetails.map(o => {
        if (o.key == "reference_id")
          o.value = ScrapOrdersViewData?.reference_id;
        return o;
      });
      setdebitnotedetails(newDebitNoteDetails);

      var newselectedProductData = [];
      if (ScrapOrdersViewData?.order_lines)
        newselectedProductData = ScrapOrdersViewData?.order_lines.map(o => {
          return {
            sku_id: {
              id: o?.product_details?.id,
              label: o?.product_details?.sku_id,
            },
            product_template_id: o?.product_details?.product_template_id,
            product_name: o?.product_details?.product_name,
            description: o?.product_details?.description,
            uom: o?.product_details?.product_dimensions?.uom,
            serial_number: o?.product_details?.serial_number,
            // Quantity: parseInt(o?.quantity),
            selling_price: parseFloat(o?.product_details?.selling_price),
            discount: parseFloat(o?.discount),
            Amount: o?.amount,
            Payment_Terms: {
              id: o.payment_term_id,
              label: o?.payment_terms?.display_name,
            },
            tax: o?.tax,
          };
        });
      setSelectedProductData(newselectedProductData);

      newMainData = [...newDebitNoteDetails, ...newselectedProductData];

      var keyValuePairMainData = {};
      newMainData.map(o => {
        if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      setMainData(keyValuePairMainData);
    }
  }, [ScrapOrdersViewData]);

  //-------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------

  useEffect(() => {
    //if (props && props.id && debitnotedata)
    if (
      mainData &&
      mainData?.Link_Source_Document_Type &&
      mainData?.Link_Source_Document_Type?.lookup_code == "IST"
    ) {
      console.log("ISTViewdata", ISTViewdata);
      var newMainData = [];

      var newDebitNoteDetails = debitnotedetails.map(o => {
        if (o.key == "reference_id") o.value = ISTViewdata?.reference_number;
        if (o.key == "reason_id") o.value = ISTViewdata?.reason_id;
        return o;
      });
      setdebitnotedetails(newDebitNoteDetails);

      var newselectedProductData = [];
      if (ISTViewdata?.internal_transfer_lines)
        newselectedProductData = ISTViewdata?.internal_transfer_lines.map(o => {
          return {
            sku_id: {
              id: o?.inventory?.product_details?.id,
              label: o?.inventory?.product_details?.sku_id,
            },
            product_template_id:
              o?.inventory?.product_details?.product_template_id,
            product_name: o?.inventory?.product_details?.product_name,
            description: o?.inventory?.product_details?.description,
            uom: o?.inventory?.product_details?.product_dimensions?.uom,
            serial_number: o?.inventory?.product_details?.serial_number,
            // Quantity: parseInt(o?.inventory?.quantity),
            selling_price: parseFloat(
              o?.inventory?.product_details?.selling_price
            ),
            discount: parseFloat(o?.discount),
            Amount: o?.amount,
            Payment_Terms: {
              id: o.payment_term_id,
              label: o?.payment_terms?.display_name,
            },
          };
        });
      setSelectedProductData(newselectedProductData);

      // var newPaymentDetailsFields = {
      //   subTotal: ISTdata?.po_payment_details?.sub_total,
      //   tax: ISTdata?.po_payment_details?.tax,
      //   shippingCharge: ISTdata?.po_payment_details?.shipping_charges,
      //   adjustment_text: "",
      //   Final_Adjustment: "+",
      //   adjustment_amount: 0,
      //   totalBeforeAdjustment: 0,
      //   total: ISTdata?.po_payment_details?.total_amount,
      // };
      // setPaymentDetailsFields(newPaymentDetailsFields);

      newMainData = [
        ...newDebitNoteDetails,
        ...newselectedProductData,
        // ...newPaymentDetailsFields,
      ];

      var keyValuePairMainData = {};
      newMainData.map(o => {
        if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      console.log("newMainData", newMainData, keyValuePairMainData);
      setMainData(keyValuePairMainData);
    }
  }, [ISTViewdata]);

  //--------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------

  useEffect(() => {
    if (
      mainData &&
      mainData?.Link_Source_Document_Type &&
      mainData?.Link_Source_Document_Type?.lookup_code == "GRN"
    ) {
      console.log("GRNViewdata", GRNViewdata);
      var newMainData = [];

      var newDebitNoteDetails = debitnotedetails.map(o => {
        if (o.key == "reference_id") o.value = GRNViewdata?.reference_number;
        return o;
      });
      setdebitnotedetails(newDebitNoteDetails);

      var newselectedProductData = [];
      if (GRNViewdata?.grn_order_lines)
        newselectedProductData = GRNViewdata?.grn_order_lines.map(o => {
          return {
            sku_id: { id: o?.product?.id, label: o?.product?.sku_id },
            product_template_id: o?.product?.product_template_id,
            product_name: o?.product?.product_name,
            description: o?.product?.description,
            uom: o?.product?.product_dimensions?.uom,
            serial_number: o?.product?.serial_number,
            // Quantity: parseInt(o?.quantity),
            selling_price: parseFloat(o?.product.selling_price),
            discount: parseFloat(o?.discount),
            Amount: o?.amount,
            Payment_Terms: {
              id: o.payment_term_id,
              label: o?.payment_terms?.display_name,
            },
            tax: o?.tax,
          };
        });
      setSelectedProductData(newselectedProductData);

      newMainData = [...newDebitNoteDetails, ...newselectedProductData];

      var keyValuePairMainData = {};
      newMainData.map(o => {
        if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      setMainData(keyValuePairMainData);
    }
  }, [GRNViewdata]);

  //----------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------

  useEffect(() => {
    if (
      ASNViewdata &&
      mainData &&
      mainData?.Link_Source_Document_Type &&
      mainData?.Link_Source_Document_Type?.lookup_code == "ASN"
    ) {
      console.log("ASNViewdata", ASNViewdata);
      var newMainData = [];

      var newDebitNoteDetails = debitnotedetails.map(o => {
        if (o.key == "reference_id") o.value = ASNViewdata?.reference_number;
        return o;
      });
      setdebitnotedetails(newDebitNoteDetails);

      var newselectedProductData = [];
      if (ASNViewdata?.asn_order_lines)
        newselectedProductData = ASNViewdata?.asn_order_lines.map(o => {
          return {
            sku_id: {
              id: o?.product_variant?.id,
              label: o?.product_variant?.sku_id,
            },
            product_template_id: o?.product_variant?.product_template_id,
            product_name: o?.product_variant?.product_name,
            description: o?.product_variant?.description,
            uom: o?.product_variant?.product_dimensions?.uom,
            serial_number: o?.product_variant?.serial_number,
            // Quantity: parseInt(o?.quantity),
            selling_price: parseFloat(o?.product_variant?.selling_price),
            discount: parseFloat(o?.discount),
            Amount: o?.amount,
            Payment_Terms: {
              id: o.payment_term_id,
              label: o?.payment_terms?.display_name,
            },
            tax: o?.tax,
          };
        });
      setSelectedProductData(newselectedProductData);

      var newAdditionalInformationFields = AdditionalInformationFields.map(
        o => {
          if (o.key == "Additional_Information_Note")
            o.value = ASNViewdata?.link_po?.additional_information?.notes;
          if (o.key == "Additional_Information_Terms_Conditions")
            o.value =
              ASNViewdata?.link_po?.additional_information?.terms_and_conditions;
          return o;
        }
      );
      setAdditionalInformationFields(newAdditionalInformationFields);

      // var newPaymentDetailsFields = {
      //   subTotal: ASNdata?.link_po?.po_payment_details?.sub_total,
      //   tax: ASNdata?.link_po?.po_payment_details?.tax,
      //   shippingCharge: ASNdata?.link_po?.po_payment_details?.shipping_charges,
      //   adjustment_text: "",
      //   Final_Adjustment: "+",
      //   adjustment_amount: 0,
      //   totalBeforeAdjustment: 0,
      //   total: ASNdata?.link_po?.po_payment_details?.total_amount,
      // };
      // setPaymentDetailsFields(newPaymentDetailsFields);

      setselectedAddress(
        ASNViewdata?.link_po?.delivery_address?.address_line_3
      );

      newMainData = [
        ...newDebitNoteDetails,
        ...newAdditionalInformationFields,
        ...newselectedProductData,
        // ...newPaymentDetailsFields,
      ];

      var keyValuePairMainData = {};
      newMainData.map(o => {
        if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      console.log("newMainData", newMainData, keyValuePairMainData);
      setMainData(keyValuePairMainData);
    }
  }, [ASNViewdata]);

  //---------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  const setDataByKeyAndValue = (key, value, index = null) => {
    console.log(
      "setDataByKeyAndValue",
      "key",
      key,
      "value",
      value,
      "index",
      index
    );

    if (index != null) {
      try {
        var newSelectedProductData = selectedProductData;

        if (key === "sku_id") {
          console.log("sku_id");
          var selectVarient = productVariantData.find(o => o.id == value.id);
          newSelectedProductData[index] = selectVarient;
          newSelectedProductData[index][key] = value.label;
        } else if (key === "uom.name") {
          console.log("uom.name");
          var selectVarient = uomData.find(o => o.id == value.id);
          newSelectedProductData[index].uom = {
            name: value.label,
            id: value.id,
          };
        } else {
          console.log("key", key);
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
          newSelectedProductData[index].product_pricing_details?.tax_options &&
          parseFloat(
            newSelectedProductData[index].product_pricing_details?.tax_options
          ) > 0
        ) {
          var taxRate = parseFloat(
            newSelectedProductData[index].product_pricing_details?.tax_options
          );
          tax = (grossTotal * taxRate) / 100;
        } else tax = 0;

        var amount = grossTotal + tax;
        newSelectedProductData[index].Amount = amount;
        //console.log("Total", newSelectedProductData.map(o=>o.Amount).reduce((accumulator, currentValue) => accumulator + currentValue, 0));
        setSelectedProductData(newSelectedProductData);
        console.log(
          "actual",
          selectedProductData,
          "changednew",
          newSelectedProductData
        );
      } catch (e) {
        console.error("err1", e);
      }
    }

    try {
      var newDebitNoteDetails = debitnotedetails.map(o => {
        if (o.key == key) o.value = value;
        return o;
      });
      setdebitnotedetails(newDebitNoteDetails);
    } catch (e) {
      console.error("err2", e);
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
      console.error("err3", e);
    }

    try {
    } catch (e) {
      console.error("err4", e);
    }
  };

  const [debitnotedetails, setdebitnotedetails] = useState([
    {
      label: "Vendor Contact",
      type: "select",
      key: "vendor_id",
      defaultVal: {},
    },
    {
      label: "Purchase Invoice ID",
      type: "select",
      key: "purchase_invoice_id",
    },
    {
      label: "Debit Note Date",
      type: "date",
      key: "debit_note_date",
    },
    {
      label: "Currency",
      type: "select",
      key: "currency_id",
      defaultVal: {},
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
      label: "Debit Note ID",
      type: "input",
      key: "debit_note_id",
    },
    {
      label: "Auto Generate Debit Note ID",
      type: "checkbox",
      key: "generate_debit_note_id",
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
      key: "generate_reference_id",
      isChecked: false,
    },
    {
      label: "Reason",
      type: "select",
      key: "reason_id",
      defaultVal: {},
    },
  ]);

  const [selectedProductData, setSelectedProductData] = useState([
    {
      Quantity: 0,
      selling_price: 0,
      discount: 0,
      product_pricing_details: { tax_options: 0 },
    },
  ]);
  useEffect(() => {
    console.log(selectedProductData, "selectedProductData");
  }, [selectedProductData]);
  useEffect(() => {
    console.log(mainData, "mainData");
  }, [mainData]);

  const [paymentDetailsFields, setPaymentDetailsFields] = useState({
    subTotal: 0,
    tax: 0,
    shippingCharge: 0,
    adjustment_text: "",
    Final_Adjustment: "+",
    adjustment_amount: 0,
    totalBeforeAdjustment: 0,
    total: 0,
  });

  const [AdditionalInformationFields, setAdditionalInformationFields] =
    useState([
      {
        label: "Note",
        type: "textarea",
        key: "Additional_Information_Note",
      },
      {
        label: "Terms and Conditions",
        type: "textarea",
        key: "Additional_Information_Terms_Conditions",
      },
    ]);

  const [mainData, setMainData] = useState({});

  const onAddNewRaw = () => {
    setSelectedProductData([
      ...selectedProductData,
      {
        Quantity: 0,
        selling_price: 0,
        discount: 0,
        product_pricing_details: { tax_options: 0 },
        tax: 0,
      },
    ]);
  };

  const headCells = [
    {
      key: "sku_id",
      label: "Product SKU",
      type: "select",
      // data: useSelector((state) => productsListData.map(o => { return { id: o.id, label: o.product_name } }))
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
      type: "text",
    },
    {
      key: "uom.name",
      label: "Unit of Measurements",
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
      // key: "product_pricing_details.tax_options",
      key: "tax",
      label: "Tax%",
      type: "text",
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
            onClick={() =>
              setSelectedProductData(
                selectedProductData.filter(o => o.id != item.id)
              )
            }
          />
        </div>
      ),
    },
  ];

  const handelSelectonChange = (key, value, index) => {
    console.log("key", key, value);
    setDataByKeyAndValue(key, value, index);

    // // linking and calling respective lookup code api
    if (key == "Link_Source_Document_Type") {
      if (value.lookup_code == "SALES_ORDERS") {
        dispatch(
          loadSOData({ limit: 100, offset: 1, filters: null, sort: null })
        );
      }
      if (value.lookup_code == "IST") {
        dispatch(
          loadISTData({ limit: 100, offset: 1, filters: null, sort: null })
        );
      }
      if (value.lookup_code == "ASN") {
        dispatch(
          loadASNData({ limit: 100, offset: 1, filters: null, sort: null })
        );
      }
      if (value.lookup_code == "GRN") {
        dispatch(
          loadGRNData({ limit: 100, offset: 1, filters: null, sort: null })
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
      if (value.lookup_code == "DELIVERY_ORDERS") {
        dispatch(
          loadDeliveryOrderData({
            limit: 100,
            offset: 1,
            filters: null,
            sort: null,
          })
        );
      }
      if (value.lookup_code == "PURCHASE_RETURNS") {
        dispatch(
          loadPurchaseReturnsData({
            limit: 100,
            offset: 1,
            filters: null,
            sort: null,
          })
        );
      }
      if (value.lookup_code == "SALES_RETURNS") {
        dispatch(
          loadSalesReturnsData({
            limit: 100,
            offset: 1,
            filters: null,
            sort: null,
          })
        );
      }

      if (value.lookup_code == "PURCHASE_ORDERS") {
        dispatch(
          loadPurchaseOrdersData({
            limit: 100,
            offset: 1,
            filters: null,
            sort: null,
          })
        );
      }
      if (value.lookup_code == "PURCHASE_INVOICE") {
        dispatch(
          loadPurchaseInvoiceData({
            limit: 100,
            offset: 1,
            filters: null,
            sort: null,
          })
        );
      }
    }
    if (key == "Link_Source_Document") {
      if (mainData.Link_Source_Document_Type.lookup_code == "SALES_ORDERS") {
        dispatch(loadSalesOrdersDataById(value.id));
      }
      if (mainData.Link_Source_Document_Type.lookup_code == "IST") {
        dispatch(loadISTDataById(value.id));
      }
      if (mainData.Link_Source_Document_Type.lookup_code == "ASN") {
        dispatch(loadASNDataById(value.id));
      }
      if (mainData.Link_Source_Document_Type.lookup_code == "GRN") {
        dispatch(loadGRNDataById(value.id));
      }
      if (mainData.Link_Source_Document_Type.lookup_code == "SCRAP_ORDERS") {
        dispatch(loadScrapOrderDataById(value.id));
      }
      if (mainData.Link_Source_Document_Type.lookup_code == "DELIVERY_ORDERS") {
        dispatch(loadDeliveryOrderDataById(value.id));
      }
      if (
        mainData.Link_Source_Document_Type.lookup_code == "PURCHASE_RETURNS"
      ) {
        dispatch(loadPurchaseReturnsDataById(value.id));
      }
      if (mainData.Link_Source_Document_Type.lookup_code == "SALES_RETURNS") {
        dispatch(loadSalesReturnsDataById(value.id));
      }
      if (mainData.Link_Source_Document_Type.lookup_code == "PURCHASE_ORDERS") {
        dispatch(loadPurchaseOrdersDataById(value.id));
      }
      if (
        mainData.Link_Source_Document_Type.lookup_code == "PURCHASE_INVOICE"
      ) {
        dispatch(loadPurchaseInvoiceDataById(value.id));
      }
    }

    switch (key) {
      case "currency_id": {
        setdebitnotedetails(
          debitnotedetails.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        debitnotecreateData[key] = value.id;
        break;
      }
      case "reason_id": {
        setdebitnotedetails(
          debitnotedetails.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        debitnotecreateData[key] = value.id;
        break;
      }
      case "vendor_id": {
        setdebitnotedetails(
          debitnotedetails.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        debitnotecreateData[key] = value.id;
        break;
      }
      case "purchase_invoice_id": {
        setdebitnotedetails(
          debitnotedetails.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        debitnotecreateData[key] = value.id;
        break;
      }
    }
    console.log("debitnotecreateData", debitnotecreateData);
    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);
  };

  const handelInputChange = (key, value, index = null) => {
    console.log("key", key, "value", value, "index", index);
    setDataByKeyAndValue(key, value, index);

    if (index == null) {
      var newMainData = mainData;
      newMainData[key] = value;
      setMainData(newMainData);
    }
    calulate_total();

    debitnotecreateData[key] = value;
  };

  function calulate_total() {
    //calculation
    if (selectedProductData) {
      var taxval = selectedProductData[0].product_pricing_details?.tax;
      setPaymentDetailsFields({ ...paymentDetailsFields, tax: taxval });
      var val1 = selectedProductData
        .map(o => o.Amount)
        .reduce((previousValue, currentValue) => {
          return previousValue + currentValue;
        });
      var subTotal = val1 + (paymentDetailsFields.shippingCharge ?? 0);
      var newtotal = 0;

      if (paymentDetailsFields.adjustment_amount) {
        if (paymentDetailsFields.Final_Adjustment == "+") {
          newtotal = subTotal + paymentDetailsFields.adjustment_amount;
        } else {
          newtotal = subTotal - paymentDetailsFields.adjustment_amount;
        }
      } else {
        newtotal = subTotal;
      }
      setPaymentDetailsFields({
        ...paymentDetailsFields,
        tax: taxval,
        subTotal: subTotal,
        total: newtotal,
      });
    }
  }

  const handelCheckBoxonChange = field => {
    if (
      field.key == "generate_debit_note_id" ||
      field.key == "generate_reference_id"
    ) {
      var neworder = debitnotedetails.map(o => {
        if (o.key == field.key) {
          o.isChecked = !o.isChecked;
        }
        return o;
      });
      setdebitnotedetails(neworder);
    }
    debitnotecreateData[field.key] = field.isChecked;
  };

  const handelRadioChange = (prop, value) => {
    console.log("1prop, value", prop, value);
  };

  const handelRadionButtononChange = (prop, value) => {
    console.log("2prop, value", prop, value);
  };

  const handleButtonClick = key => {
    console.log(mainData, "debitnotecreateData");
    console.log(selectedProductData, "wertgb");
    console.log(paymentDetailsFields);
    console.log("selectedValue", selectedValue);
    var payLoad = {
      additional_information: {
        notes: mainData?.Additional_Information_Note
          ? mainData?.Additional_Information_Note
          : debitnotecreateData?.additional_information?.notes,
        terms_and_conditions: mainData?.Additional_Information_Terms_Conditions
          ? mainData?.Additional_Information_Terms_Conditions
          : debitnotecreateData?.Additional_Information_Terms_Conditions,
      },
      vendor_id: mainData?.vendor_id?.id
        ? mainData?.vendor_id?.id
        : debitnotecreateData["vendor_id"],
      currency_id: mainData?.currency_id?.id
        ? mainData?.currency_id?.id
        : debitnotecreateData?.currency_id?.id
        ? debitnotecreateData?.currency_id?.id
        : debitnotecreateData?.currency?.id
        ? debitnotecreateData?.currency?.id
        : debitnotecreateData?.currency_id,
      generate_reference_id:
        debitnotecreateData && debitnotecreateData.generate_reference_id
          ? debitnotecreateData.generate_reference_id
          : false,
      generate_debit_note_id:
        debitnotecreateData && debitnotecreateData.generate_debit_note_id
          ? debitnotecreateData.generate_debit_note_id
          : false,
      purchase_invoice_id: mainData?.purchase_invoice_id?.id
        ? mainData?.purchase_invoice_id?.id
        : debitnotedata && debitnotedata?.purchase_invoice?.id
        ? debitnotedata?.purchase_invoice?.id
        : mainData?.purchase_invoice_id
        ? mainData?.purchase_invoice_id
        : parseInt(debitnotecreateData?.purchase_invoice_id),

      debit_note_id: mainData?.debit_note_id
        ? mainData?.debit_note_id
        : debitnotecreateData?.debit_note_id,
      reference_id: mainData?.reference_id,

      reason_id: Number(mainData?.reason_id?.id),
      billing_address_id:
        debitnotedata && debitnotedata?.billing_address_id
          ? debitnotedata?.billing_address_id
          : parseInt(selectedValue),
      delivery_address_id:
        debitnotedata && debitnotedata?.delivery_address_id
          ? debitnotedata?.delivery_address_id
          : parseInt(selectedValue),

      available_vendor_credits: 58.25,

      debit_note_line_items: selectedProductData.map(o => {
        return {
          amount: o?.Amount,
          discount: parseFloat(o?.discount),
          price: parseFloat(o?.selling_price),
          product_template_id: o?.product_template_id,
          product_variant_id: o?.id ? o?.id : o?.sku_id?.id,
          quantity: parseInt(o?.Quantity),
          tax: parseFloat(o?.tax),
          uom_id: o?.uom?.id,
        };
      }),

      status_id: 362,
      internal_notes: debitnotecreateData?.Additional_Information_Note,
      external_notes: debitnotecreateData?.Additional_Information_Note,
      terms_and_conditions:
        debitnotecreateData?.Additional_Information_Terms_Conditions,
      attachments: {},

      sub_total: paymentDetailsFields?.subTotal,
      tax: parseInt(paymentDetailsFields?.tax),
      shipping_charges: paymentDetailsFields?.shippingCharge,
      adjustments: paymentDetailsFields?.adjustment_amount,
      customer_credits: 2.55,
      total_amount: paymentDetailsFields?.total,

      source_document_type_id: debitnotecreateData?.Link_Source_Document_Type
        ?.id
        ? debitnotecreateData?.Link_Source_Document_Type?.id
        : mainData?.Link_Source_Document_Type?.id, //Source Document Type
      source_documents: mainData?.Link_Source_Document.data
        ? mainData?.Link_Source_Document.data
        : debitnotecreateData?.source_documents
        ? debitnotecreateData?.source_documents
        : debitnotecreateData?.Link_Source_Document?.data
        ? debitnotecreateData?.Link_Source_Document?.data
        : debitnotedata?.source_documents
        ? debitnotedata?.source_documents
        : mainData?.Link_Source_Document.data, //Select Source Document
    };
    console.log("payLoad", payLoad);

    if (props && props.id) {
      dispatch(
        Update_Debit_Note_Data(props.id, payLoad, function (resp) {
          toast(resp);
        })
      );
    } else {
      dispatch(
        createDebitnote(payLoad, function (resp) {
          toast(resp);
        })
      );
    }

    navigate.push("/debitNote");
  };

  const searchContactHandler = () => {
    setSelectedOption(prev => !prev);
    setBtnOption("selectedContacts");
  };

  const contactShippingHandler = () => {
    console.log(selectedValue);
    console.log("entered");
    if (selectedValue) {
      var tempContact = contactsData.filter(o => o.id == selectedValue);
      console.log("tempContact", tempContact[0]);
      setselectedAddress(tempContact[0]);
    }
    setSelectedOption(prev => !prev);
  };

  const handleClosePopUp = () => {
    console.log(selectedValue);
    setSelectedOption(prev => !prev);
  };

  const handelInputChangeTable = (key, value, index = null) => {
    console.log("table", key, value, index);
    if (key == "sku_id") {
      console.log("Entered here");
      selectedProductData[index][key] = value.id;
    }
    if (key == "uom.name" || key == "sku_id") {
      selectedProductData[index][key] = parseInt(value.id);
    } else if (
      key == "Amount" ||
      key == "discount" ||
      key == "Quantity" ||
      key == "selling_price" ||
      key == "product_pricing_details.tax_options"
    ) {
      selectedProductData[index][key] = parseInt(value);
    } else if (index != null) {
      selectedProductData[index][key] = value;
      console.log("updated", selectedProductData);
    }

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
      console.log("newSelectedProductData");
      if (key === "sku_id") {
        console.log("sku_id");
        var selectVarient = productVariantData.find(o => o.id == value.id);
        newSelectedProductData[index] = selectVarient;
        newSelectedProductData[index][key] = value.label;
      } else if (key === "uom.name") {
        console.log("uom.name");
        var selectVarient = uomData.find(o => o.id == value.id);
        newSelectedProductData[index].uom = { name: value.label, id: value.id };
        console.log("newSelectedProductData uom", newSelectedProductData);
      } else {
        console.log(key, "sdfghasdfghjk");
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
        newSelectedProductData[index].product_pricing_details?.tax_options &&
        parseFloat(
          newSelectedProductData[index].product_pricing_details?.tax_options
        ) > 0
      ) {
        var taxRate = parseFloat(
          newSelectedProductData[index].product_pricing_details?.tax_options
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
      console.log("mainData", mainData);
    }

    if (key == "Final_Enter_Amount") {
      console.log("mainData", mainData);
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

  return (
    <>
      <AddForm
        header={"Debit Note Details"}
        data={debitnotedetails.map(field => {
          switch (field.key) {
            case "vendor_id":
              field.data = Vendorsdata.map(o => {
                return {
                  id: o.id,
                  label: o.name,
                };
              });
              break;
            case "currency_id":
              field.data = Currencydata.map(o => {
                return {
                  id: o.id,
                  label: o.name,
                };
              });
              break;
            case "reason_id":
              field.data = Reasonsdata.map(o => {
                return {
                  id: o.id,
                  label: o.display_name,
                };
              });
              break;
            case "purchase_invoice_id":
              field.data = purchaseInvoiceData.map(o => {
                return {
                  id: o.id,
                  label: o.purchase_invoice_number,
                };
              });
              break;
            case "Link_Source_Document_Type": {
              field.data = SourceDocumentTypesData.map(o => {
                return {
                  id: o.id,
                  label: o.display_name,
                  lookup_code: o.lookup_code,
                };
              });
              break;
            }
            case "Link_Source_Document": {
              console.log(
                "Camehere",
                mainData?.Link_Source_Document_Type?.lookup_code
              );
              field.data =
                mainData &&
                mainData.Link_Source_Document_Type &&
                mainData.Link_Source_Document_Type.lookup_code == "SALES_ORDERS"
                  ? SalesOrdersData.map(o => {
                      console.log("sales_order_number---");
                      return { id: o.id, label: o.sales_order_number, data: o };
                    })
                  : mainData &&
                    mainData.Link_Source_Document_Type &&
                    mainData.Link_Source_Document_Type.lookup_code == "ASN"
                  ? ASNdata.map(o => {
                      return { id: o.id, label: o.asn_number, data: o };
                    })
                  : mainData &&
                    mainData.Link_Source_Document_Type &&
                    mainData.Link_Source_Document_Type.lookup_code == "GRN"
                  ? GRNdata.map(o => {
                      return { id: o.id, label: o.grn_number, data: o };
                    })
                  : mainData &&
                    mainData.Link_Source_Document_Type &&
                    mainData.Link_Source_Document_Type.lookup_code == "IST"
                  ? ISTdata.map(o => {
                      return { id: o.id, label: o.ist_number, data: o };
                    })
                  : mainData &&
                    mainData.Link_Source_Document_Type &&
                    mainData.Link_Source_Document_Type.lookup_code ==
                      "SCRAP_ORDERS"
                  ? ScrapOrdersData.map(o => {
                      return { id: o.id, label: o.scrap_order_no, data: o };
                    })
                  : mainData &&
                    mainData.Link_Source_Document_Type &&
                    mainData.Link_Source_Document_Type.lookup_code ==
                      "DELIVERY_ORDERS"
                  ? DeliveryOrdersData.map(o => {
                      return {
                        id: o.id,
                        label: o.delivery_order_details.delivery_order_number,
                        data: o,
                      };
                    })
                  : mainData &&
                    mainData.Link_Source_Document_Type &&
                    mainData.Link_Source_Document_Type.lookup_code ==
                      "PURCHASE_RETURNS"
                  ? PurchaseReturnsData.map(o => {
                      return {
                        id: o.id,
                        label: o.purchase_return_number,
                        data: o,
                      };
                    })
                  : mainData &&
                    mainData.Link_Source_Document_Type &&
                    mainData.Link_Source_Document_Type.lookup_code ==
                      "SALES_RETURNS"
                  ? SalesReturnsData.map(o => {
                      return {
                        id: o.id,
                        label: o.sales_return_number,
                        data: o,
                      };
                    })
                  : mainData &&
                    mainData.Link_Source_Document_Type &&
                    mainData.Link_Source_Document_Type.lookup_code ==
                      "PURCHASE_ORDERS"
                  ? PurchaseOrdersData.map(o => {
                      return {
                        id: o.id,
                        label: o.purchase_order_number,
                        data: o,
                      };
                    })
                  : mainData &&
                    mainData.Link_Source_Document_Type &&
                    mainData.Link_Source_Document_Type.lookup_code ==
                      "PURCHASE_INVOICE"
                  ? purchaseInvoiceData.map(o => {
                      return {
                        id: o.id,
                        label: o.purchase_invoice_number,
                        data: o,
                      };
                    })
                  : null;
              break;
            }
          }
          return field;
        })}
        handelSelectonChange={handelSelectonChange}
        handelInputChange={handelInputChange}
        handelCheckBoxonChange={handelCheckBoxonChange}
        setRadioType={handelRadioChange}
        handelRadionButtononChange={handelRadionButtononChange}
      />

      <HeadingBtn
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
        showBtn={true}
        cardHeading={"Vendor Delivery Address"}
        detailsReq={true}
        btnName="Search From Contacts"
        btnClick={searchContactHandler}
      >
        <Typography variant="div" sx={{ width: "100%" }}>
          <div className="product-staticFormCardForm">
            <div className="delivery-location">
              <Card
                className="addressCardWrapper"
                style={{
                  minWidth: "47%",
                  height: "200px",
                  marginLeft: "10px",
                  padding: "10px",
                }}
              >
                <b>Delivery Details</b>
                <br></br>
                <div style={{ display: "flex", width: "100%" }}>
                  <div style={{ width: "40%" }}>
                    <p>Location Name</p>
                  </div>
                  <div>
                    <p>
                      {selectedAddress &&
                      selectedAddress.address_details &&
                      selectedAddress.address_details[0].location_name
                        ? selectedAddress.address_details[0].location_name
                        : ""}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", width: "100%" }}>
                  <div style={{ width: "40%" }}>
                    <p>Pickup Address</p>
                  </div>
                  <div>
                    <p>
                      {selectedAddress &&
                      selectedAddress?.address_details &&
                      selectedAddress?.address_details[0].address_line_1
                        ? selectedAddress?.address_details[0].address_line_1
                        : ""}
                    </p>
                    <p>
                      {selectedAddress &&
                      selectedAddress?.address_details &&
                      selectedAddress?.address_details[0].address_line_2
                        ? selectedAddress?.address_details[0].address_line_2
                        : ""}
                    </p>
                    <p>
                      {selectedAddress &&
                      selectedAddress?.address_details &&
                      selectedAddress?.address_details[0].city
                        ? selectedAddress?.address_details[0].city
                        : ""}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", width: "100%" }}>
                  <div style={{ width: "40%" }}>
                    <p>Location Incharge</p>
                  </div>
                  <div>
                    <p>
                      {selectedAddress &&
                      selectedAddress?.address_details &&
                      selectedAddress?.address_details[0].contact_person_name
                        ? selectedAddress?.address_details[0]
                            .contact_person_name
                        : ""}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="billing-location">
              <Card
                className="addressCardWrapper"
                style={{
                  minWidth: "47%",
                  height: "200px",
                  marginLeft: "10px",
                  padding: "10px",
                }}
              >
                <b>Billing Details</b>
                <br></br>
                <div style={{ display: "flex", width: "100%" }}>
                  <div style={{ width: "40%" }}>
                    <p>Location Name</p>
                  </div>
                  <div>
                    <p>
                      {selectedAddress &&
                      selectedAddress.address_details &&
                      selectedAddress.address_details[0].location_name
                        ? selectedAddress.address_details[0].location_name
                        : ""}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", width: "100%" }}>
                  <div style={{ width: "40%" }}>
                    <p>Pickup Address</p>
                  </div>
                  <div>
                    <p>
                      {selectedAddress &&
                      selectedAddress?.address_details &&
                      selectedAddress?.address_details[0].address_line_1
                        ? selectedAddress?.address_details[0].address_line_1
                        : ""}
                    </p>
                    <p>
                      {selectedAddress &&
                      selectedAddress?.address_details &&
                      selectedAddress?.address_details[0].address_line_2
                        ? selectedAddress?.address_details[0].address_line_2
                        : ""}
                    </p>
                    <p>
                      {selectedAddress &&
                      selectedAddress?.address_details &&
                      selectedAddress?.address_details[0].city
                        ? selectedAddress?.address_details[0].city
                        : ""}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", width: "100%" }}>
                  <div style={{ width: "40%" }}>
                    <p>Location Incharge</p>
                  </div>
                  <div>
                    <p>
                      {selectedAddress &&
                      selectedAddress?.address_details &&
                      selectedAddress?.address_details[0].contact_person_name
                        ? selectedAddress?.address_details[0]
                            .contact_person_name
                        : ""}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Typography>
      </HeadingBtn>

      {btnOption == "selectedContacts" && selectedOption && (
        <ModalViewV2
          modalTitle={"Contact List"}
          handleModalClose={() => handleClosePopUp("priceList", "")}
          modalOpen={selectedOption}
          actionBtns={["Cancel", "Confirm"]}
          disableBtn={true}
          products={"products"}
          component={"editAddress"}
          handleConfirm={() => contactShippingHandler()}
        >
          <Box
            sx={{
              background: "#F9F9F9",
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 0.5,
              },
            }}
          >
            <ContactList
              selected={selected}
              setSelected={setSelected}
              tableFor={"searchContact"}
              tableData={productsData}
              detail={contactsData}
              params={params}
              setParams={setParams}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
            {console.log(contacts, selectedValue, "selcted params")}
          </Box>
        </ModalViewV2>
      )}

      {/* <AddForm_Table headCells={headCells} table_data={selectedProductData} handelInputChange={handelInputChangeTable} header={"Select Item"} renderFooter={() => (<center style={{ marginTop: 10 }}><Link onClick={onAddNewRaw} underline="none">+ Add Another Line Item</Link></center>)} /> */}

      <AddForm_Table
        headCells={headCells}
        table_data={selectedProductData}
        handelInputChange={handelInputChangeTable}
        handelSelectonChange={handelSelectonChange}
        header={"Select Item"}
        renderFooter={() => (
          <center style={{ marginTop: 10 }}>
            <Link onClick={onAddNewRaw} underline="none">
              + Add Another Line Item
            </Link>
          </center>
        )}
      />

      <AddForm
        header={"Additional Information"}
        data={AdditionalInformationFields}
        handelInputChange={handelInputChange}
      />

      <AddFormFooter
        header={"Payment Details"}
        subtotal={paymentDetailsFields.subTotal}
        tax={paymentDetailsFields.tax}
        shippingcharges={paymentDetailsFields.shippingCharge}
        handelSelectonChange={handelSelectonChange}
        handelInputChange={handelInputChangeTable}
        total={paymentDetailsFields.total}
      />

      <AddFormFooter_Button
        saveDraft="false"
        handleButtonClick={handleButtonClick}
      />
    </>
  );
};
export default DebitNoteCreate;

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
