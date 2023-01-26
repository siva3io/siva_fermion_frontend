import React, { useState } from "react";
import RichTextEditor from "react-rte";

//mui
import { Box, Typography } from "@mui/material";
import MatInput from "../../../../shared/widgets/MatInput";
import { useEffect } from "react";

function ProductDetails({ step1Data, setStep1Data, finalData, setFinalData }) {
  //local variables
  const [descValue, setDescValue] = useState(
    step1Data.description ? step1Data.description.data : ""
  );
  const [staticFields, setStaticFields] = useState([
    {
      label: "Parent Bundle ID",
      type: "input",
      required: true,
      errorMessage: "Parent Bundle ID is required",
      key: "bundle_id",
      minLength: 5,
      maxLength: 20,
    },
    {
      label: "Bundle Name",
      type: "input",
      required: true,
      errorMessage: "Bundle Name is required",
      key: "bundle_name",
      minLength: 5,
      maxLength: 20,
    },
    {
      label: "Instructions",
      type: "input",
      required: true,
      errorMessage: "Instructions is required",
      key: "instructions",
      minLength: 5,
      maxLength: 20,
    },
    {
      label: "Description",
      type: "input",
      required: true,
      errorMessage: "Description is required",
      key: "description",
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
    setStep1Data({ ...step1Data, [prop]: value });
    setFinalData({ ...finalData, [prop]: value });
  };

  useEffect(() => {
    if (descValue) {
      setStep1Data({ ...step1Data, description: { data: descValue } });
      setFinalData({ ...finalData, description: { data: descValue } });
    }
  }, [descValue]);

  return (
    <Box
      className="createCard"
      sx={{
        background: "#fff",
        margin: "8px 0px",
        borderRadius: "4px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box className="createCardTitle">
        <Typography variant="h6" sx={{ fontFamily: "Poppins" }}>
          Product Details
        </Typography>
      </Box>
      <Box className="createCardContent">
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "49%", padding: "8px 0px" }}>
            <MatInput
              required={staticFields[0].required}
              minLength={
                staticFields[0].minLength ? staticFields[0].minLength : ""
              }
              maxLength={
                staticFields[0].maxLength ? staticFields[0].maxLength : ""
              }
              errorMessage={
                staticFields[0].errorMessage ? staticFields[0].errorMessage : ""
              }
              type={staticFields[0].type}
              label={staticFields[0].label}
              name={staticFields[0].label}
              placeholder={`Type Your ${staticFields[0].label}`}
              value={
                step1Data[staticFields[0].key]
                  ? step1Data[staticFields[0].key]
                  : ""
              }
              onChange={(e) =>
                onInputChange(staticFields[0].key, e.target.value)
              }
            />
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
                step1Data[staticFields[1].key]
                  ? step1Data[staticFields[1].key]
                  : ""
              }
              onChange={(e) =>
                onInputChange(staticFields[1].key, e.target.value)
              }
            />
          </Box>
        </Box>
        <Box sx={{ width: "49%", padding: "8px 0px" }}>
          <MatInput
            required={staticFields[2].required}
            minLength={
              staticFields[2].minLength ? staticFields[2].minLength : ""
            }
            maxLength={
              staticFields[2].maxLength ? staticFields[2].maxLength : ""
            }
            errorMessage={
              staticFields[2].errorMessage ? staticFields[2].errorMessage : ""
            }
            type={staticFields[2].type}
            label={staticFields[2].label}
            name={staticFields[2].label}
            placeholder={`Type Your ${staticFields[2].label}`}
            value={
              step1Data[staticFields[2].key]
                ? step1Data[staticFields[2].key]
                : ""
            }
            onChange={(e) => onInputChange(staticFields[2].key, e.target.value)}
          />
        </Box>
        <Box sx={{ padding: "8px 0px" }}>
          <Typography
            sx={{ color: "#00000", display: "flex", alignItems: "baseline" }}
          >
            <Box sx={{ width: "13%", display: "flex", alignItems: "baseline" }}>
              Description <p className="product_required_mark">*</p>
            </Box>
            <BodyTextEditor descValue={descValue} setDescValue={setDescValue} />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

//Text Editor Code
function BodyTextEditor({ descValue, setDescValue }) {
  const [editorValue, setEditorValue] = React.useState(
    RichTextEditor.createValueFromString(descValue, "html")
  );

  const handleChange = (descValue) => {
    setEditorValue(descValue);
    setDescValue(descValue.toString("html"));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <RichTextEditor
        value={editorValue}
        onChange={handleChange}
        required
        id="body-text"
        name="bodyText"
        type="string"
        multiline
        variant="filled"
        style={{ minHeight: "250px" }}
      />
    </Box>
  );
}

export default ProductDetails;

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