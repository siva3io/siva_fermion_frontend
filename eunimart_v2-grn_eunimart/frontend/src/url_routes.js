import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Grn from "./screens/View/Grn";
import Create2 from "./screens/View/Create2";
import GRNview from "./screens/View/GRNview";
import Edit2 from "./screens/View/Edit2";

import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function url_routes() {
  if (!localStorage.getItem("token") && location.hostname === "localhost") {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MzEsIlVzZXJuYW1lIjoiIiwiYWNjZXNzX3RlbXBsYXRlX2lkIjoyLCJjb21wYW55X2lkIjoxMSwiZXhwIjoxNjY1NjQ2NTY1LCJmaXJzdF9uYW1lIjoiIiwibGFzdF9uYW1lIjoiIn0.mefB3zDg3VGzeOvVIn8HxOD0GpVivsynzMGE3_kpzF0"
    );
  }

  return (
    <StrictMode>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route exact path="/grn" element={<Grn />}></Route>
            <Route exact path="/grn/viewGrn/:id" element={<GRNview />}></Route>
            <Route exact path="/grn/create" element={<Create2 />}></Route>
            <Route exact path="/grn/editGrn/:id" element={<Edit2 />}></Route>
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
