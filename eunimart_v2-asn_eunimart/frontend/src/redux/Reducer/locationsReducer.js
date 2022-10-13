import * as types from "../Action/ActionType";

const initialState = {
  loading: true,
  locationsData: [],
};

const fetchLocationDataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_LOCATION_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        locationsData: payload,
      };
    case types.FETCH_LOCATION_DATA_FAIL:
      return {
        ...state,
        loading: true,
      };
    // case types.LOCATION_SEARCH:
    //   return {
    //     ...state,
    //     locationsData: payload,
    //     loading: false,
    //   };
    default:
      return { ...state };
  }
};

export default fetchLocationDataReducer;
