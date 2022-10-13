import React, { useState } from "react";
import LabeledText from "../../../../shared/OtherCommon/CommonLabel/LabeledText";
import MatCheckbox from "../../../../shared/widgets/MatCheckbox";
//mui
import { Box, Typography, Button } from "@mui/material";

function ProductDetails({ view }) {
  //local variables
  const [staticFields, setStaticFields] = useState([
    {
      label: "Product Name",
      type: "input",
      required: false,
      errorMessage: "Product Title is required",
      key: "product_name",
      minLength: 5,
      maxLength: 20,
      value: "Nike Men’s Round Neck T-shirt",
    },
    {
      label: "Modal Number",
      type: "input",
      required: false,
      errorMessage: "Modal no. is required",
      key: "model_no",
      minLength: 5,
      maxLength: 20,
      value: "A Class",
    },
    {
      label: "SKU ID",
      type: "input",
      required: false,
      errorMessage: "SKU ID is required",
      key: "sku_id",
      minLength: 5,
      maxLength: 10,
      value: "52546216SKU",
    },
    {
      label: "Variant Type",
      type: "checkbox",
      required: false,
      key: "variant_type",
      sub: [
        ["purchase_ok", "Can be Purchase", true],
        ["sale_ok", "Can be Sold", true],
        ["pkg_mat", "Is Packaging Material", true],
      ],
    },
    {
      label: "Product Brand",
      type: "input",
      key: "product_brand",
      required: false,
      errorMessage: "Product brand is required",
      minLength: 5,
      maxLength: 20,
      value: "Nike",
    },

    {
      label: "Keywords",
      type: "input",
      key: "keywords",
      required: false,
      errorMessage: "Keyword is required",
      minLength: 5,
      maxLength: 20,
      value: "XS",
    },
    {
      label: "Standard Product Type",
      type: "checkbox",
      required: false,
      key: "std_product_type",
      sub: [
        ["gtin", "GTIN", true],
        ["isbn", "ISBN", true],
        ["upc", "UPC", true],
        ["ean", "EAN", true],
      ],
    },
    {
      label: "Product Size",
      type: "input",
      key: "product_size",
      required: false,
      errorMessage: "Product size is required",
      minLength: 5,
      maxLength: 20,
      value: "ABCDEF",
    },
    {
      label: "Product Color",
      type: "input",
      key: "product_color",
      required: false,
      errorMessage: "Product color is required",
      minLength: 5,
      maxLength: 20,
      value: "Black",
    },
  ]);

  const [variant, setVariant] = useState({
    product_name: "",
    model_no: "",
    sku_id: "",
    variant_type: "",
    product_brand: "",
    keywords: "",
    std_product_type: "",
    product_size: "",
    product_color: "",
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

  const setCheckboxType = (label, prop, value) => {
    let tempStaticField = [...staticFields];
    let index = tempStaticField.findIndex(function (field) {
      return field.label === label;
    });
    let sub_index1 = tempStaticField[index].sub.findIndex(function (field) {
      return field[0] === prop;
    });

    const tempArr = [...staticFields];
    tempArr[index].sub[sub_index1][2] = value;
    setStaticFields(tempArr);
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
          Product Details
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
              ) : field.type === "checkbox" ? (
                <Box>
                  {view ? (
                    <Box className="product-checkboxFieldMain">
                      <Box className={"labelWrap_card"} sx={{ width: "65%" }}>
                        <Typography
                          htmlFor={field.label
                            .toLowerCase()
                            .split(" ")
                            .join("_")}
                          className={
                            field.disabled_y
                              ? "commonlabel_disabled"
                              : "Commonlabel"
                          }
                          color={"#b0b0b0"}
                        >
                          {field.label}
                        </Typography>
                      </Box>
                      <Box className="product-checkboxFieldSub">
                        <Typography sx={{ color: "#b0b0b0" }}>
                          Select
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Box className="product-checkboxFieldMain">
                      <Box className={"labelWrap_card"} sx={{ width: "35%" }}>
                        <Typography
                          htmlFor={field.label
                            .toLowerCase()
                            .split(" ")
                            .join("_")}
                          className={
                            field.disabled_y
                              ? "commonlabel_disabled"
                              : "Commonlabel"
                          }
                        >
                          {field.label}
                        </Typography>
                      </Box>
                      <Box className="product-checkboxFieldSub">
                        {field.sub && (
                          <MatCheckbox
                            label={field.label}
                            fields={field.sub}
                            setCheckboxType={setCheckboxType}
                          />
                        )}
                      </Box>
                    </Box>
                  )}
                </Box>
              ) : (
                <></>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
}

export default ProductDetails;


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