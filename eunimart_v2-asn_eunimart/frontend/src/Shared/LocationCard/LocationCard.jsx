import React, { useState } from "react";
import { Link } from "react-router-dom";
import LabeledText from "../../Shared/LabeledText/LabeledText";
import "./LocationCard.css";
import Card from "@mui/material/Card";

const LocationCards = ({
  head,
  pickUp_address,
  incharge,
  location_name,
  companyDetail,
  vendor_name,
  vendor_code,
  gst_number,
  billing_address,
  vendor_mobile,
  vendor_email,
  id,
  setShow,
}) => {
  const drpdwnList = ["Edit", "View"];
  const [showDrpDwn, setShowDrpDown] = useState(false);
  const [cardHover, setcardHover] = useState(false);
  const showDrpDwnHandler = () => {
    setShowDrpDown(showDrpDwn => !showDrpDwn);
  };
  const cardHoverHandler_true = () => {
    setcardHover(true);
  };
  const cardHoverHandler_false = () => {
    if (!showDrpDwn) setcardHover(false);
  };

  const modalHandler = () => {
    setShowDrpDown(false);
    setShow(true);
  };

  return (
    <div
      className={"locationCards"}
      onMouseEnter={cardHoverHandler_true}
      onMouseLeave={cardHoverHandler_false}
    >
      <div className="locationCard_body">
        <div className="locationCard_body_head">
          <h5 className="locationCard_header">{head}</h5>
          {cardHover && (
            <>
              <div className="locationCard_icon" onClick={showDrpDwnHandler}>
                <i className="material-icons locationCard_icon_vertDot">
                  more_vert
                </i>
              </div>
              {showDrpDwn && (
                <div className="locationCard_dropdown">
                  <p
                    className="locationCard_dropdown_option"
                    onClick={() => modalHandler()}
                  >
                    Edit
                  </p>
                  <p className="locationCard_dropdown_option">
                    <Link>View</Link>
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        {companyDetail ? (
          <>
            <LabeledText m_4 label={"Vendor Name"} text={vendor_name} />
            <LabeledText m_4 label={"Vendor Code"} text={vendor_code} />
            <LabeledText m_4 label={"GSTIN Number"} text={gst_number} />
            <LabeledText m_4 label={"Billing Address"} text={billing_address} />
            <LabeledText m_4 label={"Vendor Mobile"} text={vendor_mobile} />
            <LabeledText m_4 label={"Vendor Email"} text={vendor_email} />
          </>
        ) : (
          <>
            <LabeledText m_4 label={"Location Name"} text={location_name} />
            <LabeledText m_4 label={"Pickup Address"} text={pickUp_address} />
            <LabeledText
              m_4
              label={"Location Incharge"}
              text={incharge}
              dot_icon
            />
          </>
        )}
      </div>
    </div>
  );
};

export default LocationCards;
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
