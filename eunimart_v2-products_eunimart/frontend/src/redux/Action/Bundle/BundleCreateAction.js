import * as types from "./ActionType";
import axios from "axios";
import {
  createBundleConfig,
  updateBundleConfig,
} from "../../../Services/Bundle/BundleCreate";
import { toast } from "react-toastify";

export const createProductRequest = () => {
  return {
    type: types.CREATE_PRODUCTBUNDLE_REQUEST,
  };
};

export const createProductSuccess = (createProductResponse) => {
  return {
    type: types.CREATE_PRODUCTBUNDLE_SUCCESS,
    payload: createProductResponse,
  };
};

export const createProductFailure = (error) => {
  return {
    type: types.CREATE_PRODUCTBUNDLE_FAILURE,
    payload: error,
  };
};

export const postCreateProductBundle = (data) => {
  return (dispatch) => {
    dispatch(createProductRequest);
    axios(createBundleConfig(data))
      .then((response) => {
        if (response.data.meta.success === true) {
          toast.success("Product Bundle Created", {
            toastId: "Product Created Successfully !",
            autoClose: 2000,
          });
          dispatch(createProductSuccess(response.data));
        } else {
          toast.error("Product Bundle not Created", {
            toastId: "Product Bundle not Created !",
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

export const updateProductRequest = () => {
  return {
    type: types.UPDATE_PRODUCTBUNDLE_REQUEST,
  };
};

export const updateProductSuccess = (createProductResponse) => {
  return {
    type: types.UPDATE_PRODUCTBUNDLE_SUCCESS,
    payload: createProductResponse,
  };
};

export const updateProductFailure = (error) => {
  return {
    type: types.UPDATE_PRODUCTBUNDLE_FAILURE,
    payload: error,
  };
};

export const postUpdateProductBundle = (data, id) => {
  return (dispatch) => {
    dispatch(updateProductRequest);
    axios(updateBundleConfig(data, id))
      .then((response) => {
        if (response.data.meta.success === true) {
          toast.success("Product Bundle Updated", {
            toastId: "Product Updated Successfully !",
            autoClose: 2000,
          });
          dispatch(updateProductSuccess(response.data));
        } else {
          toast.error("Product Bundle not Updated", {
            toastId: "Product Bundle not Updated !",
            autoClose: 1000,
          });
          dispatch(updateProductFailure(response.meta.message));
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