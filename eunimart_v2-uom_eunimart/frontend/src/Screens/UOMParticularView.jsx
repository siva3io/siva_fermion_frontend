import React, { useState, useEffect } from "react";
import UOMDetails from "../Components/UOMParticularView/UOMDetails";
import UOMClassDetails from "../Components/UOMParticularView/UOMClassDetails";
import { useLocation } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getUOMData } from "../redux/Action/FetchUOMAction";
//mui
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Typography, IconButton, Tab } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

function UOMParticularView() {
  const location = useLocation();
  const { id } = location.state ? location.state : { id: null };

  const [value, setValue] = React.useState(
    location.pathname.split("/")[1] === "uom" ? "1" : "2"
  );

  //local variables
  const [edit, setEdit] = useState(false);
  const [uomData, setUomData] = useState([]);

  //redux
  const dispatch = useDispatch();
  const uomApiData = useSelector(
    (state) => state.fetchSingleUOM.uomData.UOMData
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (id) {
      dispatch(getUOMData(id));
    } else {
      const tempid = location.pathname.split("/")[3];
      dispatch(getUOMData(tempid));
    }
  }, [location.state]);

  useEffect(() => {
    if (uomApiData) {
      setUomData(uomApiData ? uomApiData : []);
    }
  }, [uomApiData]);


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
      {uomData && uomData.data && (
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
                {uomData.data.name}
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
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="UOM Details" value="1" />
                <Tab label="UOM Class" value="2" />
              </TabList>
            </Box>

            <Box className="bundleViewContent">
              <TabPanel value="1">
               { uomData && uomData.data && uomData.data.id ? <UOMDetails
                  uomData={uomData ? uomData : uomApiData}
                  edit={edit}
                />:null } 
              </TabPanel>

              <TabPanel value="2">
              { uomData && uomData.data && uomData.data.id ? <UOMClassDetails
                  uomData={uomData ? uomData : uomApiData}
                  edit={edit}
                />:null } 
                
              </TabPanel>
            </Box>

          </TabContext>
        </Box>
      )}
    </ThemeProvider>
  );
}

export default UOMParticularView;



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