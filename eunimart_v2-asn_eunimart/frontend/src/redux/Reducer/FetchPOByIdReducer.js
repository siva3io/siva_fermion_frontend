import * as types from "../Action/ActionType";

const initialState = {
  loading: true,
  po: [],
  error: "",
};

const FetchPOByIdReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_PO_DATA_BY_ID_SUCCESS:
      return {
        ...state,
        po: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default FetchPOByIdReducer;
