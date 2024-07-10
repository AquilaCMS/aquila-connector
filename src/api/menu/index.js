const customFetch = require('../../lib/FetchInstance');

const getMenu = async (categoryCode, lang = 'fr', levels = undefined) => {
    try {
        return await customFetch.post(`v2/component/ns-menu/${categoryCode}`, { lang, levels });
    } catch(err) {
        console.error('menu.getMenu');
        return { datas: {} };
    }
};

module.exports = {
    getMenu
}