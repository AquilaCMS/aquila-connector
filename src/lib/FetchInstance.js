const cookie = require('cookie');
const utils = require('./utils');

class FetchInstance {
    constructor() {
        const baseURL = process.env.NEXT_PUBLIC_API_URL;
        if (!baseURL) {
            throw new Error('Aquila Connector Error : NEXT_PUBLIC_API_URL is not defined in .env file');
        }
        // Check if the URL ends with a slash
        this.baseUrl = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    }
  
    async request(endpoint, options = {}, responseType = 'json') {
        const url = `${this.baseUrl}/${endpoint}`;
        
        // Retrieve the JWT token from the cookies
        const token = cookie.parse(document.cookie).jwt;

        // Retreive the lang from the cookies
        const lang = cookie.parse(document.cookie).lang;
        
        // Set up headers
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };
    
        // If token exists, add it to the headers
        if (token) {
            headers['Authorization'] = token;
        }

        // If lang exists, add it to the headers
        if (lang) {
            headers['lang'] = lang;
        }
    
        // Merge custom headers with options
        const fetchOptions = {
            ...options,
            headers,
        };
    
        try {
            const response = await fetch(url, fetchOptions);

            // Handle different response types
            let parsedResponse;
            switch(responseType) {
                case 'json':
                    parsedResponse = await response.json();
                    break;
                case 'blob':
                    parsedResponse = await response.blob();
                    break;
                case 'text':
                    parsedResponse = await response.text();
                    break;
                case 'arrayBuffer':
                    parsedResponse = await response.arrayBuffer();
                    break;
                case 'formData':
                    parsedResponse = await response.formData();
                    break;
                default:
                    throw new Error(`Unsupported response type: ${responseType}`);
            }

            return parsedResponse;
        } catch (error) {
            console.error('Fetch error:', error);
            throw new utils.Error(error);
        }
    }
    
    get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    }
    
    post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    
    put(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }
    
    delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }
}

module.exports = new FetchInstance();