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
    get IsDuration () {
        return IsDuration;
    },
    get IsDurationConstraint () {
        return IsDurationConstraint;
    }
});
const _classvalidator = require("class-validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let IsDurationConstraint = class IsDurationConstraint {
    validate(duration) {
        const regex = /^-?[0-9]+(.[0-9]+)?(m(illiseconds?)?|s(econds?)?|h((ou)?rs?)?|d(ays?)?|w(eeks?)?|M(onths?)?|y(ears?)?)?$/;
        return regex.test(duration); // Returns true if duration matches regex
    }
};
IsDurationConstraint = _ts_decorate([
    (0, _classvalidator.ValidatorConstraint)({
        async: true
    })
], IsDurationConstraint);
const IsDuration = (validationOptions)=>(object, propertyName)=>{
        (0, _classvalidator.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsDurationConstraint
        });
    };

//# sourceMappingURL=is-duration.decorator.js.map