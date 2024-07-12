const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

/**
 * Get static page data
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.slug - The slug of the page
 * @param {String} body.preview - ID of preview (default: undefined)
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the page data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getStaticPage = async ({slug, preview = undefined, locale ='fr'}, options = {}) => {
    const _defaultPostBody = {
        limit : 1,
        filter: {
            [`translation.${locale}.slug`]: slug
        }
    };
    try {
        return await customFetch.post(`v2/static${preview ? `?preview=${preview}` : ''}`, {
            lang: locale,
            PostBody: _defaultPostBody
        }, options);
    } catch (err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

module.exports = {
    getStaticPage
}