var configureInjector,
    expect,
    sinon,
    linq;
configureInjector = require('../test_utilities/configureInjector');
expect = require('expect.js');
sinon = require('sinon');
linq = require('linq');
describe('transform loader', function () {
    'use strict';
    var module1,
        module2,
        module1Name,
        module2Name,
        injector,
        transformLoader,
        requirejs;
    beforeEach(function (done) {
        injector = configureInjector('..', 'node_modules/squirejs');
        module1 = 'module1';
        module2 = 'module2';
        module1Name = 'name1';
        module2Name = 'name2';
        requirejs = sinon.stub();
        injector
            .mock('requirejs', requirejs)
            .mock('linq', linq)
            .require(['transformLoader'], function (theTransformLoader) {
                transformLoader = theTransformLoader;
                done();
            });
    });
    describe('configure option', function () {
        it('should configure the commander to collect the modules and their names', function (done) {
            var commander;
            commander = require('commander');
            transformLoader
                .configureCommander(commander)
                .transform('-t --transform', 'transform')
                .parse([
                    '--transform',
                    // Add a .js to the path to confirm that the extractor removes the .js
                    module1+'.js,'+module1Name,
                    '--transform',
                    module2+','+module2Name
                ]);
            expect(commander.transform.modules, [module1, module2]);
            expect(commander.transform.names, [module1Name, module2Name]);
            done();
        });
    });
    describe('load modules', function () {
        it('should load the transforms given the module names', function (done) {
            var module1,
                module2,
                loadedModule1,
                loadedModule2,
                expectedLoadedModules;
            module1 = 'module1';
            module2 = 'module2';
            loadedModule1 = 'lmodule1';
            loadedModule2 = 'lmodule2';
            expectedLoadedModules = {
                "module1": loadedModule1,
                "module2": loadedModule2
            };
            requirejs
                .withArgs([module1, module2], sinon.match.typeOf('function'))
                .callsArgWith(1, loadedModule1, loadedModule2);
            transformLoader.loadModules(
                {
                    names: [module1, module2],
                    modules: [module1, module2]
                },
                function (err, loadedModules) {
                    expect(err).to.not.be.ok();
                    expect(loadedModules).to.eql(expectedLoadedModules);
                    done();
                }
            );
        });
    });
});
