import * as types from "./actionType";
import axios from "axios";
import BASE_API_SOURCE from "../../baseurl";

const getContactsData = (data) => ({
  type: types.CONTACTS_LIST,
  payload: data,
});

export const loadContactsData = (params1) => {
  return function (dispatch) {
    const params={
      per_page:params1?.per_page ? params1?.per_page : params1?.limit ,
      page_no:params1?.page_no ? params1?.page_no: params1?.offset   
    };
    // var params = {
    //   per_page: 10,
    //   page_no: 1,
    // };

    var headers = {
      "Content-type": "application/json",
      Authorization: `${BASE_API_SOURCE.token}`,
    };

    axios
      .get(`${BASE_API_SOURCE.url}api/v1/contacts`, { params, headers })
      .then((resp) => { 
        dispatch(getContactsData(resp.data));
      })
      .catch((error) => console.log(error));
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