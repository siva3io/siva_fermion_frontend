import axios from "axios";
import { BASE_URL } from "../../services/api";
import { config } from "../../services/config";
import * as types from "./ActionType";
import { toast } from "react-toastify";
import GLOBAL_API_SOURCE from "../../../GlobalApi";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export const createGrn = grn => async dispatch => {
  var headers = {
    "Content-type": "application/json",
    Authorization: `${GLOBAL_API_SOURCE.token}`,
  };

  try {
    const response = await axios.post(
      `${BASE_URL}api/v1/grn/create`,

      grn,
      { headers }
    );
    if (response.data) {
      console.log("yo");
      // notify();
      toast.success("GRN Created", {
        toastId: "GRN Created Successfully !",
        autoClose: 2000,
      });
    } else {
      console.log("yo11");
      toast.error("GRN not Created");
    }
  } catch (err) {
    //console.log(err);
    toast.error("GRN not Created");
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
