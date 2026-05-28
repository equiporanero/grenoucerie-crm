"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConfigVariablesMetadata", {
    enumerable: true,
    get: function() {
        return ConfigVariablesMetadata;
    }
});
const _classvalidator = require("class-validator");
const _applybasicvalidatorsutil = require("../utils/apply-basic-validators.util");
const _typedreflect = require("../../../../utils/typed-reflect");
function ConfigVariablesMetadata(options, validationOptions) {
    return (target, propertyKey)=>{
        const existingMetadata = _typedreflect.TypedReflect.getMetadata('config-variables', target.constructor) ?? {};
        _typedreflect.TypedReflect.defineMetadata('config-variables', {
            ...existingMetadata,
            [propertyKey.toString()]: options
        }, target.constructor);
        const propertyDescriptor = Object.getOwnPropertyDescriptor(target.constructor.prototype, propertyKey);
        const hasDefaultValue = propertyDescriptor && propertyDescriptor.value !== undefined;
        if (!hasDefaultValue) {
            (0, _classvalidator.IsOptional)()(target, propertyKey);
        }
        (0, _applybasicvalidatorsutil.applyBasicValidators)(options.type, target, propertyKey.toString(), options.options);
        (0, _classvalidator.registerDecorator)({
            name: propertyKey.toString(),
            target: target.constructor,
            propertyName: propertyKey.toString(),
            options: validationOptions,
            constraints: [
                options
            ],
            validator: {
                validate () {
                    return true;
                },
                defaultMessage () {
                    return `${propertyKey.toString()} has invalid metadata`;
                }
            }
        });
    };
}

//# sourceMappingURL=config-variables-metadata.decorator.js.map