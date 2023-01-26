import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

function HighLighter({ text }) {
  const [styles, setStyles] = useState({});
  useEffect(() => {
    let finalStyle;
    switch (text) {
      case "New":
        finalStyle = {
          backgroundColor: "#FABA1E",
          color:"white",
        };
        break;

      case "Delivered":
        finalStyle = {
          backgroundColor: "#72AB3A",
          color:"white",

        };
        break;
      case "Fully Returned":
        finalStyle = {
          backgroundColor: "#A35599",
          color:"white",

        };
        break;
      case "Ready To Ship":
        finalStyle = {
          backgroundColor: "#A0FFB7",
          color:"white",

        };
        break;
      case "Shipping":
        finalStyle = {
          backgroundColor: "#416BFF",
          color:"white",

        };
        break;
      case "Cancelled":
        finalStyle = {
          backgroundColor: "#DC0320",
          color:"white",

        };
        break;
      case "Closed":
        finalStyle = {
          backgroundColor: "#FC817C",
          color:"white",

        };
        break;
      case "Draft":
        finalStyle = {
          backgroundColor: "#E5E5E5",
          color:"white",

        };
        break;
      case "PO-017455":
        finalStyle = {
          backgroundColor: "#FABA1E",
          color:"white",

        };
        break;
    }

    setStyles(finalStyle);
  }, [text]);
  return (
    <Box
      style={{
        color: "#3F3F3F",
        padding: "3px 10px",
        borderRadius: "10px",
        fontSize: "12px",
        fontWeight: 400,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        maxWidth:"max-content",
        // margin:"auto",
        ...styles,
      }}
    >
      {text}
    </Box>
  );
}

export default HighLighter;


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