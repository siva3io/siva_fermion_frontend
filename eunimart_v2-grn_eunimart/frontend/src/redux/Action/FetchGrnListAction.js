import * as types from "./ActionType";
import axios from "axios";
import { config } from "../../services/GrnListApi";

export const fetchGrnData = (s1, s2, s3) => async dispatch => {
  console.log(s1, s2, s3, "paramsww");

  const response = await axios(config(s1, s2, s3));
  console.log(response, "responseww");
  dispatch({
    type: types.FETCH_GRN_DATA_SUCCESS,
    payload: response.data,
  });
  // } catch (erro;r) {
  // dispatch({
  //   type: types.FETCH_GRN_DATA_FAIL,
  //   payload: error,
  // });
  // }
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
