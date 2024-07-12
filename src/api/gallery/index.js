const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

/**
 * Get items of a gallery
 * @async
 * @param {Object} params - URL params
 * @param {String} params.code - The code of the gallery
 * @param {Object} options - Fetch options (default: {})
 * @returns An object : { count: Number, datas: Array, maxColumnNumber: Number }
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getItemsGallery = async ({code}, options = {}) => {
    try {
        return await customFetch.get(`v2/gallery/${code}/items`, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

module.exports = {
    getItemsGallery
}