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
import VendorDetailsTable from "./VendorDetailsTable";

const VendorDetails = ({ fields, edit }) => {
  //redux

  let editResponse = useSelector(
    (state) => state.editResponse.editResponse.EditResponse
  );

  const vendorsApi = useSelector((state) => state.fetchVPDetails.vendor.Vendor);

  //local variables
  const [query, setQuery] = useState(false);
  const [vendor, setVendor] = useState(fields ? fields : []);
  const [prevVendor, setPrevVendor] = useState([]);
  const [finalVendor, setFinalVendor] = useState([]);
  const dispatch = useDispatch();
  const [selectKey, setSelectKey] = useState();
  const [selectValue, setSelectValue] = useState();
  const [selectedText, setSelectedText] = useState();
  const [fieldKey, setFieldKey] = useState();
  const [saveEnable, setSaveEnable] = useState(false);

  useEffect(() => {
    setVendor(fields ? fields : []);
    setPrevVendor(fields ? fields : []);
    if (edit === false) {
      setQuery(true);
    }
  }, [fields]);

  const onInputChange = (prop, value) => {
    const tempValue = { ...vendor, [prop]: value };
    setVendor(tempValue);
    const temp1Value = { ...finalVendor, [prop]: value };
    setFinalVendor(temp1Value);
    setSaveEnable(true);
  };

  const sendData = (vendor) => {

    var vendor_list_array = [];
    for (var i = 0; i < vendor.price_list_details.length; i++) {
      vendor_list_array.push(vendor.price_list_details[i].id)
    }
   // setFinalData({ ...finalData, price_list_details: vendor_list_array });

    let finalDataSubmit = {
      vendor_price_list_ids: vendor_list_array,
      // shipping_options: {},
    };

    if (fields["id"]) {
      dispatch(editProductVariant(finalDataSubmit, fields["id"]));
    }
  };

  useEffect(() => {}, [vendorsApi]);
  console.log("vendrosapi",vendor,vendorsApi)

  //render function
  return (
    <Box className="companyDetailsOrder">
      {vendor && (
        <>
          <Box className="companyDetailsOrderHeader">
            <p className="companyDetailsOrder_header">Vendor Details</p>
            <Box>
              {query === true ? (
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
                      setVendor(prevVendor);
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
                        setPrevVendor(vendor);
                        sendData(vendor);
                      }
                    }}
                  >
                    Save Details
                  </Button>
                </Box>
              )}
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <VendorDetailsTable
              data={vendor}
              setVendor={setVendor}
              query={query}
              vendorsApi={vendorsApi}
              setSaveEnable={setSaveEnable}
            />
          </Box>
          {/* <Box className="companyDetailsOrder_card">
            <Box className="variantDetailsCard_card_left">
              {query ? (
                <LabeledText
                  card
                  label={"Tax Included in sales price"}
                  //   text={
                  //     vendor &&
                  //     vendor.tax_inclu_sales_price &&
                  //     vendor.tax_inclu_sales_price
                  //   }
                  text={"No"}
                  disabled_y={query}
                  name="tax_inclu_sales_price"
                />
              ) : (
                <MatSelect
                  disabled={query}
                  label={"Tax Included in sales price"}
                  data={[
                    ["yes", "Yes"],
                    ["No", "No"],
                  ]}
                  placeholder={`Select Tax included in sales price`}
                  setSelectKey={setSelectKey}
                  setSelectValue={setSelectValue}
                  value={vendor?.tax_inclu_sales_price}
                  setFieldKey={setFieldKey}
                  fieldKey={"tax_inclu_sales_price"}
                />
              )}

              {query ? (
                <LabeledText
                  card
                  label={"Shipping Included"}
                  //   text={vendor && vendor.shipping_inclu && vendor.shipping_inclu}
                  text={"No"}
                  disabled_y={query}
                  name="shipping_inclu"
                />
              ) : (
                <MatSelect
                  disabled={query}
                  label={"Shipping Included"}
                  data={[
                    ["yes", "Yes"],
                    ["No", "No"],
                  ]}
                  placeholder={`Select shipping included`}
                  setSelectKey={setSelectKey}
                  setSelectValue={setSelectValue}
                  value={vendor?.shipping_inclu}
                  setFieldKey={setFieldKey}
                  fieldKey={"shipping_inclu"}
                />
              )}
            </Box>
            <Box className="variantDetailsCard_card_right">
              <LabeledText
                card
                label={"Shipping Cost"}
                text={vendor && vendor.standard_price}
                disabled_y={query}
                name="shipping_cost"
                onInputChange={onInputChange}
              />
              <LabeledText
                card
                label={"Notes"}
                // text={vendor && vendor.notes}
                text={"Dummy notes"}
                disabled_y={query}
                name="notes"
                onInputChange={onInputChange}
              />
            </Box>
          </Box> */}
        </>
      )}
    </Box>
  );
};

export default VendorDetails;
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