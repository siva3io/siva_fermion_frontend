import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Dropdown.css";
import {
  createBrandDetails,
  getBrandDetails,
} from "../../../redux/Action/FetchProductDetailsAction";
import {
  createVariantAttribute,
  getVariantAttribute,
} from "../../../redux/Action/FetchCreateVariantAction";
import { searchCurrency } from "../../../redux/Action/GetCurrencyAction";

function Dropdown(props) {
  const dispatch = useDispatch();
  const selectOptions = props.options
    ? props.options.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      })
    : [];
  const [displayValue, setDisplayValue] = useState(
    props.value ? props.value : ""
  );
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const newBrand = useSelector(
    (state) => state.fetchAddProductDetails.newBrand.NewBrand
  );
  const handleFocus = (e) => {
    setFocused(true);
  };

  useEffect(() => {
    if (newBrand.length > 0) {
      props.onBrandCreate && props.onBrandCreate(newBrand[0]);
      // dispatch(getBrandDetails());
      props.setSelectValue && props.setSelectValue(props.label);
      props.setSelectedText && props.setSelectedText(newBrand[1]);
      props.setSelectKey && props.setSelectKey(newBrand[0]);
      // setBrandBool(true);
    }
  }, [newBrand]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (displayValue === "") {
      props.setSelectValue && props.setSelectValue(props.label);
      props.setSelectKey && props.setSelectKey(0);

      props.setVale && props.setVale(props.tempCount);
      // setFocused(true);
    }
  }, [displayValue]);

  function filter(options) {
    const tempOptions = handleOption(options);
    if (tempOptions?.length > 0) {
      return tempOptions.filter(
        (option) =>
          option?.label?.toLowerCase().indexOf(displayValue?.toLowerCase()) > -1
      );
    }
  }

  function displayValueFunc(value) {
    if (value.length > 0) {
      setDisplayValue(value);
    } else {
      setDisplayValue("");
    }
  }

  const handleOption = (options) => {
    if (options.length > 0) {
      const resultOptions = options.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      return resultOptions;
    } else {
      return [];
    }
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        open &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [open]);

  return (
    <div className="inputWrapper">
      <div className="labelWrap">
        <label
          htmlFor={
            props.label && props.label.toLowerCase().split(" ").join("_")
          }
          className="label"
          style={{ color: "black" }}
        >
          {props.label}{" "}
          {props.required ? <p className="product_required_mark">*</p> : null}
        </label>
      </div>

      <div className="select_wrapper">
        <div className="dropdown">
          <div className="control">
            <div className="selected-value" ref={dropdownRef}>
              {/* {props.value === displayValue ? props.value : displayValue} */}
              <input
                autocomplete="off"
                {...inputProps}
                // onChange={onChange}
                onBlur={handleFocus}
                onFocus={() =>
                  inputProps.name === "confirmPassword" && setFocused(true)
                }
                focused={focused.toString()}
                type={props.type ? props.type : "text"}
                id={
                  props.label && props.label.toLowerCase().split(" ").join("_")
                }
                ref={dropdownRef}
                placeholder={props.placeholder}
                value={displayValue}
                onChange={(e) => {
                  displayValueFunc(e.target.value);
                  if (props.label === "Select Variant Attribute") {
                    dispatch(getVariantAttribute(e.target.value));
                  }
                  if (props.label === "Brand") {
                    dispatch(getBrandDetails(e.target.value));
                  }
                  if (props.label === "Currency type") {
                    dispatch(searchCurrency(e.target.value));
                  }
                }}
                onClick={() => {
                  setOpen((prev) => !prev);
                  if (props.label === "Select Variant Attribute") {
                    dispatch(
                      getVariantAttribute(
                        displayValue.length > 0 ? displayValue : ""
                      )
                    );
                  }
                  if (props.label === "Brand") {
                    dispatch(
                      getBrandDetails(
                        displayValue.length > 0 ? displayValue : ""
                      )
                    );
                  }
                }}
              />
              <span>{props.errorMessage}</span>
            </div>

            <div className={`arrow ${open ? "open" : null}`}></div>
          </div>
          <div className={`options ${open ? "open" : null}`}>
            {filter(selectOptions)?.length > 0
              ? filter(selectOptions).map((option) => {
                  return (
                    <>
                      <div
                        className={`option ${
                          displayValue === option[1] ? "selected" : null
                        }`}
                        onClick={(event) => {
                          props.setSelectValue &&
                            props.setSelectValue(props.label);
                          props.setSelectedText &&
                            props.setSelectedText(option[1]);
                          props.setSelectKey && props.setSelectKey(option[0]);
                          props.setVale && props.setVale(props.tempCount);
                          props.onChange && props.onChange(option[0]);

                          setDisplayValue(option[1]);
                          setOpen(false);
                          setFocused(false);
                          if (
                            props.label === "Brand" ||
                            props.label === "Select Variant Attribute"
                          ) {
                            // setBrandBool(true);
                            dispatch(
                              getVariantAttribute(
                                displayValue.length > 0 ? displayValue : ""
                              )
                            );
                          }
                        }}
                      >
                        {option[1]}
                      </div>
                    </>
                  );
                })
              : null}

            {/* {(props.label === "Brand" ||
              props.label === "Select Variant Attribute") &&
              props.options &&
              (!props.options.length > 0 ||
                !props.options.some((row) => row.includes(displayValue))) && (
                <div
                  className="option selected"
                  onClick={() => {
                    if (props.label === "Brand") {
                      dispatch(createBrandDetails(displayValue));
                    }
                    if (props.label === "Select Variant Attribute") {
                      dispatch(createVariantAttribute(displayValue));
                      dispatch(getVariantAttribute(displayValue));
                      props.setPropertyIndex(props.tempCount);
                    }
                    setOpen(false);
                  }}
                >{`Create "${displayValue}"`}</div>
              )} */}
          </div>
        </div>
        {focused && <span>{props.errorMessage}</span>}
      </div>
    </div>
  );
}

export default Dropdown;



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