import React, { useState, useEffect } from "react"; 
import { useLocation ,useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Typography, IconButton, Tab } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { loadProductOrdersDataByID } from "../redux/Actions/action"; 
import PoDeatails from "./tabData/PoDeatails";
import Purchasereturnsindex from "./tabData/PurchaseReturns";
import DebitNoteIndex from "./tabData/DebitNote";
import PurchaseInvoice from "./tabData/PurchaseInvoice";
import Asn from "./tabData/ASN";
function PurchaseOrdersView() { 
  const {Id} = useParams(); 
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let dispatch = useDispatch();
  const { purchaseOrdersDataId } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(loadProductOrdersDataByID(Id));
  }, []);

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
   // console.log("salesdata data 33", salesdata) ||
    <ThemeProvider theme={theme}>
      {purchaseOrdersDataId && (
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
                {purchaseOrdersDataId?.sales_order_number}
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
                <Tab label="PO Details" value="1" />
                <Tab label="Stock Overview" value="2" />
                <Tab label="Purchase Return" value="3" />
                <Tab label="Purchase Invoice" value="4" />
                <Tab label="Debit Note" value="5" />
                <Tab label="ASN" value="6" />
              </TabList>
            </Box>
            <Box className="bundleViewContent">
              <TabPanel value="1">
                <PoDeatails data={purchaseOrdersDataId} edit={false} /> 
              </TabPanel>
              <TabPanel value="3"> 
                <Purchasereturnsindex id={purchaseOrdersDataId?.id} />
              </TabPanel>
              <TabPanel value="4"> 
                <PurchaseInvoice id={purchaseOrdersDataId?.id} />
              </TabPanel>
              
              <TabPanel value="5">
                <DebitNoteIndex id={purchaseOrdersDataId?.id} />
              </TabPanel>
              <TabPanel value="6">
                <Asn id={purchaseOrdersDataId?.id} />
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
      )} 
    </ThemeProvider>
  );
}

export default PurchaseOrdersView









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