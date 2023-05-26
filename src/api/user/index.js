const axios = require('../../lib/AxiosInstance');
const utils = require('../../lib/utils');

const getUser = async (userId, postBody = {}) => {
    const _defaultPostBody = {
        PostBody: {
            structure: {
                addresses       : 1,
                billing_address : 1,
                delivery_address: 1,
                phone_mobile    : 1
            }
        }
    };
    const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
    try {
        const response = await axios.post(`v2/user/${userId}`, _postBody);
        return response.data;
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message, err?.response?.data?.code);
    }
};

const setUser = async (user) => {
    try {
        const response = await axios.put('v2/user', user);
        return response.data;
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message, err?.response?.data?.code);
    }
};

const setAddressesUser = async (userId, billingAddress, deliveryAddress, addresses) => {
    try {
        const response = await axios.put('v2/user/addresses', {
            userId,
            billing_address : billingAddress,
            delivery_address: deliveryAddress,
            addresses
        });
        return response.data;
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message, err?.response?.data?.code);
    }
};

const resetPassword = async (token, password = undefined) => {
    try {
        const response = await axios.post('v2/user/resetpassword', { token, password });
        return response.data;
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message, err?.response?.data?.code);
    }
};

const validateAccount = async (token) => {
    try {
        const response = await axios.post('v2/user/active/account', { activateAccountToken: token });
        return response.data;
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message, err?.response?.data?.code);
    }
};

const dataUserExport = async (userId) => {
    try {
        return axios({
            url         : `v2/rgpd/export/${userId}`,
            method      : 'GET',
            responseType: 'blob'
        });
    } catch(err) {
        const b   = new Blob([err.response.data]);
        const fr  = new FileReader();
        fr.onload = function () {
            const result = JSON.parse(this.result);
            throw new utils.ConnectorError(result.status, result.message);
        };
        fr.readAsText(b);
    }
};

const anonymizeUser = async (userId) => {
    try {
        await axios.get(`v2/rgpd/anonymizeUser/${userId}`);
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message, err?.response?.data?.code);
    }
};

const deleteUser = async (userId) => {
    try {
        await axios.delete(`v2/rgpd/deleteUser/${userId}`);
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message, err?.response?.data?.code);
    }
};

module.exports = {
    getUser,
    setUser,
    setAddressesUser,
    resetPassword,
    validateAccount,
    dataUserExport,
    anonymizeUser,
    deleteUser
}