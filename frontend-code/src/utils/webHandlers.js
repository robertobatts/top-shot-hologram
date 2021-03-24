const axios = require("axios");
const baseUrl = "http://localhost:8081/api";


const postTopShots = (playerName, files) => {
  let formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  formData.append("playerName", playerName);
  return axios
    .post(`${baseUrl}/upload-top-shot`, formData)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

const getAllPlayerNames = () => {
  return axios
    .get(`${baseUrl}/player-names`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

const getCubeMediaIds = (playerName) => {
  return axios
    .get(`${baseUrl}/top-shot-cube-metadata?playerName=${playerName}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

const getTopShotPhotoLink = (id) => {
  return `${baseUrl}/top-shot-photo/${id}`;
};

const getTopShotVideoLink = (id) => {
  return `${baseUrl}/top-shot-video/${id}`;
};


export default {
  postTopShots, getAllPlayerNames, getCubeMediaIds, getTopShotPhotoLink, getTopShotVideoLink
};