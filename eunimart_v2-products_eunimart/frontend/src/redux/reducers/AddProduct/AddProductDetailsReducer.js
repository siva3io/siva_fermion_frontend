import * as types from "../../Action/ActionType";
import { combineReducers } from "redux";
const brandInitialState = {
  loading: false,
  Brand: [],
  error: "",
};

const BrandReducer = (state = brandInitialState, action) => {
  switch (action.type) {
    //list products related
    case types.FETCH_BRAND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_BRAND_SUCCESS:
      return {
        // ...state,
        loading: false,
        Brand: action.payload,
        error: "",
      };
    case types.FETCH_BRAND_FAILURE:
      return {
        loading: false,
        Brand: [],
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

//condition
const conditionInitialState = {
  loading: false,
  Condition: [],
  error: "",
};

const ConditionReducer = (state = conditionInitialState, action) => {
  switch (action.type) {
    //list products related
    case types.FETCH_CONDITION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_CONDITION_SUCCESS:
      return {
        // ...state,
        loading: false,
        Condition: action.payload,
        error: "",
      };
    case types.FETCH_CONDITION_FAILURE:
      return {
        loading: false,
        Condition: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

//product type
const productTypeInitialState = {
  loading: false,
  ProductType: [],
  error: "",
};

const ProductTypeReducer = (state = productTypeInitialState, action) => {
  switch (action.type) {
    //list products related
    case types.FETCH_PRODUCTTYPE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_PRODUCTTYPE_SUCCESS:
      return {
        // ...state,
        loading: false,
        ProductType: action.payload,
        error: "",
      };
    case types.FETCH_PRODUCTTYPE_FAILURE:
      return {
        loading: false,
        ProductType: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

//standard product type
const stdProductTypeInitialState = {
  loading: false,
  StdProductType: [],
  error: "",
};

const StandardProductTypeReducer = (
  state = stdProductTypeInitialState,
  action
) => {
  switch (action.type) {
    //list products related
    case types.FETCH_STDPRODUCTTYPE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_STDPRODUCTTYPE_SUCCESS:
      return {
        // ...state,
        loading: false,
        StdProductType: action.payload,
        error: "",
      };
    case types.FETCH_STDPRODUCTTYPE_FAILURE:
      return {
        loading: false,
        StdProductType: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

//procurement
const procurementInitialState = {
  loading: false,
  ProcurementType: [],
  error: "",
};

const ProcurementTypeReducer = (state = procurementInitialState, action) => {
  switch (action.type) {
    //list products related
    case types.FETCH_PROCUREMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_PROCUREMENT_SUCCESS:
      return {
        // ...state,
        loading: false,
        ProcurementType: action.payload,
        error: "",
      };
    case types.FETCH_PROCUREMENT_FAILURE:
      return {
        loading: false,
        ProcurementType: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

const routesInitialState = {
  loading: false,
  Routes: [],
  error: "",
};

const RoutesReducer = (state = routesInitialState, action) => {
  switch (action.type) {
    case types.FETCH_ROUTES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_ROUTES_SUCCESS:
      return {
        // ...state,
        loading: false,
        Routes: action.payload,
        error: "",
      };
    case types.FETCH_ROUTES_FAILURE:
      return {
        loading: false,
        Routes: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const inventoryInitialState = {
  loading: false,
  Inventory: [],
  error: "",
};

const InventoryReducer = (state = inventoryInitialState, action) => {
  switch (action.type) {
    case types.FETCH_INVENTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_INVENTORY_SUCCESS:
      return {
        // ...state,
        loading: false,
        Inventory: action.payload,
        error: "",
      };
    case types.FETCH_INVENTORY_FAILURE:
      return {
        loading: false,
        Inventory: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const baseUOMInitialState = {
  loading: false,
  BaseUOM: [],
  error: "",
};

const BaseUOMReducer = (state = baseUOMInitialState, action) => {
  switch (action.type) {
    case types.FETCH_BASEUOM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_BASEUOM_SUCCESS:
      return {
        // ...state,
        loading: false,
        BaseUOM: action.payload,
        error: "",
      };
    case types.FETCH_BASEUOM_FAILURE:
      return {
        loading: false,
        BaseUOM: [],
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
  brand: BrandReducer,

  newBrand: BrandCreateReducer,

  condition: ConditionReducer,
  productType: ProductTypeReducer,
  stdProductType: StandardProductTypeReducer,
  procurement: ProcurementTypeReducer,
  routes: RoutesReducer,
  inventory: InventoryReducer,
  baseUOM: BaseUOMReducer,
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