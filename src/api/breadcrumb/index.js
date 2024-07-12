const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

/**
 * Get breadcrumb from url
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.url - The url of the page
 * @param {Object} options - Fetch options (default: {})
 * @returns An array with the breadcrumb data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getBreadcrumb = async ({url}, options = {}) => {
    try {
        return await customFetch.post('v2/getBreadcrumb', { url: utils.simplifyPath(url) }, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

module.exports = {
    getBreadcrumb
}