import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import "./linkM1.css";
import Switch from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import MatSelect from "./MatSelect";
import MatInput from "./MatInput";
import { Box, Typography } from "@mui/material";
import MatRadio from "./MatRadio";
import MatSwitch from "./MatSwitch";

function NotificationSettings({
  staticForm,
  editViewForm,
  step4Data, setStep4Data,
  setSelectServiceableBtn,
  disabled_y,
  showActions,
  edit
}) {


  const [query, setQuery] = useState(disabled_y);
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };






  const onInputChange = (prop, value) => {
    let tempStaticField = [...staticFields];
    let index = tempStaticField.findIndex(function (field) {
      return field.key === prop;
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
    setStep4Data({
      ...step4Data,
      [prop]: prop === "conversion_factor" ? parseFloat(value) : value,
    });
  };


  




  const setRadioType = (prop, value) => {
    console.log("setRadioType",prop, value);
    // if (prop === "Item Type")
    //   setStep4Data({ ...step4Data, item_type_id: parseInt(value) });
    setStep4Data({ ...step4Data, [prop]: value });
  };

  /*   const setSwitchType = (prop, value) => {
     // if (prop === "Item Type")
      //  setStep4Data({ ...step4Data, item_type_id: parseInt(value) });
        setStep4Data({ ...step4Data, [prop]: value });
    }; */


  const setSwitchType = (k, event) => {
    //  console.log("event", event)
    setStep4Data({ ...step4Data, [k]: event.target.checked });
  };


  const [staticFields, setStaticFields] = useState([
    {
      label: "Email",
      type: "switch",
      required: false,
      key: "email",
      disabled: true,
    },
    {
      label: "SMS",
      type: "switch",
      required: false,
      key: "sms",
      errorMessage: "",
      value: "",
    },
    {
      label: "Remainder",
      type: "switch",
      required: false,
      key: "remainder",
      value: "",
    },
  ]);


 



 


  const onSelectionChanges = (prop, value, valueLabel) => {
    // console.log("onSelectionChanges", prop, value, valueLabel)
 
     if (prop === "currency_id") {
       let tempStaticField = [...staticFields]
       let index = tempStaticField.findIndex(function (field) {
         return field.key === prop;
       });
       tempStaticField[index]["value"] = valueLabel;
       setStaticFields(tempStaticField);
       setStep4Data({ ...step4Data, [prop]: value, ["currency"]: valueLabel });
     }
 
     if (prop === "price_list_id") {
       let tempStaticField = [...staticFields]
       let index = tempStaticField.findIndex(function (field) {
         return field.key === prop;
       });
       tempStaticField[index]["value"] = valueLabel;
       setStaticFields(tempStaticField);
       setStep4Data({ ...step4Data, [prop]: value, ["price_list"]: valueLabel });
     }
 
     if (prop === "order_tags_id") {
       let tempStaticField = [...staticFields]
       let index = tempStaticField.findIndex(function (field) {
         return field.key === prop;
       });
       tempStaticField[index]["value"] = valueLabel;
       setStaticFields(tempStaticField);
       setStep4Data({ ...step4Data, [prop]: value, ["order_tags"]: valueLabel });
     }
 
     if (prop === "select_source_facility_id") {
       let tempStaticField = [...staticFields1]
       let index = tempStaticField.findIndex(function (field) {
         return field.key === prop;
       });
       tempStaticField[index]["value"] = valueLabel;
       setStaticFields1(tempStaticField);
       setStep4Data({ ...step4Data, [prop]: value, ["select_source_facility"]: valueLabel });
     }
 
     if (prop === "type_of_source_id") {
       let tempStaticField = [...staticFields1]
       let index = tempStaticField.findIndex(function (field) {
         return field.key === prop;
       });
       tempStaticField[index]["value"] = valueLabel;
       setStaticFields1(tempStaticField);
       setStep4Data({ ...step4Data, [prop]: value, ["type_of_source"]: valueLabel });
     }
 
     if (prop === "order_select_source_facility_id") {
       let tempStaticField = [...staticFields2]
       let index = tempStaticField.findIndex(function (field) {
         return field.key === prop;
       });
       tempStaticField[index]["value"] = valueLabel;
       setStaticFields2(tempStaticField);
       setStep4Data({ ...step4Data, [prop]: value, ["order_select_source_facility"]: valueLabel });
     }
 
     if (prop === "prices_include_taxes_id") {
       let tempStaticField = [...staticFields3]
       let index = tempStaticField.findIndex(function (field) {
         return field.key === prop;
       });
       tempStaticField[index]["value"] = valueLabel;
       setStaticFields3(tempStaticField);
       setStep4Data({ ...step4Data, [prop]: value, ["prices_include_taxes"]: valueLabel });
     }
 
     if (prop === "automation_select_source_facility_id") {
       let tempStaticField = [...staticFields4]
       let index = tempStaticField.findIndex(function (field) {
         return field.key === prop;
       });
       tempStaticField[index]["value"] = valueLabel;
       setStaticFields4(tempStaticField);
       setStep4Data({ ...step4Data, [prop]: value, ["automation_select_source_facility"]: valueLabel });
     }
 
 
 
 
   
    
   };
 
   
 
   
 
 
 









  useEffect(() => {
    if (edit) {
      let tempstaticField = [...staticFields]
      
      setStaticFields(tempstaticField)
      
    }
  }, [step4Data])


  return (
    <div>
     


      <Box
        className="createCard"
        sx={{
          background: "#fff",
          m: 2,
          borderRadius: "8px",
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box className="createCardTitle">
          <Typography variant="h6" sx={{ fontFamily: "Inter" }}>
            Notification Settings
          </Typography>
        </Box>
        <Box className="createCardContent">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "100%",
              py: 2,
            }}
          >


            {staticFields.map((field) => {
              const val = field.label;
              const typ = field.type;
              return typ === "input" ? (
                <MatInput
                  required={field.required}
                  minLength={field.minLength ? field.minLength : ""}
                  maxLength={field.maxLength ? field.maxLength : ""}
                  errorMessage={field.errorMessage ? field.errorMessage : ""}
                  type={field.type}
                  label={field.label}
                  name={field.label}
                  placeholder={`Type Your ${field.label}`}
                  value={step4Data[field.key] ? step4Data[field.key] : ""}
                  onChange={(e) => {
                    onInputChange6(field.key, e.target.value);
                  }}
                />
              ) : typ === "switch" ? (
                <MatSwitch
                  required={field.required}
                  label={field.label}
                  name={field?.key}
                  value={step4Data[field.key] ? step4Data[field.key] : ""}
                  onChange={(e) =>
                    setSwitchType(field?.key, e)
                  }
                />

              ) : typ === "select1" ? (
                <MatSelect
                  disabled={false}
                  label={field.label}
                  data={field?.data}
                  placeholder={`Select ${field.label}`}
                  fieldKey={field.key}
                  required={field.required}
                 onChange={(e, value) => {
                   // console.log("aaaaaaaaaaaaaa", value)
                    onSelectionChanges(field.key, value.value, value.label);
                  }}
                  value={field?.value}
                />
              ) : (
                <></>
              );
            })}
          </Box>
        </Box>
      </Box>




 


    </div>
  );
}

export default NotificationSettings;


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