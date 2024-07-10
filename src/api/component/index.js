const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

// GET component data
const getComponent = async (tag, nsCode, lang = 'fr') => {
    try {
        return await customFetch.post(`v2/component/${tag}/${nsCode}`, { lang });
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

module.exports = {
    getComponent
}