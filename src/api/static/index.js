const customFetch = require('../../lib/FetchInstance');

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
        return await customFetch.post(`v2/static${preview ? `?preview=${preview}` : ''}`, postBody);
    } catch (err) {
        console.error('Error StaticProvider getPageStatic => ', err);
        return null;
    }
};

const getStatics = async (PostBody = { filter: {}, limit: 10, structure: { content: 1 } }) => {
    try {
        return await customFetch.post('v2/statics', { PostBody });
    } catch (err) {
        console.error('Error StaticProvider getStatics => ', err);
        return { datas: [], count: 0 };
    }
};

module.exports = {
    getPageStatic,
    getStatics
}