const axios = require('../../lib/AxiosInstance');

// GET component data
const getComponent = async (tag, nsCode, lang = 'fr') => {
    try {
        const response = await axios.post(`v2/component/${tag}/${nsCode}`, { lang });
        return response.data;
    } catch(err) {
        console.error(`component.getComponent [${tag} code: ${nsCode}]`);
        throw new Error(err?.response?.data?.message);
    }
};

module.exports = {
    getComponent
}