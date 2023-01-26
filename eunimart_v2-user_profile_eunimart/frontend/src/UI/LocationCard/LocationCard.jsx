import React, { useState } from "react";
import LabeledText from "../LabeledText/LabeledText";
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
const LocationCard = ({
  head,
  pickUp_address,
  location_name,
  contact,
}) => {

  return (

<Card style={{ marginTop: "10px" }}>
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
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "18px", display: "flex" }}
                >
                  {head}
                </Typography>
                {/* <Box>
                  <i className="material-icons custom " onClick={(e) => {}}>
                    edit
                  </i>
                </Box> */}
              </Box>
              <Box sx={{}}>
                <LabeledText
                  label="Location Name"
                  text={location_name}
                />
                <LabeledText
                  label="Pick Up Address"
                  text={pickUp_address}
              
                />
                <LabeledText
                  label="Location Incharge"
                  text={contact}
                  dot_icon={true}
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
  );
};

export default LocationCard;

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