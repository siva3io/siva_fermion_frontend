import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PurchaseOrdersIndex from "./screens/PurchaseOrdersIndex"
import PurchaseOrdersView from "./screens/PurchaseOrdersView";
import PurchaseOrdersCreate from "./screens/PurchaseOrdersCreate";
import "./index.css";

const App = () => {
  if (!localStorage.getItem('token') && location.hostname === "localhost") {
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTEsIlVzZXJuYW1lIjoic3VwZXJfdXNlckBldW5pbWFydC5jb20iLCJhY2Nlc3NfdGVtcGxhdGVfaWQiOjEsImNvbXBhbnlfaWQiOjEsImV4cCI6MTY2NTY0MDkyMiwiZmlyc3RfbmFtZSI6IlN1cGVyIiwibGFzdF9uYW1lIjoiVXNlciJ9.VzV0bHOqMKDeV9c88OFUaEFp3R_aRP3eW_6513s1ZRM");
  }
  return (
    <React.StrictMode>
        <Provider store={store}>
      <BrowserRouter history={history}>
          <Switch>

            <Route exact path="/purchaseOrders/add"
              render={() => <PurchaseOrdersCreate />}
            />
            <Route exact path="/purchaseOrders"
              render={() => <PurchaseOrdersIndex />}
            />
            <Route exact path="/purchaseOrders/:Id"
              render={() => <PurchaseOrdersView />}
            />
            <Route exact path="/purchaseOrders/edit/:id" render={(props) => (
              <PurchaseOrdersCreate id={props.match.params.id} />
            )} />

          </Switch>
      </BrowserRouter>
        </Provider>
    </React.StrictMode>
  )
}
ReactDOM.render(<App />, document.getElementById("app"));
export default App;









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