import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { height } from "@mui/system";

export default function ModalViewV2({
  modalTitle,
  handleDeleteProduct,
  handleModalClose,
  modalOpen,
  children,
  actionBtns,
  modalContentStyleHeight,
  modalContentStyleWidth,
  modalContentStylePadding,
  mainWidth,
  styleHeight,
}) {
  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAllign: "center",
    //   justifyContent: "space-between",

    position: "absolute",
    width: mainWidth ? mainWidth : "704px",
    height: "fit-content",
    left: "calc(50% - 840px/2)",
    top: "calc(50% - 412px/2)",
    background: "#F9F9F9",

    /* Low shadow */

    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    height: styleHeight,
    //
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
    color: "black!important",
    borderBottom: "1px solid #eee",
  };

  const modalStyle = {
    bottom: "200px",
  };

  const modalContentStyle = {
    background: "#F9F9F9",
    width: modalContentStyleWidth,
    padding: modalContentStylePadding ? modalContentStylePadding : "0px",
    // margin: "20px",
    overflow: "auto",
    height: modalContentStyleHeight,
    borderRadius: "4px",
  };

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
              <Typography variant="h7" sx={{ color: "black" }}>
                {modalTitle}
              </Typography>
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
                      variant={btn === "Cancel" ? "outlined" : "contained"}
                      onClick={
                        btn === "Cancel"
                          ? handleModalClose
                          : handleDeleteProduct
                      }
                      style={{
                        textTransform: "none",
                        margin: "5px",
                        background: btn !== "Cancel" ? "#416BFF" : "none",
                      }}
                      sx={
                        btn === "Cancel" && {
                          color: "#416BFF!important",
                          border: "1px solid #416BFF!important",
                        }
                      }
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