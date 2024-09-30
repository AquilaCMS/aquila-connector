const cookie = require('cookie');
const utils = require('./utils');

class FetchInstance {
    constructor() {
        const baseURL = process.env.API_URL;
        if (!baseURL) {
            throw new Error('[Aquila Connector] error : API_URL is not defined in .env file');
        }
        // Check if the URL ends with a slash
        this.baseUrl = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    }
  
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}/${endpoint}`;
        
        // Set up headers
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        // Avoid setting 'Content-Type' header for FormData
        if (options.body instanceof FormData) {
            delete headers['Content-Type'];
        } else {
            options.body = JSON.stringify(options.body);
        }

        // If the code is running in the browser, add the JWT token to the headers
        if (typeof window !== 'undefined') {
            // Retrieve the JWT token from the cookies
            const token = cookie.parse(document.cookie).jwt;

            // Retreive the locale from the cookies
            const locale = cookie.parse(document.cookie).lang;

            // If token exists, add it to the headers
            if (token) {
                headers['Authorization'] = token;
            }

            // If locale exists, add it to the headers
            if (locale) {
                headers['lang'] = locale;
            }
        }
    
        // Merge custom headers with options
        const fetchOptions = {
            ...options,
            headers,
        };
    
        try {
            const response = await fetch(url, fetchOptions);
            if (response.ok) {
                // If the response is empty, return null
                if (response.status === 204) {
                    return null;
                }

                // Handle different response types
                const contentType = response.headers.get('content-type');
                let parsedResponse;
                switch (true) {
                    case contentType.includes('application/json'):
                        parsedResponse = await response.json();
                        break;
                    case contentType.includes('text/html'):
                        parsedResponse = await response.text();
                        break;
                    case contentType.includes('application/pdf'):
                    case contentType.includes('application/blob'):
                        parsedResponse = await response.blob();
                        break;
                    case contentType.includes('text/plain'):
                        parsedResponse = await response.text();
                        break;
                    case contentType.includes('application/octet-stream'):
                        parsedResponse = await response.arrayBuffer();
                        break;
                    case contentType.includes('multipart/form-data'):
                        parsedResponse = await response.formData();
                        break;
                    default:
                        throw new Error(`[Aquila Connector] fetch error on "${endpoint}" | Unsupported response type: ${contentType}`);
                }

                return parsedResponse;
            }

            // Handle HTTP errors
            //const tempParsedResponse = await response.json();
            throw new Error(`[Aquila Connector] fetch error on "${endpoint}" | Something went wrong : ${response.status}`);
        } catch (error) {
            console.error(`[Aquila Connector] fetch error on "${endpoint}" |`, error);
            throw new utils.ConnectorError(error.code, error?.message, error?.messageCode);
        }
    }
    
    get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    }
    
    post(endpoint, body, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body
        });
    }
    
    put(endpoint, body, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body
        });
    }
    
    delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }
}

module.exports = new FetchInstance();