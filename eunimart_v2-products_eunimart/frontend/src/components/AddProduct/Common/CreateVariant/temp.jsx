import React, { useState, useEffect } from "react";
import "./CreateVariant.css";
import FormikForm from "../FormikForms/FormikForm";
import CVTable from "./Table/CVTable";
import Multiselect from "multiselect-react-dropdown";
import Dropdown from "../../../../shared/OtherCommon/Dropdown/Dropdown";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  getPropertyAttribute,
  createPropertyAttribute,
  createVariantTable,
} from "../../../../redux/Action/FetchCreateVariantAction";

//MUI
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";

function CreateVariant({
  staticForm,

  step2Data,
  setStep2Data,
  productId,
}) {
  //redux variables
  const dispatch = useDispatch();
  const attributes = useSelector(
    (state) => state.fetchCreateVariant.attribute.Attribute
  );
  let properties = useSelector(
    (state) => state.fetchCreateVariant.property.Property
  );
  const newAttribute = useSelector(
    (state) => state.fetchCreateVariant.newAttribute.NewAttribute
  );
  const newProperty = useSelector(
    (state) => state.fetchCreateVariant.newProperty.NewProperty
  );
  let variantTable = useSelector(
    (state) => state.fetchCreateVariant.variantTable.VariantTable
  );

  //local variables
  const [localVariantTableData, setLocalVariantTableData] = useState([]);

  //This array is used to map selected properties to respective attribute
  const [propertiesArr, setPropertiesArr] = useState([]);

  //Array to be attached in api >> attributes key
  const [finalAttributes, setFinalAttributes] = useState([
    {
      attr_id: null,
      val_ids: [],
    },
  ]);

  //indicates current property selected index
  const [propertyIndex, setPropertyIndex] = useState(0);

  // This array will maintain the boolean value of each property
  const [attriBool, setAttriBool] = useState([]);

  //local funnction
  const addAttribute = () => {
    properties = [];
    setFinalAttributes([
      ...finalAttributes,
      {
        attr_id: null,
        val_ids: [],
      },
    ]);
  };

  const propInsert = (arrCount) => {};

  //useEffect functions
  useEffect(() => {
    setLocalVariantTableData(variantTable);
  }, [variantTable]);

  useEffect(() => {
    let tempFinalAttributes = [...finalAttributes];
    if (finalAttributes.length > 0 && newAttribute.length > 0) {
      dispatch(getPropertyAttribute(newAttribute[0]));

      tempFinalAttributes[propertyIndex].attr_id = Number(newAttribute[0]);

      setFinalAttributes(tempFinalAttributes);
    }
  }, [newAttribute]);

  useEffect(() => {
    if (
      finalAttributes[propertyIndex] &&
      finalAttributes[propertyIndex].attr_id !== null
    ) {
      dispatch(getPropertyAttribute(finalAttributes[propertyIndex].attr_id));
    }
  }, [newProperty]);

  useEffect(() => {
    if (
      finalAttributes[propertyIndex] &&
      finalAttributes[propertyIndex].attr_id !== null &&
      properties
    ) {
      const tempArr = [...propertiesArr];
      tempArr[propertyIndex] = properties;
      setPropertiesArr(tempArr);
    }
  }, [properties]);

  return (
    <div className="locationDetailsMain">
      <div className="locationDetailForm">
        {staticForm && (
          <div className="staticFormCard">
            <div className="staticFormCardTitle">Create Variant</div>
            {finalAttributes &&
              finalAttributes.length > 0 &&
              finalAttributes.map((elem, index) => (
                <AttributeRow
                  setFinalAttributes={setFinalAttributes}
                  finalAttributes={finalAttributes}
                  tempCount={index}
                  elem={elem}
                  attributes={attributes}
                  properties={properties}
                  propertiesArr={propertiesArr}
                  setPropertiesArr={setPropertiesArr}
                  newProperty={newProperty}
                  setPropertyIndex={setPropertyIndex}
                  propsCall={(value) => {
                    propInsert(value);
                  }}
                  attriBool={attriBool}
                />
              ))}
            <div className="createVariantActionBtns">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={addAttribute}
                style={{ textTransform: "none" }}
              >
                Add More
              </Button>
              <Button
                variant="contained"
                startIcon={<LoopOutlinedIcon />}
                onClick={() => {
                  if (finalAttributes.length !== 0)
                    dispatch(createVariantTable(productId, finalAttributes));
                }}
                style={{ textTransform: "none", marginLeft: "10px" }}
              >
                Generate Variants
              </Button>
            </div>
            <div style={{ color: "#416BFF", margin: "8px 0px" }}>
              <label>Select Applicable Variants</label>
            </div>
            <div className="createVarientTable">
              <CVTable
                heading={[
                  "Variant SKUID",
                  "Property",
                  "Variant Sale Price",
                  "Images",
                  "Action",
                ]}
                variantTableData={localVariantTableData}
                setLocalVariantTableData={setLocalVariantTableData}
                step2Data={step2Data}
                setStep2Data={setStep2Data}
              ></CVTable>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const AttributeRow = ({
  setFinalAttributes,
  finalAttributes,
  tempCount,
  // elem,
  attributes,
  properties,
  propertiesArr,
  // setPropertiesArr,
  // newProperty,
  propsCall,
  attriBool,
  setPropertyIndex,
}) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const multiselectRef = React.createRef();
  const [selectedValue, setSelectedValue] = useState([]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (e.target.className == "notFound") {
        if (
          document.getElementsByClassName("searchBox")[tempCount] &&
          !document.getElementsByClassName("searchBox")[tempCount].value == ""
        ) {
          dispatch(
            createPropertyAttribute(
              document.getElementsByClassName("searchBox")[tempCount].value,
              finalAttributes[tempCount].attr_id
            )
          );
          setPropertyIndex(tempCount);
          propsCall(tempCount);
        }
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  });

  useEffect(() => {
    if (
      finalAttributes.length > 0 &&
      finalAttributes[finalAttributes.length - 1].attr_id === null
    ) {
      properties = [];
    }
  }, [finalAttributes]);

  const onSelect = (selectedList, selectedItem) => {
    const valueArr = selectedList.map((item) => item.value);
    const idArr = selectedList.map((item) => item.id);
    const tempFinalAttributes = [...finalAttributes];
    tempFinalAttributes[tempCount].val_ids = idArr;
    setFinalAttributes(tempFinalAttributes);
  };

  const onRemove = (selectedList, removedItem) => {
    const valueArr = selectedList.map((item) => item.value);
    const idArr = selectedList.map((item) => item.id);
    const tempFinalAttributes = [...finalAttributes];
    tempFinalAttributes[tempCount].val_ids = idArr;
    setFinalAttributes(tempFinalAttributes);
  };

  const onSelectionchange = (value) => {
    //checking wheather it is new row or not
    dispatch(getPropertyAttribute(value));

    if (finalAttributes[tempCount].val_ids === []) {
      let tempFinalAttributes = [...finalAttributes];
      tempFinalAttributes[tempCount].attr_id = Number(value);
      setFinalAttributes(tempFinalAttributes);
      setPropertyIndex(tempCount);
    } else {
      multiselectRef.current.resetSelectedValues();

      let tempFinalAttributes = [...finalAttributes];
      tempFinalAttributes[tempCount].attr_id = Number(value);
      tempFinalAttributes[tempCount].val_ids = [];
      setFinalAttributes(tempFinalAttributes);

      setPropertyIndex(tempCount);
    }
  };

  const multiSelectOptions =
    propertiesArr[tempCount] &&
    propertiesArr[tempCount].map(function (x) {
      return {
        id: x[0],
        value: x[1] && x[1].split(": ")[1],
      };
    });

  const style = {
    searchBox: {
      overflowX: "scroll",
    },
  };

  return (
    <div className="addVariantBlock">
      <div className="addVariantLeft">
        <Dropdown
          label={"Select Variant Attribute"}
          placeholder={`Select Variant Attribute`}
          options={attributes}
          required={true}
          errorMessage={"Please select variant attribute"}
          onChange={onSelectionchange}
          tempCount={tempCount}
          setPropertyIndex={setPropertyIndex}
          attriBool={attriBool[tempCount]}
        />
      </div>
      <div className="addVariantRight">
        <div className="labelWrapper">
          <div className="labelWrapCV">
            <label className="labelCV">{"Select Property"}</label>
          </div>

          <Multiselect
            options={multiSelectOptions} // Options to display in the dropdown
            selectedValues={selectedValue} // Preselected value to persist in dropdown
            onSelect={onSelect} // Function will trigger on select event
            onRemove={onRemove} // Function will trigger on remove event
            displayValue={"value"} // Property name to display in the dropdown options
            ref={multiselectRef}
            showArrow={true}
            showCheckbox={true}
            emptyRecordMsg={
              document.getElementsByClassName("searchBox")[tempCount] &&
              document.getElementsByClassName("searchBox")[tempCount].value
                ? `create "${
                    document.getElementsByClassName("searchBox")[tempCount]
                      .value
                  }"`
                : "Property not found"
            }
            onSearch={(e) => {
              setSearchValue(e);
            }}
            style={style}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateVariant;


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