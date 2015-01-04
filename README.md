This repository implements libraries for use by other projects. Install it with
```
npm install --save git+ssh://git@github.com:satvidh/library.git#0.0.1
```

# library/test_utilities/requireInjector
Provides requirejs injector support for tests. 
NOTE: This module depends on squirejs. It will NOT work if the client has squirejs already installed. 

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
This module is designed to work with requirejs.
var requirejs = require('requirejs');
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
         * GIVEN a module configuration with the format {modules: [path to modules], names: [names to associate]}
         * WHEN you call transformLoader.moduleLoader
         * THEN it should return [{name: moduleName, module: transform}]
         * 
         * @param  {Object}   moduleConfiguration the module configuration as described in the GIVEN.
         * @param  {Function} callback            callback(err, result)
         */
