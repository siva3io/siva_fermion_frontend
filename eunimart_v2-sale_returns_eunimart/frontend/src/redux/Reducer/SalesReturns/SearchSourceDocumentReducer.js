import * as types from "../../Action/SalesReturns/ActionTypes";

const initialState = {
  loading: true,
  SearchSourceDocument: [],
};

const fetchSearchSourceDocumentTypeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_SEARCH_SOURCE_DOCUMENT_DATA_SUCCESS:
      //console.log("GRN", payload);
      return {
        ...state,
        loading: false,
        SearchSourceDocument: payload,
      };
    case types.FETCH_SEARCH_SOURCE_DOCUMENT_DATA_FAILURE:
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

export default fetchSearchSourceDocumentTypeReducer;
