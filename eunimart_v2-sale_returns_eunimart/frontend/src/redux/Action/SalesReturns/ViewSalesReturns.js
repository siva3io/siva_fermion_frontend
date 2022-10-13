import * as types from "../../../redux/Action/SalesReturns/ActionTypes";
import axios from "axios";
import { ViewSalesRetunsConfig } from "../../../services/ViewSalesRetunsConfig";

  export const getViewSalesRetunsRequest = () => {
    return {
      type: types.GET_VIEW_SALES_RETUNS_REQUEST, 
    };
  };
  
  export const getViewSalesRetunsSuccess = (ViewSalesRetuns) => {
    return {
      type: types.GET_VIEW_SALES_RETUNS_SUCCESS,
      payload: ViewSalesRetuns,
    };
  };
  
  export const getViewSalesRetunsFailure=(error)=>{
    return{
      type: types.GET_VIEW_SALES_RETUNS_FAILURE,
      payload: error,
    }
  };
  export const getViewSalesReturns= (id) => {
    // console.log(params, "===============") 
    return (dispatch) => {
      dispatch(getViewSalesRetunsRequest);
      axios(ViewSalesRetunsConfig(id))
        .then((response) => {
          console.log(response, "getViewSalesRetunsRequest");
          const ViewSalesRetuns = response.data.data ? response.data.data : [];
          console.log(ViewSalesRetuns, "ViewSalesRetuns");
          dispatch(getViewSalesRetunsSuccess(ViewSalesRetuns));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(getViewSalesRetunsFailure(errorMsg)); 
        });
    };
  };