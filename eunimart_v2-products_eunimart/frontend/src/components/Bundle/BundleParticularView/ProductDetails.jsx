import React, { useState, useEffect } from "react";
import LabeledText from "../../../shared/OtherCommon/CommonLabel/LabeledText";
import RichTextEditor from "react-rte";
//mui
import { Box, Button, IconButton, Typography } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

function ProductDetails({ bundleData }) {
  //local variables
  const [variant, setVariant] = useState({
    bundle_id: "temp_123",
    bundle_name: "temp_abc",
    instruction: "temp_info",
    description: "temp_desc",
  });
  const [prevVariant, setPrevVariant] = useState({
    bundle_id: "temp_123",
    bundle_name: "temp_abc",
    instruction: "temp_info",
    description: "temp_desc",
  });
  const [finalVariant, setFinalVariant] = useState([]);
  const [saveEnable, setSaveEnable] = useState(false);
  const [query, setQuery] = useState(true);
  const [descValue, setDescValue] = useState(
    variant && variant.description && variant.description.length > 0
      ? variant.description
      : ""
  );

  //local functions
  const onInputChange = (prop, value) => {
    const tempValue = { ...variant, [prop]: value };
    setVariant(tempValue);
    const temp1Value = { ...finalVariant, [prop]: value };
    setFinalVariant(temp1Value);
    setSaveEnable(true);
  };

  const sendData = () => {
    // if (fields["id"]) {
    //   dispatch(editProductVariant(finalVariant, fields["id"]));
    // }
  };

  //useEffect functions

  useEffect(() => {
    if (bundleData) {
      let tempVariant = { ...variant };
      tempVariant.bundle_id = bundleData.bundle_id
        ? bundleData.bundle_id
        : "--";
      tempVariant.bundle_name = bundleData.bundle_name
        ? bundleData.bundle_name
        : "--";
      tempVariant.instruction = bundleData.instructions
        ? bundleData.instructions
        : "--";
      tempVariant.description = bundleData.description
        ? bundleData.description.data
        : "No description";
      setVariant(tempVariant);
      setPrevVariant(tempVariant);
    }
  }, [bundleData]);

  //render functions
  return (
    <Box
      sx={{
        background: "#fff",
        padding: "24px",
        mt: 2,
        borderRadius: "8px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontFamily={"Poppins"}>
          Product Details
        </Typography>
        {/* <Box>
          {query ? (
            <Button
              variant="contained"
              onClick={() => {
                setQuery((prev) => !prev);
                setSaveEnable(false);
              }}
              style={{ textTransform: "none" }}
            >
              Edit
            </Button>
          ) : (
            <Box>
              <Button
                variant="outlined"
                onClick={() => {
                  setQuery((prev) => !prev);
                  setVariant(prevVariant);
                }}
                style={{ textTransform: "none" }}
              >
                Cancel
              </Button>

              <Button
                disabled={!saveEnable}
                variant="contained"
                style={{ textTransform: "none", marginLeft: "10px" }}
                onClick={() => {
                  if (saveEnable === true) {
                    setQuery((prev) => !prev);
                    setPrevVariant(variant);
                    sendData(variant);
                  }
                }}
              >
                Save
              </Button>
            </Box>
          )}
        </Box> */}
      </Box>
      <Box>
        <Box
          sx={{
            display: "grid",
            gap: "0px 20px",
            gridTemplateColumns: "auto auto",
          }}
        >
          <LabeledText
            card
            label={"Product Bundle ID"}
            // text={variant && variant.name}
            text={variant && variant.bundle_id}
            disabled_y={query}
            name="bundle_id"
            onInputChange={onInputChange}
          />
          <LabeledText
            card
            label={"Bundle Name"}
            // text={variant && variant.name}
            text={variant && variant.bundle_name}
            disabled_y={query}
            name="bundle_name"
            onInputChange={onInputChange}
          />
          <LabeledText
            card
            label={"Instructions"}
            // text={variant && variant.name}
            text={variant && variant.instruction}
            disabled_y={query}
            name="instruction"
            onInputChange={onInputChange}
          />
        </Box>
        <Box className="description_wrapper">
          <Box className="desc_title" sx={{ width: query ? "32%" : "20%" }}>
            <Typography
              className={query ? "textAreaLabelWrap" : ""}
              sx={{ color: "black" }}
            >
              Description
            </Typography>
          </Box>

          <Box className="desc_box">
            <BodyTextEditor
              readOnly={query}
              descValue={
                variant && variant["description"]
                  ? variant["description"]
                  : "No description"
              }
              setDescValue={setDescValue}
              setSaveEnable={setSaveEnable}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function BodyTextEditor({ descValue, setDescValue, readOnly, setSaveEnable }) {
  const [editorValue, setEditorValue] = React.useState(
    RichTextEditor.createEmptyValue
  );

  useEffect(() => {
    setEditorValue(RichTextEditor.createValueFromString(descValue, "html"));
  }, [descValue]);

  const handleChange = (descValue) => {
    setEditorValue(descValue);
    setDescValue(descValue.toString("html"));
    setSaveEnable(true);
  };

  return (
    <RichTextEditor
      readOnly={readOnly}
      value={editorValue}
      onChange={handleChange}
      required
      id="body-text"
      name="bodyText"
      type="string"
      multiline
      variant="filled"
      style={{ minHeight: "250px" }}
      className={readOnly ? "bodyTextEditor" : ""}
    />
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