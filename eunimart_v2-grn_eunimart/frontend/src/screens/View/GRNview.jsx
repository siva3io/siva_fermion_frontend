import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { Box, Card, CardContent, Chip, IconButton, Paper } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { fetchGrnbyId } from "../../redux/Action/FetchGrnByIdAction";
import DisplayGrnDetails from "../../components/DisplayGrnDetails";
import ProductLineItems from "../../components/ProductLineItems";
import ScrapTab from "../../components/Tabs/ScrapTab";
const GRNview= () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [value, setValue] = React.useState(0);


  const [toggleState, setToggleState] = useState(0);
  const toggleTab = (index) => {
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
    // use Selector=> Redux state data
    useEffect(() => {
        dispatch(fetchGrnbyId(id));
      }, []);
      const grnData = useSelector((state) => state.fetchGrnById.grn);
      console.log(grnData,"grnDatagrnData")
    

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
        {grnData && grnData.grn_number && (
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
                {grnData?.grn_number ? grnData?.grn_number : "--"}
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
              <Tab
             
                label="GRN "
                {...a11yProps(0)}
              />
              <Tab
              
                label="ASN"
                {...a11yProps(1)}
              />
              <Tab
             
             label="Scrap Orders"
             {...a11yProps(2)}
           />
            </Tabs>
              </Box>

              <Box className="bundleViewContent">
              <TabPanel value={value} index={0}>
              {grnData && grnData?.grn_number && <DisplayGrnDetails grnData={grnData}/>} 
      {/* <div className="asnDetails"> */}
          {/* <div className="asnDetailsHeader">
            <p className="asnDetails_header">Product Details</p>
          </div> */}
        
           {grnData && grnData?.grn_number && <ProductLineItems grnData={grnData}/>} 
              </TabPanel>

              <TabPanel value={value} index={2}>
                  <ScrapTab id={id} 
                 />            
              </TabPanel>
              </Box>
            </div>
          </Box>
        )}
      </ThemeProvider>
    </>
  );
};

export default GRNview;

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