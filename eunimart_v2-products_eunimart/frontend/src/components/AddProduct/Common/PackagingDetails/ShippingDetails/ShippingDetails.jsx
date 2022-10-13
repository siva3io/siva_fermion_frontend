import React from "react";
import "./ShippingDetails.css";
import ShippingDetailsTable from "./Table/ShippingDetailsTable";
import { useSelector } from "react-redux";

function ShippingDetails({ step3Data, setStep3Data }) {
  const shippingPartners = useSelector(
    (state) => state.fetchVPDetails.shippingPartner.ShippingPartner
  );

  const TABLE_DUMMY_DATA = {
    header: [
      "Shipping Partner Name",
      "Package Lead Time",
      "Location Covered",
      "Action",
    ],
  };

  return (
    <div className="locationDetailsMain">
      <div className="locationDetailForm">
        <div className="staticFormCard">
          <div className="staticFormCardTitle">Shipping Partners</div>
          <div className="staticFormCardForm"></div>
          <div>
            <ShippingDetailsTable
              dataHeader={TABLE_DUMMY_DATA.header}
              data={shippingPartners}
              step3Data={step3Data}
              setStep3Data={setStep3Data}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingDetails;


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