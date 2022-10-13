import * as types from "../../../redux/Action/SalesReturns/ActionTypes";
import axios from "axios";
import { SalesRetunsListConfig } from "../../../services/SalesRetunsListConfig"

  export const getSalesRetunsListRequest = () => {
    return {
      type: types.GET_SALES_RETUNS_LIST_REQUEST, 
    };
  };
  
  export const getSalesRetunsListSuccess = (SalesRetunsList) => {
    return {
      type: types.GET_SALES_RETUNS_LIST_SUCCESS,
      payload: SalesRetunsList,
    };
  };
  
  export const getSalesRetunsListFailure=(error)=>{
    return{
      type: types.GET_SALES_RETUNS_LIST_FAILURE,
      payload: error,
    }
  };
  export const getSalesReturnsList = (params) => {
    console.log(params, "===============")
    return (dispatch) => {
      dispatch(getSalesRetunsListRequest);
      axios(SalesRetunsListConfig(params))
        .then((response) => {
          console.log(response, "getSalesRetunsListRequest");
          const SalesRetunsList = response.data? response.data: [];
          console.log(SalesRetunsList, "SalesRetunsList");
          dispatch(getSalesRetunsListSuccess(SalesRetunsList));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(getSalesRetunsListFailure(errorMsg));
        });
    };
  };