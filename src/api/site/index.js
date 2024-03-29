const axios = require('../../lib/AxiosInstance');

const getSiteInfo = async (lang = 'fr') => {
    try {
        const response    = await axios.post('v2/themeConfig', { lang, PostBody: {} });
        const themeConfig = response.data;

        const response2 = await axios.post('v2/config', { PostBody: { structure: { 'environment.siteName': 1, 'environment.displayingReviews': 1 } } });
        const config    = response2.data;

        const response3 = await axios.post('v2/languages', { PostBody: { limit: 99 } });
        const langs     = response3.data.datas;

        return { themeConfig: { ...themeConfig.config }, ...config, langs };
    } catch(e) {
        return { datas: {} };
    }
};

module.exports = {
    getSiteInfo
}