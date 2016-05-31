define([
    'utilities/validateAndThrow',
    'request',
    'configuration/pathAndQueryParams'
    ],
    function (validate, request, pathAndQueryParams) {
        'use strict';
        var jiraRest,
            jiraRestInstance,
            isRequired,

        // Options to pass to validate() to check for presence of a property.
        // validate will return the message if the required property is not present.
        isRequired = {presence: {message: 'is required'}};

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
            var search;

            validate(options, {baseUrl: isRequired});

            search = function (query, callback) {
                var url,
                    requestOptions,
                    requestCallback;
                url = options.baseUrl + pathAndQueryParams.path + query + pathAndQueryParams.queryParams;
                requestOptions = {
                    url: url,
                    auth: {
                        username: options.username,
                        password: options.password
                    },
                    strictSSL: options.strictSSL
                };
                requestCallback = function (err, response, body) {
                    if (err) {
                        callback(err);
                    }
                    if (response.statusCode === 200) {
                        var results;
                        results = JSON.parse(body);
                        callback(err, results);
                    }
                };
                request(requestOptions, requestCallback);
            };
            jiraRestInstance = {
                search: search
            };
            return jiraRestInstance;
        };
        return jiraRest;
    }
);
