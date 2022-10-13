import * as types from "../Action/ActionType";

const initialState = {
  cost: [],
};
const EstimatedCostReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ESTIMATED_COST_SUCCESS:
      const data = {
        data: action.payload,
      };
      return {
        ...state,
        cost: data,
      };

    default:
      return state;
  }
};

export default EstimatedCostReducer;
