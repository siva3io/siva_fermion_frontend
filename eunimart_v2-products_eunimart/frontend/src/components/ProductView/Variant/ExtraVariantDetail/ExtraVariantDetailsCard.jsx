import React, { useEffect } from "react";
import "../ProductDetailCard/ProductDetailCard.css";
import LabeledText from "../../../../shared/OtherCommon/CommonLabel/LabeledText";
import Dropdown from "../../../../shared/OtherCommon/Dropdown/Dropdown";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProductVariant } from "../../../../redux/Action/PostEditApi";
//mui
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MatSelect from "../../../../shared/widgets/MatSelect";

import { lazy, Suspense } from "react";
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));
import ErrorBoundary from "../../../../ErrorBoundary";
const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const ExtraVariantDetailsCard = ({ fields, edit, parentBrand }) => {
  const [query, setQuery] = useState(false);
  const [variant, setVariant] = useState(fields ? fields : []);
  const [prevVariant, setPrevVariant] = useState([]);
  const [finalVariant, setFinalVariant] = useState([]);
  const dispatch = useDispatch();
  const [selectKey, setSelectKey] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [selectValue, setSelectValue] = useState();
  const [fieldKey, setFieldKey] = useState();
  const [saveEnable, setSaveEnable] = useState(false);
  //redux
  const brand = useSelector(
    (state) => state.fetchAddProductDetails.brand.Brand
  );

  const productType = useSelector(
    (state) => state.fetchAddProductDetails.stdProductType.StdProductType
  );
  const [productTypeData, setProductTypeData] = useState([]);

  const condition = useSelector(
    (state) => state.fetchAddProductDetails.condition.Condition
  );
  const [conditionData, setConditionData] = useState([]);
  let editResponse = useSelector(
    (state) => state.editResponse.editResponse.EditResponse
  );
  const baseUOMApi = useSelector(
    (state) => state.fetchAddProductDetails.baseUOM.BaseUOM
  );

  const [uomList, setUomList] = useState([]);
  useEffect(() => {
    if (
      editResponse &&
      !editResponse.status &&
      editResponse.message ===
      "Available quantity should be set to zero before changing type"
    ) {
      const tempValue = {
        ...variant,
        detailed_type: prevVariant.detailed_type,
      };
      setVariant(tempValue);
      const temp1Value = {
        ...finalVariant,
        detailed_type: prevVariant.detailed_type,
      };
      setFinalVariant(temp1Value);
    }
  }, [editResponse]);

  useEffect(() => {
    setVariant(fields ? fields : []);
    setPrevVariant(fields ? fields : []);
    if (edit === false) {
      setQuery(true);
    }
  }, [fields]);

  useEffect(() => {
    if (baseUOMApi && baseUOMApi.data) {
      const temp = baseUOMApi.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setUomList(temp);
    }
  }, [baseUOMApi]);

  useEffect(() => {
    if (selectValue === "Brand") {
      setSaveEnable(true);
      const tempValue = {
        ...variant,
        brand_id: { id: selectKey, name: selectedText },
      };
      setVariant(tempValue);
      const temp1Value = {
        ...finalVariant,
        brand_id: selectKey,
      };
      setFinalVariant(temp1Value);
    }
    if (selectValue === "Condition") {
      setSaveEnable(true);
      const tempValue = { ...variant, product_condition: selectKey };
      setVariant(tempValue);
      const temp1Value = {
        ...finalVariant,
        product_condition: selectKey,
      };
      setFinalVariant(temp1Value);
    }
  }, [selectKey]);

  const onInputChange = (prop, value) => {
    // const tempValue = { ...variant, [prop]: value };
    // setVariant(tempValue);
    // const temp1Value = { ...finalVariant, [prop]: value };
    // setFinalVariant(temp1Value);
    // setSaveEnable(true);

    const newVariant = { ...variant };
    const newFinalVariant = { ...finalVariant };
    if (
      prop === "product_length" ||
      prop === "product_breadth" ||
      prop === "product_height" ||
      prop === "product_weight"
    ) {
      const newProductDimension = newVariant.product_dimensions
        ? { ...newVariant.product_dimensions }
        : {};
      newProductDimension[prop] = parseInt(value);
      newVariant.product_dimensions = newProductDimension;
      newFinalVariant.product_dimensions = newProductDimension;
    } else {
      newVariant[prop] = value;
      newFinalVariant[prop] = value;
    }

    setVariant(newVariant);
    setFinalVariant(newFinalVariant);
    setSaveEnable(true);
  };

  const onSelelectionChange = (prop, value) => {
    const temp = { ...variant };
    const tempFinal = { ...finalVariant };
    if (prop === "uom") {
      const newProductDimension = temp.product_dimensions
        ? { ...temp.product_dimensions }
        : {};
      newProductDimension.uom = { id: null, name: "" };
      newProductDimension.uom.name = value.label;
      newProductDimension.uom.id = value.value;
      temp.product_dimensions = newProductDimension;
      tempFinal.product_dimensions = newProductDimension;
    }

    if (prop === "condition") {
      const newProductConditon = temp.condition ? { ...temp.condition } : {};
      newProductConditon.display_name = value.label;
      newProductConditon.id = value.value;
      temp.condition = newProductConditon;
      temp.condition_id = value.value;
      tempFinal.condition = newProductConditon;
      tempFinal.condition_id = value.value;
    }

    if (prop === "standard_product_type") {
      let newStdProductType = value.map((item) => {
        return {
          id: item.value,
          display_name: item.label,
        };
      });
      let newFinalStdProductType = value.map((item) => {
        return {
          id: item.value,
        };
      });
      temp.standard_product_types = newStdProductType;
      tempFinal.standard_product_types = newFinalStdProductType;
    }

    setVariant(temp);
    setFinalVariant(tempFinal);
    setSaveEnable(true);
  };

  const getConditionType = (prod_type) => {
    if (prod_type === "new") {
      return "New";
    } else if (prod_type === "old") {
      return "Old";
    } else if (prod_type === "refurbished") {
      return "Refurbished";
    } else {
      return "";
    }
  };
  const sendData = () => {
    if (fields["id"]) {
      dispatch(editProductVariant(finalVariant, fields["id"]));
    }
  };

  useEffect(() => {
    if (productType && productType.data) {
      const temp = productType.data.map((item) => {
        return {
          value: item.id,
          label: item.display_name,
        };
      });
      setProductTypeData(temp);
    }
  }, [productType]);

  useEffect(() => {
    if (condition && condition.data) {
      const temp = condition.data.map((item) => {
        return {
          value: item.id,
          label: item.display_name,
        };
      });
      setConditionData(temp);
    }
  }, [condition]);
  //render function
  return (
    <Box className="companyDetailsOrder">
      <Box className="companyDetailsOrderHeader">
        <p className="companyDetailsOrder_header">Extra Varient Information</p>
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
      {variant && (
        <>
          <Box className="companyDetailsOrder_card">
            <Box className="variantDetailsCard_card_left">
              {query ? (
                <Suspense fallback={<div>Loading... </div>}>
                  <RemoteWrapper>
                    <RemoteViewTextField
                      card
                      label={"Standard Product Type"}
                      text={
                        variant.standard_product_types
                          ? variant.standard_product_types?.length > 0
                            ? variant.standard_product_types.map((item) => {
                              return item.display_name + " ";
                            })
                            : "--"
                          : "--"
                      }
                      disabled_y={query}
                      name="standard_product_type"
                      onInputChange={onInputChange}
                    />
                  </RemoteWrapper></Suspense>
              ) : (
                <Suspense fallback={<div>Loading... </div>}>
                  <RemoteWrapper>
                    <RemoteSelect
                      multiple={true}
                      disabled={query}
                      label={"Standard Product Type"}
                      data={productTypeData}
                      value={
                        variant.standard_product_types
                          ? variant.standard_product_types?.map((item) => {
                            return {
                              label: item.display_name,
                              value: item.id,
                              ...item,
                            };
                          })
                          : []
                      }
                      onChange={(e, value) =>
                        onSelelectionChange("standard_product_type", value)
                      }
                      placeholder={`Standard Product Type`}
                      fieldKey={"product_condition"}
                      edit={true}
                    />
                  </RemoteWrapper></Suspense>
              )}

              {query ? (
                <Suspense fallback={<div>Loading... </div>}>
                  <RemoteWrapper>
                    <RemoteViewTextField
                      card
                      label={"Condition"}
                      text={
                        variant.condition
                          ? variant.condition.display_name
                            ? variant.condition.display_name
                            : "--"
                          : "--"
                      }
                      disabled_y={query}
                      name="product_condition"
                    />
                  </RemoteWrapper></Suspense>
              ) : (
                <Suspense fallback={<div>Loading... </div>}>
                  <RemoteWrapper>
                    <RemoteSelect
                      disabled={query}
                      label={"Condition"}
                      data={conditionData}
                      placeholder={`Condition`}
                      value={
                        variant.conditon
                          ? variant.condition.display_name
                            ? variant.condition.display_name
                            : "--"
                          : ""
                      }
                      fieldKey={"product_condition"}
                      onChange={(e, value) =>
                        onSelelectionChange("condition", value)
                      }
                    />
                  </RemoteWrapper></Suspense>
              )}
            </Box>
            <Box className="variantDetailsCard_card_right">
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Standard Product Type ID"}
                    text={variant && variant.standard_product_type_id}
                    disabled_y={query}
                    name="standard_product_type_id"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper></Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Brand"}
                    text={parentBrand ? parentBrand : "--"}
                    disabled_y={true}
                    name="brand_id"
                  />
                </RemoteWrapper></Suspense>

              {/* {query ? (
                 <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                  card
                  label={"Brand"}
                  text={parentBrand ? parentBrand : "--"}
                  disabled_y={true}
                  name="brand_id"
                />
                </RemoteWrapper></Suspense>
              ) : (
                <Dropdown
                  label={"Brand"}
                  placeholder={`Select Brand`}
                  options={brand.data}
                  setSelectKey={setSelectKey}
                  setSelectedText={setSelectedText}
                  setSelectValue={setSelectValue}
                  required={false}
                  value={parentBrand ? parentBrand.name : ""}
                  errorMessage={null}
                />
              )} */}
            </Box>
          </Box>
          <Box className="companyDetailsOrderHeader">
            <p className="companyDetailsOrder_header">Product Dimensions</p>
            <Box className="companyDetailsOrderHeader_btn"></Box>
          </Box>
          <Box className="companyDetailsOrder_card">
            <Box className="variantDetailsCard_card_left">
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Length (in cms)"}
                    type={"number"}
                    text={
                      variant.product_dimensions
                        ? variant.product_dimensions.product_length
                          ? variant.product_dimensions.product_length
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="product_length"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper></Suspense>

              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Height (in cms)"}
                    type={"number"}
                    text={
                      variant.product_dimensions
                        ? variant.product_dimensions.product_height
                          ? variant.product_dimensions.product_height
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="product_height"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper></Suspense>
              <></>

              {query ? (
                <Suspense fallback={<div>Loading... </div>}>
                  <RemoteWrapper>
                    <RemoteViewTextField
                      card
                      label={"UOM (in cms)"}
                      text={
                        variant && variant.product_dimensions
                          ? variant.product_dimensions.uom
                            ? variant.product_dimensions.uom.name
                              ? variant.product_dimensions.uom.name
                              : "--"
                            : "--"
                          : "--"
                      }
                      disabled_y={query}
                      name="uom"
                    />
                  </RemoteWrapper></Suspense>
              ) : (
                <Suspense fallback={<div>Loading... </div>}>
                  <RemoteWrapper>
                    <RemoteSelect
                      disabled={query}
                      label={"uom"}
                      data={uomList}
                      placeholder={`Select Variant type`}
                      value={
                        variant && variant.product_dimensions
                          ? variant.product_dimensions.uom
                            ? variant.product_dimensions.uom.name
                            : ""
                          : ""
                      }
                      onChange={(e, value) => onSelelectionChange("uom", value)}
                      fieldKey={"uom"}
                      edit={true}
                    />
                  </RemoteWrapper></Suspense>
              )}
            </Box>
            <Box className="variantDetailsCard_card_right">
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Breadth (in cms)"}
                    text={
                      variant.product_dimensions
                        ? variant.product_dimensions.product_breadth
                          ? variant.product_dimensions.product_breadth
                          : "--"
                        : "--"
                    }
                    type={"number"}
                    disabled_y={query}
                    name="product_breadth"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper></Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Weight (in grams)"}
                    type={"number"}
                    text={
                      variant.product_dimensions
                        ? variant.product_dimensions.product_weight
                          ? variant.product_dimensions.product_weight
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="product_weight"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper></Suspense>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ExtraVariantDetailsCard;


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