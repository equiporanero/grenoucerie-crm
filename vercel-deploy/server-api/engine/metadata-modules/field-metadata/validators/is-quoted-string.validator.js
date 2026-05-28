"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IsQuotedString", {
    enumerable: true,
    get: function() {
        return IsQuotedString;
    }
});
const _classvalidator = require("class-validator");
function IsQuotedString(validationOptions) {
    return function(object, propertyName) {
        (0, _classvalidator.registerDecorator)({
            name: 'isQuotedString',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                // oxlint-disable-next-line @typescripttypescript/no-explicit-any
                validate (value) {
                    return typeof value === 'string' && /^'{1}.*'{1}$/.test(value);
                },
                defaultMessage (args) {
                    return `${args.property} must be a quoted string`;
                }
            }
        });
    };
}

//# sourceMappingURL=is-quoted-string.validator.js.map