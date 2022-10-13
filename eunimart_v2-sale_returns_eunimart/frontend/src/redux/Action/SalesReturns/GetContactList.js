import * as types from "../../../redux/Action/SalesReturns/ActionTypes";
import axios from "axios";
import {ContactListConfig} from "../../../services/ContactListConfig"

  export const getContactListRequest = () => {
    return {
      type: types.GET_CONTACT_LIST_REQUEST,
    };
  };
  
  export const getContactListSuccess = (ContactList) => {
    return {
      type: types.GET_CONTACT_LIST_SUCCESS,
      payload: ContactList,
    };
  };
  
  export const getContactListFailure=(error)=>{
    return{
      type: types.GET_CONTACT_LIST_FAILURE,
      payload: error,
    }
  };
  export const getContactList = () => {
    return (dispatch) => {
      dispatch(getContactListRequest);
      axios(ContactListConfig)
        .then((response) => {
          console.log(response, "getContactListRequest");
          const ContactList = response.data.data ? response.data.data : [];
          console.log(ContactList, " getContactListReducer");
          dispatch(getContactListSuccess(ContactList));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(getContactListFailure(errorMsg));
        });
    };
  };

  /*			
Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)			
All rights reserved.			
This program is free software: you can redistribute it and/or modify			
it under the terms of the GNU General Public License as published by			
the Free Software Foundation, either version 3 of the License, or			
(at your option) any later version.			
This program is distributed in the hope that it will be useful,			
but WITHOUT ANY WARRANTY; without even the implied warranty of			
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the			
GNU General Public License for more details.			
You should have received a copy of the GNU General Public License			
along with this program. If not, see <http://www.gnu.org/licenses/>.			
*/