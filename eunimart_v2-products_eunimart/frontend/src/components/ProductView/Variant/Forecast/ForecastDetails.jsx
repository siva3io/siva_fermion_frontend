import React, { useEffect } from "react";
import "../ProductDetailCard/ProductDetailCard.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProductVariant } from "../../../../redux/Action/PostEditApi";

//mui
import { Box, Button, Typography, TextField } from "@mui/material";
import InventoryCharts from "../FormikForms/InventoryCharts/InventoryChartsMain";

const ForecastDetails = ({ fields, edit }) => {
  //redux
  let editResponse = useSelector(
    (state) => state.editResponse.editResponse.EditResponse
  );

  //local variables
  const [query, setQuery] = useState(false);
  const [vendor, setVendor] = useState(fields ? fields : []);
  const [prevVendor, setPrevVendor] = useState([]);
  const [finalVendor, setFinalVendor] = useState([]);
  const dispatch = useDispatch();

  const [saveEnable, setSaveEnable] = useState(false);

  useEffect(() => {
    if (
      editResponse &&
      !editResponse.status &&
      editResponse.message ===
        "Available quantity should be set to zero before changing type"
    ) {
      const tempValue = {
        ...vendor,
        detailed_type: prevVendor.detailed_type,
      };
      setVendor(tempValue);
      const temp1Value = {
        ...finalVendor,
        detailed_type: prevVendor.detailed_type,
      };
      setFinalVendor(temp1Value);
    }
  }, [editResponse]);

  useEffect(() => {
    setVendor(fields ? fields : []);
    setPrevVendor(fields ? fields : []);

    if (edit === false) {
      setQuery(true);
    }
  }, [fields]);

  const sendData = () => {
    if (fields["id"]) {
      dispatch(editProductVariant(finalVendor, fields["id"]));
    }
  };

  //render function
  return (
    <Box className="companyDetailsOrder">
      <Box className="companyDetailsOrderHeader">
        <Typography
          className="companyDetailsOrder_header"
          fontFamily={"Poppins"}
          variant="h6"
        >
          Forecast
        </Typography>
        {/* <Box>
          {query === true ? (
            <Button
              onClick={() => {
                setQuery((prev) => !prev);
                setSaveEnable(false);
              }}
              style={{ textTransform: "none" }}
            >
              Overall margin 3% ^
            </Button>
          ) : (
            <Button
              onClick={() => {
                setQuery((prev) => !prev);
                setSaveEnable(false);
              }}
              style={{ textTransform: "none" }}
            >
              Overall margin 3% ^
            </Button>
            // <Box>
            //   <Button
            //     variant="outlined"
            //     onClick={() => {
            //       setQuery((prev) => !prev);
            //       setVendor(prevVendor);
            //     }}
            //     style={{ textTransform: "none" }}
            //   >
            //     Cancel
            //   </Button>

            //   <Button
            //     disabled={!saveEnable}
            //     variant="contained"
            //     style={{ textTransform: "none", marginLeft: "10px" }}
            //     onClick={() => {
            //       if (saveEnable === true) {
            //         setQuery((prev) => !prev);
            //         setPrevVendor(vendor);
            //         sendData(vendor);
            //       }
            //     }}
            //   >
            //     Save Details
            //   </Button>
            // </Box>
          )}
        </Box> */}
      </Box>
      {/* <Box className="companyDetailsOrder_card"> */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gridGap: "15px",
          mt: 2,
        }}
      >
        <Box
          className="costField"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography color={"#00000"} fontFamily={"Poppins"} width={"30%"}>
            Annual Demand
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "40%",
            }}
          >
            {query ? (
              <Typography fontFamily={"Poppins"}>Some units</Typography>
            ) : (
              <TextField
                fontFamily={"Poppins"}
                value="Some units"
                size="small"
              />
            )}
          </Box>
        </Box>
        <Box
          className="costField"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography color={"#00000"} fontFamily={"Poppins"} width={"30%"}>
            Demand forecast
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "40%",
            }}
          >
            {query ? (
              <Typography fontFamily={"Poppins"}>Some units</Typography>
            ) : (
              <TextField
                fontFamily={"Poppins"}
                value="Some units"
                size="small"
              />
            )}
          </Box>
        </Box>
        <Box
          className="costField"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography color={"#00000"} fontFamily={"Poppins"} width={"30%"}>
            Supply Load Time
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "40%",
            }}
          >
            {query ? (
              <Typography fontFamily={"Poppins"}>Some Hrs</Typography>
            ) : (
              <TextField fontFamily={"Poppins"} value="Some Hrs" size="small" />
            )}
          </Box>
        </Box>
        <Box
          className="costField"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography color={"#00000"} fontFamily={"Poppins"} width={"30%"}>
            Holding Cost
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "40%",
            }}
          >
            {query ? (
              <Typography fontFamily={"Poppins"}>Some units</Typography>
            ) : (
              <TextField
                fontFamily={"Poppins"}
                value="Some units"
                size="small"
              />
            )}
          </Box>
        </Box>
        <Box
          className="costField"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography color={"#00000"} fontFamily={"Poppins"} width={"30%"}>
            Delivery Load Time
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "40%",
            }}
          >
            {query ? (
              <Typography fontFamily={"Poppins"}>Some Hrs</Typography>
            ) : (
              <TextField fontFamily={"Poppins"} value="Some Hrs" size="small" />
            )}
          </Box>
        </Box>
        <Box
          className="costField"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography color={"#00000"} fontFamily={"Poppins"} width={"30%"}>
            Safety Stock
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "40%",
            }}
          >
            {query ? (
              <Typography fontFamily={"Poppins"}>Some Units</Typography>
            ) : (
              <TextField
                fontFamily={"Poppins"}
                value="Some Units"
                size="small"
              />
            )}
          </Box>
        </Box>

        <Box
          className="costField"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography color={"#00000"} fontFamily={"Poppins"} width={"30%"}>
            EOQ
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "40%",
            }}
          >
            {query ? (
              <Typography fontFamily={"Poppins"}>Some Units</Typography>
            ) : (
              <TextField
                fontFamily={"Poppins"}
                value="Some Units"
                size="small"
              />
            )}
          </Box>
        </Box>
      </Box>
      <Box>
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography fontFamily={"Poppins"}>
            Price and sales Time series graph
          </Typography>
        </Box>
        <Box>
          <Typography fontFamily={"Poppins"}>
            Current Balance: $8,6980.00
          </Typography>
        </Box>
        <InventoryCharts />
      </Box>
    </Box>
  );
};

export default ForecastDetails;


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