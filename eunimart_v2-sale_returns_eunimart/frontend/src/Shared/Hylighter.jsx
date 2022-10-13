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
