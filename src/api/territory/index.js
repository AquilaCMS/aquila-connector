const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

/**
 * Get territories list
 * @async
 * @param {Object} body - The body of the request
 * @param {Object} body.postBody - The post body of the request (default: {})
 * @param {Object} options - Fetch options (default: {})
 * @returns An object : { count: Number, datas: Array }
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getTerritories = async ({postBody = {}} = {}, options = {}) => {
    const _defaultPostBody = {
        PostBody: {
            limit   : 9999
        }
    };
    const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
    try {
        return await customFetch.post('v2/territories', _postBody, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

module.exports = {
    getTerritories
}