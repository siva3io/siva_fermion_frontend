import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../baseurl";

const getDebitNoteByIdData = data => ({
  type: types.DEBIT_NOTE_BY_ID,
  payload: data,
});

export const loadDebitNoteDataById = Id => {
  return function (dispatch) {
    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };
    if (Id !== undefined && Id !== null) {
      axios
        .get(`${BASE_API_SOURCE.url}api/v1/debitnote/${Id}`, { headers })
        .then(resp => {
          dispatch(getDebitNoteByIdData(resp.data));
        })
        .catch(error => console.log(error));
    }
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
