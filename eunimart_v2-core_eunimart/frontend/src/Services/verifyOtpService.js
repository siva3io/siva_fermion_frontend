import GLOBAL_API_SOURCE from "../GlobalApi";

async function verifyOtpService(id,otp,url) {
  const axios = require("axios");
  const base_url = GLOBAL_API_SOURCE.url;
  const data = JSON.stringify({
    id:id,
    otp:otp,
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

export default verifyOtpService;
