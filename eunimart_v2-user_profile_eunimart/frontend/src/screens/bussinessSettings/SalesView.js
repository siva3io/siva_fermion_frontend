import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Typography, IconButton, Tab } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import GRNTab from "./GRNTab";
import { loadAuthData, loadPurchaseReturnsData } from "../../redux/actions/action";

function SalesView(props) {
  const Id = props.id;
  const [value, setValue] = React.useState("1");
  const [params, setParams] = useState({ limit: 10, offset: 1, filters: null, sort: null });

  const { authData } = useSelector(
    (state) => state.data
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let dispatch = useDispatch();

  const { purchaseReturnsdata } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(loadPurchaseReturnsData(params));
    dispatch(loadAuthData());
  }, []);

  console.log("purchaseReturnsdata", purchaseReturnsdata)
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

  //render function
  return (

    <ThemeProvider theme={theme}>
      {/* <div className="CardDetails"> */}
      {/* <div className="pic_wrapper">
                <div className="bot_pic">
                  <img src={`logo`} className="Bot_logo2" alt="Bot_logo" />
                </div>
              
      <p className="CardHeader">Company Name</p>
      </div>
      <div className="CardContent">
        <p>hh@gmail.com</p>
        <p>Company address,pincode,city</p>
      </div> */}
      {/* </div> */}

      {purchaseReturnsdata && (
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
              {authData && (
                <>
                  <div style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>

                    <div className="bot_pic">
                      <img
                        src={authData?.profile?.link}
                        className="Bot_logo2"
                        alt="Bot_logo"
                      />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <h5 style={{ margin: 0 }} className="CardHeader">{authData?.Company?.company_name}</h5>
                      <div className="CardContent">
                        <p>{authData?.Company?.email}</p>
                        <p>{authData?.address_details?.city} , {authData?.address_details?.state?.name} , {authData?.address_details?.country?.name}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

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
                <Tab label="Organization Structure" value="1" />
                <Tab label="Access Management" value="2" />

              </TabList>
            </Box>
            <Box className="bundleViewContent">
              <TabPanel value="1">
                <GRNTab />
              </TabPanel>
              <TabPanel value="2">
                <GRNTab />
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
      )}
    </ThemeProvider>

  );


}

export default SalesView


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