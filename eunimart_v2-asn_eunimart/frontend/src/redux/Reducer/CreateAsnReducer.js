import * as types from "../Action/ActionType";

const initialState = {
  asn: [],
};
const CreateAsnReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_ASN_SUCCESS:
      const data = {
        data: action.payload,
      };
      return {
        ...state,
        asn: data,
      };

    default:
      return state;
  }
};

export default CreateAsnReducer;
