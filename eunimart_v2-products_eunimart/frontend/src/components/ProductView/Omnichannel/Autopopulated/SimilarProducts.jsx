import React, { useState } from "react";
import LabeledText from "../../../../shared/OtherCommon/CommonLabel/LabeledText";
//mui
import { Box, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function PopulateSimilarProducts() {
  //local variables

  //local functions

  const sendData = () => {
    // if (fields["id"]) {
    //   dispatch(editProductVariant(finalVariant, fields["id"]));
    // }
  };

  //useEffect functions

  //render functions
  return (
    <Box
      sx={{
        background: "#fff",
        p: 2,
        mt: 1,
        borderRadius: "8px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6" fontFamily={"Poppins"}>
            Similar Products
          </Typography>
          <Typography
            variant="h6"
            fontFamily={"Poppins"}
            sx={{ ml: 2, color: "#B9B9B9" }}
          >
            Last Updated on 9/11/2021
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{ textTransform: "none" }}
          >
            Search Similar Products
          </Button>
        </Box>
      </Box>
      <Box>
        <Typography sx={{ width: "80%", mt: 1, fontFamily: "Poppins" }}>
          Here you can see AI generated research on what your competitors are
          selling within this marketplace. Please refresh to get the latest
          information. We will send you a notification once this section is
          updated.
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "150px",
            textAlign: "center",
            p: 7,
            fontFamily: "Poppins",
          }}
        >
          <Typography fontFamily={"Poppins"}>
            Your product is not listed. Once you list your product then you are
            able to find out “what your competitors are offering”.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default PopulateSimilarProducts;


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