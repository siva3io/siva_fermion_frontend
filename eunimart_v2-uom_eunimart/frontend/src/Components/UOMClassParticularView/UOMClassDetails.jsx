import React, { useState, useEffect } from "react";
import LabeledText from "../../Shared/widgets/CommonLabel/LabeledText";
//mui
import { Box, Typography } from "@mui/material";

function UOMClassDetails({ uomClassData, edit }) {
  //local variables
  const [variant, setVariant] = useState(
    uomClassData ? [uomClassData.data] : []
  );
  // const [prevVariant, setPrevVariant] = useState({
  //   sales_price: "890",
  //   cost_price: "450",
  //   mrp: "800",
  //   taxes: "90",
  //   base_currency: "Rupees",
  //   tax_in: "No",
  //   shipping_in: "No",
  // });
  const [finalVariant, setFinalVariant] = useState([]);
  const [saveEnable, setSaveEnable] = useState(false);
  const [query, setQuery] = useState(true);
  const [selectValue, setSelectValue] = useState();
  const [selectedText, setSelectedText] = useState();
  const [fieldKey, setFieldKey] = useState();

  //local functions
  const onInputChange = (prop, value) => {
    const tempValue = { ...variant, [prop]: value };
    setVariant(tempValue);
    const temp1Value = { ...finalVariant, [prop]: value };
    setFinalVariant(temp1Value);
    setSaveEnable(true);
  };

  // const sendData = () => {
  //   // if (fields["id"]) {
  //   //   dispatch(editProductVariant(finalVariant, fields["id"]));
  //   // }
  // };

  //useEffect functions

  useEffect(() => {
    setVariant(uomClassData ? [uomClassData.data] : []);

    if (edit === false) {
      setQuery(true);
    }
  }, [uomClassData]);

  //render functions
  return (
    <Box
      sx={{
        background: "#fff",
        p: 2,
        mt: 1,
        borderRadius: "8px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography fontFamily={"Poppins"} sx={{ fontWeight: "500" }}>
          Unit Of Measurement Class Details
        </Typography>
        {/* <Box>
          {query ? (
            <Button
              variant="contained"
              onClick={() => {
                setQuery((prev) => !prev);
                setSaveEnable(false);
              }}
              style={{ textTransform: "none" }}
            >
              Edit
            </Button>
          ) : (
            <Box>
              <Button
                variant="outlined"
                onClick={() => {
                  setQuery((prev) => !prev);
                  setVariant(prevVariant);
                }}
                style={{ textTransform: "none" }}
              >
                Cancel
              </Button>

              <Button
                disabled={!saveEnable}
                variant="contained"
                style={{ textTransform: "none", marginLeft: "10px" }}
                onClick={() => {
                  if (saveEnable === true) {
                    setQuery((prev) => !prev);
                    setPrevVariant(variant);
                    sendData(variant);
                  }
                }}
              >
                Save
              </Button>
            </Box>
          )}
        </Box> */}
      </Box>
      <Box>
        <Box
          sx={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "50% 48%",
          }}
        >
          <LabeledText
            card
            label={"Class Code"}
            text={variant[0] && variant[0].code}
            disabled_y={query}
            name="class_code"
            onInputChange={onInputChange}
          />
          <LabeledText
            card
            label={"UOM Class Name"}
            text={variant[0] && variant[0].name}
            disabled_y={query}
            name="uom_class_name"
            onInputChange={onInputChange}
          />
          <LabeledText
            card
            label={"Unit Description"}
            text={variant[0] && variant[0].description}
            disabled_y={query}
            name="unit_description"
            onInputChange={onInputChange}
          />
          <LabeledText
            card
            label={"Base UOM"}
            // text={variant[0] && variant[0].name}
            text={variant[0] && variant[0].base_uom}
            disabled_y={query}
            name="base_uom"
            onInputChange={onInputChange}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default UOMClassDetails;


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