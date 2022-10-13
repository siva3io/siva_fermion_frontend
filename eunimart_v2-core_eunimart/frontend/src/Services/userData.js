import GLOBAL_API_SOURCE from "../GlobalApi";

async function userData() {
  const axios = require("axios");
  const base_url = GLOBAL_API_SOURCE.url;
   

  const config = {
    method: "get",
    url: `${base_url}/auth/me`,
    headers: {
      "Content-Type": "application/json",
      "Authorization" : "Bearer " + localStorage.getItem('token')
    } 
  };

  try {
    return await axios(config);
  } catch (error) {
    return error;
  }
}

export default userData;
