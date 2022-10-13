import React, { useState, useEffect } from "react";
import LabeledText from "../../../shared/OtherCommon/CommonLabel/LabeledText";
import MatSelect from "../../../shared/widgets/MatSelect";
//mui
import { Box, Button, Typography } from "@mui/material";

function PricingDetails({ bundleData }) {
  //local variables
  const [variant, setVariant] = useState({
    sales_price: "890",
    cost_price: "450",
    mrp: "800",
    taxes: "90",
    base_currency: "Rupees",
    tax_in: "No",
    shipping_in: "No",
  });
  const [prevVariant, setPrevVariant] = useState({
    sales_price: "890",
    cost_price: "450",
    mrp: "800",
    taxes: "90",
    base_currency: "Rupees",
    tax_in: "No",
    shipping_in: "No",
  });
  const [finalVariant, setFinalVariant] = useState([]);
  const [saveEnable, setSaveEnable] = useState(false);
  const [query, setQuery] = useState(true);
  const [selectKey, setSelectKey] = useState();
  const [selectValue, setSelectValue] = useState();
  const [selectedText, setSelectedText] = useState();
  const [fieldKey, setFieldKey] = useState();

  //local functions
  const onInputChange = (prop, value) => {
    const tempValue = { ...variant, [prop]: value };
    setVariant(tempValue);
    const temp1Value = { ...finalVariant, [prop]: value };
    setFinalVariant(temp1Value);
    setSaveEnable(true);
  };

  const sendData = () => {
    // if (fields["id"]) {
    //   dispatch(editProductVariant(finalVariant, fields["id"]));
    // }
  };

  //useEffect functions
  useEffect(() => {
    if (selectValue === "Base Currency") {
      setSaveEnable(true);
      const temp1Value = {
        base_currency: { ...finalVariant, id: selectKey, name: selectedText },
      };
      setFinalVariant(temp1Value);
    }
    if (selectValue === "Tax included in sell price") {
      setSaveEnable(true);
      const temp1Value = {
        tax_in: { ...finalVariant, id: selectKey, name: selectedText },
      };
      setFinalVariant(temp1Value);
    }
    if (selectValue === "Shipping included in sell price") {
      setSaveEnable(true);
      const temp1Value = {
        shipping_in: { ...finalVariant, id: selectKey, name: selectedText },
      };
      setFinalVariant(temp1Value);
    }
  }, [selectKey]);

  useEffect(() => {
    if (bundleData) {
      let tempVariant = { ...variant };
      tempVariant.sales_price = bundleData.sales_price
        ? bundleData.sales_price
        : "--";
      tempVariant.cost_price = bundleData.cost_price
        ? bundleData.cost_price
        : "--";
      tempVariant.mrp = bundleData.mrp ? bundleData.mrp : "--";
      tempVariant.taxes = bundleData.tax_options
        ? bundleData.tax_options
        : "--";
      tempVariant.base_currency = bundleData.currency
        ? bundleData.currency.name
          ? bundleData.currency.name
          : "--"
        : "--";

      tempVariant.tax_in = bundleData.tax ? "Yes" : "No";
      tempVariant.shipping_in = bundleData.shipping ? "Yes" : "No";

      setVariant(tempVariant);
      setPrevVariant(tempVariant);
    }
  }, [bundleData]);
  //render functions
  return (
    <Box
      sx={{
        background: "#fff",
        padding: "24px",
        mt: 2,
        borderRadius: "8px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontFamily={"Poppins"}>
          Pricing Details
        </Typography>
        {/* <Box>
          {query ? (
            <Button
              variant="contained"
              onClick={() => {
                setQuery((prev) => !prev);
                setSaveEnable(false);
              }}
              style={{ textTransform: "none" }}
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
        </Box> */}
      </Box>
      <Box>
        <Box
          sx={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "50% 50%",
          }}
        >
          <LabeledText
            card
            label={"Sales Price"}
            // text={variant && variant.name}
            text={variant && variant.sales_price}
            disabled_y={query}
            name="sales_price"
            onInputChange={onInputChange}
          />
          <LabeledText
            card
            label={"Cost Price"}
            // text={variant && variant.name}
            text={variant && variant.cost_price}
            disabled_y={query}
            name="cost_price"
            onInputChange={onInputChange}
          />
          <LabeledText
            card
            label={"MRP"}
            // text={variant && variant.name}
            text={variant && variant.mrp}
            disabled_y={query}
            name="mrp"
            onInputChange={onInputChange}
          />
          <LabeledText
            card
            label={"Enter Taxes"}
            // text={variant && variant.name}
            text={variant && variant.taxes}
            disabled_y={query}
            name="taxes"
            onInputChange={onInputChange}
          />
          {query ? (
            <LabeledText
              card
              label={"Base Currency"}
              text={variant && variant.base_currency}
              disabled_y={query}
              name="base_currency"
            />
          ) : (
            <MatSelect
              disabled={query}
              label={"Base Currency"}
              data={[
                ["rupee", "Rupees"],
                ["dollar", "Dollars"],
                ["euro", "Euro"],
                ["pound", "Pound"],
              ]}
              placeholder={`Select Currency`}
              setSelectKey={setSelectKey}
              setSelectValue={setSelectValue}
              value={variant?.base_currency}
              setFieldKey={setFieldKey}
              fieldKey={"base_currency"}
            />
          )}
          {query ? (
            <LabeledText
              card
              label={"Tax included in sell price"}
              text={variant && variant.tax_in}
              disabled_y={query}
              name="tax_in"
            />
          ) : (
            <MatSelect
              disabled={query}
              label={"Tax included in sell price"}
              data={[
                ["false", "No"],
                ["true", "Yes"],
              ]}
              placeholder={`Select Tax in sell price`}
              setSelectKey={setSelectKey}
              setSelectValue={setSelectValue}
              value={variant?.tax_in}
              setFieldKey={setFieldKey}
              fieldKey={"tax_in"}
            />
          )}
          {query ? (
            <LabeledText
              card
              label={"Shipping included in sell price"}
              text={variant && variant.shipping_in}
              disabled_y={query}
              name="shipping_in"
            />
          ) : (
            <MatSelect
              disabled={query}
              label={"Shipping included in sell price"}
              data={[
                ["false", "No"],
                ["true", "Yes"],
              ]}
              placeholder={`Select Shipping in sell price`}
              setSelectKey={setSelectKey}
              setSelectValue={setSelectValue}
              value={variant?.shipping_in}
              setFieldKey={setFieldKey}
              fieldKey={"shipping_in"}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default PricingDetails;


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