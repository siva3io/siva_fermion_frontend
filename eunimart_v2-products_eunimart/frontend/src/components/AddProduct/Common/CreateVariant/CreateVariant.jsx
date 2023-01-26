import React, { useState, useEffect } from "react";
import "./CreateVariant.css";
import CVTable from "./Table/CVTable";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  getPropertyAttribute,
  createPropertyAttribute,
  createVariantTable,
} from "../../../../redux/Action/FetchCreateVariantAction";

//MUI
//import MatSelect from "../../../../shared/widgets/MatSelect";

import { lazy, Suspense } from "react";
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));
import ErrorBoundary from "../../../../ErrorBoundary";

import {
  Button,
  Box,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";


const RemoteWrapper = ({ children }) => (
  <div
    style={{

      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

function CreateVariant({
  edit,
  step2Data,
  setStep2Data,
  finalData,
  setFinalData,
  productId,
  editProductData,
}) {
  //redux variables
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const dispatch = useDispatch();
  const [generate, setGenerate] = useState({ attribute_values: [] });
  const attributesApi = useSelector(
    (state) => state.fetchCreateVariant.attribute.Attribute
  );
  const propertiesApi = useSelector(
    (state) => state.fetchCreateVariant.property.Property
  );
  let variantTable = useSelector(
    (state) => state.fetchCreateVariant.variantTable.VariantTable
  );
  const [prepopVariantTable, setPrePopVariantTable] = useState([]);
  const [prepopImageArr, setPrepopImageArr] = useState([]);

  useEffect(() => { }, [prepopVariantTable]);
  const [attributeArr, setAttributeArr] = useState([{ data: [], value: "" }]);
  const [propertyArr, setPropertyArr] = useState([{ data: [], value: [] }]);
  const [oneRes, setOneRes] = useState([]);

  //local variables
  const [localVariantTableData, setLocalVariantTableData] = useState([]);

  //Array to be attached in api >> attributes key
  const [finalAttributes, setFinalAttributes] = useState([
    {
      id: null,
      name: "",
      attribute_values: [],
    },
  ]);

  //local funnction
  const addAttribute = () => {
    setAttributeArr([
      ...attributeArr,
      {
        data:
          attributesApi &&
          attributesApi.data.map((attribute) => {
            return { value: attribute.id, label: attribute.name };
          }),
        value: "",
      },
    ]);
    setPropertyArr([...propertyArr, { data: [], value: [] }]);
    setFinalAttributes([
      ...finalAttributes,
      {
        id: null,
        name: "",
        attribute_values: [],
      },
    ]);
  };

  const onSelectionChanges = (prop, valueId, valueLabel, index) => {
    if (prop === "variant" && propertiesApi.data) {
      const tempPropArr = [...propertyArr];
      const temp = [...attributeArr];

      const tempArr = propertiesApi.data.map((property) => {
        if (
          property.base_attribute_id &&
          property.base_attribute_id === valueId
        ) {
          return { value: property.id, label: property.name };
        }
      });
      tempPropArr[index].data = tempArr;
      temp[index].value = valueLabel;

      tempPropArr[index].data = tempPropArr[index].data.filter(
        (element) => element !== undefined
      );
      setAttributeArr(temp);
      setPropertyArr(tempPropArr);

      finalAttributes[index].id = valueId;
      finalAttributes[index].name = valueLabel;
      setStep2Data({ ...step2Data, attribute_key_values: finalAttributes });
      setFinalData({ ...finalData, attribute_key_values: finalAttributes });
    }

    if (prop === "property") {
      const tempPropArr = [...propertyArr];

      tempPropArr[index].value = valueLabel;
      const temp = valueLabel.map((property) => {
        return { id: property.value, name: property.label };
      });
      finalAttributes[index].attribute_values = temp;

      setPropertyArr(tempPropArr);
      setStep2Data({ ...step2Data, attribute_key_values: finalAttributes });
      setFinalData({ ...finalData, attribute_key_values: finalAttributes });
    }
  };

  //useEffect functions

  useEffect(() => {
    if (attributesApi.data) {
      let tempAttributeArr = [...attributeArr];
      attributeArr.map((attr, index) => {
        tempAttributeArr[index].data = attributesApi.data.map((attribute) => {
          return { value: attribute.id, label: attribute.name };
        });
      });
      setAttributeArr(tempAttributeArr);
    }
  }, [attributesApi]);

  useEffect(() => {
    if (propertyArr.length > 0) {
      let fianelArr = propertyArr.map((item) => {
        if (item.value.length > 0) {
          return item.value.map((field) => {
            return { id: field.value, name: field.label };
          });
        }
      });
      fianelArr = fianelArr.filter((element) => element !== undefined);
      setGenerate({ ...generate, attribute_values: fianelArr });
    }
  }, [propertyArr]);

  useEffect(() => {
    setLocalVariantTableData(variantTable ? variantTable.data : []);
  }, [variantTable]);

  useEffect(() => {
    const tempData = attributesApi.data.map((attribute) => {
      return { value: attribute.id, label: attribute.name };
    });
    if (edit && step2Data.attribute_key_values && check1 === false) {
      const tempPropArr = step2Data.attribute_key_values.map((attribute) => {
        return { data: [], value: [] };
      });
      const tempAttriArr = step2Data.attribute_key_values.map(
        (attribute, indexAttri) => {
          //property prepopulation starts here
          let tempProp = propertiesApi.data.map((property) => {
            if (
              property.base_attribute_id &&
              property.base_attribute_id === attribute.attribute_id
            ) {
              return { value: property.id, label: property.name };
            }
          });
          tempProp = tempProp.filter((element) => element !== undefined);
          let tempPropVal = attribute.attribute_values.map((value) => {
            return { value: value.attribute_value_id, label: value.name };
          });
          tempPropArr[indexAttri].data = tempProp;
          tempPropArr[indexAttri].value = tempPropVal;

          setPropertyArr(tempPropArr);
          //property pre-population ends

          //attribute pre-population starts here
          return {
            value: attribute.name,
            data: tempData,
          };
          //attribute pre-population ends
        }
      );

      //final attributes prepopulation starts here
      const tempFinalArr = step2Data.attribute_key_values.map((final) => {
        return {
          id: final.attribute_id,
          name: final.name,
          attribute_values: final.attribute_values,
        };
      });
      setAttributeArr(tempAttriArr);
      setCheck1(true);
      setFinalAttributes(tempFinalArr);
      //final attributes prepopulation ends
    }

    if (edit && editProductData.product_variant_ids && check2 === false) {
      let tempPrepopVariantTable = editProductData.product_variant_ids.map(
        (variant) => {
          return {
            image_options: variant.image_options,
            sku_id: variant.sku_id,
            attribute_key_values_id: variant?.attribute_values,
            product_pricing_details: {
              mrp: variant?.product_pricing_details?.mrp,
              id: variant?.product_pricing_details?.id,
            },
          };
        }
      );
      let tempImgArr = editProductData.product_variant_ids.map((variant) => {
        if (variant.image_options) {
          return variant.image_options.map((image) => {
            return image.data;
          });
        } else {
          return [];
        }
      });
      setPrepopImageArr(tempImgArr);
      // setCheck2(true);
      setPrePopVariantTable(tempPrepopVariantTable);
      setFinalAttributes(tempPrepopVariantTable);
    }
  }, [step2Data]);

  //render functions
  return (
    <Box className="locationDetailsMain">
      <Box className="locationDetailForm">
        {true && (
          <Box className="staticFormCard">
            <Box className="staticFormCardTitle">Create Variant</Box>
            {finalAttributes &&
              finalAttributes.length > 0 &&
              finalAttributes.map((elem, index) => (
                <AttributeRow
                  attribute={attributeArr[index]}
                  property={propertyArr[index]}
                  finalAttribute={finalAttributes[index]}
                  tempCount={index}
                  onSelectionChanges={onSelectionChanges}
                  attributesApi={attributesApi}
                />
              ))}
            <Box className="createVariantActionBtns">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={addAttribute}
                style={{ textTransform: "none" }}
              >
                Add More
              </Button>
              <Button
                variant="contained"
                startIcon={<LoopOutlinedIcon />}
                onClick={() => {
                  if (generate) dispatch(createVariantTable(generate));
                }}
                style={{ textTransform: "none", marginLeft: "10px" }}
              >
                Generate Variants
              </Button>
            </Box>
            {/* <Box style={{ color: "#416BFF", margin: "12px 0px" }}>
              <label style={{ color: "#416BFF" }}>
                Select Applicable Variants
              </label>
            </Box> */}
            <Box className="createVarientTable">
              <CVTable
                heading={[
                  "Variant SKU ID",
                  "Property",
                  "Variant Sale Price",
                  // "Opening Stock",
                  "Images",
                  "Action",
                ]}
                variantTableData={localVariantTableData}
                step2Data={step2Data}
                setStep2Data={setStep2Data}
                finalData={finalData}
                setFinalData={setFinalData}
                prePopVariantTable={prepopVariantTable}
                setPrePopVariantTable={setPrePopVariantTable}
                prepopImageArr={prepopImageArr}
                edit={edit}
              ></CVTable>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

const AttributeRow = ({
  attribute,
  property,
  finalAttribute,
  tempCount,
  onSelectionChanges,
  attributesApi,
}) => {
  return (
    <Box className="addVariantBlock">
      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <RemoteSelect
            required={false}
            label={"Select Variant Attribute"}
            placeholder={`Select Variant Attribute`}
            data={attribute?.data}
            onChange={(e, value) => {
              onSelectionChanges("variant", value.value, value.label, tempCount);
            }}
            value={attribute?.value}
            errorMessage={""}
            customWidth={"40%"}
          />
        </RemoteWrapper></Suspense>

      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <RemoteSelect
            multiple={true}
            required={false}
            label={"Select Property"}
            placeholder={`Select Property`}
            data={property?.data}
            onChange={(e, value) => {
              onSelectionChanges("property", value.value, value, tempCount);
            }}
            value={property?.value}
            errorMessage={""}
            customWidth={"25%"}
          />
        </RemoteWrapper></Suspense>

      {/* <Box className="input_main_wrapper">
        <Box className="inputWrapper">
          <Box className="labelWrap">
            <Typography>{"Select Property"}</Typography>
          </Box>
          <Box className="input_wrap">
            <Autocomplete
              multiple
              id="tags-outlined"
              options={property.data}
              getOptionLabel={(option) => option.name}
              defaultValue={property.value}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Property"
                  placeholder="Select Property"
                />
              )}
              size="small"
            />
          </Box>
        </Box>
      </Box> */}
    </Box>
  );
};

export default CreateVariant;

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