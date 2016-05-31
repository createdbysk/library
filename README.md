This repository implements libraries for use by other projects. Install it with
```
npm install --save git+ssh://git@github.com:satvidh/library.git
```

# To test client perspective
Use the integration_test directory to install the library and test it from a client perspective.

# library/test_utilities/requireInjector
Provides requirejs injector support for tests.
NOTE: This module depends on squirejs. It will NOT work if the client has squirejs already installed.
Usage:
var requireInjector;
requireInjector = require('library/test_utilities/requireInjector');
describe('my test', function () {
    var unitUnderTest;
    beforeEach(function (done) {
        var injector,
            mockDependency;
        injector = requireInjector.createInjector();
        mockDependency = { test: function () {} };
        injector
            .mock('dependency', mockDependency)
            .require(['unitUnderTest'], function (theUnitUnderTest) {
                unitUnderTest = theUnitUnderTest;
            });
    });
});

# library/streamEnumerableCreator
Creates a linqjs compatible enumerable that iterates over lines in the given file descriptor.
## Example:
library/examples/streamEnumerableCreator/streamEnumerableCreator.example.js
---------------------------------------------------------------------------
```
var streamEnumerableCreator;
streamEnumerableCreator = require('streamEnumerableCreator');
streamEnumerableCreator(process.stdin, function (err, lines) {
    lines.forEach(function (line) {
        console.log(line);
    });
});
```

test.txt
--------
```
line1
line2

```

Execute
-------
```
cat test.txt | node streamEnumerableCreator.example.js
```

This will output
-----------------
line1
line2

# library/transformLoader
## Usage
This module is designed to work with requirejs configured with library/configuredRequirejs.
var requirejs;
requirejs = require('library/configuredRequirejs');
requirejs(['library/transformLoader'], function (transformLoader) {
    ... Use transformLoader
});
define(['library/transformLoader'], function (transformLoader) {
    ... Use transformLoader
});

## Functions
### transformLoader.configureCommander
        /**
         * Use the configureCommander function to configure a commander for an option that will
         * create parameters compatible with the transformLoader.loadTransforms
         * @param  {object} commander   An instance of commander (require('commander'))
         * @param  {string} option      The option that the client program's command line will use
         *                              to load these transforms. For example, '-t --transform'
         * @param  {string} description The description of the options.
         * @return {object}             The commander instance passed into this function.
         */

### transformLoader.loadModules
        /**
         * GIVEN a module configuration with the format {modules: [path to modules], names: [transform names to associate]}
         * WHEN you call transformLoader.moduleLoader
         * THEN it should return
         * {transformName1: transformFunction1, transformName2: transformFunction2, ...}
         *
         * @param
           {Object}   moduleConfiguration the module configuration as described in the GIVEN.
         * @param  {Function} callback            callback(err, result)
         */

### transformer
        /**
         * GIVEN a collection of transforms in the form
         * {transformName1: transformFunction1, transformName2: transformFunction2, ...}
         * and an input value
         * WHEN you call transformer(input, transforms, callback)
         * THEN it will call the callback with
         * (err, {transformName1: result1, transformName2: result2, ...})
# library/jiraRest
## Usage
This module is designed to work with requirejs configured with library/configuredRequirejs.
var requirejs;
requirejs = require('library/configuredRequirejs');
requirejs(['library/jiraRest'], function (JiraRest) {
    ... Use JiraRest
});
define(['library/jiraRest'], function (JiraRest) {
    ... Use JiraRest
});

## Functions
### Constructor
    /**
     * Use the JiraRest constructor to create an instance configured with the
     * options passed to the constructor.
     *
     * The format of the options is
     * {
     *      baseUrl: <required url to the jira instance>
     *      username: <optional username for the jira user>
     *      password: <optional password for the jira user>
     *      strictSSL: <optional flag that indicates whether to allow
     *                  insecure access>
     * }
     *
     *  @param options  -   The options to configure the jiraRest instance.
     *
     * GIVEN options of the format given above
     * WHEN you call JiraRest(options)
     * THEN it should return a jiraRest instance of the form
     * {
     *      search: <search function. See next section for details.>
     * }

### Functions in jiraRest instance
#### jiraRest.search
/**
 * Use the search function to issue a search request to jira with the given
 * query input and invoke the callback with the results returned from the search
 * request.
 *
 * @param query -    A valid jira query in jql format. For example, project%3DSW
 * @param callback - A function of the form (err, results), which this function
 *                   will invoke with the response.
 *
 * GIVEN a jiraRest instance and a query in jql format
 * WHEN you call jiraRest.search(query, callback)
 * AND the call successfully returns results
 * THEN it should invoke the callback with null for the error parameter
 * AND the results for the results parameter.
 *
 * GIVEN a jiraRest instance and a query in jql format
 * WHEN you call jiraRest.search(query, callback)
 * AND the call fails with an error
 * THEN it should invoke the callback with the error for the error parameter
 * AND undefined for the results.
