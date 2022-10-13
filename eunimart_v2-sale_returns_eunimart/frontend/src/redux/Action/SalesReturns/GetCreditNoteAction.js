import * as types from "./ActionTypes";
import axios from "axios";
import { CreditNoteListConfig } from "../../../services/SalesRetunsListConfig"

  export const getCreditNoteListRequest = () => {
    return {
      type: types.GET_CREDIT_NOTE_LIST_REQUEST, 
    };
  };
  
  export const getCreditNoteListSuccess = (CreditNoteList) => {
    return {
      type: types.GET_CREDIT_NOTE_LIST_SUCCESS,
      payload: CreditNoteList,
    };
  };
  
  export const getCreditNoteListFailure=(error)=>{
    return{
      type: types.GET_CREDIT_NOTE_LIST_FAILURE,
      payload: error,
    }
  };
  export const getCreditNoteList = (id) => {
    console.log(id, "===============")
    return (dispatch) => {
      dispatch(getCreditNoteListRequest);
      axios(CreditNoteListConfig(id))
        .then((response) => {
          console.log(response, "getCreditNoteListRequest");
          const CreditNoteList = response.data? response.data: [];
          console.log(CreditNoteList, "CreditNoteList");
          dispatch(getCreditNoteListSuccess(CreditNoteList));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(getCreditNoteListFailure(errorMsg));
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