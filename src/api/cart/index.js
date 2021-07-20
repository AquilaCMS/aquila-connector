const axios = require('../../lib/AxiosInstance');
const utils = require('../../lib/utils');

// GET cart from ID
const getCart = async (cartId, lang = 'fr', cookiesServerInstance) => {
    const postBody = {
        lang,
        PostBody: {
            structure: {
                addresses    : 1,
                point_of_sale: 1
            },
            populate: ['items.id']
        }
    };
    try {
        const response = await axios.post(`v2/cart/${cartId}`, postBody);
        return response.data;
    } catch(err) {
        if (err?.response?.data?.status === 404) {
            utils.unsetCookie('cart_id', cookiesServerInstance);
        }
        console.error('cart.getCart');
        return null;
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
        console.error('cart.addToCart');
        throw new Error(err?.response?.data?.message);
    }
};

// Remove a product from cart
const deleteItem = async (cartId, itemId) => {
    try {
        const res = await axios.delete(`v2/cart/${cartId}/item/${itemId}`);
        return res.data;
    } catch (err) {
        if (err?.response?.data?.status === 404) {
            utils.unsetCookie('cart_id');
        }
        console.error('cart.deleteItem');
        throw new Error(err?.response?.data?.message);
    }
};

// Update quantity of a product from cart
const updateQtyItem = async (cartId, itemId, quantity) => {
    try {
        const res = await axios.put('v2/cart/updateQty', {
            item: { _id: itemId, quantity },
            cartId
        });
        return res.data;
    } catch (err) {
        if (err?.response?.data?.status === 404) {
            utils.unsetCookie('cart_id');
        }
        console.error('cart.updateQtyItem');
        throw new Error(err?.response?.data?.message);
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
        if (err?.response?.data?.status === 404) {
            utils.unsetCookie('cart_id');
        }
        console.error('cart.setCartAddresses');
        throw new Error(err?.response?.data?.message);
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
        console.error('cart.cartToOrder');
        throw new Error(err?.response?.data?.message);
    }
};

module.exports = {
    getCart,
    addToCart,
    deleteItem,
    updateQtyItem,
    setCartAddresses,
    cartToOrder
}