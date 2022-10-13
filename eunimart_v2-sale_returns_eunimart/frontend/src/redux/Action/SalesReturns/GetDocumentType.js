import * as types from "../../../redux/Action/SalesReturns/ActionTypes";
import axios from "axios";
import { searchCurrencyConfig,getDocumentTypeConfig } from "../../../services/CurrencyList";

  export const getDocumentTypeRequest = () => {
    return {
      type: types.GET_DOCUMENT_TYPE_REQUEST, 
    };
  };
  
  export const getDocumentTypeSuccess = (currency) => { 
    return {
      type: types.GET_DOCUMENT_TYPE_SUCCESS,
      payload: currency,
    };
  };
  
  export const getDocumentTypeFailure=(error)=>{
    return{
      type: types.GET_DOCUMENT_TYPE_FAILURE,
      payload: error,
    }
  };
  export const getDocumentType= () => {
    // console.log(params, "===============")
    return (dispatch) => {
      dispatch(getDocumentTypeRequest);
      axios(getDocumentTypeConfig())
        .then((response) => {
        //   console.log(response, "getRetunReasonRequest");
          const currency = response.data.data ? response.data.data : [];
          console.log(currency, "currency");
          dispatch(getDocumentTypeSuccess(currency));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(getDocumentTypeFailure(errorMsg));
        });
    };
  };