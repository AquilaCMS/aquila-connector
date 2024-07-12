const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

/**
 * Get site info
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object : { themeConfig: Object, config: Object, langs: Array }
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getSiteInfo = async ({locale ='fr'}, options = {}) => {
    try {
        const themeConfig = await customFetch.post('v2/themeConfig', { lang: locale, PostBody: {} }, options);
        const config = await customFetch.post('v2/config', { PostBody: { structure: { 'environment.siteName': 1, 'environment.displayingReviews': 1 } } }, options);
        const langs = await customFetch.post('v2/languages', { PostBody: { limit: 99 } }, options);
        return { themeConfig: { ...themeConfig.config }, ...config, langs: langs.datas };
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

module.exports = {
    getSiteInfo
}