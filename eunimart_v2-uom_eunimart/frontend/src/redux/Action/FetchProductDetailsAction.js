import * as types from "./ActionType";
import axios from "axios";
import {
  itemTypeConfig,
  classCodeConfig,
  classBaseConfig,
  conversionConfig,
  createUOMConfig,
  createUOMClassConfig,
} from "../../Services/ProductDetailsApi";
import { toast } from "react-toastify";

// Item Type
export const fetchItemTypeRequest = () => {
  return {
    type: types.FETCH_ITEMTYPE_REQUEST,
  };
};

export const fetchItemTypeSuccess = (ItemTypes) => {
  return {
    type: types.FETCH_ITEMTYPE_SUCCESS,
    payload: ItemTypes,
  };
};

export const fetchItemTypeFailure = (error) => {
  return {
    type: types.FETCH_ITEMTYPE_FAILURE,
    payload: error,
  };
};

export const getItemTypeDetails = () => {
  return (dispatch) => {
    dispatch(fetchItemTypeRequest);
    axios(itemTypeConfig)
      .then((response) => {
        const itemTypes = response.data;
        dispatch(fetchItemTypeSuccess(itemTypes));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchItemTypeFailure(errorMsg));
      });
  };
};

// Class Code
export const fetchClassCodeRequest = () => {
  return {
    type: types.FETCH_CLASSCODE_REQUEST,
  };
};

export const fetchClassCodeSuccess = (ItemTypes) => {
  return {
    type: types.FETCH_CLASSCODE_SUCCESS,
    payload: ItemTypes,
  };
};

export const fetchClassCodeFailure = (error) => {
  return {
    type: types.FETCH_CLASSCODE_FAILURE,
    payload: error,
  };
};

export const getClassCodeDetails = () => {
  return (dispatch) => {
    dispatch(fetchClassCodeRequest);
    axios(classCodeConfig)
      .then((response) => {
        const classCode = response.data;
        dispatch(fetchClassCodeSuccess(classCode));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchClassCodeFailure(errorMsg));
      });
  };
};

// Class Name Base UOM
export const fetchClassBaseRequest = () => {
  return {
    type: types.FETCH_CLASSBASE_REQUEST,
  };
};

export const fetchClassBaseSuccess = (ItemTypes) => {
  return {
    type: types.FETCH_CLASSBASE_SUCCESS,
    payload: ItemTypes,
  };
};

export const fetchClassBaseFailure = (error) => {
  return {
    type: types.FETCH_CLASSBASE_FAILURE,
    payload: error,
  };
};

export const getClassBaseDetails = (params) => {
  return (dispatch) => {
    dispatch(fetchClassBaseRequest);
    axios(classBaseConfig(params))
      .then((response) => {
        const classBase = response.data;
        dispatch(fetchClassBaseSuccess(classBase));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchClassBaseFailure(errorMsg));
      });
  };
};
// Conversion type
export const fetchConversionTypeRequest = () => {
  return {
    type: types.FETCH_CONVERSIONTYPE_REQUEST,
  };
};

export const fetchConversionTypeSuccess = (ItemTypes) => {
  return {
    type: types.FETCH_CONVERSIONTYPE_SUCCESS,
    payload: ItemTypes,
  };
};

export const fetchConversionTypeFailure = (error) => {
  return {
    type: types.FETCH_CONVERSIONTYPE_FAILURE,
    payload: error,
  };
};

export const getConversionTypeDetails = () => {
  return (dispatch) => {
    dispatch(fetchConversionTypeRequest);
    axios(conversionConfig)
      .then((response) => {
        const conversionType = response.data;
        dispatch(fetchConversionTypeSuccess(conversionType));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchConversionTypeFailure(errorMsg));
      });
  };
};

//POST

export const createUOMRequest = () => {
  return {
    type: types.CREATE_UOM_REQUEST,
  };
};

export const createUOMSuccess = (createUOMResponse) => {
  return {
    type: types.CREATE_UOM_SUCCESS,
    payload: createUOMResponse,
  };
};

export const createUOMFailure = (error) => {
  return {
    type: types.CREATE_UOM_FAILURE,
    payload: error,
  };
};

export const postCreateUOM = (data) => {
  return (dispatch) => {
    dispatch(createUOMRequest);
    axios(createUOMConfig(data))
      .then((response) => {
        if (response?.data?.meta?.success === true) {
          toast.success("UOM Created", {
            toastId: "UOM Created Successfully !",
            autoClose: 2000,
          });
          //   dispatch(createProductSuccess(response.data.result));
        } else {
          toast.error("UOM not Created", {
            toastId: "UOM not Created !",
            autoClose: 1000,
          });
          // dispatch(createProductFailure(response.data.result));
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

export const createUOMClassRequest = () => {
  return {
    type: types.CREATE_UOMCLASS_REQUEST,
  };
};

export const createUOMClassSuccess = (createUOMClassResponse) => {
  return {
    type: types.CREATE_UOMCLASS_SUCCESS,
    payload: createUOMClassResponse,
  };
};

export const createUOMClassFailure = (error) => {
  return {
    type: types.CREATE_UOMCLASS_FAILURE,
    payload: error,
  };
};

export const postCreateUOMClass = (data) => {
  return (dispatch) => {
    dispatch(createUOMClassRequest);
    axios(createUOMClassConfig(data))
      .then((response) => {
        if (response.data.meta.success === true) {
          toast.success("UOM Class Created", {
            toastId: "UOM Class Created Successfully !",
            autoClose: 2000,
          });
          // dispatch(createProductSuccess(response.data.result));
        } else {
          toast.error("Uom Class not Created", {
            toastId: "Uom Class not Created !",
            autoClose: 1000,
          });
          // dispatch(createProductFailure(response.data.result));
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