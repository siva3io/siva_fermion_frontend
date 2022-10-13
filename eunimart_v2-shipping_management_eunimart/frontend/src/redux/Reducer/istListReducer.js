import * as types from "../Action/actionType";

const initialState = {
    istdata:[],
    istdata_meta:{} ,
    productVariantData:{},
    ACCESSdata:[],
    loading:false
}

const istdataReducers =(state = initialState, action)=>{
    //console.log("action.payload", action.payload)
    switch(action.type)
    {
        case types.SHIPPINGORDERS_LIST: return{
            ...state,
            istdata:action.payload.data,
            istdata_meta:action.payload.meta,
            loading:false
        }
        // case types.PRODUCT_VARIANT_LIST: return{
        //     ...state,
        //     productVariantData:action.payload.data,
        //     loading:false
        // }
        case types.ACCESS_MANAGEMENT_LIST: return{
            ...state,
            ACCESSdata:action.payload.data, 
            loading:false
        }
        default:return state;
    }
};
export default istdataReducers;


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