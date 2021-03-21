const jsdom = require("jsdom");
const fetch = require("node-fetch");

const scrape = async () => {
  console.log("wee")
    console.log("ciao")
    const response = await fetch("https://nbatopshot.com/moment/hustlewestbrook+73c2eb70-8ff3-4719-99e9-f57edc4196df");
    const text = response.text();
    const dom = new JSDOM(text);
    console.log(response);
}

export default {
  scrape
};