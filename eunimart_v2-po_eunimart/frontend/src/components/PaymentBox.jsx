import React, { useState } from "react";
import LabeledText from "./LabeledTexttwo";
import "./LocationCard.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
const PaymentBox = ({
    vendorCredits,
    shippingCharges,
    subtotal,
    tax,
    toatalPay
}) => {

  return (

<Card style={{ marginTop: "10px" , width:"500px"}}>
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              mt: 2,
              overflow: "hidden",
              overflowX: "auto",
              marginLeft: "0px !important",
              width: "100% !important",
            }}
          >
            <Box
              sx={{
                border: "1.5px solid #416BFF",
                borderRadius: "10px",
                p: 2,
                marginLeft: "0px !important",
                width: "100% !important",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                
              </Box>
              <Box sx={{}}>
                <LabeledText
                  label="Sub-total"
                  text={subtotal}
                />
                <LabeledText
                  label="Tax*"
                  text={tax}
              
                />
                <LabeledText
                  label="Shipping Charges*"
                  text={shippingCharges}
                  dot_icon={true}
                />
                <LabeledText
                  label="Vendor Credits*"
                  text={vendorCredits}
                  dot_icon={true}
                />
              </Box>
              
              <h2 style={{color:"blue"}}> Total Payable: {vendorCredits+shippingCharges+subtotal+tax}</h2>
            </Box>
          </Box>
        </CardContent>
      </Card>
  );
};

export default PaymentBox;









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