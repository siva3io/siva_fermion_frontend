import React from "react";
import "./SimilarSeller.css";
// import ProductInput from '../../../Components/ProductInput/ProductInput';
// import ProductDropdown from '../../../Components/ProductDropdown/ProductDropdown';
// import CommonButton from "../../../shared/CommonButton/CommonButton";
import ProductTable from "../../../common/ProductTable/ProductTable";

const SimilarSeller = () => {
  return (
    <div className="similarSellerCard">
      <div className="similarSellerWrap">
        <div className="similarsellerDetails">
          <p>
            Similar Sellers{" "}
            <span style={{ color: "#B9B9B9" }}>Last Updated on 9/11/2021</span>
          </p>
          {/* <CommonButton name="Search Similar Sellers" starticon="search" /> */}
        </div>
        {/* <div className='btnSearch'> */}
        {/* </div> */}
        <span
          style={{
            // width: "1470px",
            fontSize: "16px",
            marginTop: "16px",
            // lineHeight: "24px",
          }}
        >
          Here you can see AI generated research on what your competitors are
          selling within this marketplace. Please refresh to get the latest
          information. We will send you a notification once this section is
          updated.
        </span>
      </div>
      <div className="tableContainer">
        <ProductTable />
      </div>
    </div>
  );
};

export default SimilarSeller;


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
