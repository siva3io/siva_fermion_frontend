import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const HeadingBtn = ({
  children,
  showBtn,
  marginTop,
  cardHeading,
  detailsReq,
  btnName,
  btnClick,
  fontSize,
}) => {
  return (
    <Box sx={{ mt: marginTop }}>
      <Card sx={{ margin: "10px 16px 16px 16px" }}>
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: "18px",
              display: "flex",
            }}
          >
            <span>{cardHeading}</span>
            {detailsReq && (
              <Typography className="product_required_mark">*</Typography>
            )}
          </Typography>
          <Typography>
            {showBtn && (
              <Button
                style={{
                  textTransform: "none",
                  backgroundColor: "#416BFF",
                }}
                variant="contained"
                onClick={btnClick}
              >
                {btnName}
              </Button>
            )}
          </Typography>
        </CardContent>
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          {children}
        </CardContent>
      </Card>
    </Box>
  );
};

export default HeadingBtn;

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
