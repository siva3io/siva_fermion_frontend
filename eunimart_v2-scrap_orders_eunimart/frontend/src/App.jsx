import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";  
import "./index.css"; 
import "./App.css"; 
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrapOrdersIndex from "./screens/ScrapOrdersIndex";
import ScrapOrdersView from "./screens/ScrapOrdersView";
import  ScrapOrdersAdd  from './screens/ScrapOrdersAdd'
const App = () => {
  if (!localStorage.getItem('token') && location.hostname === "localhost") {
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTEsIlVzZXJuYW1lIjoic3VwZXJfdXNlckBldW5pbWFydC5jb20iLCJhY2Nlc3NfdGVtcGxhdGVfaWQiOjEsImNvbXBhbnlfaWQiOm51bGwsImV4cCI6MTg0NzczMzE4MiwiZmlyc3RfbmFtZSI6IlN1cGVyIiwibGFzdF9uYW1lIjoiVXNlciJ9.3ZBFXIxuReUSvVHX_bcJlHbP-HFW7nJt1rlGJXkD8LQ");
}  
  return(     
    <React.StrictMode>
       <Provider store={store}> 
      <Router history={history}>  
      <Switch>
       
          <Route exact path="/scrapOrders"
            render={()=> <ScrapOrdersIndex/>}
        />
        <Route exact path="/scrapOrders/view/:Id"
            render={()=> <ScrapOrdersView/>}
        />
         <Route
                exact
                path="/scrapOrders/create"
                render={() => <ScrapOrdersAdd />}
              ></Route>
               <Route exact path="/scrapOrders/edit/:id" render={(props) => (
              <ScrapOrdersAdd id={props.match.params.id}/>
          )} />
      
        </Switch>
        </Router>
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
along with this program. If not, see http://www.gnu.org/licenses/.
*/
