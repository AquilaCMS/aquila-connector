const axios = require('../../lib/AxiosInstance');

const getBlockCMS = async (code, lang = 'fr') => {
    try {
        const response = await axios.post(`v2/component/ns-cms/${code}`, { lang });
        return response.data;
    } catch(err) {
        console.error(`Blockcms.getBlockCMS [${code}] [${lang}]`);
        return {};
    }
};

const getBlocksCMS = async (codes, lang = 'fr', postBody = {}) => {

    let body = {};

    if (codes.length > 0) {
        body = {   
            lang,         
            PostBody: {
                filter   : { code: { $in: codes } },
                limit    : codes.length,
                structure: { translation: 1 }
            } };
    }
    else {
        body = {
            lang,
            PostBody: postBody
        };
    }

    try {
        const response = await axios.post('v2/cmsBlocks', body);
        return response.data?.datas; // TODO Si y'en a pas ?
    } catch(err) {
        console.error('Blockcms.getBlocksCMS');
        return { datas: [], count: 0 };
    }
};

module.exports = {
    getBlockCMS,
    getBlocksCMS
}