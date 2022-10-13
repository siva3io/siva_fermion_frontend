import GLOBAL_API_SOURCE from "../GlobalApi";
var axios = require("axios");
var data = {
  jsonrpc: "2.0",
};
let base_URL = GLOBAL_API_SOURCE.url;

export const vendorConfig = (params) => {
  return {
    method: "get",
    url: `${base_URL}/api/v1/vendors/dropdown?per_page=${params.limit}&page_no=${params.offset}`,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const shippingPartnerConfig = {
  method: "get",
  url: `${base_URL}/api/v1/shipping/partner/search/`,

  headers: {
    "Content-Type": "application/json",
    "Authorization": `${GLOBAL_API_SOURCE.token}`,
  },
  data: data,
};

export const shippingPartnerViewConfig = (id) => {
  return {
    method: "get",
    url: `${base_URL}/api/v1/shipping/partner/view/${id}`,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const productPackageConfig = (id) => {
  return {
    method: "get",
    url: `${base_URL}/api/v1/products?filters=[["product_type_id","=","${id}"]]`,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};
export const vendorPriceListConfig = (id, params) => {
  return {
    method: "get",
    url: `${base_URL}/api/v1/vendors/pricelist/dropdown?per_page=${params.limit}&page_no=${params.offset}&filters=[["vendor_id","=",${id}]]`,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
  };
};

export const createVPConfig = (obj) => {
  var data = JSON.stringify({
    jsonrpc: "2.0",
    params: obj,
  });
  return {
    method: "post",
    url: `${base_URL}/api/v1/product/vendor-pack/create`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${GLOBAL_API_SOURCE.token}`,
    },
    data: data,
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