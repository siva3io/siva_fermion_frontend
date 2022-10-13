import * as types from "../Action/actionType";

const initialState = {
    loading: false,
    contact_type: [],
    contact_property: [],
    location_type: [],
    countries_data: [],
    states_data: [],
    contacts_data: [],
    contactsdata_meta: {},
    create_contacts_data: [],
    delete_contacts_data : [],
    contactSingledata : [],
    contactUpdatedata : [],
    access:[],
    contacts_table_data : [],
    contactsdata_table_meta : [],
}

const DataReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.CONTACT_TYPE: return {
            ...state,
            contact_type: action.payload.data,
            loading: false
        }
        case types.LOCATION_TYPE: return {
            ...state,
            location_type: action.payload.data,
            loading: false
        }
        case types.CONTACT_PROPERTY: return {
            ...state,
            contact_property: action.payload.data,
            loading: false
        }
        case types.COUNTRIES_REQUEST: return {
            ...state,
            countries_data: action.payload.data,
            loading: false
        }
        case types.STATES_REQUEST: return {
            ...state,
            states_data: action.payload.data,
            loading: false
        }
        case types.CONTACTS_REQUEST: return {
            ...state,
            contacts_data: action.payload.data,
            contactsdata_meta : action.payload.meta,
            loading: false
        }
        case types.CREATE_CONTACTS_REQUEST: return {
            ...state,
            create_contacts_data: action.payload.data,
            loading: false
        }
        case types.DELETE_CONTACTS_REQUEST: return {
            ...state,
            delete_contacts_data: action.payload.data,
            loading: false
        }
        case types.CONTACTS_SINGLE_REQUEST: return {
            ...state,
            contactSingledata: action.payload.data,
            loading: false
        }
        case types.CONTACTS_UPDATE_REQUEST: return {
            ...state,
            contactUpdatedata: action.payload.data,
            loading: false
        }
        case types.ACCESS_MANAGEMENT: return {
            ...state,
            access: action.payload.data,
            loading: false
        }
        case types.CONTACTS_TABLE_REQUEST: return {
            ...state,
            contacts_table_data: action.payload.data,
            contactsdata_table_meta : action.payload.meta,
            loading: false
        }
        default: return state;
    }
};
export default DataReducers;






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