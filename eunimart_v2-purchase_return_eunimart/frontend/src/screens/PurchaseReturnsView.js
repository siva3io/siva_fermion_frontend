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
  import { loadPurchaseReturnsDataView } from "../redux/actions/action";
  import { useParams } from "react-router-dom";
  import { useLocation } from "react-router-dom";
  import PurchaseReturnsViewDataClass from "../components/PurchaseReturnsViewDataClass";
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
  // import PurchaseOrders from "../components/PurchaseOrders";
  // import SalesOrders from "../components/SalesOrders";
  import PurchaseOrders from "./tabFilters/PurchaseOrders";
  import SalesOrders from "./tabFilters/SalesOrders";
  import PurchaseReturns from "./tabFilters/PurchaseReturn";
  import DebitNoteIndex from "./tabFilters/DebitNote";
  
  function PurchaseReturnsView() {
  const creditNote = useRef(null);
  const deliveryOrders = useRef(null);
  const salesReturns = useRef(null);
  const location = useLocation();
  const { id } = location.state ? location.state :  { id: null };

  const [value, setValue] = React.useState("0");
  
  //local variables
  const [purchaseReturnsViewData, setpurchaseReturnsViewData] = useState([]);
  const { purchaseReturnsViewdata } = useSelector((state) => state.data);
  
  //redux
  
  const askSessionIdHandler = (name, ref) => {
  let details = { type: name, data: localStorage.getItem("token") };
  postCrossDomainMessage(details, ref);
  };
  const postCrossDomainMessage = (msg, ref) => {
  let win = ref.current.contentWindow;
  setTimeout(() => {
  win.postMessage(msg, "*");
  }, 2000);
  };
  const dispatch = useDispatch();
  // const purchaseReturnsViewdata = useSelector(
  //   (state) => state.data
  // );
  
  const handleChange = (event, newValue) => {
  setValue(newValue);
  };
  
  useEffect(() => {
  if (id) {
  dispatch(loadPurchaseReturnsDataView(id));
  } else {
  const tempid = location.pathname.split("/")[3];
  dispatch(loadPurchaseReturnsDataView(tempid));
  }
  }, [location.state]);
  
  useEffect(() => {
  if (purchaseReturnsViewdata) {
  setpurchaseReturnsViewData(
  purchaseReturnsViewdata ? purchaseReturnsViewdata : []
  );
  }
  }, [purchaseReturnsViewdata]);
  
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
  {console.log(purchaseReturnsViewdata, "purchaseReturnsViewdata1")}
  <ThemeProvider theme={theme}>
  {purchaseReturnsViewdata && (
  <Box sx={{ background: "#F9F9F9", minHeight: "100vh" }}>
  <Box className="bundleViewHeader" sx={{ background: "#fff", p: 2 }}>
  <Box className="bundleViewTopContent">
  <div className="viewTopContent">
  <h1>
  {purchaseReturnsViewdata &&
  purchaseReturnsViewdata.purchase_return_number}
  </h1>
  <p className="statusTag">
  {purchaseReturnsViewData &&
  purchaseReturnsViewData.status &&
  purchaseReturnsViewData.status.display_name}
  </p>
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
  aria-label="lab PR tabs example"
  >
  <Tab label="Purchase Returns Details" value="0" />
  {purchaseReturnsViewData?.source_document?.lookup_code ===
  "PURCHASE_ORDERS" && (
  <Tab label="Purchase Orders" value="1" />
  )}
  {purchaseReturnsViewData?.source_document?.lookup_code ===
  "SALES_ORDERS" && <Tab label="Sales Orders" value="1" />}
  {purchaseReturnsViewData?.source_document?.lookup_code ===
  "PURCHASE_RETURNS" && (
  <Tab label="Purchase Returns" value="1" />
  )}
  {purchaseReturnsViewData?.source_document?.lookup_code ===
  "SALES_RETURNS" && <Tab label="Sales Returns" value="1" />}
  <Tab label="Debit Note" value="2" />

  </TabList>
  </Box>
  <Box className="bundleViewContent">
  <TabPanel value="0">
  {purchaseReturnsViewData && purchaseReturnsViewData.id ? (
  <PurchaseReturnsViewDataClass
  purchaseReturnsViewData={
  purchaseReturnsViewData
  ? purchaseReturnsViewData
  : purchaseReturnsViewdata
  }
  />
  ) : null}
  </TabPanel>
  
  
  <TabPanel value="1">
  {purchaseReturnsViewData?.source_document?.lookup_code ===
  "PURCHASE_ORDERS" && (
  <PurchaseOrders
  purchaseOrdersData={
  purchaseReturnsViewData?.source_documents
  }
  />
  )}
  {purchaseReturnsViewData?.source_document?.lookup_code ===
  "SALES_ORDERS" && (
  <SalesOrders
  salesdata={purchaseReturnsViewData?.source_documents}
  />
  )}
  {purchaseReturnsViewData?.source_document?.lookup_code ===
  "PURCHASE_RETURNS" && (
  <PurchaseReturnsView
  purchaseReturnsdata={
  purchaseReturnsViewData?.source_documents
  }
  />
  )}
  </TabPanel>
  <TabPanel value="2" >
                      <DebitNoteIndex id={purchaseReturnsViewData?.id}/>

                </TabPanel>
  
  </Box>
  </TabContext>
  </Box>
  )}
  </ThemeProvider>
  </>
  );
  }
  export default PurchaseReturnsView;
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