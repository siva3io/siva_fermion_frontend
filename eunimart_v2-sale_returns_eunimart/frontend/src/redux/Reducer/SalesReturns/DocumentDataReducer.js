import * as types from "../../Action/SalesReturns/ActionTypes";

const initialState = {
  loading: true,
  documentData: [],
};

const fetchDocumentDataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.DOCUMENT_DATA_SUCCESS:
      //console.log("GRN", payload);
      return {
        ...state,
        loading: false,
        documentData: payload,
      };
    case types.DOCUMENT_DATA_FAILURE:
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

export default fetchDocumentDataReducer;
