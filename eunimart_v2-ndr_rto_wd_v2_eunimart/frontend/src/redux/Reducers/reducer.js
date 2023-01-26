import * as types from "../Actions/actionType";

const initialState = {
    ndrdata: [],
    ndrdata_meta: {},
    rtodata: [],
    rtodata_meta: {},
    wddata: [],
    wddata_meta: {},
    NDRdataId: [],
    NDRdataId_meta: {},
    RTOdataId: [],
    RTOdataId_meta: {},
    WDdataId: [],
    WDdataId_meta: {},
    loading: false,
    accessNdr: [],
    accessRto: [],
    accessWd: []


}

const DataReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.NDR_LIST: return {
            ...state,
            ndrdata: action.payload.data,
            ndrdata_meta: action.payload.meta,
            loading: false
        }
        case types.RTO_LIST: return {
            ...state,
            rtodata: action.payload.data,
            rtodata_meta: action.payload.meta,
            loading: false
        }
        case types.WD_LIST: return {
            ...state,
            wddata: action.payload.data,
            wddata_meta: action.payload.meta,
            loading: false
        }
        case types.NDR_BY_ID: return {
            ...state,
            NDRdataId: action.payload.data,
            NDRdataId_meta: action.payload.meta,
            loading: false
        }
        case types.RTO_BY_ID: return {
            ...state,
            RTOdataId: action.payload.data,
            RTOdataId_meta: action.payload.meta,
            loading: false
        }
        case types.WD_BY_ID: return {
            ...state,
            WDdataId: action.payload.data,
            WDdataId_meta: action.payload.meta,
            loading: false
        }
        case types.ACCESS_MANAGEMENT_NDR: return {
            ...state,
            accessNdr: action.payload.data,
            loading: false
        }
        case types.ACCESS_MANAGEMENT_RDO: return {
            ...state,
            accessRto: action.payload.data,
            loading: false
        }
        case types.ACCESS_MANAGEMENT_WD:
            console.log(action.payload.data, "12345ui")
            return {
                ...state,
                accessWd: action.payload.data,
                loading: false
            }
        default: return state
    }
}
export default DataReducers


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