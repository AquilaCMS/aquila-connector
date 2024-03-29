const axios = require('../../lib/AxiosInstance');
const utils = require('../../lib/utils');

// GET orders
const getOrders = async (lang = 'fr', postBody = {}) => {
    try {
        const _defaultPostBody = {
            lang,
            PostBody: { sort: { createdAt: -1 }, limit: 100 }
        };
        const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
        const response = await axios.post('v2/orders', _postBody);
        return response.data;
    } catch (err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message, err?.response?.data?.code);
    }
};

// GET order by ID
const getOrderById = async (orderId, lang = 'fr') => {
    try {
        const response = await axios.post(`v2/order/${orderId}`, {
            lang,
            PostBody: {}
        });
        return response.data;
    } catch (err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message, err?.response?.data?.code);
    }
};

// GET order bill
const downloadbillOrder = async (billId) => {
    try {
        return axios({
            url         : 'v2/bills/generatePDF/',
            method      : 'POST',
            responseType: 'blob',
            data        : {
                PostBody: {
                    filter: { _id: billId }
                }
            }
        });
    } catch (err) {
        const b   = new Blob([err.response.data]);
        const fr  = new FileReader();
        fr.onload = function () {
            const result = JSON.parse(this.result);
            throw new utils.ConnectorError(result.status, result.message);
        };
        fr.readAsText(b);
    }
};

// Ask cancel order
const askCancelOrder = async (orderId) => {
    try {
        const res = await axios.put(`v2/order/requestCancel/${orderId}`);
        return res.data;
    } catch (err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message, err?.response?.data?.code);
    }
};

module.exports = {
    getOrders,
    getOrderById,
    downloadbillOrder,
    askCancelOrder
}