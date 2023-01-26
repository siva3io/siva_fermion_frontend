import React, { useEffect, useState } from "react";
import "./GallaryImgCard.css";
//mui
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

import { lazy, Suspense } from "react";
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));
import ErrorBoundary from "../ErrorBoundary";


const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const GallaryImgCard = ({
  top,
  bottom,
  addImg,
  setShow,
  images,
  setImages,
  query,
  selectedDoc,
  setSelectedDoc
}) => {
  const [click, setClick] = useState(false);
  const [businessList, setBusinessList] = useState([]);
  const [saveEnable, setSaveEnable] = useState(false);



  const [imgActive, setImgActive] = useState(false);
  const imgActiveHandler = (id) => {
    console.log("id", id)
    setSelectedDoc(id)
    setImgActive(true);
    setClick(true);
    setShow(true);
  };

  const { businessTypes } = useSelector((state) => state.data);

  useEffect(() => {
    console.log("re")
    if (businessTypes) {
      const temp = businessTypes.map((item) => {
        return {
          value: item.id,
          label: item.display_name,
        };
      });
      setBusinessList(temp);
    }
  }, [businessTypes]);


  const onSelelectionChange = (prop, value) => {
    console.log("onSelelectionChange", prop, value)
    // const temp = { ...variant };
    // console.log("temp", temp)
    // if (prop === "invoice_generation_id") {
    //   temp.invoice_generation.display_name = value.label;
    //   temp.invoice_generation.id = value.value;
    // }

    // setVariant(temp);
    // setFinalVariant({ ...finalVariant, [prop]: value.value });
    setSaveEnable(true);
  };

  const sendData = () => {
    // if (finalVariant?.detailed_type === undefined) {
    //   delete finalVariant.detailed_type;
    // }
    // if (fields["id"]) {
    // dispatch(editProductVariant(finalVariant, fields["id"]));
    // }
  };


  return (
    <>


      <div className="companyDetailsOrder">
        <div className="companyDetailsOrderHeader">
          <p className="companyDetailsOrder_header">KYC documents (India)</p>
          <div className="companyDetailsOrderHeader_btn">
            <Button

              variant="contained"
              style={{ textTransform: "none", marginLeft: "10px" }}
              onClick={() => {
                // if (saveEnable === true) {
                  sendData();
                // }
              }}


            >
              Save Details
            </Button>
          </div>
        </div>
        <div className="companyDetailsOrder_card">
          <div className="companyDetailsOrder_card_left">

            <div className="buttonWrapper-switch">
              <label className="btnLabelWrap-switch">IEC</label>
              <input
                type="text"
                id="upload"
                hidden
              />
              <label
                className="uploadImg"
                for="upload"
                onClick={() => imgActiveHandler("IEC")}
              // onClick={imgActiveHandler}
              >
                Upload
              </label>
              <p>{images?.find(row => row.doc === "IEC")?.name ? images?.find(row => row.doc === "IEC")?.name?.substring(0, 5) : ""}</p>
            </div>

            <div className="buttonWrapper-switch">
              <label className="btnLabelWrap-switch">Passport</label>
              <input
                type="text"
                id="upload"
                hidden
              />
              <label
                className="uploadImg"
                for="upload"
                onClick={() => imgActiveHandler("passport")}
              >
                Upload
              </label>
              <p>{images?.find(row => row.doc === "passport")?.name ? images?.find(row => row.doc === "passport")?.name?.substring(0, 5) : ""}</p>
            </div>

            <div className="buttonWrapper-switch">
              <label className="btnLabelWrap-switch">Aadhar Card</label>
              <input
                type="text"
                id="upload"
                hidden
              />
              <label
                className="uploadImg"
                for="upload"
                onClick={() => imgActiveHandler("aadhar_card")}
              >
                Upload
              </label>
              <p>{images?.find(row => row.doc === "aadhar_card")?.name ? images?.find(row => row.doc === "aadhar_card")?.name?.substring(0.5) : ""}</p>
            </div>


            <Suspense fallback={<div>Loading... </div>}>
              <RemoteWrapper>
                <RemoteSelect
                  disabled={true}
                  label={"Business Types"}
                  data={businessList}
                  placeholder={`Select`}
                  /* value={
                    variant.invoice_generation
                      ? variant.invoice_generation.display_name
                      : ""
                  } */
                  onChange={(e, value) =>
                    onSelelectionChange("invoice_generation_id", value)
                  }
                  fieldKey={"detailed_type"}
                  edit={true}
                />
              </RemoteWrapper></Suspense>



          </div>
          <div className="companyDetailsOrder_right_card">
            <div className="buttonWrapper-switch">
              <label className="btnLabelWrap-switch">Voter Id</label>
              <input
                type="text"
                id="upload"
                hidden
              />
              <label
                className="uploadImg"
                for="upload"
                onClick={() => imgActiveHandler("voter_id")}
              >
                Upload
              </label>
              <p>{images?.find(row => row.doc === "voter_id")?.name ? images?.find(row => row.doc === "voter_id")?.name?.substring(0, 5) : ""}</p>
            </div>


            <div className="buttonWrapper-switch">
              <label className="btnLabelWrap-switch">Pan Card</label>
              <input
                type="text"
                id="upload"
                hidden
              />
              <label
                className="uploadImg"
                for="upload"
                onClick={() => imgActiveHandler("pan_card")}
              >
                Upload
              </label>
              <p>{images?.find(row => row.doc === "pan_card")?.name ? images?.find(row => row.doc === "pan_card")?.name?.substring(0, 5) : ""}</p>
            </div>


            <div className="buttonWrapper-switch">
              <label className="btnLabelWrap-switch">GSTIN</label>
              <input
                type="text"
                id="upload"
                hidden
              />
              <label
                className="uploadImg"
                for="upload"
                onClick={() => imgActiveHandler("gstin")}
              // onClick={() => setShow5(true)}
              >
                Upload
              </label>


              <p>{images?.find(row => row.doc === "gstin")?.name ? images?.find(row => row.doc === "gstin")?.name?.substring(0, 5) : ""}</p>
            </div>

          </div>
        </div>
      </div>


      {/* {addImg && (
      <Box
        className={
          imgActive ? "gallary_card gallary_card_active" : "gallary_card"
        }
        onClick={imgActiveHandler}
      >
        <Button variant="contained"> Upload</Button>
        <AddIcon fontSize="large" />
      </Box> */}


      {/* {!addImg &&
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
                  alt=""
                  width="130px"
                  height="130px"
                  className={!query ? "previewImageHover" : ""}
                />

              </Box>
            </Box>
          );
        })} */}
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