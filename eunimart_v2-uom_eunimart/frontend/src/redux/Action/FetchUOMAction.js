import * as types from "./ActionType";
import axios from "axios";
import { uomConfig, uomClassConfig } from "../../Services/UOMDetails";
import { toast } from "react-toastify";

// uom
export const fetchUOMRequest = () => {
  return {
    type: types.FETCH_UOM_REQUEST,
  };
};

export const fetchUOMSuccess = (uomData) => {
  return {
    type: types.FETCH_UOM_SUCCESS,
    payload: uomData,
  };
};

export const fetchUOMFailure = (error) => {
  return {
    type: types.FETCH_UOM_FAILURE,
    payload: error,
  };
};

export const getUOMData = (id) => {
  return (dispatch) => {
    dispatch(fetchUOMRequest);
    axios(uomConfig(id))
      .then((response) => {
        const uom = response.data;
        dispatch(fetchUOMSuccess(uom));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchUOMFailure(errorMsg));
      });
  };
};

// uom class
export const fetchUOMClassRequest = () => {
  return {
    type: types.FETCH_UOMCLASS_REQUEST,
  };
};

export const fetchUOMClassSuccess = (uomClassData) => {
  return {
    type: types.FETCH_UOMCLASS_SUCCESS,
    payload: uomClassData,
  };
};

export const fetchUOMClassFailure = (error) => {
  return {
    type: types.FETCH_UOMCLASS_FAILURE,
    payload: error,
  };
};

export const getUOMClassData = (id) => {
  return (dispatch) => {
    dispatch(fetchUOMClassRequest);
    axios(uomClassConfig(id))
      .then((response) => {
        const uomClass = response.data;
        dispatch(fetchUOMClassSuccess(uomClass));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchUOMClassFailure(errorMsg));
      });
  };
};


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