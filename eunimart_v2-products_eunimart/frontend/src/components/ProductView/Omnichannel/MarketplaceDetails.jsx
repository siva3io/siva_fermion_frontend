import React, { useState } from "react";
import LabeledText from "../../../shared/OtherCommon/CommonLabel/LabeledText";
//mui
import { Box, Typography, Button } from "@mui/material";

function MarketplaceDetails({ view }) {
  //local variables
  const [staticFields, setStaticFields] = useState([
    {
      label: "PCreated On",
      type: "input",
      required: false,
      errorMessage: "Created date is required",
      key: "created_on",
      minLength: 5,
      maxLength: 20,
      value: "27/11/2021",
    },
    {
      label: "Refreshed Tokens",
      type: "input",
      required: false,
      errorMessage: "Refreshed Tokens is required",
      key: "refereched_tok",
      minLength: 5,
      maxLength: 20,
      value: "10",
    },
    {
      label: "Account Refreshed",
      type: "input",
      required: false,
      errorMessage: "Account Refreshed is required",
      key: "acc_refe",
      minLength: 5,
      maxLength: 10,
      value: "9/09/2021",
    },

    {
      label: "Refresh Edits",
      type: "input",
      key: "refe_edits",
      required: false,
      errorMessage: "Refresh Edits is required",
      minLength: 5,
      maxLength: 20,
      value: "34",
    },

    {
      label: "Total Number of Products",
      type: "input",
      key: "no_of_products",
      required: false,
      errorMessage: "Total Number of Products is required",
      minLength: 5,
      maxLength: 20,
      value: "9",
    },

    {
      label: "Tickets Raised",
      type: "input",
      key: "tickets_raised",
      required: false,
      errorMessage: "Tickets Raised is required",
      minLength: 5,
      maxLength: 20,
      value: "6",
    },
  ]);

  const [variant, setVariant] = useState({
    created_on: "",
    refereched_tok: "",
    acc_refe: "",
    refe_edits: "",
    no_of_products: "",
    tickets_raised: "",
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
          Marketplace Details
        </Typography>
        {view && (
          <Box>
            {query ? (
              <Box>
                <Button
                  variant="outlined"
                  sx={{ textTransform: "none", mr: 1, fontFamily: "Poppins" }}
                >
                  Audit Trail
                </Button>
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
              </Box>
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
            columnGap: "20px",
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

export default MarketplaceDetails;

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