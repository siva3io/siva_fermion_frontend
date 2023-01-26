import React, { useState, useEffect } from "react";
import "./ProductImage.css";
import GallaryImgCard from "./GallaryImgCard";
import Modal from "./Modal/Modal";
import ImageUploading from "react-images-uploading";
import { useDispatch } from "react-redux";
import { editVariantImages } from "../../../../redux/Action/PostEditApi";
//mui
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const ProductImage = ({ resultimages, var_id }) => {
  //redux
  const dispatch = useDispatch();

  //local variables
  const [query, setQuery] = useState(true); //variable use to define the card is in edit mode or view mode
  let imageLocalData = resultimages;
  const [show, setShow] = useState(false);
  const [previewimage, setPreviewImage] = useState(null);
  const [tryone, setTryone] = useState("");
  const imgTypes = ["image/png", "image/jpg", "image/jpeg"];
  const [images, setImages] = React.useState([]);
  const [tempImages, setTempImages] = React.useState([]);
  const [isImageThere, setIsImageThere] = useState(
    resultimages.length > 0 ? true : false
  );
  const maxNumber = 10;

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

  const onChange = (imageList, addUpdateIndex) => {
    setTempImages(imageList);
    if (imageList.length === 0) {
      setIsImageThere(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setTempImages([]);
  };

  const updateImages = () => {
    var temp = [];
    var temp1 = [...images, ...tempImages];

    temp = temp1.map((image) => {
      if (image?.data_url) {
        return {
          data: image?.data_url?.split(",")[1],
          name: image.file.name,
          size: image.file.size,
          type: image.file.type,
        };
      } else if (typeof image === "string") {
        return { data: image };
      } else {
        return image;
      }
    });
  };

  const handleSave = () => {
    var temp = [];
    setShow(false);
    var temp1 = [...images, ...tempImages];
    temp = temp1.map((image) => {
      if (image?.data_url) {
        return {
          data: image?.data_url?.split(",")[1],
          name: image.file.name,
          size: image.file.size,
          type: image.file.type,
        };
      } else if (typeof image === "string") {
        return { data: image };
      } else {
        return image;
      }
    });
    setImages(temp);
    setTempImages([]);
    setIsImageThere(true);
  };

  useEffect(() => {
    if (imageLocalData && imageLocalData.length > 0) {
      // imageLocalData = imageLocalData.map((image) => image.data);
      setImages(imageLocalData);
    }
  }, [resultimages]);

  useEffect(() => {
    updateImages();
  }, [images, tempImages]);

  return (
    <>
      <Box className="productimagesWrapper">
        <Box className="productImageWrap">
          <Box>
            <p>Product Images</p>
          </Box>
          <Box className="companyDetailsOrderHeader_btn">
            {query ? (
              <Button
                variant="contained"
                onClick={() => setQuery((prev) => !prev)}
                style={{ textTransform: "none" }}
              >
                Edit Images
              </Button>
            ) : (
              <Box>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setQuery((prev) => !prev);
                    // setVariant(fields);
                    setImages(resultimages);
                  }}
                  style={{ textTransform: "none" }}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  style={{ textTransform: "none", marginLeft: "10px" }}
                  onClick={() => {
                    setQuery((prev) => !prev);
                    dispatch(editVariantImages(images, var_id));
                  }}
                >
                  Save Images
                </Button>
                <button className="save_button"></button>
              </Box>
            )}
          </Box>
        </Box>
        <Box className="defaultImg_uploadCard">
          {isImageThere && (
            <GallaryImgCard
              query={query}
              addImg={false}
              setShow={setShow}
              images={images}
              setImages={setImages}
            />
          )}
          {!query && <GallaryImgCard addImg={true} setShow={setShow} />}
        </Box>
      </Box>
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
                      files size to be less than 1kb
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
            <Box className="modalFooterBtnDiv">
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
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ProductImage;
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