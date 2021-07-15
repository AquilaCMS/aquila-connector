const axios = require('../../lib/AxiosInstance');

const setContact = async (mode, formdata) => {
    try {
        const response = await axios.post(`v2/contact/${mode}`, formdata, { headers: { 'Content-Type': 'multipart/form-data' } });
        return response.data;
    } catch(err) {
        console.error('contact.setContact');
        throw new Error(err?.response?.data?.message);
    }
};

module.exports = {
    setContact
}