import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import IstIndex from "./screens/IstIndex";
import Istc from "./screens/IstCreate";
import IstViewDetail from "./screens/IstViewDetail";

export const App = () => {
  if (!localStorage.getItem("token") && location.hostname === "localhost") {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTEsIlVzZXJuYW1lIjoic3VwZXJfdXNlckBldW5pbWFydC5jb20iLCJhY2Nlc3NfdGVtcGxhdGVfaWQiOjEsImNvbXBhbnlfaWQiOjEsImV4cCI6MTY2NTkwNDgxMiwiZmlyc3RfbmFtZSI6IlN1cGVyIiwibGFzdF9uYW1lIjoiVXNlciJ9.yK7XXEV_FE6maNgcHMGC2CdQ3E95In36jPvV3X5MhXo"
    );
  }
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Switch>
          <Provider store={store}>
            <Route exact path="/ist" render={() => <IstIndex />} />

            <Route
              exact
              path="/ist/View/:id"
              render={() => <IstViewDetail />}
            />

            <Route exact path="/ist/Create" render={() => <Istc />} />
            <Route
              exact
              path="/ist/edit/:id"
              render={props => <Istc id={props.match.params.id} />}
            />
          </Provider>
        </Switch>
      </BrowserRouter>
    </React.StrictMode>

    // <React.StrictMode>
    //   <BrowserRouter>
    //     <Provider store={store}>
    //       <div style={{marginTop:24}}>
    //        <IstIndex />
    //       </div>
    //     </Provider>
    //   </BrowserRouter>
    // </React.StrictMode>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));

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
