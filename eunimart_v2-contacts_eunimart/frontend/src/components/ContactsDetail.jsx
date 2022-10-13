import {
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { lazy, Suspense } from "react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import ErrorBoundary from "../ErrorBoundary";
import { getcontactsById } from "../redux/Action/contactsViewbyId";
import RemoteViewBox from "Remote/ViewBox";
const RemoteDynamicTable = React.lazy(() => import("Remote/DynamicTable"));
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));
const RemoteAddressCard = React.lazy(() => import("Remote/AddressCard"));
const RemoteLocationCard = React.lazy(() => import("Remote/LocationCard"));
const RemoteWrapper = ({ children }) => (
  <div
    style={{
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);
const ContactsDetail = ({ contactData1 }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const { id } = useParams();
  const { id } = location.state ? location.state : { id: null };
  useEffect(() => {
    if (id) {
      dispatch(getcontactsById(id));
    } else {
      const tempid = location.pathname.split("/")[3];
      // dispatch(getcontactsById(tempid));
      dispatch(getcontactsById(tempid));
    }
  }, [location.state]);
  // const dispatch = useDispatch();

  useEffect(() => dispatch(getcontactsById(id)), [id]);

  const contactData = useSelector((state) => state.viewData?.contactsViewData);
  const datePipe = (dateString) => {
    let date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const staticFields = [
    {
      label: "Contact Type",
      text: contactData && contactData?.contact_type?.display_name,
      type: "input",
    },
    {
      label: "Last Name",
      type: "input",
      text: contactData && contactData?.last_name
        ? contactData?.last_name
        : "--"
    },
    {
      label: "Company Name",
      type: "input",
      text: contactData && contactData?.company_name
        ? contactData?.company_name
        : "--"
    },
    {
      label: "Relationship",
      type: "input",
      text: contactData && contactData?.receipt_routing?.display_name
        ? contactData?.receipt_routing?.display_name
        : "--"
    },
    {
      label: "Email",
      type: "input",
      text: contactData && contactData?.primary_email
        ? contactData?.primary_email
        : "--"
    },
    {
      label: "Contact Number",
      type: "input",
      text: contactData && contactData?.primary_phone
        ? contactData?.primary_phone
        : "--"
    },
    {
      label: "Parent Contact",
      type: "input",
      text: contactData && contactData?.parent?.primary_phone
        ? contactData?.parent?.primary_phone
        : "--"
    },
  ];
  // );
  const staticFieldsTwo = [
    {
      label: "Name On Account",
      type: "input",
      text: contactData?.billing_details?.account_name
        ? contactData?.billing_details?.account_name
        : "--"
    },
    {
      label: "Account Number",
      type: "input",
      text: contactData?.billing_details?.account_number
        ? contactData?.billing_details?.account_number
        : "--"
    },
    {
      label: "Bank",
      type: "input",
      text: contactData?.billing_details?.bank_name
        ? contactData?.billing_details?.bank_name
        : "--"
    },
    {
      label: "IFSC Code",
      type: "input",
      text: contactData?.billing_details?.ifsc_code
        ? contactData?.billing_details?.ifsc_code
        : "--"
    },
    {
      label: "UPI",
      type: "input",
      text: contactData?.billing_details?.upi
        ? contactData?.billing_details?.upi
        : "--"
    },
  ];
  const staticFieldsThree = [
    {
      label: "Date of Birth",
      type: "input",
      text: contactData?.additional_information?.date_of_birth
        ? datePipe(contactData?.additional_information?.date_of_birth)
        : "--"
    },
    {
      label: "Emergency Contact",
      type: "input",
      text: contactData?.additional_information?.emergency_contact
        ? contactData?.additional_information?.emergency_contact
        : "--"
    },
    {
      label: "Work Information",
      type: "input",
      text: contactData?.billing_details?.bank_name
        ? contactData?.billing_details?.bank_name
        : "--"
    },
    {
      label: "Notes",
      type: "input",
      text: contactData?.billing_details?.ifsc_code
        ? contactData?.billing_details?.ifsc_code
        : "--"
    },
    {
      label: "Additional Information",
      type: "input",
      text: contactData?.billing_details?.upi
        ? contactData?.billing_details?.upi
        : "--"
    },
    {
      label: "Work Phone",
      type: "input",
      text: contactData?.additional_information?.emergency_contact
        ? contactData?.additional_information?.emergency_contact
        : "--"
    },
    {
      label: "Custom Field",
      type: "input",
      text: contactData?.billing_details?.upi
        ? contactData?.billing_details?.upi
        : "--"
    },
    {
      label: "Additional Contact",
      type: "input",
      text: contactData?.additional_information?.additional_contact
        ? contactData?.additional_information?.additional_contact
        : "--"
    },
    {
      label: "Additional Information",
      type: "input",
      text: contactData?.billing_details?.upi
        ? contactData?.billing_details?.upi
        : "--"
    },
    {
      label: "GST Doc",
      type: "input",
      text: contactData?.parent?.address_details?.gst_in_number
        ? contactData?.parent?.address_details?.gst_in_number
        : "--"
    },
    {
      label: "GST ID",
      type: "input",
      text: contactData && contactData.address_details ? contactData.address_details[0].gst_in_number : "--"
      // contactData?.address_details?.gst_in_number
      //   ? contactData?.address_details?.gst_in_number
      //   : "--"
    },
  ];


  return (
    <div className="shippingpage">
      {/* section1 */}
      <div className="locationDetailsMainSectin">
        <RemoteViewBox view_data={staticFields} header={"Contact Details"} />
        {/* {contactData && contactData.length>0 &&  */}

        {/* <div className="locationDetailsMain">
<h1>{contactData?.parent?.primary_phone}</h1>
  
 </div> */}
        {/* } */}
      </div>
      {/* section1 */}


      {/* section2*/}
      <div className="locationDetailsMain">
        <div className="locationDetailForm">
          <div className="staticFormCard">
            <div className="staticFormCardTitle">Shipping Locations</div>
            <div className="div-sec">
              <div className="product-staticFormCardFormSec ">
                <Suspense fallback={<div>Loading... </div>}>
                  <RemoteWrapper>
                    <RemoteAddressCard
                      head={"Billing address"}
                      // icon={contactData?.address_details?.address_line_1}
                      address1={contactData && contactData.address_details ? contactData.address_details[0].address_line_1 : ""}
                      address2={contactData && contactData.address_details ? contactData.address_details[0].address_line_2 : ""}
                      city={contactData && contactData.address_details ? contactData.address_details[0].city : ""}
                      state={contactData && contactData.address_details ? contactData.address_details[0].pin_code : ""}
                    // state={contactData && contactData.address_details ? contactData.address_details[0].address_line_1 : ""}
                    // country={contactData && contactData.address_details ? contactData.address_details[0].address_line_1 : ""}
                    />
                  </RemoteWrapper>
                </Suspense>
              </div>
              <div className="product-staticFormCardFormSec ">
                <Suspense fallback={<div>Loading... </div>}>
                  <RemoteWrapper>
                    <RemoteAddressCard
                      head={"Shipping Locations"}
                      // icon={contactData?.address_details?.address_line_1}
                      address1={contactData && contactData.address_details ? contactData.address_details[0].address_line_1 : ""}
                      address2={contactData && contactData.address_details ? contactData.address_details[0].address_line_2 : ""}
                      city={contactData && contactData.address_details ? contactData.address_details[0].city : ""}
                      state={contactData && contactData.address_details ? contactData.address_details[0].pin_code : ""}
                    />
                  </RemoteWrapper>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* section2*/}

      {/* section3 */}
      <div className="locationDetailsMainSectin">

        {contactData &&
          <div className="locationDetailsMain">
            <div className="locationDetailForm">
              <div className="staticFormCard">
                <div className="staticFormCardTitle">Billing Details</div>
                <div className="product-staticFormCardForm">
                  {staticFieldsTwo.map((field) => {
                    const val = field.label;
                    const typ = field.type;
                    return typ === "input" ? (
                      <Suspense fallback={<div>Loading... </div>}>
                        <RemoteWrapper>
                          <RemoteViewTextField
                            card
                            label={field.label}
                            text={field.text}
                            disabled_y={true}
                          />
                        </RemoteWrapper>
                      </Suspense>
                    ) : (
                      <></>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      {/* section3 */}

      {/* section4 */}
      <div className="locationDetailsMainSectin">

        {contactData &&
          <div className="locationDetailsMain">
            <div className="locationDetailForm">
              <div className="staticFormCard">
                <div className="staticFormCardTitle">Extra Information</div>
                <div className="product-staticFormCardForm">
                  {staticFieldsThree.map((field) => {
                    const val = field.label;
                    const text = field.text;
                    const typ = field.type;
                    return typ === "input" ? (
                      <Suspense fallback={<div>Loading... </div>}>
                        <RemoteWrapper>
                          <RemoteViewTextField
                            card
                            label={field.label}
                            text={text}
                            disabled_y={true}
                          />
                        </RemoteWrapper>
                      </Suspense>
                    ) : (
                      <></>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      {/* section4 */}

    </div>
  );
};

export default ContactsDetail;








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