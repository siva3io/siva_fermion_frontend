import React, { useState } from "react";
import "./VendorDetails.css";
import { useSelector } from "react-redux";
import VendorPriceListTable from "./Table/VendorPriceListTable";
//MUI
//import MatInput from "../../../../../shared/widgets/MatInput";
//import MatRadio from "../../../../../shared/widgets/MatRadio";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { lazy, Suspense } from "react";
const RemoteInput = React.lazy(() => import("Remote/MatInput"));
const RemoteRadio = React.lazy(() => import("Remote/MatRadioButton"));
import ErrorBoundary from "../../../../../ErrorBoundary";


const RemoteWrapper = ({ children }) => (
  <div
    style={{

      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

function VendorDetails({
  step3Data,
  setStep3Data,
  step1Data,
  finalData,
  setFinalData,
}) {
  const vendors = useSelector((state) => state.fetchVPDetails.vendor.Vendor);
  console.log("vendoramu", vendors)

  const [staticFields, setStaticFields] = useState([
    {
      label: "Tax included in sales price",
      type: "radio",
      required: false,
      key: "tax_included_in_sale_price",
      defaultVal: null,
      sub: [
        {
          label: "Yes",
          type: "radio",
          value: 1,
        },
        {
          label: "No",
          type: "radio",
          value: 2,
        },
      ],
    },
    {
      label: "Shipping Cost",
      key: "shipping_cost",
      type: "number",
      required: false,
      value: "",
      errorMessage: "Please enter shipping cost",
    },
    {
      label: "Shipping Included",
      type: "radio",
      required: false,
      key: "shipping_included",
      defaultVal: null,
      sub: [
        {
          label: "Yes",
          type: "radio",
          value: 3,
        },
        {
          label: "No",
          type: "radio",
          value: 4,
        },
      ],
    },
    {
      label: "Notes",
      key: "notes",
      value: "",
      type: "input",
      required: false,
      errorMessage: "Please enter notes",
    },
  ]);

  //local functions
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

    if (prop === "shipping_cost") {
      value = Number(value);
    }

    tempStaticField[index].value = value;
    setStaticFields(tempStaticField);
    const tempFinalData = { ...finalData };
    const tempStep3Data = { ...step3Data };
    tempFinalData.shipping_options[prop] = value;
    tempStep3Data.shipping_options[prop] = value;
    setFinalData(tempFinalData);
    setStep3Data(tempStep3Data);
  };

  const setRadioType = (prop, e,value,label) => {
    console.log("setRadioType",prop,e, value,label)
    // value = value === "true" ? true : false;

    // const tempStaticField = [...staticFields];
    // let index = tempStaticField.findIndex(function (field) {
    //   return field.key === prop;
    // });
    // if (value === false) {
    //   tempStaticField[index].sub[0].value = true;
    //   tempStaticField[index].sub[1].value = false;
    // }
    // if (value === true) {
    //   tempStaticField[index].sub[0].value = false;
    //   tempStaticField[index].sub[1].value = true;
    // }
    // tempStaticField[index].defaultVal = value;


    const tempStaticField = [...staticFields];
    let index = tempStaticField.findIndex(function (field) {
      return field.key === prop;
    });
    tempStaticField[index].defaultVal = value;
    // setStaticFields(tempStaticField);


    setStaticFields(tempStaticField);

    console.log("staticFields",staticFields)

    const tempFinalData = { ...finalData };
    const tempStep3Data = { ...step3Data };

    tempFinalData.shipping_options = {
      ...tempFinalData.shipping_options,
      [prop]: value,
    };
    tempStep3Data.shipping_options = {
      ...tempStep3Data.shipping_options,
      [prop]: value,
    };
    setFinalData(tempFinalData);
    setStep3Data(tempStep3Data);
  };
  const theme = createTheme({
    components: {
      // Name of the component

      MuiTableCell: {
        styleOverrides: {
          root: {
            fontFamily: "Poppins",
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box className="locationDetailsMain">
        <Box className="locationDetailForm">
          <Box className="staticFormCard">
            <Box className="staticFormCardTitle">Vendor Price List</Box>

            <Box>
              <VendorPriceListTable
                data={vendors && vendors}
                step3Data={step3Data}
                setStep3Data={setStep3Data}
                finalData={finalData}
                setFinalData={setFinalData}
                step1Data={step1Data}
              />
            </Box>
            <Box className="staticFormCardForm" style={{ padding: "4px" }}>
              {staticFields.map((field) => {
                const val = field.label;
                const typ = field.type;
                return typ === "input" || typ === "number" ? (
                  <Suspense fallback={<div>Loading... </div>}>
                    <RemoteWrapper>
                      <RemoteInput
                        required={field.required}
                        minLength={field.minLength ? field.minLength : ""}
                        maxLength={field.maxLength ? field.maxLength : ""}
                        errorMessage={field.errorMessage ? field.errorMessage : ""}
                        type={field.type}
                        label={field.label}
                        name={field.label}
                        placeholder={`Type Your ${field.label}`}
                        value={field.value}
                        // step1Data[field.key] ? step1Data[field.key] :
                        onChange={(e) => onInputChange(field.key, e.target.value)}
                      />
                    </RemoteWrapper></Suspense>
                ) : typ === "radio" ? (
                  <div className="product-checkboxFieldMain">
                    <label
                      className="radioLabelWrap"
                      style={{ color: "black" }}
                    >
                      {field.label}
                      {field.required ? (
                        <p className="product_required_mark">*</p>
                      ) : null}
                    </label>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "65%",
                      }}
                    >
                      {field.sub && (
                        <Suspense fallback={<div>Loading... </div>}>
                          <RemoteWrapper>
                            <RemoteRadio
                              label={field.label}
                              fields={field.sub}
                              field={field}
                              onChange={(e) => {
                                setRadioType(field.key, e,e.target.value,field.label);
                              }}
                            />
                          </RemoteWrapper></Suspense>
                      )}
                    </div>
                  </div>
                ) : (
                  <></>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default VendorDetails;

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