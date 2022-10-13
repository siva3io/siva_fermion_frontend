import * as types from "./ActionType";

export const getProductdetails = (productDetail) => {
  return {
    type: types.GET_PRODUCT_DATA,
    payload: productDetail,
  };
};

export const getAddressDetails = (addressDetail) => {
  return {
    type: types.GET_ADDRESS_DATA,
    payload: addressDetail,
  };
};

// form1, form2




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