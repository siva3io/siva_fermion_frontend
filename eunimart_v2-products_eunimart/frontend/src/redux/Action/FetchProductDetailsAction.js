import * as types from "./ActionType";
import axios from "axios";
import {
  brandConfig,
  brandCreateConfig,
  brandDeleteConfig,
  brandUpdataConfig,
  conditionConfig,
  productTypeConfig,
  stdProductTypeConfig,
  procurementConfig,
  routesConfig,
  inventoryConfig,
  baseUOMConfig,
  //
  parentCategoryConfig,
  categoryConfig,
  createProductConfig,
  updateProductConfig,
  deleteProductConfig,
  favouriteProductConfig,
} from "../../Services/ProductDetailsApi";
import { toast } from "react-toastify";
// BRAND
export const fetchBrandRequest = () => {
  return {
    type: types.FETCH_BRAND_REQUEST,
  };
};

export const fetchBrandSuccess = (brands) => {
  return {
    type: types.FETCH_BRAND_SUCCESS,
    payload: brands,
  };
};

export const fetchBrandFailure = (error) => {
  return {
    type: types.FETCH_BRAND_FAILURE,
    payload: error,
  };
};

export const getBrandDetails = (brand_search) => {
  return (dispatch) => {
    dispatch(fetchBrandRequest);
    axios(brandConfig(brand_search))
      .then((response) => {
        const brands = response.data;
        dispatch(fetchBrandSuccess(brands));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchBrandFailure(errorMsg));
      });
  };
};

//Brand create
export const createBrandRequest = () => {
  return {
    type: types.CREATE_BRAND_REQUEST,
  };
};

export const createBrandSuccess = (brands) => {
  return {
    type: types.CREATE_BRAND_SUCCESS,
    payload: brands,
  };
};

export const createBrandFailure = (error) => {
  return {
    type: types.CREATE_BRAND_FAILURE,
    payload: error,
  };
};

export const createBrandDetails = (brandName) => {
  return (dispatch) => {
    dispatch(createBrandRequest);
    axios(brandCreateConfig(brandName))
      .then((response) => {
        const brand = response.data;
        dispatch(createBrandSuccess(brand));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(createBrandFailure(errorMsg));
      });
  };
};

//Brand delete
export const deleteBrandRequest = () => {
  return {
    type: types.DELETE_BRAND_REQUEST,
  };
};

export const deleteBrandSuccess = (brands) => {
  return {
    type: types.DELETE_BRAND_SUCCESS,
    payload: brands,
  };
};

export const deleteBrandFailure = (error) => {
  return {
    type: types.DELETE_BRAND_FAILURE,
    payload: error,
  };
};

export const deleteBrandDetails = (brandId) => {
  return (dispatch) => {
    dispatch(deleteBrandRequest);
    axios(brandDeleteConfig(brandId))
      .then((response) => {
        if (response.data.meta.success === true) {
          toast.success("Brand Deleted", {
            toastId: "Brand Deleted",
            autoClose: 2000,
          });
          dispatch(deleteBrandSuccess(response.data));
        } else {
          toast.error(response.meta.message, {
            toastId: "Brand not Deleted !",
            autoClose: 1000,
          });
          dispatch(deleteBrandFailure(response.meta.message));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(deleteBrandFailure(errorMsg));
      });
  };
};

//Brand update
export const updateBrandRequest = () => {
  return {
    type: types.UPDATE_BRAND_REQUEST,
  };
};

export const updateBrandSuccess = (brands) => {
  return {
    type: types.UPDATE_BRAND_SUCCESS,
    payload: brands,
  };
};

export const updateBrandFailure = (error) => {
  return {
    type: types.UPDATE_BRAND_FAILURE,
    payload: error,
  };
};

export const updateBrandDetails = (brandName, brandId) => {
  return (dispatch) => {
    dispatch(updateBrandRequest);
    axios(brandUpdataConfig(brandName, brandId))
      .then((response) => {
        if (response.data.meta.success === true) {
          toast.success("Brand Updated", {
            toastId: "Brand Updated",
            autoClose: 2000,
          });
          dispatch(updateBrandSuccess(response.data));
        } else {
          toast.error(response.meta.message, {
            toastId: "Brand not Updated !",
            autoClose: 1000,
          });
          dispatch(updateBrandFailure(response.meta.message));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(deleteBrandFailure(errorMsg));
      });
  };
};

// CONDITION
export const fetchConditionRequest = () => {
  return {
    type: types.FETCH_CONDITION_REQUEST,
  };
};

export const fetchConditionSuccess = (condition) => {
  return {
    type: types.FETCH_CONDITION_SUCCESS,
    payload: condition,
  };
};

export const fetchConditionFailure = (error) => {
  return {
    type: types.FETCH_CONDITION_FAILURE,
    payload: error,
  };
};

export const getConditionDetails = () => {
  return (dispatch) => {
    dispatch(fetchConditionRequest);
    axios(conditionConfig())
      .then((response) => {
        const condition = response.data;
        dispatch(fetchConditionSuccess(condition));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchConditionFailure(errorMsg));
      });
  };
};

// Product Type
export const fetchProductTypeRequest = () => {
  return {
    type: types.FETCH_PRODUCTTYPE_REQUEST,
  };
};

export const fetchProductTypeSuccess = (productType) => {
  return {
    type: types.FETCH_PRODUCTTYPE_SUCCESS,
    payload: productType,
  };
};

export const fetchProductTypeFailure = (error) => {
  return {
    type: types.FETCH_PRODUCTTYPE_FAILURE,
    payload: error,
  };
};

export const getProductTypeDetails = () => {
  return (dispatch) => {
    dispatch(fetchProductTypeRequest);
    axios(productTypeConfig())
      .then((response) => {
        const productType = response.data;
        dispatch(fetchProductTypeSuccess(productType));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchProductTypeFailure(errorMsg));
      });
  };
};

// Standard Product Type
export const fetchStdProductTypeRequest = () => {
  return {
    type: types.FETCH_STDPRODUCTTYPE_REQUEST,
  };
};

export const fetchStdProductTypeSuccess = (stdProductType) => {
  return {
    type: types.FETCH_STDPRODUCTTYPE_SUCCESS,
    payload: stdProductType,
  };
};

export const fetchStdProductTypeFailure = (error) => {
  return {
    type: types.FETCH_STDPRODUCTTYPE_FAILURE,
    payload: error,
  };
};

export const getStdProductTypeDetails = () => {
  return (dispatch) => {
    dispatch(fetchStdProductTypeRequest);
    axios(stdProductTypeConfig())
      .then((response) => {
        const stdProductType = response.data;
        dispatch(fetchStdProductTypeSuccess(stdProductType));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchStdProductTypeFailure(errorMsg));
      });
  };
};

// Procurement
export const fetchProcurementRequest = () => {
  return {
    type: types.FETCH_PROCUREMENT_REQUEST,
  };
};

export const fetchProcurementSuccess = (procurement) => {
  return {
    type: types.FETCH_PROCUREMENT_SUCCESS,
    payload: procurement,
  };
};

export const fetchProcurementFailure = (error) => {
  return {
    type: types.FETCH_PROCUREMENT_FAILURE,
    payload: error,
  };
};

export const getProcurementDetails = () => {
  return (dispatch) => {
    dispatch(fetchProcurementRequest);
    axios(procurementConfig())
      .then((response) => {
        const procurement = response.data;
        dispatch(fetchProcurementSuccess(procurement));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchProcurementFailure(errorMsg));
      });
  };
};

// ROUTES

export const fetchRoutesRequest = () => {
  return {
    type: types.FETCH_ROUTES_REQUEST,
  };
};

export const fetchRoutesSuccess = (routes) => {
  return {
    type: types.FETCH_ROUTES_SUCCESS,
    payload: routes,
  };
};

export const fetchRoutesFailure = (error) => {
  return {
    type: types.FETCH_ROUTES_FAILURE,
    payload: error,
  };
};

export const getRoutesDetails = () => {
  return (dispatch) => {
    dispatch(fetchRoutesRequest);
    axios(routesConfig)
      .then((response) => {
        const routes = response.data;
        dispatch(fetchRoutesSuccess(routes));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchRoutesFailure(errorMsg));
      });
  };
};

//inventory tracking

export const fetchInventoryTrackingRequest = () => {
  return {
    type: types.FETCH_INVENTORY_REQUEST,
  };
};

export const fetchInventoryTrackingSuccess = (inventory_tracking) => {
  return {
    type: types.FETCH_INVENTORY_SUCCESS,
    payload: inventory_tracking,
  };
};

export const fetchInventoryTrackingFailure = (error) => {
  return {
    type: types.FETCH_INVENTORY_FAILURE,
    payload: error,
  };
};

export const getInventoryTrackingDetails = () => {
  return (dispatch) => {
    dispatch(fetchInventoryTrackingRequest);
    axios(inventoryConfig())
      .then((response) => {
        const routes = response.data;
        dispatch(fetchInventoryTrackingSuccess(routes));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchInventoryTrackingFailure(errorMsg));
      });
  };
};

//baseUOM

export const fetchBaseUOMRequest = () => {
  return {
    type: types.FETCH_BASEUOM_REQUEST,
  };
};

export const fetchBaseUOMSuccess = (baseUOM) => {
  return {
    type: types.FETCH_BASEUOM_SUCCESS,
    payload: baseUOM,
  };
};

export const fetchBaseUOMFailure = (error) => {
  return {
    type: types.FETCH_BASEUOM_FAILURE,
    payload: error,
  };
};

export const getBaseUOMDetails = () => {
  return (dispatch) => {
    dispatch(fetchBaseUOMRequest);
    axios(baseUOMConfig())
      .then((response) => {
        const baseUOM = response.data;
        dispatch(fetchBaseUOMSuccess(baseUOM));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchBaseUOMFailure(errorMsg));
      });
  };
};
// Parent Category

export const fetchParentCategoryRequest = () => {
  return {
    type: types.FETCH_PARENT_CATEGORY_REQUEST,
  };
};

export const fetchParentCategorySuccess = (category) => {
  return {
    type: types.FETCH_PARENT_CATEGORY_SUCCESS,
    payload: category,
  };
};

export const fetchParentCategoryFailure = (error) => {
  return {
    type: types.FETCH_PARENT_CATEGORY_FAILURE,
    payload: error,
  };
};

export const getParentCategoryDetails = () => {
  return (dispatch) => {
    dispatch(fetchParentCategoryRequest);
    axios(parentCategoryConfig)
      .then((response) => {
        const parentCategory = response.data;
        dispatch(fetchParentCategorySuccess(parentCategory));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchParentCategoryFailure(errorMsg));
      });
  };
};

// Category

export const fetchCategoryRequest = () => {
  return {
    type: types.FETCH_CATEGORY_REQUEST,
  };
};

export const fetchCategorySuccess = (category) => {
  return {
    type: types.FETCH_CATEGORY_SUCCESS,
    payload: category,
  };
};

export const fetchCategoryFailure = (error) => {
  return {
    type: types.FETCH_CATEGORY_FAILURE,
    payload: error,
  };
};

export const getCategoryDetails = (leafCatId) => {
  return (dispatch) => {
    dispatch(fetchCategoryRequest);
    axios(categoryConfig(leafCatId))
      .then((response) => {
        const category = response.data.result;
        dispatch(fetchCategorySuccess(category));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchCategoryFailure(errorMsg));
      });
  };
};

//POST

export const createProductRequest = () => {
  return {
    type: types.CREATE_PRODUCT_REQUEST,
  };
};

export const createProductSuccess = (createProductResponse) => {
  return {
    type: types.CREATE_PRODUCT_SUCCESS,
    payload: createProductResponse,
  };
};

export const createProductFailure = (error) => {
  return {
    type: types.CREATE_PRODUCT_FAILURE,
    payload: error,
  };
};

export const postCreateProduct = (data) => {
  return (dispatch) => {
    dispatch(createProductRequest);
    axios(createProductConfig(data))
      .then((response) => {
        if (response.data.meta.success === true) {
          toast.success("Product Created", {
            toastId: "Product Created Successfully !",
            autoClose: 2000,
          });
          dispatch(createProductSuccess(response.data));
        } else {
          toast.error("Product not Created", {
            toastId: "Product not Created !",
            autoClose: 1000,
          });
          dispatch(createProductFailure(response.meta.message));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        toast(error.message);
        dispatch(createProductFailure(errorMsg));
        // dispatch(fetchCategoryFailure(errorMsg));
      });
  };
};

export const postUpdateProduct = (data, id) => {
  return (dispatch) => {
    // dispatch(createProductRequest);
    axios(updateProductConfig(data, id))
      .then((response) => {
        if (response.data.meta.success === true) {
          toast.success("Product Updated", {
            toastId: "Product Updated Successfully !",
            autoClose: 2000,
          });
          // dispatch(createProductSuccess(response.data));
        } else {
          toast.error("Product not Updated", {
            toastId: "Product not Updated !",
            autoClose: 1000,
          });
          // dispatch(createProductFailure(response.meta.message));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        toast(error.message);
        // dispatch(createProductFailure(errorMsg));
        // dispatch(fetchCategoryFailure(errorMsg));
      });
  };
};

//Delete Product

// export const deleteProductRequest = () => {
//   return {
//     type: types.DELETE_PRODUCT_REQUEST,
//   };
// };

// export const deleteProductSuccess = (deleteProductResponse) => {
//   return {
//     type: types.DELETE_PRODUCT_SUCCESS,
//     payload: deleteProductResponse,
//   };
// };

// export const deleteProductFailure = (error) => {
//   return {
//     type: types.DELETE_PRODUCT_FAILURE,
//     payload: error,
//   };
// };

// export const postDeleteProduct = (prod_id) => {
//   return (dispatch) => {
//     dispatch(deleteProductRequest);
//     axios(deleteProductConfig(prod_id))
//       .then((response) => {
//         if (typeof response.data.result === "boolean") {
//           toast.success("Product Deleted", {
//             toastId: "Product Deleted Successfully !",
//             autoClose: 1000,
//           });
//           dispatch(deleteProductSuccess(response.data.id));
//         } else {
//           toast.error("Product not Deleted", {
//             toastId: "Product not Deleted !",
//             autoClose: 1000,
//           });
//           dispatch(deleteProductFailure(response.data.result));
//         }
//       })
//       .catch((error) => {
//         const errorMsg = error.message;
//         toast(error.message);
//         dispatch(deleteProductFailure(errorMsg));
//         // dispatch(fetchCategoryFailure(errorMsg));
//       });
//   };
// };

// //Favourite Product

// export const favouriteProductRequest = () => {
//   return {
//     type: types.FAVOURITE_PRODUCT_REQUEST,
//   };
// };

// export const favouriteProductSuccess = (favouriteProductResponse) => {
//   return {
//     type: types.FAVOURITE_PRODUCT_SUCCESS,
//     payload: favouriteProductResponse,
//   };
// };

// export const favouriteProductFailure = (error) => {
//   return {
//     type: types.FAVOURITE_PRODUCT_FAILURE,
//     payload: error,
//   };
// };

// export const postfavouriteProduct = (prod_id) => {
//   return (dispatch) => {
//     dispatch(favouriteProductRequest);
//     axios(favouriteProductConfig(prod_id))
//       .then((response) => {
//         if (typeof response.data.result === "boolean") {
//           toast.success("Product Added to Favourites", {
//             toastId: "Product Added to Favourites !",
//             autoClose: 1000,
//           });
//           dispatch(favouriteProductSuccess(response.data.id));
//         } else {
//           toast.error("Product not Deleted", {
//             toastId: "Product not Deleted !",
//             autoClose: 1000,
//           });
//           dispatch(favouriteProductFailure(response.data.result));
//         }
//       })
//       .catch((error) => {
//         const errorMsg = error.message;
//         toast(error.message);
//         dispatch(favouriteProductFailure(errorMsg));
//         // dispatch(fetchCategoryFailure(errorMsg));
//       });
//   };
// };

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