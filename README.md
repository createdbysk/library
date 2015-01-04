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
