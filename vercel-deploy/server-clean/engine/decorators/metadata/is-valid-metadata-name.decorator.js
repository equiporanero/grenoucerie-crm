"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IsValidMetadataName", {
    enumerable: true,
    get: function() {
        return IsValidMetadataName;
    }
});
const _classvalidator = require("class-validator");
function IsValidMetadataName(validationOptions) {
    return function(object, propertyName) {
        (0, _classvalidator.registerDecorator)({
            name: 'IsValidName',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                // oxlint-disable-next-line @typescripttypescript/no-explicit-any
                validate (value) {
                    return /^(?!(?:not|or|and|Int|Float|Boolean|String|ID)$)[^'"\\;.=*/]+$/.test(value);
                },
                defaultMessage (args) {
                    return `${args.property} has failed the name validation check`;
                }
            }
        });
    };
}

//# sourceMappingURL=is-valid-metadata-name.decorator.js.map