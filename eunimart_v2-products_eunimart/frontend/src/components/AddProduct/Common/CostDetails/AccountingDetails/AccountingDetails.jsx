import React, { useState, useEffect } from "react";
import axios from "axios";
//redux
import { useSelector } from "react-redux";
import FormikForm from "../../FormikForms/FormikForm";
import MatInput from "../../../../../shared/widgets/MatInput";
import MatSelect from "../../../../../shared/widgets/MatSelect";

import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "../../../../../shared/OtherCommon/Select/Select";
import "./AccountingDetails.css";
import GLOBAL_API_SOURCE from "../../../../../GlobalApi";
//mui
import { Checkbox, Box } from "@mui/material";

import { lazy, Suspense } from "react";
const RemoteInput = React.lazy(() => import("Remote/MatInput"));
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));
import ErrorBoundary from "../../../../../ErrorBoundary";

let base_URL = GLOBAL_API_SOURCE.url;

const RemoteWrapper = ({ children }) => (
  <div
    style={{

      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

function AccountingDetails({
  edit,
  editViewForm,
  step3Data,
  setStep3Data,
  finalData,
  setFinalData,
  productId,
}) {
  const currency = useSelector(
    (state) => state.fetchSearchReducer.currency.Currency
  );

  const [check, setCheck] = useState(false);

  const [inputValue, setInputvalue] = useState({});
  let mrpRes = false;
  const onInputChange = (prop, value, key) => {
    let tempStaticField = [...staticFields];
    let index = tempStaticField.findIndex(function (field) {
      return field.label == prop;
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
    tempStaticField[index].value = value;
    const tempStep3Data = { ...step3Data };
    tempStep3Data.product_pricing_details = {
      ...tempStep3Data.product_pricing_details,
      [key]: Number(value),
    };
    const tempFinalData = { ...finalData };
    tempFinalData.product_pricing_details = {
      ...tempFinalData.product_pricing_details,
      [key]: Number(value),
    };

    setStaticFields(tempStaticField);
    setInputvalue({ ...inputValue, [key]: Number(value) });
    setStep3Data(tempStep3Data);
    setFinalData(tempFinalData);
  };

  const onSelectionChanges = (prop, valueId, valueLabel) => {
    const tempStaticField = [...staticFields];

    let index = tempStaticField.findIndex(function (field) {
      return field.key === prop;
    });
    tempStaticField[index].value = valueLabel;

    const tempStep3Data = { ...step3Data };
    tempStep3Data.product_pricing_details = {
      ...tempStep3Data.product_pricing_details,
      [prop]: valueId,
    };
    const tempFinalData = { ...finalData };
    tempFinalData.product_pricing_details = {
      ...tempFinalData.product_pricing_details,
      [prop]: valueId,
    };
    setStaticFields(tempStaticField);
    setStep3Data(tempStep3Data);
    setFinalData(tempFinalData);
  };

  const setCheckboxType = (prop, value, key) => {
    const tempStaticField = [...staticFields];
    let index = tempStaticField.findIndex(function (field) {
      return field.key === key;
    });
    tempStaticField[index].value = value;
    const tempStep3Data = { ...step3Data };
    tempStep3Data.product_pricing_details = {
      ...tempStep3Data.product_pricing_details,
      [key]: value,
    };
    const tempFinalData = { ...finalData };
    tempFinalData.product_pricing_details = {
      ...tempFinalData.product_pricing_details,
      [key]: value,
    };
    setStaticFields(tempStaticField);
    setStep3Data(tempStep3Data);
    setFinalData(tempFinalData);
  };

  const [staticFields, setStaticFields] = useState([
    {
      label: "Sales Price",
      type: "number",
      key: "sales_price",
      value: null,
      required: true,
      errorMessage: "",
    },
    {
      label: "Cost Price",
      key: "cost_price",
      type: "number",
      value: null,
      required: true,
      errorMessage: "",
    },
    {
      label: "MRP",
      key: "mrp",
      type: "MRP",
      value: null,
      required: true,
      errorMessage: "",
    },
    {
      label: "Enter Taxes (%)",
      type: "number",
      key: "tax_options",
      required: false,
      errorMessage: "",
      min: 0,
      value: null,
    },

    {
      label: "Basic Curency",
      type: "select",
      key: "currency_id",
      data: [],
      required: true,
      value: "",
      errorMessage: "",
    },
    {
      label: "Tax included in sell price",
      key: "tax",
      type: "checkbox",
      required: true,
      value: false,
    },
    {
      label: "Shipping included in sell price",
      key: "shipping",
      type: "checkbox",
      required: true,
      value: false,
    },
  ]);

  useEffect(() => {
    let temp = [...staticFields];
    if (currency.data) {
      temp[4].data = currency.data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
    }
    setStaticFields(temp);
  }, [currency]);

  useEffect(() => {
    if (edit && check === false) {
      let temp = [...staticFields];
      temp[4].value = step3Data.product_pricing_details?.currency?.name;
      setStaticFields(temp);
      setCheck(true);
    }
  }, [step3Data]);

  //render function
  return (
    <Box className="locationDetailsMain">
      <Box className="locationDetailForm">
        {true && (
          <Box className="staticFormCard">
            <Box className="staticFormCardTitle">Pricing Details</Box>
            <Box className="staticFormCardForm">
              {staticFields.map((field) => {
                const val = field.label;
                const typ = field.type;
                return typ === "input" || typ === "number" ? (
                  <Suspense fallback={<div>Loading... </div>}>
                    <RemoteWrapper>
                      <RemoteInput
                        errorMessage={field.errorMessage}
                        required={field.required}
                        type={field.type}
                        label={field.label}
                        name={field.label}
                        placeholder={`Enter ${field.label}`}
                        value={
                          step3Data.product_pricing_details[field.key]
                            ? step3Data.product_pricing_details[field.key]
                            : ""
                        }
                        onChange={(e) =>
                          onInputChange(field.label, e.target.value, field.key)
                        }
                      // min
                      />
                    </RemoteWrapper></Suspense>
                ) : typ === "MRP" ? (
                  <MatInput
                    onChange={(e) =>
                      onInputChange(field.label, e.target.value, field.key)
                    }
                    type={"number"}
                    id={field.label.toLowerCase().split(" ").join("_")}
                    label={field.label}
                    className={"input_disabled"}
                    autoComplete="off"
                    placeholder={`Enter ${field.label}`}
                    errorMessage={field.errorMessage}
                    required={field.required}
                    value={
                      step3Data.product_pricing_details[field.key]
                        ? step3Data.product_pricing_details[field.key]
                        : ""
                    }
                  />
                ) : typ === "select" ? (
                  <Suspense fallback={<div>Loading... </div>}>
                    <RemoteWrapper>
                      <RemoteSelect
                        required={field.required}
                        label={field.label}
                        placeholder={`Select ${field.label}`}
                        data={field.data}
                        onChange={(e, value) => {
                          onSelectionChanges(field.key, value.value, value.label);
                        }}
                        value={field.value}
                        staticFields={staticFields}
                        setStaticFields={setStaticFields}
                        errorMessage={""}
                      />
                    </RemoteWrapper></Suspense>
                ) : typ === "checkbox" ? (
                  <Box className="">
                    {/* <label className="checkboxLabelWrap">{field.label}</label> */}
                    <Box className="attr-checkbox">
                      {/* {
                        <Box>
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              setCheckboxType(
                                field.label,
                                e.target.checked,
                                field.key
                              );
                            }}
                          />
                          <label>{field.label}</label>
                        </Box>

                        // <Input label={field.label} type={field.type} />
                      } */}
                      <FormControlLabel
                        onChange={(e) => {
                          setCheckboxType(
                            field.label,
                            e.target.checked,
                            field.key
                          );
                        }}
                        sx={{ color: "black" }}
                        control={
                          <Checkbox sx={{ color: "#416BFF", mr: "16px" }} />
                        }
                        checked={field.value}
                        label={field.label}
                      />
                    </Box>
                  </Box>
                ) : (
                  <></>
                );
              })}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default AccountingDetails;

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