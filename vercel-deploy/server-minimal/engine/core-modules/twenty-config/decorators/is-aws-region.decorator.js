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
    get IsAWSRegion () {
        return IsAWSRegion;
    },
    get IsAWSRegionConstraint () {
        return IsAWSRegionConstraint;
    }
});
const _classvalidator = require("class-validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let IsAWSRegionConstraint = class IsAWSRegionConstraint {
    validate(region) {
        const regex = /^[a-z]{2}-[a-z]+-\d{1}$/;
        return regex.test(region); // Returns true if region matches regex
    }
};
IsAWSRegionConstraint = _ts_decorate([
    (0, _classvalidator.ValidatorConstraint)({
        async: true
    })
], IsAWSRegionConstraint);
const IsAWSRegion = (validationOptions)=>(object, propertyName)=>{
        (0, _classvalidator.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsAWSRegionConstraint
        });
    };

//# sourceMappingURL=is-aws-region.decorator.js.map