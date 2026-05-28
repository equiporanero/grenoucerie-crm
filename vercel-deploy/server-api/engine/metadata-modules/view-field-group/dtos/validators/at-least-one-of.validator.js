"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get AtLeastOneOf () {
        return AtLeastOneOf;
    },
    get AtLeastOneOfConstraint () {
        return AtLeastOneOfConstraint;
    }
});
const _classvalidator = require("class-validator");
const _utils = require("twenty-shared/utils");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AtLeastOneOfConstraint = class AtLeastOneOfConstraint {
    validate(_value, args) {
        const [properties] = args.constraints;
        const object = args.object;
        return properties.some((property)=>(0, _utils.isDefined)(object[property]));
    }
    defaultMessage(args) {
        const [properties] = args.constraints;
        return `At least one of the following properties must be provided: ${properties.join(', ')}`;
    }
};
AtLeastOneOfConstraint = _ts_decorate([
    (0, _classvalidator.ValidatorConstraint)({
        async: false
    })
], AtLeastOneOfConstraint);
const AtLeastOneOf = (properties, validationOptions)=>{
    return (target)=>{
        (0, _classvalidator.registerDecorator)({
            target,
            propertyName: properties[0],
            options: validationOptions,
            constraints: [
                properties
            ],
            validator: AtLeastOneOfConstraint
        });
    };
};

//# sourceMappingURL=at-least-one-of.validator.js.map