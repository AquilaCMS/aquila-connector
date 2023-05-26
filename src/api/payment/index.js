const axios = require('../../lib/AxiosInstance');
const utils = require('../../lib/utils');

// GET payment methods
const getPaymentMethods = async (lang = 'fr') => {
    const PostBody = {
        structure: { component_template_front: 1, makePayment: 1, details: 1 },
        limit    : 100
    };

    try {
        const response = await axios.post('v2/paymentMethods', {
            lang,
            PostBody
        });
        return response.data.datas;
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message, err?.response?.data?.code);
    }
};

// Make payment
const makePayment = async (orderNumber, paymentCode, returnURL, lang = 'fr') => {
    try {
        const response = await axios.post(`v2/payment/order/${orderNumber}/${lang}`, {
            paymentMethod: paymentCode,
            returnURL
        });
        return response.data;
    } catch (err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message, err?.response?.data?.code);
    }
};

module.exports = {
    getPaymentMethods,
    makePayment
}