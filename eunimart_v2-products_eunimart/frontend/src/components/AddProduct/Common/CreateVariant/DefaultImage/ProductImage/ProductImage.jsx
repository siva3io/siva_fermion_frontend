import React from "react";
import "./ProductImage.css";
import GallaryImgCard from "./GallaryImgCard";

const ProductImage = () => {
  return (
    <div className="productimagesWrapper">
      <div className="productImageWrap">
        <div>
          <p>Product Images</p>
          <p
            style={{
              marginLeft: "16px",
              fontWeight: "400",
              fontSize: "15px",
              marginTop: "23px",
            }}
          >
            You can upload upto 10 images for this product. Please include
            images with multiple angles like the front view, right view, left
            view, zoom out view, bottom view, etc. For many marketplaces, the
            front view and rightside view are mandatory. Our AI will auto sort
            your images as per the best possible configurations. If needed, you
            can reorder these images as required. To reorder the images, please
            grab the image and move it to the desired location.
          </p>
        </div>
        <button className="btnSaveproduct">Save</button>
      </div>
      <div className="defaultImg_uploadCard">
        <GallaryImgCard />
        <GallaryImgCard />
        <GallaryImgCard />
        <GallaryImgCard />
        <GallaryImgCard />
        <GallaryImgCard addImg />
      </div>
    </div>
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