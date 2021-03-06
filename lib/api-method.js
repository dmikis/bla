var inherit = require('inherit');
var vow = require('vow');

var normalize = require('./utils/normalize');
var ApiError = require('./api-error');

/**
 * Api method param.
 * @typedef {Object} ApiMethoParam
 * @property {String} param.name Param name.
 * @property {String} param.description Param description.
 * @property {String} [param.type] Param type (String, Number, Boolean, and etc.)
 * @property {Boolean} [param.required] Required param. Should be set before method execution.
 */

/**
 * API method.
 */
var ApiMethod = inherit({
    /**
     * @param {String} name Method name.
     */
    __constructor: function (name) {
        this._name = name;
        this._paramsDeclarations = {};
        this._options = {};
    },

    /**
     * Returns a method name.
     *
     * @returns {String}
     */
    getName: function () {
        return this._name;
    },

    /**
     * Sets a method description.
     *
     * @param {String} description
     * @returns {this}
     */
    setDescription: function (description) {
        this._description = description;
        return this;
    },

    /**
     * Returns a method description.
     *
     * @returns {String}
     */
    getDescription: function () {
        return this._description;
    },

    /**
     * Sets method option.
     *
     * @param {String} name Option name.
     * @param {*} value Option value.
     * @returns {this}
     */
    setOption: function (name, value) {
        this._options[name] = value;

        return this;
    },

    /**
     * Returns option value by name.
     *
     * @returns {*}
     */
    getOption: function (name) {
        return this._options[name];
    },

    /**
     * Adds a method param.
     *
     * @param {ApiMethodParam} param
     * @returns {this}
     */
    addParam: function (param) {
        if (this._paramsDeclarations[param.name]) {
            throw new ApiError(ApiError.INTERNAL_ERROR, param.name + ' was already declared');
        }

        this._paramsDeclarations[param.name] = param;
        return this;
    },

    /**
     * Returns declared params.
     *
     * @returns {Object} params Hash where each property name is a method param and value has ApiMethodParam type.
     */
    getParamsDeclarations: function () {
        return this._paramsDeclarations;
    },

    /**
     * Sets a callback which will be executed in exec method.
     *
     * @param {Function} action Execution callback.
     * @returns {this}
     */
    setAction: function (action) {
        this._action = action;
        return this;
    },

    /**
     * Executes API method.
     *
     * @param {Object} params
     * @param {Object} request Express request.
     * @param {Api} api API instance.
     * @returns {vow.Promise}
     */
    exec: function (params, request, api) {
        params = params || {};

        var normalizedParams;
        try {
            normalizedParams = this._normalizeParams(params, this._paramsDeclarations);
        } catch (error) {
            return vow.reject(error);
        }

        return vow.cast(this._action.call(this, normalizedParams, request, api));
    },

    /**
     * Normalizes params according to set params.
     *
     * @param {Object} values Params passed to the exec method.
     * @param {Object} params Params set in the API declaration.
     * @returns {Object} Normalized params.
     */
    _normalizeParams: function (values, params) {
        return Object.keys(params).reduce(function (result, key) {
            if (!values[key] && params[key].required) {
                throw new ApiError(ApiError.BAD_REQUEST, 'missing ' + key + ' parameter');
            }
            if (values[key]) {
                result[key] = normalize(values[key], params[key].type, key);
            }
            return result;
        }, {});
    }
});

module.exports = ApiMethod;
