import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));
import { lazy, Suspense } from "react";
import ErrorBoundary from "../../ErrorBoundary";



const RemoteWrapper = ({ children }) => (
  <div
    style={{
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);
function PaymentDetails({views}) {


  const [staticFields, setStaticFields] = useState([
    {
      label: "Sub Total",
      type: "input",
      text: views.sr_payment_details&&views.sr_payment_details.sub_total?views.sr_payment_details&&views.sr_payment_details.sub_total:"--",
    },
    {
      label: "Tax",
      type: "input",
      text:
      views.sr_payment_details&&views.sr_payment_details.tax?views.sr_payment_details&&views.sr_payment_details.tax:"--"
      ,
    },
    {
      label: "Shipping Charges",
      type: "input",
      text:
      views.sr_payment_details&&views.sr_payment_details.shipping_charges?views.sr_payment_details&&views.sr_payment_details.shipping_charges:"--"
,
    },
    {
      label: "Customer Credits",
      type: "input",
      text:
      views.sr_payment_details&&views.sr_payment_details.customer_credits?views.sr_payment_details&&views.sr_payment_details.customer_credits:"--"
      ,
    },
    {
      label: "Adjustments",
      type: "input",
      text:
      views.sr_payment_details&&views.sr_payment_details.adjustments?views.sr_payment_details&&views.sr_payment_details.adjustments:"--",
    }
  
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
            fontFamily:"Poppins !important",
           
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
    <div>
      <ThemeProvider theme={theme}>
        <Grid
          // container
          spacing={"16px"}
          margin={0}
          
        >
          <Paper elevation={2} >
          <div className="locationDetailsMain">
                  <div className="locationDetailForm">
                    <div className="staticFormCard">
                      <div className="staticFormCardTitle">Payment Details</div>
                      <div className="product-staticFormCardForm">
                        {staticFields.map((field) => {
                          const val = field.label;
                          const typ = field.type;
                          return typ === "input" ? (
                            <Suspense fallback={<div>Loading... </div>}>
                              <RemoteWrapper>
                                <RemoteViewTextField
                                  card
                                  label={field.label}
                                  text={field.text}
                                  disabled_y={true}
                                />
                              </RemoteWrapper>
                            </Suspense>
                          ) : (
                            <></>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
            <Divider />
            <Box
              sx={{
                display: "flex",
                width: "50%",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "24px",
              }}
            >
              <Typography
                width={"40%"}
                variant="body3"
                component="p"
                color="#416BFF"
                fontSize={"23px"}
              >
                Total Amount
              </Typography>
              <Typography
                width={"60%"}
                variant="body3"
                component="p"
                color="#416BFF"
                fontSize={"23px"}
                fontFamily={"Inter !important"}
              >
              {views.sr_payment_details&&views.sr_payment_details.total_amount?views.sr_payment_details&&views.sr_payment_details.total_amount:"--" }

              </Typography>
            </Box>
          </Paper>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default PaymentDetails;

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
