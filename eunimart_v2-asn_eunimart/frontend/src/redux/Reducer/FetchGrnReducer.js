import * as types from "../Action/ActionType";

const initialState = {
  loading: true,
  grn: [],
  error: "",
};

const FetchGrnReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GRN_SUCCESS:
      return {
        loading: false,
        grn: action.payload,
        error: "",
      };
    case types.GRN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case types.GRN_SEARCH:
      return {
        ...state,
        grn: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default FetchGrnReducer;
