import GLOBAL_API_SOURCE from "../GlobalApi";

async function loginService(email, url) {
  const axios = require("axios");
  const base_url = GLOBAL_API_SOURCE.url;
  const data = JSON.stringify({
    // username: email,
    // password: password,
    login:email,
  });

  const config = {
    method: "post",
    url: `${base_url}${url}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    return await axios(config);
  } catch (error) {
    return error;
  }
}

export default loginService;
