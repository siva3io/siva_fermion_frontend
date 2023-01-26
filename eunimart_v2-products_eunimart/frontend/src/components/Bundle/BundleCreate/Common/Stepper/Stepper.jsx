import "./Stepper.css";
import React from "react";
import StepperBtn from "./StepperBtn";
//mui
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";

function StepperForm({
  steps,
  getStep,
  activeStep,
  nextStep,
  backStep,
  cancelStep,
  nextButtonIsValid,
  draftStep,
  skipStep,
}) {
  return (
    <>
      <Box sx={{ width: "100%", padding: "16px" }}>
        <Stepper activeStep={activeStep}>
          {steps?.map((step, index) => {
            return (
              <Step
                key={index}
                className={
                  activeStep === index
                    ? "stepper_step stepper_step_active "
                    : "stepper_step "
                }
              >
                {step}
              </Step>
            );
          })}
        </Stepper>
        <Box>
          <Box>{getStep(activeStep)}</Box>
          <StepperBtn
            nextBtn={
              activeStep === steps.length - 1
                ? "Submit"
                : activeStep === 1 && skipStep
                ? "Skip"
                : "Next"
            }
            draftBtn={activeStep !== 0 ? "Save Draft" : ""}
            cancelBtn="Cancel"
            cancelStep={cancelStep}
            nextStep={nextStep}
            backStep={backStep}
            activeStep={activeStep}
            steps={steps}
            nextButtonIsValid={nextButtonIsValid}
            draftStep={draftStep}
          />
        </Box>
      </Box>
    </>
  );
}

export default StepperForm;

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