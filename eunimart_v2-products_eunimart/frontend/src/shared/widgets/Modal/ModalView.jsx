import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
//mui
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Link } from "@mui/material";
const fileTypes = ["XLS", "PDF"];
export default function ModalView({
  handleDeleteProduct,
  handleModalClose,
  modalOpen,
  primary,
  secondary,
  disclaimer,
  actionBtns,
  handleDownloadTemplateModalOpen,
}) {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAllign: "center",
    padding: "36px",
    position: "absolute",
    width: "fitContent",
    height: "fitContent",
    left:
      secondary === "upload" ||
      secondary ===
        "This will remove these products from your product list. Are you sure?" ||
      secondary ===
        "This will remove these bundle from your bundle list. Are you sure?"
        ? "calc(50% - 967px/2)"
        : "calc(50% - 704px/2)",
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

  const fileUploadStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",

    position: "static",
    width: "770px",
    height: "226px",
    left: "0px",
    top: "107px",

    /* Tertiary Button/Hover fill */

    background: "rgba(239, 242, 254, 0.5)",
    /* Badges/ darker gray */

    border: "0.5px dashed #737373",
    borderRadius: "4px",
  };
  return (
    <Box>
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
              <IconButton onClick={handleModalClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            {/* Primary text of the modal */}
            {primary && (
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                sx={{ fontFamily: "Poppins" }}
              >
                {primary}
              </Typography>
            )}
            {/* Secundary text of the modal */}
            {secondary && secondary !== "upload" ? (
              <Typography
                id="transition-modal-description"
                sx={{ mt: 2, fontFamily: "Poppins" }}
              >
                {secondary}
              </Typography>
            ) : (
              <Box>
                <Typography>
                  To add products on the platform please use standardize product
                  template offered by eunimart.
                </Typography>
                <Link
                  sx={{ ml: 30, cursor: "pointer" }}
                  onClick={handleDownloadTemplateModalOpen}
                >
                  Click here to download Template
                </Link>

                <FileUploader
                  multiple={false}
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                >
                  <Box sx={fileUploadStyle}>
                    <Typography variant="h5" fontFamily={"Poppins"}>
                      Drag and Drop a file
                    </Typography>
                    <Typography fontFamily={"Poppins"}>
                      File must be in Excel Format
                    </Typography>
                    <Typography variant="h5" fontFamily={"Poppins"}>
                      OR
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ textTransform: "none", fontFamily: "Poppins" }}
                    >
                      Upload File
                    </Button>
                    <Typography fontFamily={"Poppins"}>
                      {file
                        ? `File name: ${file.name}`
                        : "no files uploaded yet"}
                    </Typography>
                  </Box>
                </FileUploader>
              </Box>
            )}

            {/* Disclaimer text of the modal */}
            {disclaimer && (
              <Typography
                id="transition-modal-description"
                sx={{ mt: 2, color: "red", fontFamily: "Poppins" }}
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
                    sx={{
                      textTransform: "none",
                      margin: "5px",
                      fontFamily: "Poppins",
                    }}
                  >
                    {btn}
                  </Button>
                ))}
            </Box>
          </Box>
          {/* Ation buttons */}
        </Fade>
      </Modal>
    </Box>
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