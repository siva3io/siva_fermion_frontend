import React, { useState, useEffect } from "react";
import "./DefaultImage.css";
import GallaryImgCard from "./ProductImage/GallaryImgCard";
import Modal from "./Modal/Modal";
import ImageUploading from "react-images-uploading";
//MUI
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import Box from "@mui/material/Box";
import ProductsTable from "./ImagesTable";
import ModalViewV4 from "../../../shared/widgets/Modal/ModalViewV4";

const DefaultImage = ({
  edit,
  step1Data,
  setStep1Data,
  finalData,
  setFinalData,
}) => {
  //local variables
  let imageLocalData = localStorage.getItem(`addProduct[0]`)
    ? JSON.parse(localStorage.getItem(`addProduct[0]`))
    : null;
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(false);
  const [modalView, setModal] = useState(false);
  const [previewimage, setPreviewImage] = useState(null);
  const [tryone, setTryone] = useState("");
  const imgTypes = ["image/png", "image/jpg", "image/jpeg"];
  const [images, setImages] = React.useState([]);
  const [tempImages, setTempImages] = React.useState([]);
  const [isImageThere, setIsImageThere] = useState(
    // imageLocalData && imageLocalData.images ? true :
    false
  );
  const maxNumber = 10;

  //local functions
  const onImageChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && imgTypes.includes(selectedFile.type)) {
        setPreviewImage(URL.createObjectURL(selectedFile));
        setTryone("");
      } else {
        setPreviewImage(null);
        setTryone("please select valid image type");
      }
    }
  };

  const onChange = (imageList) => {
    setTempImages(imageList);
    if (imageList.length === 0) {
      setIsImageThere(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setTempImages([]);
  };

  const handleDialogOpenModalView = () => {
    updateImages();
    console.log("handleDialogOpenModalView",images)
    setModal(false);
  };

  const handleReplaceProduct = () => {
    handleDialogOpenModalView()
  };

  const updateImages = () => {
    console.log("called")
    var temp = [];
    var temp1 = [...images, ...tempImages];
    console.log("temp1 temp1 temp1",temp1)
    temp = temp1.map((image) => {
      console.log("image",image)
      if (image?.data_url) {
        return {
          // data: image.data_url.split(",")[1],
          data: image?.data_url || image?.enhancedImage
            ? image?.enhancedImage ? "" : image.data_url.split(",")[1]
            : '',
            link: image?.data_url || image?.enhancedImage
            ? image?.enhancedImage ? image?.enhancedImage : image?.data_url.split(",")[1]
            : '',
          name: image.file.name,
          size: image.file.size,
          type: image.file.type,
        };
      } else {
        return { data: image };
      }
    });
    setStep1Data({ ...step1Data, image_options: temp });
    setFinalData({ ...finalData, image_options: temp });
  };

  const handleEnhance = () => {
    setModal(true);
    console.log("images", tempImages, images)
  }

  const handleSave = () => {
    var temp = [];
    setShow(false);
    var temp1 = [...images, ...tempImages];
    setImages((images) => [...images, ...tempImages]);
    temp = temp1.map((image) => {
      if (image?.data_url) {
        return {
          data: image?.data_url?.split(",")[1],
          name: image.file.name,
          size: image.file.size,
          type: image.file.type,
        };
      } else {
        return { data: image };
      }
    });
    setStep1Data({ ...step1Data, image_options: temp });
    setFinalData({ ...finalData, image_options: temp });
    setTempImages([]);
    setIsImageThere(true);
  };

  //use effect function
  // useEffect(() => {
  //   if (imageLocalData && imageLocalData["images"]) {
  //     let temp = [...imageLocalData["images"]];
  //     setImages(temp);
  //   }
  // }, []);

  useEffect(() => {
    updateImages();
  }, [images, tempImages]);

  useEffect(() => {
    if (edit && step1Data?.image_options?.length > 0 && images.length === 0) {
      setIsImageThere(true);
      let temp = [...images];
      temp = step1Data.image_options.map((img) => {
        return img.data;
      });
      setImages(temp);
    }
  }, [step1Data]);


  const [imagesWholeData, setimagesWholeData] = useState([]
    
  );

  useEffect(() => {
    console.log("imagesWholeData",imagesWholeData)
  }, [imagesWholeData]);

  //render function
  return (
    <>
      {images && (
        <Box className="defaultImg">
          <label className="defaultImg_header">
            Upload Default Product Image
            <p className="product_required_mark">*</p>
          </label>
          <p className="defaultImg_text">
            You can upload upto 10 images for this product. Please include
            images with multiple angles like the front view, right view, left
            view, zoom out view, bottom view, etc. <br />
            These are the default product images, variant images can be altered
            after creation
          </p>
          <Box className="defaultImg_uploadCard">
            {isImageThere && (
              <GallaryImgCard
                addImg={false}
                setShow={setShow}
                images={images}
                setImages={setImages}
              />
            )}

            <GallaryImgCard addImg={true} setShow={setShow} />
          </Box>

          {isImageThere &&
            (<Button variant="contained"
              onClick={() => handleEnhance()}
            >Enhance Images</Button>)
          }

        </Box>
      )}

      {modalView && (
        <ModalViewV4
          modalTitle={"Optimize Images"}
          handleModalClose={handleDialogOpenModalView}
          handleReplaceProduct={handleReplaceProduct}
          modalOpen={modalView}
          actionBtns={["Cancel", "Confirm"]}
          modalContentStyleHeight={"100%"}
          modalContentStyleWidth={"auto"}
          styleLeft={"calc(50% - 840px/2)"}
          styleHeight={"auto"}
          mainWidth={"auto"}
          modalContentStylePadding={"20px"}
        >
          <Box>
            <Box>
              <ProductsTable images={images} setImages={setImages}/>
            </Box>
          </Box>
        </ModalViewV4>
      )}

      {show && (
        <Modal show={show} onClose={handleClose}>
          <Box className="modalHeaderBlock">
            <Box className="modalHeaderBtnDiv">
              <Box>
                <label>Add Images</label>
              </Box>
              <Box>
                <ClearOutlinedIcon onClick={() => handleClose()} />
              </Box>
            </Box>
          </Box>
          <ImageUploading
            multiple
            value={tempImages}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <Box
                className="image_upload_popup"
                {...dragProps}
                style={isDragging ? { color: "red" } : null}
              >
                <Box className="upldImgLinkProduct">
                  <Box className="upldImgLinkProduct_frame">
                    <p className="upldImgLinkProduct_head">
                      Drag and Drop a file
                    </p>
                    <p className="upldImgLinkProduct_body">
                      files size to be less than 1Mb
                    </p>
                    <p className="orText">OR</p>
                    <Button
                      variant="contained"
                      style={{ textTransform: "none" }}
                      for="upload"
                      onClick={onImageChange && onImageUpload}
                    >
                      Upload an Image
                    </Button>
                    {/* <p className="orText" style={{ display: "none" }}>
                      OR
                    </p>
                    <p className="addImgText" style={{ display: "none" }}>
                      Add image via URL
                    </p>
                    <p
                      className="upldImgLinkProduct_body"
                      style={{ display: "none" }}
                    >
                      Images type allowed webp, PNG etc
                    </p>
                    <input
                      type="text"
                      className="upldImgLinkProduct_input"
                      style={{ display: "none" }}
                    />
                    <Box className="uploadMediaLinkButtons">
                      <button className="urlBtn" style={{ display: "none" }}>
                        Add Another URL
                      </button>
                      <button className="saveBtn" style={{ display: "none" }}>
                        Save URL
                      </button>
                    </Box> */}
                    {tempImages.length > 0 && (
                      <Box
                        className="imagePreviewBlock"
                        style={
                          tempImages.length > 3
                            ? { justifyContent: "left" }
                            : { justifyContent: "center" }
                        }
                      >
                        {imageList.map((image, index) => (
                          <Box key={index} className="image-item">
                            <Box className="imageHoverActionBlock">
                              <img
                                src={image?.data_url}
                                alt=""
                                width="130px"
                                height="130px"
                                className="previewImageHover"
                              />
                              <Box className="previewImageHoverAction">
                                <DeleteIcon
                                  onClick={() => onImageRemove(index)}
                                />
                              </Box>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            )}
          </ImageUploading>
          <Box className="modalFooterBlock">
            <Button
              variant="outlined"
              onClick={handleClose}
              style={{ margin: "0px 5px", textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={tempImages.length === 0 ? true : false}
              style={{ textTransform: "none" }}
            >
              Confirm
            </Button>
            {/* </Box> */}
          </Box>
        </Modal>
      )}
    </>
  );
};

export default DefaultImage;

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