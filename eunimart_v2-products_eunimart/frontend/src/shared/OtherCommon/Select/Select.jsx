import React, { useState } from "react";
import "./Select.css";

const Select = (props) => {
  const selectOptions = props.data;
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div className="inputWrapper">
      <div className="labelWrap">
        <label
          htmlFor={props.label.toLowerCase().split(" ").join("_")}
          className="label"
        >
          {props.label}{" "}
          {props.required ? <p className="product_required_mark">*</p> : null}
        </label>
      </div>
      <div className="select_wrapper">
        <select
          onBlur={handleFocus}
          required={props.required}
          onFocus={() => props.name === "confirmPassword" && setFocused(true)}
          focused={focused.toString()}
          placeholder={`Select ${props.label}`}
          name={props.label.toLowerCase().split(" ").join("_")}
          id={props.label.toLowerCase().split(" ").join("_")}
          className="select"
          style={{ display: props.disabled && "none" }}
          onChange={(event) => {
            // props.resetProperty();
            props.setSelectValue && props.setSelectValue(props.label);
            props.setSelectKey && props.setSelectKey(event.target.value);
            props.setVale && props.setVale(props.tempCount);
            props.setFieldKey && props.setFieldKey(props.fieldKey);
            props.onChange && props.onChange(event);
          }}
        >
          <option value="" disabled selected>{`Select ${props.label}`}</option>
          {selectOptions.map((option) => {
            return (
              <option
                key={option[0]}
                value={option[0]}
                selected={props.value === option[0] ? true : false}
              >
                {option[1]}
              </option>
            );
          })}
        </select>
        <span>{props.errorMessage}</span>
        {/* <SelectPkg
          className="basic-single"
          classNamePrefix="select"
          defaultValue={`Select ${props.label}`}
          isDisabled={false}
          isLoading={false}
          isClearable={true}
          isRtl={false}
          isSearchable={true}
          name={props.label.toLowerCase().split(" ").join("_")}
          options={selectOptions}
        /> */}
      </div>
    </div>
  );
};

export default Select;










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