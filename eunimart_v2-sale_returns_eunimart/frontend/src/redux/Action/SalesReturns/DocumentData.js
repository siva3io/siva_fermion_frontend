import * as types from "./ActionTypes";
import axios from "axios";
// import { BASE_URL } from "../../services/api";
import { documentConfig } from "../../../services/SalesOrderApi";

export const DocumentData = (id,type) => async (dispatch) => {
  // console.log(params,searchElement,"params111")
  try {
    const response = await axios(documentConfig(id,type));
console.log("jiji",response.data.data);
    dispatch({
      type: types.DOCUMENT_DATA_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.DOCUMENT_DATA_FAILURE,
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