import React, { useState } from "react";
import "./MapView.css";
import TabHeader from "../../Shared/CommonTabHeader/TabHeader";
import CommonTable from "../../Shared/CommonTable/CommonTable";
import {
  DUMMY_DATA_INVOICE_heading,
  DUMMY_DATA_INVOICE_detail,
} from "../../Data/TableData";

function MapView() {
  const [view, setView] = useState("mapView");
  return (
    <div className="mapViewMain">
      <TabHeader
        createbtn={["Create Location", "Export Location"]}
        importbtn={[]}
        exportbtn={[]}
      />
      {view && view === "mapView" ? (
        <>
          <div className="mapContainer">
            {/* Locaion detail Card */}
            <div className="locationCard">
              <div className="locationCardHeader">
                <h3>Location Place Name</h3>
                <div>:</div>
              </div>
              <div className="locationCardMiddle">
                <i className="material-icons custom add_icon">add</i>
                <p>Type of a location</p>
                <p>Location ID</p>
              </div>
              <div>
                <p>
                  This is the discription about the loaction and the details.
                </p>
              </div>

              <hr className="divider" />

              <div className="locationCardBody">
                <div className="locationCardSpecs">
                  <label className="bodyKey">Total area</label>
                  <label className="bodyValue">200 sq feet</label>
                </div>
                <div className="locationCardSpecs">
                  <label className="bodyKey">Capacity used</label>
                  <label className="bodyValue">97%</label>
                </div>
                <div className="locationCardSpecs">
                  <label className="bodyKey">Current Capacity</label>
                  <label className="bodyValue">80% full</label>
                </div>
              </div>
            </div>
            {/* Location Key Card */}

            <div className="locationKeyCard">
              <div className="locationKeys">
                <i className="material-icons custom add_icon">add</i>

                <label className="locationName">Location Name</label>
              </div>
              <div className="locationKeys">
                <i className="material-icons custom add_icon">add</i>

                <label className="locationName">Location Name</label>
              </div>
              <div className="locationKeys">
                <i className="material-icons custom add_icon">add</i>

                <label className="locationName">Location Name</label>
              </div>
              <div className="locationKeys">
                <i className="material-icons custom add_icon">add</i>

                <label className="locationName">Location Name</label>
              </div>
              <div className="locationKeys">
                <i className="material-icons custom add_icon">add</i>

                <label className="locationName">Location Name</label>
              </div>
            </div>
          </div>
        </>
      ) : view === "listView" ? (
        <div style={{ padding: "16px" }}>
          <CommonTable
            heading={DUMMY_DATA_INVOICE_heading}
            detail={DUMMY_DATA_INVOICE_detail}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MapView;

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