import * as types from "./ActionType";
import axios from "axios";
import { productConfig } from "../../Services/ProductViewApi";

// Particular Product Data
export const fetchProductDataRequest = () => {
  return {
    type: types.FETCH_PRODUCT_REQUEST,
  };
};

export const fetchProductDataSuccess = (product) => {
  return {
    type: types.FETCH_PRODUCT_SUCCESS,
    payload: product,
  };
};

export const fetchProductDataFailure = (error) => {
  return {
    type: types.FETCH_PRODUCT_FAILURE,
    payload: error,
  };
};

export const getproductData = (id) => {
  return (dispatch) => {
    dispatch(fetchProductDataRequest);
    axios(productConfig(id))
      .then((response) => {
        const product = response.data;
        dispatch(fetchProductDataSuccess(product.data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchProductDataFailure(errorMsg));
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