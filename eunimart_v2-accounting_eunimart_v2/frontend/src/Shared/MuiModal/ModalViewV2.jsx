import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import {
  IconButton,
  Input,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAllign: "center",
  //   justifyContent: "space-between",

  position: "absolute",
  width: "704px",
  height: "fit-content",
  left: "calc(50% - 704px/2)",
  top: "calc(50% - 265px/2)",
  background: "#F9F9F9",

  /* Low shadow */

  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
};

const editAddressStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAllign: "center",
  //   justifyContent: "space-between",

  position: "absolute",
  width: "90%",
  height: "90%",
  left: "calc(50% - 90%/2)",
  top: "calc(50% - 90%/2)",
  background: "#F9F9F9",

  /* Low shadow */

  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
};

const actionStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
};

const actionFooterStyle = {
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  background: "#FFFFFF",
  borderRadius: "8px",
  padding: "12px 24px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  background: "#FFFF",
  padding: "10px",
  borderRadius: "8px",
};

const modalContentStyle = {
  background: "#FFFF",
  width: "95%",
  margin: "20px",
  overflow: "auto",
  maxHeight: "300px",
  borderRadius: "4px",
  fontFamily: "Inter",
};

const editAddressmodalContentStyle = {
  background: "#FFFF",
  width: "95%",
  margin: "20px",
  overflow: "auto",
  fontFamily: "Inter",
  // maxHeight: "300px",
  borderRadius: "4px",
};

const modalStyle = {
  bottom: "200px",
};

const editAddressmodalStyle = {
  // bottom: "80px",
};

const editPhotomodalContentStyle = {
  background: "#F9F9F9",
  width: "95%",
  margin: "10px",
  overflow: "auto",
  maxHeight: "350px",
  borderRadius: "4px",
  fontFamily: "Inter",
};

export default function ModalViewV2({
  modalTitle,
  handleConfirm,
  handleModalClose,
  modalOpen,
  children,
  disableBtn,
  actionBtns,
  component,
  products,
  searchTitle,
}) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={component == "editAddress" ? editAddressmodalStyle : modalStyle}
      >
        <Fade in={modalOpen}>
          <Box sx={component == "editAddress" ? editAddressStyle : style}>
            <Box style={headerStyle}>
              <Typography sx={{ color: "black", fontWeight: "500" }}>
                {modalTitle}
              </Typography>
              <IconButton>
                <CloseIcon onClick={handleModalClose} />
              </IconButton>
            </Box>

            {products == "products" && (
              <Typography
                sx={{
                  width: "100%",
                  display: "flex",
                  py: 2,
                  px: 4,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: "500" }}>
                  {searchTitle}
                </Typography>
              </Typography>
            )}
            <Box
              style={
                component == "editAddress"
                  ? editAddressmodalContentStyle
                  : component == "editPhoto"
                  ? editPhotomodalContentStyle
                  : modalContentStyle
              }
            >
              {children}
            </Box>
            {/* Action Footer */}
            <Box sx={actionFooterStyle}>
              <Box style={actionStyle}>
                {actionBtns &&
                  actionBtns.map(btn => (
                    <Button
                      disabled={btn !== "Cancel" ? !disableBtn : false}
                      variant={btn === "Cancel" ? "outlined" : "contained"}
                      className={btn === "Cancel" ? "" : "btn_primary"}
                      onClick={
                        btn === "Cancel" ? handleModalClose : handleConfirm
                      }
                      style={{ textTransform: "none", margin: "5px" }}
                    >
                      {btn}
                    </Button>
                  ))}
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
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
