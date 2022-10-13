import * as types from "./ActionTypes";
import axios from "axios";
// import { BASE_URL } from "../../services/api";
import { config } from "../../../services/SalesOrderApi";

export const SearchSourceDocumentData = (searchElement) => async (dispatch) => {
  // console.log(params,searchElement,"params111")
  try {
    const response = await axios(config(searchElement));
console.log("jiji",response.data.data);
    dispatch({
      type: types.FETCH_SEARCH_SOURCE_DOCUMENT_DATA_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.FETCH_SEARCH_SOURCE_DOCUMENT_DATA_FAILURE,
      payload: error,
    });
  }
};
