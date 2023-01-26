import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Redirect } from "react-router";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  postCreateProductBundle,
  postUpdateProductBundle,
} from "../../../redux/Action/Bundle/BundleCreateAction";
//
import ProductDetails from "../../../components/Bundle/BundleCreate/ProductDetails/ProductDetails";
import PackagingDetails from "../../../components/Bundle/BundleCreate/PackagingDetails/PackagingDetails";
import DefaultImage from "../../../components/AddProduct/DefaultImage/DefaultImage";
import AssociateProducts from "../../../components/Bundle/BundleCreate/AssociateProducts/AssociateProducts";
import StepperForm from "../../../components/Bundle/BundleCreate/Common/Stepper/Stepper";
import AccountingDetails from "../../../components/Bundle/BundleCreate/AccountingDetails/AccountingDetails";
import { toast } from "react-toastify";
//mui
import { Box } from "@mui/material";
import { useEffect } from "react";

function BundleCreate({ edit }) {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const bundleApiData = useSelector(
    (state) => state.viewBundle.particularBundle.Bundle
  );

  const [editBundleData, setEditBundleData] = useState(
    bundleApiData ? bundleApiData.data : {}
  );

  const [editId, setEditId] = useState(0);

  useEffect(() => {
    setEditBundleData(bundleApiData ? bundleApiData.data : {});
    if (
      edit &&
      location.pathname.split("/")[3] === "duplicateBundle" &&
      bundleApiData
    ) {
      let temp1 = bundleApiData.data;
      let temp = { ...temp1, ...finalData };

      setFinalData(temp);
    }
  }, [bundleApiData]);

  useEffect(() => {
    if (edit && location.pathname.split("/")[3] === "editBundle") {
      setEditId(location.pathname ? location.pathname.split("/")[4] : null);
    }
  }, []);

  const [finalData, setFinalData] = useState({
    status_id: 32,
  });
  //step1
  const [step1Data, setStep1Data] = useState({
    bundle_id: "",
    bundle_name: "",
    instructions: "",
    description: { data: "" },
    image_options: [],
    associate_products: [],
  });
  const step1Validation = () => {
    if (
      (step1Data.bundle_id && step1Data.bundle_id === "") ||
      step1Data.bundle_name === "" ||
      step1Data.instructions === "" ||
      step1Data.description === "" ||
      step1Data.images === [] ||
      step1Data.associate_products === []
    ) {
      return false;
    } else {
      return true;
    }
  };

  //   step2
  const [step2Data, setStep2Data] = useState({
    sales_price: null,
    mrp: null,
    tax_options: null,
    tax: false,
    shipping: false,
    package_details: {
      packaging_type: "",
      packaging_instruction: "",
    },
  });

  useEffect(() => {
    if (editBundleData && edit) {
      let tempStep1Data = { ...step1Data };
      let tempStep2Data = { ...step2Data };

      tempStep1Data.bundle_name = editBundleData.bundle_name;
      tempStep1Data.bundle_id = editBundleData.bundle_id;
      tempStep1Data.instructions = editBundleData.instructions;
      tempStep1Data.description = editBundleData.description;
      tempStep1Data.image_options = editBundleData.image_options;
      tempStep1Data.products = editBundleData.products;

      tempStep2Data.sales_price = editBundleData.sales_price;
      tempStep2Data.tax_options = editBundleData.tax_options;

      tempStep2Data.mrp = editBundleData.mrp;
      tempStep2Data.tax = editBundleData.tax;

      tempStep2Data.shipping = editBundleData.shipping;
      tempStep2Data.package_details = editBundleData.package_details
        ? editBundleData.package_details
        : {
            packaging_type: "",
            packaging_instruction: "",
          };

      // tempStep1Data.brand_name = editBundleData.brand?.brand_name;

      // tempStep1Data.product_condition_id = editBundleData.product_condition?.id;
      // tempStep1Data.product_type_id = editBundleData.product_type?.id;

      // tempStep1Data.product_procurement_treatment_ids =
      //   editBundleData?.product_procurement_treatment_ids?.map((item) => {
      //     return item.id;
      //   });
      // tempStep1Data.stock_treatment_ids =
      //   editBundleData?.stock_treatment_ids?.map((item) => {
      //     return item.id;
      //   });

      // tempStep1Data.inventory_tracking_id =
      //   editBundleData?.inventory_tracking_id;
      // tempStep1Data.uom_id = editBundleData.uom_id;
      // tempStep1Data.product_uom_name = editBundleData?.uom?.name;
      // tempStep1Data.image_options = editBundleData.image_options;
      // tempStep1Data.primary_category_id = editBundleData.primary_category_id;
      // tempStep1Data.primary_category_name =
      //   editBundleData?.primary_category?.name;

      // tempStep1Data.secondary_category_name =
      //   editBundleData?.secondary_category?.name;
      // tempStep1Data.description = editBundleData?.description;

      // tempStep2Data.attribute_key_values =
      //   editBundleData?.attributes_key_values;
      // tempStep2Data.product_variant_ids = editBundleData?.product_variant_ids;

      setStep1Data(tempStep1Data);
      setStep2Data(tempStep2Data);
    }
  }, [editBundleData]);
  const step2Validation = () => {
    if (
      step2Data.sales_price === "" ||
      step2Data.cost_price === "" ||
      step2Data.mrp === "" ||
      step2Data.base_currency === 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const createBundleSteps = ["Products Details", "Vendor & Packing Details"];

  useEffect(() => {
    // console.log("Step1Data >>> ", step1Data);
    // console.log("Step2Data >>> ", step2Data);
    // console.log("FinalData >>> ", finalData);
  }, [step1Data, step2Data]);

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <ProductDetails
              edit={edit}
              step1Data={step1Data}
              setStep1Data={setStep1Data}
              finalData={finalData}
              setFinalData={setFinalData}
            />
            <DefaultImage
              edit={edit}
              step1Data={step1Data}
              setStep1Data={setStep1Data}
              finalData={finalData}
              setFinalData={setFinalData}
            />
            <AssociateProducts
              edit={edit}
              step1Data={step1Data}
              setStep1Data={setStep1Data}
              finalData={finalData}
              setFinalData={setFinalData}
            />
          </>
        );

      case 1:
        return (
          <>
            <AccountingDetails
              edit={edit}
              step3Data={step2Data}
              setStep3Data={setStep2Data}
              productId={"494"}
              setFinalData={setFinalData}
              finalData={finalData}
            />
            <PackagingDetails
              edit={edit}
              step2Data={step2Data}
              setStep2Data={setStep2Data}
              setFinalData={setFinalData}
              finalData={finalData}
            />
          </>
        );

      default:
        return "Unknown stepIndex";
    }
  }

  const handleNext = () => {
    if (activeStep === 1) {
      if (edit && location.pathname.split("/")[3] === "editBundle") {
        dispatch(postUpdateProductBundle(finalData, editId));
      } else {
        dispatch(postCreateProductBundle(finalData));
      }

      history.push("/products/bundles");
    } else {
      if (createBundleSteps.length - 1 > activeStep) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  // const handleBack = () => {
  //   switch (activeStep) {
  //     case 1:
  //       // dispatch(postCreateProduct(step1Data));
  //       let step1Data = JSON.parse(localStorage.getItem(`addProduct[0]`));
  //       setStep1Data(step1Data);
  //       break;
  //     case 2:
  //       let tempstep2Data = JSON.parse(localStorage.getItem(`addProduct[1]`));
  //       break;
  //     default:
  //       break;
  //   }
  //   if (0 < activeStep) {
  //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
  //   }
  // };
  const handleCancel = () => {
    // if (activeStep == 0) {
    //   if (typeof productId === "number") {
    //     dispatch(postDeleteProduct(productId));
    //     history.push("/products");
    //   } else {
    //     history.push("/products");
    //   }
    // } else if (activeStep === 1) {
    //   dispatch(postDeleteProduct(productId));
    //   history.push("/products");
    // } else if (activeStep === 2) {
    //   dispatch(postDeleteProduct(productId));
    //   history.push("/products");
    // }
    history.push("/products/bundles");
  };
  const handledraftStep = () => {
    toast.warning("Bundle Product Drafted", {
      toastId: "Product Drafted Successfully !",
      autoClose: 1000,
    });
    history.push("/products/bundles");
  };

  return (
    <Box className="productsLayout" style={{ background: "#F9F9F9" }}>
      <StepperForm
        getStep={getStepContent}
        activeStep={activeStep}
        steps={createBundleSteps}
        nextStep={handleNext}
        nextButtonIsValid={
          //   activeStep === 0
          //     ? step1Validation()
          //     : activeStep === 1
          //     ? step2Validation()
          //     :
          true
        }
        skipStep={false}
        cancelStep={handleCancel}
        // backStep={handleBack}
        draftStep={handledraftStep}
      />
    </Box>
  );
}

export default BundleCreate;

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