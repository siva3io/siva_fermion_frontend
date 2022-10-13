import * as types from "../Action/ActionType";

const initialState = {
  loading: true,
  products: [],
};

const fetchProductDataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_PRODUCTS_DATA_SUCCESS:
      console.log("GRN", payload);
      return {
        ...state,
        loading: false,
        products: payload,
      };
    case types.FETCH_PRODUCTS_DATA_FAILURE:
      return {
        ...state,
        loading: true,
      };
    // case types.FETCH_GRN_SEARCH_DATA_SUCCESS:
    
    //   return {
    //     ...state,
    //     loading: false,
    //     grn: payload,
    //   };
    // case types.FETCH_GRN_SEARCH_DATA_FAIL:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    default:
      return { ...state };
  }
};

export default fetchProductDataReducer;
