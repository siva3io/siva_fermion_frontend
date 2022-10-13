import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContactsIndex from "./screens/ContactsIndex";
import ContactsViewMain from "./components/ContactsViewMain";
import ContactsCreate from "./screens/ContactsCreate";
export var tempContacts = [];
export var tempData = {};

export const settempContacts = (props) => {
  if (props) {
    tempContacts = props;
  } else {
    tempContacts = [];
  }
};

export const App = () => {
  if (!localStorage.getItem("token") && location.hostname === "localhost") {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiVXNlcm5hbWUiOiJhZG1pbiIsImV4cCI6MTY3NTg4NDQ4MywiZmlyc3RfbmFtZSI6ImFkbWluIiwibGFzdF9uYW1lIjoiYWRtaW4ifQ.OlciDkAcMdNokQZ-YKC5wHdxSynr0OnaIwctWyEdOAY"
    );
  }
  return (
    // <React.StrictMode>
    //   <BrowserRouter>
    //     <Switch>
    //       <Provider store={store}>
    //         <Route exact path="/contacts" render={() => <ContactsIndex />} />
    //         <Route
    //           exact
    //           path="/contacts/View/:id"
    //           render={() => <ContactsViewMain />}
    //         />
    //         <Route
    //           exact
    //           path="/contacts/create"
    //           render={() => <ContactsCreate />}
    //         />
    //         <Route
    //           exact
    //           path="/contacts/edit/:id"
    //           render={(props) => <ContactsCreate id={props.match.params.id} />}
    //         />
    //       </Provider>
    //     </Switch>
    //   </BrowserRouter>
    // </React.StrictMode>

    // <React.StrictMode>
    //   <BrowserRouter>
    //     <Provider store={store}>
    //       <div style={{marginTop:24}}>
    //        <ContactsIndex/>
    //       </div>
    //     </Provider>
    //   </BrowserRouter>
    // </React.StrictMode>

    <StrictMode>
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/contacts" render={() => <ContactsIndex />} />

            <Route
              exact
              path="/contacts/View/:id"
              render={() => <ContactsViewMain />}
            />

            <Route
              exact
              path="/contacts/create"
              render={() => <ContactsCreate />}
            />

            <Route
              exact
              path="/contacts/edit/:id"
              render={(props) => <ContactsCreate id={props.match.params.id} />}
            />
          </Switch>
        </Router>
      </Provider></StrictMode>
  );
};
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