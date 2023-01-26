import React, { useState } from "react";
import { useEffect } from "react";
import "./ShippingDetailsTable.css";
import { useDispatch, useSelector } from "react-redux";
import { getShippingPartnerView } from "../../../../../../redux/Action/FetchVPDetails";
//mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function ShippingDetailsTable({ data, dataHeader, step3Data, setStep3Data }) {
  const [viewArrCount, setViewArrCount] = useState(0);
  const [shippingPartnerList, setShippingPartnerList] = useState([
    {
      name: "",
      pack_lead_time: 0,
      location_covered: "",
    },
  ]);
  const shippingPartnerView = useSelector(
    (state) => state.fetchVPDetails.shippingPartnerView.ShippingPartnerView
  );
  const [shippingPartnerViewArr, setShippingPartnerViewArr] = useState([]);

  useEffect(() => {
    if (shippingPartnerView.length > 0) {
      const tempArr = [...shippingPartnerViewArr];
      tempArr[viewArrCount] = shippingPartnerView[0];
      setShippingPartnerViewArr(tempArr);
    }
  }, [shippingPartnerView]);

  const addShippingPartner = () => {
    setShippingPartnerList([
      ...shippingPartnerList,
      {
        name: "",
        pack_lead_time: 0,
        location_covered: "",
      },
    ]);
  };
  useEffect(() => {
    const tempStep3Data = { ...step3Data };
    tempStep3Data.shipping_partner_ids = shippingPartnerList;
    setStep3Data(tempStep3Data);
  }, [shippingPartnerList]);

  const heading = dataHeader;

  return (
    <>
      <div className="pTTableMain shippingDetailTable">
        <Table>
          <TableHead>
            <TableRow>
              {heading.map((curElem, i) => {
                return <TableCell key={i}>{curElem}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {shippingPartnerList &&
              shippingPartnerList.length > 0 &&
              shippingPartnerList.map((elem, index) => (
                <ShippingPartnerRow
                  setShippingPartnerList={setShippingPartnerList}
                  shippingPartnerList={shippingPartnerList}
                  tempCount={index}
                  elem={elem}
                  shippingPartners={data}
                  shippingPartnerViewArr={shippingPartnerViewArr}
                  setShippingPartnerViewArr={setShippingPartnerViewArr}
                  setViewArrCount={setViewArrCount}
                />
              ))}
            <Button
              variant="contained"
              onClick={addShippingPartner}
              style={{ textTransform: "none", margin: "10px" }}
            >
              <AddIcon />
              <span>Add Another Shipping Partner</span>
            </Button>
          </TableBody>
        </Table>
      </div>
    </>
  );
}

const ShippingPartnerRow = ({
  tempCount,
  elem,
  shippingPartnerList,
  setShippingPartnerList,
  shippingPartners,
  shippingPartnerViewArr,
  setShippingPartnerViewArr,
  setViewArrCount,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tempShippingPartnerList = [...shippingPartnerList];
    tempShippingPartnerList[tempCount].pack_lead_time = shippingPartnerViewArr[
      tempCount
    ]
      ? typeof shippingPartnerViewArr[tempCount].pack_lead_time === "number"
        ? Number(shippingPartnerViewArr[tempCount].pack_lead_time)
        : null
      : [];

    tempShippingPartnerList[tempCount].location_covered =
      shippingPartnerViewArr[tempCount]
        ? shippingPartnerViewArr[tempCount].location_covered
          ? shippingPartnerViewArr[tempCount].location_covered
          : ""
        : [];
    setShippingPartnerList(tempShippingPartnerList);
  }, [shippingPartnerViewArr]);

  const deleteShippingPartner = (index) => {
    let tempArray = [...shippingPartnerList];
    let b = tempArray.splice(tempCount, 1);
    setShippingPartnerList(tempArray);

    let tempViewArray = [...shippingPartnerViewArr];
    let c = tempViewArray.splice(tempCount, 1);
    setShippingPartnerViewArr(tempViewArray);
  };

  const shippingArrOfObj = shippingPartners.map((elem) => {
    return {
      id: elem[0],
      value: elem[1],
    };
  });

  return (
    <>
      <TableRow key={tempCount}>
        <TableCell>
          <Select
            label="Package Material"
            displayEmpty
            value={shippingPartnerList[tempCount]["name"]}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <>Select Shipping Partner</>;
              }
              return shippingArrOfObj.find((elem) => elem.id === selected)
                .value;
            }}
            onChange={(event) => {
              const tempShippingPartnerList = [...shippingPartnerList];
              tempShippingPartnerList[tempCount].name = Number(
                event.target.value
              );
              setViewArrCount(tempCount);

              setShippingPartnerList(tempShippingPartnerList);
              dispatch(getShippingPartnerView(Number(event.target.value)));
            }}
            inputProps={{ "aria-label": "Without label" }}
            style={{ width: "65%" }}
            size="small"
          >
            <MenuItem disabled value="">
              <>Select Shipping Partner</>
            </MenuItem>
            {shippingPartners.map((option) => (
              <MenuItem key={option[0]} value={option[0]}>
                {option[1]}
              </MenuItem>
            ))}
          </Select>
        </TableCell>
        <TableCell>
          <p>
            {shippingPartnerViewArr[tempCount]
              ? typeof shippingPartnerViewArr[tempCount].pack_lead_time ===
                "number"
                ? Number(shippingPartnerViewArr[tempCount].pack_lead_time)
                : "---"
              : []}
          </p>
        </TableCell>
        <TableCell>
          <p>
            {shippingPartnerViewArr[tempCount]
              ? shippingPartnerViewArr[tempCount].location_covered
                ? shippingPartnerViewArr[tempCount].location_covered
                : "---"
              : []}
          </p>
        </TableCell>
        <TableCell>
          <DeleteOutlinedIcon
            onClick={() => deleteShippingPartner(tempCount)}
          />
        </TableCell>
      </TableRow>
    </>
  );
};

export default ShippingDetailsTable;

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