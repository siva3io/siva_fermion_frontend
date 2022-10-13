import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import CreditIndex from "./screens/CreditIndex";
import CreditView from "./screens/CreditView";
import CreditAdd from "./screens/CreditAdd";
import DebitNoteIndex from "./screens/DebitNoteIndex";
import DebitNoteView from "./screens/DebitNoteView";
import DebitNoteCreate from "./screens/DebitNoteCreate";
import { useDispatch } from "react-redux";
// import { viewAccessManagement } from "./redux/action";

export default function url_routes() {
  // const dispatch = useDispatch();

  // dispatch(viewAccessManagement());
  if (!localStorage.getItem("token") && location.hostname === "localhost") {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTEsIlVzZXJuYW1lIjoic3VwZXJfdXNlckBldW5pbWFydC5jb20iLCJhY2Nlc3NfdGVtcGxhdGVfaWQiOjEsImNvbXBhbnlfaWQiOjEsImV4cCI6MTY2NTkwNDgxMiwiZmlyc3RfbmFtZSI6IlN1cGVyIiwibGFzdF9uYW1lIjoiVXNlciJ9.yK7XXEV_FE6maNgcHMGC2CdQ3E95In36jPvV3X5MhXo"
    );
  }
  return (
    <StrictMode>
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Switch>
              <Route exact path="/creditNote">
                <CreditIndex />
              </Route>
              <Route
                exact
                path="/creditNote/view/:id"
                render={(props) => <CreditView id={props.match.params.id} />}
              />
              <Route exact path="/creditNote/add">
                <CreditAdd />
              </Route>
              <Route
                exact
                path="/creditNote/edit/:id"
                render={(props) => <CreditAdd id={props.match.params.id} />}
              />
              <Route
                exact
                path="/debitNote"
                render={() => <DebitNoteIndex />}
              />
              <Route
                exact
                path="/debitNote/view/:Id"
                render={() => <DebitNoteView />}
              />
              <Route
                exact
                path="/debitNote/edit/:id"
                render={(props) => (
                  <DebitNoteCreate id={props.match.params.id} />
                )}
              />
              <Route
                exact
                path="/debitNote/create"
                render={() => <DebitNoteCreate />}
              />
            </Switch>
          </div>
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
