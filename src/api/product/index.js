const customFetch = require('../../lib/FetchInstance');
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
        return await customFetch.post(`v2/product${preview ? `?preview=${preview}` : ''}`, _postBody);
    } catch(err) {
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
        return await customFetch.post(`v2/product/${id}`, postBody);
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
        return await customFetch.post(`v2/products${withFilters ? '/true' : ''}`, _postBody);
    } catch(e) {
        console.error('product.getProducts');
        return { datas: [], count: 0 };
    }
};

const downloadFreeVirtualProduct = async (productId) => {
    return await customFetch.get(`v2/product/download?p_id=${productId}`, {}, 'blob');
};

const downloadVirtualProduct = async (itemId) => {
    return await customFetch.get(`v2/product/download?op_id=${itemId}`, {}, 'blob');
};

const setProductReview = async (productId, review, lang) => {
    try {
        return await customFetch.put(`v2/product/${productId}/review`, {
            ...review,
            lang
        });
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
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