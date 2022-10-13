import React, { useState } from "react";
import LabeledText from "../../../../shared/OtherCommon/CommonLabel/LabeledText";
//mui
import {
  Box,
  Typography,
  Button,
  Autocomplete,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function PackagingDetails() {
  //local variables

  const [pckMaterial, setPckMaterial] = useState([
    {
      pckMaterial: "",
      matQty: null,
    },
  ]);
  //local functions
  const handleAddPackagingMaterial = () => {
    setPckMaterial([
      ...pckMaterial,
      {
        pckMaterial: "",
        matQty: null,
      },
    ]);
  };

  const handleDeletePackagingMaterial = (index) => {
    const tempArr = [...pckMaterial];
    tempArr.splice(index, 1);

    setPckMaterial(tempArr);
  };

  const onInputChange = (prop, value, index_no) => {
    let tempArr = [...pckMaterial];
    tempArr[index_no].matQty = value;
    setPckMaterial(tempArr);
  };

  const onSelectChange = (value, index_no) => {
    let tempArr = [...pckMaterial];
    tempArr[index_no].pckMaterial = value;
    setPckMaterial(tempArr);
  };

  const sendData = () => {
    // if (fields["id"]) {
    //   dispatch(editProductVariant(finalVariant, fields["id"]));
    // }
  };

  //useEffect functions

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
        <Typography variant="h6" fontFamily={"Poppins"}>
          Packaging Details
        </Typography>

        <Box>
          <Button
            variant="contained"
            sx={{ textTransform: "none", fontFamily: "Poppins" }}
          >
            Save Edit
          </Button>
        </Box>
      </Box>
      <Box>
        {pckMaterial &&
          pckMaterial.map((pck, index) => {
            return (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  className="left"
                  sx={{ display: "flex", width: "50%", alignItems: "center" }}
                >
                  <Typography sx={{ width: "50%", color: "#00000" }}>
                    Select Packing Material
                  </Typography>
                  <Autocomplete
                    size="small"
                    disablePortal={false}
                    id="combo-box-demo"
                    options={[
                      { label: "synthetic" },
                      { label: "cotton" },
                      { label: "rexin" },
                      { label: "lenin" },
                    ]}
                    onChange={(event, value) => {
                      onSelectChange(value, index);
                    }}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField {...params} label={`Type Material Type`} />
                    )}
                  />
                </Box>
                <Box sx={{ width: "10%" }} />
                <Box className="right" sx={{ width: "50%" }}>
                  <LabeledText
                    card
                    label={"Material Quantity"}
                    text={pck.matQty}
                    disabled_y={false}
                    name={"matQty"}
                    onInputChange={onInputChange}
                    index_no={index}
                    type={"number"}
                  />
                </Box>
                <IconButton
                  aria-label="delete"
                  sx={{ p: 2 }}
                  onClick={() => handleDeletePackagingMaterial(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            );
          })}
        <Button
          variant="contained"
          onClick={handleAddPackagingMaterial}
          sx={{ textTransform: "none", fontFamily: "Poppins" }}
        >
          Add Packaging Material
        </Button>
      </Box>
    </Box>
  );
}

export default PackagingDetails;


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