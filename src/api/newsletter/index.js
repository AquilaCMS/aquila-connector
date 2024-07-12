const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

/**
 * Get newsletters of the user
 * @async
 * @param {Object} params - URL params
 * @param {String} params.email - The email of user
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the newsletter data of the user
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getNewsletters = async ({email}, options = {}) => {
    try {
        return await customFetch.get(`v2/newsletter/${email}`, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Set newsletter of the user
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.email - The email of user
 * @param {String} body.name - The name of the newsletter (default: DefaultNewsletter)
 * @param {Boolean} body.optin - The optin of the newsletter
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the newsletter data of the user
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const setNewsletter = async ({email, name = 'DefaultNewsletter', optin}, options = {}) => {
    try {
        return await customFetch.post(`v2/newsletter/${email}`, { name, optin }, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

module.exports = {
    getNewsletters,
    setNewsletter
}