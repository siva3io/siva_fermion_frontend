import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./Screens/Products";
import AddProduct from "./Screens/AddProduct";
import ProductView from "./Screens/ProductView";

import BunddleView from "./Screens/Bundle/BundleView/BunddleView";
import BundleCreate from "./Screens/Bundle/BundleCreate/BundleCreate";
import BundleParticular from "./Screens/Bundle/BundleParticularView/BundleParticular";

import { StrictMode } from "react";
import { Provider } from 'react-redux';
import store from './redux/store';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function url_routes() {
  if (!localStorage.getItem('token') && location.hostname === "localhost") {
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MzEsIlVzZXJuYW1lIjoiIiwiYWNjZXNzX3RlbXBsYXRlX2lkIjoyLCJjb21wYW55X2lkIjoxMSwiZXhwIjoxNjY1NjQ2NTY1LCJmaXJzdF9uYW1lIjoiIiwibGFzdF9uYW1lIjoiIn0.mefB3zDg3VGzeOvVIn8HxOD0GpVivsynzMGE3_kpzF0");
  }
  return (
    <StrictMode>
      <Provider store={store}>
        <Router >
        <ToastContainer />
          <Routes>
            <Route exact path="/products" element={<Products />}></Route>

            <Route
              exact
              path="/products/addProduct"
              element={<AddProduct edit={false} />}
            ></Route>

            <Route
              exact
              path="/products/productView/:id"
              element={<ProductView edit={false} />}
            ></Route>

            <Route
              exact
              path="/products/editProductVariant/:id"
              element={<ProductView edit={true} />}
            ></Route>

            <Route
              exact
              path="/products/editProductTemplate/:id"
              element={<AddProduct edit={true} />}
            ></Route>

            <Route
              exact
              path="/products/bundles"
              element={<BunddleView />}
            ></Route>

            <Route
              exact
              path="/products/bundles/createBundle"
              element={<BundleCreate edit={false} />}

            ></Route>

            <Route
              exact
              path="/products/bundles/bundleView/:id"
              element={<BundleParticular/>}

            ></Route>

            <Route
              exact
              path="/products/bundles/editBundle/:id"
              element={<BundleCreate edit={true}/>}

            ></Route>

            <Route
              exact
              path="/products/bundles/duplicateBundle"
              element={<BundleCreate edit={true}/>}

            ></Route>
          </Routes>
        </Router>
      </Provider></StrictMode>
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