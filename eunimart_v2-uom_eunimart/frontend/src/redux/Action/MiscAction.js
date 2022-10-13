import * as types from "./ActionType";
import axios from "axios";
import {
  deleteUOMConfig,
  deleteUOMClassConfig,
  //   favouriteProductConfig,
} from "../../Services/ProductListApi";
import { toast } from "react-toastify";

//Delete UOM

export const deleteUOMRequest = () => {
  return {
    type: types.DELETE_UOM_REQUEST,
  };
};

export const deleteUOMSuccess = (deleteUOMResponse) => {
  return {
    type: types.DELETE_UOM_SUCCESS,
    payload: deleteUOMResponse,
  };
};

export const deleteUOMFailure = (error) => {
  return {
    type: types.DELETE_UOM_FAILURE,
    payload: error,
  };
};

export const postDeleteUOM = (uom_id) => {
  return (dispatch) => {
    dispatch(deleteUOMRequest);
    axios(deleteUOMConfig(uom_id))
      .then((response) => {
        if (response?.data?.meta?.success === true) {
          toast.success("UOM Deleted", {
            toastId: "UOM Deleted!",
            autoClose: 1000,
          });
          //   dispatch(deleteUOMSuccess(response.data.id));
        } else {
          toast.error("UOM not Deleted", {
            toastId: "UOM not Deleted !",
            autoClose: 1000,
          });
          //   dispatch(deleteUOMFailure(response.data));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        toast(error.message);
        dispatch(deleteUOMFailure(errorMsg));
        // dispatch(fetchCategoryFailure(errorMsg));
      });
  };
};

//Delete UOM Class

export const deleteUOMClassRequest = () => {
  return {
    type: types.DELETE_UOMCLASS_REQUEST,
  };
};

export const deleteUOMClassSuccess = (deleteUOMResponse) => {
  return {
    type: types.DELETE_UOMCLASS_SUCCESS,
    payload: deleteUOMResponse,
  };
};

export const deleteUOMClassFailure = (error) => {
  return {
    type: types.DELETE_UOMCLASS_FAILURE,
    payload: error,
  };
};

export const postDeleteUOMClass = (uomClass_id) => {
  return (dispatch) => {
    dispatch(deleteUOMClassRequest);
    axios(deleteUOMClassConfig(uomClass_id))
      .then((response) => {
        if (response?.data?.meta?.success === true) {
          toast.success("UOM Class Deleted", {
            toastId: "UOM Class Deleted!",
            autoClose: 1000,
          });
          //   dispatch(deleteUOMClassSuccess(response.data));
        } else {
          toast.error("UOM Class not Deleted", {
            toastId: "UOM Class not Deleted !",
            autoClose: 1000,
          });
          //   dispatch(deleteUOMClassFailure(response.data));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        toast(error.message);
        dispatch(deleteUOMClassFailure(errorMsg));
        // dispatch(fetchCategoryFailure(errorMsg));
      });
  };
};

//Favourite UOM

// export const favouriteProductRequest = () => {
//   return {
//     type: types.FAVOURITE_PRODUCT_REQUEST,
//   };
// };

// export const favouriteProductSuccess = (favouriteProductResponse) => {
//   return {
//     type: types.FAVOURITE_PRODUCT_SUCCESS,
//     payload: favouriteProductResponse,
//   };
// };

// export const favouriteProductFailure = (error) => {
//   return {
//     type: types.FAVOURITE_PRODUCT_FAILURE,
//     payload: error,
//   };
// };

// export const postfavouriteProduct = (prod_id) => {
//   return (dispatch) => {
//     dispatch(favouriteProductRequest);
//     axios(favouriteProductConfig(prod_id))
//       .then((response) => {
//         if (typeof response.data.result === "boolean") {
//           toast.success("Product Added to Favourites", {
//             toastId: "Product Added to Favourites !",
//             autoClose: 1000,
//           });
//           dispatch(favouriteProductSuccess(response.data.id));
//         } else {
//           toast.error("Product not Deleted", {
//             toastId: "Product not Deleted !",
//             autoClose: 1000,
//           });
//           dispatch(favouriteProductFailure(response.data.result));
//         }
//       })
//       .catch((error) => {
//         const errorMsg = error.message;
//         toast(error.message);
//         dispatch(favouriteProductFailure(errorMsg));
//         // dispatch(fetchCategoryFailure(errorMsg));
//       });
//   };
// };



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