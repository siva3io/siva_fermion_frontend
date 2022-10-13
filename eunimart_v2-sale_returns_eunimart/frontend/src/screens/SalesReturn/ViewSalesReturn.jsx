import React from "react";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import CustomerDetails from "../../components/ViewSR/CustomerDetails/CustomerDetails";
// import ShippingDetails from "../../components/ViewSR/ShippingDetails/ShippingDetails";
// import CreditDetails from "../../components/ViewSR/CreditDetails/CreditDetails";
// import ProductDetails from "../../components/ViewSR/ProductDetails/ProductDetails";
// import AdditionalInformation from "../../components/ViewSR/AdditionalInformation/AdditionalInformation";
// import PaymentDetails from "../../components/ViewSR/PaymentDetails/PaymentDetails";
// import CreditNote from "../../components/ViewSR/CreditNote/CreditNote";

//redux
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
// import {getViewSalesReturns} from "../../redux/Action/SalesReturns/ViewSalesReturns";

import { useParams } from "react-router-dom";
import { getViewSalesReturns } from "../../redux/Action/SalesReturns/ViewSalesReturns";
import HighLighter from "../../Shared/Hylighter";
import CustomerDetails from "../../components/UI/CustomerDetails";
import ProductDetails from "../../components/UI/ProductDetails";
import AdditionalInformation from "../../components/UI/AdditionalInformation";
import PaymentDetails from "../../components/UI/PaymentDetails";
import CreditNoteTab from "../../components/UI/CreditNoteTab";

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
          fontFamily: "Inter !important",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          boxShadow: "0px",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          // padding: "16px 24px",

          color: "#2E2E2E !important",
        },
        indicator: {
          // display: "none",
          color: "#2E2E2E !important",
          background: "rgba(222, 228, 253, 0.5)",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          // marginLeft: "16px",
        },
        indicator: {
          // display: "none",
          height: "50px",
          color: "#2E2E2E !important",
          background: "rgba(222, 228, 253, 0.5)",
        },
      },
    },
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: "16px",
          color: "#2E2E2E",
        },
      },
    },
  },
});

function ViewSalesReturn() {
  const [value, setValue] = React.useState(0);
  const [PayloadData, setPayloadData] = React.useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { id } = useParams();

  let salesretunsvalues = [];
  salesretunsvalues = useSelector((state) => state.ViewSR.ViewSalesRetuns);
  useEffect(() => {
    setPayloadData(salesretunsvalues);
  }, [salesretunsvalues]);
  console.log(salesretunsvalues, PayloadData, "ll");

  const dispatch = useDispatch();
  useEffect(() => dispatch(getViewSalesReturns(id)), []);
  const views = useSelector((state) => state.ViewSR.ViewSalesRetuns);

  const datePipe = (dateString) => {
    let date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Typography>{children}</Typography>}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid
          // container
          spacing={"16px"}
          backgroundColor="#F9F9F9"
          padding="24px"
          margin={0}
          boxShadow={"0px"}
        >
          <Paper elevation={2} style={{ boxShadow: "none" }}>
            <Box padding={"24px"}>
              <Typography
                componet="h4"
                variant="h6"
                color={"#121417"}
                fontWeight={600}
                fontFamily={"Poppins !important"}
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {views.sales_return_number}
                <Box
                  style={{
                    marginLeft: "auto",
                  }}
                ></Box>
              </Typography>
              <Typography>
                <HighLighter text={views.status && views.status.display_name} />
              </Typography>

              <Typography marginTop={"10px"} color="#2E2E2E">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Sales Returns Details" {...a11yProps(0)} />
                  <Tab label="Credit Note" {...a11yProps(1)} />
                  {/* <Tab label="Delivery Orders" {...a11yProps(2)} /> */}
                  {/* <Tab label="Sales Invoice" {...a11yProps(3)} /> */}
                  {/* <Tab label="Credit Note" {...a11yProps(4)} /> */}
                </Tabs>
              </Typography>
            </Box>
          </Paper>
          <TabPanel value={value} index={0}>
            <div>
              {views && (
                <CustomerDetails views={views} showCustomerDetails={true} />
              )}
              {views && <ProductDetails views={views} />}
              <AdditionalInformation views={views} />
              {views && <PaymentDetails views={views} />}
            </div>
          </TabPanel>
      
          <TabPanel value={value} index={1}>
         < CreditNoteTab id={id}/>
          </TabPanel>




          {/* <TabPanel value={value} index={1}>
            <Box>
              <Paper
                elevation={2}
                style={{ marginTop: "10px", background: "" }}
              >
                <Box padding={"24px"}>
                  <Typography
                    componet="h4"
                    variant="h6"
                    color={"#121417"}
                    fontWeight={500}
                    height={"38px"}
                    fontSize={"19px"}
                    fontFamily={"Poppins !important"}
                  >
                    Sales Order Details
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      padding: "16px 16px 16px 0px",
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
                        fontFamily={"Poppins !important"}
                      >
                        Sales Order Date*
                      </Typography>
                      <Typography
                        width={"60%"}
                        variant="body3"
                        component="p"
                        color="#5D5D5D"
                        fontSize={"14px"}
                      >
                        {views["sales_order"] &&
                        views["sales_order"]["created_date"]
                          ? datePipe(
                              views["sales_order"] &&
                                views["sales_order"]["created_date"]
                            )
                          : "--"}
                      </Typography>
                    </Box>
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
                        fontFamily={"Poppins !important"}
                      >
                        Sales Order Currency*
                      </Typography>
                      <Typography
                        width={"60%"}
                        variant="body3"
                        component="p"
                        color="#5D5D5D"
                        fontSize={"14px"}
                      >
                        {views.sales_order &&
                        views.sales_order.currency.currency_code
                          ? views.sales_order &&
                            views.sales_order.currency.currency_code
                          : "--"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      padding: "16px 16px 16px 0px",
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
                        fontFamily={"Poppins !important"}
                      >
                        Sales Order ID*
                      </Typography>
                      <Typography
                        width={"60%"}
                        variant="body3"
                        component="p"
                        color="#5D5D5D"
                        fontSize={"14px"}
                      >
                        {views.sales_order && views.sales_order.number
                          ? views.sales_order && views.sales_order.number
                          : "--"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      padding: "16px 16px 16px 0px",
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
                        fontFamily={"Poppins !important"}
                      >
                        Refecence ID
                      </Typography>
                      <Typography
                        width={"60%"}
                        variant="body3"
                        component="p"
                        color="#5D5D5D"
                        fontSize={"14px"}
                      >
                        {views.sales_order && views.sales_order.reference_number
                          ? views.sales_order &&
                            views.sales_order.reference_number
                          : "--"}
                      </Typography>
                    </Box>
                   
                  </Box>
               
                </Box>
              </Paper>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box>
              <Paper
                elevation={2}
                style={{ marginTop: "10px", background: "" }}
              >
                <Box padding={"24px"}>
                  <Typography
                    componet="h4"
                    variant="h6"
                    color={"#121417"}
                    fontWeight={500}
                    height={"38px"}
                    fontSize={"19px"}
                    fontFamily={"Poppins !important"}
                  >
                    Delivery Order Details
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      padding: "16px",
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
                        fontFamily={"Poppins !important"}
                      >
                        Source Warehouse
                      </Typography>
                      <Typography
                        width={"60%"}
                        variant="body3"
                        component="p"
                        color="#5D5D5D"
                        fontSize={"14px"}
                      >
                        LK Warehouse
                      </Typography>
                    </Box>
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
                        fontFamily={"Poppins !important"}
                      >
                        Payment Due Date
                      </Typography>
                      <Typography
                        width={"60%"}
                        variant="body3"
                        component="p"
                        color="#5D5D5D"
                        fontSize={"14px"}
                      >
                        DD/MM/YYYY
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      padding: "16px",
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
                        fontFamily={"Poppins !important"}
                      >
                        Payment Due Date
                      </Typography>
                      <Typography
                        width={"60%"}
                        variant="body3"
                        component="p"
                        color="#5D5D5D"
                        fontSize={"14px"}
                      >
                        DD/MM/YYYY
                      </Typography>
                    </Box>
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
                        fontFamily={"Poppins !important"}
                      >
                        Expected Delivery Date
                      </Typography>
                      <Typography
                        width={"60%"}
                        variant="body3"
                        component="p"
                        color="#5D5D5D"
                        fontSize={"14px"}
                      >
                        DD/MM/YYYY
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                  
                      padding: "16px",
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
                        fontFamily={"Poppins !important"}
                      >
                        DO Currency
                      </Typography>
                      <Typography
                        width={"60%"}
                        variant="body3"
                        component="p"
                        color="#5D5D5D"
                        fontSize={"14px"}
                      >
                        INR
                      </Typography>
                    </Box>
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
                        fontFamily={"Poppins !important"}
                      >
                        Payments Term
                      </Typography>
                      <Typography
                        width={"60%"}
                        variant="body3"
                        component="p"
                        color="#5D5D5D"
                        fontSize={"14px"}
                      >
                        Net 10
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                     
                      padding: "16px",
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
                        fontFamily={"Poppins !important"}
                      >
                        Price List
                      </Typography>
                      <Typography
                        width={"60%"}
                        variant="body3"
                        component="p"
                        color="#5D5D5D"
                        fontSize={"14px"}
                      >
                        Vikram Price List
                      </Typography>
                    </Box>
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
                        fontFamily={"Poppins !important"}
                      >
                        Source Document
                      </Typography>
                      <Typography
                        width={"60%"}
                        variant="body3"
                        component="p"
                        color="#5D5D5D"
                        fontSize={"14px"}
                      >
                        Vikram Price List
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
              
                      padding: "16px",
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
                        fontFamily={"Poppins !important"}
                      >
                        Delivery Order Number*
                      </Typography>
                      <Typography
                        width={"60%"}
                        variant="body3"
                        component="p"
                        color="#5D5D5D"
                        fontSize={"14px"}
                      >
                        DO-000001
                      </Typography>
                    </Box>
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
                              Source Document
                            </Typography>
                            <Typography
                              width={"60%"}
                              variant="body3"
                              component="p"
                              color="#8B8B8B"
                              fontSize={"12px"}
                            >
                              Vikram Price List
                            </Typography>
                          </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "left",
                      flexDirection: "column",
                      marginTop: "16px",
                      padding: "16px",
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
                        fontFamily={"Poppins !important"}
                      >
                        Reference ID
                      </Typography>
                      <Typography
                        width={"60%"}
                        variant="body3"
                        component="p"
                        color="#5D5D5D"
                        fontSize={"14px"}
                      >
                        Ref-DO-000002
                      </Typography>
                    </Box>
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
                              Source Document
                            </Typography>
                            <Typography
                              width={"60%"}
                              variant="body3"
                              component="p"
                              color="#8B8B8B"
                              fontSize={"12px"}
                            >
                              Vikram Price List
                            </Typography>
                          </Box>
                  </Box>
                </Box>
              </Paper>
            </Box>
    
          </TabPanel> */}
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default ViewSalesReturn;


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
