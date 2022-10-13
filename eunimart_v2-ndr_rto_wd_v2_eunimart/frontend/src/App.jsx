import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import { Provider } from 'react-redux';
import { StrictMode } from "react";
import store from './redux/store';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NDRIndex from "./screens/NDRIndex";
import RTOIndex from "./screens/RTOIndex";
import WDIndex from "./screens/WDIndex";
import NDRView from "./screens/NDRView";
import RTOView from "./screens/RTOView";
import WDView from "./screens/WDView";
const App = () => {
  if (!localStorage.getItem('token') && location.hostname === "localhost") {
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTEsIlVzZXJuYW1lIjoic3VwZXJfdXNlckBldW5pbWFydC5jb20iLCJhY2Nlc3NfdGVtcGxhdGVfaWQiOjEsImNvbXBhbnlfaWQiOjEsImV4cCI6MTY2NTgxNDc0MCwiZmlyc3RfbmFtZSI6IlN1cGVyIiwibGFzdF9uYW1lIjoiVXNlciJ9.LEgQzTQVb_jQjGkUOVagFajomHMbi8pIJvOi8hBOnhs");
  }
  return (
    <StrictMode>
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Provider store={store}>
              <Route exact path="/ndr"
                render={() => <NDRIndex />}
              />
              <Route exact path="/ndr/view/:Id"
                render={() => <NDRView />}
              />
              <Route exact path="/rto"
                render={() => <RTOIndex />}
              />
              <Route exact path="/rto/view/:Id"
                render={() => <RTOView />}
              />
              <Route exact path="/wd"
                render={() => <WDIndex />}
              />
              <Route exact path="/wd/view/:Id"
                render={() => <WDView />}
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