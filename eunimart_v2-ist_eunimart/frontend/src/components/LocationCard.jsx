import React, { useState } from "react";
import LabeledText from "./LabeledTexttwo";
import "./LocationCard.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
    setShowDrpDown((showDrpDwn) => !showDrpDwn);
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
        {/* <div className="locationCard_body_head">
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
                    <Link >View</Link>
                  </p>
                </div>
              )}
            </>
          )}
        </div> */}
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
      </div>
    </div>
  );
};

export default LocationCards;

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
