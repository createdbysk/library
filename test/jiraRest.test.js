'use strict';
var configureInjector,
    expect;

configureInjector = require('../test_utilities/configureInjector');
expect = require('expect.js');
describe('jira rest', function () {
    var jiraRest,
        injector;
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
    it('should return an object with a search function when \
invoked with options',
        function (done) {
            var options,
                jiraRestInstance;
            options = {baseUrl: 'http://test.url'};
            jiraRestInstance = jiraRest(options);
            expect(jiraRestInstance).to.have.property('search');
            expect(jiraRestInstance.search).to.be.a(Function);
            done();
        }
    );
    it('should expect options to contain baseUrl property',
        function (done) {
            var options,
                jiraRestInstance;
            options = {};
            try {
                jiraRest(options);
            }
            catch (err) {
                console.log('here');
                expect(err).to.be.ok();
                done();
            }
        }
    );
});
