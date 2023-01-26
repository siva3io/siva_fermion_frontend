import React, { useState, useEffect } from "react";
import DefaultImage from "../DefaultImage/DefaultImage";
import "./CVTable.css";
import Modal from "../DefaultImage/Modal/Modal";
//MUI

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { width } from "@mui/system";

function CVTable({
  heading,
  variantTableData,
  setLocalVariantTableData,
  step2Data,
  setStep2Data,
  finalData,
  setFinalData,
  prePopVariantTable,
  setPrePopVariantTable,
  prepopImageArr,
}) {

  console.log("variantTableDatavariantTableData",variantTableData,finalData)
  //local variables
  const [imgCount, setImgCount] = useState(0);
  const [show, setShow] = useState(false);
  const [imageArray, setImageArray] = useState([]);
  const [variantList, setVariantList] = useState([]);
  useEffect(() => {
    if (
      prePopVariantTable.length > 0 &&
      (variantList === undefined || variantList.length === 0)
    ) {
      setImageArray(prepopImageArr);

      setVariantList(prePopVariantTable);
    }
  }, [prePopVariantTable]);
  useEffect(() => {
    setVariantList([
      {
        image_options: [],
        sku_id: "",
        attribute_key_values_id: [],
        product_pricing_details: {
          mrp: null,
        },
        // stock: "",
      },
    ]);
  }, []);
  // useEffect functions
  useEffect(() => {
    const tempVariantList = variantList;
    if (tempVariantList?.length > 0) {
      for (let itr = 0; itr < tempVariantList.length; itr++) {
        tempVariantList[itr].image_options = imageArray[itr]
          ? imageArray[itr].map((img) => {
            return { data: img };
          })
          : [];
      }

      setVariantList([...tempVariantList]);
    }

    // if (tempVariantList) {
    //   setVariantList(tempVariantList);
    // }
  }, [imageArray]);

  useEffect(() => {
    if (variantList || variantList === undefined) {

      console.log("variantTableData", variantTableData)
      const tempImageArrGenerator = variantTableData?.map((ele, index) =>
        variantTableData[index].image_options
          ? variantTableData[index].image_options
          : []
      );

      setImageArray(tempImageArrGenerator);
      const tempGeneratorArr = variantTableData?.map((elem, index) => {
        return {
          image_options:
            imageArray && imageArray[index]?.length > 0
              ? imageArray[index]
              : [],
          sku_id: "",
          attribute_key_values_id: elem.combination,
          product_pricing_details: {
            mrp: null,
          },
          // stock: "",
        };
      });
      setVariantList(tempGeneratorArr);
    }
  }, [variantTableData]);

  useEffect(() => {
    if (variantList) {
      console.log("variantList", variantList)
      let local = variantList.map((item) => {
        return { ...item };
      });
      for (let index = 0; index < local.length; index++) {
        local[index].attribute_key_values_id = local[
          index
        ].attribute_key_values_id?.map((propItem) => {
          return propItem.id;
        });
        // local[index].status_id = 1;
      }

      setStep2Data({ ...step2Data, product_variant_ids: local });
      setFinalData({ ...finalData, product_variant_ids: local });
    }
    // setPrePopVariantTable([]);
  }, [variantList]);

  // //local functions
  const handleClose = () => {
    let tempImageArray = [...imageArray];
    let tempVariantList = [...variantList];
    tempVariantList[imgCount].image_options = [];
    tempImageArray[imgCount] = [];
    setImageArray(tempImageArray);
    setVariantList(tempVariantList);
    setShow(false);
  };

  const handleSave = () => {
    setShow(false);
  };

  const deleteVariant = (index) => {
    let tempArray = [...variantList];
    let tempVariantTableData = [...variantTableData];
    let b = tempArray.splice(index, 1);
    let c = tempVariantTableData.splice(index, 1);
    setVariantList(tempArray);
    setLocalVariantTableData(tempVariantTableData);
  };

  //render functions
  return (
    <>
      <div className="pTTableMain">
        <Table>
          <TableHead>
            <TableRow>
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
            {variantList &&
              variantList.length > 0 &&
              variantList.map((elem, index) => (
                <VariantRow
                  variantList={variantList}
                  setVariantList={setVariantList}
                  tempCount={index}
                  elem={elem}
                  show={show}
                  setShow={setShow}
                  setImgCount={setImgCount}
                  deleteVariant={deleteVariant}
                />
              ))}
          </TableBody>
        </Table>
      </div>

      {show && (
        <Modal show={show} onClose={handleClose}>
          <div className="modalHeaderBlock1">
            <div className="modalHeaderBtnDiv">
              <div>
                <label>Add Images</label>
              </div>
              <div>
                <ClearOutlinedIcon onClick={() => handleClose()} />
              </div>
            </div>
          </div>
          <DefaultImage
            imageArray={imageArray ? imageArray : []}
            setImageArray={setImageArray}
            ind={imgCount}
          />
          <div className="modalFooterBlock">
            <Button
              variant="outlined"
              onClick={handleClose}
              style={{ margin: "0px 5px" }}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Confirm
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}

const VariantRow = ({
  variantList,
  setVariantList,
  tempCount,
  elem,
  show,
  setShow,
  localStorageImageArray,
  setImgCount,
  deleteVariant,
}) => {
  // useEffect(() => {}, [variantList]);
  const randomColors = () => {
    const randomColor =
      "rgb(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ")";
    return randomColor;
  };
  // useEffect(() => {
  //   randomColors();
  // }, [elem["product_template_attribute_value_ids"]]);

  // .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root
  const theme = createTheme({
    components: {
      // Name of the component
      MuiTextField: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            width: "100%",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            width: "200px",
          },
        },
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        {variantList && (
          <TableRow key={tempCount} sx={{ height: "42px" }}>
            <TableCell>
              <TextField
                size="small"
                type={"text"}
                placeholder={"Enter SKU ID"}
                name={"variantSKU"}
                onChange={(event) => {
                  if (variantList) {
                    const tempVariantList = [...variantList];
                    tempVariantList[tempCount].sku_id = event.target.value;
                    setVariantList(tempVariantList);
                  }
                }}
                value={
                  variantList &&
                  variantList[tempCount] &&
                  variantList[tempCount]["sku_id"]
                }
              />
            </TableCell>
            <TableCell style={{ width: "100px" }}>
              {/* {elem["product_template_attribute_value_ids"].map((varElems) => {
              return (
                <Box
                  className="varient_properties"
                  style={
                    elem["product_template_attribute_value_ids"]
                      ? { background: randomColors() }
                      : null
                  }
                >
                  {varElems}
                </Box>
              );
            })} */}
              {elem &&
                elem.attribute_key_values_id &&
                elem.attribute_key_values_id.map((varElems) => {
                  return (
                    <Box
                      className="varient_properties"
                      style={{ background: randomColors() }}
                    >
                      {varElems.name
                        ? varElems.name
                        : varElems.attribute_value
                          ? varElems.attribute_value
                          : null}
                    </Box>
                  );
                })}
            </TableCell>
            <TableCell>
              <TextField
                size="small"
                type={"number"}
                placeholder={"Enter Sale Price"}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
                name={"mrp"}
                value={
                  variantList[tempCount] &&
                    variantList[tempCount]["product_pricing_details"] &&
                    variantList[tempCount]["product_pricing_details"].mrp
                    ? variantList[tempCount]["product_pricing_details"].mrp
                    : ""
                  // ""
                }
                onChange={(event) => {
                  if (variantList) {
                    const tempVariantList = [...variantList];
                    variantList[tempCount]["product_pricing_details"].mrp =
                      Number(event.target.value);
                    setVariantList(tempVariantList);
                  }
                }}
              />
            </TableCell>
            {/* <TableCell>
              <TextField
                size="small"
                type={"number"}
                placeholder={"Enter MRP"}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
                name={"mrp"}
                value={
                  variantList[tempCount] && variantList[tempCount]["stock"]
                  // ""
                }
                onChange={(event) => {
                  const tempVariantList = [...variantList];
                  tempVariantList[tempCount].stock = Number(event.target.value);
                  setVariantList(tempVariantList);
                }}
              />
            </TableCell> */}
            {/* <TableCell></TableCell> */}
            <TableCell>
              {variantList[tempCount] &&
                variantList[tempCount].image_options &&
                variantList[tempCount].image_options.map((singleImg) => {
                  return (
                    <img
                      src={"data:image/png;base64," + singleImg.data}
                      alt="variantImg"
                      width={"40px"}
                      height={"40px"}
                      style={{
                        boxShadow: "1px 2px 4px #ccc",
                        marginRight: "5px",
                        borderRadius: "10px",
                      }}
                    />
                  );
                })}

              {variantList[tempCount] &&
                variantList[tempCount].image_options &&
                variantList[tempCount].image_options.length > 0 ? (
                <CreateOutlinedIcon
                  onClick={() => {
                    setShow(true);
                    setImgCount(tempCount);
                  }}
                />
              ) : (
                <AddIcon
                  onClick={() => {
                    setShow(true);
                    setImgCount(tempCount);
                  }}
                />
              )}
            </TableCell>

            <TableCell>
              <DeleteOutlinedIcon onClick={() => deleteVariant(tempCount)} />
            </TableCell>
          </TableRow>
        )}
      </ThemeProvider>
    </>
  );
};

export default CVTable;

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