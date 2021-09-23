const axios = require('../../lib/AxiosInstance');

const getPageStatic = async (slug, preview = undefined, lang = 'fr') => {
    const postBody = {
        lang,
        PostBody: {
            limit : 1,
            filter: {
                [`translation.${lang}.slug`]: slug
            }
        }
    };
    try {
        const response = await axios.post(`v2/static${preview ? `?preview=${preview}` : ''}`, postBody);
        return response.data;
    } catch (err) {
        console.error('Error StaticProvider getPageStatic => ', err);
        return null;
    }
};

const getStatics = async (PostBody = { filter: {}, limit: 10, structure: { content: 1 } }) => {
    try {
        const response = await axios.post('v2/statics', { PostBody });
        return response.data;
    } catch (err) {
        console.error('Error StaticProvider getStatics => ', err);
        return { datas: [], count: 0 };
    }
};

module.exports = {
    getPageStatic,
    getStatics
}