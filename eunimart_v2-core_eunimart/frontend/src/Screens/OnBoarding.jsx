import React, { useState, useRef, useEffect } from "react";
import full_width_Eunimart from "../Assets/Images/full_width_Eunimart.png";
import info from "../Assets/Images/info.png";
import warehouse from "../Assets/Images/onBoarding/warehouse.png";
import crossborder from "../Assets/Images/onBoarding/crossborder.png";
import retail from "../Assets/Images/onBoarding/retail.png";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import "./OnBoarding.css";
import retail2 from "../Assets/Images/onBoarding/retail2.png";
import retailBlue from "../Assets/Images/onBoarding/retailBlue.png";
import warehouseBlue from "../Assets/Images/onBoarding/warehouseBlue.png";
import accountingBlue from "../Assets/Images/onBoarding/accountingBlue.png";
import marketplacesBlue from "../Assets/Images/onBoarding/marketplacesBlue.png";
function OnBoarding() {
  const navigate = useHistory();
  const [set, setStep] = useState("");
  //onActive
  const [isActive, setIsActive] = useState([]);
  const handleClick = (value) => {
    // setIsActive(current => !current);
    if (!isActive.includes(value)) {
      setIsActive(value);
    } else {
      // const result = isActive.filter(isActive => isActive ===value);
      // setIsActive(res)
      // isActive.filter(value)
    }
  };
  //onActive
  return (
    <>
      <div className="main">
        <div className="edit-bar">
          <img
            src={full_width_Eunimart}
            style={{ width: "199px", height: "49px", top: "3px", left: "8px" }}
          />
          <img
            src={info}
            style={{
              width: "20px",
              height: "20px",
              top: "2px",
              left: "2px",
              marginRight: "18px",
            }}
          />
        </div>
        <div className="edit-bar-bottom" style={{ height: "10px" }}></div>

        <div className="header-content">
          <Box>
            <Typography
              fontFamily="Poppins"
              fontSize="30px"
              fontWeight="500"
              textAlign="center"
              lineHeight="45px"
              color="#2E2E2E"
              paddingTop={"10px"}
            >
              Choose the tiles that apply to you
            </Typography>
          </Box>
        </div>
        <div className="main_wrapper_onboard">
          <div className="main-content">
            <div className="section-1">
              {/* {console.log(isActive.includes('warehouse'),"warehouse12345")} */}
              <Card>
                <div
                  style={{
                    background: isActive.includes("warehouse")
                      ? `url(${warehouseBlue})`
                      : "",
                  }}
                  onClick={() => {
                    handleClick("warehouse");
                  }}
                  className="warehouse"
                ></div>
              </Card>
            </div>
            <div className="section-2">
              <Card>
                <div className="crossborder"></div>
              </Card>
            </div>
            <div className="section-3">
              <Card>
                <div
                  style={{
                    background: isActive.includes("retail")
                      ? `url(${retailBlue})`
                      : "",
                  }}
                  onClick={() => {
                    handleClick("retail");
                  }}
                  className="retail"
                ></div>
              </Card>
            </div>
          </div>
          <div className="main-content-1">
            <div className="section-1">
              <Card>
                <div className="shipping"></div>
              </Card>
            </div>
            <div className="section-2">
              <Card>
                <div className="manufacturer"></div>
              </Card>
            </div>
            <div className="section-3">
              <Card>
                <div
                  style={{
                    background: isActive.includes("accounting")
                      ? `url(${accountingBlue})`
                      : "",
                  }}
                  onClick={() => {
                    handleClick("accounting");
                  }}
                  className="accounting"
                ></div>
              </Card>
            </div>
          </div>
          <div className="main-content-2">
            <div className="section-1">
              <Card>
                <div className="social-ecommerce"></div>
              </Card>
            </div>
            <div className="section-2">
              <Card>
                <div
                  style={{
                    background: isActive.includes("marketplaces")
                      ? `url(${marketplacesBlue})`
                      : "",
                  }}
                  onClick={() => {
                    handleClick("marketplaces");
                  }}
                  className="marketplaces"
                ></div>
              </Card>
            </div>
            <div className="section-3">
              <Card>
                <div className="trader"></div>
              </Card>
            </div>
          </div>

          <div className="bottom-content">
            <Button
              variant="text"
              style={{ color: "#416BFF", width: "113px", height: "50px" }}
              onClick={() => {
                navigate.push("/home");
              }}
            >
              Skip
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#416BFF",
                width: "113px",
                height: "50px",
              }}

              onClick={() => {
                // navigate.push("/home");
                // setStep("conform");
                // toast.success(verifyOtpResponse.data.data.message);  
              }}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OnBoarding;