import * as types from "./ActionType";
import axios from "axios";
import { config } from "../../Services/CountryListApi";

export const fetchCountrySuccess = (country) => {
  return {
    type: types.FETCH_COUNTRY,
    payload: country,
  };
};

export const fetchCountryFailure = (error) => {
  return {
    type: types.FETCH_COUNTRY_FAILURE,
    payload: error,
  };
};

export const fetchCountry = (obj) => {
  return (dispatch) => {
    // dispatch(fetchProductRequest)
    axios(
      `https://python-odoo.eunimart.com/api/v1/country/search/${obj}`,
      config
    )
      .then((response) => {
        const country = response.data.result;
        dispatch(fetchCountrySuccess(country));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchCountryFailure(errorMsg));
      });
  };
};

export const fetchCountries = (obj) => async (dispatch) => {
  try {
    const response = await axios(
      `https://python-odoo.eunimart.com/api/v1/country/search/${obj}`,
      config
    );
    dispatch(fetchCountrySuccess(response.data.result));
  } catch (e) {
    dispatch(fetchCountryFailure(e.errorMsg));
  }
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