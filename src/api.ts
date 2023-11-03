import axios from 'axios';

const baseURL = 'https://6082e3545dbd2c001757abf5.mockapi.io/qtim-test-work/posts/';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;