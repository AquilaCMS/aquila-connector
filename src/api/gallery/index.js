const axios = require('../../lib/AxiosInstance');

// GET items gallery
const getItemsGallery = async (code) => {
    try {
        const response = await axios.get(`v2/gallery/${code}/items`);
        return response.data;
    } catch(err) {
        console.error('gallery.getItemsGallery');
        throw new Error(err?.response?.data?.message);
    }
};

module.exports = {
    getItemsGallery
}