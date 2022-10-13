import * as types from "./ActionType";
import axios from "axios";
import { config } from "../../services/PurchaseOrderApi";

export const getPOByIdData = (params, searchElement) => async (dispatch) => {
  console.log(params, searchElement, "params122");
  try {
    console.log("Entered");
    const response = await axios(config(params, searchElement));
    console.log("jijiparams122", response.data.data);
    dispatch({
      type: types.FETCH_PO_ID_DATA_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.FETCH_PO_ID_DATA_FAILURE,
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
