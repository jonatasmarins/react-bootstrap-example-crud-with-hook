import axios from 'axios';

//Define a URL base da origem para consumo do servico
export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_API,
  headers: {
    'Content-type': 'application/json',
  },
});