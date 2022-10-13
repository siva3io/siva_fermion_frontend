import * as types from "../Action/ActionType";

const initialState = {
  loading: true,
  accessData: [],
};

const AccessMngReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        accessData: payload,
      };
    case types.FETCH_ACCESS_TOKEN_FAIL:
      return {
        ...state,
        loading: true,
      };
    default:
      return { ...state };
  }
};

export default AccessMngReducer;
