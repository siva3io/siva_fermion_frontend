import * as types from "../../Action/SalesReturns/ActionTypes";

const initialState = {
  loading: true,
  access: [],
};

const AccessReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ACCESS_MANAGEMENT_SUCCESS:
      console.log("GRN", payload);
      return {
        ...state,
        loading: false,
        access: payload.data,
      };
    case types.ACCESS_MANAGEMENT_FAIL:
      return {
        ...state,
        loading: true,
      };
    
    default:
      return { ...state };
  }
};

export default AccessReducer;


