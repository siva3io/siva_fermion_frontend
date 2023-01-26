import React, { useState, useEffect } from "react";
import "./CategoryDetails.css";
import Dropdown from "../../../../shared/OtherCommon/Dropdown/Dropdown";
//import MatSelect from "../../../../shared/widgets/MatSelect";

import { lazy, Suspense } from "react";
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));
import ErrorBoundary from "../../../../ErrorBoundary";

import RichTextEditor from "react-rte";
//redux
import { useSelector, useDispatch } from "react-redux";
import { getCategoryDetails } from "../../../../redux/Action/FetchProductDetailsAction";
//MUI
import MatDropdown from "../../../../shared/widgets/MatDropdown";
import { Box } from "@mui/material";

const RemoteWrapper = ({ children }) => (
  <div
    style={{

      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

function CategoryDetails({
  edit,
  step1Data,
  setStep1Data,
  finalData,
  setFinalData,
}) {
  //redux variables
  const dispatch = useDispatch();
  const parentCategory = useSelector(
    (state) => state.fetchAddProductDetails.parentCategory.ParentCategory
  );
  const category = useSelector(
    (state) => state.fetchAddProductDetails.category.Category
  );

  //local variables
  const [check, setCheck] = useState(false);
  const [leafCatId, setLeafCatId] = useState(0);
  const [selectKey, setSelectKey] = useState();
  const [selectValue, setSelectValue] = useState(null);
  const [descValue, setDescValue] = useState(
    step1Data.description
      ? step1Data.description.data
        ? step1Data.description.data
        : ""
      : ""
  );

  useEffect(() => {
    setDescValue(step1Data?.description?.data);
  }, [step1Data?.description?.data]);

  const [staticFields, setStaticFields] = useState([
    {
      label: "Category",
      type: "dropdown",
      required: true,
      key: "primary_category_id",
      data: [],
      value: "",
      errorMessage: "Please select category",
    },
    {
      label: "Leaf Level Category",
      type: "dropdown",
      required: true,
      key: "secondary_category_id",
      data: [],
      value: "",
      errorMessage: "Please select Leaf category",
    },

    {
      label: "Description",
      type: "textArea",
      key: "description",
      required: true,
      errorMessage: "Please enter description",
    },
  ]);

  const onSelectionChanges = (prop, valueId, valueLabel) => {
    const tempStaticField = [...staticFields];
    if (prop === "primary_category_id") {
      let index = tempStaticField[0].data.findIndex(function (field) {
        return field.label === valueLabel;
      });
      tempStaticField[0].value = valueLabel;
      tempStaticField[1].data = parentCategory.data[index].child_ids.map(
        (item) => {
          return {
            label: item.name,
            value: item.id,
          };
        }
      );
    }

    if (prop === "secondary_category_id") {
      tempStaticField[1].value = valueLabel;
    }
    setStaticFields(tempStaticField);
    setStep1Data({ ...step1Data, [prop]: valueId });
    setFinalData({ ...finalData, [prop]: valueId });
  };

  //local functions
  // const onInputChange = (prop, value) => {
  //   setInputvalue({ ...inputValue, [prop]: value });
  //   if (prop === "Description")
  //     setStep1Data({ ...step1Data, description: value });
  // };

  //useEffect functions
  useEffect(() => {
    if (leafCatId) {
      dispatch(getCategoryDetails(leafCatId));
    }
  }, [leafCatId]);

  useEffect(() => {
    if (selectValue === "Category") {
      setStep1Data({ ...step1Data, parent_categ_id: Number(selectKey) });
      dispatch(getCategoryDetails(selectKey));
      setLeafCatId(selectKey);
    }
    if (selectValue === "Leaf Level Category")
      setStep1Data({ ...step1Data, categ_id: Number(selectKey) });
  }, [selectKey]);

  useEffect(() => {
    const obj = {
      data: descValue,
    };
    setStep1Data({ ...step1Data, description: obj });
    if (descValue !== undefined) {
      setFinalData({ ...finalData, description: obj });
    }
  }, [descValue]);

  useEffect(() => {
    let temp = [...staticFields];
    if (parentCategory.data) {
      temp[0].data = parentCategory.data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
    }
    setStaticFields(temp);
  }, [parentCategory]);

  useEffect(() => {
    if (edit && check === false && step1Data.primary_category_name) {
      let tempStaticField = [...staticFields];
      tempStaticField[0].value = step1Data.primary_category_name;
      tempStaticField[1].value = step1Data.secondary_category_name;
      setDescValue(step1Data?.description?.data);
      setCheck(true);
      setStaticFields(tempStaticField);
    }
  }, [step1Data]);

  //render functions
  return (
    <Box className="locationDetailsMain">
      <Box className="locationDetailForm">
        {parentCategory && (
          <Box className="staticFormCard">
            <Box className="staticFormCardTitle">Category Details</Box>
            <Box className="staticFormCardForm">
              {staticFields.map((field) => {
                const val = field.label;
                const typ = field.type;
                return typ === "dropdown" ? (
                  <>
                    {/* <Dropdown
                      label={field.label}
                      placeholder={`Select ${field.label}`}
                      options={field.data}
                      setSelectKey={setSelectKey}
                      setSelectValue={setSelectValue}
                      required={field.required}
                      value={step1Data[field.key] ? step1Data[field.key] : ""}
                      errorMessage={
                        field.errorMessage ? field.errorMessage : null
                      }
                    /> */}

                    <Suspense fallback={<div>Loading... </div>}>
                      <RemoteWrapper>
                        <RemoteSelect
                          required={field.required}
                          label={field.label}
                          placeholder={`Select ${field.label}`}
                          data={field.data}
                          onChange={(e, value) => {
                            onSelectionChanges(field.key, value.value, value.label);
                          }}
                          value={field.value}
                          staticFields={staticFields}
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
            </Box>
            <Box sx={{ py: 1 }}>
              <label
                className="textAreaLabelWrap"
                style={{ padding: "0px", color: "black" }}
              >
                Description <p className="product_required_mark">*</p>
              </label>
              {/* {descValue != "undefined" && descValue != ""&& ( */}
              <BodyTextEditor
                descValue={descValue ? descValue : step1Data?.description?.data}
                setDescValue={setDescValue}
              />
              {/* )} */}

            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

//Text Editor Code
function BodyTextEditor({ descValue, setDescValue }) {
  console.log("BodyTextEditor", descValue, setDescValue)
  // const [t1, sett1] = useState(descValue);

  // useEffect(() => {
  //   console.log("13")
  //   sett1(descValue);
  // }, [descValue]);


  const [editorValue, setEditorValue] = React.useState(
    RichTextEditor.createValueFromString(descValue ? descValue : "", "markdown")
  );

  const handleChange = (descValue) => {
    setEditorValue(descValue);
    setDescValue(descValue.toString("markdown"));
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