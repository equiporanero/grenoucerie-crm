"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IsNumberOrString", {
    enumerable: true,
    get: function() {
        return IsNumberOrString;
    }
});
const _classvalidator = require("class-validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let IsNumberOrString = class IsNumberOrString {
    validate(value) {
        return typeof value === 'number' || typeof value === 'string';
    }
    defaultMessage() {
        return '($value) must be number or string';
    }
};
IsNumberOrString = _ts_decorate([
    (0, _classvalidator.ValidatorConstraint)({
        name: 'string-or-number',
        async: false
    })
], IsNumberOrString);

//# sourceMappingURL=string-or-number.js.map