import React, { useState, useEffect } from "react";
import {
  loadContacts,
  loadLocations,
  loadDocType,
  loadInternalTransfers,
  loadProductsData,
  createPicklist,
  UpdatePicklistData,
} from "../../redux/actions/FetchPicklist";
import {
  loadpickListSOURCE_DOCUMENTData,
  loadShippingOrdersData,
  loadShippingOrderDataById,
  deletePicklistProductData,
} from "../../redux/actions/action";
import { loadIventoryViewData } from "../../redux/actions/FetchPicklistView";
import { useDispatch, useSelector } from "react-redux";
import { loadProductVariantData } from "../../redux/actions/FetchInventoryAdj";
import AddForm from "Remote/AddForm";
import AddForm_Table from "Remote/AddForm_Table";
import { Link } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddFormFooter_Button from "Remote/AddFormFooter_Button";
import { picklistcreateData } from "../../App";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

function PicklistCreate(props) {
  let dispatch = useDispatch();
  const history = useHistory();

  const {
    locationsdata,
    contactsdata,
    doctypedata,
    internaltransdata,
    productsdata,
  } = useSelector((state) => state.picklistdata);

  const {
    PickListSourceDocumentTypesData,
    ShippingOrdersData,
    ShippingOrdersViewData,
  } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadContacts());
    dispatch(loadLocations());
    dispatch(loadDocType());
    dispatch(loadInternalTransfers());
    dispatch(loadProductsData());
    dispatch(loadpickListSOURCE_DOCUMENTData());
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
      dispatch(loadIventoryViewData(id));
    }
  }, []);

  const picklistApiViewData = useSelector((state) => state.picklistviewdata);

  const [picklistViewData, setpicklistViewData] = useState([]);
  useEffect(() => {
    if (picklistApiViewData) {
      setpicklistViewData(
        picklistApiViewData ? picklistApiViewData?.picklistdata : []
      );
    }
  }, [picklistApiViewData]);

  const [mainData, setMainData] = useState({});


  useEffect(() => {
    if (props && props.id && picklistViewData) {
      var newMainData = [];

      var newPicklistdetails = picklistdetails.map((o) => {
        if (o.key == "pick_list_id")
          o.value = picklistViewData?.pick_list_number;
        if (o.key == "assignee_to")
          o.value = picklistViewData?.assignee_to
            ? picklistViewData?.assignee_to
            : "??";
        if (o.key == "select_customers")
          o.value = picklistViewData?.select_customers
            ? picklistViewData?.select_customers
            : "??";
        if (o.key == "source_document_id") {
          // let x = "";
          // for (let index = 0; index < internaltransdata.length; index++) {
          //   if (
          //     picklistViewData?.source_document_ids != null &&
          //     picklistViewData?.source_document_ids ==
          //       internaltransdata[index].id
          //   ) {
          //     x = internaltransdata[index].ist_number;
          //     break;
          //   }
          // }
          // o.value = x;
          o.value =
            picklistViewData?.source_documents?.source_document_id?.label;
        }
        if (o.key == "assignee_to") {
          o.value = picklistViewData?.assignee_to?.first_name;
        }
        if (o.key == "select_customers") {
          o.value = picklistViewData?.select_customer?.first_name;
        }
        if (o.key == "pick_list_date") {
          o.value = moment(picklistViewData?.end_date_time).format(
            "yyyy-MM-DD"
          );
        }
        if (o.key == "reference_id")
          o.value = picklistViewData?.reference_number;
        if (o.key == "warehouse_name")
          o.value = picklistViewData?.warehouse?.name;
        if (o.key == "source_documents_type") {
          o.value = picklistViewData?.source_doc_type?.display_name;
        }
        return o;
      });
      setpicklistdetails(newPicklistdetails);
      var nweselectedProductData = [];
      if (picklistViewData.picklist_lines)
        nweselectedProductData = picklistViewData.picklist_lines.map((o) => {
          return {
            product_id: o.product_id,
            sku_id: o.product.sku_code,
            product_name: o?.product?.product_name,
            product_variant_id: parseInt(o?.product_variant_id),
            sales_document_id:
              o?.sales_document_id.length != 0
                ? o?.sales_document_id[0]?.id
                : "",
            customer_name: o?.customer_name ? o?.customer_name : "--",
            quantity_ordered: parseInt(o?.quantity_ordered),
            quantity_to_pick: parseInt(o?.quantity_to_pick),
            quantity_picked: parseInt(o?.quantity_picked),
            remaining_quantity: parseInt(o?.remaining_quantity),
          };
        });
      setSelectedProductData(nweselectedProductData);

      var newOtherDetails = otherdetails.map((o) => {
        if (o.key == "notes") o.value = picklistViewData?.external_notes;
        return o;
      });
      setotherdetails(newOtherDetails);

      newMainData = [
        ...newPicklistdetails,
        ...nweselectedProductData,
        ...newOtherDetails,
      ];
      var keyValuePairMainData = {};
      newMainData.map((o) => {
        if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
        // else {
        //   keyValuePairMainData["picklist_lines"] = o;
        // }
      });
      var idx = 0;
      keyValuePairMainData["picklist_lines"] = [];
      nweselectedProductData.map((o) => {
        keyValuePairMainData["picklist_lines"][idx] = o;
        idx += 1;
      });
      setMainData(keyValuePairMainData);
    }
  }, [picklistViewData, internaltransdata, doctypedata, contactsdata]);

  const { productVariantData } = useSelector((state) => state.inventorydata);

  const [picklistdetails, setpicklistdetails] = useState([
    {
      label: "Pick list ID",
      type: "input",
      key: "pick_list_id",
      defaultVal: null,
    },
    {
      label: "Auto Generate Picklist ID",
      type: "checkbox",
      key: "auto_create_picklist_number",
      isChecked: false,
    },
    {
      label: "Pick list Date",
      type: "date",
      key: "pick_list_date",
    },
    {
      label: "Assignee to",
      type: "select",
      key: "assignee_to",
    },
    {
      label: "Reference ID",
      type: "input",
      key: "reference_id",
    },
    {
      label: "Warehouse Name",
      type: "select",
      key: "warehouse_name",
    },
    {
      label: "Source documents type",
      type: "select",
      key: "source_documents_type",
    },
    {
      label: "Source document ID",
      type: "select",
      key: "source_document_id",
    },
    {
      label: "Select customers",
      type: "select",
      key: "select_customers",
    },
  ]);

  const [otherdetails, setotherdetails] = useState([
    {
      label: "Notes",
      type: "input",
      key: "notes",
      defaultVal: null,
    },
  ]);

  const [deletedProducts, setdeletedProducts] = useState([]);

  const headCells = [
    {
      key: "sku_id",
      label: "SKU ID",
      type: "select",
      data: useSelector((state) =>
        state.inventorydata.productVariantData.map((o) => {
          return { id: o.id, label: o.sku_id };
        })
      ),
    },
    {
      key: "product_name",
      label: "Product Name",
      type: "text",
    },
    {
      key: "product_variant_id",
      label: "Product Variant ID",
      type: "text",
    },
    {
      key: "sales_document_id",
      label: "Sales Document ID",
      type: "input",
    },
    {
      key: "customer_name",
      label: "Customer Name",
      type: "text",
    },
    {
      key: "quantity_ordered",
      label: "Quantity Ordered",
      type: "number",
    },
    {
      key: "quantity_to_pick",
      label: "Quantity to pick",
      type: "number",
    },
    // {
    //   key: "quantity_picked",
    //   label: "Quantity Picked",
    //   type: "number",
    // },
    // {
    //   key: "remaining_quantity",
    //   label: "Remaining Quantity",
    //   type: "number",
    // },
    {
      key: "Action",
      label: "Action",
      type: "view",
      renderView: (item) => (
        <div>
          <DeleteIcon
            onClick={() => {
              setdeletedProducts([...deletedProducts, item]);
              setSelectedProductData(
                selectedProductData.filter(
                  (o) => o?.product_id != item?.product_id
                )
              );
            }}
          />
        </div>
      ),
    },
  ];

  const [selectedProductData, setSelectedProductData] = useState([]);

  const handelCheckBoxonChange = (field) => {
    if (field.key == "auto_create_picklist_number") {
      var neworder = picklistdetails.map((o) => {
        if (o.key == "pick_list_id") o.disabled = !field.isChecked;
        return o;
      });
      setpicklistdetails(neworder);
    }

    if (field.key == "auto_create_picklist_number") {
      var newState = picklistdetails.map((o) => {
        if (o.key == field.key) {
          o.isChecked = !o.isChecked;
        }
        return o;
      });
      setpicklistdetails(newState);
      mainData[field.key] = field.isChecked;
    }
  };

  const handelSelectonChange = (key, value) => {
    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);

    if (key == "source_documents_type") {
      if (value.lookup_code == "SHIPPING_ORDERS") {
        dispatch(
          loadShippingOrdersData({
            limit: 100,
            offset: 1,
            filters: null,
            sort: null,
          })
        );
      }
    }
    if (key == "source_document_id") {
      if (mainData.source_documents_type.lookup_code == "SHIPPING_ORDERS") {
        dispatch(loadShippingOrderDataById(value.id));
      }
    }

    picklistcreateData[key] = value;
    switch (key) {
      case "assignee_to": {
        setpicklistdetails(
          picklistdetails.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        picklistdetails[key] = value.id;
        break;
      }
      case "warehouse_name": {
        setpicklistdetails(
          picklistdetails.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        picklistdetails[key] = value.id;
        break;
      }
      case "source_documents_type": {
        setpicklistdetails(
          picklistdetails.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        picklistdetails[key] = value.id;
        break;
      }
      case "source_document_id": {
        setpicklistdetails(
          picklistdetails.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        picklistdetails[key] = value.id;
        break;
      }
      case "select_customers": {
        setpicklistdetails(
          picklistdetails.map((o) => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        picklistdetails[key] = value.id;
        break;
      }
    }
    setDataByKeyAndValue(key, value);
  };

  //newly addded
  const setDataByKeyAndValue = (key, value, index = null) => {
    if (index != null) {
      try {
        var newSelectedProductData = selectedProductData;
        if (key == "sku_id") {
          var selectVarient = productVariantData.find((o) => o.id == value.id);
          newSelectedProductData[index]["product_name"] =
            selectVarient["product_name"];
          newSelectedProductData[index]["product_variant_id"] =
            selectVarient["id"];
          newSelectedProductData[index]["product_id"] = parseInt(
            selectVarient["id"]
          );
          //newSelectedProductData[index][key] = value.label;
        } else {
          if (key.toString().includes(".")) {
            newSelectedProductData[index][key.split(".")[0]][
              key.split(".")[1]
            ] = value;
          }
          // else if (key == "sales_document_id") {
          //   // newSelectedProductData[index][key] = o.sales_document_id
          //   //   ? [{ id: parseInt(o.sales_document_id) }]
          //   //   : [];
          //   newSelectedProductData[index][key] =
          //     value.length != 0 ? value[0]?.id : value;
          // }
          else if (key == "customer_name" || key == "sales_document_id")
            newSelectedProductData[index][key] = value;
          else newSelectedProductData[index][key] = parseInt(value);
        }
        setSelectedProductData(newSelectedProductData);
      } catch (e) {}
    }
    try {
      var newpicklistdetails = picklistdetails.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setpicklistdetails(newpicklistdetails);
    } catch (e) {}

    try {
      var newOtherdetails = otherdetails.map((o) => {
        if (o.key == key) o.value = value;
        return o;
      });
      setotherdetails(newOtherdetails);
    } catch (e) {}
  };

  const handelInputChangeTable = (key, value, index = null) => {
    // if (key == "product_id") {
    //   selectedProductData[index][key] = value.id;
    // }
    if (
      key == "quantity_ordered" ||
      key == "quantity_picked" ||
      key == "quantity_to_pick" ||
      key == "remaining_quantity" ||
      key == "product_variant_id"
    ) {
      selectedProductData[index][key] = parseInt(value);
    } else {
      selectedProductData[index][key] = value;
      // selectedProductData[index]["partner_id"] = 1;
    }
    if (key == "product_id") {
      selectedProductData[index]["product_id"] = value.id;
      selectedProductData[index]["product_variant_id"] = value.id;
    }
    setDataByKeyAndValue(key, value, index);
    if (index == null) {
      var newMainData = mainData;
      // if (!newMainData["picklist_lines"][index])
      //   newMainData["picklist_lines"][index] = {
      //     ...newMainData["picklist_lines"][index - 1],
      //   };
      // newMainData["picklist_lines"][index][key] = value;
      newMainData[key] = value;
      setMainData(newMainData);
    }
  };

  const handelInputChange = (key, value) => {
    if (key == "pick_list_date") {
      picklistcreateData[key] = value + "T07:20:38.204Z";
    } else {
      picklistcreateData[key] = value;
    }

    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);
    setDataByKeyAndValue(key, value);
  };

  const onAddNewRaw = () => {
    setSelectedProductData([...selectedProductData, {}]);
  };

  useEffect(() => {
    if (
      ShippingOrdersViewData &&
      mainData &&
      mainData.source_documents_type &&
      mainData.source_documents_type.lookup_code == "SHIPPING_ORDERS"
    ) {
      var newMainData = [];
      var newpicklistdetails = picklistdetails.map((o) => {
        if (o.key == "reference_id")
          o.value = ShippingOrdersViewData?.reference_number;
        return o;
      });
      setpicklistdetails(newpicklistdetails);

      newMainData = [...newpicklistdetails];
      let nweselectedProductData2 = [];
      if (ShippingOrdersViewData.shipping_order_lines)
        nweselectedProductData2 =
          ShippingOrdersViewData.shipping_order_lines.map((o) => {
            return {
              product_id: o.product_variant?.id,
              sku_id: o.product_variant?.sku_id,
              product_variant_id: o?.product_variant_id
                ? o?.product_variant_id
                : 1,
              product_name: o?.product_variant?.product_name,
              item_number: o?.product?.sku_code,
              product_template_id: o.product_template_id,
              item_name: o?.product?.product_name,

              description: o?.product?.description?.data,
            };
          });
      setSelectedProductData(nweselectedProductData2);

      var keyValuePairMainData = {};

      newMainData.map((o) => {
        if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      keyValuePairMainData["picklist_lines"] = nweselectedProductData2;
      setMainData(keyValuePairMainData);
    }
  }, [ShippingOrdersViewData]);

  const handleButtonClick = (key) => {
    if (key == "Cancel") {
      history.push("/pickList");
      return;
    }
    var tempData = selectedProductData.slice();

    if (props && props.id) {
      deletedProducts.forEach((e) => {
        dispatch(deletePicklistProductData(props.id, e?.product_id));
      });
    }

    tempData.forEach(function (o) {
      o.sales_document_id = o.sales_document_id
        ? [{ id: o.sales_document_id }]
        : [];
      o.product_id = o?.product_id?.id ? o?.product_id?.id : o?.product_id;
      o.customer_name = o?.customer_name ? o?.customer_name : "--";
      o.quantity_ordered = parseInt(o.quantity_ordered);
      o.quantity_picked = parseInt(o.quantity_picked);
      o.quantity_to_pick = parseInt(o.quantity_to_pick);
      o.remaining_quantity = parseInt(o.remaining_quantity);
      o.partner_id = 1;
    });

    // mainData["picklist_lines"] = tempData;

    var body = {
      auto_create_picklist_number: picklistdetails.find(
        (row) => row.key == "auto_create_picklist_number"
      )?.isChecked,
      pick_list_number: mainData?.pick_list_id,
      reference_number: mainData?.reference_id,
      source_document_type_id: mainData?.source_documents_type?.id,
      source_documents: {
        id: 1,
        data: "",
        source_document: {
          id: mainData?.source_documents_type?.id,
          lookup_code: mainData?.source_documents_type?.lookup_code,
          display_name: mainData?.source_documents_type?.label,
        },
        source_document_id: {
          id: mainData?.source_document_id?.id
            ? mainData?.source_document_id?.id
            : 1,
          label: mainData?.source_document_id?.label
            ? mainData?.source_document_id?.label
            : mainData?.source_document_id,
        },
      },
      source_document_ids: mainData?.source_document_id?.id
        ? mainData?.source_document_id?.id
        : mainData?.source_document_id,
      assignee_to_id: mainData?.assignee_to?.id,
      select_customer_id: mainData?.select_customers?.id,
      partner_id: 1,
      warehouse_id: mainData?.warehouse_name?.id,
      status_id: 104,
      internal_notes: mainData?.notes,
      external_notes: mainData?.notes,
      attachment_files: [],
      pick_list_date: mainData?.pick_list_date + "T08:54:24.32947Z",
      start_date_time: mainData?.pick_list_date + "T08:54:24.32947Z",
      end_date_time: mainData?.pick_list_date + "T08:54:24.32947Z",
      updated_date: mainData?.pick_list_date + "T08:54:24.32947Z",
      items_to_pick: 1,
      total_picked_items: 1,
      price_list_id: 1,
      picklist_lines: tempData,
    };
    if (props && props.id) {
      dispatch(
        UpdatePicklistData(props.id, body, function (resp) {
          toast(resp);
        })
      );
    } else {
      dispatch(createPicklist(body));
      history.push("/pickList");
    }
  };

  return (
    <>
      <AddForm
        header={"Pick list Details"}
        data={picklistdetails.map((field) => {
          switch (field.key) {
            case "assignee_to":
              field.data = contactsdata.map((o) => {
                return {
                  id: o.id,
                  label: o.first_name,
                };
              });
              break;
            case "warehouse_name":
              field.data = locationsdata.map((o) => {
                return {
                  id: o.id,
                  label: o.name,
                };
              });
              break;
            case "source_documents_type":
              field.data = PickListSourceDocumentTypesData.map((o) => {
                return {
                  id: o.id,
                  label: o.display_name,
                  lookup_code: o.lookup_code,
                };
              });
              break;
            case "source_document_id":
              field.data =
                mainData &&
                mainData.source_documents_type &&
                mainData.source_documents_type.lookup_code == "SHIPPING_ORDERS"
                  ? ShippingOrdersData.map((o) => {
                      return { id: o.id, label: o.shipping_number };
                    })
                  : null;
              break;
            case "select_customers":
              field.data = contactsdata.map((o) => {
                return {
                  id: o.id,
                  label: o.first_name,
                };
              });
              break;
          }
          return field;
        })}
        handelSelectonChange={handelSelectonChange}
        handelInputChange={handelInputChange}
        handelCheckBoxonChange={handelCheckBoxonChange}
      />

      <AddForm_Table
        headCells={headCells}
        table_data={selectedProductData}
        handelInputChange={handelInputChangeTable}
        header={"Product Details"}
        renderFooter={() => (
          <center style={{ marginTop: 10 }}>
            <Link onClick={onAddNewRaw} underline="none">
              + Add Another Line Item
            </Link>
          </center>
        )}
      />

      <AddForm
        header={"Other Details"}
        data={otherdetails.map((field) => {
          return field;
        })}
        handelInputChange={handelInputChange}
      />

      <AddFormFooter_Button
        saveDraft="false"
        handleButtonClick={handleButtonClick}
      />
      <ToastContainer />
    </>
  );
}

export default PicklistCreate;

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
