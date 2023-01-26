import React, { useEffect } from "react";
import "../ProductDetailCard/ProductDetailCard.css";
import LabeledText from "../../../../shared/OtherCommon/CommonLabel/LabeledText";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProductVariant } from "../../../../redux/Action/PostEditApi";
//mui
import MatSelect from "../../../../shared/widgets/MatSelect";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { lazy, Suspense } from "react";
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));
import ErrorBoundary from "../../../../ErrorBoundary";


const RemoteWrapper = ({ children }) => (
  <div
    style={{

      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const PackageDetailsCard = ({ fields, edit, packagingDetails }) => {
  //console.log("packagingDetails11", packagingDetails, fields.package_material_options)
  const dispatch = useDispatch();
  const productPackage = useSelector(
    (state) => state.fetchVPDetails.productPackage.ProductPackage
  );


  const [packageMat, setPackageMat] = useState([]);

  const [query, setQuery] = useState(false);
  const [variant, setVariant] = useState(fields ? fields : []);
  const [prevVariant, setPrevVariant] = useState([]);
  const [finalVariant, setFinalVariant] = useState([]);

  const [saveEnable, setSaveEnable] = useState(false);
  const [selectedpackage, setSelectedpackage] = useState();
  const packagin_payload = {
    package_height: "",
    package_length: "",
    package_weight: "",
    package_breadth: "",
    volumentric_weight: "",
    product_material_options: ""
  }
  //redux

  //console.log("productpage",productPackage,variant)

  const onInputChange = (prop, value) => {
    const tempVariant = { ...variant };
    const tempFinalVariant = { ...finalVariant };

    // tempVariant.package_dimensions = {
    //   ...tempVariant.package_dimensions,
    // };

    tempVariant.package_dimensions = {
      ...tempVariant.package_dimensions,
      [prop]: Number(value),
    };

    // tempFinalVariant.package_dimensions = {
    //   ...tempFinalVariant.package_dimensions,
    // };
    tempFinalVariant.package_dimensions = {
      ...tempFinalVariant.package_dimensions,
      [prop]: Number(value),
    };

    // if (
    //   variant.package_dimensions.package_height &&
    //   variant.package_dimensions.package_length &&
    //   variant.package_dimensions.package_breadth
    // ) {
    //   tempVariant.package_dimensions = {
    //     volumetric_weight:
    //       (variant.package_dimensions.package_height *
    //         variant.package_dimensions.package_length *
    //         variant.package_dimensions.package_breadth) /
    //       5000,
    //   };

    //   tempFinalVariant.package_dimensions = {
    //     volumetric_weight:
    //       (variant.package_dimensions.package_height *
    //         variant.package_dimensions.package_length *
    //         variant.package_dimensions.package_breadth) /
    //       5000,
    //   };
    // }

    setVariant(tempVariant);
    setFinalVariant(tempFinalVariant);
    setSaveEnable(true);
  };

  const onSelelectionChange = (prop, value) => {
    console.log('onSelelectionChange', value.label, prop)
    const temp = { ...variant };
    if (prop === "package_material_options") {
      setSelectedpackage(value.label)
      /* let newPckMat = value.map((item) => {
        return {
          id: item.value,
          material_quantity: item.materiamaterial_quantityl_quantity
            ? item.material_quantity
            : null,
          name: item.label,
          uom_id: item.uom_id ? item.uom_id : null,
          uom_name: item.uom_name ? item.uom_name : "",
        };
      }); */

      temp.package_material_options = value.value;
      setVariant(temp);
      setFinalVariant({
        ...finalVariant,
        package_material_options: temp?.package_material_options,
      });
      setSaveEnable(true);
    }
  };

  console.log("packageMat", packageMat, selectedpackage)

  const sendData = () => {
    console.log("editProductVariant0", finalVariant, fields)

    packagin_payload.package_breadth = finalVariant.package_dimensions?.package_breadth ? finalVariant.package_dimensions?.package_breadth : fields?.package_dimensions?.package_breadth ? fields?.package_dimensions?.package_breadth : "";
    packagin_payload.package_length = finalVariant.package_dimensions?.package_length ? finalVariant.package_dimensions?.package_length : fields?.package_dimensions?.package_length ? fields?.package_dimensions?.package_length : "";
    packagin_payload.package_weight = finalVariant.package_dimensions?.package_weight ? finalVariant.package_dimensions?.package_weight : fields?.package_dimensions?.package_weight ? fields?.package_dimensions?.package_weight : "";
    packagin_payload.package_height = finalVariant.package_dimensions?.package_height ? finalVariant.package_dimensions?.package_height : fields?.package_dimensions?.package_height ? fields?.package_dimensions?.package_height : "";
    packagin_payload.volumentric_weight = finalVariant.package_dimensions?.volumentric_weight ? finalVariant.package_dimensions?.volumentric_weight : fields?.package_dimensions?.volumentric_weight ? fields?.package_dimensions?.volumentric_weight : "";

    const p1 = {
      package_dimensions: packagin_payload,
      package_material_options: selectedpackage ? selectedpackage : finalVariant?.package_material_options
    }



    console.log("");
    if (fields["id"]) {
      dispatch(editProductVariant(p1, fields["id"]));
    }
  };

  //useEffect functions
  useEffect(() => {
    setSelectedpackage(fields?.package_material_options ? fields?.package_material_options[0] : []);
    setVariant(fields ? fields : []);
    setPrevVariant(fields ? fields : []);
    if (edit === false) {
      setQuery(true);
    }
  }, [fields]);

  useEffect(() => {
    if (packagingDetails && packagingDetails.data) {
      let temp = packagingDetails.data;
      temp = temp.map((item) => {
        return {
          label: item.product_name,
          value: item.id,
        };
      });
      setPackageMat(temp);
    }
  }, [packagingDetails]);
  //render function
  return (
    <Box className="companyDetailsOrder">
      <Box className="companyDetailsOrderHeader">
        <p className="companyDetailsOrder_header">Packaging Details</p>
        <Box className="companyDetailsOrderHeader_btn">
          {query ? (
            <Button
              variant="contained"
              onClick={() => {
                setQuery((prev) => !prev);
                setSaveEnable(false);
              }}
              style={{ textTransform: "none" }}
            >
              Edit Details
            </Button>
          ) : (
            <Box>
              <Button
                variant="outlined"
                onClick={() => {
                  setQuery((prev) => !prev);
                  setVariant(prevVariant);
                }}
                style={{ textTransform: "none" }}
              >
                Cancel
              </Button>

              <Button
                disabled={!saveEnable}
                variant="contained"
                style={{ textTransform: "none", marginLeft: "10px" }}
                onClick={() => {
                  if (saveEnable === true) {
                    setQuery((prev) => !prev);
                    setPrevVariant(variant);
                    sendData(variant);
                  }
                }}
              >
                Save Details
              </Button>
            </Box>
          )}
        </Box>
      </Box>



      <Box className="companyDetailsOrder_card">
        {variant && (
          <>
            <Box className="variantDetailsCard_card_left">
              {/* {query ? (
                <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                  card
                  label={"Package Material"}
                  text={
                    selectedpackage
                  }
                  disabled_y={true}
                  name="package_material"
                />
              ) : (


                <MatSelect
                  disabled={query}
                  label={"Package Material"}
                  data={packageMat}
                  value={
                    selectedpackage
                  }
                  onChange={(e, value) =>
                    onSelelectionChange("package_material_options", value)
                  }
                  fieldKey={"package_material_options"}
                  edit={true}
                />
              )} */}


              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Package height"}
                    text={
                      variant.package_dimensions
                        ? variant.package_dimensions.package_height
                          ? variant.package_dimensions.package_height
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="package_height"
                    type={"number"}
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper></Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Volumetric Weight"}
                    text={
                      variant.package_dimensions
                        ? variant.package_dimensions.volumetric_weight
                          ? variant.package_dimensions.volumetric_weight
                          : variant.package_dimensions.package_height &&
                            variant.package_dimensions.package_length &&
                            variant.package_dimensions.package_breadth
                            ? (variant.package_dimensions.package_height *
                              variant.package_dimensions.package_length *
                              variant.package_dimensions.package_breadth) /
                            5000
                            : "--"
                        : "--"
                    }
                    disabled_y={query}
                    name="volumetric_weight"
                    type={"number"}
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper></Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Special Note"}
                    text={
                      variant.package_dimensions &&
                        variant.package_dimensions.special_notes
                        ? variant.package_dimensions.special_notes
                          ? variant.package_dimensions.special_notes
                          : "--"
                        : "--"
                    }
                    disabled_y={true}
                    name="special_note"
                  />
                </RemoteWrapper></Suspense>
            </Box>
            <Box className="variantDetailsCard_card_right">
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Packaging Cost"}
                    text={
                      variant.package_dimensions &&
                        variant.package_dimensions.package_cost
                        ? variant.package_dimensions.package_cost
                          ? variant.package_dimensions.package_cost
                          : "--"
                        : "--"
                    }
                    disabled_y={true}
                    name="cost"
                  />
                </RemoteWrapper></Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Package Length"}
                    text={
                      variant.package_dimensions &&
                        variant.package_dimensions.package_length
                        ? variant.package_dimensions.package_length
                          ? variant.package_dimensions.package_length
                          : "--"
                        : "--"
                    }
                    disabled_y={query}
                    type={"number"}
                    name="package_length"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper></Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Package Breadth"}
                    text={
                      variant.package_dimensions &&
                        variant.package_dimensions.package_width
                        ? variant.package_dimensions.package_width
                        : "--"
                    }
                    disabled_y={query}
                    type={"number"}
                    name="package_width"
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper></Suspense>
              <Suspense fallback={<div>Loading... </div>}>
                <RemoteWrapper>
                  <RemoteViewTextField
                    card
                    label={"Package Weight"}
                    text={
                      variant.package_dimensions &&
                        variant.package_dimensions.package_weight
                        ? variant.package_dimensions.package_weight
                        : "--"
                    }
                    disabled_y={query}
                    name="package_weight"
                    type={"number"}
                    onInputChange={onInputChange}
                  />
                </RemoteWrapper></Suspense>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default PackageDetailsCard;


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