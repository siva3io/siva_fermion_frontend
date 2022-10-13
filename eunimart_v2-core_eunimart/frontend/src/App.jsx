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
  