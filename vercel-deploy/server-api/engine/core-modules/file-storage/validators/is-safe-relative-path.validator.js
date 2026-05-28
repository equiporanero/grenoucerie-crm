"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IsSafeRelativePath", {
    enumerable: true,
    get: function() {
        return IsSafeRelativePath;
    }
});
const _classvalidator = require("class-validator");
const _issaferelativepathutil = require("../utils/is-safe-relative-path.util");
function IsSafeRelativePath(validationOptions) {
    return function(object, propertyName) {
        (0, _classvalidator.registerDecorator)({
            name: 'IsSafeRelativePath',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate (value) {
                    if (typeof value !== 'string') {
                        return false;
                    }
                    return (0, _issaferelativepathutil.isSafeRelativePath)(value);
                },
                defaultMessage (args) {
                    return `${args.property} contains unsafe characters or path traversal`;
                }
            }
        });
    };
}

//# sourceMappingURL=is-safe-relative-path.validator.js.map