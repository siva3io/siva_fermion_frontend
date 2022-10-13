import * as types from "./ActionType";
import axios from "axios";
import {
  deleteProductConfig,
  favouriteProductConfig,
  archiveProductConfig,
} from "../../Services/ProductDetailsApi";
import { toast } from "react-toastify";

//Delete Product

export const deleteProductRequest = () => {
  return {
    type: types.DELETE_PRODUCT_REQUEST,
  };
};

export const deleteProductSuccess = (deleteProductResponse) => {
  return {
    type: types.DELETE_PRODUCT_SUCCESS,
    payload: deleteProductResponse,
  };
};

export const deleteProductFailure = (error) => {
  return {
    type: types.DELETE_PRODUCT_FAILURE,
    payload: error,
  };
};

export const postDeleteProduct = (prod_id) => {
  return (dispatch) => {
    dispatch(deleteProductRequest);
    axios(deleteProductConfig(prod_id))
      .then((response) => {
        if (response.data.meta.success) {
          toast.success("Product Deleted", {
            toastId: "Product Deleted Successfully !",
            autoClose: 1000,
          });
          dispatch(deleteProductSuccess(response.data));
        } else {
          toast.error("Product not Deleted", {
            toastId: "Product not Deleted !",
            autoClose: 1000,
          });
          dispatch(deleteProductFailure(response.data));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        toast(error.message);
        dispatch(deleteProductFailure(errorMsg));
        // dispatch(fetchCategoryFailure(errorMsg));
      });
  };
};

//Favourite Product

export const favouriteProductRequest = () => {
  return {
    type: types.FAVOURITE_PRODUCT_REQUEST,
  };
};

export const favouriteProductSuccess = (favouriteProductResponse) => {
  return {
    type: types.FAVOURITE_PRODUCT_SUCCESS,
    payload: favouriteProductResponse,
  };
};

export const favouriteProductFailure = (error) => {
  return {
    type: types.FAVOURITE_PRODUCT_FAILURE,
    payload: error,
  };
};

export const postfavouriteProduct = (prod_id) => {
  return (dispatch) => {
    dispatch(favouriteProductRequest);
    axios(favouriteProductConfig(prod_id))
      .then((response) => {
        if (typeof response.data.meta.success) {
          toast.success("Product Added to Favourites", {
            toastId: "Product Added to Favourites !",
            autoClose: 1000,
          });
          dispatch(favouriteProductSuccess(response.data));
        } else {
          toast.error("Product not added to favourites", {
            toastId: "Product not added to favourites",
            autoClose: 1000,
          });
          dispatch(favouriteProductFailure(response.data));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        toast(error.message);
        dispatch(favouriteProductFailure(errorMsg));
        // dispatch(fetchCategoryFailure(errorMsg));
      });
  };
};

//Favourite Product

export const archiveProductRequest = () => {
  return {
    type: types.ARCHIVE_PRODUCT_REQUEST,
  };
};

export const archiveProductSuccess = (favouriteProductResponse) => {
  return {
    type: types.ARCHIVE_PRODUCT_SUCCESS,
    payload: favouriteProductResponse,
  };
};

export const archiveProductFailure = (error) => {
  return {
    type: types.ARCHIVE_PRODUCT_FAILURE,
    payload: error,
  };
};

export const postArchiveProduct = (prod_id) => {
  return (dispatch) => {
    dispatch(archiveProductRequest);
    axios(archiveProductConfig(prod_id))
      .then((response) => {
        if (typeof response.data.meta.success) {
          toast.success("Product Archived!", {
            toastId: "Product Archived!",
            autoClose: 1000,
          });
          dispatch(archiveProductSuccess(response.data));
        } else {
          toast.error("Product not archived", {
            toastId: "Product not archives",
            autoClose: 1000,
          });
          dispatch(archiveProductFailure(response.data));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        toast(error.message);
        dispatch(favouriteProductFailure(errorMsg));
        // dispatch(fetchCategoryFailure(errorMsg));
      });
  };
};





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