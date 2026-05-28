"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AssertOrWarn", {
    enumerable: true,
    get: function() {
        return AssertOrWarn;
    }
});
const _classvalidator = require("class-validator");
const AssertOrWarn = (// oxlint-disable-next-line @typescripttypescript/no-explicit-any
condition, validationOptions)=>{
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    return function(object, propertyName) {
        (0, _classvalidator.registerDecorator)({
            name: 'AssertOrWarn',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                ...validationOptions,
                groups: [
                    'warning'
                ]
            },
            constraints: [
                condition
            ],
            validator: {
                // oxlint-disable-next-line @typescripttypescript/no-explicit-any
                validate (value, args) {
                    return condition(args.object, value);
                },
                defaultMessage (args) {
                    return `'${args.property}' failed the warning validation.`;
                }
            }
        });
    };
};

//# sourceMappingURL=assert-or-warn.decorator.js.map