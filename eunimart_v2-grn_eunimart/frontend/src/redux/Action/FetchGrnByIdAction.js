import * as types from "./ActionType";
import axios from "axios";
import { config } from "../../services/config";
import { BASE_URL } from "../../services/api";

// export const fetchGrnbyIdRequest = () => {
//   return {
//     type: types.FETCH_GRN_BY_ID_REQUEST,
//   };
// };

export const fetchGrnbyIdSuccess = grn => {
  return {
    type: types.FETCH_GRN_BY_ID_DATA_SUCCESS,
    payload: grn,
  };
};

export const fetchGrnbyIdFailure = error => {
  return {
    type: types.FETCH_GRN_BY_ID_DATA_FAILURE,
    payload: error,
  };
};

export const fetchGrnbyId = id => {
  return dispatch => {
    axios(`${BASE_URL}api/v1/grn/${id}`, config)
      .then(response => {
        const grn = response.data.data;
        dispatch(fetchGrnbyIdSuccess(grn));
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchGrnbyIdFailure(errorMsg));
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
