import React, { useEffect, useState } from "react";
import "./ViewLocationDetails.css";
import TabHeader from "../../shared/CommonTabHeader/TabHeader";
import { useSelector, useDispatch } from "react-redux";
import LocationViewDetails from "../../components/LocationDetails/LocationView";
import ExternalDetails from "../../components/LocDetails/ExternalDetails";
import CommonView from "../../shared/CommonTable/CommonView";
import { fetchLocationView } from "../../redux/Action/FetchLocationViewAction";
import { useLocation } from "react-router-dom";
import ParticularLocationDetail from "../../components/LocDetails/LocDetails";
import GRNListView from "../../components/GRNListView/GRNListView";

import AllChannel from "../../components/AllChannel";
import FloatingMenu from "../../components/FloatingMenu/FloatingMenu";

import Asn from "../Asn";

import InventoryListView from "../../components/InventoryListView/InventoryListView";
import DO from "../DO";
import {
  DUMMY_DATA_INVOICE_heading,
  DUMMY_DATA_INVOICE_detail,
} from "../../Data/TableData";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DOListView from "../../components/DOListView/DOListView";
import { createTheme, Grid, Paper, ThemeProvider } from "@mui/material";
import { hover } from "@testing-library/user-event/dist/hover";
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
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
const ViewLocationDetails = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.activeTab.activeTab);
  const selectTab = (selectedTab) => {
    dispatch({ type: selectedTab });
  };

  const location = useLocation();
  const { id } = location.state ? location.state : { id: null };

  const userData = JSON.parse(localStorage.getItem("addlocation[0]"));
  const [productData, setProductData] = useState([]);

  const locationViewData = useSelector(
    (state) => state.getLocationView.location
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchLocationView(id));
    } else {
      console.log(
        "location.pathname.split('/')[3]>>>",
        location.pathname.split("/")[3]
      );
      const tempid = location.pathname.split("/")[3];
      dispatch(fetchLocationView(tempid));
    }
  }, []);

  useEffect(() => {
    console.log("locationViewData", locationViewData, productData);
    setProductData(locationViewData ? locationViewData : []);
  }, [locationViewData]);

  const tabMenu = [
    "Location Details",
    // "Inventory Details",
    "DO Line Items",
    "ASN Line Items",
    "GRN Line Items",
  ];
  const theme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontSize: " 14px",
            fontWeight: "bold",
            color: "#001661",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            width: "100%!important",
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            width: "200px!important",
          },
        },
      },
    },
  });

  return (

    <div className="viewLocationDetailMain">
      <ThemeProvider theme={theme}>
        <Grid spacing={"16px"} margin="16px 16px 16px 16px">
          <Paper elevation={2}>
            <Box padding={"24px"}>
              <div className="locationDetailHeader">
                <div className="viewLocationDetailHeaderBody">
                  <div className="storeDetailsBlock">
                    <div className="storeName">
                      {locationViewData["name"]
                        ? locationViewData["name"]
                        : "Physical Locations"}
                    </div>
                    <div className="storeName">
                      {locationViewData?.LocationType?.display_name
                        ? "(" + locationViewData?.LocationType?.display_name + ")"
                        : "(--)"}
                    </div>
                    <div className="storeAddress">
                      <div className="stateLocation">
                        {locationViewData?.address?.state?.name
                          ? locationViewData?.address?.state?.name + " , "
                          : "--"}{" "}
                      </div>
                      <div className="countryLocation">
                        {locationViewData?.address?.country?.name
                          ? locationViewData?.address?.country?.name + " ,"
                          : "--"}{" "}
                      </div>

                      <div className="pincodeLocation">
                        {locationViewData?.address?.pin_code
                          ? locationViewData?.address?.pin_code
                          : "--"}{" "}
                      </div>
                    </div>
                  </div>
                  <div className="actionBlock displaynone_currently">
                    <button className="editInfoBtn">Edit Information</button>
                  </div>
                </div>
              </div>
              <Box>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Location Details" {...a11yProps(0)} sx={{ "&:hover": { backgroundColor: "rgba(239, 242, 254, 0.75)" } }} />
                  <Tab label="Delivery Orders" {...a11yProps(2)} sx={{ "&:hover": { backgroundColor: "rgba(239, 242, 254, 0.75)" } }} />
                  <Tab label="ASN" {...a11yProps(3)} sx={{ "&:hover": { backgroundColor: "rgba(239, 242, 254, 0.75)" } }} />
                  <Tab label="GRN" {...a11yProps(4)} sx={{ "&:hover": { backgroundColor: "rgba(239, 242, 254, 0.75)" } }} />
                </Tabs>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </ThemeProvider>
      <Box sx={{ width: "100%" }}>
        <TabPanel value={value} index={0}>
          <ParticularLocationDetail editViewForm={true} user={productData} />
          <ExternalDetails editViewForm={true} user={productData} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <InventoryListView />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DOListView />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Asn />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <GRNListView />
        </TabPanel>
      </Box>
    </div>
  );
};

export default ViewLocationDetails;

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