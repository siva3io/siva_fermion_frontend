import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Typography, IconButton, Tab } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import { loadDebitNoteDataById } from "../redux/Actions/getDebitNoteById";
import DebitNoteDetails from "./tab-data/DebitNoteDetails";
import { loadDebitNoteDataById } from "../redux/getDebitNoteById";
import PurchaseOrders from "./tab-data/PurchaseOrders";
import PurchaseInvoice from "./tab-data/PurchaseInvoice";

function DebitNoteView(props) {
  const { Id } = useParams();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDebitNoteDataById(Id));
  }, []);
  useEffect(() => {
    dispatch(loadDebitNoteDataById(Id));
    console.log(debitnotedata, "debitnotedata");
  }, [dispatch]);

  const debitnotedata = useSelector((state) => state.dataById.debitnotedataId);
  console.log("sfhsgnjhm", debitnotedata);

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
              {debitnotedata.debit_note_number}
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
              <Tab label="Debit Note details" value="1" />
              {/* <Tab label="ASN" value="2" />
              <Tab label="GRN" value="3" />
              <Tab label="IST" value="4" />
              <Tab label="Scrap Orders" value="5" />
              <Tab label="Delivery Orders" value="6" />
              <Tab label="Purchase Returns" value="7" />
              <Tab label="Sales Returns" value="8" />
              <Tab label="Purchase Orders" value="9" />
              <Tab label="Sales Orders" value="10" /> */}
              <Tab label="Purchase Invoice" value="11" />
            </TabList>
          </Box>
          <Box className="bundleViewContent">
            <TabPanel value="1">
              <DebitNoteDetails data={debitnotedata} edit={true} />
            </TabPanel>
            <TabPanel value="11">
              <PurchaseInvoice id={debitnotedata?.id} />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
      :<></>
      {/* } */}
    </ThemeProvider>
  );
}

export default DebitNoteView;

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
