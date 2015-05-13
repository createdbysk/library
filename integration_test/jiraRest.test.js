/**
 * Integration test to verify that jiraRest works correctly.
 *
 * Usage:
 * From the project root, run the following
 *
 *     node integration_test/jiraRest.test.js <jira-base-url> <username> <password> <query>
 *
 * Expected Output:
 *     JSON that represents the results of the query.
 *
 */
(function () {
    'use strict';
    var JiraRest,
        jiraRest,
        options,
        commander,
        requirejs;
    requirejs = require('library/configuredRequirejs');
    JiraRest = requirejs('library/jiraRest');
    commander = require('commander');
    commander.parse(process.argv);
    options = {
        baseUrl: commander.args[0],
        username: commander.args[1],
        password: commander.args[2],
        strictSSL: false
    }
    console.log("Creating JiraRest instance with options = ", JSON.stringify(options));
    jiraRest = JiraRest(options);
    console.log("Calling search with query = ", commander.args[3]);
    jiraRest.search(commander.args[3], function (err, results) {
        if (err) {
            console.err("Search failed with error ", err);
        }
        else {
            console.log("Search returned ", results);
        }
    });
})();
