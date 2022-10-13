import React, { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Box } from "@mui/material";
import {
  loadCurrencyData,
  loadCountryData,
  loadStateDataById,
  Save_Purchase_Order_Data,
  Edit_Purchase_Order_Data,
  loadProductVariantData,
  loadUOMData,
  loadLocationsData,
  load_rate_calculator_data,
  loadPaymentTermsData,
  loadVendorsData,
  loadvendorsDataById,
  loadOgranisationdataid,
  loadOgranisationdata,
  loadSourceDocTypes,
  loadASNData,
  loadASNDataById,
  loadGrnData,
  loadGrnDataById,
  loadSalesOrdersData,
  loadSalesOrdersDataById,
  loadDeliveryOrderData,
  loadDeliveryOrderDataById,
  loadScrapOrderData,
  loadScrapOrdersDataById,
  deleteProductLine,
} from "../redux/Actions/action";
import AddForm from "Remote/AddForm";
import AddFormFooter from "Remote/AddFormFooter";
import AddFormFooter_Button from "Remote/AddFormFooter_Button";
import AddForm_Table from "Remote/AddForm_Table";
import MatRadioButton from "Remote/MatRadioButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHistory, useParams } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary";
import { loadProductOrdersDataByID } from "../redux/Actions/action";
import LocationCard from "../components/locationCard";
import moment from "moment";

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

function PurchaseOrdersCreate(props) {
  const history = useHistory();
  let dispatch = useDispatch();

  const { id } = useParams();
  useEffect(() => {
    dispatch(
      loadProductVariantData({
        limit: 10,
        offset: 1,
        filters: null,
        sort: null,
      })
    ),
      dispatch(loadUOMData()),
      dispatch(loadCurrencyData()),
      dispatch(loadCountryData()),
      dispatch(
        loadLocationsData({ limit: 100, offset: 1, filters: null, sort: null })
      ),
      dispatch(loadPaymentTermsData("payment_terms")),
      dispatch(loadVendorsData()),
      dispatch(loadSourceDocTypes()),
      dispatch(loadOgranisationdata());
    if (props && props.id) {
      const { id } = props;
      dispatch(loadProductOrdersDataByID(id));
    }
  }, []);

  const {
    locationData,
    uomData,
    productVariantData,
    Currencydata,
    Countrydata,
    Statedata,
    EstimatedCostdata,
    Lookupdata,
    Vendorsdata,
    VendorsDetails,
    OrganisationDetails,
    OrganisationDetailsId,
    purchaseOrdersDataId,
    sourceDocTypeData,

    ASNdata,
    ASNViewdata,

    grndata,
    grnViewdata,

    salesOrdersdata,
    salesOrdersViewdata,

    scrapOrdersViewdata,
    scrapOrdersdata,

    deleiveryOrdersViewdata,
    deleiveryOrdersdata,
  } = useSelector((state) => state.data);

  const [deliveryTO, setDeliveryTo] = useState(null);

  useEffect(() => {
    console.log(deliveryTO ,  "deliveryTO");
  }, [deliveryTO]);

  useEffect(() => {
    if (props && props.id && purchaseOrdersDataId) {
      console.log(purchaseOrdersDataId, "purchaseOrdersDataId");
      if (purchaseOrdersDataId?.delivery_to_id != undefined) {
        console.log("valuexw", purchaseOrdersDataId?.delivery_to_id);
        // setDeliveryTo("448");
        setDeliveryTo(`${purchaseOrdersDataId?.delivery_to_id}`);
        console.log("valueD2", deliveryTO);
      }
      var newpurchaseOrderDetailsFields = purchaseOrderDetailsFields.map(
        (o) => {
          if (o.key == "purchase_order_date")
            o.value = moment(purchaseOrdersDataId?.date_and_time).format(
              "yyyy-MM-DD"
            );
          mainData["purchase_order_date"] = purchaseOrdersDataId?.date_and_time;
          if (o.key == "expected_delivery_date")
            o.value = moment(
              purchaseOrdersDataId?.expected_delivery_date
            ).format("yyyy-MM-DD");
          mainData["expected_delivery_date"] =
            purchaseOrdersDataId?.expected_delivery_date;
          if (o.key == "purchase_order_number")
            o.value = purchaseOrdersDataId?.purchase_order_number;
          mainData["purchase_order_number"] =
            purchaseOrdersDataId?.purchase_order_number;
          if (o.key == "reference_number")
            o.value = purchaseOrdersDataId?.reference_number;
          mainData["reference_number"] = purchaseOrdersDataId?.reference_number;
          if (o.key == "currency_id")
            o.value = {
              id:
                purchaseOrdersDataId &&
                purchaseOrdersDataId["currency"] &&
                purchaseOrdersDataId["currency"]["id"]
                  ? purchaseOrdersDataId["currency"]["id"]
                  : "",
              label:
                purchaseOrdersDataId &&
                purchaseOrdersDataId["currency"] &&
                purchaseOrdersDataId["currency"]["currency_code"]
                  ? purchaseOrdersDataId["currency"]["currency_code"]
                  : "",
            };
          mainData["currency_id"] = {
            id:
              purchaseOrdersDataId &&
              purchaseOrdersDataId["currency"] &&
              purchaseOrdersDataId["currency"]["id"]
                ? purchaseOrdersDataId["currency"]["id"]
                : "",
            label:
              purchaseOrdersDataId &&
              purchaseOrdersDataId["currency"] &&
              purchaseOrdersDataId["currency"]["currency_code"]
                ? purchaseOrdersDataId["currency"]["currency_code"]
                : "",
          };
          if (o.key == "source_source_document")
            o.value = {
              id:
                purchaseOrdersDataId &&
                purchaseOrdersDataId["source_documents"] &&
                purchaseOrdersDataId["source_documents"]["id"]
                  ? purchaseOrdersDataId["source_documents"]["id"]
                  : "",
              label:
                purchaseOrdersDataId &&
                purchaseOrdersDataId["source_documents"] &&
                purchaseOrdersDataId["source_documents"]["data"]
                  ? purchaseOrdersDataId["source_documents"]["data"]
                  : "",
            };
          mainData["source_source_document"] = {
            id:
              purchaseOrdersDataId &&
              purchaseOrdersDataId["source_source_document"] &&
              purchaseOrdersDataId["source_source_document"]["id"]
                ? purchaseOrdersDataId["source_source_document"]["id"]
                : "",
            label:
              purchaseOrdersDataId &&
              purchaseOrdersDataId["source_source_document"] &&
              purchaseOrdersDataId["source_source_document"]["data"]
                ? purchaseOrdersDataId["source_source_document"]["data"]
                : "",
          };
          if (o.key == "source_document_type")
            (o.value = {
              id: purchaseOrdersDataId?.source_document?.ID,
              label: purchaseOrdersDataId?.source_document?.display_name,
            }),
              (mainData["source_document_type"] = {
                id:
                  purchaseOrdersDataId &&
                  purchaseOrdersDataId["source_document_type_id"]
                    ? purchaseOrdersDataId["source_document_type_id"]
                    : "",
              });
          return o;
        }
      );
      setPurchaseOrderDetailsFields(newpurchaseOrderDetailsFields);

      var newselectOrganisation = selectOrganisation.map((o) => {
        if (o.key == "organisation")
          o.value = {
            id:
              purchaseOrdersDataId &&
              purchaseOrdersDataId["organization_details"] &&
              purchaseOrdersDataId["organization_details"]["id"]
                ? purchaseOrdersDataId["organization_details"]["id"]
                : "",
            label:
              purchaseOrdersDataId &&
              purchaseOrdersDataId["organization_details"] &&
              purchaseOrdersDataId["organization_details"]["label"]
                ? purchaseOrdersDataId["organization_details"]["label"]
                : "",
          };
        mainData["organisation"] =
          purchaseOrdersDataId &&
          purchaseOrdersDataId["organization_details"] &&
          purchaseOrdersDataId["organization_details"]["id"]
            ? purchaseOrdersDataId["organization_details"]["id"]
            : "";
        return o;
      });
      //dispatch(loadOgranisationdataid(purchaseOrdersDataId['organization_details']['id']))
      setSelectOrganisation(newselectOrganisation);

      var newvendorContact = vendorContact.map((o) => {
        if (o.key == "contact")
          o.value = {
            id:
              purchaseOrdersDataId &&
              purchaseOrdersDataId["vendor_details"] &&
              purchaseOrdersDataId["vendor_details"]["vendor_id"]
                ? purchaseOrdersDataId["vendor_details"]["vendor_id"]
                : "",
            label:
              purchaseOrdersDataId &&
              purchaseOrdersDataId["vendor_details"] &&
              purchaseOrdersDataId["vendor_details"]["vendor_contact"]
                ? purchaseOrdersDataId["vendor_details"]["vendor_contact"]
                : "",
          };
        return o;
      });
      if (newvendorContact[0].value.id !== "") {
        dispatch(loadvendorsDataById(newvendorContact[0].value.id));
      }
      setVendorContact(newvendorContact);

      var newPaymentDetails = PaymentDetails.map((o) => {
        if (o.key == "pickup_time")
          o.value = moment(purchaseOrdersDataId?.payment_due_date).format(
            "yyyy-MM-DD"
          );
        mainData["pickup_time"] = purchaseOrdersDataId?.payment_due_date;
        if (o.key == "pr_currency") o.value = purchaseOrdersDataId?.pr_currency;
        mainData["pr_currency"] = purchaseOrdersDataId?.pr_currency;
        if (o.key == "payment_terms")
          o.value = {
            id:
              purchaseOrdersDataId &&
              purchaseOrdersDataId["vendor_details"] &&
              purchaseOrdersDataId["vendor_details"]["vendor_id"]
                ? purchaseOrdersDataId["vendor_details"]["vendor_id"]
                : "",
            label:
              purchaseOrdersDataId &&
              purchaseOrdersDataId["vendor_details"] &&
              purchaseOrdersDataId["vendor_details"]["vendor_contact"]
                ? purchaseOrdersDataId["vendor_details"]["vendor_contact"]
                : "",
          };
        //mainData["payment_terms"] = purchaseOrdersDataId['vendor_details']['vendor_id'];
        return o;
      });
      setPaymentDetails(newPaymentDetails);

      var newpaymentDetailsFields = paymentDetailsFields;
      newpaymentDetailsFields["subTotal"] =
        purchaseOrdersDataId?.po_payment_details?.sub_total;
      newpaymentDetailsFields["shippingCharge"] =
        purchaseOrdersDataId?.po_payment_details?.shipping_charges;
      newpaymentDetailsFields["tax"] =
        purchaseOrdersDataId?.po_payment_details?.tax;
      newpaymentDetailsFields["adjustment_amount"] =
        purchaseOrdersDataId?.po_payment_details?.adjustment_amount;
      newpaymentDetailsFields["total"] =
        purchaseOrdersDataId?.po_payment_details?.total_amount;
      setPaymentDetailsFields(newpaymentDetailsFields);

      var newselectedProductData = [];
      if (purchaseOrdersDataId.purchase_order_lines)
        newselectedProductData = purchaseOrdersDataId.purchase_order_lines.map(
          (o) => {
            return {
              product_id: {
                id: o.product_details.id,
                label: o.product_details.product_name,
              },
              sku_id: o?.product_details?.sku_id,
              product_destination_location: {
                id: o.warehouse.id,
                label: o.warehouse.name,
              },
              "inventory_details.id": o?.inventory_id,
              serial_number: o?.serial_number,
              description: o?.description,
              uom_id: { id: o.uom.id, label: o.uom.uom_class_name },
              selling_price: o?.price ? o?.price : 0,
              quantity: o?.quantity ? o?.quantity : 0,
              discount: o?.discount ? o?.discount : 0,
              tax: o?.tax ? o?.tax : 0,
              sales_period: o?.sales_period ? o?.sales_period : "",
              exp_delivery_lead_time: o?.exp_delivery_lead_time
                ? o?.exp_delivery_lead_time
                : "",
              credit_period: o?.credit_period ? o?.credit_period : "",
              lead_time: o?.lead_time ? o?.lead_time : "",
              Amount: o?.amount ? o?.amount : 0,
            };
          }
        );
      setSelectedProductData(newselectedProductData);

      var newAdditionalInformationFields = AdditionalInformationFields.map(
        (o) => {
          if (o.key == "Additional_Information_Note")
            o.value = purchaseOrdersDataId?.additional_information?.notes;
          mainData["Additional_Information_Note"] =
            purchaseOrdersDataId?.additional_information?.notes;
          if (o.key == "Additional_Information_Terms_Conditions")
            o.value =
              purchaseOrdersDataId?.additional_information?.terms_and_conditions;
          mainData["Additional_Information_Terms_Conditions"] =
            purchaseOrdersDataId?.additional_information?.terms_and_conditions;
          return o;
        }
      );
      setAdditionalInformationFields(newAdditionalInformationFields);

      setDeliveryTo(purchaseOrdersDataId?.delivery_to_id);

      var newbillingDetailsFeilds = billingDetailsFeilds.map((o) => {
        if (o.key == "billing_name")
          o.value = purchaseOrdersDataId?.billing_address?.contact_person_name;
        mainData["billing_name"] =
          purchaseOrdersDataId?.billing_address?.contact_person_name;
        if (o.key == "billing_mobile_number")
          o.value =
            purchaseOrdersDataId?.billing_address?.contact_person_number;
        mainData["billing_mobile_number"] =
          purchaseOrdersDataId?.billing_address?.contact_person_number;
        if (o.key == "billing_mail")
          o.value = purchaseOrdersDataId?.billing_address?.email;
        mainData["billing_mail"] = purchaseOrdersDataId?.billing_address?.email;
        if (o.key == "billing_address_line_1")
          o.value = purchaseOrdersDataId?.billing_address?.address_line_1;
        mainData["billing_address_line_1"] =
          purchaseOrdersDataId?.billing_address?.address_line_1;
        if (o.key == "billing_address_line_2")
          o.value = purchaseOrdersDataId?.billing_address?.address_line_2;
        mainData["billing_address_line_2"] =
          purchaseOrdersDataId?.billing_address?.address_line_2;
        if (o.key == "billing_address_line_3")
          o.value = purchaseOrdersDataId?.billing_address?.address_line_3;
        mainData["billing_address_line_3"] =
          purchaseOrdersDataId?.billing_address?.address_line_3;
        if (o.key == "billing_pin_code")
          o.value = purchaseOrdersDataId?.billing_address?.pin_code;
        mainData["billing_pin_code"] =
          purchaseOrdersDataId?.billing_address?.pin_code;
        if (o.key == "billing_country")
          o.value = purchaseOrdersDataId?.billing_address?.country;
        // mainData["billing_country"]["label"] = purchaseOrdersDataId?.billing_address?.country;
        if (o.key == "billing_state")
          o.value = purchaseOrdersDataId?.billing_address?.state;
        // mainData["billing_state"]["label"] = purchaseOrdersDataId?.billing_address?.state;
        if (o.key == "billing_city")
          o.value = purchaseOrdersDataId?.billing_address?.city;
        mainData["billing_city"] = purchaseOrdersDataId?.billing_address?.city;
        // if (o.key == "billing_country") o.value = Countrydata.map((o) => {
        //   if (o.name.toUpperCase() == purchaseOrdersDataId?.billing_address?.country) {
        //     return { id: o.id, label: o.name };
        //   }
        // })
        // if (o.key == "billing_state") o.value = Statedata.map((o) => {
        //   if (o.name == purchaseOrdersDataId?.billing_address?.state) {
        //     return { id: o.id, label: o.name };
        //   }
        // })
        // if (o.key == "payment_terms") o.value = {
        //   id: purchaseOrdersDataId && purchaseOrdersDataId['vendor_details'] && purchaseOrdersDataId['vendor_details']['vendor_id'] ? purchaseOrdersDataId['vendor_details']['vendor_id'] : "",
        //   label: purchaseOrdersDataId && purchaseOrdersDataId['vendor_details'] && purchaseOrdersDataId['vendor_details']['vendor_contact'] ? purchaseOrdersDataId['vendor_details']['vendor_contact'] : "",
        // };
        return o;
      });
      setBillingDetailsFeilds(newbillingDetailsFeilds);

      var newdeliveryDetailsFeilds = deliveryDetailsFeilds.map((o) => {
        if (o.key == "delivery_name")
          o.value = purchaseOrdersDataId?.delivery_address?.contact_person_name;
        mainData["delivery_name"] =
          purchaseOrdersDataId?.delivery_address?.contact_person_name;
        if (o.key == "delivery_mobile_number")
          o.value =
            purchaseOrdersDataId?.delivery_address?.contact_person_number;
        mainData["delivery_mobile_number"] =
          purchaseOrdersDataId?.delivery_address?.contact_person_number;
        if (o.key == "delivery_mail")
          o.value = purchaseOrdersDataId?.delivery_address?.email;
        mainData["delivery_mail"] =
          purchaseOrdersDataId?.delivery_address?.email;
        if (o.key == "delivery_address_line_1")
          o.value = purchaseOrdersDataId?.delivery_address?.address_line_1;
        mainData["delivery_address_line_1"] =
          purchaseOrdersDataId?.delivery_address?.address_line_1;
        if (o.key == "delivery_address_line_2")
          o.value = purchaseOrdersDataId?.delivery_address?.address_line_2;
        mainData["delivery_address_line_2"] =
          purchaseOrdersDataId?.delivery_address?.address_line_2;
        if (o.key == "delivery_address_line_3")
          o.value = purchaseOrdersDataId?.delivery_address?.address_line_3;
        mainData["delivery_address_line_3"] =
          purchaseOrdersDataId?.delivery_address?.address_line_3;
        if (o.key == "delivery_pin_code")
          o.value = purchaseOrdersDataId?.delivery_address?.pin_code;
        mainData["delivery_pin_code"] =
          purchaseOrdersDataId?.delivery_address?.pin_code;
        if (o.key == "delivery_country")
          o.value = purchaseOrdersDataId?.delivery_address?.country;
        // mainData["delivery_country"]["label"] = purchaseOrdersDataId?.delivery_address?.country;
        if (o.key == "delivery_state")
          o.value = purchaseOrdersDataId?.delivery_address?.state;
        // mainData["delivery_state"]["label"] = purchaseOrdersDataId?.delivery_address?.state;
        if (o.key == "delivery_city")
          o.value = purchaseOrdersDataId?.delivery_address?.city;
        mainData["delivery_city"] =
          purchaseOrdersDataId?.delivery_address?.city;
        // if (o.key == "billing_country") o.value = Countrydata.map((o) => {
        //   if (o.name.toUpperCase() == purchaseOrdersDataId?.billing_address?.country) {
        //     return { id: o.id, label: o.name };
        //   }
        // })
        // if (o.key == "billing_state") o.value = Statedata.map((o) => {
        //   if (o.name == purchaseOrdersDataId?.billing_address?.state) {
        //     return { id: o.id, label: o.name };
        //   }
        // })
        // if (o.key == "payment_terms") o.value = {
        //   id: purchaseOrdersDataId && purchaseOrdersDataId['vendor_details'] && purchaseOrdersDataId['vendor_details']['vendor_id'] ? purchaseOrdersDataId['vendor_details']['vendor_id'] : "",
        //   label: purchaseOrdersDataId && purchaseOrdersDataId['vendor_details'] && purchaseOrdersDataId['vendor_details']['vendor_contact'] ? purchaseOrdersDataId['vendor_details']['vendor_contact'] : "",
        // };
        return o;
      });
      setDeliveryDetailsFeilds(newdeliveryDetailsFeilds);

      var new_payment_terms = PaymentDetailsOrganization.map((o) => {
        if (o.key === "payment_terms1")
          o.value = {
            id: purchaseOrdersDataId?.payment_terms?.ID,
            label: purchaseOrdersDataId?.payment_terms?.display_name,
          };
        if (o.key === "payment_due_date")
          o.value = moment(purchaseOrdersDataId?.payment_due_date).format(
            "yyyy-MM-DD"
          );
      });
    }
  }, [purchaseOrdersDataId]);

  useEffect(() => {
    console.log("grnViewdata effect", grnViewdata);
    if (
      grnViewdata &&
      mainData &&
      mainData.source_document_type &&
      mainData.source_document_type.lookup_code == "GRN"
    ) {
      var newselectedProductData = [];
      if (grnViewdata.grn_order_lines)
        newselectedProductData = grnViewdata.grn_order_lines.map((o) => {
          return {
            product_id: { id: o.product.id, label: o.product.product_name },
            sku_id: o?.product?.sku_id,
            serial_number: o?.product?.serial_number,
            description: o?.product_template?.description?.data,
            uom_id: { id: o.uom.id, label: o.uom.uom_class_name },
            selling_price: o?.product?.selling_price
              ? o?.product?.selling_price
              : 0,
          };
        });
      setSelectedProductData(newselectedProductData);
    }
  }, [grnViewdata]);

  useEffect(() => {
    if (
      ASNViewdata &&
      mainData &&
      mainData.source_document_type &&
      mainData.source_document_type.lookup_code == "ASN"
    ) {
      console.log("ASNViewdata effect", ASNViewdata.asn_order_lines);
      var newselectedProductData = [];
      if (ASNViewdata.asn_order_lines)
        newselectedProductData = ASNViewdata.asn_order_lines.map((o) => {
          return {
            product_id: {
              id: o.product_variant.id,
              label: o.product_variant.product_name,
            },
            sku_id: o?.product_variant?.sku_id,
            //'product_destination_location': { id: o.warehouse.id, label: o.warehouse.name },
            //'inventory_details.id': o?.inventory_id,
            serial_number: o?.product_variant?.serial_number,
            description: o?.product?.description?.data,
            uom_id: { id: o.uom.id, label: o.uom.uom_class_name },
            selling_price: o?.product_variant?.selling_price
              ? o?.product_variant?.selling_price
              : 0,
          };
        });
      setSelectedProductData(newselectedProductData);
    }
  }, [ASNViewdata]);

  useEffect(() => {
    if (
      scrapOrdersViewdata &&
      mainData &&
      mainData.source_document_type &&
      mainData.source_document_type.lookup_code == "SCRAP_ORDERS"
    ) {
      var newselectedProductData = [];
      if (scrapOrdersViewdata.order_lines)
        newselectedProductData = scrapOrdersViewdata.order_lines.map((o) => {
          return {
            product_id: {
              id: o.product_Details.id,
              label: o.product_Details.product_name,
            },
            sku_id: o?.product_Details?.sku_id,
            serial_number: o?.product_Details?.serial_number,
            // 'description': o?.product_details?.description?.data,
            uom_id: { id: o.uom.id, label: o.uom.uom_class_name },
            selling_price: o?.product_Details?.selling_price
              ? o?.product_Details?.selling_price
              : 0,
          };
        });
      setSelectedProductData(newselectedProductData);
    }
  }, [scrapOrdersViewdata]);

  useEffect(() => {
    if (
      deleiveryOrdersViewdata &&
      mainData &&
      mainData.source_document_type &&
      mainData.source_document_type.lookup_code == "DELIVERY_ORDER"
    ) {
      var newselectedProductData = [];
      if (deleiveryOrdersViewdata.delivery_order_lines)
        newselectedProductData =
          deleiveryOrdersViewdata.delivery_order_lines.map((o) => {
            return {
              product_id: {
                id: o.product_details.id,
                label: o.product_details.product_name,
              },
              sku_id: o?.product_details?.sku_id,
              serial_number: o?.product_details?.serial_number,
              description: o?.product_details?.description?.data,
              uom_id: {
                id: o.uom_details.id,
                label: o.uom_details.uom_class_name,
              },
              selling_price: o?.product_details?.selling_price
                ? o?.product_details?.selling_price
                : 0,
            };
          });
      setSelectedProductData(newselectedProductData);

      var newbillingDetailsFeilds = billingDetailsFeilds.map((o) => {
        if (o.key == "billing_name")
          o.value =
            deleiveryOrdersViewdata?.billing_address_details?.contact_person_name;
        mainData["billing_name"] =
          deleiveryOrdersViewdata?.billing_address_details?.contact_person_name;
        if (o.key == "billing_mobile_number")
          o.value =
            deleiveryOrdersViewdata?.billing_address_details?.contact_person_number;
        mainData["billing_mobile_number"] =
          deleiveryOrdersViewdata?.billing_address_details?.contact_person_number;
        if (o.key == "billing_mail")
          o.value = deleiveryOrdersViewdata?.billing_address_details?.email;
        mainData["billing_mail"] =
          deleiveryOrdersViewdata?.billing_address_details?.email;
        if (o.key == "billing_address_line_1")
          o.value =
            deleiveryOrdersViewdata?.billing_address_details?.address_line_1;
        mainData["billing_address_line_1"] =
          deleiveryOrdersViewdata?.billing_address_details?.address_line_1;
        if (o.key == "billing_address_line_2")
          o.value =
            deleiveryOrdersViewdata?.billing_address_details?.address_line_2;
        mainData["billing_address_line_2"] =
          deleiveryOrdersViewdata?.billing_address_details?.address_line_2;
        if (o.key == "billing_address_line_3")
          o.value =
            deleiveryOrdersViewdata?.billing_address_details?.address_line_3;
        mainData["billing_address_line_3"] =
          deleiveryOrdersViewdata?.billing_address_details?.address_line_3;
        if (o.key == "billing_pin_code")
          o.value = deleiveryOrdersViewdata?.billing_address_details?.pin_code;
        mainData["billing_pin_code"] =
          deleiveryOrdersViewdata?.billing_address_details?.pin_code;
        if (o.key == "billing_country")
          o.value = deleiveryOrdersViewdata?.billing_address_details?.country;
        // mainData["billing_country"]["label"] = purchaseOrdersDataId?.billing_address?.country;
        if (o.key == "billing_state")
          o.value = deleiveryOrdersViewdata?.billing_address_details?.state;
        // mainData["billing_state"]["label"] = purchaseOrdersDataId?.billing_address?.state;
        if (o.key == "billing_city")
          o.value =
            deleiveryOrdersViewdata?.billing_address_details?.location_name;
        mainData["billing_city"] =
          deleiveryOrdersViewdata?.billing_address_details?.location_name;
        // if (o.key == "billing_country") o.value = Countrydata.map((o) => {
        //   if (o.name.toUpperCase() == purchaseOrdersDataId?.billing_address?.country) {
        //     return { id: o.id, label: o.name };
        //   }
        // })
        // if (o.key == "billing_state") o.value = Statedata.map((o) => {
        //   if (o.name == purchaseOrdersDataId?.billing_address?.state) {
        //     return { id: o.id, label: o.name };
        //   }
        // })
        // if (o.key == "payment_terms") o.value = {
        //   id: purchaseOrdersDataId && purchaseOrdersDataId['vendor_details'] && purchaseOrdersDataId['vendor_details']['vendor_id'] ? purchaseOrdersDataId['vendor_details']['vendor_id'] : "",
        //   label: purchaseOrdersDataId && purchaseOrdersDataId['vendor_details'] && purchaseOrdersDataId['vendor_details']['vendor_contact'] ? purchaseOrdersDataId['vendor_details']['vendor_contact'] : "",
        // };
        return o;
      });
      setBillingDetailsFeilds(newbillingDetailsFeilds);

      var newdeliveryDetailsFeilds = deliveryDetailsFeilds.map((o) => {
        if (o.key == "delivery_name")
          o.value =
            deleiveryOrdersViewdata?.delivery_address_details?.contact_person_name;
        mainData["delivery_name"] =
          deleiveryOrdersViewdata?.delivery_address_details?.contact_person_name;
        if (o.key == "delivery_mobile_number")
          o.value =
            deleiveryOrdersViewdata?.delivery_address_details?.contact_person_number;
        mainData["delivery_mobile_number"] =
          deleiveryOrdersViewdata?.delivery_address_details?.contact_person_number;
        if (o.key == "delivery_mail")
          o.value = deleiveryOrdersViewdata?.delivery_address_details?.email;
        mainData["delivery_mail"] =
          deleiveryOrdersViewdata?.delivery_address_details?.email;
        if (o.key == "delivery_address_line_1")
          o.value =
            deleiveryOrdersViewdata?.delivery_address_details?.address_line_1;
        mainData["delivery_address_line_1"] =
          deleiveryOrdersViewdata?.delivery_address_details?.address_line_1;
        if (o.key == "delivery_address_line_2")
          o.value =
            deleiveryOrdersViewdata?.delivery_address_details?.address_line_2;
        mainData["delivery_address_line_2"] =
          deleiveryOrdersViewdata?.delivery_address_details?.address_line_2;
        if (o.key == "delivery_address_line_3")
          o.value =
            deleiveryOrdersViewdata?.delivery_address_details?.address_line_3;
        mainData["delivery_address_line_3"] =
          deleiveryOrdersViewdata?.delivery_address_details?.address_line_3;
        if (o.key == "delivery_pin_code")
          o.value = deleiveryOrdersViewdata?.delivery_address_details?.pin_code;
        mainData["delivery_pin_code"] =
          deleiveryOrdersViewdata?.delivery_address_details?.pin_code;
        if (o.key == "delivery_country")
          o.value = deleiveryOrdersViewdata?.delivery_address_details?.country;
        // mainData["delivery_country"]["label"] = purchaseOrdersDataId?.delivery_address?.country;
        if (o.key == "delivery_state")
          o.value = deleiveryOrdersViewdata?.delivery_address_details?.state;
        // mainData["delivery_state"]["label"] = purchaseOrdersDataId?.delivery_address?.state;
        if (o.key == "delivery_city")
          o.value =
            deleiveryOrdersViewdata?.delivery_address_details?.location_name;
        mainData["delivery_city"] =
          deleiveryOrdersViewdata?.delivery_address_details?.location_name;
        // if (o.key == "billing_country") o.value = Countrydata.map((o) => {
        //   if (o.name.toUpperCase() == purchaseOrdersDataId?.billing_address?.country) {
        //     return { id: o.id, label: o.name };
        //   }
        // })
        // if (o.key == "billing_state") o.value = Statedata.map((o) => {
        //   if (o.name == purchaseOrdersDataId?.billing_address?.state) {
        //     return { id: o.id, label: o.name };
        //   }
        // })
        // if (o.key == "payment_terms") o.value = {
        //   id: purchaseOrdersDataId && purchaseOrdersDataId['vendor_details'] && purchaseOrdersDataId['vendor_details']['vendor_id'] ? purchaseOrdersDataId['vendor_details']['vendor_id'] : "",
        //   label: purchaseOrdersDataId && purchaseOrdersDataId['vendor_details'] && purchaseOrdersDataId['vendor_details']['vendor_contact'] ? purchaseOrdersDataId['vendor_details']['vendor_contact'] : "",
        // };
        return o;
      });
      setDeliveryDetailsFeilds(newdeliveryDetailsFeilds);
    }
  }, [deleiveryOrdersViewdata]);

  useEffect(() => {
    if (
      salesOrdersViewdata &&
      mainData &&
      mainData.source_document_type &&
      mainData.source_document_type.lookup_code == "SALES_ORDERS"
    ) {
      var newselectedProductData = [];
      if (salesOrdersViewdata.sales_order_lines)
        newselectedProductData = salesOrdersViewdata.sales_order_lines.map(
          (o) => {
            return {
              product_id: {
                id: o.product_details.id,
                label: o.product_details.product_name,
              },
              sku_id: o?.product_details?.sku_id,
              serial_number: o?.product_details?.serial_number,
              description: o?.product_details?.description?.data,
              uom_id: { id: o.uom.id, label: o.uom.uom_class_name },
              selling_price: o?.product_details?.selling_price
                ? o?.product_details?.selling_price
                : 0,
            };
          }
        );
      setSelectedProductData(newselectedProductData);

      var newbillingDetailsFeilds = billingDetailsFeilds.map((o) => {
        if (o.key == "billing_name")
          o.value =
            salesOrdersViewdata?.customer_billing_address?.contact_person_name;
        mainData["billing_name"] =
          salesOrdersViewdata?.customer_billing_address?.contact_person_name;
        if (o.key == "billing_mobile_number")
          o.value =
            salesOrdersViewdata?.customer_billing_address?.contact_person_number;
        mainData["billing_mobile_number"] =
          salesOrdersViewdata?.customer_billing_address?.contact_person_number;
        if (o.key == "billing_mail")
          o.value = salesOrdersViewdata?.customer_billing_address?.email;
        mainData["billing_mail"] =
          salesOrdersViewdata?.customer_billing_address?.email;
        if (o.key == "billing_address_line_1")
          o.value =
            salesOrdersViewdata?.customer_billing_address?.address_line_1;
        mainData["billing_address_line_1"] =
          salesOrdersViewdata?.customer_billing_address?.address_line_1;
        if (o.key == "billing_address_line_2")
          o.value =
            salesOrdersViewdata?.customer_billing_address?.address_line_2;
        mainData["billing_address_line_2"] =
          salesOrdersViewdata?.customer_billing_address?.address_line_2;
        if (o.key == "billing_address_line_3")
          o.value =
            salesOrdersViewdata?.customer_billing_address?.address_line_3;
        mainData["billing_address_line_3"] =
          salesOrdersViewdata?.customer_billing_address?.address_line_3;
        if (o.key == "billing_pin_code")
          o.value = salesOrdersViewdata?.customer_billing_address?.pin_code;
        mainData["billing_pin_code"] =
          salesOrdersViewdata?.customer_billing_address?.pin_code;
        if (o.key == "billing_country")
          o.value = salesOrdersViewdata?.customer_billing_address?.country;
        // mainData["billing_country"]["label"] = purchaseOrdersDataId?.billing_address?.country;
        if (o.key == "billing_state")
          o.value = salesOrdersViewdata?.customer_billing_address?.state;
        // mainData["billing_state"]["label"] = purchaseOrdersDataId?.billing_address?.state;
        if (o.key == "billing_city")
          o.value =
            salesOrdersViewdata?.customer_billing_address?.location_name;
        mainData["billing_city"] =
          salesOrdersViewdata?.customer_billing_address?.location_name;
        // if (o.key == "billing_country") o.value = Countrydata.map((o) => {
        //   if (o.name.toUpperCase() == purchaseOrdersDataId?.billing_address?.country) {
        //     return { id: o.id, label: o.name };
        //   }
        // })
        // if (o.key == "billing_state") o.value = Statedata.map((o) => {
        //   if (o.name == purchaseOrdersDataId?.billing_address?.state) {
        //     return { id: o.id, label: o.name };
        //   }
        // })
        // if (o.key == "payment_terms") o.value = {
        //   id: purchaseOrdersDataId && purchaseOrdersDataId['vendor_details'] && purchaseOrdersDataId['vendor_details']['vendor_id'] ? purchaseOrdersDataId['vendor_details']['vendor_id'] : "",
        //   label: purchaseOrdersDataId && purchaseOrdersDataId['vendor_details'] && purchaseOrdersDataId['vendor_details']['vendor_contact'] ? purchaseOrdersDataId['vendor_details']['vendor_contact'] : "",
        // };
        return o;
      });
      setBillingDetailsFeilds(newbillingDetailsFeilds);

      var newdeliveryDetailsFeilds = deliveryDetailsFeilds.map((o) => {
        if (o.key == "delivery_name")
          o.value =
            salesOrdersViewdata?.customer_shipping_address?.contact_person_name;
        mainData["delivery_name"] =
          salesOrdersViewdata?.customer_shipping_address?.contact_person_name;
        if (o.key == "delivery_mobile_number")
          o.value =
            salesOrdersViewdata?.customer_shipping_address?.contact_person_number;
        mainData["delivery_mobile_number"] =
          salesOrdersViewdata?.customer_shipping_address?.contact_person_number;
        if (o.key == "delivery_mail")
          o.value = salesOrdersViewdata?.customer_shipping_address?.email;
        mainData["delivery_mail"] =
          salesOrdersViewdata?.customer_shipping_address?.email;
        if (o.key == "delivery_address_line_1")
          o.value =
            salesOrdersViewdata?.customer_shipping_address?.address_line_1;
        mainData["delivery_address_line_1"] =
          salesOrdersViewdata?.customer_shipping_address?.address_line_1;
        if (o.key == "delivery_address_line_2")
          o.value =
            salesOrdersViewdata?.customer_shipping_address?.address_line_2;
        mainData["delivery_address_line_2"] =
          salesOrdersViewdata?.customer_shipping_address?.address_line_2;
        if (o.key == "delivery_address_line_3")
          o.value =
            salesOrdersViewdata?.customer_shipping_address?.address_line_3;
        mainData["delivery_address_line_3"] =
          salesOrdersViewdata?.customer_shipping_address?.address_line_3;
        if (o.key == "delivery_pin_code")
          o.value = salesOrdersViewdata?.customer_shipping_address?.pin_code;
        mainData["delivery_pin_code"] =
          salesOrdersViewdata?.customer_shipping_address?.pin_code;
        if (o.key == "delivery_country")
          o.value = salesOrdersViewdata?.customer_shipping_address?.country;
        // mainData["delivery_country"]["label"] = purchaseOrdersDataId?.delivery_address?.country;
        if (o.key == "delivery_state")
          o.value = salesOrdersViewdata?.customer_shipping_address?.state;
        // mainData["delivery_state"]["label"] = purchaseOrdersDataId?.delivery_address?.state;
        if (o.key == "delivery_city")
          o.value =
            salesOrdersViewdata?.customer_shipping_address?.location_name;
        mainData["delivery_city"] =
          salesOrdersViewdata?.customer_shipping_address?.location_name;
        // if (o.key == "billing_country") o.value = Countrydata.map((o) => {
        //   if (o.name.toUpperCase() == purchaseOrdersDataId?.billing_address?.country) {
        //     return { id: o.id, label: o.name };
        //   }
        // })
        // if (o.key == "billing_state") o.value = Statedata.map((o) => {
        //   if (o.name == purchaseOrdersDataId?.billing_address?.state) {
        //     return { id: o.id, label: o.name };
        //   }
        // })
        // if (o.key == "payment_terms") o.value = {
        //   id: purchaseOrdersDataId && purchaseOrdersDataId['vendor_details'] && purchaseOrdersDataId['vendor_details']['vendor_id'] ? purchaseOrdersDataId['vendor_details']['vendor_id'] : "",
        //   label: purchaseOrdersDataId && purchaseOrdersDataId['vendor_details'] && purchaseOrdersDataId['vendor_details']['vendor_contact'] ? purchaseOrdersDataId['vendor_details']['vendor_contact'] : "",
        // };
        return o;
      });
      setDeliveryDetailsFeilds(newdeliveryDetailsFeilds);
    }
  }, [salesOrdersViewdata]);

  const handelRadionBtnonChange = () => {
    if (
      ASNViewdata &&
      mainData &&
      mainData.source_document_type &&
      mainData.source_document_type.lookup_code == "ASN"
    ) {
      var newdeliveryDetailsFeilds = deliveryDetailsFeilds.map((o) => {
        if (o.key == "delivery_name")
          o.value =
            ASNViewdata?.destination_location_details?.contact_person_name;
        mainData["delivery_name"] =
          ASNViewdata?.destination_location_details?.contact_person_name;
        if (o.key == "delivery_mobile_number")
          o.value =
            ASNViewdata?.destination_location_details?.contact_person_number;
        mainData["delivery_mobile_number"] =
          ASNViewdata?.destination_location_details?.contact_person_number;
        if (o.key == "delivery_mail")
          o.value = ASNViewdata?.destination_location_details?.email;
        mainData["delivery_mail"] =
          ASNViewdata?.destination_location_details?.email;
        if (o.key == "delivery_address_line_1")
          o.value = ASNViewdata?.destination_location_details?.address_line_1;
        mainData["delivery_address_line_1"] =
          ASNViewdata?.destination_location_details?.address_line_1;
        if (o.key == "delivery_address_line_2")
          o.value = ASNViewdata?.destination_location_details?.address_line_2;
        mainData["delivery_address_line_2"] =
          ASNViewdata?.destination_location_details?.address_line_2;
        if (o.key == "delivery_address_line_3")
          o.value = ASNViewdata?.destination_location_details?.address_line_3;
        mainData["delivery_address_line_3"] =
          ASNViewdata?.destination_location_details?.address_line_3;
        if (o.key == "delivery_pin_code")
          o.value = ASNViewdata?.destination_location_details?.pin_code;
        mainData["delivery_pin_code"] =
          ASNViewdata?.destination_location_details?.pin_code;
        if (o.key == "delivery_city")
          o.value = ASNViewdata?.destination_location_details?.district;
        mainData["delivery_city"] =
          ASNViewdata?.destination_location_details?.district;
        if (o.key == "billing_country")
          o.value = {
            id: ASNViewdata?.destination_location_details?.Country?.id
              ? ASNViewdata?.destination_location_details?.Country?.id
              : "",
            label: ASNViewdata?.destination_location_details?.Country?.label
              ? ASNViewdata?.destination_location_details?.Country?.label
              : "",
          };
        if (o.key == "billing_state")
          o.value = {
            id: ASNViewdata?.destination_location_details?.State?.id
              ? ASNViewdata?.destination_location_details?.State?.id
              : "",
            label: ASNViewdata?.destination_location_details?.State?.label
              ? ASNViewdata?.destination_location_details?.State?.label
              : "",
          };
        return o;
      });
      setDeliveryDetailsFeilds(newdeliveryDetailsFeilds);
    }
  };

  useEffect(() => {
    // calulate_total();
  }, [selectedProductData]);

  const [selectedProductData, setSelectedProductData] = useState([
    {
      product_id: [],
      product_name: "",
      product_destination_location: "",
      inventory_id: 0,
      serial_number: "",
      description: "",
      uom_id: [],
      price: 100,
      quantity: 0,
      discount: 0,
      tax: 0,
      sales_period: "",
      exp_delivery_lead_time: "",
      credit_period: 0,
      lead_time: 0,
      Amount: 0,
    },
  ]);

  useEffect(() => {
    console.log(paymentDetailsFields, "paymentDetailsFields");
  }, [paymentDetailsFields]);

  const [paymentDetailsFields, setPaymentDetailsFields] = useState({
    subTotal: 0,
    tax: 0,
    shippingCharge: 0,
    adjustment_text: "",
    adjustment_amount: 0,
    total: 0,
  });

  // const [deliveryTO,setDeliveryTo]= useState();

  const [purchaseOrderDetailsFields, setPurchaseOrderDetailsFields] = useState([
    {
      label: "Purchase Order Date*",
      type: "date",
      key: "purchase_order_date",
    },
    {
      label: "PO Currency*",
      type: "select",
      key: "currency_id",
      data: [],
      defaultVal: {},
    },
    {
      label: "Expected Delivery Date*",
      type: "date",
      key: "expected_delivery_date",
    },
    {
      label: "",
      type: "pre",
      key: "blank",
    },
    {
      label: "Purchase Order Number*",
      type: "input",
      key: "purchase_order_number",
    },
    {
      label: "Auto Generate Purchase Order ID",
      type: "checkbox",
      key: "Auto_purchase_order_number",
      isChecked: false,
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
      isChecked: false,
    },

    {
      label: "Source Document Type",
      type: "select",
      key: "source_document_type",
      defaultVal: {},
    },
    {
      label: "Select Source Document",
      type: "select",
      key: "source_source_document",
      defaultVal: {},
    },
  ]);

  const [deliveryDetailsFeilds, setDeliveryDetailsFeilds] = useState([
    {
      label: "Reciever Name",
      type: "input",
      key: "delivery_name",
      required: true,
    },
    {
      label: "Mobile Number",
      type: "input",
      key: "delivery_mobile_number",
    },
    {
      label: "Email",
      type: "input",
      key: "delivery_mail",
    },
    {
      label: "Address Line 1",
      type: "input",
      key: "delivery_address_line_1",
    },
    {
      label: "Address Line 2",
      type: "input",
      key: "delivery_address_line_2",
    },
    {
      label: "Address Line 3",
      type: "input",
      key: "delivery_address_line_3",
    },
    {
      label: "Zincode",
      type: "input",
      key: "delivery_pin_code",
    },
    {
      label: "Country",
      type: "select",
      key: "delivery_country",
    },
    {
      label: "State",
      type: "select",
      key: "delivery_state",
    },
    {
      label: "City/District",
      type: "input",
      key: "delivery_city",
    },
  ]);

  const [AdditionalInformationFields, setAdditionalInformationFields] =
    useState([
      {
        label: "Note",
        type: "input",
        key: "Additional_Information_Note",
        row: 2,
      },
      {
        label: "Terms and Conditions",
        type: "input",
        key: "Additional_Information_Terms_Conditions",
        row: 2,
      },
    ]);

  const [PaymentDetails, setPaymentDetails] = useState([
    {
      label: "Select Payment terms",
      type: "select",
      key: "payment_terms",
    },
    {
      label: "Payment Due Date",
      type: "date",
      key: "pickup_time",
    },
    {
      label: "PR Currency",
      type: "input",
      key: "pr_currency",
    },
  ]);

  const [PaymentDetailsOrganization, setPaymentDetailsOrganization] = useState([
    {
      label: "Select Payment terms",
      type: "select",
      key: "payment_terms1",
    },
    {
      label: "Set common payment term for the entire order",
      type: "checkbox",
      key: "commonPayment",
    },
    {
      label: "Payment Due Date",
      type: "date",
      key: "payment_due_date",
    },
  ]);

  const [billingDetailsFeilds, setBillingDetailsFeilds] = useState([
    {
      label: "Reciever Name",
      type: "input",
      key: "billing_name",
      required: true,
    },
    {
      label: "Mobile Number",
      type: "input",
      key: "billing_mobile_number",
    },
    {
      label: "Email",
      type: "input",
      key: "billing_mail",
    },
    {
      label: "Address Line 1",
      type: "input",
      key: "billing_address_line_1",
    },
    {
      label: "Address Line 2",
      type: "input",
      key: "billing_address_line_2",
    },
    {
      label: "Address Line 3",
      type: "input",
      key: "billing_address_line_3",
    },
    {
      label: "Zincode",
      type: "input",
      key: "billing_pin_code",
    },
    {
      label: "Country",
      type: "select",
      key: "billing_country",
    },
    {
      label: "State",
      type: "select",
      key: "billing_state",
    },
    {
      label: "City/District",
      type: "input",
      key: "billing_city",
    },
  ]);

  const [mainData, setMainData] = useState({});

  const headCells = [
    {
      label: "Product",
      key: "product_id",
      type: "select",
      data: useSelector((state) =>
        state.data.productVariantData.map((o) => {
          return { id: o.id, label: o.sku_id, data: o };
        })
      ),
    },
    {
      label: "Product SKU",
      key: "sku_id",
      type: "label",
    },
    {
      label: "Destination Location",
      key: "product_destination_location",
      type: "select",
      data: locationData?.map((o) => {
        return { id: o.id, label: o.name };
      }),
    },
    {
      label: "Inventory ID",
      key: "inventory_details.id",
      type: "label",
    },
    {
      key: "serial_number",
      label: "Serial No.",
      type: "text",
    },
    {
      label: "Description*",
      key: "description.data",
      type: "text",
    },
    {
      key: "uom_id",
      label: "Unit Of Measurement",
      type: "select",
      data: useSelector((state) =>
        state.data.uomData.map((o) => {
          return { id: o.id, label: o.name };
        })
      ),
    },
    {
      label: "Price",
      key: "selling_price",
      type: "number",
    },
    {
      label: "Quantity",
      key: "quantity",
      type: "number",
    },
    {
      label: "Discount",
      key: "discount",
      type: "number",
    },
    {
      label: "Tax %",
      key: "tax",
      type: "number",
    },
    {
      label: "Sales Period*",
      key: "sales_period",
      type: "text",
    },
    {
      label: "Expected delivery Lead Time*",
      key: "exp_delivery_lead_time",
      type: "text",
    },
    {
      label: "Credit Period*",
      key: "credit_period",
      type: "text",
    },
    {
      label: "Lead Time*",
      key: "lead_time",
      type: "text",
    },

    {
      key: "Amount",
      label: "Amount",
      type: "label",
    },
    {
      key: "Action",
      label: "Action",
      type: "view",
      renderView: (item) => (
        <div>
          <DeleteIcon
            onClick={() => {
              setSelectedProductData(
                selectedProductData.filter((o) => o.id != item.id)
              );
              if (id !== null) console.log(item, "asdfghjklkjhgfdsa", id);
              dispatch(deleteProductLine(id, item.product_id.id));
            }}
          />
        </div>
      ),
    },
  ];

  const orgHeadCells = [
    {
      label: "Product",
      key: "product_id",
      type: "select",
      data: useSelector((state) =>
        state.data.productVariantData.map((o) => {
          return { id: o.id, label: o.product_name, data: o };
        })
      ),
    },
    {
      label: "Product SKU",
      key: "sku_id",
      type: "label",
    },
    {
      label: "warehouse",
      key: "warehouse",
      type: "label",
    },
    {
      label: "Inventory ID",
      key: "inventory_details.id",
      type: "label",
    },
    {
      key: "serial_number",
      label: "Serial No.",
      type: "label",
    },
    {
      label: "Description",
      key: "description.data",
      type: "label",
    },
    {
      key: "uom_id",
      label: "Unit Of Measurement",
      type: "select",
      data: useSelector((state) =>
        state.data.uomData.map((o) => {
          return { id: o.id, label: o.name };
        })
      ),
    },
    {
      label: "Price",
      key: "selling_price",
      type: "number",
    },
    {
      label: "Quantity",
      key: "quantity",
      type: "number",
    },
    {
      label: "Discount",
      key: "discount",
      type: "number",
    },
    {
      label: "Tax %",
      key: "tax",
      type: "number",
    },
    {
      label: "Sales Period",
      key: "sales_period",
      type: "text",
    },
    {
      label: "Expected delivery Lead Time",
      key: "exp_delivery_lead_time",
      type: "text",
    },
    {
      label: "Credit Period",
      key: "credit_period",
      type: "text",
    },
    {
      label: "Lead Time",
      key: "lead_time",
      type: "text",
    },
    {
      key: "Amount",
      label: "Amount",
      type: "label",
    },
    {
      key: "Action",
      label: "Action",
      type: "view",
      renderView: (item) => (
        <div>
          <DeleteIcon
            onClick={() => {
              setSelectedProductData(
                selectedProductData.filter((o) => o.id != item.id)
              );
              if (id !== null) console.log(item, "asdfghjklkjhgfdsa", id);

              dispatch(deleteProductLine(id, item.product_id.id));
            }}
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

  const [vendorContact, setVendorContact] = useState([
    {
      key: "contact",
      label: "Search Contact",
      type: "select",
    },
  ]);

  const [selectOrganisation, setSelectOrganisation] = useState([
    {
      key: "organisation",
      label: "Select Organisation",
      type: "select",
    },
  ]);
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

  const [selectedVendor, setSelectedVendor] = useState({});
  const [selectedOrganisation, setSelectedOrganisation] = useState({});

  useEffect(() => {
    var billingData = VendorsDetails?.Details?.contact?.address_details.find(
      (o) => {
        return o;
      }
    );
    console.log(billingData, "billingDatabillingData");
    setSelectedVendor({
      vendor_contact: VendorsDetails?.Details?.name,
      vendor_id: VendorsDetails?.Details?.id,
      vendor_delivery_charges: "",
      vendor_locations: {
        vendor_billing_address: {
          pin_code: billingData?.pin_code,
          land_mark: billingData?.land_mark,
          gst_in_number: billingData?.gst_in_number,
          location_name: billingData?.location_name,
          address_line_1: billingData?.address_line_1,
          address_line_2: billingData?.address_line_2,
          address_line_3: billingData?.address_line_3,
          contact_person_name: billingData?.contact_person_name,
          contact_person_number: billingData?.contact_person_number,
        },
        vendor_billing_address: {
          pin_code: billingData?.pin_code,
          land_mark: billingData?.land_mark,
          gst_in_number: billingData?.gst_in_number,
          location_name: billingData?.location_name,
          address_line_1: billingData?.address_line_1,
          address_line_2: billingData?.address_line_2,
          address_line_3: billingData?.address_line_3,
          contact_person_name: billingData?.contact_person_name,
          contact_person_number: billingData?.contact_person_number,
        },
      },
      vendor_credits: VendorsDetails?.vendor_credits,
    });

    // console.log(selectedVendor,"slectedVendor-----")
  }, [VendorsDetails]);

  useEffect(() => {
    console.log(selectedVendor, "selectedVendor--------");
  }, [selectedVendor]);

  // ___________________________________________________________

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

  // Caluculate

  function calulate_total() {
    if (selectedProductData && mainData && Estimated_Cost.length > 0) {
      var val1 = selectedProductData
        .map((o) => o.Amount)
        .reduce((previousValue, currentValue) => {
          return previousValue + currentValue;
        });
      var id_Estimated_Cost_Select = mainData.Estimated_Cost_Select;
      var val2 = Estimated_Cost?.find(
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

  const handelInputChange = (key, value, index = null) => {
    try {
      var newpurchaseOrderDetailsFields = purchaseOrderDetailsFields.map(
        (o) => {
          if (o.key == key) o.value = value;
          return o;
        }
      );
      setPurchaseOrderDetailsFields(newpurchaseOrderDetailsFields);
    } catch (e) {}
    try {
      var newvendorContact = vendorContact.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setVendorContact(newvendorContact);
    } catch (e) {}
    try {
      var newbillingDetailsFeilds = billingDetailsFeilds.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setBillingDetailsFeilds(newbillingDetailsFeilds);
    } catch (e) {}
    try {
      var newdeliveryDetailsFeilds = deliveryDetailsFeilds.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setDeliveryDetailsFeilds(newdeliveryDetailsFeilds);
    } catch (e) {}
    try {
      var newdeliveryDetailsFeilds = deliveryDetailsFeilds.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setDeliveryDetailsFeilds(newdeliveryDetailsFeilds);
    } catch (e) {}
    try {
      var newPaymentDetails = PaymentDetails.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setPaymentDetails(newPaymentDetails);
    } catch (e) {}
    try {
      var newAdditionalInformationFields = AdditionalInformationFields.map(
        (o) => {
          if (o.key == key) o.value = value;
          return o;
        }
      );
      setAdditionalInformationFields(newAdditionalInformationFields);
    } catch (e) {}

    console.log(key, value, index, "key-value in handel change");
    if (index !== null) {
      var newSelectedProductData = JSON.parse(
        JSON.stringify(selectedProductData)
      );
      if (key === "product_id") {
        var selectVarient = productVariantData.find((o) => o.id == value.id);
        console.log("select varient id", selectVarient);
        newSelectedProductData[index] = selectVarient;
        newSelectedProductData[index][key] = value.label;
      } else if (key === "uom.name") {
        var selectVarient = uomData.find((o) => o.id == value.id);
        newSelectedProductData[index].uom = { name: value.label, id: value.id };
      } else {
        if (key.toString().includes("."))
          newSelectedProductData[index][key.split(".")[0]][key.split(".")[1]] =
            value;
        else newSelectedProductData[index][key] = value;
      }

      var grossTotal =
        (newSelectedProductData[index].quantity ?? 0) *
          (newSelectedProductData[index].selling_price ?? 0) -
        (newSelectedProductData[index].discount ?? 0);
      var tax = 0;
      if (
        newSelectedProductData[index].product_pricing_details &&
        newSelectedProductData[index].tax &&
        newSelectedProductData[index].tax > 0
      ) {
        tax = (grossTotal * newSelectedProductData[index]?.tax ?? 0) / 100;
      } else tax = 0;
      var amount = grossTotal + tax;
      newSelectedProductData[index].Amount = amount;

      if (key == "Final_Enter_Amount") {
        setPaymentDetailsFields({
          ...paymentDetailsFields,
          adjustment_amount: value,
        });
      }

      if (key == "Vendor_Delivery_Charges") {
        setPaymentDetailsFields({
          ...paymentDetailsFields,
          shippingCharge: value,
        });
      }
      // calulate_total();
      setSelectedProductData(newSelectedProductData);
      setPaymentDetailsFields({
        ...paymentDetailsFields,
        subTotal: grossTotal,
        tax: newSelectedProductData[0]?.tax ?? 0,
        total: newSelectedProductData
          .map((o) => o.Amount)
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      });
    } else {
      var newMainData = mainData;
      newMainData[key] = value;
      setMainData(newMainData);
    }

    console.log(mainData, "mainData");
  };

  const handleButtonClick = (key) => {
    console.log("selectedProductDataselectedProductData", selectedProductData);
    console.log("mainDatamainData", mainData);
    // var Estimated_Cost_details = Estimated_Cost.find(o=> o.Estimated_Cost_Select == mainData.Estimated_Cost_Select);
    if (key == "Get Quote") {
      var data = {
        origin_pincode: "122001", //Fix Not Avialble in Search Warehosue API // Praveen sir
        destination_pincode: mainData.ShippingAddress_Zipcode,
        package_details: {
          package_height: mainData.Package_Height,
          package_length: mainData.Package_Length,
          package_weight: mainData.Package_Weight,
          package_breadth: mainData.Package_Width,
          volumetric_weight: mainData.Vol_Weight,
          product_value: paymentDetailsFields.total,
        },
        is_cod: true,
      };
      dispatch(load_rate_calculator_data(data));
      return true;
    }

    console.log("OrganisationDetailsId", OrganisationDetailsId);

    var shippingData = OrganisationDetailsId?.address_details?.find((o) => {
      return o.address_type_id === 1;
    });
    var billingData = OrganisationDetailsId?.address_details?.find((o) => {
      return o.address_type_id === 2;
    });

    shippingData = shippingData;
    billingData = billingData;
    console.log(billingData, "billingData");
    console.log(shippingData, "shippingData");
    var body = {
      //"pr_currency" : mainData?.pr_currency ? mainData?.pr_currency : "",
      reference_number: mainData.reference_number,
      generate_reference_id: mainData.Auto_reference_number,
      source_documents: mainData?.source_source_document
        ? mainData?.source_source_document
        : {},
      source_document_type_id: mainData?.source_document_type?.id
        ? parseInt(mainData?.source_document_type?.id)
        : "",
      purchase_order_number: mainData.purchase_order_number,
      date_and_time:
        moment(mainData?.purchase_order_date).format("yyyy-MM-DD") +
        "T22:19:32.8080397+05:30",
      currency_id: mainData?.currency_id?.id ? mainData?.currency_id?.id : 1,
      vendor_details: selectedVendor,
      billed_id: 11,
      delivery_to_id: parseInt(deliveryTO),
      paid_id: 116,
      organization_details: mainData?.organisation,
      amount: paymentDetailsFields?.total,
      expected_delivery_date:
        moment(mainData?.expected_delivery_date).format("yyyy-MM-DD") +
        "T22:19:32.8080397+05:30",
      price_list_id: 1,
      delivery_address: {
        pin_code: mainData?.delivery_pin_code
          ? mainData?.delivery_pin_code
          : shippingData?.pin_code
          ? shippingData?.pin_code
          : "--",
        land_mark: "Near Railway Station",
        gst_in_number: "22ASDAS00A1Z5",
        location_name: "",
        address_line_1: mainData?.delivery_address_line_1
          ? mainData?.delivery_address_line_1
          : shippingData?.address_line_1
          ? shippingData?.address_line_1
          : "--",
        address_line_2: mainData?.delivery_address_line_2
          ? mainData?.delivery_address_line_2
          : shippingData?.address_line_2
          ? shippingData?.address_line_2
          : "--",
        address_line_3: mainData?.delivery_address_line_3
          ? mainData?.delivery_address_line_3
          : shippingData?.address_line_3
          ? shippingData?.address_line_3
          : "--",
        contact_person_name: mainData?.delivery_name
          ? mainData?.delivery_name
          : shippingData?.contact_person_name
          ? shippingData?.contact_person_name
          : "--",
        contact_person_number: mainData?.delivery_mobile_number
          ? mainData?.delivery_mobile_number
          : shippingData?.contact_person_number
          ? shippingData?.contact_person_number
          : "--",
        email: mainData?.delivery_mail,
        state: mainData?.delivery_state?.label
          ? mainData?.delivery_state?.label
          : shippingData?.country?.name
          ? shippingData?.country?.name
          : "--",
        country: mainData?.delivery_country?.label
          ? mainData?.delivery_country?.label
          : shippingData?.state?.name
          ? shippingData?.state?.name
          : "--",
        city: mainData?.delivery_city
          ? mainData?.delivery_city
          : billingData?.delivery_city
          ? billingData?.delivery_city
          : "--",
      },
      billing_address: {
        pin_code: mainData?.billing_pin_code
          ? mainData?.billing_pin_code
          : billingData?.pin_code
          ? billingData?.pin_code
          : "--",
        land_mark: "Near Railway Station",
        gst_in_number: "22ASDAS00A1Z5",
        location_name: "Banjara Hill Main Office",
        address_line_1: mainData?.billing_address_line_1
          ? mainData?.billing_address_line_1
          : billingData?.address_line_1
          ? billingData?.address_line_1
          : "--",
        address_line_2: mainData?.billing_address_line_2
          ? mainData?.billing_address_line_2
          : billingData?.address_line_2
          ? billingData?.address_line_2
          : "--",
        address_line_3: mainData?.billing_address_line_3
          ? mainData?.billing_address_line_3
          : billingData?.address_line_3
          ? billingData?.address_line_3
          : "--",
        contact_person_name: mainData?.billing_name
          ? mainData?.billing_name
          : "--",
        contact_person_number: mainData?.billing_mobile_number
          ? mainData?.billing_mobile_number
          : billingData?.contact_person_number
          ? billingData?.contact_person_number
          : "--",
        email: mainData?.billing_mail,
        state: mainData?.billing_state?.label
          ? mainData?.billing_state?.label
          : billingData?.country?.name
          ? billingData?.country?.name
          : "--",
        country: mainData?.billing_country?.label
          ? mainData?.billing_country?.label
          : billingData?.state?.name
          ? billingData?.state?.name
          : "--",
        city: mainData?.billing_city
          ? mainData?.billing_city
          : billingData?.billing_city
          ? billingData?.billing_city
          : "--",
      },
      additional_information: {
        notes: mainData?.Additional_Information_Note
          ? mainData?.Additional_Information_Note
          : "--",
        terms_and_conditions: mainData?.Additional_Information_Terms_Conditions
          ? mainData?.Additional_Information_Terms_Conditions
          : "--",
        attachments: {
          id: 1,
          name: "path",
        },
      },
      po_payment_details: {
        available_customer_credits: 100,
        use_credits_for_payment: true,
        sub_total: paymentDetailsFields.subTotal,
        tax: parseFloat(paymentDetailsFields.tax),
        shipping_charges: parseFloat(paymentDetailsFields.shippingCharge),
        adjustment_amount: paymentDetailsFields.adjustment_amount,
        total_amount: paymentDetailsFields.total,
      },
      purchase_order_lines: selectedProductData?.map((row) => {
        return {
          // "product_id": row?.product_id?.id ? parseInt(row?.product_id?.id) : 1,
          product_id: row?.id ? parseInt(row?.id) : 1,
          product_template_id: 1,
          warehouse_id: 1,
          inventory_id: row?.inventory_id ? parseInt(row?.inventory_id) : 1,
          uom_id: row?.uom_id?.id ? parseInt(row?.uom_id?.id) : 1,
          serial_number: row?.serial_number ? row?.serial_number : "--",
          quantity: row?.quantity ? parseInt(row?.quantity) : 1,
          price: row?.selling_price ? parseInt(row?.selling_price) : 0,
          discount: row?.discount ? parseInt(row?.discount) : 0,
          tax: row?.tax ? parseInt(row?.tax) : 0,
          // "amount": ((row?.price) * (row?.quantity)) + ((((row?.price) * (row?.quantity)) / (row?.tax)) * 100),

          amount: row?.Amount ? parseInt(row?.Amount) : 1,
          sales_period: row?.sales_period ? row?.sales_period : 1,
          exp_delivery_lead_time: row?.exp_delivery_lead_time
            ? row?.exp_delivery_lead_time
            : 1,
          credit_period: row?.credit_period ? row?.credit_period : 1,
          lead_time: row?.lead_time ? row?.lead_time : 1,
        };
      }),
      status_id: 250,
    };
    if (parseInt(deliveryTO) == 449) {
      body["payment_terms_id"] = mainData?.payment_terms
        ? parseInt(mainData?.payment_terms)
        : 0;
    } else
      body["payment_terms_id"] = mainData?.payment_terms1
        ? parseInt(mainData?.payment_terms1?.id)
        : 0;

    if (props && props.id) {
      dispatch(Edit_Purchase_Order_Data(body, props.id));
      history.push("/purchaseOrders");
    } else {
      dispatch(Save_Purchase_Order_Data(body));
      history.push("/purchaseOrders");
    }
  };

  const [Country, setCountry] = useState();

  const onAddNewRaw = () => {
    setSelectedProductData([
      ...selectedProductData,
      {
        product_id: [],
        product_name: "",
        product_destination_location: "",
        inventory_id: "",
        serial_number: "",
        description: "",
        uom_id: [],
        price: 0,
        quantity: 0,
        discount: 0,
        tax: 0,
        sales_period: "",
        exp_delivery_lead_time: "",
        credit_period: "",
        lead_time: 0,
        Amount: 0,
      },
    ]);
  };

  const handelSelectonChange = (key, value) => {
    console.log(value, key, "value-key");

    switch (key) {
      case "currency_id": {
        setPurchaseOrderDetailsFields(
          purchaseOrderDetailsFields.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
      case "source_document_type": {
        setPurchaseOrderDetailsFields(
          purchaseOrderDetailsFields.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
      case "source_source_document": {
        setPurchaseOrderDetailsFields(
          purchaseOrderDetailsFields.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
      case "contact": {
        setVendorContact(
          vendorContact.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
      case "organisation": {
        setSelectOrganisation(
          selectOrganisation.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
      case "billing_country": {
        setBillingDetailsFeilds(
          billingDetailsFeilds.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
      case "billing_state": {
        setBillingDetailsFeilds(
          billingDetailsFeilds.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
      case "delivery_country": {
        setDeliveryDetailsFeilds(
          deliveryDetailsFeilds.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
      case "delivery_state": {
        setDeliveryDetailsFeilds(
          deliveryDetailsFeilds.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
      case "payment_terms": {
        setPaymentDetails(
          PaymentDetails.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
      case "payment_terms1": {
        setPaymentDetailsOrganization(
          PaymentDetailsOrganization.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
    }

    if (key === "billing_country" || key === "delivery_country") {
      dispatch(loadStateDataById(value.id));
    }
    if (key === "contact") {
      dispatch(loadvendorsDataById(value.id));
      // console.log(VendorsDetails,"selectedVendorDetails")
    }

    if (key == "source_document_type") {
      if (value.lookup_code == "ASN") {
        dispatch(
          loadASNData({ limit: 100, offset: 1, filters: null, sort: null })
        );
      }
      if (value.lookup_code == "GRN") {
        dispatch(
          loadGrnData({ limit: 100, offset: 1, filters: null, sort: null })
        );
      }
      if (value.lookup_code == "SALES_ORDERS") {
        dispatch(
          loadSalesOrdersData({
            limit: 100,
            offset: 1,
            filters: null,
            sort: null,
          })
        );
      }
      if (value.lookup_code == "DELIVERY_ORDER") {
        dispatch(
          loadDeliveryOrderData({
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
    }

    if (key == "source_source_document") {
      if (mainData.source_document_type.lookup_code == "ASN") {
        dispatch(loadASNDataById(value.id));
      }
      if (mainData.source_document_type.lookup_code == "GRN") {
        dispatch(loadGrnDataById(value.id));
      }
      if (mainData.source_document_type.lookup_code == "SALES_ORDERS") {
        dispatch(loadSalesOrdersDataById(value.id));
      }
      if (mainData.source_document_type.lookup_code == "DELIVERY_ORDER") {
        dispatch(loadDeliveryOrderDataById(value.id));
      }
      if (mainData.source_document_type.lookup_code == "SCRAP_ORDERS") {
        dispatch(loadScrapOrdersDataById(value.id));
      }
    }

    if (key === "organisation") {
      dispatch(loadOgranisationdataid(value.id));
    }
    var newMainData = mainData;
    // if (key == "source_document_type") {
    //   newMainData[key] = value.id;
    // }else{
    //   newMainData[key] = value;
    // }
    newMainData[key] = value;
    setMainData(newMainData);
    console.log(mainData, "mainData");
    // console.log(selectedVendor,"selected")
  };

  const setRadioType = (prop, value) => {};

  const handelCheckBoxonChange = (field) => {
    console.log(field, "checkbox Data");

    if (field.key == "Auto_purchase_order_number") {
      var neworder = purchaseOrderDetailsFields.map((o) => {
        if (o.key == "purchase_order_number") o.disabled = !field.isChecked;
        return o;
      });
      setPurchaseOrderDetailsFields(neworder);
    }

    if (field.key == "Auto_reference_number") {
      var neworder = purchaseOrderDetailsFields.map((o) => {
        if (o.key == "reference_number") o.disabled = !field.isChecked;
        return o;
      });
      setPurchaseOrderDetailsFields(neworder);
    }

    var newMainData = mainData;
    newMainData[field.key] = !field.isChecked;
    setMainData(newMainData);

    var newState = purchaseOrderDetailsFields.map((o) => {
      if (o.key == field.key) {
        o.isChecked = !o.isChecked;
      }
      return o;
    });
    setPurchaseOrderDetailsFields(newState);
  };

  return (
    <>
      <AddForm
        header={"Enter Purchase Order Details"}
        data={purchaseOrderDetailsFields.map((field) => {
          switch (field.key) {
            case "currency_id":
              field.data = Currencydata.map((o) => {
                return { id: o.id, label: o.name };
              });
          }
          switch (field.key) {
            case "source_document_type":
              field.data = sourceDocTypeData.map((o) => {
                return {
                  id: o.id,
                  label: o.display_name,
                  lookup_code: o.lookup_code,
                };
              });
          }
          switch (field.key) {
            case "source_source_document": {
              field.data =
                mainData &&
                mainData.source_document_type &&
                mainData.source_document_type.lookup_code == "ASN"
                  ? ASNdata.map((o) => {
                      console.log("0", o);
                      return { id: o.id, label: o.asn_number };
                    })
                  : mainData &&
                    mainData.source_document_type &&
                    mainData.source_document_type.lookup_code == "GRN"
                  ? grndata.map((o) => {
                      return { id: o.id, label: o.grn_number };
                    })
                  : mainData &&
                    mainData.source_document_type &&
                    mainData.source_document_type.lookup_code ==
                      "DELIVERY_ORDER"
                  ? deleiveryOrdersdata.map((o) => {
                      return { id: o.id, label: o.customer_name };
                    })
                  : mainData &&
                    mainData.source_document_type &&
                    mainData.source_document_type.lookup_code == "SALES_ORDERS"
                  ? salesOrdersdata.map((o) => {
                      return { id: o.id, label: o.sales_order_number };
                    })
                  : mainData &&
                    mainData.source_document_type &&
                    mainData.source_document_type.lookup_code == "SCRAP_ORDERS"
                  ? scrapOrdersdata.map((o) => {
                      return { id: o.id, label: o.scrap_order_no };
                    })
                  : null;
            }
          }
          return field;
        })}
        handelInputChange={handelInputChange}
        handelSelectonChange={handelSelectonChange}
        handelCheckBoxonChange={handelCheckBoxonChange}
        setRadioType={setRadioType}
      />

      <Box sx={{ background: "#ffffff", borderRadius: "8px", padding: "8px" }}>
        <h3> Select Vendor </h3>

        <AddForm
          header={""}
          data={vendorContact.map((field) => {
            switch (field.key) {
              case "contact":
                field.data = Vendorsdata.map((o) => {
                  return { id: o.id, label: o.name };
                });
            }
            return field;
          })}
          handelInputChange={handelInputChange}
          handelSelectonChange={handelSelectonChange}
          handelCheckBoxonChange={handelCheckBoxonChange}
          setRadioType={setRadioType}
        />

        {VendorsDetails.Vendor_ID && (
          <Box
            sx={{
              background: "#ffffff",
              borderRadius: "8px",
              padding: "8px",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            {VendorsDetails.Details.contact.address_details?.map((item) => {
              return (
                <LocationCard
                  head={
                    item?.type == "shipping_address"
                      ? "Shipping Address Details"
                      : " Address Details"
                  }
                  location_name={item?.location_name}
                  pickUp_address={`${item?.address_line_1} ${item?.address_line_2}`}
                  contact={item?.contact_person_name}
                />
              );
            })}

            {/* {VendorsDetails.Details.contact.address_details?.map((item) => {
                return (
                  <LocationCard
                    head={item?.type == "Address Details"}
                    location_name={item?.location_name}
                    pickUp_address={`${item?.address_line_1} ${item?.address_line_2}`}
                    contact={item?.contact_person_name} />
                )
              })} */}
          </Box>
        )}
      </Box>

      {( deliveryTO == 488 || deliveryTO ==489 || id  == undefined  )  && (
        <Box
          sx={{ background: "#ffffff", borderRadius: "8px", padding: "8px" }}
        >
          <h2 style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "100px", marginLeft: "20px" }}>
              Deliver To
            </span>
            <MatRadioButton
              label={"Deliver To *"}
              field={{ defaultVal: deliveryTO }}
              fields={[
                { label: "organisation", value: "489" ,checked : deliveryTO == 489 ? true : false  },
                { label: "customer", value: "488", checked : deliveryTO == 488 ? true :false },
              ]}
              onChange={(e) => {
                setDeliveryTo(e.target.value);

              }}
            />
          </h2>

          {deliveryTO == 488 ? (
            <>
              <AddForm
                header={"Delivery Address"}
                data={deliveryDetailsFeilds.map((field) => {
                  switch (field.key) {
                    case "delivery_country": {
                      field.data = Countrydata.map((o) => {
                        return { id: o.id, label: o.name.toUpperCase() };
                      });
                      break;
                    }
                    case "delivery_state": {
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
              />
              <AddForm
                header={"Billing Address"}
                data={billingDetailsFeilds.map((field) => {
                  switch (field.key) {
                    case "billing_country": {
                      field.data = Countrydata.map((o) => {
                        return { id: o.id, label: o.name.toUpperCase() };
                      });
                      break;
                    }
                    case "billing_state": {
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
              />
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
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <AddForm
                    header={"Payment Terms"}
                    data={PaymentDetails.map((field) => {
                      switch (field.key) {
                        case "payment_terms": {
                          field.data = Lookupdata.map((o) => {
                            return { id: o.id, label: o.display_name };
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
                  />
                </RemoteWrapper>
              </Suspense>
            </>
          ) : (
            <>
              <Box
                sx={{
                  background: "#ffffff",
                  borderRadius: "8px",
                  padding: "8px",
                }}
              >
                <AddForm
                  header={""}
                  data={selectOrganisation.map((field) => {
                    switch (field.key) {
                      case "organisation":
                        field.data = OrganisationDetails.map((o) => {
                          return { id: o.id, label: o.first_name };
                        });
                    }
                    return field;
                  })}
                  handelInputChange={handelInputChange}
                  handelSelectonChange={handelSelectonChange}
                  handelCheckBoxonChange={handelCheckBoxonChange}
                  setRadioType={setRadioType}
                />

                {OrganisationDetailsId.id && (
                  <Box
                    sx={{
                      background: "#ffffff",
                      borderRadius: "8px",
                      padding: "8px",
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    {OrganisationDetailsId?.address_details?.map((item) => {
                      // if (item?.type === "shipping_address" || item?.type === "billing_address")
                      return (
                        <LocationCard
                          head={
                            item?.type == "shipping_address"
                              ? "Shipping Address Details"
                              : " Address Details"
                          }
                          location_name={item?.location_name}
                          pickUp_address={`${item?.address_line_1} ${item?.address_line_2}`}
                          contact={item?.contact_person_name}
                        />
                      );
                    })}
                  </Box>
                )}
              </Box>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <AddForm
                    header={"Payment Terms"}
                    data={PaymentDetailsOrganization.map((field) => {
                      switch (field.key) {
                        case "payment_terms1": {
                          field.data = Lookupdata.map((o) => {
                            return { id: o.id, label: o.display_name };
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
                  />
                </RemoteWrapper>
              </Suspense>
              <AddForm_Table
                headCells={orgHeadCells}
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
            </>
          )}
        </Box>
      )}

      <AddForm
        header={"Additional Information"}
        data={AdditionalInformationFields}
        handelInputChange={handelInputChange}
        handelSelectonChange={handelSelectonChange}
        handelCheckBoxonChange={handelCheckBoxonChange}
        setRadioType={setRadioType}
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
    </>
  );
}
export default PurchaseOrdersCreate;









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