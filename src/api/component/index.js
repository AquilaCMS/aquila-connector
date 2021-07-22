const axios = require('../../lib/AxiosInstance');
const utils = require('../../lib/utils');

// GET component data
const getComponent = async (tag, nsCode, lang = 'fr') => {
    try {
        const response = await axios.post(`v2/component/${tag}/${nsCode}`, { lang });
        return response.data;
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message);
    }
};

module.exports = {
    getComponent
}