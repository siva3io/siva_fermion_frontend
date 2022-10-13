import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import "./ProductView.css";
//redux
import { getproductData } from "../redux/Action/FetchProductDataAction";
import { searchCurrency } from "../redux/Action/GetCurrencyAction";
import {
  getProductTypeDetails,
  getStdProductTypeDetails,
  getConditionDetails,
  getBrandDetails,
  getParentCategoryDetails,
  getBaseUOMDetails,
} from "../redux/Action/FetchProductDetailsAction";

import {
  getVendor,
  getPackagingMaterial,
} from "../redux/Action/FetchVPDetails";

//mui
import { Box, Button } from "@mui/material";

import OmnichannelMain from "../components/ProductView/Omnichannel/OmnichannelMain";
import VendorDetails from "../components/ProductView/Variant/VendorDetails/VendorDetails";
import InventoryDetails from "../components/ProductView/Inventory/InventoryDetails/InventoryDetails";
import SalesHistory from "../components/ProductView/Inventory/SalesHistory/SalesHistory";
import SalesReturns from "../components/ProductView/Inventory/SalesReturns/SalesReturns";
import PurchaseHistory from "../components/ProductView/Inventory/PurchaseHistory/PurchaseHistory";
import ReviewAndRatings from "../components/ProductView/ReviewAndRatings/ReviewAndRatings/ReviewAndRatings";
import Accounting from "../components/ProductView/Accounting/Accounting";
import ForecastDetails from "../components/ProductView/Variant/Forecast/ForecastDetails";
import CategoryDetailsCard from "../components/ProductView/Variant/CategoryDetail/CategoryDetailsCard";
import PackageDetailsCard from "../components/ProductView/Variant/PackageDetail/PackageDetailsCard";
import VariantDetailsCard from "../components/ProductView/Variant/VariantDetail/VariantDetailsCard";
import ExtraVariantDetailsCard from "../components/ProductView/Variant/ExtraVariantDetail/ExtraVariantDetailsCard";
import KeywordGenerator from "../components/ProductView/Variant/KeywordGenerator/KeywordGenerator";
import ProductImage from "../components/ProductView/Variant/ProductImage/ProductImage";
import CostDetails from "../components/ProductView/Variant/CostDetails/CostDetails";
import ProductVarient from "../components/ProductView/Variant/ProductVarient/ProductVarient";
import { fetchAvailableMarketplace } from "../redux/Action/FetchAvailableMarketplace";
import { PricingData, ProductBundleData, PurchaseReturns, SalesHistoryData, SalesReturnsData } from "../redux/Action/CombinedActions";
import PricingViewData from "../components/ProductView/Pricing/Pricing";
import ProductBundleDataTable from "../components/ProductView/Bundles/Bundle";
import InventoryViewData from "../components/ProductView/Inventory/ProductInventory";


function ProductView({ edit }) {
  const location = useLocation();
  const { id } = location.state ? location.state : { id: null };
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Variant");
  const [productData, setProductData] = useState([]);
  const [variantDetailsArr, setVariantDetailsArr] = useState([]);
  const [brand, setBrand] = useState("");
  const [varientTabNo, setVarientTabNo] = useState(0);
  const [tabActive, setTabActive] = useState([]);
  //redux
  const productApiData = useSelector(
    (state) => state.fetchSingleProduct.specificProduct.ProductData
  );
  const [indicateFirst, setIndicateFirst] = useState(true);
  const [packaging_id, setPackagingId] = useState("");

  const productType = useSelector(
    (state) => state.fetchAddProductDetails.productType.ProductType
  );
  const packagingDetails = useSelector(
    (state) => state.fetchVPDetails.productPackage.ProductPackage
  );

  useEffect(() => {
    for (let i = 0; i < productType?.data?.length; i++) {
      if (productType?.data[i]?.["lookup_code"] == "PACKAGING") {
        setPackagingId(productType.data[i]?.["id"])
      }
    }
  }, [productType]);

  useEffect(() => {
    dispatch(getPackagingMaterial(packaging_id));
  }, [packaging_id])

  useEffect(() => {
    //cantegory details
    dispatch(getParentCategoryDetails());
    dispatch(getProductTypeDetails());
    dispatch(getStdProductTypeDetails());
    dispatch(getConditionDetails());
    dispatch(getBaseUOMDetails());
    dispatch(getParentCategoryDetails());
    //dispatch(getPackagingMaterial());
    dispatch(getVendor({ limit: 10, offset: 1 }));

  }, []);



  useEffect(() => {
    dispatch(getProductTypeDetails());
    if (id) {
      dispatch(getproductData(id));
      dispatch(PricingData(id));
      dispatch(PurchaseReturns(id));
      dispatch(SalesReturnsData(id));
      dispatch(SalesHistoryData(id));
      dispatch(ProductBundleData(id));

    } else {
      const tempid = location.pathname.split("/")[3];
      dispatch(getproductData(tempid));
      dispatch(PricingData(tempid));
      dispatch(PurchaseReturns(tempid));
      dispatch(SalesReturnsData(tempid));
      dispatch(SalesHistoryData(tempid));
      dispatch(ProductBundleData(tempid));
    }
    // dispatch(searchCurrency(""));
    // dispatch(getBrandDetails(""));
    // dispatch(getParentCategoryDetails());
  }, [location.state]);

  useEffect(() => {
    setBrand(
      productApiData && productApiData.brand
        ? productApiData.brand.brand_name
        : ""
    );
    if (indicateFirst) {
      setProductData(productApiData ? productApiData : []);
      let fakeActiveArray = [];
      let tempVarDetArr = [];
      productApiData &&
        productApiData.product_variant_ids &&
        productApiData.product_variant_ids.map((variant, index) => {
          fakeActiveArray.push(false);

          tempVarDetArr[index] = variant;
        });
      fakeActiveArray[0] = true;
      setVariantDetailsArr(tempVarDetArr);
      setTabActive(fakeActiveArray);
    } else {
      setProductData(productApiData ? productApiData : []);
      let fakeActiveArray = [];
      let tempVarDetArr = [];
      productApiData &&
        productApiData.product_variant_ids &&
        productApiData.product_variant_ids.map((variant, index) => {
          tempVarDetArr[index] = variant;
        });
      fakeActiveArray[varientTabNo] = true;
      setVariantDetailsArr(tempVarDetArr);
      setTabActive(fakeActiveArray);
    }
  }, [productApiData]);

  useEffect(() => {
    if (location?.pathname.split("/")[3]) {
      setIndicateFirst(false);
      dispatch(getproductData(location?.pathname.split("/")[3]));
    }
  }, [varientTabNo, activeTab]);

  const selectTab = (selectedTab) => {
    setActiveTab(selectedTab);
  };


  const [fields, updateFields] = useState({
    "Variant Product Name": "Admin",
    "Variant SKU id": "admin@example.com",
    "Parent SKU id": "012345678",
    "Variant type": "24",
    "Currency type": "Admin",
    "Variant Selling Price": "admin@example.com",
    "Variant Barcode Number": "012345678",
    "Variant Cost": "24",
  });

  const TABLE_DUMMY_DATA_SHIPPING = {
    header: [
      "Shipping Partners Name",
      "Packing Lead Time",
      "Shipping Lead Time",
    ],
    data:
      variantDetailsArr &&
      variantDetailsArr[varientTabNo] &&
      variantDetailsArr[varientTabNo]["shipping_partner_ids"],
  };

  const TABLE_DUMMY_DATA_VENDOR = {
    header: [
      "Vendor Name",
      "Product",
      "Vendor SKU ID",
      "Minimum Ordering Quantity",
      "Vendor Price List",
      "Shipping Type",
    ],
    data:
      variantDetailsArr &&
      variantDetailsArr[varientTabNo] &&
      variantDetailsArr[varientTabNo]["seller_ids"],
  };

  const MAP =
    "https://media.istockphoto.com/vectors/city-map-navigation-gps-navigator-distance-point-marker-icon-top-view-vector-id1151971345";


  return (
    <>
      {productData && (
        <Box className="productDetails_main">
          <Box className="product_detail_menu_card">
            <Box className="header_action">
              <h3 className="headerText">
                {productData && productData.product_name}
              </h3>
              <Box className="actionButtonBlock">
              </Box>
            </Box>
            <Box className="product_tags">
              {productData && productData.sku_code && (
                <label className="product_tag">{productData.sku_code}</label>
              )}
              {productData && productData.primary_category && (
                <label className="product_tag">
                  {productData.primary_category.name}
                </label>
              )}
              {productData && productData.category_id && (
                <label className="product_tag">{productData.category_id}</label>
              )}
            </Box>
            <Box className="product_varients_block">
              <Box className="product_varient_block_header">
                <label className="product_varient_header_text">Varients</label>
              </Box>
              <Box className="product_varient_cards" id="style-4">
                {productData &&
                  productData.product_variant_ids &&
                  productData.product_variant_ids.map(
                    (productVarient, index) => {
                      return (
                        <ProductVarient
                          productVarient={productVarient}
                          varientTabNo={index}
                          setVarientTabNo={setVarientTabNo}
                          tabActive={tabActive}
                          setTabActive={setTabActive}
                          title={
                            productVarient.product_name &&
                            productVarient.product_name
                          }
                          productImage={
                            productVarient && productVarient.image_options
                          }
                        />
                      );
                    }
                  )}
              </Box>
            </Box>

            <Box className="product_details_menu">
              <Button
                sx={{
                  background: activeTab === "Omnichannel" ? "#f2f5fe" : "#fff",
                }}
                onClick={() => {
                  selectTab("Omnichannel");
                }}
              >
                Omnichannel
              </Button>
              <Button
                onClick={() => {
                  selectTab("Variant");
                }}
                sx={{
                  background: activeTab === "Variant" ? "#f2f5fe" : "#fff",
                }}
              >
                Varient Detail
              </Button>
              <Button
                sx={{
                  background: activeTab === "Inventory" ? "#f2f5fe" : "#fff",
                }}
                onClick={() => selectTab("Inventory")}
              >
                Inventory
              </Button>
              <Button
                sx={{
                  background: activeTab === "Pricing" ? "#f2f5fe" : "#fff",
                }}
                onClick={() => selectTab("Pricing")}
              >
                Pricing
              </Button>
              <Button
                sx={{
                  background: activeTab === "Bundles" ? "#f2f5fe" : "#fff",
                }}
                onClick={() => selectTab("Bundles")}
              >
                Bundles
              </Button>
              <Button
                sx={{
                  background: activeTab === "Accounting" ? "#f2f5fe" : "#fff",
                }}
                style={{ display: "none" }}
                onClick={() => selectTab("Accounting")}
              >
                Accounting
              </Button>
              <Button
                sx={{
                  background:
                    activeTab === "Review and Ratings" ? "#f2f5fe" : "#fff",
                }}
                onClick={() => selectTab("Review and Ratings")}
              >
                Review and Ratings
              </Button>
            </Box>
          </Box>

          {/* Product Detail Card */}
          <Box>
            {activeTab && activeTab === "Omnichannel" ? (
              <OmnichannelMain fields={variantDetailsArr && variantDetailsArr[varientTabNo]} updateFields={updateFields} />
            ) : activeTab === "Variant" ? (
              <>
                <VariantDetailsCard
                  fields={variantDetailsArr && variantDetailsArr[varientTabNo]}
                  prod_id={id}
                  updateFields={updateFields}
                  edit={edit}
                />
                <ExtraVariantDetailsCard
                  fields={variantDetailsArr && variantDetailsArr[varientTabNo]}
                  prod_id={id}
                  updateFields={updateFields}
                  cardTitle={"Extra Varient Information"}
                  edit={edit}
                  parentBrand={brand}
                />
                <CategoryDetailsCard
                  fields={variantDetailsArr && variantDetailsArr[varientTabNo]}
                  prod_id={id}
                  updateFields={updateFields}
                  cardTitle={"Category Details"}
                  edit={edit}
                />
                {variantDetailsArr &&
                  variantDetailsArr[varientTabNo] &&
                  variantDetailsArr[varientTabNo]["image_options"] && (
                    <ProductImage
                      var_id={
                        variantDetailsArr &&
                        variantDetailsArr[varientTabNo] &&
                        variantDetailsArr[varientTabNo]["id"]
                      }
                      resultimages={
                        variantDetailsArr &&
                          variantDetailsArr[varientTabNo] &&
                          variantDetailsArr[varientTabNo]["image_options"]
                          ? variantDetailsArr[varientTabNo]["image_options"]
                          : []
                      }
                    />
                  )}
                <PackageDetailsCard
                  fields={variantDetailsArr && variantDetailsArr[varientTabNo]}
                  prod_id={id}
                  updateFields={updateFields}
                  cardTitle={"Packaging Details"}
                  edit={edit}
                  packagingDetails={packagingDetails}
                />
                {variantDetailsArr &&
                  variantDetailsArr[varientTabNo] &&
                  variantDetailsArr[varientTabNo]["keyword"] ? (
                  <KeywordGenerator />
                ) : (
                  <></>
                )}
                <VendorDetails
                  fields={variantDetailsArr && variantDetailsArr[varientTabNo]}
                  prod_id={id}
                  updateFields={updateFields}
                  edit={edit}
                />

                <CostDetails
                  fields={variantDetailsArr && variantDetailsArr[varientTabNo]}
                  prod_id={id}
                  updateFields={updateFields}
                  edit={edit}
                />

                <ForecastDetails
                  fields={variantDetailsArr && variantDetailsArr[varientTabNo]}
                  prod_id={id}
                  updateFields={updateFields}
                  edit={edit}
                />
              </>
            ) : activeTab === "Inventory" ? (
              <>
                {/* <InventoryDetails /> */}
                <InventoryViewData/>
               {/*  <SalesHistory />
                <SalesReturns />
                <PurchaseHistory /> */}
              </>
            ) : activeTab === "Accounting" ? (
              <>
                <Accounting />
              </>
            ) : activeTab === "Review and Ratings" ? (
              <>
                <ReviewAndRatings />
              </>
            ) : activeTab === "Pricing" ? (
              <>
                <PricingViewData />
              </>
            ) : activeTab === "Bundles" ? (
              <>
                <ProductBundleDataTable />
              </>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      )}
    </>
  );
}

export default ProductView;















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