import * as types from "./ActionType";
import axios from "axios";
import { config } from "../../Services/CountryListApi";

export const fetchStateSuccess = (state) => {
  return {
    type: types.FETCH_STATE,
    payload: state,
  };
};

export const fetchStateFailure = (error) => {
  return {
    type: types.FETCH_STATE_FAILURE,
    payload: error,
  };
};

export const fetchState = (obj, stateObj) => {
  if (obj === "") {
    obj = 0;
  }
  return (dispatch) => {
    // dispatch(fetchProductRequest)
    axios(`https://python-odoo.eunimart.com/api/v1/state/search`, config)
      .then((response) => {
        const state = response.data.result;
        dispatch(fetchStateSuccess(state));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchStateFailure(errorMsg));
      });
  };
};

// export const fetchStates = async() => (dispatch) => {
//     const response = axios(`https://python-odoo.eunimart.com/api/v1/state/search`,config);
//     dispatch(fetchStateSuccess(response));
// }

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