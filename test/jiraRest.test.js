//'use strict';
var configureInjector,
    expect;

configureInjector = require('../test_utilities/configureInjector');
expect = require('expect.js');
describe('jira rest', function () {
    beforeEach(function (done) {
        injector = configureInjector('..', 'node_modules/squirejs');
        injector
            .require(['jiraRest'], function (theJiraRest) {
                jiraRest = theJiraRest;
                done();
            });
    });
    it('should be a function', function (done) {
        expect(jiraRest).to.be.a(Function);
        done();
    });
});
