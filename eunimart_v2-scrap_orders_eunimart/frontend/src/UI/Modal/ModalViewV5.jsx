import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAllign: "center",
  //   justifyContent: "space-between",

  position: "absolute",
  width: "1000px",
  height: "fitcontent",
  left: "calc(50% - 1000px/2)",
  top: "calc(50% - 315px/2)",
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
  height: "400px",
  borderRadius: "4px",
};

const modalStyle = {
  bottom: "200px",
  // width:"500px"
};

export default function ModalViewV5({
  modalTitle,
  handleDeleteProduct,
  handleDeleteDO,
  handleModalClose,
  handleConfirm,
  grn_id,
  modalOpen,
  children,
  actionBtns,
  createlink,
  disableBtn,
  gotolink
}) {
  console.log(grn_id);



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
        style={modalStyle}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <Box style={headerStyle}>
              <Typography variant="h7">{modalTitle}</Typography>
              <IconButton>
                <CloseIcon onClick={handleModalClose} />
              </IconButton>
            </Box>
            {/* Children elements */}
            {/* {childrens} */}
            <Box style={modalContentStyle}>{children}</Box>
            {/* Action Footer */}
            <Box sx={actionFooterStyle}>
              <Box style={actionStyle}>
                {actionBtns &&
                  actionBtns.map((btn) => (
                    <Button
                    sx={btn === "Cancel" ?{color:"#416bff",background:"white"}:{color:"#white",background:"#416bff"}}
                      disabled={!disableBtn}
                      variant={btn === "Cancel" ? "outlined" : "contained"}
                      onClick={
                        btn === "Confirm"
                          ? handleConfirm
                          :handleModalClose
                        
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