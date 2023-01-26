import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Typography, IconButton, Tab } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { businessTypes, loadAuthData, loadFilePrefences, loadFilePrefencesCodes, loadGeneralSettings, loadInvoiceData } from "../redux/action";
import OrderDetails from "./tab-data/OrderDetails";
import VariantDetailsCard from "./tab-data/VariantDetailsCard";
import InvoiceForm from "./tab-data/InvoiceForm";
import ProductImage from "./ProductImage/ProductImage";

function Settings(props) {
  const Id = props.id;
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let dispatch = useDispatch();
  const { generalSettings } = useSelector((state) => state.data);
  const { authData } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadAuthData());
    dispatch(loadGeneralSettings());
    dispatch(loadInvoiceData());
    dispatch(loadFilePrefences());
    dispatch(loadFilePrefencesCodes());
    dispatch(businessTypes());

  }, []);
  console.log("generalSettings", generalSettings)
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
    // console.log("generalSettings data 33", generalSettings) ||
    <ThemeProvider theme={theme}>
      {generalSettings && generalSettings.data && generalSettings.data.id && (
        <>



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
              {authData && authData?.name && (

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
              )}
            </Box>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <TabList onChange={handleChange}>
                  <Tab label="General Settings" value="1" />
                  {/* <Tab label="Channel Settings" value="2" /> */}
                </TabList>
              </Box>
              <Box className="bundleViewContent">
                <TabPanel value="1">

                  <VariantDetailsCard
                    fields={generalSettings.data}
                    edit={false}
                  />

                  <InvoiceForm
                    fields={generalSettings.data}
                    edit={false}
                  />

                  <ProductImage
                    var_id={
                      1
                    }
                    resultimages={
                      []
                    }
                  />


                </TabPanel>

              </Box>
            </TabContext>
          </Box>
        </>
      )}
    </ThemeProvider>
  );
}

export default Settings




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