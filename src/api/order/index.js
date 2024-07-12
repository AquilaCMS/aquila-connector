const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

/**
 * Get orders list of the user
 * @async
 * @param {Object} body - The body of the request
 * @param {Object} body.postBody - The body of the request (default: {})
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object : { count: Number, datas: Array }
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getOrders = async ({postBody = {}, locale ='fr'}, options = {}) => {
    try {
        const _defaultPostBody = { sort: { createdAt: -1 }, limit: 100 };
        const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
        return await customFetch.post('v2/orders', {
            lang: locale,
            PostBody: _postBody
        }, options);
    } catch (err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Get order by id
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.orderId - The ID of the order
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the order data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getOrderById = async ({orderId, locale ='fr'}, options = {}) => {
    try {
        return await customFetch.post(`v2/order/${orderId}`, { lang: locale, PostBody: {} }, options);
    } catch (err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Download bill order
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.billId - The ID of the bill
 * @param {Object} options - Fetch options (default: {})
 * @returns A blob with the bill data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const downloadbillOrder = async ({billId}, options = {}) => {
    try {
        return await customFetch.post(`v2/bills/generatePDF/`, { PostBody: { filter: { _id: billId } } }, options);
    } catch (err) {
        /*const b   = new Blob([err.response.data]);
        const fr  = new FileReader();
        fr.onload = function () {
            const result = JSON.parse(this.result);
            throw new utils.ConnectorError(result.status, result.message);
        };
        fr.readAsText(b);*/
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Ask for cancel order
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.orderId - The ID of the order
 * @param {Object} options - Fetch options (default: {})
 * @returns An object : { code: String }
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const askCancelOrder = async ({orderId}, options = {}) => {
    try {
        return await customFetch.put(`v2/order/requestCancel/${orderId}`, {}, options);
    } catch (err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

module.exports = {
    getOrders,
    getOrderById,
    downloadbillOrder,
    askCancelOrder
}