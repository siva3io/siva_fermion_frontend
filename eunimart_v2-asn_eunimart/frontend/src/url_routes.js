import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ASNview from "./screens/ASN/ASNview";
import ASNCreate from "./screens/ASN/ASNCreate";
import ASNEdit from "./screens/ASN/ASNEdit";
import Asn from "./screens/ASN/Asn";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function url_routes() {
  if (!localStorage.getItem("token") && location.hostname === "localhost") {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTEsIlVzZXJuYW1lIjoic3VwZXJfdXNlckBldW5pbWFydC5jb20iLCJhY2Nlc3NfdGVtcGxhdGVfaWQiOjEsImNvbXBhbnlfaWQiOjEsImV4cCI6MTY2NTc3ODQ2MiwiZmlyc3RfbmFtZSI6IlN1cGVyIiwibGFzdF9uYW1lIjoiVXNlciJ9.Wk8nP9-mxvS3fkgzoDXWm0vwf3wtKp9QsOXS71A-kws"
    );
  }
  return (
    <StrictMode>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route exact path="/asn" element={<Asn />} />
            <Route exact path="/asn/viewAsn/:id" element={<ASNview />} />
            <Route exact path="/asn/create" element={<ASNCreate />} />
            <Route exact path="/asn/edit/:id" element={<ASNEdit />} />
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
