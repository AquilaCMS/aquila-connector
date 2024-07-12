const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

/**
 * Get the menu of a category
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.categoryCode - The code of the category
 * @param {Number} body.levels - The number of levels (default: 3)
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the menu data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getMenu = async ({categoryCode, levels = 3, locale ='fr'}, options = {}) => {
    try {
        return await customFetch.post(`v2/component/ns-menu/${categoryCode}`, { lang: locale, levels }, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

module.exports = {
    getMenu
}