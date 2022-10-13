import * as types from "../../../redux/Action/SalesReturns/ActionTypes";

const initialState = {
  loading: false,
  SRlist: [],
  error: "",
};

  const CreateSrReducer = (state = initialState, { type, payload }) => {
  
    switch (type) {
      case types.CREATE_SALES_RETURNS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case types.CREATE_SALES_RETURNS_SUCCESS:
        return {
          loading: false,
          SRlist: payload,
          error: "",
        };
      case types.CREATE_SALES_RETURNS_FAILURE:
        return {
          loading: false,
          SRlist: [],
          error: payload,
        };
      default:
        return state;
    }
  };
  
  export default CreateSrReducer;