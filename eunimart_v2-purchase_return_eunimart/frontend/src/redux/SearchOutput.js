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

export const customUOMRequest = () => {
  return {
    type: types.FETCH_CUSTOM_REQUEST,
  };
};

export const customUOMSuccess = (uom) => {
  return {
    type: types.FETCH_CUSTOM_SUCCESS,
    payload: uom,
  };
};

export const customUOMFailure = (error) => {
  return {
    type: types.FETCH_CUSTOM_FAILURE,
    payload: error,
  };
};

export const fetchSearchProduct = (searchValue, type) => {
  return (dispatch) => {
    if (type === "custom") {
      dispatch(customUOMRequest);
    } else {
      dispatch(searchProductRequest);
    }

    axios(searchConfig(searchValue, type))
      .then((response) => {
        const products = response.data;
        if (type === "custom") {
          dispatch(customUOMSuccess(products));
        } else {
          dispatch(searchProductSuccess(products));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        if (type === "custom") {
          dispatch(customUOMFailure(errorMsg));
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