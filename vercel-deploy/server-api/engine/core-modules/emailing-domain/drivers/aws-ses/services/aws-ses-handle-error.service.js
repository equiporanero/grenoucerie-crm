"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AwsSesHandleErrorService", {
    enumerable: true,
    get: function() {
        return AwsSesHandleErrorService;
    }
});
const _common = require("@nestjs/common");
const _emailingdomaindriverexception = require("../../exceptions/emailing-domain-driver.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AwsSesHandleErrorService = class AwsSesHandleErrorService {
    handleAwsSesError(error, context) {
        const name = error?.name ?? 'UnknownError';
        const message = error?.message ?? 'No message';
        const httpStatus = error?.$metadata?.httpStatusCode;
        const suffix = context ? ` (${context})` : '';
        if (this.isTemporary(name, httpStatus)) {
            throw new _emailingdomaindriverexception.EmailingDomainDriverException(`AWS SES temporary error${suffix}: ${message}`, _emailingdomaindriverexception.EmailingDomainDriverExceptionCode.TEMPORARY_ERROR);
        }
        if (this.isInsufficientPermissions(name, httpStatus)) {
            throw new _emailingdomaindriverexception.EmailingDomainDriverException(`AWS SES insufficient permissions${suffix}: ${message}`, _emailingdomaindriverexception.EmailingDomainDriverExceptionCode.INSUFFICIENT_PERMISSIONS);
        }
        if (this.isConfigurationError(name, httpStatus)) {
            throw new _emailingdomaindriverexception.EmailingDomainDriverException(`AWS SES configuration error${suffix}: ${message}`, _emailingdomaindriverexception.EmailingDomainDriverExceptionCode.CONFIGURATION_ERROR);
        }
        throw new _emailingdomaindriverexception.EmailingDomainDriverException(`AWS SES error${suffix}: ${name} - ${message}`, _emailingdomaindriverexception.EmailingDomainDriverExceptionCode.UNKNOWN);
    }
    isTemporary(name, httpStatus) {
        if (httpStatus && httpStatus >= 500) {
            return true;
        }
        if (name === 'ThrottlingException' || name === 'ServiceUnavailable' || name === 'InternalFailure' || name === 'RequestTimeout' || name === 'TooManyRequestsException') {
            return true;
        }
        return false;
    }
    isInsufficientPermissions(name, httpStatus) {
        if (httpStatus === 403) {
            return true;
        }
        if (name === 'AccessDeniedException' || name === 'AccountSuspendedException') {
            return true;
        }
        return false;
    }
    isConfigurationError(name, httpStatus) {
        if (httpStatus === 400) {
            return true;
        }
        if (name === 'InvalidParameterValue' || name === 'InvalidParameterCombination' || name === 'MissingParameter' || name === 'MessageRejected' || name === 'MailFromDomainNotVerifiedException' || name === 'FromEmailAddressNotVerifiedException') {
            return true;
        }
        return false;
    }
};
AwsSesHandleErrorService = _ts_decorate([
    (0, _common.Injectable)()
], AwsSesHandleErrorService);

//# sourceMappingURL=aws-ses-handle-error.service.js.map