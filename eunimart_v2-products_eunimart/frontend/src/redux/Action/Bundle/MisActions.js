import * as types from "./ActionType";
import axios from "axios";
import {
  searchConfig,
  deleteConfig,
  archiveConfig,
} from "../../../Services/Bundle/BundleMisc";
import { statusCofig } from "../../../Services/Bundle/BundleLookups";
import { toast } from "react-toastify";

export const searchProductRequest = () => {
  return {
    type: types.FETCH_SEARCH_REQUEST,
  };
};

export const searchProductSuccess = (products) => {
  return {
    type: types.FETCH_SEARCH_SUCCESS,
    payload: products,
  };
};

export const searchProductFailure = (error) => {
  return {
    type: types.FETCH_SEARCH_FAILURE,
    payload: error,
  };
};

export const customProductsRequest = () => {
  return {
    type: types.FETCH_CUSTOM_REQUEST,
  };
};

export const customProductsSuccess = (products) => {
  return {
    type: types.FETCH_CUSTOM_SUCCESS,
    payload: products,
  };
};

export const customProductsFailure = (error) => {
  return {
    type: types.FETCH_CUSTOM_FAILURE,
    payload: error,
  };
};

export const fetchSearchBundle = (searchValue, type) => {
  return (dispatch) => {
    // if (type === "custom") {
    //   dispatch(customProductsRequest);
    // } else {
    //   dispatch(searchProductRequest);
    // }
    dispatch(searchProductRequest);
    axios(searchConfig(searchValue, type))
      .then((response) => {
        const products = response.data;
        if (type === "custom") {
          dispatch(customProductsSuccess(products));
        } else {
          dispatch(searchProductSuccess(products));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        if (type === "custom") {
          dispatch(customProductsFailure(errorMsg));
        } else {
          dispatch(searchProductFailure(errorMsg));
        }
      });
  };
};

//delete
export const deleteBundleRequest = () => {
  return {
    type: types.DELETE_BUNDLE_REQUEST,
  };
};

export const deleteBundleSuccess = (products) => {
  return {
    type: types.DELETE_BUNDLE_SUCCESS,
    payload: products,
  };
};

export const deleteBundleFailure = (error) => {
  return {
    type: types.DELETE_BUNDLE_FAILURE,
    payload: error,
  };
};

export const postDeleteProductBundle = (id) => {
  return (dispatch) => {
    dispatch(deleteBundleRequest);
    axios(deleteConfig(id))
      .then((response) => {
        if (response.data.meta.success === true) {
          toast.success("Bundle Deleted", {
            toastId: "Bundle Deleted Successfully !",
            autoClose: 2000,
          });
          dispatch(deleteBundleSuccess(response.data));
        } else {
          toast.error("Bundle not Deleted", {
            toastId: "Bundle not Deleted !",
            autoClose: 1000,
          });
          dispatch(deleteBundleFailure(response.meta.message));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(deleteBundleFailure(errorMsg));
      });
  };
};

//archive
export const archiveBundleRequest = () => {
  return {
    type: types.ARCHIVE_BUNDLE_REQUEST,
  };
};

export const archiveBundleSuccess = (products) => {
  return {
    type: types.ARCHIVE_BUNDLE_SUCCESS,
    payload: products,
  };
};

export const archiveBundleFailure = (error) => {
  return {
    type: types.ARCHIVE_BUNDLE_FAILURE,
    payload: error,
  };
};

export const postArchiveProductBundle = (id) => {
  return (dispatch) => {
    dispatch(archiveBundleRequest);
    axios(archiveConfig(id))
      .then((response) => {
        if (response.data.meta.success === true) {
          toast.success("Bundle Archived", {
            toastId: "Bundle Archived Successfully !",
            autoClose: 2000,
          });
          dispatch(archiveBundleSuccess(response.data));
        } else {
          toast.error("Bundle not Archived", {
            toastId: "Bundle not Archived !",
            autoClose: 1000,
          });
          dispatch(archiveBundleFailure(response.meta.message));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(archiveBundleFailure(errorMsg));
      });
  };
};

//status

export const fetchStatusRequest = () => {
  return {
    type: types.FETCH_STATUS_REQUEST,
  };
};

export const fetchStatusSuccess = (products) => {
  return {
    type: types.FETCH_STATUS_SUCCESS,
    payload: products,
  };
};

export const fetchStatusFailure = (error) => {
  return {
    type: types.FETCH_STATUS_FAILURE,
    payload: error,
  };
};

export const getStatusData = () => {
  return (dispatch) => {
    dispatch(fetchStatusRequest);
    axios(statusCofig())
      .then((response) => {
        const products = response.data;
        dispatch(fetchStatusSuccess(products));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchStatusFailure(errorMsg));
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