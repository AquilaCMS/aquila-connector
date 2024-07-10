const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

const getNewsletter = async (email) => {
    try {
        return await customFetch.get(`v2/newsletter/${email}`);
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

const setNewsletter = async (email, name = 'DefaultNewsletter', optin) => {
    const postBody = {
        name,
        optin
    };

    try {
        return await customFetch.post(`v2/newsletter/${email}`, postBody);
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

module.exports = {
    getNewsletter,
    setNewsletter
}