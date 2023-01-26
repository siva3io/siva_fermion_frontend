import * as types from "../../../redux/Action/SalesReturns/ActionTypes";
import axios from "axios";
import {SalesRetuns_delete_config} from "../../../services/DeleteSRListConfig"
import { toast } from "react-toastify";


export const deleteSalesReturnsRequest = () => {
  return {
    type: types.DELETE_SALES_RETURNS_REQUEST,
  };
};

export const deleteSalesReturnsSuccess = (SalesReturnsDelete) => {
  return {
    type: types.DELETE_SALES_RETURNS_SUCCESS,
    payload: SalesReturnsDelete,
  };
};

export const deleteSalesReturnsFailure = (error) => {
  return {
    type: types.DELETE_SALES_RETURNS_FAILURE,
    payload: error,
  };
};

export const deleteSalesReturns = (id) => {
  return (dispatch) => {
    dispatch(deleteSalesReturnsRequest);
    axios(SalesRetuns_delete_config(id))
      .then((response) => {
        const SalesReturnsDelete = response.data;
        console.log(SalesReturnsDelete);
        dispatch(deleteSalesReturnsSuccess(SalesReturnsDelete));
        toast.success(response.data.meta.message, {
          toastId: "Delete",
          autoClose: 1500,
        });
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(deleteSalesReturnsFailure(errorMsg));
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