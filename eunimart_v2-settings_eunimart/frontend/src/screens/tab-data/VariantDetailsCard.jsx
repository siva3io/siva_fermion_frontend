import React, { useEffect } from "react";
import "./VariantDetailsCard.css";
// import LabeledText from "../../../../shared/OtherCommon/CommonLabel/LabeledText";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { editProductVariant } from "../../../../redux/Action/PostEditApi";

//mui
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
// import MatSelect from "../../../../shared/widgets/MatSelect";

import { lazy, Suspense } from "react";
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));
import ErrorBoundary from "../ErrorBoundary";
import { Save_Sales_Order_Data } from "../../redux/action";


const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);


const VariantDetailsCard = ({ fields, edit }) => {

  console.log("VariantDetailsCard", fields)
  //redux


  //local variables
  const [query, setQuery] = useState(false);
  const [variant, setVariant] = useState(fields ? fields.organization_details ? fields.organization_details : [] : []);
  const [finalVariant, setFinalVariant] = useState({});
  const dispatch = useDispatch();
  const [saveEnable, setSaveEnable] = useState(false);

  //local function
  const onInputChange = (prop, value) => {
    console.log("onInputChange", prop, value)
    const newVariant = { ...variant };
    console.log("newVariant", newVariant)
    const newFinalVariant = { ...finalVariant };

    newVariant[prop] = value;
    newFinalVariant[prop] = value;

    setVariant(newVariant);
    setFinalVariant(newFinalVariant);
    setSaveEnable(true);
    console.log("11", variant)
  };


  const sendData = () => {
    const payload = {
      organization_details: {
        name: variant.name,
        industry: variant.industry,
        business_location: variant.business_location,
        company_address: variant.company_address,
        primary_contact: variant.primary_contact,
        tax_id: variant.tax_id,
        website: variant.website
      }
    }
    dispatch(Save_Sales_Order_Data(payload));
  };





  useEffect(() => {
    setVariant(fields ? fields.organization_details ? fields.organization_details : [] : []);
    if (edit === false) {
      setQuery(true);
    }
  }, [fields]);



  //render function
  return (
    <Box className="companyDetailsOrder">
      {variant && (
        <>
          <Box className="companyDetailsOrderHeader">
            <p className="companyDetailsOrder_header">
              Organization Details
            </p>
            <Box>
              {query === true ? (
                <Box>



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
                        sendData();
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
                    label={"Organisation Name"}
                    text={variant.name ? variant.name : "--"}
                    disabled_y={query}
                    name="name"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper></Suspense>

              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Bussiness Location"}
                    text={variant.business_location ? variant.business_location : "--"}
                    disabled_y={query}
                    name="business_location"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper></Suspense>

              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Primary Contact"}
                    text={variant.primary_contact ? variant.primary_contact : "--"}
                    disabled_y={query}
                    name="primary_contact"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper></Suspense>

              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Tax Id"}
                    text={variant.tax_id ? variant.tax_id : "--"}
                    disabled_y={query}
                    name="tax_id"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper></Suspense>


            </Box>
            <Box className="variantDetailsCard_card_right">
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Industry"}
                    text={variant.industry}
                    disabled_y={query}
                    name="industry"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper></Suspense>

              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Company Address"}
                    text={variant.company_address ? variant.company_address : "--"}
                    disabled_y={query}
                    name="company_address"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper></Suspense>

              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Company Id"}
                    text={variant.company_address ? variant.company_address : "--"}
                    disabled_y={query}
                    name="company_address"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper></Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Website"}
                    text={variant.website ? variant.website : "--"}
                    disabled_y={query}
                    name="website"
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