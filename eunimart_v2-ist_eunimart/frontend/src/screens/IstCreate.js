import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AddForm from "Remote/AddForm";
import AddForm_Table from "Remote/AddForm_Table";
import AddFormFooter_Button from "Remote/AddFormFooter_Button";
import { fetchProductsData } from "../redux/Action/FetchProductListAction";
import { fetchSourceDocumentData } from "../redux/Action/SourceDocumentTypeAction";
import { SearchSourceDocumentData } from "../redux/Action/SearchSourceDocumentAction";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "@mui/material";
import { fetchUOMDropdown } from "../redux/Action/UOMDropdownAction";
import { fetchLookupsDropdown } from "../redux/Action/LookupsDropdownAction";
import { fetchLookupsRouting } from "../redux/Action/LookupsRoutingAction";
import { fetchLocationsDropdown } from "../redux/Action/LocationDropdownAction";
import { States2 } from "../redux/Action/StatesAction";
import { Countries } from "../redux/Action/CountriesAction";
import { Save_IST_Data } from "../redux/Action/SaveIstData";
import { Update_IST_Data } from "../redux/Action/UpdateIstData";
import { estimatedcost } from "../redux/Action/EstimatedCostAction";
import { loadIstData, loadIstDataById } from "../redux/Action/istListAction";
import {
  loadASNData,
  loadASNDataById,
  loadSalesData,
  loadSalesDataById,
  loadDeliveryData,
  loadDeliveryDataById,
  loadProductOrdersData,
  loadProductOrdersDataByID,
  loadGrnData,
  loadGrnDataById,
  deleteProductLine,
} from "../redux/Action/actionTabs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import CreateShippingDetails from "../components/CreatingShippingDetails";
import RemoteViewBox_Table from "Remote/ViewBox_Table";
import {
  ConnectedTvOutlined,
  CropLandscapeOutlined,
} from "@mui/icons-material";

const ISTCreate = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputValue, setInputvalue] = useState({});
  const [mainData, setMainData] = useState({});
  console.log(mainData, "mainData");
  const {
    ASNdata,
    ASNViewdata,
    Salesdata,
    SalesViewdata,
    Deliverydata,
    DeliveryViewdata,
    purchaseOrdersData,
    purchaseOrdersDataId,
    GRNdata,
    GRNViewdata,
  } = useSelector((state) => state.tabData);
  const [selectedProductData, setSelectedProductData] = useState([
    // {
    //   Quantity: 0,
    //   selling_price: 0,
    //   discount: 0,
    //   product_pricing_details: { tax_options: 0 },
    // },
  ]);
  const [paymentDetailsFields, setPaymentDetailsFields] = useState({
    subTotal: 0,
    tax: 0,
    shippingCharge: 0,
    adjustment_text: "",
    adjustment_amount: 0,
    total: 0,
  });

  const istdata = useSelector((state) => state?.data?.istdataById);
  const [isProductChecked, setIsProductChecked] = useState(true);
  const [Country, setCountry] = useState();
  const [formTab, setFormTab] = useState();
  const [CheckboxShowForCopyField_value, setCheckboxShowForCopyField_value] =
    useState(false);
  // const handelCheckboxShowForCopyField_valueChange = (field) => {
  //   //console.log("onCheckboxChanges", field);
  //   setCheckboxShowForCopyField_value(!CheckboxShowForCopyField_value);
  //   setCustomerBillingAddressFields({});
  //   //CustomerShippingAddressFields
  // };

  const productVariantData = useSelector(
    (state) => state.fetchProductsData?.products
  );
  useEffect(() => dispatch(fetchProductsData()), []);
  console.log(productVariantData, "productVariantData");

  const states1 = useSelector((state) => state.States2?.states1);
  useEffect(() => dispatch(States2()), []);
  console.log(states1, "states1");

  const onAddNewRaw = () => {
    setSelectedProductData([
      ...selectedProductData,
      {
        // Quantity: 0,
        // selling_price: 0,
        // discount: 0,
        // product_pricing_details: { tax_options: 0 },
      },
    ]);
  };
  const Countriesdata = useSelector((state) => state.Countries?.countries);
  useEffect(() => dispatch(Countries()), []);
  console.log(Countriesdata, "countries");

  var countryoptions = [];
  for (let i in Countriesdata) {
    countryoptions = countryoptions.concat(Countriesdata[i].name);
  }

  const Lookups = useSelector((state) => state.fetchLookupsDropdown?.lookups);
  useEffect(() => dispatch(fetchLookupsDropdown()), []);
  console.log(Lookups, "LookupsDropdown");

  const LookupsRouting = useSelector(
    (state) => state.fetchLookupsRouting?.lookupsRouting
  );
  useEffect(() => dispatch(fetchLookupsRouting()), []);
  console.log(LookupsRouting, "LookupsRouting");

  useEffect(() => dispatch(fetchLocationsDropdown()), []);
  const Location = useSelector(
    (state) => state.fetchLocationsDropdown?.locations
  );
  console.log(Location, "locations");

  useEffect(() => dispatch(fetchSourceDocumentData()), []);
  const SourceDocument = useSelector(
    (state) => state.fetchSourceDocumentData?.SourceDocument
  );
  console.log(SourceDocument, "SourceDocument");

  useEffect(() => dispatch(SearchSourceDocumentData()), []);
  const SearchSourceDocument = useSelector(
    (state) => state.SearchSourceDocumentData?.searchSourceDocument
  );
  console.log(SearchSourceDocument, "SearchSourceDocument");

  var options1 = [];
  for (let i in SearchSourceDocument) {
    if (
      inputValue.Source_Document_Type?.id?.display_name === "Delivery Orders"
    ) {
      options1 = options1.concat(
        SearchSourceDocument[i]?.delivery_order_details["delivery_order_number"]
      );
    }
    if (inputValue.Source_Document_Type?.id?.display_name === "Ist") {
      options1 = options1.concat(SearchSourceDocument[i].ist_number);
    }
    if (inputValue.Source_Document_Type?.id?.display_name === "Sales Invoice") {
      options1 = options1.concat(SearchSourceDocument[i].sales_invoice_number);
    } else if (inputValue.Source_Document_Type?.id?.display_name === "Asn") {
      options1 = options1.concat(SearchSourceDocument[i]?.asn_number);
    } else if (
      inputValue.Source_Document_Type?.id?.display_name === "Sales Orders"
    ) {
      options1 = options1.concat(SearchSourceDocument[i]?.sales_order_number);
    } else if (
      inputValue.Source_Document_Type?.id?.display_name === "Purchase Returns"
    ) {
      options1 = options1.concat(
        SearchSourceDocument[i]?.purchase_return_number
      );
    } else if (
      inputValue.Source_Document_Type?.id?.display_name === "Sales Returns"
    ) {
      options1 = options1.concat(SearchSourceDocument[i]?.sales_return_number);
    } else if (
      inputValue.Source_Document_Typeid?.id?.display_name === "Purchase Invoice"
    ) {
      options1 = options1.concat(
        SearchSourceDocument[i]?.purchase_invoice_number
      );
    } else if (
      inputValue.Source_Document_Type?.id?.display_name === "Purchase Orders"
    ) {
      options1 = options1.concat(
        SearchSourceDocument[i]?.purchase_order_number
          ? SearchSourceDocument[i]?.purchase_order_number
          : "--"
      );
    } else {
      options1 = options1.concat(SearchSourceDocument[i].number);
    }
  }

  const [DateandTime, setDateandTime] = useState([
    {
      label: "Set Pickup date",
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
          key: "Schedule_Pickup_from_time",
          value: "",
        },
        {
          label: "to",
          type: "time",
          key: "Schedule_Pickup_to_time",
          value: "",
        },
      ],
    },
    // {
    //   label: "Set Pickup time",
    //   type: "input",
    //   key: "pickup_from_time",
    // },
  ]);

  const [ISTDetailsFields, setISTDetailsFields] = useState([
    {
      label: "IST Number",
      type: "input",
      key: "reference_number",
      // required: true,
    },
    {
      label: "Scheduled Delivery Date",
      type: "date",
      key: "scheduled_delivery_date",
      // required: true,
    },
    {
      label: "Reason",
      type: "select",
      key: "reason_id",
      defaultVal: "Enter Reason",
      // data: Lookups.map((o) => {
      //   return { id: o.id, label: o.lookup_code };
      // }),
      // required: true,
    },
    {
      label: "Receipt routing options",
      type: "select",
      key: "receipt_routing_id",
      // data: LookupsRouting.map((o) => {
      //   return { id: o.id, label: o.lookup_code };
      // }),
    },
    {
      label: "Source Location",
      type: "select",
      key: "source_location_id",
      defaultVal: "Enter Reason",
      // data: Location.map((o) => {
      //   return { id: o?.id, label: o?.lookup_code };
      // }),
      // required: true,
    },
    {
      label: "Destination Location",
      type: "select",
      key: "destination_location_id",
      // data: Location.map((o) => {
      //   return { id: o?.id, label: o?.lookup_code };
      // }),
      // data: options.map((o) => {
      //   return { id: o?.id, label: o?.label };
      // }),
      // required: true,
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

  useEffect(() => {
    console.log("props", props);
    if (props && props.id) {
      const { id } = props;
      dispatch(loadIstDataById(id));
    }
  }, []);

  console.log(istdata, "istdataa");
  console.log("props", props);

  useEffect(() => {
    if (props && props.id && istdata) {
      console.log("istdataaaaaaaaaaaaaaaaaaaaaaaaaa", istdata);
      var newMainData = [];

      var newISTDetailsFields = ISTDetailsFields.map((o) => {
        if (o.key == "reference_number") o.value = istdata?.reference_number;
        if (o.key == "scheduled_delivery_date")
          o.value = moment(istdata?.scheduled_delivery_date).format(
            "yyyy-MM-DD"
          );
        // if (o.key == "reason_id") o.value = istdata?.reason?.display_name;
        // if (o.key == "receipt_routing_id")
        //   o.value = istdata?.receipt_routing?.display_name;
        // if (o.key == "source_location_id")
        //   o.value = istdata?.source_warehouse?.name;
        // if (o.key == "destination_location_id")
        //   o.value = istdata?.destination_warehouse?.name;
        if (o.key == "reason_id")
          o.value = {
            id: istdata?.reason_id,
            label: istdata?.reason?.display_name,
          };
        if (o.key == "receipt_routing_id")
          o.value = {
            id: istdata?.receipt_routing_id,
            label: istdata?.receipt_routing?.display_name,
          };
        if (o.key == "source_location_id")
          o.value = {
            id: istdata?.source_location_id,
            label: istdata?.source_warehouse?.name,
          };
        if (o.key == "destination_location_id")
          o.value = {
            id: istdata?.destination_location_id,
            label: istdata?.destination_warehouse?.name,
          };
        if (o.key == "Source_Document_Type")
          o.value = istdata?.source_document?.display_name;
        if (o.key == "Select_Source_Document")
          o.value = istdata?.source_documents?.data;
        return o;
      });
      setISTDetailsFields(newISTDetailsFields);

      var newselectedProductData = [];
      if (istdata.internal_transfer_lines)
        newselectedProductData = istdata.internal_transfer_lines.map((o) => {
          return {
            sku_id: { id: o.product_id, label: o.product_template.sku_code },
            product_id: o.product_id,
            product_template_id: o.product_id,
            product_name: o.product_template.product_name,
            // "warehouse_id": 1,
            inventory_id: o.inventory_id,
            serial_number: o.product_details.serial_number,
            uomName: { id: o?.uom_id, label: o?.uom?.name },
            source_stock: o.source_stock,
            is_scarp: o.is_scrap,
            destination_stock: o.destination_stock,
            transfer_quantity: o.transfer_quantity,
          };
        });
      setSelectedProductData(newselectedProductData);

      var newLocationDetailsFields = LocationFields;
      newLocationDetailsFields.find(
        (o) => o.key == "Dispatch_Location_card"
      ).value = [
        {
          label: "Location Name",
          type: "label",
          key: "Location_Name",
          value: istdata.source_warehouse?.address?.land_mark,
        },
        {
          label: "Pickup Address",
          type: "label",
          key: "Pickup_Address",
          value:
            istdata.source_warehouse?.address?.address_line_1 +
            istdata.source_warehouse?.address?.address_line_2 +
            istdata.source_warehouse?.address?.address_line_3 +
            istdata.source_warehouse?.address?.pin_code,
        },
        {
          label: "Location Incharge",
          type: "label",
          key: "Location_Incharge",
          value: istdata.source_warehouse?.name,
        },
        {
          label: "Pincode",
          type: "label",
          key: "Dispatch_Pincode",
          value: istdata.source_warehouse?.address?.pin_code,
        },
      ];
      newLocationDetailsFields.find(
        (o) => o.key == "Delivery_Location_card"
      ).value = [
        {
          label: "Location Name",
          type: "label",
          key: "Location_Name",
          value: istdata.destination_warehouse?.address?.land_mark,
        },
        {
          label: "Pickup Address",
          type: "label",
          key: "Pickup_Address",
          value:
            istdata.destination_warehouse?.address?.address_line_1 +
            istdata.destination_warehouse?.address?.address_line_2 +
            istdata.destination_warehouse?.address?.address_line_3 +
            istdata.destination_warehouse?.address?.pin_code,
        },
        {
          label: "Location Incharge",
          type: "label",
          key: "Location_Incharge",
          value: istdata.destination_warehouse?.name,
        },
        {
          label: "Pincode",
          type: "label",
          key: "Delivery_Pincode",
          value: istdata.destination_warehouse?.address?.pin_code,
        },
      ];
      setLocationFields(newLocationDetailsFields);

      var newPackageDetailsFields = PackageDetailsFields;
      newPackageDetailsFields.map((o) => {
        if (o.key == "package_length")
          o.value = istdata?.shipping_details?.package_details?.length;
        if (o.key == "package_breadth")
          o.value = istdata?.shipping_details?.package_details?.breadth;
        if (o.key == "package_weight")
          o.value = istdata?.shipping_details?.package_details?.weight;
        if (o.key == "package_height")
          o.value = istdata?.shipping_details?.package_details?.height;
        if (o.key == "volumetric_dimensions")
          o.value = istdata?.shipping_details?.package_details?.dimensions;
        return o;
      });
      setPackageDetailsFields(newPackageDetailsFields);

      var newSelfDataFields = PackageDetailsFields1;
      newSelfDataFields.map((o) => {
        if (o.key == "Carrier_Name")
          o.value = istdata?.shipping_details?.package_details?.carrier_name;
        if (o.key == "AWB_Number")
          o.value = istdata?.shipping_details?.package_details?.awb_number;
        return o;
      });
      setPackageDetailsFields1(newSelfDataFields);

      var newDateandTime = DateandTime.map((o) => {
        if (o.key == "pickup_date")
          o.value = moment(istdata?.pickup_date_and_time?.pickup_date).format(
            "yyyy-MM-DD"
          );
        if (o.key == "Schedule_Pickup_time")
          o.value = o.value.map((p) => {
            if (p.key == "Schedule_Pickup_from_time")
              p.value = moment(istdata?.pickup_date_and_time?.pickup_from_time);
            if (p.key == "Schedule_Pickup_to_time")
              p.value = moment(istdata?.pickup_date_and_time?.pickup_to_time);
            return p;
          });

        return o;
      });
      setDateandTime(newDateandTime);

      newMainData = [
        ...newISTDetailsFields,
        ...newselectedProductData,
        ...newLocationDetailsFields,
        ...newPackageDetailsFields,
        ...newSelfDataFields,
        // ...newEstimatedCostData,
        ...newDateandTime,
      ];
      // var keyValuePairMainData = {};
      var keyValuePairMainData = {
        newEstimated_Cost: 0,
        Estimated_Cost_Select: istdata.shipping_carrier_id,
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
      var index = 0;
      keyValuePairMainData["internal_transfer_lines"] = [];
      newselectedProductData.map((o) => {
        keyValuePairMainData["internal_transfer_lines"][index] = o;
        index += 1;
      });

      console.log("newMainData", newMainData, keyValuePairMainData);
      setMainData(keyValuePairMainData);
    }
  }, [istdata]);

  const setDataByKeyAndValue = (key, value, index = null) => {
    console.log("key", key, "value", value);

    try {
      var newISTDetailsFields = ISTDetailsFields.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setISTDetailsFields(newISTDetailsFields);
    } catch (e) {
      console.error("err1", e);
    }

    try {
      var newLocationDetailsFields = LocationFields.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setLocationFields(newLocationDetailsFields);
    } catch (e) {
      console.error("err2", e);
    }

    try {
      var newShippingDetailsFields = ShippingDetailsFields.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setShippingDetailsFields(newShippingDetailsFields);
    } catch (e) {
      console.error("err3", e);
    }

    try {
      var newPackageDetailsFields = PackageDetailsFields.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setPackageDetailsFields(newPackageDetailsFields);
    } catch (e) {
      console.error("err3", e);
    }

    try {
      var newSelfDataFields = PackageDetailsFields1.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setPackageDetailsFields1(newSelfDataFields);
    } catch (e) {
      console.error("err4", e);
    }

    try {
      var newEstimatedCostData = EstimatedCostheadCells.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setEstimatedCostheadCells(newEstimatedCostData);
    } catch (e) {
      console.error("err5", e);
    }

    try {
      var newDateandTime = DateandTime.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setDateandTime(newDateandTime);
    } catch (e) {
      console.error("err6", e);
    }

    // try{
    //   var newsetwarehouseStorageManagementHeadCells=warehouseStorageManagementHeadCells
    //   .map(o=> {
    //     if(o.key==key) o.value=value;
    //     return o;})
    //   setwarehouseStorageManagementHeadCells(newsetwarehouseStorageManagementHeadCells);
    // }
    // catch(e){console.error("err7", e)}
  };

  const handelInputChange = (key, value, index = null) => {
    console.log("key", key, "value", value, "index", index);
    setDataByKeyAndValue(key, value, index);

    if (
      key == "Schedule_Pickup_from_time" ||
      key == "Schedule_Pickup_to_time"
    ) {
      var newSchedule_Pickup_date_and_time = DateandTime.map((o) => {
        if (o.key == "Schedule_Pickup_time")
          o.value.map((p) => {
            if (p.key == key) p.value = new Date(value);
            return p;
          });
        return o;
      });
      console.log(
        newSchedule_Pickup_date_and_time,
        "newSchedule_Pickup_date_and_time"
      );
      setDateandTime(newSchedule_Pickup_date_and_time);

      var newMainData = mainData;
      if (key == "Schedule_Pickup_from_time")
        newMainData["Schedule_Pickup_from_time"] = moment(
          new Date(value)
        ).format("hh:mm A");
      if (key == "Schedule_Pickup_to_time")
        newMainData["Schedule_Pickup_to_time"] = moment(new Date(value)).format(
          "hh:mm A"
        );
      setMainData(newMainData);
    }

    if (index != null) {
      var newSelectedProductData = JSON.parse(
        JSON.stringify(selectedProductData)
      );

      if (key === "sku_id") {
        console.log("sku_id");
        var selectVarient = productVariantData.find((o) => o?.id == value?.id);
        console.log("rowprod0", selectVarient);
        // newSelectedProductData[index] = selectVarient;
        // newSelectedProductData[index][key] = value.label;
        // newSelectedProductData[index]["inventory_id"] = value.id;
        newSelectedProductData[index]["inventory_id"] = selectVarient["id"];
        newSelectedProductData[index]["product_id"] = selectVarient["id"];
        newSelectedProductData[index]["product_name"] =
          selectVarient["product_name"];
        newSelectedProductData[index]["serial_number"] =
          selectVarient["serial_number"];
        newSelectedProductData[index]["product_template_id"] =
          selectVarient["product_template_id"];
        newSelectedProductData[index]["sku_id"] = selectVarient["sku_id"];
      } else if (key == "uomName") {
        var selectVarient = productVariantData.find((o) => o?.id == value?.id);
        newSelectedProductData[index].uom = {
          name: value.label,
          id: value.id,
        };
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
          ?.map((o) => o.Amount)
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      });
      console.log("newSelectedProductData", newSelectedProductData);
    } else {
      var newMainData = mainData;
      newMainData[key] = value;
      setMainData(newMainData);

      console.log("newMainData", newMainData);
    }
  };

  const handelSelectonChange = (key, value) => {
    const tempValue = { ...inputValue, [key]: value };
    setInputvalue(tempValue);
    console.log(value, inputValue, "iiii");

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
          loadSalesData({ limit: 100, offset: 1, filters: null, sort: null })
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

      // dispatch(SearchSourceDocumentData(value?.id));
    }

    if (key == "Select_Source_Document") {
      if (mainData.Source_Document_Type.lookup_code == "SALES_ORDERS") {
        dispatch(loadSalesDataById(value.id));
      }
      if (mainData.Source_Document_Type.lookup_code == "GRN") {
        dispatch(loadGrnDataById(value.id));
      }
      if (mainData.Source_Document_Type.lookup_code == "ASN") {
        dispatch(loadASNDataById(value.id));
      }
      if (mainData.Source_Document_Type.lookup_code == "DELIVERY_ORDERS") {
        dispatch(loadDeliveryDataById(value.id));
      }
      if (mainData.Source_Document_Type.lookup_code == "PURCHASE_ORDERS") {
        dispatch(loadProductOrdersDataByID(value.id));
      }
    }
    switch (key) {
      case "Source_Document_Type": {
        setISTDetailsFields(
          ISTDetailsFields?.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
      case "Select_Source_Document": {
        setISTDetailsFields(
          ISTDetailsFields?.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        break;
      }
    }

    if (key == "source_location_id") {
      //dispatch(loadvendorsDataById(value.id));
      var singleLocationdata = Location.find((o) => o.id == value.id);
      var Dispatch_Location_card = LocationFields.find(
        (o) => o.key == "Dispatch_Location_card"
      );
      //var newVendorDetailsFields=VendorDetailsFields.filter(o=>o.key!='Vendor_Details_card');
      Dispatch_Location_card.value = [
        {
          label: "Location Name",
          type: "label",
          key: "Location_Name",
          value:
            singleLocationdata &&
            singleLocationdata.address &&
            singleLocationdata.address.land_mark,
        },
        {
          label: "Pickup Address",
          type: "label",
          key: "Pickup_Address",
          value:
            (singleLocationdata &&
              singleLocationdata.address &&
              singleLocationdata.address.address_line_1) +
            " " +
            (singleLocationdata &&
              singleLocationdata.address &&
              singleLocationdata.address.address_line_2) +
            " " +
            (singleLocationdata &&
              singleLocationdata.address &&
              singleLocationdata.address.address_line_3) +
            " " +
            (singleLocationdata &&
              singleLocationdata.address &&
              singleLocationdata.address.country &&
              singleLocationdata.address.country.name) +
            " " +
            (singleLocationdata &&
              singleLocationdata.address &&
              singleLocationdata.address.pin_code),
        },
        {
          label: "Location Incharge",
          type: "label",
          key: "Location_Incharge",
          value: singleLocationdata && singleLocationdata.name,
        },
        {
          label: "Pincode",
          type: "label",
          key: "Dispatch_Pincode",
          value:
            singleLocationdata &&
            singleLocationdata.address &&
            singleLocationdata.address.pin_code,
        },
      ];
      Dispatch_Location_card.data = singleLocationdata;
      //newVendorDetailsFields.push(Vendor_Details_card);

      var locationData = LocationFields.map((o) => {
        if (o.key == "Dispatch_Location_card")
          o.value = Dispatch_Location_card.value;
        if (o.key == "source_location_id") o.value = value;
        return o;
      });

      setLocationFields(locationData);
    }

    if (key == "destination_location_id") {
      //dispatch(loadvendorsDataById(value.id));
      var deliveryLocationdata = Location.find((o) => o.id == value.id);
      var Delivery_Location_card = LocationFields.find(
        (o) => o.key == "Delivery_Location_card"
      );

      //var newVendorDetailsFields=VendorDetailsFields.filter(o=>o.key!='Vendor_Details_card');

      Delivery_Location_card.value = [
        {
          label: "Location Name",
          type: "label",
          key: "Location_Name",
          value:
            deliveryLocationdata &&
            deliveryLocationdata.address &&
            deliveryLocationdata.address.land_mark,
        },
        {
          label: "Pickup Address",
          type: "label",
          key: "Pickup_Address",
          value:
            (deliveryLocationdata &&
              deliveryLocationdata.address &&
              deliveryLocationdata.address.address_line_1) +
            " " +
            (deliveryLocationdata &&
              deliveryLocationdata.address &&
              deliveryLocationdata.address.address_line_2) +
            " " +
            (deliveryLocationdata &&
              deliveryLocationdata.address &&
              deliveryLocationdata.address.address_line_3) +
            " " +
            (deliveryLocationdata &&
              deliveryLocationdata.address &&
              deliveryLocationdata.address.country &&
              deliveryLocationdata.address.country.name) +
            " " +
            (deliveryLocationdata &&
              deliveryLocationdata.address &&
              deliveryLocationdata.address.pin_code),
        },
        {
          label: "Location Incharge",
          type: "label",
          key: "Location_Incharge",
          value: deliveryLocationdata && deliveryLocationdata.name,
        },
        {
          label: "Pincode",
          type: "label",
          key: "Delivery_Pincode",
          value:
            deliveryLocationdata &&
            deliveryLocationdata.address &&
            deliveryLocationdata.address.pin_code,
        },
      ];
      Delivery_Location_card.data = deliveryLocationdata;

      var locationData = LocationFields.map((o) => {
        if (o.key == "Delivery_Location_card")
          o.value = Delivery_Location_card.value;
        if (o.key == "destination_location_id") o.value = value;
        return o;
      });
      setLocationFields(locationData);
    }

    if (
      key == "receipt_routing_id" ||
      key == "destination_location_id" ||
      key == "reason_id" ||
      key == "source_location_id"
    ) {
      setISTDetailsFields(
        ISTDetailsFields.map((o) => {
          if (o.key == key) return { ...o, value: value };
          return o;
        })
      );
    }
    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);

    console.log("newMainData", newMainData);
  };

  const handelCheckboxShowForCopyField_valueChange = (field) => {
    //console.log("onCheckboxChanges", field);
    setCheckboxShowForCopyField_value(!CheckboxShowForCopyField_value);
  };

  const handelCheckBoxonChange = (field, value) => {
    console.log("onCheckboxChanges", field);
    console.log("is scrap", value);
  };

  const setRadioType = (prop, value) => {
    console.log("setRadioType", prop, value);
  };

  useEffect(() => dispatch(fetchUOMDropdown()), []);
  const UOM = useSelector((state) => state.fetchUOMDropdown?.uom);
  console.log(UOM, "UOM");

  const handelRadionButtononChange = (prop, value) => {
    console.log("prop, value", prop, value);
    if (prop == "Shipment_Type") {
      var OldState = ShippingDetailsFields?.map((o) => {
        if (o.key == prop)
          o.sub?.map((p) => {
            p.checked = false;
            return p;
          });
        return o;
      });
      setShippingDetailsFields(OldState);

      var newState = ShippingDetailsFields?.map((o) => {
        if (o.key == prop)
          o.sub?.map((p) => {
            if (p.value == value) p.checked = true;
            return p;
          });
        return o;
      });
      setShippingDetailsFields(newState);

      var newMainData = mainData;
      newMainData["Shipment_Type"] = value == 119 ? "Eunimart" : "Self";
      newMainData["shipping_mode_id"] = value;
      setMainData(newMainData);
    }
  };

  useEffect(() => dispatch(estimatedcost()), []);
  const EstimatedCostdata = useSelector((state) => state.estimatedcost?.cost);
  console.log(EstimatedCostdata, "EstimatedCostdata");

  useEffect(() => {
    if (EstimatedCostdata?.data) {
      var Shipment_Type = ShippingDetailsFields?.find(
        (o) => o.key == "Shipment_Type"
      ).sub?.find((o) => o.checked)?.label;
      console.log(Shipment_Type, "Shipment_Typeq");

      if (Shipment_Type == "Eunimart" && EstimatedCostdata?.data?.express) {
        console.log(EstimatedCostdata, "EstimatedCostdataqqqqqqqq");
        var newEstimated_Cost = EstimatedCostdata?.data?.express?.map(
          (data) => {
            var dataRaw = {};
            EstimatedCostheadCells?.map((tableRaw) => {
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
          }
        );
        setEstimated_Cost(newEstimated_Cost);
      } else if (Shipment_Type == "Eunimart") {
        var newEstimated_Cost = EstimatedCostdata.express?.map((data) => {
          var dataRaw = {};
          EstimatedCostheadCells?.map((tableRaw) => {
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

  //ASN
  useEffect(() => {
    console.log(ASNViewdata, "ASNViewdata");
    if (
      ASNViewdata &&
      mainData &&
      mainData.Source_Document_Type &&
      mainData.Source_Document_Type.lookup_code == "ASN"
    ) {
      var newMainData = [];

      var newISTDetailsFields = ISTDetailsFields.map((o) => {
        if (o.key == "reference_number") o.value = ASNViewdata?.asn_number;
        if (o.key == "scheduled_delivery_date")
          o.value = moment(ASNViewdata?.scheduled_delivery_date).format(
            "yyyy-MM-DD"
          );
        return o;
      });
      setISTDetailsFields(newISTDetailsFields);

      var newLocationDetailsFields = LocationFields;
      newLocationDetailsFields.find(
        (o) => o.key == "Dispatch_Location_card"
      ).value = [
        {
          label: "Location Name",
          type: "label",
          key: "Location_Name",
          value: ASNViewdata.dispatch_location_details?.location_name,
        },
        {
          label: "Pickup Address",
          type: "label",
          key: "Pickup_Address",
          value:
            ASNViewdata.dispatch_location_details?.address_line_1 +
            ASNViewdata.dispatch_location_details?.address_line_2 +
            ASNViewdata.dispatch_location_details?.address_line_3 +
            ASNViewdata.dispatch_location_details?.pin_code,
        },

        {
          label: "Location Incharge",
          type: "label",
          key: "Location_Incharge",
          value: ASNViewdata.dispatch_location_details?.contact_person_name,
        },
        {
          label: "Pincode",
          type: "label",
          key: "Dispatch_Pincode",
          value: ASNViewdata.dispatch_location_details?.pin_code,
        },
      ];
      newLocationDetailsFields.find(
        (o) => o.key == "Delivery_Location_card"
      ).value = [
        {
          label: "Location Name",
          type: "label",
          key: "Location_Name",
          value: ASNViewdata.destination_location_details?.location_name,
        },
        {
          label: "Pickup Address",
          type: "label",
          key: "Pickup_Address",
          value:
            ASNViewdata.destination_location_details?.address_line_1 +
            ASNViewdata.destination_location_details?.address_line_2 +
            ASNViewdata.destination_location_details?.address_line_3 +
            ASNViewdata.destination_location_details?.pin_code,
        },
        {
          label: "Location Incharge",
          type: "label",
          key: "Location_Incharge",
          value: ASNViewdata.destination_location_details?.contact_person_name,
        },
        {
          label: "Pincode",
          type: "label",
          key: "Delivery_Pincode",
          value: ASNViewdata.destination_location_details?.pin_code,
        },
      ];
      setLocationFields(newLocationDetailsFields);

      var newselectedProductData2 = [];
      if (ASNViewdata.asn_order_lines)
        newselectedProductData2 = ASNViewdata.asn_order_lines.map((o) => {
          return {
            id: o.product_id,
            sku_id: {
              id: o?.product?.sku_code,
              label: o?.product?.sku_code,
              // data.asn_order_lines[0].product.sku_code
            },
            // sku_id: { id: 1, label: "1" },
            product_template_id: o?.product_id,
            product_name: o?.product?.product_name,
            inventory_id: o?.id,
            // source_stock: o?.inventory?.available_stock,
            // is_scarp: true,
            uomName: { id: o?.uom?.id, label: o?.uom?.name },
            serial_number: o?.product_variant?.serial_number,
            // destination_stock: o?.inventory?.commited_stock,
            // transfer_quantity: o?.inventory?.quantity,
          };
        });
      setSelectedProductData(newselectedProductData2);

      var newPackageDetailsFields = PackageDetailsFields.map((o) => {
        if (o.key == "package_length")
          o.value = ASNViewdata?.shipping_details?.package_details?.length;
        if (o.key == "package_width")
          o.value = ASNViewdata?.shipping_details?.package_details?.breadth;
        if (o.key == "package_height")
          o.value = ASNViewdata?.shipping_details?.package_details?.height;
        if (o.key == "volumetric_dimensions")
          o.value = ASNViewdata?.shipping_details?.package_details?.dimensions;
        if (o.key == "package_weight")
          o.value = ASNViewdata?.shipping_details?.package_details?.weight;
        return o;
      });
      setPackageDetailsFields(newPackageDetailsFields);

      // var newEstimated_Cost = ASNViewdata?.shipping_details?.estimated_cost.map(data=>{
      //   return{"Estimated_Cost_Shipping_Partners":data.shipping_partner,
      //   "Estimated_Cost_Charges":data.charges,
      //   "Estimated_Cost_Order_Deliver_Time":data.order_delivery_time,
      //   "Estimated_Cost_Select":ASNViewdata.shipping_mode_id
      //   };
      // });

      /* Estimated Cost Data Not In Array */
      // var estimated_cost_data = ASNViewdata?.shipping_details?.estimated_cost;
      // var newEstimated_Cost = [
      //   {
      //     Estimated_Cost_Shipping_Partners:
      //       estimated_cost_data.shipping_partner,
      //     Estimated_Cost_Charges: estimated_cost_data.charges,
      //     Estimated_Cost_Order_Deliver_Time:
      //       estimated_cost_data.order_delivery_time,
      //     Estimated_Cost_Select: ASNViewdata.shipping_mode_id,
      //   },
      // ];
      // setEstimated_Cost(newEstimated_Cost);

      var newSchedule_Pickup_date_and_time = DateandTime.map((o) => {
        if (o.key == "pickup_date")
          o.value = moment(
            ASNViewdata?.pickup_date_and_time?.pickup_date
          ).format("YYYY-MM-DD");
        if (o.key == "Schedule_Pickup_time")
          o.value = o.value.map((p) => {
            if (p.key == "Schedule_Pickup_from_time")
              p.value = moment(
                ASNViewdata?.pickup_date_and_time?.pickup_from_time
              );
            if (p.key == "Schedule_Pickup_to_time")
              p.value = moment(
                ASNViewdata?.pickup_date_and_time?.pickup_to_time
              );
            return p;
          });
        return o;
      });
      setDateandTime(newSchedule_Pickup_date_and_time);

      newMainData = [
        ...newISTDetailsFields,
        ...newselectedProductData2,
        ...newLocationDetailsFields,
        ...newPackageDetailsFields,
        // ...newEstimated_Cost,
        ...newSchedule_Pickup_date_and_time,
      ];
      var keyValuePairMainData = {
        newEstimated_Cost: 0,
        Estimated_Cost_Select: ASNViewdata.shipping_mode_id,
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
      keyValuePairMainData["internal_transfer_lines"] = newselectedProductData2;
      setMainData(keyValuePairMainData);
    }
  }, [ASNViewdata]);

  //Sales Order
  useEffect(() => {
    if (
      SalesViewdata &&
      mainData &&
      mainData.Source_Document_Type &&
      mainData.Source_Document_Type.lookup_code == "SALES_ORDERS"
    ) {
      var newMainData = [];

      var newISTDetailsFields = ISTDetailsFields.map((o) => {
        if (o.key == "reference_number")
          o.value = SalesViewdata?.sales_order_number;
        return o;
      });
      setISTDetailsFields(newISTDetailsFields);

      var newLocationDetailsFields = LocationFields;
      newLocationDetailsFields.find(
        (o) => o.key == "Dispatch_Location_card"
      ).value = [
        {
          label: "Location Name",
          type: "label",
          key: "Location_Name",
          value: SalesViewdata.customer_shipping_address?.location_name,
        },
        {
          label: "Pickup Address",
          type: "label",
          key: "Pickup_Address",
          value:
            SalesViewdata.customer_shipping_address?.address_line_1 +
            SalesViewdata.customer_shipping_address?.address_line_2 +
            SalesViewdata.customer_shipping_address?.address_line_3 +
            SalesViewdata.customer_shipping_address?.pin_code,
        },

        {
          label: "Location Incharge",
          type: "label",
          key: "Location_Incharge",
          value: SalesViewdata.customer_shipping_address?.contact_person_name,
        },
        {
          label: "Pincode",
          type: "label",
          key: "Dispatch_Pincode",
          value: SalesViewdata.customer_shipping_address?.pin_code,
        },
      ];
      newLocationDetailsFields.find(
        (o) => o.key == "Delivery_Location_card"
      ).value = [
        {
          label: "Location Name",
          type: "label",
          key: "Location_Name",
          value: SalesViewdata.customer_billing_address?.location_name,
        },
        {
          label: "Pickup Address",
          type: "label",
          key: "Pickup_Address",
          value:
            SalesViewdata.customer_billing_address?.address_line_1 +
            SalesViewdata.customer_billing_address?.address_line_2 +
            SalesViewdata.customer_billing_address?.address_line_3 +
            SalesViewdata.customer_billing_address?.pin_code,
        },
        {
          label: "Location Incharge",
          type: "label",
          key: "Location_Incharge",
          value: SalesViewdata.customer_billing_address?.contact_person_name,
        },
        {
          label: "Pincode",
          type: "label",
          key: "Delivery_Pincode",
          value: SalesViewdata.customer_billing_address?.pin_code,
        },
      ];
      setLocationFields(newLocationDetailsFields);

      var nweselectedProductData3 = [];
      if (SalesViewdata.sales_order_lines)
        nweselectedProductData3 = SalesViewdata.sales_order_lines.map((o) => {
          return {
            id: o.product_id,
            sku_id: {
              id: o?.product_details?.id,
              label: o.product_details.parent_sku_id,
            },
            // sku_id: { id: 1, label: "1" },
            product_template_id: o.product_template_id,
            product_name: o.product_details.product_name,
            inventory_id: o.inventory_id,
            source_stock: o?.inventory?.available_stock,
            // is_scarp: true,
            uomName: { id: o?.uom?.id, label: o?.uom?.name },
            serial_number: o.serial_number,
            destination_stock: o?.inventory?.commited_stock,
            transfer_quantity: o?.inventory?.quantity,
          };
        });
      setSelectedProductData(nweselectedProductData3);

      newMainData = [
        ...newISTDetailsFields,
        ...newLocationDetailsFields,
        ...nweselectedProductData3,
      ];
      var keyValuePairMainData = {
        newEstimated_Cost: 0,
        Estimated_Cost_Select: SalesViewdata.shipping_carrier_id,
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
      keyValuePairMainData["internal_transfer_lines"] = nweselectedProductData3;
      setMainData(keyValuePairMainData);
    }
  }, [SalesViewdata]);

  //Delivery Order
  useEffect(() => {
    if (
      DeliveryViewdata &&
      mainData &&
      mainData.Source_Document_Type &&
      mainData.Source_Document_Type.lookup_code == "DELIVERY_ORDERS"
    ) {
      var newMainData = [];

      var newISTDetailsFields = ISTDetailsFields.map((o) => {
        if (o.key == "reference_number")
          o.value =
            DeliveryViewdata?.delivery_order_details?.delivery_order_number;
        return o;
      });
      setISTDetailsFields(newISTDetailsFields);

      var newLocationDetailsFields = LocationFields;
      newLocationDetailsFields.find(
        (o) => o.key == "Dispatch_Location_card"
      ).value = [
        {
          label: "Location Name",
          type: "label",
          key: "Location_Name",
          value: DeliveryViewdata.billing_address_details?.location_name,
        },
        {
          label: "Pickup Address",
          type: "label",
          key: "Pickup_Address",
          value:
            DeliveryViewdata.billing_address_details?.address_line_1 +
            DeliveryViewdata.billing_address_details?.address_line_2 +
            DeliveryViewdata.billing_address_details?.address_line_3 +
            DeliveryViewdata.billing_address_details?.pin_code,
        },

        {
          label: "Location Incharge",
          type: "label",
          key: "Location_Incharge",
          value: DeliveryViewdata.billing_address_details?.contact_person_name,
        },
        {
          label: "Pincode",
          type: "label",
          key: "Dispatch_Pincode",
          value: DeliveryViewdata.billing_address_details?.pin_code,
        },
      ];
      newLocationDetailsFields.find(
        (o) => o.key == "Delivery_Location_card"
      ).value = [
        {
          label: "Location Name",
          type: "label",
          key: "Location_Name",
          value: DeliveryViewdata.delivery_address_details?.location_name,
        },
        {
          label: "Pickup Address",
          type: "label",
          key: "Pickup_Address",
          value:
            DeliveryViewdata.delivery_address_details?.address_line_1 +
            DeliveryViewdata.delivery_address_details?.address_line_2 +
            DeliveryViewdata.delivery_address_details?.address_line_3 +
            DeliveryViewdata.delivery_address_details?.pin_code,
        },
        {
          label: "Location Incharge",
          type: "label",
          key: "Location_Incharge",
          value: DeliveryViewdata.delivery_address_details?.contact_person_name,
        },
        {
          label: "Pincode",
          type: "label",
          key: "Delivery_Pincode",
          value: DeliveryViewdata.delivery_address_details?.pin_code,
        },
      ];
      setLocationFields(newLocationDetailsFields);

      var nweselectedProductData4 = [];
      if (DeliveryViewdata.delivery_order_lines)
        nweselectedProductData4 = DeliveryViewdata.delivery_order_lines.map(
          (o) => {
            return {
              id: o.product_id,
              sku_id: {
                id: o?.product_details?.id,
                label: o.product_details.sku_id,
              },
              // sku_id: { id: 1, label: "1" },
              product_template_id: o.product_template_id,
              product_name: o.product_details.product_name,
              inventory_id: o.inventory_id,
              // source_stock: o?.inventory?.available_stock,
              // is_scarp: true,
              uomName: { id: o?.uom_details?.id, label: o?.uom_details?.name },
              serial_number: o?.product_details?.serial_number,
              // destination_stock: o?.inventory?.commited_stock,
              // transfer_quantity: o?.inventory?.quantity,
            };
          }
        );
      setSelectedProductData(nweselectedProductData4);

      newMainData = [
        ...newISTDetailsFields,
        ...newLocationDetailsFields,
        ...nweselectedProductData4,
      ];
      var keyValuePairMainData = {
        newEstimated_Cost: 0,
        Estimated_Cost_Select: DeliveryViewdata.shipping_carrier_id,
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
      keyValuePairMainData["internal_transfer_lines"] = nweselectedProductData4;
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

      var newISTDetailsFields = ISTDetailsFields.map((o) => {
        if (o.key == "scheduled_delivery_date")
          o.value = moment(purchaseOrdersDataId?.expected_delivery_date).format(
            "yyyy-MM-DD"
          );
        if (o.key == "reference_number")
          o.value = purchaseOrdersDataId?.purchase_order_number;
        return o;
      });
      setISTDetailsFields(newISTDetailsFields);

      var newLocationDetailsFields = LocationFields;
      newLocationDetailsFields.find(
        (o) => o.key == "Dispatch_Location_card"
      ).value = [
        {
          label: "Location Name",
          type: "label",
          key: "Location_Name",
          value: purchaseOrdersDataId.billing_address?.location_name,
        },
        {
          label: "Pickup Address",
          type: "label",
          key: "Pickup_Address",
          value:
            purchaseOrdersDataId.billing_address?.address_line_1 +
            purchaseOrdersDataId.billing_address?.address_line_2 +
            purchaseOrdersDataId.billing_address?.address_line_3 +
            purchaseOrdersDataId.billing_address?.pin_code,
        },

        {
          label: "Location Incharge",
          type: "label",
          key: "Location_Incharge",
          value: purchaseOrdersDataId.billing_address?.contact_person_name,
        },
        {
          label: "Pincode",
          type: "label",
          key: "Dispatch_Pincode",
          value: purchaseOrdersDataId.billing_address?.pin_code,
        },
      ];
      newLocationDetailsFields.find(
        (o) => o.key == "Delivery_Location_card"
      ).value = [
        {
          label: "Location Name",
          type: "label",
          key: "Location_Name",
          value: purchaseOrdersDataId.delivery_address?.location_name,
        },
        {
          label: "Pickup Address",
          type: "label",
          key: "Pickup_Address",
          value:
            purchaseOrdersDataId.delivery_address?.address_line_1 +
            purchaseOrdersDataId.delivery_address?.address_line_2 +
            purchaseOrdersDataId.delivery_address?.address_line_3 +
            purchaseOrdersDataId.delivery_address?.pin_code,
        },
        {
          label: "Location Incharge",
          type: "label",
          key: "Location_Incharge",
          value: purchaseOrdersDataId.delivery_address?.contact_person_name,
        },
        {
          label: "Pincode",
          type: "label",
          key: "Delivery_Pincode",
          value: purchaseOrdersDataId.delivery_address?.pin_code,
        },
      ];
      setLocationFields(newLocationDetailsFields);

      var newselectedProductData5 = [];
      if (purchaseOrdersDataId?.purchase_order_lines)
        newselectedProductData5 =
          purchaseOrdersDataId?.purchase_order_lines?.map((o) => {
            return {
              id: o?.product_id,
              sku_id: {
                id: o?.product_details?.id,
                label: o?.product_details?.sku_id,
              },
              // sku_id: { id: 1, label: "1" },
              product_template_id: o?.product_template_id,
              product_name: o?.product_details?.product_name,
              inventory_id: o?.inventory_id,
              // source_stock: o?.inventory?.available_stock,
              // is_scarp: true,
              uomName: { id: o?.uom?.id, label: o?.uom?.name },
              serial_number: o?.product_details?.serial_number,
              // destination_stock: o?.inventory?.commited_stock,
              // transfer_quantity: o?.inventory?.quantity,
            };
          });
      setSelectedProductData(newselectedProductData5);

      newMainData = [
        ...newISTDetailsFields,
        ...newLocationDetailsFields,
        ...newselectedProductData5,
      ];

      var keyValuePairMainData = {
        newEstimated_Cost: 0,
        Estimated_Cost_Select: purchaseOrdersDataId.shipping_carrier_id,
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
      keyValuePairMainData["internal_transfer_lines"] = newselectedProductData5;
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

      var newISTDetailsFields = ISTDetailsFields.map((o) => {
        if (o.key == "reference_number") o.value = GRNViewdata?.grn_number;
        return o;
      });
      setISTDetailsFields(newISTDetailsFields);

      var nweselectedProductData6 = [];
      if (GRNViewdata.grn_order_lines)
        nweselectedProductData6 = GRNViewdata.grn_order_lines.map((o) => {
          return {
            id: o.product_id,
            sku_id: {
              id: o?.product?.id,
              label: o.product.sku_id,
            },
            // sku_id: { id: 1, label: "1" },
            product_template_id: o?.product_template_id,
            product_name: o?.product?.product_name,
            inventory_id: o?.product_id,
            // source_stock: o?.inventory?.available_stock,
            // is_scarp: true,
            uomName: { id: o?.uom?.id, label: o?.uom?.name },
            serial_number: o?.product?.serial_number,
            // destination_stock: o?.inventory?.commited_stock,
            // transfer_quantity: o?.inventory?.quantity,
          };
        });
      setSelectedProductData(nweselectedProductData6);

      newMainData = [...newISTDetailsFields, ...nweselectedProductData6];
      var keyValuePairMainData = {
        newEstimated_Cost: 0,
        Estimated_Cost_Select: GRNViewdata.shipping_carrier_id,
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
      keyValuePairMainData["internal_transfer_lines"] = nweselectedProductData6;
      setMainData(keyValuePairMainData);
    }
  }, [GRNViewdata]);

  const headCells = [
    {
      key: "sku_id",
      label: "Product SKU",
      type: "select",
      data: productVariantData.map((o) => {
        return { id: o?.id, label: o?.sku_id };
      }),
      required: true,
    },
    {
      key: "product_name",
      label: "Product Name",
      type: "text",
      required: true,
    },
    {
      key: "inventory_id",
      label: "Inventory_ID",
      type: "text",
      required: true,
    },
    {
      key: "serial_number",
      label: "Lot/Serial Number",
      type: "text",
      required: true,
    },
    {
      key: "uomName",
      label: "Unit of Measure",
      type: "select",
      data: UOM.map((o) => {
        return { id: o?.id, label: o?.name };
      }),
      required: true,
    },
    {
      key: "source_stock",
      label: "Source Stock",
      type: "text",
      required: true,
    },
    {
      key: "is_scarp",
      label: "Is it Scrap?",
      type: "checkbox",
      isChecked: isProductChecked,
      required: true,
    },
    {
      key: "destination_stock",
      label: "Destination Stock",
      type: "text",
      required: true,
    },
    {
      key: "transfer_quantity",
      label: "Transfer Quantity",
      type: "text",
      required: true,
    },
    {
      key: "Action",
      label: "Action",
      type: "view",
      renderView: (item) => (
        <div>
          <DeleteIcon
            onClick={() => {
              console.log(item, "deleteing Item");
              setdeletedProducts([...deletedProducts, item]);
              // dispatch(deleteProductLine(istdata?.id, item?.sku_id?.id));
              setSelectedProductData(
                selectedProductData.filter(
                  (o) => o?.sku_id?.id != item?.sku_id?.id
                )
              );
            }}
          />
        </div>
      ),
    },
  ];

  const [LocationFields, setLocationFields] = useState([
    {
      label: "Dispatch Location",
      type: "card",
      key: "Dispatch_Location_card",
      value: [
        {
          label: "Location Name",
          type: "label",
          key: "Location_Name",
          value: "",
        },
        {
          label: "Pickup Address",
          type: "label",
          key: "Pickup_Address",
          value: "",
        },
        {
          label: "Location Incharge",
          type: "label",
          key: "Location_Incharge",
          value: "",
        },
        {
          label: "Pincode",
          type: "label",
          key: "Dispatch_Pincode",
          value: "",
        },
      ],
    },
    {
      label: "Delivery Location",
      type: "card",
      key: "Delivery_Location_card",
      value: [
        {
          label: "Location Name",
          type: "label",
          key: "Location_Name",
          value: "",
        },
        {
          label: "Pickup Address",
          type: "label",
          key: "Pickup_Address",
          value: "",
        },
        {
          label: "Location Incharge",
          type: "label",
          key: "Location_Incharge",
          value: "",
        },
        {
          label: "Pincode",
          type: "label",
          key: "Delivery_Pincode",
          value: "",
        },
      ],
    },
  ]);

  var Pin_code = LocationFields.map((o) => {
    if (o.key == "Dispatch_Location_card") {
      var Dispatch_Pincode = o.value.map((pin) => {
        if (pin.key == "Dispatch_Pincode") {
          return pin.value;
        }
      });
      return Dispatch_Pincode;
    } else if (o.key == "Delivery_Location_card") {
      var Delivery_Pincode = o.value.map((pin) => {
        if (pin.key == "Delivery_Pincode") {
          return pin.value;
        }
      });
      return Delivery_Pincode;
    }
  });
  console.log("Dispatch_Pincode--", Pin_code);
  console.log("Getting Pincodes", Pin_code[0][3]);
  console.log("Getting Pincodes", Pin_code[1][3]);

  const [PackageDetailsFields, setPackageDetailsFields] = useState([
    {
      label: "Package Length",
      key: "package_length",
      type: "input",
    },
    {
      label: "Package Breadth",
      key: "package_breadth",
      type: "input",
    },
    {
      label: "Package Weight",
      key: "package_weight",
      type: "input",
    },
    {
      label: "Package Height",
      key: "package_height",
      type: "input",
    },
    {
      label: "Volumetric Dimensions",
      key: "volumetric_dimensions",
      type: "input",
    },
  ]);

  const [SelfDataFields, setSelfDataFields] = useState([
    {
      label: "Carrier Name",
      type: "input",
      required: true,
      key: "Carrier_Name",
    },
    {
      label: "AWB Number",
      type: "input",
      required: true,
      key: "AWB_Number",
    },
  ]);

  const [Estimated_Cost, setEstimated_Cost] = useState({});

  function calulate_total() {
    if (selectedProductData && mainData && Estimated_Cost) {
      var val1 = selectedProductData
        ?.map((o) => o.Amount)
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

  var [deletedProducts, setdeletedProducts] = useState([]);

  const handleButtonClick = (key) => {
    console.log("maindataaaaaaaaa", mainData);
    if (props && props.id) {
      deletedProducts.forEach((e) => {
        dispatch(deleteProductLine(istdata.id, e?.sku_id?.id));
      });
    }
    if (key == "Get Quote") {
      var data = {
        origin_pincode: Pin_code[0][3],
        destination_pincode: Pin_code[1][3],
        package_details: {
          length: Number(mainData.package_length),
          breadth: Number(mainData.package_breadth),
          height: Number(mainData.package_height),
          weight: Number(mainData.package_weight),
          dimensions: Number(mainData.volumetric_dimensions),
          carrier_name: mainData.Carrier_Name,
          awb_number: Number(mainData.AWB_Number),
        },
        is_cod: true,
      };
      console.log(data, "pincodes");
      dispatch(estimatedcost(data));
      return true;
    }

    if (key == "Cancel") {
      history.push("/ist");
      return;
    }

    var Estimated_Cost_details = Estimated_Cost?.find(
      (o) => o.Estimated_Cost_Select == mainData.Estimated_Cost_Select
    );
    var Location_Details_card = LocationFields.find(
      (o) =>
        o.key == "Dispatch_Location_card" || o.key == "Delivery_Location_card"
    ).data;
    console.log(selectedProductData, "selecteProductDataaaaaaa");
    console.log(mainData, "buttonMainData");

    var body = {
      reference_number: mainData.reference_number,
      ist_date: "2022-06-21T18:27:50.1913752+05:30",
      receipt_routing_id:
        mainData.receipt_routing_id && mainData.receipt_routing_id.id
          ? Number(mainData.receipt_routing_id?.id)
          : Number(mainData.receipt_routing_id),
      source_location_id:
        mainData.source_location_id && mainData.source_location_id.id
          ? Number(mainData.source_location_id?.id)
          : Number(mainData.source_location_id),
      // source_location_id: Number(mainData.source_location_id),
      destination_location_id:
        mainData.destination_location_id && mainData.destination_location_id.id
          ? Number(mainData.destination_location_id?.id)
          : Number(mainData.destination_location_id),
      no_of_items: 15,
      total_quantity: 2,
      status_id: 5,
      scheduled_delivery_date:
        mainData.scheduled_delivery_date + "T18:27:50.1913752+05:30",
      reason_id:
        mainData.reason_id && mainData.reason_id.id
          ? Number(mainData.reason_id?.id)
          : Number(mainData.reason_id),
      source_document_type_id:
        mainData?.Source_Document_Type?.id &&
        mainData?.Source_Document_Type?.id?.id
          ? mainData?.Source_Document_Type?.id?.id
          : mainData?.Source_Document_Type?.id,
      // source_documents: mainData?.Source_Document_Type?.data
      //   ? mainData?.Source_Document_Type?.data
      //   : istdata != null
      //   ? istdata
      //   : {},
      // shipping_mode_id: parseInt(mainData?.shipping_mode_id),
      source_documents: {
        id: mainData?.Select_Source_Document?.id
          ? mainData?.Select_Source_Document?.id
          : mainData?.Select_Source_Document,
        data: mainData?.Select_Source_Document?.label
          ? mainData?.Select_Source_Document?.label
          : mainData?.Select_Source_Document,
      },
      source_document_id: mainData?.Select_Source_Document?.id,
      // source_document_type_id: mainData?.Select_Source_Document?.id,

      // internal_transfer_lines: [
      //   {
      //     product_id: 1,
      //     product_template_id: 1,
      //     serial_number: "123456",
      //     inventory_id: 1,
      //     uom_id: 1,
      //     source_stock: 10,
      //     is_scarp: true,
      //     destination_stock: 10,
      //     transfer_quantity: 10,
      //   },
      // ],
      internal_transfer_lines: selectedProductData.map((o) => {
        return {
          product_id: Number(o?.product_template_id),
          product_name: o?.product_name,
          product_template_id: Number(o?.product_template_id),
          serial_number: o?.serial_number,
          inventory_id: Number(o?.inventory_id),
          // uom_id: Number(o?.uomName),
          uom_id: 1,
          source_stock: Number(o?.source_stock),
          is_scarp: o?.is_scarp,
          destination_stock: Number(o?.destination_stock),
          transfer_quantity: Number(o?.transfer_quantity),
        };
      }),
      shipping_carrier_id: mainData.Estimated_Cost_Select,
      shipping_details: {
        shipping_preference: mainData.Shipment_Type,
        package_details: {
          length: Number(mainData.package_length),
          breadth: Number(mainData.package_breadth),
          height: Number(mainData.package_height),
          weight: Number(mainData.package_weight),
          dimensions: Number(mainData.volumetric_dimensions),
          carrier_name: mainData.Carrier_Name,
          awb_number: Number(mainData.AWB_Number),
        },
        estimated_cost: {
          shipping_partner:
            Estimated_Cost_details?.Estimated_Cost_Shipping_Partners,
          charges: Number(Estimated_Cost_details?.Estimated_Cost_Charges),
          order_delivery_time:
            Estimated_Cost_details?.Estimated_Cost_Order_Deliver_Time,
        },
        current_balance: 100,
      },
      pickup_date_and_time: {
        pickup_date: mainData?.pickup_date + "T22:19:32.8080397+05:30",
        pickup_from_time: "2022-05-12" + mainData?.Schedule_Pickup_from_time,
        pickup_to_time: "2022-05-12" + mainData?.Schedule_Pickup_to_time,
      },
      shipping_mode_id: 119,
    };

    console.log("body", body);
    if (props && props.id) {
      dispatch(
        Update_IST_Data(props.id, body, function (resp) {
          toast(resp);
        })
      );
    } else {
      dispatch(
        Save_IST_Data(body, function (resp) {
          toast(resp);
        })
      );
    }
    history.push(`/ist`);
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

  const [EstimatedCostheadCells, setEstimatedCostheadCells] = useState([
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
  ]);

  const [ShippingDetailsFields, setShippingDetailsFields] = useState([
    {
      label: "Shipment Type",
      type: "radio",
      key: "Shipment_Type",
      sub: [
        { label: "Eunimart", value: 119, checked: true },
        { label: "Self", value: 118 },
      ],
    },
  ]);

  const [PackageDetailsFields1, setPackageDetailsFields1] = useState([
    {
      label: "Carrier Name",
      type: "input",
      key: "Carrier_Name",
    },
    {
      label: "AWB Number",
      type: "input",
      key: "AWB_Number",
    },
  ]);

  return (
    <>
      {/* //Enter IST Details */}
      <AddForm
        header={"IST Details"}
        // data={ISTDetailsFields}
        data={ISTDetailsFields.map((field) => {
          console.log(field.key, "field key");
          switch (field.key) {
            case "reason_id": {
              field.data = Lookups?.map((curElem) => {
                return {
                  id: curElem?.id,
                  label: curElem.lookup_code,
                };
              });
              break;
            }
            case "receipt_routing_id": {
              field.data = LookupsRouting?.map((curElem) => {
                return {
                  id: curElem?.id,
                  label: curElem.lookup_code,
                };
              });
              break;
            }
            case "source_location_id": {
              field.data = Location?.map((curElem) => {
                return {
                  id: curElem?.id,
                  label: curElem.name,
                };
              });
              break;
            }
            case "destination_location_id": {
              field.data = Location?.map((curElem) => {
                return {
                  id: curElem?.id,
                  label: curElem.name,
                };
              });
              break;
            }
            case "Source_Document_Type": {
              field.data = SourceDocument.map((curElem) => {
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
                mainData.Source_Document_Type.lookup_code == "SALES_ORDERS"
                  ? Salesdata.map((o) => {
                      return { id: o.id, label: o.sales_order_number };
                    })
                  : mainData &&
                    mainData.Source_Document_Type &&
                    mainData.Source_Document_Type.lookup_code ==
                      "DELIVERY_ORDERS"
                  ? Deliverydata.map((o) => {
                      return {
                        id: o.id,
                        label: o?.delivery_order_details?.delivery_order_number,
                      };
                    })
                  : mainData &&
                    mainData.Source_Document_Type &&
                    mainData.Source_Document_Type.lookup_code == "ASN"
                  ? ASNdata.map((o) => {
                      return { id: o.id, label: o.asn_number };
                    })
                  : mainData &&
                    mainData.Source_Document_Type &&
                    mainData.Source_Document_Type.lookup_code ==
                      "PURCHASE_ORDERS"
                  ? purchaseOrdersData.map((o) => {
                      return { id: o.id, label: o.purchase_order_number };
                    })
                  : mainData &&
                    mainData.Source_Document_Type &&
                    mainData.Source_Document_Type.lookup_code == "GRN"
                  ? GRNdata.map((o) => {
                      return { id: o.id, label: o.grn_number };
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

      {/* //Product Details */}

      <AddForm_Table
        headCells={headCells}
        table_data={selectedProductData}
        handelInputChange={handelInputChange}
        handelSelectonChange={handelSelectonChange}
        handelCheckBoxonChange={handelCheckBoxonChange}
        setRadioType={setRadioType}
        header={"Product Details"}
        renderFooter={() => (
          <center style={{ marginTop: 10 }}>
            <Link onClick={onAddNewRaw} underline="none">
              + Add Another Line
            </Link>
          </center>
        )}
      />

      {/* // Location Details */}
      <AddForm
        header={"Location Details"}
        data={LocationFields.map((field) => {
          return field;
        })}
        handelInputChange={handelInputChange}
        handelSelectonChange={handelSelectonChange}
        handelCheckBoxonChange={handelCheckBoxonChange}
        setRadioType={setRadioType}
      />

      {/* <CreateShippingDetails /> */}

      <AddForm
        header={"Shipping Details"}
        data={ShippingDetailsFields}
        handelInputChange={handelInputChange}
        handelSelectonChange={handelSelectonChange}
        handelCheckBoxonChange={handelCheckBoxonChange}
        handelRadionButtononChange={handelRadionButtononChange}
        IsCheckboxShowForCopyField={true}
        CheckboxShowForCopyField_text={"Create Shipping"}
        CheckboxShowForCopyField_value={false}
        handelCheckboxShowForCopyField_valueChange={
          handelCheckboxShowForCopyField_valueChange
        }
        Islabel_priceSpace={true}
      />

      {/* //Package Details */}
      {mainData?.Shipment_Type == "Eunimart" && (
        <>
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
          <RemoteViewBox_Table
            headCells={EstimatedCostheadCells}
            table_data={Estimated_Cost}
            header={"Estimated Cost"}
            IsBouttonShow={true}
            ButtonName={"Get Quote"}
            handleButtonClick={handleButtonClick}
            handelEstimated_Cost_RadionButtononChange={
              handelEstimated_Cost_RadionButtononChange
            }
          />
        </>
      )}
      {mainData?.Shipment_Type == "Self" && (
        <AddForm
          header={"self Details"}
          data={PackageDetailsFields1}
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
      )}
      {mainData?.Shipment_Type == null && (
        <>
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
          <RemoteViewBox_Table
            headCells={EstimatedCostheadCells}
            table_data={Estimated_Cost}
            header={"Estimated Cost"}
            IsBouttonShow={true}
            ButtonName={"Get Quote"}
            handleButtonClick={handleButtonClick}
            handelEstimated_Cost_RadionButtononChange={
              handelEstimated_Cost_RadionButtononChange
            }
          />
        </>
      )}

      {/* //Estimated Cost */}

      <AddForm
        header={"Schedule Pickup Date and Time"}
        data={DateandTime}
        // data={DateandTime.map((field) => {
        //   return field;
        // })}
        handelInputChange={handelInputChange}
        handelSelectonChange={handelSelectonChange}
        handelCheckBoxonChange={handelCheckBoxonChange}
        setRadioType={setRadioType}
      />

      <AddFormFooter_Button handleButtonClick={handleButtonClick} />

      <ToastContainer />
    </>
  );
};

export default ISTCreate;

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
