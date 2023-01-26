import React, { useState } from "react";
import "./KeywordGenerator.css";

function SearchForm({ addSearch }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addSearch(value);
    setValue("");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ margin: "0px 0px", padding: "0px 0px" }}
      >
        <input
          className="inputKeyword"
          type="text"
          //   className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      {/* <i className="material-icons custom " style={{}}>filter_alt_outline</i> */}
    </>
  );
}

function Search({ search, index, removeSearch }) {
  return (
    <>
      <>
        <button className="searchKeyword">
          <span>{search.text} </span>
          <span>
            <i
              className="material-icons custom cancelKeywordIcon"
              onClick={() => removeSearch(index)}
            >
              highlight_off
            </i>
          </span>
        </button>
      </>
    </>
  );
}

const KeywordGenerator = (props) => {
  const [searchs, setsearchs] = useState([]);
  const addSearch = (text) => {
    const newsearchs = [...searchs, { text }];
    setsearchs(newsearchs);
  };

  const removeSearch = (index) => {
    const newsearchs = [...searchs];
    newsearchs.splice(index, 1);
    setsearchs(newsearchs);
  };

  return (
    <div className="inputGeneratorWrapper">
      <div className="inputgeneratorHeading">
        <p>Keyword Generator</p>
        <button className="btnSaveproduct">Save</button>
      </div>

      <div className="keywordsWrap">
        <label>Keywords</label>
        <div className="keywordContainer">
          <div className="textareaKeywords">
            {searchs.map((search, index) => (
              <Search
                key={index}
                index={index}
                search={search}
                removeSearch={removeSearch}
              />
            ))}
            <SearchForm addSearch={addSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordGenerator;

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