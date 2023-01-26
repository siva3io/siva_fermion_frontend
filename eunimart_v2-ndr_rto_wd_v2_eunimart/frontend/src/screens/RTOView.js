import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Typography, IconButton, Tab } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { loadRTODataById } from '../redux/Actions/action';
import RTODetails from "./tab-data/RTODetails";

function RTOView(props) {
  const { Id } = useParams();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadRTODataById(Id));
  }, []);
  useEffect(() => {
    dispatch(loadRTODataById(Id));
    console.log(rtodata, "rtodata")
  }, [dispatch]);

  const rtodata = useSelector((state) => state.data.RTOdataId);
  console.log("sfhsgnjhm", rtodata)

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
    <ThemeProvider theme={theme}>
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
              {rtodata?.shipping_order?.reference_number}
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
              <Tab label="Shipping Details" value="2" />
              <Tab label="Non-Delivery Requests" value="3" />
              <Tab label="Return To Origin" value="1" />
              <Tab label="Weight Discrepancy" value="4" />
            </TabList>
          </Box>
          <Box className="bundleViewContent">
            <TabPanel value="1">
              <RTODetails data={rtodata} edit={true} />
            </TabPanel>
            <TabPanel value="1">

            </TabPanel>
          </Box>
        </TabContext>
      </Box>
      ):<></>
    </ThemeProvider>
  );
}

export default RTOView


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