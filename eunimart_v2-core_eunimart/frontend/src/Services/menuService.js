import GLOBAL_API_SOURCE from "../GlobalApi";

async function menuService() {
  const axios = require("axios");
  const base_url = GLOBAL_API_SOURCE.url;
   

  const config = {
    method: "get",
    url: `${base_url}/api/v1/module/side_menu?per_page=100`,
    headers: {
      "Content-Type": "application/json",
      // "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiVXNlcm5hbWUiOiJhZG1pbiIsImV4cCI6MTY3NTg4NDQ4MywiZmlyc3RfbmFtZSI6ImFkbWluIiwibGFzdF9uYW1lIjoiYWRtaW4ifQ.OlciDkAcMdNokQZ-YKC5wHdxSynr0OnaIwctWyEdOAY"
      "Authorization" : "Bearer " + localStorage.getItem('token')
    } 
  };

  try {
    return await axios(config);
  } catch (error) {
    return error;
  }
}

export default menuService;
