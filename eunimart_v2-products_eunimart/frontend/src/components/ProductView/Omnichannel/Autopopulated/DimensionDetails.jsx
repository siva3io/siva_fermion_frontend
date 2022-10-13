import React, { useState } from "react";
import LabeledText from "../../../../shared/OtherCommon/CommonLabel/LabeledText";
//mui
import { Box, Typography, Button } from "@mui/material";

function DimensionDetails({ view }) {
  //local variables
  const [staticFields, setStaticFields] = useState([
    {
      label: "Product Length",
      type: "input",
      required: false,
      errorMessage: "Product Length is required",
      key: "product_length",
      minLength: 5,
      maxLength: 20,
      value: "0.5 cm",
    },
    {
      label: "Product Height",
      type: "input",
      required: false,
      errorMessage: "Product Height is required",
      key: "product_height",
      minLength: 5,
      maxLength: 20,
      value: "32.5 cm",
    },
    {
      label: "Product Width",
      type: "input",
      required: false,
      errorMessage: "Product Width is required",
      key: "product_width",
      minLength: 5,
      maxLength: 20,
      value: "28.5 cm",
    },
    {
      label: "Product weight",
      type: "input",
      required: false,
      errorMessage: "Product Weight is required",
      key: "product_weight",
      minLength: 5,
      maxLength: 20,
      value: "255 gm",
    },
  ]);

  const [variant, setVariant] = useState({
    product_length: "",
    product_height: "",
    product_width: "",
    product_weight: "",
  });
  const [prevVariant, setPrevVariant] = useState([]);
  const [finalVariant, setFinalVariant] = useState([]);
  const [saveEnable, setSaveEnable] = useState(false);
  const [query, setQuery] = useState(true);

  //local functions
  const onInputChange1 = (prop, value) => {
    const tempValue = { ...variant, [prop]: value };
    setVariant(tempValue);
    const temp1Value = { ...finalVariant, [prop]: value };
    setFinalVariant(temp1Value);
    setSaveEnable(true);
  };

  const onInputChange = (prop, value) => {
    let tempStaticField = [...staticFields];
    let index = tempStaticField.findIndex(function (field) {
      return field.key == prop;
    });
    tempStaticField[index].errorMessage = "";
    //value setting
    tempStaticField[index].value = value;
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
  };

  const sendData = () => {
    // if (fields["id"]) {
    //   dispatch(editProductVariant(finalVariant, fields["id"]));
    // }
  };

  //useEffect functions

  //render functions
  return (
    <Box
      sx={{
        background: "#fff",
        p: 2,
        mt: 1,
        borderRadius: "8px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontFamily={"Poppins"}>
          Dimension Details
        </Typography>
        {view && (
          <Box>
            {query ? (
              <Button
                variant="contained"
                onClick={() => {
                  setQuery((prev) => !prev);
                  setSaveEnable(false);
                }}
                style={{ textTransform: "none", fontFamily: "Poppins" }}
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
          </Box>
        )}
      </Box>
      <Box>
        <Box
          sx={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "auto auto",
          }}
        >
          {staticFields &&
            staticFields.map((field, index) => {
              return field.type === "input" ? (
                <>
                  <LabeledText
                    card
                    label={field.label}
                    text={field.value}
                    disabled_y={view ? query : false}
                    name={field.key}
                    onInputChange={view ? onInputChange1 : onInputChange}
                  />
                </>
              ) : (
                <></>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
}

export default DimensionDetails;


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