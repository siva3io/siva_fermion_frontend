import * as types from "./ActionType";
import axios from "axios";
import { toast } from "react-toastify";
import {
  updateUOMConfig,
  postUOMConfig,
  postUOMClassConfig,
} from "../../Services/UOMUpdate";

// fetch edit uom data
export const fetchEditUOMRequest = () => {
  return {
    type: types.FETCH_EDITUOM_REQUEST,
  };
};

export const fetchEditUOMSuccess = (uom) => {
  return {
    type: types.FETCH_EDITUOM_SUCCESS,
    payload: uom,
  };
};

export const fetchEditUOMFailure = (error) => {
  return {
    type: types.FETCH_EDITUOM_FAILURE,
    payload: error,
  };
};

export const getUomUpdateData = (id) => {
  return (dispatch) => {
    dispatch(fetchEditUOMRequest);
    axios(updateUOMConfig(id))
      .then((response) => {
        const uom = response.data;
        dispatch(fetchEditUOMSuccess(uom));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchEditUOMFailure(errorMsg));
      });
  };
};

//update uom

export const updateUOMRequest = () => {
  return {
    type: types.UPDATEUOM_REQUEST,
  };
};

export const updateUOMSuccess = (uom) => {
  return {
    type: types.UPDATEUOM_SUCCESS,
    payload: uom,
  };
};

export const updateUOMFailure = (error) => {
  return {
    type: types.UPDATEUOM_FAILURE,
    payload: error,
  };
};

export const postUpdateUOM = (data, id) => {
  return (dispatch) => {
    dispatch(updateUOMRequest);
    axios(postUOMConfig(data, id))
      .then((response) => {
        if (response?.data?.meta?.success === true) {
          toast.success("UOM Updated Successfully !", {
            toastId: "UOM Updated Successfully !",
            autoClose: 2000,
          });
          //  dispatch(updateUOMSuccess(uom));
        } else {
          toast.error("UOM not Updated", {
            toastId: "UOM not Updated !",
            autoClose: 1000,
          });
          //  dispatch(updateUOMFailure(uom));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(updateUOMFailure(errorMsg));
      });
  };
};

//update uom class

export const updateUOMClassRequest = () => {
  return {
    type: types.UPDATEUOMCLASS_REQUEST,
  };
};

export const updateUOMClassSuccess = (uomClass) => {
  return {
    type: types.UPDATEUOMCLASS_SUCCESS,
    payload: uomClass,
  };
};

export const updateUOMClassFailure = (error) => {
  return {
    type: types.UPDATEUOMCLASS_FAILURE,
    payload: error,
  };
};

export const postUpdateUOMClass = (data, id) => {
  return (dispatch) => {
    dispatch(updateUOMClassRequest);
    axios(postUOMClassConfig(data, id))
      .then((response) => {
        if (response?.data?.meta?.success === true) {
          toast.success("UOM ClassUpdated Successfully !", {
            toastId: "UOM Class Updated Successfully !",
            autoClose: 2000,
          });
          //  dispatch(updateUOMSuccess(uom));
        } else {
          toast.error("UOM Class not Updated", {
            toastId: "UOM Class   not Updated !",
            autoClose: 1000,
          });
          //  dispatch(updateUOMClassFailure(uom));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(updateUOMClassFailure(errorMsg));
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