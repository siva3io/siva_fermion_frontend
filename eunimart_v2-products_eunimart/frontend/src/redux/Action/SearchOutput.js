import * as types from "./ActionType";
import axios from "axios";
import { searchConfig } from "../../Services/ProductListApi";

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

export const fetchSearchProduct = (searchValue, type) => {
  return (dispatch) => {
    if (type === "custom") {
      dispatch(customProductsRequest);
    } else {
      dispatch(searchProductRequest);
    }
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