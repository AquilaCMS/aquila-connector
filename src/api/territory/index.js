const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

// GET territories list
const getTerritories = async (postBody = {}) => {
    const _defaultPostBody = {
        PostBody: {
            limit   : 9999
        }
    };
    const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
    try {
        return await customFetch.post('v2/territories', _postBody);
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

module.exports = {
    getTerritories
}