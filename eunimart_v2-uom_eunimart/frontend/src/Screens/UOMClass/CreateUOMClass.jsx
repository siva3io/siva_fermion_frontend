import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// redux
import { useDispatch } from "react-redux";
import { postCreateUOMClass } from "../../redux/Action/FetchProductDetailsAction";
import { postUpdateUOMClass } from "../../redux/Action/EditUomAction";
import { useSelector } from "react-redux";
//mui
import { Box, Button } from "@mui/material";
import UOMClassDetails from "../../Components/UOMCreate/UOMClassDetails";

function CreateUOMClass({ edit }) {
  const location = useLocation();
  const { id } = location.state ? location.state : { id: null };

  const history = useNavigate();
  const dispatch = useDispatch();
  const editUOMClassApiData = useSelector(
    (state) => state.fetchSingleUOM.uomClassData.UOMClassData
  );
  const [editUOMClassData, setEditUOMData] = useState(
    editUOMClassApiData ? editUOMClassApiData.data : {}
  );

  useEffect(() => {
    setEditUOMData(editUOMClassApiData ? editUOMClassApiData.data : {});
  }, [editUOMClassApiData]);

  //step1
  const [step1Data, setStep1Data] = useState({
    code: edit && editUOMClassData ? editUOMClassData.code : "",
    name: edit && editUOMClassData ? editUOMClassData.name : "",
    description: edit && editUOMClassData ? editUOMClassData.description : "",
    base_uom: edit && editUOMClassData ? editUOMClassData.base_uom : "",
  });

  const handleCancel = () => {
    history(-1);
  };
  const handleSubmit = () => {
    if (edit) {
      if (id) {
        dispatch(postUpdateUOMClass(step1Data, id));
      } else {
        const tempid = location.pathname.split("/")[3];
        dispatch(postUpdateUOMClass(step1Data, tempid));
      }
    } else {
      dispatch(postCreateUOMClass(step1Data));
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
      <UOMClassDetails step1Data={step1Data} setStep1Data={setStep1Data} />
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

export default CreateUOMClass;


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