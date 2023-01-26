import * as React from "react";
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

export default function MatRadio({ label, fields, setRadioType,key }) {
 // console.log("radiokey",key,fields);

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(e) => setRadioType(label, e.target.value)}
      >
        {fields &&
          fields.map((fields) => {
            return (
              <FormControlLabel
                value={fields.value}
                control={<Radio />}
                label={fields.label}
              />
            );
          })}
      </RadioGroup>
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