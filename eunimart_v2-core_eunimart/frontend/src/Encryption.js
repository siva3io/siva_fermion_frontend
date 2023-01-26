export const encryptString = content => {
  let passcode = process.env.REACT_APP_SECURE_KEY;
  let result = [];
  let passLen = passcode.length;
  for (let i = 0; i < content.length; i++) {
    let passOffset = i % passLen;
    let calAscii = content.charCodeAt(i) + passcode.charCodeAt(passOffset);
    result.push(calAscii);
  }
  return JSON.stringify(result);
};
export const decryptString = content => {
  let passcode = process.env.REACT_APP_SECURE_KEY;
  let result = [];
  let str = "";
  let codesArr = JSON.parse(content);
  let passLen = passcode.length;
  for (let i = 0; i < codesArr.length; i++) {
    let passOffset = i % passLen;
    let calAscii = codesArr[i] - passcode.charCodeAt(passOffset);
    result.push(calAscii);
  }
  for (let i = 0; i < result.length; i++) {
    let ch = String.fromCharCode(result[i]);
    str += ch;
  }
  return str;
};
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
