import * as types from "./actionType";
import axios from "axios";
import { config } from "../../Services/EstimatedCostApi";
import { BASE_URL, TOKEN } from "../../Services/api";
import BASE_API_SOURCE from "../../baseurl";

export const estimatedcost = (data) => async (dispatch) => {
  try {
    const response = await axios(config(data));
    console.log("jiji", response.data.data);
    dispatch({
      type: types.ESTIMATED_COST_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.ESTIMATED_COST_FAILURE,
      payload: error,
    });
  }
};

// import * as types from "./actionType";
// import axios from "axios";
// import { BASE_URL, TOKEN } from "../../Services/api";

// export const estimatedcost = (data) => async (dispatch) => {
//   try {
//     const response = await axios.post(
//       `${BASE_URL}/ipaas/shipping/rate_calculator`,
//       {
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `${TOKEN}`,
//         },
//         data: data,
//       }
//     );
//     dispatch({
//       type: types.ESTIMATED_COST_SUCCESS,
//       payload: response.data.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: types.ESTIMATED_COST_FAILURE,
//       payload: error,
//     });
//   }
// };

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
