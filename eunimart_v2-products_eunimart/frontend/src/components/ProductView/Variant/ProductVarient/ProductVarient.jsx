import React from "react";
import { useEffect } from "react";
import "./ProductVarient.css";

function ProductVarient({
  title,
  varientTabNo,
  setVarientTabNo,
  tabActive,
  setTabActive,
  productImage,
  productVarient,
  // setVariantDetails,
  variantDetailsArr,
  setVariantDetailsArr,
}) {
  // useEffect(() => {
  //   if (productVarient) {
  //     const tempVarDetArr = variantDetailsArr;
  //     tempVarDetArr[varientTabNo] = productVarient.variant_detail;
  //     setVariantDetailsArr(tempVarDetArr);
  //   }
  // }, [productVarient]);
  console.log("productImage", productImage)
  return (
    <div
      className={
        tabActive[varientTabNo] ? "product_varient_active" : "product_varient"
      }
      onClick={() => {
        let i = [...tabActive];

        setTabActive(
          i.map((value, index) => {
            if (index === varientTabNo) return true;
            else return false;
          })
        );
        setVarientTabNo(varientTabNo);

        // setVariantDetails(productVarient.variant_detail);
      }}
    >
      <div className="product_images_wrapper">
        <img

          src={

            productImage
              ? productImage[0] ? productImage[0].data ?productImage[0].data != "" ? "data:image/png;base64," + productImage[0].data
                : productImage[0].link : productImage[0].link
                : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
              : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"


          }

          /* 
          

                      productImage
              ? productImage[0] ? productImage[0].link ? productImage[0].link
                : "data:image/png;base64," +
                productImage[0].data
                : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
              : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
              
          
          src={
            productImage && productImage[0]
              ? "data:image/png;base64," + productImage[0].data
              : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
          } */
          alt="#"
          className="products_product_image"
        />
      </div>
      <div className="product_varient_info">
        <div className="product_varient_title">
          <label className="title">{title}</label>
        </div>
        {/* {productVarient &&
          productVarient.product_template_variant_value_ids.map(
            (tags, index) => {
              return (
                <>
                  <div index={index} className="product_varient_tags">
                    {tags.product_attribute_value_id.name}
                  </div>
                </>
              );
            }
          )} */}
        {/* <div className="product_varient_tags">{size}</div> */}
      </div>
    </div>
  );
}

export default ProductVarient;

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