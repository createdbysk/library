var configureInjector,
    expect,
    sinon,
    linq;
configureInjector = require('../test_utilities/configureInjector');
expect = require('expect.js');
sinon = require('sinon');
linq = require('linq');

describe('issue report generator', function () {
    'use strict';
    var injector,
        transformer;

    beforeEach(function (done) {
        injector = configureInjector('..', 'node_modules/squirejs');

        injector
            .mock('linq', linq)
            .require(['transformer'], function (theTransformer) {
            transformer = theTransformer;
            done();
        });
    });
    it('should apply the given transforms and return the value in the corresponding named field.',
        function (done) {
            var input,
                transform1,
                transform2,
                output1,
                output2,
                transforms,
                expectedResults,
                results;
            input = 'input';
            transform1 = sinon.stub();
            output1 = 'output1';
            transform1.withArgs(input, sinon.match.typeOf('function'))
                      .callsArgWith(1, null, output1);
            transform2 = sinon.stub();
            output2 = 'output2';
            transform2.withArgs(input, sinon.match.typeOf('function'))
                      .callsArgWith(1, null, output2);
            transforms = {
                transform1: transform1,
                transform2: transform2
            };
            expectedResults = {
                transform1: output1,
                transform2: output2
            };
            transformer(input, transforms, function (err, results) {
                expect(results).to.eql(expectedResults);
                done();
            });
        }
    );
    it('should apply the given transforms and callback with an error if any of the transforms fail with an error.',
        function (done) {
            var input,
                transform1,
                transforms,
                results,
                error;
            input = 'input';
            error = 'error';
            transform1 = sinon.stub();
            transform1.withArgs(input, sinon.match.typeOf('function'))
                      .callsArgWith(1, error, undefined);
            transforms = {
                transform1: transform1,
            };
            transformer(input, transforms, function (err, results) {
                expect(results).to.be(undefined);
                expect(err).to.eql(error);
                done();
            });
        }
    );
});
