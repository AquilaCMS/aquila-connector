const axios = require('../../lib/AxiosInstance');

const TMPlang = 'fr';

const getMenu = async (code_category) => {
    const postBody = {
        'lang': TMPlang
    };

    try {
        const response = await axios.post(`v2/component/ns-menu/${code_category}`, postBody);
        return response.data;
    } catch(err) {
        console.error('menu.getMenu');
        return { datas: {} };
    }
};

module.exports = {
    getMenu
}