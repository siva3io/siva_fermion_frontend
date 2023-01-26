import React from "react";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
function CreditNote() {
  const theme = createTheme({
    components: {
      // Name of the component
      MuiFormControl: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            // overflow: "unset",
            width: "100%",
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            width: "100%!important",
          },
        },
      },
    },
  });
  const [viewCN, setViewCN] = React.useState(false);
  //   const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid
          // container
          spacing={"16px"}
          backgroundColor="#F9F9F9"
          padding="8px 16px"
          margin={0}
          // height="100%"
          // minHeight="623px"
        >
          <Paper elevation={2}>
            <Box padding={"24px"}>
              <Typography
                componet="h4"
                variant="h6"
                color={"#121417"}
                fontWeight={600}
              >
                <Checkbox
                  onChange={() => {
                    setViewCN(!viewCN);
                  }}
                  checked={viewCN}
                  size="small"
                />
                Create Credit Note
              </Typography>
            </Box>
            {viewCN && (
              <Box padding={"0px 24px 24px 24px"}>
                <Typography
                  componet="h4"
                  variant="h6"
                  color={"#121417"}
                  fontWeight={600}
                >
                  Credit Details
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    // alignItems: "left",
                    // flexDirection: "column",
                    marginTop: "16px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "49%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      width={"40%"}
                      variant="body3"
                      component="p"
                      color="#2E2E2E"
                    >
                      Credit Method
                    </Typography>
                    <Typography
                      width={"60%"}
                      variant="body3"
                      component="p"
                      color="#2E2E2E"
                    >
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Create credit on reciept   "
                          />
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Issue CN directly"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default CreditNote;

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