const axios = require('../../lib/AxiosInstance');
const utils = require('../../lib/utils');

const setContact = async (mode, formdata) => {
    try {
        const response = await axios.post(`v2/contact/${mode}`, formdata, { headers: { 'Content-Type': 'multipart/form-data' } });
        return response.data;
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message);
    }
};

module.exports = {
    setContact
}