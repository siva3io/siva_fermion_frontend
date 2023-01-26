
# Sales Order

Eunimart Platform build using React.

- PORT : 4008

## Before running this repository

- Clone the “core_eunimart” repository and login to it.
- After the login, please go to the localStorage and copy the “token” and “access_template_id”.
    - Why token ?
      While hitting the api,we need to pass the token to access the data.
    - Why access_template_id ?
      While hiting the api,you need to pass the access_template_id to check whether the user has the access to that particular module or not.

## After getting the token

- After gettig the token, we need to make a few changes in the code. Follow the steps mentioned below:

      - Go to the frontend folder using the following command in the terminal.
        ```bash
        $ cd frontend
        ```

      - Open the baseurl.js file to paste the token. For reference, follow the below path.
        ```bash
        frontend > src > baseurl.js
        ```
      - Comment the token key, which gets value from the localStorage.

- Set the value for “token” key, using the given value for reference.
  token: "Bearer copied_token";

- Open the action.js file to paste the “access_template_id”. For reference, follow the below path.
```bash
frontend > src > redux > Action > action.js
```

- Open the “action.js” file and go to “viewAccessManagement()” function. Remove the localStorage path in the get function and paste the copied “access_template_id”.

- After that, you need to install the node modules using the following command in the terminal.
  ```bash
  $ npm install
  ```
  or
  ```bash
  $ npm i
  ```
  After trying the above commands, are there any errors ? If yes, then try the below command.
  ```bash
  $ npm i --legacy-peer-deps
  ```
- Once the node modules are installed, go to “webpack.config.js” file and change the publicpath from frontend.eunimart.com to local.
  ```bash
  webpack.config.js > output > publicPath
  ```
## Build & Run

- If you want to run in development, use the following command in the bash.
  ```bash
  $ npm run start
  ```
- If you want to build, use the following command in the bash.
  ```bash
  $ npm run build
  ```
## Routing

- After running the project, change the path to access the contacts table. For reference, follow the below path:
```bash
http://localhost:4008/salesOrder
```
## Changelog

Checkout the changelog below

[Changelog](CHANGELOG.md)

## Author
Eunimart

 <!-- Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)
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
 along with this program.  If not, see <https://www.gnu.org/licenses/lgpl-3.0.html/>. -->