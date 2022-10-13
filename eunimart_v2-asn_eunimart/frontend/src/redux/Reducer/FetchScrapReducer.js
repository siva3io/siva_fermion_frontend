import * as types from "../Action/ActionType";

const initialState = {
  loading: true,
  scrap: [],
  error: "",
};

const FetchScrapReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SCRAP_SUCCESS:
      return {
        loading: false,
        scrap: action.payload,
        error: "",
      };
    case types.SCRAP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case types.SCRAP_SEARCH:
      return {
        ...state,
        scrap: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default FetchScrapReducer;
