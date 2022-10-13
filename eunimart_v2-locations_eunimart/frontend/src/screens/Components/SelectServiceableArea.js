import React, { useState, useEffect, Suspense } from 'react'
import ErrorBoundary from "../../ErrorBoundary"
import "../index.css"
const RemoteDynamicTable = React.lazy(() => import("Remote/DynamicTable"));
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));


const RemoteWrapper = ({ children }) => (
  <div
    style={{
      background: "white",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

export default function SelectServiceableArea({ data }) {
  console.log(data, "myDataS")
  return (

    <>

      <div className="companyDetailsOrder">
        <div className="companyDetailsOrderHeader">
          <div className="companyDetailsOrder_header">
            Selected Serviceable Area
          </div>
        </div>
        <div className="mainmain">
          <div className="ssaFormBlock2">
            <div className="ssaSearchResults">
              {
                data.map((product) => {
                  console.log(product, "product")
                  return (
                    <div className="ssaResult">
                      <label>{product.name}</label><br />
                      <label>{product.address_line1}{product.address_line2}{product.address_line3}</label><br />
                      <label>{product.state}</label>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


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