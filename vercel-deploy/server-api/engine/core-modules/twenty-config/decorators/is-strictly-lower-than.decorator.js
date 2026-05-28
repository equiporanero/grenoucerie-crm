"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IsStrictlyLowerThan", {
    enumerable: true,
    get: function() {
        return IsStrictlyLowerThan;
    }
});
const _classvalidator = require("class-validator");
const IsStrictlyLowerThan = (property, validationOptions)=>{
    return (object, propertyName)=>{
        (0, _classvalidator.registerDecorator)({
            name: 'isStrictlyLowerThan',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [
                property
            ],
            options: validationOptions,
            validator: {
                // oxlint-disable-next-line @typescripttypescript/no-explicit-any
                validate (value, args) {
                    const [relatedPropertyName] = args.constraints;
                    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
                    const relatedValue = args.object[relatedPropertyName];
                    return typeof value === 'number' && typeof relatedValue === 'number' && value < relatedValue;
                }
            }
        });
    };
};

//# sourceMappingURL=is-strictly-lower-than.decorator.js.map