import React from "react";
import "./One2ManyListView.css";

const One2ManyListView = () => {
  return (
    <>
      <div className="one2Many_withNumber">
        <div className="one2Many_withNumber_inside">
          <i className="material-icons custom one2Many_withNumber_icon">
            image
          </i>
          <div className="one2Many_withNumber_text">
            <p className="one2Many_withNumber_text_name">Product Name</p>
            <p className="one2Many_withNumber_text_number">Product Number</p>
          </div>
        </div>
      </div>
      <div className="one2Many">
        <div className="one2Many_inside">
          <i className="material-icons custom one2Many_icon">collections</i>
          <div className="one2Many_text">
            <p className="one2Many_text_name">Product Name</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default One2ManyListView;


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