import {
  Avatar,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Modal,
  Typography,
} from "@mui/material";
import { loadSalesInvoiceDataView } from "../../src/redux/action";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SalesInvoiceViewClass from "./../components/salesInvoiceClass";
//redux
import { useDispatch, useSelector } from "react-redux";

//mui
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, IconButton, Tab } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useEffect, useRef, useState } from "react";


function SalesInvoiceView({

}) {
  const creditNote = useRef(null);
  const deliveryOrders = useRef(null);
  const salesReturns = useRef(null);
  const location = useLocation();
  const { id } = location.state ? location.state : { id: null };

  const [value, setValue] = React.useState("0");

  //local variables
  const [salesInvoiceViewData, setsalesInvoiceViewData] = useState([]);

  //redux

  const askSessionIdHandler = (name, ref) => {
    let details = { type: name, data: localStorage.getItem('token') };
    postCrossDomainMessage(details, ref);

    // setAskSessionId(name);
    // sendSessionIdHandler(name, ref);
  };
  const postCrossDomainMessage = (msg, ref) => {
    // let win = ref.current.contentWindow;
    // setTimeout(() => {
    //   win.postMessage(msg, "*");
    // }, 2000);
  };
  const dispatch = useDispatch();
  const salesInvoiceiViewData = useSelector(
    (state) => state.data?.salesInvoiceViewdata
  );
console.log('shcfzx',salesInvoiceiViewData)
console.log('$#@#',salesInvoiceViewData)
  const handleChange = (event, newValue) => {
    setValue(newValue);

  };

  useEffect(() => {
    if (id) {
      dispatch(loadSalesInvoiceDataView(id));
    } else {
      const tempid = location.pathname.split("/")[3];
      dispatch(loadSalesInvoiceDataView(tempid));
    }
  }, [location.state]);

  useEffect(() => {
    if (salesInvoiceiViewData) {
      setsalesInvoiceViewData(salesInvoiceiViewData ? salesInvoiceiViewData : []);
    }
  }, [salesInvoiceiViewData]);

  //styling
  const theme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          scroller: {
            background: "#fff",
          },
        },
      },
      MuiTabPanel: {
        styleOverrides: {
          root: {
            padding: "0px",
          },
        },
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        {salesInvoiceiViewData && (
         
          <Box sx={{ background: "#F9F9F9", minHeight: "100vh" }}>
            <Box className="bundleViewHeader"
              sx={{ background: "#fff", p: 2, }}>
              <Box className="bundleViewTopContent">
                <div className="viewTopContent">
                  <h1>{salesInvoiceiViewData && salesInvoiceiViewData.id}</h1>
                  <p className="statusTag">{salesInvoiceiViewData && salesInvoiceiViewData.status && salesInvoiceiViewData.status.display_name}</p>
                </div>
              </Box>
            </Box>


            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Sales Invoice" value="0" />
                  <Tab label="Delivery Orders" value="1" />
                  <Tab label="Credit Note" value="2" />
                  <Tab label="Sales Returns" value="3" />
                </TabList>
              </Box>

              <Box className="bundleViewContent">
                <TabPanel value="0">
                  {salesInvoiceiViewData  && salesInvoiceiViewData.id ? <SalesInvoiceViewClass
                    salesInvoiceViewData={salesInvoiceiViewData ? salesInvoiceiViewData : salesInvoiceViewData}
                  /> : null}
                </TabPanel>

                <TabPanel value="1">
                {salesInvoiceViewData.salesInvoicedata && salesInvoiceViewData.salesInvoicedata.id &&
                    <iframe
                      src={`https://develop.eunimart.com/deliveryOrders/fromSaleInvoice/${salesInvoiceViewData.salesInvoicedata && salesInvoiceViewData.salesInvoicedata.id}`}

                      ref={deliveryOrders}
                      title="deliveryOrders"
                      id="deliveryOrders"
                      onLoad={() => {
                        askSessionIdHandler("deliveryOrders", deliveryOrders);
                      }}
                      style={{
                        width: "100%",
                        padding: "0px",
                        border: "none",
                        margin: "0px",
                        height: "92vh",
                        overflow: "auto",
                      }}
                    ></iframe>
                  }
                </TabPanel>

                <TabPanel value="2">
                  {salesInvoiceViewData.salesInvoicedata && salesInvoiceViewData.salesInvoicedata.id &&
                    <iframe
                      src={`https://develop.eunimart.com/creditNote/fromSaleInvoice/${salesInvoiceViewData.salesInvoicedata && salesInvoiceViewData.salesInvoicedata.id}`}

                      ref={creditNote}
                  id="creditNote"
                  title="creditNote"
                  onLoad={() => {
                    askSessionIdHandler("creditNote", creditNote);
                  }}
                  style={{
                    width: "100%",
                    padding: "0px",
                    border: "none",
                    margin: "0px",
                    height: "92vh",
                    overflow: "auto",
                  }}
                ></iframe>
                  }
                </TabPanel>

                <TabPanel value="3">
                {salesInvoiceViewData.salesInvoicedata && salesInvoiceViewData.salesInvoicedata.id &&
                    <iframe
                      src={`https://develop.eunimart.com/salesReturns/fromSaleInvoice/${salesInvoiceViewData.salesInvoicedata && salesInvoiceViewData.salesInvoicedata.id}`}

                      ref={salesReturns}
                      title="salesReturns"
                      id="salesReturns"
                      onLoad={() => {
                        askSessionIdHandler("salesReturns", deliveryOrders);
                      }}
                      style={{
                        width: "100%",
                        padding: "0px",
                        border: "none",
                        margin: "0px",
                        height: "92vh",
                        overflow: "auto",
                      }}
                    ></iframe>
                  }
                </TabPanel>

              </Box>

            </TabContext>

          </Box>
        )}
      </ThemeProvider>

    </>
  );
}

export default SalesInvoiceView;











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
along with this program. If not, see http://www.gnu.org/licenses/.
*/