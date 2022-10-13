import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PricingIndex from "./screens/Pricing";
import PricingView from "./screens/PricingView";
import PricingAdd from "./screens/PricingAdd";

import "./index.css";
import PricingEdit from "./screens/PricingEdit";

const App = () => {
  console.log("out of Auth")

  if (! localStorage.getItem('token') && location.hostname === "localhost") {
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTEsIlVzZXJuYW1lIjoic3VwZXJfdXNlckBldW5pbWFydC5jb20iLCJhY2Nlc3NfdGVtcGxhdGVfaWQiOjEsImNvbXBhbnlfaWQiOjEsImV4cCI6MTY2NTg5ODY2MywiZmlyc3RfbmFtZSI6IlN1cGVyIiwibGFzdF9uYW1lIjoiVXNlciJ9.iywd06tBFUoGx8x6P3xqJVyTRHqqrBnS_VbBcAA82Ms");
}  
  return (
    <React.StrictMode>
      <BrowserRouter history={history}>
        <Provider store={store}>
          <Switch>
            <Route
              exact
              path="/pricing"
              render={() => <PricingIndex />}
            ></Route>
            <Route
              exact
              path="/pricing/view/:Id"
              render={() => <PricingView />}
            ></Route>
            <Route exact path="/pricing/add" render={() => <PricingAdd />} />
            <Route exact path="/pricing/edit/:Id" render={() => <PricingEdit />} />
          </Switch>
        </Provider>
      </BrowserRouter>
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