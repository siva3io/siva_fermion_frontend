import axios from "axios";
import * as types from "./actionType";
import BASE_API_SOURCE from "../baseurl";

export const FetchAddress = () => async dispatch => {
  var headers = {
    "Content-type": "application/json",
    Authorization: `${BASE_API_SOURCE.token}`,
  };

  try {
    const response = await axios({
      url: "https://dev-api.eunimart.com/api/v1/contacts/dropdown",
      method: "get",
      headers: headers,
    })
      .then(response => {
        console.log(response.data.data, "addressDataFromMyReducer");
        dispatch({
          type: types.ADDRESS_DATA_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    dispatch({
      type: types.ADDRESS_DATA_FAIL,
      payload: error,
    });
  }
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
