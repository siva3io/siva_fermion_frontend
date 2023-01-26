import * as types from "../Action/actionType";

const initialState = {
  contactsViewData: [],
  loading: false,
};

const contactsViewdataReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.CONTACTS_VIEW:
      return {
        ...state,
        contactsViewData: action.payload.data,
        loading: false,
      };
    default:
      return state;
  }
};
export default contactsViewdataReducers;

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
