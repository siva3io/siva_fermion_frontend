import React, { Component } from 'react';
import "./warehouseMapView.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { SearchControl, OpenStreetMapProvider } from "react-leaflet-geosearch";

class LocationsMap1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            center: [17.3850, 78.4867],
            zoom: 11
        };
    }

    render() {

        const prov = OpenStreetMapProvider();
        const GeoSearchControlElement = SearchControl;

        return (

            <div className='mainmain'>


                <div className='MapMain1'>
                    <MapContainer center={this.state.center} zoom={this.state.zoom} attributionControl={false}>
                        <TileLayer
                            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                        />
                        <GeoSearchControlElement
                            className="ssaFormBlock1"
                            provider={prov}
                            showMarker={true}
                            showPopup={true}
                            maxMarkers={3}
                            retainZoomLevel={false}
                            animateZoom={true}
                            autoClose={false}
                            searchLabel={"Enter address ..."}
                            keepResult={true}
                            popupFormat={({ query, result }) =>
                                result.label
                            }
                        />
                        <Marker position={this.state.center}>
                            <Popup>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>

            </div>





        );
    }
}


export default LocationsMap1;

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