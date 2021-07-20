const axios = require('../../lib/AxiosInstance');

const getMenu = async (categoryCode, lang = 'fr') => {
    try {
        const response = await axios.post(`v2/component/ns-menu/${categoryCode}`, { lang });
        return response.data;
    } catch(err) {
        console.error('menu.getMenu');
        return { datas: {} };
    }
};

module.exports = {
    getMenu
}