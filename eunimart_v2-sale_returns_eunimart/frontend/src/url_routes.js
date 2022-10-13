import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewSalesReturn from "./screens/SalesReturn/ViewSalesReturn";
import CreateSR from "./screens/SalesReturn/CreateSR";
import EditSR from "./screens/SalesReturn/EditSR";
import SalesReturn from "./screens/SalesReturn/SalesReturn";
import { StrictMode } from "react";
import { Provider } from 'react-redux';
import store from './redux/store';

export default function url_routes() {
    if (!localStorage.getItem('token') && location.hostname === "localhost") {
        localStorage.setItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTEsIlVzZXJuYW1lIjoic3VwZXJfdXNlckBldW5pbWFydC5jb20iLCJhY2Nlc3NfdGVtcGxhdGVfaWQiOjEsImNvbXBhbnlfaWQiOjEsImV4cCI6MTY2NTgxNDAxNSwiZmlyc3RfbmFtZSI6IlN1cGVyIiwibGFzdF9uYW1lIjoiVXNlciJ9.k_jOkfE6VsBzEIsXnNgbT8ZZIPUaQAOK5U-tiaPYnes");
    }
    return (
        <StrictMode>
            <Provider store={store}>
                <Router >
                    <div>
                        <Routes>
                            <Route
                                exact
                                path="/salesReturns"
                                element={<SalesReturn />}
                            />
                            <Route
                                exact
                                path="/salesReturns/viewSalesReturns/:id"
                                element={<ViewSalesReturn />}
                              
                            />
                            <Route
                                exact
                                path="/salesReturns/create"
                                element={<CreateSR />}
                               
                            />
                            <Route
                                exact
                                path="/salesReturns/EditSalesRetun/:id"
                                element={<EditSR />}
                              
                            />


                        </Routes>
                    </div>
                </Router>
            </Provider></StrictMode>
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