import * as types from "../../Action/ActionType";
import { combineReducers } from "redux";

const attributeInitialState = {
  loading: false,
  Attribute: [],
  error: "",
};

const AttributeReducer = (state = attributeInitialState, action) => {
  switch (action.type) {
    //list products related
    case types.FETCH_ATTRIBUTE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_ATTRIBUTE_SUCCESS:
      return {
        // ...state,
        loading: false,
        Attribute: action.payload,
        error: "",
      };
    case types.FETCH_ATTRIBUTE_FAILURE:
      return {
        loading: false,
        Attribute: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

const attributeCreateInitialState = {
  loading: false,
  NewAttribute: [],
  error: "",
};

const AttributeCreateReducer = (
  state = attributeCreateInitialState,
  action
) => {
  switch (action.type) {
    //list products related
    case types.CREATE_ATTRIBUTE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_ATTRIBUTE_SUCCESS:
      return {
        // ...state,
        loading: false,
        NewAttribute: action.payload,
        error: "",
      };
    case types.CREATE_ATTRIBUTE_FAILURE:
      return {
        loading: false,
        NewAttribute: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

const propertyInitialState = {
  loading: false,
  Property: [],
  error: "",
};

const PropertyReducer = (state = propertyInitialState, action) => {
  switch (action.type) {
    //list products related
    case types.FETCH_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_PROPERTY_SUCCESS:
      return {
        // ...state,
        loading: false,
        Property: action.payload,
        error: "",
      };
    case types.FETCH_PROPERTY_FAILURE:
      return {
        loading: false,
        Property: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

const propertyCreateInitialState = {
  loading: false,
  NewProperty: [],
  error: "",
};

const PropertyCreateReducer = (state = propertyCreateInitialState, action) => {
  switch (action.type) {
    //list products related
    case types.CREATE_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_PROPERTY_SUCCESS:
      return {
        // ...state,
        loading: false,
        NewProperty: action.payload,
        error: "",
      };
    case types.CREATE_PROPERTY_FAILURE:
      return {
        loading: false,
        NewProperty: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

const variantCreateInitialState = {
  loading: false,
  VariantTable: [],
  error: "",
};

const variantTableCreateReducer = (
  state = variantCreateInitialState,
  action
) => {
  switch (action.type) {
    //list products related
    case types.CREATE_VARIANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_VARIANT_SUCCESS:
      return {
        // ...state,
        loading: false,
        VariantTable: action.payload,
        error: "",
      };
    case types.CREATE_VARIANT_FAILURE:
      return {
        loading: false,
        VariantTable: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

const CreateVariantReducer = combineReducers({
  attribute: AttributeReducer,
  newAttribute: AttributeCreateReducer,
  property: PropertyReducer,
  newProperty: PropertyCreateReducer,
  variantTable: variantTableCreateReducer,
});
export default CreateVariantReducer;





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