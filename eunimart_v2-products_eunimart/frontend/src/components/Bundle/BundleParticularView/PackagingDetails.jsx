import React, { useState, useEffect } from "react";
import LabeledText from "../../../shared/OtherCommon/CommonLabel/LabeledText";
import MatSelect from "../../../shared/widgets/MatSelect";
//mui
import { Box, Button, Typography } from "@mui/material";

function PackagingDetails({ bundleData }) {
  //local variables
  const [variant, setVariant] = useState({
    pck_type: "Box",
    pck_instruction: "Packagin instruction",
  });
  const [prevVariant, setPrevVariant] = useState({
    pck_type: "Box",
    pck_instruction: "Packagin instruction",
  });
  const [finalVariant, setFinalVariant] = useState([]);
  const [saveEnable, setSaveEnable] = useState(false);
  const [query, setQuery] = useState(true);
  const [selectKey, setSelectKey] = useState();
  const [selectValue, setSelectValue] = useState();
  const [selectedText, setSelectedText] = useState();
  const [fieldKey, setFieldKey] = useState();

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
    if (selectValue === "Packaging Type") {
      setSaveEnable(true);
      const temp1Value = {
        pck_type: { ...finalVariant, id: selectKey, name: selectedText },
      };
      setFinalVariant(temp1Value);
    }
  }, [selectKey]);

  useEffect(() => {
    if (bundleData) {
      let tempVariant = { ...variant };
      tempVariant.pck_type = bundleData.package_details
        ? bundleData.package_details.packaging_type
          ? bundleData.package_details.packaging_type
          : "--"
        : "--";
      tempVariant.pck_instruction = bundleData.package_details
        ? bundleData.package_details.packaging_instruction
          ? bundleData.package_details.packaging_instruction
          : "--"
        : "--";

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
          Packaging Details
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
            gap: "20px",
            gridTemplateColumns: "auto auto",
          }}
        >
          {query ? (
            <LabeledText
              card
              label={"Packaging Type"}
              text={variant && variant.pck_type}
              disabled_y={query}
              name="pck_type"
            />
          ) : (
            <MatSelect
              disabled={query}
              label={"Packaging Type"}
              data={[
                ["envelope", "Envelope"],
                ["box", "Box"],
                ["folder", "Folder"],
                ["binder", "Binder"],
                ["other", "Other"],
              ]}
              placeholder={`Select packagin type`}
              setSelectKey={setSelectKey}
              setSelectValue={setSelectValue}
              value={variant?.pck_type}
              setFieldKey={setFieldKey}
              fieldKey={"pck_type"}
            />
          )}
          <LabeledText
            card
            label={"Packaging Instructions"}
            // text={variant && variant.name}
            text={variant && variant.pck_instruction}
            disabled_y={query}
            name="pck_instruction"
            onInputChange={onInputChange}
          />
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