import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { IndexScreen, ManageScreen } from "./screens/accessTemplates";
import Lookup_types_index from "./screens/lookup_types/Lookup_types_index";
import Lookup_codes_index from "./screens/lookup_codes/Lookup_codes_index";

export default function url_routes() {
  if (!localStorage.getItem("token") && location.hostname === "localhost") {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTEsIlVzZXJuYW1lIjoic3VwZXJfdXNlckBldW5pbWFydC5jb20iLCJhY2Nlc3NfdGVtcGxhdGVfaWQiOjEsImNvbXBhbnlfaWQiOm51bGwsImV4cCI6MTY2NDY4ODQ5NCwiZmlyc3RfbmFtZSI6IlN1cGVyIiwibGFzdF9uYW1lIjoiVXNlciJ9.DnNP77hZfh17t4hmZSIfZ1wJi3vjOc8jiXtHqVHBSf4"
    );
  }
  return (
    <StrictMode>
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/access-templates">
              <IndexScreen />
            </Route>
            <Route path="/access-templates/add">
              <ManageScreen />
            </Route>
            <Route
              path="/access-templates/edit/:id"
              render={props => <ManageScreen id={props.match.params.id} />}
            />

            <Route path="/lookup-types">
              <Lookup_types_index />
            </Route>

            <Route path="/lookup-codes">
              <Lookup_codes_index />
            </Route>
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
