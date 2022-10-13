import * as types from "./ActionType";
import axios from "axios";
import {
  vendorConfig,
  shippingPartnerConfig,
  shippingPartnerViewConfig,
  productPackageConfig,
  vendorPriceListConfig,
  createVPConfig,
} from "../../Services/VPDetails";
import { toast } from "react-toastify";

/// MRP check
export const checkMRPRequest = () => {
  return {
    type: types.CHECK_MRP_REQUEST,
  };
};

export const checkMRPSuccess = (vendors) => {
  return {
    type: types.CHECK_MRP_SUCCESS,
    payload: vendors,
  };
};

export const checkMRPFailure = (error) => {
  return {
    type: types.CHECK_MRP_FAILURE,
    payload: error,
  };
};

export const checkMRP = () => {
  return (dispatch) => {
    dispatch(checkMRPRequest);
    axios()
      // mrpConfig
      .then((response) => {
        const mprRes = response.data.result;
        dispatch(checkMRPSuccess(mprRes));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(checkMRPFailure(errorMsg));
      });
  };
};

/// Vendor Name
export const fetchVendorRequest = () => {
  return {
    type: types.FETCH_VENDOR_REQUEST,
  };
};

export const fetchVendorSuccess = (vendors) => {
  return {
    type: types.FETCH_VENDOR_SUCCESS,
    payload: vendors,
  };
};

export const fetchVendorFailure = (error) => {
  return {
    type: types.FETCH_VENDOR_FAILURE,
    payload: error,
  };
};

export const getVendor = (params) => {
  return (dispatch) => {
    dispatch(fetchVendorRequest);
    axios(vendorConfig(params))
      .then((response) => {
        const vendors = response.data;
        dispatch(fetchVendorSuccess(vendors));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchVendorFailure(errorMsg));
      });
  };
};
//price list
export const fetchVendorPriceListRequest = () => {
  return {
    type: types.FETCH_VENDORPRICELIST_REQUEST,
  };
};

export const fetchVendorPriceListSuccess = (vendorPriceList) => {
  return {
    type: types.FETCH_VENDORPRICELIST_SUCCESS,
    payload: vendorPriceList,
  };
};

export const fetchVendorPriceListFailure = (error) => {
  return {
    type: types.FETCH_VENDORPRICELIST_FAILURE,
    payload: error,
  };
};

export const getVendorPriceList = (id, params) => {
  return (dispatch) => {
    dispatch(fetchVendorPriceListRequest);
    axios(vendorPriceListConfig(id, params))
      .then((response) => {
        const vendorPriceList = response.data;
        dispatch(fetchVendorPriceListSuccess(vendorPriceList));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchVendorPriceListFailure(errorMsg));
      });
  };
};
//Shipping partner

export const fetchShippingPartnerRequest = () => {
  return {
    type: types.FETCH_SHIPPINGPARTNER_REQUEST,
  };
};

export const fetchShippingPartnerSuccess = (shippingPartner) => {
  return {
    type: types.FETCH_SHIPPINGPARTNER_SUCCESS,
    payload: shippingPartner,
  };
};

export const fetchShippingPartnerFailure = (error) => {
  return {
    type: types.FETCH_SHIPPINGPARTNER_FAILURE,
    payload: error,
  };
};

export const getShippingPartner = () => {
  return (dispatch) => {
    dispatch(fetchShippingPartnerRequest);
    axios(shippingPartnerConfig)
      .then((response) => {
        const shippingPartners = response.data.result;
        dispatch(fetchShippingPartnerSuccess(shippingPartners));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchShippingPartnerFailure(errorMsg));
      });
  };
};

//Shipping Partner View

export const fetchShippingPartnerViewRequest = () => {
  return {
    type: types.FETCH_SHIPPINGPARTNERVIEW_REQUEST,
  };
};

export const fetchShippingPartnerViewSuccess = (shippingPartnerView) => {
  return {
    type: types.FETCH_SHIPPINGPARTNERVIEW_SUCCESS,
    payload: shippingPartnerView,
  };
};

export const fetchShippingPartnerViewFailure = (error) => {
  return {
    type: types.FETCH_SHIPPINGPARTNERVIEW_FAILURE,
    payload: error,
  };
};

export const getShippingPartnerView = (id) => {
  return (dispatch) => {
    dispatch(fetchShippingPartnerViewRequest);
    axios(shippingPartnerViewConfig(id))
      .then((response) => {
        const shippingPartnerView = response.data.result;
        dispatch(fetchShippingPartnerViewSuccess(shippingPartnerView));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchShippingPartnerViewFailure(errorMsg));
      });
  };
};

//Product Package

export const fetchProductPackageRequest = () => {
  return {
    type: types.FETCH_PRODUCTPACKAGE_REQUEST,
  };
};

export const fetchProductPackageSuccess = (productPackage) => {
  return {
    type: types.FETCH_PRODUCTPACKAGE_SUCCESS,
    payload: productPackage,
  };
};

export const fetchProductPackageFailure = (error) => {
  return {
    type: types.FETCH_PRODUCTPACKAGE_FAILURE,
    payload: error,
  };
};

export const getPackagingMaterial = (id) => {
  return (dispatch) => {
    dispatch(fetchProductPackageRequest);
    axios(productPackageConfig(id))
      .then((response) => {
        const productPackage = response.data;
        dispatch(fetchProductPackageSuccess(productPackage));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchProductPackageFailure(errorMsg));
      });
  };
};

//POST

export const createVPRequest = () => {
  return {
    type: types.CREATE_VP_REQUEST,
  };
};

export const createVPSuccess = (createVPResponse) => {
  return {
    type: types.CREATE_VP_SUCCESS,
    payload: createVPResponse,
  };
};

export const createVPFailure = (error) => {
  return {
    type: types.CREATE_VP_FAILURE,
    payload: error,
  };
};

export const postVendorPricing = (data) => {
  return (dispatch) => {
    dispatch(createVPFailure);
    axios(createVPConfig(data))
      .then((response) => {
        if (typeof response.data.result === "number") {
          toast.success("Product Successfully added", {
            toastId: "Product is added Successfuly",
            autoClose: 2000,
          });
          dispatch(createVPSuccess(response.data.result));
        } else {
          toast.error("Product is not created", {
            toastId: "Product is not created",
            autoClose: 1000,
          });
          dispatch(createVPFailure(response.data.result));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        toast(error.message);
        dispatch(createVPFailure(errorMsg));
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