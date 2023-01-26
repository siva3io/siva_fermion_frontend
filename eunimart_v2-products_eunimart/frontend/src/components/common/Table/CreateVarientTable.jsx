import React, { useState } from "react";
import "./CreateVarientTable.css";

function Table({ data, dataHeader }) {
  const heading = dataHeader;
  const details = data;
  const [toggle, setToggle] = useState(-1);

  return (
    <>
      <div className="scroll">
        <table>
          <tbody className="tbody">
            <tr className="header">
              <th>
                <label className="container">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </th>
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
                    <td>
                      <label className="container">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </td>

                    <td>{curElem.variant_no}</td>
                    <td>{curElem.attribute_one}</td>
                    <td>{curElem.attribute_two}</td>
                    <td>
                      <div className="tableBadges">
                        {curElem.property.map((prop, i) => {
                          return (
                            <div
                              key={i}
                              className="tableBadges_badge pinkBadge"
                            >
                              <p className="tableBadges_badge_text">{prop}</p>
                            </div>
                          );
                        })}
                      </div>
                    </td>
                    <td>
                      <i className="material-icons custom actionIcon">
                        more_vert
                      </i>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;

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