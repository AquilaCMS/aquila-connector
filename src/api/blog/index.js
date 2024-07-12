const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

/**
 * Get blog list
 * @async
 * @param {Object} body - The body of the request
 * @param {Object} body.postBody - The post body of the request (default: {})
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object : { count: Number, datas: Array }
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getBlogList = async ({postBody = {}, locale ='fr'}, options = {}) => {
    try {
        return await customFetch.post('v2/site/news', { lang: locale, PostBody: postBody }, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Get an article from the blog
 * @async
 * @param {Object} body - The body of the request
 * @param {Object} body.postBody - The post body of the request (default: {})
 * @param {String} body.preview - ID of preview (default: undefined)
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the article data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getBlogArticle = async ({postBody = {}, preview = undefined, locale ='fr'}, options = {}) => {
    try {
        return await customFetch.post(`v2/site/new${preview ? `?preview=${preview}` : ''}`, { lang: locale, PostBody: postBody }, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

module.exports = {
    getBlogList,
    getBlogArticle
}