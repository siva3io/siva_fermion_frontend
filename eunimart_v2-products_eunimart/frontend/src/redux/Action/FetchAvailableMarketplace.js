import * as types from "./ActionType";
import axios from "axios";
import { config, AvailableMarketplaceconfig } from "../../Services/ProductListApi";

export const fetchAvailableMarketplaceRequest = () => {
  return {
    type: types.FETCH_AVAILABLE_MARKETPLACE_REQUEST,
  };
};

export const fetchAvailableMarketplaceSuccess = (products) => {
  return {
    type: types.FETCH_AVAILABLE_MARKETPLACE_SUCCESS,
    payload: products,
  };
};

export const fetchAvailableMarketplaceFailure = (error) => {
  return {
    type: types.FETCH_AVAILABLE_MARKETPLACE_FAILURE,
    payload: error,
  };
};

export const fetchAvailableMarketplace = (param) => {
  return (dispatch) => {
    dispatch(fetchAvailableMarketplaceRequest);
    axios(AvailableMarketplaceconfig(param))
      .then((response) => {
      //  console.log("hehe a",response);
        const products = response.data?.data;
        dispatch(fetchAvailableMarketplaceSuccess(products));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchAvailableMarketplaceFailure(errorMsg));
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