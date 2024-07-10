const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

const setContact = async (mode, formdata) => {
    try {
        return await customFetch.post(`v2/contact/${mode}`, formdata, { headers: { 'Content-Type': 'multipart/form-data' } });
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

module.exports = {
    setContact
}