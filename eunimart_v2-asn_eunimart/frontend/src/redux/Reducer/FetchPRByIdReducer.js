import * as types from "../Action/ActionType";

const initialState = {
  loading: true,
  pr: [],
  error: "",
};

const FetchPRByIdReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_PR_DATA_BY_ID_SUCCESS:
      return {
        ...state,
        pr: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default FetchPRByIdReducer;
