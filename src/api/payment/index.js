const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

/**
 * Get payment methods
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object : { count: Number, datas: Array }
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getPaymentMethods = async ({locale ='fr'}, options = {}) => {
    const _defaultPostBody = {
        structure: { component_template_front: 1, makePayment: 1, details: 1 },
        limit    : 100
    };

    try {
        return await customFetch.post('v2/paymentMethods', { lang: locale, PostBody: _defaultPostBody }, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Make a payment
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.orderNumber - The order number
 * @param {String} body.paymentCode - The payment method code
 * @param {String} body.returnURL - The return URL
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns A string with the post form to submit
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const makePayment = async ({orderNumber, paymentCode, returnURL, locale ='fr'}, options = {}) => {
    try {
        return await customFetch.post(`v2/payment/order/${orderNumber}/${locale}`, {
            paymentMethod: paymentCode,
            returnURL
        }, options);
    } catch (err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

module.exports = {
    getPaymentMethods,
    makePayment
}