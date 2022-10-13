import React, { useState } from "react";
import "./One2ManyCompanyView.css";

const One2ManyCompanyViewV2 = () => {
  const [companyViewSelectOpenV2, setCompanyViewSelectOpenV2] = useState(false);
  const [selectCompanyV2, setSelectCompanyV2] = useState("");

  const companyViewSelectHandler_openV2 = () => {
    setCompanyViewSelectOpenV2(true);
  };
  const companyViewSelectHandler_closeV2 = () => {
    setCompanyViewSelectOpenV2((preValue) => !preValue);
  };
  const DUMMY_DATA = [
    { id: 1, name: "A company Name" },
    { id: 2, name: "B company Name" },
    { id: 3, name: "C company Name" },
  ];
  const changeHandlerV2 = (e) => {
    setSelectCompanyV2(e.target.value);
  };
  return (
    <div className="one2Many_companyView">
      <div
        className="one2Many_companyView_select"
        onClick={companyViewSelectHandler_openV2}
      >
        {selectCompany !== "" && (
          <div className="one2Many_company_select_avatar">
            <p>{selectCompanyV2.slice(0, 1)}</p>
          </div>
        )}

        <div className="one2Many_company_select_text">{selectCompanyV2}</div>
      </div>
      <i
        className="material-icons custom"
        onClick={companyViewSelectHandler_closeV2}
      >
        keyboard_arrow_down
      </i>
      {companyViewSelectOpenV2 && (
        <div className="one2Many_companyViewV2_select_allOptions">
          {DUMMY_DATA.map((data) => {
            return (
              <div
                className="one2Many_companyViewV2_select_option"
                key={data.id}
              >
                <div className="select_option_radio">
                  <label className="container">
                    <input
                      type="radio"
                      name="company"
                      value={data.name}
                      onChange={changeHandlerV2}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>

                <div className="select_option_textV2">
                  <p>{data.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default One2ManyCompanyViewV2;


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