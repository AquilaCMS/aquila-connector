const cookie = require('cookie');
const axios = require('./AxiosInstance');

// Merge of 2 objects
const deepMergeObjects = (target, source) => {
    // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object && key in target) Object.assign(source[key], deepMergeObjects(target[key], source[key]));
    }
  
    // Join `target` and modified `source`
    Object.assign(target || {}, source);
    return target;
};

const simplifyPath = (path) => {
    return path.split('?')[0].split('/');
};

// Set token 
const setTokenAxios = (cookies) => {
    const jwt = cookie.parse(cookies).jwt;
    if (jwt) {
        axios.defaults.headers.common['Authorization'] = jwt;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

class ConnectorError extends Error {
    constructor(code, message = '') {
        super(message);
        this.name = 'ConnectorError';
        this.code = code;
    }
}

module.exports = {
    deepMergeObjects,
    simplifyPath,
    setTokenAxios,
    ConnectorError
}