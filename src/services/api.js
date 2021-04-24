const axios = require('axios');

const api = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
});

module.exports = api;