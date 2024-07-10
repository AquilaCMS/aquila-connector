const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

// GET trademarks list
const getTrademarks = async (postBody = {}, lang = 'fr') => {
    const _defaultPostBody = {
        lang,
        PostBody: {
            structure: {
                code: 1,
                logo: 1,
                translation: 1
            },
            limit   : 9999
        }
    };
    const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
    try {
        return await customFetch.post('v2/trademarks', _postBody);
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

module.exports = {
    getTrademarks
}