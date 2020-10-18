import axios from 'axios';

// Local backend that needs to be started
export const localUrl = `http://localhost:3001/`;

// Backend on Google App Engine
export const severlessUrl = `https://cs3219-291409.et.r.appspot.com/`;

export default axios.create({ 
  // Swap between severlessUrl and localUrl depending on backend you want to connect to
  baseURL: severlessUrl 
});
