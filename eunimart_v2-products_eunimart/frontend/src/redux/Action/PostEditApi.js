import * as types from "./ActionType";
import axios from "axios";
import {
  editConfig,
  editVariantImagesConfig,
} from "../../Services/ProductEditApi";
import { toast } from "react-toastify";

export const editProductVariantRequest = () => {
  return {
    type: types.EDIT_PRODUCT_REQUEST,
  };
};

export const editProductVariantSuccess = (products) => {
  return {
    type: types.EDIT_PRODUCT_SUCCESS,
    payload: products,
  };
};

export const editProductVariantFailure = (error) => {
  return {
    type: types.EDIT_PRODUCT_FAILURE,
    payload: error,
  };
};

export const editProductVariant = (payload, prod_id) => {
  return (dispatch) => {
    dispatch(editProductVariantRequest);
    axios(editConfig(payload, prod_id))
      .then((response) => {
        if (response.data.meta.success) {
          toast.success(response.data.meta.message);
        } else {
          toast.error(response.data.meta.message);
        }
        const products = response.data;
        dispatch(editProductVariantSuccess(products));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(editProductVariantFailure(errorMsg));
      });
  };
};

//image edit and update

export const editVariantImagesRequest = () => {
  return {
    type: types.EDIT_VARIANT_IMAGES_REQUEST,
  };
};

export const editVariantImagesSuccess = (products) => {
  return {
    type: types.EDIT_VARIANT_IMAGES_SUCCESS,
    payload: products,
  };
};

export const editVariantImagesFailure = (error) => {
  return {
    type: types.EDIT_VARIANT_IMAGES_FAILURE,
    payload: error,
  };
};

export const editVariantImages = (payload, var_id) => {
  return (dispatch) => {
    dispatch(editVariantImagesRequest);

    axios(editVariantImagesConfig(payload, var_id))
      .then((response) => {
        const images = response.data;
        if (response.data.meta.success) {
          toast.success(response.data.meta.message);
        } else {
          toast.error(response.data.meta.message);
        }
        dispatch(editVariantImagesSuccess(images));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(editVariantImagesFailure(errorMsg));
      });
  };
};


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