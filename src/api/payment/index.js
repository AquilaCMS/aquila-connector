const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

// GET payment methods
const getPaymentMethods = async (lang = 'fr') => {
    const PostBody = {
        structure: { component_template_front: 1, makePayment: 1, details: 1 },
        limit    : 100
    };

    try {
        return await customFetch.post('v2/paymentMethods', { lang, PostBody });
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

// Make payment
const makePayment = async (orderNumber, paymentCode, returnURL, lang = 'fr') => {
    try {
        return await customFetch.post(`v2/payment/order/${orderNumber}/${lang}`, {
            paymentMethod: paymentCode,
            returnURL
        });
    } catch (err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

module.exports = {
    getPaymentMethods,
    makePayment
}