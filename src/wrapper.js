const fetch = require('node-fetch');
const { VKToolsError, VKAPIError } = require('./errors');
const querystring = require('querystring');

class VKWrapper {
    /**
     * @constructor
     * @param {String} token VK Token
     * @param {String} version API version
     */
    constructor(token, version = '5.95') {
        this.accessToken = token;
        this.v = version;

        if (!this.accessToken) throw new VKToolsError('Parameter `token` must be.');
    };

    /**
     * @async
     * @param {String} method API method
     * @param {Object} params Required method parameters
     */
    async callMethod(method, params = {}) {
        if (!method) throw new VKToolsError('Parameter `method` must be.');
        if (typeof method !== 'string') throw new VKToolsError('Parameter `method` must be a string.');

        const parameters = {
            access_token: this.accessToken,
            v: this.v,
            ...params
        };        

        let response = await fetch(`https://api.vk.com/method/${method}?${querystring.stringify(parameters)}`);
        response = await response.json();

        if (typeof response.error !== 'undefined') throw new VKAPIError(response.error.error_code, response.error.error_msg);

        return response.response;
    };
};

module.exports = VKWrapper;