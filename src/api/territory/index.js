const axios = require('../../lib/AxiosInstance');
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
        const response = await axios.post('v2/territories', _postBody);
        return response.data;
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message, err?.response?.data?.code);
    }
};

module.exports = {
    getTerritories
}