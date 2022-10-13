import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddForm from "Remote/AddForm";
import AddFormFooter_Button from "Remote/AddFormFooter_Button";
import { useHistory } from "react-router-dom";
import AddForm_Table from "Remote/AddForm_Table";
import { lazy, Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary";
import { useParams } from "react-router-dom";
import {
  loadProductsListData,
  loadVendorsData,
  loadUOMData,
  loadCurrencyData,
  loadPaymentTerms,
  Save_Purchase_Return_Data,
  loadPurchaseReturnsDataView,
  loadPurchaseReturnsData,
  loadpurchaseOrders,
  Update_Purchase_Return_Data,
  loadSOURCE_DOCUMENTData,
  loadSalesData,
  loadSalesDataById,
  loadPurchaseDataById,
  loadSalesReturnsData,
  loadSalesReturnsDataView,
  deleteProductLine,
} from "../redux/actions/action";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddFormFooter from "Remote/AddFormFooter";
import {
  Link,
  Box,
  Typography,
  Button,
  FormGroup,
  MenuItem,
  Menu,
  Grid,
  FormLabel,
} from "@mui/material";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Escalator } from "@mui/icons-material";
toast.configure();

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const PurchaseReturnsAdd = (props) => {
  let { id } = useParams();
  let dispatch = useDispatch();
  const navigate = useHistory();
  const [selectedProductData, setSelectedProductData] = useState([
    {
      Quantity: 0,
      selling_price: 0,
      discount: 0,
      product_pricing_details: { tax_options: 0 },
    },
  ]);
  const [params, setParams] = useState({});
  const [mainData, setMainData] = useState({});
  const onAddNewRaw = () => {
    setSelectedProductData([...selectedProductData, {}]);
  };
  const {
    productData,
    uomData,
    currency,
    Vendorsdata,
    selectPaymentTerms,
    purchaseReturnsViewdata,
    purchaseOrdersList,
    SourceDocumentTypesData,
    purchaseView,
    Salesdata,
    SalesViewdata,
    purchaseReturnsdata,
    salesReturnList,
    salesReturnView,
  } = useSelector((state) => state.data);

  const [paymentDetailsFields, setPaymentDetailsFields] = useState({
    subTotal: 0,
    tax: 0,
    shippingCharge: 0,
    adjustment_text: "",
    Final_Adjustment: "",
    adjustment_amount: 0,
    vender_credits: 10,
    total: 0,
    totalBeforeAdjustment: 0,
  });

  useEffect(() => {
    dispatch(
      loadSalesData({ limit: 100, offset: 1, filters: null, sort: null })
    );
    dispatch(loadVendorsData());
    dispatch(loadUOMData());
    dispatch(loadCurrencyData());
    dispatch(loadSOURCE_DOCUMENTData());
    dispatch(loadProductsListData());
    dispatch(loadPaymentTerms());
    dispatch(loadpurchaseOrders());
    if (props && props.id) {
      dispatch(loadPurchaseReturnsDataView(id));
      dispatch(loadPurchaseReturnsData())
    }
  }, []);

  useEffect(() => {
    console.log("in rETURNS", mainData?.Link_Source_Document_Type?.lookup_code);
    dispatch(loadPurchaseReturnsData())
    if (
      (props && props.id && purchaseReturnsViewdata) ||
      (purchaseReturnsViewdata &&
        (mainData?.Link_Source_Document_Type?.lookup_code ==
          "PURCHASE_RETURS" ||
          mainData?.Link_Source_Document_Type?.lookup_code ==
          "PURCHASE_RETURNS"))
    ) {
      var newMainData = [];
      var newPRDetailsFields = PRDetailsFields.map((o) => {
        console.log(mainData, "mainData?.Link_Source_Document in edit")
        if (o.key == "purchase_return_number")
          o.value = purchaseReturnsViewdata?.purchase_return_number;
        if (o.key == "Link_Source_Document_Type" && id === undefined) o.value = { selected_id: 467, label: 'Purchase Returns', lookup_code: 'PURCHASE_RETURNS' }
        else if (o.key == "Link_Source_Document_Type" && id !== undefined) o.value = { id: purchaseReturnsViewdata?.source_document?.ID, label: purchaseReturnsViewdata?.source_document?.display_name, lookup_code: purchaseReturnsViewdata?.source_document?.lookup_code };
        if (o.key == "Link_Source_Document" && id !== undefined) {
          console.log('sdjkcbsmzd', purchaseReturnsViewdata.source_documents)
          o.value =
            purchaseReturnsViewdata && ((purchaseReturnsViewdata.source_document?.lookup_code == 'PURCHASE_RETURS') || (purchaseReturnsViewdata.source_document?.lookup_code == 'PURCHASE_RETURNS')) ? { id: purchaseReturnsViewdata?.source_documents?.id, label: purchaseReturnsViewdata?.source_documents?.purchase_return_number, data: purchaseReturnsViewdata?.source_documents }
              : purchaseReturnsViewdata && ((purchaseReturnsViewdata.source_document?.lookup_code == 'SALES_RETURS') || (purchaseReturnsViewdata.source_document?.lookup_code == 'SALES_RETURNS')) ? { id: purchaseReturnsViewdata?.source_documents?.id, label: purchaseReturnsViewdata?.source_documents?.sales_return_number, data: purchaseReturnsViewdata?.source_documents }
                : purchaseReturnsViewdata && purchaseReturnsViewdata.source_document?.lookup_code == 'SALES_ORDERS' ? { id: purchaseReturnsViewdata?.source_documents?.id, label: purchaseReturnsViewdata?.source_documents?.sales_order_number, data: purchaseReturnsViewdata?.source_documents }
                  : purchaseReturnsViewdata && purchaseReturnsViewdata.source_document?.lookup_code == 'PURCHASE_ORDERS' ? { id: purchaseReturnsViewdata?.source_documents?.id, label: purchaseReturnsViewdata?.source_documents?.purchase_order_number, data: purchaseReturnsViewdata?.source_documents }
                    : null
        }

        if (o.key == "reference_number")
          o.value = purchaseReturnsViewdata?.reference_number;
        if (o.key == "pr_date")
          o.value = moment(purchaseReturnsViewdata?.pr_date).format(
            "YYYY-MM-DD"
          );
        if (o.key == "po_currency_id")
          o.value = {
            id: purchaseReturnsViewdata?.currency?.id,
            label: purchaseReturnsViewdata?.currency?.name,
          };
        if (o.key == "expected_delivery_date")
          o.value = moment(
            purchaseReturnsViewdata?.expected_delivery_date
          ).format("YYYY-MM-DD");
        return o;
      });
      console.log('673257527', newPRDetailsFields)
      setPRDetailsFields(newPRDetailsFields);
      var nweselectedProductData = [];
      if (purchaseReturnsViewdata.purchase_return_lines)
        nweselectedProductData =
          purchaseReturnsViewdata.purchase_return_lines.map((o) => {
            return {
              id: o.product_id,
              sku_id: { id: o?.product_id, label: o?.product_details?.sku_id },
              product_template_id: o.product_template_id,
              description: o?.description,
              product_name: o?.product_details?.product_name,
              quantity_purchased: o?.quantity_purchased,
              Quantity: o?.quantity_returned,
              location_id: o?.location_id,
              inventory_id: o?.inventory_id,
              uom: { name: { id: o.uom_id, label: o.uom?.name } },
              serial_number: o?.serial_number,
              selling_price: o?.rate,
              discount: o?.discount,
              discount_format: o?.discount_format,
              product_pricing_details: { tax_options: parseFloat(o.tax) },
              tax_format: o?.tax_format,
              Amount: o.amount,
            };
          });
      setSelectedProductData(nweselectedProductData);

      var newPaymentDetails = PaymentDetails.map((o) => {
        if (o.key == "payment_terms_id")
          o.value = o.value = {
            id: purchaseReturnsViewdata?.payment_terms?.ID,
            label: purchaseReturnsViewdata?.payment_terms?.display_name,
          };
        if (o.key == "pickup_time")
          o.value = moment(purchaseReturnsViewdata?.payment_due_date).format(
            "YYYY-MM-DD"
          );
        if (o.key == "currency_id")
          o.value = {
            id: purchaseReturnsViewdata?.currency?.id,
            label: purchaseReturnsViewdata?.currency?.name,
          };
        return o;
      });
      setPaymentDetails(newPaymentDetails);


      var newAdditionalInfo = AdditionalInfo;
      newAdditionalInfo.find((o) => o.key == "notes").value =
        purchaseReturnsViewdata.additional_information?.notes;
      newAdditionalInfo.find((o) => o.key == "terms_and_conditions").value =
        purchaseReturnsViewdata.additional_information?.terms_and_conditions;
      setAdditionalInfo(newAdditionalInfo);
      if (
        purchaseReturnsViewdata &&
        purchaseReturnsViewdata.pr_payment_details
      ) {
        setPaymentDetailsFields({
          ...paymentDetailsFields,
          subTotal: purchaseReturnsViewdata.pr_payment_details.sub_total,
          adjustment_amount:
            purchaseReturnsViewdata.pr_payment_details.adjustment_amount,
          tax: purchaseReturnsViewdata.tax,
          shippingCharge: parseFloat(
            purchaseReturnsViewdata.pr_payment_details?.shipping_charge
          ),
          vender_credits:
            purchaseReturnsViewdata.pr_payment_details.vendor_Credits,
          total: purchaseReturnsViewdata.pr_payment_details.total_amount,
        });
      }
      var newVendorDetailsFields = [];
      if (purchaseReturnsViewdata?.vendor_details) {
        fetchVendorDetails("vendor_contact", {
          id: purchaseReturnsViewdata?.vendor_details?.vendor_id,
          label: purchaseReturnsViewdata?.vendor_details?.vendor_contact,
        });
        newVendorDetailsFields = VendorDetailsFields.map((o) => {
          if (o.key == "vendor_contact")
            o.value = {
              id: purchaseReturnsViewdata?.vendor_details?.vendor_id,
              label: purchaseReturnsViewdata?.vendor_details?.vendor_contact,
            };
          if (o?.key == "Delivery_Location_card") {
            console.log(
              purchaseReturnsViewdata?.vendor_details?.vendor_locations
                ?.vendor_billing_address?.location_name,
              "purchaseReturnsViewdata?.vendor_details?.vendor_billing_address?.location_name"
            );
            o.value = [
              {
                label: "Location Name",
                type: "label",
                key: "delivery_Location",
                value:
                  purchaseReturnsViewdata?.vendor_details?.vendor_locations
                    ?.vendor_billing_address?.location_name,
              },
              {
                label: "Pickup Address",
                type: "label",
                key: "delivery_pickup_address",
                value: `${purchaseReturnsViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.address_line_1} ${purchaseReturnsViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.address_line_2}`,
              },
              {
                label: "Location Incharge",
                type: "label",
                key: "delivery_location_incharge",
                value:
                  purchaseReturnsViewdata?.vendor_details?.vendor_locations
                    ?.vendor_billing_address?.contact_person_name,
              },
            ];
          }
          if (o?.key == "Shipping_Location_card") {
            console.log(
              purchaseReturnsViewdata?.vendor_details?.vendor_locations
                ?.vendor_shipping_address?.location_name,
              "purchaseReturnsViewdata?.vendor_details?.vendor_billing_address?.location_name"
            );
            o.value = [
              {
                label: "Location Name",
                type: "label",
                key: "delivery_Location",
                value:
                  purchaseReturnsViewdata?.vendor_details?.vendor_locations
                    ?.vendor_shipping_address?.location_name,
              },
              {
                label: "Pickup Address",
                type: "label",
                key: "delivery_pickup_address",
                value: `${purchaseReturnsViewdata?.vendor_details?.vendor_locations?.vendor_shipping_address?.address_line_1} ${purchaseReturnsViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.address_line_2}`,
              },
              {
                label: "Location Incharge",
                type: "label",
                key: "delivery_location_incharge",
                value:
                  purchaseReturnsViewdata?.vendor_details?.vendor_locations
                    ?.vendor_shipping_address?.contact_person_name,
              },
            ];
          }
          return o;
        });

        setVendorDetailsFields(newVendorDetailsFields);
      }


      var newPickingTimings = PickingTimings.map((o) => {
        if (o.key == "pickup_date")
          o.value = moment(
            purchaseReturnsViewdata?.pickup_date_and_time?.pickup_date
          ).format("YYYY-MM-DD");

        if (o.key == "Schedule_Pickup_time")
          o.value = o.value.map((p) => {
            if (p.key == "Schedule_Pickup_time_from")
              p.value = moment(
                purchaseReturnsViewdata?.pickup_date_and_time?.pickup_from_time
              );
            if (p.key == "Schedule_Pickup_time_to")
              p.value = moment(
                purchaseReturnsViewdata?.pickup_date_and_time?.pickup_to_time
              );
            return p;
          });
        return o;
      });
      setPickingTimings(newPickingTimings);

      console.log(purchaseReturnsViewdata?.pr_payment_details?.vendor_Credits,"purchaseReturnsViewdata?.pr_payment_details")
      setPaymentDetailsFields({...paymentDetailsFields, subTotal:purchaseReturnsViewdata?.pr_payment_details?.sub_total, adjustment_amount:purchaseReturnsViewdata?.pr_payment_details?.adjustments, tax:purchaseReturnsViewdata?.pr_payment_details?.tax, shippingCharge:parseFloat(purchaseReturnsViewdata?.pr_payment_details?.shipping_charges), vender_credits:purchaseReturnsViewdata?.pr_payment_details?.vendor_Credits, total:purchaseReturnsViewdata?.pr_payment_details?.total_amount})

      newMainData = [
        ...newPRDetailsFields,
        ...newVendorDetailsFields,
        ...nweselectedProductData,
        ...newPaymentDetails,
        ...newAdditionalInfo,
        ...newPickingTimings
      ];

      var keyValuePairMainData = {};
      var keyValuePairMainData = { "newEstimated_Cost": 0, "Estimated_Cost_Select": purchaseReturnsViewdata.shipping_carrier_id };

      newMainData.map((o) => {
        if (o.key == "Schedule_Pickup_time") {
          o.value.map((p) => {
            keyValuePairMainData[p.key] = p.value;
          });
        }
        if (
          o.key == "pr_date" ||
          o.key == "expected_delivery_date" ||
          o.key == "pickup_date"
        ) {
          var value1 = new Date(o.value);
          keyValuePairMainData[o.key] = value1.toISOString();
        } else if (o.key != null) {
          if (o.key == "vendor_contact") {
            keyValuePairMainData[o.key] = {
              id: purchaseReturnsViewdata?.vendor_details?.vendor_id,
              label: purchaseReturnsViewdata?.vendor_details?.vendor_contact,
            };
          } else {
            keyValuePairMainData[o.key] = o?.value;
          }
        }
      });
      setMainData(keyValuePairMainData);
    }
  }, [purchaseReturnsViewdata]);

  useEffect(()=>{
    console.log(paymentDetailsFields,"paymentDetailsFields")
  },[paymentDetailsFields])

  useEffect(() => {
    console.log("value Changed");
    if (
      SalesViewdata &&
      mainData &&
      PRDetailsFields &&
      PickingTimings &&
      mainData?.Link_Source_Document_Type?.lookup_code == "SALES_ORDERS"
    ) {
      console.log("value Changed");
      var newMainData = [];
      var newPRDetailsFields = PRDetailsFields?.map((o) => {
        if (o?.key === "reference_number")
          o.value = SalesViewdata?.reference_number;
        if (o?.key == "pr_date")
          o.value = moment(SalesViewdata?.so_date).format("YYYY-MM-DD");
        if (o?.key == "po_currency_id")
          o.value = {
            id: SalesViewdata?.currency?.id,
            label: SalesViewdata?.currency?.name,
          };

        // if(o?.key == "expected_delivery_date") moment(SalesViewdata?.expected_shipping_date).format("YYYY-MM-DD");
        return o;
      });
      setPRDetailsFields(newPRDetailsFields);

      var newPaymentDetails = PaymentDetails?.map((o) => {
        if (o?.key == "payment_terms_id")
          o.value = {
            id: SalesViewdata?.payment_terms?.ID,
            label: SalesViewdata?.payment_terms?.display_name,
          };
        if (o?.key == "pickup_time")
          o.value = moment(SalesViewdata?.payment_due_date).format(
            "YYYY-MM-DD"
          );
        if (o?.key == "currency_id")
          o.value = {
            id: SalesViewdata?.currency?.id,
            label: SalesViewdata?.currency?.name,
          };
        return o;
      });
      setPaymentDetails(newPaymentDetails);

      setPaymentDetailsFields({
        ...paymentDetailsFields,
        vender_credits:
          SalesViewdata.so_payment_details.available_customer_credits,
        shippingcharges: SalesViewdata.so_payment_details.shipping_charges,
        Final_Adjustment: SalesViewdata.so_payment_details.adjustment_amount,
      });

      var newAdditionalInfo = AdditionalInfo?.map((o) => {
        if (o?.key == "notes")
          o.value = SalesViewdata?.additional_information?.notes;
        if (o?.key == "terms_and_conditions")
          o.value = SalesViewdata?.additional_information?.terms_and_conditions;
        return o;
      });
      setAdditionalInfo(newAdditionalInfo);

      var newVendorDetailsFields = [];
      if (VendorDetailsFields?.vendor_details?.vendor_id) {
        newVendorDetailsFields = VendorDetailsFields?.map((o) => {
          if (o?.key == "vendor_contact")
            o.value = {
              label: SalesViewdata?.vendor_details?.vendor_contact,
              id: SalesViewdata?.vendor_details?.id,
            };
          // if(o?.key=="vendor_id") o.value=;
          if (o?.key == "Delivery_Location_card") {
            console.log(
              SalesViewdata?.vendor_details?.vendor_locations
                ?.vendor_billing_address?.location_name,
              "SalesViewdata?.vendor_details?.vendor_billing_address?.location_name"
            );
            o.value = [
              {
                label: "Location Name",
                type: "label",
                key: "delivery_Location",
                value:
                  SalesViewdata?.vendor_details?.vendor_locations
                    ?.vendor_billing_address?.location_name,
              },
              {
                label: "Pickup Address",
                type: "label",
                key: "delivery_pickup_address",
                value: `${SalesViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.address_line_1} ${SalesViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.address_line_2}`,
              },
              {
                label: "Location Incharge",
                type: "label",
                key: "delivery_location_incharge",
                value:
                  SalesViewdata?.vendor_details?.vendor_locations
                    ?.vendor_billing_address?.contact_person_name,
              },
            ];
          }

          if (o?.key == "Shipping_Location_card") {
            console.log(
              SalesViewdata?.vendor_details?.vendor_locations
                ?.vendor_shipping_address?.location_name,
              "SalesViewdata?.vendor_details?.vendor_billing_address?.location_name"
            );
            o.value = [
              {
                label: "Location Name",
                type: "label",
                key: "delivery_Location",
                value:
                  SalesViewdata?.vendor_details?.vendor_locations
                    ?.vendor_shipping_address?.location_name,
              },
              {
                label: "Pickup Address",
                type: "label",
                key: "delivery_pickup_address",
                value: `${SalesViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.address_line_1} ${SalesViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.address_line_2}`,
              },
              {
                label: "Location Incharge",
                type: "label",
                key: "delivery_location_incharge",
                value:
                  SalesViewdata?.vendor_details?.vendor_locations
                    ?.vendor_shipping_address?.contact_person_name,
              },
            ];
          }

          // if(o?.key=="Shipping_Location_card") o.value="";
          if (o?.key == "Vendor_Delivery_Charges")
            o.value = SalesViewdata?.vendor_details?.vendor_delivery_charges;

          return o;
        });
        setVendorDetailsFields(newVendorDetailsFields);
      }
      //# start
      var nweselectedProductData = [];
      if (SalesViewdata.sales_order_lines)
        nweselectedProductData = SalesViewdata.sales_order_lines.map((o) => {
          console.log(
            { id: o.product_details.id, label: o.product_details.sku_id },
            "product Data"
          );
          return {
            sku_id: {
              id: o.product_details.id,
              label: o.product_details.sku_id
            },
            product_name: o.product_details.product_name,
            description: { data: o?.product_details?.description },
            uom: { name: { id: o?.uom?.id, label: o?.uom?.name } },
            serial_number: o.serial_number,
            quantity_purchased: parseInt(o.quantity),
            serial_number: o?.serial_number,
            selling_price: parseFloat(o.price),
            Quantity: parseInt(o.quantity),
            discount: parseFloat(o.discount),
            product_pricing_details: { tax_options: o.tax },
            Amount: parseInt(o?.amount),
            tax_format: "Percentage",
            discount_format: "Percentage"
          };
        });
      setSelectedProductData(nweselectedProductData);
      //# END

      VendorDetailsFields?.vendor_details?.vendor_id
      newMainData = [
        ...newPRDetailsFields,
        ...newPaymentDetails,
        ...newAdditionalInfo,
        ...newVendorDetailsFields,
      ];
      var keyValuePairMainData = {
        newEstimated_Cost: 0,
        Estimated_Cost_Select: purchaseReturnsViewdata?.shipping_carrier_id,
      };
      newMainData.map((o) => {

        if (o.key == "Schedule_Pickup_time") {
          o.value.map((p) => {
            keyValuePairMainData[p.key] = p.value;
          });
        } else if (o.key != null) {

          keyValuePairMainData[o.key] = o.value;
        }
      });
      setMainData(keyValuePairMainData);
    }
    calulate_total();
  }, [SalesViewdata]);

  // ___________________________________________________________________________
  useEffect(() => {
    console.log("value Changed");
    if (
      purchaseView &&
      mainData &&
      PRDetailsFields &&
      PickingTimings &&
      mainData?.Link_Source_Document_Type?.lookup_code == "PURCHASE_ORDERS"
    ) {
      console.log("value Changed ");
      var newMainData = [];
      var newPRDetailsFields = PRDetailsFields?.map((o) => {
        if (o?.key === "reference_number")
          o.value = purchaseView?.reference_number;
        if (o?.key == "pr_date")
          o.value = moment(purchaseView?.date_and_time).format("YYYY-MM-DD");
        if (o?.key == "po_currency_id")
          o.value = {
            id: purchaseView?.currency?.id,
            label: purchaseView?.currency?.name,
          };
        if (o?.key == "expected_delivery_date") o.value = moment(purchaseView?.expected_shipping_date).format("YYYY-MM-DD");
        return o;
      });
      setPRDetailsFields(newPRDetailsFields);

      //# start
      var newselectedProductData = [];
      if (purchaseView.purchase_order_lines)
        newselectedProductData = purchaseView.purchase_order_lines.map((o) => {
          console.log(
            { id: o.product_details.id, label: o.product_details.sku_id },
            "product Data"
          );
          return {
            sku_id: {
              id: o.product_details.id,
              label: o.product_details.sku_id,
            },
            product_name: o.product_details.product_name,
            description: { data: o?.product_details?.description },
            uom: { name: { id: o?.uom?.id, label: o?.uom?.name } },
            serial_number: o.serial_number,
            quantity_purchased: parseInt(o.quantity),
            serial_number: o?.serial_number,
            selling_price: parseFloat(o.price),
            Quantity: parseInt(o.quantity),
            discount: parseFloat(o.discount),
            product_pricing_details: { tax_options: o.tax },
            Amount: parseInt(o?.amount),
          };
        });
      setSelectedProductData(newselectedProductData);
      //# END

      var newPaymentDetails = PaymentDetails?.map((o) => {
        if (o?.key == "payment_terms_id")
          o.value = {
            id: purchaseView?.payment_terms?.ID,
            label: purchaseView?.payment_terms?.display_name,
          };
        if (o?.key == "pickup_time")
          o.value = moment(purchaseView?.payment_due_date).format(
            "YYYY-MM-DD"
          );
        if (o?.key == "currency_id")
          o.value = {
            id: purchaseView?.currency?.id,
            label: purchaseView?.currency?.name,
          };
        return o;
      });
      setPaymentDetails(newPaymentDetails);
      setPaymentDetailsFields({
        ...paymentDetailsFields,
        vender_credits:
          purchaseView.po_payment_details.available_customer_credits,
        shippingcharges: purchaseView.po_payment_details.shipping_charges,
        Final_Adjustment: purchaseView.po_payment_details.adjustment_amount,
      });


      var newAdditionalInfo = AdditionalInfo?.map((o) => {
        if (o?.key == "notes")
          o.value = purchaseView?.additional_information?.notes;
        if (o?.key == "terms_and_conditions")
          o.value = purchaseView?.additional_information?.terms_and_conditions;
        return o;
      });
      setAdditionalInfo(newAdditionalInfo);



      // var newVendorDetailsFields = VendorDetailsFields?.map((o) => {
      // if (o?.key == "vendor_contact")
      // o.value = {
      // label: purchaseView?.vendor_details?.vendor_contact,
      // id: purchaseView?.vendor_details?.id,
      // };
      // if (o?.key == "Delivery_Location_card") {
      // console.log(
      // purchaseView?.vendor_details?.vendor_locations
      // ?.vendor_billing_address?.location_name,
      // "SalesViewdata?.vendor_details?.vendor_billing_address?.location_name"
      // );
      // o.value = [
      // {
      // label: "Location Name",
      // type: "label",
      // key: "delivery_Location",
      // value:
      // purchaseView?.vendor_details?.vendor_locations
      // ?.vendor_billing_address?.location_name,
      // },
      // {
      // label: "Pickup Address",
      // type: "label",
      // key: "delivery_pickup_address",
      // value: `${purchaseView?.vendor_details?.vendor_locations?.vendor_billing_address?.address_line_1} ${purchaseView?.vendor_details?.vendor_locations?.vendor_billing_address?.address_line_2}`,
      // },
      // {
      // label: "Location Incharge",
      // type: "label",
      // key: "delivery_location_incharge",
      // value:
      // purchaseView?.vendor_details?.vendor_locations
      // ?.vendor_billing_address?.contact_person_name,
      // },
      // ];
      // }

      // if (o?.key == "Shipping_Location_card") {
      // console.log(
      // purchaseView?.vendor_details?.vendor_locations
      // ?.vendor_shipping_address?.location_name,
      // "SalesViewdata?.vendor_details?.vendor_billing_address?.location_name"
      // );
      // o.value = [
      // {
      // label: "Location Name",
      // type: "label",
      // key: "delivery_Location",
      // value:
      // purchaseView?.vendor_details?.vendor_locations
      // ?.vendor_shipping_address?.location_name,
      // },
      // {
      // label: "Pickup Address",
      // type: "label",
      // key: "delivery_pickup_address",
      // value: `${purchaseView?.vendor_details?.vendor_locations?.vendor_shipping_address?.address_line_1} ${purchaseView?.vendor_details?.vendor_locations?.vendor_shipping_address?.address_line_2}`,
      // },
      // {
      // label: "Location Incharge",
      // type: "label",
      // key: "delivery_location_incharge",
      // value:
      // purchaseView?.vendor_details?.vendor_locations
      // ?.vendor_shipping_address?.contact_person_name,
      // },
      // ];
      // }

      // if (o?.key == "Vendor_Delivery_Charges")
      // o.value = purchaseView?.po_payment_details?.available_vendor_credits;

      // return o;
      // });
      // setVendorDetailsFields(newVendorDetailsFields);

      newMainData = [
        ...newPRDetailsFields,
        ...newPaymentDetails,
        ...newAdditionalInfo,
        // ...newVendorDetailsFields,
      ];
      var keyValuePairMainData = {
        newEstimated_Cost: 0,
        Estimated_Cost_Select: purchaseView?.shipping_carrier_id,
      };
      newMainData.map((o) => {
        if (o.key == "Schedule_Pickup_time") {
          o.value.map((p) => {
            keyValuePairMainData[p.key] = p.value;
          });
        } else if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      setMainData(keyValuePairMainData);
    }
    // calulate_total();
  }, [purchaseView]);

  useEffect(() => {
    if (
      (props && props.id && salesReturnView) ||
      (salesReturnView &&
        (mainData?.Link_Source_Document_Type?.lookup_code ==
          "SALES_RETURS" ||
          mainData?.Link_Source_Document_Type?.lookup_code ==
          "SALES_RETURNS"))
    ) {
      var newMainData = [];
      var newPRDetailsFields = PRDetailsFields.map((o) => {
        if (o.key == "purchase_return_number")
          o.value = salesReturnView?.purchase_return_number;
        if (o.key == "Link_Source_Document_Type") {
          if (mainData?.Link_Source_Document)
            o.value = {
              label: "Sales Returns",
              lookup_code: "SALES_RETURS",
              selected_id: 211
            }
        }
        if (o.key == "Link_Source_Document" && id)
          o.value = salesReturnView?.link_document;
        if (o.key == "reference_number")
          o.value = salesReturnView?.reference_number;
        if (o.key == "pr_date")
          o.value = moment(salesReturnView?.pr_date).format(
            "YYYY-MM-DD"
          );
        if (o.key == "po_currency_id")
          o.value = {
            id: salesReturnView?.currency?.id,
            label: salesReturnView?.currency?.name,
          };
        if (o.key == "expected_delivery_date")
          o.value = moment(
            salesReturnView?.expected_delivery_date
          ).format("YYYY-MM-DD");
        return o;
      });
      setPRDetailsFields(newPRDetailsFields);

      var nweselectedProductData = [];
      if (salesReturnView?.sales_order?.sales_order_lines)
        nweselectedProductData =
          salesReturnView?.sales_return_lines.map((o) => {
            return {
              id: o.product_id,
              sku_id: { id: o?.product_id, label: o?.product_details?.sku_id },
              product_template_id: o.product_template_id,
              description: o?.description,
              product_name: o?.product_details?.product_name,
              quantity_purchased: o?.quantity_purchased,
              Quantity: o?.quantity_returned,
              location_id: o?.location_id,
              inventory_id: o?.inventory_id,
              uom: { name: { id: o.uom_id, label: o.uom?.name } },
              serial_number: o?.serial_number,
              selling_price: o?.rate,
              discount: o?.discount,
              discount_format: o?.discount_format,
              product_pricing_details: { tax_options: parseFloat(o.tax) },
              tax_format: o?.tax_format,
              Amount: o.amount,
            };
          });
      setSelectedProductData(nweselectedProductData);

      var newPaymentDetails = PaymentDetails.map((o) => {
        if (o.key == "payment_terms_id")
          o.value = o.value = {
            id: salesReturnView?.sales_order?.payment_terms?.ID,
            label: salesReturnView?.sales_order?.payment_terms?.display_name,
          };
        if (o.key == "pickup_time")
          o.value = moment(salesReturnView?.sales_order?.payment_due_date).format(
            "YYYY-MM-DD"
          );
        if (o.key == "currency_id")
          o.value = {
            id: salesReturnView?.currency?.id,
            label: salesReturnView?.currency?.name,
          };
        return o;
      });
      setPaymentDetails(newPaymentDetails);

      // var newPickingTimings = PickingTimings.map((o) => {
      // if (o.key == "pickup_date")
      // o.value = moment(
      // salesReturnView?.pickup_date_and_time?.pickup_date
      // ).format("YYYY-MM-DD");
      // if (o.key == "Schedule_Pickup_time")
      // o.value = o.value.map((p) => {
      // if (p.key == "Schedule_Pickup_time_from")
      // p.value = moment(
      // salesReturnView?.pickup_date_and_time?.pickup_from_time
      // );
      // if (p.key == "Schedule_Pickup_time_to")
      // p.value = moment(
      // salesReturnView?.pickup_date_and_time?.pickup_to_time
      // );
      // return p;
      // });
      // return o;
      // });
      // setPickingTimings(newPickingTimings);

      var newAdditionalInfo = AdditionalInfo;
      newAdditionalInfo.find((o) => o.key == "notes").value =
        salesReturnView.additional_information?.notes;
      newAdditionalInfo.find((o) => o.key == "terms_and_conditions").value =
        salesReturnView.additional_information?.terms_and_conditions;
      setAdditionalInfo(newAdditionalInfo);

      if (
        salesReturnView &&
        salesReturnView.sr_payment_details
      ) {
        setPaymentDetailsFields({
          ...paymentDetailsFields,
          subTotal: salesReturnView.sr_payment_details.sub_total,
          adjustment_amount:
            salesReturnView.sr_payment_details.adjustment,
          tax: salesReturnView.tax,
          shippingCharge: parseFloat(
            salesReturnView.sr_payment_details?.shipping_charge
          ),
          vender_credits:
            salesReturnView?.sales_order?.so_payment_details?.sales_order,
          total: salesReturnView.sr_payment_details.total_amount,
        });
      }
      var newVendorDetailsFields = [];
      if (salesReturnView?.sales_order?.vendor_details?.vendor_id) {
        newVendorDetailsFields = VendorDetailsFields.map((o) => {
          if (o.key == "vendor_contact")
            o.value = {
              id: salesReturnView?.sales_order?.vendor_details?.vendor_id,
              label: salesReturnView?.sales_order?.vendor_details?.vendor_contact,
            };
          if (o?.key == "Delivery_Location_card") {
            console.log(
              salesReturnView.sales_order.vendor_details.vendor_credits,
              "sample"
            );
            o.value = [
              {
                label: "Location Name",
                type: "label",
                key: "delivery_Location",
                value:
                  salesReturnView?.sales_order?.vendor_details?.vendor_locations
                    ?.vendor_billing_address?.location_name,
              },
              {
                label: "Pickup Address",
                type: "label",
                key: "delivery_pickup_address",
                value: `${salesReturnView?.sales_order?.vendor_details?.vendor_locations?.vendor_billing_address?.address_line_1} ${salesReturnView?.sales_order?.vendor_details?.vendor_locations?.vendor_billing_address?.address_line_2}`,
              },
              {
                label: "Location Incharge",
                type: "label",
                key: "delivery_location_incharge",
                value:
                  salesReturnView?.sales_order?.vendor_details?.vendor_locations
                    ?.vendor_billing_address?.contact_person_name,
              },
            ];
          }
          if (o?.key == "Shipping_Location_card") {
            console.log(
              salesReturnView?.sales_order?.vendor_details?.vendor_locations
                ?.vendor_shipping_address?.location_name,
              "purchaseReturnsViewdata?.vendor_details?.vendor_billing_address?.location_name"
            );
            o.value = [
              {
                label: "Location Name",
                type: "label",
                key: "delivery_Location",
                value:
                  salesReturnView?.sales_order?.vendor_details?.vendor_locations
                    ?.vendor_shipping_address?.location_name,
              },
              {
                label: "Pickup Address",
                type: "label",
                key: "delivery_pickup_address",
                value: `${salesReturnView?.sales_order?.vendor_details?.vendor_locations?.vendor_shipping_address?.address_line_1} ${purchaseReturnsViewdata?.vendor_details?.vendor_locations?.vendor_billing_address?.address_line_2}`,
              },
              {
                label: "Location Incharge",
                type: "label",
                key: "delivery_location_incharge",
                value:
                  salesReturnView?.sales_order?.vendor_details?.vendor_locations
                    ?.vendor_shipping_address?.contact_person_name,
              },
            ];
          }
          return o;
        });

        setVendorDetailsFields(newVendorDetailsFields);
      }

      // setPaymentDetailsFields({...paymentDetailsFields, subTotal:Deliverydata.payment_details.sub_total, adjustment_amount:Deliverydata.payment_details.adjustment_amount, tax:Deliverydata.delivery_order_lines[0].tax, "shippingCharge":parseFloat(Deliverydata.payment_details?.shipping_charge), vender_credits:Deliverydata.payment_details.vender_credits, total:Deliverydata.payment_details.total_amount})

      newMainData = [
        ...newPRDetailsFields,
        ...newVendorDetailsFields,
        ...nweselectedProductData,
        ...newPaymentDetails,
        // ...newPickingTimings,
        ...newAdditionalInfo,
      ];
      var keyValuePairMainData = {};
      var keyValuePairMainData = { "newEstimated_Cost": 0, "Estimated_Cost_Select": purchaseReturnsViewdata.shipping_carrier_id };

      newMainData.map((o) => {
        if (o.key == "Schedule_Pickup_time") {
          o.value.map((p) => {
            keyValuePairMainData[p.key] = p.value;
          });
        }
        if (
          o.key == "pr_date" ||
          o.key == "expected_delivery_date" ||
          o.key == "pickup_date"
        ) {
          var value1 = new Date(o.value);
          keyValuePairMainData[o.key] = value1.toISOString();
        } else if (o.key != null) {
          if (o.key == "vendor_contact") {
            keyValuePairMainData[o.key] = {
              id: salesReturnView?.vendor_details?.vendor_id,
              label: salesReturnView?.vendor_details?.vendor_contact,
            };
          } else {
            keyValuePairMainData[o.key] =
              o.value;
          }
        }
      });
      setMainData(keyValuePairMainData);
    }
    // calulate_total();
  }, [salesReturnView]);
  // ___________________________________________________________________________

  useEffect(() => {
    if (selectedProductData > 0)
      calulate_total()

  }, [selectedProductData])
  // ___________________________________________________________
  const [PRDetailsFields, setPRDetailsFields] = useState([
    {
      label: "Purchase Return ID",
      type: "input",
      key: "purchase_return_number",
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
      label: "Reference ID",
      type: "input",
      key: "reference_number",
    },
    {
      label: "PR Date",
      type: "date",
      key: "pr_date",
    },
    {
      label: "PO Currency",
      type: "select",
      key: "po_currency_id",
    },
    {
      label: "Expected Delivery",
      type: "date",
      key: "expected_delivery_date",
    },
  ]);
  const [PaymentDetails, setPaymentDetails] = useState([
    {
      label: "Select Payment terms",
      type: "select",
      key: "payment_terms_id",
    },
    {
      label: "Payment Due Date",
      type: "date",
      key: "pickup_time",
    },
    {
      label: "PR Currency",
      type: "select",
      key: "currency_id",
    },
  ]);
  const [PickingTimings, setPickingTimings] = useState([
    {
      label: "Set Pickup Date",
      type: "date",
      key: "pickup_date",
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
          value: "",
        },
        {
          label: "to",
          type: "time",
          key: "Schedule_Pickup_time_to",
          value: "",
        },
      ],
    },
  ]);
  const [AdditionalInfo, setAdditionalInfo] = useState([
    {
      label: "Vendor Notes",
      type: "input",
      key: "notes",
    },
    {
      label: "Terms and Conditions",
      type: "input",
      key: "terms_and_conditions",
    },
  ]);

  const headCells = [
    {
      key: "sku_id",
      label: "Product SKU",
      type: "select",
      data: productData.map((o) => {
        return { id: o.id, label: o.sku_id };
      }),
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
      key: "uom.name",
      label: "Unit Of Measurement",
      type: "select",
      data: uomData.map((o) => {
        return { id: o.id, label: o.name };
      }),
    },
    {
      key: "quantity_purchased",
      label: "Quantity Purchased",
      type: "number",
    },
    {
      key: "location_id",
      label: "Location",
      type: "text",
    },

    {
      key: "serial_number",
      label: "Serial Number Return",
      type: "text",
    },
    {
      key: "Quantity",
      label: "Quantity Returned",
      type: "number",
    },
    {
      key: "selling_price",
      label: "Rate",
      type: "number",
    },
    {
      key: "discount",
      label: "Discount",
      type: "number",
    },

    {
      key: "discount_format",
      label: "Discount Format",
      type: "label",
    },

    {
      key: "product_pricing_details.tax_options",
      label: "Tax",
      type: "number",
    },
    {
      key: "tax_format",
      label: "Tax Format",
      type: "label",
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
            onClick={() =>
              {setSelectedProductData(
                selectedProductData.filter((o) => o.id != item.id)
              );
              console.log(id,item,"idinedit")
              if(id !== null)
                console.log(id,"idineditcheck")
                dispatch(deleteProductLine(id,item.id));
              }
            }
          />
        </div>
      ),
    },
  ];
  const [VendorDetailsFields, setVendorDetailsFields] = useState([
    {
      label: "Vendor Contact",
      type: "select",
      key: "vendor_contact",
    },
    {
      label: " ",
      type: "pre",
      key: "vendor_id",
    },
    {
      label: "Delivery Location",
      type: "card",
      key: "Delivery_Location_card",
      value: [
        {
          label: "Location Name",
          type: "label",
          key: "delivery_Location",
          value: "",
        },
        {
          label: "Pickup Address",
          type: "label",
          key: "delivery_pickup_address",
          value: "",
        },
        {
          label: "Location Incharge",
          type: "label",
          key: "delivery_location_incharge",
          value: "",
        },
      ],
    },
    {
      label: "Vendor Details",
      type: "card",
      key: "Shipping_Location_card",
      value: [
        {
          label: "Location Name",
          type: "label",
          key: "Vendor_Location",
          value: "",
        },
        {
          label: "Pickup Address",
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
      value: "",
    },
  ]);

  const setDataByKeyAndValue = (key, value, index = null) => {
    console.log("key", key, "value", value);
    if (
      key == "Schedule_Pickup_time_from" ||
      key == "Schedule_Pickup_time_to"
    ) {
      var newSchedule_Pickup_date_and_time = PickingTimings.map((o) => {
        if (o.key == "Schedule_Pickup_time")
          o.value.map((p) => {
            if (p.key == key) p.value = new Date(value);
            return p;
          });
        return o;
      });

      setPickingTimings(newSchedule_Pickup_date_and_time);

      var newMainData = mainData;
      if (key == "Schedule_Pickup_time_from")
        newMainData["Schedule_Pickup_time_from_1"] = moment(
          new Date(value)
        ).format("hh:mm A");
      if (key == "Schedule_Pickup_time_to")
        newMainData["Schedule_Pickup_time_to_1"] = moment(
          new Date(value)
        ).format("hh:mm A");
      setMainData(newMainData);
    }
    if (index !== null) {
      try {
        var newSelectedProductData = JSON.parse(
          JSON.stringify(selectedProductData)
        );
        if (key === "sku_id") {
          console.log("sku_id");
          var selectVarient = productData.find((o) => o.id == value.id);
          newSelectedProductData[index] = selectVarient;
          newSelectedProductData[index][key] = value.label;
          newSelectedProductData[index]["discount_format"] = "Percentage";
          newSelectedProductData[index]["tax_format"] = "Percentage";
        } else if (key === "uom.name") {
          console.log("uom.name");
          var selectVarient = uomData.find((o) => o.id == value.id);
          newSelectedProductData[index].uom = {
            name: value.label,
            id: value.id,
          };
        }
        // else if(key == "pr_date" || key == "expected_delivery_date" || key == "pickup_date"){
        // var value1= new Date(value)
        // newSelectedProductData[index][key]= (value1);
        // }
        else {
          if (key == "description.data") {
            newSelectedProductData[index][key.split(".")[0]] = value;
          } else {
            if (key.toString().includes("."))
              newSelectedProductData[index][key.split(".")[0]][
                key.split(".")[1]
              ] = value;
            else newSelectedProductData[index][key] = value;
          }
        }
        setSelectedProductData(newSelectedProductData);

        // calculation
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
        console.log(
          "Total",
          newSelectedProductData
            .map((o) => o.Amount)
            .reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            )
        );
        setSelectedProductData(newSelectedProductData);
        setPaymentDetailsFields({
          ...paymentDetailsFields,
          subTotal: grossTotal,
          tax:
            newSelectedProductData[0]?.product_pricing_details?.tax_options ??
            0,
          total: newSelectedProductData
            ?.map((o) => o.Amount)
            .reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            ),
        });
      } catch (e) {
        console.error("err1", e);
      }
      calulate_total();

    }

    try {
      var newPRDetailsFields = PRDetailsFields.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setPRDetailsFields(newPRDetailsFields);
    } catch (e) {
      console.error("err2", e);
    }

    try {
      var newPaymentDetails = PaymentDetails.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setPaymentDetails(newPaymentDetails);
    } catch (e) {
      console.error("err3", e);
    }

    try {
      var newPickingTimings = PickingTimings.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setPickingTimings(newPickingTimings);
    } catch (e) {
      console.error("err4", e);
    }

    try {
      var newAdditionalInfo = AdditionalInfo.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setAdditionalInfo(newAdditionalInfo);
    } catch (e) {
      console.error("err5", e);
    }

    // try{
    // var newpaymentDetailsFields = paymentDetailsFields
    // .map(o=> {
    // if(o.key==key) o.value=value;
    // return o;})
    // setpaymentDetailsFields(newpaymentDetailsFields)
    // }
    // catch(e){console.error("err1", e)}

    try {
      //"Vendor_Contact", "Vendor_Delivery_Charges","Vendor_Lead_Time"
      var newVendorDetailsFields = VendorDetailsFields.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setVendorDetailsFields(newVendorDetailsFields);
    } catch (e) {
      console.error("err1", e);
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
    // calulate_total();
  };

  const handelInputChange = (key, value, index = null) => {
    console.log("key", key, "value", value, "index", index);
    setDataByKeyAndValue(key, value, index);

    if (index == null) {
      var newMainData = mainData;
      if (
        key == "pr_date" ||
        key == "expected_delivery_date" ||
        key == "pickup_date"
      ) {
        var value1 = new Date(value);
        newMainData[key] = value1.toISOString();
      } else {
        var newMainData = mainData;
        newMainData[key] = value;
      }
      setMainData(newMainData);
    }

    calulate_total();
  };
  function calulate_total() {
    //calculation
    if (selectedProductData) {
      var taxval = selectedProductData[0]?.product_pricing_details?.tax_options;
      setPaymentDetailsFields({ ...paymentDetailsFields, tax: taxval });
      var val1 = selectedProductData
        .map((o) => parseInt(o.Amount))
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

      if (purchaseReturnsViewdata ) {
        setPaymentDetailsFields({
          ...paymentDetailsFields,
          tax: taxval,
          subTotal: parseInt(subTotal),
          total: parseInt(newtotal),
          adjustment_amount:purchaseReturnsViewdata?.pr_payment_details?.adjustments,
          vender_credits:purchaseReturnsViewdata?.pr_payment_details?.vendor_Credits,
        });
        console.log("InELSECON",purchaseReturnsViewdata?.pr_payment_details?.vendor_Credits
        )
      } else 
      {
        setPaymentDetailsFields({
          ...paymentDetailsFields,
          tax: taxval,
          subTotal: parseInt(subTotal),
          total: parseInt(newtotal),
        });}
    }
  }

  const fetchVendorDetails = (key, value) => {
    if (key == "vendor_contact") {
      // setvendorChange(true)
      //dispatch(loadvendorsDataById(value.id));
      var singleVendorsdata = Vendorsdata.find((o) => o.id == value.id);
      var Delivery_Location_card = VendorDetailsFields.find(
        (o) => o.key == "Delivery_Location_card"
      );
      var Shipping_Location_card = VendorDetailsFields.find(
        (o) => o.key == "Shipping_Location_card"
      );

      //var newVendorDetailsFields=VendorDetailsFields.filter(o=>o.key!='Vendor_Details_card');

      Delivery_Location_card.value = [
        {
          label: "Location Name",
          type: "label",
          key: "Vendor_Location",
          value:
            singleVendorsdata &&
            singleVendorsdata.contact &&
            singleVendorsdata.contact.address_details[0] &&
            singleVendorsdata.contact.address_details[0].location_name,
        },

        {
          label: "Pickup Address",
          type: "label",
          key: "Vendor_Location",
          value:
            (singleVendorsdata &&
              singleVendorsdata.contact &&
              singleVendorsdata.contact.address_details &&
              singleVendorsdata.contact.address_details[0].address_line_1) +
            " " +
            (singleVendorsdata &&
              singleVendorsdata.contact &&
              singleVendorsdata.contact.address_details &&
              singleVendorsdata.contact.address_details[0].address_line_2) +
            " " +
            (singleVendorsdata &&
              singleVendorsdata.contact &&
              singleVendorsdata.contact.address_details &&
              singleVendorsdata.contact.address_details[0].address_line_3) +
            " " +
            (singleVendorsdata &&
              singleVendorsdata.contact &&
              singleVendorsdata.contact.address_details &&
              singleVendorsdata.contact.address_details[0].land_mark) +
            " " +
            (singleVendorsdata &&
              singleVendorsdata.contact &&
              singleVendorsdata.contact.address_details &&
              singleVendorsdata.contact.address_details[0].pin_code),
        },
        {
          label: "Location Incharge",
          type: "label",
          key: "Vendor_Location",
          value: singleVendorsdata && singleVendorsdata.name,
        },
      ];

      Shipping_Location_card.value = [
        {
          label: "Location Name",
          type: "label",
          key: "Vendor_Location",
          value:
            singleVendorsdata &&
            singleVendorsdata.contact &&
            singleVendorsdata.contact.address_details[0] &&
            singleVendorsdata.contact.address_details[0].location_name,
        },

        {
          label: "Pickup Address",
          type: "label",
          key: "Vendor_Location",
          value:
            (singleVendorsdata &&
              singleVendorsdata.contact &&
              singleVendorsdata.contact.address_details &&
              singleVendorsdata.contact.address_details[0].address_line_1) +
            " " +
            (singleVendorsdata &&
              singleVendorsdata.contact &&
              singleVendorsdata.contact.address_details &&
              singleVendorsdata.contact.address_details[0].address_line_2) +
            " " +
            (singleVendorsdata &&
              singleVendorsdata.contact &&
              singleVendorsdata.contact.address_details &&
              singleVendorsdata.contact.address_details[0].address_line_3) +
            " " +
            (singleVendorsdata &&
              singleVendorsdata.contact &&
              singleVendorsdata.contact.address_details &&
              singleVendorsdata.contact.address_details[0].land_mark) +
            " " +
            (singleVendorsdata &&
              singleVendorsdata.contact &&
              singleVendorsdata.contact.address_details &&
              singleVendorsdata.contact.address_details[0].pin_code),
        },
        {
          label: "Location Incharge",
          type: "label",
          key: "Vendor_Location",
          value: singleVendorsdata && singleVendorsdata.name,
        },
      ];
      Delivery_Location_card.data = singleVendorsdata;
      Shipping_Location_card.data = singleVendorsdata;

      var sData = VendorDetailsFields.map((o) => {
        if (o.key == "Delivery_Location_card")
          o.value = Delivery_Location_card.value;
        if (o.key == "Shipping_Location_card")
          o.value = Shipping_Location_card.value;
        if (o.key == "vendor_contact") o.value = value;
        return o;
      });
      // console.log('setvendor',sData)
      setVendorDetailsFields(sData);
    }
  };
  const handelSelectonChange = (key, value) => {
    console.log('sdhadgv', key, value)
    if (key == "Link_Source_Document_Type") {
      console.log(value, "valuId?TY");
      if (value.lookup_code == "SALES_ORDERS") {
        dispatch(
          loadSalesData({ limit: 100, offset: 1, filters: null, sort: null })
        );
      }
      if (value.lookup_code == "PURCHASE_ORDERS") {
        dispatch(
          loadpurchaseOrders({
            limit: 100,
            offset: 1,
            filters: null,
            sort: null,
          })
        );
      }
      if (
        value.lookup_code == "PURCHASE_RETURS" ||
        value.lookup_code == "PURCHASE_RETURNS"
      ) {
        dispatch(
          loadPurchaseReturnsData({
            limit: 100,
            offset: 1,
            filters: null,
            sort: null,
          })
        );
      }
      if (
        value.lookup_code == "SALES_RETURS" ||
        value.lookup_code == "SALES_RETURNS"
      ) {
        dispatch(
          loadSalesReturnsData({
            limit: 100,
            offset: 1,
            filters: null,
            sort: null,
          })
        );
      }
    }
    if (key == "Link_Source_Document") {
      // dispatch(loadSalesDataById(value.id));

      if (mainData.Link_Source_Document_Type.lookup_code == "SALES_ORDERS") {
        dispatch(loadSalesDataById(value.id));
      }
      if (
        mainData.Link_Source_Document_Type.lookup_code == "PURCHASE_RETURS" ||
        mainData.Link_Source_Document_Type.lookup_code == "PURCHASE_RETURNS"
      ) {
        dispatch(loadPurchaseReturnsDataView(value.id));
      }
      if (mainData.Link_Source_Document_Type.lookup_code == "PURCHASE_ORDERS") {
        dispatch(loadPurchaseDataById(value.id));
      }
      if (
        mainData.Link_Source_Document_Type.lookup_code == "SALES_RETURS" ||
        mainData.Link_Source_Document_Type.lookup_code == "SALES_RETURNS"
      ) {
        dispatch(loadSalesReturnsDataView(value.id));
      }
    }

    if (key == "vendor_contact") {
      fetchVendorDetails(key, value);
    }
    switch (key) {
      case "po_currency_id": {
        setPRDetailsFields(
          PRDetailsFields.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
      case "currency_id": {
        setPaymentDetails(
          PaymentDetails.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
      case "payment_terms_id": {
        setPaymentDetails(
          PaymentDetails.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
      case "Link_Source_Document": {
        setPRDetailsFields(
          PRDetailsFields.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }

      case "Link_Source_Document_Type": {
        setPRDetailsFields(
          PRDetailsFields.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
    }
    var newMainData = mainData;
    // if (props?.id && id )
    // key == 'Link_Source_Document' ? newMainData[key]= selectPOId : newMainData[key]=value;
    // else
    key == "Link_Source_Document" ? newMainData[key] = value : newMainData[key] = value;
    newMainData[key] = value;
    // newMainData["Link_Source_Document_Type"]=value
    setMainData(newMainData);

    calulate_total();
  };
  useEffect(() => {
    // calulate_total();
    console.log(mainData, selectedProductData, "mainDAtaFromThe")
    
    if (selectedProductData.length >0 )
    calulate_total()
  
  }, [mainData]);
  const handelCheckBoxonChange = (field) => { };
  const setRadioType = (prop, value) => { };
  const handelCheckboxShowForCopyField_valueChange = (field) => { };

  const handleButtonClick = (key) => {
    console.log('hghjbcgjzxh', mainData)
    console.log('selectedProductData', selectedProductData)
    var Delivery_Location_card = VendorDetailsFields.find(
      (o) => o.key == "Delivery_Location_card"
    ).data;
    var Shipping_Location_card = VendorDetailsFields.find(
      (o) => o.key == "Shipping_Location_card"
    ).data;
    // var Delivery_Location_card = VendorDetailsFields.find(o=> o.key=='Delivery_Location_card').data;
    // var Shipping_Location_card = VendorDetailsFields.find(o=> o.key=='Shipping_Location_card').data;

    selectedProductData.map((o) => { });
    console.log("maindata", mainData, selectedProductData);
    if (key == "Cancel") {
      navigate.push("/purchaseReturns");
      return;
    }

    var body = {
      reference_number: mainData.reference_number,
      po_id: mainData?.Link_Source_Document?.id ? mainData?.Link_Source_Document?.id : mainData?.Link_Source_Document?.selected_id ? mainData?.Link_Source_Document?.selected_id : mainData?.Link_Source_Document ? mainData?.Link_Source_Document : 2,
      // purchase_orders: 15 ,
      source_document_id: mainData?.Link_Source_Document_Type?.id ? mainData?.Link_Source_Document_Type?.id : mainData?.Link_Source_Document_Type?.select_id ? mainData?.Link_Source_Document_Type?.select_id : 5,
      source_documents: mainData?.Link_Source_Document?.data ? mainData?.Link_Source_Document?.data : purchaseReturnsViewdata != null ? purchaseReturnsViewdata : salesReturnView != null ? salesReturnView : {},
      payment_due_date: `${moment(mainData?.pickup_time).format("YYYY-MM-DD")}T00:00:00.000Z`,
      pr_date: `${moment(mainData.pr_date).format("YYYY-MM-DD")}T00:00:00.000Z`,
      debit_note_issued_id: 255,
      vendor_details: {
        vendor_contact: mainData.vendor_contact?.label,
        vendor_id: mainData.vendor_contact?.id,
        vendor_delivery_charges: mainData?.Vendor_Delivery_Charges ? mainData.Vendor_Delivery_Charges : "",
        vendor_locations: {
          vendor_shipping_address:
            Delivery_Location_card &&
              Delivery_Location_card.primary_contact &&
              Delivery_Location_card.primary_contact.address_details
              ? Delivery_Location_card.primary_contact.address_details[0]
              : false,
          vendor_billing_address:
            Delivery_Location_card &&
              Delivery_Location_card.primary_contact &&
              Delivery_Location_card.primary_contact.address_details
              ? Delivery_Location_card.primary_contact.address_details[0]
              : false,
        },
        vendor_credits: 0,
      },
      amount: 123.56,
      payment_terms_id: mainData?.payment_terms_id?.id ? mainData?.payment_terms_id?.id : mainData?.payment_terms_id,
      expected_delivery_date: `${moment(mainData.expected_delivery_date).format("YYYY-MM-DD")}T00:00:00.000Z`,
      status_id: 132,
      currency_id: mainData.currency_id?.id ? mainData.currency_id?.id : mainData?.currency_id,
      purchase_return_number: mainData.purchase_return_number,
      pickup_date_and_time: {
        pickup_date: mainData.pickup_date,
        pickup_time_from: mainData.Schedule_Pickup_time_from,
        pickup_time_to: mainData.Schedule_Pickup_time_to,
      },
      additional_information: {
        notes: mainData.notes,
        terms_and_conditions: mainData.terms_and_conditions,
        attachments: {},
      },
      amount: paymentDetailsFields.subTotal,
      debit_note_issued_id: 255,

      pr_payment_details: {
        vendor_credits: 10.5,
        use_credits_for_payment: true,
        sub_total: paymentDetailsFields.subTotal,
        tax: parseFloat(paymentDetailsFields.tax),
        shipping_charges: parseFloat(paymentDetailsFields.shippingCharge),
        adjustments: paymentDetailsFields.adjustment_amount,
        total_amount: paymentDetailsFields.total,
      },
      purchase_return_lines: selectedProductData.map((o) => {
        return {
          product_id: o?.sku_id?.id ? o?.sku_id?.id : o?.id,
          product_template_id: o.product_template_id
            ? o.product_template_id
            : 1,
          uom_id:o.uom && o.uom.name && o.uom.name.id ?o.uom.name.id : o.uom.id,
          // description: o?.description?.data ? o?.description.data : o?.description,
          quantity_purchased: Number(o?.quantity_purchased),
          quantity_returned: Number(o?.Quantity),
          serial_number: o?.serial_number,
          location_id: Number(o.location_id),
          inventory_id: 1,
          discount: Number(o.discount),
          discount_format: o?.discount_format ? o?.discount_format : "Percentage",
          tax: Number(o?.product_pricing_details?.tax_options),
          rate: Number(o.selling_price ? o.selling_price : 0),
          tax_format: o?.tax_format ? o?.tax_format : "Percentage",
          amount: o.Amount,
        };
      }),
    };
    if (props && props.id) {
      dispatch(
        Update_Purchase_Return_Data(props.id, body, function (resp) {
          console.log("update", resp);
          toast(resp);
        })
      );
    } else {
      dispatch(
        Save_Purchase_Return_Data(body, function (resp) {
          console.log("create", resp);
          toast(resp);
        })
      );
    }
    dispatch(loadPurchaseReturnsData())
    navigate.push("/purchaseReturns")
  };

  return (
    <>
      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <AddForm
            header={"Purchase return Details"}
            data={PRDetailsFields.map((field) => {
              switch (field.key) {
                case "po_currency_id": {
                  field.data = currency.map((o) => {
                    return { id: o.id, label: o.name };
                  });
                  break;
                }
                case "Link_Source_Document_Type": {
                  field.data = SourceDocumentTypesData.map((o) => {
                    return {
                      id: o.id,
                      label: o.display_name,
                      lookup_code: o.lookup_code,
                    };
                  });
                  break;
                }
                case "Link_Source_Document": {
                  // field.data= Salesdata.map(o=> {return {id: o.id, label:o.sales_order_number}})
                  field.data =
                    mainData?.Link_Source_Document_Type?.lookup_code ==
                      "SALES_ORDERS"
                      ? Salesdata.map((o) => {
                        return { id: o.id, label: o.sales_order_number, data: o };
                      })
                      : mainData &&
                        mainData.Link_Source_Document_Type &&
                        mainData.Link_Source_Document_Type.lookup_code ==
                        "PURCHASE_ORDERS"
                        ? purchaseOrdersList?.map((o) => {
                          return { id: o.id, label: o.purchase_order_number, data: o };
                        })
                        :
                        (mainData.Link_Source_Document_Type?.lookup_code ==
                          "PURCHASE_RETURS" ||
                          mainData.Link_Source_Document_Type?.lookup_code ==
                          "PURCHASE_RETURNS")
                          ? purchaseReturnsdata?.map((o) => {
                            return {
                              // selected_id: o.id,
                              id: o.id,
                              label: o.purchase_return_number,
                              data: o
                            };
                          })
                          : mainData &&
                            mainData.Link_Source_Document_Type &&
                            (mainData.Link_Source_Document_Type.lookup_code ==
                              "SALES_RETURS" ||
                              mainData.Link_Source_Document_Type.lookup_code ==
                              "SALES_RETURNS")
                            ? salesReturnList?.map((o) => {
                              return { id: o?.id, label: o?.sales_return_number, data: o };
                            })
                            : null;

                  // ))
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

      <AddForm
        header={"Vendor Details"}
        data={VendorDetailsFields?.map((field) => {
          switch (field.key) {
            case "vendor_contact": {
              field.data = Vendorsdata.map((o) => {
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

      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
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
        </RemoteWrapper>
      </Suspense>

      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <AddForm
            header={"Payment Details"}
            data={PaymentDetails.map((field) => {
              switch (field.key) {
                case "payment_terms_id": {
                  field.data = selectPaymentTerms.map((o) => {
                    return { id: o.id, label: o.display_name };
                  });
                  break;
                }

                case "currency_id": {
                  field.data = currency.map((o) => {
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
        </RemoteWrapper>
      </Suspense>

      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <AddForm
            header={"Schedule Date and Time"}
            data={PickingTimings.map((field) => {
              return field;
            })}
            handelInputChange={handelInputChange}
            handelSelectonChange={handelSelectonChange}
            handelCheckBoxonChange={handelCheckBoxonChange}
            setRadioType={setRadioType}
          />
        </RemoteWrapper>
      </Suspense>

      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <AddForm
            header={"Additional Information"}
            data={AdditionalInfo.map((field) => {
              return field;
            })}
            handelInputChange={handelInputChange}
            handelSelectonChange={handelSelectonChange}
            handelCheckBoxonChange={handelCheckBoxonChange}
            setRadioType={setRadioType}
          />
        </RemoteWrapper>
      </Suspense>
      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <AddFormFooter
            header={"Payment Details"}
            subtotal={paymentDetailsFields.subTotal}
            tax={paymentDetailsFields.tax}
            shippingcharges={paymentDetailsFields.shippingCharge}
            handelSelectonChange={handelSelectonChange}
            handelInputChange={handelInputChange}
            total={paymentDetailsFields.total}
            vender_credits={paymentDetailsFields?.vender_credits}
            Final_Adjustment={paymentDetailsFields?.adjustment_amount
            }
          />
        </RemoteWrapper>
      </Suspense>
      <AddFormFooter_Button handleButtonClick={handleButtonClick} />
      <ToastContainer />
    </>
  );
};
export default PurchaseReturnsAdd;

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