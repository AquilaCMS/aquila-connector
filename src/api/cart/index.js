const axios = require('../../lib/AxiosInstance');
const utils = require('../../lib/utils');

// GET cart from ID
const getCart = async (cartId, lang = 'fr') => {
    const postBody = {
        lang,
        PostBody: {
            structure: {
                addresses    : 1,
                point_of_sale: 1
            }
        }
    };
    try {
        const response = await axios.post(`v2/cart/${cartId}`, postBody);
        return response.data;
    } catch (err) {
        throw new utils.ConnectorError(err?.response?.data?.status, err?.response?.data?.message);
    }
};

// Add a product to cart
const addToCart = async (cartId, product, qty, selections = undefined) => {
    try {
        const response = await axios.put('v2/cart/item', {
            cartId,
            item: {
                id      : product._id,
                quantity: qty,
                weight  : product.weight,
                selections
            }
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

// GET shipments
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

// GET shipments
const setCartShipment = async (cartId, shipment, isoCountryCode, deleteCartDelivery = false, lang = 'fr') => {
    try {
        const response = await axios.put(`v2/cart/delivery${deleteCartDelivery ? '?removeDeliveryDatas=true' : ''}`, {
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
    setCartAddresses,
    getShipmentCart,
    setCartShipment,
    cartToOrder
}