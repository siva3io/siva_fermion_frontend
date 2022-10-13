import React, { useState } from "react";
//mui
import MatInput from "../../Shared/widgets/MatInput";
import { Box, Typography } from "@mui/material";
import MatRadio from "../../Shared/widgets/MatRadio";
import MatSelect from "../../Shared/widgets/MatSelect";

function UOMClassDetails({ step1Data, setStep1Data }) {
  const [staticFields, setStaticFields] = useState([
    {
      label: "Class Code",
      type: "input",
      required: true,
      errorMessage: "Class Code is required",
      key: "code",
      // minLength: 5,
      // maxLength: 20,
      required: true,
    },
    {
      label: "UOM Class Name",
      type: "input",
      required: true,
      errorMessage: "UOM class name is required",
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
      label: "Base UOM Name",
      type: "input",
      required: true,
      errorMessage: "Base UOM name is required",
      key: "base_uom",
      // minLength: 5,
      // maxLength: 20,
    },
  ]);

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
  };

  return (
    <Box
      className="createCard"
      sx={{
        background: "#fff",
        // m: 0.3,
        borderRadius: "8px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box className="createCardTitle">
        <Typography sx={{ fontFamily: "Poppins", fontSize: "19px" }}>
          Unit Of Measurement Class Details
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
                onChange={(e) => onInputChange(field.key, e.target.value)}
              />
            ) : (
              <></>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default UOMClassDetails;


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