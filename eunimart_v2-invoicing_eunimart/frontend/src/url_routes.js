import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Index from "./screens/Index";
import View from "./screens/View";
import Add from "./screens/Add";
import SalesInvoiceIndex from "./screens/SalesInvoiceIndex";
import SalesInvoiceView from "./screens/SalesInvoiceView";
import SalesInvoiceAdd from "./screens/SalesInvoiceAdd";

export default function url_routes() {
  if (!localStorage.getItem("token") && location.hostname === "localhost") {
    localStorage.setItem(
      "token",
      "eeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTEsIlVzZXJuYW1lIjoic3VwZXJfdXNlckBldW5pbWFydC5jb20iLCJhY2Nlc3NfdGVtcGxhdGVfaWQiOjEsImNvbXBhbnlfaWQiOm51bGwsImV4cCI6MTg0NzczMzE4MiwiZmlyc3RfbmFtZSI6IlN1cGVyIiwibGFzdF9uYW1lIjoiVXNlciJ9.3ZBFXIxuReUSvVHX_bcJlHbP-HFW7nJt1rlGJXkD8LQ"
    );
  }
  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Switch>
            {/* PurchaseInvoice */}
            <Route exact path="/PurchaseInvoice">
              <Index />
            </Route>
            <Route
              exact
              path="/PurchaseInvoice/view/:id"
              render={props => <View id={props.match.params.id} />}
            />
            <Route exact path="/PurchaseInvoice/add">
              <Add />
            </Route>
            <Route
              exact
              path="/PurchaseInvoice/edit/:id"
              render={props => <Add id={props.match.params.id} />}
            />
            <Route
              exact
              path="/salesInvoice"
              render={() => <SalesInvoiceIndex />}
            ></Route>
            <Route
              exact
              path="/salesInvoice/view/:id"
              render={() => <SalesInvoiceView />}
            />
            <Route
              exact
              path="/salesInvoice/create"
              render={() => <SalesInvoiceAdd />}
            />
            <Route
              exact
              path="/salesInvoice/edit/:id"
              render={props => <SalesInvoiceAdd id={props.match.params.id} />}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
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
