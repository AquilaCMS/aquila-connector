const customFetch = require('../../lib/FetchInstance');
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
        return await customFetch.post(`v2/user/${userId}`, _postBody);
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

const setUser = async (user) => {
    try {
        return await customFetch.put('v2/user', user);
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

const setAddressesUser = async (userId, billingAddress, deliveryAddress, addresses) => {
    try {
        return await customFetch.put('v2/user/addresses', {
            userId,
            billing_address : billingAddress,
            delivery_address: deliveryAddress,
            addresses
        });
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

const resetPassword = async (token, password = undefined) => {
    try {
        return await customFetch.post('v2/user/resetpassword', { token, password });
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

const validateAccount = async (token) => {
    try {
        return await customFetch.post('v2/user/active/account', { activateAccountToken: token });
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

const dataUserExport = async (userId) => {
    try {
        return await customFetch.get(`v2/rgpd/export/${userId}`, {}, 'blob');
    } catch(err) {
        /*const b   = new Blob([err.response.data]);
        const fr  = new FileReader();
        fr.onload = function () {
            const result = JSON.parse(this.result);
            throw new utils.ConnectorError(result.status, result.message);
        };
        fr.readAsText(b);*/
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

const anonymizeUser = async (userId) => {
    try {
        return await customFetch.get(`v2/rgpd/anonymizeUser/${userId}`);
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

const deleteUser = async (userId) => {
    try {
        return await customFetch.delete(`v2/rgpd/deleteUser/${userId}`);
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
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