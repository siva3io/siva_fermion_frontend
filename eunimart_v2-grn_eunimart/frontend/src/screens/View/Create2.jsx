import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, FormControlLabel, FormGroup, Link } from "@mui/material";
import AddForm from "Remote/AddForm";
import AddForm_Table from 'Remote/AddForm_Table';
import AddFormFooter_Button from "Remote/AddFormFooter_Button";
import { SearchSourceDocumentData } from "../../redux/Action/SearchSourceDocumentAction";
import { getASNDataByIdData } from '../../redux/Action/getAsnDataByIdAction';
import { getPOByIdData } from "../../redux/Action/getPurchaseOrderDataByIdAction";
import { fetchSourceDocumentData } from "../../redux/Action/SourceDocumentTypeAction";
import { fetchProductsData } from "../../redux/Action/FetchProductListAction";
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchUOMDropdown } from "../../redux/Action/UOMDropdownAction";
import { createGrn } from "../../redux/Action/CreateGrnAction";
import {  useNavigate } from 'react-router-dom';



const CreateGRN = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputvalue] = useState({});
    const[selectedProductData, setSelectedProductData]=useState([{}]);
    const ASNViewdata = useSelector((state) => state?.AsnByIdData?.AsnDataById); 
    const purchaseOrdersViewdata = useSelector((state) => state?.POByIdData?.PODataById);



  const[mainData, setMainData]=useState({});

   useEffect(() => dispatch(fetchSourceDocumentData()),[]);
  const SourceDocument = useSelector(
    (state) => state.fetchSourceDocumentData?.SourceDocument
  );
  console.log(SourceDocument, "SourceDocument");

  useEffect(() => dispatch(SearchSourceDocumentData()), []);

  const SearchSourceDocument = useSelector(
    (state) => state.SearchSourceDocumentData?.SearchSourceDocument
  );
  console.log(SearchSourceDocument, "SearchSourceDocument");

  

  useEffect(() => dispatch(fetchProductsData()), []);

  const productVariantData = useSelector(
    (state) => state.fetchProductsData?.products
  );
  console.log(productVariantData, "productVariantData");
  
  useEffect(() => dispatch(fetchUOMDropdown()), []);
useEffect(()=>dispatch(SearchSourceDocumentData()),[]);
  const UOM = useSelector(
    (state) => state.fetchUOMDropdown?.Uom
  );
  console.log(UOM, "UOM");
  


  const onAddNewRaw = () =>{
    setSelectedProductData([...selectedProductData,{Quantity:0, selling_price:0, discount:0, product_pricing_details:{tax_options:0}}]);
  }


  

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
          isChecked:false,
          
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
            isChecked:false,   
          },
        
      ]);

    const [GRNscrapOrder,setGRNscrapOrder]=useState([
        {
            label: "Create Scrap Order ",
            type: "checkbox", 
            key: "create_scrap_order",
            isChecked:false,
            
          },

    ]
        );

      

      const headCells = [
        {
          key: "sku_id", 
          label: "Product SKU",
          type: "select",
          data: productVariantData.map(o=>{return{id:o?.id, label:o?.sku_id}})
        },
        {
          key: "product_name",  
          label: "Product Name",
          type: "text"
        },      
        {
          key: "description.data",  
          label: "Inventory ID",
          type: "text"
        }, 
        {
          key: "Lot_Number", 
          label: "Lot Number",
          type: "text"
        },  
        {
            key: "uom.name", 
            label: "Unit Of Measurement",
            type: "select",
            data:UOM.map(o=>{return{id:o?.id, label:o?.name}})
          },  
        {
          key: "Ordered_Units",
          label: "Ordered Units",
          type: "number"
        },  
        {
          key: "received_units", 
          label: "Recieved Units",
          type: "number"
        },  
      
        {
          key: "Pending_Units", 
          label: "Pending Units",
          type: "number"
        },
        {
          key: "Quality_Checked", 
          label: "Quality Checked",
          type: "checkbox"
        },
        {
          key: "Shelf_Location", 
          label: "Shelf Location",
          type: "text"
        },
        {
          key: "Rejected_Quantities", 
          label: "Rejected Quantities",
          type: "text"
        },
        {
          key: "Reasons_of_Rejection", 
          label: "Reasons of Rejection",
          type: "text"
        },
        {
          key: "Action", 
          label: "Action",
          type: "view",
          renderView: (item) => (
            <div>
              <DeleteIcon
                onClick={() =>{
                  console.log("deleted")
                  setSelectedProductData(
                    // selectedProductData.filter((o) => o?.id != item?.id)
                    selectedProductData.filter(
                      (o) => o?.product_id != item?.product_id
                    )
                  )
                }
                }
              />
            </div>
          )
        } 
      ]; 

      const handelCheckBoxonChange = (field) => { 
        console.log("onCheckboxChanges", field);
    
        if(field.key == "auto_generate_grn_number")
        {
          var neworder=GRNDetailsFields.map(o=>{if(o.key=='GRN_Number') o.disabled=!field.isChecked; return o;})
          console.log(neworder,"neworder")
          setGRNDetailsFields(neworder)
          // setMainData(neworder)
        }
    
        if(field.key == "auto_generate_reference_number")
        {
          var neworder=GRNDetailsFields.map(o=>{if(o.key=='Reference_ID') o.disabled=!field.isChecked; return o;})
          setGRNDetailsFields(neworder)
          // setMainData(neworder)
        }
    
        var newState = GRNDetailsFields.map(o=>{if(o.key==field.key) {o.isChecked=!o.isChecked;} return o})
        setGRNDetailsFields(newState)
        

    
      };

      const handelInputChange = (key, value, index=null) => {
        console.log("key", key, "value", value, "index", index)
        if(index!=null){
            var newSelectedProductData=JSON.parse(JSON.stringify(selectedProductData));
            
            if(key==='sku_id'){
              console.log("sku_id")
              var selectVarient=productVariantData.find(o=>o?.id==value?.id);
              newSelectedProductData[index]=selectVarient;
              newSelectedProductData[index][key]=value.label;
            }
            else if(key==='uom.name'){
              console.log("uom.name")
              var selectVarient=UOM.find(o=>o?.id==value?.id);
              newSelectedProductData[index].uom={name:value.label, id:value?.id};
            }
            else{
              console.log("key",key)
              if(key.toString().includes('.')) newSelectedProductData[index][key.split(".")[0]][key.split(".")[1]]=value;
              else newSelectedProductData[index][key]=value;
            }
      
            setSelectedProductData(newSelectedProductData);
            
          }
          
          else{
            if (key == "GRN_Number" || key == "Reference_ID") {
              let tempStaticField = [...GRNDetailsFields];
              let index = tempStaticField.findIndex(function (field) {
                return field.key == key;
              });
              tempStaticField[index]["value"] = value;
              setGRNDetailsFields(tempStaticField)
            }
            var newMainData=mainData;
             
            newMainData[key]=value;
             
            setMainData(newMainData);
            console.log(mainData,"mainData")
          }
      }

      console.log(mainData,"mainData22222")
      const handelSelectonChange = (key, value) => {  
        console.log("handelSelectonChange", value.id)
        const tempValue = { ...inputValue, [key]: value };
        setInputvalue(tempValue);
        console.log(value,inputValue, "iiii");
        if(key==="Source_Document_Type"){
          console.log('1234')
          if(value?.id?.lookup_code == "PURCHASE_ORDERS")
          {
            console.log('364573')
            dispatch(SearchSourceDocumentData( {limit: 100, offset: 1, filters:null, sort:null},value?.id));
          }
          else if(value?.id?.lookup_code == "ASN")
          {
            console.log('364573')
            dispatch(SearchSourceDocumentData( {limit: 100, offset: 1, filters:null, sort:null},value?.id));
          }
            // dispatch(SearchSourceDocumentData(value?.id));
        }
        
        switch (key) {
            case "Source_Document_Type":
              setGRNDetailsFields(GRNDetailsFields?.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
              console.log("excuse",inputValue)
            break;
      
            case "Select_Source_Document":
              setGRNDetailsFields(GRNDetailsFields?.map(o => { if (o.key == key) return { ...o, value: value }; return o }));
              console.log("excuse",inputValue)
                if(inputValue?.Source_Document_Type?.id?.lookup_code == "ASN"){
                    // dispatch(loadASNDataById(value.id)); 
                    dispatch(getASNDataByIdData(value.id));
                }
                else if(inputValue?.Source_Document_Type?.id?.lookup_code == "PURCHASE_ORDERS"){
                  console.log("enter consdition", value.id);
                    // dispatch(loadpurchase_ordersDataById(value.id)); 
                    dispatch(getPOByIdData(value.id));
                }
                break;
            }

    var newMainData=mainData;
      newMainData[key]=value;
      setMainData(newMainData);

      }

   
      const setRadioType = (prop, value) => { 
        console.log("setRadioType",prop,value)
    };
    console.log("options_setting",inputValue)
    var options1 = [];
    for (let i in SearchSourceDocument) {
      if (inputValue.Source_Document_Type?.id?.display_name === "Ist") {
        // console.log("SearchSourceDocument[i]",SearchSourceDocument[i])
        options1 = options1.concat(
          // SearchSourceDocument[i].ist_number
          {value:SearchSourceDocument[i]?.ist_number,id:SearchSourceDocument[i]?.id}
        );
      }
        else if(inputValue.Source_Document_Type?.id?.display_name === "Asn"){
          options1 = options1.concat(
            // SearchSourceDocument[i]?.asn_number
            {value:SearchSourceDocument[i]?.asn_number,id:SearchSourceDocument[i]?.id}
          );
  
        }
        else if(inputValue.Source_Document_Type?.id?.display_name === "Sales Order"){
         
          options1 = options1.concat(
            // SearchSourceDocument[i]?.sales_order_number
            {value:SearchSourceDocument[i]?.sales_order_number,id:SearchSourceDocument[i]?.id}
          );
  
        }
        else if(inputValue.Source_Document_Type?.id?.display_name === "Purchase return"){
         
          options1 = options1.concat(
            // SearchSourceDocument[i]?.purchase_return_number
            {value:SearchSourceDocument[i]?.purchase_return_number,id:SearchSourceDocument[i]?.id}
          );
  
        }
        else if(inputValue.Source_Document_Type?.id?.display_name === "Purchase order"){
         
          options1 = options1.concat(
            // SearchSourceDocument[i]?.purchase_order_number
            {value:SearchSourceDocument[i]?.purchase_order_number,id:SearchSourceDocument[i]?.id}
          );
  
        }
       else {
        options1 = options1.concat(
          // SearchSourceDocument[i].number
          {value:SearchSourceDocument[i]?.number,id:SearchSourceDocument[i]?.id}
          );
      }
    }
    const history = useNavigate();
    const handleButtonClick = (key) =>{
        console.log("key", key) 
        console.log(mainData,"mainData")
        console.log(selectedProductData,"selectedProductData")
        const source_array=[];
        source_array.push(mainData?.Select_Source_Document?.id)
  
        const payload = {
            grn_number: mainData?.GRN_Number ? mainData?.GRN_Number:"",
            auto_generate_grn_number:GRNDetailsFields[1]?.isChecked?true:false,
            source_document_type_id:mainData.Source_Document_Type?.id?.id,
            // source_document_type_ids:[1,2],
            select_source_document:mainData.Select_Source_Document,
            // source_document_ids:[2,4],
            // source_document_ids:source_array,
            reference_number:mainData.Reference_ID?mainData.Reference_ID:"",
            auto_generate_reference_number:GRNDetailsFields[5]?.isChecked?true:false,
            create_scrap_order:mainData.create_scrap_order?true:false,
            // "source_document":{"id":1, "data":"PO-001"}
            source_document: mainData?.Select_Source_Document,
           
            
              warehouse_id:1,
              grn_order_lines:selectedProductData.map(o=>{return{
                // sku_id: {
                //   id: o.sku_id.id,
                //   label: o.sku_id.label,
                // },
                // "product_id": o?.id,
                "product_id": o?.id,
                "product_template_id": o.product_template_id,
                "shelf_location": o.Shelf_Location,
                "ordered_units":Number(o.Ordered_Units),
                "uom_id": o.uom?.id,
                // "uom_id": o.uom?.label,
                "received_units":Number(o.received_units),
                // "lot_number": parseInt(o.lot_number),
                "lot_number": o.Lot_Number,
                "pending_units": Number(o.Pending_Units),
                "quality_check":true,
                "rejected_quantities": Number(o.Rejected_Quantities),
                "reason_of_rejection": o.Reasons_of_Rejection,
                // "product":{
                //   "inventory_details": Number(o.description.data) ,
                // }
                
              }}),
            
            // grn_order_lines: gt,
      
          };
      
          console.log("payload1", payload);
          console.log(mainData,"mainData1")
      
          dispatch(createGrn(payload));
          
   
            history(`/grn`)
        
          
          
    
      };

      // ASNViewData
      useEffect(()=>{  
        if ( ASNViewdata) {
          console.log("ASNViewdata",ASNViewdata,mainData);
          //mapping data to 1st container on create function
          var newGRNDetailsFields = GRNDetailsFields?.map((o) => {
            if (o.key == "Reference_ID") o.value = ASNViewdata?.reference_number;
    
            return o;
          });
          setGRNDetailsFields(newGRNDetailsFields);
    
          // mapping second container
          var newselectedProductData = [];
          if (ASNViewdata?.asn_order_lines)
            newselectedProductData = ASNViewdata.asn_order_lines?.map((o) => {
              return {
                sku_id: {
                  id: o.product_variant?.id,
                  label: o.product_variant?.sku_id,
                },
                // product_id: o?.product_id,
                product_id:  o?.product_id,
                id:  o?.product_id,
                product_name: o.product.product_name,
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
          var keyValuePairMainData = {"GRN_Number":mainData?.GRN_Number};
          newMainData?.map((o) => {
            if (o.key != null && o.value) {
              keyValuePairMainData[o.key] = o.value;
            }
          });
          console.log("paireddata", keyValuePairMainData);
          setMainData(keyValuePairMainData);
        }
       },[ASNViewdata])
   

        //purchaseOrdersViewdata
      useEffect(()=>{  
        if ( purchaseOrdersViewdata) {
          console.log("purchaseOrdersViewdata",purchaseOrdersViewdata,mainData);
          //mapping data to 1st container on create function
          var newGRNDetailsFields = GRNDetailsFields?.map((o) => {
            if (o.key == "Reference_ID") o.value = purchaseOrdersViewdata?.reference_number;
            return o;
          });
          setGRNDetailsFields([...newGRNDetailsFields]);
          console.log("changed",mainData);
          // mapping second container
          console.log("purchaseOrdersViewdata.purchase_order_lines",purchaseOrdersViewdata.purchase_order_lines)
          var newselectedProductData = [];
          if (purchaseOrdersViewdata?.purchase_order_lines)
            newselectedProductData = purchaseOrdersViewdata.purchase_order_lines?.map((o) => {
              return {
                // sku_id: { id: o.product_details?.sku_id, label: o.product_details?.sku_code },
                sku_id: {
                  id: o.product_variant?.id,
                  label: o.product_variant?.sku_id,
                },
                product_name: o.product_details.product_name,
                description:{data:o.inventory_id} ,
                // Lot_Number: o.lot_number,
                // uom: { name: { id: o.uom_id, label: o.uom.name } },
                // Ordered_Units: Number(o.ordered_units),
                // received_units: Number(o.received_units),
                // Pending_Units: Number(o.pending_units),
                // quality_check: o.quality_check,
                // Shelf_Location: o.shelf_location,
                // Rejected_Quantities: o.rejected_quantities,
                // Reasons_of_Rejection: o.reason_of_rejection,
                product_id: o?.product_id,
                id: o?.product_id,
                product_template_id: o.product_template_id,
              };
            });
          setSelectedProductData(newselectedProductData);
          console.log(selectedProductData,mainData, "--keycheck");
    
          // 3rd container
    
          var newMainData = [];
    
          //creating new payload
    
          newMainData = [...newGRNDetailsFields, ...newselectedProductData];
          console.log("maindata2", newMainData);
          var keyValuePairMainData = {"GRN_Number":mainData?.GRN_Number};
          newMainData?.map((o) => {
            if (o.key != null && o.value) {
              keyValuePairMainData[o.key] = o.value;
            }
          });
          console.log("paireddata", keyValuePairMainData);
          setMainData(keyValuePairMainData);
        }
       },[purchaseOrdersViewdata])
   console.log('options1111',SearchSourceDocument)
    return ( 
        <>
        {/* //Enter GRN Details */}       
       <AddForm header={"GRN Details"} data={GRNDetailsFields.map(field=> {
        switch (field.key) {
          case 'Source_Document_Type':{
            field.data= SourceDocument.map(curElem => {return {id: curElem, label:curElem.display_name}}); break;} 
            case 'Select_Source_Document':{
              console.log('74865', mainData.Source_Document_Type)
              field.data= 
              ((mainData && mainData.Source_Document_Type && mainData.Source_Document_Type.id?.lookup_code == "PURCHASE_ORDERS") ?
             
              SearchSourceDocument.map(o=>  {  return {id: o.id, label:o.purchase_order_number, data: o}})
              : 
              (mainData && mainData.Source_Document_Type && mainData.Source_Document_Type.id?.lookup_code == "ASN") ?
              SearchSourceDocument.map(o=> { return {id: o.id, label:o.asn_number, data: o}})
              : null)}
        // case 'Select_Source_Document':{
        //         field.data= SearchSourceDocument.map(curElem => {
        //         //   console.log("currentEle",curElem)
        //           return {
        //             id: curElem.id, label:curElem.value
        //           }});
        //            break;
        //           }         
          }
        return field;
       })} 
       handelInputChange={handelInputChange} handelSelectonChange ={handelSelectonChange} handelCheckBoxonChange ={handelCheckBoxonChange} setRadioType={setRadioType}   />

         {/* //Product Details */}      
        
         <AddForm_Table headCells={headCells} table_data={selectedProductData} handelInputChange={handelInputChange} header={"Add Products"} renderFooter={()=>(<center style={{marginTop:10}}><Link onClick={onAddNewRaw} underline="none">+ Add Product Line</Link></center>)}/>

         <div className="asnDetails">
            <div className="asnDetails_form">
              <div className="asnDetails_form_left">
                <br />
                <div className="createshipping">
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Create Scrap Order"
                      onChange={(e) =>
                        handelInputChange(
                          "create_scrap_order",
                          e.target.checked
                        )
                      }
                    />
                  </FormGroup>
              
                </div>
                <p>
                  If selected, a prefilled scrap order form will be opened once
                  GRN is created.
                </p>
              </div>
            </div>
          </div>
   
         <AddFormFooter_Button handleButtonClick={handleButtonClick}/>
        </>
    );

}

export default CreateGRN;


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