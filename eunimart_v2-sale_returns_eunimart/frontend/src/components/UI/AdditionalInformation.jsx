import React from "react";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { useEffect, useState } from "react";
import { lazy, Suspense } from "react";
import ErrorBoundary from "../../ErrorBoundary";
const RemoteViewBox = React.lazy(() => import("Remote/ViewBox"));
const RemoteLabelText = React.lazy(() => import("Remote/ViewTextField"));

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);
notes
: 
"WW"
terms_and_conditions
: 
"W"
function AdditionalInformation({ views }) {
  const [staticFields, setStaticFields] = useState([
    {
      label: "Notes",
      type: "input",
      text:  views?.additional_information?.terms_and_conditions? views?.additional_information?.terms_and_conditions : "--",
    },
    {
      label: "Terms and Conditions",
      type: "input",
      text:views?.additional_information?.notes? views?.additional_information?.notes : "--",
     
    },
    {
      label: "Notes",
      type: "attachments",
      text: views?.customer_name ? views?.customer_name : "--",
    },
  ]);
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
      MuiTypography: {
        styleOverrides: {
          // Name of the slot
          root: {
            fontFamily: "Poppins !important",
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

  return (
    <>
      <div className="locationDetailsMain">
        <div className="locationDetailForm">
          <div className="staticFormCard">
            <div className="staticFormCardTitle">Additional Information</div>
            <div className="product-staticFormCardForm">
              {staticFields.map((field) => {
                const val = field.label;
                const typ = field.type;
                return typ === "input" ? (
                  <Suspense fallback={<div>Loading... </div>}>
                    <RemoteWrapper>
                      <RemoteLabelText
                        card
                        label={field.label}
                        text={field.text ? field.text : "--"}
                        disabled_y={true}
                      />
                    </RemoteWrapper>
                  </Suspense>
                ) : typ === "attachments" ? (
                  <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    padding: "16px 16px 16px 0px",
                  }}
                >
                  <Typography
                    width={"20%"}
                    variant="body3"
                    component="p"
                    color="#2E2E2E"
                    fontFamily={"Poppins !important"}
                  >
                    Attachments
                  </Typography>
                  <Typography
                    width={"80%"}
                    variant="body3"
                    component="p"
                    color="#2E2E2E"
                    fontSize={"14px"}
                  >
                    <Typography width={"20%"}>
                      <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                          <div
                            style={{
                              fontSize: 14,
                              background: "#E8E8E8",
                              height: "120px",
                            }}
                          ></div>
          
                          <Typography
                            sx={{
                              fontSize: "15px",
                              background: "#F9F9F9",
                              height: "40px",
                            }}
                          >
                            <div style={{ display: "flex", padding: "5px" }}>
                              <PictureAsPdfIcon
                                style={{ color: "#DC0320" }}
                              ></PictureAsPdfIcon>
                              <label style={{ fontSize: "14px" }}>
                                Attachment Name.extension
                              </label>
                              <ArrowCircleDownIcon
                                style={{ color: "#416BFF" }}
                              ></ArrowCircleDownIcon>
                            </div>
                          </Typography>
                        </CardContent>
                        <CardActions></CardActions>
                      </Card>
                    </Typography>
                  </Typography>
                </Box>
                

          
                ) : (
                  <></>
                );
              })}
            </div>
          </div>
        </div>
      </div>


    </>

   
  );
}

export default AdditionalInformation;

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
