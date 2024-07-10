const customFetch = require('../../lib/FetchInstance');

const getBlockCMS = async (code, lang = 'fr') => {
    try {
        return await customFetch.post(`v2/component/ns-cms/${code}`, { lang });
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
        return await customFetch.post('v2/cmsBlocks', body);
    } catch(err) {
        console.error('Blockcms.getBlocksCMS');
        return { datas: [], count: 0 };
    }
};

module.exports = {
    getBlockCMS,
    getBlocksCMS
}