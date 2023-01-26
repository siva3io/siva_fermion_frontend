import React, { useState } from "react";
import UploadImage from "./UploadImage";
import "./Binary.css";

const GallaryImgCard = ({
  top,
  bottom,
  addImg,
  setShow,
  images,
  setImages,
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
        <div
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
          <i className="material-icons addImg_icon">add</i>
          {/* {click && click === true ? <UploadImage /> : <></>} */}
        </div>
      )}
      {!addImg &&
        images.map((image, index) => {
          return (
            <div key={index} className="image-item">
              <div className="imageHoverActionBlock">
                <img
                  src={
                    image?.data_url
                      ? image?.data_url
                      : "data:image/png;base64," + image
                  }
                  alt=""
                  width="130px"
                  height="130px"
                  className="previewImageHover"
                />
                <div className="previewImageHoverAction">
                  <i
                    className="material-icons"
                    onClick={() => onImageRemove(index)}
                  >
                    close
                  </i>
                </div>
              </div>

              {/* <div className="image-item__btn-wrapper">
            <button
              className="saveBtn"
              onClick={() => onImageUpdate(index)}
            >
              Update
            </button>
            <button
              className="urlBtn"
              onClick={() => onImageRemove(index)}
            >
              Remove
            </button>
          </div> */}
            </div>
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