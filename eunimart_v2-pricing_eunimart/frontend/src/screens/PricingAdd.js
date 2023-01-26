import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@mui/material";
import {
  loadCurrencyData,
  loadUOMData,
  loadProductVariantData,
  loadgetQuantityType,
  loadCategoryTimeData,
  postPriceList,
  getVendors,
  loadLocationsData
} from "../redux/Actions/action";
import RemoteViewBox_Table from "Remote/ViewBox_Table";
import AddForm from "Remote/AddForm";
import AddFormFooter from "Remote/AddFormFooter";
import AddFormFooter_Button from "Remote/AddFormFooter_Button";
import AddForm_Table from "Remote/AddForm_Table";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

function PricingAdd() {
  const history = useHistory();
  let dispatch = useDispatch();
  //const history = useHistory();


  useEffect(() => {
    dispatch(loadCurrencyData());
    dispatch(loadUOMData());
    dispatch(loadLocationsData());
    dispatch(loadgetQuantityType());
    dispatch(loadCategoryTimeData());
    dispatch(getVendors());
    dispatch(
      loadProductVariantData({
        limit: 10,
        offset: 1,
        filters: null,
        sort: null,
      })
    );
    // handelRadionButtononChange("price_list_type",58);
    // handelPricingRadionButtononChange("Item_rate_rule",54);
  }, []);

  
  const { Currencydata, uomData, productVariantData,locationsList ,quantityValueData, categoryTimedata, vendorsData } = useSelector(
    (state) => state.data
  );

  const [PriceListDetailsFields, setPriceListDetailsFields] = useState([
    {
      label: "Price List Name",
      type: "input",
      key: "price_list_name",
      required: true,
    },
    {
      label: "Select Price List Type",
      type: "radio",
      key: "price_list_type",
      required: true,
      sub: [],
      sub: [
        {
          label: "Sales Price List",
          value: 58,
        },
        {
          label: "Purchase Price List",
          value: 57,
        },
        {
          label: "Transfer Price List",
          value: 56,
        },
      ],
    },
    {
      label: "Sales Order Currency",
      type: "select",
      key: "currency_id",
      // data: ["USD", "INR"],
      defaultVal: {},

    },
    /*  {
       label: "Foreign Exchange Price",
       type: "input",
       key: " ",
     }, */
  ]);

  const [PricingDetailsFields, setPricingDetailsFields] = useState([]);

  const [VendorDetailsFields, setVendorDetailsFields] = useState(false);

  const [ContractDetailsFields, setContractDetailsFields] = useState(false);

  const [paymentDetailsFields, setPaymentDetailsFields] = useState({
    subTotal: 0,
    tax: 0,
    shippingCharge: 0,
    adjustment_text: "",
    adjustment_amount: 0,
    total: 0,
  });

  const [mainData, setMainData] = useState({});

  const [selectedProductData, setSelectedProductData] = useState([
    {
      Quantity: 0,
      selling_price: 0,
      discount: 0,
      product_pricing_details: { tax_options: 0 },
    },
  ]);

  const [OtherDetailsFields, setOtherDetailsFields] = useState([
    // {
    //   label: "Shipping Cost",
    //   type: "input",
    //   key: "sales_Shipping_Cost",
    // },
    {
      label: "Description",
      type: "input",
      key: "sales_description",
    },
  ]);

  const [SalesheadCells, setSalesheadCells] = useState([]);

  const PurchaseheadCells = [
    {
      key: "sku_id",
      label: "Product SKU",
      type: "select",
      data: useSelector((state) =>
        state.data.productVariantData.map((o) => {
          return { id: o.id, label: o.sku_id };
        })
      ),
      required: true,
    },
    {
      key: "product_name",
      label: "Product Name",
      type: "text",
      required: true,
    },
    {
      key: "product_name",
      label: "Variant Name",
      type: "text",
      required: true,
    },
    {
      key: "Mnimum_Order_Quantity",
      label: "Mnimum Order Quantity",
      type: "text",
      required: true,
    },
    {
      key: "quantity_value_type",
      label: "Quantity Value Type",
      type: "select",
      data: useSelector((state) =>
        state.data.quantityValueData.map((o) => {
          return { id: o.id, label: o.display_name };
        })
      ),
      required: true,
    },
    {
      key: "qty1",
      label: "Quantity1",
      type: "number",
    },
    {
      key: "qty2",
      label: "Quantity2",
      type: "number",
    },
    {
      key: "selling_price",
      label: "Price",
      type: "number",
    },
    {
      key: "sales_period",
      label: "Sales Period",
      type: "text",
    },
    {
      key: "expected_delivery_time",
      label: "Expected Delivery Time",
      type: "text",
    },
    {
      key: "credit_period",
      label: "Credit Period",
      type: "text",
    },
    {
      key: "lead_time",
      label: "Lead Time",
      type: "text",
    },
    {
      key: "price_qty",
      label: "Price/Qty",
      type: "text",
    },
    {
      key: "vendor_rate",
      label: "Vendor Rate",
      type: "text",
    },
    {
      key: "Action",
      label: "Action",
      type: "view",
      renderView: (item) => (
        <div>
          <DeleteIcon
            onClick={() =>
              setSelectedProductData(
                selectedProductData.filter((o) => o.id != item.id)
              )
            }
          />
        </div>
      ),
    },
  ];
  const TransferheadCells = [
    {
      key: "sku_id",
      label: "Product SKU",
      type: "select",
      data: useSelector((state) =>
        state.data.productVariantData.map((o) => {
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
      key: "product_name",
      label: "Variant Name",
      type: "text",
    },
    {
      key: "Quantity",
      label: "Quantity",
      type: "number",
    },
    {
      key: "price",
      label: "Price",
      type: "number",
    },
    {
      key: "price_qty",
      label: "Price/Qty",
      type: "text",
    },
    {
      key: "product_rate",
      label: "Product Rate",
      type: "text",
    },
    {
      key: "Action",
      label: "Action",
      type: "view",
      renderView: (item) => (
        <div>
          <DeleteIcon
            onClick={() =>
              setSelectedProductData(
                selectedProductData.filter((o) => o.id != item.id)
              )
            }
          />
        </div>
      ),
    },
  ];

  var AssignSalesHeadCells = [
    {
      key: "sku_id",
      label: "Product SKU",
      type: "select",
      data: useSelector((state) =>
        state.data.productVariantData.map((o) => {
          return { id: o.id, label: o.sku_id };
        })
      ),
      required: true,
    },
    {
      key: "product_name",
      label: "Product Name",
      type: "text",
      required: true,
    },
    {
      key: "product_name",
      label: "Variant Name",
      type: "text",
      required: true,
    },

    {
      key: "Category_time",
      label: "Category tree",
      type: "select",
      data: useSelector((state) =>
        state.data.categoryTimedata.map((o) => {
          return { id: o.id, label: o.name };
        })
      )
    },
    {
      key: "Category_commision",
      label: "Category commision",
      type: "text",
      required: true,
    },
    {
      key: "uom",
      label: "UoM(Unit of measure)",
      type: "select",
      data: useSelector((state) =>
        state.data.uomData.map((o) => {
          return { id: o.id, label: o.name };
        })
      ),
    },
    {
      key: "quantity_value_type",
      label: "Quantity Value Type",
      type: "select",
      data: useSelector((state) =>
        state.data.quantityValueData.map((o) => {
          return { id: o.id, label: o.display_name };
        })
      )
    },
    {
      key: "Quantity1",
      label: "Quantity1",
      type: "number",
    },
    {
      key: "Quantity2",
      label: "Quantity2",
      type: "number",
    },
    {
      key: "mrp",
      label: "MRP",
      type: "text",
    },
    {
      key: "selling_price",
      label: "Sales Rate",
      type: "text",
    },
    {
      key: "d/t",
      label: "Duties/taxes",
      type: "radio",
      sub: [],
    },
    /* {
      key: "Pricing_Options",
      label: "Pricing Options",
      type: "select",
      required: true,
    }, */
    {
      key: "price",
      label: "Price",
      type: "text",
    },
    {
      key: "Action",
      label: "Action",
      type: "view",
      renderView: (item) => (
        <div>
          <DeleteIcon
            onClick={() =>
              setSelectedProductData(
                selectedProductData.filter((o) => o.id != item.id)
              )
            }
          />
        </div>
      ),
    },
  ];

  var AssignOtherDetails = [
    {
      label: "Shipping Cost",
      type: "input",
      key: "purchase_Shipping_Cost",
    },
    {
      label: "Description",
      type: "input",
      key: "purchase_description",
    },
  ];

  const handelPricingRadionButtononChange = (prop, value) => {

    console.log("handelPricingRadionButtononChange", prop, value)

    if (prop == "Item_rate_rule" || prop == "Select_Type") {
      var OldState = PricingDetailsFields.map((o) => {
        if (o.key == prop)
          o.sub.map((p) => {
            p.checked = false;
            return p;
          });
        return o;
      });
      setPricingDetailsFields(OldState);
      var newState = PricingDetailsFields.map((o) => {
        if (o.key == prop)
          o.sub.map((p) => {
            if (p.value == value) p.checked = true;
            return p;
          });
        return o;
      });
      setPricingDetailsFields(newState);
      if (value == 54) {
        console.log("enter5");
        var newArray7 = [
          {
            label: "Item rate rule",
            type: "radio",
            key: "Item_rate_rule",
            required: true,
            sub: [],
            sub: [
              { label: "Markup/Mark down by %age", value: 55 },
              {
                label: "Enter Manually in all items",
                value: 54,
                checked: true,
              },
            ],
          },
          {
            label: "",
            type: "pre",
            key: "",
          },
          {
            label: "Start Date",
            type: "date",
            key: "pricing_start_date",
          },
          {
            label: "End Date",
            type: "date",
            key: "pricing_end_date",
          },
        ];
        setSalesheadCells(AssignSalesHeadCells);
        setOtherDetailsFields(AssignOtherDetails);
        setPricingDetailsFields(newArray7);

        var newMainData = mainData;
        newMainData["enter_manually"] = true;
        setMainData(newMainData);

      } else if (value == 55) {
        console.log("enter4");
        var newArray9 = [
          {
            label: "Item rate rule",
            type: "radio",
            key: "Item_rate_rule",
            required: true,
            sub: [],
            sub: [
              { label: "Markup/Mark down by %age", value: 55, checked: true },
              { label: "Enter Manually in all items", value: 54 },
            ],
          },
          {
            label: "",
            type: "pre",
            key: "",
          },
          {
            label: "Customer Name",
            type: "input",
            key: "Customer_Name",
          },
          {
            label: "Select Type",
            type: "radio",
            key: "Select_Type",
            required: true,
            sub: [],
            sub: [
              { label: "Increased by", value: 53, checked: true },
              { label: "Decreased by", value: 52 },
            ],
          },
          {
            label: "Enter Percentage",
            type: "input",
            key: "Percentage",
          },
          {
            label: "",
            type: "pre",
            key: "",
          },
          {
            label: "Start Date",
            type: "date",
            key: "pricing_start_date",
          },
          {
            label: "End Date",
            type: "date",
            key: "pricing_end_date",
          },
        ];
        setSalesheadCells(AssignSalesHeadCells);
        setOtherDetailsFields(AssignOtherDetails);
        setPricingDetailsFields(newArray9);

        var newMainData = mainData;
        newMainData["enter_manually"] = false;
        setMainData(newMainData);

      } else if (value == 53) {
        console.log("Increased BY");
      } else if (value == 52) {
        console.log("decreased BY");
      }
    }


  };

  const handelRadionButtononChange = (prop, value) => {
    console.log("prop, value", prop, value)
    //setContactType(value);
    console.log("first", PriceListDetailsFields);
    if (prop == "price_list_type") {
      var OldState = PriceListDetailsFields.map((o) => {
        if (o.key == prop)
          o.sub.map((p) => {
            p.checked = false;
            return p;
          });
        return o;
      });
      setPriceListDetailsFields(OldState);
      var newState = PriceListDetailsFields.map((o) => {
        if (o.key == prop)
          o.sub.map((p) => {
            if (p.value == value) p.checked = true;
            return p;
          });
        return o;
      });
      setPriceListDetailsFields(newState);
      if (value == 58) {
        console.log("58");
        var newArray1 = [
          {
            label: "Item rate rule",
            type: "radio",
            key: "Item_rate_rule",
            required: true,
            sub: [],
            sub: [
              {
                label: "Markup/Mark down by %age",
                value: 55,
              },
              {
                label: "Enter Manually in all items",
                value: 54,
              },
            ],
          },
        ];
        var newArray4 = [
          {
            label: "Description",
            type: "input",
            key: "description",
          },
        ];
        setSalesheadCells([]);
        setOtherDetailsFields(newArray4);
        setContractDetailsFields(false);
        setVendorDetailsFields(false);
        setPricingDetailsFields(newArray1);
      } else if (value == 57) {
        console.log("57");
        var newArray2 = [
          {
            label: "Vendor Name",
            type: "select",
            key: "Vendor_name",
          },
          {
            label: "",
            type: "pre",
            key: "blank",
          },
          {
            label: "Start Date",
            type: "date",
            key: "vendor_start_date",
          },
          {
            label: "End Date",
            type: "date",
            key: "vendor_end_date",
          },
        ];
        setSalesheadCells([]);
        setOtherDetailsFields(AssignOtherDetails);
        setContractDetailsFields(false);
        setVendorDetailsFields(newArray2);
      } else if (value == 56) {
        console.log("56");
        var newArray5 = [
          {
            label: "Contract Sender name",
            type: "input",
            key: "Contract_Sender_name",
          },
          {
            label: "Contract Reciever name",
            type: "input",
            key: "Contract_Reciever_name",
          },
          {
            label: "Start Date",
            type: "date",
            key: "Contract_start_date",
          },
          {
            label: "End Date",
            type: "date",
            key: "Contract_end_date",
          },
        ];
        var newArray6 = [
          {
            label: "Location From Address",
            type: "select",
            key: "Location_From_Address",
          },
          {
            label: "Location To Address",
            type: "select",
            key: "Location_To_Address",
          },
          {
            label: "Sales Period",
            type: "input",
            key: "Sales_Period",
          },
          {
            label: "Expected Delivery Time",
            type: "input",
            key: "Expected_Delivery_Time",
          },
          {
            label: "Credit Period",
            type: "input",
            key: "Credit_Period",
          },
          {
            label: "Lead Time",
            type: "input",
            key: "Lead_Time",
          },
          {
            label: "Shipping Cost",
            type: "input",
            key: "Shipping_Cost",
          },
          {
            label: "Description",
            type: "input",
            key: "Description",
          },
        ];
        setSalesheadCells([]);
        setOtherDetailsFields(newArray6);
        setVendorDetailsFields(false);
        setContractDetailsFields(newArray5);
      }
    }
    // console.log("later", Contactdetails);
    // tempData[prop] = value;
  };

  const setRadioType = (prop, value) => {
    console.log("prop, value", prop, value);
  };

  const handelSelectonChangeDetails = (key, value) => {
    console.log("key, value", key, value);

    switch (key) {

      case "currency_id": {
        setPriceListDetailsFields(PriceListDetailsFields.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;
      }
      case "Vendor_name": {
        setVendorDetailsFields(VendorDetailsFields.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;
      }

      case "Location_From_Address": {
        setOtherDetailsFields(OtherDetailsFields?.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;
      }

      case "Location_To_Address": {
        setOtherDetailsFields(OtherDetailsFields?.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;
      }
    }
    // tempData[key] = value;

    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);
  };

  const handelInputChange = (key, value, index = null) => {
    console.log("key", key, "value", value, "index", index);

    if (index != null) {
      var newSelectedProductData = JSON.parse(JSON.stringify(selectedProductData));

      if (key === 'sku_id') {
        console.log("sku_id")
        var selectVarient = productVariantData.find(o => o.id == value.id);
        newSelectedProductData[index] = selectVarient;
        newSelectedProductData[index][key] = value.label;
      }
      else if (key === 'uom.name') {
        console.log("uom.name")
        var selectVarient = uomData.find(o => o.id == value.id);
        newSelectedProductData[index].uom = { name: value.label, id: value.id };
      }
      else {
        console.log(key)
        if (key.toString().includes('.')) newSelectedProductData[index][key.split(".")[0]][key.split(".")[1]] = value;
        else newSelectedProductData[index][key] = value;
      }
      var Quantity = 0;
      var selling_price = 0;
      var discount = 0;
      if (newSelectedProductData[index].Quantity) Quantity = parseInt(newSelectedProductData[index].Quantity);
      if (newSelectedProductData[index].selling_price) selling_price = parseFloat(newSelectedProductData[index].selling_price);
      if (newSelectedProductData[index].discount) discount = parseFloat(newSelectedProductData[index].discount);

      //calculation
      var grossTotal = (Quantity * selling_price) - discount;
      var tax = 0;
      if (newSelectedProductData[index].product_pricing_details && newSelectedProductData[index].product_pricing_details.tax_options && parseFloat(newSelectedProductData[index].product_pricing_details.tax_options) > 0) {
        var taxRate = parseFloat(newSelectedProductData[index].product_pricing_details.tax_options);
        tax = (grossTotal * taxRate) / 100
      }
      else tax = 0;

      var amount = grossTotal + tax;
      newSelectedProductData[index].Amount = amount;
      //console.log("Total", newSelectedProductData.map(o=>o.Amount).reduce((accumulator, currentValue) => accumulator + currentValue, 0));
      setSelectedProductData(newSelectedProductData);

      var total = newSelectedProductData.map(o => o.Amount).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      if (paymentDetailsFields.Final_Adjustment == "+") {
        total = total + paymentDetailsFields.adjustment_amount;
      }
      else {
        total = total - paymentDetailsFields.adjustment_amount;
      }
      setPaymentDetailsFields({ ...paymentDetailsFields, subTotal: grossTotal, tax: newSelectedProductData[0]?.product_pricing_details?.tax_options ?? 0, totalBeforeAdjustment: total, total: total })
    }
    else {
      var newMainData = mainData;

      newMainData[key] = value;

      setMainData(newMainData);
    }
  };

  const handleButtonClick = (key) => {
    console.log(key,"keyNmae")
    if (key=="Save_Send") 
    {console.log("payload key", mainData, PricingDetailsFields);

    if (VendorDetailsFields && !ContractDetailsFields) {
      console.log("purchase orders")

      const purchase_payload = {
        "price_list_name": mainData?.price_list_name,
        "currency_id": mainData?.currency_id?.id,
        "price_list_id": 2,
        "start_date": mainData?.vendor_start_date + "T08:54:24.32947Z",
        "end_date": mainData?.vendor_end_date + "T08:54:24.32947Z",
        "vendor_name_id": mainData?.Vendor_name?.id,
        "status_id": 78,
        "company_id": 1,
        "price_list_rule": "--",
        "description": mainData?.purchase_description,
        "customer_name": mainData?.Customer_Name,

        purchase_line_items: selectedProductData.map(o => {
          return {
            "product_id": Number(o?.id),
            "minimum_order_quantity": Number(o?.Mnimum_Order_Quantity),
            "sales_period": o?.sales_period,
            "credit_period": o?.credit_period,
            "expected_delivery_time": o?.expected_delivery_time,
            "lead_time": o?.lead_time,
            "quantity_value": {
              "qty1": Number(o?.qty1),
              "qty2": Number(o?.qty2)
            },
            "quantity_value_type_id": Number(o?.quantity_value_type?.id),
            "price": parseFloat(o?.selling_price),
            "price_quantity": parseFloat(o?.price_qty),
            "vendor_rate": Number(o?.vendor_rate)
          }
        }),
        "other_details": {
          "shipping_cost": parseInt(mainData?.purchase_Shipping_Cost),
        }
      }

      dispatch(postPriceList(purchase_payload));
      history.push("/pricing");

    }

    if (!VendorDetailsFields && ContractDetailsFields) {
      console.log("transfer orders")

      const transfer_payload = {
        "price_list_name": mainData.price_list_name,
        "currency_id": mainData?.currency_id?.id,
        "customer_name": mainData?.Customer_Name,
        "price_list_id": 3,
        "start_date": mainData.Contract_end_date + "T08:54:24.32947Z",
        "end_date": mainData.Contract_end_date + "T08:54:24.32947Z",
        "description": mainData.Description,
        "price_list_rule": "--",
        "company_id": 1,
        "status_id": 78,
        contract_details: {
          "sender_name": mainData?.Contract_Sender_name,
          "receiver_name": mainData?.Contract_Reciever_name
        },

        transfer_line_items: selectedProductData?.map(o => {
          return {
            "product_id": Number(o?.id),
            "price": parseFloat(o?.selling_price),
            "price_quantity": parseFloat(o?.price_qty),
            "product_rate": Number(o?.product_rate)
          }
        }),
        "transfer_list_other_details": {
          "from_address_location_id":parseInt(mainData?.Location_From_Address?.id),
          "to_address_location_id":parseInt(mainData?.Location_To_Address?.id),
          "sales_period": mainData?.Sales_Period,
          "credit_period": mainData?.Credit_Period,
          "expected_delivery_time": mainData?.Expected_Delivery_Time,
          "lead_time": mainData?.Lead_Time,
          "shipping_cost": parseInt(mainData?.Shipping_Cost)
        }
      }

      dispatch(postPriceList(transfer_payload));
      history.push("/pricing");

    }

    if (!VendorDetailsFields && !ContractDetailsFields) {
      console.log("sales orders")

      const sales_payload = {
        "price_list_name": mainData?.price_list_name,
        "price_list_rule": mainData?.Item_rate_rule == 55 ? "10% Markup" : "",
        "currency_id": mainData?.currency_id?.id,
        "price_list_id": 1,
        "customer_name": mainData?.Customer_Name,
        "enter_manually": mainData?.enter_manually?true:false,
        "company_id": 1,
        "percentage": mainData?.Percentage ? Number(mainData?.Percentage) : 0,
        "select_type": true,
        "shipping_cost": mainData?.purchase_Shipping_Cost ? Number(mainData?.purchase_Shipping_Cost) : 0,
        "description": mainData?.purchase_description,
        "start_date": mainData?.pricing_start_date + "T08:54:24.32947Z",
        "end_date": mainData?.pricing_end_date + "T08:54:24.32947Z",
        "add_channel_of_sale_id": 310,
        sales_line_items: selectedProductData?.map(o => {
          return {
            "product_id": Number(o?.id),
            "category_commission": Number(o?.Category_commision),
            "uom_id": Number(o?.uom.id),
            "quantity_value": {
              "qty1": Number(o?.Quantity1),
              "qty2": Number(o?.Quantity2)
            },
            "quantity_value_type_id": o?.quantity_value_type?.id,
            "mrp": Number(o?.mrp),
            "sale_rate": Number(o?.selling_price),
            "duties": 23,
            "pricing_options_id": 1,
            "price": parseFloat(o?.price)
          }
        }),
      }

      console.log("sales_payload", sales_payload);
      dispatch(postPriceList(sales_payload));
      history.push("/pricing");

    }}
    else if (key == "Cancel")
    {
      history.push("./pricing")
    }
  };

  const onAddNewRaw = () => {
    setSelectedProductData([
      ...selectedProductData,
      {
        Quantity: 0,
        selling_price: 0,
        discount: 0,
        product_pricing_details: { tax_options: 0 },
      },
    ]);
  };

  return (
    <>
      {/* //Price List Details */}
      <AddForm
        header={"Price List Details"}
        data={PriceListDetailsFields.map((field) => {
          switch (field.key) {
            case "currency_id":
              field.data = Currencydata.map((o) => {
                return { id: o.id, label: o.name };
              });
          }
          return field;
        })}
        handelSelectonChange={handelSelectonChangeDetails}
        handelInputChange={handelInputChange}
        setRadioType={setRadioType}
        handelRadionButtononChange={handelRadionButtononChange}
      />

      {/* //Purchase Price List */}
      {VendorDetailsFields && !ContractDetailsFields ? (
        <>
          {/* //Vendor Details */}
          <AddForm
            header={"Vendor Details"}


            data={VendorDetailsFields.map((field) => {
              switch (field.key) {
                case "Vendor_name":
                  field.data = vendorsData.map((o) => {
                    return { id: o.id, label: o.name };
                  });
              }
              return field;
            })}
            handelSelectonChange={handelSelectonChangeDetails}
            handelInputChange={handelInputChange}
          />

          {/* //Product Details */}
          <AddForm_Table
            headCells={PurchaseheadCells}
            table_data={selectedProductData}
            handelInputChange={handelInputChange}
            header={"Pricing Details"}
            renderFooter={() => (
              <center style={{ marginTop: 10 }}>
                <Link onClick={onAddNewRaw} underline="none">
                  + Add Product Line
                </Link>
              </center>
            )}
          />
        </>
      ) : (
        <></>
      )}

      {/* //Transfer Price List */}
      {!VendorDetailsFields && ContractDetailsFields ? (
        <>
          {/* //Contract Details */}
          <AddForm header={"Contract Details"} data={ContractDetailsFields} handelInputChange={handelInputChange} />

          {/* //Product Details */}
          <AddForm_Table
            headCells={TransferheadCells}
            table_data={selectedProductData}
            handelInputChange={handelInputChange}
            header={"Pricing Details"}
            renderFooter={() => (
              <center style={{ marginTop: 10 }}>
                <Link onClick={onAddNewRaw} underline="none">
                  + Add Product Line
                </Link>
              </center>
            )}
          />
        </>
      ) : (
        <></>
      )}

      {/* //Sales Price List */}
      {!VendorDetailsFields && !ContractDetailsFields ? (
        <>
          {/* //Pricing Details */}
          <AddForm
            header={"Pricing Details"}
            data={PricingDetailsFields}
            handelSelectonChange={handelSelectonChangeDetails}
            handelInputChange={handelInputChange}
            setRadioType={setRadioType}
            handelRadionButtononChange={handelPricingRadionButtononChange}
          />
          {SalesheadCells.length > 0 ? (
            <>
              <AddForm_Table
                headCells={SalesheadCells}
                table_data={selectedProductData}
                handelInputChange={handelInputChange}
                renderFooter={() => (
                  <center style={{ marginTop: 10 }}>
                    <Link onClick={onAddNewRaw} underline="none">
                      + Add Product Line
                    </Link>
                  </center>
                )}
              />
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}

      {/* //Other Details */}
      <AddForm
        header={"Other Details"}
        data={OtherDetailsFields?.map((field)=>{
          switch(field.key){
            case "Location_From_Address":
            field.data = locationsList.map((o)=>{
              return { id:o.id , label:o.name }
            })
            break;
            case "Location_To_Address":
            field.data = locationsList.map((o)=>{
              return { id:o.id , label:o.name }
            })
            break;
          }
          return field;
          
        })}
        handelInputChange={handelInputChange}
        handelSelectonChange={handelSelectonChangeDetails}

      />

      {/* //Create Price List*/}
      <AddFormFooter_Button handleButtonClick={handleButtonClick}  />
    </>
  );
}

export default PricingAdd;
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