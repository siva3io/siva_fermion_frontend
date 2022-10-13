import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";  
import "./index.css"; 
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom'; 
import Url_Routes from './url_routes';

export const App = () => {    
return(  
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>  
         <Url_Routes/> 
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
  )
}
ReactDOM.render(<App />, document.getElementById("app"));
  
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