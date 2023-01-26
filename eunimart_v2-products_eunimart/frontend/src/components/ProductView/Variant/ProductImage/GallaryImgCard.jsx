import React, { useState } from "react";
import "./GallaryImgCard.css";
//mui
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const GallaryImgCard = ({
  top,
  bottom,
  addImg,
  setShow,
  images,
  setImages,
  query,
}) => {
  const [click, setClick] = useState(false);
  const [imgActive, setImgActive] = useState(false);
  const imgActiveHandler = () => {
    setImgActive(true);
    setClick(true);
    setShow(true);
  };

  const onImageRemove = (index) => {
    var temImg = [...images];
    if (index === 0 && images.length === 1) {
      setImages([]);
    } else {
      temImg.splice(index, 1);
      setImages(temImg);
    }
  };
  return (
    <>
      {addImg && (
        <Box
          className={
            imgActive ? "gallary_card gallary_card_active" : "gallary_card"
          }
          onClick={imgActiveHandler}
          style={{
            height: (top && "129px") || (bottom && "113px"),
            background: addImg && "#fff",
            filter: addImg && "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))",
          }}
        >
          <AddIcon fontSize="large" />
        </Box>
      )}

      {!addImg &&
        images &&
        images.map((image, index) => {
          console.log("image", image, index)
          return (
            <Box key={index} className="image-item">
              <Box className="imageHoverActionBlock">
                <img



                  src={
                    image
                      ? image.link ? image.link
                        : "data:image/png;base64," +
                        image.data
                      : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                  }

                  /*  src={
                     image
                       ? typeof image === "string"
                         ? "data:image/png;base64," + image
                         : image?.link
                       : null
                   } */


                  alt=""
                  width="130px"
                  height="130px"
                  className={!query ? "previewImageHover" : ""}
                />
                {!query && (
                  <Box className="previewImageHoverAction">
                    <DeleteIcon onClick={() => onImageRemove(index)} />
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
    </>
  );
};

export default GallaryImgCard;

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