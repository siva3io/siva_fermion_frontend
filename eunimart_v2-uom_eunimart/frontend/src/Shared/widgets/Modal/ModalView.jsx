import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAllign: "center",
  padding: "36px",
  position: "absolute",
  width: "704px",
  height: "218px",
  left: "calc(50% - 704px/2)",
  top: "calc(50% - 265px/2)",
  background: "#FFFFFF",

  /* Low shadow */

  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
};

const actionStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  marginTop: "24px",
  margin: "auto",
};

export default function ModalView({
  handleDeleteProduct,
  handleModalClose,
  modalOpen,
  primary,
  secondary,
  disclaimer,

  actionBtns,
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
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <Box
              style={{
                float: "right",
                position: "absolute",
                right: "20px",
                top: "20px",
              }}
            >
              <CloseIcon onClick={handleModalClose} />
            </Box>
            {/* Primary text of the modal */}
            {primary && (
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                {primary}
              </Typography>
            )}
            {/* Secundary text of the modal */}
            {secondary && (
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {secondary}
              </Typography>
            )}

            {/* Disclaimer text of the modal */}
            {disclaimer && (
              <Typography
                id="transition-modal-description"
                sx={{ mt: 2, color: "red" }}
              >
                {disclaimer}
              </Typography>
            )}
            <Box style={actionStyle}>
              {actionBtns &&
                actionBtns.map((btn) => (
                  <Button
                    variant={btn === "Cancel" ? "outlined" : "contained"}
                    onClick={
                      btn === "Cancel" ? handleModalClose : handleDeleteProduct
                    }
                    style={{ textTransform: "none", margin: "5px" }}
                  >
                    {btn}
                  </Button>
                ))}
            </Box>
          </Box>
          {/* Ation buttons */}
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