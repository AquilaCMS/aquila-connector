const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

/**
 * Get cart from ID
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.cartId - The ID of the cart
 * @param {Object} body.postBody - The post body of the request (default: {})
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the cart data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getCart = async ({cartId, postBody = {}, locale ='fr'}, options = {}) => {
    const _defaultPostBody = {
        lang: locale,
        PostBody: {
            structure: {
                addresses    : 1,
                point_of_sale: 1
            }
        }
    };
    const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
    try {
        return await customFetch.post(`v2/cart/${cartId}`, _postBody, options);
    } catch (err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Add a product to cart
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.cartId - The ID of the cart
 * @param {Object} body.product - The product to add
 * @param {Number} body.qty - The quantity of the product
 * @param {Array} body.selections - The selections of the product for bundle product only (default: undefined)
 * @param {Object} body.params - additionnals params (default: {})
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the cart data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const addToCart = async ({cartId, product, quantity, selections = undefined, params = {}}, options = {}) => {
    try {
        return await customFetch.put('v2/cart/item', {
            cartId,
            item: {
                id      : product._id,
                quantity,
                weight  : product.weight,
                selections,
                selected_variant: product.selected_variant
            },
            ...params
        }, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Delete an item from cart
 * @async
 * @param {Object} params - URL params
 * @param {String} params.cartId - The ID of the cart
 * @param {String} params.itemId - The ID of the item to delete
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the cart data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const deleteItem = async ({cartId, itemId}, options = {}) => {
    try {
        return await customFetch.delete(`v2/cart/${cartId}/item/${itemId}`, options);
    } catch (err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Update quantity of an item in cart
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.cartId - The ID of the cart
 * @param {String} body.itemId - The ID of the item in the cart
 * @param {Number} body.quantity - The new quantity of the item
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the cart data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const updateQtyItem = async ({cartId, itemId, quantity}, options = {}) => {
    try {
        return await customFetch.put('v2/cart/updateQty', { cartId, item: { _id: itemId, quantity } }, options);
    } catch (err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Add discount to cart
 * @async
 * @param {Object} params - URL params
 * @param {String} params.cartId - The ID of the cart
 * @param {String} params.discount - The discount code
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the cart data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const addDiscount = async ({cartId, discount}, options = {}) => {
    try {
        return await customFetch.get(`v2/promo/check/code/${discount}/${cartId}`, options);
    } catch (err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Delete discount from cart
 * @async
 * @param {Object} params - URL params
 * @param {String} params.cartId - The ID of the cart
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the cart data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const deleteDiscount = async ({cartId}, options = {}) => {
    try {
        return await customFetch.delete(`v2/cart/discount/${cartId}`, options);
    } catch (err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Set addresses in cart
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.cartId - The ID of the cart
 * @param {Object} body.addresses - The addresses to set
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the cart data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const setCartAddresses = async ({cartId, addresses}, options = {}) => {
    try {
        return await customFetch.put('v2/cart/addresses', { cartId, addresses }, options);
    } catch (err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Get shipment methods for cart
 * @async
 * @param {Object} body - The body of the request
 * @param {Object} body.cart - The cart data
 * @param {String} body.withCountry - The country code (default: null)
 * @param {Object} body.postBody - The post body of the request (default: {})
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the shipment methods
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getShipmentCart = async ({cart, withCountry = null, postBody = {}, locale ='fr'}, options = {}) => {
    const _defaultPostBody = {
        limit   : 9999
    };
    const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
    try {
        return await customFetch.post('v2/shipments/filter', {
            lang: locale,
            PostBody: _postBody,
            cart,
            withCountry
        }, options);
    } catch (err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Set shipment method in cart
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.cartId - The ID of the cart
 * @param {Object} body.shipment - The shipment method to set
 * @param {Object} body.deliveryAddress - The delivery address
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the cart data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const setCartShipment = async ({cartId, shipment, deliveryAddress, locale ='fr'}, options = {}) => {
    try {
        return await customFetch.put('v2/cart/delivery', { cartId, shipment, deliveryAddress, lang: locale }, options);
    } catch (err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Delete shipment method in cart
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.cartId - The ID of the cart
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the cart data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const deleteCartShipment = async ({cartId}, options = {}) => {
    try {
        return await customFetch.put('v2/cart/delivery?removeDeliveryDatas=true', { cartId }, options);
    } catch (err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Convert cart to order
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.cartId - The ID of the cart
 * @param {String} body.locale - Locale (default: fr)
 * @param {Object} options - Fetch options (default: {})
 * @returns An object : { code: String, data: Object }
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const cartToOrder = async ({cartId, locale ='fr'}, options = {}) => {
    try {
        return await customFetch.put('v2/cart/to/order', { cartId, lang: locale }, options);
    } catch (err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

module.exports = {
    getCart,
    addToCart,
    deleteItem,
    updateQtyItem,
    addDiscount,
    deleteDiscount,
    setCartAddresses,
    getShipmentCart,
    setCartShipment,
    deleteCartShipment,
    cartToOrder
}