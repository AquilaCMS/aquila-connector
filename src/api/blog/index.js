const axios = require('../../lib/AxiosInstance');
const utils = require('../../lib/utils');

// GET blog list
const getBlogList = async (PostBody = {}, lang = 'fr') => {
    try {
        const response = await axios.post('v2/site/news', {
            lang,
            PostBody
        });
        return response.data.datas;
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message);
    }
};

// GET blog article
const getBlogArticle = async (PostBody = {}, preview = undefined, lang = 'fr') => {
    try {
        const response = await axios.post(`v2/site/new${preview ? `?preview=${preview}` : ''}`, {
            lang,
            PostBody
        });
        return response.data;
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message);
    }
};

module.exports = {
    getBlogList,
    getBlogArticle
}