import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import "./index.css";
import {
  loadLocationsData,
  loadLocationsByIdData,
  loadLocationstypeData,
  Save_Location_Data,
  Update_Location_Data,
  loadIntegratedChannelsData,
  loadShippingPartnersDataById,

} from "../redux/Actions/action";
import StepperForm from "../components/Stepper/Stepper";
import LocationsMap from "../components/WarehousesMapView/WarehousesMapView";

import {
  Link,
  Box,
  Typography,
  IconButton,
  Tab,
  getTextFieldUtilityClass,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// _______Remote Imports_________________

import AddForm from "Remote/AddForm";
import AddForm_Table from "Remote/AddForm_Table";
// ______________________________________________

import {
  loadCurrencyData,
  loadCountryData,
  loadStateDataById,
} from "../redux/Actions/action";

export default function LocationEdit() {
  const { Id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const id = useParams().id
  const [activeStep, setActiveStep] = useState(0);
  var data = {};
  const [selectedParent, setSelectedParent] = useState(5);



  useEffect(() => {
    dispatch(loadCurrencyData());
    dispatch(loadCountryData());
    dispatch(loadLocationsData());
    dispatch(loadLocationstypeData());
    dispatch(loadShippingPartnersDataById());
    dispatch(loadIntegratedChannelsData());
  }, []);

  const [mainData, setMainData] = useState({});
  const [Country, setCountry] = useState();
  const [submit, setSubmit] = useState(false);
  const { Currencydata, Countrydata, Statedata, locationData, locationById, Shippingpartnersdata, integratedChannels, locationTypes } =
    useSelector((state) => state.data);
  useEffect(() => {
    dispatch(loadLocationsByIdData(Id));
  }, [dispatch]);

  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(locationById, "locatonId")
    setValue(locationById?.LocationType?.lookup_code)
    var newData = mainData
    newData.location_type = locationById?.LocationType
    setMainData(newData)
  }, [locationById])

  const locationdata = useSelector((state) => state.data.locationById);
  const id1 = useParams().Id;
  //---------------------------------------------------


  useEffect(() => {
    if (id1 && locationdata) {
      console.log(locationdata?.parent_location?.id, "locationdatalocationdata")
      var newLocationDetailsFields = locationDetailsFeilds.map(
        o => {
          if (o.key == "name") o.value = locationdata?.name;
          if (o.key == "location_id") o.value = locationdata?.location_id;
          if (o.key == "parent_location") o.value = {
            id: locationdata?.parent_location?.id, label: locationdata?.parent_location?.name
          };
          if (o.key == "location_type") o.value = {
            id: locationdata?.LocationType?.id, label: locationdata?.LocationType?.display_name
          };
          if (o.key == "address_line_1") o.value = locationdata?.address?.address_line_1;
          if (o.key == "address_line_2") o.value = locationdata?.address?.address_line_2;
          if (o.key == "address_line_3") o.value = locationdata?.address?.address_line_3;
          if (o.key == "land_mark") o.value = locationdata?.address?.land_mark;
          if (o.key == "pin_code") o.value = locationdata?.address?.pin_code;
          if (o.key == "country") o.value = locationdata?.address?.country?.name;
          if (o.key == "state") o.value = locationdata?.address?.state?.name;
          if (o.key == "city") o.value = locationdata?.address?.city;
          return o;
        }
      )
      setLocationDetailsFeilds(newLocationDetailsFields);

      //------------------------------------------------
      //--------------------------------------------------

      var newsetLocationDetails = setLocation.map(
        o => {
          if (o.key == "latitude") o.value = locationdata?.latitude;
          if (o.key == "longitude") o.value = locationdata?.longitude;

          return o;
        }
      )
      setLocationset(newsetLocationDetails);


      //--------------------------------------------
      //---------------------------------------------

      var newsetExternalDetails = externalDetails.map(
        o => {
          if (o.key == "external_id") o.value = locationdata?.location_details?.external_details?.code;
          if (o.key == "external_url") o.value = locationdata?.location_details?.external_details?.url;

          return o;
        }
      )
      setExternalDetails(newsetExternalDetails);


      // -------------------------------------------
      var newwarehouseConfiguration = warehouseConfiguration.map(
        o => {
          if (o.key == "shipping_partners") o.value = locationdata?.location_details?.shipping_partners?.partner_name;
          if (o.key == "integrated_channels") o.value = locationdata?.location_details?.integrated_channels?.name;

          return o;
        }
      )
      setwarehouseConfiguration(warehouseConfiguration);
      //-----------------------------------------------------
      //--------------------------------------------------

      var newadvanceChannelConfiguration = advanceChannelConfiguration.map(
        o => {
          if (o.key == "prices_include_tax") o.value = locationdata?.location_details?.price_includes_tax?.display_name;
          return o;
        }
      )
      setadvanceChannelConfiguration(advanceChannelConfiguration);

      //-----------------------------------------------
      //-----------------------------------------------
      var newinventoryDetails = inventoryDetails.map(
        o => {
          if (o.key == "search_Source_Facility") o.value = locationdata?.location_details?.source_facility?.name;
          return o;
        }
      )
      setinventoryDetails(inventoryDetails);

      //-------------------------------------------------------
      //-------------------------------------------------------

      var newsetPaymentMapping = [];
      if (locationdata?.location_details && locationdata?.location_details?.payment_mapping)
        newsetPaymentMapping = locationdata?.location_details?.payment_mapping?.map((o) => {
          return {
            pay_method: o.name,
            pay_name: o.name,
          };
        });
      setPaymentDetails(newsetPaymentMapping);


      //----------------------------------------------------
      //---------------------------------------------------------

      var newsetPaymentMappingVirtual = [];
      if (locationdata?.location_details && locationdata?.location_details?.payment_mapping)
        newsetPaymentMapping = locationdata?.location_details?.payment_mapping?.map((o) => {
          return {
            payment_method: o.name,
          };
        });
      setPaymentDetails(newsetPaymentMappingVirtual);

      var neweditDate = editDate.map(
        o => {
          if (o.key == "Createdate")
            o.value = moment(locationdata?.updated_date).format(
              "yyyy-MM-DD"
            );

          return o;
        }
      )
      seteditDate(neweditDate);

      //-----------------------------------------------
      //-----------------------------------------------

      var newsetlocationInchargeDetails = locationInchargeDetails.map(
        o => {
          if (o.key == "incharge_name") o.value = locationdata?.location_details?.location_incharge_details?.incharge_name;
          if (o.key == "incharge_email") o.value = locationdata?.location_details?.location_incharge_details?.email;
          if (o.key == "company_name") o.value = locationdata?.location_details?.location_incharge_details?.company_name;
          if (o.key == "incharge_mobile_no") o.value = locationdata?.location_details?.location_incharge_details?.mobile_number;
          return o;
        }
      )
      setlocationInchargeDetails(newsetlocationInchargeDetails);

      //-------------------------------------------------
      //---------------------------------------------

      var newsetBasicDetailsOfRetail = basicDetailsOfRetail.map(
        o => {
          if (o.key == "store_name") o.value = locationdata?.location_details?.store_name;
          if (o.key == "currency") o.value = locationdata?.location_details?.currency?.currency_code;
          if (o.key == "price_list") o.value = locationdata?.location_details?.price_list?.price_list_name;
          if (o.key == "linked_facility") o.value = locationdata?.location_details?.linked_facility?.name;
          return o;
        }
      )
      setbasicDetailsOfRetail(newsetBasicDetailsOfRetail);


      //-----------------------------------------------------
      //------------------------------------------------------

      var newsetwarehouseCapacityManagement = warehouseCapacityManagement.map(
        o => {
          if (o.key == "rack_capacity") o.value = locationdata?.location_details?.racks_capacity;
          if (o.key == "uom_racks") o.value = locationdata?.location_details?.racks_uom?.id;
          if (o.key == "shelves_capacity") o.value = locationdata?.location_details?.shelves_capacity;
          if (o.key == "uom_shelves") o.value = locationdata?.location_details?.shelves_uom?.id;
          if (o.key == "bins_capacity") o.value = locationdata?.location_details?.bins_capacity;
          if (o.key == "uom_bins") o.value = locationdata?.location_details?.bins_uom?.id;

          return o;
        }
      )
      setwarehouseCapacityManagement(newsetwarehouseCapacityManagement);

      //------------------------------------------------
      //------------------------------------------------

      var newsetwarehouseStorageManagementHeadCells = [];

      setWarehouseStorageManagement(newsetwarehouseStorageManagementHeadCells);

      //---------------------------------------------------
      //----------------------------------------------------

      var newwarehouseContactInfo = [];
      if (locationdata?.location_details && locationdata?.location_details?.contact_details)
        newsetPaymentMapping = locationdata?.location_details?.contact_details?.map((o) => {
          return {
            contact_name: o.name,
            role: o.role,
            phone_number: o.mobile_number,
            email_id: o.email,
            additional_phone_number: o.additional_phone_number,
            additional_email: o.additional_email,
          };
        });
      setWarehouseContactInfo(newwarehouseContactInfo);

      //------------------------------------------------------
      //--------------------------------------------------------




      //-------------------------------------------------------------------------
      //--------------------------------------------------------------------------
      //-----------------------------------------------------------------------------

      var newMainData = [
        ...newLocationDetailsFields,
        ...newsetLocationDetails,
        ...newsetExternalDetails,
        ...newwarehouseConfiguration,
        ...neweditDate,
        ...newadvanceChannelConfiguration,
        ...newinventoryDetails,
        ...newsetPaymentMapping,
        ...newsetlocationInchargeDetails,
        ...newsetBasicDetailsOfRetail,
        ...newsetwarehouseCapacityManagement,
        ...newsetwarehouseStorageManagementHeadCells,
        ...newwarehouseContactInfo
      ];
      var keyValuePairMainData = {};
      newMainData?.map(o => {
        if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      console.log("newMainData", newMainData, keyValuePairMainData);
      setMainData(keyValuePairMainData);
    }

  }, [locationdata])
  //----------------------------------------------------
  //----------------------------------------------------


  const [paymentDetails, setPaymentDetails] = useState([
    { payment_method: "", payment_method_name: "", payment_details: "" },
  ]);
  const [warehouseContactInfo, setWarehouseContactInfo] = useState([
    {
      contact_name: "",
      role: "",
      phone_number: "",
      email_id: "",
      additional_phone_number: "",
      additional_email: "",
    },
  ]);
  const [warehouseStorageManagement, setWarehouseStorageManagement] = useState([
    {
      zone_name: "",
      zone_priority: "",
      layout_symmetry: "",
      rows_in_zone: "",
      racks_in_rows: "",
      shelves_in_racks: "",
      bins_in_shelves: "",
      total_in_Bin: "",
    },
  ]);
  // _________________________________________

  const [locationDetailsFeilds, setLocationDetailsFeilds] = useState([
    {
      label: "Location Name*",
      type: "input",
      key: "name",
      required: true,
    },
    {
      label: "Location Type*",
      type: "select",
      key: "location_type",
      data: [],
    },
    {
      label: "Location ID*",
      type: "input",
      key: "location_id",
    },
    {
      label: "Parent Location",
      type: "select",
      key: "parent_location",
      data: [],
    },
    {
      label: "Address Line 1",
      type: "input",
      key: "address_line_1",
    },
    {
      label: "Address Line 2",
      type: "input",
      key: "address_line_2",
    },
    {
      label: "Address Line 3",
      type: "input",
      key: "address_line_3",
    },
    {
      label: "Landmark",
      type: "input",
      key: "land_mark",
    },
    {
      label: "Pincode",
      type: "input",
      key: "pin_code",
    },
    {
      label: "Country",
      type: "select",
      key: "country",
    },
    {
      label: "State",
      type: "select",
      key: "state",
    },
    {
      label: "City/District",
      type: "input",
      key: "city",
    },
  ]);

  const [locationType, setlocationType] = useState({});

  const [setLocation, setLocationset] = useState([
    {
      label: "Latitude",
      type: "input",
      key: "latitude",
    },
    {
      label: "Longitude",
      type: "input",
      key: "longitude",
    },
    {
      label: "Drop Location Pin",
      type: "button",
      key: "name",
    },
  ]);

  const [externalDetails, setExternalDetails] = useState([
    {
      label: "External ID",
      type: "input",
      key: "external_id",
    },
    {
      label: "External URL",
      type: "input",
      key: "external_url",
    },
  ]);

  const [locationInchargeDetails, setlocationInchargeDetails] = useState([
    {
      label: "Incharge Name",
      type: "input",
      key: "incharge_name",
    },
    {
      label: "Email",
      type: "input",
      key: "incharge_email",
    },
    {
      label: "Company Name",
      type: "input",
      key: "company_name",
    },
    {
      label: "Mobile No.",
      type: "input",
      key: "incharge_mobile_no",
    },
    {
      label: "Upload Profile Picture",
      type: "",
      key: "button",
    },
  ]);

  const paymentTypes = [
    { id: 41, label: "Upi" },
    { id: 40, label: "Netbanking" },
    { id: 39, label: "Debitcard" },
    { id: 38, label: "Creditcard" },
    { id: 37, label: "Cod" },
  ];

  const is_scrap_location_id = 0;

  const [warehouseConfiguration, setwarehouseConfiguration] = useState([
    // {
    //   label: "Is Scrap Location?",
    //   type: "radio",
    //   key: "is_scrap_location",
    //   onChange:setRadioType,
    //   sub:[{label:"Yessssss",value: "1"} , {label:"No",value:"2"} ]
    // },
    // {
    //   label: "Is Return Location?",
    //   type: "radio",
    //   key: "is_return_location",
    //   sub:[{label:"Yes",value:true},{label:"No",value:false}]
    // },
    {
      label: "Shipping Partners",
      type: "select",
      key: "shipping_partners",
    },
    {
      label: "Integrated Channels",
      type: "select",
      key: "integrated_channels",
    },
  ]);

  const [warehouseCapacityManagement, setwarehouseCapacityManagement] = useState([
    {
      label: "Racks Capacity*",
      type: "input",
      key: "rack_capacity",
      placeholder: "Racks Capacity",
    },
    {
      label: "UOM Of Racks",
      type: "input",
      key: "uom_racks",
    },
    {
      label: "Shelves Capacity*",
      type: "input",
      key: "shelves_capacity",
    },
    {
      label: "UOM Of Shelves",
      type: "input",
      key: "uom_shelves",
    },
    {
      label: "Bins Capacity*",
      type: "input",
      key: "bins_capacity",
    },
    {
      label: "UOM Of Bins",
      type: "input",
      key: "uom_bins",
    },
  ]);

  const paymentMappingHeadCells = [
    {
      key: "pay_method",
      label: "Payment Method",
      type: "select",
      data: paymentTypes?.map((field) => {
        return { id: field.id, label: field.label };
      }),
    },
    {
      key: "pay_name",
      label: "Payment Method Name",
      type: "text",
    },
    {
      key: "pay_details",
      label: "Payment Method Description",
      type: "text",
    },
  ];

  const [warehouseContactHeadCells, setwarehouseContactHeadCells] = useState([
    {
      key: "c_name",
      label: "Contact Name",
      type: "text",
    },
    {
      key: "c_role",
      label: "Role",
      type: "text",
    },
    {
      key: "c_phone",
      label: "Phone Number",
      type: "text",
    },

    {
      key: "c_mail",
      label: "Email ID",
      type: "text",
    },

    {
      key: "c_add_phone",
      label: "Additional Phone Number",
      type: "text",
    },

    {
      key: "c_add_mail",
      label: "Additional Email ID",
      type: "text",
    },
  ]);

  const warehouseStorageManagementHeadCells = [
    {
      key: "w_zone_name",
      label: "Zone ",
      type: "text",
    },
    {
      key: "w_zone_priority",
      label: "Zone Priority",
      type: "text",
    },
    {
      key: "w_layout_symmetry",
      label: "Layout Symmetry",
      type: "text",
    },

    {
      key: "w_rows_in_zone",
      label: "Rows in Zone",
      type: "text",
    },

    {
      key: "w_racks_in_rows",
      label: "Racks in Rows",
      type: "text",
    },
    {
      key: "w_shelves_in_racks",
      label: "Shelves in Racks",
      type: "text",
    },

    {
      key: "w_bins_in_shelves",
      label: "Bins in Shelves",
      type: "text",
    },

    {
      key: "w_total_in_Bin",
      label: "Total Bin Count",
      type: "text",
    },


  ];
  const [basicDetailsOfRetail, setbasicDetailsOfRetail] = useState([
    {
      label: "Store Name",
      type: "input",
      key: "store_name",
    },
    {
      label: "Currency",
      type: "select",
      key: "currency",
      data: [],
    },
    {
      label: "Price List",
      type: "input",
      key: "price_list",
    },
    {
      label: "Linked Facility",
      type: "input",
      key: "linked_facility",
    },
    {
      label: "Order Tags",
      type: "input",
      key: "tags",
    },
  ]);
  const [advanceChannelConfiguration, setadvanceChannelConfiguration] = useState([
    {
      label: "Prices Include tax",
      type: "select",
      key: "prices_include_tax",
      data: [
        {
          id: 1,
          label: "YES",
          value: true
        },
        {
          id: 2,
          label: "NO",
          value: false
        }
      ],
    },
  ]);
  const [inventoryDetails, setinventoryDetails] = useState([
    {
      label: "Search Source Facility",
      type: "select",
      key: "search_source_facility",
      data: [],
    },
  ]);

  // ______________________________________________________

  const onAddNewRaw = () => {
    setPaymentDetails([
      ...paymentDetails,
      { payment_method: "", payment_method_name: "", payment_details: "" },
    ]);
  };

  const onAddContact = () => {
    setWarehouseContactInfo([
      ...warehouseContactInfo,
      {
        contact_name: "",
        role: "",
        phone_number: "",
        email_id: "",
        additional_phone_number: "",
        additional_email: "",
      },
    ]);
  };

  const onAddZone = () => {
    setWarehouseStorageManagement([
      ...warehouseStorageManagement,
      {
        zone_name: "",
        zone_priority: "",
        layout_symmetry: "",
        rows_in_zone: "",
        racks_in_rows: "",
        shelves_in_racks: "",
        bins_in_shelves: "",
        total_in_Bin: "",
      },
    ]);
  };




  //---------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //------------------------------------------------------------------------------


  const setDataByKeyAndValue = (key, value, index = null) => {

    console.log("key", key, "value", value);



    try {
      var newLocationDetailsFields = locationDetailsFeilds
        .map(o => {
          if (o.key == key) o.value = value;
          return o;
        })
      setLocationDetailsFeilds(newLocationDetailsFields);
    }
    catch (e) { console.error("err1", e) }

    try {
      var newsetLocationDetails = setLocation
        .map(o => {
          if (o.key == key) o.value = value;
          return o;
        })
      setLocationset(newsetLocationDetails);
    }
    catch (e) { console.error("err2", e) }

    try {
      var newsetExternalDetails = externalDetails
        .map(o => {
          if (o.key == key) o.value = value;
          return o;
        })
      setExternalDetails(newsetExternalDetails);
    }
    catch (e) { console.error("err3", e) }

    try {
      var newsetPaymentMapping = paymentMappingHeadCells
        .map(o => {
          if (o.key == key) o.value = value;
          return o;
        })
      setPaymentDetails(newsetPaymentMapping);
    }
    catch (e) { console.error("err4", e) }


    try {
      var newwarehouseConfiguration = paymentMappingHeadCells
        .map(o => {
          if (o.key == key) o.value = value;
          return o;
        })
      setwarehouseConfiguration(newwarehouseConfiguration);
    }
    catch (e) { console.error("err5", e) }


    try {
      var newsetlocationInchargeDetails = locationInchargeDetails
        .map(o => {
          if (o.key == key) o.value = value;
          return o;
        })
      setlocationInchargeDetails(newsetlocationInchargeDetails)
    }
    catch (e) { console.error("err6", e) }


    try {
      var newsetwarehouseCapacityManagement = warehouseCapacityManagement
        .map(o => {
          if (o.key == key) o.value = value;
          return o;
        })
      setwarehouseCapacityManagement(newsetwarehouseCapacityManagement);
    }
    catch (e) { console.error("err7", e) }

    try {
      var newsetwarehouseStorageManagementHeadCells = warehouseStorageManagement
        .map(o => {
          if (o.key == key) o.value = value;
          return o;
        })
      setWarehouseStorageManagement(newsetwarehouseStorageManagementHeadCells);
    }
    catch (e) { console.error("err8", e) }

    try {
      var newwarehouseContactInfo = warehouseContactInfo
        .map(o => {
          if (o.key == key) o.value = value;
          return o;
        })
      setWarehouseContactInfo(newwarehouseContactInfo);
    }
    catch (e) { console.error("err9", e) }

    try {
      var neweditDate = editDate
        .map(o => {
          if (o.key == key) o.value = value;
          return o;
        })
      seteditDate(neweditDate);
    }
    catch (e) { console.error("err10", e) }

    try {
      var newsetPaymentMappingVirtual = paymentDetails
        .map(o => {
          if (o.key == key) o.value = value;
          return o;
        })
      setPaymentDetails(newsetPaymentMappingVirtual);
    }
    catch (e) { console.error("err11", e) }

    try {
      var newsetBasicDetailsOfRetail = basicDetailsOfRetail
        .map(o => {
          if (o.key == key) o.value = value;
          return o;
        })
      setbasicDetailsOfRetail(newsetBasicDetailsOfRetail);
    }
    catch (e) { console.error("err12", e) }

    try {
      var newadvanceChannelConfiguration = advanceChannelConfiguration
        .map(o => {
          if (o.key == key) o.value = value;
          return o;
        })
      setadvanceChannelConfiguration(newadvanceChannelConfiguration);
    }
    catch (e) { console.error("err13", e) }
    try {
      var newinventoryDetails = inventoryDetails
        .map(o => {
          if (o.key == key) o.value = value;
          return o;
        })
      setinventoryDetails(newinventoryDetails);
    }
    catch (e) { console.error("err14", e) }
  }


  //---------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------



  const handelInputChange = (key, value, index = null) => {
    console.log("key", key, "value", value, "index", index);
    setDataByKeyAndValue(key, value, index);


    if (key === "pay_method") {
      var newMainData = mainData;

      (paymentDetails[index].id = value),
        (newMainData["payment_mapping"] = paymentDetails);
      setMainData(newMainData);
    }

    if (key === "pay_name") {
      var newMainData = mainData;
      (paymentDetails[index].payment_method_name = value),
        (newMainData["payment_mapping"] = paymentDetails);
      setMainData(newMainData);
    }

    if (key === "pay_details") {
      var newMainData = mainData;
      (paymentDetails[index].payment_details = value),
        (newMainData["payment_mapping"] = paymentDetails);
      setMainData(newMainData);
    }

    if (index != null) {
      var newSelectedProductData = JSON.parse(JSON.stringify(paymentDetails));
      if (key === "pay_method") {
        console.log("pay_method");
        var selectVarient = paymentTypes.find((o) => o.id == value.id);
        newSelectedProductData[index] = selectVarient;
        newSelectedProductData[index][key] = value.label;
      }
    } else {
      var newMainData = mainData;
      newMainData[key] = value;
      setMainData(newMainData);
    }

    console.log(mainData, "mainDataAfterInput");
  };

  const handelSelectonChange = (key, value) => {
    console.log("key", key, "value", value, "cx");

    switch (key) {
      case "location_type": {
        setLocationDetailsFeilds(locationDetailsFeilds.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;

      }
      case "parent_location": {
        setLocationDetailsFeilds(locationDetailsFeilds.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;

      }
      case "country": {
        setLocationDetailsFeilds(locationDetailsFeilds.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;

      }
      case "state": {
        setLocationDetailsFeilds(locationDetailsFeilds.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;

      }
      case "pay_method": {
        setPaymentDetails(locationDetailsFeilds.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;

      }
      case "payment_method": {
        setPaymentDetails(locationDetailsFeilds.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;

      }
      case "integrated_channels": {
        setWarehouseConfiguration(warehouseConfiguration.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;

      }
      case "shipping_partners": {
        setWarehouseConfiguration(warehouseConfiguration.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;

      }
      case "prices_include_tax": {
        setadvanceChannelConfiguration(advanceChannelConfiguration.map(o => { if (o.key == key) return { ...o, value: value.value }; return o }));
        break;

      }
      case "currency": {
        setbasicDetailsOfRetail(basicDetailsOfRetail.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;

      }
      case "search_source_facility": {
        setinventoryDetails(inventoryDetails.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;

      }
    }

    if (key === "country") {
      setCountry(value?.id);
      dispatch(loadStateDataById(value?.id));
    }
    if (key === "location_type") {
      setlocationType(value);
      setValue(value?.lookup_code);
    }
    if (key === "parent_location") {
      var newMainData = mainData;
      newMainData[key] = value?.id;
      setMainData(newMainData);
    } else {
      var newMainData = mainData;
      newMainData[key] = value;
      setMainData(newMainData);
    }
  };

  const handelCheckBoxonChange = (field) => {
    console.log("onCheckboxChanges", field);
  };

  const setRadioType = (prop, value) => {
    console.log(value, "value_value_value");
  };

  const handelButtonClick = () => {
    var data;
    console.log(mainData, "mainData1");
    if (mainData?.location_type?.lookup_code === "LOCAL_WAREHOUSE") {
      data = {
        name: mainData?.name,
        location_type_id: parseInt(mainData?.location_type?.id),
        location_id: mainData?.location_id,
        parent_id: parseInt(mainData?.parent_location),

        address: {
          state: { id: parseInt(mainData?.state?.id), name: mainData?.state?.label },
          country: {
            id: parseInt(mainData?.country?.id),
            name: mainData?.country?.label,
          },
          city: mainData?.city,
          pin_code: parseInt(mainData?.pin_code),
          land_mark: mainData?.land_mark,
          address_line_1: mainData?.address_line_1,
          address_line_2: mainData?.address_line_2,
          address_line_3: mainData?.address_line_3,
        },
        location_docs: {
          gst_number: "GST13423",
          gst_doc: {
            data: "",
            link: "https://i.picsum.photos/id/178/200/200.jpg?hmac=GK9f8ye2NPD_TryXyT9usVR7k8DqVVnm5JSxzwvBWvk",
            name: "image1",
            size: 200,
            type: "image/jpeg",
          },
        },
        latitude: parseFloat(mainData?.latitude),
        longitude: parseFloat(mainData?.longitude),
        serviceable_area_ids: [
          {
            latitude: 11.280292,
            longitude: 22.379383,
            name: "ABC private Limited",
            address_line1: "6/129, Laal Bazar",
            address_line2: "Gandhi Road",
            address_line3: "Subash Nagar",
            city: "Salem",
            state: "Tamil Nadu",
            Country: "India",
            extra_details: "extra info",
          },
        ],
        location_details: {
          contact_details: warehouseContactInfo.map((row) => {
            return {
              name: row?.contact_name,
              role: row?.role,
              phone_number: row?.phone_number,
              email: row?.email_id,
              additional_phone_number: row?.additional_phone_number,
              additional_email: row?.additional_email,
              image: {
                data: "",
                link: "https://i.picsum.photos/id/178/200/200.jpg?hmac=GK9f8ye2NPD_TryXyT9usVR7k8DqVVnm5JSxzwvBWvk",
                name: "image1",
                size: 200,
                type: "image/jpeg",
              },
            }
          }),
          is_scrap_location: true,
          is_return_location: true,
          shipping_partner_id: 1,
          integrated_channel_id: 1,
          warehouse_storage_management: {
            zone_name: mainData?.zone_name,
            zone_priority: mainData?.zone_priority,
            layout_symmetric: parseInt(mainData?.layout_symmetric),
            rows_in_zone: parseInt(mainData?.rows_in_zone),
            rows_in_racks: parseInt(mainData?.racks_in_rows),
            racks_in_shelves: parseInt(mainData?.shelves_in_racks),
            bins_in_shelves: parseInt(mainData?.bins_in_shelves),
            total_bin_count: parseInt(mainData?.total_in_Bin),
          },
          racks_capacity: parseInt(mainData?.rack_capacity),
          shelves_capacity: parseInt(mainData?.shelves_capacity),
          bins_capacity: parseInt(mainData?.bins_capacity),
          racks_uom_id: parseInt(mainData?.uom_racks),
          shelves_uom_id: parseInt(mainData?.uom_shelves),
          bins_uom_id: parseInt(mainData?.uom_bins),
        },
      };

    }
    else if (mainData?.location_type?.lookup_code === "RETAIL") {

      data = {
        name: mainData?.name,
        location_type_id: parseInt(mainData?.location_type?.id),
        location_id: mainData?.location_id,
        parent_id: parseInt(mainData?.parent_location),
        address: {
          state: { id: parseInt(mainData?.state?.id), name: mainData?.state?.label },
          country: {
            id: parseInt(mainData?.country?.id),
            name: mainData?.country?.label,
          },
          city: mainData?.city,
          pin_code: parseInt(mainData?.pin_code),
          land_mark: mainData?.land_mark,
          address_line_1: mainData?.address_line_1,
          address_line_2: mainData?.address_line_2,
          address_line_3: mainData?.address_line_3,
        },
        location_docs: {
          gst_number: "GST13423",
          gst_doc: {
            data: " ",
            link: "https://i.picsum.photos/id/178/200/200.jpg?hmac=GK9f8ye2NPD_TryXyT9usVR7k8DqVVnm5JSxzwvBWvk",
            name: "image1",
            size: 200,
            type: "image/jpeg",
          },
        },
        latitude: parseFloat(mainData?.latitude),
        longitude: parseFloat(mainData?.longitude),
        serviceable_area_ids: [
          {
            latitude: 11.280292,
            longitude: 22.379383,
            name: "ABC private Limited",
            address_line1: "6/129, Laal Bazar",
            address_line2: "Gandhi Road",
            address_line3: "Subash Nagar",
            city: "Salem",
            state: "Tamil Nadu",
            Country: "India",
            extra_details: "extra info",
          },
        ],
        location_details: {
          location_incharge_details: {
            incharge_name: mainData?.incharge_name,
            email: mainData?.incharge_email,
            company_name: mainData?.company_name,
            mobile_number: mainData?.incharge_mobile_no,
            image: {
              data: " ",
              link: "https://i.picsum.photos/id/178/200/200.jpg?hmac=GK9f8ye2NPD_TryXyT9usVR7k8DqVVnm5JSxzwvBWvk",
              name: "image1",
              size: 200,
              type: "image/jpeg",
            },
          },
          payment_mapping: [
            paymentDetails.map((item) => {
              return {
                payment_method: item.payment_method,
                name: item.payment_method_name,
                description: item.payment_details,
              };
            }),
          ],
          store_name: mainData?.store_name,
          linked_facility_id: 2,
          currency_id: 1,
          allow_back_order: true,
          order_tag_ids: [
            {
              id: 57,
              name: "vendor",
            },
          ],
          price_includes_tax: mainData?.prices_include_tax,
          email_notification: true,
          partial_fulfilment: true,
          inventory_type_id: 64,
          source_facility_id: 1,
        },
      };
    } else if (mainData?.location_type?.lookup_code === "VIRTUAL_LOCATION") {
      data = {
        name: mainData?.name,
        location_type_id: parseInt(mainData?.location_type?.id),
        location_id: mainData?.location_id,
        parent_id: parseInt(mainData?.parent_location),
        address: {
          state: { id: parseInt(mainData?.state?.id), name: mainData?.state?.label },
          country: {
            id: parseInt(mainData?.country?.id),
            name: mainData?.country?.label,
          },
          city: mainData?.city,
          pin_code: parseInt(mainData?.pin_code),
          land_mark: mainData?.land_mark,
          address_line_1: mainData?.address_line_1,
          address_line_2: mainData?.address_line_2,
          address_line_3: mainData?.address_line_3,
        },
        location_docs: {
          gst_number: "GST13423",
          gst_doc: {
            data: " ",
            link: "https://i.picsum.photos/id/178/200/200.jpg?hmac=GK9f8ye2NPD_TryXyT9usVR7k8DqVVnm5JSxzwvBWvk",
            name: "image1",
            size: 200,
            type: "image/jpeg",
          },
        },
        latitude: parseFloat(mainData?.latitude),
        longitude: parseFloat(mainData?.longitude),

        serviceable_area_ids: [
          {
            latitude: 11.280292,
            longitude: 22.379383,
            name: "ABC private Limited",
            address_line1: "6/129, Laal Bazar",
            address_line2: "Gandhi Road",
            address_line3: "Subash Nagar",
            city: "Salem",
            state: "Tamil Nadu",
            Country: "India",
            extra_details: "extra info",
          },
        ],
        location_details: {
          location_incharge_details: {
            incharge_name: mainData?.incharge_name,
            email: mainData?.incharge_email,
            company_name: mainData?.company_name,
            mobile_number: mainData?.incharge_mobile_no,
            image: {
              data: " ",
              link: "https://i.picsum.photos/id/178/200/200.jpg?hmac=GK9f8ye2NPD_TryXyT9usVR7k8DqVVnm5JSxzwvBWvk",
              name: "image1",
              size: 200,
              type: "image/jpeg",
            },
          },
          payment_mapping: [
            paymentDetails.map((item) => {
              return {
                payment_method: item.payment_method,
                name: item.payment_method_name,
                description: item.payment_details,
              };
            }),
          ],
          store_name: mainData?.store_name,
          currency_id: 1,
          allow_back_order: true,
          order_tag_ids: [
            {
              id: 43,
              name: "Net15",
            },
          ],
          price_list_id: 1,
          price_includes_tax_id: 68,
          email_notification: true,
          partial_fulfilment: true,
          inventory_type_id: 1,
          source_facility_id: 16,
        },
      };
    } else if (mainData?.location_type?.lookup_code == "OFFICE") {
      data = {
        name: mainData?.name,
        location_type_id: parseInt(mainData?.location_type?.id),
        location_id: mainData?.location_id,
        parent_id: mainData?.parent_location,
        contact_details: {
          mobile_number: "9894748270",
          email: "sumit@gmail.com",
          notes: "description",
        },
        address: {
          state: { id: parseInt(mainData?.state?.id), name: mainData?.state?.label },
          country: {
            id: parseInt(mainData?.country?.id),
            name: mainData?.country?.label,
          },
          city: mainData?.city,
          pin_code: parseInt(mainData?.pin_code),
          land_mark: mainData?.land_mark,
          address_line_1: mainData?.address_line_1,
          address_line_2: mainData?.address_line_2,
          address_line_3: mainData?.address_line_3,
        },

        location_docs: {
          gst_number: "GST13423",
          gst_doc: {
            data: " ",
            link: "https://i.picsum.photos/id/178/200/200.jpg?hmac=GK9f8ye2NPD_TryXyT9usVR7k8DqVVnm5JSxzwvBWvk",
            name: "image1",
            size: 200,
            type: "image/jpeg",
          },
        },

        latitude: parseFloat(mainData?.latitude),
        longitude: parseFloat(mainData?.longitude),
        serviceable_area_ids: [
          {
            latitude: 11.280292,
            longitude: 22.379383,
            name: "ABC private Limited",
            address_line1: "6/129, Laal Bazar",
            address_line2: "Gandhi Road",
            address_line3: "Subash Nagar",
            city: "Salem",
            state: "Tamil Nadu",
            Country: "India",
            extra_details: "extra info",
          },
        ],
        location_details: {
          location_incharge_details: {
            incharge_name: mainData?.incharge_name,
            email: mainData?.incharge_email,
            company_name: mainData?.company_name,
            mobile_number: mainData?.incharge_mobile_no,
            image: {
              data: " ",
              link: "https://i.picsum.photos/id/178/200/200.jpg?hmac=GK9f8ye2NPD_TryXyT9usVR7k8DqVVnm5JSxzwvBWvk",
              name: "image1",
              size: 200,
              type: "image/jpeg",
            },
          },
        },
      };
    }
    console.log(data, "asdfghjk");

    if (id1) {
      dispatch(Update_Location_Data(data, id1));
    }
    else {
      dispatch(Save_Location_Data(data));
    }
    history.push("/locations");
  };

  // _______________________________________________________
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const [editDate, seteditDate] = useState([
    {
      label: "Created Date",
      type: "date",
      key: "Createdate",
    },
  ]);


  // _____________________________________________________________
  // _____________________________________________________________
  // _____________________________________________________________
  // _____________________________________________________________

  const sceSteperName = () => {
    if (value == "LOCAL_WAREHOUSE") return "Warehouse Details";
    else if (value == "RETAIL") return "Retail Details";
    else if (value == "VIRTUAL_LOCATION") return "Virtual Location Details";
    else if (value == "OFFICE") return "Factory/Office Details";
  };
  const createProductSteps = ["Location Details", sceSteperName()];

  console.log("warehouseContactHeadCells", warehouseContactHeadCells);
  console.log("warehouseContactInfo", warehouseContactInfo);
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <AddForm
              header={"Location Details"}
              data={locationDetailsFeilds.map((field) => {
                switch (field.key) {
                  case "country": {
                    field.data = Countrydata.map((o) => {
                      return { id: o.id, label: o.name.toUpperCase() };
                    });
                    break;
                  }
                  case "state": {
                    field.data = Statedata.map((o) => {
                      return { id: o.id, label: o.name };
                    });
                    break;
                  }
                  case "location_type": {
                    field.data = locationTypes.map((o) => {
                      return {
                        id: o.id,
                        label: o.display_name,
                        lookup_code: o.lookup_code
                      };
                    });
                    break;
                  }
                  case "parent_location": {
                    field.data = locationData.map((o) => {
                      return {
                        id: o.id,
                        label: o.name,
                      };
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
              header={"Set Location"}
              data={setLocation.map((field) => {
                return field;
              })}
              handelInputChange={handelInputChange}
              handelSelectonChange={handelSelectonChange}
              handelCheckBoxonChange={handelCheckBoxonChange}
              setRadioType={setRadioType}
            />
            <LocationsMap
              zoom={8}
              center={{ lat: 51.5287718, lng: -0.2416804 }}
            />
          </>
        );
      case 1:
        return (
          <>
            {value == "LOCAL_WAREHOUSE" ? (
              <>
                <AddForm
                  header={"Warehouse Details"}
                  data={editDate}

                  handelInputChange={handelInputChange}
                  handelSelectonChange={handelSelectonChange}
                  handelCheckBoxonChange={handelCheckBoxonChange}
                  setRadioType={setRadioType}
                />
                <AddForm_Table
                  headCells={warehouseContactHeadCells}
                  table_data={warehouseContactInfo}
                  handelInputChange={handelInputChange}
                  handelSelectonChange={handelSelectonChange}
                  header={"Warehouse Contact Info"}
                  renderFooter={() => (
                    <center style={{ marginTop: 10 }}>
                      <Link onClick={onAddContact} underline="none">
                        + Add Another Line
                      </Link>
                    </center>
                  )}
                />

                <AddForm
                  header={"Warehouse Configuration"}
                  data={warehouseConfiguration.map((field) => {
                    switch (field.key) {
                      case "shipping_partners": {
                        field.data = Shippingpartnersdata.map((o) => {
                          return { id: o?.shipping_partner?.id, label: o?.shipping_partner?.partner_name };
                        });  //data[0].shipping_partner.partner_name
                        break;
                      }
                      case "integrated_channels": {
                        field.data = integratedChannels.map((o) => {
                          return { id: o.id, label: o.name.toUpperCase() };
                        });
                        break;
                      }
                    }
                    return field;
                  }
                  )}
                  handelInputChange={handelInputChange}
                  handelSelectonChange={handelSelectonChange}
                  handelCheckBoxonChange={handelCheckBoxonChange}
                  setRadioType={setRadioType}
                />
                <AddForm_Table
                  headCells={warehouseStorageManagementHeadCells}
                  table_data={warehouseStorageManagement}
                  handelInputChange={handelInputChange}
                  handelSelectonChange={handelSelectonChange}
                  header={"Warehouse Storage Management"}
                  renderFooter={() => (
                    <center style={{ marginTop: 10 }}>
                      <Link onClick={onAddZone} underline="none">
                        + Add Another Line
                      </Link>
                    </center>
                  )}
                />

                <AddForm
                  header={"Warehouse Capacity Management"}
                  data={warehouseCapacityManagement}
                  handelInputChange={handelInputChange}
                  handelSelectonChange={handelSelectonChange}
                  handelCheckBoxonChange={handelCheckBoxonChange}
                  setRadioType={setRadioType}
                />
              </>
            ) : value == "RETAIL" ? (
              <>

                <AddForm
                  header={"Basic Details of Retail Store"}
                  data={basicDetailsOfRetail.map((field) => {
                    switch (field.key) {
                      case "currency": {
                        field.data = Currencydata.map((o) => {
                          return { id: o?.id, label: o?.name };
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
                  header={"Advance Channel Configuration"}
                  data={advanceChannelConfiguration.map((field) => {
                    return field;
                  })}
                  handelInputChange={handelInputChange}
                  handelSelectonChange={handelSelectonChange}
                  handelCheckBoxonChange={handelCheckBoxonChange}
                  setRadioType={setRadioType}
                />
                <AddForm
                  header={"Inventory Details"}
                  data={inventoryDetails.map((field) => {
                    switch (field.key) {
                      case "search_source_facility": {
                        field.data = locationData?.map((o) => {
                          return { id: o?.id, label: o?.name };
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
                  headCells={paymentMappingHeadCells}
                  table_data={paymentDetails}
                  handelInputChange={handelInputChange}
                  handelSelectonChange={handelSelectonChange}
                  header={"Payment Mapping"}
                  renderFooter={() => (
                    <center style={{ marginTop: 10 }}>
                      <Link onClick={onAddNewRaw} underline="none">
                        + Add Another Line
                      </Link>
                    </center>
                  )}
                />
                <AddForm
                  header={"Location Incharge Details"}
                  data={locationInchargeDetails.map((field) => {
                    return field;
                  })}
                  handelInputChange={handelInputChange}
                  handelSelectonChange={handelSelectonChange}
                  handelCheckBoxonChange={handelCheckBoxonChange}
                  setRadioType={setRadioType}
                />
              </>
            ) : value == "VIRTUAL_LOCATION" ? (
              <>
                <AddForm
                  header={"External Details"}
                  data={externalDetails.map((field) => {
                    return field;
                  })}
                  handelInputChange={handelInputChange}
                  handelSelectonChange={handelSelectonChange}
                  handelCheckBoxonChange={handelCheckBoxonChange}
                  setRadioType={setRadioType}
                />
                <AddForm_Table
                  headCells={paymentMappingHeadCells}
                  table_data={paymentDetails}
                  handelInputChange={handelInputChange}
                  handelSelectonChange={handelSelectonChange}
                  header={"Payment Mapping"}
                  renderFooter={() => (
                    <center style={{ marginTop: 10 }}>
                      <Link onClick={onAddNewRaw} underline="none">
                        + Add Another Line
                      </Link>
                    </center>
                  )}
                />

                <AddForm
                  header={"Location Incharge Details"}
                  data={locationInchargeDetails.map((field) => {
                    return field;
                  })}
                  handelInputChange={handelInputChange}
                  handelSelectonChange={handelSelectonChange}
                  handelCheckBoxonChange={handelCheckBoxonChange}
                  setRadioType={setRadioType}
                />
              </>
            ) : value == "OFFICE" ? (
              <>
                <AddForm
                  header={"Location Incharge Details"}
                  data={locationInchargeDetails.map((field) => {
                    return field;
                  })}
                  handelInputChange={handelInputChange}
                  handelSelectonChange={handelSelectonChange}
                  handelCheckBoxonChange={handelCheckBoxonChange}
                  setRadioType={setRadioType}
                />
              </>
            ) : (
              <></>
            )}
          </>
        );

      default:
        return "Unknown stepIndex";
    }
  }

  const handleNext = () => {
    if (createProductSteps.length - 1 > activeStep) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    if (activeStep === 1) {
      handelButtonClick();
    }
  };

  const handleBack = () => {
    switch (activeStep) {
      case 1:
        setActiveStep(0);
        break;
      case 2:
        setActiveStep(1);
        break;
      default:
        break;
    }
  };
  const handleCancel = () => {
    if (activeStep == 0) {
      if (typeof productId === "number") {
        // dispatch(postDeleteProduct(productId));
        history.push("/locations");
      } else {
        history.push("/locations");
      }
    } else if (activeStep === 1) {
      // dispatch(postDeleteProduct(productId));
      history.push("/locations");
    } else if (activeStep === 2) {
      // dispatch(postDeleteProduct(productId));
      history.push("/locations");
    }
  };

  // ------------------------------

  const step1Validation = () => {
    if (1 === 0) {
      return false;
    } else {
      return true;
    }
  };

  const step2Validation = () => {
    if (1 === 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    value !== null &&
    (<>
      <StepperForm
        edit={true}
        getStep={getStepContent}
        activeStep={activeStep}
        steps={createProductSteps}
        nextStep={handleNext}
        nextButtonIsValid={
          activeStep === 0
            ? step1Validation()
            : activeStep === 1
              ? step2Validation()
              : true
        }
        skipStep={true}
        cancelStep={handleCancel}
        backStep={handleBack}
      />
    </>)
  );
}



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