const axios = require('../../lib/AxiosInstance');

const auth = async (username, password) => {
    try {
        const response = await axios.post('v2/auth/login/', { username, password });
        return response.data;
    } catch(err) {
        console.error('login.auth');
        throw new Error(err?.response?.data?.message);
    }
};

const sendMailResetPassword = async (email, lang = 'fr') => {
    try {
        const response = await axios.post(`v2/user/resetpassword/${lang}`, { email });
        return response.data;
    } catch(err) {
        console.error('login.resetPassword');
        throw new Error(err?.response?.data?.message);
    }
};

module.exports = {
    auth,
    sendMailResetPassword
}