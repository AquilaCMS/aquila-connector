const axios = require('../../lib/AxiosInstance');

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
        console.error('payment.getPaymentMethods');
        throw new Error(err?.response?.data?.message);
    }
};

// Deferred payment
const deferredPayment = async (orderNumber, paymentCode, lang = 'fr') => {
    try {
        await axios.post(`v2/order/pay/${orderNumber}/${lang}`, {
            paymentMethod: paymentCode
        });
    } catch (err) {
        console.error('payment.deferredPayment');
        throw new Error(err?.response?.data?.message);
    }
};

module.exports = {
    getPaymentMethods,
    deferredPayment
}