define(['utilities/validateAndThrow.js'], function (validate) {
    'use strict';
    var jiraRest,
        jiraRestInstance,
        search,
        isRequired;
    // Options to pass to validate() to check for presence of a property.
    // validate will return the message if the required property is not present.
    isRequired = {presence: {message: 'is required'}};

    search = function () {

    };
    jiraRestInstance = {
        search: search
    };
    /**
     * Factory method that returns the jiraRestInstance given
     * options.
     *
     * options must be an object with the following required and optional properties.
     *
     * required:
     *  baseUrl -   The base url of the rest api call.
     */
    jiraRest = function (options) {
        validate(options, {baseUrl: isRequired});
        return jiraRestInstance;
    };
    return jiraRest;
});
