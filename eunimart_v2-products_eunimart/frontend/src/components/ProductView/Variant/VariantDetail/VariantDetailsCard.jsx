import React, { useEffect } from "react";
import "../ProductDetailCard/ProductDetailCard.css";
import LabeledText from "../../../../shared/OtherCommon/CommonLabel/LabeledText";
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


const VariantDetailsCard = ({ fields, edit }) => {

  console.log("VariantDetailsCard", fields)
  //redux
  const currency = useSelector(
    (state) => state.fetchSearchReducer.currency.Currency
  );

  const variantType = useSelector(
    (state) => state.fetchAddProductDetails.productType.ProductType
  );
  const [variantTypeList, setVariantTypeList] = useState([]);

  let editResponse = useSelector(
    (state) => state.editResponse.editResponse.EditResponse
  );

  //local variables
  const [query, setQuery] = useState(false);
  const [variant, setVariant] = useState(fields ? fields : []);
  const [prevVariant, setPrevVariant] = useState([]);
  const [finalVariant, setFinalVariant] = useState({});
  const dispatch = useDispatch();
  const [selectKey, setSelectKey] = useState();
  const [selectValue, setSelectValue] = useState();
  const [selectedText, setSelectedText] = useState();
  const [fieldKey, setFieldKey] = useState();
  const [saveEnable, setSaveEnable] = useState(false);

  //local function
  const onInputChange = (prop, value) => {
    const newVariant = { ...variant };
    const newFinalVariant = { ...finalVariant };
    if (prop === "selling_price") {
      newVariant[prop] = Number(value);
      newFinalVariant[prop] = Number(value);
    } else if (prop === "cost_price") {
      const newProductPricing = { ...newVariant.product_pricing_details };
      newProductPricing.cost_price = parseInt(value);
      newVariant.product_pricing_details = newProductPricing;
      newFinalVariant.product_pricing_details = newProductPricing;
    } else {
      newVariant[prop] = value;
      newFinalVariant[prop] = value;
    }
    setVariant(newVariant);
    setFinalVariant(newFinalVariant);
    setSaveEnable(true);
  };

  const getVariantType = (prod_type) => {
    if (prod_type === "product") {
      return "Storable";
    } else if (prod_type === "consu") {
      return "Consumable";
    } else if (prod_type === "service") {
      return "Service";
    } else if (prod_type === "pack") {
      return "Packaging";
    } else {
      return "";
    }
  };
  const sendData = () => {
    if (finalVariant?.detailed_type === undefined) {
      delete finalVariant.detailed_type;
    }
    if (fields["id"]) {
      dispatch(editProductVariant(finalVariant, fields["id"]));
    }
  };

  const onSelelectionChange = (prop, value) => {
    const temp = { ...variant };
    if (prop === "variant_type_id") {
      temp.variant_type.display_name = value.label;
      temp.variant_type.id = value.value;
    }

    setVariant(temp);
    setFinalVariant({ ...finalVariant, [prop]: value.value });
    setSaveEnable(true);
  };

  //useEffect function
  useEffect(() => {
    if (editResponse?.meta?.success === true) {
      const tempValue = {
        ...variant,
        // detailed_type: prevVariant.detailed_type,
      };
      setVariant(tempValue);
      const temp1Value = {
        ...finalVariant,
        // detailed_type: prevVariant.detailed_type,
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
    if (selectValue === "Currency type") {
      setSaveEnable(true);
      const temp1Value = {
        currency_id: { ...finalVariant, id: selectKey, name: selectedText },
      };
      setFinalVariant(temp1Value);
    } else {
      setSaveEnable(true);
      const tempValue = { ...variant, detailed_type: selectKey };
      setVariant(tempValue);
      const temp1Value = { ...finalVariant, detailed_type: selectKey };
      setFinalVariant(temp1Value);
    }
  }, [selectKey]);

  useEffect(() => {
    if (variantType && variantType.data) {
      const temp = variantType.data.map((item) => {
        return {
          value: item.id,
          label: item.display_name,
        };
      });
      setVariantTypeList(temp);
    }
  }, [variantType]);
  console.log("variantvariant",variant)

  //render function
  return (
    <Box className="companyDetailsOrder">
      {variant && (
        <>
          <Box className="companyDetailsOrderHeader">
            <p className="companyDetailsOrder_header">
              Variant Identifier Details
            </p>
            <Box>
              {query === true ? (
                <Box>
                  <Button variant="outlined" sx={{ mr: 1 }}>
                    Audit Trail
                  </Button>

                  
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
                    Save Details
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
          <Box className="companyDetailsOrder_card">
            <Box className="variantDetailsCard_card_left">
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Variant Product Name"}
                    text={variant.product_name ? variant.product_name : "--"}
                    disabled_y={query}
                    name="product_name"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper></Suspense>

              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Parent SKU ID"}
                    text={variant.parent_sku_id ? variant.parent_sku_id : "--"}
                    disabled_y={true}
                    name="parent_sku_id"
                    onInputChange={onInputChange}
                    edit={"0"}
                  />
                </RemoteWrapper></Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Currency type"}
                    text={
                      variant["product_pricing_details"] &&
                        variant["product_pricing_details"]["currency"]
                        ? variant["product_pricing_details"]["currency"].name
                        : "--"
                    }
                    disabled_y={true}
                    name="currency_id"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper></Suspense>

              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Variant Barcode Number"}
                    text={variant.barcode ? variant.barcode : "--"}
                    disabled_y={query}
                    name="barcode"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper></Suspense>
            </Box>
            <Box className="variantDetailsCard_card_right">
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Variant SKU id"}
                    text={variant.sku_id}
                    disabled_y={query}
                    name="sku_id"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper></Suspense>

              {query ? (
                <Suspense fallback={<div>Loading... </div>}>
                  <RemoteWrapper>
                    <RemoteViewTextField
                      card
                      label={"Variant type"}
                      text={
                        variant.variant_type
                          ? variant.variant_type.display_name
                          : "--"
                      }
                      disabled_y={query}
                      name="detailed_type"
                    />
                  </RemoteWrapper></Suspense>
              ) : (
                // <Select

                //   className="variantDetailsCard_card_right_select"
                //   disabled={query}
                //   label={"Variant type"}
                //   data={[
                //     ["product", "Storable"],
                //     ["consu", "Consumable"],
                //     ["service", "Service"],
                //     ["pack", "Packaging"],
                //   ]}
                //   placeholder={`Select Variant type`}
                //   setSelectKey={setSelectKey}
                //   setSelectValue={setSelectValue}
                //   value={variant?.detailed_type}
                //   setFieldKey={setFieldKey}
                //   fieldKey={"detailed_type"}
                // />

                <Suspense fallback={<div>Loading... </div>}>
                  <RemoteWrapper>
                    <RemoteSelect
                      disabled={query}
                      label={"Variant type"}
                      data={variantTypeList}
                      placeholder={`Select Variant type`}
                      value={
                        variant.variant_type
                          ? variant.variant_type.display_name
                          : ""
                      }
                      onChange={(e, value) =>
                        onSelelectionChange("variant_type_id", value)
                      }
                      fieldKey={"detailed_type"}
                      edit={true}
                    />
                  </RemoteWrapper></Suspense>
              )}
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Variant Selling Price"}
                    text={variant?.product_pricing_details?.sales_price ? variant?.product_pricing_details?.sales_price : "--"}
                    disabled_y={query}
                    name="selling_price"
                    onInputChange={onInputChange}
                    type="number"
                  />
                </RemoteWrapper></Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Variant Cost"}
                    text={
                      variant && variant.product_pricing_details
                        ? variant.product_pricing_details.cost_price
                        : "--"
                    }
                    // value={user.company_type}
                    disabled_y={query}
                    name="cost_price"
                    onInputChange={onInputChange}
                    type="number"
                  />
                </RemoteWrapper></Suspense>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default VariantDetailsCard;


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