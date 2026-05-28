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
    get IsTwentySemVer () {
        return IsTwentySemVer;
    },
    get IsTwentySemVerValidator () {
        return IsTwentySemVerValidator;
    }
});
const _classvalidator = require("class-validator");
const _semver = /*#__PURE__*/ _interop_require_default(require("semver"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let IsTwentySemVerValidator = class IsTwentySemVerValidator {
    validate(version) {
        const parsed = _semver.default.parse(version);
        return parsed !== null;
    }
    defaultMessage(args) {
        return `${args.property} must be a valid semantic version (e.g., 1.0.0)`;
    }
};
IsTwentySemVerValidator = _ts_decorate([
    (0, _classvalidator.ValidatorConstraint)({
        async: false
    })
], IsTwentySemVerValidator);
const IsTwentySemVer = (validationOptions)=>(object, propertyName)=>{
        (0, _classvalidator.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsTwentySemVerValidator
        });
    };

//# sourceMappingURL=is-twenty-semver.decorator.js.map