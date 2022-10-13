import * as types from "../Action/ActionType";

const initialState = {
  loading: true,
  asn: [],
  error: "",
};

const FetchAsnDataByIdReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_ASN_DATA_BY_ID_SUCCESS:
      return {
        ...state,
        asn: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default FetchAsnDataByIdReducer;
