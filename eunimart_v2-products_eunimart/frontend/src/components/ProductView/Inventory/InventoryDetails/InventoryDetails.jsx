import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
//mui
import { Box, Button } from "@mui/material";

function InventoryDetails() {
  const [center, setCenter] = useState([17.385, 78.4867]);
  const [zoom, setZoom] = useState(11);

  return (
    <Box className="companyDetailsOrder">
      <Box className="companyDetailsOrderHeader">
        <p className="companyDetailsOrder_header">Inventory Details</p>
      </Box>
      <Box
        className="companyDetailsOrder_card"
        // sx={{ height: "100px", width: "90%" }}
      >
        <MapContainer center={center} zoom={zoom} attributionControl={false}>
          <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />

          <Marker position={center}>
            <Popup></Popup>
          </Marker>
        </MapContainer>
      </Box>
    </Box>
  );
}

export default InventoryDetails;

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