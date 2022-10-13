import * as types from "../../Action/SalesReturns/ActionTypes";

const initialState = {
  loading: true,
  states1: [],
};

const StatesReducer = (state = initialState, { type, payload }) => {
    console.log(payload,"llol");
  switch (type) {
   
    case types.STATES_SUCCESS:
      //console.log("GRN", payload);
      return {
        ...state,
        loading: false,
        states1: payload,
      };
    case types.STATES_FAILURE:
      return {
        ...state,
        loading: true,
      };
    // case types.FETCH_GRN_SEARCH_DATA_SUCCESS:
    
    //   return {
    //     ...state,
    //     loading: false,
    //     grn: payload,
    //   };
    // case types.FETCH_GRN_SEARCH_DATA_FAIL:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    default:
      return { ...state };
  }
};

export default StatesReducer;
