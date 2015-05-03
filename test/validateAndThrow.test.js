'use strict';
var configureInjector,
    expect;

configureInjector = require('../test_utilities/configureInjector');
expect = require('expect.js');
describe('validate and throw', function () {
    var validateAndThrow,
        validate,
        injector;
    beforeEach(function (done) {
        injector = configureInjector('..', 'node_modules/squirejs');
        validate = require('validate.js');
        injector
            .mock('validate.js', validate)
            .require(['utilities/validateAndThrow.js'], function (theValidateAndThrow) {
                validateAndThrow = theValidateAndThrow;
                done();
            });
    });
    it('should be a function', function (done) {
        expect(validateAndThrow).to.be.a(Function);
        done();
    });
    it('should throw an exception on failed validation', function (done) {
        try {
            validateAndThrow({}, {test: {presence: true}});
        }
        catch (err) {
            expect(err).to.be.ok();
            done();
        }
    });
    it('should not throw an exception on successful validation', function (done) {
        validateAndThrow({test: "exists"}, {test: {presence: true}});
        done();
    });
});
