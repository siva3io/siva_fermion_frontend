import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { loadIstData } from "../redux/Action/istListAction";
import { getIstById } from "../redux/Action/istViewbyId";
import ISTDetails from "../components/View/ISTDetails";
import ProductDetails from "../components/View/ProductDetails";
import ShippingDetails from "../components/View/ShippingDetails";
import GRNTab from "../Tabs/GTNTab";
import ASNTab from "../Tabs/ASNTab";
import PurchaseOrdersTab from "../Tabs/PurchaseOrdersTab";
import SalesOrdersTab from "../Tabs/SalesOrdersTab";
import DeliveryOrdersTab from "../Tabs/DeliveryOrdersTab";

const IstViewDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => dispatch(getIstById(id)), []);
  const istData = useSelector(state => state.viewData?.istViewData);
  console.log(istData, "istDataqqqqq");
  const istProducts = istData.internal_transfer_lines;
  const [value, setValue] = React.useState(0);

  const [toggleState, setToggleState] = useState(0);
  const toggleTab = index => {
    setToggleState(index);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [params, setParams] = useState({ limit: 10, offset: 0 });
  useEffect(() => dispatch(loadIstData(params)));

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
  console.log(istData?.source_documents, "sourcedata");
  return (
    <>
      <ThemeProvider theme={theme}>
        {istData && istData?.ist_number && (
          <Box sx={{ background: "#F9F9F9", minHeight: "100vh" }}>
            <Box
              className="bundleViewHeader"
              sx={{
                background: "#fff",
                p: 2,
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "33px" }} fontFamily={"Poppins"}>
                  {istData?.ist_number ? istData?.ist_number : "--"}
                </Typography>
                <IconButton>
                  <MoreVertOutlinedIcon />
                </IconButton>
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
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="IST Details" {...a11yProps(0)} />
                  <Tab label="ASN" {...a11yProps(1)} />
                  <Tab label="GRN" {...a11yProps(2)} />
                  <Tab label="Purchase Orders" {...a11yProps(3)} />
                  <Tab label="Delivery Orders" {...a11yProps(4)} />
                  <Tab label="Sales Orders" {...a11yProps(5)} />
                </TabList>
              </Box>

              <Box className="bundleViewContent">
                <TabPanel value={value} index={0}>
                  {istData && <ISTDetails istData={istData} />}
                  {istData && <ProductDetails istData={istProducts} />}
                  {istData && <ShippingDetails istData={istData} />}
                </TabPanel>

                <TabPanel value={value} index={1}>
                  <ASNTab id={istData?.id} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <GRNTab id={istData?.id} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <PurchaseOrdersTab id={istData?.id} />
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <DeliveryOrdersTab id={istData?.id} />
                </TabPanel>
                <TabPanel value={value} index={5}>
                  <SalesOrdersTab id={istData?.id} />
                </TabPanel>
              </Box>
            </TabContext>
          </Box>
        )}
      </ThemeProvider>
    </>
  );
};

export default IstViewDetail;

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
