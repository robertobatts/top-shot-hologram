const axios = require("axios");
const baseUrl = "http://localhost:8081/api";


const postTopShots = (playerName, files) => {
  let formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  formData.append("playerName", playerName);
  return axios
    .post(baseUrl + "/upload-top-shot", formData)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export default {
  postTopShots
};