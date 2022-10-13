import * as types from "./ActionTypes";
import axios from "axios";
import { BASE_URL } from "../../../services/api";
import GLOBAL_API_SOURCE from "../../../GlobalApi";


export const Returntype = () => async (dispatch) => {

  var headers={
    "Content-type":"application/json",
    Authorization:`${GLOBAL_API_SOURCE.token}`
  }

//   console.log(params,"params")
  try {
    const response = await axios(`${BASE_URL}/api/v1/core/lookup_codes/return_type`,{headers});
console.log("jiji",response.data.data);
    dispatch({
      type: types.FETCH_RETURN_TYPE_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.FETCH_RETURN_TYPE_FAILURE,
      payload: error,
    });
  }
};
