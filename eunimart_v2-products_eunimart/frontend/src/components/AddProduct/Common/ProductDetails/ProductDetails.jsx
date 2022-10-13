import React, { useState, useEffect } from "react";
import Dropdown from "../../../../shared/OtherCommon/Dropdown/Dropdown";
import "./ProductDetails.css";
import ModalViewV2 from "../../../../shared/widgets/Modal/ModalViewV2";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  createBrandDetails,
  deleteBrandDetails,
  updateBrandDetails,
  getBrandDetails,
} from "../../../../redux/Action/FetchProductDetailsAction";
//MUI
import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";

import ComboBox from "../../../../shared/widgets/ComboBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const RemoteViewTextField = React.lazy(() => import("Remote/ViewTextField"));


import { lazy, Suspense } from "react";
const RemoteInput = React.lazy(() => import("Remote/MatInput"));
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));
const RemoteRadio = React.lazy(() => import("Remote/MatRadioButton"));
const RemoteCheckbox = React.lazy(() => import("Remote/MatCheckBox"));
import ErrorBoundary from "../../../../ErrorBoundary";

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

function ProductDetails({
  edit,
  step1Data,
  setStep1Data,
  finalData,
  setFinalData,
  update,
  setUpdate,
}) {
  //redux variables
  const dispatch = useDispatch();
  const brand = useSelector(
    (state) => state.fetchAddProductDetails.brand.Brand
  );
  const [check, setCheck] = useState(false); // used to check the datas are preopulated or not...in edit mode
  const [cloneBrand, setCloneBrand] = useState([]);
  const [editableBrand, setEditableBrand] = useState([]);

  const routes = useSelector(
    (state) => state.fetchAddProductDetails.routes.Routes
  );

  const condition = useSelector(
    (state) => state.fetchAddProductDetails.condition.Condition
  );

  const productType = useSelector(
    (state) => state.fetchAddProductDetails.productType.ProductType
  );

  const procurementType = useSelector(
    (state) => state.fetchAddProductDetails.procurement.ProcurementType
  );

  const inventory = useSelector(
    (state) => state.fetchAddProductDetails.inventory.Inventory
  );

  //local variables
  const [selectKey, setSelectKey] = useState();
  const [selectValue, setSelectValue] = useState();
  const [brandModal, setBrandModal] = useState(false);
  const [staticFields, setStaticFields] = useState([
    {
      label: "Product Title",
      type: "input",
      required: true,
      errorMessage: "Product Title is required",
      key: "product_name",
      minLength: 5,
      maxLength: 100,
    },
    {
      label: "Brand",
      type: "select",
      data: [],
      required: true,
      key: "brand_id",
      value: "",
      errorMessage: "Brand is required",
    },
    {
      label: "Parent SKU ID",
      type: "input",
      key: "sku_code",
      required: true,
      errorMessage: "Parent SKU ID is required",
      minLength: 5,
      maxLength: 20,
    },
    {
      label: "HSN Code",
      type: "input",
      key: "hsn_code",
      required: false,
      errorMessage: "",
      minLength: 5,
      maxLength: 20,
    },
    {
      label: "Condition",
      type: "radio",
      required: false,
      key: "product_condition_id",
      sub: [],
      defaultVal: null,
    },
    {
      label: "Product Type",
      type: "radio",
      required: true,
      key: "product_type_id",
      sub: [],
      defaultVal: null,
    },
    {
      label: "Procurement Treatment",
      type: "checkbox",
      required: true,
      key: "product_procurement_treatment_ids",
      sub: [],
    },
    {
      label: "Stock Treatment",
      type: "checkbox",
      required: true,
      key: "stock_treatment_ids",
      sub: [
        [
          "I hold stock of this products ",
          "I hold stock of this products ",
          false,
        ],
        [
          "I  do not hold stock of this products ",
          "I  do not hold stock of this products ",
          false,
        ],
      ],
    },

    /* {
      label: "Inventory Tracking",
      type: "radio",
      required: true,
      key: "inventory_tracking_id",
      sub: [],
      defaultVal: null,
    }, */
  ]);

  //local functions
  const onInputChange = (prop, value) => {
    let tempStaticField = [...staticFields];
    let index = tempStaticField.findIndex(function (field) {
      return field.key === prop;
    });
    tempStaticField[index].errorMessage = "";
    if (tempStaticField[index].required && (!value || value.length === 0)) {
      tempStaticField[index].errorMessage = prop + " is Required";
    } else if (
      (tempStaticField[index].minLength &&
        value.length < tempStaticField[index].minLength) ||
      (tempStaticField[index].maxLength &&
        value.length > tempStaticField[index].maxLength)
    ) {
      tempStaticField[index].errorMessage =
        prop +
        "should contain " +
        tempStaticField[index].minLength +
        " - " +
        tempStaticField[index].maxLength +
        " characters";
    }
    setStaticFields(tempStaticField);

    setStep1Data({ ...step1Data, [prop]: value });
    setFinalData({ ...finalData, [prop]: value });
  };

  const onSelectionChanges = (prop, valueId, valueLabel) => {
    const tempStaticField = [...staticFields];
    if (valueId !== "create") {
      if (prop === "brand_id") {
        let index = tempStaticField.findIndex(function (field) {
          return field.key === prop;
        });
        tempStaticField[index].value = valueLabel;
      }

      setStaticFields(tempStaticField);
      setStep1Data({ ...step1Data, [prop]: valueId });
      setFinalData({ ...finalData, [prop]: valueId });
    } else {
      setBrandModal((prev) => !prev);
    }
  };

  const setRadioType = (prop, value) => {
    const tempStaticField = [...staticFields];
    let index = tempStaticField.findIndex(function (field) {
      return field.key === prop;
    });
    tempStaticField[index].defaultVal = value;
    setStaticFields(tempStaticField);
    setStep1Data({ ...step1Data, [prop]: Number(value) });
    setFinalData({ ...finalData, [prop]: Number(value) });
  };

  const setCheckboxType = (label, prop, value) => {
    const temp = [...staticFields];
    if (label === "product_procurement_treatment_ids") {
      let index = temp[6].sub.findIndex(function (field) {
        return field[0].toString() === prop.toString();
      });
      temp[6].sub[index][2] = value;
      let tempFinalArr = temp[6].sub.map((item) => {
        if (item[2] === true) {
          return { id: item[0] };
        }
      });
      tempFinalArr = tempFinalArr.filter((element) => element !== undefined);
      setStep1Data({ ...step1Data, [label]: tempFinalArr });
      setFinalData({
        ...finalData,
        [label]: tempFinalArr,
      });
    }

    if (label === "stock_treatment_ids") {
      let index = temp[7].sub.findIndex(function (field) {
        return field[0].toString() === prop.toString();
      });
      temp[7].sub[index][2] = value;

      let tempFinalArr = temp[7].sub.map((item) => {
        if (item[2] === true) {
          return { id: item[0] };
        }
      });
      tempFinalArr = tempFinalArr.filter((element) => element !== undefined);
      setStep1Data({ ...step1Data, [label]: tempFinalArr });
      setFinalData({
        ...finalData,
        [label]: tempFinalArr,
      });
    }

    setStaticFields(temp);
  };

  const onBrandCreate = (newBrandId) => {
    setStep1Data({ ...step1Data, brand_id: Number(newBrandId) });
  };

  const handleBrandModalClose = () => {
    setBrandModal(false);
  };
  const handleBrandCreate = (newBrand) => {
    setEditableBrand([...editableBrand, newBrand]);
    dispatch(createBrandDetails(newBrand));
    setTimeout(() => {
      dispatch(getBrandDetails(""));
    }, 300);
  };

  const handleDeleteBrand = (brandId) => {
    dispatch(deleteBrandDetails(brandId));
    setTimeout(() => {
      dispatch(getBrandDetails(""));
    }, 300);
  };

  const handleEditBrand = (brandName, brandId, index) => {
    const temp = [...editableBrand];
    temp[index] = brandName;
    setEditableBrand(temp);

    dispatch(updateBrandDetails(brandName, brandId));
    setTimeout(() => {
      dispatch(getBrandDetails(""));
    }, 300);
  };

  //useEffect functions
  useEffect(() => {
    if (edit && check === false && step1Data.brand_name) {
      let tempStaticField = [...staticFields];
      tempStaticField[1].value = step1Data.brand_name;
      tempStaticField[4].defaultVal = step1Data.product_condition_id;
      tempStaticField[5].defaultVal = step1Data.product_type_id;
      // tempStaticField[8].defaultVal = step1Data.inventory_tracking_id;
      setCheck(true);
      setStaticFields(tempStaticField);
    }
  }, [step1Data]);

  useEffect(() => {
    setStep1Data({ ...step1Data, brand_id: Number(selectKey) });
  }, [selectKey]);

  useEffect(() => {
    if (brand.data) {
      let temp = [];
      temp = brand.data.map((item) => {
        return {
          id: item.id,
          brand_name: item.brand_name,
          edit: false,
        };
      });

      setCloneBrand(temp);
    }

    let temp = [...staticFields];
    if (brand.data) {
      temp[1].data = brand.data.map((item) => {
        return {
          label: item.brand_name,
          value: item.id,
        };
      });
    }
    temp[1].data.push({ label: "+ Add New Brand", value: "create" });
    setStaticFields(temp);
  }, [brand]);

  useEffect(() => {
    let temp = [...staticFields];

    if (condition.data) {
      temp[4].sub = condition.data.map((item) => {
        return {
          label: item.display_name,
          type: "radio",
          value: item.id,
        };
      });
    }
    setStaticFields(temp);
  }, [condition]);

  useEffect(() => {
    let temp = [...staticFields];

    if (productType.data) {
      temp[5].sub = productType.data.map((item) => {
        return {
          label: item.display_name,
          type: "radio",
          value: item.id,
        };
      });
    }
    setStaticFields(temp);
  }, [productType]);

  useEffect(() => {
    let temp = [...staticFields];
    // ["purchase_ok", "Can be Purchase", false],
    //   ["sale_ok", "Can be Sale", false],
    if (procurementType && procurementType.data) {
      temp[6].sub = procurementType.data.map((item) => {
        if (
          edit &&
          step1Data?.product_procurement_treatment_ids?.includes(item.id) ===
          true
        ) {
          return [item.id, item.display_name, true];
        } else {
          return [item.id, item.display_name, false];
        }
      });
    }
    setStaticFields(temp);
  }, [procurementType]);

  useEffect(() => {
    let temp = [...staticFields];

    if (routes.data) {
      temp[7].sub = routes.data.map((item) => {
        if (
          edit &&
          step1Data?.stock_treatment_ids?.includes(item.id) === true
        ) {
          return [item.id, item.display_name, true];
        } else {
          return [item.id, item.display_name, false];
        }
      });
    }
    setStaticFields(temp);
  }, [routes]);

  /*   useEffect(() => {
      let temp = [...staticFields];
  
      if (inventory.data) {
        temp[8].sub = inventory.data.map((item) => {
          return {
            label: item.display_name,
            type: "radio",
            value: item.id,
          };
        });
      }
      setStaticFields(temp);
    }, [inventory]); */

  console.log("staticFields", staticFields)

  //render functions
  return (
    <div className="locationDetailsMain">
      <div className="locationDetailForm">
        {brand && (
          <div className="staticFormCard">
            <div className="staticFormCardTitle">Product Details</div>
            <div className="product-staticFormCardForm">
              {staticFields.map((field) => {
                const val = field.label;
                const typ = field.type;
                return typ === "input" ? (

                  <Suspense fallback={<div>Loading... </div>}>
                    <RemoteWrapper>
                      <RemoteInput
                        required={field.required}
                        minLength={field.minLength ? field.minLength : ""}
                        maxLength={field.maxLength ? field.maxLength : ""}
                        errorMessage={field.errorMessage ? field.errorMessage : ""}
                        type={field.type}
                        label={field.label}
                        name={field.label}
                        placeholder={`Type Your ${field.label}`}
                        value={step1Data[field.key] ? step1Data[field.key] : ""}
                        onChange={(e) => onInputChange(field.key, e.target.value)}
                      />
                    </RemoteWrapper>
                  </Suspense>


                ) : typ === "dropdown" ? (
                  <>
                    <Dropdown
                      required={field.required}
                      label={field.label}
                      placeholder={`Select ${field.label}`}
                      options={
                        field.label === "Brand"
                          ? brand
                            ? brand.data
                            : []
                          : field.data
                      }
                      setSelectKey={setSelectKey}
                      setSelectValue={setSelectValue}
                      value={step1Data[field.key] ? step1Data[field.key] : ""}
                      setVal={""}
                      staticFields={staticFields}
                      setStaticFields={setStaticFields}
                      errorMessage={
                        field.errorMessage ? field.errorMessage : ""
                      }
                      onBrandCreate={onBrandCreate}
                    />


                  </>
                ) : typ === "select" ? (
                  <>
                    <Suspense fallback={<div>Loading... </div>}>
                      <RemoteWrapper>
                        <RemoteSelect
                          required={field.required}
                          label={field.label}
                          placeholder={`Select ${field.label}`}
                          data={field.data}
                          onChange={(e, value) => {
                            onSelectionChanges(field.key, value.value, value.label);
                          }}
                          value={field.value}
                          staticFields={staticFields}
                          setStaticFields={setStaticFields}
                          errorMessage={""}
                        />
                      </RemoteWrapper>
                    </Suspense>
                  </>
                ) : typ === "add" ? (
                  <>
                    <ComboBox
                      required={field.required}
                      label={field.label}
                      placeholder={`Select ${field.label}`}
                      data={
                        field.label === "Brand"
                          ? brand
                            ? brand.data
                            : []
                          : field.data
                      }
                      onChange={(e, value) => {
                        onSelectionChanges(field.key, value.value, value.code);
                      }}
                      value={field.value}
                      staticFields={staticFields}
                      setStaticFields={setStaticFields}
                      errorMessage={""}
                    />
                  </>
                ) : typ === "checkbox" ? (
                  <div className="product-checkboxFieldMain">
                    <label
                      className="checkboxLabelWrap"
                      style={{ color: "black" }}
                    >
                      {field.label}
                      {field.required ? (
                        <p className="product_required_mark">*</p>
                      ) : null}
                    </label>
                    <div className="product-checkboxFieldSub">
                      {field.sub && (
                        <Suspense fallback={<div>Loading... </div>}>
                          <RemoteWrapper>
                            <RemoteCheckbox
                              label={field.label}
                              fields={field.sub}
                              onChange={(e) =>
                                setCheckboxType(
                                  field.key,
                                  e.target.value,
                                  e.target.checked
                                )
                              }
                            />
                          </RemoteWrapper>
                        </Suspense>
                      )}
                    </div>
                  </div>
                ) : typ === "radio" ? (
                  <div className="product-checkboxFieldMain">
                    <label
                      className="radioLabelWrap"
                      style={{ color: "black" }}
                    >
                      {field.label}
                      {field.required ? (
                        <p className="product_required_mark">*</p>
                      ) : null}
                    </label>
                    <div className="product-checkboxFieldSub">
                      {field.sub && (
                        <Suspense fallback={<div>Loading... </div>}>
                          <RemoteWrapper>
                            <RemoteRadio
                              label={field.label}
                              fields={field.sub}
                              onChange={(e) => {
                                setRadioType(field.key, e.target.value);
                              }}
                              field={field}
                            />
                          </RemoteWrapper>
                        </Suspense>
                      )}
                    </div>
                  </div>
                ) : (
                  <></>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {brandModal && (
        <ModalViewV2
          modalTitle={"Brand Create"}
          handleModalClose={handleBrandModalClose}
          handleDeleteProduct={handleBrandCreate}
          modalOpen={brandModal}
          // actionBtns={["Cancel", "Confirm"]}
          modalContentStyleHeight={"auto"}
          modalContentStyleWidth={"-webkit-fill-available"}
          styleLeft={"calc(50% - 800px/2)"}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Brand Names</Typography>
            <Box>
              <List dense={true}>
                {cloneBrand.map((item, index) => {
                  return (
                    <ListItem
                      secondaryAction={
                        editableBrand.includes(item.brand_name) &&
                          item.edit === false ? (
                          <>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => handleDeleteBrand(item.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => {
                                const temp = [...cloneBrand];
                                temp[index].edit = true;
                                setCloneBrand(temp);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </>
                        ) : (
                          <></>
                        )
                      }
                    >
                      {/* <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar> */}
                      {item.edit ? (
                        <TextField
                          label="Edit"
                          variant="outlined"
                          size="small"
                          defaultValue={item.brand_name}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleEditBrand(e.target.value, item.id, index);
                            }
                          }}
                        />
                      ) : (
                        <ListItemText primary={item.brand_name} />
                      )}
                    </ListItem>
                  );
                })}
              </List>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ width: "30%" }}>Add new Brand Name</Typography>
              <Box sx={{ width: "45px" }} />
              <TextField
                sx={{ width: "60%" }}
                label="New Brand"
                variant="outlined"
                size="small"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleBrandCreate(e.target.value);
                    e.target.value = "";
                  }
                }}
              ></TextField>
            </Box>
          </Box>
        </ModalViewV2>
      )}
    </div>
  );
}

export default ProductDetails;


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