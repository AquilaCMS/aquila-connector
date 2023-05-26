const axios = require('../../lib/AxiosInstance');
const utils = require('../../lib/utils');

const getNewsletter = async (email) => {
    try {
        const response = await axios.get(`v2/newsletter/${email}`);
        return response.data;
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message, err?.response?.data?.code);
    }
};

const setNewsletter = async (email, name = 'DefaultNewsletter', optin) => {
    const postBody = {
        name,
        optin
    };

    try {
        const response = await axios.post(`v2/newsletter/${email}`, postBody);
        return response.data;
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message, err?.response?.data?.code);
    }
};

module.exports = {
    getNewsletter,
    setNewsletter
}