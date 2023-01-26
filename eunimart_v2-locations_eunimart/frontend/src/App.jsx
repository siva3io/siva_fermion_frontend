import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { StrictMode } from "react";
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LocationsIndex from "./screens/LocationsIndex";
import LocationView from "./screens/LocationView"
import CreateView from "./screens/LocationCreate";
import LocationEdit from "./screens/LocationEdit";

const App = () => {
  if (!localStorage.getItem('token') && location.hostname === "localhost") {
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTEsIlVzZXJuYW1lIjoic3VwZXJfdXNlckBldW5pbWFydC5jb20iLCJhY2Nlc3NfdGVtcGxhdGVfaWQiOjEsImNvbXBhbnlfaWQiOjEsImV4cCI6MTY2NTg5NzQ4MiwiZmlyc3RfbmFtZSI6IlN1cGVyIiwibGFzdF9uYW1lIjoiVXNlciJ9.vaK98nYY91hGZcJd2q6enWIRYW_xbPijrDCV1XzCKos");
  }
  return (
    <StrictMode>
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Provider store={store}>

              <Route exact path="/locations"
                render={() => <LocationsIndex />}
              />

              <Route exact path="/location/:Id"
                render={() => <LocationView />}
              />


              <Route exact path="/locations/add"
                render={() => <CreateView />}
              />
              <Route exact path="/locations/edit/:Id"
                render={() => <LocationEdit />}
              />

            </Provider>
          </Switch>
        </Router>
      </Provider></StrictMode>
  )
}
ReactDOM.render(<App />, document.getElementById("app"));
export default App;



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