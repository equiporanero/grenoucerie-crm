/* @license Enterprise */ "use strict";
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
    get IsX509Certificate () {
        return IsX509Certificate;
    },
    get IsX509CertificateConstraint () {
        return IsX509CertificateConstraint;
    }
});
const _crypto = /*#__PURE__*/ _interop_require_wildcard(require("crypto"));
const _classvalidator = require("class-validator");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let IsX509CertificateConstraint = class IsX509CertificateConstraint {
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    validate(value) {
        if (typeof value !== 'string') {
            return false;
        }
        try {
            const cleanCert = value.replace(/-----BEGIN CERTIFICATE-----|-----END CERTIFICATE-----|\n|\r/g, '');
            const der = Buffer.from(cleanCert, 'base64');
            const cert = new _crypto.X509Certificate(der);
            return cert instanceof _crypto.X509Certificate;
        } catch  {
            return false;
        }
    }
    defaultMessage() {
        return 'The string is not a valid X509 certificate';
    }
};
IsX509CertificateConstraint = _ts_decorate([
    (0, _classvalidator.ValidatorConstraint)({
        async: false
    })
], IsX509CertificateConstraint);
function IsX509Certificate(validationOptions) {
    return function(object, propertyName) {
        (0, _classvalidator.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsX509CertificateConstraint
        });
    };
}

//# sourceMappingURL=x509.validator.js.map