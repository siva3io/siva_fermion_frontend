import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getItemTypeDetails,
  getClassCodeDetails,
  getConversionTypeDetails,
  postCreateUOM,
} from "../redux/Action/FetchProductDetailsAction";

import { postUpdateUOM } from "../redux/Action/EditUomAction";
//mui
import { Box, Button } from "@mui/material";
import UOMDetails from "../Components/UOMCreate/UOMDetails";

function CreateUOM({ edit }) {
  const location = useLocation();
  const { id } = location.state ? location.state : { id: null };

  const history = useNavigate();
  const dispatch = useDispatch();
  const editUOMApiData = useSelector(
    (state) => state.fetchSingleUOM.uomData.UOMData
  );
  const [editUOMData, setEditUOMData] = useState(
    editUOMApiData ? editUOMApiData.data : {}
  );

  useEffect(() => {
    setEditUOMData(editUOMApiData ? editUOMApiData.data : {});
  }, [editUOMApiData]);

  useEffect(() => {
    dispatch(getItemTypeDetails());
    dispatch(getClassCodeDetails());
    dispatch(getConversionTypeDetails());
  }, []);

  //step1
  const [step1Data, setStep1Data] = useState({
    item_type_id:
      edit && editUOMData && editUOMData.item_type
        ? editUOMData.item_type.id
        : null,
    code: edit && editUOMData ? editUOMData.code : "",
    name: edit && editUOMData ? editUOMData.name : "",
    description: edit && editUOMData ? editUOMData.description : "",
    uom_class_id:
      edit && editUOMData && editUOMData.uom_class_id
        ? editUOMData.uom_class_id
        : null,
    uom_class_name: edit && editUOMData ? editUOMData.uom_class_name : "",
    base_uom: edit && editUOMData ? editUOMData.base_uom : "",
    conversion_type_id:
      edit && editUOMData && editUOMData.conversion_type
        ? editUOMData.conversion_type.id
        : null,
    conversion_factor:
      edit && editUOMData ? editUOMData.conversion_factor : null,
  });

  const handleCancel = () => {
    history(-1);
  };
  const handleSubmit = () => {
    if (edit) {
      if (id) {
        dispatch(postUpdateUOM(step1Data, id));
      } else {
        const tempid = location.pathname.split("/")[3];
        dispatch(postUpdateUOM(step1Data, tempid));
      }
    } else {
      dispatch(postCreateUOM(step1Data));
    }
    setTimeout(() => {
      history("/uom");
    }, 500);
  };

  useEffect(() => {}, [step1Data]);
  return (
    <Box
      sx={{
        p: 2,
        height: "100vh",
        background: "#F9F9F9",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <UOMDetails
        step1Data={step1Data}
        setStep1Data={setStep1Data}
        edit={edit}
      />
      <Box sx={{ p: 2, background: "#ffff", borderRadius: "8px" }}>
        <Box
          className="stepperActions"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            variant="outlined"
            sx={{ textTransform: "none" }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateUOM;


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