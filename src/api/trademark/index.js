const axios = require('../../lib/AxiosInstance');
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
        const response = await axios.post('v2/trademarks', _postBody);
        return response.data;
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message, err?.response?.data?.code);
    }
};

module.exports = {
    getTrademarks
}