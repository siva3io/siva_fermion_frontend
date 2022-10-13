
import Login from "./Screens/Login";
import Home from "./Screens/Home";
import OnBoarding from "./Screens/OnBoarding";
import { BrowserRouter as Router, Switch, Route,Redirect} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { useEffect, useState } from "react";
import React from 'react';

import { StrictMode } from "react";
import { Provider } from 'react-redux';
import store from './redux/store';
// import DeliveryOrdersApp from './components/DeliveryOrdersApp'; 
// import SalesOrdersApp from './Components/SalesOrdersApp';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

//analytics
import ReactGA from "react-ga";
const TRACKING_ID = "UA-143773035-1"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);
 

export default () => {  
    const [sessionId, setSessionId] = useState(
        sessionStorage.getItem("session_id") || ""
      );
      useEffect(() => {
        console.log(
          "Analytics >>> ",
          window.location.pathname,
          " >>>> ",
          window.location.search
        );
        ReactGA.pageview(window.location.pathname + window.location.search);
      }, []);
      //Logistics-->ShippingOrders
      const [marketPlaceId, setMarketPlaceId] = useState(
        sessionStorage.getItem("marketplace_id") || ""
      );
      //Logistics-->ShippingOrders
       //Logistics
    
    
       useEffect(() => {
        window.addEventListener(
          "message",
          function (event) {
            let eventType = event.data.type;
            if (eventType === "logisticsPartners") {
              console.log(event.data.data, "EVENT DATA CORE");
              console.log(eventType, "EVENT TYPE DATA CORE");
              sessionStorage.setItem(
                "marketplace_id",
                event.data.data.marketPlaceId
              );
              // sessionStorage.setItem("pranathi_checking", event.data.data.marketPlaceId);
              if (eventType === "products") {	
                console.log(event.data.data, "EVENT DATA CORE products");	
                console.log(eventType, "EVENT TYPE DATA CORE products");	
              }
            }
          },
          false
        );
      }, [marketPlaceId, sessionId]);
      useEffect(() => {
        if (marketPlaceId) {
          // sessionStorage.setItem("marketplace_id", marketPlaceId);
        }
      }, []);
      //Logistics
      return (
        
        <ThemeProvider theme={theme}>
        <StrictMode>
        <Provider store={store}>   
        <Router history={history}>  
            <Switch> 
            <Route exact path="/">
                <Login setSessionId={setSessionId} />
            </Route>  
            <Route exact path="/login">
                <Login setSessionId={setSessionId} />
            </Route>  
            <Route exact path="/products">
                <Home setSessionId={setSessionId} />
            </Route>  
            <Route exact path="/onBoarding">
                <OnBoarding setSessionId={setSessionId} />
            </Route>   
            <Route path='*' render={() => 
                (
                  <Redirect to="/products"/>
                )
            }/>
            {/* <Route path='/deliveryOrders' component={DeliveryOrdersApp} />
            <Route path='/salesOrders' component={SalesOrdersApp} /> */}
            
            </Switch>      
        </Router>
        </Provider>
        </StrictMode> 
        </ThemeProvider>
    
      ); 
} 