const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

// GET orders
const getOrders = async (lang = 'fr', postBody = {}) => {
    try {
        const _defaultPostBody = {
            lang,
            PostBody: { sort: { createdAt: -1 }, limit: 100 }
        };
        const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
        return await customFetch.post('v2/orders', _postBody);
    } catch (err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

// GET order by ID
const getOrderById = async (orderId, lang = 'fr') => {
    try {
        return await customFetch.post(`v2/order/${orderId}`, { lang, PostBody: {} });
    } catch (err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

// GET order bill
const downloadbillOrder = async (billId) => {
    try {
        return await customFetch.post(`v2/bills/generatePDF/`, { PostBody: { filter: { _id: billId } } }, {}, 'blob');
    } catch (err) {
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

// Ask cancel order
const askCancelOrder = async (orderId) => {
    try {
        return await customFetch.put(`v2/order/requestCancel/${orderId}`);
    } catch (err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

module.exports = {
    getOrders,
    getOrderById,
    downloadbillOrder,
    askCancelOrder
}