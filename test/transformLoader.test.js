var configureInjector,
    expect;
configureInjector = require('../test_utilities/configureInjector');
expect = require('expect.js');
describe('transform loader', function () {
    'use strict';
    var module1,
        module2,
        module1Name,
        module2Name,
        injector;
    beforeEach(function (done) {
        injector = configureInjector('..', 'node_modules/squirejs');
        module1 = 'module1';
        module2 = 'module2';
        module1Name = 'name1';
        module2Name = 'name2';
        done();
    });
    describe('configure option', function () {
        it('should configure the commander to collect the modules and their names', function (done) {
            var transformLoader,
                commander;
            commander = require('commander');
            transformLoader = require('../transformLoader');
            transformLoader.configureCommander(commander)
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
    // it('should load the transforms given the module names', function (done) {
    //     var module1,
    //         module2,
    //         loadedModule1,
    //         loadedModule2,
    //         expectedLoadedModules;
    //     module1 = 'module1';
    //     module2 = 'module2';
    //     loadedModule1 = 'lmodule1';
    //     loadedModule2 = 'lmodule2';
    //     injector
    //         .mock(module1, loadedModule1)
    //         .mock(module2, loadedModule2)
    //         .require(['../transformLoader'], function (theTransformLoader) {
    //             transformLoader = theTransformLoader;
    //         });
    //     expectedLoadedModules
    //     transformLoader(
    //         [
    //             {name: module1, module: module1}, 
    //             {name: module2, module: module2}
    //         ], function (loadedModules) {

    //         }
    //     );
    // });
});