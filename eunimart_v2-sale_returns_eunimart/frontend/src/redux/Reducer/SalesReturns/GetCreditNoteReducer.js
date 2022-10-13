import * as types from "../../Action/SalesReturns/ActionTypes";

const initialState = {
  loading: false,
  CreditNote: [],
  error: "",
};

  const GetCreditNoteReducerList = (state = initialState, { type, payload }) => {
  
    switch (type) {
      case types.GET_CREDIT_NOTE_LIST_REQUEST:
        return { 
          ...state,
          loading: true,
        };
      case types.GET_CREDIT_NOTE_LIST_SUCCESS:
        return {
          loading: false,
          CreditNote: payload,
          error: "",
        };
      case types.GET_CREDIT_NOTE_LIST_FAILURE:
        return {
          loading: false,
          CreditNote: [],
          error: payload,
        };
      default:
        return state;
    }
  };
  
  export default GetCreditNoteReducerList;