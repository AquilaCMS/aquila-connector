const cookie = require('cookie');
const customFetch = require('./FetchInstance');
const { slugify } = require('aql-utils/theme');

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

// Generate URL image cache
const generateURLImageCache = (type, size = '256x256', id, fileName, extension) => {
    fileName = fileName || 'no-name';
    extension = extension || '.png';
    const matches = extension.match(/\/?([^/]*)\.(.*)$/);
    if (matches && matches[1] && matches[2]) {
        extension = `.${matches[2]}`;
    }
    return `/images/${type}/${size}/${id}/${slugify(fileName.toString())}${extension}`;
};

class ConnectorError extends Error {
    constructor(code, message = '', messageCode = '') {
        super(message);
        this.name = 'ConnectorError';
        this.code = code;
        this.messageCode = messageCode;
    }
}

module.exports = {
    deepMergeObjects,
    simplifyPath,
    slugify,
    setTokenAxios,
    generateURLImageCache,
    ConnectorError
}