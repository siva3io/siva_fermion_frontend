import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, FormControlLabel, FormGroup, Link } from "@mui/material";
import AddForm from "Remote/AddForm";
import AddForm_Table from "Remote/AddForm_Table";
import AddFormFooter_Button from "Remote/AddFormFooter_Button";
import { SearchSourceDocumentData } from "../../redux/Action/SearchSourceDocumentAction";
import { getASNDataByIdData } from "../../redux/Action/getAsnDataByIdAction";
import { getPOByIdData } from "../../redux/Action/getPurchaseOrderDataByIdAction";
import { fetchSourceDocumentData } from "../../redux/Action/SourceDocumentTypeAction";
import { fetchProductsData } from "../../redux/Action/FetchProductListAction";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchUOMDropdown } from "../../redux/Action/UOMDropdownAction";
import { createGrn, editGrn } from "../../redux/Action/CreateGrnAction";
import { deleteProductline } from "../../redux/Action/ProductDeleteAction";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGrnData } from "../../redux/Action/FetchGrnListAction";

//fetching data from redux actions to display on clicking edit
import { fetchGrnbyId } from "../../redux/Action/FetchGrnByIdAction";

const GrnEdit = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({});
  const [selectedProductData, setSelectedProductData] = useState([
    {
      sku_id: "",
      product_name: "",
      inventory_id: "",
      Lot_Number: "",
      uom_id: 0,
      Ordered_Units: 0,
      received_units: 0,
      Pending_Units: 0,
      quality_check: true,
      Shelf_Location: "",
      Rejected_Quantities: 0,
      Reasons_of_Rejection: "",
      product_id: 0,
      product_template_id: 0,
    },
  ]);
  const ASNViewdata = useSelector(state => state?.AsnByIdData?.AsnDataById);
  const purchaseOrdersViewdata = useSelector(
    state => state?.POByIdData?.PODataById
  );

  const [params, setParams] = useState({ limit: 10, offset: 1 });

  const [mainData, setMainData] = useState({});
  const id = useParams().id;

  useEffect(() => {
    // to check whether we got id or not
    // to know whether to display edit or create
    console.log("Id is", id);
  });

  //fetching payloaddata by id if its edit function
  useEffect(() => {
    dispatch(fetchGrnbyId(id));
  }, []);
  const grnData = useSelector(state => state.fetchGrnById.grn);
  console.log(grnData, "grnData");

  useEffect(() => {
    //mapping data if its edit i.e we get id in api
    if (id && grnData) {
      console.log("grnDatagrnData", grnData);
      //mapping data to 1st container on edit function
      var newGRNDetailsFields = GRNDetailsFields?.map(o => {
        if (o.key == "GRN_Number") o.value = grnData?.grn_number;
        if (o.key == "Reference_ID") o.value = grnData?.reference_number;
        if (o.key == "Source_Document_Type") {
          o.value = {
            id: grnData?.source_document_type_id,
            label: grnData?.document_type?.display_name,
          };
          const valobj = {
            id: {
              id: grnData?.source_document_type_id,
              lookup_code: grnData?.document_type?.lookup_code,
              display_name: grnData?.document_type?.display_name,
            },
            label: grnData?.document_type?.display_name,
          };
          console.log(valobj?.id, "idff");
          dispatch(
            SearchSourceDocumentData(
              { limit: 100, offset: 1, filters: null, sort: null },
              valobj?.id
            )
          );
          settempValue({ ...inputValue, Source_Document_Type: valobj });
        }
        if (o.key == "Select_Source_Document") {
          console.log("values", grnData?.source_document);
          o.value = {
            id: grnData?.source_document?.id,
            label: grnData?.source_document?.label,
          };
        }

        // source_document
        if (o.key == "auto_generate_reference_number") o.value = false;
        if (o.key == "auto_generate_grn_number") o.value = false;

        return o;
      });
      setGRNDetailsFields(newGRNDetailsFields);

      // mapping second container
      var newselectedProductData = [];
      console.log(grnData, "ggg");
      if (grnData.grn_order_lines)
        newselectedProductData = grnData.grn_order_lines?.map(o => {
          return {
            sku_id: { id: o.product.id, label: o.product.sku_id },
            product_name: o.product.product_name,
            // inventory_id: o.product.inventory_details,
            Lot_Number: o.lot_number,
            uom: { name: { id: o.uom_id, label: o.uom.name } },
            Ordered_Units: Number(o.ordered_units),
            received_units: Number(o.received_units),
            Pending_Units: Number(o.pending_units),
            quality_check: o.quality_check,
            Shelf_Location: o.shelf_location,
            Rejected_Quantities: o.rejected_quantities,
            Reasons_of_Rejection: o.reason_of_rejection,
            product_id: o?.product_id,
            product_template_id: o.product_template_id,
          };
        });
      setSelectedProductData(newselectedProductData);
      console.log(selectedProductData, "--keycheck");

      // 3rd container

      var newMainData = [];

      //creating new payload

      newMainData = [...newGRNDetailsFields, ...newselectedProductData];
      console.log("maindata2", newMainData);
      var keyValuePairMainData = {};
      newMainData?.map(o => {
        if (o.key != null) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      console.log("paireddata", keyValuePairMainData);
      setMainData(keyValuePairMainData);
    }
  }, [grnData]);

  useEffect(() => dispatch(fetchSourceDocumentData()), []);
  const SourceDocument = useSelector(
    state => state.fetchSourceDocumentData?.SourceDocument
  );
  console.log(SourceDocument, "SourceDocument");

  useEffect(() => dispatch(SearchSourceDocumentData()), []);

  const SearchSourceDocument = useSelector(
    state => state.SearchSourceDocumentData?.SearchSourceDocument
  );
  console.log(SearchSourceDocument, "SearchSourceDocument");

  useEffect(() => dispatch(fetchProductsData()), []);

  const productVariantData = useSelector(
    state => state.fetchProductsData?.products
  );
  console.log(productVariantData, "productVariantData");

  useEffect(() => dispatch(fetchUOMDropdown()), []);

  const UOM = useSelector(state => state.fetchUOMDropdown?.Uom);

  const onAddNewRaw = () => {
    setSelectedProductData([
      ...selectedProductData,
      {
        Quantity: 0,
        selling_price: 0,
        discount: 0,
        product_pricing_details: { tax_options: 0 },
        sku_id: "",
        product_name: "",
        inventory_id: 0,
        Lot_Number: "",
        uom_id: 0,
        Ordered_Units: 0,
        received_units: 0,
        Pending_Units: 0,
        quality_check: true,
        Shelf_Location: "",
        Rejected_Quantities: 0,
        Reasons_of_Rejection: "",
        product_id: 23,
        product_template_id: 0,
      },
    ]);
  };

  const [GRNDetailsFields, setGRNDetailsFields] = useState([
    {
      label: "GRN Number",
      type: "input",
      key: "GRN_Number",
    },
    {
      label: "Auto Generate GRN Number ",
      type: "checkbox",
      key: "auto_generate_grn_number",
      isChecked: false,
    },
    {
      label: "Source Document Type ",
      type: "select",
      key: "Source_Document_Type",
      defaultVal: {},
    },
    {
      label: "Select Source Document",
      type: "select",
      key: "Select_Source_Document",
      defaultVal: {},
    },
    {
      label: "Reference ID",
      type: "input",
      key: "Reference_ID",
    },
    {
      label: "Auto Generate Reference ID",
      type: "checkbox",
      key: "auto_generate_reference_number",
      isChecked: false,
    },
  ]);

  const [GRNscrapOrder, setGRNscrapOrder] = useState([
    {
      label: "Create Scrap Order ",
      type: "checkbox",
      key: "create_scrap_order",
      isChecked: false,
    },
  ]);

  const headCells = [
    {
      key: "sku_id",
      label: "Product SKU",
      type: "select",
      data: productVariantData?.map(o => {
        return { id: o?.id, label: o?.sku_id };
      }),
      //   data: useSelector((state) => state.data.productVariantData?.map(o=>{return{id:o.id, label:o.sku_id}})),
    },
    {
      key: "product_name",
      label: "Product Name",
      type: "text",
    },
    {
      // key: "description.data",
      key: "inventory_id",
      label: "Inventory ID",
      type: "text",
    },
    {
      key: "Lot_Number",
      label: "Lot Number",
      type: "text",
    },
    {
      key: "uom.name",
      // key: "uom_id",
      label: "Unit Of Measurement",
      type: "select",
      data: UOM?.map(o => {
        return { id: o?.id, label: o?.name };
      }),
    },
    {
      key: "Ordered_Units",
      label: "Ordered Units",
      type: "number",
    },
    {
      key: "received_units",
      label: "Recieved Units",
      type: "number",
    },

    {
      key: "Pending_Units",
      label: "Pending Units",
      type: "number",
    },
    {
      key: "quality_check",
      label: "Quality Checked",
      type: "checkbox",
    },
    {
      key: "Shelf_Location",
      label: "Shelf Location",
      type: "text",
    },
    {
      key: "Rejected_Quantities",
      label: "Rejected Quantities",
      type: "text",
    },
    {
      key: "Reasons_of_Rejection",
      label: "Reasons of Rejection",
      type: "text",
    },
    {
      key: "Action",
      label: "Action",
      type: "view",
      renderView: item => (
        <div>
          {console.log(item.product_id, "itemid", selectedProductData)}
          <DeleteIcon
            onClick={() => {
              setSelectedProductData(
                // selectedProductData.filter((o) => o?.id != item?.id)
                selectedProductData.filter(
                  o => o?.product_id != item?.product_id
                )
              );
              deleteorderlinefun(item);
            }}
          />
        </div>
      ),
    },
  ];

  const deleteorderlinefun = item => {
    dispatch(deleteProductline(id, item?.sku_id?.id));
  };
  const handelCheckBoxonChange = field => {
    console.log("onCheckboxChanges", field);

    if (field.key == "auto_generate_grn_number") {
      var neworder = GRNDetailsFields?.map(o => {
        if (o.key == "GRN_Number") o.disabled = !field.isChecked;
        return o;
      });
      console.log(neworder, "neworder");
      setGRNDetailsFields(neworder);
      // setMainData(neworder)
    }

    if (field.key == "auto_generate_reference_number") {
      var neworder = GRNDetailsFields?.map(o => {
        if (o.key == "Reference_ID") o.disabled = !field.isChecked;
        return o;
      });
      setGRNDetailsFields(neworder);
      // setMainData(neworder)
    }

    var newState = GRNDetailsFields?.map(o => {
      if (o.key == field.key) {
        o.isChecked = !o.isChecked;
      }
      return o;
    });
    setGRNDetailsFields(newState);

    // var newMainData=mainData;

    //     newMainData[field.key]=field.ischecked;

    //     setMainData(newMainData);
    //     console.log(mainData,"mainData")
  };

  const setDataByKeyAndValue = (key, value, index) => {
    console.log(
      "key",
      key,
      "value",
      value,
      "ind",
      index,
      "setdatabykeyandvalue"
    );

    if (index != null) {
      try {
        var newSelectedProductData = selectedProductData;

        if (key === "sku_id") {
          console.log("sku_id");
          var selectVarient = productVariantData.find(o => o.id == value.id);
          newSelectedProductData[index] = selectVarient;
          newSelectedProductData[index][key] = value.label;
        } else if (key === "uom.name") {
          console.log("uom.name");
          var selectVarient = uomData.find(o => o.id == value.id);
          newSelectedProductData[index].uom = {
            name: value.label,
            id: value.id,
          };
        } else {
          console.log(key);
          if (key.toString().includes("."))
            newSelectedProductData[index][key.split(".")[0]][
              key.split(".")[1]
            ] = value;
          else newSelectedProductData[index][key] = value;
        }
        var Quantity = 0;
        var selling_price = 0;
        var discount = 0;
        if (newSelectedProductData[index].Quantity)
          Quantity = parseInt(newSelectedProductData[index].Quantity);
        if (newSelectedProductData[index].selling_price)
          selling_price = parseFloat(
            newSelectedProductData[index].selling_price
          );
        if (newSelectedProductData[index].discount)
          discount = parseFloat(newSelectedProductData[index].discount);
        var grossTotal = Quantity * selling_price - discount;
        var tax = 0;
        if (
          newSelectedProductData[index].product_pricing_details &&
          newSelectedProductData[index].product_pricing_details.tax_options &&
          parseFloat(
            newSelectedProductData[index].product_pricing_details.tax_options
          ) > 0
        ) {
          var taxRate = parseFloat(
            newSelectedProductData[index].product_pricing_details.tax_options
          );
          tax = (grossTotal * taxRate) / 100;
        } else tax = 0;

        var amount = grossTotal + tax;
        newSelectedProductData[index].Amount = amount;
        //console.log("Total", newSelectedProductData.map(o=>o.Amount).reduce((accumulator, currentValue) => accumulator + currentValue, 0));
        setSelectedProductData(newSelectedProductData);
      } catch (e) {
        console.error("err1", e);
      }
    }

    //grndetails

    try {
      var newGRNDetailsFields = GRNDetailsFields.map(o => {
        if (o.key == key) o.value = value;
        return o;
      });
      setGRNDetailsFields(newGRNDetailsFields);
      console.log("success");
    } catch (e) {
      console.error("err2", e);
    }

    // orderlines
    var prod_id = 0;
    try {
      console.log("proid:", selectedProductData);
      var newselectedProductData = selectedProductData.map(o => {
        console.log("odata", o);
        if (o.key == key) {
          console.log("ifcondition");
          o.value = value.label;
          prod_id = o.product_template_id;
        } else if (o.key == "product_id") {
          console.log("proid:", o.product_template_id);
          o.value = value.id;
          prod_id = o.product_template_id;
          //o.value = value.id;
        } else {
          prod_id = o.product_template_id;
        }
        return o;
      });
      // newselectedProductData[index]["product_id"] = value.id;
      newselectedProductData[index]["product_id"] = prod_id;
      console.log("log", newselectedProductData);
      setSelectedProductData(newselectedProductData);
      console.log("success");
      console.log("--", selectedProductData, key, value);
    } catch (e) {
      console.error("err2", e);
    }
  };
  const handelInputChange = (key, value, index = null) => {
    console.log("inputchange", key, value, index);
    setDataByKeyAndValue(key, value, index);
    if (index != null) {
      var newSelectedProductData = JSON.parse(
        JSON.stringify(selectedProductData)
      );
      if (key == "sku_id") {
        console.log("sku_id", productVariantData);
        var selectVarient = productVariantData.find(o => o?.id == value?.id);
        console.log("selectvariant", selectVarient.sku_id);
        newSelectedProductData[index] = selectedProductData[index];
        newSelectedProductData[index][key] = value?.label;
        setSelectedProductData(...newSelectedProductData);
        console.log(newSelectedProductData, "newone", selectedProductData);
      } else if (key === "uom_id") {
        console.log("uom_id");
        var selectVarient = UOM.find(o => o?.id == value?.id);
        console.log(selectVarient, "selec--");
        newSelectedProductData[index].uom = {
          name: value.label,
          id: value?.id,
        };

        newSelectedProductData[index].uom_id = value?.id;
        console.log(newSelectedProductData, "newone");
      } else if (key === "uom.name") {
        console.log("uom_id_name", key, value);
        var selectVarient = UOM.find(o => o?.id == value?.id);
        console.log(selectVarient, "selec--");
        newSelectedProductData[index].uom = {
          name: {
            id: value?.id,
            label: value?.label,
          },
        };

        // newSelectedProductData[index].uom_id = value?.id;
        console.log(newSelectedProductData, "newone");
      } else {
        if (key.toString().includes("."))
          newSelectedProductData[index][key.split(".")[0]][key.split(".")[1]] =
            value;
        else {
          console.log(
            key,
            "elseblock",
            newSelectedProductData[index],
            grnData.grn_order_lines[index]?.product_id
          );
          if (!newSelectedProductData[index]["product_id"])
            newSelectedProductData[index]["product_id"] =
              grnData.grn_order_lines[index]?.product_id;
          newSelectedProductData[index][key] = value;
        }
      }
      console.log("prodata", newSelectedProductData);
      setSelectedProductData(newSelectedProductData);
    } else {
      var newMainData = mainData;

      newMainData[key] = value;

      setMainData(...newMainData);
      console.log(mainData, "mainData");
    }
  };
  var [tempValue, settempValue] = useState({});
  const handelSelectonChange = (key, value) => {
    console.log("keyvalue", key, value);
    const valobj = {
      id: {
        id: value?.id,
        lookup_code: value?.lookup_code,
        display_name: value?.label,
      },
      label: value?.label,
    };
    value = valobj;
    console.log("handelSelectonChange", value.id);
    const tempValue = { ...inputValue, [key]: value };
    setInputValue(tempValue);
    if (key === "Source_Document_Type") {
      console.log("1234", value?.id?.lookup_code);
      if (value?.id?.lookup_code == "PURCHASE_ORDERS") {
        console.log("364573");
        dispatch(
          SearchSourceDocumentData(
            { limit: 100, offset: 1, filters: null, sort: null },
            value?.id
          )
        );
      } else if (value?.id?.lookup_code == "ASN") {
        console.log("364573");
        dispatch(
          SearchSourceDocumentData(
            { limit: 100, offset: 1, filters: null, sort: null },
            value?.id
          )
        );
      }
    }

    switch (key) {
      case "Source_Document_Type":
        setGRNDetailsFields(
          GRNDetailsFields?.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        console.log("excuse", inputValue);
        break;

      case "Select_Source_Document":
        setGRNDetailsFields(
          GRNDetailsFields?.map(o => {
            if (o.key == key) return { ...o, value: value };
            return o;
          })
        );
        console.log("excuse", inputValue, value);
        if (inputValue?.Source_Document_Type?.id?.lookup_code == "ASN") {
          // dispatch(loadASNDataById(value.id));
          dispatch(getASNDataByIdData(value?.id?.id));
        } else if (
          inputValue?.Source_Document_Type?.id?.lookup_code == "PURCHASE_ORDERS"
        ) {
          console.log("enter consdition", value.id);
          // dispatch(loadpurchase_ordersDataById(value.id));
          dispatch(getPOByIdData(value?.id?.id));
        }

        if (
          tempValue?.Select_Source_Document?.id?.lookup_code ==
          "PURCHASE_ORDERS"
        ) {
          console.log("po");
          dispatch(getPOByIdData(value?.id?.id));
        } else if (
          tempValue?.Select_Source_Document?.id?.lookup_code == "ASN"
        ) {
          console.log("asn");
          dispatch(getASNDataByIdData(value?.id?.id));
        }
        break;
    }

    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);
  };

  const setRadioType = (prop, value) => {
    console.log("setRadioType", prop, value);
  };

  console.log(
    "options_setting",
    mainData?.Source_Document_Type,
    SearchSourceDocument
  );

  const history = useNavigate();
  const handleButtonClick = key => {
    console.log("key", key);
    console.log(mainData, "mainData222", selectedProductData);

    const payload = {
      grn_number: mainData?.GRN_Number ? mainData?.GRN_Number : "",
      auto_generate_grn_number: GRNDetailsFields[1]?.isChecked ? true : false,
      // Source_Document_Type:mainData.Source_Document_Type?.id?.id,
      source_document_type_id: mainData?.Source_Document_Type?.id?.id,
      // source_document_ids: [2, 4],
      source_document_ids: mainData?.Select_Source_Document?.id,
      Select_Source_Document: GRNDetailsFields[0]?.Select_Source_Document,
      reference_number: mainData.Reference_ID ? mainData.Reference_ID : "",
      auto_generate_reference_number: GRNDetailsFields[5]?.isChecked
        ? true
        : false,
      create_scrap_order: mainData.create_scrap_order ? true : false,
      source_document: mainData?.Select_Source_Document,

      warehouse_id: 1,
      grn_order_lines: selectedProductData?.map(o => {
        return {
          sku_id: {
            id: o.sku_id.id,
            label: o.sku_id.label,
          },
          product_id: Number(o?.product_id),
          // product_id:o?.product_id,
          product_template_id: o.product_template_id,
          shelf_location: o.Shelf_Location,
          ordered_units: Number(o.Ordered_Units),
          // uom_id: o.uom_id,
          // uom: o.uom,
          uom_id: o.uom?.name?.id,
          received_units: Number(o.received_units),
          // "lot_number": parseInt(o.lot_number),
          lot_number: o.Lot_Number,
          pending_units: Number(o.Pending_Units),
          quality_check: o.quality_check == true ? true : false,
          rejected_quantities: Number(o.Rejected_Quantities),
          reason_of_rejection: o.Reasons_of_Rejection,
          // sku_id: o.sku_id,
          product: {
            inventory_details: Number(o.inventory_id),
          },
        };
      }),

      // grn_order_lines: gt,
    };

    console.log("payload1", payload);
    console.log(mainData, "mainData1");

    if (id) {
      console.log("--", id);
      dispatch(editGrn(id, payload));
    } else dispatch(createGrn(payload));

    history(`/grn`);
    setTimeout(() => {
      dispatch(fetchGrnData(params, "s2", "pagination"));
    }, 300);
  };

  // ASNViewData
  useEffect(() => {
    if (ASNViewdata) {
      console.log("ASNViewdata", ASNViewdata, mainData);
      //mapping data to 1st container on create function
      var newGRNDetailsFields = GRNDetailsFields?.map(o => {
        if (o.key == "Reference_ID") o.value = ASNViewdata?.reference_number;

        return o;
      });
      setGRNDetailsFields(newGRNDetailsFields);

      // mapping second container
      var newselectedProductData = [];
      if (ASNViewdata?.asn_order_lines)
        newselectedProductData = ASNViewdata.asn_order_lines?.map(o => {
          return {
            sku_id: {
              id: o.product_variant.id,
              label: o.product_variant.sku_id,
            },
            // product_id: o?.product_id,
            product_id: o?.product_id,
            id: o?.product_id,
            product_name: o.product.product_name,
            inventory_id: o.inventory_id,
            // inventory_id: "--",
            // Lot_Number: o.lot_number,
            // uom: { name: { id: o.uom_id, label: o.uom.name } },
            // Ordered_Units: Number(o.ordered_units),
            // received_units: Number(o.received_units),
            // Pending_Units: Number(o.pending_units),
            // quality_check: o.quality_check,
            // Shelf_Location: o.shelf_location,
            // Rejected_Quantities: o.rejected_quantities,
            // Reasons_of_Rejection: o.reason_of_rejection,

            // data.asn_order_lines[0].product_id
            product_template_id: o.product_variant_id,
          };
        });
      setSelectedProductData(newselectedProductData);
      console.log(selectedProductData, "--keycheck");

      // 3rd container

      var newMainData = [];

      //creating new payload

      newMainData = [...newGRNDetailsFields, ...newselectedProductData];
      console.log("maindata2", newMainData);
      // var keyValuePairMainData = {};
      var keyValuePairMainData = { GRN_Number: mainData?.GRN_Number };
      newMainData?.map(o => {
        if (o.key != null && o.value) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      console.log("paireddata", keyValuePairMainData);
      setMainData(keyValuePairMainData);
    }
  }, [ASNViewdata]);

  //purchaseOrdersViewdata
  useEffect(() => {
    if (purchaseOrdersViewdata) {
      console.log("purchaseOrdersViewdata", purchaseOrdersViewdata, mainData);
      //mapping data to 1st container on create function
      var newGRNDetailsFields = GRNDetailsFields?.map(o => {
        if (o.key == "Reference_ID")
          o.value = purchaseOrdersViewdata?.reference_number;
        return o;
      });
      setGRNDetailsFields([...newGRNDetailsFields]);
      console.log("changed", mainData);
      // mapping second container
      console.log(
        "purchaseOrdersViewdata.purchase_order_lines",
        purchaseOrdersViewdata.purchase_order_lines
      );
      var newselectedProductData = [];
      if (purchaseOrdersViewdata?.purchase_order_lines)
        newselectedProductData =
          purchaseOrdersViewdata.purchase_order_lines?.map(o => {
            return {
              // sku_id: { id: o.product_details?.sku_id, label: o.product_details?.sku_code },
              sku_id: {
                id: o.product_variant?.id,
                label: o.product_variant?.sku_id,
              },
              product_name: o.product_details.product_name,
              description: { data: o.inventory_id },
              inventory_id: o.inventory_id,
              product_id: o?.product_id,
              id: o?.product_id,
              product_template_id: o.product_template_id,
            };
          });
      setSelectedProductData(newselectedProductData);
      console.log(selectedProductData, mainData, "--keycheck");

      // 3rd container

      var newMainData = [];

      //creating new payload

      newMainData = [...newGRNDetailsFields, ...newselectedProductData];
      console.log("maindata2", newMainData);
      var keyValuePairMainData = { GRN_Number: mainData?.GRN_Number };
      newMainData?.map(o => {
        if (o.key != null && o.value) {
          keyValuePairMainData[o.key] = o.value;
        }
      });
      console.log("paireddata", keyValuePairMainData);
      setMainData(keyValuePairMainData);
    }
  }, [purchaseOrdersViewdata]);

  console.log("********", grnData?.document_type?.lookup_code);
  console.log(mainData, "mainn");
  return (
    <>
      {/* //Enter GRN Details */}
      <AddForm
        header={"GRN Details"}
        data={GRNDetailsFields?.map(field => {
          switch (field.key) {
            case "Source_Document_Type": {
              field.data = SourceDocument?.map(curElem => {
                return {
                  id: curElem.id,
                  label: curElem.display_name,
                  lookup_code: curElem.lookup_code,
                };
              });
              break;
            }
            case "Select_Source_Document": {
              console.log("74865", mainData.Source_Document_Type);
              if (mainData?.Source_Document_Type?.id?.lookup_code) {
                field.data =
                  mainData &&
                  mainData.Source_Document_Type &&
                  mainData.Source_Document_Type?.id &&
                  mainData.Source_Document_Type.id?.lookup_code ==
                    "PURCHASE_ORDERS"
                    ? SearchSourceDocument.map(o => {
                        return { id: o.id, label: o.purchase_order_number };
                      })
                    : mainData &&
                      mainData.Source_Document_Type &&
                      mainData.Source_Document_Type?.id &&
                      mainData.Source_Document_Type.id?.lookup_code == "ASN"
                    ? SearchSourceDocument.map(o => {
                        return { id: o.id, label: o.asn_number };
                      })
                    : null;
              }
              // for default dropdown
              else if (
                grnData?.document_type?.lookup_code == "PURCHASE_ORDERS"
              ) {
                field.data = SearchSourceDocument.map(o => {
                  return {
                    id: o.id,
                    label: o.purchase_order_number,
                    lookup_code: "PURCHASE_ORDERS",
                  };
                });
              } else if (grnData?.document_type?.lookup_code == "ASN") {
                field.data = SearchSourceDocument.map(o => {
                  return {
                    id: o.id,
                    label: o.asn_number,
                    lookup_code: "ASN",
                  };
                });
              }
            }
          }
          return field;
        })}
        handelInputChange={handelInputChange}
        handelSelectonChange={handelSelectonChange}
        handelCheckBoxonChange={handelCheckBoxonChange}
        setRadioType={setRadioType}
      />

      {/* //Product Details */}

      <AddForm_Table
        headCells={headCells}
        table_data={selectedProductData}
        handelInputChange={handelInputChange}
        header={"Add Products"}
        renderFooter={() => (
          <center style={{ marginTop: 10 }}>
            <Link onClick={onAddNewRaw} underline="none">
              + Add Product Line
            </Link>
          </center>
        )}
      />

      <div className="asnDetails">
        <div className="asnDetails_form">
          <div className="asnDetails_form_left">
            <br />
            <div className="createshipping">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Create Scrap Order"
                  onChange={e =>
                    handelInputChange("create_scrap_order", e.target.checked)
                  }
                />
              </FormGroup>
            </div>
            <p>
              If selected, a prefilled scrap order form will be opened once GRN
              is created.
            </p>
          </div>
        </div>
      </div>
      {/* 
         <AddForm header={""} data={GRNscrapOrder.map(field=> {
        return field;
       })} 
       handelInputChange={handelInputChange} handelSelectonChange ={handelSelectonChange} handelCheckBoxonChange ={handelCheckBoxonChange} setRadioType={setRadioType}   /> */}

      <AddFormFooter_Button handleButtonClick={handleButtonClick} />
    </>
  );
};

export default GrnEdit;

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
