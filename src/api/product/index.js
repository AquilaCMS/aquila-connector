const axios = require('../../lib/AxiosInstance');

const getProduct = async (type, value, lang = 'fr') => {
    const postBody = {
        lang,
        countviews : true,
        withFilters: false,
        PostBody   : {
            structure: {
                allergens      : 1,
                code           : 1,
                attributes     : 1,
                canonical      : 1,
                associated_prds: 1,
                bundle_sections: 1
            },
            populate: [
                'allergens',
                'associated_prds',
                'bundle_sections.products.id'
            ],
            limite: 1
        }
    };
    if (type === 'slug') {
        postBody.PostBody.filter = { [`translation.${lang}.slug`]: value };
    } else {
        postBody.PostBody.filter = { code: value };
    }

    try {
        const response = await axios.post('v2/product', postBody);
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

const getProducts = async (filter = {}, lang = 'fr') => {
    const postBody = {
        lang,
        PostBody: {
            filter,
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
    
    try {
        const response = await axios.post('v2/products', postBody);
        return response.data;
    } catch(e) {
        console.error('product.getProductsFromCategory');
        return { datas: [], count: 0 };
    }
};

module.exports = {
    getProduct,
    getProductById,
    getProducts
}