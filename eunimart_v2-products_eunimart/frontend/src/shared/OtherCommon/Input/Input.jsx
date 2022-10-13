import React, { useState } from "react";
import "./Input.css";

import TextField from "@mui/material/TextField";

const Input = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="input_main_wrapper">
      <div className="inputWrapper">
        <div
          className="labelWrap"
          style={{ display: props.label === "" && "none" }}
        >
          <label
            htmlFor={props.label.toLowerCase().split(" ").join("_")}
            className={props.disabled_y ? "label_disabled" : "label"}
          >
            {props.label}{" "}
            {props.required ? <p className="product_required_mark">*</p> : null}
          </label>
        </div>
        <div className="input_wrap">
          <TextField
            id="standard-name"
            onChange={onChange}
            helperText={focused ? errorMessage : ""}
            error={focused && errorMessage}
            {...inputProps}
            min={props && props.min}
            type={props.type ? props.type : "text"}
            autoComplete="off"
            onFocus={() =>
              inputProps.name === "confirmPassword" && setFocused(true)
            }
            onBlur={handleFocus}
            size="small"
          />
          {/* </FormControl>
          </Box> */}

          {/* <input
            {...inputProps}
            min={props && props.min}
            onChange={onChange} //
            onBlur={handleFocus}
            onFocus={() =>
              inputProps.name === "confirmPassword" && setFocused(true)
            }
            focused={focused.toString()}
            type={props.type ? props.type : "text"} //
            id={props.label.toLowerCase().split(" ").join("_")}
            className={"input_disabled"}
            autoComplete="off"
            // placeholder={props.placeholder}
            // style={{ display: props.disabled && "none" }}
            // disabled={props.disabled_y ? true : false}
            // name={name}
            // onChange={onChange}
            // value={props.value}
            // onBlur={props.onBlur}
            // errors={props.errors}
          /> */}

          {/* <i className="material-icons input_searchIcon">search</i> */}
          <span>{errorMessage}</span>
        </div>
      </div>
    </div>
  );
};

export default Input;








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