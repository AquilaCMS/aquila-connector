const axios = require('../../lib/AxiosInstance');
const utils = require('../../lib/utils');

// GET cart from ID
const getCart = async (cartId, postBody = {}, lang = 'fr') => {
    const _defaultPostBody = {
        lang,
        PostBody: {
            structure: {
                addresses    : 1,
                point_of_sale: 1
            },
            populate: ['items.id']
        }
    };
    const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
    try {
        const response = await axios.post(`v2/cart/${cartId}`, _postBody);
        return response.data;
    } catch (err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message);
    }
};

// Add a product to cart
const addToCart = async (cartId, product, qty, selections = undefined, params = {}) => {
    try {
        const response = await axios.put('v2/cart/item', {
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
        return response.data;
    } catch(err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message);
    }
};

// Remove a product from cart
const deleteItem = async (cartId, itemId) => {
    try {
        const res = await axios.delete(`v2/cart/${cartId}/item/${itemId}`);
        return res.data;
    } catch (err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message);
    }
};

// Update quantity of a product from cart
const updateQtyItem = async (cartId, itemId, quantity) => {
    try {
        const res = await axios.put('v2/cart/updateQty', {
            cartId,
            item: { _id: itemId, quantity }
        });
        return res.data;
    } catch (err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message);
    }
};

// Add discount to cart
const addDiscount = async (cartId, discount) => {
    try {
        const res = await axios.get(`v2/promo/check/code/${discount}/${cartId}`);
        return res.data;
    } catch (err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message);
    }
};

// Delete discount from cart
const deleteDiscount = async (cartId) => {
    try {
        const res = await axios.delete(`v2/cart/discount/${cartId}`);
        return res.data;
    } catch (err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message);
    }
};

// Set cart addresses
const setCartAddresses = async (cartId, addresses) => {
    try {
        const res = await axios.put('v2/cart/addresses', {
            cartId,
            addresses
        });
        return res.data;
    } catch (err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message);
    }
};

// Get shipment methods from cart
const getShipmentCart = async (cart, withCountry = null, PostBody = {}, lang = 'fr') => {
    const _defaultPostBody = {
        limit   : 9999
    };
    const _PostBody = utils.deepMergeObjects(_defaultPostBody, PostBody);
    try {
        const response = await axios.post('v2/shipments/filter', {
            lang,
            PostBody: _PostBody,
            cart,
            withCountry
        });
        return response.data;
    } catch (err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message);
    }
};

// Set selected shipment method in cart
const setCartShipment = async (cartId, shipment, isoCountryCode, lang = 'fr') => {
    try {
        const response = await axios.put('v2/cart/delivery', {
            cartId,
            shipment,
            isoCountryCode,
            lang
        });
        return response.data;
    } catch (err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message);
    }
};

// Delete shipment method from cart
const deleteCartShipment = async (cartId) => {
    try {
        const response = await axios.put('v2/cart/delivery?removeDeliveryDatas=true', {
            cartId
        });
        return response.data;
    } catch (err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message);
    }
};

// Transforms a cart into an order
const cartToOrder = async (cartId, lang = 'fr') => {
    try {
        const res = await axios.put('v2/cart/to/order', {
            cartId,
            lang
        });
        return res.data.data;
    } catch (err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message);
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