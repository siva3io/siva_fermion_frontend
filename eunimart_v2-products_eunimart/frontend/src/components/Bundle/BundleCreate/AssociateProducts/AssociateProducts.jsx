import React, { useState } from "react";
import AssociateTable from "./AssociateTable";
import ModalViewV2 from "../../../../shared/widgets/Modal/ModalViewV2";
import { useSelector } from "react-redux";
//mui
import { Box, Typography, InputBase, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import ProductVariantTable from "./ProductVariantTable";
import { useEffect } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
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
    border: "1px solid #c4c4c4",
    borderRadius: "4px",
    [theme.breakpoints.up("sm")]: {
      width: "38ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function AssociateProducts({
  edit,
  step1Data,
  setStep1Data,
  finalData,
  setFinalData,
}) {
  //redux
  const products = useSelector((state) => state.fetchProducts.products);
  //local variables
  const [addProductModal, setAddProductModal] = useState(false);

  const [assosiatedProducts, setAssociatedProducts] = useState([]);

  const [check, setCheck] = useState(false);
  const handleModalOpen = () => {
    setAddProductModal(true);
  };

  const handleModalClose = () => {
    setAddProductModal(false);
  };

  useEffect(() => {
    let tempAsso = [...assosiatedProducts];
    let product = tempAsso.map((item) => {
      return {
        product_variant_id: item.variant_id,
        quantity: item.quantity,
      };
    });
    setStep1Data({ ...step1Data, products: product });
    setFinalData({ ...finalData, products: product });
  }, [assosiatedProducts]);

  useEffect(() => {
    if (edit && step1Data?.products?.length > 0 && check === false) {
      let temp = [...step1Data.products];
      let asso = temp.map((item) => {
        return {
          product_title: item.product_variant.product_name,
          sku_id: item.product_variant.sku_id,
          parent_id: item.product_variant.parent_sku_id,
          quantity: item.quantity,
          variant_id: item.product_variant_id,
        };
      });
      setAssociatedProducts(asso);
      setCheck(true);
    }
  }, [step1Data]);

  //render functions
  return (
    <Box
      className="createCard"
      sx={{
        background: "#fff",
        margin: "8px 0px",
        borderRadius: "8px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box className="createCardTitle">
        <Typography variant="h6" sx={{ fontFamily: "Poppins" }}>
          Associated Products
        </Typography>
      </Box>
      <Box sx={{ display: "flex", mt: 1 }}>
        <Button variant="contained" onClick={handleModalOpen}>
          Add Product
        </Button>
      </Box>
      <Box className="createCardContent" sx={{ mt: 2 }}>
        <AssociateTable
          assosiatedProducts={assosiatedProducts}
          setAssociatedProducts={setAssociatedProducts}
        />
      </Box>
      {addProductModal && (
        <ModalViewV2
          modalTitle={"Products List"}
          handleDeleteProduct={handleModalClose}
          handleModalClose={handleModalClose}
          modalOpen={addProductModal}
          actionBtns={["Cancel", "Confirm"]}
          modalContentStyleHeight={"auto"}
          modalContentStyleWidth={"100%"}
          styleLeft={"calc(50% - 840px/2)"}
          styleHeight={"650px"}
          mainWidth={"auto"}
          modalContentStylePadding={"20px"}
        >
          <Box>
            <Box>
              <ProductVariantTable
                product_data={products}
                info={products.meta.info}
                assosiatedProducts={assosiatedProducts}
                setAssociatedProducts={setAssociatedProducts}
              />
            </Box>
          </Box>
        </ModalViewV2>
      )}
    </Box>
  );
}

export default AssociateProducts;


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