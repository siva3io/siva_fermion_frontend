import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function ProductCard(cardData) {
  const productCardData = cardData.cardData;
  const theme = createTheme({
    components: {
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
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="175px"
            classes={"image"}
            image={
              productCardData.image
                ? "data:image/png;base64, " + productCardData.image
                : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
            }
            alt="Product Image"
          />
          <CardContent style={{ display: "grid", justifyContent: "center" }}>
            <Typography gutterBottom variant="h5" component="div">
              {productCardData.name
                ? productCardData.name.length > 20
                  ? `${productCardData.name.substring(0, 20)}...`
                  : productCardData.name
                : "--"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {productCardData.category
                ? productCardData.category
                : " Category"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {productCardData.parent_category
                ? productCardData.parent_category
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