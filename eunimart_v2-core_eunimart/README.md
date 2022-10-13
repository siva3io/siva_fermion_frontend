
# Contacts

Eunimart Platform build using React.

- PORT : 4000

## Before running this repository

- Clone the “core_eunimart” repository and login to it.

- After that, Follow the steps mentioned below:

      - Go to the frontend folder using the following command in the terminal.
        ```bash
        $ cd frontend
        ```

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

## Changelog

Checkout the changelog below

[Changelog](CHANGELOG.md)

## Author
Eunimart