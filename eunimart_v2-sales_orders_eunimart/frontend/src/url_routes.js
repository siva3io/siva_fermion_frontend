import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import SalesIndex from "./screens/SalesIndex";
import SalesView from "./screens/SalesView";
import SalesAdd from "./screens/SalesAdd";

export default function url_routes() {
  if (!localStorage.getItem("token") && location.hostname === "localhost") {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTQsIlVzZXJuYW1lIjoib3JkZXJfYWRtaW5AZXVuaW1hcnQuY29tIiwiYWNjZXNzX3RlbXBsYXRlX2lkIjo0LCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE2NjQ2MjUyNTAsImZpcnN0X25hbWUiOiJPcmRlciIsImxhc3RfbmFtZSI6IkFkbWluIn0.1aFJIzoF9nJmHCc8nhKYyopKcZvMBLMynw7wbV-NoAs"
    );
  }
  return (
    <StrictMode>
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/salesOrders">
              <SalesIndex />
            </Route>
            <Route
              exact
              path="/sales/view/:id"
              render={(props) => <SalesView id={props.match.params.id} />}
            />
            <Route exact path="/sales/add">
              <SalesAdd />
            </Route>
            <Route
              exact
              path="/sales/edit/:id"
              render={(props) => <SalesAdd id={props.match.params.id} />}
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