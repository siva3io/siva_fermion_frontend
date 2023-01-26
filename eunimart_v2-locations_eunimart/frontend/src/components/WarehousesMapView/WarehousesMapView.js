import React, { Component } from 'react';
import "./warehouseMapView.css";
import { Map, MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { SearchControl, OpenStreetMapProvider } from "react-leaflet-geosearch";




const MyMarker = props => {

    const initMarker = ref => {
        if (ref) {
            ref.leafletElement.openPopup()
        }
    }

    return <Marker ref={initMarker} {...props} />
}



class LocationsMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPos: null
        };

        this.handleClick = this.handleClick.bind(this);
    }



    handleClick(e) {
        console.log("e", e);
        this.setState({ currentPos: e.latlng });
    }




    render() {

        const prov = OpenStreetMapProvider();
        const GeoSearchControlElement = SearchControl;



        return (

            <div className='mainmain'>
                <div className="ssaFormBlock1">

                    <div>Search Results</div>
                    <div className="ssaResult">
                        <label>ABC Pvt. Ltd</label>
                        <label>MD Road, Krishna Nagar</label>
                        <label>Hyderabad</label>
                    </div>
                    <div className="ssaResult">
                        <label>ABC Pvt. Ltd</label>
                        <label>MD Road, Krishna Nagar</label>
                        <label>Hyderabad</label>
                    </div>
                    <div className="ssaResult">
                        <label>ABC Pvt. Ltd</label>
                        <label>MD Road, Krishna Nagar</label>
                        <label>Hyderabad</label>
                    </div>
                    <div className="ssaResult">
                        <label className="ssaResultLabel">ABC Pvt. Ltd</label>
                        <label>MD Road, Krishna Nagar</label>
                        <label>Hyderabad</label>
                    </div>
                </div>

                <div className='MapMain'>
                    <MapContainer center={this.props.center} zoom={this.props.zoom} onClick={this.handleClick} attributionControl={false}>
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

                        {this.state.currentPos && <MyMarker position={this.state.currentPos}>
                            <Popup position={this.state.currentPos}>
                                Current location: <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
                            </Popup>
                        </MyMarker>}
                    </MapContainer>
                </div>

            </div>





        );
    }
}


export default LocationsMap;

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