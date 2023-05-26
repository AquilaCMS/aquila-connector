const axios = require('../../lib/AxiosInstance');
const utils = require('../../lib/utils');

// GET items gallery
const getItemsGallery = async (code) => {
    try {
        const response = await axios.get(`v2/gallery/${code}/items`);
        return response.data;
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message, err?.response?.data?.code);
    }
};

module.exports = {
    getItemsGallery
}