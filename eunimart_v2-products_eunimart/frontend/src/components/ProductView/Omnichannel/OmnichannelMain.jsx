import React, { useEffect, useState, useRef } from "react";
import { ProductDetailCard } from "../../common/ProductDetailCard/ProductDetailCard";
import KeywordGenerator from "../../common/KeywordGenerator/KeywordGenerator";
import SimilarProduct from "./SimilarProduct/SimilarProduct";
import SimilarSeller from "./SimilarSeller/SimilarSeller";
import { useSelector, useDispatch } from "react-redux";


//mui
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Autocomplete,
  Box,
  Tab,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ProductDetails from "./Autopopulated/ProductDetails";
import CategoryDetails from "./Autopopulated/CategoryDetails";
import DimensionDetails from "./Autopopulated/DimensionDetails";
import OtherDetails from "./Autopopulated/Otherdetails";
import PricingDetails from "./Autopopulated/PricingDetails";
import PopulateSimilarSeller from "./Autopopulated/SimilarSeller";
import PopulateSimilarProducts from "./Autopopulated/SimilarProducts";
import PackagingDetails from "./Autopopulated/PackagingDetails";
import MarketplaceDetails from "./MarketplaceDetails";
import { fetchAvailableMarketplace } from "../../../redux/Action/FetchAvailableMarketplace";

export default function OmnichannelMain({ fields, updateFields }) {
  console.log("fieldsfields",fields,updateFields)
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("1");
  const [extCategory, setextCategory] = React.useState("");
  const [cart, setCart] = useState([]);
  const [products, setproducts] = useState([]);

  useEffect(() => dispatch(fetchAvailableMarketplace(fields?.leaf_category_id)), [fields?.leaf_category_id]);


  const [enableTemplateMarketplaces, setEnableTemplateMarketplaces] =
    useState(false);

  const products1 = useSelector(
    (state) => state.getavailableMarketplaces.available
  );
  console.log("Inside Products21 >>>", products);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const catalog = useRef(null);

  //styling
  const theme = createTheme({
    components: {
      // Name of the component
      MuiTabPanel: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            padding: "0px",
          },
        },
      },
    },
  });
  const [omniFinalData, setOmniFinalData] = useState({
    images: [],
  });

  //publish data
  useEffect(() => { }, [omniFinalData]);
  useEffect(() => {
    setextCategory(fields?.leaf_category?.external_id)
   }, [fields]);



   useEffect(() => { 
    setproducts(products1)
   }, [products1]);


   const handleRefreshMp = () => {
   //  setproducts(products1)
   //  document.getElementById('https://dev-api.eunimart.com/webapp/catalogues?ext_category_id=120&ext_marketplace_id=16').contentWindow.location.reload();
   //  window.frames['frameNameOrIndex'].location.reload();
     
   }


  //render function
  return (



    <ThemeProvider theme={theme}>
      <Box sx={{ m: 1 }}>

        <TabContext value={value}>
          <Box sx={{ background: "#fff", borderRadius: "8px" }}>
            {enableTemplateMarketplaces ? (
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Myntra" value="1" />
                <Tab label="Tata Cliq" value="2" />
                <Tab label="Amazon" value="3" disabled />
                <Tab label="Flipkart" value="4" disabled />
                <Tab label="+ Add Marketplace" value="5" />
              </TabList>
            ) : (
              <>
              <div className="omnichannel-main-tab">
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                {products &&
                  products.length > 0 &&
                  products.map((product) => {
                    return <Tab label={product?.name} value={product?.id} />;
                  })}


                {/*  <Tab label="+ Add Marketplace" value="3" /> */}
              </TabList>
              
              
              <Button variant="outlined" onClick={handleRefreshMp}>Refresh catalogue AI Values</Button>
              </div>
              </>
            )}
          </Box>

          {products &&
            products.length > 0 &&
            products.map((product) => {
              return <TabPanel value={product.id}>
                <Box>

                  <iframe
                    src={`https://dev-api.eunimart.com/webapp/catalogues?ext_category_id=${extCategory}&ext_channel_id=${product?.external_id}&variant_id=${fields?.id}&user_data=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiVXNlcm5hbWUiOiJhZG1pbiIsImV4cCI6MTY4NzUyNTMwMywiZmlyc3RfbmFtZSI6ImFkbWluIiwibGFzdF9uYW1lIjoiYWRtaW4ifQ.9wnUeOaVvnUJzG3Mpw6ttP7uBqu3_ehhMmqQbvMsl38`}
                
                    ref={catalog}
                    id="catalog"
                    title="catalog"
                    style={{
                      width: "100%",
                      padding: "0px",
                      border: "none",
                      margin: "0px",

                      height: "92vh",
                      overflow: "auto",
                    }}
                  ></iframe>
                </Box>
              </TabPanel>;
            })}






        </TabContext>
      </Box>
    </ThemeProvider>
  );
}


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