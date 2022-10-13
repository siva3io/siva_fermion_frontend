import * as types from "../../../redux/Action/SalesReturns/ActionTypes";

const initialState = {
  loading: false,
  RetunReason: [],
  error: "",
};

  const GetRetunReasonReducer = (state = initialState, { type, payload }) => {
  
    switch (type) {
      case types.GET_RETUN_REASON_REQUEST:
        return { 
          ...state,
          loading: true,
        };
      case types.GET_RETUN_REASON_SUCCESS: 
        return {
          loading: false,
          RetunReason: payload,
          error: "",
        };
      case types.GET_RETUN_REASON_FAILURE:
        return {
          loading: false,
          RetunReason: [],
          error: payload,
        };
      default:
        return state;
    }
  };
  
  export default GetRetunReasonReducer;