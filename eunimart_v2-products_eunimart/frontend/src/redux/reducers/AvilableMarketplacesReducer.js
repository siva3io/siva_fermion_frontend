import * as types from "../Action/ActionType";

const StatesInitialState = {
  loading: false,
  available: [],
  error: "",
};

const AvailableMarketplaceReducer = (state = StatesInitialState, action) => {
  switch (action.type) {
    case types.FETCH_AVAILABLE_MARKETPLACE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_AVAILABLE_MARKETPLACE_SUCCESS:
      return {
        loading: false,
        available: action.payload,
        error: "",
      };
    case types.FETCH_AVAILABLE_MARKETPLACE_FAILURE:
      return {
        loading: false,
        available: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default AvailableMarketplaceReducer;


/*
 Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)
 All rights reserved.
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License v3.0 as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License v3.0 for more details.
 You should have received a copy of the GNU Lesser General Public License v3.0
 along with this program.  If not, see <https://www.gnu.org/licenses/lgpl-3.0.html/>.
*/