import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//mui
import MatInput from "../../Shared/widgets/MatInput";
import { Box, Typography } from "@mui/material";
import MatRadio from "../../Shared/widgets/MatRadio";
import MatSelect from "../../Shared/widgets/MatSelect";
//redux
import { getClassBaseDetails } from "../../redux/Action/FetchProductDetailsAction";

function UOMDetails({ step1Data, setStep1Data, edit }) {
  const dispatch = useDispatch();
  const itemTypes = useSelector(
    (state) => state.fetchAddProductDetails.itemType.ItemType
  );

  const classCode = useSelector(
    (state) => state.fetchAddProductDetails.classCode.ClassCode
  );

  const classBase = useSelector(
    (state) => state.fetchAddProductDetails.classBase.ClassBase
  );

  const conversionType = useSelector(
    (state) => state.fetchAddProductDetails.conversionType.ConversionType
  );

  const [staticFields, setStaticFields] = useState([
    {
      label: "Item Type",
      type: "radio",
      required: true,
      key: "item_type",
      defaultVal: null,
      sub: [],
    },
    {
      label: "Unit Code",
      type: "input",
      required: true,
      errorMessage: "Unit code is required",
      key: "code",
      // minLength: 5,
      // maxLength: 20,
    },
    {
      label: "Unit Name",
      type: "input",
      required: true,
      errorMessage: "Unit name is required",
      key: "name",
      // minLength: 5,
      // maxLength: 20,
    },
    {
      label: "Unit Description",
      type: "input",
      required: false,
      errorMessage: "",
      key: "description",
    },
    {
      label: "Class Code",
      type: "select",
      required: true,
      errorMessage: "Class Code is required",
      key: "uom_class_id",
      data: [],
      defaultVal: {},
      required: true,
    },
    {
      label: "UOM Class Name",
      type: "pre",
      required: true,
      errorMessage: "UOM class name is required",
      key: "name",
      value: "",
    },
    {
      label: "Base UOM Name",
      type: "pre",
      required: true,
      errorMessage: "Base UOM name is required",
      key: "base_uom",
      value: "",
    },
    {
      label: "Conversion Type",
      type: "select",
      required: false,
      errorMessage: "",
      key: "conversion_type_id",
      data: [],
      defaultVal: {},
      required: false,
    },
    {
      label: "Conversion Factor",
      type: "input",
      required: true,
      errorMessage: "Conversion factor is required",
      key: "conversion_factor",
    },
  ]);

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
    setStep1Data({
      ...step1Data,
      [prop]:
        prop === "conversion_factor"
          ? /[a-zA-Z]/.test(value) === false
            ? parseFloat(value)
            : null
          : value,
    });
  };

  const onSelectionChanges = (prop, value, name) => {
    if (prop === "uom_class_id") {
      dispatch(getClassBaseDetails(value));
      const tempStaticField = [...staticFields];
      tempStaticField[4].defaultVal = {
        value: value,
        code: name,
      };
      setStaticFields(tempStaticField);
    }

    if (prop === "conversion_type_id") {
      const tempStaticField = [...staticFields];
      tempStaticField[7].defaultVal = {
        value: value,
        code: name,
      };
      setStaticFields(tempStaticField);
    }

    setStep1Data({ ...step1Data, [prop]: value });
  };

  const setRadioType = (prop, value) => {
    if (prop === "Item Type")
      setStep1Data({ ...step1Data, item_type_id: parseInt(value) });
  };

  useEffect(() => {
    const tempStaticField = [...staticFields];

    const classCodeData = classCode?.data?.map((item) => {
      if (edit && item.id === step1Data.uom_class_id) {
        tempStaticField[4].defaultVal = {
          value: item.id,
          code: item.code,
        };
      }
      if (edit) {
        return {
          value: item.id,
          code: item.code,
        };
      } else {
        return {
          value: item.id,
          label: item.code,
        };
      }
    });
    tempStaticField[4].data = classCodeData;
    setStaticFields(tempStaticField);
  }, [classCode]);

  useEffect(() => {
    const tempStaticField = [...staticFields];
    const itemTyp = itemTypes?.data?.map((item) => {
      if (edit && item.id === step1Data.item_type_id) {
        tempStaticField[0].defaultVal = item.id;
      }
      return {
        label: item.display_name,
        type: "radio",
        value: item.id,
      };
    });

    tempStaticField[0].sub = itemTyp;
    setStaticFields(tempStaticField);
  }, [itemTypes]);

  useEffect(() => {
    const tempStaticField = [...staticFields];
    const uomClassName = classBase?.data?.name
      ? classBase.data.name
      : step1Data.uom_class_name;
    const baseUom = classBase?.data?.base_uom
      ? classBase.data.base_uom
      : step1Data.base_uom;
    if (classBase?.data?.name && classBase?.data?.base_uom) {
      setStep1Data({
        ...step1Data,
        uom_class_name: classBase?.data?.name,
        base_uom: classBase?.data?.base_uom,
      });
    }
    tempStaticField[5].value = uomClassName;
    tempStaticField[6].value = baseUom;
    setStaticFields(tempStaticField);
  }, [classBase]);

  useEffect(() => {
    const tempStaticField = [...staticFields];

    const conversionData = conversionType?.data?.map((item) => {
      if (edit && item.id === step1Data.conversion_type_id) {
        tempStaticField[7].defaultVal = {
          value: item.id,
          code: item.display_name,
        };
      }
      if (edit) {
        return {
          value: item.id,
          code: item.display_name,
        };
      } else {
        return {
          value: item.id,
          label: item.display_name,
        };
      }
    });
    tempStaticField[7].data = conversionData;
    setStaticFields(tempStaticField);
  }, [conversionType]);

  return (
    <>
      <Box
        className="createCard"
        sx={{
          background: "#fff",
          m: 0.3,
          borderRadius: "8px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box className="createCardTitle">
          <Typography sx={{ fontFamily: "Poppins", fontSize: "19px" }}>
            Unit Of Measurement Details
          </Typography>
        </Box>
        <Box className="createCardContent">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "50% 48%",
              gap: "20px",
              py: 2,
            }}
          >
            {staticFields.map((field) => {
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
                  value={step1Data[field.key] ? step1Data[field.key] : ""}
                  onChange={(e) => {
                    onInputChange(field.key, e.target.value);
                  }}
                />
              ) : typ === "radio" ? (
                <Box
                  className="product-checkboxFieldMain"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    className="radioLabelWrap"
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      width: "26%",
                    }}
                  >
                    <Typography>{field.label}</Typography>
                    {field.required ? (
                      <Typography
                        className="product_required_mark"
                        sx={{ color: "red!important" }}
                      >
                        *
                      </Typography>
                    ) : null}
                  </Typography>
                  <Box className="product-checkboxFieldSub">
                    <MatRadio
                      label={field.label}
                      fields={field.sub}
                      setRadioType={setRadioType}
                      defaultVal={field.defaultVal}
                      edit={edit}
                    />
                  </Box>
                </Box>
              ) : typ === "select" ? (
                <MatSelect
                  disabled={false}
                  label={field.label}
                  data={field.data}
                  placeholder={`Select ${field.label}`}
                  fieldKey={field.key}
                  required={field.required}
                  onChange={(e, value) => {
                    onSelectionChanges(field.key, value.value, value.code);
                  }}
                  defaultVal={field.defaultVal}
                  edit={edit}
                />
              ) : typ === "pre" ? (
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      width: "35%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      htmlFor={field.label.toLowerCase().split(" ").join("_")}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography sx={{ color: "#5d5d5d" }}>
                        {field.label}
                      </Typography>
                      {field.required ? (
                        <Typography
                          className="product_required_mark"
                          sx={{ color: "red!important" }}
                        >
                          *
                        </Typography>
                      ) : null}
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {field.value}
                  </Box>
                </Box>
              ) : (
                <></>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default UOMDetails;


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