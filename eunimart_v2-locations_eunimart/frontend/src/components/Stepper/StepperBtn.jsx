import React from "react";
import { Link } from "react-router-dom";
import "./StepperBtn.css";
import { toast } from "react-toastify";
//mui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const handleInvalidSubmit = () => {
  toast.warning("Please Enter required fields to procees", {
    toastId: "handleInvalidSubmit",
    autoClose: 2000,
  });
};
const StepperBtn = ({
  nextBtn,
  backBtn,
  nextStep,
  cancelBtn,
  backStep,
  activeStep,
  nextButtonIsValid,
  cancelStep,
  draftStep,
  draftBtn,
}) => {
  return (
    <Box>
      <Box className="productstepperBtn">
        <Box>
          <Button
            onClick={cancelStep}
            style={{ textTransform: "none" }}
            variant="outlined"
          >
            {cancelBtn}
          </Button>
        </Box>
        <Box className="stepper_btn_grp">
          {/* <Button onClick={backStep}>{backBtn}</Button> */}
          {activeStep !== 2 ? (
            <>
              <Box>
                {activeStep !== 0 && (
                  <>
                    <Button
                      onClick={backStep}
                      variant="contained"
                      style={{
                        textTransform: "none",
                      }}
                    >
                      Back
                    </Button>
                  </>
                )}
                <Button
                  variant="contained"
                  disabled={!nextButtonIsValid && nextBtn !== "Skip"}
                  onClick={nextButtonIsValid ? nextStep : handleInvalidSubmit}
                  style={{ textTransform: "none", margin: "5px" }}
                >
                  {nextBtn}
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box>
                {activeStep !== 0 && (
                  <>
                    <Button
                      variant="contained"
                      onClick={draftStep}
                      style={{
                        textTransform: "none",
                        backgroundColor: "orange",
                        marginRight: "7px",
                      }}
                    >
                      {draftBtn}
                    </Button>
                    <Button
                      onClick={backStep}
                      variant="contained"
                      style={{
                        textTransform: "none",
                      }}
                    >
                      Back
                    </Button>
                  </>
                )}

                <Link to="/products">
                  <Button
                    variant="contained"
                    disabled={!nextButtonIsValid && nextBtn !== "Skip"}
                    onClick={nextButtonIsValid ? nextStep : handleInvalidSubmit}
                    style={{ textTransform: "none", margin: "5px" }}
                  >
                    {nextBtn}
                  </Button>
                </Link>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default StepperBtn;

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