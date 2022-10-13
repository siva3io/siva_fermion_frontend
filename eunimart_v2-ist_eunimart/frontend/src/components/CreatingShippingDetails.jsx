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
import ErrorBoundary from "../ErrorBoundary";
import "./CreatingShippingDetails.css";
import { lazy, Suspense } from "react";
import { estimatedcost } from "../redux/Action/EstimatedCostAction";
import { useDispatch, useSelector } from "react-redux";
const RemoteInput = React.lazy(() => import("Remote/MatInput"));
const RemoteDynamicTable = React.lazy(() => import("Remote/DynamicTable"));
import RemoteViewBox_Table from "Remote/ViewBox_Table";

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const CreateShippingDetails = (step1Data, setStep1Data) => {
  const dispatch = useDispatch();
  const [radioValue, setRadioValue] = useState("Eunimart");
  const [inputValue, setInputValue] = useState();

  const handleChange = (event) => {
    console.log(event.target.value, "yyyyy");
    // radioValue=event.target.value
    setRadioValue(event.target.value);
    setInputValue(event.target.value);

    console.log(radioValue, "radioValue");
  };

  const estimatedcostdata = useSelector((state) => state.estimatedcost?.cost);

  useEffect(() => dispatch(estimatedcost()), []);

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
      key: "length",
      type: "input",
    },
    {
      label: "Package Breadth",
      key: "breadth",
      type: "input",
    },
    {
      label: "Package Weight",
      key: "Package_weight",
      type: "input",
    },
    {
      label: "Package Height",
      key: "height",
      type: "input",
    },
    {
      label: "Volumetric Dimensions",
      key: "dimensions",
      type: "input",
    },
  ]);
  const [staticFields1, setStaticFields1] = useState([
    {
      label: "Carrier Name",
      type: "input",
      required: true,
      errorMessage: "Carrier Name is required",
      key: "Carrier_Name",
    },
    {
      label: "AWB Number",
      type: "input",
      required: true,
      errorMessage: "AWB number is required",
      key: "Carrier_Name",
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
              onChange={(e) =>
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
            <div className="ist-details">
              {staticFields.map((field) => {
                const typ = field.type;
                return typ === "input" ? (
                  <Suspense fallback={<div>Loading... </div>}>
                    <RemoteWrapper>
                      <RemoteInput
                        required={field.required}
                        minLength={field.minLength ? field.minLength : ""}
                        maxLength={field.maxLength ? field.maxLength : ""}
                        errorMessage={
                          field.errorMessage ? field.errorMessage : ""
                        }
                        type={field.type}
                        label={field.label}
                        name={field.label}
                        placeholder={`Type Your ${field.label}`}
                        value={step1Data[field.key] ? step1Data[field.key] : ""}
                        onChange={(e) => {
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
            {estimatedcostdata &&
              estimatedcostdata.data &&
              (console.log("estimatedcostdata", estimatedcostdata.data),
              (
                <RemoteViewBox_Table
                  headCells={headCells}
                  table_data={estimatedcostdata?.data?.map((item) => {
                    return {
                      partner_name:
                        item &&
                        item.shipping_partner &&
                        item.shipping_partner.partner_name
                          ? item.shipping_partner.partner_name
                          : "--",
                      charges:
                        item &&
                        item.commission_preferences &&
                        item.commission_preferences.charges
                          ? item.commission_preferences.charges
                          : "--",
                      Order_delivery_time:
                        item &&
                        item.commission_preferences &&
                        item.commission_preferences.Order_delivery_time
                          ? item.commission_preferences.Order_delivery_time
                          : "--",
                      product_name:
                        item && item.inventory_id ? item.inventory_id : "--",
                    };
                  })}
                />
              ))}

            

            <div className="walletWrapper">
              <div className="walletBody">
                <h6 className="walletBody_head">Eunimart Wallet</h6>
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
            <div>
              {/* <div className="product-staticFormCardForm"> */}
              {staticFields1.map((field) => {
                const typ = field.type;
                return typ === "input" ? (
                  <Suspense fallback={<div>Loading... </div>}>
                    <RemoteWrapper>
                      <RemoteInput
                        required={field.required}
                        minLength={field.minLength ? field.minLength : ""}
                        maxLength={field.maxLength ? field.maxLength : ""}
                        errorMessage={
                          field.errorMessage ? field.errorMessage : ""
                        }
                        type={field.type}
                        label={field.label}
                        name={field.label}
                        placeholder={`Type Your ${field.label}`}
                        value={step1Data[field.key] ? step1Data[field.key] : ""}
                        onChange={(e) => {
                          onInputChange(field.key, e.target.value);
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
