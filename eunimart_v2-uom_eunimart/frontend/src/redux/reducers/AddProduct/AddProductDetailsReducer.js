import * as types from "../../Action/ActionType";
import { combineReducers } from "redux";
const itemTypeInitialState = {
  loading: false,
  ItemType: [],
  error: "",
};

const ItemTypeReducer = (state = itemTypeInitialState, action) => {
  switch (action.type) {
    //list products related
    case types.FETCH_ITEMTYPE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_ITEMTYPE_SUCCESS:
      return {
        // ...state,
        loading: false,
        ItemType: action.payload,
        error: "",
      };
    case types.FETCH_ITEMTYPE_FAILURE:
      return {
        loading: false,
        ItemType: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

const classCodeInitialState = {
  loading: false,
  ClassCode: [],
  error: "",
};

const ClassCodeReducer = (state = classCodeInitialState, action) => {
  switch (action.type) {
    case types.FETCH_CLASSCODE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_CLASSCODE_SUCCESS:
      return {
        // ...state,
        loading: false,
        ClassCode: action.payload,
        error: "",
      };
    case types.FETCH_CLASSCODE_FAILURE:
      return {
        loading: false,
        ClassCode: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const classBaseInitialState = {
  loading: false,
  ClassBase: [],
  error: "",
};

const ClassBaseReducer = (state = classBaseInitialState, action) => {
  switch (action.type) {
    case types.FETCH_CLASSBASE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_CLASSBASE_SUCCESS:
      return {
        // ...state,
        loading: false,
        ClassBase: action.payload,
        error: "",
      };
    case types.FETCH_CLASSBASE_FAILURE:
      return {
        loading: false,
        ClassBase: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const conversionInitialState = {
  loading: false,
  ConversionType: [],
  error: "",
};

const ConversionTypeReducer = (state = conversionInitialState, action) => {
  switch (action.type) {
    case types.FETCH_CONVERSIONTYPE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_CONVERSIONTYPE_SUCCESS:
      return {
        // ...state,
        loading: false,
        ConversionType: action.payload,
        error: "",
      };
    case types.FETCH_CONVERSIONTYPE_FAILURE:
      return {
        loading: false,
        ConversionType: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const brandCreateInitialState = {
  loading: false,
  NewBrand: [],
  error: "",
};

const BrandCreateReducer = (state = brandCreateInitialState, action) => {
  switch (action.type) {
    //list products related
    case types.CREATE_BRAND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_BRAND_SUCCESS:
      return {
        // ...state,
        loading: false,
        NewBrand: action.payload,
        error: "",
      };
    case types.CREATE_BRAND_FAILURE:
      return {
        loading: false,
        NewBrand: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

const parentCategoryInitialState = {
  loading: false,
  ParentCategory: [],
  error: "",
};

const ParentCategoryReducer = (state = parentCategoryInitialState, action) => {
  switch (action.type) {
    case types.FETCH_PARENT_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_PARENT_CATEGORY_SUCCESS:
      return {
        // ...state,
        loading: false,
        ParentCategory: action.payload,
        error: "",
      };
    case types.FETCH_PARENT_CATEGORY_FAILURE:
      return {
        loading: false,
        ParentCategory: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const categoryInitialState = {
  loading: false,
  Category: [],
  error: "",
};

const CategoryReducer = (state = categoryInitialState, action) => {
  switch (action.type) {
    case types.FETCH_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_CATEGORY_SUCCESS:
      return {
        // ...state,
        loading: false,
        Category: action.payload,
        error: "",
      };
    case types.FETCH_CATEGORY_FAILURE:
      return {
        loading: false,
        Category: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const createProductInitialState = {
  loading: false,
  CreateProductResponse: [],
  error: "",
};

const CreateProductReducer = (state = createProductInitialState, action) => {
  switch (action.type) {
    case types.CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_PRODUCT_SUCCESS:
      return {
        // ...state,
        loading: false,
        CreateProductResponse: action.payload,
        error: "",
      };
    case types.CREATE_PRODUCT_FAILURE:
      return {
        loading: false,
        CreateProductResponse: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const AddProductDetailsReducer = combineReducers({
  itemType: ItemTypeReducer,

  newBrand: BrandCreateReducer,

  classCode: ClassCodeReducer,

  classBase: ClassBaseReducer,

  conversionType: ConversionTypeReducer,

  parentCategory: ParentCategoryReducer,

  category: CategoryReducer,

  createProductResponse: CreateProductReducer,
});
export default AddProductDetailsReducer;


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