const axios = require("axios");
//const baseUrl = "http://localhost:8081/api"; // for development
const baseUrl = "/api";


const postTopShots = (playerName, files, date, type, borderColor) => {
  let formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  formData.append("playerName", playerName);
  formData.append("date", date);
  formData.append("type", type);
  if (borderColor) {
    var r = parseInt("0x" + borderColor.slice(1, 3));
    var g = parseInt("0x" + borderColor.slice(3, 5));
    var b = parseInt("0x" + borderColor.slice(5, 7));
    formData.append("r", r);
    formData.append("g", g);
    formData.append("b", b);
  }
  return axios
    .post(`${baseUrl}/upload-top-shot`, formData)
    .then(res => {
      return res.data;
    });
};

const getAllPlayers = () => {
  return axios
    .get(`${baseUrl}/players`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
      return [];
    });
};

const getTopshotCubeMetadata = (playerName, date, type) => {
  return axios
    .get(`${baseUrl}/top-shot-cube-metadata?playerName=${playerName}&date=${date}&type=${type}`)
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
  postTopShots, getAllPlayers, getTopshotCubeMetadata, getTopShotPhotoLink, getTopShotVideoLink
};
