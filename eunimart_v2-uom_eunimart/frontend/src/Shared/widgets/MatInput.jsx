import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
//mui
import { Box, TextField, Typography } from "@mui/material";

const MatInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  // useEffect(() => {
  //   if (props.type === "number") {
  //     document
  //       .querySelector("#standard-name")
  //       .addEventListener("keypress", function (evt) {
  //         if (
  //           (evt.which != 8 && evt.which != 0 && evt.which < 48) ||
  //           evt.which > 57
  //         ) {
  //           evt.preventDefault();
  //         }
  //       });
  //   }
  // });
  //styling
  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            width: "100%",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box className="input_main_wrapper">
        <Box className="inputWrapper" sx={{ display: "flex" }}>
          <Box
            className="labelWrap"
            style={{
              display: props.label === "" && "none",
              width: "35%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              htmlFor={props.label.toLowerCase().split(" ").join("_")}
              className={props.disabled_y ? "label_disabled" : "label"}
            >
              <Typography>{props.label}</Typography>

              {props.required ? (
                <Typography
                  className="product_required_mark"
                  sx={{ color: "red!important" }}
                >
                  *
                </Typography>
              ) : null}
            </Typography>
          </Box>
          <Box className="input_wrap" sx={{ width: "100%" }}>
            <TextField
              id="standard-name"
              onChange={onChange}
              helperText={focused ? errorMessage : ""}
              error={focused && errorMessage}
              {...inputProps}
              min={props && props.min}
              type={props.type ? props.type : "text"}
              autoComplete="off"
              onFocus={() =>
                inputProps.name === "confirmPassword" && setFocused(true)
              }
              onBlur={handleFocus}
              size="small"
              onInput={(e) => {
                if (props.type === "number") {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 12);
                }
                if (e.target.value.length === 0) {
                  setFocused(true);
                }
              }}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MatInput;


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