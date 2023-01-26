import React, { useState, useEffect } from "react";
import UOMClassDetails from "../../Components/UOMClassParticularView/UOMClassDetails";
import { useLocation } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getUOMClassData } from "../../redux/Action/FetchUOMAction";
import { fetchSearchProduct } from "../../redux/Action/SearchOutput";
import { fetchProduct } from "../../redux/Action/FetchProductAction";
//mui
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Typography, IconButton, Tab } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UOMs from "../../Components/UOMClassParticularView/UOMs";

function UOMClassParticularView() {
  const location = useLocation();
  const { id } = location.state ? location.state : { id: null };

  const [value, setValue] = React.useState("1");

  //local variables
  const [edit, setEdit] = useState(false);
  const [uomClassData, setUomClassData] = useState([]);
  const [uomsData, setUomsData] = useState([]);
  const [params, setParams] = useState({ limit: 10, offset: 0 });

  //redux
  const dispatch = useDispatch();

  const uomClassApiData = useSelector(
    (state) => state.fetchSingleUOM.uomClassData.UOMClassData
  );

  const uomsApiData = useSelector((state) => state.fetchCustomSearch.UOM);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (id) {
      dispatch(getUOMClassData(id));
      dispatch(
        fetchSearchProduct(
          { uom_class_id: id, params: params },
          "uom",
          "custom"
        )
      );
    } else {
      const tempid = location.pathname.split("/")[3];

      dispatch(getUOMClassData(tempid));
      dispatch(
        fetchSearchProduct(
          { uom_class_id: tempid, params: params },
          "uom",
          "custom"
        )
      );
    }
  }, [location.state]);

  useEffect(() => {
    if (uomClassApiData) {
      setUomClassData(uomClassApiData ? uomClassApiData : []);
    }
  }, [uomClassApiData]);

  useEffect(() => {}, [uomsApiData]);

  useEffect(() => {
    if (id) {
      dispatch(
        fetchSearchProduct(
          { uom_class_id: id, params: params },
          "uom",
          "custom"
        )
      );
    } else {
      const tempid = location.pathname.split("/")[3];

      dispatch(
        fetchSearchProduct(
          { uom_class_id: tempid, params: params },
          "uom",
          "custom"
        )
      );
    }
  }, [params]);

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
      {uomClassData && uomClassData.data && (
        <Box sx={{ background: "#F9F9F9", padding: "16px" }}>
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
              <Typography fontFamily={"Poppins"} sx={{ fontSize: "33px" }}>
                {uomClassData.data.name}
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
                <Tab label="UOM Class Details" value="1" />
                <Tab label="UOMs" value="2" />
              </TabList>
            </Box>
            <Box className="bundleViewContent">
              <TabPanel value="1">
                <UOMClassDetails
                  uomClassData={uomClassData ? uomClassData : uomClassApiData}
                  edit={edit}
                />
              </TabPanel>
              <TabPanel value="2">
                {
                  uomsApiData && uomsApiData.data && uomsApiData.meta.info && (
                    <UOMs
                      products_data={uomsApiData.data}
                      info={uomsApiData.meta.info}
                      setParams={setParams}
                    />
                  )
                  // : (
                  //   <Box
                  //     sx={{
                  //       background: "#fff",
                  //       p: 2,
                  //       mt: 1,
                  //       borderRadius: "8px",
                  //     }}
                  //   >
                  //     <Box
                  //       sx={{ display: "flex", justifyContent: "space-between" }}
                  //     >
                  //       <Typography variant="h6" fontFamily={"Poppins"}>
                  //         No Records found !
                  //       </Typography>
                  //     </Box>
                  //   </Box>
                  // )
                }
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
      )}
    </ThemeProvider>
  );
}

export default UOMClassParticularView;



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