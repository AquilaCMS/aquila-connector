const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

// GET cart from ID
const getCart = async (cartId, postBody = {}, lang = 'fr') => {
    const _defaultPostBody = {
        lang,
        PostBody: {
            structure: {
                addresses    : 1,
                point_of_sale: 1
            }
        }
    };
    const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
    try {
        return await customFetch.post(`v2/cart/${cartId}`, _postBody);
    } catch (err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

// Add a product to cart
const addToCart = async (cartId, product, qty, selections = undefined, params = {}) => {
    try {
        return await customFetch.put('v2/cart/item', {
            cartId,
            item: {
                id      : product._id,
                quantity: qty,
                weight  : product.weight,
                selections,
                selected_variant: product.selected_variant
            },
            ...params
        });
    } catch(err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

// Remove a product from cart
const deleteItem = async (cartId, itemId) => {
    try {
        return await customFetch.delete(`v2/cart/${cartId}/item/${itemId}`);
    } catch (err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

// Update quantity of a product from cart
const updateQtyItem = async (cartId, itemId, quantity) => {
    try {
        return await customFetch.put('v2/cart/updateQty', {
            cartId,
            item: { _id: itemId, quantity }
        });
    } catch (err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

// Add discount to cart
const addDiscount = async (cartId, discount) => {
    try {
        return await customFetch.get(`v2/promo/check/code/${discount}/${cartId}`);
    } catch (err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

// Delete discount from cart
const deleteDiscount = async (cartId) => {
    try {
        return await customFetch.delete(`v2/cart/discount/${cartId}`);
    } catch (err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

// Set cart addresses
const setCartAddresses = async (cartId, addresses) => {
    try {
        return await customFetch.put('v2/cart/addresses', {
            cartId,
            addresses
        });
    } catch (err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

// Get shipment methods from cart
const getShipmentCart = async (cart, withCountry = null, PostBody = {}, lang = 'fr') => {
    const _defaultPostBody = {
        limit   : 9999
    };
    const _PostBody = utils.deepMergeObjects(_defaultPostBody, PostBody);
    try {
        return await customFetch.post('v2/shipments/filter', {
            lang,
            PostBody: _PostBody,
            cart,
            withCountry
        });
    } catch (err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

// Set selected shipment method in cart
const setCartShipment = async (cartId, shipment, deliveryAddress, lang = 'fr') => {
    try {
        return await customFetch.put('v2/cart/delivery', {
            cartId,
            shipment,
            deliveryAddress,
            lang
        });
    } catch (err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

// Delete shipment method from cart
const deleteCartShipment = async (cartId) => {
    try {
        return await customFetch.put('v2/cart/delivery?removeDeliveryDatas=true', {
            cartId
        });
    } catch (err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
    }
};

// Transforms a cart into an order
const cartToOrder = async (cartId, lang = 'fr') => {
    try {
        return await customFetch.put('v2/cart/to/order', {
            cartId,
            lang
        });
    } catch (err) {
        throw new utils.ConnectorError(err?.status, err?.message, err?.code);
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