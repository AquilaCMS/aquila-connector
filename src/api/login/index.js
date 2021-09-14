const axios = require('../../lib/AxiosInstance');
const utils = require('../../lib/utils');

const auth = async (username, password) => {
    try {
        const response = await axios.post('v2/auth/login/', { username, password });
        return response.data;
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message);
    }
};

const sendMailResetPassword = async (email, lang = 'fr') => {
    try {
        const response = await axios.post(`v2/user/resetpassword/${lang}`, { email });
        return response.data;
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message);
    }
};

const logout = async () => {
    try {
        await axios.get(`v2/auth/logout`);
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message);
    }
};

module.exports = {
    auth,
    sendMailResetPassword,
    logout
}