const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

// GET items gallery
const getItemsGallery = async (code) => {
    try {
        return await customFetch.get(`v2/gallery/${code}/items`);
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

module.exports = {
    getItemsGallery
}