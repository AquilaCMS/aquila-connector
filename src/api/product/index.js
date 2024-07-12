const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

/**
 * Get product
 * @async
 * @param {Object} body - The body of the request
 * @param {Object} body.postBody - The post body of the request (default: {})
 * @param {String} body.preview - ID of preview (default: undefined)
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the product data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getProduct = async ({postBody = {}, preview = undefined, locale ='fr'}, options = {}) => {
    const _defaultPostBody = {
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
    };
    const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
    try {
        return await customFetch.post(`v2/product${preview ? `?preview=${preview}` : ''}`, {
            lang: locale,
            countviews : true,
            withFilters: false,
            PostBody   : _postBody
        }, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Get product by ID
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.id - The ID of the product
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the product data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getProductById = async ({id, locale ='fr'}, options = {}) => {
    const _defaultPostBody = {
        structure: {
            code           : 1,
            attributes     : 1,
            bundle_sections: 1,
            canonical      : 1
        },
        populate: [
            'bundle_sections.products.id'
        ]
    };

    try {
        return await customFetch.post(`v2/product/${id}`, {
            lang: locale,
            countviews : true,
            withFilters: false,
            PostBody   : _defaultPostBody
        }, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Get products
 * @async
 * @param {Object} body - The body of the request
 * @param {Boolean} body.withFilters - Get products with filters (default: false)
 * @param {Object} body.postBody - The post body of the request (default: {})
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object : { count: Number, datas: Array }
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getProducts = async ({withFilters = false, postBody = {}, locale ='fr'}, options = {}) => {
    const _defaultPostBody = {
        structure: {
            code           : 1,
            attributes     : 1,
            bundle_sections: 1,
            canonical      : 1
        },
        populate: ['bundle_sections.products.id'],
        limit   : 9999
    };
    const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
    try {
        return await customFetch.post(`v2/products${withFilters ? '/true' : ''}`, {
            lang: locale,
            PostBody: _postBody
        }, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Download free virtual product
 * @async
 * @param {Object} params - URL params
 * @param {String} params.productId - The ID of the product
 * @param {Object} options - Fetch options (default: {})
 * @returns A blob with the product data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const downloadFreeVirtualProduct = async ({productId}, options = {}) => {
    try {
        return await customFetch.get(`v2/product/download?p_id=${productId}`, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Download virtual product
 * @async
 * @param {Object} params - URL params
 * @param {String} params.itemId - The ID of the product in the order
 * @param {Object} options - Fetch options (default: {})
 * @returns A blob with the product data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const downloadVirtualProduct = async ({itemId}, options = {}) => {
    try {
        return await customFetch.get(`v2/product/download?op_id=${itemId}`, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Set product review
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.productId - The ID of the product
 * @param {Object} body.review - The review to set
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the review data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const setProductReview = async ({productId, review, locale = 'fr'}, options = {}) => {
    try {
        return await customFetch.put(`v2/product/${productId}/review`, {
            ...review,
            lang: locale
        }, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
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