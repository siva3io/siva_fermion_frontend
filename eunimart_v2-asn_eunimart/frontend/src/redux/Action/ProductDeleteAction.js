import axios from "axios";
import { Productdelconfig } from "../../services/AsnDeleteConfig";
import * as types from "./ActionType";

export const deleteProductline = (s2,s1) => async (dispatch) => {
  console.log("deleteProductline",s2,s1)
  try {
    const response = await axios(Productdelconfig(s2,s1));
    dispatch({
      type: types.FETCH_PRODUCTLINE_DELETE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.FETCH_PRODUCTLINE_DELETE_FAIL,
      payload: error,
    });
  }
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
