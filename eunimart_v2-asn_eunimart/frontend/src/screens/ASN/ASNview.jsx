import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { Box, Card, CardContent, Chip, IconButton, Paper } from "@mui/material";
import ViewParticularASN from "../../components/UI/ViewParticularASN/ViewParticularASN";
import { fetchAsnDataById } from "../../redux/Action/FetchAsnDataByIDAction";
import { fetchAsnData } from "../../redux/Action/FetchAsnDataAction";
import GRNTab from "../../components/UI/ViewParticularASN/Tabs/GRNTab";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SalesReturnsTab from "../../components/UI/ViewParticularASN/Tabs/SalesReturnsTab";
import ScrapTab from "../../components/UI/ViewParticularASN/Tabs/ScrapTab";
import InventoryTab from "../../components/UI/ViewParticularASN/Tabs/InventoryTab";

const ASNview = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const asnData = useSelector(state => state.fetchAsnDataById?.asn);
  const [value, setValue] = React.useState(0);

  useEffect(() => dispatch(fetchAsnDataById(id)), [id]);

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
  useEffect(() => dispatch(fetchAsnData(params, "s2", "pagination")), [params]);

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

  return (
    <>
      <ThemeProvider theme={theme}>
        {asnData && asnData.asn_number && (
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
                  {asnData?.asn_number ? asnData?.asn_number : "--"}
                </Typography>
              </Box>
            </Box>

            <div>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="ASN" {...a11yProps(0)} />

                  {/* <Tab label={asnData?.source_document_type?.display_name} {...a11yProps(1)} /> */}
                  <Tab label="GRN" {...a11yProps(1)} />
                  <Tab label="Stock Overview" {...a11yProps(2)} />
                  {/* <Tab label="Returns" {...a11yProps(2)} />
                <Tab label="Scrap" {...a11yProps(3)} /> */}
                </Tabs>
              </Box>

              <Box className="bundleViewContent">
                <TabPanel value={value} index={0}>
                  {asnData && <ViewParticularASN asnData={asnData} />}
                </TabPanel>

                {/* {asnData?.source_document_type?.display_name=="Sales Orders" && */}

                <TabPanel value={value} index={1}>
                  <GRNTab id={id} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <InventoryTab id={id} />
                </TabPanel>

                {/*  <TabPanel value={value} index={2}>
                <SalesReturnsTab />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <ScrapTab />
              </TabPanel> */}
              </Box>
            </div>
          </Box>
        )}
      </ThemeProvider>
    </>
  );
};

export default ASNview;

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
