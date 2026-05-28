"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuditExceptionFilter", {
    enumerable: true,
    get: function() {
        return AuditExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _auditexception = require("./audit.exception");
const _graphqlerrorsutil = require("../graphql/utils/graphql-errors.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AuditExceptionFilter = class AuditExceptionFilter {
    catch(exception) {
        switch(exception.code){
            case _auditexception.AuditExceptionCode.INVALID_TYPE:
            case _auditexception.AuditExceptionCode.INVALID_INPUT:
                throw new _graphqlerrorsutil.UserInputError(exception);
            default:
                {
                    (0, _utils.assertUnreachable)(exception.code);
                }
        }
    }
};
AuditExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_auditexception.AuditException)
], AuditExceptionFilter);

//# sourceMappingURL=audit-exception-filter.js.map