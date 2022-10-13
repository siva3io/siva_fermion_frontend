import React from "react";
import "./LabeledText.css";
//mui
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const LabeledText = (props) => {
  const onInputChange = props.onInputChange;
  return (
    <Box className="labeledTextWrapper">
      <Box className={props.card ? "labelWrap_card" : "labelWrap"}>
        <Typography
          htmlFor={props.label.toLowerCase().split(" ").join("_")}
          className={props.disabled_y ? "commonlabel_disabled" : "Commonlabel"}
        >
          {props.label}
        </Typography>
      </Box>
      {props.disabled_y ? (
        <Typography component="label">
          {props.disabled_y && (props.text === false || props.text === "")
            ? "--"
            : props.text === false
            ? ""
            : props.text}
        </Typography>
      ) : (
        <TextField
          disabled={props.disabled_y}
          size="small"
          style={{ width: "100%" }}
          value={
            props.disabled_y && props.text === false
              ? "--"
              : props.text === false
              ? ""
              : props.text
          }
          type={props.type}
          name={props.name}
          onChange={(e) => onInputChange(e.target.name, e.target.value)}
          onInput={(e) => {
            if (props.type === "number") {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 12);
            }
          }}
        ></TextField>
      )}
    </Box>
  );
};

export default LabeledText;


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