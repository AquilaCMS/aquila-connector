const customFetch = require('../../lib/FetchInstance');

const getSiteInfo = async (lang = 'fr') => {
    try {
        const themeConfig = await customFetch.post('v2/themeConfig', { lang, PostBody: {} });
        const config = await customFetch.post('v2/config', { PostBody: { structure: { 'environment.siteName': 1, 'environment.displayingReviews': 1 } } });
        const langs = await customFetch.post('v2/languages', { PostBody: { limit: 99 } });
        return { themeConfig: { ...themeConfig.config }, ...config, langs: langs.datas };
    } catch(err) {
        return { datas: {} };
    }
};

module.exports = {
    getSiteInfo
}