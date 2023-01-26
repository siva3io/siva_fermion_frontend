import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import "./Products.css";
// import { Redirect } from "react-router";
import ProductDetails from "../components/AddProduct/Common/ProductDetails/ProductDetails";
import DefaultImage from "../components/AddProduct/DefaultImage/DefaultImage";
import CreateVariant from "../components/AddProduct/Common/CreateVariant/CreateVariant";
import AccountingDetails from "../components/AddProduct/Common/CostDetails/AccountingDetails/AccountingDetails";
import VendorDetails from "../components/AddProduct/Common/CostDetails/VendorDetails/VendorDetails";
import PackageMaterial from "../components/AddProduct/Common/PackagingDetails/PackageMaterial/PackageMaterial";
import PackageDimension from "../components/AddProduct/Common/PackagingDetails/PackageDimension/PackageDimension";
import CategoryDetails from "../components/AddProduct/Common/CategoryDetails/CategoryDetails";
import StepperForm from "../components/AddProduct/Stepper/Stepper";
import UOMdetails from "../components/AddProduct/Common/UOMdetails/UOMdetails";

//redux imports
import {
  getBrandDetails,
  getConditionDetails,
  getProductTypeDetails,
  getProcurementDetails,
  getRoutesDetails,
  getInventoryTrackingDetails,
  getBaseUOMDetails,
  //
  getParentCategoryDetails,
  postCreateProduct,
  postUpdateProduct,
  // createBrandDetails,
} from "../redux/Action/FetchProductDetailsAction";
import {
  createVariantTable,
  getVariantAttribute,
  getPropertyAttribute,
  // getPropertyAttribute,
  // createVariantAttribute,
  // postCreateVariant,
  postUpdateVariant,
} from "../redux/Action/FetchCreateVariantAction";
import { searchCurrency } from "../redux/Action/GetCurrencyAction";

import {
  getVendor,
  getPackagingMaterial,
} from "../redux/Action/FetchVPDetails";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function AddProduct({ edit }) {

  console.log("testtestest")
  const location = useLocation();

  const history = useNavigate();
  const dispatch = useDispatch();
  const [productId, setProductId] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [editId, setEditId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { loading, ProductData } = useSelector(
    (state) => state.fetchSingleProduct.specificProduct
  );
  const [editProductData, setEditProductData] = useState(
    ProductData ? ProductData : {}
  );
  // const brand = useSelector(
  //   (state) => state.fetchAddProductDetails.brand.Brand
  // );

  //redux variables
  let createProductResponse = useSelector(
    (state) =>
      state.fetchAddProductDetails.createProductResponse.CreateProductResponse
  );

  useEffect(() => {
    setEditProductData(ProductData ? ProductData : {});
  }, [ProductData]);

  useEffect(() => {
    setProductId(createProductResponse);
  }, [createProductResponse]);

  let createVPResponse = useSelector(
    (state) => state.fetchVPDetails.createVPResponse.CreateVPResponse
  );

  useEffect(() => {
    if (
      typeof createVPResponse === "number" &&
      activeStep === createProductSteps.length - 1
    ) {
      // <Redirect to="/products" />;
    }
  }, [createVPResponse]);





  const [packaging_id, setPackagingId] = useState("");

  const productType = useSelector(
    (state) => state.fetchAddProductDetails.productType.ProductType
  );
  console.log("productType1",productType);

  const packagingDetails = useSelector(
    (state) => state.fetchVPDetails.productPackage.ProductPackage
  );

  
  console.log("ProductPackage",packagingDetails)


  useEffect(() => {
    for (let i = 0; i < productType?.data?.length; i++) {
     // console.log("productType?.data",productType?.data[i])
      if (productType?.data[i]?.["lookup_code"] == "PACKAGING") {
        setPackagingId(productType.data[i]?.["id"])
      }
    }
  }, [productType]);

  useEffect(()=>{
    dispatch(getPackagingMaterial(packaging_id));
  },[packaging_id])




  useEffect(() => {
    //product details
    dispatch(getBrandDetails(""));
    dispatch(getConditionDetails());
    dispatch(getProductTypeDetails());
    dispatch(getProcurementDetails());
    dispatch(getRoutesDetails());
    dispatch(getInventoryTrackingDetails());
    //uom
    dispatch(getBaseUOMDetails());
    //cantegory details
    dispatch(getParentCategoryDetails());
    //variant attribute
    dispatch(getVariantAttribute());
    dispatch(getPropertyAttribute());
    //vendor details
    dispatch(searchCurrency());
    dispatch(getVendor({ limit: 10, offset: 1 }));
  //  dispatch(getPackagingMaterial());
    //
    // dispatch(getShippingPartner());
    // dispatch(getProductPackage());
    // dispatch(getVendorPriceList());

    if (localStorage.getItem("addProduct[0]")) {
      localStorage.removeItem("addProduct[0]");
    }
    if (edit) {
      setEditId(location.pathname ? location.pathname.split("/")[3] : null);
    }
    if (loading === false) {
      setIsLoading(false);
    }
    // dispatch(createVariantTable(null, []));
  }, []);

  //final
  const [finalData, setFinalData] = useState({
    // product_name: "",
    // brand_id: null,
    // sku_code: "",
    // hsn_code: "",
    // product_condition_id: null,
    // product_type_id: null,
    // product_procurement_treatment_ids: [],
    // stock_treatment_ids: [],
    // inventory_tracking_id: null,
    // uom_id: null,
    // image_options: [],
    // primary_category_id: null,
    // secondary_category_id: null,
    // description: {},
    // attribute_key_values: [],
    // product_variant_ids: [],
    // product_pricing_details: {
    //   sales_price: null,
    //   cost_price: null,
    //   mrp: null,
    //   tax_options: null,
    //   currency_id: null,
    //   tax: false,
    //   shipping: false,
    // },
    // price_list_details: [],
    // shipping_options: {
    //   tax_included_in_sale_price: false,
    //   shipping_cost: null,
    //   shipping_included: true,
    //   notes: "",
    // },
    // package_material_options: [],
    // package_dimensions: {
    //   packaging_type: "",
    //   package_length: null,
    //   package_width: null,
    //   package_height: null,
    //   package_weight: null,
    //   volumetric_weight: "",
    // },
    // status_id: 1,
  });

  //step1
  const [step1Data, setStep1Data] = useState({
    product_name: "",

    brand_id: null,
    sku_code: "",
    hsn_code: "",
    product_condition_id: null,
    product_type_id: null,
    product_procurement_treatment_ids: [],
    stock_treatment_ids: [],
    // inventory_tracking_id: null,
    uom_id: null,
    uom_name: "",
    image_options: [],
    primary_category_id: null,
    secondary_category_id: null,
    description: {
      data: "",
    },
  });
  const step1Validation = () => {
    console.log("step1Data",step1Data)
    // if (
    //   (step1Data.product_name && step1Data.product_name === "") ||
    //   step1Data.sku_code === "" ||
    //   step1Data.brand_id === null ||
    //   step1Data.product_type_id === null ||
    //   step1Data.product_procurement_treatment_ids === [] ||
    //   step1Data.stock_treatment_ids === [] ||
    //   // step1Data.inventory_tracking_id === null ||
    //   step1Data.image_options?.length === 0 ||
    //   step1Data.primary_category_id === null ||
    //   // step1Data.secondary_category_id === null ||
    //   step1Data.description?.data === ""
    // ) {
    //   return false;
    // } else {
      return true;
    // }
  };

  //step2
  const [step2Data, setStep2Data] = useState({
    attribute_key_values: [],
    product_variant_ids: [],
  });
  const step2Validation = () => {
    // if (
    //   step2Data.attribute_key_values.length === 0 &&
    //   step2Data.product_variant_ids.length === 0
    // ) {
    //   return false;
    // } else {
    return true;
    // }
  };

  const [step3Data, setStep3Data] = useState({
    product_pricing_details: {
      sales_price: null,
      cost_price: null,
      mrp: null,
      tax_options: null,
      currency_id: null,
      tax: false,
      shipping: false,
    },
    price_list_details: [],
    shipping_options: {
      tax_included_in_sale_price: false,
      shipping_cost: null,
      shipping_included: true,
      notes: "",
    },
    package_material_options: [],
    package_dimensions: {
      packaging_type: "",
      package_length: null,
      package_width: null,
      package_hight: null,
      package_weight: null,
      volumetric_weight: "",
    },
  });
  const step3Validation = () => {
    // if (
    //   step3Data.list_price === 0 ||
    //   step3Data.package_height === 0 ||
    //   (step3Data.package_length && step3Data.package_length === 0) ||
    //   step3Data.package_weight === 0 ||
    //   step3Data.package_width === 0 ||
    //   step3Data.product_mrp === 0 ||
    //   (step3Data.product_packaging_line_ids.length &&
    //     step3Data.product_packaging_line_ids.length === 0) ||
    //   step3Data.product_tax === 0 ||
    //   (step3Data.seller_ids.length && step3Data.seller_ids.length === 0) ||
    //   step3Data.ship_in_price === null ||
    //   (step3Data.shipping_partner_ids.length &&
    //     step3Data.shipping_partner_ids.length === 0) ||
    //   step3Data.standard_price === 0 ||
    //   step3Data.tax_in_price === null
    // ) {
    //   return false;
    // } else {
    return true;
    // }
  };

  useEffect(() => {}, [finalData]);

  useEffect(() => {}, [step3Data]);

  useEffect(() => {
    if (editProductData && edit) {
      let tempFinalData = { ...finalData };
      let tempStep1Data = { ...step1Data };
      let tempStep2Data = { ...step2Data };
      let tempStep3Data = { ...step3Data };

      // tempFinalData.product_name = editProductData.product_name;
      tempStep1Data.product_name = editProductData.product_name;
      // tempFinalData.hsn_code = editProductData.hsn_code;
      tempStep1Data.hsn_code = editProductData.hsn_code;
      // tempFinalData.sku_code = editProductData.sku_code;
      tempStep1Data.sku_code = editProductData.sku_code;
      // tempFinalData.brand_id = editProductData.brand_id;
      tempStep1Data.brand_id = editProductData.brand_id;
      tempStep1Data.brand_name = editProductData.brand?.brand_name;
      // tempFinalData.product_condition_id =
      // editProductData.product_condition?.id;
      tempStep1Data.product_condition_id =
        editProductData.product_condition?.id;
      // tempFinalData.product_type_id = editProductData.product_type?.id;
      tempStep1Data.product_type_id = editProductData.product_type?.id;
      // tempFinalData.product_procurement_treatment_ids =
      // editProductData?.product_procurement_treatment_ids;
      tempStep1Data.product_procurement_treatment_ids =
        editProductData?.product_procurement_treatment_ids?.map((item) => {
          return item.id;
        });
      // tempFinalData.stock_treatment_ids = editProductData?.stock_treatment_ids;
      tempStep1Data.stock_treatment_ids =
        editProductData?.stock_treatment_ids?.map((item) => {
          return item.id;
        });
      // tempFinalData.inventory_tracking_id =
      // editProductData?.inventory_tracking_id;
      // tempStep1Data.inventory_tracking_id =
      //   editProductData?.inventory_tracking_id;
      // tempFinalData.uom_id = editProductData.uom_id;
      tempStep1Data.uom_id = editProductData.uom_id;
      tempStep1Data.product_uom_name = editProductData?.uom?.name;
      // tempFinalData.image_options = editProductData.image_options;
      tempStep1Data.image_options = editProductData.image_options;
      // tempFinalData.primary_category_id = editProductData.primary_category_id;
      tempStep1Data.primary_category_id = editProductData.primary_category_id;
      tempStep1Data.primary_category_name =
        editProductData?.primary_category?.name;
      // tempFinalData.secondary_category_id =
      //   editProductData.secondary_category_id;
      tempStep1Data.secondary_category_name =
        editProductData?.secondary_category?.name;
      // tempFinalData.description = editProductData.description;
      tempStep1Data.description = editProductData?.description;
      // tempFinalData.attribute_key_values =
      // editProductData?.attributes_key_values;
      tempStep2Data.attribute_key_values =
        editProductData?.attributes_key_values;
      // tempFinalData.product_variant_ids = editProductData?.product_variant_ids;
      tempStep2Data.product_variant_ids = editProductData?.product_variant_ids;
      // tempFinalData.product_pricing_details =
      //   editProductData?.product_pricing_details;
      tempStep3Data.product_pricing_details =
        editProductData?.product_pricing_details;
      // tempFinalData.package_material_options =
      //   editProductData?.package_material_options;
      tempStep3Data.package_material_options =
        editProductData?.package_material_options;
      // tempFinalData.package_dimensions = editProductData?.package_dimensions;
      tempStep3Data.package_dimensions = editProductData?.package_dimensions;

      // setFinalData(tempFinalData);
      setStep1Data(tempStep1Data);
      setStep2Data(tempStep2Data);
      setStep3Data(tempStep3Data);
    }
  }, [editProductData]);

  const createProductSteps = [
    "Products Details",
    "Create Variant",
    "Vendor & Packing Details",
  ];
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
            <UOMdetails
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
            <CategoryDetails
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
            <CreateVariant
              edit={edit}
              step2Data={step2Data}
              setStep2Data={setStep2Data}
              finalData={finalData}
              setFinalData={setFinalData}
              productId={productId}
              editProductData={editProductData}
            />
          </>
        );

      case 2:
        return (
          <>
            <AccountingDetails
              edit={edit}
              step3Data={step3Data}
              setStep3Data={setStep3Data}
              finalData={finalData}
              setFinalData={setFinalData}
              productId={productId}
            />
            <VendorDetails
              staticForm={true}
              step3Data={step3Data}
              setStep3Data={setStep3Data}
              finalData={finalData}
              setFinalData={setFinalData}
              //
              step1Data={step1Data}
            />
            <PackageMaterial
              edit={edit}
              step3Data={step3Data}
              setStep3Data={setStep3Data}
              finalData={finalData}
              setFinalData={setFinalData}
              //
              step1Data={step1Data}
            />
            {/* <ShippingDetails
              staticForm={true}
              step3Data={step3Data}
              setStep3Data={setStep3Data}
            /> */}
            <PackageDimension
              edit={edit}
              step3Data={step3Data}
              setStep3Data={setStep3Data}
              finalData={finalData}
              setFinalData={setFinalData}
            />
          </>
        );

      default:
        return "Unknown stepIndex";
    }
  }

  const handleNext = () => {
    if (createProductSteps.length - 1 > activeStep) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    if (activeStep === 2) {
      setTimeout(() => {
        if (edit) {
          const temp = { ...finalData };

          if (Object.keys(temp.description.data).length === 0) {
            delete temp.description;
          }
          // if (temp.price_list_details.length === 0) {
          //   delete temp.price_list_details;
          // }
          if (temp.product_variant_ids === []) {
            delete temp.product_variant_ids;
          }
          setFinalData(temp);

          dispatch(postUpdateProduct(temp, editId));
        } else {
          dispatch(postCreateProduct(finalData));
        }
      }, 0);
    }
    // if (
    //   createProductSteps.length - 1 === activeStep &&
    //   typeof createVPResponse === "number"
    // ) {
    //   <Redirect to="/products" />;
    // } else {
    //   if (createProductSteps.length - 1 > activeStep) {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //   }

    //   switch (activeStep) {
    //     case 0:
    //       dispatch(postCreateProduct(step1Data));

    //       break;
    //     case 1:
    //       if (step2Data.variants.length !== 0) {
    //         dispatch(postUpdateVariant(step2Data));
    //       }
    //       break;
    //     case 2:
    //       dispatch(postVendorPricing(step3Data));

    //       break;
    //     default:
    //       break;
    //   }
    // }
  };

  const handleBack = () => {
    switch (activeStep) {
      case 1:
        // dispatch(postCreateProduct(step1Data));
        setActiveStep(0);
        break;
      case 2:
        setActiveStep(1);
        break;
      default:
        break;
    }
    // if (0 < activeStep) {
    //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // }
  };
  const handleCancel = () => {
    if (activeStep == 0) {
      if (typeof productId === "number") {
        // dispatch(postDeleteProduct(productId));
        history("/products");
      } else {
        history("/products");
      }
    } else if (activeStep === 1) {
      // dispatch(postDeleteProduct(productId));
      history("/products");
    } else if (activeStep === 2) {
      // dispatch(postDeleteProduct(productId));
      history("/products");
    }
  };
  const handledraftStep = () => {
    toast.warning("Product Drafted", {
      toastId: "Product Drafted Successfully !",
      autoClose: 1000,
    });
    history("/products");
  };

  return (
    <div className="productsLayout" style={{ background: "#F9F9F9!important" }}>
      {edit ? (
        <StepperForm
          edit={true}
          getStep={getStepContent}
          activeStep={activeStep}
          steps={createProductSteps}
          nextStep={handleNext}
          nextButtonIsValid={
            activeStep === 0
              ? step1Validation()
              : activeStep === 1
              ? step2Validation()
              : activeStep === 2
              ? step3Validation()
              : true
          }
          skipStep={
            step2Data?.attribute_key_values?.length === 0 ? true : false
          }
          cancelStep={handleCancel}
          backStep={handleBack}
          draftStep={handledraftStep}
        />
      ) : (
        <StepperForm
          edit={false}
          getStep={getStepContent}
          activeStep={activeStep}
          steps={createProductSteps}
          nextStep={handleNext}
          nextButtonIsValid={
            activeStep === 0
              ? step1Validation()
              : activeStep === 1
              ? step2Validation()
              : activeStep === 2
              ? step3Validation()
              : true
          }
          skipStep={step2Data.attribute_key_values.length === 0 ? true : false}
          cancelStep={handleCancel}
          backStep={handleBack}
          draftStep={handledraftStep}
        />
      )}
    </div>
  );
}

export default AddProduct;

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