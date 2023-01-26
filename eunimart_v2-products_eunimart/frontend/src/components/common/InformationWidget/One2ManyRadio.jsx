import React from "react";
import "./One2ManyRadio.css";

const One2ManyRadio = () => {
  return (
    <>
      <div className="one2Many_vOne_radio">
        <p className="one2Many_vOne_text">Single line item</p>
        <label className="container">
          <input type="radio" name="radioA" />
          <span className="checkmark"></span>
        </label>
      </div>
      <div className="one2Many_vTwo_radio">
        <label className="container">
          <input type="radio" name="radioB" />
          <span className="checkmark"></span>
        </label>
        <p className="one2Many_vTwo_text">Single line item</p>
      </div>
    </>
  );
};

export default One2ManyRadio;

/*
 Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)
 All rights reserved.
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License v3.0 as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License v3.0 for more details.
 You should have received a copy of the GNU Lesser General Public License v3.0
 along with this program.  If not, see <https://www.gnu.org/licenses/lgpl-3.0.html/>.
*/