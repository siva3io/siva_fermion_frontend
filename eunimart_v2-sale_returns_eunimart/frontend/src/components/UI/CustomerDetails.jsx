import React from "react";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CircleIcon from "@mui/icons-material/Circle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useEffect, useState } from "react";
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

function CustomerDetails({ views, showCustomerDetails }) {
  console.log(views, "12e3");

  const [staticFields, setStaticFields] = useState([
    {
      label: "Customer Name",
      type: "input",
      text: views?.customer_name ? views?.customer_name : "--",
    },
    {
      label: "Link Documents",
      type: "input",
      text:
        views.sales_order && views.sales_order?.sales_order_number
          ? views.sales_order?.sales_order_number
          : "--",
    },
    {
      label: "Sales Return Number(Draft)",
      type: "input",
      text:
        views.sales_return_number && views.sales_return_number
          ? views.sales_return_number && views.sales_return_number
          : "--",
    },
    {
      label: "SR Currency",
      type: "input",
      text:
        views.currency && views.currency.currency_code
          ? views.currency && views.currency.currency_code
          : "--",
    },
    {
      label: "Reference ID No.",
      type: "input",
      text: views.reference_number ? views.reference_number : "--",
    },
    {
      label: "Expected Delivery Date",
      type: "input",
      text: views["expected_delivery_date"]
        ? views["expected_delivery_date"]
        : "--",
    },
    {
      label: "Reason",
      type: "input",
      text: views?.reason?.lookup_code ? views?.reason?.lookup_code : "--",
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
      MuiAutocomplete: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            width: "100%!important",
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
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid
          // container
          spacing={"16px"}
          margin={"16px 0px 0px 0px"}
        >
          <div className="locationDetailsMain">
            <div className="locationDetailForm">
              <div className="staticFormCard">
                <div className="staticFormCardTitle">Customer Details</div>
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

          <Paper elevation={2}>
            <Box padding={"24px"} margin={"20px"}>
              <Typography
                componet="h4"
                variant="h6"
                color={"#121417"}
                fontWeight={600}
                marginLeft={"-17px"}
              >
                Customer Address Details
              </Typography>
              <div>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid xs={6} padding={"10px"}>
                    <Card sx={{ border: 1, borderColor: "primary.main" }}>
                      <Box padding={"20px"}>
                        <Typography
                          componet="h4"
                          variant="h6"
                          color={"#121417"}
                          fontWeight={600}
                          display={"flex"}
                        >
                          Customer Pickup Address
                        
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            padding: "10px",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            width={"50%"}
                            variant="body3"
                            component="p"
                            color="#2E2E2E"
                          >
                            Location Name
                          </Typography>
                          <Typography
                            width={"50%"}
                            variant="body3"
                            component="p"
                            color="#8B8B8B"
                            fontSize={"12px"}
                          >
                            {views?.customer_pickup_address?.contact_person_name
                              ? views.customer_pickup_address?.contact_person_name
                              : "33"}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            padding: "10px",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            width={"50%"}
                            variant="body3"
                            component="p"
                            color="#2E2E2E"
                          >
                            Registered Address
                          </Typography>
                          <Typography
                            width={"50%"}
                            variant="body3"
                            component="p"
                            color="#8B8B8B"
                            fontSize={"12px"}
                          >
                            {views.customer_pickup_address &&
                            views.customer_pickup_address?.address_line_1
                              ? views.customer_pickup_address &&
                                views.customer_pickup_address?.address_line_1
                              : "--"}{" "}
                            ,<br />
                            {views.customer_pickup_address &&
                            views.customer_pickup_address?.address_line_2
                              ? views.customer_pickup_address &&
                                views.customer_pickup_address?.address_line_2
                              : "--"}{" "}
                            ,<br />
                            {views.customer_pickup_address &&
                            views.customer_pickup_address?.address_line_3
                              ? views.customer_pickup_address &&
                                views.customer_pickup_address?.address_line_3
                              : "--"}{" "}
                            ,<br />
                            {views.customer_pickup_address &&
                            views.customer_pickup_address?.city
                              ? views.customer_pickup_address &&
                                views.customer_pickup_address?.city
                              : "--"}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            padding: "10px",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            width={"50%"}
                            variant="body3"
                            component="p"
                            color="#2E2E2E"
                          >
                            Location Incharge
                          </Typography>
                          <Typography
                            width={"50%"}
                            variant="body3"
                            component="p"
                          >
                            <div style={{ display: "flex" }}>
                              <CircleIcon
                                style={{ color: "#FABA1E" }}
                              ></CircleIcon>
                              <label
                                style={{ color: "#8B8B8B", fontSize: "12px" }}
                              >
                                {views.customer_pickup_address &&
                                  views.customer_pickup_address.contact_person_name}
                              </label>
                            </div>
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid xs={6} padding={"10px"}>
                    <Card sx={{ border: 1, borderColor: "primary.main" }}>
                      <Box padding={"20px"}>
                        <Typography
                          componet="h4"
                          variant="h6"
                          color={"#121417"}
                          fontWeight={600}
                          display={"flex"}
                        >
                          Customer Billing Address
                          <div
                            style={{
                              borderRadius: "15px",
                              background: "#DEE4FD",
                              padding: "3px",
                              width: "30px",
                              height: "32px",
                              marginLeft: "auto",
                            }}
                          >
                            {/* <ModeEditIcon></ModeEditIcon> */}
                          </div>
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            padding: "10px",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            width={"50%"}
                            variant="body3"
                            component="p"
                            color="#2E2E2E"
                          >
                            Location Name
                          </Typography>
                          <Typography
                            width={"50%"}
                            variant="body3"
                            component="p"
                            color="#8B8B8B"
                            fontSize={"12px"}
                          >
                            {views.customer_billing_address &&
                            views.customer_billing_address.contact_person_name
                              ? views.customer_billing_address &&
                                views.customer_billing_address.contact_person_name
                              : "--"}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            padding: "10px",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            width={"50%"}
                            variant="body3"
                            component="p"
                            color="#2E2E2E"
                          >
                            Registered Address
                          </Typography>
                          <Typography
                            width={"50%"}
                            variant="body3"
                            component="p"
                            color="#8B8B8B"
                            fontSize={"12px"}
                          >
                            {views.customer_billing_address &&
                            views.customer_billing_address?.address_line_1
                              ? views.customer_billing_address &&
                                views.customer_billing_address?.address_line_1
                              : "--"}{" "}
                            ,<br />
                            {views.customer_billing_address &&
                            views.customer_billing_address?.address_line_2
                              ? views.customer_billing_address &&
                                views.customer_billing_address?.address_line_2
                              : "--"}{" "}
                            ,<br />
                            {views.customer_billing_address &&
                            views.customer_billing_address?.address_line_3
                              ? views.customer_billing_address &&
                                views.customer_billing_address?.address_line_3
                              : "--"}{" "}
                            ,<br />
                          
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            padding: "10px",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            width={"50%"}
                            variant="body3"
                            component="p"
                            color="#2E2E2E"
                          >
                            Location Incharge
                          </Typography>
                          <Typography
                            width={"50%"}
                            variant="body3"
                            component="p"
                          >
                            <div style={{ display: "flex" }}>
                              <CircleIcon
                                style={{ color: "#FABA1E" }}
                              ></CircleIcon>
                              <label
                                style={{ color: "#8B8B8B", fontSize: "12px" }}
                              >
                                {views.customer_billing_address &&
                                  views.customer_billing_address.contact_person_name}
                              </label>
                            </div>
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
              </div>
            </Box>
          </Paper>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default CustomerDetails;

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