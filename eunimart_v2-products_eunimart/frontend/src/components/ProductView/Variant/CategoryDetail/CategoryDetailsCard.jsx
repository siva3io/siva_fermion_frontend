import React, { useEffect } from "react";
import "../ProductDetailCard/ProductDetailCard.css";
// import LabeledText from "../../../../shared/OtherCommon/CommonLabel/LabeledText";
// import Dropdown from "../../../../shared/OtherCommon/Dropdown/Dropdown";
// import MatSelect from "../../../../shared/widgets/MatSelect";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProductVariant } from "../../../../redux/Action/PostEditApi";
import { getCategoryDetails } from "../../../../redux/Action/FetchProductDetailsAction";
import RichTextEditor from "react-rte";

//mui
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import { lazy, Suspense } from "react";
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));
import ErrorBoundary from "../../../../ErrorBoundary";
const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);


const CategoryDetailsCard = ({ fields, edit }) => {
  //redux
  const parentCategory = useSelector(
    (state) => state.fetchAddProductDetails.parentCategory.ParentCategory
  );

  const [parentcategory, setParentCategory] = useState([]);
  const [leafcategory, setLeafCategory] = useState([]);
  const category = useSelector(
    (state) => state.fetchAddProductDetails.category.Category
  );

  const [query, setQuery] = useState(false);
  const [variant, setVariant] = useState(fields ? fields : []);
  const [prevVariant, setPrevVariant] = useState([]);
  const [finalVariant, setFinalVariant] = useState([]);
  const dispatch = useDispatch();
  const [selectKey, setSelectKey] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [selectValue, setSelectValue] = useState();
  const [saveEnable, setSaveEnable] = useState(false);

  const [descValue, setDescValue] = useState(
    variant && variant.description && variant.description.data
      ? variant.description.data
      : ""
  );

  useEffect(() => {
    setVariant(fields ? fields : []);
    setPrevVariant(fields ? fields : []);
    if (edit === false) {
      setQuery(true);
    }
  }, [fields]);

  const onInputChange = (prop, value) => {
    const tempValue = { ...variant, [prop]: value };
    setVariant(tempValue);
    const temp1Value = { [prop]: value };
    setFinalVariant(temp1Value);
    setSaveEnable(true);
  };

  const sendData = () => {
    if (fields["id"]) {
      dispatch(editProductVariant(finalVariant, fields["id"]));
    }
  };

  const onSelelectionChange = (prop, value) => {
    let temp = { ...variant };
    let tempFinal = { ...finalVariant };
    if (prop === "category") {
      let newCategory = temp.category ? { ...temp.category } : {};
      newCategory.name = value.label;
      newCategory.id = value.value;
      temp.category = newCategory;

      let tempLeafCategory = [...leafcategory];
      let findindex = parentCategory.data.findIndex(function (field) {
        return field.name === value.label;
      });
      tempLeafCategory = parentCategory?.data[findindex]?.child_ids.map(
        (item) => {
          return { label: item.name, value: item.id };
        }
      );
      setLeafCategory(tempLeafCategory);

      tempFinal.category_id = value.value;
      setVariant(temp);
      setFinalVariant(tempFinal);
      setSaveEnable(true);
    }

    if (prop === "leafcategory") {
      let newLeafCategory = temp.leaf_category ? { ...temp.leaf_category } : {};
      newLeafCategory.name = value.label;
      newLeafCategory.id = value.value;
      temp.leaf_category = newLeafCategory;
      setVariant(temp);

      setFinalVariant({ ...finalVariant, leaf_category_id: value.value });
      setSaveEnable(true);
    }
  };

  useEffect(() => {
    if (descValue) {
      const tempValue = {
        ...variant,
        description: { data: descValue },
      };
      setVariant(tempValue);
      const temp1Value = {
        ...finalVariant,
        description: { data: descValue },
      };
      setFinalVariant(temp1Value);
    }
  }, [descValue]);

  useEffect(() => {
    let temp = [...parentcategory];
    if (parentCategory.data) {
      temp = parentCategory.data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
    }
    setParentCategory(temp);
  }, [parentCategory]);

  //render function

  return (
    <Box className="companyDetailsOrder">
      <Box className="companyDetailsOrderHeader">
        <p className="companyDetailsOrder_header">Category Details</p>
        <Box className="companyDetailsOrderHeader_btn">
          {query ? (
            <Button
              variant="contained"
              onClick={() => {
                setQuery((prev) => !prev);
                setSaveEnable(false);
              }}
              style={{ textTransform: "none" }}
            >
              Edit Details
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
                Save Details
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <Box className="companyDetailsOrder_card">
        {variant && (
          <>
            <Box className="variantDetailsCard_card_left">
              {query ? (
                <Suspense fallback={<div>Loading... </div>}>
                  <RemoteWrapper>
                    <RemoteViewTextField
                      card
                      label={"Category"}
                      text={variant.category ? variant.category.name : "--"}
                      disabled_y={query}
                      name="parent_categ_id"
                    />
                  </RemoteWrapper></Suspense>
              ) : (
                <Suspense fallback={<div>Loading... </div>}>
                  <RemoteWrapper>
                    <RemoteSelect
                      disabled={query}
                      label={"Category"}
                      placeholder={`Select Category`}
                      data={parentcategory}
                      value={
                        variant &&
                          variant["category"] &&
                          variant["category"]["name"]
                          ? variant["category"]["name"]
                          : ""
                      }
                      onChange={(e, value) => {
                        onSelelectionChange("category", value);
                      }}
                    />
                  </RemoteWrapper></Suspense>
              )}
            </Box>
            <Box className="variantDetailsCard_card_right">
              {query ? (
                <Suspense fallback={<div>Loading... </div>}>
                  <RemoteWrapper>
                    <RemoteViewTextField
                      card
                      label={"Leaf Level Category"}
                      text={
                        variant &&
                        variant.leaf_category &&
                        variant.leaf_category.name
                      }
                      disabled_y={query}
                      name="categ_id"
                      onInputChange={onInputChange}
                    />
                  </RemoteWrapper></Suspense>
              ) : (
                <Suspense fallback={<div>Loading... </div>}>
                  <RemoteWrapper>
                    <RemoteSelect
                      disabled={query}
                      label={"Leaf Level Category"}
                      placeholder={`Select Leaf Level Category`}
                      data={leafcategory}
                      value={
                        variant &&
                          variant["parent_categ_id"] &&
                          variant["parent_categ_id"]["name"]
                          ? variant["parent_categ_id"]["name"]
                          : ""
                      }
                      onChange={(e, value) =>
                        onSelelectionChange("leafcategory", value)
                      }
                    />
                  </RemoteWrapper></Suspense>
              )}
            </Box>
          </>
        )}
      </Box>
      <Box className="description_wrapper">
        <Box className="desc_title" sx={{ width: query ? "30%" : "20%" }}>
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
              fields && fields["description"] && fields["description"].data
                ? fields["description"].data
                : "No description"
            }
            setDescValue={setDescValue}
            setSaveEnable={setSaveEnable}
          />
        </Box>
      </Box>
    </Box>
  );
};

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

export default CategoryDetailsCard;

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