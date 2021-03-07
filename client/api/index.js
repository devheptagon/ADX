// const axios = require('axios');

const BASE_URL = 'http://127.0.0.1:5000';
// const BASE_URL = 'http://localhost:5000';
// const BASE_URL = 'http://0.0.0.0:5000';
// const BASE_URL = 'https://10.0.2.2:5000';

async function request(url, params, method = 'GET') {

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (params) {
    if (method === 'GET') {
      url += '?' + objectToQueryString(params);
    } else {
      options.body = JSON.stringify(params);
    }
  }

  let result;
  try {
    const response = await fetch(BASE_URL + url, options);
    result = await response.json();
  } catch (error) {
    console.log('error: ', error);
    result = error;
  }

  // if (!response.statusText.startsWith('2')) {
  //   return generateErrorResponse('The server responded with an unexpected status. Status : ' + response.status);
  // }


  return result;
}

function objectToQueryString(obj) {
  return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}

// function generateErrorResponse(message) {
//   return {
//     status : 'error',
//     message
//   };
// }

function get(url, params) {
  return request(url, params);
}

function create(url, params) {
  return request(url, params, 'POST');
}

function update(url, params) {
  return request(url, params, 'PATCH');
}

function remove(url, params) {
  return request(url, params, 'DELETE');
}

export default {
  get,
  create,
  update,
  remove
};