import * as types from "../../../redux/Action/SalesReturns/ActionTypes";
import axios from "axios";
import { sales_returns_update_config } from "../../../services/CreateSRConfig";
import { toast } from "react-toastify";


export const updateSalesReturnsRequest = () => {
  return {
    type: types.EDIT_SALES_RETURNS_REQUEST,
  };
};

export const updateSalesReturnsSuccess = (EditSR) => {
  return {
    type: types.EDIT_SALES_RETURNS_SUCCESS,
    payload: EditSR,
  };
};

export const updateSalesReturnsFailure = (error) => {
  return {
    type: types.EDIT_SALES_RETURNS_FAILURE,
    payload: error,
  };
};

export const updateSalesReturns= (id,payload) => {
  return (dispatch) => {
    dispatch(updateSalesReturnsRequest);
    axios(sales_returns_update_config(id,payload))
      .then((response) => {
        const EditSR = response.data;
        // console.log(InventoryUpdate, "InventoryUpdate Response");
        dispatch(updateSalesReturnsSuccess(EditSR));
        toast.success(response.data.meta.message, { 
          toastId: "update_success",
          autoClose: 1500,
        });
      })
      .catch((error) => {
        toast.error("SalesReturns Didn't Get Update !", {
          toastId: "update_fail",
          autoClose: 1500,
        });
        // console.log(error.message, "erererer---------");
        const errorMsg = error.message;
        dispatch(updateSalesReturnsFailure(errorMsg));
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