import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ErrorBoundary from "../../../ErrorBoundary";
import "./CreateShippingDetails.css";
import { lazy, Suspense } from "react";
import { estimatedcost } from "../../../redux/Action/EstimatedCostAction";
import { useDispatch, useSelector } from "react-redux";
const RemoteInput = React.lazy(() => import("Remote/MatInput"));
const RemoteDynamicTable = React.lazy(() => import("Remote/DynamicTable"));
import RemoteViewBox_Table from "Remote/ViewBox_Table";
import { fetchAsnDataById } from "../../../redux/Action/FetchAsnDataByIDAction";
import { useParams } from "react-router-dom";

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const CreateShippingDetails = ({ edit, step1Data, setStep1Data }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => dispatch(fetchAsnDataById(id)), [id]);
  const asnData = useSelector(state => state.fetchAsnDataById?.asn);
  console.log(edit, "edit");
  const [radioValue, setRadioValue] = useState("Eunimart");

  useEffect(() => {
    if (asnData && edit) {
      var newMainData = [];
      console.log(
        "asnData1111",
        asnData.shipping_details?.package_details?.package_length
      );
      var newstaticFields = staticFields.map(o => {
        if (o.key == "Package_Length")
          o.value = asnData.shipping_details?.package_details?.package_length;
        if (o.key == "Package_Width")
          o.value = asnData.shipping_details?.package_details?.package_width;
        if (o.key == "Package_Height")
          o.value = asnData.shipping_details?.package_details?.package_height;
        if (o.key == "Package_Weight")
          o.value = asnData.shipping_details?.package_details?.package_weight;
        if (o.key == "Vol_Weight")
          o.value = asnData.shipping_details?.package_details?.vol_weight;
        return o;
      });
      setStaticFields(newstaticFields);

      console.log(newstaticFields, "newstaticFieldss");
      newMainData = [...newstaticFields];
      var keyValuePairMainData = {};
      newMainData.map(o => {
        if (o.key == "Schedule_Pickup_time") {
          o.value.map(p => {
            keyValuePairMainData[p.key] = p.value;
          });
        } else if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      setStep1Data(keyValuePairMainData);

      console.log(keyValuePairMainData, "Step1Dataqq");
    }
  }, [asnData]);

  const handleChange = event => {
    console.log(event.target.value, "yyyyy");
    // radioValue=event.target.value
    setRadioValue(event.target.value);
    setStep1Data({ ...step1Data, ["shipping_preference"]: event.target.value });

    console.log(radioValue, "radioValue");
  };

  const onInputChange = (prop, value) => {
    // setStep1Data({ ...step1Data, [prop]: value });
    console.log(prop, value, "valueprop");
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
    tempStaticField[index]["value"] = value;
    console.log(tempStaticField, "tempStaticField");
    setStaticFields(tempStaticField);
    setStep1Data({ ...step1Data, [prop]: value });
  };

  const onInputChange1 = (prop, value) => {
    // setStep1Data({ ...step1Data, [prop]: value });
    console.log(prop, value, "valueprop");
    let tempStaticField = [...staticFields1];
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
    tempStaticField[index]["value"] = value;
    console.log(tempStaticField, "tempStaticField");
    setStaticFields1(tempStaticField);
    setStep1Data({ ...step1Data, [prop]: value });
  };

  useEffect(() => dispatch(estimatedcost()), []);
  const estimatedcostdata = useSelector(state => state.estimatedcost?.cost);
  console.log(estimatedcostdata, "estimatedcostdata");

  const headCells = [
    {
      key: "partner_name",

      type: "text",

      label: "Shipping Partners",
    },
    {
      key: "charges",
      type: "text",

      label: "Charges",
    },
    {
      key: "Order_delivery_time",

      type: "text",

      label: "Order Deliver Time",
    },
    {
      key: "product_name",

      type: "text",

      label: "select",
    },
  ];

  const [staticFields, setStaticFields] = useState([
    {
      label: "Package Length",
      type: "input",
      required: true,
      errorMessage: "Package Length is required",
      key: "Package_Length",
    },
    {
      label: "Package Width",
      type: "input",
      required: true,
      errorMessage: "Package Width is required",
      key: "Package_Width",
      // minLength: 5,
      // maxLength: 20,
    },

    {
      label: "Package Height",
      type: "input",
      required: true,
      errorMessage: "Package Height is required",
      key: "Package_Height",
    },

    {
      label: "Vol Weight",
      type: "input",
      required: true,
      errorMessage: "Vol Weight is required",
      key: "Vol_Weight",
    },
    {
      label: "Package Weight",
      type: "input",
      required: true,
      errorMessage: "Package Weight is required",
      key: "Package_Weight",
    },
  ]);

  const [staticFields1, setStaticFields1] = useState([
    {
      label: "Carrier Name",
      type: "input",
      required: false,
      errorMessage: "Carrier Name",
      key: "Carrier_Name",
    },
    {
      label: "AWB Number",
      type: "input",
      required: false,
      errorMessage: "Carrier Name ",
      key: "AWB_Number",
    },
  ]);
  return (
    <>
      <div className="asnDetails">
        <div className="createshipping">
          <FormGroup>
            <FormControlLabel
              className="asnFirstSection_header"
              control={<Checkbox sx={{ color: "blue" }} />}
              name="Shipping_Details"
              label="Shipping Details"
              onChange={e =>
                onInputChange("Shipping_Details", e.target.checked)
              }
            />
          </FormGroup>
        </div>
        <div className="shipment_type">
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <div className="shipment_type_title">Shipment type</div>

              <FormControlLabel
                value="Eunimart"
                control={<Radio />}
                label="Eunimart"
                onChange={handleChange}
              />
              <FormControlLabel
                value="Self"
                control={<Radio />}
                label="Self"
                onChange={handleChange}
              />
            </RadioGroup>
          </FormControl>
        </div>

        {radioValue === "Eunimart" && (
          <div className="asnDetailsHeader">
            <p className="asnDetails_header">Package Details</p>
          </div>
        )}

        {radioValue === "Eunimart" && (
          <>
            <div className="product-staticFormCardForm">
              {staticFields.map(field => {
                const typ = field.type;
                return typ === "input" ? (
                  <Suspense fallback={<div>Loading... </div>}>
                    <RemoteWrapper>
                      <RemoteInput
                        // required={field.required}
                        // minLength={field.minLength ? field.minLength : ""}
                        // maxLength={field.maxLength ? field.maxLength : ""}
                        // errorMessage={
                        //   field.errorMessage ? field.errorMessage : ""
                        // }
                        type={field.type}
                        label={field.label}
                        name={field.label}
                        placeholder={`Type Your ${field.label}`}
                        value={field.value ? field.value : ""}
                        onChange={e => {
                          onInputChange(field.key, e.target.value);
                        }}
                      />
                    </RemoteWrapper>
                  </Suspense>
                ) : null;
              })}
            </div>

            {/* <div className="asnDetailsHeader">
              <p className="asnDetails_header">Estimated Cost</p>
            </div>
            <br />
            {estimatedcostdata && estimatedcostdata.data &&
      <RemoteViewBox_Table headCells={headCells} table_data={estimatedcostdata?.data?.map(item=>{
          return {
            
            partner_name: (item && item.shipping_partner && item.shipping_partner.partner_name ? item.shipping_partner.partner_name : "--"),
            charges: (item && item.commission_preferences && item.commission_preferences.charges ? item.commission_preferences.charges : "--"),
            Order_delivery_time: (item && item.commission_preferences && item.commission_preferences.Order_delivery_time ? item.commission_preferences.Order_delivery_time : "--"),
            product_name: (item && item.inventory_id ? item.inventory_id : "--"),
          
          }
        })} header={"Order Line Item"}/>
    }



            <div className="walletWrapper">
              <div className="walletBody">
                <p className="walletBody_head">Eunimart Wallet</p>
                <p className="walletBody_text">
                  With Eunimart Shipping, your shipping cost will automatically
                  be deducted from your wallet once you process the order.
                </p>
              </div>
              <div className="wallet">
                <div className="wallet_text">
                  <p className="wallet_balance">
                    Current Balance{" "}
                    <span className="wallet_balance_amt">USD ($) 2.84</span>{" "}
                  </p>
                  <p className="wallet_balance_status">Insufficient Balance</p>
                </div>
                <div className="wallet_rechgBtn_wrap">
                  <button className="wallet_rechgBtn">Recharge Now</button>
                </div>
              </div>
            </div> */}
          </>
        )}

        {radioValue === "Self" && (
          <>
            <div className="product-staticFormCardForm">
              {staticFields1.map(field => {
                const typ = field.type;
                return typ === "input" ? (
                  <Suspense fallback={<div>Loading... </div>}>
                    <RemoteWrapper>
                      <RemoteInput
                        // required={field.required}
                        // minLength={field.minLength ? field.minLength : ""}
                        // maxLength={field.maxLength ? field.maxLength : ""}
                        // errorMessage={
                        //   field.errorMessage ? field.errorMessage : ""
                        // }
                        type={field.type}
                        label={field.label}
                        name={field.label}
                        placeholder={`Type Your ${field.label}`}
                        // value={mainData[field.key] ? mainData[field.key] : ""}
                        onChange={e => {
                          onInputChange1(field.key, e.target.value);
                        }}
                      />
                    </RemoteWrapper>
                  </Suspense>
                ) : null;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CreateShippingDetails;

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
