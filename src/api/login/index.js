const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

const auth = async (username, password) => {
    try {
        return await customFetch.post('v2/auth/login/', { username, password });
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

const isAuth = async () => {
    try {
        return await customFetch.get('v2/auth/isauthenticated');
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

const sendMailResetPassword = async (email, lang = 'fr') => {
    try {
        return await customFetch.post(`v2/user/resetpassword/${lang}`, { email });
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

const logout = async () => {
    try {
        return await customFetch.get(`v2/auth/logout`);
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

module.exports = {
    auth,
    isAuth,
    sendMailResetPassword,
    logout
}