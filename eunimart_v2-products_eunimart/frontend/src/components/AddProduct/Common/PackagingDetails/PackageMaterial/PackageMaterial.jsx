import React, { useState, useEffect } from "react";
import "./PackageMaterial.css";
import "./PackageMaterial.css";
import { useSelector } from "react-redux";
import PackagingTable from "./PackagingTable";

function PackageMaterial({
  step3Data,
  setStep3Data,
  step1Data,
  setFinalData,
  finalData,
  edit,
}) {
  const productPackage = useSelector(
    (state) => state.fetchVPDetails.productPackage.ProductPackage
  );

  const [packingMaterialList, setpackingMaterialList] = useState([
    { package_material: "", pkg_qty: "" },
  ]);

  const addPackingMaterial = () => {
    setpackingMaterialList([
      ...packingMaterialList,
      { package_material: "", pkg_qty: "" },
    ]);
  };

  useEffect(() => {
    const tempStep3Data = { ...step3Data };
    tempStep3Data.product_packaging_line_ids = packingMaterialList;
    setStep3Data(tempStep3Data);
  }, [packingMaterialList]);

  useEffect(() => {}, [productPackage]);

  //render function
  return (
    <div className="locationDetailsMain">
      <div className="locationDetailForm">
        <div className="staticFormCard">
          <div className="staticFormCardTitle">Packaging Material</div>
          <div className="staticFormCardForm"></div>
          <div>
            <PackagingTable
              data={productPackage && productPackage.data}
              step3Data={step3Data}
              setStep3Data={setStep3Data}
              step1Data={step1Data}
              setFinalData={setFinalData}
              finalData={finalData}
              edit={edit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageMaterial;


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