import React, { useEffect } from "react";
import "./VariantDetailsCard.css";
// import LabeledText from "../../../../shared/OtherCommon/CommonLabel/LabeledText";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { editProductVariant } from "../../../../redux/Action/PostEditApi";

//mui
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
// import MatSelect from "../../../../shared/widgets/MatSelect";

import { lazy, Suspense } from "react";
const RemoteSelect = React.lazy(() => import("Remote/MatDropDown"));
import ErrorBoundary from "../ErrorBoundary";
import { Save_Sales_Order_Data } from "../../redux/action";


const RemoteWrapper = ({ children }) => (
  <div>
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);


const InvoiceForm = ({ fields, edit }) => {

  console.log("VariantDetailsCard", fields)
  //redux

  const { invoice_details } = useSelector((state) => state.data);
  const { file_preference } = useSelector((state) => state.data);
  const { fileCodes } = useSelector((state) => state.data);


  console.log("invoice_details", file_preference, fileCodes)



  const [variantTypeList, setVariantTypeList] = useState([]);
  const [fileData, setFileData] = useState([]);


  // useEffect(() => {
  //   file_preference?.map(o => {
  //     for (let i of fileCodes) {
  //       if (o.name == i['lookup_code']) {
  //         o.id = i.id
  //       }
  //     }
  //   })
  //   console.log("file_preference",file_preference)
  // }, [fileCodes, file_preference]);



  //local variables
  const [query, setQuery] = useState(false);
  const [variant, setVariant] = useState(fields ? fields : []);
  const [finalVariant, setFinalVariant] = useState({});
  const dispatch = useDispatch();
  const [saveEnable, setSaveEnable] = useState(false);

  //local function



  // const sendData = () => {
  //   if (finalVariant?.detailed_type === undefined) {
  //     delete finalVariant.detailed_type;
  //   }
  //   if (fields["id"]) {
  //     dispatch(editProductVariant(finalVariant, fields["id"]));
  //   }
  // };


  const sendData = () => {
    const payload = {
      invoice_generation_id:variant?.invoice_generation?.id
    }
    dispatch(Save_Sales_Order_Data(payload));
  };






  useEffect(() => {
    setVariant(fields ? fields : []);
    if (edit === false) {
      setQuery(true);
    }
  }, [fields]);

  useEffect(() => {
    console.log("re")
    if (invoice_details) {
      const temp = invoice_details.map((item) => {
        return {
          value: item.id,
          label: item.display_name,
        };
      });
      setVariantTypeList(temp);
    }
  }, [invoice_details]);

  useEffect(() => {
    console.log("re")
    if (file_preference) {
      const temp = file_preference.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setFileData(temp);
    }
  }, [file_preference]);

  const onSelelectionChange = (prop, value) => {
    console.log("onSelelectionChange", prop, value)
    const temp = { ...variant };
    console.log("temp", temp)
    if (prop === "invoice_generation_id") {
      temp.invoice_generation.display_name = value.label;
      temp.invoice_generation.id = value.value;
    }

    setVariant(temp);
    setFinalVariant({ ...finalVariant, [prop]: value.value });
    setSaveEnable(true);
  };




  //render function
  return (
    <Box className="companyDetailsOrder">
      {variant && (
        <>
          <Box className="companyDetailsOrderHeader">
            <p className="companyDetailsOrder_header">
              Preferences
            </p>
            <Box>
              
          
                 

                  <Button
                    disabled={!saveEnable}
                    variant="contained"
                    style={{ textTransform: "none", marginLeft: "10px" }}
                    onClick={() => {
                      if (saveEnable === true) {
                        setQuery((prev) => !prev);
                        sendData(variant);
                      }
                    }}
                  >
                    Save Details
                  </Button>
                
             
            </Box>
          </Box>
          <Box className="companyDetailsOrder_card">
            <Box className="variantDetailsCard_card_left">
              <Suspense fallback={<div>Loading... </div>}>

                <RemoteWrapper>
                  <RemoteSelect
                    disabled={query}
                    label={"Confirm Invoice on"}
                    data={variantTypeList}
                    placeholder={`Select`}
                    value={
                      variant.invoice_generation
                        ? variant.invoice_generation.display_name
                        : ""
                    }
                    onChange={(e, value) =>
                      onSelelectionChange("invoice_generation_id", value)
                    }
                    fieldKey={"detailed_type"}
                    edit={true}
                  />
                </RemoteWrapper></Suspense>




            </Box>
            <Box className="variantDetailsCard_card_right">


            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default InvoiceForm;



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