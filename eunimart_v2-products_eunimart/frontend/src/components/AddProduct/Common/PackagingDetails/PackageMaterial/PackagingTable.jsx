import React from "react";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import { Box, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Autocomplete from "@mui/material/Autocomplete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useEffect } from "react";

export default function PackagingTable({
  data,
  step3Data,
  setStep3Data,
  finalData,
  setFinalData,
  step1Data,
  edit,
}) {
  const selectoptions = data?.map((item) => {
    console.log("selectoptions",item)
    return {
      value: item?.id,
      label: item?.product_name?item?.product_name:"",
      uom: item.uom && item.uom.name,
    };
  });

  const [value, setValue] = React.useState(null);
  const [wh, setWH] = React.useState("");
  const handleChange = (event) => {
    setWH(event.target.value);
  };
  const theme = createTheme({
    components: {
      // Name of the component
      MuiTableCell: {
        styleOverrides: {
          // Name of the slot
          head: {
            // Some CSS
            // overflow: "unset",
            fontSize: " 14px",
            fontFamily: "Poppins",
            color: "#001661",
            padding: "8px",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            // fontFamily: "Poppins",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            width: "100%!important",
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            width: "100%!important",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: "Poppins",
          },
        },
      },
    },
  });

  const heading = ["Packaging Material 1", "MaterialQuantity", "UOM"]; //, "Action"
  const [packageList, setPackageList] = React.useState(
    edit
      ? step3Data?.package_material_options
        ? step3Data.package_material_options
        : [
            {
              id: null,
              name: "",
              material_quantity: null,
              uom_id: step1Data && step1Data.uom_id,
              uom_name: step1Data && step1Data.uom_name,
            },
          ]
      : [
          {
            id: null,
            name: "",
            material_quantity: null,
            uom_id: step1Data && step1Data.uom_id,
            uom_name: step1Data && step1Data.uom_name,
          },
        ]
  );
  const [viewArrCount, setViewArrCount] = React.useState(0);
  const [packageArr, setPackageArr] = React.useState([]);
  const addinventoryAdjustment = () => {
    setPackageList([
      ...packageList,
      {
        id: null,
        name: "",
        material_quantity: null,
        uom_id: step1Data && step1Data.uom_id,
        uom_name: step1Data && step1Data.uom_name,
      },
    ]);
  };

  const onInputChange = (value, index) => {
    const tempPackageArr = [...packageList];
    tempPackageArr[index].material_quantity = Number(value);
    setPackageList(tempPackageArr);

    setStep3Data({ ...step3Data, package_material_options: tempPackageArr });
    setFinalData({ ...finalData, package_material_options: tempPackageArr });
  };

  const onSelectionChange = (value, index) => {
    console.log("onSelectionChange",value, index)
    // const tempPackageArr = [...packageList];

    // tempPackageArr[index].id = value.value;
    // tempPackageArr[index].name = value.label;
    // tempPackageArr[index].uom = value.uom;

    // setPackageList(tempPackageArr);
    // setStep3Data({ ...step3Data, package_material_options: tempPackageArr });
    // setFinalData({ ...finalData, package_material_options: tempPackageArr });
  };

  useEffect(() => {
    if (edit) {
      setPackageList(
        step3Data?.package_material_options
          ? step3Data.package_material_options
          : []
      );
    }
  }, [step3Data]);

  useEffect(() => {}, [packageList]);
  //render function
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box>
          <Box>
            <Table>
              <TableHead style={{ color: "#001661!important" }}>
                <TableRow
                  style={{
                    color: "#001661!important",
                    height: "42px",
                  }}
                >
                  {heading.map((curElem, i) => {
                    return (
                      <TableCell key={i} sx={{ paddingLeft: "16px!important" }}>
                        {curElem}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {packageList &&
                  packageList.length > 0 &&
                  packageList.map((elem, index) => (
                    <PackageRow
                      setPackageList={setPackageList}
                      packageList={packageList}
                      tempCount={index}
                      elem={elem}
                      inventoryAdjustments={[
                        ["1", "2"],
                        ["3", "4"],
                      ]}
                      packageArr={packageArr}
                      setPackageArr={setPackageArr}
                      setViewArrCount={setViewArrCount}
                      packageData={selectoptions}
                      uom={step1Data && step1Data.uom_name}
                      onInputChange={onInputChange}
                      onSelectionChange={onSelectionChange}
                    />
                  ))}

                <Button
                  variant="contained"
                  onClick={addinventoryAdjustment}
                  style={{
                    textTransform: "none",
                    margin: "10px",
                    backgroundColor: "#416BFF",
                  }}
                >
                  <AddIcon />
                  <span>Add Packaging Material</span>
                </Button>
              </TableBody>
            </Table>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}
const PackageRow = ({
  tempCount,
  elem,
  packageList,
  setPackageList,
  inventoryAdjustments,
  packageArr,
  setPackageArr,
  setViewArrCount,
  packageData,
  uom,
  onInputChange,
  onSelectionChange,
}) => {
  //   const dispatch = useDispatch();

  // React.useEffect(() => {
  //   const tempinventoryAdjustmentList = [...packageList];
  //   tempinventoryAdjustmentList[tempCount].pack_lead_time = packageList[
  //     tempCount
  //   ]
  //     ? typeof packageList[tempCount].pack_lead_time === "number"
  //       ? Number(packageList[tempCount].pack_lead_time)
  //       : null
  //     : [];

  //   tempinventoryAdjustmentList[tempCount].location_covered = packageList[
  //     tempCount
  //   ]
  //     ? packageList[tempCount].location_covered
  //       ? packageList[tempCount].location_covered
  //       : ""
  //     : [];
  //   setPackageList(tempinventoryAdjustmentList);
  // }, [packageList]);

  const deleteinventoryAdjustment = (index) => {
    let tempArray = [...packageList];
    let b = tempArray.splice(tempCount, 1);
    setPackageList(tempArray);

    let tempViewArray = [...packageList];
    let c = tempViewArray.splice(tempCount, 1);
    setPackageArr(tempViewArray);
  };

  console.log("packageData",packageData)

  return (
    <>
      <TableRow
        key={tempCount}
        sx={{
          ":hover": {
            background: "unset",
          },
        }}
      >
        <TableCell>
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={packageData?packageData:[]}
            onChange={(e, value) => onSelectionChange(value, tempCount)}
            sx={{ width: "100%" }}
            value={elem.name}
            renderInput={(params) => (
              <TextField {...params} label="Search Packaging Material" />
            )}
          />
        </TableCell>
        <TableCell>
          <TextField
            size="small"
            placeholder="Material Quantity"
            variant="outlined"
            type={"number"}
            sx={{ width: "100%" }}
            value={elem.materail_quantity}
            onChange={(e) => onInputChange(e.target.value, tempCount)}
          />
        </TableCell>
        <TableCell>
          {/* <TextField
            id="outlined-basic"
            label="Enter Vendor SKU ID"
            variant="outlined"
          /> */}
          <Typography>{elem.uom_name ? elem.uom_name : "--"}</Typography>
        </TableCell>

        {/* <TableCell>
          <DeleteOutlinedIcon
            onClick={() => deleteinventoryAdjustment(tempCount)}
          />
        </TableCell> */}
      </TableRow>
    </>
  );
};


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