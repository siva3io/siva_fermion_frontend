import React from "react";
import "./LabeledText.css";

const LabeledText = (props) => {
  return (
    <div
      className={props.m_4 ? "labeledTextWrapper_m_4" : "labeledTextWrapper"}
    >
      <div className={props.card ? "labelWrap_card" : "labelWrap"}>
        <label
          htmlFor={props.label.toLowerCase().split(" ").join("_")}
          className={props.disabled_y ? "label_disabled" : "label"}
        >
          {props.label}
        </label>
      </div>
      <p className={props.card ? "labeledText_card" : "labeledText"}>
        {props.dot_icon && <i className="material-icons dot_icon">circle</i>}
        <span>{props.text}</span>
      </p>
    </div>
  );
};

export default LabeledText;

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