const customFetch = require('../../lib/FetchInstance');
const structure = require('./structure');
const utils = require('../../lib/utils');

/**
 * Get categories
 * @async
 * @param {Object} body - The body of the request
 * @param {Object} body.postBody - The post body of the request (default: {})
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object : { count: Number, datas: Array }
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getCategories = async ({postBody = {}, locale ='fr'}, options = {}) => {
    try {
        // Default Postbody for this request
        const _defaultPostBody = structure.defaultPostBody();
        // Merge default Postbody and the requested postbody
        const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
        // Call api with the good Postbody
        return await customFetch.post('v2/categories', {
            lang: locale,
            withFilter: true,
            PostBody: _postBody
        }, options);
    } catch (err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Get category
 * @async
 * @param {Object} body - The body of the request
 * @param {Object} body.postBody - The post body of the request (default: {})
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the category data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getCategory = async ({postBody = {}, locale ='fr'}, options = {}) => {
    try {
        // Default Postbody for this request
        const _defaultPostBody = structure.defaultPostBody();
        // Merge default Postbody and the requested postbody
        const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
        // Call api with the good Postbody
        return await customFetch.post('v2/category', {
            lang: locale,
            withFilter: true,
            PostBody: _postBody
        }, options);
    } catch (err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Get category products
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.slug - The slug of the category (default: '')
 * @param {String} body.id - The id of the category (default: '')
 * @param {Object} body.postBody - The post body of the request (default: {})
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object : { count: Number, datas: Array }
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getCategoryProducts = async ({slug = '', id = '', postBody = {}, locale ='fr'}, options = {}) => {
    // Only the slug ? Need to get the id !
    if (slug) {
        try {
            const postBodyReq1 = { filter: { [`translation.${locale}.slug`]: slug }, limit: 10, page: 1, structure: { translation: 1 } };
            const category     = await getCategory({locale, postBody: postBodyReq1});
            id                 = category._id;
        } catch (err) {
            throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
        }
    }

    if (id) {
        try {
            // Default Postbody for this request
            const _defaultPostBody = structure.defaultPostBody('getCategoryProducts');
            // Merge default Postbody and the requested postbody
            const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
            // Call api with the good Postbody
            return await customFetch.post(`v2/products/category/${id}`, {
                lang: locale,
                PostBody: _postBody
            }, options);
        } catch (err) {
            throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
        }
    }
    throw new utils.ConnectorError(404, 'Category not found');
};

module.exports = {
    getCategories,
    getCategory,
    getCategoryProducts
}