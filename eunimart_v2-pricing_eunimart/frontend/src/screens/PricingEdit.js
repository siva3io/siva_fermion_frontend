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
  loadPricingData,
  getVendors,
  loadPricingDataById,
  Update_Pricing_Data,
  loadLocationsData,
  deleteProductLine
} from "../redux/Actions/action";
import RemoteViewBox_Table from "Remote/ViewBox_Table";
import AddForm from "Remote/AddForm";
import AddFormFooter from "Remote/AddFormFooter";
import AddFormFooter_Button from "Remote/AddFormFooter_Button";
import AddForm_Table from "Remote/AddForm_Table";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import moment from "moment";

function PricingEdit() {
  const { Id } = useParams();
  const history = useHistory();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadLocationsData());
    dispatch(loadCurrencyData());
    dispatch(loadUOMData());
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
    )

    if (Id) {
      dispatch(loadPricingDataById(Id));
    }
  }, []);
  const { Currencydata, uomData, quantityValueData,locationsList, categoryTimedata, vendorsData } = useSelector(
    (state) => state.data
  );
  const pricingDataId = useSelector((state) => state.data.pricingDataId);
  const productVariantData = useSelector((state)=>state.data.productVariantData)
  // console.log(pricingDataId, "pricingDataId")

  const [PricingDetailsFields, setPricingDetailsFields] = useState([{
    label: "Item rate rule",
    type: "radio",
    key: "Item_rate_rule",
    required: true,
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
  }]);
  const [VendorDetailsFields, setVendorDetailsFields] = useState(false);
  const [ContractDetailsFields, setContractDetailsFields] = useState(false);
  const [SalesheadCells, setSalesheadCells] = useState([]);
  const [mainData, setMainData] = useState({});



  useEffect(() => {
    
    if (pricingDataId && productVariantData  ) {
      console.log("pricingDataIdx", pricingDataId);

      var newPriceListDetailsFields = PriceListDetailsFields
        ?.map(o => {
          if (o.key == "price_list_name") o.value = pricingDataId?.price_list_name;
          if (o.key == "currency_id") o.value = { id: pricingDataId?.currency?.id, label: pricingDataId?.currency?.name };
          return o;
        })
      setPriceListDetailsFields(newPriceListDetailsFields);



      if (pricingDataId.price_list_id == 1) {
        console.log(productVariantData,"productVariantData")
        var sales_line_items= pricingDataId?.sales_price_list?.sales_line_items?.map(o => {
          var x = productVariantData[productVariantData.findIndex( row => row.id == o.product_id )]
          console.log(x,"asdfghjkl;")
          return {
            sku_id:{ id:o.product_id , label:x?.sku_id },
            product_name:x?.product_name,
            "Category_commision": Number(o?.category_commission),
            "uom": {id:Number(o?.uom_details?.uom_class_id) ,label:o?.uom_details?.name },
            "Quantity1": Number(o?.quantity_value?.qty1),
            "Quantity2": Number(o?.quantity_value?.qty2),
            "quantity_value_type": o?.quantity_value_type?.lookup_type_id,
            "mrp": Number(o?.mrp),
            "selling_price": parseFloat(o?.sale_rate),
            "duties": o?.duties,
            "pricing_options_id": o?.pricing_options_id,
            "price": parseFloat(o?.price)
          }
        });
        setSalesListProductData(sales_line_items)
        console.log(sales_line_items,"sales_line_items")
        handelRadionButtononChange("price_list_type", 58);
      }
      if (pricingDataId.price_list_id == 2) {
        var productData = pricingDataId?.purchase_price_list?.purchase_line_items?.map(o => { 
          var x = productVariantData[productVariantData.findIndex( row => row.id == o.product_id )]
          console.log(x,"asdfghjkl;")
          return{
            sku_id:{ id:x?.id , label:x?.sku_id },
            product_name:x?.product_name,
            varient_name: o?.product_details?.product_name ? o?.product_details?.product_name : x?.product_name ? x?.product_name : "--",
            minimum_order_quantity:o?.minimum_order_quantity,
            sales_period: o?.sales_period ? o?.sales_period : "--",
            credit_period: o?.credit_period ? o?.credit_period : "--",
            quantity_value_type_id:{id:o?.quantity_value_type?.lookup_type_id,label:o?.quantity_value_type?.display_name},
            expected_delivery_time: o?.expected_delivery_time ? o?.expected_delivery_time : "--",
            lead_time: o?.lead_time ? o?.lead_time : "--",
            Quantity1:o?.quantity_value?.qty1,
            Quantity2:o?.quantity_value?.qty2,
            price:o?.price,
            price_quantity:o?.price_quantity,
            vendor_rate:o?.vendor_rate
          }
         })
         setPurchaseListProductData(productData)
         console.log(productData,"productData")
        handelRadionButtononChange("price_list_type", 57);
      }
      if (pricingDataId.price_list_id == 3) {
        var productData = pricingDataId?.transfer_price_list?.transfer_line_items?.map(o => { 
          console.log(productVariantData,"productVariantData")
          var x = productVariantData[productVariantData.findIndex( row => row.id == o.product_id )]
          console.log(x,"asdfghassjkl;")
          return    {
            sku_id:{ id:o.product_id , label:x?.sku_id },
            product_name:x?.product_name,
            varient_name:o?.varient_name  ? o?.varient_name: x?.product_name,
            Quantity:o?.price_quantity,
            price:o?.price,
            price_qty:o?.price_quantity,
            product_rate:o?.product_rate
          }
         })
         setSelectedProductData(productData)
         console.log(productData,"productData")
        handelRadionButtononChange("price_list_type", 56);
      }

      if (pricingDataId?.sales_price_list?.item_rate_rule == 0) {
        handelPricingRadionButtononChange("Item_rate_rule", 55);
      }
      if (pricingDataId?.sales_price_list?.item_rate_rule == 1) {
        handelPricingRadionButtononChange("Item_rate_rule", 54);
      }
      console.log(sales_line_items,"sales_line_items")
       
    }

  }, [pricingDataId,productVariantData])

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
    },
  ]);

  const [paymentDetailsFields, setPaymentDetailsFields] = useState({
    subTotal: 0,
    tax: 0,
    shippingCharge: 0,
    adjustment_text: "",
    adjustment_amount: 0,
    total: 0,
  });

  const [selectedProductData, setSelectedProductData] = useState([
    {
      sku_id:"",
      product_name:"",
      varient_name:"",
      Quantity:"",
      price:"",
      price_qty:"",
      product_rate:""
    }
  ]);


  const [salesListProductData,setSalesListProductData]=useState([
    {
      sku_id:"",
      product_name:"",
      varient_name:"",
      Category_time:"",
      uom:"",
      quantity_value_type:"",
      Quantity1:"",
      Quantity2:"",
      mrp:"",
      selling_price:"",
      d_t:"",
      price:""
    }
])

useEffect(()=>{console.log(salesListProductData,"salesListProductData")},[salesListProductData])

const [purchaseListProductData,setPurchaseListProductData]=useState([
  {
    sku_id:"",
    product_name:"",
    varient_name:"",
    minimum_order_quantity:1,
    sales_period:"",
    credit_period:"",
    quantity_value_type_id:"",
    expected_delivery_time:"",
    lead_time:"",
    Category_time:"",
    uom:"",
    Quantity1:"",
    Quantity2:"",
    mrp:"",
    selling_price:"",
    price:"",
    price_quantity:"",
    vendor_rate:0
  }
])

  const [OtherDetailsFields, setOtherDetailsFields] = useState([
    {
      label: "Description",
      type: "input",
      key: "sales_description",
    },
  ]);

  const PurchaseheadCells = [
    {
      key: "sku_id",
      label: "Product SKU",
      type: "select",
      data: useSelector((state) =>
        state.data.productVariantData?.map((o) => {
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
      key: "varient_name",
      label: "Variant Name",
      type: "text",
      required: true,
    },
    {
      key: "minimum_order_quantity",
      label: "Mnimum Order Quantity",
      type: "text",
      required: true,
    },
    {
      key: "quantity_value_type_id",
      label: "Quantity Value Type",
      type: "select",
      data: useSelector((state) =>
        state.data.quantityValueData?.map((o) => {
          return { id: o.id, label: o.display_name };
        })
      ),
      required: true,
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
      key: "price",
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
      key: "price_quantity",
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
           { 
            console.log(item,"deleteing Item")
            console.log(purchaseListProductData,"selectedProductData")

            console.log(mainData?.type , "mainData?.type==3")
            dispatch(deleteProductLine(Id,item?.sku_id?.id))
            if(mainData?.type==56)
              setSelectedProductData(selectedProductData.filter((o) => o?.sku_id?.id != item?.sku_id?.id))
            else if (mainData?.type==57)
            setPurchaseListProductData(purchaseListProductData.filter((o) => o?.sku_id?.id != item?.sku_id?.id))
            else if(mainData?.type == 58)
              setSalesListProductData(salesListProductData.filter((o) => o?.sku_id?.id != item?.sku_id?.id))
              }
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
        state.data.productVariantData?.map((o) => {
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
      key: "varient_name",
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
           { 
            console.log(item,"deleteing Item")
            console.log(purchaseListProductData,"selectedProductData")

            console.log(mainData?.type , "mainData?.type==3")
            dispatch(deleteProductLine(Id,item?.sku_id?.id))
            if(mainData?.type==56)
              setSelectedProductData(selectedProductData.filter((o) => o?.sku_id?.id != item?.sku_id?.id))
            else if (mainData?.type==57)
            setPurchaseListProductData(purchaseListProductData.filter((o) => o?.sku_id?.id != item?.sku_id?.id))
            else if(mainData?.type == 58)
              setSalesListProductData(salesListProductData.filter((o) => o?.sku_id?.id != item?.sku_id?.id))
              }
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
        state.data.productVariantData?.map((o) => {
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
      key: "varient_name",
      label: "Variant Name",
      type: "text",
      required: true,
    },

    {
      key: "Category_time",
      label: "Category tree",
      type: "select",
      data: useSelector((state) =>
        state.data.categoryTimedata?.map((o) => {
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
        state.data.quantityValueData?.map((o) => {
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
      key: "d_t",
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
           { 
            console.log(item,"deleteing Item")
            console.log(purchaseListProductData,"selectedProductData")

            console.log(mainData?.type , "mainData?.type==3")
            dispatch(deleteProductLine(Id,item?.sku_id?.id))
            if(mainData?.type==56)
              setSelectedProductData(selectedProductData.filter((o) => o?.sku_id?.id != item?.sku_id?.id))
            else if (mainData?.type==57)
            setPurchaseListProductData(purchaseListProductData.filter((o) => o?.sku_id?.id != item?.sku_id?.id))
            else if(mainData?.type == 58)
              setSalesListProductData(salesListProductData.filter((o) => o?.sku_id?.id != item?.sku_id?.id))
              }
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
      value: pricingDataId?.sales_price_list?.shipping_cost ? pricingDataId?.sales_price_list?.shipping_cost : pricingDataId?.purchase_price_list?.other_details?.shipping_cost
    },
    {
      label: "Description",
      type: "input",
      key: "purchase_description",
      value: pricingDataId?.description

    },
  ];

  const handelPricingRadionButtononChange = (prop, value) => {

    console.log("handelPricingRadionButtononChange", prop, value)

    if (prop == "Item_rate_rule" || prop == "Select_Type") {
      var OldState = PricingDetailsFields?.map((o) => {
        if (o.key == prop)
          o.sub.map((p) => {
            p.checked = false;
            return p;
          });
        return o;
      });
      setPricingDetailsFields(OldState);
      var newState = PricingDetailsFields?.map((o) => {
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
            value:moment(pricingDataId?.start_date).format("yyyy-MM-DD")

          },
          {
            label: "End Date",
            type: "date",
            key: "pricing_end_date",
            value:moment(pricingDataId?.end_date).format("yyyy-MM-DD")

          },
        ];
        setSalesheadCells(AssignSalesHeadCells);
        setOtherDetailsFields(AssignOtherDetails);
        setPricingDetailsFields(newArray7);
      } else if (value == 55) {
        console.log("enter4");
        var newArray9 = [
          {
            label: "Item rate rule",
            type: "radio",
            key: "Item_rate_rule",
            required: true,
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
            value:pricingDataId?.sales_price_list?.customer_name
          },
          {
            label: "Select Type",
            type: "radio",
            key: "Select_Type",
            required: true,

            sub: [
              { label: "Increased by", value: 53, checked: true },
              { label: "Decreased by", value: 52 },
            ],
          },
          {
            label: "Enter Percentage",
            type: "input",
            key: "Percentage",
            value:pricingDataId?.sales_price_list?.percentage
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
            value:moment(pricingDataId?.start_date).format("yyyy-MM-DD")
          },
          {
            label: "End Date",
            type: "date",
            key: "pricing_end_date",
            value:moment(pricingDataId?.end_date).format("yyyy-MM-DD")
            
          },
        ];
        setSalesheadCells(AssignSalesHeadCells);
        setOtherDetailsFields(AssignOtherDetails);
        setPricingDetailsFields(newArray9);
      } else if (value == 53) {
        console.log("Increased BY");
      } else if (value == 52) {
        console.log("decreased BY");
      }
    }
    

  };

  const handelRadionButtononChange = (prop, value) => {
    console.log("prop, value", prop, value)
    console.log("first sec", PriceListDetailsFields);
    if (prop == "price_list_type") {
      var OldState = PriceListDetailsFields?.map((o) => {
        if (o.key == prop)
          o.sub.map((p) => {
            p.checked = false;
            return p;
          });
        return o;
      });
      setPriceListDetailsFields(OldState);
      var newState = PriceListDetailsFields?.map((o) => {
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
            value:  pricingDataId?.purchase_price_list?.vendor_name_id ? {label: vendorsData[vendorsData.findIndex(o=>o.id==pricingDataId?.purchase_price_list?.vendor_name_id)]?.name , id:pricingDataId?.purchase_price_list?.vendor_name_id } : ""
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
            value:moment(pricingDataId?.start_date).format("yyyy-MM-DD")
          },
          {
            label: "End Date",
            type: "date",
            key: "vendor_end_date",
            value:moment(pricingDataId?.end_date).format("yyyy-MM-DD")

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
            value: pricingDataId?.transfer_price_list?.contract_details?.sender_name ? pricingDataId?.transfer_price_list.contract_details.sender_name : ""
          },
          {
            label: "Contract Reciever name",
            type: "input",
            key: "Contract_Reciever_name",
            value: pricingDataId?.transfer_price_list?.contract_details?.receiver_name ? pricingDataId?.transfer_price_list.contract_details.receiver_name : ""

          },
          {
            label: "Start Date",
            type: "date",
            key: "Contract_start_date",
            value:moment(pricingDataId?.start_date).format("yyyy-MM-DD")

          },
          {
            label: "End Date",
            type: "date",
            key: "Contract_end_date",
            // value:moment(pricingDataId?.end_date).format("yyyy-MM-DD")
          
          },
        ];
        var newArray6 = [
          {
            label: "Location From Address",
            type: "select",
            key: "Location_From_Address",
            value: pricingDataId?.transfer_price_list?.transfer_list_other_details?.location_from_address?.name ? {label:pricingDataId?.transfer_price_list?.transfer_list_other_details?.location_from_address?.name ,id:pricingDataId?.transfer_price_list?.transfer_list_other_details?.location_from_address?.id } :"" 
          },
          {
            label: "Location To Address",
            type: "select",
            key: "Location_To_Address",
            value: pricingDataId?.transfer_price_list?.transfer_list_other_details?.location_to_address?.name ? {label:pricingDataId?.transfer_price_list?.transfer_list_other_details?.location_to_address?.name ,id:pricingDataId?.transfer_price_list?.transfer_list_other_details?.location_to_address?.id } :"" 

          },
          {
            label: "Sales Period",
            type: "input",
            key: "Sales_Period",
            value:pricingDataId?.transfer_price_list?.transfer_list_other_details?.sales_period

          },
          {
            label: "Expected Delivery Time",
            type: "input",
            key: "Expected_Delivery_Time",
            value:pricingDataId?.transfer_price_list?.transfer_list_other_details?.expected_delivery_time

          },
          {
            label: "Credit Period",
            type: "input",
            key: "Credit_Period",
            value:pricingDataId?.transfer_price_list?.transfer_list_other_details?.credit_period
          },
          {
            label: "Lead Time",
            type: "input",
            key: "Lead_Time",
            value:pricingDataId?.transfer_price_list?.transfer_list_other_details?.lead_time

          },
          {
            label: "Shipping Cost",
            type: "input",
            key: "Shipping_Cost",
            value:pricingDataId?.transfer_price_list?.transfer_list_other_details?.shipping_cost,
          },
          {
            label: "Description",
            type: "input",
            key: "Description",
            value:pricingDataId?.description
          },
        ];
        setSalesheadCells([]);
        setOtherDetailsFields(newArray6);
        setVendorDetailsFields(false);

        const tempSelectedList = [...newArray5]
        setContractDetailsFields(tempSelectedList);

        console.log("setContractDetailsFields", ContractDetailsFields)
      }
      
      var newMainData = mainData;
      newMainData["type"] = value;
      setMainData(newMainData);

    }
    if(prop == "Item_rate_rule")
    {
      console.log(PriceListDetailsFields)
      var OldState = PricingDetailsFields?.map((o) => {
        if (o.key == prop)
          o.sub?.map((p) => {
            p.checked = false;
            return p;
          });
        return o;
      });
      setPricingDetailsFields(OldState);
      var newState = PricingDetailsFields?.map((o) => {
        if (o.key == prop)
          o.sub?.map((p) => {
            if (p.value == value) p.checked = true;
            return p;
          });
        return o;
      });
      console.log(newState,"newState")
      setPricingDetailsFields(newState);
      
    }

  };

  const setRadioType = (prop, value) => {
    console.log("prop, value", prop, value);
  };

  const handelSelectonChangeDetails = (key, value) => {
    console.log("key, value", key, value);

    switch (key) {

      case "currency_id": {
        setPriceListDetailsFields(PriceListDetailsFields?.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;
      }
      case "Vendor_name": {
        setVendorDetailsFields(VendorDetailsFields?.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
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

      var newSelectedProductData;
      if (mainData?.type == 57 )
       newSelectedProductData = JSON.parse(JSON.stringify(purchaseListProductData));
      else if(mainData?.type == 58)
      newSelectedProductData = JSON.parse(JSON.stringify(salesListProductData));
      else if(mainData?.type == 56)
      newSelectedProductData = JSON.parse(JSON.stringify(selectedProductData));

      if (key === 'sku_id') {
        console.log("sku_id")
        var selectVarient = productVariantData.find(o => o.id == value.id);
        newSelectedProductData[index] = selectVarient;
        newSelectedProductData[index][key] = value;
      }
      else if (key === 'uom.name') {
        console.log("uom.name")
        var selectVarient = uomData.find(o => o.id == value.id);
        newSelectedProductData[index].uom = { name: value.label, id: value.id };
      }
      else if (key === 'quantity_value_type_id') {
        console.log("quantity_value_type_id")
        newSelectedProductData[index]["quantity_value_type_id"] = value;
      }
      else {
        if (key.toString().includes('.')) newSelectedProductData[index][key.split(".")[0]][key.split(".")[1]] = value;
        else newSelectedProductData[index][key] = value;
      }
      if( mainData?.type == 57)
        setPurchaseListProductData(newSelectedProductData);
      else if (mainData?.type == 58)
        setSalesListProductData(newSelectedProductData)
        else if (mainData?.type == 56)
        setSelectedProductData(newSelectedProductData)
     }
    else {
      var newMainData = mainData;
      if (key == "price_list_name") {
        var newPriceListDetailsFields = PriceListDetailsFields
          .map(o => {
            if (o.key == "price_list_name") o.value = value;
            return o;
          })
        setPriceListDetailsFields(newPriceListDetailsFields);
      }
      if ( key == "Customer_Name" || key == "Percentage" || key == "pricing_start_date" || key=="pricing_end_date" )
      {
        var newPricingDetailsFields = PricingDetailsFields?.map(o => {
            if (o.key == key) o.value = value;
            return o;
          })
          setPricingDetailsFields(newPricingDetailsFields);
      }
      if ( key === "purchase_Shipping_Cost" || key === "purchase_description" || key ==="Shipping_Cost" || key ==="Description" || key === "purchase_Shipping_Cost" || key =="Location_From_Address" || key =="Location_To_Address" || key =="Sales_Period" || key == "Expected_Delivery_Time" || key =="Credit_Period" || key =="Lead_Time" )
      {
        var newAssignOtherDetails = OtherDetailsFields?.map(o =>{
          if (o.key == key) o.value = value;
          return o;
        })
        setOtherDetailsFields(newAssignOtherDetails)
      }

      if (key == "Vendor_name" || key == "vendor_start_date" || key=="vendor_end_date")
      {
        var newValues = VendorDetailsFields?.map(o =>{
          if (o.key == key) o.value = value;

          return o;
        })
        setVendorDetailsFields(newValues)
      }


      if (key == "Contract_Sender_name" || key == "Contract_Reciever_name" || key=="Contract_start_date" || key == "Contract_end_date")
      {
        var newValues = ContractDetailsFields?.map(o =>{
          if (o.key == key) o.value = value;
          return o;
        })
        setContractDetailsFields(newValues)
      }
      newMainData[key] = value;
if(key == "pricing_start_date" || key=="pricing_end_date" || key == "vendor_start_date" || key=="vendor_end_date" || key=="Contract_start_date" || key == "Contract_end_date"){
  var dateVal = new Date(value);
  newMainData[key] = dateVal.toISOString();
}
      setMainData(newMainData);
    }
  };

  const handleButtonClick = (key) => {
    console.log("payload key", mainData, selectedProductData,mainData );
console.log('date////',(new Date(mainData?.pricing_start_date)).toISOString)
    if (mainData?.type == 57) {
      console.log("purchase orders")
      const purchase_payload = {
        "price_list_name": mainData?.price_list_name ? mainData?.price_list_name : pricingDataId?.price_list_name ,
        "currency_id": mainData?.currency_id?.id ?mainData?.currency_id?.id :  pricingDataId?.currency_id, 
        "price_list_id": 2,
        "start_date":mainData?.vendor_start_date ? mainData?.vendor_start_date : mainData?.pricing_start_date ? mainData?.pricing_start_date : pricingDataId?.start_date ? pricingDataId?.start_date : "",
        "end_date": mainData?.vendor_end_date ? mainData?.vendor_end_date : mainData?.pricing_end_date ?mainData?.pricing_end_date : pricingDataId?.end_date ?pricingDataId?.end_date :"" ,
        "vendor_name_id": mainData?.Vendor_name?.id ? parseInt(mainData?.Vendor_name?.id)  : pricingDataId?.purchase_price_list?.vendor_name_id,
        "status_id": 78,
        "company_id": 1,
        "price_list_rule": "--",
        "description": mainData?.purchase_description  ? mainData?.purchase_description : pricingDataId?.description,
        purchase_line_items: purchaseListProductData?.map(o => {
          return {
            "product_id": Number(o?.sku_id?.id),
            "minimum_order_quantity": Number(o?.minimum_order_quantity),
            "sales_period": o?.sales_period,
            "credit_period": o?.credit_period,
            "expected_delivery_time": o?.expected_delivery_time,
            "lead_time": o?.lead_time,
            "quantity_value": {
              "qty1": Number(o?.Quantity1),
              "qty2": Number(o?.Quantity2)
            },
            "quantity_value_type_id": Number(o?.quantity_value_type_id?.id),
            "price": parseFloat(o?.price),
            "price_quantity": parseFloat(o?.price_quantity),
            "vendor_rate": parseFloat(o?.vendor_rate)
          }
        }),
        "other_details": {
          "shipping_cost": parseInt(mainData?.purchase_Shipping_Cost) ? parseInt(mainData?.purchase_Shipping_Cost) :pricingDataId?.purchase_price_list?.other_details?.shipping_cost,
        }
      }

      console.log(purchase_payload)
      dispatch(Update_Pricing_Data(purchase_payload,Id));
      dispatch(loadPricingData());
      history.push("/pricing");

    }

    if (mainData?.type == 56) {
      console.log("transfer orders")

      const transfer_payload = {
        "price_list_name": mainData?.price_list_name ? mainData?.price_list_name : pricingDataId?.price_list_name ,
        "currency_id": mainData?.currency_id?.id ?mainData?.currency_id?.id :  pricingDataId?.currency_id, 
        "price_list_id": 3,
        "start_date": mainData?.Contract_end_date ? mainData.Contract_end_date : pricingDataId?.start_date ,
        "end_date": mainData?.Contract_end_date ? mainData?.Contract_end_date : pricingDataId?.end_date ,
        "description": mainData?.Description ? mainData?.Description : pricingDataId?.description,
        "price_list_rule":"--",
        "company_id": 1,
        "status_id": 78,
        contract_details: {
          "sender_name": mainData?.Contract_Sender_name ? mainData.Contract_Sender_name : pricingDataId?.transfer_price_list?.contract_details?.sender_name,
          "receiver_name": mainData.Contract_Reciever_name ? mainData.Contract_Reciever_name : pricingDataId?.transfer_price_list?.contract_details?.reciever_name ? pricingDataId?.transfer_price_list?.contract_details?.reciver_name : "--"
        },

        transfer_line_items: selectedProductData?.map(o => {
          console.log(o,"for payload mapping")
          return {
            "product_id": o?.sku_id?.id,
            "price": parseFloat(o?.price),
            "price_quantity": parseFloat(o?.price_qty),
            "product_rate": parseFloat(o?.product_rate)
          }
        }),
        "transfer_list_other_details": {
          "from_address_location_id": mainData?.Location_From_Address?.id ? parseInt(mainData.Location_From_Address.id)  : pricingDataId?.transfer_price_list?.transfer_list_other_details?.from_address_location_id,
          "to_address_location_id": mainData?.Location_To_Address?.id ? parseInt(mainData.Location_To_Address.id) :  pricingDataId?.transfer_price_list?.transfer_list_other_details?.to_address_location_id,
          "sales_period": mainData?.Sales_Period ? mainData.Sales_Period : pricingDataId?.transfer_price_list?.transfer_list_other_details?.sales_period,
          "credit_period": mainData?.Credit_Period ? mainData.Credit_Period : pricingDataId?.transfer_price_list?.transfer_list_other_details?.credit_period  ,
          "expected_delivery_time": mainData?.Expected_Delivery_Time ? mainData?.Expected_Delivery_Time   : pricingDataId?.transfer_price_list?.transfer_list_other_details?.expected_delivery_time,
          "lead_time": mainData?.Lead_Time ? mainData.Lead_Time : pricingDataId?.transfer_price_list?.transfer_list_other_details?.lead_time ,
          "shipping_cost": mainData.Shipping_Cost ? parseInt(mainData.Shipping_Cost) : pricingDataId?.transfer_price_list?.transfer_list_other_details?.shipping_cost 
        }
      }

      console.log(transfer_payload)
      dispatch(Update_Pricing_Data(transfer_payload,Id));
      dispatch(loadPricingData());
      history.push("/pricing");

    }

    if (mainData?.type == 58) {
      console.log("sales orders")

      const sales_payload = {
        "price_list_name": mainData?.price_list_name ? mainData?.price_list_name : pricingDataId?.price_list_name ,
        "currency_id": mainData?.currency_id?.id ?mainData?.currency_id?.id :  pricingDataId?.currency_id, 
        "price_list_id": 1,
        "enter_manually": true,
        "customer_name": mainData.Customer_Name ? mainData.Customer_Name : pricingDataId?.customer_name ? pricingDataId?.customer_name  :pricingDataId?.sales_price_list?.customer_name,
        "price_list_rule": mainData?.Item_rate_rule ? mainData?.Item_rate_rule : pricingDataId?.price_list_rule ? pricingDataId?.price_list_rule :"--",
        "company_id": 1,
        "percentage": mainData?.Percentage ? Number(mainData?.Percentage) : pricingDataId?.sales_price_list?.percentage ? pricingDataId?.sales_price_list?.percentage : 0,
        "select_type": true,
        "shipping_cost": mainData?.purchase_Shipping_Cost ? Number(mainData?.purchase_Shipping_Cost) : pricingDataId?.sales_price_list?.shipping_cost,
        "description": mainData?.purchase_description ? mainData?.purchase_description :pricingDataId?.description,
        "start_date":mainData?.pricing_start_date ?mainData?.pricing_start_date: mainData?.pricing_start_date ? mainData?.pricing_start_date : pricingDataId?.start_date ? pricingDataId?.start_date : "",
        "end_date": mainData?.pricing_end_date ? mainData?.pricing_end_date: mainData?.pricing_end_date ? mainData?.pricing_end_date : pricingDataId?.end_date ? pricingDataId?.end_date :"" ,
        "add_channel_of_sale_id": 310,
        sales_line_items: salesListProductData?.map(o => {
          return {
            "product_id": o?.sku_id?.id,
            "category_commission": Number(o?.Category_commision),
            "uom_id": Number(o?.uom?.id),
            "quantity_value": {
              "qty1": Number(o?.Quantity1),
              "qty2": Number(o?.Quantity2)
            },
            "quantity_value_type_id": o?.quantity_value_type?.id,
            "mrp": parseFloat(o?.mrp),
            "sale_rate": parseFloat(o?.selling_price),
            "duties": o?.duties,
            "pricing_options_id": o?.pricing_options_id,
            "price": parseFloat(o?.price)
          }
        }),
      }

      console.log("sales_payload", sales_payload);
      dispatch(Update_Pricing_Data(sales_payload,Id));
      dispatch(loadPricingData());
      history.push("/pricing");

    }
  };

  const onAddSalesrow = () =>{
    setSalesListProductData(
      [...salesListProductData,
      {
        sku_id:"",
        product_name:"",
        varient_name:"",
        Category_time:"",
        uom:"",
        quantity_value_type:"",
        Quantity1:"",
        Quantity2:"",
        mrp:"",
        selling_price:"",
        d_t:"",
        price:""
      }]
    )
  }

  const onAddPurchaseData = () =>{
    setPurchaseListProductData(
      [...purchaseListProductData,
      {
        sku_id:"",
    product_name:"",
    varient_name:"",
    minimum_order_quantity:1,
    sales_period:"",
    credit_period:"",
    quantity_value_type_id:"",
    expected_delivery_time:"",
    lead_time:"",
    Category_time:"",
    uom:"",
    Quantity1:0,
    Quantity2:0,
    mrp:0,
    selling_price:0,
    price:0,
    price_quantity:0,
    vendor_rate:0
      }]
    )
  }

  const onAddNewRaw = () => {
    console.log(selectedProductData,"selectedProductData")
    setSelectedProductData([
      ...
      selectedProductData,
      {
          sku_id:"",
          product_name:"",
          varient_name:"",
          Quantity:0,
          price:0,
          price_qty:0,
          product_rate:0
      }]
    )
  };

  return (
    pricingDataId && productVariantData && vendorsData &&
  (
    <>
    {/* //Price List Details */}
    <AddForm
      header={"Price List Details"}
      data={PriceListDetailsFields?.map((field) => {
        switch (field.key) {
          case "currency_id":
            field.data = Currencydata?.map((o) => {
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

    {VendorDetailsFields && !ContractDetailsFields  ? (
      <>
        {/* //Vendor Details */}
        <AddForm
          header={"Vendor Details"}


          data={VendorDetailsFields?.map((field) => {
            switch (field.key) {
              case "Vendor_name":
                field.data = vendorsData?.map((o) => {
                  return { id: o.id, label: o.name };
                });
            }
            return field;
          })}
          handelSelectonChange={handelSelectonChangeDetails}
          handelInputChange={handelInputChange}
        />
        <AddForm_Table
          headCells={PurchaseheadCells}
          table_data={purchaseListProductData}
          handelInputChange={handelInputChange}
          header={"Pricing Details"}
          renderFooter={() => (
            <center style={{ marginTop: 10 }}>
              <Link onClick={onAddPurchaseData} underline="none">
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
        {
          SalesheadCells.length > 0 ? (
          <>
            <AddForm_Table
              headCells={SalesheadCells}
              table_data={salesListProductData}
              handelInputChange={handelInputChange}
              renderFooter={() => (
                <center style={{ marginTop: 10 }}>
                  <Link onClick={onAddSalesrow} underline="none">
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

    <AddFormFooter_Button handleButtonClick={handleButtonClick} />
  </>
  )
  );
}

export default PricingEdit;

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