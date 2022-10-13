import * as types from "./ActionType";
import axios from "axios";
import { config } from "../../Services/ProductListApi";

export const SubmitProductRequest = () => {
  return {
    type: types.POST_PRODUCT_REQUEST,
    // listviewData,
  };
};

export const SubmitProductSuccess = (product) => {
  return {
    type: types.POST_PRODUCT_SUCCESS,
    payload: product,
  };
};

export const SubmitProductFailure = (error) => {
  return {
    type: types.POST_PRODUCT_FAILURE,
    payload: error,
  };
};

export const SubmitProduct = () => {
  return (dispatch) => {
    dispatch(SubmitProductRequest);
    axios(config)
      .then((response) => {
        const products = response.data.result;
        dispatch(SubmitProductSuccess(products));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(SubmitProductFailure(errorMsg));
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