const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

// GET breadcrumb from URL
const getBreadcrumb = async (url) => {
    try {
        return await customFetch.post('v2/getBreadcrumb', {
            url: utils.simplifyPath(url)
        });
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

module.exports = {
    getBreadcrumb
}