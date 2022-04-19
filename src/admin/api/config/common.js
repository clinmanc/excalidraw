import {mockURL} from "./config";

const Frisbee = require('frisbee');

// create a new instance of Frisbee
export const URL_API = new Frisbee({
  baseURI: mockURL, // optional
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export function parseQueryString(url) {
  const obj = {}
  if (url.indexOf('?') !== -1) {
    const str = url.split('?')[1]
    const strs = str.split('&')
    strs.map((item, i) => {
      const arr = strs[i].split('=')
      /* eslint-disable */
      obj[arr[0]] = arr[1]
    })
  }
  return obj
}
