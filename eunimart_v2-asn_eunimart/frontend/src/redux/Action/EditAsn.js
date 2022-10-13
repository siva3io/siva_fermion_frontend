import axios from "axios";
import { toast } from "react-toastify";
import { NEW_BASE_URL } from "../../services/api";
import * as types from "./ActionType";
import 'react-toastify/dist/ReactToastify.css';
import GLOBAL_API_SOURCE from "../../GlobalApi";

toast.configure()

export const EditAsn = (id,asn) => async (dispatch) => {
  var headers={
    "Content-type":"application/json",
    Authorization:`${GLOBAL_API_SOURCE.token}`
  }
  try {
    const response = await axios.put(
      NEW_BASE_URL + "api/v1/asn/" + id + "/edit",
     asn,{headers}
    );
    if (response) {
      toast.success("ASN Updated", {
        toastId: "ASN Updated Successfully!",
        autoClose: 2000,
      });
    } else {
      toast.error("ASN Not Updated");
    }
    return dispatch({
      type: types.EDIT_ASN_SUCCESS,
      payload: asn,
    });
  } catch (error) {
    dispatch({
      type: types.EDIT_ASN_FAIL,
      payload: error,
    });
  }
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
