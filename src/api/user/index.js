const customFetch = require('../../lib/FetchInstance');
const utils = require('../../lib/utils');

/**
 * Get user data
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.userId - The ID of the user
 * @param {Object} body.postBody - The post body of the request (default: {})
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the user data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const getUser = async ({userId, postBody = {}}, options = {}) => {
    const _defaultPostBody = {
        PostBody: {
            structure: {
                addresses       : 1,
                billing_address : 1,
                delivery_address: 1,
                phone_mobile    : 1
            }
        }
    };
    const _postBody = utils.deepMergeObjects(_defaultPostBody, postBody);
    try {
        return await customFetch.post(`v2/user/${userId}`, _postBody, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Set user data
 * @async
 * @param {Object} body - The body of the request
 * @param {Object} body.user - The user data to set
 * @param {Object} options - Fetch options (default: {})
 * @returns An object : { user: Object code: String|undefined }
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const setUser = async ({user}, options = {}) => {
    try {
        return await customFetch.put('v2/user', user, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Set addresses in user
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.userId - The ID of the user
 * @param {Number} body.billingAddressIndex - The index billing address to set
 * @param {Number} body.deliveryAddressIndex - The index delivery address to set
 * @param {Object} body.addresses - The addresses data to set
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the user data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const setAddressesUser = async ({userId, billingAddressIndex, deliveryAddressIndex, addresses}, options = {}) => {
    try {
        return await customFetch.put('v2/user/addresses', {
            userId,
            billing_address : billingAddressIndex,
            delivery_address: deliveryAddressIndex,
            addresses
        }, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Reset password
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.token - The token of the reset password
 * @param {String} body.password - The new password
 * @param {Object} options - Fetch options (default: {})
 * @returns An object with the user data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const resetPassword = async ({token, password = undefined}, options = {}) => {
    try {
        return await customFetch.post('v2/user/resetpassword', { token, password }, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Validate account
 * @async
 * @param {Object} body - The body of the request
 * @param {String} body.token - The token of the account activation
 * @param {Object} options - Fetch options (default: {})
 * @returns An object : { isActiveAccount: Boolean }
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const validateAccount = async ({token}, options = {}) => {
    try {
        return await customFetch.post('v2/user/active/account', { activateAccountToken: token }, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Export user data
 * @async
 * @param {Object} params - URL params
 * @param {String} params.userId - The ID of the user
 * @param {Object} options - Fetch options (default: {})
 * @returns A blob with the user data
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const dataUserExport = async ({userId}, options = {}) => {
    try {
        return await customFetch.get(`v2/rgpd/export/${userId}`, options);
    } catch(err) {
        /*const b   = new Blob([err.response.data]);
        const fr  = new FileReader();
        fr.onload = function () {
            const result = JSON.parse(this.result);
            throw new utils.ConnectorError(result.status, result.message);
        };
        fr.readAsText(b);*/
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Anonymize user data
 * @async
 * @param {Object} params - URL params
 * @param {String} params.userId - The ID of the user
 * @param {Object} options - Fetch options (default: {})
 * @returns A string "success"
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const anonymizeUser = async ({userId}, options = {}) => {
    try {
        return await customFetch.get(`v2/rgpd/anonymizeUser/${userId}`, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

/**
 * Delete user
 * @async
 * @param {Object} params - URL params
 * @param {String} params.userId - The ID of the user
 * @param {Object} options - Fetch options (default: {})
 * @returns A string "success"
 * @throws {ConnectorError} Throws a ConnectorError if the request fails, containing error code, message, and message code.
 */
const deleteUser = async ({userId}, options = {}) => {
    try {
        return await customFetch.delete(`v2/rgpd/deleteUser/${userId}`, options);
    } catch(err) {
        throw new utils.ConnectorError(err?.code, err?.message, err?.messageCode);
    }
};

module.exports = {
    getUser,
    setUser,
    setAddressesUser,
    resetPassword,
    validateAccount,
    dataUserExport,
    anonymizeUser,
    deleteUser
}