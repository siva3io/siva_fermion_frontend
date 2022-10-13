import * as types from "../Action/ActionType";

const initialState = {
  loading: true,
  asnDeleteData: [],
};

const FetchAsnDeleteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_ASN_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        asnDeleteData: payload,
      };
    case types.FETCH_ASN_DELETE_FAIL:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_ASN_DELETE:
      return {
        ...state,
        asnDeleteData: payload,
        loading: false,
      };
    default:
      return { ...state };
  }
};

export default FetchAsnDeleteReducer;
