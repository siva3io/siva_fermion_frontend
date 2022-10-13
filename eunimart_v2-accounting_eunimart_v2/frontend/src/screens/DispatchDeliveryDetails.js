import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import HeadingBtn from "../Shared/HeadingBtn/HeadingBtn";
import MatSelect from "../Shared/MatSelect.jsx";
import MatInput from "../Shared/MatInput";
import ModalViewV2 from "../Shared/MuiModal/ModalViewV2";
import ContactList from "./ContactList";
import { States2 } from "../redux/StatesAction";

export default function DispatchDeliveryDetails({
  dispatch_delivery_details,
  set_dispatch_delivery_details,
  edit,
}) {
  const dispatch = useDispatch();
  const address = useSelector((state) => state?.fetchAddress?.data);
  const countryData = useSelector((state) => state?.Countries?.countries);
  const stateData = useSelector((state) => state?.States2?.states1);
  console.log(dispatch_delivery_details, "ddelivery local check");

  useEffect(() => {
    console.log(address, "contactsInEffect ");
  }, [contacts]);
  useEffect(() => {
    console.log(stateData, "xstateData");
  }, [stateData]);

  const [selected, setSelected] = useState([]);
  const [selectedOption, setSelectedOption] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [btnOption, setBtnOption] = useState();
  const [productsData, setProductsData] = useState(false);
  const [params, setParams] = useState({ per_page: "10", page_no: "1" });
  const [mainData, setMainData] = useState({});
  const salesdata = useSelector((state) => state.data.salesdata);

  useEffect(() => {
    if (dispatch_delivery_details) {
      console.log("primary_email", dispatch_delivery_details?.primary_email);
      var newMainData = [];

      var newdispatch_delivery_details = staticFields;
      var selectedAdd = [];
      // var selectedAdd = dispatch_delivery_details?.address_details[0];
      newdispatch_delivery_details.find((o) => {
        if (o.key == "name")
          o.value = dispatch_delivery_details?.contact_person_name;

        // if (o.key == "primary_email")
        //   o.value = dispatch_delivery_details?.primary_email;
        //   if (o.key == "primary_phone")
        //   o.value = dispatch_delivery_details?.primary_phone;
        if (o.key == "primary_email")
          o.value = salesdata?.billing_address?.primary_email;
        if (o.key == "primary_phone")
          o.value = salesdata?.billing_address?.primary_phone;

        if (o.key == "address_line_1")
          o.value = dispatch_delivery_details?.address_line_1;
        if (o.key == "address_line_2")
          o.value = dispatch_delivery_details?.address_line_2;
        if (o.key == "address_line_3")
          o.value = dispatch_delivery_details?.address_line_3;
        if (o.key == "pin_code") o.value = dispatch_delivery_details?.pin_code;
        if (o.key == "city") o.value = dispatch_delivery_details?.city;
      });
      setStaticFields(newdispatch_delivery_details);

      newMainData = [...newdispatch_delivery_details];

      var keyValuePairMainData = {};

      newMainData.map((o) => {
        if (o?.key != null) {
          keyValuePairMainData[o.key] = o?.value;
        }
      });
      console.log("newMainData", newMainData, keyValuePairMainData);
      setMainData(keyValuePairMainData);
    }
    console.log(mainData, "mainDataaaaaaa");
  }, [dispatch_delivery_details]);

  const [staticFields, setStaticFields] = useState([
    {
      type: "input",
      label: "Reciever Name",
      errorMessage: "",
      key: "name",
      value: dispatch_delivery_details?.reciver_name,
      required: true,
    },
    {
      type: "input",
      label: "Email",
      key: "primary_email",
      value: dispatch_delivery_details?.primary_email,
      errorMessage: "",
      required: true,
    },
    {
      label: "Mobile Number",
      key: "primary_phone",
      value: dispatch_delivery_details?.primary_phone,
      errorMessage: "",
      required: true,
      type: "input",
    },
    {
      label: "Address line 1",
      key: "address_line_1",
      value: dispatch_delivery_details?.address_line_1,
      errorMessage: "",
      required: true,
      type: "input",
    },
    {
      label: "Address line 2",
      key: "address_line_2",
      value: dispatch_delivery_details?.address_line_2,
      errorMessage: "",
      required: false,
      type: "input",
    },
    {
      label: "Address line 3",
      key: "address_line_3",
      value: dispatch_delivery_details?.address_line_3,
      errorMessage: "",
      required: false,
      type: "input",
    },
    {
      label: "Zipcode",
      key: "pin_code",
      value: dispatch_delivery_details?.pin_code,
      errorMessage: "",
      required: true,
      type: "input",
    },
    {
      label: "City / District",
      key: "city",
      value: dispatch_delivery_details?.city,
      errorMessage: "",
      required: true,
      type: "input",
    },
    /*  {
      label: "Country",
      key: "country",
      value: dispatch_delivery_details?.country,
      errorMessage: "",
      required: true,
      type: "select",
      data: [],
      defaultVal: dispatch_delivery_details?.country
    },
    {
      label: "State",
      key: "state",
      errorMessage: "",
      required: true,
      type: "select",
      data: [],
      defaultVal: dispatch_delivery_details?.state
    } */
  ]);

  const [contacts, setContats] = useState([]);

  /*   useEffect(() => {
    const tempStaticField = [...staticFields];
    let index = tempStaticField.findIndex(function (field) {
      return field.key == "state";
    });
    const stateArray = stateData?.map((item) => {
      if (edit) {
        tempStaticField[index].defaultVal = {
          vale: item.name,
          code: item.id,
        };
      }
      if (edit) {
        return {
          value: item.name,
          code: item.id,
        };
      }
      else {
        return ({
          value: item.name,
          code: item.id,
        });
      }
    });

    tempStaticField[index].data = stateArray;
    setStaticFields(tempStaticField);
  }, [stateData]);

  useEffect(() => {
    const tempStaticField = [...staticFields];
    let index = tempStaticField.findIndex(function (field) {
      return field.key == "country";
    });
    const countryArray = countryData?.map((item) => {
      console.log(item.id, "CountryId")
      if (edit) {
        tempStaticField[index].defaultVal = {
          value: item.name,
          code: item.id,

        };
      }
      if (edit) {
        return {
          value: item.name,
          code: item.id,
        };
      }
      else {
        return ({
          value: item.name,
          code: item.id,
        });
      }
    });

    tempStaticField[index].data = countryArray;
    setStaticFields(tempStaticField);
  }, [countryData]);
 */
  useEffect(() => {
    const a = address?.findIndex(function (options) {
      return options.id == selectedValue;
    });
    const selectedAddt = address[a];
    const tempStaticField = [...staticFields];
    tempStaticField[0].value = selectedAddt?.name;
    tempStaticField[1].value = selectedAddt?.primary_email;
    tempStaticField[2].value =
      selectedAddt?.address_details[0]?.contact_person_number;
    tempStaticField[3].value = selectedAddt?.address_details[0]?.address_line_1;
    tempStaticField[4].value = selectedAddt?.address_details[0]?.address_line_2;
    tempStaticField[5].value = selectedAddt?.address_details[0]?.address_line_3;
    tempStaticField[6].value = selectedAddt?.address_details[0]?.pin_code;
    tempStaticField[7].value = selectedAddt?.address_details[0]?.city;

    /* if (selectedAddt?.address?.country?.name) {
      onSelectionChanges("country", selectedAddt?.address?.country?.id, selectedAddt?.address?.country?.name);
    }
    if (selectedAddt?.address?.state?.name) {
      onSelectionChanges("state", selectedAddt?.address?.state?.name, selectedAddt?.address?.state?.id);
    } */
    setStaticFields(tempStaticField);
  }, [selectedValue]);

  const onInputChange = (prop, value) => {
    let tempStaticField = [...staticFields];
    let index = tempStaticField.findIndex(function (field) {
      return field.key == prop;
    });
    tempStaticField[index].errorMessage = "";
    if (tempStaticField[index].required && (!value || value.length === 0)) {
      tempStaticField[index].errorMessage = prop + " is Required";
    } else if (
      (tempStaticField[index].minLength &&
        value.length < tempStaticField[index].minLength) ||
      (tempStaticField[index].maxLength &&
        value.length > tempStaticField[index].maxLength)
    ) {
      tempStaticField[index].errorMessage =
        prop +
        "should contain " +
        tempStaticField[index].minLength +
        " - " +
        tempStaticField[index].maxLength +
        " characters";
    }
    setStaticFields(tempStaticField);

    try {
      var newStaticFields = staticFields.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setStaticFields(newStaticFields);
    } catch (e) {
      console.error("err7", e);
    }

    set_dispatch_delivery_details({
      ...dispatch_delivery_details,
      [prop]: value,
    });
  };

  const onSelectionChanges = (prop, value, name) => {
    if (prop == "country") {
      dispatch(States2(value));
    }
    const tempStaticField = staticFields;
    const index = tempStaticField.findIndex(function (feild) {
      return prop == feild.key;
    });
    tempStaticField[index].value = {
      value: name,
      code: value,
    };
    setStaticFields(tempStaticField);
    set_dispatch_delivery_details({
      ...dispatch_delivery_details,
      [prop]: value,
    });
  };

  const searchContactHandler = () => {
    setSelectedOption((prev) => !prev);
    setBtnOption("selectedContacts");
  };

  const handleClosePopUp = (option, row) => {
    if (option === "priceList") {
      setSelectedOption((prev) => !prev);
    }
    if (option === "products") {
      setSelectedOption((prev) => !prev);
    }
    if (option === "selectedContacts") {
      setSelectedOption((prev) => !prev);
    }
    if (option === "selectedBillingContacts") {
      setSelectedOption((prev) => !prev);
    }
    console.log("getting data");
    // if(key == "Search From Contacts") {
    //   var data = {

    //   }
    // }
  };

  const contactShippingHandler = () => {
    set_dispatch_delivery_details(selectedValue);
    const selCon = contacts.find((item) => {
      return item.id == selectedValue;
    });
    console.log("Submitted", selCon, selectedValue);
    const temp = staticFields;

    temp.map((fields) => {
      const index = temp.findIndex(function (rows) {
        return rows.key == fields.key;
      });
      console.log(selCon, index, "selCon");
      switch (fields.key) {
        case "name":
          temp[index].value = selCon?.name;
          break;
        case "id":
          temp[index].value = selCon?.id;
          break;
        case "primary_email":
          temp[index].value = selCon?.primary_email;
          break;
        case "primary_phone":
          temp[index].value = selCon?.primary_phone;
          break;
        case "address_line_1":
          temp[index].value = selCon?.address_details[0]?.address_line_1;
          break;
        case "address_line_2":
          temp[index].value = selCon?.address_details[0]?.address_line_2;
          break;
        case "address_line_3":
          temp[index].value = selCon?.address_details[0]?.address_line_3;
          break;
        case "pin_code":
          temp[index].value = selCon?.address_details[0]?.pin_code;
          break;
        case "city":
          temp[index].value = selCon?.address_details[0]?.city;
          break;
        case "state":
          temp[index].value = selCon?.address_details[0]?.state?.name;
          break;
        case "country":
          temp[index].value = selCon?.address_details[0]?.country?.name;
          break;
      }
    });
    setStaticFields(temp);
    handleClosePopUp("priceList", "");
  };

  return (
    <>
      <HeadingBtn
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
        showBtn={true}
        cardHeading={"Customer Billing Address"}
        detailsReq={true}
        btnName="Search From Contacts"
        btnClick={searchContactHandler}
      >
        <Typography variant="div" sx={{ width: "100%" }}>
          <div className="product-staticFormCardForm">
            {staticFields.map((feilds) => {
              if (feilds.type == "input") {
                return (
                  <MatInput
                    required={false}
                    width="100%"
                    errorMessage={
                      feilds.errorMessage ? feilds.errorMessage : ""
                    }
                    type={feilds.type}
                    label={feilds.label}
                    name={feilds.key}
                    value={feilds.value}
                    placeholder={`Type Your ${feilds.label}`}
                    onChange={(e) => onInputChange(feilds.key, e.target.value)}
                  />
                );
              } else if (feilds.type == "select") {
                return (
                  <MatSelect
                    disabled={false}
                    label={feilds.label}
                    data={feilds.data}
                    placeholder={`Select ${feilds.label}`}
                    fieldKey={feilds.key}
                    required={false}
                    onChange={(e, value) => {
                      console.log(value, "selectedValue");
                      onSelectionChanges(feilds.key, value.value, value.code);
                    }}
                    defaultVal={feilds.defaultVal}
                    edit={edit}
                  />
                );
              }
            })}
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
          searchTitle="Search contacts"
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
              detail={address}
              params={params}
              setParams={setParams}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
            {console.log(contacts, selectedValue, "selcted params")}
          </Box>
        </ModalViewV2>
      )}
    </>
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
