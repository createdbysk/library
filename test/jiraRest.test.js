'use strict';
var configureInjector,
    expect,
    sinon;

configureInjector = require('../test_utilities/configureInjector');
expect = require('expect.js');
sinon = require('sinon');
describe('jira rest', function () {
    var jiraRest,
        injector,
        request,
        pathAndQueryParams;
    beforeEach(function (done) {
        injector = configureInjector('..', 'node_modules/squirejs');
        request = sinon.stub();
        pathAndQueryParams = {
            // Expected to end in a =
            path: "/rest/api/latest/search?jql=",
            // Expected to begin with &
            queryParams: "&expand=changelog&maxResults=500"
        };
        injector
            .mock('request', request)
            .mock('configuration/pathAndQueryParams', pathAndQueryParams)
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
            var options;
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
    it('should make the rest request with the expected parameters',
        function (done) {
            var options,
                jiraRestInstance,
                expectedRequestOptions,
                requestResponse,
                requestResults,
                user,
                password,
                query,
                matchRequestOptions,
                matchCallback;
            user = 'user';
            password = 'password';
            options = {
                baseUrl: 'http://test.url',
                username: user,
                password: password,
                strictSSL: false
            };
            // project=mine
            query = "project%3Dmine";
            expectedRequestOptions = {
                // options.baseUrl + pathAndQueryParams.path + query + pathAndQueryParams.queryParams
                url: "http://test.url/rest/api/latest/search?jql=project%3Dmine&expand=changelog&maxResults=500",
                auth: {
                    username: user,
                    password: password
                },
                strictSSL: false
            }
            requestResponse = {
                statusCode: 200
            }
            requestResults = {
                "body": "result"
            };
            matchRequestOptions = sinon.match(function (requestOptions) {
                var result;
                result = requestOptions.url === expectedRequestOptions.url
                && requestOptions.auth.username === expectedRequestOptions.auth.username
                && requestOptions.auth.password === expectedRequestOptions.auth.password
                && requestOptions.strictSSL === expectedRequestOptions.strictSSL;
                console.log("Passed requestOptions", requestOptions, result);
                return result;
            }, 'requestOptions');
            matchCallback = sinon.match(function (callback) {
                console.log("callback", callback);
                return typeof callback === 'function';
            }, 'callback');
            request
                .withArgs(matchRequestOptions, matchCallback)
                .callsArgWith(1, null, requestResponse, JSON.stringify(requestResults));
            jiraRestInstance = jiraRest(options);
            console.log("expected requestOptions", expectedRequestOptions);
            jiraRestInstance.search('project%3Dmine', function (err, results) {
                expect(err).not.to.be.ok();
                expect(results).to.eql(requestResults);
                done();
            });
            //sinon.assert.calledWith(request, matchRequestOptions, matchCallback);
            //done();
        }
    );
});
