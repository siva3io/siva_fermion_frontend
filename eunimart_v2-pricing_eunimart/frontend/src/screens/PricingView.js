import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Typography, IconButton, Tab } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { loadPricingDataById , loadProductVariantData} from "../redux/Actions/action";

import Sales from "./tabdata/Sales";
import Purchase from "./tabdata/Purchase";
import Transfer from "./tabdata/Transfer";

function PricingView() {
  const { Id } = useParams();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPricingDataById(Id));
    
    dispatch(
      loadProductVariantData({
        limit: 10,
        offset: 1,
        filters: null,
        sort: null,
      })
    )
  }, []);

  useEffect(() => {
    dispatch(loadPricingDataById(Id));

  }, []);

  useEffect(() => {
    dispatch(loadPricingDataById(Id));
  }, [dispatch]);

  const pricingDataId = useSelector((state) => state.data.pricingDataId);
  const productVariantData = useSelector((state)=>state.data.productVariantData)

  console.log(pricingDataId, "pricingDataId")
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
      {pricingDataId && (
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
            <Box sx={{ display: "flex", flexDirection: "column", }}>
              <Typography sx={{ fontSize: "33px" }} fontFamily={"Poppins"}>
                {pricingDataId.price_list_name}
              </Typography>
              <Typography sx={{ fontSize: "15px", }} fontFamily={"Poppins"}>
                <span style={{ background: "#80BF43", padding: "5px 10px", borderRadius: "20px" }}>{pricingDataId?.price_list_id === 1 ? "Sales price list" : pricingDataId?.price_list_id === 2 ? "Purchase price list" : "Purchase price list"}</span>
              </Typography>
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
                <Tab label="Price List Details" value="1" />
              </TabList>
            </Box>
            <Box className="bundleViewContent">
              <TabPanel value="1">
                {
                  pricingDataId?.price_list_id === 1 ? (
                    <Sales data={pricingDataId} edit={true} />
                  )
                    :
                    pricingDataId?.price_list_id === 2 ?
                      (
                        <Purchase data={pricingDataId} edit={true} />
                      )
                      :
                      <Transfer data={pricingDataId} edit={true} />
                }


              </TabPanel>
            </Box>
          </TabContext>
        </Box>
      )}
    </ThemeProvider>
  );
}

export default PricingView














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