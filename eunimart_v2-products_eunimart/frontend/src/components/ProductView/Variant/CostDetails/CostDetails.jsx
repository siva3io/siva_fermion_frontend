import React, { useEffect } from "react";
import "../ProductDetailCard/ProductDetailCard.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProductVariant } from "../../../../redux/Action/PostEditApi";

//mui
import { Box, Button, Typography, TextField } from "@mui/material";

const CostDetails = ({ fields, edit }) => {
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
          Cost Details
        </Typography>
        <Box>
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
        </Box>
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
            Selling Price
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "17%",
            }}
          >
            {query ? (
              <Typography fontFamily={"Poppins"}>
                {vendor && vendor.forecasting_options
                  ? vendor.forecasting_options?.forecast_selling_price
                  : "--"}
              </Typography>
            ) : (
              <TextField
                fontFamily={"Poppins"}
                value={
                  vendor && vendor.forecasting_options
                    ? vendor.forecasting_options?.forecast_selling_price
                    : "--"
                }
                size="small"
              />
            )}
            <Typography color={"red"} fontFamily={"Poppins"}>
              5%
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ mr: 1, textTransform: "none", fontFamily: "Poppins" }}
          >
            Forecast
          </Button>
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
            Cost of packaging
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "17%",
            }}
          >
            {query ? (
              <Typography fontFamily={"Poppins"}>
                {vendor && vendor.forecasting_options
                  ? vendor.forecasting_options?.forecast_package_cost
                  : "--"}
              </Typography>
            ) : (
              <TextField
                fontFamily={"Poppins"}
                value={
                  vendor && vendor.forecasting_options
                    ? vendor.forecasting_options?.forecast_package_cost
                    : "--"
                }
                size="small"
              />
            )}
            <Typography color={"red"} fontFamily={"Poppins"}>
              5%
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ mr: 1, textTransform: "none", fontFamily: "Poppins" }}
          >
            Forecast
          </Button>
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
            Overall Cost
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "17%",
            }}
          >
            {query ? (
              <Typography fontFamily={"Poppins"}>
                {vendor && vendor.forecasting_options
                  ? vendor.forecasting_options?.forecast_overall_cost
                  : "--"}
              </Typography>
            ) : (
              <TextField
                fontFamily={"Poppins"}
                value={
                  vendor && vendor.forecasting_options
                    ? vendor.forecasting_options?.forecast_overall_cost
                    : "--"
                }
                size="small"
              />
            )}
            <Typography color={"red"} fontFamily={"Poppins"}>
              11%
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ mr: 1, textTransform: "none", fontFamily: "Poppins" }}
          >
            Forecast
          </Button>
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
            Landing Cost
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "17%",
            }}
          >
            {query ? (
              <Typography fontFamily={"Poppins"}>
                {vendor && vendor.forecasting_options
                  ? vendor.forecasting_options?.forecast_landing_cost
                  : "--"}
              </Typography>
            ) : (
              <TextField
                fontFamily={"Poppins"}
                value={
                  vendor && vendor.forecasting_options
                    ? vendor.forecasting_options?.forecast_landing_cost
                    : "--"
                }
                size="small"
              />
            )}
            <Typography color={"red"} fontFamily={"Poppins"}>
              9%
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ mr: 1, textTransform: "none", fontFamily: "Poppins" }}
          >
            Forecast
          </Button>
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
            Cost of forwarding
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "17%",
            }}
          >
            {query ? (
              <Typography fontFamily={"Poppins"}>
                {vendor && vendor.forecasting_options
                  ? vendor.forecasting_options?.forecast_forwarding_cost
                  : "--"}
              </Typography>
            ) : (
              <TextField
                fontFamily={"Poppins"}
                value={
                  vendor && vendor.forecasting_options
                    ? vendor.forecasting_options?.forecast_forwarding_cost
                    : "--"
                }
                size="small"
              />
            )}
            <Typography color={"red"} fontFamily={"Poppins"}>
              15%
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ mr: 1, textTransform: "none", fontFamily: "Poppins" }}
          >
            Forecast
          </Button>
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
            Cost of Inventory holding
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "17%",
            }}
          >
            {query ? (
              <Typography fontFamily={"Poppins"}>
                {vendor && vendor.forecasting_options
                  ? vendor.forecasting_options?.forecast_inventory_cost
                  : "--"}
              </Typography>
            ) : (
              <TextField
                fontFamily={"Poppins"}
                value={
                  vendor && vendor.forecasting_options
                    ? vendor.forecasting_options?.forecast_inventory_cost
                    : "--"
                }
                size="small"
              />
            )}
            <Typography color={"green"} fontFamily={"Poppins"}>
              12%
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ mr: 1, textTransform: "none", fontFamily: "Poppins" }}
          >
            Forecast
          </Button>
        </Box>
      </Box>
    </Box>
    // </Box>
  );
};

export default CostDetails;


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