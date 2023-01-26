import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalViewV2 from "../../../../../../shared/widgets/Modal/ModalViewV2";
import VendorListTable from "./VendorListTable";
import {
  getVendor,
  getVendorPriceList,
} from "../../../../../../redux/Action/FetchVPDetails";
//mui
import {
  styled,
  alpha,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import {
  Box,
  Link,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  InputBase,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import PriceListTable from "./PriceListTable";

// import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function VendorPriceListTable({
  data,
  step3Data,
  setStep3Data,
  step1Data,
  finalData,
  setFinalData,
}) {
  const dispatch = useDispatch();
  const pricelist = useSelector(
    (state) => state.fetchVPDetails.vendorPriceList.VendorPriceList
  );

  const [params, setParams] = useState({ limit: 10, offset: 1 });
  const [priceParams, setPriceParams] = useState({ limit: 10, offset: 1 });

  const [vendorListPopulateData, setVendorListPopulateData] = useState({
    vendorName: "",
    vendorSKU: "",
    minQty: "",
    vendorId: "",
  });
  const [pricelistPopulateData, setPricelistPopulateData] = useState([]);
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
            fontFamily: "Poppins",
            fontSize: " 14px",
            color: "#001661",
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
          // Name of the slot
          root: {
            // Some CSS
            width: "100%!important",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            fontFamily: "Poppins",
          },
        },
      },
    },
  });

  const heading = [
    "Vendor Name",
    "Product",
    "Vendor SKU ID",
    "Minimum Ordering Qty",
    "UOM",
    "Vendor Price List",
    // "Action",
  ];
  const [vendorList, setVendorList] = React.useState([
    // {
    //   vendor_name: "",
    //   product_name: "",
    //   default_code: "",
    //   min_qty: 0,
    //   shipping_type: "",
    // },
  ]);
  const [vendorArr, setVendorArr] = React.useState([]);
  const [addVendorModal, setAddVendorModal] = useState(false);
  const [addPriceListModal, setAddPriceListModal] = useState(false);

  const handleModalOpen = () => {
    setAddVendorModal(true);
  };

  const handleVendorTable = (pricelistData) => {
    setPricelistPopulateData(pricelistData); //prepopulating purpose
    const tempVendorListArrGenerator = pricelistData.map((elem, index) => {
      return {
        vendorName: vendorListPopulateData.vendorName,
        product_name: step1Data.product_name,
        vendorSku: vendorListPopulateData.vendorSKU,
        min_qty: elem && elem.min_qty ? elem.min_qty.quantity : 0,
        uom: elem.uom ? elem.uom.name : "--",
        pricelistId: elem ? elem.id : 0,
      };
    });
    setVendorList(tempVendorListArrGenerator);
  };
  const handleModalClose = () => {
    setAddVendorModal(false);
    setAddPriceListModal(false);
  };

  const handlePriceListModalClose = (value) => {
    if (value === false) {
      // setVendorList([]);
      setAddPriceListModal(false);
    } else {
      setAddPriceListModal(false);
    }
  };
  const addinventoryAdjustment = () => {
    setVendorListPopulateData({
      vendorName: "",
      vendorSKU: "",
      minQty: "",
      vendorId: "",
    });
    setAddVendorModal((prev) => !prev);
  };
  const handlePriceList = () => {
    setAddPriceListModal((prev) => !prev);
  };

  const handleVendorList = () => {
    if (vendorListPopulateData.vendorName !== "") {
      handleModalClose();
      handlePriceList();
    }
  };

  useEffect(() => dispatch(getVendor(params)), [params]);

  useEffect(() => {
    if (vendorListPopulateData && vendorListPopulateData.vendorId !== "") {
      dispatch(
        getVendorPriceList(vendorListPopulateData.vendorId, priceParams)
      );
    }
  }, [priceParams]);

  useEffect(() => {
    if (vendorListPopulateData && vendorListPopulateData.vendorId !== "") {
      setTimeout(() => {
        dispatch(
          getVendorPriceList(vendorListPopulateData.vendorId, priceParams)
        );
      }, 500);
    }
  }, [vendorListPopulateData]);

  useEffect(() => {}, [pricelist]);

  useEffect(() => {
    // setFinalData({...finalData, })
    let tempVendorListArrClone = vendorList.map((elem) => {
      return { ...elem };
    });
    let tempVendorListArrCloneWithout = vendorList.map((elem) => {
      return { ...elem };
    });
    tempVendorListArrClone = tempVendorListArrClone.map((elem) => {
      return { id: elem.pricelistId };
    });
    tempVendorListArrCloneWithout = tempVendorListArrCloneWithout.map(
      (elem) => {
        return { id: elem.pricelistId };
      }
    );
    setStep3Data({
      ...step3Data,
      price_list_details: tempVendorListArrCloneWithout,
    });
    console.log("tempVendorListArrCloneWithout",tempVendorListArrCloneWithout);
    console.log("tempVendorListArrClone",tempVendorListArrClone)

  //setFinalData({ ...finalData, price_list_details: tempVendorListArrClone });

     var vendor_list_array = [];
    for (var i = 0; i < tempVendorListArrClone.length; i++) {
      vendor_list_array.push(tempVendorListArrClone[i].id)
    }
    console.log("vendor_list_array",vendor_list_array)
    setFinalData({ ...finalData, vendor_price_list_ids: vendor_list_array });
 
  }, [vendorList]);

  //render function
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box>
          <Box
            sx={{ mt: "10px", border: "1px solid white", borderRadius: "8px" }}
          >
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
                {vendorList &&
                  vendorList.length > 0 &&
                  vendorList.map((elem, index) => (
                    <VendorPriceListRow
                      setVendorList={setVendorList}
                      vendorList={vendorList}
                      tempCount={index}
                      elem={elem}
                      inventoryAdjustments={[
                        ["1", "2"],
                        ["3", "4"],
                      ]}
                      vendorArr={vendorArr}
                      setVendorArr={setVendorArr}
                      vendorData={data}
                      handlePriceList={handlePriceList}
                      step1Data={step1Data}
                    />
                  ))}

                <Button
                  variant="text"
                  onClick={addinventoryAdjustment}
                  style={{
                    textTransform: "none",
                    margin: "0px",
                    color: "#416BFF",
                  }}
                >
                  <AddIcon />
                  <span>Add Vendor</span>
                </Button>
              </TableBody>
            </Table>
          </Box>
          {addVendorModal && (
            <ModalViewV2
              modalTitle={"Vendor List"}
              handleModalClose={handleModalClose}
              handleDeleteProduct={handleVendorList}
              modalOpen={addVendorModal}
              actionBtns={["Cancel", "Confirm"]}
              modalContentStyleHeight={"100%"}
              modalContentStyleWidth={"auto"}
              styleLeft={"calc(50% - 840px/2)"}
              styleHeight={"auto"}
              mainWidth={"auto"}
              modalContentStylePadding={"20px"}
            >
              <Box>
                <Box>
                  <VendorListTable
                    vendors={data}
                    setParams={setParams}
                    vendorListPopulateData={vendorListPopulateData}
                    setVendorListPopulateData={setVendorListPopulateData}
                  />
                </Box>
              </Box>
            </ModalViewV2>
          )}
          {addPriceListModal && (
            <ModalViewV2
              modalTitle={"Vendor List"}
              handleModalClose={() => handlePriceListModalClose(false)}
              handleDeleteProduct={() => handlePriceListModalClose(true)}
              modalOpen={addPriceListModal}
              actionBtns={["Cancel", "Confirm"]}
              modalContentStyleHeight={"auto"}
              modalContentStyleWidth={"100%"}
              styleLeft={"calc(50% - 800px/2)"}
              styleHeight={"auto"}
              modalContentStylePadding={"24px"}
              mainWidth={"770px"}
            >
              <Box>
                <PriceListTable
                  pricelist={pricelist}
                  setParams={setPriceParams}
                  vendorListPopulateData={vendorListPopulateData}
                  setVendorListPopulateData={setVendorListPopulateData}
                  handleVendorTable={handleVendorTable}
                  pricelistPopulateData={pricelistPopulateData}
                />
              </Box>
            </ModalViewV2>
          )}
        </Box>
      </ThemeProvider>
    </div>
  );
}
const VendorPriceListRow = ({
  tempCount,
  elem,
  vendorList,
  setVendorList,
  inventoryAdjustments,
  vendorArr,
  setVendorArr,
  vendorData,
  handlePriceList,
  step1Data,
}) => {
  //   const dispatch = useDispatch();

  // React.useEffect(() => {
  //   const tempinventoryAdjustmentList = [...vendorList];
  //   tempinventoryAdjustmentList[tempCount].pack_lead_time = vendorArr[tempCount]
  //     ? typeof vendorArr[tempCount].pack_lead_time === "number"
  //       ? Number(vendorArr[tempCount].pack_lead_time)
  //       : null
  //     : [];

  //   tempinventoryAdjustmentList[tempCount].location_covered = vendorArr[
  //     tempCount
  //   ]
  //     ? vendorArr[tempCount].location_covered
  //       ? vendorArr[tempCount].location_covered
  //       : ""
  //     : [];
  //   setVendorList(tempinventoryAdjustmentList);
  // }, [vendorArr]);

  const deleteinventoryAdjustment = (index) => {
    let tempArray = [...vendorList];
    let b = tempArray.splice(tempCount, 1);
    setVendorList(tempArray);

    let tempViewArray = [...vendorArr];
    let c = tempViewArray.splice(tempCount, 1);
    setVendorArr(tempViewArray);
  };

  // vendorName: vendorListPopulateData.vendorName,
  //       product_name: step1Data.product_name,
  //       vendorSku: vendorListPopulateData.vendorSKU,
  //       min_qty: elem && elem.min_qty ? elem.min_qty.value : 0,
  //       uom:

  return (
    <>
      <TableRow key={tempCount}>
        <TableCell>
          <Typography>{elem.vendorName ? elem.vendorName : "--"}</Typography>
        </TableCell>
        <TableCell>
          <Typography>
            {elem.product_name ? elem.product_name : "--"}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography>{elem.vendorSku ? elem.vendorSku : "--"}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{elem.min_qty ? elem.min_qty : "--"}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{elem.uom ? elem.uom : "--"}</Typography>
        </TableCell>
        <TableCell>
          <Link onClick={handlePriceList} underline="none">
            Price list
          </Link>
        </TableCell>
      </TableRow>
    </>
  );
};

export default VendorPriceListTable;

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