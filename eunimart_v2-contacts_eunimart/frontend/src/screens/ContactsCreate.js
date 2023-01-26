import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@mui/material";
import {
  loadContactType,
  loadSelectProperty,
  loadLocationType,
  loadCountries,
  loadStates,
  loadContact,
  createContact,
  loadContactsDataById,
  updateContact,
} from "../redux/Action/action";
import { Box, Typography } from "@mui/material";
import MatRadioButton from "Remote/MatRadioButton";
import AddForm from "Remote/AddForm";
import "../index.css";
import { Paper, Card, CardContent } from "@mui/material";
import ModalViewV2 from "../components/ModalViewV2";
import { tempContacts, tempData, settempContacts } from "../App";
import AddFormFooter_Button from "Remote/AddFormFooter_Button";
import { useHistory } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import { ContactSupportOutlined } from "@mui/icons-material";
import Button from "@mui/material/Button";
import moment from "moment";
var customCount = 0;
var customeFields = {};
var obj = {
  key: "",
  value: "",
};

function ContactsCreate(props) {
  const [indexAddress, setindexAddress] = useState();
  let dispatch = useDispatch();
  const history = useHistory();

  const [newlocationData, setnewlocationData] = useState({
    city: "",
    pin_code: "",
    state: "",
    land_mark: "",
    country: "",
    gst_in_number: "",
    location_name: "",
    location: "",
    address_line_1: "",
    address_line_2: "",
    address_line_3: "",
    contact_person_name: "",
    contact_person_number: "",
    address_type_id: 1,
    mark_default_address: false,
  });

  const [wholelocationData, setwholelocationData] = useState({});

  const {
    contact_type,
    contact_property,
    location_type,
    countries_data,
    states_data,
    contacts_data,
    contactSingledata,
    contactUpdatedata,
  } = useSelector(state => state.data);
  const [show, setShow] = useState(false);
  const [locationData, setlocationData] = useState([]);
  const [contactType, setContactType] = useState();

  useEffect(() => {
    dispatch(loadContactType());
    dispatch(loadSelectProperty());
    dispatch(loadLocationType());
    dispatch(loadCountries());
    dispatch(loadContact());

    if (props && props.id) {
      const { id } = props;
      dispatch(loadContactsDataById(id));
    } else {
      settempContacts();
    }
  }, []);

  useEffect(() => {
    if (props && props.id && contactSingledata) {
      var newMainData = [];
      settempContacts();
      var newtempContacts = contactSingledata["address_details"];
      for (const element in newtempContacts) {
        tempContacts.push(newtempContacts[element]);
      }
      settempContacts(newtempContacts);

      let decideArray = [];

      if (contactSingledata?.contact_type?.id == 57) {
        var newArray1 = [
          {
            label: "Contact Type",
            type: "radio",
            key: "contact_type",
            //defaultVal: contactType,
            sub: [],
            sub: [
              { label: "Business", value: 58 },
              { label: "Individual", value: 57, checked: true },
            ],
          },
          { label: "", type: "pre", key: "" },
          {
            label: "First Name",
            type: "input",
            key: "first_name",
          },
          {
            label: "Last Name",
            type: "input",
            key: "last_name",
          },
          {
            label: "Company Name",
            type: "input",
            key: "company_name",
          },
          {
            label: "Email",
            type: "input",
            key: "email",
          },
          {
            label: "Select Property",
            type: "select",
            key: "select_property",
          },
          {
            label: "Contact Number",
            type: "input",
            key: "contact_number",
          },
          {
            label: "Parent Contact",
            type: "select",
            key: "parent_contact",
          },
          {
            label: "Image",
            type: "upload_image",
            key: "upload_image",
          },
        ];
        decideArray = newArray1;
        setContactdetails(newArray1);
      } else if (contactSingledata?.contact_type?.id == 58) {
        var newArray2 = [
          {
            label: "Contact Type",
            type: "radio",
            key: "contact_type",
            //defaultVal: contactType,
            sub: [],
            sub: [
              { label: "Business", value: 58, checked: true },
              { label: "Individual", value: 57 },
            ],
          },
          { label: "", type: "pre", key: "" },
          {
            label: "Company Name",
            type: "input",
            key: "company_name",
          },
          {
            label: "Email",
            type: "input",
            key: "email",
          },
          {
            label: "Select Property",
            type: "select",
            key: "select_property",
          },
          {
            label: "Contact Number",
            type: "input",
            key: "contact_number",
          },
          {
            label: "Parent Contact",
            type: "select",
            key: "parent_contact",
          },
          {
            label: "Image",
            type: "upload_image",
            key: "upload_image",
          },
        ];
        decideArray = newArray2;
        setContactdetails(newArray2);
      }

      var newContactdetails = decideArray.map(o => {
        if (o.key == "contact_type") {
          o.value = contactSingledata?.contact_type?.id;
          tempData["contact_type"] = contactSingledata?.contact_type?.id;
          o.sub.map(o => {
            if (o.value == contactSingledata?.contact_type?.id)
              return (o.checked = true);
            else return (o.checked = false);
          });
        }

        if (o.key == "first_name" && contactSingledata?.contact_type?.id == 57)
          o.value = contactSingledata?.first_name;
        tempData["first_name"] = contactSingledata?.first_name;

        if (o.key == "last_name" && contactSingledata?.contact_type?.id == 57)
          o.value = contactSingledata?.last_name;
        tempData["last_name"] = contactSingledata?.last_name;

        if (o.key == "company_name") o.value = contactSingledata?.company_name;
        tempData["company_name"] = contactSingledata?.company_name;

        if (o.key == "email") o.value = contactSingledata?.primary_email;
        tempData["email"] = contactSingledata?.primary_email;

        if (o.key == "contact_number")
          o.value = contactSingledata?.primary_phone;
        tempData["contact_number"] = contactSingledata?.primary_phone;

        if (o.key == "select_property")
          o.value = {
            id:
              contactSingledata &&
              contactSingledata["properties"] &&
              contactSingledata["properties"][0] &&
              contactSingledata["properties"][0]["id"]
                ? contactSingledata["properties"][0]["id"]
                : "",
            label:
              contactSingledata &&
              contactSingledata["properties"] &&
              contactSingledata["properties"][0] &&
              contactSingledata["properties"][0]["display_name"]
                ? contactSingledata["properties"][0]["display_name"]
                : "",
          };
        tempData["select_property"] = {
          id:
            contactSingledata &&
            contactSingledata["properties"] &&
            contactSingledata["properties"][0] &&
            contactSingledata["properties"][0]["id"]
              ? contactSingledata["properties"][0]["id"]
              : "",
          label:
            contactSingledata &&
            contactSingledata["properties"] &&
            contactSingledata["properties"][0] &&
            contactSingledata["properties"][0]["display_name"]
              ? contactSingledata["properties"][0]["display_name"]
              : "",
        };

        if (o.key == "parent_contact")
          o.value = {
            id:
              contactSingledata &&
              contactSingledata["parent"] &&
              contactSingledata["parent"]["id"]
                ? contactSingledata["parent"]["id"]
                : "",
            label:
              contactSingledata &&
              contactSingledata["parent"] &&
              contactSingledata["parent"]["first_name"]
                ? contactSingledata["parent"]["first_name"]
                : "",
          };
        tempData["parent_contact"] = {
          id:
            contactSingledata &&
            contactSingledata["parent"] &&
            contactSingledata["parent"]["id"]
              ? contactSingledata["parent"]["id"]
              : "",
          label:
            contactSingledata &&
            contactSingledata["parent"] &&
            contactSingledata["parent"]["first_name"]
              ? contactSingledata["parent"]["first_name"]
              : "",
        };

        return o;
      });
      setContactdetails(newContactdetails);

      var newBankdetails = Bankdetails.map(o => {
        if (o.key == "account_number")
          o.value =
            contactSingledata.billing_details &&
            contactSingledata.billing_details.account_number
              ? contactSingledata.billing_details.account_number
              : "";
        tempData["account_number"] =
          contactSingledata.billing_details &&
          contactSingledata.billing_details.account_number
            ? contactSingledata.billing_details.account_number
            : "";

        if (o.key == "account_name")
          o.value =
            contactSingledata.billing_details &&
            contactSingledata.billing_details.account_name
              ? contactSingledata.billing_details.account_name
              : "";
        tempData["account_name"] =
          contactSingledata.billing_details &&
          contactSingledata.billing_details.account_name
            ? contactSingledata.billing_details.account_name
            : "";

        if (o.key == "bank_name")
          o.value =
            contactSingledata.billing_details &&
            contactSingledata.billing_details.bank_name
              ? contactSingledata.billing_details.bank_name
              : "";
        tempData["bank_name"] =
          contactSingledata.billing_details &&
          contactSingledata.billing_details.bank_name
            ? contactSingledata.billing_details.bank_name
            : "";

        if (o.key == "ifsc_code")
          o.value =
            contactSingledata.billing_details &&
            contactSingledata.billing_details.ifsc_code
              ? contactSingledata.billing_details.ifsc_code
              : "";
        tempData["ifsc_code"] =
          contactSingledata.billing_details &&
          contactSingledata.billing_details.ifsc_code
            ? contactSingledata.billing_details.ifsc_code
            : "";

        if (o.key == "upi_id")
          o.value =
            contactSingledata.billing_details &&
            contactSingledata.billing_details.upi
              ? contactSingledata.billing_details.upi
              : "";
        tempData["upi_id"] =
          contactSingledata.billing_details &&
          contactSingledata.billing_details.upi
            ? contactSingledata.billing_details.upi
            : "";
        return o;
      });
      setBankdetails(newBankdetails);

      var newExtrainfo = Extrainfo.map(o => {
        if (o.key == "dob")
          o.value =
            contactSingledata.additional_information &&
            contactSingledata.additional_information.date_of_birth
              ? moment(
                  contactSingledata.additional_information.date_of_birth
                ).format("yyyy-MM-DD")
              : "";
        tempData["dob"] =
          contactSingledata.additional_information &&
          contactSingledata.additional_information.date_of_birth
            ? contactSingledata.additional_information.date_of_birth
            : "";

        if (o.key == "emergency_no")
          o.value =
            contactSingledata.additional_information &&
            contactSingledata.additional_information.emergency_contact
              ? contactSingledata.additional_information.emergency_contact
              : "";
        tempData["emergency_no"] =
          contactSingledata.additional_information &&
          contactSingledata.additional_information.emergency_contact
            ? contactSingledata.additional_information.emergency_contact
            : "";

        if (o.key == "additional_info")
          o.value =
            contactSingledata.additional_information &&
            contactSingledata.additional_information.additional_information
              ? contactSingledata.additional_information.additional_information
              : "";
        tempData["additional_info"] =
          contactSingledata.additional_information &&
          contactSingledata.additional_information.additional_information
            ? contactSingledata.additional_information.additional_information
            : "";

        if (o.key == "additional_contact")
          o.value =
            contactSingledata.additional_information &&
            contactSingledata.additional_information.additional_contact
              ? contactSingledata.additional_information.additional_contact
              : "";
        tempData["additional_contact"] =
          contactSingledata.additional_information &&
          contactSingledata.additional_information.additional_contact
            ? contactSingledata.additional_information.additional_contact
            : "";

        if (o.key == "notes")
          o.value =
            contactSingledata.additional_information &&
            contactSingledata.additional_information.notes
              ? contactSingledata.additional_information.notes
              : "";
        tempData["notes"] =
          contactSingledata.additional_information &&
          contactSingledata.additional_information.notes
            ? contactSingledata.additional_information.notes
            : "";

        if (o.key == "website_url")
          o.value =
            contactSingledata.additional_information &&
            contactSingledata.additional_information.website_url
              ? contactSingledata.additional_information.website_url
              : "";
        tempData["website_url"] =
          contactSingledata.additional_information &&
          contactSingledata.additional_information.website_url
            ? contactSingledata.additional_information.website_url
            : "";

        if (o.key == "gst_no")
          o.value =
            contactSingledata.additional_information &&
            contactSingledata.additional_information.gst_no
              ? contactSingledata.additional_information.gst_no
              : "";
        tempData["gst_no"] =
          contactSingledata.additional_information &&
          contactSingledata.additional_information.gst_no
            ? contactSingledata.additional_information.gst_no
            : "";
        return o;
      });
      setExtrainfo(newExtrainfo);
    }
  }, [contactSingledata]);

  //   useEffect(() => {
  //   }, [Contactdetails]);

  const [Contactdetails, setContactdetails] = useState([
    {
      label: "Contact Type",
      type: "radio",
      key: "contact_type",
      //defaultVal: contactType,
      //sub: [],
      sub: [
        { label: "Business", value: 58 },
        { label: "Individual", value: 57, checked: true },
      ],
    },
    { label: "", type: "pre", key: "" },
    {
      label: "First Name",
      type: "input",
      key: "first_name",
    },
    {
      label: "Last Name",
      type: "input",
      key: "last_name",
    },
    {
      label: "Company Name",
      type: "input",
      key: "company_name",
    },
    {
      label: "Email",
      type: "input",
      key: "email",
    },
    {
      label: "Select Property",
      type: "select",
      key: "select_property",
    },
    {
      label: "Contact Number",
      type: "input",
      key: "contact_number",
    },
    {
      label: "Parent Contact",
      type: "select",
      key: "parent_contact",
    },
    {
      label: "Image",
      type: "upload_image",
      key: "upload_image",
    },
  ]);

  const [Bankdetails, setBankdetails] = useState([
    {
      label: "Account Number",
      type: "input",
      key: "account_number",
    },
    {
      label: "Account Name",
      type: "input",
      key: "account_name",
    },
    {
      label: "Bank Name",
      type: "input",
      key: "bank_name",
    },
    {
      label: "IFSC Code",
      type: "input",
      key: "ifsc_code",
    },
    {
      label: "UPI ID",
      type: "input",
      key: "upi_id",
    },
  ]);

  const [Extrainfo, setExtrainfo] = useState([
    {
      label: "Date of Birth",
      type: "date",
      key: "dob",
    },
    {
      label: "Emergency Contact",
      type: "input",
      key: "emergency_no",
    },
    {
      label: "Additional Information",
      type: "input",
      key: "additional_info",
    },
    {
      label: "Additional Contact",
      type: "input",
      key: "additional_contact",
    },
    {
      label: "Notes",
      type: "input",
      key: "notes",
    },
    {
      label: "Website URL",
      type: "input",
      key: "website_url",
    },
    {
      label: "GST Number",
      type: "input",
      key: "gst_no",
    },
    { label: "", type: "pre", key: "" },
    {
      type: "button",
      outline: "contained",
      key: "add_custom_field",
      text: "Add custom fields",
      width: "280px",
    },
  ]);

  const [LocationForm, setLocationForm] = useState([
    {
      label: "Location Name",
      type: "input",
      key: "location_name",
    },
    {
      label: "Location Type",
      type: "select",
      key: "location",
      defaultVal: {},
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
      defaultVal: {},
    },
    {
      label: "State",
      type: "select",
      key: "state",
      defaultVal: {},
    },
    {
      label: "City/Town",
      type: "input",
      key: "city",
    },
    {
      label: "GSTIN Number",
      type: "input",
      key: "gst_in_number",
    },
    {
      label: "Contact Person's Name",
      type: "input",
      key: "contact_person_name",
    },
    {
      label: "Contact Person's Number",
      type: "input",
      key: "contact_person_number",
    },
    {
      label: "Mark as default address",
      type: "checkbox",
      key: "mark_default_address",
      isChecked: false,
    },
    {
      label: "Address type",
      type: "radio",
      key: "address_type_id",
      defaultVal: null,
      sub: [
        {
          value: 1,
          label: "Shipping Address",
          checked: true,
        },
        {
          value: 2,
          label: "Billing Address",
        },
        {
          value: 3,
          label: "Both",
        },
      ],
    },
  ]);

  const setRadioType = (prop, value) => {};

  const handleClose = () => {
    setShow(false);
    var newArray2 = [
      {
        label: "Location Name",
        type: "input",
        key: "location_name",
      },
      {
        label: "Location Type",
        type: "select",
        key: "location",
        defaultVal: {},
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
        defaultVal: {},
      },
      {
        label: "State",
        type: "select",
        key: "state",
        defaultVal: {},
      },
      {
        label: "City/Town",
        type: "input",
        key: "city",
      },
      {
        label: "GSTIN Number",
        type: "input",
        key: "gst_in_number",
      },
      {
        label: "Contact Person's Name",
        type: "input",
        key: "contact_person_name",
      },
      {
        label: "Contact Person's Number",
        type: "input",
        key: "contact_person_number",
      },
      {
        label: "Mark as default address",
        type: "checkbox",
        key: "mark_default_address",
        isChecked: false,
      },
      {
        label: "Address type",
        type: "radio",
        key: "address_type_id",
        defaultVal: null,
        sub: [
          {
            value: 1,
            label: "Shipping Address",
            checked: true,
          },
          {
            value: 2,
            label: "Billing Address",
          },
          {
            value: 3,
            label: "Both",
          },
        ],
      },
    ];
    setLocationForm(newArray2);
  };

  const handelSelectonChangeLocation = (key, value) => {
    if (key == "country") {
      dispatch(loadStates(value.id));
      setnewlocationData({ ...newlocationData, [key]: value });
    } else {
      setnewlocationData({ ...newlocationData, [key]: value });
    }
    switch (key) {
      case "location": {
        setLocationForm(
          LocationForm.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        setnewlocationData({ ...newlocationData, [key]: value.id });
        break;
      }
      case "country": {
        setLocationForm(
          LocationForm.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        setnewlocationData({ ...newlocationData, [key]: value.id });
        break;
      }
      case "state": {
        setLocationForm(
          LocationForm.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        setnewlocationData({ ...newlocationData, [key]: value.id });
        break;
      }
    }
  };

  const handelSelectonChangeDetails = (key, value) => {
    tempData[key] = value;
    switch (key) {
      case "select_property": {
        setContactdetails(
          Contactdetails.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        Contactdetails[key] = value.id;
        break;
      }
      case "parent_contact": {
        setContactdetails(
          Contactdetails.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        Contactdetails[key] = value.id;
        break;
      }
    }
  };

  function handleClickEditContact(i) {
    setindexAddress(i);
    setShow(true);
    var newLocationForm = LocationForm.map(o => {
      if (o.key == "location_name")
        o.value =
          tempContacts[i] && tempContacts[i].location_name
            ? tempContacts[i].location_name
            : "";
      if (o.key == "address_line_1")
        o.value =
          tempContacts[i] && tempContacts[i].address_line_1
            ? tempContacts[i].address_line_1
            : "";
      if (o.key == "address_line_2")
        o.value =
          tempContacts[i] && tempContacts[i].address_line_2
            ? tempContacts[i].address_line_2
            : "";
      if (o.key == "address_line_3")
        o.value =
          tempContacts[i] && tempContacts[i].address_line_3
            ? tempContacts[i].address_line_3
            : "";
      if (o.key == "land_mark")
        o.value =
          tempContacts[i] && tempContacts[i].land_mark
            ? tempContacts[i].land_mark
            : "";
      if (o.key == "pin_code")
        o.value =
          tempContacts[i] && tempContacts[i].pin_code
            ? tempContacts[i].pin_code
            : "";
      if (o.key == "city")
        o.value =
          tempContacts[i] && tempContacts[i].city ? tempContacts[i].city : "";
      if (o.key == "gst_in_number")
        o.value =
          tempContacts[i] && tempContacts[i].gst_in_number
            ? tempContacts[i].gst_in_number
            : "";
      if (o.key == "contact_person_name")
        o.value =
          tempContacts[i] && tempContacts[i].contact_person_name
            ? tempContacts[i].contact_person_name
            : "";
      if (o.key == "contact_person_number")
        o.value =
          tempContacts[i] && tempContacts[i].contact_person_number
            ? tempContacts[i].contact_person_number
            : "";
      if (o.key == "address_type_id") {
        o.value =
          tempContacts[i] && tempContacts[i].address_type_id
            ? tempContacts[i].address_type_id
            : 3;
        o.sub.map(o => {
          if (o.value == tempContacts[i]?.address_type_id)
            return (o.checked = true);
          else return (o.checked = false);
        });
      }
      if (o.key == "location")
        o.value = {
          id:
            tempContacts[i] &&
            tempContacts[i].location &&
            tempContacts[i].location["id"]
              ? tempContacts[i].location["id"]
              : "",
          label:
            tempContacts[i] &&
            tempContacts[i].location &&
            tempContacts[i].location["display_name"]
              ? tempContacts[i].location["display_name"]
              : "",
        };
      if (o.key == "country")
        o.value = {
          id:
            tempContacts[i] &&
            tempContacts[i].country &&
            tempContacts[i].country["id"]
              ? tempContacts[i].country["id"]
              : "",
          label:
            tempContacts[i] &&
            tempContacts[i].country &&
            tempContacts[i].country["name"]
              ? tempContacts[i].country["name"]
              : "",
        };
      if (o.key == "state")
        o.value = {
          id:
            tempContacts[i] &&
            tempContacts[i].state &&
            tempContacts[i].state["id"]
              ? tempContacts[i].state["id"]
              : "",
          label:
            tempContacts[i] &&
            tempContacts[i].state &&
            tempContacts[i].state["name"]
              ? tempContacts[i].state["name"]
              : "",
        };
      return o;
    });
    var newLocationForm1 = {};
    newLocationForm.map(o => {
      newLocationForm1[o.key] = o.value;
    });
    setnewlocationData(newLocationForm1);
    setLocationForm(newLocationForm);
  }

  const handelInputChangeLocation = (key, value) => {
    setnewlocationData({ ...newlocationData, [key]: value });
    try {
      var newLocationForm = LocationForm.map(o => {
        if (o.key == key) o.value = value;
        return o;
      });
      setLocationForm(newLocationForm);
    } catch (e) {}
  };

  const handelClickChange = () => {
    obj = {
      key: "",
      value: "",
    };
    customCount = customCount + 1;
    var tempField = {
      label: "Custom label",
      field: "Custom Field",

      type: "additionalinput",

      labelkey: "label_custome_" + customCount,
      fieldkey: "field_custome_" + customCount,
    };
    setExtrainfo(Extrainfo => [...Extrainfo, tempField]);
  };

  const handelInputChange = (key, value, custom) => {
    if (custom == "custom") {
      if (key.split("_")[0] == "label") {
        obj.key = value;
        customeFields[key.split("_")[2]] = obj;
      } else {
        obj.value = value;
        customeFields[key.split("_")[2]] = obj;
      }
    } else {
      tempData[key] = value;
    }
    try {
      var newContactdetails = Contactdetails.map(o => {
        if (o.key == key) o.value = value;
        return o;
      });
      setContactdetails(newContactdetails);
    } catch (e) {}
    try {
      var newBankdetails = Bankdetails.map(o => {
        if (o.key == key) o.value = value;
        return o;
      });
      setBankdetails(newBankdetails);
    } catch (e) {}
    try {
      var newExtrainfo = Extrainfo.map(o => {
        if (o.key == key) o.value = value;
        return o;
      });
      setExtrainfo(newExtrainfo);
    } catch (e) {}
    try {
      var newLocationForm = LocationForm.map(o => {
        if (o.key == key) o.value = value;
        return o;
      });
      setLocationForm(newLocationForm);
    } catch (e) {}
  };

  const GetAddressData = () => {
    if (indexAddress !== "") {
      tempContacts[indexAddress] = newlocationData;
    } else {
      tempContacts.push(newlocationData);
    }
  };

  const handleButtonClick = key => {
    for (let i = 0; i < tempContacts.length; i++) {
      tempContacts[i]["location"] = location_type.find(
        o => o.id == tempContacts[i]["location"]
      );
      tempContacts[i]["country"] = countries_data.find(
        o => o.id == tempContacts[i]["country"]
      );
      tempContacts[i]["state"] = states_data.find(
        o => o.id == tempContacts[i]["state"]
      );
    }
    var tempImage = {};
    for (let index = 0; index < tempData["image_options"].length; index++) {
      const element = tempData["image_options"][index];
      tempImage = {
        data: element.data,
        name: element.name,
        size: element.size,
        type: element.type,
      };
    }
    tempData["image_options"] = tempImage;
    const payLoad = {
      contact_type_id: tempData["contact_type"]
        ? parseInt(tempData["contact_type"])
        : 57,
      company_name: tempData["company_name"] ? tempData["company_name"] : "",
      first_name: tempData["first_name"] ? tempData["first_name"] : "",
      last_name: tempData["last_name"] ? tempData["last_name"] : "",
      primary_email: tempData["email"] ? tempData["email"] : "",
      primary_phone: tempData["contact_number"]
        ? tempData["contact_number"]
        : "",
      parent_id:
        tempData["parent_contact"] && tempData["parent_contact"]["id"]
          ? tempData["parent_contact"]["id"]
          : 0,
      billing_details: {
        upi: tempData["upi_id"] ? tempData["upi_id"] : "",
        bank_name: tempData["bank_name"] ? tempData["bank_name"] : "",
        ifsc_code: tempData["ifsc_code"] ? tempData["ifsc_code"] : "",
        account_name: tempData["account_name"] ? tempData["account_name"] : "",
        account_number: tempData["account_number"]
          ? tempData["account_number"]
          : "",
      },
      address_details: tempContacts,
      properties: [
        {
          id:
            tempData["select_property"] && tempData["select_property"]["id"]
              ? tempData["select_property"]["id"]
              : "",
          display_name:
            tempData["select_property"] && tempData["select_property"]["label"]
              ? tempData["select_property"]["label"]
              : "",
        },
      ],
      additional_information: {
        date_of_birth: tempData["dob"] ? tempData["dob"] : "",
        additional_information: tempData["additional_info"]
          ? tempData["additional_info"]
          : "",
        website_url: tempData["website_url"] ? tempData["website_url"] : "",
        emergency_contact: tempData["emergency_no"]
          ? tempData["emergency_no"]
          : "",
        additional_contact: tempData["additional_contact"]
          ? tempData["additional_contact"]
          : "",
        notes: tempData["notes"] ? tempData["notes"] : "",
        gst_no: tempData["gst_no"] ? tempData["gst_no"] : "",
      },
      image_options: tempData["image_options"] ? tempData["image_options"] : "",
    };
    Object.keys(customeFields).forEach(function (key) {
      const label = customeFields[key]["key"];
      const value = customeFields[key]["value"];
      payLoad.additional_information[label] = value;
    });
    if (props && props.id) {
      dispatch(updateContact(payLoad, props.id));
      history.push("/contacts");
      //   tempContacts = [];
      //   tempData = {};
    } else {
      dispatch(createContact(payLoad));
      history.push("/contacts");
      //   tempContacts = [];
      //   tempData = {};
    }
  };

  const handelRadionButtononChange = (prop, value) => {
    //setContactType(value);
    let newArray5 = [];
    if (prop == "contact_type") {
      var OldState = Contactdetails.map(o => {
        if (o.key == prop)
          o.sub.map(p => {
            p.checked = false;
            return p;
          });
        return o;
      });
      setContactdetails(OldState);
      var newState = Contactdetails.map(o => {
        if (o.key == prop)
          o.sub.map(p => {
            if (p.value == value) p.checked = true;
            return p;
          });
        return o;
      });
      setContactdetails(newState);

      if (value == 57) {
        var newArray1 = [
          {
            label: "Contact Type",
            type: "radio",
            key: "contact_type",
            //defaultVal: contactType,
            sub: [],
            sub: [
              { label: "Business", value: 58 },
              { label: "Individual", value: 57, checked: true },
            ],
          },
          { label: "", type: "pre", key: "" },
          {
            label: "First Name",
            type: "input",
            key: "first_name",
          },
          {
            label: "Last Name",
            type: "input",
            key: "last_name",
          },
          {
            label: "Company Name",
            type: "input",
            key: "company_name",
          },
          {
            label: "Email",
            type: "input",
            key: "email",
          },
          {
            label: "Select Property",
            type: "select",
            key: "select_property",
          },
          {
            label: "Contact Number",
            type: "input",
            key: "contact_number",
          },
          {
            label: "Parent Contact",
            type: "select",
            key: "parent_contact",
          },
          {
            label: "Image",
            type: "upload_image",
            key: "upload_image",
          },
        ];
        newArray5 = newArray1;
        setContactdetails(newArray1);
      } else if (value == 58) {
        var newArray2 = [
          {
            label: "Contact Type",
            type: "radio",
            key: "contact_type",
            //defaultVal: contactType,
            sub: [],
            sub: [
              { label: "Business", value: 58, checked: true },
              { label: "Individual", value: 57 },
            ],
          },
          { label: "", type: "pre", key: "" },
          {
            label: "Company Name",
            type: "input",
            key: "company_name",
          },
          {
            label: "Email",
            type: "input",
            key: "email",
          },
          {
            label: "Select Property",
            type: "select",
            key: "select_property",
          },
          {
            label: "Contact Number",
            type: "input",
            key: "contact_number",
          },
          {
            label: "Parent Contact",
            type: "select",
            key: "parent_contact",
          },
          {
            label: "Image",
            type: "upload_image",
            key: "upload_image",
          },
        ];
        newArray5 = newArray2;
        setContactdetails(newArray2);
      }
    }
    tempData[prop] = value;

    if (props && props.id) {
      var newContactdetails = newArray5.map(o => {
        if (o.key == "first_name" && tempData?.contact_type == 57)
          o.value = tempData?.first_name;

        if (o.key == "last_name" && tempData?.contact_type == 57)
          o.value = tempData?.last_name;

        if (o.key == "company_name") o.value = tempData?.company_name;

        if (o.key == "email") o.value = tempData?.email;

        if (o.key == "contact_number") o.value = tempData?.contact_number;

        if (o.key == "select_property")
          o.value = {
            id: tempData?.select_property?.id,
            label: tempData?.select_property?.label,
          };

        if (o.key == "parent_contact")
          o.value = {
            id: tempData?.parent_contact?.id,
            label: tempData?.parent_contact?.label,
          };

        return o;
      });
      setContactdetails(newContactdetails);
    }
  };

  const handelRadionButtononChangeLocation = (prop, value) => {
    if (prop == "address_type_id") {
      var OldState = LocationForm.map(o => {
        if (o.key == prop)
          o.sub.map(p => {
            p.checked = false;
            return p;
          });
        return o;
      });
      setLocationForm(OldState);

      var newState = LocationForm.map(o => {
        if (o.key == prop)
          o.sub.map(p => {
            if (p.value == value) p.checked = true;
            return p;
          });
        return o;
      });
      setLocationForm(newState);
      setnewlocationData({ ...newlocationData, [prop]: parseInt(value) });
    }
    //setContactType(value);
    //setnewlocationData({ ...newlocationData, [prop]: parseInt(value) });
  };

  const handelCheckBoxonChange = field => {
    if (field.key == "mark_default_address") {
      var newState = LocationForm.map(o => {
        if (o.key == field.key) {
          o.isChecked = !o.isChecked;
        }
        return o;
      });
      setLocationForm(newState);
      setnewlocationData({ ...newlocationData, [field.key]: field.isChecked });
    }
  };

  return (
    <>
      <AddForm
        header={"Contact Details"}
        data={Contactdetails.map(field => {
          switch (field.key) {
            // case 'contact_type':
            //     field.sub = contact_type.map(o => {
            //         return {
            //             value: o.id,
            //             label: o.display_name,
            //         }
            //     });
            //     break;
            case "select_property":
              field.data = contact_property.map(o => {
                return {
                  id: o.id,
                  label: o.display_name,
                };
              });
              break;
            case "parent_contact":
              field.data = contacts_data.map(o => {
                return {
                  id: o.id,
                  label: o.first_name,
                };
              });
              break;
          }
          return field;
        })}
        handelSelectonChange={handelSelectonChangeDetails}
        handelInputChange={handelInputChange}
        setRadioType={setRadioType}
        handelRadionButtononChange={handelRadionButtononChange}
        tempData={tempData}
      />

      <Paper
        sx={{
          borderRadius: "8px",
          // p: 1,
          marginTop: "20px",
          mx: "16px",
          my: "16px",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            px: 2,
            py: 2,
            fontWeight: "500",
            fontSize: "19px",
            fontFamily: "Poppins !important",
          }}
        >
          Add Address
        </Typography>
        <Typography
          sx={{
            display: "flex",
            p: 2,
            overflow: "hidden",
            overflowX: "auto",
          }}
        >
          {/* {address?.length > 0 && (
                        <AddressCard
                            address={address}
                            show={show}
                            setShow={setShow}
                            setAddIndex={setAddIndex}
                            formData={formData}
                        />
                    )} */}

          {tempContacts?.map((curElem, i) => {
            return (
              <>
                <Card
                  className="addressCardWrapper"
                  sx={{
                    background: "#f9f9f9",
                    minWidth: "270px",
                    width: "fit-content",
                    padding: "16px",
                    mr: 1,
                  }}
                >
                  {/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
                  <Typography
                    variant="h6"
                    component="div"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h6" className="addressCardHeading">
                      {curElem?.location_name}
                    </Typography>
                    <Button
                      variant="text"
                      onClick={() => {
                        handleClickEditContact(i);
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </Typography>
                  <Typography
                    className="addresscardWrap"
                    sx={{ display: "flex" }}
                  >
                    <WorkIcon style={{ marginRight: "10px" }} />
                    <Typography className="addressCardDetails">
                      <Typography className="label">
                        {curElem?.address_line_1}
                      </Typography>
                      <Typography className="label">
                        {curElem?.address_line_2}
                      </Typography>
                      <Typography className="label">
                        {curElem?.address_line_3}
                      </Typography>
                      <Typography className="label">
                        {curElem?.land_mark}
                      </Typography>
                      <Typography className="label">{curElem?.city}</Typography>
                      <Typography className="label">
                        <br />
                        {curElem?.zip}
                      </Typography>
                    </Typography>
                  </Typography>
                </Card>
              </>
            );
          })}

          <Card
            className="addressCardWrapper"
            style={{
              background: "#f9f9f9",
              display: "flex",
              justifyContent: "center",
              minWidth: "270px",
              height: "200px",
              marginLeft: "10px",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                setShow(true);
                setindexAddress("");
              }}
            >
              {/* <i className="material-icons actionIcon">add</i> */}
              <AddIcon />
              <Typography className="actionIcon">Add Address</Typography>
            </CardContent>
          </Card>
        </Typography>

        {show && (
          <ModalViewV2
            modalTitle={"Add Address"}
            handleConfirm={() => {
              handleClose();
              GetAddressData();
              // updateData();
              // onDelete(deleteAddId);
            }}
            handleModalClose={() => {
              handleClose();
            }}
            modalOpen={show}
            actionBtns={["Cancel", "Confirm"]}
            component={"editAddress"}
          >
            <AddForm
              header={"Location Details"}
              data={LocationForm.map(field => {
                switch (field.key) {
                  case "location": {
                    field.data = location_type.map(o => {
                      return { id: o.id, label: o.display_name };
                    });
                    break;
                  }
                  case "country": {
                    field.data = countries_data.map(o => {
                      return { id: o.id, label: o.name };
                    });
                    break;
                  }
                  case "state": {
                    field.data = states_data.map(o => {
                      return { id: o.id, label: o.name };
                    });
                    break;
                  }
                }
                return field;
              })}
              handelInputChange={handelInputChangeLocation}
              handelSelectonChange={handelSelectonChangeLocation}
              setRadioType={setRadioType}
              handelCheckBoxonChange={handelCheckBoxonChange}
              handelRadionButtononChange={handelRadionButtononChangeLocation}
            />
          </ModalViewV2>
        )}
      </Paper>

      <AddForm
        header={"Bank Details"}
        data={Bankdetails.map(field => {
          return field;
        })}
        handelInputChange={handelInputChange}
      />

      <AddForm
        header={"Extra Information"}
        data={Extrainfo.map(field => {
          return field;
        })}
        handelInputChange={handelInputChange}
        handelClickChange={handelClickChange}
      />

      <AddFormFooter_Button
        saveDraft="false"
        handleButtonClick={handleButtonClick}
      />
    </>
  );
}

export default ContactsCreate;

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
