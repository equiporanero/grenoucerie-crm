"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "approvedAccessDomainValidator", {
    enumerable: true,
    get: function() {
        return approvedAccessDomainValidator;
    }
});
const _utils = require("twenty-shared/utils");
const _approvedaccessdomainexception = require("./approved-access-domain.exception");
const assertIsDefinedOrThrow = (approvedAccessDomain, exceptionToThrow = new _approvedaccessdomainexception.ApprovedAccessDomainException('Approved access domain not found', _approvedaccessdomainexception.ApprovedAccessDomainExceptionCode.APPROVED_ACCESS_DOMAIN_NOT_FOUND))=>{
    if (!(0, _utils.isDefined)(approvedAccessDomain)) {
        throw exceptionToThrow;
    }
};
const approvedAccessDomainValidator = {
    assertIsDefinedOrThrow
};

//# sourceMappingURL=approved-access-domain.validate.js.map