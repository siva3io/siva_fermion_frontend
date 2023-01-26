import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


// ______________MUI____________
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Typography, IconButton, Tab } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// __________Reducers_&_Actions_____________

import { loadLocationsByIdData } from "../redux/Actions/action";

// ________Tabs________________
import RetailDetails from "./tab-data/RetailDetails";
import LocationDetails from "./tab-data/LocationDetails";
import WarehouseDetails from "./tab-data/WarehouseDetails";
import Factory_Office from "./tab-data/Factory_Office";
// ---------
import InventoryDetails from "./tab-data/InventoryDetails";
import ASN from "./tab-data/ASN";
import GRN from "./tab-data/GRN";
import DeliveryOrders from "./tab-data/DeliveryOrders";


// _______________________________________


function LocationView() {
  const { Id } = useParams();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadLocationsByIdData(Id));
  }, []);
  useEffect(() => {
    dispatch(loadLocationsByIdData(Id));
  }, [dispatch]);

  const locationdata = useSelector((state) => state.data.locationById);

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

  useEffect(() => {

    console.log("inLocation", locationdata, Id)
  }, [locationdata])


  return (
    <ThemeProvider theme={theme}>
      {locationdata && (
        <Box sx={{ background: "#F9F9F9", padding: "8px", minHeight: "100vh" }}>
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
                {locationdata?.name}
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
              <TabList onChange={handleChange}>

                {
                  locationdata?.LocationType?.display_name == "Retail" && (
                    <Tab label="Retail Details" value="1" />
                  )
                }

                {
                  locationdata?.LocationType?.display_name == "Virtual location" && (
                    <Tab label="Location Details" value="1" />
                  )
                }
                {
                  locationdata?.LocationType?.display_name == "Local warehouse" && (
                    <Tab label="Warehouse Details" value="1" />
                  )
                }
                {
                  locationdata?.LocationType?.display_name == "Office" && (
                    <Tab label="Factory/Office Details" value="1" />
                  )
                }
                <Tab label="Inventory" value="2" />
                <Tab label="Delivery Orders" value="3" />
                <Tab label="ASN" value="4" />
                <Tab label="GRN" value="5" />


              </TabList>
            </Box>
            <Box className="bundleViewContent">


              {
                locationdata?.LocationType?.display_name == "Retail" &&
                (
                  <TabPanel value="1">
                    <RetailDetails data={locationdata} edit={true} />
                  </TabPanel>
                )
              }

              {
                locationdata?.LocationType?.display_name == "Virtual location" &&
                (
                  <TabPanel value="1">
                    <LocationDetails data={locationdata} edit={true} />
                  </TabPanel>
                )
              }
              {
                locationdata?.LocationType?.display_name == "Local warehouse" && (
                  <TabPanel value="1">
                    <WarehouseDetails data={locationdata} edit={true} />
                  </TabPanel>
                )
              }
              {
                locationdata?.LocationType?.display_name == "Office" && (
                  <TabPanel value="1">
                    <Factory_Office data={locationdata} edit={true} />
                  </TabPanel>
                )
              }

              <TabPanel value="2">
                <InventoryDetails />
              </TabPanel>

              <TabPanel value="3">
                <DeliveryOrders />
              </TabPanel>

              <TabPanel value="4">
                <ASN />
              </TabPanel>

              <TabPanel value="5">
                <GRN />
              </TabPanel>


              <TabPanel value="6">
                <LocationDetails data={locationdata} edit={true} />
              </TabPanel>

              <TabPanel value="7">
                <WarehouseDetails data={locationdata} edit={true} />
              </TabPanel>



              <TabPanel value="8">
                <Factory_Office data={locationdata} edit={true} />
              </TabPanel>

            </Box>
          </TabContext>
        </Box>
      )}
    </ThemeProvider>
  );
}

export default LocationView



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