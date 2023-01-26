import { loadIventoryViewData } from "../../redux/actions/FetchPicklistView";
import { useLocation } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";

//mui
import { createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import PicklistViewClass from "../../components/picklist/PicklistViewClass";

function PicklistView({}) {
  const location = useLocation();
  const { id } = location.state ? location.state : { id: null };

  const [value, setValue] = React.useState(
    location.pathname.split("/")[1] === "uom" ? "1" : "2"
  );

  //local variables
  const [picklistViewData, setpicklistViewData] = useState([]);

  //redux
  const dispatch = useDispatch();
  const picklistApiViewData = useSelector(state => state.picklistviewdata);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (id) {
      dispatch(loadIventoryViewData(id));
    } else {
      const tempid = location.pathname.split("/")[3];
      dispatch(loadIventoryViewData(tempid));
    }
  }, [location.state]);

  useEffect(() => {
    if (picklistApiViewData) {
      setpicklistViewData(picklistApiViewData ? picklistApiViewData : []);
    }
  }, [picklistApiViewData]);

  //styling
  const theme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          scroller: {
            background: "#fff",
          },
        },
      },
      MuiTabPanel: {
        styleOverrides: {
          root: {
            padding: "0px",
          },
        },
      },
    },
  });

  return (
    <>
      <Box className="bundleViewContent">
        {picklistViewData &&
        picklistViewData.picklistdata &&
        picklistViewData.picklistdata.id ? (
          <PicklistViewClass
            picklistViewData={
              picklistViewData ? picklistViewData : picklistApiViewData
            }
            id={id}
          />
        ) : null}
      </Box>
    </>
  );
}

export default PicklistView;

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
