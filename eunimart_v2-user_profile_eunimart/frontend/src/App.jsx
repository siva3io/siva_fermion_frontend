import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css"
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Index from "./screens/bussinessSettings/Index";
import SalesView from "./screens/bussinessSettings/SalesView";
export const App = () => {
  if (!localStorage.getItem("token") && location.hostname === "localhost") {
    console.log("in Auth");
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTEsIlVzZXJuYW1lIjoic3VwZXJfdXNlckBldW5pbWFydC5jb20iLCJhY2Nlc3NfdGVtcGxhdGVfaWQiOjEsImNvbXBhbnlfaWQiOjEsImV4cCI6MTY2NTcyMzY0NywiZmlyc3RfbmFtZSI6IlN1cGVyIiwibGFzdF9uYW1lIjoiVXNlciJ9.oJeqNgXNhlOoq8NmxOmnfLX9Gd1gOuJvgp_ZqARBXEA"
    );
  }
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter history={history}>
          <div style={{ marginTop: 24 }}>
            <Switch>
              <Route
                exact
                path="/profile"
                render={(props) => (
                  <Index />
                )}
              />
              <Route
                exact
                path="/organisation"
                render={(props) => (
                  <SalesView />
                )}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
export default App

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