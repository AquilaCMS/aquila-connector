const axios = require('../../lib/AxiosInstance');
const utils = require('../../lib/utils');

const getProduct = async (postBody = {}, preview = undefined, lang = 'fr') => {
    const _defaultPostBody = {
        lang,
        countviews : true,
        withFilters: false,
        PostBody   : {
            structure: {
                code           : 1,
                attributes     : 1,
                canonical      : 1,
                associated_prds: 1,
                bundle_sections: 1,
                stock          : 1
            },
            populate: [
                'associated_prds',
                'bundle_sections.products.id'
            ],
            limit: 1
        }
    };
    const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
    try {
        const response = await axios.post(`v2/product${preview ? `?preview=${preview}` : ''}`, _postBody);
        return response.data;
    } catch(e) {
        console.error('product.getProduct');
        return null;
    }

    // Non-explicite "return null" needed
};

const getProductById = async (id, lang = 'fr') => {
    const postBody = {
        lang,
        countviews : true,
        withFilters: false,
        PostBody   : {
            structure: {
                code           : 1,
                attributes     : 1,
                bundle_sections: 1,
                canonical      : 1
            },
            populate: [
                'bundle_sections.products.id'
            ]
        }
    };

    try {
        const response = await axios.post(`v2/product/${id}`, postBody);
        return response.data;
    } catch(e) {
        console.error('product.getProductById');
        return null;
    }

    // Non-explicite "return null" needed
};

const getProducts = async (withFilters = false, postBody = {}, lang = 'fr') => {
    const _defaultPostBody = {
        lang,
        PostBody: {
            structure: {
                code           : 1,
                attributes     : 1,
                bundle_sections: 1,
                canonical      : 1
            },
            populate: ['bundle_sections.products.id'],
            limit   : 9999
        }
    };
    const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
    try {
        const response = await axios.post(`v2/products${withFilters ? '/true' : ''}`, _postBody);
        return response.data;
    } catch(e) {
        console.error('product.getProducts');
        return { datas: [], count: 0 };
    }
};

const downloadFreeVirtualProduct = async (productId) => axios({
    url          : `v2/product/download?p_id=${productId}`,
    method       : 'GET',
    responseType : 'blob',
});

const downloadVirtualProduct = async (itemId) => axios({
    url          : `v2/product/download?op_id=${itemId}`,
    method       : 'GET',
    responseType : 'blob',
});

const setProductReview = async (productId, review, lang) => {
    try {
        const response = await axios.put(`v2/product/${productId}/review`, {
            ...review,
            lang
        });
        return response.data;
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message, err?.response?.data?.code);
    }
};

module.exports = {
    getProduct,
    getProductById,
    getProducts,
    downloadFreeVirtualProduct,
    downloadVirtualProduct,
    setProductReview
}