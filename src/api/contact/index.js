const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

/**
 * Send contact form
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.mode - The mode of the form ("store" | "store+send" | "send")
 * @param {Object} body.formdata - The form data
 * @param {Object} options - Fetch options (default: {})
 * @returns Storing contact data or the string 'ok' if only sending the contact.
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const setContact = async ({mode, formdata}, options = {}) => {
    try {
        return await customFetch.post(`v2/contact/${mode}`, formdata, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

module.exports = {
    setContact
}