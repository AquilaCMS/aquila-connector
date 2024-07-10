const customFetch = require('../../lib/FetchInstance');
const structure = require('./structure');
const utils = require('../../lib/utils');

const getCategories = async (lang = 'fr', postBody = {}) => {
    try {
        // Default Postbody for this request
        const _defaultPostBody = structure.defaultPostBody('', lang);
        // Merge default Postbody and the requested postbody
        const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
        // Call api with the good Postbody
        return await customFetch.post('v2/categories', _postBody);
    } catch (err) {
        console.error('Error CategoryProvider getCategories => ', err);
        return { datas: [], count: 0 };
    }
};


const getCategory = async (lang = 'fr', postBody = {}) => {
    // Default Postbody for this request
    const _defaultPostBody = structure.defaultPostBody('', lang);
    // Merge default Postbody and the requested postbody
    const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
    // Call api with the good Postbody
    return await customFetch.post('v2/category', _postBody);
};

const getCategoryProducts = async (slug = '', id = '', lang = 'fr', postBody = {}) => {
    // Only the slug ? Need to get the id !
    if (slug) {
        const postBodyReq1 = { PostBody: { filter: { [`translation.${lang}.slug`]: slug }, limit: 10, page: 1, structure: { translation: 1 } } };
        const category     = await getCategory(lang, postBodyReq1);
        id                 = category._id;
    }

    if (id) {
        try {
            // Default Postbody for this request
            const _defaultPostBody = structure.defaultPostBody('getCategoryProducts', lang);
            // Merge default Postbody and the requested postbody
            const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
            // Call api with the good Postbody
            return await customFetch.post(`v2/products/category/${id}`, _postBody);
        } catch (err) {
            console.error('Error CategoryProvider getCategoryProducts => ', err);
            return { datas: [], count: 0 };
        }
    }
    throw new utils.ConnectorError(404, 'Category not found');
};

module.exports = {
    getCategories,
    getCategory,
    getCategoryProducts
}