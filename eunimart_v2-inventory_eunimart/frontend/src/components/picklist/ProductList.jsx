import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function ProductList({ payload, setPayloadData, qty_ordered_enabled }) {
  const products = useSelector(state => state.picklistviewdata.picklist_lines);

  const heading = [
    "Product Name",
    "SKU ID",
    "Product Variant Name",
    "Sales Document ID",
    "Customer name",
    "Quantity Ordered",
    "Quantity to pick",
    "Quantity Picked",
    // "Quantity remaining",
  ];

  const [inventoryAdjustmentList, setinventoryAdjustmentList] = React.useState(
    payload && payload.picklist_lines && payload.picklist_lines
      ? payload.picklist_lines
      : [
          {
            product: {},
            partner_id: 1,
            product_id: "",
            product_variant_id: 1,
            quantity_ordered: "",
            quantity_picked: "",
            quantity_to_pick: "",
            remaining_quantity: "",
            sales_document_id: "",
          },
        ]
  );

  const [viewArrCount, setViewArrCount] = React.useState(0);
  const [inventoryAdjustmentViewArr, setinventoryAdjustmentViewArr] =
    React.useState([]);

  const deleteinventoryAdjustment = index => {
    let tempArray = [...inventoryAdjustmentList];
    let b = tempArray.splice(index, 1);
    setinventoryAdjustmentList(tempArray);

    let tempViewArray = [...inventoryAdjustmentViewArr];
    let c = tempViewArray.splice(index, 1);
    setinventoryAdjustmentViewArr(tempViewArray);
  };

  React.useEffect(() => {
    const tempStep3Data = { ...payload };
    tempStep3Data["picklist_lines"] = inventoryAdjustmentList;
    setPayloadData(tempStep3Data);
  }, [inventoryAdjustmentList]);

  const dispatch = useDispatch();

  const onInputChange = (prop, value, data, count) => {
    let temp_data = data;
    const tempinventoryAdjustmentList = [...inventoryAdjustmentList];
    if (prop === "product_name") {
      tempinventoryAdjustmentList[count]["product"] = temp_data
        ? temp_data
        : "";
      tempinventoryAdjustmentList[count]["product_id"] = temp_data
        ? temp_data["id"]
        : "";
    } else if (prop === "product_sku") {
      tempinventoryAdjustmentList[count]["product"] = temp_data
        ? temp_data
        : "";
      tempinventoryAdjustmentList[count]["product"] = temp_data
        ? temp_data
        : "";
    } else {
      tempinventoryAdjustmentList[count][prop] = value;
    }

    setinventoryAdjustmentList(tempinventoryAdjustmentList);
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
            fontWeight: "bold",
            color: "#001661",
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
          // Name of the slot
          root: {
            // Some CSS
            width: "200px!important",
          },
        },
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid spacing={"16px"} margin={0}>
          <Box>
            <Box paddingTop={"23px"}>
              <Table>
                <TableHead style={{ color: "#001661!important" }}>
                  <TableRow style={{ color: "#001661!important" }}>
                    {heading.map((curElem, i) => {
                      return <TableCell key={i}>{curElem}</TableCell>;
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inventoryAdjustmentList &&
                    inventoryAdjustmentList.length > 0 &&
                    inventoryAdjustmentList.map((elem, index) => (
                      <InventoryAdjustmentRow
                        products={products && products}
                        qty_ordered_enabled={qty_ordered_enabled}
                        setinventoryAdjustmentList={setinventoryAdjustmentList}
                        inventoryAdjustmentList={inventoryAdjustmentList}
                        tempCount={index}
                        elem={elem}
                        inventoryAdjustments={[
                          ["1", "2"],
                          ["3", "4"],
                        ]}
                        inventoryAdjustmentViewArr={inventoryAdjustmentViewArr}
                        setinventoryAdjustmentViewArr={
                          setinventoryAdjustmentViewArr
                        }
                        setViewArrCount={setViewArrCount}
                        deleteinventoryAdjustment={deleteinventoryAdjustment}
                        onInputChange={onInputChange}
                      />
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
const InventoryAdjustmentRow = ({
  tempCount,
  elem,
  products,
  inventoryAdjustmentList,
  setinventoryAdjustmentList,
  inventoryAdjustments,
  inventoryAdjustmentViewArr,
  setinventoryAdjustmentViewArr,
  deleteinventoryAdjustment,
  setViewArrCount,
  qty_ordered_enabled,
  onInputChange,
}) => {
  useEffect(() => {}, [inventoryAdjustmentList]);
  React.useEffect(() => {
    const tempinventoryAdjustmentList = [...inventoryAdjustmentList];

    setinventoryAdjustmentList(tempinventoryAdjustmentList);
  }, [inventoryAdjustmentViewArr]);

  const inventoryArrOfObj = inventoryAdjustments.map(elem => {
    return {
      id: elem[0],
      value: elem[1],
    };
  });

  return (
    <>
      <TableRow key={tempCount}>
        <TableCell>
          {inventoryAdjustmentList[tempCount].product &&
          inventoryAdjustmentList[tempCount].product.product_name
            ? inventoryAdjustmentList[tempCount].product.product_name
            : "--"}
        </TableCell>
        <TableCell>
          {inventoryAdjustmentList[tempCount].product &&
          inventoryAdjustmentList[tempCount].product.sku_code
            ? inventoryAdjustmentList[tempCount].product.sku_code
            : "--"}
        </TableCell>
        <TableCell>
          {inventoryAdjustmentList[tempCount].product &&
          inventoryAdjustmentList[tempCount].product.product_name
            ? inventoryAdjustmentList[tempCount].product.product_name
            : "--"}
        </TableCell>
        <TableCell>
          {inventoryAdjustmentList[tempCount]?.sales_document_id[0]?.id
            ? inventoryAdjustmentList[tempCount]?.sales_document_id[0]?.id
            : "--"}
        </TableCell>
        <TableCell>
          {inventoryAdjustmentList[tempCount].customer_name
            ? inventoryAdjustmentList[tempCount].customer_name
            : "--"}
        </TableCell>
        <TableCell>
          {inventoryAdjustmentList[tempCount].quantity_ordered
            ? inventoryAdjustmentList[tempCount].quantity_ordered
            : "--"}
        </TableCell>
        <TableCell>
          {inventoryAdjustmentList[tempCount].quantity_to_pick
            ? inventoryAdjustmentList[tempCount].quantity_to_pick
            : "--"}
        </TableCell>

        <TableCell>
          <TextField
            disabled={qty_ordered_enabled}
            value={inventoryAdjustmentList[tempCount].quantity_picked}
            onChange={e =>
              onInputChange(
                "quantity_picked",
                Number(e.target.value),
                null,
                tempCount
              )
            }
            id="outlined-basic"
            variant="outlined"
          />
        </TableCell>
        {/* <TableCell>
          {inventoryAdjustmentList[tempCount]?.remaining_quantity}
        </TableCell> */}
      </TableRow>
    </>
  );
};

export default ProductList;

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
