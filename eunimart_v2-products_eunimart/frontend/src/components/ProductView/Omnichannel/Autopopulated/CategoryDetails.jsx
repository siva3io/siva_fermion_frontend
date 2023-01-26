import React, { useState, useEffect } from "react";
import Dropdown from "../../../../shared/OtherCommon/Dropdown/Dropdown";
import RichTextEditor from "react-rte";
//MUI
import { Box, Typography } from "@mui/material";

function CategoryDetails() {
  //local variables
  const [leafCatId, setLeafCatId] = useState(0);
  const [selectKey, setSelectKey] = useState();
  const [selectValue, setSelectValue] = useState(null);

  const staticFields = [
    {
      label: "Category",
      type: "dropdown",
      required: false,
      key: "parent_categ_id",
      data: [[0, "All"]],
      errorMessage: "Please select category",
      value: "",
    },
    {
      label: "Leaf Level Category",
      type: "dropdown",
      required: false,
      key: "categ_id",
      data: [
        [0, "Consumable"],
        [1, "Packaging"],
        [2, "Service"],
      ],
      errorMessage: "Please select Leaf category",
      value: "",
    },

    {
      label: "Description",
      type: "textArea",
      key: "description",
      required: false,
      errorMessage: "Please enter description",
      value: "",
    },
  ];
  const [descValue, setDescValue] = useState(staticFields[2].value);
  //useEffect functions
  useEffect(() => {
    if (leafCatId) {
    }
  }, [leafCatId]);

  useEffect(() => {
    if (selectValue === "Category") {
      setLeafCatId(selectKey);
    }
    if (selectValue === "Leaf Level Category") {
    }
  }, [selectKey]);

  useEffect(() => {
    // console.log(" DESC value >> ", descValue);
  }, [descValue]);

  //render functions
  return (
    <Box className="locationDetailsMain" sx={{ mx: 0 }}>
      <Box className="locationDetailForm">
        <Box className="staticFormCard">
          <Box className="staticFormCardTitle">Category Details</Box>
          <Box className="staticFormCardForm">
            {staticFields.map((field) => {
              const val = field.label;
              const typ = field.type;
              return typ === "dropdown" ? (
                <>
                  <Dropdown
                    label={field.label}
                    placeholder={`Select ${field.label}`}
                    options={field.data}
                    setSelectKey={setSelectKey}
                    setSelectValue={setSelectValue}
                    required={field.required}
                    value={field.value ? field.value : ""}
                    errorMessage={
                      field.errorMessage ? field.errorMessage : null
                    }
                  />
                </>
              ) : (
                <></>
              );
            })}
          </Box>
          <Box sx={{ py: 1, display: "flex" }}>
            <Box sx={{ width: "12%", padding: "12px 16px 12px 0px" }}>
              <Typography className={"Commonlabel"}>Description</Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              <BodyTextEditor
                descValue={descValue}
                setDescValue={setDescValue}
              />
            </Box>
          </Box>
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
  );
}
export default CategoryDetails;

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