import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.convertkr.com',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  },
});

export default instance;
