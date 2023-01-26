import React, { useState, useEffect } from "react";
import {
  loadAdjustmentType,
  loadReasonType,
  createInventory,
  loadInventoryAdjById,
  loadProductVariantData,
  Update_Inventory_Adjustment_Data,
} from "../../redux/actions/FetchInventoryAdj";
import {
  loadASNData,
  loadASNDataById,
  loadSOURCE_DOCUMENTData,
  loadGRNData,
  loadGRNDataById,
  loadpickListSOURCE_DOCUMENTData,
  deleteProductLine,
} from "../../redux/actions/action";
import { lazy, Suspense } from "react";
import { loadProductsData } from "../../redux/actions/FetchPicklist";
import { loadLocations } from "../../redux/actions/FetchPicklist";
import { useDispatch, useSelector } from "react-redux";
import AddForm from "Remote/AddForm";
import AddForm_Table from "Remote/AddForm_Table";
import { Link } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddFormFooter_Button from "Remote/AddFormFooter_Button";
import { inventorycreateData } from "../../App";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "../../ErrorBoundary";
import moment from "moment";

function InventoryCreate(props) {
  let dispatch = useDispatch();
  const history = useHistory();
  const RemoteWrapper = ({ children }) => (
    <div>
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  );

  const { inventoryAdjtype, inventoryReasontype } = useSelector(
    state => state.inventorydata
  );

  const { locationsdata } = useSelector(state => state.picklistdata);

  const { inventoryAdjData, productVariantData } = useSelector(
    state => state.inventorydata
  );

  const {
    SourceDocumentTypesData,
    ASNdata,
    ASNViewdata,
    GRNdata,
    GRNViewdata,
  } = useSelector(state => state.data);

  const [mainData, setMainData] = useState({});

  useEffect(() => {
    dispatch(loadAdjustmentType());
    dispatch(loadReasonType());
    dispatch(loadSOURCE_DOCUMENTData());
    dispatch(loadLocations());
    dispatch(
      loadProductVariantData({
        limit: 10,
        offset: 1,
        filters: null,
        sort: null,
      })
    );
    if (props && props.id) {
      const { id } = props;
      dispatch(loadInventoryAdjById(id));
    }
  }, []);

  useEffect(() => {
    if (props && props.id && inventoryAdjData) {
      var newMainData = [];
      var newAdjustmentDetails = adjustmentdetails.map(o => {
        if (o.key == "adjustment_date") {
          o.value = moment(inventoryAdjData?.adjustment_date).format(
            "yyyy-MM-DD"
          );
        }
        if (o.key == "adjustment_type") {
          o.value = inventoryAdjData?.adjustment_type_id;
          o.sub.map(o => {
            if (o.value == inventoryAdjData?.adjustment_type_id)
              return (o.checked = true);
            else return (o.checked = false);
          });
        }
        if (o.key == "Link_Source_Document_Type") {
          o.value =
            inventoryAdjData?.source_documents?.source_document?.lookup_code;
        }
        if (o.key == "Link_Source_Document") {
          o.value =
            inventoryAdjData?.source_documents?.source_document_id?.label;
        }
        if (o.key == "warehouse_name")
          o.value = {
            id: inventoryAdjData?.warehouse?.id,
            label: inventoryAdjData?.warehouse?.name,
          };
        if (o.key == "refrence_number")
          o.value = inventoryAdjData?.reference_number;
        if (o.key == "reason") {
          o.value = {
            id: inventoryAdjData?.reason_id,
            label: inventoryAdjData?.reason?.display_name,
          };
        }
        return o;
      });
      setadjustmentdetails(newAdjustmentDetails);

      var nweselectedProductData = [];

      if (inventoryAdjData.inventory_adjustment_lines)
        nweselectedProductData =
          inventoryAdjData.inventory_adjustment_lines.map(o => {
            return {
              item_name: o.product.product_name,
              item_number: { id: o.product.id, label: o.product.sku_code },
              product_id: o.product_id,
              product_variant_id: o?.product_variant_id,
              description: o.description,
              // product_price: parseInt(o?.product_price),
              stock_in_hand: parseInt(o.stock_in_hand),
              unit_price: parseInt(o.unit_price),
              adjusted_price: parseInt(o.adjusted_price),
              balance_quantity: parseInt(o.balance_quantity),
              adjusted_quantity: parseInt(o.adjusted_quantity),
            };
          });
      setSelectedProductData(nweselectedProductData);

      // var newChangedetails = changeDetails.map((o) => {
      //   if (o.key == "total_change_in_inventory_count") o.value = y;
      //   if (o.key == "total_change_in_inventory") o.value = x;
      //   return o;
      // });
      // setchangeDetails(newChangedetails);

      var newOtherDetails = otherdetails.map(o => {
        if (o.key == "notes") o.value = inventoryAdjData?.external_notes;
        return o;
      });
      setotherdetails(newOtherDetails);

      newMainData = [
        ...newAdjustmentDetails,
        ...nweselectedProductData,
        ...newOtherDetails,
      ];

      var keyValuePairMainData = {};
      newMainData.map(o => {
        if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
        if (o.key == "Link_Source_Document_Type") {
          keyValuePairMainData[o.key] =
            inventoryAdjData["source_documents"]?.source_document;
        }
        if (o.key == "Link_Source_Document") {
          keyValuePairMainData[o.key] =
            inventoryAdjData["source_documents"]?.source_document_id;
        }
        // else {
        //   keyValuePairMainData["inventory_adjustment_lines"] = o;
        // }
      });
      var idx = 0;
      keyValuePairMainData["inventory_adjustment_lines"] =
        nweselectedProductData;
      // nweselectedProductData.map((o) => {
      //   keyValuePairMainData["inventory_adjustment_lines"][idx] = o;
      //   idx += 1;
      // });
      setMainData(keyValuePairMainData);
    }
  }, [inventoryAdjData]);

  const [adjustmentdetails, setadjustmentdetails] = useState([
    {
      label: "Adjustment Date",
      type: "date",
      key: "adjustment_date",
      defaultVal: null,
    },
    {
      label: "Adjustment type",
      type: "radio",
      key: "adjustment_type",
      sub: [
        {
          value: 86,
          label: "Decrease",
        },
        {
          value: 85,
          label: "Increase",
          checked: true,
        },
      ],
    },
    {
      label: "Warehouse Name",
      type: "select",
      key: "warehouse_name",
    },
    {
      label: "Reference Number",
      type: "input",
      key: "refrence_number",
    },
    {
      label: "Source Document Type",
      type: "select",
      key: "Link_Source_Document_Type",
      // data: [
      //   {
      //     id: 1,
      //     label: "GRN",
      //   },
      //   {
      //     id: 2,
      //     label: "ASN",
      //   },
      // ],
      defaultVal: {},
    },
    {
      label: "Select Source Document",
      type: "select",
      key: "Link_Source_Document",
      defaultVal: {},
    },
    {
      label: "Adjustment Reason",
      type: "select",
      key: "reason",
    },
  ]);

  const handelRadionButtononChange = (prop, value, index = null) => {
    //setContactType(value);

    if (prop == "adjustment_type") {
      var OldState = adjustmentdetails.map(o => {
        if (o.key == prop)
          o.sub.map(p => {
            p.checked = false;
            return p;
          });
        return o;
      });
      setadjustmentdetails(OldState);
      var newState = adjustmentdetails.map(o => {
        if (o.key == prop)
          o.sub.map(p => {
            if (p.value == value) p.checked = true;
            return p;
          });
        return o;
      });
      setadjustmentdetails(newState);
    }

    var newMainData = mainData;
    newMainData[prop] = parseInt(value);
    setMainData(newMainData);
    inventorycreateData[prop] = value;
  };

  const [deletedProducts, setdeletedProducts] = useState([]);

  const [otherdetails, setotherdetails] = useState([
    {
      label: "Notes",
      type: "input",
      key: "notes",
      defaultVal: null,
    },
  ]);

  const headCells = [
    {
      key: "item_number",
      label: "Item Number",
      type: "select",
      data: productVariantData.map(o => {
        return { id: o.id, label: o.sku_id };
      }),
    },
    {
      key: "item_name",
      label: "Item Name",
      type: "text",
    },
    {
      key: "description",
      label: "Description",
      type: "input",
    },
    {
      key: "stock_in_hand",
      label: "Stock in hand",
      type: "number",
    },
    {
      key: "unit_price",
      label: "Unit Price",
      type: "number",
    },
    {
      key: "adjusted_price",
      label: "Adjusted Price",
      type: "number",
    },
    {
      key: "adjusted_quantity",
      label: "Adjusted Quantity",
      type: "number",
    },
    {
      key: "balance_quantity",
      label: "Balanace Quantity",
      type: "number",
    },
    {
      key: "Action",
      label: "Action",
      type: "view",
      renderView: item => (
        <div>
          <DeleteIcon
            onClick={() => {
              setdeletedProducts([...deletedProducts, item]);
              setSelectedProductData(
                selectedProductData.filter(
                  o => o?.product_id != item?.product_id
                )
              );
            }}
          />
        </div>
      ),
    },
  ];

  const [selectedProductData, setSelectedProductData] = useState([]);
  var selectedWarehouse = [];
  var selectedProduct = [];
  const handelCheckBoxonChange = field => {};

  const handelSelectonChange = (key, value, index = null) => {
    if (key == "Link_Source_Document_Type") {
      if (value.lookup_code == "ASN") {
        dispatch(
          loadASNData({ limit: 100, offset: 1, filters: null, sort: null })
        );
      }
      if (value.lookup_code == "GRN") {
        dispatch(
          loadGRNData({ limit: 100, offset: 1, filters: null, sort: null })
        );
      }
    }
    if (key == "Link_Source_Document") {
      if (mainData.Link_Source_Document_Type.lookup_code == "ASN") {
        dispatch(loadASNDataById(value.id));
      }
      if (mainData.Link_Source_Document_Type.lookup_code == "GRN") {
        dispatch(loadGRNDataById(value.id));
      }
    }
    // if (key == "warehouse_name") {
    //   //selectedWarehouse = locationsdata.filter(locationsdata => locationsdata.id == value.id);
    //   inventorycreateData[key] = value.id;
    // } else {
    //   inventorycreateData[key] = value;
    // }

    switch (key) {
      case "warehouse_name": {
        setadjustmentdetails(
          adjustmentdetails.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        adjustmentdetails[key] = value.id;
        break;
      }
      case "reason": {
        setadjustmentdetails(
          adjustmentdetails.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        adjustmentdetails[key] = value.id;
        break;
      }
      case "Link_Source_Document_Type": {
        setadjustmentdetails(
          adjustmentdetails.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        adjustmentdetails[key] = value.id;
        break;
      }
      case "Link_Source_Document": {
        setadjustmentdetails(
          adjustmentdetails.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        adjustmentdetails[key] = value.id;
        break;
      }
    }

    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);
  };

  const handelInputChangeTable = (key, value, index = null) => {
    if (key == "item_name") {
      selectedProductData[index]["product_name"] = value.label;
    }
    if (key == "item_number") {
      selectedProductData[index]["product_id"] = value.id;
      selectedProductData[index]["product_variant_id"] = value.id;
    } else {
      selectedProductData[index][key] = parseInt(value);
    }

    setDataByKeyAndValue(key, value, index);
    if (index == null) {
      var newMainData = mainData;
      newMainData[key] = value;
      setMainData(newMainData);
    }
  };

  const setDataByKeyAndValue = (key, value, index = null) => {
    if (index != null) {
      try {
        var newSelectedProductData = selectedProductData;

        if (key == "item_number") {
          var selectVarient = productVariantData.find(o => o.id == value.id);

          newSelectedProductData[index]["product_id"] = selectVarient["id"];
          newSelectedProductData[index]["product_variant_id"] =
            selectVarient["product_template_id"];
          newSelectedProductData[index][key] = value.label;
          newSelectedProductData[index]["item_name"] =
            selectVarient["product_name"];
          newSelectedProductData[index]["description"] =
            selectVarient["description"]["data"];
        }
        // else if (key == "adjusted_quantity") {
        //   newSelectedProductData[index]["balance_quantity"] = parseInt(value);
        //   // var newChangedetails = changeDetails.map((o) => {
        //   //   if (o.key == "total_change_in_inventory_count") o.value = value;
        //   //   return o;
        //   // });
        //   // setchangeDetails(newChangedetails);
        // }
        else if (
          key == "adjusted_price" ||
          key == "adjusted_quantity" ||
          key == "balance_quantity" ||
          key == "stock_in_hand" ||
          key == "unit_price"
        ) {
          newSelectedProductData[index][key] = parseInt(value);
        } else {
          if (key.toString().includes("."))
            newSelectedProductData[index][key.split(".")[0]][
              key.split(".")[1]
            ] = value;
          else newSelectedProductData[index][key] = value;
        }

        setSelectedProductData(newSelectedProductData);
      } catch (e) {
        // console.error("err1", e);
      }
    }

    try {
      var newadjustmentdetails = adjustmentdetails.map(o => {
        if (o.key == key) o.value = value;
        return o;
      });
      setadjustmentdetails(newadjustmentdetails);
    } catch (e) {
      // console.error("err2", e);
    }

    try {
      var newotherdetails = otherdetails.map(o => {
        if (o.key == key) o.value = value;
        return o;
      });
      setotherdetails(newotherdetails);
    } catch (e) {
      // console.error("err2", e);
    }
  };

  const handelInputChange = (key, value, index = null) => {
    setDataByKeyAndValue(key, value, index);

    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);

    if (key == "adjustment_date") {
      inventorycreateData[key] = value + "T07:20:38.204Z";
    } else {
      inventorycreateData[key] = value;
    }
  };

  const onAddNewRaw = () => {
    setSelectedProductData([...selectedProductData, {}]);
  };

  const handleButtonClick = key => {
    if (key == "Cancel") {
      history.push("/inventoryAdjustment");
      return;
    }
    if (props && props.id) {
      deletedProducts.forEach(e => {
        dispatch(deleteProductLine(props.id, e?.product_id));
      });
    }

    var newselectedProductData = selectedProductData.map(o => {
      return {
        product_id: o?.product_id,
        product_variant_id: o?.product_variant_id,
        // product_template_id: o?.product_template_id,
        stock_in_hand: parseInt(o.stock_in_hand),
        unit_price: parseInt(o.unit_price),
        adjusted_price: parseInt(o.adjusted_price),
        balance_quantity: parseInt(o.balance_quantity),
        adjusted_quantity: parseInt(o.adjusted_quantity),
        partner_id: 1,
        description: o?.description,
        item_name: o?.item_name,
        item_number: o?.item_number,
      };
    });
    setSelectedProductData(newselectedProductData);

    mainData["inventory_adjustment_lines"] = selectedProductData;

    var body = {
      external_notes: mainData?.notes,
      internal_notes: "",
      adjustment_date: mainData?.adjustment_date + "T07:20:38.204Z",
      adjustment_type_id: mainData.adjustment_type
        ? parseInt(mainData.adjustment_type)
        : 84,
      reference_number: mainData?.refrence_number,
      reason_id: mainData?.reason?.id ? mainData?.reason?.id : 92,
      shipping_order_id: 1,
      total_change_in_inventory: 10,
      partner_id: 3,
      source_documents: {
        id: 1,
        data: "",
        source_document: {
          id: mainData?.Link_Source_Document_Type?.id,
          lookup_code: mainData?.Link_Source_Document_Type?.lookup_code,
          display_name: mainData?.Link_Source_Document_Type?.label,
        },
        source_document_id: {
          id: mainData?.Link_Source_Document?.id,
          label: mainData?.Link_Source_Document?.label,
        },
      },
      source_document_type_id: mainData?.Link_Source_Document?.id,
      // inventory_adjustment_lines: selectedProductData,
      inventory_adjustment_lines: mainData?.inventory_adjustment_lines,

      file_attach_id: null,

      warehouse_id: mainData?.warehouse_name?.id
        ? mainData?.warehouse_name?.id
        : 1,
    };

    if (props && props.id) {
      dispatch(
        Update_Inventory_Adjustment_Data(props.id, body, function (resp) {
          toast(resp);
        })
      );
      // history.push("/inventoryAdjustment");
    } else {
      dispatch(createInventory(body));
      history.push("/inventoryAdjustment");
    }
  };

  const handelRadioChange = (prop, value, index = null) => {
    setDataByKeyAndValue(prop, value, index);
    var newState = adjustmentdetails.map(o => {
      if (o.key == field.key) {
        o.isChecked = !o.isChecked;
      }
      return o;
    });
    setadjustmentdetails(newState);
    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);
  };

  useEffect(() => {
    if (
      GRNViewdata &&
      mainData &&
      mainData.Link_Source_Document_Type &&
      mainData.Link_Source_Document_Type.lookup_code == "GRN"
    ) {
      var newMainData = mainData;

      var newadjustmentdetails = adjustmentdetails.map(o => {
        if (o.key == "refrence_number") o.value = GRNViewdata?.reference_number;
        // if (o.key == "warehouse_name") o.value = GRNViewdata?.warehouse?.name;
        return o;
      });
      setadjustmentdetails(newadjustmentdetails);

      let nweselectedProductData1 = [];
      if (GRNViewdata.grn_order_lines)
        nweselectedProductData1 = GRNViewdata.grn_order_lines.map(o => {
          return {
            product_id: o?.product_id ? o?.product_id : 1,
            product_variant_id: o?.product_variant_id
              ? o?.product_variant_id
              : 1,
            item_number: { id: o?.product_id, label: o?.product?.sku_id },
            // product_template_id: o.product_template_id,
            item_name: o?.product?.product_name,
            // stock_in_hand: ASNViewdata["total_quantity"],
            // adjusted_price: o?.adjusted_price ? parseInt(o?.adjusted_price) : 1,
            // adjusted_quantity: o?.adjusted_quantity
            //   ? parseInt(o?.adjusted_quantity)
            //   : 1,
            // balance_quantity: o?.adjusted_quantity
            //   ? parseInt(o?.adjusted_quantity)
            //   : 1,
            description: o?.product?.description?.data,
          };
        });

      setSelectedProductData(nweselectedProductData1);

      newMainData = [...newadjustmentdetails];
      var keyValuePairMainData = {};

      newMainData.map(o => {
        if (o.key == "adjustment_type") {
          var temp;
          o.sub.map(e => {
            if (e.checked == true) temp = e.value;
          });
          keyValuePairMainData[o.key] = temp;
        } else if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      keyValuePairMainData["inventory_adjustment_lines"] =
        nweselectedProductData1;
      setMainData(keyValuePairMainData);
    }
  }, [GRNViewdata]);

  useEffect(() => {
    if (
      ASNViewdata &&
      mainData &&
      mainData.Link_Source_Document_Type &&
      mainData.Link_Source_Document_Type.lookup_code == "ASN"
    ) {
      var newMainData = mainData;

      var newadjustmentdetails = adjustmentdetails.map(o => {
        if (o.key == "refrence_number") o.value = ASNViewdata?.reference_number;
        // if (o.key == "warehouse_name") o.value = ASNViewdata?.warehouse?.name;
        return o;
      });
      setadjustmentdetails(newadjustmentdetails);
      let nweselectedProductData2 = [];
      if (ASNViewdata.asn_order_lines)
        nweselectedProductData2 = ASNViewdata.asn_order_lines.map(o => {
          return {
            product_id: o?.product_id ? o?.product_id : 1,
            product_variant_id: o?.product_variant_id
              ? o?.product_variant_id
              : 1,
            item_number: o?.product?.sku_code,
            // product_template_id: o.product_template_id,
            item_name: o?.product?.product_name,
            // stock_in_hand: ASNViewdata["total_quantity"],
            // adjusted_price: o?.adjusted_price ? parseInt(o?.adjusted_price) : 1,
            // adjusted_quantity: o?.adjusted_quantity
            //   ? parseInt(o?.adjusted_quantity)
            //   : 1,
            // balance_quantity: o?.adjusted_quantity
            //   ? parseInt(o?.adjusted_quantity)
            //   : 1,
            description: o?.product?.description?.data,
          };
        });
      setSelectedProductData(nweselectedProductData2);

      // var newChangedetails = changeDetails.map((o) => {
      //   if (o.key == "total_change_in_inventory")
      //     o.value = ASNViewdata?.total_quantity;
      //   return o;
      // });
      // setchangeDetails(newChangedetails);

      newMainData = [...newadjustmentdetails];
      var keyValuePairMainData = {};

      newMainData.map(o => {
        if (o.key == "adjustment_type") {
          var temp;
          o.sub.map(e => {
            if (e.checked == true) temp = e.value;
          });
          keyValuePairMainData[o.key] = temp;
        } else if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      keyValuePairMainData["inventory_adjustment_lines"] =
        nweselectedProductData2;
      setMainData(keyValuePairMainData);
    }
  }, [ASNViewdata]);

  const [changeDetails, setchangeDetails] = useState([
    {
      label: "Total Change in Inventory",
      type: "label_price",
      key: "total_change_in_inventory",
    },
    {
      label: "Total Change in Inventory Count",
      type: "label_price",
      key: "total_change_in_inventory_count",
    },
  ]);

  return (
    <>
      <AddForm
        header={"Adjustment Details"}
        data={adjustmentdetails.map(field => {
          switch (field.key) {
            case "Link_Source_Document_Type": {
              field.data = SourceDocumentTypesData.map(o => {
                return {
                  id: o.id,
                  label: o.display_name,
                  lookup_code: o.lookup_code,
                };
              });
              break;
            }
            case "Link_Source_Document": {
              field.data =
                mainData &&
                mainData.Link_Source_Document_Type &&
                mainData.Link_Source_Document_Type.lookup_code == "ASN"
                  ? ASNdata.map(o => {
                      return { id: o.id, label: o.asn_number };
                    })
                  : mainData &&
                    mainData.Link_Source_Document_Type &&
                    mainData.Link_Source_Document_Type.lookup_code == "GRN"
                  ? GRNdata.map(o => {
                      return { id: o.id, label: o.grn_number };
                    })
                  : null;
              break;
            }
            case "warehouse_name":
              field.data = locationsdata.map(o => {
                return {
                  id: o.id,
                  label: o.name,
                };
              });
              break;
            case "reason":
              field.data = inventoryReasontype.map(o => {
                return {
                  id: o.id,
                  label: o.display_name,
                };
              });
              break;
          }
          return field;
        })}
        handelSelectonChange={handelSelectonChange}
        handelInputChange={handelInputChange}
        handelCheckBoxonChange={handelCheckBoxonChange}
        setRadioType={handelRadioChange}
        handelRadionButtononChange={handelRadionButtononChange}
      />

      <AddForm_Table
        headCells={headCells}
        table_data={selectedProductData}
        handelInputChange={handelInputChangeTable}
        header={"Select Item"}
        renderFooter={() => (
          <center style={{ marginTop: 10 }}>
            <Link onClick={onAddNewRaw} underline="none">
              + Add Another Line Item
            </Link>
          </center>
        )}
      />

      {/* <AddForm
        // header={"Adjustment Details"}
        data={changeDetails}
        handelInputChange={handelInputChange}
      /> */}

      <AddForm
        header={"Other Details"}
        data={otherdetails.map(field => {
          return field;
        })}
        handelInputChange={handelInputChange}
      />

      <AddFormFooter_Button handleButtonClick={handleButtonClick} />
      <ToastContainer />
    </>
  );
}

export default InventoryCreate;

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
