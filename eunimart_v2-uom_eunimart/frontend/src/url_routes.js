import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UOM from "./Screens/UOM";
import UOMClass from "./Screens/UOMClass/UOMClass";
import CreateUOM from "./Screens/CreateUOM";
import CreateUOMClass from "./Screens/UOMClass/CreateUOMClass";
import UOMClassParticularView from "./Screens/UOMClass/UOMClassParticularView";
import UOMParticularView from "./Screens/UOMParticularView";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";

import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function url_routes() {
  if (!localStorage.getItem("token") && location.hostname === "localhost") {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTEsIlVzZXJuYW1lIjoic3VwZXJfdXNlckBldW5pbWFydC5jb20iLCJhY2Nlc3NfdGVtcGxhdGVfaWQiOjEsImNvbXBhbnlfaWQiOjEsImV4cCI6MTY2NTg5NzQ4MiwiZmlyc3RfbmFtZSI6IlN1cGVyIiwibGFzdF9uYW1lIjoiVXNlciJ9.vaK98nYY91hGZcJd2q6enWIRYW_xbPijrDCV1XzCKos"
    );
  }
  return (
    <StrictMode>
      <Provider store={store}>
        <Router>
          <ToastContainer />
          <Routes>
            <Route exact path="/uom" element={<UOM />}></Route>
            <Route exact path="/uomClass" element={<UOMClass />}></Route>
            <Route
              exact
              path="/uom/createUOM"
              element={<CreateUOM edit={false} />}
            ></Route>
            <Route
              exact
              path="/uom/editUOM/:id"
              element={<CreateUOM edit={true} />}
            ></Route>

            <Route
              exact
              path="/uomClass/createUOMClass"
              element={<CreateUOMClass edit={false} />}
            ></Route>
            <Route
              exact
              path="/uomClass/editUOMClass/:id"
              element={<CreateUOMClass edit={true} />}
            ></Route>
            <Route
              exact
              path="/uom/View/:id"
              element={<UOMParticularView />}
            ></Route>
            <Route
              exact
              path="/uomClass/View/:id"
              element={<UOMClassParticularView />}
            ></Route>
          </Routes>
        </Router>
      </Provider>
    </StrictMode>
  );
}


/*
 Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)
 All rights reserved.
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License v3.0 as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License v3.0 for more details.
 You should have received a copy of the GNU Lesser General Public License v3.0
 along with this program.  If not, see <https://www.gnu.org/licenses/lgpl-3.0.html/>.
*/