const axios = require('../../lib/AxiosInstance');
const utils = require('../../lib/utils');

// GET breadcrumb from URL
const getBreadcrumb = async (url) => {
    try {
        const response = await axios.post('v2/getBreadcrumb', {
            url: utils.simplifyPath(url)
        });
        return response.data;
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message);
    }
};

module.exports = {
    getBreadcrumb
}