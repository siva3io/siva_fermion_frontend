import React, { useState, useEffect } from "react";
import Dropdown from "../../../../shared/OtherCommon/Dropdown/Dropdown";
// import "./ProductDetails.css";
//redux
import { useSelector } from "react-redux";
//MUI
//import MatInput from "../../../../shared/widgets/MatInput";
import MatRadio from "../../../../shared/widgets/MatRadio";
import MatCheckbox from "../../../../shared/widgets/MatCheckbox";
//import MatSelect from "../../../../shared/widgets/MatSelect";

import { lazy, Suspense } from "react";
const RemoteInput = React.lazy(() => import("Remote/MatInput"));
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));
const RemoteRadio = React.lazy(() => import("Remote/MatRadioButton"));
const RemoteCheckbox = React.lazy(() => import("Remote/MatCheckBox"));
const RemoteIconButton = React.lazy(() => import("Remote/MatIconButton"));

import ErrorBoundary from "../../../../ErrorBoundary";

// import MatDropdown from "../../../../shared/widgets/MatDropdown";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

function UOMdetails({
  edit,
  step1Data,
  setStep1Data,
  finalData,
  setFinalData,
}) {
  //redux variables

  const baseUOMApi = useSelector(
    (state) => state.fetchAddProductDetails.baseUOM.BaseUOM
  );

  const routes = useSelector(
    (state) => state.fetchAddProductDetails.routes.Routes
  );
  //local variables
  const [stockArray, setStockArray] = useState([]);
  const [selectKey, setSelectKey] = useState();
  const [selectValue, setSelectValue] = useState();
  const [check, setCheck] = useState(false);
  const [baseUOM, setBaseUOM] = useState([
    {
      baseUOM: "",
      uomClass: "",
    },
  ]);

  const [secondaryUOM, setSecondaryUOM] = useState(false);

  const handleAddBaseUOM = () => {
    setSecondaryUOM(true);
  };
  const [uomDetails, setUomDetails] = useState([
    {
      label: "Base UOM",
      type: "select",
      data: [],
      value: "",
      required: false,
      key: "uom_id",
      errorMessage: "",
    },
    // {
    //   label: "UOM Class",
    //   type: "input",
    //   key: "uom_class",
    //   required: false,
    //   errorMessage: "",
    //   minLength: 5,
    //   maxLength: 20,
    // },
  ]);
  const [staticFields, setStaticFields] = useState([
    {
      label: "UOM type",
      type: "dropdown",
      data: [],
      required: false,
      value: "",
      key: "uom_type",
      errorMessage: "",
    },
    {
      label: "UOM",
      type: "input",
      key: "uom",
      required: false,
      errorMessage: "",
    },
    {
      label: "Conversion Type",
      type: "input",
      key: "conversion_type",
      required: false,
      errorMessage: "",
    },
    {
      label: "Conversion Factor",
      type: "input",
      key: "conversion_factor",
      required: false,
      errorMessage: "",
    },
  ]);

  //local functions
  const onInputChange = (prop, value, key) => {
    let tempStaticField =
      prop === "UOM Class" ? [...uomDetails] : [...staticFields];
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
    if (prop === "UOM Class") {
      setUomDetails(tempStaticField);
    } else {
      setStaticFields(tempStaticField);
    }
    setStep1Data({ ...step1Data, [key]: value });
  };

  const onSelectionChanges = (prop, valueId, valueLabel, uomType) => {
    console.log("propprop",prop, valueId, valueLabel, uomType)
    if (uomType == "baseUom") {
      const tempUomField = [...uomDetails];
      if (prop === "uom_id") {
        let index = tempUomField.findIndex(function (field) {
          return field.key === prop;
        });
        tempUomField[index].value = valueLabel;
      }
      setUomDetails(tempUomField);
    }

    /*  if(uomType=="secondaryUom"){
       const tempUomField = [...staticFields];
       if (prop === "uom_type") {
         let index = tempUomField.findIndex(function (field) {
           return field.key === prop;
         });
         tempUomField[index].value = valueLabel;
       }
       setStaticFields(tempUomField);
     } */

    if (prop === "uom_id") {
      setStep1Data({ ...step1Data, [prop]: valueId, uom_name: valueLabel });
    } else {
      setStep1Data({ ...step1Data, [prop]: valueId });
    }
    setFinalData({ ...finalData, [prop]: valueId });

    if(uomType=="secondaryUom"){
      setSelectValue(valueLabel)
    }
    console.log("setStep1Data",step1Data)
  };

  //useEffect functions
  useEffect(() => {
    if (edit && step1Data.product_uom_name && check === false) {
      let temp = [...uomDetails];
      temp[0].value = step1Data.product_uom_name;
      setCheck(true);
      setUomDetails(temp);
    }
  }, [step1Data]);

  useEffect(() => {
    setStep1Data({ ...step1Data, brand_id: Number(selectKey) });
  }, [selectKey]);



  useEffect(() => {
    const tempBaseUOM = [...uomDetails];
    if (baseUOMApi.data) {
      tempBaseUOM[0].data = baseUOMApi.data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
    }
    setUomDetails(tempBaseUOM);
  }, [baseUOMApi]);

  useEffect(() => {
    const tempBaseUOM = [...staticFields];
    if (baseUOMApi.data) {
      tempBaseUOM[0].data = baseUOMApi.data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
    }
    setStaticFields(tempBaseUOM);
  }, [baseUOMApi]);

  //render functions
  return (
    <div className="locationDetailsMain">
      <div className="locationDetailForm">
        {baseUOMApi && (
          <div className="staticFormCard">
            <div className="staticFormCardTitle">UOM Details</div>
            <Box>
              <div className="product-staticFormCardForm">
                {uomDetails.map((field) => {
                  const val = field.label;
                  const typ = field.type;
                  return typ === "input" ? (
                    <Suspense fallback={<div>Loading... </div>}>
                      <RemoteWrapper>

                        <RemoteInput
                          required={field.required}
                          minLength={field.minLength ? field.minLength : ""}
                          maxLength={field.maxLength ? field.maxLength : ""}
                          errorMessage={
                            field.errorMessage ? field.errorMessage : ""
                          }
                          type={field.type}
                          label={field.label}
                          name={field.label}
                          placeholder={`Type Your ${field.label}`}
                          value={step1Data[field.key] ? step1Data[field.key] : ""}
                          onChange={(e) =>
                            onInputChange(field.label, e.target.value, field.key)
                          }
                        />
                      </RemoteWrapper>
                    </Suspense>
                  ) : typ === "select" ? (
                    <>
                      <Suspense fallback={<div>Loading... </div>}>
                        <RemoteWrapper>
                          <RemoteSelect
                            required={field.required}
                            label={field.label}
                            placeholder={`Select ${field.label}`}
                            data={field.data}
                            onChange={(e, value) => {
                              onSelectionChanges(
                                field.key,
                                value.value,
                                value.label,
                                "baseUom"
                              );
                            }}
                            value={field.value}
                            uomDetails={staticFields}
                            setStaticFields={setStaticFields}
                            errorMessage={""}
                          />
                        </RemoteWrapper>
                      </Suspense>
                    </>
                  ) : (
                    <></>
                  );
                })}
              </div>
            </Box>

            <Suspense fallback={<div>Loading... </div>}>
              <RemoteWrapper>
                <RemoteIconButton type="contained" icon={<AddIcon />} iconPosition="left" callingFunction={handleAddBaseUOM}
                  name="Add Secondary UOM" />
              </RemoteWrapper></Suspense>

            {/* <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddBaseUOM}
              style={{ textTransform: "none", margin: "8px 0px" }}
            >
              Add Secondary UOM
            </Button> */}
            {secondaryUOM && (
              <div className="product-staticFormCardForm">
                {staticFields.map((field) => {
                  const val = field.label;
                  const typ = field.type;
                  return typ === "input" ? (
                    <Suspense fallback={<div>Loading... </div>}>
                      <RemoteWrapper>

                        <RemoteInput
                          required={field.required}
                          minLength={field.minLength ? field.minLength : ""}
                          maxLength={field.maxLength ? field.maxLength : ""}
                          errorMessage={
                            field.errorMessage ? field.errorMessage : ""
                          }
                          type={field.type}
                          label={field.label}
                          name={field.label}
                          placeholder={`Type Your ${field.label}`}
                          value={step1Data[field.key] ? step1Data[field.key] : ""}
                          onChange={(e) =>
                            onInputChange(field.label, e.target.value, field.key)
                          }
                        />
                      </RemoteWrapper></Suspense>
                  ) : typ === "dropdown" ? (
                    <>
                      <Suspense fallback={<div>Loading... </div>}>
                        <RemoteWrapper>
                          <RemoteSelect
                            required={field.required}
                            label={field.label}
                            placeholder={`Select ${field.label}`}
                            data={field.data}
                            setSelectKey={setSelectKey}
                            setSelectValue={setSelectValue}
                            value={selectKey}
                            onChange={(e, value) => {
                              onSelectionChanges(
                                field.key,
                                value.value,
                                value.label,
                                "secondaryUom"
                              );
                            }}

                            // value={field.value}
                            setVal={""}
                            staticFields={staticFields}
                            setStaticFields={setStaticFields}
                            errorMessage={
                              field.errorMessage ? field.errorMessage : ""
                            }
                          />
                        </RemoteWrapper></Suspense>
                    </>
                  ) : (
                    <></>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UOMdetails;

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