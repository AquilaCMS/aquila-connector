const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

// GET blog list
const getBlogList = async (PostBody = {}, lang = 'fr') => {
    try {
        return await customFetch.post('v2/site/news', {
            lang,
            PostBody
        });
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

// GET blog article
const getBlogArticle = async (PostBody = {}, preview = undefined, lang = 'fr') => {
    try {
        return await customFetch.post(`v2/site/new${preview ? `?preview=${preview}` : ''}`, {
            lang,
            PostBody
        });
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

module.exports = {
    getBlogList,
    getBlogArticle
}