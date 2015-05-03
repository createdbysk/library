/**
  * Wrapper around validate.js to throw exception for failed
  * validations.
  */
define(['validate.js'], function (validate) {
    var validateWrapper;
    validateWrapper = function () {
        var result;
        // validate with the supplied arguments.
        // validate returns an object on validation failure.
        result = validate.apply(null, arguments);
        // If validate returned an object, then validation failed.
        if (result) {
            // Throw the object that validate returned.
            throw result;
        }
    };
    return validateWrapper;
});
