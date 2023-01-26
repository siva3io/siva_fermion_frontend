import * as React from "react";
import Card from "@mui/material/Card";
import { useHistory } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function ProductCard({ cardData }) {
  const productCardData = cardData;
  const history = useHistory();
  const theme = createTheme({
    components: {
      MuiCard: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            // width: "291.36px",
            // height: "324px",
            ":hover": {
              backgroundColor: "rgba(239, 242, 254, 0.75)",
            },
          },
        },
      },
      MuiCardActionArea: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            padding: "16px",
            height: "100%",
          },
        },
      },
      // Name of the component
      MuiCardMedia: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            objectFit: "unset",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            textAlign: "center",
            // fontFamily: "Poppins",
            fontSize: "19px",
            color: "#000000",
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardActionArea
          onClick={() =>
            history.push(
              `/products/productView/${cardData.product_template_id}`
            )
          }
        >
          {/* {productCardData && console.log(productCardData?.data)} */}
           <CardMedia
            component="img"
            height="175px"
            classes={"image"}
            image={
              productCardData.image_options
                ? "data:image/png;base64, " +
                  productCardData.image_options[0]?.data
                : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
            }
            alt="Product Image"
          /> 
          <CardContent style={{ display: "grid", justifyContent: "center" }}>
            <Typography gutterBottom variant="h5" component="div">
              {productCardData.product_name
                ? productCardData.product_name.length > 20
                  ? `${productCardData.product_name.substring(0, 20)}...`
                  : productCardData.product_name
                : "--"}
            </Typography>

            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: "400",
                fontSize: "10px",
                lineHeight: "12px",
                textAlign: "center",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              {productCardData.sku_id ? productCardData.sku_id : "--"}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "500",
                fontSize: "13px",
                lineHeight: "20px",
                textAlign: "center",
                letterSpacing: "0.1px",
              }}
            >
              {productCardData.category
                ? productCardData.category.name
                  ? productCardData.category.name
                  : "Category"
                : " Category"}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "500",
                fontSize: "13px",
                lineHeight: "20px",
                textAlign: "center",
                letterSpacing: "0.1px",
              }}
            >
              {productCardData.leaf_category
                ? productCardData.leaf_category.name
                : "Sub-Category"}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </ThemeProvider>
  );
}


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