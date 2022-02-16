const axios = require('axios');
const cookie = require('cookie');

const options = {
    // .. where we make our configurations
    baseURL: process.env.NEXT_PUBLIC_API_URL,
};

// Next we make an 'instance' of it
const instance = axios.create(options);

instance.interceptors.request.use(function (config) {
    if (typeof window !== 'undefined') {
        // Set JWT
        const jwt = cookie.parse(document.cookie).jwt;
        if (jwt) {
            config.headers.Authorization = jwt;
        } else {
            delete config.headers.Authorization;
        }

        // Set lang
        const lang = cookie.parse(document.cookie).lang;
        if (lang) {
            config.headers.lang = lang;
        }
    }
    return config;
});

// Set token 
const setTokenAxios = (cookies) => {
    const jwt = cookie.parse(cookies).jwt;
    if (jwt) {
        axios.defaults.headers.common['Authorization'] = jwt;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

module.exports = {
    instance,
    setTokenAxios
}