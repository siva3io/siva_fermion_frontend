import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import GallaryImgCard from "../../../components/ProductView/Variant/ProductImage/GallaryImgCard";
//redux
import { getBundleData } from "../../../redux/Action/Bundle/BundleView";

//mui
import { Box, Button, IconButton, Typography } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ProductDetails from "../../../components/Bundle/BundleParticularView/ProductDetails";
import PricingDetails from "../../../components/Bundle/BundleParticularView/PricingDetails";
import PackagingDetails from "../../../components/Bundle/BundleParticularView/PackagingDetails";
import AssociatedProduct from "../../../components/Bundle/BundleParticularView/AssociatedProducts";

function BundleParticular() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = location.state ? location.state : { id: null };

  //redux
  const bundleApiData = useSelector(
    (state) => state.viewBundle.particularBundle.Bundle
  );

  //local variables
  const [variant, setVariant] = useState({
    bundle_id: "temp_123",
    bundle_name: "temp_abc",
    instruction: "temp_info",
    description: "temp_desc",
  });
  const [prevVariant, setPrevVariant] = useState([]);
  const [finalVariant, setFinalVariant] = useState([]);
  const [saveEnable, setSaveEnable] = useState(false);
  const [query, setQuery] = useState(true);
  const [descValue, setDescValue] = useState(
    variant && variant.description && variant.description.length > 0
      ? variant.description
      : ""
  );

  //local functions
  const onInputChange = (prop, value) => {
    const tempValue = { ...variant, [prop]: value };
    setVariant(tempValue);
    const temp1Value = { ...finalVariant, [prop]: value };
    setFinalVariant(temp1Value);
    setSaveEnable(true);
  };

  //useEffect function
  useEffect(() => {
    if (id) {
      dispatch(getBundleData(id));
    } else {
      const tempid = location.pathname.split("/")[4];
      dispatch(getBundleData(tempid));
    }
    // dispatch(searchCurrency(""));
    // dispatch(getBrandDetails(""));
    // dispatch(getParentCategoryDetails());
  }, [location.state]);

  const sendData = () => {
    // if (fields["id"]) {
    //   dispatch(editProductVariant(finalVariant, fields["id"]));
    // }
  };

  const [images, setImages] = useState([]);
  //useEffect functions
  useEffect(() => {
    if (bundleApiData.data) {
      let tempimages = bundleApiData?.data?.image_options;
      let tempConvertor = tempimages?.map((image) => {
        return image.data;
      });
      setImages(tempConvertor);
    }
  }, [bundleApiData]);
  //render functions
  return (
    <Box
      sx={{
        background: "#F9F9F9",
        padding: "8px",
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        className="bundleViewHeader"
        sx={{
          background: "#fff",
          p: 2,
          borderRadius: "8px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography fontFamily={"Poppins"} fontSize="33px">
            {bundleApiData &&
            bundleApiData.data &&
            bundleApiData.data.bundle_name
              ? bundleApiData.data.bundle_name
              : "Bundle Name"}
          </Typography>
          <IconButton>
            <MoreVertOutlinedIcon />
          </IconButton>
        </Box>
        <Typography
          // variant="h6"
          fontFamily={"Poppins"}
          sx={{ my: 1, fontWeight: "normal", fontSize: "19px" }}
        >
          {bundleApiData && bundleApiData.data && bundleApiData.data.bundle_id
            ? bundleApiData.data.bundle_id
            : "Reference No"}
        </Typography>
      </Box>
      <Box className="bundleViewContent">
        {bundleApiData && (
          <>
            <ProductDetails bundleData={bundleApiData.data} />

            <Box
              sx={{
                background: "#fff",
                padding: "24px",
                mt: 2,
                borderRadius: "8px",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" fontFamily={"Poppins"}>
                  Product Images
                </Typography>
                {/* <Button variant="contained">Edit</Button> */}
              </Box>
              <Box>
                {bundleApiData && bundleApiData.data && (
                  <Box>
                    <p className="defaultImg_text">
                      You can upload upto 10 images for this product. Please
                      include images with multiple angles like the front view,
                      right view, left view, zoom out view, bottom view, etc.{" "}
                      <br />
                      These are the default product images, variant images can
                      be altered after creation
                    </p>
                    <Box className="defaultImg_uploadCard">
                      {/* {bundleApiData.dataimage_options?.length > 0 && (
                        <GallaryImgCard
                          addImg={false}
                          // setShow={setShow}
                          images={images}
                          setImages={setImages}
                        />
                      )}

                      <GallaryImgCard
                        addImg={true}
                        //  setShow={setShow}
                      /> */}
                      {images ? (
                        <GallaryImgCard
                          addImg={false}
                          // setShow={setShow}
                          images={images}
                          setImages={setImages}
                        />
                      ) : (
                        <Typography>No images Available</Typography>
                      )}
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                background: "#fff",
                padding: "24px",
                mt: 2,
                borderRadius: "8px",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" fontFamily={"Poppins"}>
                  Associated Products
                </Typography>
                {/* <Button variant="contained">Edit</Button> */}
              </Box>
              <Box sx={{ mt: 1 }}>
                <AssociatedProduct bundle_data={bundleApiData.data} />
              </Box>
            </Box>

            <PricingDetails bundleData={bundleApiData.data} />
            <PackagingDetails bundleData={bundleApiData.data} />
          </>
        )}
      </Box>
    </Box>
  );
}

export default BundleParticular;






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