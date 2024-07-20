const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

/**
 * Get CMS block by code
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.code - The code of the CMS block
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the CMS block data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getCMSBlock = async ({ code, locale ='fr' }, options = {}) => {
    try {
        return await customFetch.post(`v2/component/ns-cms/${code}`, { lang: locale }, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Get CMS blocks by codes
 * @async
 * @param {Object} body - The body of the request
 * @param {Array} body.codes - The codes of the CMS blocks
 * @param {Object} body.postBody - The post body of the request (default: {})
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An array with the CMS blocks data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getCMSBlocks = async ({codes, postBody = {}, locale = 'fr'}, options = {}) => {
    let body = {};

    if (codes.length > 0) {
        body = {   
            lang: locale,         
            PostBody: {
                filter   : { code: { $in: codes } },
                limit    : codes.length,
                structure: { translation: 1 }
            } };
    }
    else {
        body = {
            lang: locale,
            PostBody: postBody
        };
    }

    try {
        return await customFetch.post('v2/cmsBlocks', body, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

module.exports = {
    getCMSBlock,
    getCMSBlocks
}