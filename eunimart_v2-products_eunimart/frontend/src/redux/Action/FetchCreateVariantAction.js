import * as types from "./ActionType";
import axios from "axios";
import {
  variantAttributeConfig,
  createVariantAttributeConfig,
  propertyAttributeConfig,
  createPropertyAttributeConfig,
  createVariantConfig,
  createVariantTableConfig,
  updateVariantConfig,
} from "../../Services/CreateVariantApi";
import { toast } from "react-toastify";

// Attribute
export const fetchAttributeRequest = () => {
  return {
    type: types.FETCH_ATTRIBUTE_REQUEST,
  };
};

export const fetchAttributeSuccess = (attributes) => {
  return {
    type: types.FETCH_ATTRIBUTE_SUCCESS,
    payload: attributes,
  };
};

export const fetchAttributeFailure = (error) => {
  return {
    type: types.FETCH_ATTRIBUTE_FAILURE,
    payload: error,
  };
};

export const getVariantAttribute = () => {
  return (dispatch) => {
    dispatch(fetchAttributeRequest);
    axios(variantAttributeConfig())
      .then((response) => {
        const attributes = response.data;
        dispatch(fetchAttributeSuccess(attributes));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchAttributeFailure(errorMsg));
      });
  };
};

// Attribute Create
export const createAttributeRequest = () => {
  return {
    type: types.CREATE_ATTRIBUTE_REQUEST,
  };
};

export const createAttributeSuccess = (attributes) => {
  return {
    type: types.CREATE_ATTRIBUTE_SUCCESS,
    payload: attributes,
  };
};

export const createAttributeFailure = (error) => {
  return {
    type: types.CREATE_ATTRIBUTE_FAILURE,
    payload: error,
  };
};

export const createVariantAttribute = (attributeName) => {
  return (dispatch) => {
    dispatch(createAttributeRequest);
    axios(createVariantAttributeConfig(attributeName))
      .then((response) => {
        const attribute = response.data.result;
        dispatch(createAttributeSuccess(attribute));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(createAttributeFailure(errorMsg));
      });
  };
};

// Property
export const fetchPropertyRequest = () => {
  return {
    type: types.FETCH_PROPERTY_REQUEST,
  };
};

export const fetchPropertySuccess = (properties) => {
  return {
    type: types.FETCH_PROPERTY_SUCCESS,
    payload: properties,
  };
};

export const fetchPropertyFailure = (error) => {
  return {
    type: types.FETCH_PROPERTY_FAILURE,
    payload: error,
  };
};

export const getPropertyAttribute = () => {
  return (dispatch) => {
    dispatch(fetchPropertyRequest);
    axios(propertyAttributeConfig())
      .then((response) => {
        const properties = response.data;
        dispatch(fetchPropertySuccess(properties));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchPropertyFailure(errorMsg));
      });
  };
};

// Create Property
export const createPropertyRequest = () => {
  return {
    type: types.CREATE_PROPERTY_REQUEST,
  };
};

export const createPropertySuccess = (property) => {
  return {
    type: types.CREATE_PROPERTY_SUCCESS,
    payload: property,
  };
};

export const createPropertyFailure = (error) => {
  return {
    type: types.CREATE_PROPERTY_FAILURE,
    payload: error,
  };
};

export const createPropertyAttribute = (newProperty, attr_id) => {
  return (dispatch) => {
    dispatch(createPropertyRequest);
    axios(createPropertyAttributeConfig(newProperty, attr_id))
      .then((response) => {
        const property = response.data.result;
        dispatch(createPropertySuccess(property));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(createPropertyFailure(errorMsg));
      });
  };
};

// Create Variant Table
export const createVariantRequest = () => {
  return {
    type: types.CREATE_VARIANT_REQUEST,
  };
};

export const createVariantSuccess = (property) => {
  return {
    type: types.CREATE_VARIANT_SUCCESS,
    payload: property,
  };
};

export const createVariantFailure = (error) => {
  return {
    type: types.CREATE_VARIANT_FAILURE,
    payload: error,
  };
};

export const createVariantTable = (attributesArr) => {
  return (dispatch) => {
    dispatch(createVariantRequest);
    axios(createVariantTableConfig(attributesArr))
      .then((response) => {
        const VariantTableRes = response.data;
        dispatch(createVariantSuccess(VariantTableRes));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(createVariantFailure(errorMsg));
      });
  };
};

export const postUpdateVariant = (data) => {
  return (dispatch) => {
    // dispatch(fetchCategoryRequest);
    axios(updateVariantConfig(data))
      .then((response) => {
        if (
          response.data &&
          response.data.result &&
          response.data.result.length > 0
        ) {
          toast.success("Variant Created", {
            toastId: "Variant Created Successfully !",
            autoClose: 2000,
          });
        } else {
          toast.error("Variant not Created");
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        toast(errorMsg);
        // dispatch(fetchCategoryFailure(errorMsg));
      });
  };
};
export const postCreateVariant = (data) => {
  return (dispatch) => {
    // dispatch(fetchCategoryRequest);
    axios(createVariantConfig(data))
      .then((response) => {
        if (typeof response.data.result === "object") {
          toast.success("Variant Created", {
            toastId: "Variant Created Successfully !",
            autoClose: 2000,
          });
        } else {
          toast.error("Variant not Created");
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        toast(errorMsg);
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