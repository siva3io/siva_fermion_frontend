import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddForm from "Remote/AddForm";
import { useHistory } from "react-router-dom";
import AddFormFooter from "Remote/AddFormFooter";
import "./ScrapOrdersAdd.css";
import AddFormFooter_Button from "Remote/AddFormFooter_Button";
import AddForm_Table from 'Remote/AddForm_Table';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, Box, Typography, Button, FormGroup, MenuItem, Menu, Grid, FormLabel } from "@mui/material";
import MatCheckBox from 'Remote/MatCheckBox';
import { lazy, Suspense } from "react";
import MatRadio from 'Remote/MatRadioButton';
import ErrorBoundary from "../ErrorBoundary";
import {
  estimatedcost, loadProductsListData, loadPricingListData, loadScrapReasons, loadStates, loadSCountries, Save_Scrap_Order_Data, loadUOMData,
  load_rate_calculator_data, loadgetLocations, loadShippingPartners, Update_Scrap_Order_Data, loadSOURCE_DOCUMENTData, loadGrnDataById,
  loadGrnData,getShippingById
} from '../redux/Actions/action';
import { loadScrapOrdersDataById } from "../redux/Actions/getScrapOrdersById";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RemoteDynamicTable from "Remote/DynamicTable";
import { styled, alpha } from "@mui/material/styles";
import ModalViewV5 from "../UI/Modal/ModalViewV5"
import RemoteViewBox_Table from "Remote/ViewBox_Table";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Table from "../UI/Modal/ProductsTable"
import moment from 'moment'
import { TroubleshootSharp } from "@mui/icons-material";

const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);
const ScrapOrdersAdd = (props) => {
  let dispatch = useDispatch();
  const navigate = useHistory();
  const [selectedProductData, setSelectedProductData] = useState([]);
  const [params, setParams] = useState({});
  const onAddNewRaw = () => {
    setSelectedProductData([...selectedProductData, {}]);
  }

  // const estimatedcostdata = useSelector((state) => state.estimatedcost?.data);
  // const { data, productData } = useSelector((state) => state.data);
  const { data, productData, pricingData, Shippingdata,scrapReasons, countries, states, uomData, EstimatedCostdata, shippingPartnersList,
    SourceDocumentTypesData, locationsList, GRNdata, GRNViewdata} = useSelector((state) => state.data);
  
  const [paymentDetailsFields, setPaymentDetailsFields] = useState({ subTotal: 0, tax: 0, shippingCharge: 0, adjustment_text: "", Final_Adjustment: "+", adjustment_amount: 0, totalBeforeAdjustment: 0, total: 0 });
  const scrapordersdata = useSelector((state) => state.dataById.scrapordersdataId);
  const [selectedId, setId] = useState(0);
  const [viewProducts, setviewProducts] = React.useState(false);
  const [viewPricelist, setviewPricelist] = React.useState(false);
  const [viewShipping, setviewShipping] = React.useState(false);
  const [customOptions, setCustomOptions] = useState([]);
  const [scrapLocationFetch, setscrapLocationFetch] = useState({});
  const [sourceLocationFetch, setsourceLocationFetch] = useState([]);
  const [mainData, setMainData] = useState({});
  const [radioValue, setRadioValue] = useState("");
  const [Country, setCountry] = useState();
  const handleChangeDyanmicAppBar = (value) => {

  };
  // const pricingsData = useSelector((state) => state.loadPricingListData?.pricing);
  // useEffect(() => dispatch(loadPricingListData(!change)), [change]);
  useEffect(() => {
    // dispatch(estimatedcost());
    dispatch(loadProductsListData());
    dispatch(loadScrapReasons());
    dispatch(loadSCountries());
    dispatch(loadgetLocations());
    dispatch(loadShippingPartners());
    dispatch(loadUOMData());
    dispatch(loadSOURCE_DOCUMENTData());
    if (props && props.id) {
      const { id } = props;
      dispatch(loadScrapOrdersDataById(id));
    }
    // dispatch(loadStates());

  }, []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };
  const [change, setChange] = useState(false);
  const handleViewPricelist = () => {
    handleClose();
    setviewPricelist((prev) => !prev);
  };
  const handleViewProducts = () => {
    handleClose();
    setviewProducts((prev) => !prev);
  };
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));

  useEffect(() => {
    if(scrapordersdata && scrapordersdata.shipping_order_id){
        console.log('5362',Shippingdata)
   
      var newMainData = [];

      var newShipping = ShippingDetailsChecking.map(o=> {if(o.key=='Selected_shipping_details') {o.isChecked=scrapordersdata?.is_shipping;} return o})
        setShippingDetailsChecking(newShipping)
        setviewShipping(scrapordersdata?.is_shipping)

        if (scrapordersdata?.shipping_details?.shipping_preferance) {
          var OldState = ShippingPreferenceChecking.map(o => { if (o.key == "shipping_preferance") o.sub.map(p => { p.checked = false; return p; }); return o })
          setShippingPreferenceChecking(OldState);
          var newState = ShippingPreferenceChecking.map(o => { if (o.key == "shipping_preferance") o.sub.map(p => { if (p.value == scrapordersdata?.shipping_details?.shipping_preferance) p.checked = true; return p; }); return o })
          setShippingPreferenceChecking(newState);
          setRadioValue(scrapordersdata?.shipping_details?.shipping_preferance);
        }
        
// if(scrapordersdata?.shipping_details?.estimated_cost){
//       var newEstimated_Cost = scrapordersdata?.shipping_details?.estimated_cost.map(data => {
//         return {
//           "Estimated_Cost_Shipping_Partners": data.shipping_partners,
//           "Estimated_Cost_Charges": data.cost,
//           "Estimated_Cost_Order_Deliver_Time": data.order_delivery_time,
//           "Estimated_Cost_Select": scrapordersdata.shipping_carrier_id
//         };
//       });
//       setEstimated_Cost(newEstimated_Cost);
//     }

      // var newSelfPreferFields = SelfPreferFields
      //   .map(o => {
      //     if (o.key == "shipping_partner_id") o.value = scrapordersdata?.shipping_partner_id;
      //     if (o.key == "awb_number") o.value = scrapordersdata.shipping_details?.awb_number;
      //     return o;
      //   })
      // setSelfPreferFields(newSelfPreferFields);

     

    var newPackageDetailsFields = PackageDetailsFields
        .map(o => {
          if (o.key == "package_length") o.value = Shippingdata?.package_details?.package_length;
          if (o.key == "package_width") o.value = Shippingdata?.package_details?.package_width;
          if (o.key == "package_height") o.value = Shippingdata?.package_details?.package_height;
          if (o.key == "volumetric_weight") o.value = Shippingdata?.package_details?.volumetric_weight;
          if (o.key == "package_weight") o.value = Shippingdata?.package_details?.package_weight;
          return o;
        })
      setPackageDetailsFields(newPackageDetailsFields);
      
      var data = {
        "origin_pincode": (sourceLocationFetch?.address?.pin_code)?.toString(), //Fix Not Avialble in Search Warehosue API // Praveen sir
        "destination_pincode": (scrapLocationFetch?.zip)?.toString(),
        "package_details": {
          "package_height": Shippingdata?.package_details?.package_height,
          "package_weight": Shippingdata?.package_details?.package_weight,
          "package_length": Shippingdata?.package_details?.package_length,
          "volumetric_weight": Shippingdata?.package_details?.volumetric_weight,
          "package_width": Shippingdata?.package_details?.package_width,

          // "product_value":paymentDetailsFields.total
        },
        "is_cod": true
      }
      dispatch(estimatedcost(data));

      newMainData = [
        ...newPackageDetailsFields,
        ...newShipping,
      ];
      var keyValuePairMainData = { "newEstimated_Cost": 0, "Estimated_Cost_Select": scrapordersdata.shipping_carrier_id };

      newMainData.map(o => {
        
        if(o.key == 'Selected_shipping_details'){
          keyValuePairMainData[o.key] = o.isChecked;
        }
       
        else if(o.key!=null){
            keyValuePairMainData[o.key]=o.value;
           }
      });
      setMainData(keyValuePairMainData);

    }

  }, [Shippingdata])

  useEffect(() => {
    if (props && props.id && scrapordersdata) {
      var newMainData = [];

      var newScrapOrderDetailsFields = ScrapOrderDetailsFields
        .map(o => {
          if (o.key == "scrap_order_no") o.value = scrapordersdata?.scrap_order_no;
          if (o.key == "scrap_reason_id") o.value = { id: scrapordersdata?.scrap_reason?.id, label: scrapordersdata?.scrap_reason?.display_name };
          if (o.key == "schedule_scrap_date") o.value = (moment(scrapordersdata?.schedule_scrap_date)).format("yyyy-MM-DD");
          if (o.key == "scrap_source_location_id") o.value = { id: scrapordersdata?.scrap_source_location?.id, label: scrapordersdata?.scrap_source_location?.name };
          if (o.key == "scrap_location_id") o.value = { id: scrapordersdata?.scrap_location?.id, label: scrapordersdata?.scrap_location?.name };
          if (o.key == "Link_Source_Document_Type") o.value = { id: scrapordersdata?.source_document?.id, label: scrapordersdata?.source_document?.display_name ,lookup_code: scrapordersdata?.source_document?.lookup_code};
          if (o.key == "Link_Source_Document") {
            o.value  = scrapordersdata && scrapordersdata .source_document?.lookup_code == 'GRN' ? {id: scrapordersdata?.source_documents?.id , label: scrapordersdata?.source_documents?.grn_number , data:scrapordersdata?.source_documents} : null
            
          }
          return o;
        })

      setScrapOrderDetailsFields(newScrapOrderDetailsFields);
    
      var newselectedProductData = [];
      if (scrapordersdata.order_lines)
        newselectedProductData = scrapordersdata.order_lines && scrapordersdata.order_lines.map(o => {
          return {
            product_name: { id: o.product_Details?.id, label: o.product_Details?.product_name },
            sku_id: o.product_Details?.sku_id,
            description: o.product_Details?.description,
            lot_number: o.lot_number,
            // uom.name: {id:o.uom?.id, label:o.uom?.name},
            uom: { name: { id: o.uom?.id, label: o.uom?.name } },
            "inventory_id": o.inventory_id,
            scrap_item_quantity: o.scrap_item_quantity,
            price: o.price
          }
        });
      setSelectedProductData(newselectedProductData);
      var data = scrapLocationFetch;
      var newScrapLocationAddressFields = ScrapLocationAddressFields
        .map(o => {
          if (o.key == "receiver_name") o.value = scrapordersdata.scrap_location_details?.receiver_name;
          if (o.key == "mobile_number") o.value = scrapordersdata.scrap_location_details?.mobile_number;
          if (o.key == "email") o.value = scrapordersdata.scrap_location_details?.email;
          if (o.key == "address_line") o.value = scrapordersdata.scrap_location_details?.address_line;
          if (o.key == "address_line2") o.value = scrapordersdata.scrap_location_details?.address_line2;
          if (o.key == "address_line3") o.value = scrapordersdata.scrap_location_details?.address_line3;
          if (o.key == "zip") o.value = scrapordersdata.scrap_location_details?.zip;
          if (o.key == "district") o.value = scrapordersdata.scrap_location_details?.district;
          if (o.key == "state_id") o.value = scrapordersdata.scrap_location_details?.state_id;
          // if(o.key=="country_id") o.value= countries.find(o => {if(o.id == scrapordersdata.scrap_location_details.country_id) return {id: o.id, label:o.name}});
          if (o.key == "country_id") o.value = scrapordersdata.scrap_location_details?.country_id;
          data[o.key] = o.value && o.value.id ? o.value.id : o.value;
          return o;
        })
      setScrapLocationAddressFields(newScrapLocationAddressFields);
      setscrapLocationFetch(data);

      var fetchSourceLocationData = locationsList.find(o => o.id == scrapordersdata?.scrap_source_location_id);
     
      setsourceLocationFetch(fetchSourceLocationData);
     
    setScrapLocationAddressFields(newScrapLocationAddressFields);
     
if(scrapordersdata?.shipping_details?.estimated_cost){
      var newEstimated_Cost = scrapordersdata?.shipping_details?.estimated_cost.map(data => {
        return {
          "Estimated_Cost_Shipping_Partners": data.shipping_partners,
          "Estimated_Cost_Charges": data.cost,
          "Estimated_Cost_Order_Deliver_Time": data.order_delivery_time,
          "Estimated_Cost_Select": scrapordersdata.shipping_carrier_id
        };
      });
      setEstimated_Cost(newEstimated_Cost);
    }

      var newSelfPreferFields = SelfPreferFields
        .map(o => {
          if (o.key == "shipping_partner_id") o.value = scrapordersdata?.shipping_partner_id;
          if (o.key == "awb_number") o.value = scrapordersdata.shipping_details?.awb_number;
          return o;
        })
      setSelfPreferFields(newSelfPreferFields);

      var newSchedule_Pickup_date_and_time = Schedule_Pickup_date_and_time
        .map(o => {
          if (o.key == "Schedule_Pickup_date") o.value = moment(scrapordersdata?.pickup_date_time?.pickup_date).format("YYYY-MM-DD");
          if (o.key == "Schedule_Pickup_time") o.value = o.value.map(p => {
            if (p.key == "Schedule_Pickup_time_from") p.value = moment(scrapordersdata?.pickup_date_and_time?.pickup_from_time);
            if (p.key == "Schedule_Pickup_time_to") p.value = moment(scrapordersdata?.pickup_date_and_time?.pickup_to_time);
            return p;
          })
          return o;
        })
      setSchedule_Pickup_date_and_time(newSchedule_Pickup_date_and_time);


      newMainData = [
        ...newScrapOrderDetailsFields,
        ...newScrapLocationAddressFields,
        ...newSelfPreferFields,
        ...newSchedule_Pickup_date_and_time,
        ...newselectedProductData,
      ];
      if(scrapordersdata && scrapordersdata.shipping_order_id){
        dispatch(getShippingById(scrapordersdata?.shipping_order_id));
      }
      var keyValuePairMainData = { "newEstimated_Cost": 0, "Estimated_Cost_Select": scrapordersdata.shipping_carrier_id };

      newMainData.map(o => {
        if (o.key == "Schedule_Pickup_time") {
          o.value.map(p => { keyValuePairMainData[p.key] = p.value; })
        }
        if(o.key == 'Selected_shipping_details'){
          keyValuePairMainData[o.key] = o.isChecked;
        }
        if (o.key == "schedule_scrap_date" || o.key == "Schedule_Pickup_date") {
          var value1 = new Date(o.value)
          keyValuePairMainData[o.key] = (value1).toISOString();
        }
        else if(o.key!=null){
          if(o.key == 'Link_Source_Document'){
            var newlinkData = scrapordersdata?.link_source_document
          }
            keyValuePairMainData[o.key]=o.value;
       
          
           }
      });
      setMainData(keyValuePairMainData);

    }

  }, [scrapordersdata])

  useEffect(()=>{    
    if(GRNViewdata && mainData && mainData.Link_Source_Document_Type && mainData.Link_Source_Document_Type.lookup_code == "GRN")
    {
      var newMainData=[];

      var nweselectedProductData=[];
      if(GRNViewdata.grn_order_lines)
      nweselectedProductData=GRNViewdata.grn_order_lines.map(o=>{return{
        id:o.product_id,
        sku_id: o.product?.sku_id,
        product_template_id:o.product_template_id,
        product_name: { id: o.product?.id, label: o.product?.product_name },
        description: o.product?.description,
        lot_number: o?.lot_number,
        // "warehouse_id": 1,
        // "inventory_id": 1,
        uom: { name: { id: o.uom?.id, label: o.uom?.name } },
      inventory_id: o?.inventory_id,
      scrap_item_quantity: o.scrap_item_quantity,
      price: o.price
        //"Payment_Terms":o.product_details.Payment_Terms
      }});
      setSelectedProductData(nweselectedProductData);

 
        
        newMainData=[ 
           ...nweselectedProductData,   

        ];
   
        var keyValuePairMainData= mainData
      newMainData.map(o=>{
        
       if(o.key!=null){
          keyValuePairMainData[o.key]=o.value;
        }
      });
      setMainData(keyValuePairMainData);
    }
  },[GRNViewdata])

  const [ScrapOrderDetailsFields, setScrapOrderDetailsFields] = useState([
    {
      label: "Scrap Order Number",
      type: "input",
      key: "scrap_order_no",
    },
    {
      label: "Auto Generate Scrap Order Number",
      type: "checkbox",
      key: "Auto_scrap_order_number",
      isChecked: false,
    },
    {
      label: "Schedule Scrap Date",
      type: "date",
      key: "schedule_scrap_date",
    },
    {
      label: "Scrapping Reason",
      type: "select",
      key: "scrap_reason_id",
    },
    {
      label: "Source Document Type",
      type: "select",
      key: "Link_Source_Document_Type",
      defaultVal: {},
    },
    {
      label: "Select Source Document",
      type: "select",
      key: "Link_Source_Document",
      defaultVal: {},
    },
    {
      label: "Source Location",
      type: "select",
      key: "scrap_source_location_id",
    },
    {
      label: "Scrap Location",
      type: "select",
      key: "scrap_location_id",
    },
  ]);
  const [ScrapLocationAddressFields, setScrapLocationAddressFields] = useState([
    {
      label: "Receiver Name",
      type: "input",
      key: "receiver_name",
    },
    {
      label: "Mobile Number",
      type: "input",
      key: "mobile_number",
    },
    {
      label: "Email",
      type: "input",
      key: "email",
    },
    {
      label: "Address Line 1",
      type: "input",
      key: "address_line",
    },
    {
      label: "Address Line 2",
      type: "input",
      key: "address_line2",
    },
    {
      label: "Address Line 3",
      type: "input",
      key: "address_line3",
    },
    {
      label: "Zipcode",
      type: "input",
      key: "zip",
    },
    {
      label: "City/District",
      type: "input",
      key: "district",
    },
    {
      label: "State",
      type: "select",
      key: "state_id",
    },
    {
      label: "Country",
      type: "select",
      key: "country_id",
    },
  ]);
  const [ShippingPreferenceChecking, setShippingPreferenceChecking] = useState([
    {
      label: "Shipping Preference",
      type: "radio",
      key: "shipping_preferance",
      sub: [{ "label": "Eunimart", "value": "Eunimart", "checked": true }, { "label": "Self", "value": "Self" }],
      defaultVal: {},

    },
  ]);
  const [SelfPreferFields, setSelfPreferFields] = useState([
    {
      label: "Carrier Name",
      type: "select",
      key: "shipping_partner_id",
    },
    {
      label: "AWB Number",
      type: "input",
      key: "awb_number",
    },
  ]);
  const [Schedule_Pickup_date_and_time, setSchedule_Pickup_date_and_time] = useState([
    {
      label: "Set pickup date",
      type: "date",
      key: "Schedule_Pickup_date",
    },
    {
      label: "Set pickup time",
      type: "time_card",
      key: "Schedule_Pickup_time",
      value: [
        {
          label: "",
          type: "time",
          key: "Schedule_Pickup_time_from",
          value: ""
        },
        {
          label: "to",
          type: "time",
          key: "Schedule_Pickup_time_to",
          value: ""
        },
      ],
    },

  ]);
  const [ShippingDetailsChecking, setShippingDetailsChecking] = useState([
    {
      label: "Shipping Details",
      type: "checkbox",
      key: "Selected_shipping_details",
      isChecked: false
    },
  ]);
  const [PackageDetailsFields, setPackageDetailsFields] = useState([
    {
      label: "Package Length",
      type: "input",
      key: "package_length",
    },
    {
      label: "Package Breadth",
      type: "input",
      key: "package_width",
      isChecked: false,
    },
    {
      label: "Package Height",
      type: "input",
      key: "package_height",
      isChecked: false,
    },
    {
      label: "Volumetric Dimensions",
      type: "input",
      key: "volumetric_weight",
    },
    {
      label: "Package Weight",
      type: "input",
      key: "package_weight",
    },
  ]);
  const headCells = [
    {
      key: "product_name",
      label: "Product",
      type: "select",
      data: productData.map(o => { return { id: o.id, label: o.product_name } })
    },
    {
      key: "sku_id",
      label: "Product Sku",
      type: "text"
    },
    {
      key: "description.data",
      label: "Description",
      type: "text"
    },
    {
      key: "lot_number",
      label: "Lot Number",
      type: "text"
    },
    {
      key: "uom.name",
      label: "Unit of Measure",
      type: "select",
      data: uomData.map(o => { return { id: o.id, label: o.name } })
    },
    {
      key: "scrap_item_quantity",
      label: "Scrapped Item Quantity",
      type: "number"
    },
    {
      key: "price",
      label: "Price",
      type: "number",
    },

    {
      key: "Action",
      label: "Action",
      type: "view",
      renderView: (item) => (
        <div>
          <DeleteIcon onClick={() => setSelectedProductData(selectedProductData.filter(o => o.id != item.id))} />
          {/* <DeleteIcon /> */}
        </div>
      )
    }
  ];
  const productListHeadCells = [
    {
      key: "product_name",
      label: "Product Name",
      numeric: false,
      type: "text",
      // data: useSelector((state) => state.data.productVariantData.map(o=>{return{id:o.id, label:o.sku_id}}))
    },
    {
      key: "sku_code",
      label: "Sku ID",
      numeric: false,
      type: "text"
    },
    {
      key: "primary_category.name",
      label: "Category",
      numeric: false,
      type: "text"
    },
    {
      key: "secondary_category.name",
      label: "Sub Category",
      numeric: false,
      type: "text"
    },
    {
      key: "mrp",
      label: "MRP",
      numeric: false,
      type: "text",
      // data:useSelector((state) => state.data.uomData.map(o=>{return{id:o.id, label:o.name}}))
    },
    {
      key: "quantity",
      label: "Quantity in hand",
      numeric: false,
      type: "text"
    },
    {
      key: "price",
      label: "Price",
      numeric: false,
      type: "text",
    },
    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action",
    },
  ];
  const shippingListHeadCells = [
    {
      key: "shipping_partner",
      label: "Shipping Partners",
      numeric: false,
      type: "text",
      // data: useSelector((state) => state.data.productVariantData.map(o=>{return{id:o.id, label:o.sku_id}}))
    },
    {
      key: "charges",
      label: "Charges",
      numeric: false,
      type: "text"
    },
    {
      key: "deleivery_time",
      label: "Order Delivery Time",
      numeric: false,
      type: "text"
    },
    {
      key: "is_selected",
      label: "Select",
      numeric: true,
      type: "radio"
    },

  ];
  const [Estimated_Cost, setEstimated_Cost] = useState({});
  const Estimated_Cost_headCells = [
    {
      key: "Estimated_Cost_Shipping_Partners",
      label: "Shipping Partners",
      type: "text",
    },
    {
      key: "Estimated_Cost_Charges",
      label: "Charges",
      type: "text",
    },
    {
      key: "Estimated_Cost_Order_Deliver_Time",
      label: "Order Deliver Time",
      type: "text",
    },
    {
      key: "Estimated_Cost_Select",
      label: "Select",
      type: "radio",
    },
  ];

  useEffect(() => {
    if (EstimatedCostdata) {
      var shipping_preferance = ShippingPreferenceChecking.find(o => o.key == "shipping_preferance").sub.find(o => o.checked).label;
      setRadioValue(shipping_preferance);
      if (shipping_preferance == "Eunimart" && EstimatedCostdata && EstimatedCostdata.express) {
        var newEstimated_Cost = EstimatedCostdata.express.map(data => {
          var dataRaw = {};
          Estimated_Cost_headCells.map(tableRaw => {
            if (tableRaw.key == "Estimated_Cost_Shipping_Partners") {
              dataRaw["Estimated_Cost_Shipping_Partners"] = data.name;
            }
            if (tableRaw.key == "Estimated_Cost_Charges") {
              dataRaw["Estimated_Cost_Charges"] = data.charges;
            }
            if (tableRaw.key == "Estimated_Cost_Order_Deliver_Time") {
              dataRaw["Estimated_Cost_Order_Deliver_Time"] = data.Order_delivery_time;
            }
            if (tableRaw.key == "Estimated_Cost_Select") {
              dataRaw["Estimated_Cost_Select"] = data.supplier_id;
            }
          });
          return dataRaw;
        });
        setEstimated_Cost(newEstimated_Cost);
      }
      else {
        setEstimated_Cost(null);
      }

    }
  }, [EstimatedCostdata])


  const setDataByKeyAndValue = (key, value, index = null) => {

    if (key == "pickup_time_from" || key == "pickup_time_to") {
      var newPickingTimings = PickingTimings.map(o => { if (o.key == "pickup_time") o.value.map(p => { if (p.key == key) p.value = new Date(value); return p; }); return o; });
      setPickingTimings(newPickingTimings)

      var newMainData = mainData;
      if (key == "pickup_time_from")
        newMainData["pickup_time_from_1"] = moment(new Date(value)).format("hh:mm A");
      if (key == "pickup_time_to")
        newMainData["pickup_time_to_1"] = moment(new Date(value)).format("hh:mm A");
      setMainData(newMainData);
    }
    if (index != null) {
      try {
        var newSelectedProductData = selectedProductData;

        if (key === 'product_name') {
          console.log("sku_id")
          var selectVarient = productData.find(o => o.id == value.id);
          console.log('product',selectVarient)
          newSelectedProductData[index] = selectVarient;
          newSelectedProductData[index][key] = value.label;
          newSelectedProductData[index]['description'] = selectVarient?.description;
          newSelectedProductData[index]['sku_code'] = selectVarient?.sku_code;
          newSelectedProductData[index]['price'] = selectVarient?.selling_price;
        }

        else if (key === 'uom.name') {
          console.log("uom.name")
          var selectVarient = uomData.find(o => o.id == value.id);
          newSelectedProductData[index].uom = { name: value.label, id: value.id };
        }
        else {
          if (key == 'description.data') {
            newSelectedProductData[index][key.split(".")[0]] = value;
          }
          else {
            if (key.toString().includes('.')) newSelectedProductData[index][key.split(".")[0]][key.split(".")[1]] = value;
            else newSelectedProductData[index][key] = value;
          }

        }
        // var Quantity=0;
        // var selling_price=0;
        // var discount=0;
        // if(newSelectedProductData[index].Quantity) Quantity=parseInt(newSelectedProductData[index].Quantity);
        // if(newSelectedProductData[index].selling_price)selling_price=parseFloat(newSelectedProductData[index].selling_price);
        // if(newSelectedProductData[index].discount)discount=parseFloat(newSelectedProductData[index].discount);
        // var grossTotal = (Quantity*selling_price)-discount;
        // var tax=0;
        // if(newSelectedProductData[index].product_pricing_details && newSelectedProductData[index].product_pricing_details.tax_options && parseFloat(newSelectedProductData[index].product_pricing_details.tax_options)>0){
        //   var taxRate=parseFloat(newSelectedProductData[index].product_pricing_details.tax_options);
        //   tax=(grossTotal*taxRate)/100
        // }
        // else tax = 0;

        // var amount=grossTotal+tax;
        // newSelectedProductData[index].Amount=amount;
        var Quantity = 0;
        var selling_price = 0;
        var discount = 0;
        if (newSelectedProductData[index].scrap_item_quantity) Quantity = parseInt(newSelectedProductData[index].Quantity);
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

        setSelectedProductData(newSelectedProductData);

        var total = newSelectedProductData.map(o => o.Amount).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        if (paymentDetailsFields.Final_Adjustment == "+") {
          total = total + paymentDetailsFields.adjustment_amount;
        }
        else {
          total = total - paymentDetailsFields.adjustment_amount;
        }
        setPaymentDetailsFields({ ...paymentDetailsFields, subTotal: grossTotal, tax: newSelectedProductData[0]?.product_pricing_details?.tax_options ?? 0, totalBeforeAdjustment: total, total: total })
        setSelectedProductData(newSelectedProductData);
      }
      catch (e) { console.error("err1", e) }
    }


    try {
      var newScrapOrderDetailsFields = ScrapOrderDetailsFields
        .map(o => {
          if (o.key == key) o.value = value;
          return o;
        })
      setScrapOrderDetailsFields(newScrapOrderDetailsFields);
    }
    catch (e) { console.error("err2", e) }

    try {
      var newScrapLocationAddressFields = ScrapLocationAddressFields
        .map(o => {
          if (o.key == key) o.value = value;
          return o;
        })
      setScrapLocationAddressFields(newScrapLocationAddressFields);
    }
    catch (e) { console.error("err3", e) }

    try {
      var newSelfPreferFields = SelfPreferFields
        .map(o => {
          if (o.key == key) o.value = value;
          return o;
        })
      setSelfPreferFields(newSelfPreferFields);
    }
    catch (e) { console.error("err4", e) }


    if (key == "Schedule_Pickup_date") {
      var newSchedule_Pickup_date_and_time = Schedule_Pickup_date_and_time.map(o => { if (o.key == "Schedule_Pickup_date") o.value = value; return o; });
      setSchedule_Pickup_date_and_time(newSchedule_Pickup_date_and_time)
    }
    if (key == "Schedule_Pickup_time_from" || key == "Schedule_Pickup_time_to") {
      var newSchedule_Pickup_date_and_time = Schedule_Pickup_date_and_time.map(o => { if (o.key == "Schedule_Pickup_time") o.value.map(p => { if (p.key == key) p.value = new Date(value); return p; }); return o; });
      setSchedule_Pickup_date_and_time(newSchedule_Pickup_date_and_time)
    }


    try {
      var newPackageDetailsFields = PackageDetailsFields
        .map(o => {
          if (o.key == key) o.value = value;
          return o;
        })
      setPackageDetailsFields(newPackageDetailsFields)
    }
    catch (e) { console.error("err1", e) }

    // try{
    //   if(key=="Final_Enter_Amount"){
    //     var nvalue=0;
    //     if(value) nvalue=parseFloat(value)

    //     var newpaymentDetailsFields=paymentDetailsFields;
    //     newpaymentDetailsFields.adjustment_amount=nvalue;
    //     setPaymentDetailsFields(newpaymentDetailsFields);

    //  }
    // }
    // catch(e){console.error("err1", e)}
  }
  const handelInputChange = (key, value, index = null) => {
    console.log("key", key, "value", value, "index", index);
    setDataByKeyAndValue(key, value, index);

    if(index==null){
      var newMainData=mainData;
      if (key == "schedule_scrap_date" || key == "Schedule_Pickup_date") {
                var value1= new Date(value)
                newMainData[key]= (value1).toISOString();
                 }
                 else{
                    var newMainData=mainData;
                    newMainData[key]=value;
                 }
           setMainData(newMainData);
  }

    calulate_total();
  };
  const handelEstimated_Cost_RadionButtononChange = (value) => {
    console.log("value", value)

    var newMainData = mainData;
    newMainData["Estimated_Cost_Select"] = value;
    setMainData(newMainData);
    calulate_total();
  };
  const handelRadionButtononChange = (prop, value) => {
    if (prop == "shipping_preferance") {
      var OldState = ShippingPreferenceChecking.map(o => { if (o.key == prop) o.sub.map(p => { p.checked = false; return p; }); return o })
      setShippingPreferenceChecking(OldState);

      var newState = ShippingPreferenceChecking.map(o => { if (o.key == prop) o.sub.map(p => { if (p.value == value) p.checked = true; return p; }); return o })
      setShippingPreferenceChecking(newState);

      var newMainData = mainData;
      newMainData["shipping_preferance"] = (value == "Eunimart" ? "Eunimart" : "Self");
      setMainData(newMainData);
      setRadioValue(newMainData["shipping_preferance"])
    }
  };
  // const[CheckboxShowForCopyField_value, setCheckboxShowForCopyField_value]=useState(false);
  // const handelCheckboxShowForCopyField_valueChange =(field) =>{  
  //   setCheckboxShowForCopyField_value(!CheckboxShowForCopyField_value);
  // }
  function calulate_total() {
    if (selectedProductData && mainData && Estimated_Cost) {
      var val1 = selectedProductData.map(o => o.Amount).reduce((previousValue, currentValue) => { return previousValue + currentValue });
      var id_Estimated_Cost_Select = mainData.Estimated_Cost_Select;
      var val2 = Estimated_Cost && Estimated_Cost.length > 0 && Estimated_Cost.find(o => o.Estimated_Cost_Select == id_Estimated_Cost_Select).Estimated_Cost_Charges;
      var subTotal = val1 + val2;
      //console.log("subTotal",subTotal)
      var newtotal = 0;

      if (paymentDetailsFields.Final_Adjustment == "+") {
        newtotal = paymentDetailsFields.adjustment_amount + subTotal;
      }
      else {
        newtotal = paymentDetailsFields.adjustment_amount - subTotal;
      }

      //console.log("newtotal",newtotal)
      setPaymentDetailsFields({ ...paymentDetailsFields, shippingCharge: val2, total: newtotal });
    }
  }
  const handelSelectonChange = (key, value) => {
    console.log('valueeee', key, value)
    if (key == "country_id") {
      setCountry(value.id);
      dispatch(loadStates(value.id));
    }
    if (key == "Link_Source_Document_Type") {
      if (value.lookup_code == "GRN") {
        dispatch(loadGrnData({ limit: 100, offset: 1, filters: null, sort: null }));
      }
    }
    if (key == "Link_Source_Document") {
      if (mainData.Link_Source_Document_Type.lookup_code == "GRN") {
        dispatch(loadGrnDataById(value.id));
      }
    }
    switch (key) {
      case "country_id": {
        setScrapLocationAddressFields(ScrapLocationAddressFields.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;
      }

      case "Link_Source_Document_Type": 
      case "scrap_reason_id": {
        setScrapOrderDetailsFields(ScrapOrderDetailsFields.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;
      }
      case"Link_Source_Document":{
        setScrapOrderDetailsFields(ScrapOrderDetailsFields.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;
      }
      case "scrap_source_location_id": {
        setScrapOrderDetailsFields(ScrapOrderDetailsFields.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        var fetchSourceLocationData = locationsList.find(o => o.id == value.id);
        setsourceLocationFetch(fetchSourceLocationData);
        break;
      }
      case "scrap_location_id": {
        setScrapOrderDetailsFields(ScrapOrderDetailsFields.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        var fetchScrapLocationData = locationsList.find(o => o.id == value.id);
        var data = scrapLocationFetch
        var newScrapLocationAddressFields = ScrapLocationAddressFields
          .map(o => {
            if (o.key == "receiver_name") o.value = fetchScrapLocationData?.name;
            if (o.key == "mobile_number") o.value = fetchScrapLocationData?.mobile_number;
            if (o.key == "email") o.value = fetchScrapLocationData?.email;
            if (o.key == "address_line") o.value = fetchScrapLocationData?.address?.address_line_1;
            if (o.key == "address_line2") o.value = fetchScrapLocationData?.address?.address_line_2;
            if (o.key == "address_line3") o.value = fetchScrapLocationData?.address?.address_line_3;
            if (o.key == "zip") o.value = fetchScrapLocationData?.address?.pin_code;
            if (o.key == "district") o.value = fetchScrapLocationData?.address?.district;
            if (o.key == "state_id") o.value = { id: fetchScrapLocationData?.address?.state.id, label: fetchScrapLocationData?.address?.state.name };
            // if(o.key=="country_id") o.value= countries.map(o => {if(o.id == scrapordersdata.scrap_location_details.country_id) return {id: o.id, label:o.name}});
            if (o.key == "country_id") o.value = { id: fetchScrapLocationData?.address?.country.id, label: fetchScrapLocationData?.address?.country.name };
            data[o.key] = o?.value;

            return o;
          })
        setScrapLocationAddressFields(newScrapLocationAddressFields);
        setscrapLocationFetch(data);


        break;
      }
      case "shipping_partner_id": {
        setSelfPreferFields(SelfPreferFields.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
        break;
      }
      // case"Link_Source_Document":
      // case "Link_Source_Document_Type": {
      //   setScrapOrderDetailsFields(ScrapOrderDetailsFields.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
      //   break;
      // }
      // case"Link_Source_Document":{
      //   setScrapOrderDetailsFields(ScrapOrderDetailsFields.map(o=>{if(o.key==key) return{...o, value:value}; return o}));
      //   break;
      // }
    }
    var newMainData = mainData;
    newMainData[key] = value;
    setMainData(newMainData);

  }
  const handelCheckBoxonChange = (field) => {
    var newMainData = mainData;
    if(field.key == "Auto_scrap_order_number")
      {
        // var neworder=ScrapOrderDetailsFields.map(o=>{if(o.key=='scrap_order_no') {o.disabled=!field.isChecked; o.value = ''} return o;})
        // var neworder=ScrapOrderDetailsFields.map(o=>{if(o.key=='scrap_order_no') {o.disabled=!field.isChecked;} return o;})
        var newState = ScrapOrderDetailsFields.map(o=>{if(o.key==field.key) {o.isChecked=!o.isChecked;} return o})
        setScrapOrderDetailsFields(newState)
        newMainData[field.key] = field.isChecked;
        // setMainData(newData => { 
        //   const {scrap_order_no, ...rest} = newData;
        //   return rest;
        // });
        setMainData(newMainData);
      }

      if (field.key == "Selected_shipping_details") {
        var newState = ShippingDetailsChecking.map(o=>{if(o.key==field.key) {o.isChecked=!o.isChecked;} return o})
        setShippingDetailsChecking(newState)
        newMainData[field.key] = field.isChecked;
        setviewShipping(field.isChecked)
        setMainData(newMainData);
      }     
  };
  const setRadioType = (prop, value) => {
    if (prop == 'shipping_preferance') {

    }

  };
  const handlePricingId = (id) => {
    // setpricingtable(true);
    // dispatch(fetchPricingDataById(id));
    // //  handleClose();
    // setviewPricelist((prev) => !prev);

    // console.log(pricingviewdata, "pricingviewdata");
  };
  const handleButtonClick = (key) => {
    console.log("mainDatacheck", mainData);
    console.log("selectedProductData", selectedProductData)
    console.log(scrapLocationFetch, 'gdhchvchghcdfsourceLocationFetch', sourceLocationFetch)
    if (key == "Get Quote") {
      var data = {
        "origin_pincode": (sourceLocationFetch?.address?.pin_code)?.toString(), //Fix Not Avialble in Search Warehosue API // Praveen sir
        "destination_pincode": (scrapLocationFetch?.zip)?.toString(),
        "package_details": {
          "package_height": mainData.package_height,
          "package_weight": mainData.package_weight,
          "package_length": mainData.Package_length,
          "volumetric_weight": mainData.volumetric_weight,
          "package_width": mainData.package_width,

          // "product_value":paymentDetailsFields.total
        },
        "is_cod": true
      }
      dispatch(load_rate_calculator_data(data));
      return true;
    }

    if(key=="Cancel"){
      navigate.push("/scrapOrders"); 
      return;
    } 

    var Estimated_Cost_details = Estimated_Cost && Estimated_Cost.length > 0 && Estimated_Cost.find(o => o.Estimated_Cost_Select == mainData.Estimated_Cost_Select);
    var body = { 
      "auto_create_scrap_number" : mainData.Auto_scrap_order_number ? mainData.Auto_scrap_order_number : false,
      "auto_generate_reference_number": true,
      "is_shipping": mainData.Selected_shipping_details ? mainData.Selected_shipping_details : false,
      "scrap_order_no": mainData?.scrap_order_no,
      "schedule_scrap_date": mainData.schedule_scrap_date ? mainData.schedule_scrap_date : '',
      "scrap_reason_id": mainData.scrap_reason_id && mainData.scrap_reason_id.id ? mainData.scrap_reason_id.id : mainData.scrap_reason_id,
      "scrap_source_location_id": mainData.scrap_source_location_id && mainData.scrap_source_location_id.id ? mainData.scrap_source_location_id.id : mainData.scrap_source_location_id,
      "scrap_location_id": mainData.scrap_location_id && mainData.scrap_location_id.id ? mainData.scrap_location_id.id : mainData.scrap_location_id,
      "no_of_items": selectedProductData && selectedProductData.length,
      "total_quantity": mainData.total_quantity ? mainData.total_quantity : 0,
      "status_id": 223,
      "status_history": {},
      "source_document_type_id":mainData?.Link_Source_Document_Type?.id,
      "source_documents":mainData?.Link_Source_Document?.data,

      "order_lines": selectedProductData.map(o => {
        return {

          "product_id": o.id ? o.id : o.product_name?.id,
          "description": o.description && o.description.data ? o.description.data : o.description,
          "lot_number": Number(o?.lot_number),
          "inventory_id": o.inventory_id ? Number(o.inventory_id) : 1,
          "uom_id": o.uom && o.uom.name && o.uom.name.id ? o.uom.name?.id : o.uom.id,
          "scrap_item_quantity": Number(o.scrap_item_quantity ? o.scrap_item_quantity : 0),
          "price": parseFloat(o?.price)
        }
      }),

      "scrap_location_details": {
        "receiver_name": scrapLocationFetch?.receiver_name,
        "email": scrapLocationFetch?.email,
        "mobile_number": scrapLocationFetch?.mobile_number,
        "address_line": scrapLocationFetch?.address_line,
        "address_line2": scrapLocationFetch?.address_line2,
        "address_line3": scrapLocationFetch?.address_line3,
        "land_mark": scrapLocationFetch?.land_mark,
        "zip": scrapLocationFetch?.zip,
        "city": scrapLocationFetch?.city,
        "state_id": scrapLocationFetch?.state_id?.id,
        "country_id": scrapLocationFetch?.country_id?.id,
      },
      
      // "shipping_details": {
      //   "shipping_preferance": mainData.shipping_preferance ? mainData.shipping_preferance : 'Eunimart',
      //   "shipping_partner_id": mainData.shipping_partner_id,
      //   "awb_number": mainData.awb_number,
      //   "package_details": {
      //     "package_height": mainData.package_height ? Number(mainData.package_height) : 0,
      //     "package_weight": mainData.package_weight ? Number(mainData.package_weight) : 0,
      //     "package_length": mainData.package_length ? Number(mainData.package_length) : 0,
      //     "volumetric_weight": mainData.volumetric_weight ? Number(mainData.volumetric_weight) : 0,
      //     "package_width": mainData.package_width ? Number(mainData.package_width) : 0
      //   },
      //   "estimated_cost": [
      //     {
      //       "shipping_partners": Estimated_Cost_details && Estimated_Cost_details.Estimated_Cost_Shipping_Partners,
      //       "cost": Estimated_Cost_details && Estimated_Cost_details.Estimated_Cost_Charges,
      //       "order_delivery_time": Estimated_Cost_details && Estimated_Cost_details.Estimated_Cost_Order_Deliver_Time
      //     }
      //   ]
      // },
      "pickup_date_time": {
        "pickup_date": mainData.Schedule_Pickup_date,
        "pickup_from_time": mainData.Schedule_Pickup_time_from,
        "pickup_to_time": mainData.Schedule_Pickup_time_to
      },
      "grn_status": true,
      "is_active": true
    }
  
    var body1 = { 
      "auto_create_scrap_number" : mainData.Auto_scrap_order_number ? mainData.Auto_scrap_order_number : false,
      "auto_generate_reference_number": true,
      "is_shipping": mainData.Selected_shipping_details ? mainData.Selected_shipping_details : false,
      "scrap_order_no": mainData?.scrap_order_no,
      "schedule_scrap_date": mainData.schedule_scrap_date ? mainData.schedule_scrap_date : '',
      "scrap_reason_id": mainData.scrap_reason_id && mainData.scrap_reason_id.id ? mainData.scrap_reason_id.id : mainData.scrap_reason_id,
      "scrap_source_location_id": mainData.scrap_source_location_id && mainData.scrap_source_location_id.id ? mainData.scrap_source_location_id.id : mainData.scrap_source_location_id,
      "scrap_location_id": mainData.scrap_location_id && mainData.scrap_location_id.id ? mainData.scrap_location_id.id : mainData.scrap_location_id,
      "no_of_items": selectedProductData && selectedProductData.length,
      "total_quantity": mainData.total_quantity ? mainData.total_quantity : 0,
      "status_id": 223,
      "status_history": {},
      "source_document_type_id":mainData?.Link_Source_Document_Type?.id,
      "source_documents":mainData?.Link_Source_Document?.data,

      "order_lines": selectedProductData.map(o => {
        return {

          "product_id": o.id ? o.id : o.product_name?.id,
          "description": o.description && o.description.data ? o.description.data : o.description,
          "lot_number": Number(o?.lot_number),
          "inventory_id": o.inventory_id ? Number(o.inventory_id) : 1,
          "uom_id": o.uom && o.uom.name && o.uom.name.id ? o.uom.name?.id : o.uom.id,
          "scrap_item_quantity": Number(o.scrap_item_quantity ? o.scrap_item_quantity : 0),
          "price": parseFloat(o?.price)
        }
      }),

      "scrap_location_details": {
        "receiver_name": scrapLocationFetch?.receiver_name,
        "email": scrapLocationFetch?.email,
        "mobile_number": scrapLocationFetch?.mobile_number,
        "address_line": scrapLocationFetch?.address_line,
        "address_line2": scrapLocationFetch?.address_line2,
        "address_line3": scrapLocationFetch?.address_line3,
        "land_mark": scrapLocationFetch?.land_mark,
        "zip": scrapLocationFetch?.zip,
        "city": scrapLocationFetch?.city,
        "state_id": scrapLocationFetch?.state_id?.label,
        "country_id": scrapLocationFetch?.country_id?.label,
      },
      
      "shipping_details": {
        "shipping_number": "",
        "reference_number": "",
        "channel_id": 2,
        "sender_address": {
          "name": sourceLocationFetch?.name,
          "mobile": sourceLocationFetch?.mobile_number.toString(),
          "nickname": "",
          "email": sourceLocationFetch?.email,
          "addressline1": sourceLocationFetch?.address?.address_line_1,
          "addressline2": sourceLocationFetch?.address?.address_line_2,
          "addressline3": sourceLocationFetch?.address?.address_line_3,
          "pincode": parseInt(sourceLocationFetch?.address?.pincode),
          "city": sourceLocationFetch?.address?.city,
          "state": sourceLocationFetch?.address?.state?.label,
          "country": sourceLocationFetch?.address?.country?.label,
        },
        "receiver_address": {
          "name": scrapLocationFetch?.receiver_name,
          "mobile": scrapLocationFetch?.mobile_number?.toString(),
          "email": scrapLocationFetch?.email,
          "addressline1": scrapLocationFetch?.address_line,
          "addressline2": scrapLocationFetch?.address_line2,
          "addressline3": scrapLocationFetch?.address_line3,
          "pincode": parseInt(scrapLocationFetch?.zip ?? 0),
          "city":scrapLocationFetch?.city,
          "state": scrapLocationFetch?.state_id?.label,
          "country": scrapLocationFetch?.country_id?.label,
        },
        // "billing_address": {
        //   "name": mainData?.BillingAddress_Receiver_Name,
        //   "mobile": mainData?.BillingAddress_Mobile_Number.toString(),
        //   "email": mainData?.BillingAddress_Email,
        //   "addressline1": mainData?.BillingAddress_address_line_1,
        //   "addressline2": mainData?.BillingAddress_address_line_2,
        //   "addressline3": mainData?.BillingAddress_address_line_3,
        //   "pincode": parseInt(mainData?.BillingAddress_Zipcode ?? 0),
        //   "city": mainData?.BillingAddress_District,
        //   "state": mainData?.BillingAddress_State?.label,
        //   "country": mainData?.BillingAddress_Country?.label, 
        // },
      "shipping_date": "2022-05-30T08:54:24.32947Z",
      "partner_id": 1,
      "package_details": {
        "package_height": mainData.package_height ? parseInt(mainData.package_height) : 0,
        "package_length": mainData.package_length ? parseInt(mainData.package_length) : 0,
        "package_weight": mainData.package_weight ? parseInt(mainData.package_weight) : 0,
        "package_width": mainData.package_width ? parseInt(mainData.package_width) : 0,
        "volumetric_weight": mainData.volumetric_weight ? parseInt(mainData?.volumetric_weight) : 0,
        "no_of_items": selectedProductData && parseInt(selectedProductData.length),
      },
      "is_shipping_address": true,
      "supplier_id": Estimated_Cost_details && Estimated_Cost_details.Estimated_Cost_Select,
      "shipping_cost": Estimated_Cost_details && Estimated_Cost_details.Estimated_Cost_Charges,
      "shipping_status_id": 193,
      "shipping_label_id": {
        "name": "shipping_label_docs"
      },
      "shipping_manifest_id": {
        "name": "shipping_manifest_docs"
      },
      "shipping_invoice_id": {
        "name": "shipping_invoice_docs"
      },
      "order_value": 78.23,
      "shipping_payment_type_id": 37,
      "expected_delivery_date": "2022-11-30T08:54:24.32947Z",
      "pickup_attempted": 2,
      "is_marketplace_order": false,
      "order_id": 1,
      "order_date": "2022-11-30T08:54:24.32947Z",
      "eunimart_wallet_amount": 989.89,
      "set_pickup_date": mainData.Schedule_Pickup_date,
      "set_pickup_from_time": mainData.Schedule_Pickup_time_from,
      "set_pickup_to_time": mainData.Schedule_Pickup_time_to,
      "shipping_partner_id": mainData.shipping_partner_id ? mainData.shipping_partner_id : 1,
     
      "awb_number": mainData.awb_number ? mainData.awb_number : "AWB-6273911",
      "is_cod": false,
      "shipping_type_id": 252,
      "shipping_mode_id": 253,
      "quantity": mainData.total_quantity ? mainData.total_quantity : 0,
      // "billing_details": {
      //   "order_id": "ORD-1234",
      //   "invoice_number": "INV-0987",
      //   "currency": "INR",
      //   "tax_amount": 898.2,
      //   "invoice_amount": 972.3,
      //   "gstin": "GST876092",
      //   "iec_number": "IEC-7969",
      //   "hsn_code": "HSC-8R98978"
      // },
      "destination_country_id": scrapLocationFetch?.country_id?.id,
      "destination_zipcode": parseInt(scrapLocationFetch?.zip),
      "origin_country_id": sourceLocationFetch?.address?.country?.id,
      "origin_zipcode": parseInt(sourceLocationFetch?.address?.pincode),
      "package_direction_id": 246,
      "cod_status": "Not Received",
      "cod_due_amount": 989.98,
      "cod_amount_received": 343.34,
      "cod_date_and_time_of_receiving": "2022-11-30T08:54:24.32947Z",
      shipping_order_lines:selectedProductData.map(o=>{return{
        "product_id": o.id ? o.id : o.product_name?.id,
        "product_template_id": o?.product_template_id,
        "warehouse_id": 1,
        "inventory_id": 1,
        "uom_id": o.uom && o.uom.name && o.uom.name.id ? o.uom.name?.id : o.uom.id,
        "serial_number": o?.serial_number,
        "item_quantity": parseInt(o.scrap_item_quantity ? o.scrap_item_quantity : 0),
        "unit_price": parseFloat(o?.price),
        "amount": o?.Amount,
        "payment_term_id":1
        // "tax_price": parseFloat(o?.product_pricing_details?.tax_options),
        // "discount": parseFloat(o?.discount),
          }}), 
    },

      "pickup_date_time": {
        "pickup_date": mainData.Schedule_Pickup_date,
        "pickup_from_time": mainData.Schedule_Pickup_time_from,
        "pickup_to_time": mainData.Schedule_Pickup_time_to
      },
      "grn_status": true,
      "is_active": true
    }

    var payload = mainData.Selected_shipping_details &&  mainData.Selected_shipping_details == true ? body1 : body;
    console.log("body", payload);
    if (props && props.id) {
      dispatch(Update_Scrap_Order_Data(props.id, payload, function (resp) {
        toast(resp)
      }));
    }
    else {
      dispatch(Save_Scrap_Order_Data(payload, function (resp) {
        toast(resp)
      }));
    }
  };
  console.log('maindatadshjkh', viewShipping)
  return (
    <>
      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <AddForm header={"Enter Scrap Order Details"} data={ScrapOrderDetailsFields.map(field => {
            switch (field.key) {
              case 'scrap_reason_id': {
                field.data = scrapReasons.map(o => { return { id: o.id, label: o.display_name } }); break;
              }
              case 'scrap_location_id': {
                field.data = locationsList.map(o => { return { id: o.id, label: o.name } }); break;
              }
              case 'scrap_source_location_id': {
                field.data = locationsList.map(o => { return { id: o.id, label: o.name } }); break;
              }
              case 'Link_Source_Document_Type': {
                field.data = SourceDocumentTypesData.map(o => { return { id: o.id, label: o.display_name, lookup_code: o.lookup_code } }); break;
              }
              case 'Link_Source_Document': {
                field.data =
                  ((mainData && mainData.Link_Source_Document_Type && mainData.Link_Source_Document_Type.lookup_code == "GRN") ?
                    GRNdata.map(o => {return { id: o.id, label: o.grn_number, data: o} })
                    : null
                  ); break;
              }
            }
            return field;
          })} handelInputChange={handelInputChange} handelSelectonChange={handelSelectonChange} handelCheckBoxonChange={handelCheckBoxonChange} setRadioType={setRadioType} />
        </RemoteWrapper>
      </Suspense>
      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography
              componet="h4"
              variant="h6"
              color={"#121417"}
              fontWeight={600}
            >
            </Typography>
            {/* <Button
                    id="demo-customized-button"
                    aria-controls={open ? "demo-customized-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                    style={{
                      textTransform: "none",
                      backgroundColor: "#416BFF",
                    }}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    Select Products
                  </Button> */}
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleViewProducts} disableRipple>
                Add Products from Products
              </MenuItem>
              <MenuItem onClick={handleViewPricelist} disableRipple>
                Add Products from Pricelist
              </MenuItem>
            </StyledMenu>
            {viewProducts && (

              <ModalViewV5
                modalTitle={"Products List"}
                handleConfirm={() => handleConfirmProducts()}
                handleModalClose={() => handleViewProducts()}
                modalOpen={viewProducts}
                disableBtn={true}
                modalWidth={"70%"}
                modalLeft={"15%"}
                actionBtns={["Cancel", "Confirm"]}
              >
                <Box>
                  <Box
                    // display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"baseline"}
                    sx={{ background: "#F9F9F9" }}
                  >
                    <Typography variant="p">Select Products </Typography>
                    {data.length > 0 && (
                      <div>
                        <div>
                          <RemoteDynamicTable
                            table_data={productData}
                            headCells={productListHeadCells}
                            info={productData}
                            customOptions={customOptions}
                            setCustomOptions={setCustomOptions}
                            setParams={setParams}
                            handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                            setId={setId}
                            enablepagination={false}
                          />
                        </div>
                      </div>
                    )}
                  </Box>

                </Box>
              </ModalViewV5>
            )}
            {viewPricelist && (
              <ModalViewV5
                modalTitle={"Select Products from price list"}
                handleConfirm={() => handleViewPricelist()}
                handleModalClose={() => handleViewPricelist()}
                modalOpen={viewPricelist}
                disableBtn={true}
                modalWidth={"70%"}
                modalLeft={"15%"}
                actionBtns={["Cancel", "Confirm"]}
              >
                <Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"baseline"}
                    sx={{ background: "#F9F9F9" }}
                  >
                    <Typography variant="p">Select Rates</Typography>
                  </Box>

                  <Grid
                    container
                    spacing={"20px"}
                    backgroundColor="#F9F9F9"
                    padding="2px 2px"
                    margin={0}

                    width="100% !important"

                    display="flex !important"
                  >
                    {pricingData &&
                      pricingData.length > 0 &&
                      pricingData.map((product) => {
                        return (
                          <div class="myMarketplaces">
                            {pricingData && (
                              <>
                                <div
                                  className="eu1commonCardTopImgWrapper"
                                  onClick={() => {
                                    handlePricingId(product.id);
                                  }}
                                >
                                  <div class="marketPlaceImage">
                                  </div>

                                  <div className="eu1cardDetailss">
                                    <h1 className="pricelistHeading">
                                      {product.price_list_name
                                        ? product.price_list_name
                                        : "--"}
                                    </h1>
                                    <div className="pricelistHeading2">
                                      Vendor Name
                                    </div>
                                    {product.Vendor_Name
                                      ? product.Vendor_Name
                                      : "--"}
                                    <div className="warehousecardDetailss1">
                                      <div>
                                        <div className="pricelistHeading2">
                                          Rule
                                        </div>
                                        {product.rule
                                          ? product.rule
                                          : "--"}
                                      </div>
                                    </div>
                                    <div className="pricelistHeading2">
                                      Type
                                    </div>
                                    {product.type ? product.type : "--"}

                                    <div className="pricelistHeading2">
                                      Currency
                                    </div>
                                    {product.currency.name
                                      ? product.currency.name
                                      : "--"}
                                  </div>
                                </div>

                              </>
                            )}
                          </div>
                        );
                      })}
                    {pricingData && pricingData.length === 0 && (
                      <Box className="nodata_text">
                        <h3>No Data Found</h3>
                      </Box>
                    )}
                    {/* <InventoryCard /> */}
                  </Grid>
                </Box>
              </ModalViewV5>
            )}
          </Box>
          <AddForm_Table headCells={headCells} table_data={selectedProductData} handelInputChange={handelInputChange} header={"Add Products"} renderFooter={() => (<center style={{ marginTop: 10 }}><Link onClick={onAddNewRaw} underline="none">+ Add Product Line</Link></center>)} />

        </RemoteWrapper>
      </Suspense>

      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <AddForm header={"Scrap Location Details"} data={ScrapLocationAddressFields
            .map(field => {
              switch (field.key) {
                case 'country_id': {
                  field.data = countries.map(o => { return { id: o.id, label: o.name } }); break;
                }
                case 'state_id': {
                  field.data = states.map(o => { return { id: o.id, label: o.name } }); break;
                }
              }
              return field;
            })
          } handelInputChange={handelInputChange} handelSelectonChange={handelSelectonChange} handelCheckBoxonChange={handelCheckBoxonChange} setRadioType={setRadioType} />
        </RemoteWrapper>
      </Suspense>

      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <AddForm header={""} data={ShippingDetailsChecking.map(field => {
            return field;
          })} handelInputChange={handelInputChange} handelSelectonChange={handelSelectonChange} handelCheckBoxonChange={handelCheckBoxonChange} setRadioType={setRadioType} />
        </RemoteWrapper>
      </Suspense>
      { viewShipping && viewShipping == true && (
              <>
      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <div className="ShippingDetailsWrapper">
            <AddForm header={""} data={ShippingPreferenceChecking} handelInputChange={handelInputChange} handelSelectonChange={handelSelectonChange} handelCheckBoxonChange={handelCheckBoxonChange} handelRadionButtononChange={handelRadionButtononChange}  Islabel_priceSpace={true} />
          
              {
              radioValue && radioValue == 'Eunimart' && (
                <>
                  <AddForm header={"Package Details"} data={PackageDetailsFields.map(field => {
                    return field;
                  })} handelInputChange={handelInputChange} handelSelectonChange={handelSelectonChange} handelCheckBoxonChange={handelCheckBoxonChange} setRadioType={setRadioType} />


                  <RemoteViewBox_Table headCells={Estimated_Cost_headCells} table_data={Estimated_Cost} header={"Estimated Cost"} IsBouttonShow={true} ButtonName={"Get Quote"} handleButtonClick={handleButtonClick} handelEstimated_Cost_RadionButtononChange={handelEstimated_Cost_RadionButtononChange} />

                </>
              
              )}
             
            {
              radioValue && radioValue == 'Self' && (
                <>
                  <AddForm header={""} data={SelfPreferFields.map(field => {
                    switch (field.key) {
                      case 'shipping_partner_id': {
                        field.data = shippingPartnersList.map(o => { return { id: o.shipping_partner.id, label: o.shipping_partner.partner_name } }); break;
                      }
                    }
                    return field;
                  })} handelInputChange={handelInputChange} handelSelectonChange={handelSelectonChange} handelCheckBoxonChange={handelCheckBoxonChange} setRadioType={setRadioType} />
                </>
              )}


            <div className="walletWrapper">
              <div className="walletBody">
                <p className="walletBody_head">Eunimart Wallet</p>
                <p className="walletBody_text">
                  With Eunimart Shipping, your shipping cost will
                  automatically be deducted from your wallet once you
                  process the order.
                </p>
              </div>
              <div className="wallet">
                <div className="wallet_text">
                  <p className="wallet_balance">
                    Current Balance{" "}
                    <span className="wallet_balance_amt">USD ($) 2.84</span>{" "}
                  </p>
                  <p className="wallet_balance_status">
                    Insufficient Balance
                  </p>
                </div>
                <div className="wallet_rechgBtn_wrap">
                  <button className="wallet_rechgBtn">Recharge Now</button>
                </div>
              </div>
            </div>
            <div className="asnDetailsHeader">
              <p className="asnDetails_header">Estimated Cost</p>
            </div>
            <br />

            {/* <div>
                 <Table
                  tableFor={"estimatedcosttable"}
                  heading={dummy_estimated_cost}
                  detail={data}
                 
                />
        </div> */}
          </div>
        </RemoteWrapper>
      </Suspense>
      </>
              )}
      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <AddForm header={"Schedule Date and Time"} data={Schedule_Pickup_date_and_time.map(field => {
            return field;
          })} handelInputChange={handelInputChange} handelSelectonChange={handelSelectonChange} handelCheckBoxonChange={handelCheckBoxonChange} setRadioType={setRadioType} />
        </RemoteWrapper>
      </Suspense>



      <Suspense fallback={<div>Loading... </div>}>
        <RemoteWrapper>
          <AddFormFooter_Button handleButtonClick={handleButtonClick} />
        </RemoteWrapper>
      </Suspense>

      <ToastContainer />
    </>
  )
}

export default ScrapOrdersAdd;







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
along with this program. If not, see http://www.gnu.org/licenses/.
*/