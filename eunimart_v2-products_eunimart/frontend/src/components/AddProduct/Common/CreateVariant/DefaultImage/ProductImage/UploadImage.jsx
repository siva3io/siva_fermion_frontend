import React, { useState } from "react";
import "./Binary.css";

function UploadImage() {
  const [previewimage, setPreviewImage] = useState(null);
  const [tryone, setTryone] = useState("");
  const imgTypes = ["image/png", "image/jpg", "image/jpeg"];

  const onImageChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && imgTypes.includes(selectedFile.type)) {
        setPreviewImage(URL.createObjectURL(selectedFile));
        setTryone("");
      } else {
        setPreviewImage(null);
        setTryone("please select valid image type");
      }
    } else {
    }
  };

  const BackFromImg = () => {
    setPreviewImage("");
  };
  return (
    <div className="upldImgLink">
      <div className="upldImgLink_frame">
        <p className="upldImgLink_head">Drag and Drop a file</p>
        <p className="upldImgLink_body">files size to be less than 1kb</p>
        <p className="orText">OR</p>
        <button
          className="upldImgLink_btn"
          for="upload"
          onClick={onImageChange}
        >
          Upload an Image
        </button>
        {/* <p className="orText">OR</p>
        <p className="addImgText">Add image via URL</p>
        <p className="upldImgLink_body">Images type allowed webp, PNG etc</p>
        <input type="text" className="upldImgLink_input" />
        <div className="uploadMediaLinkButtons">
          <button className="urlBtn">Add Another URL</button>
          <button className="saveBtn">Save URL</button>
        </div> */}
      </div>
    </div>
  );
}

export default UploadImage;


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