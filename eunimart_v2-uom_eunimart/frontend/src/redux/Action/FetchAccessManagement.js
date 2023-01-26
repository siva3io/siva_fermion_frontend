import * as types from "./ActionType";
import axios from "axios";
import { config, AccessManagement } from "../../Services/ProductListApi";

export const fetchAccessManagementRequest = () => {
  return {
    type: types.FETCH_ACCESS_MANAGEMENT_REQUEST,
  };
};

export const fetchAccessManagementSuccess = (products) => {
  return {
    type: types.FETCH_ACCESS_MANAGEMENT_SUCCESS,
    payload: products,
  };
};

export const fetchAccessManagementFailure = (error) => {
  return {
    type: types.FETCH_ACCESS_MANAGEMENT_FAILURE,
    payload: error,
  };
};

export const fetchAccessManagement = (param) => {
  return (dispatch) => {
    dispatch(fetchAccessManagementRequest);
    axios(AccessManagement(param))
      .then((response) => {
      //  console.log("hehe a",response);
        const products = response.data?.data;
        dispatch(fetchAccessManagementSuccess(products));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchAccessManagementFailure(errorMsg));
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