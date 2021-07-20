const axios = require('../../lib/AxiosInstance');

// GET blog list
const getBlogList = async (lang = 'fr') => {
    try {
        const response = await axios.post('v2/site/news', {
            lang,
            PostBody: {
                filter: {
                    [`translation.${lang}`]: { $exists: true }
                },
                sort : '-createdAt',
                page : 1,
                limit: 99
            }
        });
        return response.data.datas;
    } catch(err) {
        console.error('blog.getBlogList');
        throw new Error(err?.response?.data?.message);
    }
};

module.exports = {
    getBlogList
}