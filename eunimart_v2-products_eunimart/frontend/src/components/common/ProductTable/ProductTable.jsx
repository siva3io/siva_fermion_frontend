import React, { useState } from "react";
import "./ProductTable.css";

function ProductTable() {
  const heading = [
    "Product",
    "Seller Name",
    "Price",
    "Seller Rating",
    "Category",
    "",
  ];
  const details = [
    {
      product: "Nike T-Shirt",
      category: "Fashion",
      sellerRating: "4.5",
      price: "1596",
      action: "",
      sellerName: "MK Fathia ",
    },
    {
      product: "Nike T-Shirt",
      category: "Fashion",
      sellerRating: "4.5",
      price: "1596",
      action: "",
      sellerName: "MK Fathia ",
    },
    {
      product: "Nike T-Shirt",
      category: "Fashion",
      sellerRating: "4.5",
      price: "1596",
      action: "",
      sellerName: "MK Fathia ",
    },
    {
      product: "Nike T-Shirt",
      category: "Fashion",
      sellerRating: "4.5",
      price: "1596",
      action: "",
      sellerName: "MK Fathia ",
    },
  ];
  const [toggle, setToggle] = useState(-1);

  return (
    <>
      <div className="scroll">
        <table>
          <tbody className="tbody">
            <tr className="header">
              {heading.map((curElem, i) => {
                return (
                  <th key={i} className="tableHeading">
                    {curElem}
                  </th>
                );
              })}
            </tr>
            {/* </div> */}
            {details.map((curElem, i) => {
              return (
                <>
                  <tr
                    key={i}
                    className={toggle === i ? "trSelected" : "tr"}
                    onClick={() => setToggle(i)}
                  >
                    {/* <td > */}
                    {/* <img className='tableImage' src='https://cdn2.iconfinder.com/data/icons/social-icons-rectangular-black/512/shopclues-512.png' /> */}
                    <td>{curElem.product}</td>
                    {/* </td> */}
                    <td>{curElem.category}</td>
                    <td>{curElem.sellerName}</td>
                    <td>{curElem.sellerRating}</td>
                    <td>{curElem.price}</td>
                    <td>
                      <div className="openSellers">
                        {/* <i className="material-icons custom ">openinnew</i> */}
                        <i className="material-icons openinIcon">open_in_new</i>
                        <a href="#" alt="open seller">
                          Open Seller’s Page
                        </a>
                      </div>
                      {/* <CommonButton name='Open Seller’s Page' starticon='open_in_new'/> */}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* </div> */}
    </>
  );
}

export default ProductTable;

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