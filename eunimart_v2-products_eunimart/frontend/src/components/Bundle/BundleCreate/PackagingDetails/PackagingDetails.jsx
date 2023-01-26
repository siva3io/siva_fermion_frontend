import React, { useState } from "react";
//mui
import { Box, Typography, Autocomplete, TextField } from "@mui/material";
import MatInput from "../../../../shared/widgets/MatInput";

function PackagingDetails({
  step2Data,
  setStep2Data,
  setFinalData,
  finalData,
}) {
  //local variables
  const [staticFields, setStaticFields] = useState([
    {
      label: "Packaging Type",
      type: "select",
      key: "packaging_type",
      required: false,

      options: [
        { label: "Envelope" },
        { label: "Box" },
        { label: "Folder" },
        { label: "Binder" },
        { label: "Other" },
      ],
      errorMessage: "",
    },
    {
      label: "Packaging Instructions",
      type: "input",
      required: false,
      errorMessage: "",
      key: "packaging_instruction",
      minLength: 5,
      maxLength: 20,
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
    setStaticFields(tempStaticField);
    let temp = { ...step2Data };
    let tempPack = { ...temp.package_details };
    tempPack.packaging_instruction = value;
    setStep2Data({ ...step2Data, package_details: tempPack });
    setFinalData({ ...finalData, package_details: tempPack });
  };

  const onSelectionChange = (prop, value) => {
    let temp = { ...step2Data };
    let tempPack = { ...temp.package_details };
    tempPack.packaging_type = value.label;
    setStep2Data({ ...step2Data, package_details: tempPack });
    setFinalData({ ...finalData, package_details: tempPack });
  };

  //render functions
  return (
    <Box
      className="createCard"
      sx={{
        background: "#fff",
        margin: "8px 0px",
        borderRadius: "8px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box className="createCardTitle">
        <Typography
          variant="h6"
          sx={{ fontFamily: "Poppins", fontWeight: "400" }}
        >
          Packaging Details
        </Typography>
      </Box>
      <Box className="createCardContent" sx={{ mt: 1 }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "49%", padding: "8px 0px" }}>
            <Box className="input_main_wrapper">
              <Box className="inputWrapper">
                <Box
                  className="labelWrap"
                  style={{ display: staticFields[0].label === "" && "none" }}
                >
                  <Typography
                    htmlFor={staticFields[0].label
                      .toLowerCase()
                      .split(" ")
                      .join("_")}
                    className={"label"}
                    sx={{ color: "black" }}
                  >
                    {staticFields[0].label}
                    {staticFields[0].required ? (
                      <p className="product_required_mark">*</p>
                    ) : null}
                  </Typography>
                </Box>
                <Box className="input_wrap">
                  <Autocomplete
                    size="small"
                    style={{ width: "100%" }}
                    disablePortal
                    id="combo-box-demo"
                    options={staticFields[0].options}
                    value={
                      step2Data.package_details[staticFields[0].key]
                        ? step2Data.package_details[staticFields[0].key]
                        : ""
                    }
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Search Vendor" />
                    )}
                    onChange={(e, value) =>
                      onSelectionChange(staticFields[0].key, value)
                    }
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "20px" }} />
          <Box sx={{ width: "49%", padding: "8px 0px" }}>
            <MatInput
              required={staticFields[1].required}
              minLength={
                staticFields[1].minLength ? staticFields[1].minLength : ""
              }
              maxLength={
                staticFields[1].maxLength ? staticFields[1].maxLength : ""
              }
              errorMessage={
                staticFields[1].errorMessage ? staticFields[1].errorMessage : ""
              }
              type={staticFields[1].type}
              label={staticFields[1].label}
              name={staticFields[1].label}
              placeholder={`Type Your ${staticFields[1].label}`}
              value={
                step2Data.package_details[staticFields[1].key]
                  ? step2Data.package_details[staticFields[1].key]
                  : ""
              }
              onChange={(e) =>
                onInputChange(staticFields[1].key, e.target.value)
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PackagingDetails;

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