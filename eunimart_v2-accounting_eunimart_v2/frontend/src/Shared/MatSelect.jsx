import React, { useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Typography, Autocomplete, TextField, Chip } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MatSelect(props) {
  const location = useLocation();

  let selectOptions = props.data ? props.data : [];

  // if (props.edit === true) {
  //   selectOptions = selectOptions.map((item) => {
  //     return {
  //       label: item.display_name,
  //       value: item.id,
  //     };
  //   });
  // }

  const theme = createTheme({
    components: {
      // Name of the component
      MuiFormControl: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            // overflow: "unset",
            margin: "0px",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            // fontFamily: "Poppins",
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0px",
          width: "100%",
          // margin: "8px 0px",
        }}
      >
        <Box
          style={{
            width: props.customWidth
              ? props.customWidth
              : location.pathname &&
                location.pathname.split("/")[2] === "productView"
              ? "50%"
              : "30%",
            whiteSpace: "nowrap",
            padding: "12px 16px 12px 0px",
            color: "#000000",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "black" }}>{props.label} </Typography>
          {props.required ? <p className="product_required_mark">*</p> : null}
        </Box>

        <Box style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <FormControl sx={{ width: "100%" }}>
            <Autocomplete
              multiple={props.multiple}
              size="small"
              disablePortal
              id="combo-box-demo"
              options={selectOptions}
              value={props.value}
              onChange={props.onChange}
              sx={{ width: "100%" }}
              filterSelectedOptions={props.multiple === true ? true : false}
              renderInput={(params) => (
                <TextField {...params} label={`Search ${props.label}`} />
              )}
            />
            {/* <Select
              size="small"
              onChange={(event) => {
                // props.resetProperty();
                props.setSelectValue && props.setSelectValue(props.label);
                props.setSelectKey && props.setSelectKey(event.target.value);
                props.setVale && props.setVale(props.tempCount);
                props.setFieldKey && props.setFieldKey(props.fieldKey);
                props.onChange && props.onChange(event);
              }}
              value={props.value}
              input={<OutlinedInput />}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>{`Select ${props.label}`}</em>
              </MenuItem>
              {props.data.map((option) => (
                <MenuItem
                  key={option[0]}
                  value={option[0]}
                  selected={props.value === option[0] ? true : false}
                >
                  {option[1]}
                </MenuItem>
              ))}
            </Select> */}
          </FormControl>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

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
