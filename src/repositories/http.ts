import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export const AXIOS = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});