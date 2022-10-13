import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import InventoryIndex from "./screens/inventory-adjustment/InventoryIndex";
import PicklistIndex from "./screens/picklist/PicklistIndex";
import PicklistView from "./screens/picklist/PicklistView";
import PicklistCreate from "./screens/picklist/PicklistCreate";
import InventoryCreate from "./screens/inventory-adjustment/InventoryCreate";
import CycleCountIndex from "./screens/CycleCountIndex";
import CycleCountView from "./screens/CycleCountView";

export default function url_routes() {
  if (!localStorage.getItem("token") && location.hostname === "localhost") {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTEsIlVzZXJuYW1lIjoic3VwZXJfdXNlckBldW5pbWFydC5jb20iLCJhY2Nlc3NfdGVtcGxhdGVfaWQiOjEsImNvbXBhbnlfaWQiOjEsImV4cCI6MTY2NTcyNDk4NSwiZmlyc3RfbmFtZSI6IlN1cGVyIiwibGFzdF9uYW1lIjoiVXNlciJ9.bZ-Ez2-VWp7KVLbjzgIlNStVfODbCjQeMYVIzxk1SU8"
    );
  }
  return (
    <StrictMode>
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/cycleCount"
              render={() => <CycleCountIndex />}
            />
            <Route
              exact
              path="/cycleCount/view/:Id"
              render={() => <CycleCountView />}
            />

            <Route
              exact
              path="/inventoryAdjustment"
              render={() => <InventoryIndex />}
            />
            <Route
              exact
              path="/inventoryAdjustment/create"
              render={() => <InventoryCreate />}
            />
            <Route
              exact
              path="/inventoryAdjustment/edit/:id"
              render={(props) => <InventoryCreate id={props.match.params.id} />}
            />
            <Route exact path="/pickList" render={() => <PicklistIndex />} />
            <Route
              exact
              path="/pickList/edit/:id"
              render={(props) => <PicklistCreate id={props.match.params.id} />}
            />

            <Route
              exact
              path="/pickList/view/:id"
              render={() => <PicklistView />}
            />
            <Route
              exact
              path="/pickList/create"
              render={() => <PicklistCreate />}
            />
          </Switch>
        </Router>
      </Provider>
    </StrictMode>
  );
}

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
