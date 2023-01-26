import React, { useState } from "react";
import Input from "../../../../../shared/OtherCommon/Input/Input";
import Select from "../../../../../shared/OtherCommon/Select/Select";
import "./PackageDimension.css";
import MatInput from "../../../../../shared/widgets/MatInput";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";

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


function PackageDimension({
  edit,
  step3Data,
  setStep3Data,
  finalData,
  setFinalData,
}) {
  const [inputValue, setInputvalue] = useState({});
  const [vol, setVol] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const onInputChange = (prop, value, key) => {
    let tempStaticField = [...staticFields];
    let index = tempStaticField.findIndex(function (field) {
      return field.label == prop;
    });

    key === "package_length"
      ? setLength(value)
      : key === "package_width"
        ? setWidth(value)
        : key === "package_height"
          ? setHeight(value)
          : setVol(0);

    let volu = (length * width * height) / 5000;
    if (value === 0) {
      let tempStaticFields = [...staticFields];
      tempStaticFields[index].errorMessage = `Please enter ${prop}`;
      setStaticFields(tempStaticFields);
    }
    if (value > 0) {
      let tempStaticFields = [...staticFields];
      tempStaticFields[index].errorMessage = "";
      setStaticFields(tempStaticFields);
    }

    setInputvalue({
      ...inputValue,
      [key]: Number(value),
      volumetric_weight: Number(volu),
    });

    const tempStep3Data = { ...step3Data };
    tempStep3Data.package_dimensions = {
      ...tempStep3Data.package_dimensions,
      [key]: Number(value),
    };
    tempStep3Data.package_dimensions = {
      ...tempStep3Data.package_dimensions,
      volumetric_weight: Number(volu),
    };
    setStep3Data(tempStep3Data);

    const tempFinalData = { ...finalData };
    tempFinalData.package_dimensions = {
      ...tempFinalData.package_dimensions,
      [key]: Number(value),
    };
    tempFinalData.package_dimensions = {
      ...tempFinalData.package_dimensions,
      volumetric_weight: Number(volu),
    };
    setFinalData(tempFinalData);
  };

  const onSelectionChange = (value, key) => {
    let tempStaticField = [...staticFields];
    tempStaticField[0].value = value.label;
    setStaticFields(tempStaticField);
    const tempStep3Data = { ...step3Data };
    tempStep3Data.package_dimensions = {
      ...tempStep3Data.package_dimensions,
      [key]: value.label,
    };
    setStep3Data(tempStep3Data);

    const tempFinalData = { ...finalData };
    tempFinalData.package_dimensions = {
      ...tempFinalData.package_dimensions,
      [key]: value.label,
    };
    setFinalData(tempFinalData);
  };

  const [staticFields, setStaticFields] = useState([
    {
      label: "Packaging Type",
      type: "select",
      key: "packaging_type",
      value: "",
      required: true,
      options: [
        { label: "Crates" },
        { label: "Boxes" },
        { label: "Containers" },
        { label: "Wire baskets" },
        { label: "Shredded wool" },
        { label: "Packing peanuts" },
        { label: "Bubble wrap" },
        { label: "Shredded paper" },
        { label: "Crunched paper" },
        // { label: "+ Add New" },
      ],
      errorMessage: "Please enter Package Length",
    },
    {
      label: "Package Length (cm)",
      type: "number",
      key: "package_length",
      required: true,
      errorMessage: "Please enter Package Length",
      min: 0,
    },
    {
      label: "Package Width (cm)",
      type: "number",
      key: "package_width",
      min: 0,
      required: true,
      errorMessage: "Please enter Package Width",
    },

    {
      label: "Package Height (cm)",
      type: "number",
      key: "package_height",
      min: 0,
      required: true,
      errorMessage: "Please enter Package Height",
    },
    {
      label: "Package Weight (gm)",
      type: "number",
      key: "package_weight",
      min: 0,
      required: true,
      errorMessage: "Please enter Package Weight",
    },
    {
      label: "Volumetric Weight",
      type: "generated",
      key: "volumetric_weight",
      value: (length * width * height) / 5000,
    },
  ]);

  useEffect(() => {
    if (edit) {
      let tempStaticFields = [...staticFields];
      tempStaticFields[0].value = step3Data.package_dimensions?.packaging_type;
      setLength(step3Data.package_dimensions?.package_length);
      setWidth(step3Data.package_dimensions?.package_width);
      setHeight(step3Data.package_dimensions?.package_height);
      setStaticFields(tempStaticFields);
    }
  }, [step3Data]);
  //render function
  return (
    <div className="locationDetailsMain">
      <div className="locationDetailForm">
        {true && (
          <div className="staticFormCard">
            <div className="staticFormCardTitle">Package Dimensions</div>
            <div className="staticFormCardForm">
              {staticFields.map((field) => {
                const val = field.label;
                const typ = field.type;
                return typ === "input" || typ === "number" ? (
                  <Suspense fallback={<div>Loading... </div>}>
                    <RemoteWrapper>
                      <RemoteInput
                        min={field.min}
                        required={field.required}
                        type={field.type}
                        label={field.label}
                        name={field.label}
                        placeholder={`Type Your ${field.label}`}
                        value={
                          step3Data.package_dimensions
                            ? step3Data.package_dimensions[field.key]
                            : ""
                        }
                        onChange={(e) =>
                          onInputChange(field.label, e.target.value, field.key)
                        }
                        errorMessage={
                          field.errorMessage ? field.errorMessage : null
                        }
                      />
                    </RemoteWrapper></Suspense>
                ) : typ === "select" ? (
                  <div className="input_main_wrapper">
                    <div className="inputWrapper">
                      <div
                        className="labelWrap"
                        style={{ display: field.label === "" && "none" }}
                      >
                        <label
                          htmlFor={field.label
                            .toLowerCase()
                            .split(" ")
                            .join("_")}
                          className={"label"}
                          style={{ color: "black" }}
                        >
                          {field.label}
                          {field.required ? (
                            <p className="product_required_mark">*</p>
                          ) : null}
                        </label>
                      </div>
                      <div className="input_wrap">
                        <Autocomplete
                          size="small"
                          style={{ width: "100%" }}
                          disablePortal
                          // id="combo-box-demo"
                          options={field.options}
                          onChange={(e, value) =>
                            onSelectionChange(value, field.key)
                          }
                          sx={{ fontWeight: 400, fontSize: "16px" }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Search Vendor"
                              sx={{ fontFamily: "Inter!important" }}
                            />
                          )}
                          value={field.value}
                        />
                      </div>
                    </div>
                  </div>
                ) : typ === "checkbox" ? (
                  <div className="checkboxFieldMain">
                    <label className="checkboxLabelWrap">{field.label}</label>
                    <div className="checkboxFieldSub">
                      {field.sub ? (
                        field.sub.map((subItem) => {
                          return (
                            <div>
                              <input type={"checkbox"} />
                              <label>{subItem.label}</label>
                            </div>
                          );
                        })
                      ) : (
                        <Input label={field.label} type={field.type} />
                      )}
                    </div>
                  </div>
                ) : typ === "textArea" ? (
                  <div className="checkboxFieldMain">
                    <label className="textAreaLabelWrap">{field.label}</label>
                    <textarea
                      className="catTextArea"
                      placeholder={`Type ${field.label}`}
                    />
                  </div>
                ) : typ === "generated" ? (
                  <div className="volGenerated">
                    <label
                      className="volGeneratedKey"
                      style={{ color: "black" }}
                    >
                      {field.label}
                    </label>
                    <label className="volGeneratedVal">
                      {(length * width * height) / 5000} Kgs.
                    </label>
                  </div>
                ) : (
                  <></>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PackageDimension;

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