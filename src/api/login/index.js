const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

/**
 * Authenticate the user
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.username - The username of the user
 * @param {String} body.password - The password of the user
 * @param {Object} options - Fetch options (default: {})
 * @returns An object : { code: String, data: String }
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const auth = async ({email, password}, options = {}) => {
    try {
        return await customFetch.post('v2/auth/login/', { username: email, password }, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Check if the user is authenticated
 * @async
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the user data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const isAuth = async (options = {}) => {
    try {
        return await customFetch.get('v2/auth/isauthenticated', options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Send a mail to reset the password
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.email - The email of the user
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object : { code: String, data: String }
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const sendMailResetPassword = async ({email, locale = 'fr'}, options = {}) => {
    try {
        return await customFetch.post(`v2/user/resetpassword/${locale}`, { email }, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Logout the user
 * @async
 * @param {Object} options - Fetch options (default: {})
 * @returns 204 No Content
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const logout = async (options = {}) => {
    try {
        return await customFetch.get(`v2/auth/logout`, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

module.exports = {
    auth,
    isAuth,
    sendMailResetPassword,
    logout
}