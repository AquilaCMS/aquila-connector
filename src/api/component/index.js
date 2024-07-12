const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

/**
 * Get component data
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.tag - The tag of the component
 * @param {String} body.nsCode - The code of the item
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the item component data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getComponent = async ({tag, nsCode, locale ='fr'}, options = {}) => {
    try {
        return await customFetch.post(`v2/component/${tag}/${nsCode}`, { lang: locale }, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

module.exports = {
    getComponent
}