import React from "react";
//mui
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
} from "@mui/material";

export default function MatRadio({
  label,
  fields,
  setRadioType,
  defaultVal,
  edit,
}) {
  // const theme = createTheme({
  //   components: {
  //     MuiTextField: {
  //       styleOverrides: {
  //         root: {
  //           width: "100%",
  //         },
  //       },
  //     },
  //   },
  // });

  // return (
  //   <ThemeProvider theme={theme}>
  //     <Box
  //       className="product-checkboxFieldMain"
  //       sx={{ display: "flex", alignItems: "center" }}
  //     >
  //       <Typography
  //         className="radioLabelWrap"
  //         sx={{ display: "flex", alignItems: "baseline", width: "26%" }}
  //       >
  //         <Typography>{fields.label}</Typography>
  //         {fields.required ? (
  //           <Typography className="product_required_mark" sx={{ color: "red" }}>
  //             *
  //           </Typography>
  //         ) : null}
  //       </Typography>
  //       <Box className="product-checkboxFieldSub">
  //         {fields.sub && (
  //           <FormControl>
  //             <RadioGroup
  //               row
  //               aria-labelledby="demo-row-radio-buttons-group-label"
  //               name="row-radio-buttons-group"
  //               onChange={(e) => setRadioType(label, e.target.value)}
  //             >
  //               {fields.sub.map((fields) => {
  //                 return (
  //                   <FormControlLabel
  //                     value={fields.value}
  //                     control={<Radio />}
  //                     label={fields.label}
  //                   />
  //                 );
  //               })}
  //             </RadioGroup>
  //           </FormControl>
  //         )}
  //       </Box>
  //     </Box>
  //   </ThemeProvider>
  // );

  return (
    <FormControl>
      <>
        {edit ? (
          <>
            {defaultVal && fields && (
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={e => setRadioType(label, e.target.value)}
                defaultValue={defaultVal}
              >
                {fields.map(fields => {
                  return (
                    <FormControlLabel
                      value={fields.value}
                      control={<Radio />}
                      label={fields.label}
                    />
                  );
                })}
              </RadioGroup>
            )}
          </>
        ) : (
          <>
            {fields && (
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={e => setRadioType(label, e.target.value)}
                defaultValue={defaultVal}
              >
                {fields.map(fields => {
                  return (
                    <FormControlLabel
                      value={fields.value}
                      control={<Radio />}
                      label={fields.label}
                    />
                  );
                })}
              </RadioGroup>
            )}
          </>
        )}
      </>
    </FormControl>
  );
}

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
