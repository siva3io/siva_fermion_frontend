import React, { useEffect, useState, Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ShippingOrdersIndex from "./screens/ShippingOrdersIndex";
import ShippingOrdersView from "./components/View/ShippingOrdersView";
import ShippingAdd from "./components/View/create/ShippingAdd";

export default function url_routes() { 
  if (!localStorage.getItem('token') && location.hostname === "localhost") {
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTksIlVzZXJuYW1lIjoic2hpcHBpbmdfYWRtaW5AZXVuaW1hcnQuY29tIiwiYWNjZXNzX3RlbXBsYXRlX2lkIjo5LCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE2NjU3Mjg5NzcsImZpcnN0X25hbWUiOiJTaGlwcGluZyIsImxhc3RfbmFtZSI6IkFkbWluIn0.W1GVm9-pXHfPb3J11gDGHNQDUd6iHdCcpO10TVC78TU");
  }  
  return ( 
    <StrictMode>
    <Provider store={store}>
      <BrowserRouter history={history}>
        <Switch>
          <Provider store={store}> 
            <Route
              exact
              path="/shippingOrders"
              render={() => <ShippingOrdersIndex />}
            />

            <Route
              exact
              path="/shippingOrders/View/:id"
              render={() => <ShippingOrdersView />}
            />
            <Route exact path="/shippingOrders/add">
              <ShippingAdd />
            </Route>

            <Route
              exact
              path="/shippingOrders/edit/:id"
              render={(props) => <ShippingAdd id={props.match.params.id} />}
            />
          </Provider>
        </Switch>
      </BrowserRouter>
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